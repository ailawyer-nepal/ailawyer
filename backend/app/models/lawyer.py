import uuid
from sqlalchemy import Column, String, Integer, UUID
from .common import CommonModel

class QueryResponse(CommonModel):
    __tablename__ = "query_response"

    id = Column(UUID, primary_key=True, default=uuid.uuid4())
    parent_id = Column(String, nullable=True)
    user_id = Column(String, nullable=False)
    query = Column(String, nullable=False)
    response = Column(String, nullable=False)
    created_at = Column(String, nullable=False, default="CURRENT_TIMESTAMP")


class UserQueryRelation(CommonModel):
    __tablename__ = "user_query_relation"

    id = Column(UUID, primary_key=True, default=uuid.uuid4())
    title = Column(String, nullable=False)
    user_id = Column(Integer, nullable=False)
    query_id = Column(String, nullable=False)
    created_at = Column(String, nullable=False, default="CURRENT_TIMESTAMP")
    updated_at = Column(String, nullable=True)
