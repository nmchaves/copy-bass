import "server-only";
import { z } from "zod";
import { BaseSongMetadata, songs } from "@/lib/songs";
import { zipWith } from "@/lib/utils";
import { serverEnv } from "./serverEnv";

const AccessTokenResponseSchema = z.object({
  access_token: z.string().min(1),
});

async function fetchAccessToken() {
  // See the Client Credentials example in Spotify's `web-api-examples` repo:
  // https://github.com/spotify/web-api-examples/tree/master/authorization/client_credentials
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          `${serverEnv.SPOTIFY_CLIENT_ID}:${serverEnv.SPOTIFY_CLIENT_SECRET}`,
        ).toString("base64"),
    },
  });

  const { access_token } = await res
    .json()
    .then((data) => AccessTokenResponseSchema.parse(data));

  return access_token;
}

const AlbumImageSchema = z.object({
  url: z.string().url(),
});

const AlbumSchema = z.object({
  images: z.array(AlbumImageSchema),
});

const TrackSchema = z.object({
  album: AlbumSchema,
});

export type Track = z.TypeOf<typeof TrackSchema>;

const TracksResponseSchema = z.object({
  tracks: z.array(TrackSchema),
});

export async function fetchTracks(
  songs: Array<Pick<BaseSongMetadata, "spotifyId">>,
): Promise<Array<Track>> {
  if (songs.length > 100) {
    throw new Error(
      `The fetchTracks function cannot currently handle more than 100 songs. But it received ${songs.length} songs. The Spotify tracks endpoint accepts a max of 100 IDs. ` +
        "To handle more than 100 songs, we'll need to implement batching.",
    );
  }

  const spotifySongIds = songs.map((song) => song.spotifyId);

  const accessToken = await fetchAccessToken();

  const res = await fetch(
    `https://api.spotify.com/v1/tracks?ids=${spotifySongIds.join(",")}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const { tracks } = await res
    .json()
    .then((data) => TracksResponseSchema.parse(data));

  return tracks;
}

export interface SongWithSpotifyMetadata extends BaseSongMetadata {
  spotify: SpotifySongMetadata | undefined;
}

interface SpotifySongMetadata {
  albumImgUrl: string;
}

export async function enrichAllSongsWithSpotifyMetadata(): Promise<
  Array<SongWithSpotifyMetadata>
> {
  try {
    const spotifyTracks = await fetchTracks(songs);

    const songsWithSpotifyMeta = zipWith(
      songs,
      spotifyTracks,
      (song, spotifyTrack): SongWithSpotifyMetadata => {
        const { images } = spotifyTrack.album;
        // TODO: fallback image
        const albumImgUrl = images.length > 0 ? images[0].url : "";
        return {
          ...song,
          spotify: { albumImgUrl },
        };
      },
    );

    return songsWithSpotifyMeta;
  } catch (e) {
    return songs.map((song) => ({ ...song, spotify: undefined }));
  }
}
