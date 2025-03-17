from pymongo import MongoClient
import json

mongo_uri = "mongodb+srv://lennyruprechthtc:Secure1234@cluster0.stm3k.mongodb.net/"  # Adjust if necessary
database_name = "multilingual-language"
collection_name = "words"

with open("translations/germanTranslations.json", "r", encoding="utf-8") as file:
    translations_data = json.load(file)

client = MongoClient(mongo_uri)
db = client[database_name]
words_collection = db[collection_name]

for translation in translations_data:
    word = translation["word"]
    translations = [
        {"language": "English", "translation": translation.get("english", "")},
        {"language": "Spanish", "translation": translation.get("spanish", "")},
        {"language": "Italian", "translation": translation.get("italian", "")}
    ]

    result = words_collection.update_one(
        {"word": word}, 
        {"$set": {"translations": translations}}
    )

    if result.matched_count > 0:
        print(f"Updated translations for '{word}'")
    else:
        print(f"Word '{word}' not found in the database.")

print("Translation update completed successfully!")
