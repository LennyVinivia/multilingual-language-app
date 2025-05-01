/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, KeyboardEvent } from "react";
import clsx from "clsx";
import { FiArrowLeft, FiArrowRight, FiInfo } from "react-icons/fi";
import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { AccentCard } from "@/lib/accents";

const variants = {
  enter: (d: number) => ({ x: d > 0 ? 200 : -200, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -200 : 200, opacity: 0 }),
};

type Props = {
  cards: AccentCard[];
};

export default function Accent({ cards }: Props) {
  const [idx, setIdx] = useState(0);
  const [flip, setFlip] = useState(false);
  const [dir, setDir] = useState(0);
  const [showHelp, setHelp] = useState(false);

  const go = (d: -1 | 1) => {
    setFlip(false);
    setDir(d);
    setIdx((i) => (i + d + cards.length) % cards.length);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showHelp && e.key === "Escape") return setHelp(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
      if (["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key))
        setFlip((f) => !f);
    };
    window.addEventListener("keydown", onKey as any);
    return () => window.removeEventListener("keydown", onKey as any);
  }, [showHelp, cards.length]);

  if (!cards.length) {
    return <p className="p-4 text-white">No accent cards.</p>;
  }

  const card = cards[idx];

  return (
    <div className="p-4 text-white mt-8 flex flex-col items-center space-y-4">
      <div className="flex items-center gap-3 text-sm text-gray-400">
        Card {idx + 1}/{cards.length}
        <button
          onClick={() => setHelp(true)}
          className="text-gray-300 hover:text-white"
        >
          <FiInfo size={18} />
        </button>
      </div>

      <AnimatePresence custom={dir} mode="popLayout">
        <motion.div
          key={card.id}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="relative w-[300px] md:w-[400px] h-[240px] md:h-[300px]"
        >
          <div
            onClick={() => setFlip((f) => !f)}
            className={clsx(
              "w-full h-full perspective-1000 preserve-3d transition-transform duration-500 cursor-pointer",
              flip ? "rotate-y-180" : "rotate-y-0"
            )}
          >
            <div className="absolute inset-0 rounded-xl border-2 border-[#6A6A6A] bg-[#141F24] backface-visibility-hidden flex flex-col items-center justify-center p-4">
              <h2 className="text-2xl font-bold mb-2">{card.word}</h2>
            </div>

            <div
              className="absolute inset-0 rounded-xl border-2 border-[#6A6A6A] bg-[#1E2A2E] backface-visibility-hidden rotate-y-180 flex items-center justify-center p-4"
              style={{ transform: "rotateY(180deg)" }}
            >
              <p className="text-xl font-semibold text-center">
                {card.translation}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center space-x-4">
        <Button
          onClick={() => go(-1)}
          className="px-4 py-2 bg-[#141F24] rounded-xl hover:bg-gray-800"
        >
          <FiArrowLeft size={24} />
        </Button>
        <Button
          onClick={(e) => (e.stopPropagation(), setFlip((f) => !f))}
          className="px-4 py-2 bg-transparent hover:bg-green-700 rounded-xl font-bold"
        >
          Flip
        </Button>
        <Button
          onClick={() => go(1)}
          className="px-4 py-2 bg-[#141F24] rounded-xl hover:bg-gray-800"
        >
          <FiArrowRight size={24} />
        </Button>
      </div>

      {showHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setHelp(false)}
        >
          <div
            className="w-[90%] max-w-md bg-[#141F24] border border-[#444] rounded-xl p-6 space-y-4 text-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FiInfo /> How to navigate
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Click or ↑/↓ or Space/Enter to flip.</li>
              <li>←/→ to change card.</li>
              <li>Esc or outside click to close.</li>
            </ul>
            <div className="text-right">
              <Button onClick={() => setHelp(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
