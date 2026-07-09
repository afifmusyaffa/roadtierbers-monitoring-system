# ============================================================
# OMNI-ROAD Backend - Dockerfile
# Build terkontrol untuk dependency berat (torch + tensorflow + ultralytics).
# Lebih andal daripada auto-builder untuk kasus ini.
#
# Base image "slim" + install OS deps yang dibutuhkan opencv/torch.
# ============================================================
FROM python:3.11-slim

# Dependency sistem untuk OpenCV (libGL, glib) & utilitas build
RUN apt-get update && apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Batasi thread agar tidak meledak di server RAM kecil saat inference
ENV OMP_NUM_THREADS=2 \
    OPENBLAS_NUM_THREADS=2 \
    MKL_NUM_THREADS=2 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

# Install torch versi CPU-only lebih dulu dari index resmi PyTorch.
# Ini memangkas ukuran (tanpa CUDA) & mempercepat build di server tanpa GPU.
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu \
    torch==2.12.1 torchvision==0.27.1

# Install sisa dependency
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin kode aplikasi
COPY . .

# Folder data untuk SQLite persisten (mount volume ke sini saat deploy)
RUN mkdir -p /app/data
ENV DATABASE_PATH=/app/data/roadtierbers.db

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
