import os
from fastapi import APIRouter
from app.schemas.lawyer import LawyerResponse
import requests

AZURE_ENDPOINT = os.environ.get('AZURE_ENDPOINT')
AZURE_API_KEY = os.environ.get('AZURE_API_KEY')

lawyer_module = APIRouter()

@lawyer_module.get(
    '/',
    response_model=LawyerResponse,
    description='Get AI lawyer response'
)
async def create_new_user(question: str):
    try:
        res = requests.post(
            url="https://saas5515199236.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
            headers={
                "Content-Type": "application/json",
                "api-key": "21f2586d10c147e4a55e442c20ba3043"
            },
            json={
                "messages": [
                    {
                        "role": "system",
                        "content":
                        '''You're an AI lawyer specializing in legal matters under Nepal's laws, 
    including company law, national civil code, family law, and criminal law. 
    Always provide legal advice in English with references to applicable laws in Nepal. 
    For all other non-legal questions, respond with 'I only assist with legal matters.'
    Give the answers in Nepali language.'''
                    },
                    {
                        "role": "user",
                        "content": question
                    }
                ],
                "temperature": 0.7,
                "top_p": 0.95,
                "max_tokens": 1000,
            }
        ).json()

        if 'choices' not in res:
            print("res")
            raise Exception(res)

        return LawyerResponse(
            question=question,
            answer=res['choices'][0]['message']['content']
        )
    except Exception as e:
        raise e
