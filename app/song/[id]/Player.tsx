"use client";

import { useState } from "react";
import ReactPlayer, { YouTubePlayerProps } from "react-player/youtube";
import { cn } from "@/lib/utils";
import { ClientOnly } from "@/components/ui/ClientOnly";
import { Skeleton } from "@/components/ui/Skeleton";
import { Slider } from "@/components/ui/Slider";

// Note: react-player doesn't support SSR. See:
// https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105
// That solution recommends using next/dynamic, but it's simpler to use the
// `ClientOnly` component. For example, the next/dynamic approach would require
// an extra wrapper in order to use refs. See:
// https://github.com/cookpete/react-player/issues/1455#issuecomment-1207154843
const ClientOnlyReactPlayer: React.FC<YouTubePlayerProps> = (props) => (
  <ClientOnly>
    <ReactPlayer {...props} />
  </ClientOnly>
);

/** Player dimensions in pixels */
const playerDim = {
  width: 640,
  height: 360,
} as const;

export const Player: React.FC<{ url: string }> = ({ url }) => {
  // The YouTube player UI already allows the user to customize the playback
  // speed. But I don't like repeatedly opening/closing those settings while I'm
  // practicing.
  // TODO: If the user manually changes the playback speed using the player,
  // update this React state to stay in sync.
  const [playbackRate, setPlaybackRate] = useState(1);
  const playbackRateInputId = `playbackRate-${url}`;

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  return (
    <>
      <Skeleton
        className={cn(`w-[${playerDim.width}px] h-[${playerDim.height}px]`, {
          hidden: isPlayerReady,
        })}
      />
      {/* For some reason, `react-player` doesn't update its `className` on re-renders. So we need a wrapper */}
      <div className={isPlayerReady ? "visible" : "invisible"}>
        <ClientOnlyReactPlayer
          url={url}
          width={playerDim.width}
          height={playerDim.height}
          controls={true}
          loop={true}
          onReady={() => setIsPlayerReady(true)}
          playbackRate={playbackRate}
        />
      </div>

      <div className={cn("w-1/2 mx-auto mt-2", { invisible: !isPlayerReady })}>
        <div className="mb-2 flex items-center justify-between">
          <label className="font-medium" htmlFor={playbackRateInputId}>
            Playback Rate
          </label>
          <span className="ml-1 font-medium" aria-label="Playback Rate Value">
            {playbackRate}x
          </span>
        </div>

        <Slider
          id={playbackRateInputId}
          value={[playbackRate]}
          // Note: YouTube videos seem to typically allow for 0.25x to 2x speed,
          // but that's not guaranteed. Ideally, we'd use the player's
          // `getAvailablePlaybackRates()` method to determine the given video's
          // available playback rates. However, that method returns an array,
          // while this component expects min/max/step. But in practice, this is
          // fine. If we end up allowing the user to select an invalid playback
          // rate for the given video, then the player is supposed to round the
          // proposed rate down to a valid value. For more details, see:
          // https://developers.google.com/youtube/iframe_api_reference#setPlaybackRate
          min={0.25}
          max={2}
          step={0.05}
          onValueChange={([newValue]) => {
            setPlaybackRate(newValue);
          }}
        />
      </div>
    </>
  );
};
