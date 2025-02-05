import type { Metadata } from "next";
import { ReactNode } from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "AdiMed",
  description: "AdiMed - Created by AS Informatik",
};

type LayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className="relative h-screen w-screen">
        {/* Header (common across all pages) */}
        <header className="absolute top-0 left-0 p-4">
          <h1 className="text-4xl font-bold">Logo</h1>
        </header>

        {/* Main content area where nested layouts will render */}
        <main className="h-full w-full">{children}</main>

        {/* Footer (common across all pages) */}
        <footer className="absolute bottom-0 left-0 p-4">
          <p className="text-sm">© All copyrights reserved 2024</p>
        </footer>
      </body>
    </html>
  );
}
