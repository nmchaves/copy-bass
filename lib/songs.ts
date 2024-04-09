export interface SongMetadata {
  id: string;
  title: string;
  artist: string;
  youTubeURLs: Array<string>;
  tuning: string;
  notes: string | undefined;
}

export const songs: Array<SongMetadata> = [
  {
    id: "september-ewf",
    title: "September",
    artist: "Earth, Wind & Fire",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=gMXBHlYR_R8",
      "https://www.youtube.com/watch?v=L_5YGzulQHY",
      "https://www.youtube.com/watch?v=Gs069dndIYk",
    ],
    tuning: "Standard",
    notes: `The little "hiccup" around 0:15 is not a mistake. He's syncopating to be more groooovin.`,
  },
  {
    id: "wild-wind-blows-maiden",
    title: "When the Wild Wind Blows",
    artist: "Iron Maiden",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=WjKKD6yXlVc",
      "https://www.youtube.com/watch?v=BiR5hEqsijU",
    ],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "everybody-wants-to-rule-the-world-tff",
    title: "Everybody Wants To Rule The World",
    artist: "Tears for Fears",
    youTubeURLs: ["https://www.youtube.com/watch?v=Y97qdhenzAU"],
    tuning: "Drop D (A=450)",
    notes: "The actual track uses a synth bass. But bass guitar is betta",
  },
  {
    id: "is-this-love-bob-marley",
    title: "Is This Love",
    artist: "Bob Marley & The Wailers",
    youTubeURLs: ["https://www.youtube.com/watch?v=f3sEBPv1Vw8"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "take-on-me-a-ha",
    title: "Take on Me",
    artist: "a-ha",
    youTubeURLs: ["https://www.youtube.com/watch?v=HWPBF4gKbWw"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "africa-toto",
    title: "Africa",
    artist: "TOTO",
    youTubeURLs: ["https://www.youtube.com/watch?v=G_gSS7QTCM8"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "walking-on-the-moon-police",
    title: "Walking On The Moon",
    artist: "The Police",
    youTubeURLs: ["https://www.youtube.com/watch?v=sEGdFApfWdg"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "ill-be-around-spinners",
    title: "I'll Be Around",
    artist: "The Spinners",
    youTubeURLs: ["https://www.youtube.com/watch?v=Wij9l_erYFQ"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "clairvoyant-maiden",
    title: "The Clairvoyant",
    artist: "Iron Maiden",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=0vLeWKQumFQ",
      "https://www.youtube.com/watch?v=s5Q_rbs9ul8",
      "https://www.youtube.com/watch?v=8U493_zUyoE",
    ],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "ritual-ghost",
    title: "Ritual",
    artist: "Ghost",
    youTubeURLs: ["https://www.youtube.com/watch?v=JE9Btb59qIg"],
    tuning: "Tune down to D Standard (D G C F)",
    notes: undefined,
  },
  {
    id: "paschendale-maiden",
    title: "Paschendale",
    artist: "Iron Maiden",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=Pc_jXFYXmNc",
      "https://www.youtube.com/watch?v=-YByK_mMWTc",
    ],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "operation-mindcrime-queensryche",
    title: "Operation Mindcrime",
    artist: "Queensrÿche",
    youTubeURLs: ["https://www.youtube.com/watch?v=Yioq00xExKo"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "dance-of-death-maiden",
    title: "Dance of Death",
    artist: "Iron Maiden",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=GoBok1xd93M",
      "https://www.youtube.com/watch?v=bfymCqid0IM",
    ],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "your-love-outfield",
    title: "Your Love",
    artist: "The Outfield",
    youTubeURLs: ["https://www.youtube.com/watch?v=qUlvHqPevEI"],
    tuning: "Standard",
    notes: undefined,
  },
  {
    id: "journeyman-maiden",
    title: "Journeyman",
    artist: "Iron Maiden",
    youTubeURLs: [
      "https://www.youtube.com/watch?v=lxHz3wuNUpM",
      "https://www.youtube.com/watch?v=dntNsPCsAxo",
    ],
    tuning: "Standard",
    notes:
      "The band originally recorded this song with electric instruments. But then they recorded it with acoustically, and they liked it better that way.",
  },
];