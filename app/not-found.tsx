import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Not Found</h2>
      <p className="mb-8">Couldn&apos;t find what you&apos;re looking for.</p>
      <Link href="/">
        <Button variant="link">Back to Home</Button>
      </Link>
    </main>
  );
}
