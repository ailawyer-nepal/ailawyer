import json
from typing import List


class Context:
    role: str
    content: str

    def __init__(self, role: str, content: str):
        self.role = role
        self.content = content


def parse_history(history: str) -> List[Context]:
    try:
        history_parsed = json.loads(history)
        context = [Context(
            role='system' if ctx['sender'] == 'bot' else 'user',
            content=ctx['content'])
            for ctx in history_parsed]
        return context
    except Exception as e:
        raise e
