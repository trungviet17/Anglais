from django.urls import path
from . import views

app_name = 'english_mastermind'

urlpatterns = [
    path('', views.chatbot_mastermind, name='index'),

]