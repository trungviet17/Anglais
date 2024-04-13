from django.urls import path, include
from . import views
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('',include('django.contrib.auth.urls')),
    path('', views.landing_page, name='landing_page'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('register/', views.register, name='register'),
    path('edit/', views.edit, name='edit'),
]