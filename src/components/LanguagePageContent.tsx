"use client";

import ExerciseCard from "./ExerciseCard";

type Exercise = {
  name: string;
  description: string;
  href: string;
};

const exercisesByLanguage: Record<string, Exercise[]> = {
  german: [
    {
      name: "Fill in the Blank",
      description: "This is a description",
      href: "/german/exercises/fill-in-the-blank",
    },
    {
      name: "Multiple Choice",
      description: "This is a description",
      href: "/german/exercises/multiple-choice",
    },
    {
      name: "Idioms",
      description: "This is a description",
      href: "/german/exercises/idioms",
    },
    {
      name: "Translations",
      description: "This is a description",
      href: "/german/exercises/translations",
    },
  ],
  english: [
    {
      name: "Fill in the Blank",
      description: "This is a description",
      href: "/english/exercises/fill-in-the-blank",
    },
    {
      name: "Multiple Choice",
      description: "This is a description",
      href: "/english/exercises/multiple-choice",
    },
    {
      name: "Idioms",
      description: "This is a description",
      href: "/english/exercises/idioms",
    },
    {
      name: "Translations",
      description: "This is a description",
      href: "/english/exercises/translations",
    },
  ],
  spanish: [
    {
      name: "Fill in the Blank",
      description: "This is a description",
      href: "/spanish/exercises/fill-in-the-blank",
    },
    {
      name: "Multiple Choice",
      description: "This is a description",
      href: "/spanish/exercises/multiple-choice",
    },
    {
      name: "Idioms",
      description: "This is a description",
      href: "/spanish/exercises/idioms",
    },
    {
      name: "Translations",
      description: "This is a description",
      href: "/spanish/exercises/translations",
    },
  ],
  italian: [
    {
      name: "Fill in the Blank",
      description: "This is a description",
      href: "/italian/exercises/fill-in-the-blank",
    },
    {
      name: "Multiple Choice",
      description: "This is a description",
      href: "/italian/exercises/multiple-choice",
    },
    {
      name: "Idioms",
      description: "This is a description",
      href: "/italian/exercises/idioms",
    },
    {
      name: "Translations",
      description: "This is a description",
      href: "/italian/exercises/translations",
    },
  ],
};

export default function LanguagePageContent({
  language,
}: {
  language: string;
}) {
  const exercises = exercisesByLanguage[language];

  if (!exercises) {
    return <div className="text-red-500">Language not found!</div>;
  }

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-12">
          Welcome to the {language.charAt(0).toUpperCase() + language.slice(1)}{" "}
          learning section
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
