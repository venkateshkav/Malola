from django.urls import path
from . import views

urlpatterns = [
    # Address management
    path('api/addresses/',                        views.get_addresses,          name='get_addresses'),
    path('api/addresses/add/',                    views.add_address,            name='add_address'),
    path('api/addresses/<int:addr_id>/default/',  views.set_default_address,    name='set_default_address'),
    path('api/addresses/<int:addr_id>/delete/',   views.delete_address,         name='delete_address'),

    # Email verification
    path('api/send-verification-email/',          views.send_verification_email, name='send_verification_email'),
    path('accounts/verify-email/<str:token>/',    views.verify_email,            name='verify_email'),

    # Password change (logged-in)
    path('api/change-password/',                  views.change_password,         name='change_password'),

    # Profile
    path('api/profile/',                          views.get_profile,             name='get_profile'),
    path('api/profile/update/',                   views.update_profile,          name='update_profile'),
]
