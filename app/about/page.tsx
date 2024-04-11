import { Metadata } from "next";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "About Nico's Music Site",
  description: "Info about why I built this site to help me practice",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-4">About This Site</H1>
      <p>TODO: Explain the purpose of this site</p>
    </main>
  );
}
