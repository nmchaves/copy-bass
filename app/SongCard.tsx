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
      className="block relative p-6 transition hover:scale-105 focus:scale-105 border rounded-xl bg-card hover:bg-accent focus:bg-accent text-card-foreground shadow-md hover:shadow-lg focus:shadow-lg ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
            className="rounded"
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
