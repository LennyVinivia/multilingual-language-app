import db from "./db";
import { CardStatus, getProgressMap } from "./wordProgress";

type RawWordPair = {
  id: string;
  word: string;
  translation: string;
};

type TranslationEntry = {
  language_id: string;
  translation: string | null;
};

export async function getWordPairsPrisma(
  targetLanguageId: string,
  userLocaleId: string,
  count: number
): Promise<RawWordPair[]> {
  try {
    const wordsWithTranslations = await db.words.findMany({
      where: {
        language_id: targetLanguageId,
        translations: {
          some: {
            language_id: userLocaleId,
            translation: {
              not: null,
            },
          },
        },
      },
      select: {
        id: true,
        word: true,
        translations: true,
      },
      take: count,
    });

    const formattedPairs = wordsWithTranslations
      .map((item) => {
        if (!Array.isArray(item.translations)) {
          console.warn(`Document ${item.id} has invalid translations format.`);
          return null;
        }
        const matchingTranslationEntry = (
          item.translations as TranslationEntry[]
        )?.find((trans) => trans.language_id === userLocaleId);
        if (
          matchingTranslationEntry &&
          typeof matchingTranslationEntry.translation === "string" &&
          matchingTranslationEntry.translation.trim() !== ""
        ) {
          return {
            id: item.id,
            word: item.word,
            translation: matchingTranslationEntry.translation,
          };
        }
        return null;
      })
      .filter((pair): pair is RawWordPair => pair !== null);
    return formattedPairs;
  } catch (error) {
    console.error(
      "Error fetching word pairs with Prisma (Array structure):",
      error
    );
    return [];
  }
}

export type RawFlashcard = {
  id: string;
  languageId: string;
  word: string;
  frontText: string;
  translation: string;
  status: CardStatus;
};

export async function getFlashcardsPrisma(
  targetLanguageId: string,
  userLocaleId: string,
  userId: string
): Promise<RawFlashcard[]> {
  const progress = await getProgressMap(userId, targetLanguageId);
  const docs = await db.words.findMany({
    where: {
      language_id: targetLanguageId,
      translations: {
        some: {
          language_id: userLocaleId,
          translation: { not: null },
        },
      },
      front_text: { not: "" },
    },
    select: {
      id: true,
      language_id: true,
      word: true,
      front_text: true,
      translations: true,
    },
  });
  const cards: RawFlashcard[] = [];

  for (const w of docs) {
    const t = (w.translations as TranslationEntry[]).find(
      (x) => x.language_id === userLocaleId && x.translation?.trim()
    )?.translation;
    if (!t) continue;

    cards.push({
      id: w.id,
      languageId: w.language_id,
      word: w.word,
      frontText: w.front_text!,
      translation: t,
      status: progress[w.id] ?? 0,
    });
  }

  return cards;
}
