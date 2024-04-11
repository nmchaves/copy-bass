import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Nico's Music Site",
  description: "Info about why I built this site to help me practice",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">About This Site</h1>
      <p>TODO: Explain the purpose of this site</p>
    </main>
  );
}
