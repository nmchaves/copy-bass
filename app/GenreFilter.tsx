"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  genreEmojiDict,
  genreLabelDict,
  MusicGenre,
  parseGenreFilter,
} from "@/lib/genre";
import { genreQueryKey } from "@/lib/songFilterRoutingConstants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

const allGenresSelectValue = "all";

type SelectValue = MusicGenre | typeof allGenresSelectValue;

export const GenreFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSelectChange(newGenre: SelectValue) {
    const params = new URLSearchParams(searchParams);
    if (newGenre === allGenresSelectValue) {
      params.delete(genreQueryKey);
    } else {
      params.set(genreQueryKey, newGenre);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Select
      defaultValue={parseGenreFilter(
        searchParams.get(genreQueryKey) ?? undefined,
      )}
      onValueChange={(value) => handleSelectChange(value as SelectValue)}
    >
      <SelectTrigger aria-label="Genre" className="ml-2 w-[240px]">
        <SelectValue placeholder="Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={allGenresSelectValue}>All</SelectItem>
        {[
          MusicGenre.EIGHTIES,
          MusicGenre.METAL,
          MusicGenre.POP,
          MusicGenre.RB_SOUL,
          MusicGenre.REGGAE,
          MusicGenre.REGGAE_ROCK,
        ].map((genre) => (
          <SelectItem key={genre} value={genre}>
            {genreLabelDict[genre]} {genreEmojiDict[genre]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
