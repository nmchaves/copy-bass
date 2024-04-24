import { MusicGenre, parseGenreFilter } from "@/lib/genre";
import {
  SongWithSpotifyMetadata,
  enrichAllSongsWithSpotifyMetadata,
} from "@/server/spotify";
import {
  GenreQueryKey,
  SearchQueryKey,
} from "@/lib/songFilterRoutingConstants";
import { H1 } from "@/components/ui/Heading";
import { SongCard } from "./SongCard";
import { GenreFilter } from "./GenreFilter";
import { Search } from "./Search";

export default async function Home({
  searchParams,
}: {
  searchParams?: Partial<Record<SearchQueryKey | GenreQueryKey, string>>;
}) {
  const allSongs = await enrichAllSongsWithSpotifyMetadata();

  const searchQuery = searchParams?.query;
  const genreFilter = parseGenreFilter(searchParams?.genre);

  const filteredSongs = filterSongs({
    allSongs,
    searchQuery,
    genreFilter,
  });

  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-8 text-center">Nico&apos;s Practice Songs 🎸</H1>
      <div className="mb-4 flex items-center">
        <Search />
        <GenreFilter />
      </div>
      {filteredSongs.length === 0 ? (
        <NoSongs />
      ) : (
        <SongsGrid filteredSongs={filteredSongs} genreFilter={genreFilter} />
      )}
    </main>
  );
}

function SongsGrid({
  filteredSongs,
  genreFilter,
}: {
  filteredSongs: Array<SongWithSpotifyMetadata>;
  genreFilter: string | undefined;
}) {
  return (
    <div className="max-w-7xl grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredSongs.map((song) => (
        <div key={song.title} className="m-4">
          <SongCard
            song={song}
            // Don't show the genre icon when filtering by genre. It feels weird/redundant
            // to see a bunch of cards with the same icon.
            displayGenreIcon={genreFilter == null}
          />
        </div>
      ))}
    </div>
  );
}

function NoSongs() {
  return <p className="mt-8 font-semibold">No songs match your search</p>;
}

function filterSongs({
  allSongs,
  searchQuery,
  genreFilter,
}: {
  allSongs: Array<SongWithSpotifyMetadata>;
  searchQuery: string | undefined;
  genreFilter: MusicGenre | undefined;
}) {
  let filteredSongs = allSongs;

  if (searchQuery) {
    const lowerSearchQuery = searchQuery.toLowerCase();
    filteredSongs = filteredSongs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerSearchQuery) ||
        song.artist.toLowerCase().includes(lowerSearchQuery),
    );
  }

  if (genreFilter) {
    filteredSongs = filteredSongs.filter((song) => song.genre === genreFilter);
  }

  return filteredSongs;
}
