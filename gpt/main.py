import openai
from time import sleep
from mangum import Mangum
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config import Settings

app = FastAPI()
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


@app.post(path='/chat', tags=['gpt'])
def chat(data: ChatData):
    thread_id = data.get('thread_id')
    user_input = data.get('message', '')
    if not thread_id:
        return {"error": "Falta thread_id"}, 400

    # Añadiendo la respuesta del cliente al hilo de la conversación e iniciando el asistente
    client.beta.threads.messages.create(
        thread_id=thread_id,
        role="user",
        content=user_input
    )
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=assistant.id
    )

    while client.beta.threads.runs.retrieve(
        thread_id=thread_id,
        run_id=run.id
    ).status != 'completed':
        sleep(1)

    # Imprimiendo la respuesta
    messages = client.beta.threads.messages.list(thread_id=thread_id)
    response = messages.data[0].content[0].text.value
    return {"response": response}
