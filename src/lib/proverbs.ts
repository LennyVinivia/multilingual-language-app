import db from "./db";

export type ProverbCard = {
  id: string;
  languageId: string;
  proverb: string;
  frontText: string;
  translation: string;
  keywords: string[];
};

export async function getProverbFlashcards(
  langName: string
): Promise<ProverbCard[]> {
  const lang = await db.languages.findFirst({ where: { name: langName } });
  if (!lang) return [];

  const raws = await db.proverbs.findMany({
    where: {
      language_id: lang.id,
      OR: [
        { translations: { is: { en: { not: null } } } },
        { translations: { is: { fr: { not: null } } } },
      ],
    },
    select: {
      id: true,
      definition: true,
      proverb: true,
      keywords: true,
      translations: { select: { en: true, fr: true } },
    },
  });

  return raws.map((p) => ({
    id: p.id,
    languageId: lang.id,
    proverb: p.proverb,
    frontText: p.definition,
    translation: p.translations.en ?? p.translations.fr!,
    keywords: p.keywords,
  }));
}
