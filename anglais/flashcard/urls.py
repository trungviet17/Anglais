from django.urls import path 
from .views import  StudySetListView
from . import views


app_name = 'flashcard'

urlpatterns = [
    # path('', views.home_view, name = 'home'),
    path('', views.flash_card_home_view , name = "flash_card_home_view"),
    path('english_mastermind/', views.mastermind, name="mastermind"),
    # tạo ra một studyset mới 
    path('new_studyset/', views.new_studyset, name="new_studyset"), 
    path('update/<int:id>' , views.update_studyset, name="update_studyset"), 
    path('delete-word/<int:form_id>/<int:word_id>', views.delete_word, name = 'delete_word'), 
    path('studysets', StudySetListView.as_view(), name="studysets"),
    path('new_word/<int:id>',views.new_word, name = "new_word"),
    path('delete-studyset/<int:id>', views.delete_studyset, name= "delete_studyset"), 
    path('edit-word/<int:form_id>/<int:word_id>', views.edit_word, name="edit_word"), 

]