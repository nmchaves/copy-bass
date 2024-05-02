"use client";

import { useState } from "react";
import { BaseSongMetadata } from "@/lib/songs";
import { Player } from "./Player";

export function PlayersList({
  song: { youTubeVideos },
}: {
  song: BaseSongMetadata;
}) {
  const [playingVideoId, setPlayingVideoId] = useState<string>();

  if (youTubeVideos.length === 0) {
    return (
      <div>
        This song doesn&apos;t have any YouTube videos associated with it yet.
      </div>
    );
  }

  return (
    <ul className="w-full max-w-[1120px]">
      {youTubeVideos.map((video) => (
        <li key={video.id} className="mt-10 first:mt-0">
          <Player
            video={video}
            playing={playingVideoId === video.id}
            onPlay={() => setPlayingVideoId(video.id)}
            onPause={() => {
              if (playingVideoId === video.id) {
                setPlayingVideoId(undefined);
              }
            }}
          />
        </li>
      ))}
    </ul>
  );
}
