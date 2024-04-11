import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const Footer = () => {
  return (
    <footer className="flex items-center justify-center py-8">
      <Link href="/">
        <Button variant="link">Songs</Button>
      </Link>
      <Link href="/resources">
        <Button variant="link">Resources</Button>
      </Link>
      <Link href="/about">
        <Button variant="link">About</Button>
      </Link>
    </footer>
  );
};
