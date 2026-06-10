from django.contrib import admin
from .models import Shipment


@admin.register(Shipment)
class ShipmentAdmin(admin.ModelAdmin):
    list_display  = ['id', 'order', 'awb_number', 'courier_name', 'status', 'created_at']
    list_filter   = ['courier_name', 'status']
    search_fields = ['awb_number', 'shiprocket_order_id', 'order__id']
    readonly_fields = ['created_at', 'updated_at']
