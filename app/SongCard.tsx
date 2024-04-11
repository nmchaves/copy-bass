import Link from "next/link";
import { SongMetadata } from "../lib/songs";

export const SongCard: React.FC<{ song: SongMetadata }> = ({ song }) => {
  return (
    <Link
      href={`/song/${song.id}`}
      className="block p-4 transition-colors border border-slate-300 hover:border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-200"
    >
      <p className="text-lg font-medium mb-1" aria-label="Song Title">
        {song.title}
      </p>
      <p aria-label="Artist">{song.artist}</p>
    </Link>
  );
};
