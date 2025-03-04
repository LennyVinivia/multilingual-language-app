/* eslint-disable @typescript-eslint/no-explicit-any */
import db from "./db";

export async function getRandomExercises(
  languageId: string,
  exerciseType: string,
  limit = 10
) {
  console.log("objID", exerciseType);
  const pipeline = [
    {
      $match: {
        language_id: languageId,
        exercise_type: "Fill-in-the-Blank",
      },
    },
    { $sample: { size: limit } },
  ];
  const result = (await db.$runCommandRaw({
    aggregate: "exercises",
    pipeline,
    cursor: {},
  })) as {
    cursor?: { firstBatch?: any[] };
  };

  console.log("result", result);

  return result.cursor?.firstBatch || [];
}

export async function getRandomExercisesFallback(
  languageId: string,
  exerciseType: string,
  limit = 10
) {
  const allMatches = await db.exercises.findMany({
    where: {
      language_id: languageId,
      exercise_type: exerciseType,
    },
  });

  const shuffled = shuffle(allMatches);

  return shuffled.slice(0, limit);
}
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
