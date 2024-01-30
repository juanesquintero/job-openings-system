from typing import Annotated
import models
import schemas
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import SessionLocal
from config import APP_CONFIG

app = FastAPI(**APP_CONFIG)

# App origins access
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=origins,
    allow_headers=origins,
)


@app.get('/', tags=['index'])
async def index() -> dict:
    return {'api': 'Sistema de Gestion de convocatorias (SGC)'}


async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

DBSession = Annotated[Session, Depends(get_db)]

candidato_route = dict(path='/candidatos', tags=['candidatos'])


@app.get(**candidato_route)
async def get_candidatos(db: DBSession):
    return db.query(models.Cadidato).all()


@app.post(**candidato_route)
async def post_candidato(db: DBSession, candidato: schemas.Cadidato):
    db_candidato = models.Cadidato(**candidato)
    db.add(db_candidato)
    db.commit()
    db.refresh(db_candidato)
    return db_candidato


perfil_route = dict(path='/perfiles', tags=['perfiles'])


@app.get(**perfil_route)
async def get_perfiles(db: DBSession):
    return db.query(models.Perfil).all()


@app.post(**perfil_route)
async def post_perfil(db: DBSession, perfil: schemas.Perfil):
    db_perfil = models.Cadidato(**perfil)
    db.add(db_perfil)
    db.commit()
    db.refresh(db_perfil)
    return db_perfil
