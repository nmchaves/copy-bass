import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/ui/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Music Practice App",
  description: "Nico's Music Practice App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} p-16 pb-0 flex flex-col justify-between`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
