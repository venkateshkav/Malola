from django.contrib import admin
from .models import (
    Order, Product, Category, OfferGroup, ProductImage,
    Review, SiteVideo, Cart, CartItem, Coupon,
)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display        = ('id', 'title', 'category', 'price', 'discount_price', 'stock_quantity', 'is_active', 'created_at')
    list_filter         = ('category', 'is_active', 'product_category')
    search_fields       = ('title', 'slug', 'description', 'sku', 'brand')
    prepopulated_fields = {'slug': ('title',)}
    list_editable       = ('is_active', 'stock_quantity')
    readonly_fields     = ('created_at', 'updated_at')
    ordering            = ('-created_at',)


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display    = ('id', 'name', 'phone', 'total', 'discount_amount', 'coupon_code', 'payment_status', 'status', 'created_at')
    list_filter     = ('status', 'payment_status', 'payment_method')
    search_fields   = ('name', 'phone', 'address', 'razorpay_order_id', 'razorpay_payment_id', 'coupon_code')
    list_editable   = ('status',)
    readonly_fields = ('created_at', 'razorpay_order_id', 'razorpay_payment_id')
    ordering        = ('-created_at',)
    date_hierarchy  = 'created_at'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display   = ('id', 'name', 'image_preview', 'sort_order', 'is_active', 'created_at')
    list_editable  = ('sort_order', 'is_active')
    search_fields  = ('name',)
    readonly_fields = ('image_preview',)

    @admin.display(description='Preview')
    def image_preview(self, obj):
        from django.utils.html import format_html
        if obj.image:
            return format_html('<img src="{}" style="height:60px;border-radius:6px;object-fit:cover">', obj.image.url)
        return '—'


@admin.register(OfferGroup)
class OfferGroupAdmin(admin.ModelAdmin):
    list_display  = ('id', 'name', 'discount_pct', 'badge_label', 'is_active', 'created_at')
    list_editable = ('is_active',)
    search_fields = ('name', 'badge_label')


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display  = ('id', 'product', 'sort_order')
    list_editable = ('sort_order',)
    search_fields = ('product__title',)


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display  = ('id', 'name', 'rating', 'is_active', 'created_at')
    list_filter   = ('is_active', 'rating')
    search_fields = ('name', 'review_text')
    list_editable = ('is_active',)
    readonly_fields = ('created_at',)


@admin.register(SiteVideo)
class SiteVideoAdmin(admin.ModelAdmin):
    list_display  = ('id', 'title', 'sort_order', 'is_active', 'created_at')
    list_editable = ('sort_order', 'is_active')


@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display  = ('code', 'discount_type', 'discount_value', 'min_order_value', 'used_count', 'max_uses', 'is_active', 'valid_until')
    list_filter   = ('discount_type', 'is_active')
    search_fields = ('code', 'description')
    list_editable = ('is_active',)
    readonly_fields = ('used_count', 'created_at')
    ordering      = ('-created_at',)


class CartItemInline(admin.TabularInline):
    model  = CartItem
    extra  = 0
    readonly_fields = ('added_at', 'get_subtotal')

    def get_subtotal(self, obj):
        return f'₹{obj.get_subtotal()}'
    get_subtotal.short_description = 'Subtotal'


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display  = ('id', 'user', 'item_count', 'cart_total', 'updated_at')
    search_fields = ('user__username', 'user__email')
    inlines       = [CartItemInline]
    readonly_fields = ('created_at', 'updated_at')

    def item_count(self, obj):
        return obj.items.count()
    item_count.short_description = 'Items'

    def cart_total(self, obj):
        return f'₹{obj.get_total()}'
    cart_total.short_description = 'Total'
