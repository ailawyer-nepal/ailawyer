from uuid import UUID
from fastapi import APIRouter, Body, Depends, HTTPException
from sqlalchemy.orm.session import Session
from app.core.dependencies import get_db
from app.dependencies.user import get_current_user
from app.models.lawyer import UserQueryRelation
from app.models.user import User
from app.schemas.lawyer import Channel, ListOfChannels, QueryBody, QueryResponse
from app.services.llm import get_answer, translate_to_nepali
from app.services.retrieval import retriever
from app.services.qdrant_client_init import get_qdrant_client

lawyer_module = APIRouter()
client = get_qdrant_client()


@lawyer_module.get(
    '/',
    response_model=ListOfChannels,
    description='Get all channels.'
)
async def get_channels(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        db_channels = db.query(UserQueryRelation).filter(
            UserQueryRelation.user_id == user.id).all()

        channels = [
            Channel(
                id=UUID(str(channel.id)),
                title=str(channel.title),
                created_at=str(channel.created_at),
                updated_at=str(channel.updated_at),
            )
            for channel in db_channels
        ]

        return ListOfChannels(channels=channels)
    except Exception as e:
        raise e


@lawyer_module.post(
    '/',
    response_model=QueryResponse,
    description='Create a new query response.'
)
async def get_response(
    data: QueryBody = Body(...)
):
    try:
        query = translate_to_nepali(data.query)
        # query = data.query
        result = retriever(
            client=client,
            collection_name=data.collection_name,
            query=query,
        )

        answer = get_answer(
            user_query=query,
            top_5_chunks=result,
            history=data.history,
            chunks_history=data.chunks
        )

        return QueryResponse(
            query=data.query,
            expanded=query,
            response=answer,
            collection_name=data.collection_name,
            chunks=result
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@lawyer_module.get('/collections', description='Get all collections.')
def get_collections():
    try:
        collections = client.get_collections()
        return collections
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
