import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo_west_ham_maroon.png";
import { Button } from "@/components/ui/Button";

export const Header = () => {
  return (
    <header className="py-8 px-16">
      <nav className="flex items-center justify-center md:justify-normal">
        <Link href="/">
          <Image
            src={logo}
            height={40}
            alt="Copy Bass"
            className="mr-12 hidden md:block"
          />
        </Link>
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
