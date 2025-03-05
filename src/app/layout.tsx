import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { I18nProvider } from "@/contexts/I18nContext";

export const metadata: Metadata = {
  title: "Multilingual",
  description: "Created by Lenny Ruprecht",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="relative h-screen w-screen bg-[#141F24]">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
