from rest_framework.routers import DefaultRouter
from django.urls import path,include

from . import views

route = DefaultRouter()

route.register(r'colegio', views.ColegioDetailView,basename= 'colegio')
route.register(r'zona', views.ZonaDetailView, basename='zona')

urlpatterns = [
        path('api/', include(route.urls))
]
