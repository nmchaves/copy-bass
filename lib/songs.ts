import { MusicGenre } from "./genre";

export interface SongMetadata {
  id: string;
  title: string;
  artist: string;
  genre: MusicGenre;
  youTubeURLs: Array<string>;
  spotifyId: string;
  tuning: string;
  notes: string | undefined;
}

export const songs: Array<SongMetadata> = [
  {
    id: "september-ewf",
    title: "September",
    artist: "Earth, Wind & Fire",
    genre: MusicGenre.RB_SOUL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=gMXBHlYR_R8",
      "https://www.youtube.com/watch?v=L_5YGzulQHY",
      "https://www.youtube.com/watch?v=Gs069dndIYk",
    ],
    spotifyId: "3kXoKlD84c6OmIcOLfrfEs",
    tuning: "Standard",
    notes: `The little "hiccup" around 0:15 is not a mistake. He's syncopating to be more groooovin.`,
  },
  {
    id: "wild-wind-blows-maiden",
    title: "When the Wild Wind Blows",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=WjKKD6yXlVc",
      "https://www.youtube.com/watch?v=BiR5hEqsijU",
    ],
    spotifyId: "46tXExmproacf75cfuS9Ui",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "everybody-wants-to-rule-the-world-tff",
    title: "Everybody Wants To Rule The World",
    artist: "Tears for Fears",
    genre: MusicGenre.EIGHTIES,
    youTubeURLs: ["https://www.youtube.com/watch?v=Y97qdhenzAU"],
    spotifyId: "4RvWPyQ5RL0ao9LPZeSouE",
    tuning: "Drop D (A=450)",
    notes: "The actual track uses a synth bass. But bass guitar is betta",
  },
  {
    id: "is-this-love-bob-marley",
    title: "Is This Love",
    artist: "Bob Marley & The Wailers",
    genre: MusicGenre.REGGAE,
    youTubeURLs: ["https://www.youtube.com/watch?v=f3sEBPv1Vw8"],
    spotifyId: "6JRLFiX9NJSoRRKxowlBYr",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "take-on-me-a-ha",
    title: "Take on Me",
    artist: "a-ha",
    genre: MusicGenre.EIGHTIES,
    youTubeURLs: ["https://www.youtube.com/watch?v=HWPBF4gKbWw"],
    spotifyId: "2WfaOiMkCvy7F5fcp2zZ8L",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "africa-toto",
    title: "Africa",
    artist: "TOTO",
    genre: MusicGenre.EIGHTIES,
    youTubeURLs: ["https://www.youtube.com/watch?v=G_gSS7QTCM8"],
    spotifyId: "2374M0fQpWi3dLnB54qaLX",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "walking-on-the-moon-police",
    title: "Walking On The Moon",
    artist: "The Police",
    genre: MusicGenre.EIGHTIES,
    youTubeURLs: ["https://www.youtube.com/watch?v=sEGdFApfWdg"],
    spotifyId: "62uLNJgVZaFiEiKV4LpoYJ",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "ill-be-around-spinners",
    title: "I'll Be Around",
    artist: "The Spinners",
    genre: MusicGenre.RB_SOUL,
    youTubeURLs: ["https://www.youtube.com/watch?v=Wij9l_erYFQ"],
    spotifyId: "2vLaES21zwbX1Rnmj56Bbb",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "clairvoyant-maiden",
    title: "The Clairvoyant",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=0vLeWKQumFQ",
      "https://www.youtube.com/watch?v=s5Q_rbs9ul8",
      "https://www.youtube.com/watch?v=8U493_zUyoE",
    ],
    spotifyId: "159u1fW3HR7S8j8JsR40co",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "ritual-ghost",
    title: "Ritual",
    artist: "Ghost",
    genre: MusicGenre.METAL,
    youTubeURLs: ["https://www.youtube.com/watch?v=JE9Btb59qIg"],
    spotifyId: "5ZiTzbMB53mIiP3I4uQCmt",
    tuning: "Tune down to D Standard (D G C F)",
    notes: undefined,
  },
  {
    id: "paschendale-maiden",
    title: "Paschendale",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=Pc_jXFYXmNc",
      "https://www.youtube.com/watch?v=-YByK_mMWTc",
    ],
    spotifyId: "5q1KIAfUebf0L7TvFj47Rk",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "operation-mindcrime-queensryche",
    title: "Operation Mindcrime",
    artist: "Queensrÿche",
    genre: MusicGenre.METAL,
    youTubeURLs: ["https://www.youtube.com/watch?v=Yioq00xExKo"],
    spotifyId: "3UD6pyEQwqp2YcfSNvmsoT",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "dance-of-death-maiden",
    title: "Dance of Death",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=GoBok1xd93M",
      "https://www.youtube.com/watch?v=bfymCqid0IM",
    ],
    spotifyId: "1qadSe0Zf8005ULpuaDJIm",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "your-love-outfield",
    title: "Your Love",
    artist: "The Outfield",
    genre: MusicGenre.EIGHTIES,
    youTubeURLs: ["https://www.youtube.com/watch?v=qUlvHqPevEI"],
    spotifyId: "0WoFs3EdGOx58yX5BtXvOa",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "journeyman-maiden",
    title: "Journeyman",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeURLs: [
      "https://www.youtube.com/watch?v=lxHz3wuNUpM",
      "https://www.youtube.com/watch?v=dntNsPCsAxo",
    ],
    spotifyId: "01a2OOkjoDL4Ghgs0npe3K",
    tuning: "Standard",
    notes:
      "The band originally recorded this song with electric instruments. But then they recorded it with acoustically, and they liked it better that way.",
  },
];
