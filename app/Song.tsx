import Link from "next/link";
import { SongMetadata } from "../lib/songs";

export const Song: React.FC<{ song: SongMetadata }> = ({ song }) => {
  return (
    <Link
      href={`/song/${song.id}`}
      className="block p-4 border border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100"
    >
      <p className="text-lg font-medium mb-1" aria-label="Song Title">
        {song.title}
      </p>
      <p aria-label="Artist">{song.artist}</p>
    </Link>
  );
};
