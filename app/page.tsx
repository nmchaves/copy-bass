import { songs } from "@/lib/songs";
import { SongCard } from "./SongCard";
import { Search, SearchQueryKey } from "./Search";

export default function Home({
  searchParams,
}: {
  searchParams?: Partial<Record<SearchQueryKey, string>>;
}) {
  const query = searchParams?.query;

  let filteredSongs = songs;
  if (query) {
    const lowerQuery = query.toLowerCase();
    filteredSongs = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(lowerQuery) ||
        song.artist.toLowerCase().includes(lowerQuery),
    );
  }

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">
        Nico&apos;s Music Practice 🎸
      </h1>
      <h2 className="text-xl font-semibold mb-4">Songs</h2>
      <Search />
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredSongs.map((song) => (
          <div key={song.title} className="m-4">
            <SongCard song={song} />
          </div>
        ))}
      </div>
    </main>
  );
}
