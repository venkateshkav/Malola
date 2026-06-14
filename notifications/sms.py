import json
import logging
import urllib.request
import urllib.parse
from django.conf import settings

logger = logging.getLogger(__name__)
FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2'


def _domain():
    """Bare site domain for short SMS links (no scheme)."""
    d = (getattr(settings, 'SITE_DOMAIN', '') or '').replace('https://', '').replace('http://', '').rstrip('/')
    if not d or d.startswith('localhost') or d.startswith('127.'):
        d = 'malolafoods.com'
    return d


def _send_sms(numbers, message):
    api_key = getattr(settings, 'FAST2SMS_API_KEY', '')
    if not api_key:
        logger.warning('FAST2SMS_API_KEY not configured – SMS skipped')
        return False
    if isinstance(numbers, (list, tuple)):
        numbers = ','.join(str(n) for n in numbers)
    payload = urllib.parse.urlencode({
        'sender_id': 'FSTSMS',
        'message':   message,
        'language':  'english',
        'route':     'v3',
        'numbers':   numbers,
    }).encode()
    req = urllib.request.Request(
        FAST2SMS_URL,
        data=payload,
        headers={
            'authorization':  api_key,
            'Content-Type':   'application/x-www-form-urlencoded',
        },
        method='POST',
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            return result.get('return', False)
    except Exception as exc:
        logger.error('Fast2SMS error: %s', exc)
        return False


def send_order_placed_sms(order):
    phone = (order.phone or '').strip()
    if not phone:
        return
    msg = (
        f'Hi {order.name}! Your Malola order #ORD{order.id:04d} '
        f'worth Rs.{order.total} is confirmed. '
        f'We will notify you once it ships!'
    )
    _send_sms(phone, msg)


def send_order_shipped_sms(order, awb=None, courier=None):
    phone = (order.phone or '').strip()
    if not phone:
        return
    msg = f'Your Malola order #ORD{order.id:04d} has been shipped!'
    if courier:
        msg += f' Courier: {courier}'
    if awb:
        msg += f', AWB: {awb}'
    _send_sms(phone, msg)


def send_order_out_for_delivery_sms(order):
    phone = (order.phone or '').strip()
    if not phone:
        return
    msg = (
        f'Your Malola order #ORD{order.id:04d} is out for delivery and will '
        f'arrive today. Please keep your phone reachable.'
    )
    _send_sms(phone, msg)


def send_order_delivered_sms(order):
    phone = (order.phone or '').strip()
    if not phone:
        return
    msg = (
        f'Your Malola order #ORD{order.id:04d} has been delivered. '
        f'Enjoy your healthy snacks! '
        f'Leave a review: {_domain()}/review/{order.id}/'
    )
    _send_sms(phone, msg)


def send_otp_sms(phone, otp):
    msg = (
        f'{otp} is your Malola OTP. '
        f'Valid for 10 minutes. Do not share with anyone.'
    )
    _send_sms(phone, msg)
