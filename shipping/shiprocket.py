"""
Shiprocket API v1 client.

All functions return (data_dict_or_None, error_str_or_None).
Settings required:
  SHIPROCKET_EMAIL, SHIPROCKET_PASSWORD
  SHIPROCKET_PICKUP_LOCATION  (default 'Primary')
  SHIPROCKET_PICKUP_PINCODE   (used for serviceability checks)
  SHIPROCKET_DEFAULT_CITY, SHIPROCKET_DEFAULT_STATE, SHIPROCKET_DEFAULT_PINCODE
"""

import json
import logging
import urllib.request
from django.conf import settings
from django.core.cache import cache

logger  = logging.getLogger(__name__)
SR_BASE = 'https://apiv2.shiprocket.in/v1/external'


def _get_token():
    token = cache.get('shiprocket_jwt')
    if token:
        return token
    email    = getattr(settings, 'SHIPROCKET_EMAIL', '')
    password = getattr(settings, 'SHIPROCKET_PASSWORD', '')
    if not email or not password:
        return None
    payload = json.dumps({'email': email, 'password': password}).encode()
    req = urllib.request.Request(
        f'{SR_BASE}/auth/login',
        data=payload,
        headers={'Content-Type': 'application/json'},
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            data  = json.loads(resp.read())
            token = data.get('token')
            if token:
                cache.set('shiprocket_jwt', token, 86400)
            return token
    except Exception as exc:
        logger.error('Shiprocket login error: %s', exc)
        return None


def _request(method, endpoint, payload=None):
    token = _get_token()
    if not token:
        return None, 'Shiprocket not configured (missing credentials)'
    url  = f'{SR_BASE}/{endpoint.lstrip("/")}'
    data = json.dumps(payload).encode() if payload else None
    req  = urllib.request.Request(
        url, data=data,
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}',
        },
        method=method.upper(),
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read()), None
    except urllib.request.HTTPError as exc:
        body = exc.read().decode('utf-8', errors='ignore')
        logger.error('Shiprocket %s %s → HTTP %d: %s', method, endpoint, exc.code, body)
        return None, f'HTTP {exc.code}: {body}'
    except Exception as exc:
        logger.error('Shiprocket request error: %s', exc)
        return None, str(exc)


def create_order(order):
    """Create a Shiprocket order from a store.Order instance."""
    order_items = [
        {
            'name':          it.get('name', 'Product'),
            'sku':           it.get('slug', 'SKU'),
            'units':         it.get('qty', 1),
            'selling_price': it.get('price', 0),
        }
        for it in (order.items or [])
    ]
    payload = {
        'order_id':               f'ORD{order.id:04d}',
        'order_date':             order.created_at.strftime('%Y-%m-%d %H:%M'),
        'pickup_location':        getattr(settings, 'SHIPROCKET_PICKUP_LOCATION', 'Primary'),
        'billing_customer_name':  order.name,
        'billing_address':        order.address,
        'billing_city':           getattr(settings, 'SHIPROCKET_DEFAULT_CITY',    'Chennai'),
        'billing_pincode':        getattr(settings, 'SHIPROCKET_DEFAULT_PINCODE', '600001'),
        'billing_state':          getattr(settings, 'SHIPROCKET_DEFAULT_STATE',   'Tamil Nadu'),
        'billing_country':        'India',
        'billing_email':          order.user.email if order.user else '',
        'billing_phone':          order.phone,
        'shipping_is_billing':    True,
        'order_items':            order_items,
        'payment_method':         'Online' if order.payment_status == 'paid' else 'COD',
        'sub_total':              float(order.total),
        'length': 15, 'breadth': 15, 'height': 10, 'weight': 0.5,
    }
    return _request('POST', '/orders/create/adhoc', payload)


def assign_awb(shipment_id, courier_id=None):
    payload = {'shipment_id': shipment_id}
    if courier_id:
        payload['courier_id'] = courier_id
    return _request('POST', '/courier/assign/awb', payload)


def track_by_awb(awb):
    return _request('GET', f'/courier/track/awb/{awb}')


def cancel_order(sr_order_ids):
    if isinstance(sr_order_ids, (int, str)):
        sr_order_ids = [sr_order_ids]
    return _request('POST', '/orders/cancel', {'ids': sr_order_ids})


def get_serviceable_couriers(delivery_pincode, weight=0.5):
    pickup_pincode = getattr(settings, 'SHIPROCKET_PICKUP_PINCODE', '600001')
    endpoint = (
        f'/courier/serviceability/'
        f'?pickup_postcode={pickup_pincode}'
        f'&delivery_postcode={delivery_pincode}'
        f'&weight={weight}'
        f'&cod=1'
    )
    return _request('GET', endpoint)
