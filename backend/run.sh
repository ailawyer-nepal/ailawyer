docker run -d -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant

source venv/bin/activate
uvicorn app.main:app --reload --port 8002 --host
