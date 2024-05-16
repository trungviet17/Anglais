from transformers import VitsModel, AutoTokenizer

import torch
import torchaudio


model = VitsModel.from_pretrained("facebook/mms-tts-eng")
tokenizer = AutoTokenizer.from_pretrained("facebook/mms-tts-eng")

text = "Tim and Sally went to the park. They saw ducks in the pond. Tim had a red ball. He threw it, and Sally caught it. The sun was bright. They had a fun day."
inputs = tokenizer(text, return_tensors="pt")
with torch.no_grad():
    output = model(**inputs).waveform
output_path = "../static/audio/output.wav"

# Write the tensor to an audio file
torchaudio.save(output_path, output, sample_rate=15000)