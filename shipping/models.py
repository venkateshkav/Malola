from django.db import models


class Shipment(models.Model):
    order               = models.OneToOneField(
        'store.Order', on_delete=models.CASCADE, related_name='shipment'
    )
    shiprocket_order_id = models.CharField(max_length=100, blank=True)
    awb_number          = models.CharField(max_length=100, blank=True)
    courier_id          = models.CharField(max_length=50, blank=True)
    courier_name        = models.CharField(max_length=100, blank=True)
    tracking_url        = models.URLField(blank=True)
    estimated_delivery  = models.DateField(null=True, blank=True)
    status              = models.CharField(max_length=100, blank=True)
    status_detail       = models.TextField(blank=True)
    created_at          = models.DateTimeField(auto_now_add=True)
    updated_at          = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return (
            f'Shipment #{self.pk} – Order #{self.order_id} – '
            f'{self.awb_number or "no AWB"}'
        )
