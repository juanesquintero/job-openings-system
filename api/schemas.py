from datetime import datetime
from pydantic import BaseModel


class Cadidato(BaseModel):
    correo: str
    nombre: str


class Perfil(BaseModel):
    candidato: str
    rasgo: str
    fecha: datetime
    calificacion: int
    justificacion: str
