import { H1 } from "@/components/ui/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources to help learn bass guitar",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-4 text-center">Resources</H1>
      <p>
        TODO: Add some helpful resources, such as videos/links about how to
        emulate the tone of various bassists, tutorials on reading sheet music,
        etc.
      </p>
    </main>
  );
}
