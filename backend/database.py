import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# ============================================================
# Lokasi file SQLite.
#
# Default (lokal / tanpa env): "roadtierbers.db" di folder backend,
# sama persis seperti perilaku sebelumnya -> tidak mengubah cara kerja
# di laptop tim.
#
# Saat deploy (mis. Coolify/Docker): set environment variable
#   DATABASE_PATH=/app/data/roadtierbers.db
# lalu mount persistent volume ke /app/data, sehingga data TIDAK hilang
# setiap kali container di-redeploy.
# ============================================================
DATABASE_PATH = os.environ.get("DATABASE_PATH", "roadtierbers.db")

# Pastikan folder tujuan ada (untuk kasus path seperti /app/data/...)
_db_dir = os.path.dirname(DATABASE_PATH)
if _db_dir:
    os.makedirs(_db_dir, exist_ok=True)

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DATABASE_PATH}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
