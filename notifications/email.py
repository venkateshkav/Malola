import logging
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

logger = logging.getLogger(__name__)


def _send(subject, text_body, html_body, to_email):
    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[to_email],
        )
        msg.attach_alternative(html_body, 'text/html')
        msg.send()
        return True
    except Exception as exc:
        logger.error('Email send failed to %s: %s', to_email, exc)
        return False


def send_order_confirmation(order):
    if not order.user or not order.user.email:
        return
    ctx  = {'order': order, 'site_name': 'Malola'}
    html = render_to_string('store/emails/order_confirmation.html', ctx)
    text = (
        f'Hi {order.name}! Your Malola order #ORD{order.id:04d} worth '
        f'₹{order.total} has been confirmed. Thank you for shopping with us!'
    )
    _send(f'Order Confirmed – Malola #ORD{order.id:04d}', text, html, order.user.email)


def send_order_shipped(order, awb=None, courier=None, tracking_url=None):
    if not order.user or not order.user.email:
        return
    ctx  = {'order': order, 'awb': awb, 'courier': courier,
             'tracking_url': tracking_url, 'site_name': 'Malola'}
    html = render_to_string('store/emails/order_shipped.html', ctx)
    text = f'Your Malola order #ORD{order.id:04d} has been shipped!'
    if awb:
        text += f' AWB: {awb}.'
    _send(f'Your Malola order #ORD{order.id:04d} is on the way!', text, html, order.user.email)


def send_order_delivered(order):
    if not order.user or not order.user.email:
        return
    ctx  = {'order': order, 'site_name': 'Malola'}
    html = render_to_string('store/emails/order_delivered.html', ctx)
    text = (
        f'Hi {order.name}! Your Malola order #ORD{order.id:04d} '
        f'has been delivered. Enjoy your healthy snacks!'
    )
    _send(f'Malola order #ORD{order.id:04d} delivered!', text, html, order.user.email)


def send_email_verification(user, token, request=None):
    from django.urls import reverse
    if request:
        verify_url = request.build_absolute_uri(
            reverse('verify_email', args=[token])
        )
    else:
        domain = getattr(settings, 'SITE_DOMAIN', 'localhost:8000')
        verify_url = f'http://{domain}/accounts/verify-email/{token}/'
    ctx  = {'user': user, 'verify_url': verify_url, 'site_name': 'Malola'}
    html = render_to_string('store/emails/email_verification.html', ctx)
    text = (
        f'Hi {user.first_name or user.username}! '
        f'Verify your Malola account email by clicking: {verify_url}'
    )
    _send('Verify your Malola account email', text, html, user.email)


def send_password_reset_otp(user, otp):
    ctx  = {'user': user, 'otp': otp, 'site_name': 'Malola'}
    html = render_to_string('store/emails/password_reset_otp.html', ctx)
    text = f'Your Malola password reset OTP is: {otp}. Valid for 10 minutes.'
    _send('Malola – Password Reset OTP', text, html, user.email)
