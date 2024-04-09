"use client";

import dynamic from "next/dynamic";
// react-player doesn't support SSR. See:
// https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105
const ReactPlayer = dynamic(() => import("react-player/lazy"), {
  ssr: false,
});

export const Player: React.FC<{ url: string }> = ({ url }) => {
  return <ReactPlayer url={url} controls={true} />;
};
