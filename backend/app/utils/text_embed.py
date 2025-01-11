"""To encode the json data and store it in the Qdrant collection"""

import os
import requests
import numpy as np
import json
# from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.feature_extraction.text import TfidfVectorizer
# from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance, PointStruct
# from app.services.vectorizer_manager import VectorizerManager
from app.services.qdrant_client_init import get_qdrant_client
from dotenv import load_dotenv
load_dotenv()

AZURE_API_KEY = os.environ.get("AZURE_API_KEY")
AZURE_ENDPOINT = os.environ.get("AZURE_ENDPOINT")
DEPLOYMENT_NAME = "text-embedding-ada-002"

qdrant_client = get_qdrant_client()


def generate_embeddings(texts):
    """ Generate embeddings for the given texts using Azure Text Analytics API """
    url = f"{AZURE_ENDPOINT}/openai/deployments/{DEPLOYMENT_NAME}/embeddings?api-version=2023-05-15"
    headers = {
        "Content-Type": "application/json",
        "api-key": AZURE_API_KEY,
    }

    embeddings = []
    for text in texts:
        data = {"input": text}
        response = requests.post(url, headers=headers, json=data)
        if response.status_code == 200:
            embedding = response.json()["data"][0]["embedding"]
            embeddings.append({"text": text, "embedding": embedding})
        else:
            print(f"Error: {response.status_code}, {response.text}")

    return np.array(embeddings)


def create_hybrid_embeddings(chunks):
    """
    Creates both BERT and TF-IDF embeddings for each chunk's full text.

    Args:
        chunks (list[dict]): List of processed chunks

    Returns:
        tuple: (bert embeddings, TF-IDF embeddings, processed texts)
    """
    processed_texts = [chunk['full_text'] for chunk in chunks]

    # Convert to numpy array with shape (num_chunks, 1024)
    text_embeddings = generate_embeddings(processed_texts)
    print(f"Created TEXT embeddings with shape: {text_embeddings.shape}")

    return (text_embeddings, processed_texts)


def process_json_chunks(json_chunks):
    """
    Process JSON chunks to create separate entries for each content array element.
    Each element will include section number and title.

    Args:
        json_chunks (list): List of dictionaries containing chunk data

    Returns:
        list[dict]: Processed chunks with individual content elements
    """

    processed_chunks = []
    for chunk in json_chunks:
        section_num = chunk['section_num']
        title = chunk['title']
        content_array = chunk['content'] if isinstance(chunk['content'], list) else [chunk['content']]

        for content_element in content_array:
            processed_chunk = {
                'section_num': str(section_num),
                'title': title,
                'content': content_element.strip(),
                'full_text': f"Section {section_num}: {title}\n\n{content_element.strip()}"
            }
            processed_chunks.append(processed_chunk)

    return processed_chunks


def store_embeddings_in_db(file_path, collection_name, client):
    """Store embeddings in Qdrant collection"""
    try:
        print(f"Using file path: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            json_chunks = json.load(f)
    except FileNotFoundError:
        print("Error: JSON file not found")
        exit(1)
    except json.JSONDecodeError:
        print("Error: Invalid JSON format")
        exit(1)

    processed_chunks = process_json_chunks(json_chunks)
    print(f"Total number of chunks: {len(processed_chunks)}")

    text_embeddings, processed_texts = create_hybrid_embeddings(processed_chunks)
    print(f"Created BERT embeddings with shape: {text_embeddings.shape}")

    # Create Qdrant collection with correct size for BERT embeddings
    client.create_collection(
        collection_name=collection_name,
        vectors_config=VectorParams(
            size=1536,  # embedding size
            distance=Distance.COSINE
        )
    )
    print(f"Created Qdrant collection: {collection_name}")

    # Prepare points for Qdrant
    points = [
        PointStruct(
            id=int(doc['section_num']),
            vector=text_embedding["embedding"],
            payload={
                'section_num': doc['section_num'],
                'title': doc['title'],
                'content': doc['content'],
            }
        )
        for doc, text_embedding
        in zip(processed_chunks, text_embeddings)
    ]
    print(f"Prepared {len(points)} points for upsert")

    # Upsert points to Qdrant
    client.upsert(
        collection_name=collection_name,
        points=points
    )
    print("Upserted points to Qdrant")


if __name__ == "__main__":
    # Divide the data into chunks
    file_path = os.path.abspath("/home/crux/coding/python/ai_lawyer/backend/data/banking_kasur_tatha_sajayaact.json")
    store_embeddings_in_db(
        file_path,
        "test7",
        qdrant_client
    )
