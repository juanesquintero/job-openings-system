import openai
from time import sleep
from mangum import Mangum
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import Settings, APP_CONFIG

app = FastAPI(**APP_CONFIG)
handler = Mangum(app)


# App origins access
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=origins,
    allow_headers=origins,
)


class ChatData(BaseModel):
    thread_id: str
    message: str | None


settings = Settings()

client = openai.OpenAI(api_key=settings.openai_api_key)
assistant = client.beta.assistants.retrieve(
    assistant_id=settings.openai_assistant_id
)


@app.get('/', tags=['index'])
async def index() -> dict:
    return {'api': 'SGC GPT Assistant'}


@app.get(path='/start', tags=['gpt'])
async def start_conversation() -> dict:
    thread = client.beta.threads.create()
    return {"thread_id": thread.id}


@app.post(path='/upload-files',  tags=['gpt'])
async def upload_files(essay: UploadFile = File(...), cv: UploadFile = File(...)):
    essay_content = await essay.read()
    cv_content = await cv.read()

    # Send the files to the Assistant

    # with open(f'uploads/{essay.filename}', 'wb') as f:
    #     f.write(essay_content)
    # with open(f'uploads/{cv.filename}', 'wb') as f:
    #     f.write(cv_content)

    return {
        "essay": essay.filename,
        "cv": cv.filename,
    }


@app.post(path='/chat', tags=['gpt'])
async def chat(data: ChatData):
    thread_id = data.thread_id
    prompt_msg = data.message if data.message else ''
    if not thread_id:
        return {"error": "Falta thread_id"}

    # Añadiendo la respuesta del cliente al hilo de la conversación e iniciando el asistente
    # Add the user's message to the thread
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=prompt_msg,

    )
    # Run the Assistant
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=settings.openai_assistant_id
    )
  # Check if the Run requires action (function call)
    while True:
        run_status = client.beta.threads.runs.retrieve(
            thread_id=thread_id,
            run_id=run.id
        )

        print(f"Run status: \n{run_status.status}\n\n")

        if run_status.status == 'completed':
            # Retrieve and return the latest message from the assistant
            # Imprimiendo la respuesta
            messages = client.beta.threads.messages.list(thread_id=thread_id)
            response = messages.data[0].content[0].text.value

            return {
                "response": response,
                "usage": dict(run_status.usage)
            }

        if run_status.status == 'failed':
            return {
                "error": run_status.last_error.code,
                "detail": run_status.last_error.message,
            }

        sleep(1)  # Wait for a second before checking again
