import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHeading } from "@/components/ui/PageHeading";
import realBass from "@/public/real_bass.jpg";
import westHamLogo from "@/public/west_ham_logo.png";

export const metadata: Metadata = {
  title: "About Copy Bass",
  description:
    "Info about why I built this site to help me practice bass guitar",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <PageHeading className="mb-8">About This Site</PageHeading>
      <div className="max-w-2xl flex flex-col items-center">
        <p className="mb-6">
          I love music, especially songs with plenty of bass...the <em>real</em>{" "}
          kind <span className="text-xl">😜</span>
        </p>
        <Image
          src={realBass}
          alt="An accurate meme explaining that bass guitars are real bass"
          width={300}
          priority
          placeholder="blur"
          className="mb-6 rounded-sm"
        />
        <p>
          I like to play bass guitar as a hobby. My favorite way to practice is
          to play songs. I always wished I had a tool that would do a few things
          to help me practice:
        </p>
        <ul className="my-6 mx-6 md:mx-12 list-disc">
          <li>List all of the songs I want to practice in 1 place</li>
          <li>Show notes/tips about how to play each song, including tuning</li>
          <li>Show tabs, if available</li>
          <li>
            Embed videos of covers, live performances, isolated tracks, etc.
          </li>
          <li>
            Allow me to easily adjust the playback rate. YouTube already lets
            users adjust the playback rate, but I wanted something with fewer
            clicks
          </li>
          <li>
            Allow me to specify a custom loop so I can repeatedly practice a
            specific section of a song
          </li>
        </ul>
        <p className="mb-6">
          <span className="font-bold">BASS</span>&apos;d on that wishlist, I
          made this site!
        </p>
        <p className="mb-6">
          The favicon is based on a{" "}
          <Link
            href="https://www.flaticon.com/free-icon/bass-guitar_4280672"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-4 hover:decoration-2"
          >
            Flaticon image
          </Link>
          ...but of course, I <em>had</em> to rotate it since I&apos;m
          left-handed.
        </p>
        <p className="mb-6">
          I generated the Copy Bass logo using an Iron Maiden-style font from{" "}
          <Link
            href="https://fontmeme.com/iron-maiden-font"
            rel="noopener noreferrer"
            target="_blank"
            className="underline underline-offset-4 hover:decoration-2"
          >
            Font Meme
          </Link>
          , with the &ldquo;OutlineUltra&rdquo; effect. In case you
          couldn&apos;t already tell, I&apos;m a big fan of Iron Maiden,
          especially their bassist Steve Harris.
        </p>
        <p className="mb-6">
          The color of the logo even uses the maroon color of Steve&apos;s
          favorite futbol team, West Ham United.
        </p>
        <Image
          src={westHamLogo}
          alt="The logo for West Ham United Football Club, which depicts a pair of riveting hammers in a crossing pattern"
          width={240}
          // Don't use `blur` here. It would look a little weird since the
          // non-transparent part of the logo isn't rectangular. It's a crest.
          placeholder="empty"
          className="mb-6"
        />
        <p>
          Am I a little obsessed with Iron Maiden? ...
          <span className="font-bold">BASS</span>ically, yes.
        </p>
      </div>
    </main>
  );
}
