from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from transformers import VitsModel, AutoTokenizer
import torch
import torchaudio
from django.http import HttpResponse
# Create your views here.
model = VitsModel.from_pretrained("facebook/mms-tts-eng")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-eng")

#text = "Hey there, I’m Mastermind! We’re about to have a quick chat. First up, click the button below to create a new clause. When you’re ready, just start reading it out loud."
#inputs = tokenizer(text, return_tensors="pt")
#with torch.no_grad():
#    output = model(**inputs).waveform

#output_path = "carolina/static/audio/first.wav"

#torchaudio.save(output_path, output, sample_rate=15000)


@login_required
def index(request):
    if request.method == "POST":
        message = request.POST.get('message')
        inputs = tokenizer(message, return_tensors="pt")
        with torch.no_grad():
            output = model(**inputs).waveform
        output_path = "static/audio/output.wav"
        torchaudio.save(output_path, output, sample_rate=15000)
        path = "audio/output.wav"
        return JsonResponse({'response': path})

    return render(request, 'english_mastermind/index.html')
