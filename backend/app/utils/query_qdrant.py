
import requests
import os
from dotenv import load_dotenv
from app.services.qdrant_client_init import get_qdrant_client

# Load environment variables from .env file
load_dotenv()

# Azure OpenAI API configuration
AZURE_API_KEY = os.environ.get("AZURE_API_KEY")
AZURE_ENDPOINT = os.environ.get("AZURE_ENDPOINT")
DEPLOYMENT_NAME = "text-embedding-ada-002"

# Function to generate embeddings using Azure OpenAI
def generate_embeddings(texts):
    url = f"{AZURE_ENDPOINT}/openai/deployments/{
        DEPLOYMENT_NAME}/embeddings?api-version=2023-05-15"
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
    return embeddings


# Retrieve points from a collection
def test_retrieve_points():
    # Connect to the Qdrant server
    client = get_qdrant_client()
    # List all collections
    # collections = client.get_collections()
    # print("Collections:", collections)

    # Example Nepali text
    nepali_texts = [
        """
    (१) यस ऐनको नाम “बैङ्किङ्ग कसूर तथा सजाय ऐन, २०६४” रहेकोछ ।
    """,
        "आयकर नियमहरू",
        "फैसला: कर चोरीको मुद्दा",
    ]

    # Generate embeddings
    embeddings = generate_embeddings(nepali_texts)

    points = client.search(
        collection_name="test8",
        query_vector=embeddings[0]["embedding"],
        limit=5
    )
    print("Points:", points)
