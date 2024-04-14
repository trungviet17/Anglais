from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login
from .form import LoginForm, UserRegistrationForm, UserEditForm, ProfileEditForm
from django.contrib.auth.decorators import login_required
from .models import Profile
from django.contrib import messages


# Create your views here.

@login_required
def dashboard(request): 
    return render(request, 'dashboard.html')


def landing_page(request): 
    return render(request, 'landing_page.html')



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
            Profile.objects.create(user=new_user)
            return render(request, 'account/register_done.html', {'new_user': new_user})
        
    userform = UserRegistrationForm()

    return render(request, 'account/register.html', {'userform': userform})

@login_required
def edit(request): 

    if request.method == 'POST': 
        user_form = UserEditForm(instance=request.user, data=request.POST)

        profile_form = ProfileEditForm(
                    instance=request.user.profile,
                    data=request.POST,
                    files=request.FILES)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, 'Profile update', 'successfully')
        else: 
            messages.error(request, "Profile update", 'unsuccessfully')

    else:
        user_form = UserEditForm(instance=request.user)
        profile_form = ProfileEditForm(instance=request.user.profile)

    return render(request, 'account/edit.html', {'user_form': user_form, 'profile_form': profile_form})