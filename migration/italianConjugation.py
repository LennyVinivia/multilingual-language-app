import csv
from pymongo import MongoClient
from datetime import datetime

DB_URI    = "URI"
DB_NAME   = "multilingual-language"
CSV_PATH  = "csv/italian/italianConjugation.csv"
LANG_NAME = "Italian"

client        = MongoClient(DB_URI)
db            = client[DB_NAME]
languages     = db["languages"]
conj_coll     = db["conjugations"]

lang_doc = languages.find_one({"name": LANG_NAME})
if not lang_doc:
    raise RuntimeError(f"Language '{LANG_NAME}' not found in `languages` collection")
lang_id = lang_doc["_id"]

def parse_date(s: str):
    return datetime.strptime(s, "%d.%m.%Y %H:%M:%S")

def import_conjugations(csv_path: str):
    inserted = 0
    with open(csv_path, encoding="utf-8", newline="") as fp:
        reader = csv.DictReader(fp, delimiter=";", quotechar='"')
        for row in reader:
            raw_block = row["Conjugation"].strip()
            if not raw_block:
                print(f"⦻ skipping #{row['ID_conjugation']} (empty conjugation)")
                continue

            forms = [line.strip() for line in raw_block.splitlines() if line.strip()]
            if len(forms) != 6:
                print(f"⚠️  row {row['ID_conjugation']} yielded {len(forms)} forms, expected 6. Skipping.")
                continue

            tense       = row["Tense"].strip()
            date_entry  = parse_date(row["DateOfEntry"].strip())
            cumul       = int(row["CumulTense"] or 0)
            counter     = int(row["CounterTense"] or 0)
            verb_id     = row["ID_conjugation"].strip()

            doc = {
                "language_id": lang_id,
                "verb_id":      verb_id,
                "tense":        tense,
                "forms":        forms,     
                "date_entry":   date_entry,
                "cumul":        cumul,
                "counter":      counter,
            }

            conj_coll.insert_one(doc)
            inserted += 1

    print(f"✅ Imported {inserted} conjugation entries")

if __name__ == "__main__":
    import_conjugations(CSV_PATH)
