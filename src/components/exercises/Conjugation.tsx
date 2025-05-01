/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import ProgressBar, { ExerciseProgress } from "../ProgressBar";
import { Button } from "../ui/button";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { ConjCard } from "@/lib/conjugations";

const PRONOUNS = ["io", "tu", "lui/lei", "noi", "voi", "loro"];

type Props = {
  cards: ConjCard[];
};

export default function ConjugationGrid({ cards }: Props) {
  const router = useRouter();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>(() => Array(6).fill(""));
  const [hasChecked, setHasChecked] = useState(false);
  const [isCorrect, setCorrect] = useState<boolean | null>(null);

  const [slotCorrect, setSlotCorrect] = useState<boolean[]>(() =>
    Array(6).fill(false)
  );

  const [statuses, setStatuses] = useState<ExerciseProgress[]>(
    cards.map((c) => ({ id: c.id, status: "default" }))
  );

  useEffect(() => {
    setAnswers(Array(6).fill(""));
    setCorrect(null);
    setHasChecked(false);
    setSlotCorrect(Array(6).fill(false));
  }, [idx]);

  const current = cards[idx];

  const handleCheck = () => {
    setHasChecked(true);

    const trimmed = answers.map((a) => a.trim().toLowerCase());
    const correctForms = current.forms.map((f) => f.trim());
    const lowerCorrect = correctForms.map((f) => f.toLowerCase());

    const perSlot = trimmed.map((ans, i) => ans === lowerCorrect[i]);
    setSlotCorrect(perSlot);

    const allRight = perSlot.every(Boolean);
    setCorrect(allRight);

    setStatuses((st) =>
      st.map((s, i) =>
        i === idx ? { ...s, status: allRight ? "right" : "wrong" } : s
      )
    );

    setAnswers((prev) =>
      prev.map((given, i) => (perSlot[i] ? given : correctForms[i]))
    );
  };

  const goNext = () => {
    if (idx < cards.length - 1) setIdx(idx + 1);
    else {
      alert("Congratulazioni, alle Übungen fertig!");
      router.push("/italian");
    }
  };

  const handleCancel = () => {
    router.push("/italian");
  };

  const buttonLabel = hasChecked ? "Nächste Frage" : "Verifizieren";

  return (
    <div className="p-4 text-white flex flex-col items-center">
      <div className="w-full max-w-xl">
        <ProgressBar
          exercises={statuses}
          activeIndex={idx}
          onCancel={handleCancel}
        />
      </div>

      <h2 className="text-2xl font-bold mt-8">
        Coniuga “{current.verb}” – {current.tense}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full max-w-xl">
        {PRONOUNS.map((pronoun, i) => (
          <div key={i} className="flex flex-col">
            <label className="text-gray-300">{pronoun}</label>
            <input
              className={`mt-1 p-2 rounded bg-[#141F24] border ${
                hasChecked
                  ? slotCorrect[i]
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-gray-600"
              }`}
              value={answers[i]}
              disabled={hasChecked}
              onChange={(e) => {
                const v = e.target.value;
                setAnswers((a) => {
                  const copy = [...a];
                  copy[i] = v;
                  return copy;
                });
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center space-x-8 w-full max-w-xl">
        {isCorrect !== null && (
          <div className="flex items-center gap-2">
            {isCorrect ? (
              <>
                <IoIosCheckmarkCircle size={28} className="text-green-500" />
                <span className="text-green-400 font-semibold">
                  Alles richtig!
                </span>
              </>
            ) : (
              <>
                <GoXCircleFill size={28} className="text-red-500" />
                <span className="text-red-400 font-semibold">
                  Einige Fehler
                </span>
              </>
            )}
          </div>
        )}

        <Button
          onClick={() => (hasChecked ? goNext() : handleCheck())}
          className="justify-start bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
}
