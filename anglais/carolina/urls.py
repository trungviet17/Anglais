from django.urls import path
from . import views

app_name = 'carolina'

urlpatterns = [
    path('', views.index, name='index'),

]