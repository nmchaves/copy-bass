import { SongMetadata, songs } from "@/lib/songs";
import { H1 } from "@/components/ui/Heading";
import { SongCard } from "./SongCard";
import { GenreFilter, GenreQueryKey } from "./GenreFilter";
import { Search, SearchQueryKey } from "./Search";

export default function Home({
  searchParams,
}: {
  searchParams?: Partial<Record<SearchQueryKey | GenreQueryKey, string>>;
}) {
  const searchQuery = searchParams?.query;
  const genreFilter = searchParams?.genre;

  const filteredSongs = filterSongs({
    allSongs: songs,
    searchQuery,
    genreFilter,
  });

  return (
    <main className="flex flex-col items-center">
      <H1 className="mb-4">Nico&apos;s Music Practice 🎸</H1>
      <h2 className="text-xl font-semibold mb-4">Songs</h2>
      <div className="mb-4 flex items-center">
        <Search />
        <GenreFilter />
      </div>

      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    </main>
  );
}

function filterSongs({
  allSongs,
  searchQuery,
  genreFilter,
}: {
  allSongs: Array<SongMetadata>;
  searchQuery: string | undefined;
  genreFilter: string | undefined;
}) {
  let filteredSongs = allSongs;

  if (searchQuery) {
    const lowerSearchQuery = searchQuery.toLowerCase();
    filteredSongs = songs.filter(
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
