from sqlalchemy import Column, ForeignKey, Integer, String, DateTime
from db import Base


class Cadidato(Base):
    __tablename__ = "candidatos"

    correo = Column(String, index=True, nullable=False, primary_key=True)
    nombre = Column(String, index=True, nullable=False)


class Perfil(Base):
    __tablename__ = "perfiles"

    candidato = Column(
        String,
        ForeignKey("candidatos.correo"),
        index=True, nullable=False, primary_key=True
    )
    rasgo = Column(String, index=True, nullable=False, primary_key=True)
    fecha = Column(DateTime, nullable=False, primary_key=True)
    calificacion = Column(Integer, nullable=False)
    justificacion = Column(String, nullable=True)
