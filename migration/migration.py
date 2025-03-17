from pymongo import MongoClient
import csv

client = MongoClient('mongodb://localhost:27017/')
db = client['multilingual-language']

english = db['english']
with open('tWords3.csv', 'r', encoding='latin-1') as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        doc = {
            "_id": row["ID_Word"],
            "word": row["Word"],
            "phonetics": row["Phonetics"],
            "dateEntryWord": row["DateEntryWord"],
            "structure": row["Structure"],
            "definition": row["Definition"],
            "var1": row["Var1"],
            "randomNumber": row["RandomNumber"],
            "counterWords": row["CounterWords"],
            "cumulWords": row["CumulWords"],
        }
        english.insert_one(doc)
