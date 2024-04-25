import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  return (
    <header className="flex items-center justify-center py-8">
      <nav>
        <Link href="/">
          <Button variant="link">Songs</Button>
        </Link>
        <Link href="/resources">
          <Button variant="link">Resources</Button>
        </Link>
        <Link href="/about">
          <Button variant="link">About</Button>
        </Link>
        <Link
          href="https://github.com/nmchaves/copy-bass"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button variant="link">GitHub Repo</Button>
        </Link>
      </nav>
    </header>
  );
};
