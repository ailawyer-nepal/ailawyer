import os
from dotenv import load_dotenv

import requests

load_dotenv()

AZURE_ENDPOINT = os.environ.get('AZURE_ENDPOINT')
AZURE_API_KEY = os.environ.get('AZURE_API_KEY')

def translate_to_nepali(text):
    system_prompt = """You are an AI language model. Your task is to translate the given text in any language to Nepali
        to retrieve relevant documents from a vector database. The query will be mostly law related. Provide just the translation.
        These are legal specific documents, so if you diverse the query by more, the result might not be as expected,
        some other chunk might be fetched, so the version should just contain synonyms or similar words to the original query
        and not necessarily be a question, just like some keywords and dont add more extra, unnecessary information just synonym and very similar words
    """

    res = requests.post(
        url=f"{AZURE_ENDPOINT}/openai/deployments/gpt-4o/chat/completions?api-version=2024-08-01-preview",
        headers={
            "Content-Type": "application/json",
            "api-key": AZURE_API_KEY
        },
        json={
            "messages": [
                {
                    "role": "system",
                    "content": system_prompt
                },
                {
                    "role": "user",
                    "content": text
                }
            ],
            "temperature": 0.7,
            "top_p": 0.95,
            "max_tokens": 1000,
        }
    ).json()

    if 'choices' not in res:
        print("="*50)
        print(res)
        print("="*50)
        raise Exception(res)

    return res['choices'][0]['message']['content']
