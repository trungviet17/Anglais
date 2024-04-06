from django.urls import path 
from .views import  StudySetListView
from . import views


app_name = 'flashcard'

urlpatterns = [
    path('', views.home_view, name = 'home'),
    path('flashcard/', views.flash_card_home_view , name = "flash_card_home_view"),
    # tạo ra một studyset mới 
    path('flashcard/new_studyset/', views.new_studyset, name="new_studyset"), 
    path('flashcard/update/<int:id>' , views.update_studyset, name="update_studyset"), 
    path('flashcard/delete-word/<int:id>', views.delete_word, name = 'delete_word'), 
    path('flashcard/studysets', StudySetListView.as_view(), name="studysets"),
    path('flashcard/new_word/<int:id>',views.new_word, name = "new_word"),
    path('flashcard/delete-studyset/<int:id>', views.delete_studyset, name= "delete_studyset"), 
    
]