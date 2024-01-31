# import sys
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline, T5ForConditionalGeneration, T5Tokenizer
import numpy as np
import torch
from sentence_transformers import SentenceTransformer, util
import os
import openai
openai.api_key = "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"

# inputSentence = sys.argv[1]
# print(f'THE INPUT SENTENCE IS: {inputSentence}')

device = "cuda" if torch.cuda.is_available() else "cpu"

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
extractionModel = pipeline(
    'question-answering', model="deepset/roberta-base-squad2", tokenizer="deepset/roberta-base-squad2")

extractionModel = pipeline(
    "question-answering", model="deepset/bert-large-uncased-whole-word-masking-squad2")


nodes = [
    'AccountForm;||Name|What is the Name of the person?,Address|Where does the person live?,Preference|What is the Preference? (Mr or Mrs or Ms)||; Represents a user information form that requires Name, Address, Preference information from the user. e.g. "My name is Crosby, I live at Cornell St. and prefer Mr", Hi I\'m Mrs Lily, I reside in Toronto',
    'Weather;||City|What is the location?||; A sub-node of "Weather," it represents the point where location or query details are input for weather-related inquiries. e.g. Whats it like in Brazil, "how we feeling outside","What does it feel like outside in Germany Berlin?,"whats it like in Sydney","How we doing in Canada, say, Toronto"',
    'Calculator;||promptSequence|What is the full arithmetic?||; A sub-node of "Calculator," it is the point where mathematical expressions or calculations are input for processing, e.g., 3*3+128, 2+2*23, 3 times 3 plus 128,"add 10 to 5 times 2","Add 15 to 3"'
]

nodes = [
    # 'AccountForm;||Name|What is the Name of the person?,Address|Where does the person live?,Preference|What is the Preference? (Mr or Mrs or Ms)||; Represents a user information form that requires Name, Address, Preference information from the user. e.g. "My name is Crosby, I live at Cornell St. and prefer Mr", Hi I\'m Mrs Lily, I reside in Toronto',
    'AccountForm;||Name|What is the Name of the person?,Address|What is the location?,Email|What is my email?||; Represents a user information form that requires Name, Address, Preference information from the user. e.g. "My name is Crosby, I live at Cornell St. and prefer Mr", Hi I\'m Mrs Lily, I reside in Toronto',
    'Weather;||City|What is the location?||; A sub-node of "Weather," it represents the point where location or query details are input for weather-related inquiries. e.g. Whats it like in Brazil, "how we feeling outside","What does it feel like outside in Germany Berlin?,"whats it like in Sydney","How we doing in Canada, say, Toronto"',
    'Calculator;||promptSequence|What is the full arithmetic?||; A sub-node of "Calculator," it is the point where mathematical expressions or calculations are input for processing, e.g., 3*3+128, 2+2*23, 3 times 3 plus 128,"add 10 to 5 times 2","Add 15 to 3"'
]

# FOR ADVANCED CALCULATOR

tokenizer = T5Tokenizer.from_pretrained('t5-base')
t5_model = T5ForConditionalGeneration.from_pretrained('t5-base')
t5_model.load_state_dict(torch.load('t5-base-advanced_calc.pth'))
t5_model = t5_model.to(device)


def getCandidateV2(input):

    input_encoded = model.encode(input, convert_to_tensor=True)
    node_encoded = model.encode(nodes, convert_to_tensor=True)

    cosine_score = util.cos_sim(input_encoded, node_encoded)
    most_similar = cosine_score.argmax().item()


    res = nodes[most_similar]
    res = nodes[most_similar].split(';')
    print(res[0])

    if res[0] == "Calculator":
        token = tokenizer.encode("Extract the arithmetic expression: " + input, return_tensors='pt', padding='max_length', max_length=75, truncation=True).to(device)
        output_sequences = t5_model.generate(input_ids = token, max_length=50)
        output_text = tokenizer.decode(output_sequences[0], skip_special_tokens=True)
        output_text = output_text.replace('"',"")
        answers = f'{{"promptSequence": "{output_text}"}}'

    else:

        questions = res[1][2:-2].split(',')
        answers = {}

        for question in questions:
            question = question.split('|')
            answer = extractionModel(
                {'context': input, 'question': question[1]})
            answers[question[0]] = (answer['answer'])

        answers = str(answers).replace("'", "\"")

    return '{"CurrentApp":"' + res[0] + '","Config":' + answers + "}"
