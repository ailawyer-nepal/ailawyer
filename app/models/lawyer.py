from sqlalchemy import Column, String
from app.core.database import Base
from .common import CommonModel


class LawyerResponse(CommonModel):
    __tablename__ = "lawyer_response"

    question = Column(String)
    answer = Column(String)


metadata = Base.metadata
