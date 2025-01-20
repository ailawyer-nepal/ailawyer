from sqlalchemy import Column, String, Integer
from .common import CommonModel

class QueryResponse(CommonModel):
    __tablename__ = "query_response"

    id = Column(String, primary_key=True)
    parent_id = Column(String, nullable=True)
    user_id = Column(String, nullable=False)
    query = Column(String, nullable=False)
    response = Column(String, nullable=False)
    created_at = Column(String, nullable=False)


class UserQueryRelation(CommonModel):
    __tablename__ = "user_query_relation"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    user_id = Column(Integer, nullable=False)
    query_id = Column(String, nullable=False)
    created_at = Column(String, nullable=False)
    updated_at = Column(String, nullable=True)
