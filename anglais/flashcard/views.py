
from typing import Any
from django.forms.forms import BaseForm
from django.shortcuts import render, redirect, get_object_or_404,  HttpResponseRedirect
from .form import WordFormset, SetForm, WordForm
from django.views.generic import ListView 

from .models import Word, StudySet
from django.contrib import  messages

from django.urls import reverse,  reverse_lazy
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.generic.detail import SingleObjectMixin
from  django.views.generic import FormView, UpdateView
from django.db import transaction

# Create your views here.

@login_required
def home_view(request): 
    return  render(request, 'base.html')


@login_required
def flash_card_home_view(request): 
    return render(request, 'flashcard/home_view.html')

@login_required
def delete_word(request, form_id, word_id):
    '''Hàm view thực hiện xóa word trong form - sử dụng button'''
    word = get_object_or_404(Word, id=word_id)

    if request.method == 'POST': 
        word.delete()
        return redirect('flashcard:update_studyset', id=form_id)
    else : 
        return JsonResponse({'status': 'error'}, status = 400)
    


@login_required
def delete_studyset(request, id): 
    '''Hàm xóa studyset tại node delete của list_studyset'''
    studyset = get_object_or_404(StudySet, pk=id)

    if request.method == "POST": 
        studyset.delete()

        return HttpResponseRedirect('/flashcard/')
    
    return redirect('flashcard:studysets')



@login_required
def new_studyset(request): 
    '''Hàm tạo studyset mới'''
    if request.method == 'POST':
            form = SetForm(request.POST)
            if form.is_valid():
                studyset = form.save(commit=False)

                studyset.user = request.user 

                studyset.save()
                if 'save' in request.POST:
                    # Nếu người dùng nhấn nút "Save"
                    return redirect('flashcard:studysets')
                elif 'saveandadd' in request.POST:
                    # Nếu người dùng nhấn nút "Save and Add Card"
                    # Chuyển hướng đến URL với ID của studyset vừa được tạo
                    return redirect(reverse('flashcard:new_word', args=[studyset.id]))
    else:
        form = SetForm()

    return render(request, 'flashcard/new_studyset.html', {'form': form})

@login_required
def new_word(request, id): 
    '''Tạo formset mới'''
    try :  
        studyset = StudySet.objects.get(id = id)

    except StudySet.DoesNotExist: 
        return redirect('flashcard:studysets')
    

    if request.method != "POST": 
        formset = WordFormset(instance = studyset)

    else : 
        formset = WordFormset(data = request.POST, instance = studyset)

        if formset.is_valid(): 

            formset.save()

        return redirect('flashcard:studysets')

    context = {'formset': formset}

    return render(request, 'flashcard/new_word.html', context = context)


# @login_required
# def update_studyset(request,  id): 
#     '''Hàm update thông tin của formset '''
#     studyset = get_object_or_404(StudySet, id=id)
#     form = SetForm(instance= studyset)
    
#     words = Word.objects.all( ).filter (studyset = id)
#     if request.method == "POST": 
#         form = SetForm(data = request.POST, instance = studyset)
       
#         if form.is_valid() :


#             form.save()
#             if 'save' in request.POST: 
#                 return redirect('flashcard:studysets')
#             elif 'addmore' in request.POST: 
#                 return redirect('flashcard:new_word', id=id)

#     return render(request, 'flashcard/edit_studyset.html', {'form': form, 'words': words})

@login_required
def edit_word(request, form_id, word_id): 

    word = get_object_or_404(Word, id = word_id )
    form = WordForm(instance=word)

    if request.method == "POST" :  
        form = WordForm(instance=word , data=request.POST)

        if form.is_valid(): 
            form.save()

            return redirect('flashcard:update_studyset', id=form_id)

    return render(request, 'flashcard/edit_word.html', {'form': form, 'word': word, 'form_id': form_id})



@login_required 
def studysets(request): 

    studysets = StudySet.objects.filter(user= request.user)

    context = {'studysets': studysets}


    return render(request, 'flashcard/studysets.html', context)


@login_required
def learn(request, id):

    studysets = get_object_or_404(StudySet, id = id)
    words = Word.objects.all().filter(studyset = id)

    if len(words) == 0  : 
        return render(request, 'flashcard/error.html', {'studysets' : studysets})

    current_indx = int(request.GET.get("index", 0))

    next_indx = (current_indx + 1) % len(words)

    prev_indx = (current_indx - 1) % len(words)
    
    word_num =  len(words)
    context = {
        "studysets" : studysets, 
        "curr_word" : words[current_indx],
        "next_indx" : next_indx,
        "prev_indx" : prev_indx, 
        "word_num" : word_num, 
        "curr_indx" : current_indx
    }

    return render(request, 'flashcard/learn.html', context) 




class StudySetWordUpdateView(UpdateView) : 

    model = StudySet
    form_class = SetForm
    template_name = 'flashcard/edit_studyset.html'
    login_required = True 
    success_url = reverse_lazy('flashcard:studysets')

    def get_context_data(self, **kwargs):
        data = super().get_context_data(**kwargs)
        if self.request.POST:
            data['word_formset'] = WordFormset(self.request.POST, instance=self.object)
        else:
            data['word_formset'] = WordFormset(instance=self.object)
        return data


    def form_valid(self, form):
        
        context = self.get_context_data()
        word_formset = context['word_formset']
        
        with transaction.atomic():
            if word_formset.is_valid():
                
                word_formset.instance = self.object
                word_formset.save()
            else : print(word_formset.errors)
            self.object = form.save()
            
        return super().form_valid(form)
    

    def form_invalid(self, form, word_formset):
        return self.render_to_response(
            self.get_context_data(form=form, word_formset=word_formset)
        )
   

    