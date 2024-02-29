from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SGC GPT"

    model_config = SettingsConfigDict(env_file=".env")

    openai_api_key: str
    openai_assistant_id: str


app_description = '''
Asistente GPT del Sistema de Gestion de Convocatorias (SGC). 🚀
###
'''
APP_CONFIG = dict(
    title='SGC GPT',
    version='0.0.1',
    description=app_description,
    contact={
        'name': 'Juan Bernardo Quintero',
        'email': 'juanbdo.quintero@gmail.com',
    },
    openapi_tags=[
        {
            'name': 'gpt',
            'description': 'Operaciones con el asistente GPT del SGC.',
        },
    ]
)
