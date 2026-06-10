from django.urls import path
from . import views

urlpatterns = [
    path('api/track/<int:order_id>/',               views.track_order,          name='track_order'),
    path('api/shipping/<int:order_id>/create/',      views.create_shipment,      name='create_shipment'),
    path('api/shipping/<int:order_id>/cancel/',      views.cancel_shipment,      name='cancel_shipment'),
    path('api/shipping/serviceability/',             views.check_serviceability, name='check_serviceability'),
]
