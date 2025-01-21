#!/usr/bin/bash

# Create a virtual environment
python3 -m venv venv
source venv/bin/activate

# Install the required packages
python3 -m pip install -r requirements.txt

# Upgrade the database
alembic upgrade head

# Run the docker container for Qdrant
docker run -d -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant

# Seed the qdrant database
python3 -m app.utils.text_embed

# Run the FastAPI server
uvicorn app.main:app --reload --port 8002 --host
