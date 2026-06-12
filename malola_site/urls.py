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
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

urlpatterns = [
    # Lightweight health endpoint for the platform healthcheck. No DB, no
    # template, and exempt from SSL redirect (see SECURE_REDIRECT_EXEMPT) so the
    # internal HTTP healthcheck gets a plain 200 instead of a 301-to-https.
    path('healthz', lambda request: HttpResponse('ok')),
    path('admin/', admin.site.urls),
    path('', include('store.urls')),
    path('', include('accounts.urls')),
    path('', include('shipping.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
