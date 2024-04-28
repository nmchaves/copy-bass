import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BaseSongMetadata, TabsMetadata, songs } from "@/lib/songs";
import { searchQueryKey } from "@/lib/songFilterRoutingConstants";
import { parseNotesFromTabMakerFile } from "@/server/tabs/tabMaker";
import { Button } from "@/components/ui/Button";
import { PageHeading } from "@/components/ui/PageHeading";
import { Player } from "./Player";
import {
  ParsedTabsWithLabel,
  TabsListWithFloatingTabs,
} from "./TabsListWithFloatingTabs";

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

export default async function Page({ params }: Props) {
  const song = findSongById(params.id);

  if (song == null) {
    notFound();
  }

  const parsedTabsList = await parseTabs(song.tabs);

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
        {parsedTabsList.length > 0 && (
          <div className="mt-4">
            <h2 className="font-medium mb-1">Tabs</h2>
            <TabsListWithFloatingTabs tabsList={parsedTabsList} />
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
      {youTubeVideos.map((video) => (
        <li key={video.id} className="mt-10 first:mt-0">
          <Player video={video} />
        </li>
      ))}
    </ul>
  );
}

async function parseTabs(
  tabsMetaArr: Array<TabsMetadata> | undefined,
): Promise<Array<ParsedTabsWithLabel>> {
  if (tabsMetaArr == null || tabsMetaArr.length === 0) {
    return [];
  }

  return Promise.all(
    tabsMetaArr.map(async (tabsMeta): Promise<ParsedTabsWithLabel> => {
      const tabs = await parseNotesFromTabMakerFile(
        tabsMeta.tabMakerExportFilename,
      );
      return { tabs, label: tabsMeta.label };
    }),
  );
}
