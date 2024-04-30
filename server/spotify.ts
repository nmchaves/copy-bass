import "server-only";
import SpotifyWebApi from "spotify-web-api-node";
import { BaseSongMetadata, songs } from "@/lib/songs";
import { zipWith } from "@/lib/utils";
import { serverEnv } from "./serverEnv";

const spotifyApi = new SpotifyWebApi({
  clientId: serverEnv.SPOTIFY_CLIENT_ID,
  clientSecret: serverEnv.SPOTIFY_CLIENT_SECRET,
});

export interface Track {
  album: Album;
}

interface Album {
  images: Array<AlbumImage>;
}

interface AlbumImage {
  url: string;
}

export async function fetchTracks(
  songs: Array<Pick<BaseSongMetadata, "spotifyId">>,
): Promise<Array<Track>> {
  // TODO: Test if `spotify-web-api-node` handles batching.
  if (songs.length > 100) {
    throw new Error(
      `The fetchTracks function cannot currently handle more than 100 songs. But it received ${songs.length} songs. The Spotify tracks endpoint accepts a max of 100 IDs. ` +
        "To handle more than 100 songs, we'll need to implement batching.",
    );
  }

  const spotifySongIds = songs.map((song) => song.spotifyId);

  const credsGrantRes = await spotifyApi.clientCredentialsGrant();
  const accessToken = credsGrantRes.body.access_token;
  spotifyApi.setAccessToken(accessToken);

  const tracksRes = await spotifyApi.getTracks(spotifySongIds);
  return tracksRes.body.tracks;
}

export interface SongWithSpotifyMetadata extends BaseSongMetadata {
  spotify: SpotifySongMetadata | undefined;
}

interface SpotifySongMetadata {
  albumImgUrl: string | undefined;
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
        const albumImgUrl = images.length > 0 ? images[0].url : undefined;
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
