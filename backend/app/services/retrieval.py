from app.utils.query_qdrant import generate_embeddings
from typing import List, Dict

def retriever(
    client,
    collection_name,
    query,
    top_k: int = 5,
) -> List[Dict]:
    query_embedding = generate_embeddings([query])
    
    # Convert NumPy array to list
    query_embedding_list = query_embedding[0]["embedding"]

    # Pass list of floats to Qdrant
    qdrant_results = client.search(
        collection_name=collection_name,
        query_vector=query_embedding_list,
        limit=top_k
    )

    results = []

    for result in qdrant_results:
        results.append({
            'section_num': result.payload.get('section_num'),
            'content': result.payload.get('content'),
            'similarity': float(result.score),
        })

    # Sort results by similarity
    return sorted(results, key=lambda x: x['similarity'], reverse=True)

