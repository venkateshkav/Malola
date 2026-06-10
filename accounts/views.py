import json
from django.http import JsonResponse
from django.views.decorators.http import require_POST, require_GET
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import redirect
from .models import UserProfile, Address


# ── Address management ────────────────────────────────────────────────────────

@require_GET
def get_addresses(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    addrs = list(request.user.addresses.values(
        'id', 'name', 'phone', 'line1', 'line2',
        'city', 'state', 'pincode', 'country', 'is_default',
    ))
    return JsonResponse({'addresses': addrs})


@csrf_exempt
@require_POST
def add_address(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        d = json.loads(request.body)
        for field in ('name', 'phone', 'line1', 'city', 'state', 'pincode'):
            if not d.get(field, '').strip():
                return JsonResponse({'error': f'{field} is required'}, status=400)
        if d.get('is_default'):
            request.user.addresses.update(is_default=False)
        addr = Address.objects.create(
            user       = request.user,
            name       = d['name'].strip(),
            phone      = d['phone'].strip(),
            line1      = d['line1'].strip(),
            line2      = d.get('line2', '').strip(),
            city       = d['city'].strip(),
            state      = d['state'].strip(),
            pincode    = d['pincode'].strip(),
            country    = d.get('country', 'India').strip(),
            is_default = bool(d.get('is_default', False)),
        )
        return JsonResponse({'id': addr.id, 'message': 'Address saved'})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400)


@csrf_exempt
@require_POST
def set_default_address(request, addr_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    addr = request.user.addresses.filter(id=addr_id).first()
    if not addr:
        return JsonResponse({'error': 'Address not found'}, status=404)
    request.user.addresses.update(is_default=False)
    addr.is_default = True
    addr.save(update_fields=['is_default'])
    return JsonResponse({'message': 'Default address updated'})


@csrf_exempt
@require_POST
def delete_address(request, addr_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    deleted, _ = request.user.addresses.filter(id=addr_id).delete()
    if deleted:
        return JsonResponse({'message': 'Address deleted'})
    return JsonResponse({'error': 'Address not found'}, status=404)


# ── Email verification ────────────────────────────────────────────────────────

@csrf_exempt
@require_POST
def send_verification_email(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    if not request.user.email:
        return JsonResponse({'error': 'No email on your account'}, status=400)
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    if profile.email_verified:
        return JsonResponse({'message': 'Email already verified'})
    token = profile.generate_email_token()
    try:
        from notifications.email import send_email_verification
        send_email_verification(request.user, token, request)
        return JsonResponse({'message': 'Verification email sent. Check your inbox.'})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=500)


def verify_email(request, token):
    profile = UserProfile.objects.filter(email_token=token).first()
    if not profile or not token:
        return redirect('/?verified=0')
    profile.email_verified = True
    profile.email_token    = ''
    profile.save(update_fields=['email_verified', 'email_token'])
    return redirect('/?verified=1')


# ── Password change (for logged-in users) ─────────────────────────────────────

@csrf_exempt
@require_POST
def change_password(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        d   = json.loads(request.body)
        old = d.get('old_password', '').strip()
        new = d.get('new_password', '').strip()
        if not old or not new:
            return JsonResponse({'error': 'old_password and new_password are required'}, status=400)
        if len(new) < 8:
            return JsonResponse({'error': 'New password must be at least 8 characters'}, status=400)
        if not request.user.check_password(old):
            return JsonResponse({'error': 'Current password is incorrect'}, status=400)
        request.user.set_password(new)
        request.user.save()
        update_session_auth_hash(request, request.user)
        return JsonResponse({'message': 'Password changed successfully'})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400)


# ── Profile ───────────────────────────────────────────────────────────────────

@require_GET
def get_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    return JsonResponse({
        'username':       request.user.username,
        'email':          request.user.email,
        'first_name':     request.user.first_name,
        'last_name':      request.user.last_name,
        'phone':          profile.phone,
        'email_verified': profile.email_verified,
    })


@csrf_exempt
@require_POST
def update_profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Login required'}, status=401)
    try:
        d   = json.loads(request.body)
        u   = request.user
        u.first_name = d.get('first_name', u.first_name).strip()
        u.last_name  = d.get('last_name',  u.last_name).strip()
        u.save(update_fields=['first_name', 'last_name'])
        profile, _ = UserProfile.objects.get_or_create(user=u)
        if 'phone' in d:
            profile.phone = d['phone'].strip()
            profile.save(update_fields=['phone'])
        return JsonResponse({'message': 'Profile updated'})
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=400)
