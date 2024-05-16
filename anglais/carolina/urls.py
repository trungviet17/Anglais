from django.urls import path
from . import views

app_name = 'carolina'

urlpatterns = [
    path('', views.chatbot_mastermind, name='index'),

]