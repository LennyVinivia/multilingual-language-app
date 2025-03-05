"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import germany from "../public/img/germany.png";
import unitedKingdom from "../public/img/united-kingdom.png";
import italy from "../public/img/italy.png";
import spain from "../public/img/spain.png";
import Image from "next/image";
import { useI18n } from "@/contexts/I18nContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { getTranslation } from "@/lib/translations";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { label: "Home", icon: <IoHomeOutline size={24} />, href: "/" },
  {
    label: "English",
    icon: <Image src={unitedKingdom} alt="UK Flag" width={24} height={24} />,
    href: "/english",
  },
  {
    label: "German",
    icon: <Image src={germany} alt="Germany Flag" width={24} height={24} />,
    href: "/german",
  },
  {
    label: "Spanish",
    icon: <Image src={spain} alt="Spain Flag" width={24} height={24} />,
    href: "/spanish",
  },
  {
    label: "Italian",
    icon: <Image src={italy} alt="Italy Flag" width={24} height={24} />,
    href: "/italian",
  },
  { label: "Profile", icon: <CiUser size={24} />, href: "/profile" },
];

const languageOptions = [
  { name: "English", code: "en", flag: unitedKingdom },
  { name: "German", code: "de", flag: germany },
  { name: "Spanish", code: "es", flag: spain },
  { name: "Italian", code: "it", flag: italy },
];

export default function NavBar() {
  const pathname = usePathname();
  const { locale, setLocale } = useI18n();
  const [showDropdown, setShowDropdown] = useState(false);

  const currentLang =
    languageOptions.find((lang) => lang.code === locale) || languageOptions[0];

  return (
    <nav className="h-screen w-64 text-gray-200 flex flex-col border-r-2 border-[#6A6A6A]">
      <div className="p-4 flex items-center justify-between">
        <span className="text-2xl font-bold">Multilingual</span>
        <div className="relative">
          <Button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-[#141F24] px-3 py-2 rounded-md hover:bg-gray-800"
          >
            <Image
              src={currentLang.flag}
              alt={currentLang.name}
              width={24}
              height={24}
            />
          </Button>

          {showDropdown && (
            <div className="absolute bg-[#141F24] left-0 mt-2 w-40 shadow-md rounded-md flex flex-col gap-1">
              {languageOptions.map((lang) => (
                <Button
                  key={lang.code}
                  onClick={() => {
                    setLocale(lang.code);
                    setShowDropdown(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 bg-[#141F24] text-white hover:font-semibold hover:bg-gray-800"
                >
                  <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={20}
                    height={20}
                  />
                  {lang.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      <ul className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`
      flex items-center gap-4
       rounded-md px-2 py-2 
      hover:bg-gray-800
      ${isActive ? "bg-gray-800 font-semibold border-2 border-[#31639C]" : ""}
    `}
              >
                {item.icon}
                <span className="text-xl">
                  {getTranslation(
                    locale,
                    `navbar.${item.label.toLocaleLowerCase()}`
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
