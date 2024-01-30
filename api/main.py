from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db import SessionLocal
from config import APP_CONFIG
from models import Cadidato, Perfil

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


@app.get('/cadidatos', tags=['candidatos'])
async def get_candidates(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return db.query(Cadidato).offset(skip).limit(limit).all()
