from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .form import LoginForm, UserRegistrationForm
from django.contrib.auth.decorators import login_required


# Create your views here.

@login_required
def dashboard(request): 
    return render(request, 'account/dashboard.html', {'section': 'dashboard'})



def user_login(request): 
    """Hàm view của user login"""
    if request.method == 'POST': 
        form = LoginForm(data=request.POST)

        if form.is_valid(): 
            cd = form.cleaned_data
            user = authenticate(
                request, 
                username=cd['username'], 
                password=cd['password']
            )


            if user is not None: 
                if user.is_active: 
                    login(request, user)
                    return HttpResponse('Authenticated successfully')
                else: 
                    return HttpResponse('Disabled account')
            else : 
                return HttpResponse('Invalid login')

    else : 
        form = LoginForm()
    return render(request, 'account/login.html', {'form': form})
                  
def register(request): 

    if request.method == 'POST':

        userform = UserRegistrationForm(data=request.POST)

        if userform.is_valid(): 

            new_user = userform.save(commit=False)

            new_user.set_password(userform.cleaned_data['password'])

            new_user.save()

            return render(request, 'account/register_done.html', {'new_user': new_user})
        
    userform = UserRegistrationForm()

    return render(request, 'account/register.html', {'userform': userform})