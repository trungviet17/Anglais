from django.shortcuts import render
from django.contrib.auth.decorators import login_required
# Create your views here.
import google.generativeai as genai
from IPython.display import display, Markdown
import markdown
import textwrap
from django.http import JsonResponse


def to_html(markdown_text):
    return markdown.markdown(markdown_text)

def to_markdown(text):
    text = text.replace('•', '  *')
    markdown_text = textwrap.indent(text, '> ', predicate=lambda _: True)
    html_content = to_html(markdown_text)
    return html_content

genai.configure(api_key='AIzaSyAQiu31Xn16o5bADkPcn4KeUJthllcH1_o')

model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])
def ask_ai(message):
    response = chat.send_message(message)
    lmew = to_markdown(response.text)
    return lmew

@login_required
def chatbot_mastermind(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        response = ask_ai(message)
        
        return JsonResponse({'message': message, 'response': response})
    return render(request, 'english_mastermind/index.html')