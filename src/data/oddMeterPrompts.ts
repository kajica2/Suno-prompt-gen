export interface OddMeterPrompt {
  id: string;
  number: number;
  title: string;
  meter: string; // e.g. "7/8", "3/4", "9/8", "11/8", "10/8", "5/4", "13/8"
  meterBreakdown: string; // e.g. "3+2+2 or 2+2+3", "3/4 waltz feel", "3+3+3 or 2+2+2+3"
  bpm: number;
  tempoDesc: string;
  stylePrompt: string;
  compactStyleTags: string;
  arrangementLyricsPrompt: string;
  negativePrompt: string;
  countInTag: string;
  instrumentation: string[];
  triStackingTip: string;
}

export const ODD_METER_STACKABLE_NEGATIVE_PROMPT =
  "no horns, no trumpet, no saxophone, no brass, no flute, no vocals, no 4/4 straight beat, no quantized grid, no EDM, no trap";

export const ODD_METER_PROMPTS: OddMeterPrompt[] = [
  {
    id: "seven-eight",
    number: 1,
    title: "Seven Eight Tezeta",
    meter: "7/8",
    meterBreakdown: "3+2+2 or 2+2+3 additive pulse",
    bpm: 100,
    tempoDesc: "100 BPM (Syncopated 7/8 pocket)",
    stylePrompt:
      "Ethio-jazz in 7/8, odd time signature, instrumental, Mulatu Astatke-inspired, grooving syncopated, vibraphone, wah-wah guitar, Rhodes, organ, upright bass, live drums, congas, shakers, 100 BPM, analog tape, valve compression, unquantized human timing, close-mic room tone, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 7/8, odd time signature, mulatu astatke, vibraphone, wah guitar, rhodes, upright bass, congas, 100 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: shakers count in 1-2-3-4-5-6-7, tape hiss, room tone] [Groove: upright bass and drums lock a 7/8 Ethio-jazz pocket, wah guitar comps on the off-beats] [Main: vibraphone plays modal minor pentatonic phrases over the 7] [Break: congas and drums only, 7/8, unquantized] [Outro: Rhodes fade, tape saturation]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3-4-5-6-7",
    instrumentation: [
      "Vibraphone lead (modal minor pentatonic phrases over the 7)",
      "Wah-wah rhythm guitar (syncopated off-beat comping)",
      "Rhodes electric piano & organ",
      "Upright bass (walking 7/8 modal bassline)",
      "Live drums, congas, shakers"
    ],
    triStackingTip:
      "Style Prompt has 'Ethio-jazz in 7/8, odd time signature'; Arrangement prompt opens with '[Intro: shakers count in 1-2-3-4-5-6-7]'; Section tags repeat 'over the 7' and '7/8'."
  },
  {
    id: "three-four",
    number: 2,
    title: "Three Four Shuffle",
    meter: "3/4",
    meterBreakdown: "Contemplative 3/4 waltz swing (accent on beat 2)",
    bpm: 95,
    tempoDesc: "95 BPM (Contemplative 3/4 waltz feel)",
    stylePrompt:
      "Ethio-jazz waltz in 3/4, odd time signature, instrumental, Mulatu Astatke-inspired, contemplative, vibraphone, krar, masenqo, electric piano, organ, upright bass, brushes, congas, 95 BPM, analog tape, room tone, unquantized human timing, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz waltz in 3/4, odd time signature, mulatu astatke, vibraphone, krar, masenqo, upright bass, brushes, 95 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: krar and brushes, 3/4 waltz feel, room tone] [Groove: upright bass walks in 3, congas accent beat 2] [Main: vibraphone and Rhodes trade melancholic minor phrases in 3/4] [Break: masenqo and congas only, unquantized] [Outro: organ fade, tape hiss]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3",
    instrumentation: [
      "Vibraphone & Rhodes (melancholic minor trading)",
      "Krar (traditional Ethiopian 5-string lyre)",
      "Masenqo (single-string bowed lute)",
      "Electric piano & organ",
      "Upright bass & drum brushes, congas"
    ],
    triStackingTip:
      "Traditional Ethiopian tezeta melancholia mapped across a 3/4 waltz cadence, with congas deliberately accenting beat 2."
  },
  {
    id: "nine-eight",
    number: 3,
    title: "Nine Eight Bounce",
    meter: "9/8",
    meterBreakdown: "3+3+3 or 2+2+2+3 additive compound groove",
    bpm: 105,
    tempoDesc: "105 BPM (Grooving syncopated 9/8 bounce)",
    stylePrompt:
      "Ethio-jazz in 9/8, odd time signature, instrumental, Mulatu Astatke-inspired, grooving syncopated 9/8, vibraphone, wah guitar, Hammond organ, electric bass, live drums, congas, timbales, shakers, 105 BPM, analog tape, warm valve compression, unquantized, close-mic, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 9/8, odd time signature, mulatu astatke, vibraphone, wah guitar, hammond organ, timbales, 105 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: shakers count 1-2-3-4-5-6-7-8-9, tape hiss] [Groove: 9/8 Ethio-jazz bounce, bass and drums lock the 9] [Main: vibraphone lead, wah guitar answers on the syncopation] [Break: timbales and drums only, 9/8, unquantized] [Outro: organ pad fade, room tone]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3-4-5-6-7-8-9",
    instrumentation: [
      "Vibraphone lead",
      "Wah guitar (syncopated call-and-response)",
      "Hammond organ pads",
      "Electric bass & live drums",
      "Congas, timbales, shakers"
    ],
    triStackingTip:
      "The 9-step count-in triggers Suno's internal subdivision, locking the timbales and drums into the 9/8 bounce before vibraphone enters."
  },
  {
    id: "eleven-eight",
    number: 4,
    title: "Eleven Eight Drift",
    meter: "11/8",
    meterBreakdown: "3+3+3+2 or 2+2+2+2+3 asymmetrical pulse",
    bpm: 98,
    tempoDesc: "98 BPM (Hypnotic syncopated 11/8)",
    stylePrompt:
      "Ethio-jazz in 11/8, odd time signature, instrumental, Mulatu Astatke-inspired, hypnotic syncopated 11/8, vibraphone, Rhodes, organ, upright bass, live drums, congas, bongos, shakers, 98 BPM, analog tape, valve compression, unquantized human timing, room tone, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 11/8, odd time signature, mulatu astatke, vibraphone, rhodes, organ, upright bass, congas, 98 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: shakers count 1-2-3-4-5-6-7-8-9-10-11, tape hiss] [Groove: upright bass and drums lock a hypnotic 11/8 Ethio-jazz pocket] [Main: vibraphone plays modal minor pentatonic over the 11, Rhodes pads underneath] [Break: congas, bongos, drums only, 11/8, unquantized] [Outro: Rhodes fade, tape saturation]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3-4-5-6-7-8-9-10-11",
    instrumentation: [
      "Vibraphone (modal minor pentatonic over 11)",
      "Rhodes electric piano pads",
      "Organ warm harmonic bed",
      "Upright bass & live drums",
      "Congas, bongos, shakers"
    ],
    triStackingTip:
      "11/8 is one of the most asymmetrical meters; counting to 11 in the shaker intro gives Suno the exact metric anchor it needs."
  },
  {
    id: "ten-eight",
    number: 5,
    title: "Ten Eight Pulse",
    meter: "10/8",
    meterBreakdown: "3+3+2+2 syncopated Ethio-jazz subdivision",
    bpm: 102,
    tempoDesc: "102 BPM (Grooving syncopated 10/8, 3-3-2-2)",
    stylePrompt:
      "Ethio-jazz in 10/8, odd time signature, instrumental, Mulatu Astatke-inspired, grooving syncopated 10/8, vibraphone, wah-wah guitar, electric piano, organ, upright bass, live drums, congas, shakers, 102 BPM, analog tape, warm saturation, unquantized, close-mic, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 10/8, odd time signature, mulatu astatke, vibraphone, wah-wah guitar, upright bass, congas, 102 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: wah guitar and shakers, 10/8 count, room tone] [Groove: bass and drums bounce a 3-3-2-2 Ethio-jazz 10/8] [Main: vibraphone and electric piano trade modal phrases] [Break: congas and drums only, 10/8, unquantized] [Outro: organ fade, tape hiss]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "3-3-2-2 (10/8 count)",
    instrumentation: [
      "Vibraphone & electric piano (trading modal phrases)",
      "Wah-wah guitar (3-3-2-2 rhythmic accents)",
      "Organ",
      "Upright bass (3-3-2-2 walking ostinato)",
      "Live drums, congas, shakers"
    ],
    triStackingTip:
      "Specifying the explicit '3-3-2-2' subdivision in the Groove tag prevents Suno from lazily collapsing 10/8 into two bars of 5/4 or 4/4."
  },
  {
    id: "five-four",
    number: 6,
    title: "Five Four Groove",
    meter: "5/4",
    meterBreakdown: "3+2 clave feel quintuple meter",
    bpm: 108,
    tempoDesc: "108 BPM (Syncopated 5/4 pocket, 3-2 clave feel)",
    stylePrompt:
      "Ethio-jazz in 5/4, odd time signature, instrumental, Mulatu Astatke-inspired, grooving syncopated 5/4, vibraphone, Rhodes, organ, upright bass, live drums, congas, shakers, 108 BPM, analog tape, valve compression, unquantized human timing, close-mic room tone, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 5/4, odd time signature, mulatu astatke, vibraphone, rhodes, organ, upright bass, congas, 108 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: shakers count 1-2-3-4-5, tape hiss] [Groove: 5/4 Ethio-jazz pocket, bass and drums lock a 3-2 clave feel] [Main: vibraphone plays modal minor phrases over the 5] [Break: congas and drums only, 5/4, unquantized] [Outro: Rhodes fade, tape saturation]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3-4-5",
    instrumentation: [
      "Vibraphone lead (modal minor phrases over the 5)",
      "Rhodes electric piano & organ",
      "Upright bass (3-2 clave groove)",
      "Live drums, congas, shakers"
    ],
    triStackingTip:
      "The '3-2 clave feel' directive in the groove prompt gives Suno a syncopated Latin-Ethio hybrid swing rather than a rigid classical 5/4."
  },
  {
    id: "thirteen-eight",
    number: 7,
    title: "Thirteen Eight Modal",
    meter: "13/8",
    meterBreakdown: "3+3+3+2+2 or 3+3+2+3+2 extended asymmetrical cycle",
    bpm: 96,
    tempoDesc: "96 BPM (Deep modal minor pentatonic 13/8)",
    stylePrompt:
      "Ethio-jazz in 13/8, odd time signature, instrumental, Mulatu Astatke-inspired, deep modal minor pentatonic, hypnotic syncopated 13/8, vibraphone, Rhodes, organ, upright bass, live drums, congas, bongos, shakers, 96 BPM, analog tape, valve compression, room tone, unquantized, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags:
      "ethio-jazz in 13/8, odd time signature, mulatu astatke, deep modal minor, vibraphone, rhodes, upright bass, 96 bpm, no horns, no 4/4",
    arrangementLyricsPrompt:
      "[Intro: shakers count 1-2-3-4-5-6-7-8-9-10-11-12-13, tape hiss] [Groove: upright bass and drums lock a slow hypnotic 13/8 Ethio-jazz pocket] [Main: vibraphone plays contemplative modal lines over the 13, organ holds low notes] [Break: congas, bongos, drums only, 13/8, unquantized] [Outro: Rhodes fade, tape saturation, room tone]",
    negativePrompt: ODD_METER_STACKABLE_NEGATIVE_PROMPT,
    countInTag: "1-2-3-4-5-6-7-8-9-10-11-12-13",
    instrumentation: [
      "Vibraphone (contemplative modal lines over 13)",
      "Organ (holding low sustained modal roots)",
      "Rhodes electric piano",
      "Upright bass (slow hypnotic 13/8 cycle)",
      "Live drums, congas, bongos, shakers"
    ],
    triStackingTip:
      "The 13-count shaker intro provides a complete metric scaffold for Suno. Sustained organ roots preserve modal coherence across the long bar."
  }
];
