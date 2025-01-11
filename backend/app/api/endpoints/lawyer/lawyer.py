from fastapi import APIRouter
from app.schemas.lawyer import LawyerResponse
from app.services.retrieval import retriever
from app.services.qdrant_client_init import get_qdrant_client
import pprint

lawyer_module = APIRouter()
client = get_qdrant_client()

@lawyer_module.get(
    '/',
    response_model=LawyerResponse,
    description='Get AI lawyer response'
)
async def get_ai_lawyer_response(question: str, collection_name: str):
    try:
        result = retriever(
            client=client,
            collection_name=collection_name,
            query=question,
        )

        pprint.pprint(result)

        return LawyerResponse(
            question=question,
            answer="",
            collection_name=collection_name
        )
    except Exception as e:
        raise e
