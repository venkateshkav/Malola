from django.contrib import admin
from .models import UserProfile, Address


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display  = ['user', 'phone', 'email_verified', 'created_at']
    list_filter   = ['email_verified']
    search_fields = ['user__username', 'user__email', 'phone']


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display  = ['user', 'name', 'city', 'state', 'pincode', 'is_default']
    list_filter   = ['state', 'is_default']
    search_fields = ['user__username', 'name', 'pincode', 'city']
