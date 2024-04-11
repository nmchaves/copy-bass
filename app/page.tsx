import { songs } from "@/lib/songs";
import { Song } from "./Song";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-semibold mb-4">
        Nico&apos;s Music Practice 🎸
      </h1>
      <h2 className="text-xl font-semibold mb-2">Songs</h2>
      <div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {songs.map((song) => (
          <div key={song.title} className="m-4">
            <Song song={song} />
          </div>
        ))}
      </div>
    </main>
  );
}
