from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SGC API"

    model_config = SettingsConfigDict(env_file=".env")


app_description = '''
Sistema de Gestion de Convocatorias. API 🚀
###
'''
APP_CONFIG = dict(
    title='SGC API',
    version='0.0.1',
    description=app_description,
    contact={
        'name': 'Juan Bernardo Quintero',
        'email': 'juanbdo.quintero@gmail.com',
    },
    openapi_tags=[
        {
            'name': 'perfiles',
            'description': 'Operaciones con perfiles.',
        },
        {
            'name': 'candidatos',
            'description': 'Operaciones con candidatos.',
        },
    ]
)
