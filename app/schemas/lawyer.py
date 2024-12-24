from pydantic import BaseModel


class LawyerResponse(BaseModel):
    question: str
    answer: str
