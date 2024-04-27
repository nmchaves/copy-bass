import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BaseSongMetadata, songs } from "@/lib/songs";
import { searchQueryKey } from "@/lib/songFilterRoutingConstants";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
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

  const artistSearchParams = new URLSearchParams();
  artistSearchParams.set(searchQueryKey, song.artist);

  return (
    <main className="flex flex-col items-center">
      <Link href="/" className="self-start">
        <Button variant="link">&larr; All Songs</Button>
      </Link>
      <PageHeading className="mt-4 mb-10">
        {song.title} by{" "}
        <Link
          href={`/?${artistSearchParams.toString()}`}
          className="underline-offset-4 hover:underline"
        >
          {song.artist}
        </Link>
      </PageHeading>
      <div className="mb-12 min-w-72 max-w-xl p-4 border border-cyan-950 rounded">
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

function PlayersList({ song: { youTubeVideos } }: { song: BaseSongMetadata }) {
  if (youTubeVideos.length === 0) {
    return (
      <div>
        This song doesn&apos;t have any YouTube videos associated with it yet.
      </div>
    );
  }

  return (
    <ul className="w-full max-w-[1120px]">
      {youTubeVideos.map(({ id }) => (
        <li key={id} className="mt-10 first:mt-0">
          <Player url={`https://www.youtube.com/watch?v=${id}`} />
        </li>
      ))}
    </ul>
  );
}
