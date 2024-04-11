import Link from "next/link";
import { genreEmojiDict, genreLabelDict, SongMetadata } from "../lib/songs";

export const SongCard: React.FC<{
  song: SongMetadata;
  displayGenreIcon: boolean;
}> = ({ song, displayGenreIcon }) => {
  return (
    <Link
      href={`/song/${song.id}`}
      className="block relative p-6 transition-colors border border-slate-300 hover:border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-200"
    >
      {displayGenreIcon && (
        <span
          className="absolute top-1.5 right-1.5 text-xl"
          aria-label={`Genre: ${genreLabelDict[song.genre]}`}
        >
          {genreEmojiDict[song.genre]}
        </span>
      )}
      <p className="text-lg font-medium mb-1" aria-label="Song Title">
        {song.title}
      </p>
      <p aria-label="Artist">{song.artist}</p>
    </Link>
  );
};
