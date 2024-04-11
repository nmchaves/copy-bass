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
  const [playbackRate, setPlaybackRate] = useState(1);

  // The date when the playback rate was last changed via the React slider (as
  // opposed to via the YouTube player's built-in controls).
  // See `isRateChangeProbablyFromPlayerBuiltInControls` for more.
  const [
    reactSliderPlaybackRateChangeDate,
    setReactSliderPlaybackRateChangeDate,
  ] = useState<Date>(new Date());

  const playbackRateInputId = `playbackRate-${url}`;

  const [isPlayerReady, setIsPlayerReady] = useState(false);

  return (
    <>
      <Skeleton
        className={cn({ hidden: isPlayerReady })}
        style={{
          width: playerDim.width,
          height: playerDim.height,
        }}
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
          onPlaybackRateChange={(newRate: number) => {
            if (
              isRateChangeProbablyFromPlayerBuiltInControls({
                curDate: new Date(),
                reactSliderPlaybackRateChangeDate,
              })
            ) {
              setPlaybackRate(newRate);
            }
          }}
        />
      </div>

      <div className={cn("w-1/2 mx-auto mt-2", { invisible: !isPlayerReady })}>
        <div className="mb-2 flex items-center justify-between">
          <label className="font-medium" htmlFor={playbackRateInputId}>
            Playback Rate
          </label>
          <span
            className="ml-1 font-medium tabular-nums"
            aria-label="Playback Rate Value"
          >
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
            setReactSliderPlaybackRateChangeDate(new Date());
          }}
        />
      </div>
    </>
  );
};

/**
 * A function to determine whether a change to the `react-player` component's
 * internal playback rate state "probably" came from the React slider (as
 * opposed to the player's built-in controls).
 *
 * This is helpful for keeping the `playbackRate` React state in sync with the
 * `react-player` component's internal state.
 *
 * Keeping the state in sync is surprisingly tricky! Initially, I tried simply
 * calling `setPlaybackRate` inside the player's `onPlaybackRateChange`
 * callback. That way, we'd update our React state whenever the user modified
 * the playback rate via the player's controls (as opposed to the React slider).
 * That works just fine when updating the playback rate via the player, but
 * it would result in a very janky/broken UX when updating the playback rate
 * via the React slider. The `onPlaybackRateChange` callback fires any time
 * the player's internal playback rate changes, even if the change was due to
 * its `playbackRate` prop updating. As a result, we could end up calling
 * `setPlaybackRate` with a stale value inside `onPlaybackRateChange` after
 * adjusting the slider. It's a tricky race condition that doesn't always
 * happen. I think it basically works like the following scenario:
 * 1. Initially, the playback rate is 1x
 * 2. The user starts adjusting the React slider to speed up the video. The
 * slider reaches 1.05x and triggers an update to the `playbackRate` React state.
 * 3. The component re-renders and we pass the updated `playbackRate` of 1.05
 * to the `react-player` component, but the `onPlaybackRateChange` callback
 * doesn't fire just yet.
 * 4. The slider reaches 1.25x and triggers another update to the `playbackRate`
 * React state.
 * 5. The component re-renders and we pass the updated `playbackRate` of 1.25
 * to the `react-player` component, but the `onPlaybackRateChange` callback
 * still doesn't fire.
 * 6. The `onPlaybackRateChange` callback finally fires...but with a stale value
 * of 1.05, causing us to update the `playbackRate` React state back to 1.05.
 * 7. The `onPlaybackRateChange` callback fires again (but with a value of 1.25),
 * causing us to update the `playbackRate` React state to 1.25.
 *
 * These state updates trigger more re-renders, thereby updating the `react-player`
 * component's `playbackRate` prop and triggering more `onPlaybackRateChange`
 * callback invocations. So the state repeatedly jumps back and forth and may
 * end up settling on the stale value of 1.05.
 *
 * So from the user's perspective, there are cases when the slider jumps back
 * and forth rapidly and settles on the wrong value. Obviously, we don't want that.
 *
 * Ok, so why don't we just try to determine whether the playback rate was
 * modified via the React slider or the player? That way, we could avoid
 * unnecessarily updating the React state inside the player's `onPlaybackRateChange`
 * callback. However, it isn't as easy as it sounds to do this directly!
 *
 * I tried using the React slider's `onValueCommit` prop to keep track of
 * whether a given change to the `playbackRate` was coming from the React
 * slider or from the player. However, that prop is too unreliable. It doesn't
 * always fire when the user stops sliding. See:
 * https://github.com/radix-ui/primitives/issues/1760
 * Moreover, the callback doesn't fire at all when adjusting the slider via
 * keyboard arrows.
 *
 * So instead, we keep track of the date when the user last modified the
 * playback rate via the React slider. And we use this function to compare the
 * current date to that date. If enough time has elapsed, we can assume that the
 * change probably came from the YouTube player's built-in controls. In practice,
 * it's hard for a human to adjust the React slider and then adjust the YouTube
 * player's own playback rate controls without at least a few hundred ms between
 * those interactions. So this heuristic works well in practice.
 */
function isRateChangeProbablyFromPlayerBuiltInControls({
  curDate,
  reactSliderPlaybackRateChangeDate,
}: {
  curDate: Date;
  reactSliderPlaybackRateChangeDate: Date;
}) {
  const msSinceLastReactSliderChange =
    curDate.getTime() - reactSliderPlaybackRateChangeDate.getTime();
  return msSinceLastReactSliderChange >= 500;
}
