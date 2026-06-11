import json
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from store.models import Order, OrderStatusLog
from .models import Shipment
from . import shiprocket


# Map Shiprocket status text → our Order.status, with a forward-only rank so an
# out-of-order webhook (e.g. "delivered" before "shipped") can't move us backwards.
_STATUS_RANK = {'confirmed': 1, 'processing': 2, 'shipped': 3, 'delivered': 4}

def _map_shiprocket_status(text):
    t = (text or '').strip().lower()
    if 'delivered' in t:
        return 'delivered'
    if any(k in t for k in ('out for delivery', 'in transit', 'shipped', 'pickup', 'picked up', 'dispatch')):
        return 'shipped'
    return None  # unknown / pending — ignore


def _staff_only(view_fn):
    def wrapper(request, *args, **kwargs):
        if not request.user.is_authenticated or not request.user.is_staff:
            return JsonResponse({'error': 'Admin only'}, status=403)
        return view_fn(request, *args, **kwargs)
    return wrapper


# ── Customer-facing ───────────────────────────────────────────────────────────

@require_GET
def track_order(request, order_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    order = Order.objects.filter(id=order_id, user=request.user).first()
    if not order:
        return JsonResponse({'error': 'Order not found'}, status=404)

    shipment = getattr(order, 'shipment', None)
    base = {'order_id': order_id, 'status': order.status}
    if not shipment or not shipment.awb_number:
        return JsonResponse({**base, 'tracking': None})

    data, err = shiprocket.track_by_awb(shipment.awb_number)
    return JsonResponse({
        **base,
        'awb':          shipment.awb_number,
        'courier':      shipment.courier_name,
        'tracking_url': shipment.tracking_url,
        'tracking':     data,
        'error':        err,
    })


# ── Admin-facing ──────────────────────────────────────────────────────────────

@csrf_exempt
@require_POST
@_staff_only
def create_shipment(request, order_id):
    order = Order.objects.filter(id=order_id).first()
    if not order:
        return JsonResponse({'error': 'Order not found'}, status=404)
    if hasattr(order, 'shipment') and order.shipment.awb_number:
        return JsonResponse({'message': 'Shipment already exists', 'awb': order.shipment.awb_number})

    data, err = shiprocket.create_order(order)
    if err:
        return JsonResponse({'error': err}, status=500)

    sr_shipment_id = data.get('shipment_id', '')
    awb_data, _    = shiprocket.assign_awb(sr_shipment_id)
    awb_info       = (awb_data or {}).get('response', {}).get('data', {})
    awb            = awb_info.get('awb_code', '')
    courier_name   = awb_info.get('courier_name', '')

    ship, _ = Shipment.objects.update_or_create(
        order=order,
        defaults={
            'shiprocket_order_id': str(data.get('order_id', '')),
            'awb_number':   awb,
            'courier_name': courier_name,
            'tracking_url': f'https://www.shiprocket.in/shipment-tracking/?id={awb}' if awb else '',
        },
    )
    prev = order.status
    order.status = 'shipped'
    order.save(update_fields=['status'])
    OrderStatusLog.objects.create(order=order, from_status=prev, to_status='shipped',
                                  changed_by=request.user if request.user.is_authenticated else None,
                                  note=f'Shipment created — AWB {awb}' if awb else 'Shipment created')
    return JsonResponse({'message': 'Shipment created', 'awb': awb, 'shipment_id': ship.pk})


@csrf_exempt
@require_POST
@_staff_only
def cancel_shipment(request, order_id):
    order = Order.objects.filter(id=order_id).first()
    if not order:
        return JsonResponse({'error': 'Order not found'}, status=404)
    shipment = getattr(order, 'shipment', None)
    if not shipment or not shipment.shiprocket_order_id:
        return JsonResponse({'error': 'No Shiprocket order found'}, status=404)
    data, err = shiprocket.cancel_order(shipment.shiprocket_order_id)
    if err:
        return JsonResponse({'error': err}, status=500)
    order.status = 'cancelled'
    order.save(update_fields=['status'])
    return JsonResponse({'message': 'Shipment cancelled'})


@csrf_exempt
@require_POST
def shiprocket_webhook(request):
    """
    Receives Shiprocket tracking updates and advances the order's status.
    Configure the URL + token in Shiprocket → Settings → API → Webhooks.
    Always returns 200 (after auth) so Shiprocket doesn't retry forever.
    """
    # Optional shared-secret check (Shiprocket sends the token you set as `x-api-key`)
    expected = getattr(settings, 'SHIPROCKET_WEBHOOK_TOKEN', '')
    if expected:
        token = request.META.get('HTTP_X_API_KEY', '')
        if token != expected:
            return JsonResponse({'error': 'unauthorized'}, status=401)

    try:
        payload = json.loads(request.body or '{}')
        awb     = str(payload.get('awb') or payload.get('awb_code') or '').strip()
        status_text = (payload.get('current_status') or payload.get('shipment_status')
                       or payload.get('status') or '')
        new_status = _map_shiprocket_status(status_text)

        shipment = Shipment.objects.filter(awb_number=awb).select_related('order').first() if awb else None
        if shipment:
            shipment.status = str(status_text)[:100]
            shipment.save(update_fields=['status', 'updated_at'])
            order = shipment.order
            if order and new_status:
                cur_rank = _STATUS_RANK.get(order.status, 0)
                new_rank = _STATUS_RANK.get(new_status, 0)
                if new_rank > cur_rank:   # forward-only
                    prev = order.status
                    order.status = new_status
                    order.save(update_fields=['status'])
                    OrderStatusLog.objects.create(
                        order=order, from_status=prev, to_status=new_status,
                        changed_by=None, note=f'Shiprocket: {status_text}',
                    )
    except Exception:
        pass  # never 5xx after auth — Shiprocket would keep retrying

    return JsonResponse({'status': 'ok'})


@require_GET
@_staff_only
def check_serviceability(request):
    pincode = request.GET.get('pincode', '').strip()
    weight  = float(request.GET.get('weight', 0.5))
    if not pincode:
        return JsonResponse({'error': 'pincode is required'}, status=400)
    data, err = shiprocket.get_serviceable_couriers(pincode, weight)
    if err:
        return JsonResponse({'error': err}, status=500)
    return JsonResponse({'pincode': pincode, 'couriers': data})
