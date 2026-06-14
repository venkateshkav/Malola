import threading
from django.db import close_old_connections, transaction
from django.db.models.signals import post_save
from django.dispatch import receiver


def _run_async(fn, order):
    """Run a notification handler off the request thread so checkout never blocks
    on SMTP / Fast2SMS. No Celery/Redis required.

    Gated on transaction.on_commit so it only fires after the order is actually
    committed (the signal fires inside the checkout transaction) — never for a
    rolled-back order. Each thread uses its own DB connection, closed when done.
    """
    def start():
        def runner():
            try:
                fn(order)
            finally:
                close_old_connections()
        threading.Thread(target=runner, daemon=True).start()
    transaction.on_commit(start)


def _handle_order_created(order):
    try:
        from notifications.email import send_order_confirmation
        from notifications.sms import send_order_placed_sms
        send_order_confirmation(order)
        send_order_placed_sms(order)
    except Exception as exc:
        import logging
        logging.getLogger(__name__).error('Order-created notification failed: %s', exc)


def _handle_status_change(order):
    try:
        from notifications.email import send_order_shipped, send_order_delivered
        from notifications.sms import send_order_shipped_sms, send_order_delivered_sms, send_order_out_for_delivery_sms
        if order.status == 'out_for_delivery':
            send_order_out_for_delivery_sms(order)
        elif order.status == 'shipped':
            shipment = getattr(order, 'shipment', None)
            send_order_shipped(
                order,
                awb         = shipment.awb_number  if shipment else None,
                courier     = shipment.courier_name if shipment else None,
                tracking_url= shipment.tracking_url if shipment else None,
            )
            send_order_shipped_sms(
                order,
                awb     = shipment.awb_number  if shipment else None,
                courier = shipment.courier_name if shipment else None,
            )
        elif order.status == 'delivered':
            send_order_delivered(order)
            send_order_delivered_sms(order)
    except Exception as exc:
        import logging
        logging.getLogger(__name__).error('Status-change notification failed: %s', exc)


def connect_signals():
    from store.models import Order

    @receiver(post_save, sender=Order, dispatch_uid='notifications.order_save')
    def order_notifications(sender, instance, created, **kwargs):
        if created:
            _run_async(_handle_order_created, instance)
        else:
            update_fields = kwargs.get('update_fields') or []
            if 'status' in update_fields:
                _run_async(_handle_status_change, instance)


connect_signals()
