import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SongMetadata, songs } from "@/lib/songs";
import { Button } from "@/components/ui/Button";
import { H1 } from "@/components/ui/Heading";
import { Player } from "./Player";

const findSongById = (id: string) => songs.find((song) => song.id === id);

interface Props {
  params: { id: string };
}

export function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Metadata {
  const song = findSongById(params.id);

  if (song) {
    return {
      title: `${song.title} by ${song.artist}`,
      description: `Nico's practice page for ${song.title}`,
    };
  }

  // In practice, this shouldn't matter. The page should 404 if we can't find the song.
  return {
    title: "Song Not Found",
    description: "Unknown Song Page",
  };
}

export default function Page({ params }: Props) {
  const song = findSongById(params.id);

  if (song == null) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center">
      <Link href="/" className="self-start">
        <Button variant="link">&larr; All Songs</Button>
      </Link>
      <H1 className="mt-4 mb-10 text-center">
        {song.title} by {song.artist}
      </H1>
      <div className="mb-12 min-w-72 max-w-md p-4 border border-cyan-950 rounded">
        <div className="mb-1 font-semibold">Tuning</div>
        <div>{song.tuning}</div>
        {song.notes && (
          <div className="mt-4">
            <h2 className="font-medium mb-1">Notes</h2>
            <p>{song.notes}</p>
          </div>
        )}
      </div>
      <PlayersList song={song} />
    </main>
  );
}

function PlayersList({ song }: { song: SongMetadata }) {
  const urls = song.youTubeURLs;

  if (urls.length === 0) {
    return <div>This song doesn&apos;t have any YouTube URLs yet.</div>;
  }

  return (
    <ul className="w-full max-w-[640px]">
      {urls.map((url) => (
        <li key={url} className="mt-10 first:mt-0">
          <Player url={url} />
        </li>
      ))}
    </ul>
  );
}
