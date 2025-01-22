from typing import Any, Dict, List
from uuid import UUID
from pydantic import BaseModel


class Channel(BaseModel):
    id: UUID
    title: str
    created_at: str
    updated_at: str


class ListOfChannels(BaseModel):
    channels: List[Channel]


class QueryResponse(BaseModel):
    query: str
    response: str
    collection_name: str
    chunks: List[Dict[Any, Any]]


class ChannelDetails(Channel):
    query_responses: List[QueryResponse]


class QueryBody(BaseModel):
    query: str
    collection_name: str
    history: str
    chunks: str
