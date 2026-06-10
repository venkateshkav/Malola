from django.urls import path
from . import views

urlpatterns = [
    # public pages
    path('',        views.home,        name='home'),
    path('shop/',   views.shop,        name='shop'),
    path('product/', views.product,    name='product'),
    path('orders/', views.orders_page, name='orders'),

    # product admin panel
    path('manage/',                         views.manage_products,      name='manage_products'),
    path('manage/add/',                     views.manage_add_product,   name='manage_add'),
    path('manage/edit/<int:pk>/',           views.manage_edit_product,  name='manage_edit'),
    path('manage/delete/<int:pk>/',         views.manage_delete_product, name='manage_delete'),
    path('manage/products/<int:pk>/gallery/<int:img_pk>/delete/', views.manage_delete_gallery_image, name='manage_delete_gallery_image'),
    # orders admin
    path('manage/orders/',                   views.manage_orders,         name='manage_orders'),
    path('manage/orders/<int:pk>/status/',   views.manage_order_status,   name='manage_order_status'),
    path('manage/orders/export/csv/',        views.export_orders_csv,     name='export_orders_csv'),
    path('manage/orders/export/excel/',      views.export_orders_excel,   name='export_orders_excel'),
    path('manage/orders/export/print/',      views.export_orders_print,   name='export_orders_print'),
    # offers admin
    path('manage/offers/',                  views.manage_offers,        name='manage_offers'),
    path('manage/offers/add/',              views.manage_add_offer,     name='manage_add_offer'),
    path('manage/offers/edit/<int:pk>/',    views.manage_edit_offer,    name='manage_edit_offer'),
    path('manage/offers/delete/<int:pk>/',  views.manage_delete_offer,  name='manage_delete_offer'),
    # categories admin
    path('manage/categories/',                     views.manage_categories,      name='manage_categories'),
    path('manage/categories/add/',                 views.manage_add_category,    name='manage_add_category'),
    path('manage/categories/edit/<int:pk>/',       views.manage_edit_category,   name='manage_edit_category'),
    path('manage/categories/delete/<int:pk>/',     views.manage_delete_category, name='manage_delete_category'),
    # reviews — admin view + customer submission
    path('manage/reviews/',                 views.manage_reviews,       name='manage_reviews'),
    path('manage/reviews/delete/<int:pk>/', views.manage_delete_review, name='manage_delete_review'),
    path('review/<int:order_pk>/',          views.submit_review,        name='submit_review'),
    # videos admin
    path('manage/videos/',                  views.manage_videos,        name='manage_videos'),
    path('manage/videos/upload/',           views.manage_upload_video,  name='manage_upload_video'),
    path('manage/videos/delete/<int:pk>/',  views.manage_delete_video,  name='manage_delete_video'),
    path('manage/videos/toggle/<int:pk>/',  views.manage_toggle_video,  name='manage_toggle_video'),

    # checkout & payment
    path('checkout/<int:order_id>/',     views.checkout_page,           name='checkout'),
    path('api/razorpay-order/',          views.create_razorpay_order,   name='razorpay_order'),
    path('api/verify-payment/',          views.verify_payment,          name='verify_payment'),
    path('api/confirm-cod/',             views.confirm_cod,             name='confirm_cod'),
    path('api/razorpay-webhook/',        views.razorpay_webhook,        name='razorpay_webhook'),
    path('api/payment-failed/',          views.record_payment_failure,  name='payment_failed'),

    # product list (used by search widget)
    path('api/products/',                views.product_list_api,  name='product_list_api'),

    # order API
    path('api/place-order/',             views.place_order,       name='place_order'),
    path('api/orders/<int:order_id>/',   views.get_order,         name='get_order'),
    path('api/saved-address/',           views.get_saved_address, name='saved_address'),

    # auth API
    path('api/register/', views.register_view, name='register'),
    path('api/login/',    views.login_view,    name='login'),
    path('api/logout/',   views.logout_view,   name='logout'),

    # password reset (OTP-based)
    path('api/request-password-reset/',  views.request_password_reset,  name='request_password_reset'),
    path('api/confirm-password-reset/',  views.confirm_password_reset,   name='confirm_password_reset'),

    # coupon API
    path('api/apply-coupon/',            views.apply_coupon,            name='apply_coupon'),

    # DB cart sync
    path('api/cart/sync/',               views.sync_cart,               name='sync_cart'),
    path('api/cart/',                    views.get_db_cart,             name='get_db_cart'),

    # wishlist
    path('api/wishlist/',                views.get_wishlist,            name='get_wishlist'),
    path('api/wishlist/toggle/',         views.toggle_wishlist,         name='toggle_wishlist'),

    # pincode check
    path('api/check-pincode/',           views.check_pincode,           name='check_pincode'),

    # admin — coupons
    path('manage/coupons/',                     views.manage_coupons,            name='manage_coupons'),
    path('manage/coupons/add/',                 views.manage_add_coupon,         name='manage_add_coupon'),
    path('manage/coupons/edit/<int:pk>/',       views.manage_edit_coupon,        name='manage_edit_coupon'),
    path('manage/coupons/delete/<int:pk>/',     views.manage_delete_coupon,      name='manage_delete_coupon'),

    # admin — users
    path('manage/users/',                             views.manage_users,               name='manage_users'),
    path('manage/users/<int:pk>/',                    views.manage_user_detail,         name='manage_user_detail'),
    path('manage/users/<int:pk>/toggle-staff/',       views.manage_user_toggle_staff,   name='manage_user_toggle_staff'),
    path('manage/users/<int:pk>/reset-password/',     views.manage_user_reset_password, name='manage_user_reset_password'),

    # admin — carts
    path('manage/carts/',                       views.manage_carts,                name='manage_carts'),

    # admin — shipments
    path('manage/shipments/',                   views.manage_shipments,            name='manage_shipments'),
]
