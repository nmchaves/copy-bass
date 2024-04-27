import { MusicGenre } from "./genre";
import { NonEmptyArray } from "./types";

export interface BaseSongMetadata {
  id: string;
  title: string;
  artist: string;
  genre: MusicGenre;
  youTubeVideos: NonEmptyArray<YouTubeVideoMetadata>;
  spotifyId: string;
  tuning: string;
  notes: string | undefined;
}

interface YouTubeVideoMetadata {
  id: YouTubeVideoID;
  bookmarkedSections?: NonEmptyArray<SongSection>;
}

type YouTubeVideoID = string;

interface SongSection {
  label: string;
  start: MinutesSeconds;
  end: MinutesSeconds;
}

interface MinutesSeconds {
  minutes: number;
  seconds: number;
}

export const songs: NonEmptyArray<BaseSongMetadata> = [
  {
    id: "silly-love-songs-wings",
    title: "Silly Love Songs",
    artist: "Wings",
    genre: MusicGenre.POP,
    youTubeVideos: [
      { id: "c_x16HC5PQQ" },
      { id: "akNCJaJLC-c" },
      { id: "TgdQx2mC6BQ" },
    ],
    spotifyId: "3uiMBldZ07pW0ySHDX5gzE",
    tuning: "Standard",
    notes:
      "Pay attention to the 👻 notes. Don't worry about being totally faithful to the original though. Paul McCartney plays around with the main riff each time. Just play by feel and have fun.",
  },
  {
    id: "september-ewf",
    title: "September",
    artist: "Earth, Wind & Fire",
    genre: MusicGenre.RB_SOUL,
    youTubeVideos: [
      { id: "gMXBHlYR_R8" },
      { id: "L_5YGzulQHY" },
      { id: "Gs069dndIYk" },
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
    youTubeVideos: [
      {
        id: "WjKKD6yXlVc",
        bookmarkedSections: [
          {
            label: "Pre-outro riff",
            start: { minutes: 8, seconds: 49 },
            end: { minutes: 9, seconds: 16 },
          },
        ],
      },
      { id: "BiR5hEqsijU" },
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
    youTubeVideos: [{ id: "Y97qdhenzAU" }],
    spotifyId: "4RvWPyQ5RL0ao9LPZeSouE",
    tuning: "Drop D (A=450)",
    notes: "The actual track uses a synth bass. But bass guitar is betta",
  },
  {
    id: "is-this-love-bob-marley",
    title: "Is This Love",
    artist: "Bob Marley & The Wailers",
    genre: MusicGenre.REGGAE,
    youTubeVideos: [{ id: "f3sEBPv1Vw8" }],
    spotifyId: "6JRLFiX9NJSoRRKxowlBYr",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "take-on-me-a-ha",
    title: "Take on Me",
    artist: "a-ha",
    genre: MusicGenre.EIGHTIES,
    youTubeVideos: [{ id: "HWPBF4gKbWw" }],
    spotifyId: "2WfaOiMkCvy7F5fcp2zZ8L",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "africa-toto",
    title: "Africa",
    artist: "TOTO",
    genre: MusicGenre.EIGHTIES,
    youTubeVideos: [{ id: "G_gSS7QTCM8" }],
    spotifyId: "2374M0fQpWi3dLnB54qaLX",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "walking-on-the-moon-police",
    title: "Walking On The Moon",
    artist: "The Police",
    genre: MusicGenre.EIGHTIES,
    youTubeVideos: [{ id: "sEGdFApfWdg" }],
    spotifyId: "62uLNJgVZaFiEiKV4LpoYJ",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "ill-be-around-spinners",
    title: "I'll Be Around",
    artist: "The Spinners",
    genre: MusicGenre.RB_SOUL,
    youTubeVideos: [{ id: "Wij9l_erYFQ" }],
    spotifyId: "2vLaES21zwbX1Rnmj56Bbb",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "clairvoyant-maiden",
    title: "The Clairvoyant",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeVideos: [
      { id: "0vLeWKQumFQ" },
      { id: "s5Q_rbs9ul8" },
      { id: "8U493_zUyoE" },
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
    youTubeVideos: [{ id: "JE9Btb59qIg" }],
    spotifyId: "5ZiTzbMB53mIiP3I4uQCmt",
    tuning: "Tune down to D Standard (D G C F)",
    notes: undefined,
  },
  {
    id: "paschendale-maiden",
    title: "Paschendale",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeVideos: [{ id: "Pc_jXFYXmNc" }, { id: "-YByK_mMWTc" }],
    spotifyId: "5q1KIAfUebf0L7TvFj47Rk",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "time-bomb-iration",
    title: "Time Bomb",
    artist: "Iration",
    genre: MusicGenre.REGGAE_ROCK,
    youTubeVideos: [{ id: "92SzQ25UhOU" }, { id: "zRwXPkP1kBA" }],
    spotifyId: "0KtKac3tvjeGjg6FXcUy7X",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "operation-mindcrime-queensryche",
    title: "Operation Mindcrime",
    artist: "Queensrÿche",
    genre: MusicGenre.METAL,
    youTubeVideos: [{ id: "Yioq00xExKo" }],
    spotifyId: "3UD6pyEQwqp2YcfSNvmsoT",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "dance-of-death-maiden",
    title: "Dance of Death",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeVideos: [{ id: "GoBok1xd93M" }, { id: "bfymCqid0IM" }],
    spotifyId: "1qadSe0Zf8005ULpuaDJIm",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "your-love-outfield",
    title: "Your Love",
    artist: "The Outfield",
    genre: MusicGenre.EIGHTIES,
    youTubeVideos: [{ id: "qUlvHqPevEI" }],
    spotifyId: "0WoFs3EdGOx58yX5BtXvOa",
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "journeyman-maiden",
    title: "Journeyman",
    artist: "Iron Maiden",
    genre: MusicGenre.METAL,
    youTubeVideos: [{ id: "lxHz3wuNUpM" }, { id: "dntNsPCsAxo" }],
    spotifyId: "01a2OOkjoDL4Ghgs0npe3K",
    tuning: "Standard",
    notes:
      "The band originally recorded this song with electric instruments. But then they recorded it with acoustically, and they liked it better that way.",
  },
];
