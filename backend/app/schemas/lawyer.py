from pydantic import BaseModel


class LawyerResponse(BaseModel):
    question: str
    collection_name: str
    answer: str
