from django.db import models
from django.contrib.auth.models import User


class OfferGroup(models.Model):
    name         = models.CharField(max_length=200)
    description  = models.TextField(blank=True)
    discount_pct = models.IntegerField(default=0, help_text='Discount 0-100%')
    badge_label  = models.CharField(max_length=60, blank=True, help_text='e.g. SALE 20% OFF')
    badge_color  = models.CharField(max_length=20, default='#c62828')
    is_active    = models.BooleanField(default=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.name


class Category(models.Model):
    name        = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=300, blank=True)
    sort_order  = models.IntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', 'name']
        verbose_name_plural = 'Categories'

    def __str__(self):
        return self.name


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('our_products', 'Our Products'),
        ('new_arrival',  'New Arrival'),
    ]
    title       = models.CharField(max_length=200)
    slug        = models.SlugField(max_length=200, unique=True, help_text='URL id, e.g. choco-bytes')
    description = models.TextField()
    price       = models.DecimalField(max_digits=10, decimal_places=2)
    image       = models.ImageField(upload_to='products/')
    video       = models.FileField(upload_to='products/videos/', blank=True, null=True)
    category         = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='our_products')
    product_category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    offer_group = models.ForeignKey(OfferGroup, on_delete=models.SET_NULL, null=True, blank=True, related_name='products')
    badge         = models.CharField(max_length=50, blank=True, help_text='Badge text e.g. NEW ✨')
    badge_color   = models.CharField(max_length=20, default='#1565C0', blank=True)
    card_bg       = models.CharField(max_length=20, default='#f4f7ff', blank=True, help_text='Image area background colour')
    # Product detail info
    product_type  = models.CharField(max_length=100, blank=True, help_text='e.g. Bites & Crunchies')
    weights       = models.CharField(max_length=200, default='100g,200g,500g', help_text='Comma-separated e.g. 100g,200g,500g')
    ingredients   = models.TextField(blank=True, help_text='Comma-separated e.g. Whole Millet, Jaggery, Cocoa')
    nut_calories  = models.CharField(max_length=50, blank=True, verbose_name='Calories (per 100g)')
    nut_protein   = models.CharField(max_length=50, blank=True, verbose_name='Protein')
    nut_fat       = models.CharField(max_length=50, blank=True, verbose_name='Fat')
    nut_carbs     = models.CharField(max_length=50, blank=True, verbose_name='Carbs')
    nut_fibre     = models.CharField(max_length=50, blank=True, verbose_name='Fibre')
    # ── Extended info ────────────────────────────────────────────
    short_description    = models.CharField(max_length=300, blank=True)
    brand                = models.CharField(max_length=100, blank=True)
    sku                  = models.CharField(max_length=100, blank=True)
    discount_price       = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock_quantity       = models.IntegerField(default=0)
    track_inventory      = models.BooleanField(default=False, help_text='If on, stock_quantity is enforced (0 = out of stock). If off, unlimited stock.')
    max_order_qty        = models.PositiveIntegerField(default=0, help_text='Max units of this product per order. 0 = no limit.')
    gst_rate             = models.DecimalField(max_digits=5, decimal_places=2, default=5, help_text='GST %% (prices are GST-inclusive). Snacks are usually 5, 12 or 18.')
    # ── Packaging & origin ──────────────────────────────────────
    package_size         = models.CharField(max_length=100, blank=True)
    country_of_origin    = models.CharField(max_length=100, blank=True, default='India')
    shelf_life           = models.CharField(max_length=100, blank=True)
    storage_instructions = models.TextField(blank=True)
    manufacturer_details = models.TextField(blank=True)
    # ── Extra nutrition ─────────────────────────────────────────
    nut_saturated_fat    = models.CharField(max_length=50, blank=True, verbose_name='Saturated Fat')
    nut_trans_fat        = models.CharField(max_length=50, blank=True, verbose_name='Trans Fat')
    nut_sugar            = models.CharField(max_length=50, blank=True, verbose_name='Sugar')
    nut_sodium           = models.CharField(max_length=50, blank=True, verbose_name='Sodium')
    # ── Recipe ──────────────────────────────────────────────────
    recipe_name          = models.CharField(max_length=200, blank=True)
    recipe_prep_time     = models.CharField(max_length=50, blank=True)
    recipe_cook_time     = models.CharField(max_length=50, blank=True)
    recipe_servings      = models.CharField(max_length=50, blank=True)
    recipe_ingredients   = models.TextField(blank=True)
    recipe_instructions  = models.TextField(blank=True)
    recipe_image         = models.ImageField(upload_to='products/recipes/', blank=True, null=True)
    recipe_video_url     = models.URLField(blank=True)
    # ── Health & certifications ──────────────────────────────────
    health_benefits      = models.TextField(blank=True, help_text='One benefit per line')
    cert_organic         = models.BooleanField(default=False)
    cert_non_gmo         = models.BooleanField(default=False)
    cert_vegan           = models.BooleanField(default=False)
    cert_halal           = models.BooleanField(default=False)
    cert_iso             = models.BooleanField(default=False)
    # ── Shop filters (comma-separated tags, matched against the filter sidebar) ──
    tags                 = models.TextField(blank=True, help_text='Comma-separated filter tags e.g. Kids, Sugar Free, Ragi, Protein Rich')
    # ── SEO ─────────────────────────────────────────────────────
    seo_title            = models.CharField(max_length=200, blank=True)
    seo_description      = models.TextField(blank=True)
    seo_keywords         = models.CharField(max_length=500, blank=True)
    rating        = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    reviews_count = models.IntegerField(default=0)
    is_active     = models.BooleanField(default=True)
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} (₹{self.price})'


class Review(models.Model):
    order       = models.OneToOneField('Order', on_delete=models.SET_NULL, null=True, blank=True, related_name='review')
    name        = models.CharField(max_length=100)
    photo       = models.ImageField(upload_to='reviews/', blank=True, null=True)
    review_text = models.TextField()
    rating      = models.IntegerField(default=5)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} ({self.rating}★)'


class SiteVideo(models.Model):
    title      = models.CharField(max_length=200, blank=True, help_text='Optional caption shown in admin')
    video      = models.FileField(upload_to='site_videos/')
    is_active  = models.BooleanField(default=True)
    sort_order = models.IntegerField(default=0, help_text='Lower number shown first')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['sort_order', '-created_at']

    def __str__(self):
        return self.title or f'Video #{self.pk}'


class ProductImage(models.Model):
    product    = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='gallery_images')
    image      = models.ImageField(upload_to='products/gallery/')
    sort_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['sort_order', 'id']

    def __str__(self):
        return f'Gallery image for {self.product}'


class Order(models.Model):
    STATUS_CHOICES = [
        ('pending',    'Pending'),
        ('confirmed',  'Confirmed'),
        ('processing', 'Processing'),
        ('shipped',    'Shipped'),
        ('delivered',  'Delivered'),
        ('cancelled',  'Cancelled'),
    ]
    user       = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    name       = models.CharField(max_length=200)
    phone      = models.CharField(max_length=20)
    address    = models.TextField()
    items      = models.JSONField()
    total      = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal   = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # taxable value (total − GST)
    gst_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # GST component of total (inclusive pricing)
    PAYMENT_STATUS = [
        ('pending',     'Pending'),
        ('paid',        'Paid Online'),
        ('cod',         'Cash on Delivery'),
        ('failed',      'Payment Failed'),
    ]
    PAYMENT_STATUS += [
        ('partially_refunded', 'Partially Refunded'),
        ('refunded',           'Refunded'),
        ('refund_failed',      'Refund Failed — Manual Review'),
    ]
    status              = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    payment_method      = models.CharField(max_length=50, blank=True, default='')
    payment_status      = models.CharField(max_length=20, choices=PAYMENT_STATUS, default='pending')
    razorpay_order_id   = models.CharField(max_length=100, blank=True, db_index=True)
    razorpay_payment_id = models.CharField(max_length=100, blank=True)
    razorpay_refund_id  = models.CharField(max_length=100, blank=True)
    created_at          = models.DateTimeField(auto_now_add=True)

    coupon         = models.ForeignKey(
        'Coupon', on_delete=models.SET_NULL, null=True, blank=True, related_name='orders'
    )
    coupon_code    = models.CharField(max_length=50, blank=True)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    refunded_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # cumulative refunded
    coupon_released = models.BooleanField(default=False)  # guard so a cancel can't double-decrement coupon usage

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['user', '-created_at']),
        ]

    def __str__(self):
        return f'Order #{self.id} — {self.name} (₹{self.total})'


class OrderStatusLog(models.Model):
    order       = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='status_logs')
    from_status = models.CharField(max_length=20, blank=True)
    to_status   = models.CharField(max_length=20)
    changed_by  = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    note        = models.CharField(max_length=255, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Order #{self.order_id}: {self.from_status or "—"} → {self.to_status}'


# ── Cart ──────────────────────────────────────────────────────────────────────

class Cart(models.Model):
    user       = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cart')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def get_total(self):
        total = sum(item.get_subtotal() for item in self.items.select_related('product').all())
        return round(total, 2)

    def __str__(self):
        return f'Cart – {self.user.username} ({self.items.count()} items)'


class CartItem(models.Model):
    cart     = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty      = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('cart', 'product')

    def get_subtotal(self):
        price = float(self.product.discount_price or self.product.price)
        return round(price * self.qty, 2)

    def __str__(self):
        return f'{self.product.title} × {self.qty}'


# ── Coupon ────────────────────────────────────────────────────────────────────

class Coupon(models.Model):
    DISCOUNT_TYPE_CHOICES = [
        ('percent', 'Percentage'),
        ('flat',    'Flat Amount'),
    ]
    code            = models.CharField(max_length=50, unique=True, db_index=True)
    description     = models.CharField(max_length=200, blank=True)
    discount_type   = models.CharField(max_length=10, choices=DISCOUNT_TYPE_CHOICES, default='percent')
    discount_value  = models.DecimalField(max_digits=10, decimal_places=2)
    min_order_value = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_discount    = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        help_text='Cap for percentage discounts. Leave blank for no cap.',
    )
    valid_from  = models.DateTimeField()
    valid_until = models.DateTimeField()
    max_uses    = models.IntegerField(default=100)
    used_count  = models.IntegerField(default=0)
    is_active   = models.BooleanField(default=True)
    created_at  = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        symbol = '%' if self.discount_type == 'percent' else '₹'
        return f'{self.code} – {self.discount_value}{symbol}'

    def calculate_discount(self, order_total):
        """Return discount rupee amount for a given cart total."""
        total = float(order_total)
        if total < float(self.min_order_value):
            return 0.0
        if self.discount_type == 'percent':
            disc = total * float(self.discount_value) / 100
            if self.max_discount:
                disc = min(disc, float(self.max_discount))
        else:
            disc = float(self.discount_value)
        return round(min(disc, total), 2)


# ── Blog ──────────────────────────────────────────────────────────────────────

class BlogPost(models.Model):
    title        = models.CharField(max_length=200)
    slug         = models.SlugField(unique=True, blank=True, max_length=220)
    cover_image  = models.ImageField(upload_to='blog/', blank=True, null=True)
    excerpt      = models.TextField(max_length=400, blank=True, help_text='Short summary shown on the list page')
    content      = models.TextField(help_text='Full article body (HTML allowed)')
    author       = models.CharField(max_length=100, default='Malola Team')
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at   = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            from django.utils.text import slugify
            base = slugify(self.title) or 'post'
            slug = base
            n = 1
            while BlogPost.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f'{base}-{n}'
                n += 1
            self.slug = slug
        super().save(*args, **kwargs)
