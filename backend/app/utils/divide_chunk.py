import json

# Define the path to your JSON file
file_path = '/home/crux/coding/python/ai_lawyer/backend/data/banking_kasur_tatha_sajayaact.json'

# Open and read the JSON file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)


def split_into_chunks(data, word_limit=1000):
    chunks = []
    current_chunk = []
    current_word_count = 0

    for section in data:
        section_word_count = sum(len(content.split()) for content in section["content"])

        if current_word_count + section_word_count <= word_limit:
            current_chunk.append(section)
            current_word_count += section_word_count
        else:
            chunks.append(current_chunk)
            current_chunk = [section]
            current_word_count = section_word_count

    if current_chunk:
        chunks.append(current_chunk)

    return chunks


if __name__ == '__main__':
    # Divide the data into chunks
    chunks = split_into_chunks(data)
    for i, chunk in enumerate(chunks):
        print(f"Chunk {i + 1}:")
        print(json.dumps(chunk, indent=4, ensure_ascii=False))
        print("\n")
    # print(data)
