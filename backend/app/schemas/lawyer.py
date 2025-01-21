from typing import List
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
    id: UUID
    query: str
    response: str
    created_at: str


class ChannelDetails(Channel):
    query_responses: List[QueryResponse]
