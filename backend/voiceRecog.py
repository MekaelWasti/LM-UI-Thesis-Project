from transformers import WhisperProcessor, WhisperForConditionalGeneration
from datasets import load_dataset
import numpy as np

import soundfile as sf
from scipy.signal import resample

# load model and processor
processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")
model.config.forced_decoder_ids = None


def VoiceRecognition(file):

    # Load the audio data from the WAV file
    # audioData, sampling_rate = sf.read('demoRecord.wav', dtype='float32')
    audioData, sampling_rate = sf.read(file, dtype='float32')

    # Ensure that the audio data is in the shape (num_samples,)
    if audioData.ndim > 1:
        audioData = audioData[:, 0]

    target_sampling_rate = 16000
    num_samples_target = int(
        audioData.shape[0] * float(target_sampling_rate) / sampling_rate)
    audioData_resampled = resample(audioData, num_samples_target)

    # Process the audio data using the Whisper processor
    # input_features = processor(audioData, sampling_rate=16000, return_tensors="pt").input_features
    input_features = processor(
        audioData_resampled, sampling_rate=target_sampling_rate, return_tensors="pt").input_features

    # Generate token ids
    predicted_ids = model.generate(input_features)

    # Decode token ids to text with special tokens included
    transcription_with_special_tokens = processor.batch_decode(
        predicted_ids, skip_special_tokens=False)

    # Decode token ids to text with special tokens removed
    transcription_without_special_tokens = processor.batch_decode(
        predicted_ids, skip_special_tokens=True)

    # print("Transcription with special tokens:", transcription_with_special_tokens)
    print("Transcription without special tokens:",
          transcription_without_special_tokens)

    return transcription_without_special_tokens[0]
