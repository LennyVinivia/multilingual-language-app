import FillInTheGap from "@/components/exercises/FillInTheGap";
import { getRandomExercisesFallback } from "@/lib/exercises";
import { getGermanLanguage } from "@/lib/languages";

export const dynamic = "force-dynamic";

export default async function FillInTheGapPage() {
  const exerciseType = "Fill-in-the-Blank";
  const germanLanguage = await getGermanLanguage();

  const exercises = await getRandomExercisesFallback(
    germanLanguage?.id || "",
    exerciseType,
    10
  );

  return <FillInTheGap exercises={exercises} />;
}
