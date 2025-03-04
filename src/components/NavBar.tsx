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

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="h-screen w-64 text-gray-200 flex flex-col border-r-2 border-[#6A6A6A]">
      <div className="p-4 text-2xl font-bold">Multilingual</div>
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
                <span className="text-xl">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
