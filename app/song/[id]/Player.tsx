"use client";

import ReactPlayer from "react-player/youtube";
import { ClientOnly } from "@/components/ui/ClientOnly";

export const Player: React.FC<{ url: string }> = ({ url }) => {
  // Note: react-player doesn't support SSR. See:
  // https://github.com/cookpete/react-player/issues/1474#issuecomment-1184645105
  // That solution recommends using next/dynamic, but it's simpler to use the
  // `ClientOnly` component. For example, the next/dynamic approach would require
  // an extra wrapper in order to use refs. See:
  // https://github.com/cookpete/react-player/issues/1455#issuecomment-1207154843
  return (
    <ClientOnly>
      <ReactPlayer url={url} controls={true} />
    </ClientOnly>
  );
};
