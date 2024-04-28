import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/ui/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Copy Bass",
  description: "Nico's app for practicing bass guitar",
  // By default, Vercel uses the "deployment URL", i.e. `process.env.VERCEL_URL`
  // for `metadataBase`.
  // See https://nextjs.org/docs/app/api-reference/functions/generate-metadata#default-value
  //
  // But within the Vercel dashboard, this project's "Deployment Protection"
  // settings are set to "Standard Protection", which is the default/recommended
  // setting. As a result, only the up-to-date prod domains (e.g. www.copybass.com)
  // are publicly accessible. All other URLs (including `VERCEL_URL`) can only
  // be accessed after authenticating with Vercel. So the OG images would be
  // behind an auth wall.
  //
  // Let's use the prod domain for `metadataBase` so the OG images can be
  // accessed by other systems (without needing to weaken the project's Deployment
  // Protection settings).
  //
  // For more background, see this related discussion:
  // https://github.com/vercel/next.js/discussions/50546
  metadataBase: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : new URL(`http://localhost:${process.env.PORT || 3000}`),
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
        <div className="p-16 pt-4">{children}</div>
      </body>
    </html>
  );
}
