import secrets
from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user           = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone          = models.CharField(max_length=15, blank=True)
    email_verified = models.BooleanField(default=False)
    email_token    = models.CharField(max_length=64, blank=True)
    created_at     = models.DateTimeField(auto_now_add=True)

    def generate_email_token(self):
        self.email_token = secrets.token_urlsafe(32)
        self.save(update_fields=['email_token'])
        return self.email_token

    def __str__(self):
        return f'Profile – {self.user.email or self.user.username}'


class Address(models.Model):
    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addresses')
    name       = models.CharField(max_length=200)
    phone      = models.CharField(max_length=15)
    line1      = models.CharField(max_length=300)
    line2      = models.CharField(max_length=300, blank=True)
    city       = models.CharField(max_length=100)
    state      = models.CharField(max_length=100)
    pincode    = models.CharField(max_length=10)
    country    = models.CharField(max_length=100, default='India')
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-is_default', '-created_at']

    def __str__(self):
        return f'{self.name}, {self.city} – {self.pincode}'
