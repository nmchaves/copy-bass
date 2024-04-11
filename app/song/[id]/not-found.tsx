import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import bruceSearching from "@/public/bruce_searching.jpg";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-8">Song Not Found</h2>
      <Image
        src={bruceSearching}
        alt="Bruce Dickinson searching in a field of flowers"
        width={600}
        height={300}
        placeholder="blur"
        className="mb-4"
      />
      <p className="mb-8 text-center">
        Holy smokes. I looked all over, but I couldn&apos;t find the song
        you&apos;re looking for.
      </p>
      <Link href="/">
        <Button variant="link">Back to Home</Button>
      </Link>
    </main>
  );
}
