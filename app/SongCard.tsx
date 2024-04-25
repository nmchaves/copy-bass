import Image from "next/image";
import Link from "next/link";
import { genreEmojiDict, genreLabelDict } from "@/lib/genre";
import type { SongWithSpotifyMetadata } from "@/server/spotify";

export const SongCard: React.FC<{
  song: SongWithSpotifyMetadata;
  displayGenreIcon: boolean;
}> = ({ song, displayGenreIcon }) => {
  return (
    <Link
      href={`/song/${song.id}`}
      className="block relative p-6 transition hover:scale-105 focus:scale-105 border border-slate-300 hover:border-slate-400 focus:border-slate-400 rounded-xl bg-slate-50 hover:bg-slate-200 focus:bg-slate-200 shadow-lg hover:shadow-xl focus:shadow-xl"
    >
      {displayGenreIcon && (
        <span
          className="absolute top-1.5 right-1.5 text-xl"
          aria-label={`Genre: ${genreLabelDict[song.genre]}`}
        >
          {genreEmojiDict[song.genre]}
        </span>
      )}
      <div className="flex items-start gap-2.5">
        {song.spotify?.albumImgUrl && (
          <Image
            alt={`Album cover for ${song.title}`}
            height={60}
            width={60}
            src={song.spotify.albumImgUrl}
            className="rounded shadow-md"
          />
        )}
        <div>
          <p
            className="text-lg font-medium mb-1 leading-snug"
            aria-label="Song Title"
          >
            {song.title}
          </p>
          <p className="leading-snug" aria-label="Artist">
            {song.artist}
          </p>
        </div>
      </div>
    </Link>
  );
};
