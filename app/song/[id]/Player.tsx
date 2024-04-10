"use client";

import { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { Slider } from "@/components/ui/Slider";

export const Player: React.FC<{ url: string }> = ({ url }) => {
  // The YouTube player UI already allows the user to customize the playback
  // speed. But I don't like repeatedly opening/closing those settings while I'm
  // practicing.
  // TODO: If the user manually changes the playback speed using the player,
  // update this React state to stay in sync.
  const [playbackRate, setPlaybackRate] = useState(1);
  const playbackRateInputId = `playbackRate-${url}`;

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Note: react-player doesn't support SSR. See:
  // https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105
  // That solution recommends using next/dynamic, but it's simpler to use the
  // `ClientOnly` component. For example, the next/dynamic approach would require
  // an extra wrapper in order to use refs. See:
  // https://github.com/cookpete/react-player/issues/1455#issuecomment-1207154843
  return (
    <ClientOnly>
      <ReactPlayer
        url={url}
        controls={true}
        playbackRate={playbackRate}
        onReady={() => setIsPlayerReady(true)}
      />

      <div className={cn("w-1/2 mx-auto mt-2", { invisible: !isPlayerReady })}>
        <div className="mb-2 flex items-center justify-between">
          <label className="font-medium" htmlFor={playbackRateInputId}>
            Playback Rate
          </label>
          <span className="ml-1 font-medium" aria-label="Playback Rate Value">
            {playbackRate}
          </span>
        </div>

        <Slider
          id={playbackRateInputId}
          value={[playbackRate]}
          min={0.1}
          max={2}
          step={0.1}
          onValueChange={([newValue]) => {
            setPlaybackRate(newValue);
          }}
        />
      </div>
    </ClientOnly>
  );
};
