import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Song Not Found</h2>
      <p className="mb-8">
        Couldn&apos;t find the song you&apos;re looking for.
      </p>
      <Link href="/">Back to Home</Link>
    </main>
  );
}
