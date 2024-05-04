from django.urls import path 

from . import views
from django.conf import settings 
from django.conf.urls.static import static
from .views import StudySetWordUpdateView


app_name = 'flashcard'

urlpatterns = [
    # path('', views.home_view, name = 'home'),
    # path('', views.flash_card_home_view , name = "flash_card_home_view"),
    
    # tạo ra một studyset mới 
    path('new_studyset/', views.new_studyset, name="new_studyset"), 
    path('update/<int:pk>' , StudySetWordUpdateView.as_view(), name="update_studyset"), 
    path('delete-word/<int:form_id>/<int:word_id>', views.delete_word, name = 'delete_word'), 
    path('', views.studysets, name="studysets"),
    path('new_word/<int:id>',views.new_word, name = "new_word"),
    path('delete-studyset/<int:id>', views.delete_studyset, name= "delete_studyset"), 
    path('edit-word/<int:form_id>/<int:word_id>', views.edit_word, name="edit_word"), 
    path('learn/<int:id>',  views.learn, name='learn'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
