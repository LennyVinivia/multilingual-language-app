"use client";

import germany from "../public/img/germany.png";
import unitedKingdom from "../public/img/united-kingdom.png";
import italy from "../public/img/italy.png";
import spain from "../public/img/spain.png";
import Image from "next/image";
import LanguageCard from "./LanguageCard";

type Language = {
  name: string;
  icon: React.ReactNode;
  href: string;
};

const languages: Language[] = [
  {
    name: "English",
    icon: <Image src={unitedKingdom} alt="UK Flag" width={64} height={64} />,
    href: "/english",
  },
  {
    name: "German",
    icon: <Image src={germany} alt="Germany Flag" width={64} height={64} />,
    href: "/german",
  },
  {
    name: "Spanish",
    icon: <Image src={spain} alt="Spain Flag" width={64} height={64} />,
    href: "/spanish",
  },
  {
    name: "Italian",
    icon: <Image src={italy} alt="Italy Flag" width={64} height={64} />,
    href: "/italian",
  },
];

export default function HomepageContent() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-8">
          Welcome to the place where you can improve your language skills.
        </h1>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
          aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
          dolores et ea rebum
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-12 text-center pb-2 border-b-2 border-[#6A6A6A]">
          Go Ahead and start learning one of the following languages
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {languages.map((lang) => (
            <LanguageCard
              key={lang.name}
              name={lang.name}
              icon={lang.icon}
              href={lang.href}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
