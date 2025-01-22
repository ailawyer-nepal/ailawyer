import json
import os
from typing import List
from dotenv import load_dotenv

import requests

from app.utils.parse_history import parse_history

load_dotenv()

AZURE_ENDPOINT = os.environ.get('AZURE_ENDPOINT')
AZURE_API_KEY = os.environ.get('AZURE_API_KEY')


def translate_to_nepali(text):
    try:
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
    except Exception as e:
        print(f"Error during answer generation: {e}")
        return "Sorry, I encountered an error while generating the answer."


def format_chunks(chunks):
    formatted_chunks = []
    for chunk in chunks:
        # Default to 'N/A' if section_num is missing
        section = chunk.get('section_num', 'N/A')
        content = chunk.get('content', '')
        similarity = chunk.get('similarity', 'N/A')
        formatted_chunks.append(
            f"Section {section}:\n{content}\n(Similarity: {similarity:.2f})"
        )
    return "\n\n---\n\n".join(formatted_chunks)


def get_answer(user_query, top_5_chunks, history, chunks_history):
    # Properly format chunks by joining the list of chunks with newlines and section separators
    chunks_history_parsed: List[str] = json.loads(chunks_history)
    chunks_history_parsed_flat = []
    for chunks in chunks_history_parsed:
        for chunk in chunks:
            chunks_history_parsed_flat.append(chunk)
    print("="*50)
    __import__('pprint').pprint(chunks_history_parsed_flat)
    print("="*50)
    __import__('pprint').pprint(top_5_chunks)
    chunks_all = chunks_history_parsed_flat + top_5_chunks
    formatted_chunks = format_chunks(chunks_all)
    context = parse_history(history)

    system_prompt = f"""Based on this document and the context provided, you need to generate an answer to the user query.
        Also provide the section you are referencing to to derive the conclusion. Write the entire response in Nepali.
        The document sections are:

        {formatted_chunks}

        If no chunk is provided and you don't have any relevant context, then you can say you don't have enough information to answer the query.
    """

    try:
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
                        "content": user_query
                    },
                    *[
                        {
                            "role": ctx.role,
                            "content": ctx.content
                        }
                        for ctx in context
                    ]
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
    except Exception as e:
        print(f"Error during answer generation: {e}")
        return "Sorry, I encountered an error while generating the answer."
