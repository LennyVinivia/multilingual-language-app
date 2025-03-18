from pymongo import MongoClient
from bson.objectid import ObjectId

old_db_uri = "mongodb+srv://mrexitorg:3VEa7SHwClxEnWTK@cluster0.j1q4tw9.mongodb.net/German?retryWrites=true&w=majority"
new_db_uri = "mongodb+srv://lennyruprechthtc:PW@cluster0.stm3k.mongodb.net/"

old_db_name = "German"
new_db_name = "multilingual-language"

old_client = MongoClient(old_db_uri)
new_client = MongoClient(new_db_uri)

old_db = old_client[old_db_name]
new_db = new_client[new_db_name]

source_collection = old_db["praepverbens"]
target_collection = new_db["exercises"]
languages_collection = new_db["languages"]
categories_collection = new_db["categories"]

def get_language_id(language_name="German"):
    language = languages_collection.find_one({"name": language_name})
    if not language:
        raise Exception(f"Language '{language_name}' not found in the database.")
    return language["_id"]

def get_category_id(category_name, language_id):
    category = categories_collection.find_one({"name": category_name, "language_id": language_id})
    if not category:
        raise Exception(f"Category '{category_name}' not found for language_id '{language_id}'.")
    return category["_id"]

def get_subcategory_id(subcategory_name, category_id, language_id):
    category = categories_collection.find_one({"_id": category_id, "language_id": language_id})
    if not category or "subcategories" not in category:
        return None
    for subcategory in category["subcategories"]:
        if subcategory["name"] == subcategory_name:
            return subcategory["_id"]
    return None

def migrate_prepositional_verbs():
    print(f"Starting migration from {source_collection.name} to {target_collection.name}...")

    language_id = get_language_id()
    category_id = get_category_id("Verben", language_id)
    subcategory_id = get_subcategory_id("Präpositionsverben", category_id, language_id)

    for document in source_collection.find():
        mapped_exercise = {
            "language_id": language_id,
            "category_id": category_id,
            "subcategory_id": subcategory_id,
            "exercise_type": "fillintheblank",
            "question": document.get("Satz", ""),
            "related_verb": document.get("Verb", ""),
            "examples": document.get("Beispiele", "").split("\r\n") if "Beispiele" in document else [],
            "explanation": document.get("Erklaerung", ""),
            "correct_answer": document.get("Loesung", ""),
            "source": document.get("quelle", "Unknown"),
            "metadata": {
                "date": document.get("Datum", None),
                "tags": ["Prepositional Verbs", "Grammar"]
            }
        }

        target_collection.insert_one(mapped_exercise)
        print(f"Migrated exercise: {mapped_exercise['question']}")

    print("Migration completed successfully!")

try:
    migrate_prepositional_verbs()
except Exception as e:
    print("An error occurred during migration:", e)
