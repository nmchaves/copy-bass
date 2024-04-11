import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources to help learn bass guitar",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">Resources</h1>
      <p>
        TODO: Add some helpful resources, such as videos/links about how to
        emulate the tone of various bassists, tutorials on reading sheet music,
        etc.
      </p>
    </main>
  );
}
