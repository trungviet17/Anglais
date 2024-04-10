from django import forms

class LoginForm(forms.Form): 
    """ Đây là login form  của tài khoản người dùng, Password được truyền vào có widget là passwordinput """
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)

