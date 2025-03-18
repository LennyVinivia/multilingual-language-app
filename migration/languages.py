from pymongo import MongoClient

client = MongoClient("mongodb+srv://lennyruprechthtc:PW@cluster0.stm3k.mongodb.net/")
db = client["multilingual-language"]
languages_collection = db["languages"]

languages_to_add = [
    {
        "name": "German",
    },
    {
        "name": "English",
    },
    {
        "name": "Spanish",
    },
    {
        "name": "Italian",
    }
]

try:
    result = languages_collection.insert_many(languages_to_add)
    print("Languages added with IDs:", result.inserted_ids)
except Exception as e:
    print("An error occurred:", e)
