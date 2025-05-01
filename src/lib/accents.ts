import db from "./db";

export type AccentCard = {
  id: string;
  languageId: string;
  word: string;
  frontText: string;
  translation: string;
};

export async function getAccentFlashcards(
  langName: string
): Promise<AccentCard[]> {
  const lang = await db.languages.findFirst({
    where: { name: langName },
  });
  if (!lang) {
    return [];
  }
  const accents = await db.accents.findMany({
    where: { language_id: lang.id },
    select: {
      id: true,
      unaccented: true,
      accented: true,
      rule_code: true,
    },
  });

  return accents.map((a) => ({
    id: a.id,
    languageId: lang.id,
    word: a.unaccented,
    frontText: a.rule_code ? `Rule ${a.rule_code}` : "",
    translation: a.accented,
  }));
}
