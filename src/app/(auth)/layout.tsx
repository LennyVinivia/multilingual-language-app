import { ReactNode } from "react";
import Image from "next/image";
import placeholder from "@/public/img/placeholder.png";
import "@/app/globals.css";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-full flex h-full gap-6">
        <div className="w-full p-16 flex flex-col justify-center gap-4">
          {children}
        </div>
        <div className="w-full relative">
          <Image
            src={placeholder}
            alt="Placeholder Image"
            className="w-full h-screen rounded-tl-[60px] rounded-bl-[60px]"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
