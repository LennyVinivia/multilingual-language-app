"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar, { ExerciseProgress } from "../ProgressBar";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";

type Exercise = {
  id: string;
  words: string[];
  translations: string[];
  correctPairs: Record<string, string>;
};

type TranslationsProps = {
  exercises: Exercise[];
  learningLanguage: string;
};

export default function Translations({
  exercises,
  learningLanguage,
}: TranslationsProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [wrongPair, setWrongPair] = useState<string[]>([]);
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

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
    const correctPairs = exercises[activeIndex].correctPairs;
    const allMatched = Object.entries(correctPairs).every(
      ([k, v]) => matchedPairs[k] === v
    );

    setIsCorrect(allMatched);
    setHasChecked(true);

    const newStatuses = [...exerciseStatuses];
    newStatuses[activeIndex] = {
      ...newStatuses[activeIndex],
      status: allMatched ? "right" : "wrong",
    };
    setExerciseStatuses(newStatuses);
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

  const handleSelect = (item: string) => {
    if (selected.includes(item)) return;
    const updated = [...selected, item];
    setSelected(updated);

    if (updated.length === 2) {
      const [first, second] = updated;
      const isMatch =
        currentExercise.correctPairs[first] === second ||
        currentExercise.correctPairs[second] === first;

      if (isMatch) {
        setMatchedPairs((prev) => ({
          ...prev,
          [first]: second,
          [second]: first,
        }));
      } else {
        setWrongPair([first, second]);
        setTimeout(() => {
          setWrongPair([]);
        }, 800);
      }

      setTimeout(() => {
        setSelected([]);
      }, 500);
    }
  };

  const isMatched = (word: string) => matchedPairs[word] !== undefined;
  const isSelected = (word: string) => selected.includes(word);
  const isWrong = (word: string) => wrongPair.includes(word);

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
      <h2 className="text-2xl font-bold mt-16">Finde die richtigen Paare</h2>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-4">
          {currentExercise.words.map((word, index) => {
            let btnClass = "border-[#6A6A6A] bg-[#141F24]";
            if (isMatched(word)) {
              btnClass = "bg-green-500 border-green-500";
            } else if (isWrong(word)) {
              btnClass = "bg-red-500 border-red-500";
            } else if (isSelected(word)) {
              btnClass = "border-[#31639C] bg-gray-800";
            }

            return (
              <Button
                key={word + index}
                onClick={() => handleSelect(word)}
                disabled={isMatched(word)}
                className={`w-full py-6 rounded-xl text-white text-lg font-semibold border-2 transition-all hover:bg-gray-800 ${btnClass}`}
              >
                {word}
              </Button>
            );
          })}
        </div>

        <div className="flex flex-col gap-4">
          {currentExercise.translations.map((translation, index) => {
            let btnClass = "border-[#6A6A6A] bg-[#141F24]";
            if (isMatched(translation)) {
              btnClass = "bg-green-500 border-green-500";
            } else if (isWrong(translation)) {
              btnClass = "bg-red-500 border-red-500";
            } else if (isSelected(translation)) {
              btnClass = "border-[#31639C] bg-gray-800";
            }

            return (
              <Button
                key={translation + index}
                onClick={() => handleSelect(translation)}
                disabled={isMatched(translation)}
                className={`w-full py-6 rounded-xl text-white text-lg font-semibold border-2 transition-all hover:bg-gray-800 ${btnClass}`}
              >
                {translation}
              </Button>
            );
          })}
        </div>
      </div>
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
                  Überprüfe die Zuordnung noch einmal.
                </p>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={() => {
            if (hasChecked) {
              if (activeIndex < exercises.length - 1) {
                setActiveIndex(activeIndex + 1);
                setMatchedPairs({});
                setSelected([]);
                setWrongPair([]);
                setHasChecked(false);
                setIsCorrect(null);
              } else {
                alert("Alle Fragen abgeschlossen!");
                router.push("/german");
              }
            } else {
              handleCheck();
            }
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
