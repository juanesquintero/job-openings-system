from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from api.config import Settings

s = Settings()

DB_URI = f"postgresql://{s.db_user}:{s.db_pwd}@{s.db_host}:5432/{s.db_schema}"

engine = create_engine(
    DB_URI, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
