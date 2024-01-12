# to run in terminal use:
# "python3.10 -m uvicorn main:app --reload"

# to run for online server use:
# python3.10 -m uvicorn main:app --reload --host 0.0.0.0 --port 63030    ?

# to run for online server WITH SSL use:
# python3.10 -m uvicorn main:app --host 0.0.0.0 --port 63030 --ssl-keyfile=./ZERO_SSL/private.key --ssl-certfile=./ZERO_SSL/certificate.crt

# I don't know if the live reload works, seems to if you don't save again before it reloads
# python3.10 -m uvicorn main:app --reload --host 0.0.0.0 --port 63030 --ssl-keyfile=./ZERO_SSL/private.key --ssl-certfile=./ZERO_SSL/certificate.crt

from fastapi import FastAPI, UploadFile, HTTPException, Form, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, PlainTextResponse
import shutil
from pathlib import Path
# from uiControl import getCandidate
from uiControl import getCandidateV2
from voiceRecog import VoiceRecognition
import os
app = FastAPI()


# Add CORS middleware
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost:3001",
    "https://thesisproject.mekaelwasti.com",
    "https://thesisproject.mekaelwasti.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/upload_audio/")
async def upload_audio(file: UploadFile = File(...)):
    try:
        with open("uploaded_file.wav", "wb") as buffer:
            buffer.write(file.file.read())

        transcription = VoiceRecognition("uploaded_file.wav")
        # res = getCandidate(transcription)
        res = getCandidateV2(transcription)
        print("GET CANDIDATE: ", res)

        # Convert res to a string and include it in the message of the response
        return JSONResponse(content={"message": f"{str(res)}"}, status_code=200)
        # return PlainTextResponse(content=res, status_code=200)

    except Exception as e:
        return JSONResponse(content={"message": f"Error: {e}"}, status_code=500)
        # return PlainTextResponse(content=f"Error: {e}", status_code=500)


@app.post("/get_action")
def getAction(prompt: str = Form(...)):
    print(f'RECIEVED: {prompt}')
    # res = getCandidate(prompt)
    res = getCandidateV2(prompt)
    print("RES:", res)
    # res = prompt

    return res