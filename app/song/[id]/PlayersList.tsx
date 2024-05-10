"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/16/solid";
import { BaseSongMetadata } from "@/lib/songs";
import { Button } from "@/components/ui/Button";
import { Player } from "./Player";

const LI_VIDEO_ID_DATA_ATTR_NAME = "data-video-id";

/**
 * A Map of video IDs to the corresponding <li> node.
 */
type ItemsRefMap = Map<string, HTMLLIElement>;

export function PlayersList({
  song: { youTubeVideos },
}: {
  song: BaseSongMetadata;
}) {
  const [playingVideoId, setPlayingVideoId] = useState<string>();

  const itemsRefMapContainer = useRef<ItemsRefMap>();

  // Note: This function gets passed to a `useEffect` deps array within
  // `useMaxIntersectionItem`. We only want that effect to run once, so it's
  // important to wrap this function with `useCallback` to preserve its identity.
  const getItemsRefMap = useCallback(() => {
    if (itemsRefMapContainer.current == null) {
      // Initialize the Map on first usage.
      // I wish we could use a lazy init with `useRef` like:
      // useRef(() => new Map());
      // But `useRef` doesn't support lazy init. So instead, we follow the React
      // team's recommendation:
      // https://github.com/facebook/react/issues/14490#issuecomment-454973512
      itemsRefMapContainer.current = new Map();
    }

    return itemsRefMapContainer.current;
  }, [itemsRefMapContainer]);

  const { maxIntersectionItemIdx, setMaxIntersectionItem } =
    useMaxIntersectionItem({
      youTubeVideos,
      getItemsRefMap,
    });

  const scrollToItemByIdx = (idx: number) => {
    const targetVideoId = youTubeVideos[idx].id;

    const map = getItemsRefMap();
    const liNode = map.get(targetVideoId);

    if (liNode) {
      liNode.scrollIntoView({
        behavior: "instant",
        block: "start",
      });

      // Manually update the max intersection state instead of relying on the
      // Intersection Observer. This helps the arrows work more intuitively on
      // very tall screens where multiple list items are completely visible.
      setMaxIntersectionItem({
        videoId: targetVideoId,
        // On small screens, the actual `intersectionRatio` will be < 1. But it
        // doesn't matter in practice. We just need to put _something_ here.
        intersectionRatio: 1,
      });
    }
  };

  const atBeginningOfList = maxIntersectionItemIdx === 0;
  const atEndOfList = maxIntersectionItemIdx === youTubeVideos.length - 1;

  const handlePrevItemClick = () => {
    if (maxIntersectionItemIdx == null || atBeginningOfList) {
      return;
    }

    scrollToItemByIdx(maxIntersectionItemIdx - 1);
  };

  const handleNextItemClick = () => {
    if (maxIntersectionItemIdx == null || atEndOfList) {
      return;
    }

    scrollToItemByIdx(maxIntersectionItemIdx + 1);
  };

  if (youTubeVideos.length === 0) {
    return (
      <div>
        This song doesn&apos;t have any YouTube videos associated with it yet.
      </div>
    );
  }

  // Only display the navigation arrows if there are multiple videos and we know
  // which list item has the max intersection. During the initial render, we
  // don't know `maxIntersectionItemIdx` since the `useEffect` containing the
  // Intersection Observer hasn't fired yet. We need `maxIntersectionItemIdx`
  // to determine if either arrow should be disabled, i.e. if we're at the
  // beginning or end of the list. If we displayed the arrows during the 1st
  // render, it might look janky because an arrow could immediately change from
  // enabled to disabled.
  const displayArrows =
    youTubeVideos.length > 1 && maxIntersectionItemIdx != null;

  return (
    <div className="w-full max-w-[1120px]">
      <ul>
        {youTubeVideos.map((video) => (
          <li
            key={video.id}
            {...{ [LI_VIDEO_ID_DATA_ATTR_NAME]: video.id }}
            id={video.id}
            className="mt-10 first:mt-0"
            ref={(liNode) => {
              const map = getItemsRefMap();
              if (liNode) {
                map.set(video.id, liNode);
              }

              return () => {
                map.delete(video.id);
              };
            }}
          >
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
      {displayArrows && (
        <div className="fixed top-1/2 right-4 hidden md:block">
          <Button
            className="rounded-full flex"
            variant="ghost"
            size="icon"
            aria-label="Scroll to previous video"
            onClick={() => handlePrevItemClick()}
            disabled={atBeginningOfList}
          >
            <ArrowUpIcon className="size-8" />
          </Button>

          <Button
            className="rounded-full flex"
            variant="ghost"
            size="icon"
            aria-label="Scroll to next video"
            onClick={() => handleNextItemClick()}
            disabled={atEndOfList}
          >
            <ArrowDownIcon className="size-8" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface MaxIntersectionItem {
  videoId: string;
  intersectionRatio: number;
}

/**
 * Keeps track of the list item with the maximum `intersectionRatio`, i.e. the
 * most visible item according to an Intersection Observer.
 */
const useMaxIntersectionItem = ({
  youTubeVideos,
  getItemsRefMap,
}: {
  youTubeVideos: BaseSongMetadata["youTubeVideos"];
  getItemsRefMap: () => ItemsRefMap;
}) => {
  const [maxIntersectionItem, setMaxIntersectionItem] =
    useState<MaxIntersectionItem>();

  const maxIntersectionItemIdx = maxIntersectionItem
    ? youTubeVideos.findIndex((vid) => vid.id === maxIntersectionItem.videoId)
    : null;

  useEffect(
    () => {
      const observer = new IntersectionObserver(
        (entries) => {
          // The item with the greatest `intersectionRatio` among the `entries`
          // included in this callback invocation.
          // Note that `entries` does NOT necessarily include all of the list
          // items. It only includes the items that are crossing an intersection
          // threshold.
          const localMaxIntersectionItem = getMaxIntersectionItem(entries);

          if (localMaxIntersectionItem == null) {
            return;
          }

          // Note: We use the callback form of `setState` here. If we referenced
          // the state directly, we'd need to add it to the `useEffect` deps,
          // which would cause the effect to run on every state change. But we
          // only want the effect to run once.
          setMaxIntersectionItem((prevGlobalMaxItem) => {
            if (
              prevGlobalMaxItem == null ||
              // Local max is the same as the previous global. Update the state
              // to reflect the new intersection ratio.
              localMaxIntersectionItem.videoId === prevGlobalMaxItem.videoId ||
              // Found a new max
              localMaxIntersectionItem.intersectionRatio >=
                prevGlobalMaxItem.intersectionRatio
            ) {
              return localMaxIntersectionItem;
            }

            return prevGlobalMaxItem;
          });
        },
        {
          threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        },
      );

      const map = getItemsRefMap();
      const liNodeRefs = map.values();
      for (const liNode of liNodeRefs) {
        observer.observe(liNode);
      }
    },
    // Only run this effect once. We only want to create one Intersection
    // Observer instance.
    // Note that `getItemsRefMap` should be wrapped in `useCallback` so its
    // identity never changes.
    [getItemsRefMap],
  );

  return {
    maxIntersectionItem,
    maxIntersectionItemIdx,
    setMaxIntersectionItem,
  };
};

function getMaxIntersectionItem(
  entries: Array<IntersectionObserverEntry>,
): MaxIntersectionItem | null {
  let maxItem: MaxIntersectionItem | null = null;

  for (const entry of entries) {
    if (
      maxItem == null ||
      entry.intersectionRatio > maxItem.intersectionRatio
    ) {
      maxItem = {
        videoId: entry.target.getAttribute(LI_VIDEO_ID_DATA_ATTR_NAME)!,
        intersectionRatio: entry.intersectionRatio,
      };
    }
  }

  return maxItem;
}
