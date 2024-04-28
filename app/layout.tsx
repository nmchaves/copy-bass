import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/ui/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Copy Bass",
  description: "Nico's app for practicing bass guitar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <div className="p-16 pt-0">{children}</div>
      </body>
    </html>
  );
}
