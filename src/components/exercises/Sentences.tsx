"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar, { ExerciseProgress } from "../ProgressBar";
import ExerciseInput from "../ui/exerciseInput";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";

type Exercise = {
  id: string;
  originalSentence: string;
  blankedSentence: string;
  correctAnswer: string;
  options: string[];
};

type SetnenceProps = {
  exercises: Exercise[];
  learningLanguage: string;
};

export default function Sentence({
  exercises,
  learningLanguage,
}: SetnenceProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [answer, setAnswer] = useState("");
  const [hasChecked, setHasChecked] = useState(false);

  const initialStatuses = exercises.map((ex) => ({
    id: ex.id,
    status: "default" as const,
  }));
  const [exerciseStatuses, setExerciseStatuses] =
    useState<ExerciseProgress[]>(initialStatuses);

  const handleCancel = () => {
    router.push(`/${learningLanguage.toLowerCase()}`);
  };

  const handleCheck = () => {
    if (hasChecked) {
      if (activeIndex < exercises.length - 1) {
        setActiveIndex(activeIndex + 1);
        setAnswer("");
        setIsCorrect(null);
        setHasChecked(false);
      } else {
        alert("Alle Fragen abgeschlossen!");
        router.push(`/${learningLanguage.toLowerCase()}`);
      }
      return;
    }

    const currentEx = exercises[activeIndex];
    if (!currentEx) return;

    const correct = currentEx.correctAnswer.toLowerCase().trim();
    setCorrectAnswer(correct);
    const userAnswer = answer.toLowerCase().trim();
    const isAnswerCorrect = correct === userAnswer;

    setExerciseStatuses((prev) =>
      prev.map((item, i) =>
        i === activeIndex
          ? { ...item, status: isAnswerCorrect ? "right" : "wrong" }
          : item
      )
    );

    setIsCorrect(isAnswerCorrect);
    setHasChecked(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleCheck();
    }
  };

  useEffect(() => {
    const newStatuses = exercises.map((ex) => ({
      id: ex.id,
      status: "default" as const,
    }));
    setExerciseStatuses(newStatuses);
  }, [exercises]);

  const currentExercise = exercises[activeIndex];
  if (!currentExercise) {
    return <div>Keine Übungen gefunden.</div>;
  }

  console.log("exercises", exercises);

  const buttonLabel = hasChecked ? "Nächste Frage" : "Überprüfen";

  return (
    <div className="p-4 text-white flex flex-col">
      <div className="flex justify-center">
        <ProgressBar
          exercises={exerciseStatuses}
          activeIndex={activeIndex}
          onCancel={handleCancel}
        />
      </div>

      <h2 className="text-2xl font-bold mt-16">Fülle die Lücken!</h2>
      <p className="mt-16">{currentExercise.blankedSentence}</p>

      <ExerciseInput
        value={answer}
        onChange={(val) => setAnswer(val)}
        onKeyDown={handleKeyDown}
        disabled={hasChecked}
      />

      <div
        className={`mt-12 p-8 flex items-center ${
          hasChecked ? "justify-between" : "justify-end"
        }`}
      >
        {hasChecked && (
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <IoIosCheckmarkCircle className="text-green-500" size={24} />
                <p className="text-green-500 font-bold">Richtig!</p>
              </>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <GoXCircleFill className="text-red-500" size={24} />
                  <p className="text-red-500 font-bold">Falsch!</p>
                </div>
                <p className="text-red-400 font-semibold">
                  Korrekte Antwort: {correctAnswer}
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleCheck}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
