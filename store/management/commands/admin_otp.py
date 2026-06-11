"""Break-glass: print a valid admin-access OTP for a staff user, even if email
is down. Run on the server:  python manage.py admin_otp <username-or-email>
Then type the printed code into the /manage/verify/ page."""
import random
from django.core.cache import cache
from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = 'Generate an admin-panel verification OTP for a staff user (bypasses email).'

    def add_arguments(self, parser):
        parser.add_argument('identifier', help='username or email of the staff user')

    def handle(self, *args, **opts):
        U = get_user_model()
        ident = opts['identifier'].strip()
        user = (U.objects.filter(username=ident).first()
                or U.objects.filter(email__iexact=ident).first())
        if not user:
            raise CommandError(f'No user matching "{ident}".')
        if not user.is_staff:
            raise CommandError(f'"{user.username}" is not staff — grant is_staff first.')
        otp = str(random.randint(100000, 999999))
        cache.set(f'admin_otp:{user.id}', otp, timeout=600)
        cache.delete(f'admin_otp_attempts:{user.id}')
        self.stdout.write(self.style.SUCCESS(
            f'\nAdmin OTP for {user.username}: {otp}\n'
            f'Valid 10 minutes. Enter it at /manage/verify/\n'))
