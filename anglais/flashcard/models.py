from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone 
# Create your models here.



class Folders(models.Model): 
    """Class dùng để biểu diễn đối tượng folder cho toàn bộ file """

    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.ForeignKey(User, on_delete = models.CASCADE, related_name = 'folders') #author of the folder
    
    publish = models.DateTimeField(default = timezone.now())
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self): 
        return self.title 
    

class StudySet(models.Model): 
    """Class dùng để biểu diễn tập từ vựng, nằm trong tập folder"""

    title = models.CharField(max_length = 200)
    description = models.TextField()
    # folder = models.ForeignKey(Folders, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    learning_time = models.IntegerField(default = 0)

    def __str__(self):  
        return self.title
    
class Word(models.Model): 
    """Class này dùng để biểu diễn """
    class  TypeOfWord(models.TextChoices): 
        ENGLISH = 'en'
        VIETNAMESE = 'vi'


    studyset = models.ForeignKey(StudySet, on_delete=models.CASCADE)
    ori_word = models.CharField(max_length = 30)
    trans_word = models.CharField(max_length = 150)

    or_lan = models.CharField(max_length = 3, choices = TypeOfWord.choices, default = TypeOfWord.ENGLISH)
    ne_lan = models.CharField(max_length = 3, choices = TypeOfWord.choices, default = TypeOfWord.VIETNAMESE)


    def __str__(self): 
        return self.studyset.title
    


