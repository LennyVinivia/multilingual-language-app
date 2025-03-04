"use client";

import ExerciseCard from "./ExerciseCard";

type Exercise = {
  name: string;
  description: string;
  href: string;
};

const exercises: Exercise[] = [
  {
    name: "Fill in the Gap",
    description: "This is a description",
    href: "/german/fill-in-the-gap",
  },
  {
    name: "Multiple Choice",
    description: "This is a description",
    href: "/german",
  },
  {
    name: "Idioms",
    description: "This is a description",
    href: "/spanish",
  },
  {
    name: "Translations",
    description: "This is a description",
    href: "/italian",
  },
];

export default function HomepageContent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-12">
          Welcome to the German learning section
        </h1>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-12 text-center pb-2 border-b-2 border-[#6A6A6A]">
          You can choose between one of the following exercises
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.name}
              name={exercise.name}
              description={exercise.description}
              href={exercise.href}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
