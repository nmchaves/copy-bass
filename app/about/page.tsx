import { Metadata } from "next";
import Image from "next/image";
import { H1 } from "@/components/ui/Heading";

export const metadata: Metadata = {
  title: "About Copy Bass",
  description:
    "Info about why I built this site to help me practice bass guitar",
};

export default function Page() {
  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-8 text-center">About This Site</H1>
      <div className="max-w-2xl flex flex-col items-center">
        <p className="mb-6">
          I love music, especially songs with plenty of bass...the <em>real</em>{" "}
          kind <span className="text-xl">😜</span>
        </p>
        <Image
          src="/real_bass.jpeg"
          alt="An accurate meme explaining that bass guitars are real bass"
          width={300}
          height={300}
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
          <li>
            Embed YouTube videos of covers, live performances, isolated tracks,
            etc. for each song
          </li>
          <li>
            Allow me to easily adjust the playback rate. YouTube already lets
            you adjust the playback rate, but I wanted something with fewer
            clicks
          </li>
          <li>
            Allow me to specify a custom loop so I can repeatedly practice a
            specific section of a song
          </li>
        </ul>
        <p>{`Bass'd on that wishlist, I made this site!`}</p>
      </div>
    </main>
  );
}
