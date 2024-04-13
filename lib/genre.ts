export enum MusicGenre {
  EIGHTIES = "eighties",
  METAL = "metal",
  POP = "pop",
  RB_SOUL = "rb_soul",
  REGGAE = "reggae",
  REGGAE_ROCK = "reggae_rock",
}

export const genreLabelDict: Record<MusicGenre, string> = {
  [MusicGenre.EIGHTIES]: "Eighties",
  [MusicGenre.METAL]: "Metal",
  [MusicGenre.POP]: "Pop",
  [MusicGenre.RB_SOUL]: "R&B/Soul",
  [MusicGenre.REGGAE]: "Reggae",
  [MusicGenre.REGGAE_ROCK]: "Reggae Rock",
};

export const genreEmojiDict: Record<MusicGenre, string> = {
  [MusicGenre.EIGHTIES]: "😎",
  [MusicGenre.METAL]: "🤘",
  [MusicGenre.POP]: "🤩",
  [MusicGenre.RB_SOUL]: "🎷",
  [MusicGenre.REGGAE]: "🇯🇲",
  [MusicGenre.REGGAE_ROCK]: "🏄",
};

export function parseGenreFilter(
  rawGenre: string | undefined,
): MusicGenre | undefined {
  if (!rawGenre) {
    return undefined;
  }

  // If the value is invalid, ignore it by returning undefined.
  return isMusicGenre(rawGenre) ? rawGenre : undefined;
}

function isMusicGenre(val: string): val is MusicGenre {
  const validGenreFilters = Object.values(MusicGenre);
  return validGenreFilters.includes(val as MusicGenre);
}
