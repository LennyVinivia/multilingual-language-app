import db from "./db";

export type ConjCard = {
  id: string;
  verb: string;
  tense: string;
  forms: string[];
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getRandomConjExercises(
  languageId: string,
  count = 10
): Promise<ConjCard[]> {
  const all = await db.conjugations.findMany({
    where: { language_id: languageId },
    select: { id: true, tense: true, forms: true },
  });
  if (all.length === 0) return [];
  const cards: ConjCard[] = all.map((c) => ({
    id: c.id,
    verb: c.forms[0],
    tense: c.tense,
    forms: c.forms,
  }));

  return shuffle(cards).slice(0, Math.min(count, cards.length));
}
