import FillInTheGap from "@/components/exercises/FillInTheBlank";
import MultipleChoice from "@/components/exercises/MultipleChoice";
import Idioms from "@/components/exercises/Idioms";
import Translations from "@/components/exercises/Translations";
import { getRandomExercisesFallback } from "@/lib/exercises";
import { getLanguageByName } from "@/lib/languages";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ExercisePage({
  params,
}: {
  params: { language: string; exerciseType: string };
}) {
  const { language, exerciseType } = await params;
  const fromattedLanguage =
    language.charAt(0).toUpperCase() + language.slice(1);
  const formattedExerciseType = exerciseType.toLowerCase().replace(/-/g, "");

  console.log(formattedExerciseType);

  const languageData = await getLanguageByName(fromattedLanguage);
  if (!languageData) {
    console.error("Invalid Language:", fromattedLanguage);
    return notFound();
  }

  const exercises = await getRandomExercisesFallback(
    languageData.id,
    formattedExerciseType
  );

  if (!exercises || exercises.length === 0) {
    return <div className="text-red-500">No exercises found!</div>;
  }

  return (
    <>
      {formattedExerciseType === "fillintheblank" && (
        <FillInTheGap exercises={exercises} />
      )}
      {formattedExerciseType === "multiplechoice" && (
        <MultipleChoice exercises={exercises} />
      )}
      {formattedExerciseType === "idioms" && <Idioms exercises={exercises} />}
      {formattedExerciseType === "translations" && <Translations />}
      {!["fillintheblank", "multiplechoice", "idioms", "translations"].includes(
        formattedExerciseType
      ) && <div className="text-red-500">Invalid exercise type!</div>}
    </>
  );
}
