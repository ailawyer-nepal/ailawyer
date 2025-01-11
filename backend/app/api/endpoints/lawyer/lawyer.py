from fastapi import APIRouter
from app.schemas.lawyer import LawyerResponse
from app.services.llm import get_answer, translate_to_nepali
from app.services.retrieval import retriever
from app.services.qdrant_client_init import get_qdrant_client

lawyer_module = APIRouter()
client = get_qdrant_client()

@lawyer_module.get(
    '/',
    response_model=LawyerResponse,
    description='Get AI lawyer response'
)
async def get_ai_lawyer_response(question: str, collection_name: str):
    try:
        query = translate_to_nepali(question)
        result = retriever(
            client=client,
            collection_name=collection_name,
            query=query,
        )

        answer = get_answer(user_query=query, top_5_chunks=result)

        return LawyerResponse(
            question=question,
            answer=answer,
            collection_name=collection_name
        )
    except Exception as e:
        raise e
