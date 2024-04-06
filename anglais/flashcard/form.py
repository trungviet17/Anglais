from django import forms
from .models import Word, StudySet
from django.forms import inlineformset_factory


LANGUAGE_CHOICE = (
    (1, 'English'),
    (2, 'VietNamese')
    # (3, 'French'),
    # (4, 'German'), 
    # (5, 'Spanish'),
    # (6, 'Spanish')
)





class WordForm(forms.ModelForm): 
    
    class Meta: 
        model = Word
        fields = '__all__'
        widgets = { 
            'ori_word': forms.TextInput(
                attrs={
                    'class': 'form-control'
                }
            ), 

            'trans_word': forms.TextInput(
                attrs={
                    'class': 'form-control'
                }
            )


        }


class SetForm(forms.ModelForm): 

    class Meta: 
        model = StudySet
        fields = ['title', 'description']

        widgets = {
            'title': forms.TextInput(
                attrs ={
                    'class': 'form-control'
                }
            ), 
            'description': forms.Textarea(
                attrs= {
                    'class': 'form-control'
                }
            )
        }

# can_delete và can_delete_extra dùng để tạo node có thể 
WordFormset = inlineformset_factory(StudySet, Word, form = WordForm, 
                                 extra = 1, can_delete=True, can_delete_extra = True)






