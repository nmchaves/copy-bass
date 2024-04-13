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
