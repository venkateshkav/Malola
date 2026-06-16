"""
URL configuration for malola_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.http import HttpResponse
from django.views.static import serve as serve_media

urlpatterns = [
    # Lightweight health endpoint for the platform healthcheck. No DB, no
    # template, and exempt from SSL redirect (see SECURE_REDIRECT_EXEMPT) so the
    # internal HTTP healthcheck gets a plain 200 instead of a 301-to-https.
    path('healthz', lambda request: HttpResponse('ok')),
    path('admin/', admin.site.urls),
    path('', include('store.urls')),
    path('', include('accounts.urls')),
    path('', include('shipping.urls')),
]

# Serve user-uploaded media files. django.conf.urls.static.static() is a no-op
# when DEBUG=False, and WhiteNoise only serves STATIC_ROOT (and caches its file
# list at startup, so it would never see images uploaded after deploy). Since
# media lives on a persistent volume (DJANGO_MEDIA_ROOT, e.g. /data/media) rather
# than object storage, serve it through Django's static serve view in every
# environment so product images load in production too.
_media_prefix = settings.MEDIA_URL.lstrip('/')
urlpatterns += [
    re_path(
        rf'^{_media_prefix}(?P<path>.*)$',
        serve_media,
        {'document_root': settings.MEDIA_ROOT},
    ),
]
