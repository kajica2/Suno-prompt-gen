export interface EthioJazzPrompt {
  id: string;
  number: number;
  title: string;
  focus: string;
  tempo: number;
  meter: string;
  modalScale: string;
  leadInstrument: string;
  stylePrompt: string;
  compactStyleTags: string;
  arrangementLyricsPrompt: string;
  negativePrompt: string;
  instrumentation: string[];
  productionTraits: string[];
  tips: string[];
}

export const ETHIO_JAZZ_NEGATIVE_PROMPT = "no horns, no trumpet, no saxophone, no brass, no flute, no vocals";

export const ETHIO_JAZZ_GUIDE_TIPS = [
  {
    title: "The Mulatu Modal Formula",
    detail: "Mulatu Astatke fused Ethiopian 5-note modal scales (Tezeta, Bati, Ambassel, Anchihoye) with American jazz chord substitutions, 12-bar blues inflections, and Latin Afro-Cuban percussion (congas, timbales, bongos)."
  },
  {
    title: "Vibraphone as the Harmonic & Melodic Lead",
    detail: "Rather than heavy brass sections, Mulatu placed the vibraphone front-and-center. The metallic warmth, motor tremolo vibrato, and mellow dampening cut through without crowding the bass and percussion pocket."
  },
  {
    title: "Strict Horn Exclusion Strategy",
    detail: "AI music models like Suno instinctively inject big band horn stabs when seeing 'jazz' or 'Ethiopian jazz'. Putting 'no horns, no trumpet, no saxophone, no brass, no flute, no vocals' in Suno's Exclude Styles box ensures the vibraphone, electric keys, and drums dominate."
  },
  {
    title: "Analog Tape & Unquantized Human Timing",
    detail: "Classic 1969–1974 Ethiopian recordings (Amha Records, Philips) were recorded to 2-inch tape with warm tube preamps, room mics, and natural timing drift. Describing 'unquantized human timing, room tone, tape hiss' prevents synthetic AI quantization."
  },
  {
    title: "Wah-Wah Rhythm Guitar & Electric Keys",
    detail: "Syncopated wah-wah guitar chops locked with a Fender Rhodes or Hammond organ sustain provide the rhythmic engine behind the walking upright bass and conga patterns."
  }
];

export const ETHIO_JAZZ_PROMPTS: EthioJazzPrompt[] = [
  {
    id: "yekatit-groove",
    number: 1,
    title: "Yekatit Groove",
    focus: "1960s/70s Ethiopian Jazz with Vibraphone Lead & Wah-Wah Rhythm Guitar",
    tempo: 105,
    meter: "4/4 Syncopated",
    modalScale: "Modal Minor Pentatonic (Yekatit / Ambassel)",
    leadInstrument: "Vibraphone (Melodic Lead)",
    stylePrompt: "Mulatu Astatke-inspired Ethio-jazz, instrumental, grooving syncopated, 1960s/70s Ethiopian jazz, vibraphone lead, wah-wah rhythm guitar, electric piano, organ, upright bass, live drums, congas, shakers, 105 BPM, analog tape, warm valve compression, unquantized human timing, close-mic room tone, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags: "ethio-jazz, 1970s ethiopian jazz, vibraphone lead, wah guitar, electric piano, upright bass, congas, 105bpm, analog tape, no horns",
    arrangementLyricsPrompt: "[Intro: vibraphone and congas, room tone, tape hiss] [Groove: upright bass and drums lock into a syncopated Ethio-jazz pocket, wah guitar comps] [Main: vibraphone plays modal minor pentatonic phrases, organ pads underneath] [Break: drums and congas only, unquantized, human timing] [Outro: vibraphone fade, tape saturation]",
    negativePrompt: ETHIO_JAZZ_NEGATIVE_PROMPT,
    instrumentation: [
      "Vibraphone (lead melody & dampening accents)",
      "Wah-wah rhythm guitar (syncopated comping)",
      "Electric piano & Hammond organ (warm pads)",
      "Upright bass (syncopated walking pocket)",
      "Live drums, congas & shakers (organic polyrhythm)"
    ],
    productionTraits: [
      "105 BPM syncopated pocket",
      "Warm analog tape saturation & valve compression",
      "Unquantized human swing",
      "Close-mic room tone with tape hiss"
    ],
    tips: [
      "Paste the Style Prompt into Suno's Style of Music box.",
      "Paste the [Intro...][Groove...][Main...][Break...][Outro...] into Suno's Lyrics box.",
      "Add 'no horns, no trumpet, no saxophone, no brass, no flute, no vocals' to the Exclude Styles / Negative Prompt box.",
      "If using a reference audio loop in Suno, set Audio Influence to 75–82% to lock the 105 BPM syncopated pocket."
    ]
  },
  {
    id: "tezeta-shuffle",
    number: 2,
    title: "Tezeta Shuffle",
    focus: "Contemplative Shuffle with Traditional Krar & Masenqo Accents",
    tempo: 95,
    meter: "4/4 Loose Tezeta Shuffle",
    modalScale: "Tezeta Minor (Nostalgia / Melancholy)",
    leadInstrument: "Vibraphone & Electric Piano trading phrases, Krar / Masenqo intro",
    stylePrompt: "Mulatu Astatke-inspired Ethio-jazz, instrumental, contemplative, syncopated shuffle, vibraphone, electric piano, organ, krar, masenqo, upright bass, brushes, congas, shakers, 95 BPM, analog tape, room tone, valve compression, unquantized, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags: "ethio-jazz, tezeta shuffle, vibraphone, electric piano, krar, masenqo, upright bass, brushes, congas, 95bpm, analog tape, no horns",
    arrangementLyricsPrompt: "[Intro: krar and masenqo, room tone, breath] [Groove: brushes and upright bass enter with a loose tezeta shuffle] [Main: vibraphone and electric piano trade melancholic minor phrases] [Break: masenqo and congas only, unquantized] [Outro: organ fade, tape hiss]",
    negativePrompt: ETHIO_JAZZ_NEGATIVE_PROMPT,
    instrumentation: [
      "Vibraphone & electric piano (trading melancholic phrases)",
      "Krar (Ethiopian lyre plucks) & Masenqo (bowed lute)",
      "Organ (subtle background chords)",
      "Upright bass (loose tezeta shuffle)",
      "Drum brushes, congas & shakers"
    ],
    productionTraits: [
      "95 BPM contemplative shuffle",
      "Analog tape warmth with valve compression",
      "Close room acoustics with audible breath & room tone",
      "Unquantized, deeply emotional human timing"
    ],
    tips: [
      "Tezeta is the signature Ethiopian mood of deep nostalgic yearning and memory.",
      "Wire drum brushes keep the high-frequencies soft, leaving ample room for the masenqo and krar overtone glides.",
      "Paste the negative prompt into Suno's Exclude Styles box to prevent brass or vocal intrusions.",
      "The [Break: masenqo and congas only] section creates dramatic dynamic contrast before the organ outro fade."
    ]
  },
  {
    id: "addis-swing",
    number: 3,
    title: "Addis Swing",
    focus: "Grooving 6/8 Syncopated Ethio-Jazz with Timbales & Hammond Organ",
    tempo: 110,
    meter: "6/8 Syncopated Swing",
    modalScale: "Bati / Anchihoye 6/8 Modal System",
    leadInstrument: "Vibraphone Lead with Wah-Wah Guitar Call-and-Response",
    stylePrompt: "Mulatu Astatke-inspired Ethio-jazz, instrumental, grooving syncopated 6/8, vibraphone, wah guitar, Hammond organ, electric bass, live drums, congas, timbales, shakers, 110 BPM, analog tape, valve compression, unquantized human timing, close-mic room tone, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags: "ethio-jazz, 6/8 swing, vibraphone, wah guitar, hammond organ, electric bass, timbales, congas, 110bpm, analog tape, no horns",
    arrangementLyricsPrompt: "[Intro: shakers and congas, tape hiss] [Groove: 6/8 Ethio-jazz swing, electric bass and drums lock in] [Main: vibraphone lead, wah guitar answers, organ swells] [Break: timbales and drums only, unquantized] [Outro: vibraphone and organ fade, room tone]",
    negativePrompt: ETHIO_JAZZ_NEGATIVE_PROMPT,
    instrumentation: [
      "Vibraphone (fast syncopated 6/8 lead)",
      "Wah-wah rhythm guitar (call-and-response)",
      "Hammond organ (swelling chords)",
      "Electric bass (driving 6/8 triplets)",
      "Live drums, congas, timbales & shakers (Afro-Cuban meets East African polyrhythm)"
    ],
    productionTraits: [
      "110 BPM 6/8 rolling triplet swing",
      "Analog tape drive with valve compression",
      "Timbales rimshots and conga slaps",
      "Unquantized human groove with room ambience"
    ],
    tips: [
      "6/8 time is quintessential to traditional Ethiopian folkloric dancing and Mulatu's Latin-jazz cross-pollination.",
      "The timbales rimshots and conga rolls provide crisp Latin percussive punch against the modal vibraphone.",
      "Ensure 'no horns, no trumpet, no saxophone, no brass, no flute, no vocals' is pasted into Suno's Exclude Styles box.",
      "The [Break: timbales and drums only] highlights the raw percussive craftsmanship before the climax."
    ]
  },
  {
    id: "blue-nile-bounce",
    number: 4,
    title: "Blue Nile Bounce",
    focus: "Upbeat Syncopated Bounce with Congas, Bongos & Wah-Wah Guitar",
    tempo: 115,
    meter: "4/4 Upbeat Syncopated Bounce",
    modalScale: "Ambassel Modal Minor",
    leadInstrument: "Vibraphone & Electric Piano Trading Modal Phrases",
    stylePrompt: "Mulatu Astatke-inspired Ethio-jazz, instrumental, upbeat syncopated groove, vibraphone, wah-wah guitar, electric piano, organ, upright bass, live drums, congas, bongos, shakers, 115 BPM, analog tape, warm saturation, unquantized, close-mic, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags: "ethio-jazz, upbeat bounce, vibraphone, wah guitar, rhodes, organ, upright bass, bongos, congas, 115bpm, analog tape, no horns",
    arrangementLyricsPrompt: "[Intro: wah guitar and shakers, room tone] [Groove: upright bass and drums bounce with syncopated Ethio-jazz feel] [Main: vibraphone and electric piano trade modal phrases] [Break: congas, bongos, and drums only] [Outro: organ pad fade, tape saturation]",
    negativePrompt: ETHIO_JAZZ_NEGATIVE_PROMPT,
    instrumentation: [
      "Vibraphone & electric piano (lively modal trading)",
      "Wah-wah guitar (bouncing syncopation)",
      "Organ (warm sustained support)",
      "Upright bass (bouncing syncopated walking lines)",
      "Live drums, congas, bongos & shakers (layered high-energy percussion)"
    ],
    productionTraits: [
      "115 BPM high-energy syncopated bounce",
      "Warm analog tape saturation with tube harmonics",
      "Close-mic drum warmth with natural room reflections",
      "Bongo & conga interlocking groove"
    ],
    tips: [
      "Bongos and congas interlock to create a rolling percussive groove that propels the 115 BPM bounce.",
      "Wah-wah guitar intro sets the rhythmic bounce instantly before the bass and drums drop in.",
      "Strict negative exclusion of horns keeps the modal vibraphone and electric keys crystal-clear.",
      "Great for upbeat instrumental walking or dynamic busking accompaniment."
    ]
  },
  {
    id: "mulatu-mood",
    number: 5,
    title: "Mulatu Mood",
    focus: "Deep Modal Minor Pentatonic with Fender Rhodes & Sustained Organ",
    tempo: 100,
    meter: "4/4 Slow Syncopated Ethio-Jazz Pocket",
    modalScale: "Deep Modal Minor Pentatonic (Tizita Minor / Yekatit)",
    leadInstrument: "Vibraphone Contemplative Modal Lines with Rhodes & Low Organ",
    stylePrompt: "Mulatu Astatke-inspired Ethio-jazz, instrumental, deep modal minor pentatonic, grooving syncopated, vibraphone, Rhodes, organ, upright bass, live drums, congas, shakers, 100 BPM, analog tape, valve compression, room tone, unquantized human timing, no horns, no trumpet, no sax, no brass, no vocals.",
    compactStyleTags: "ethio-jazz, modal minor, mulatu astatke, vibraphone, rhodes, organ, upright bass, congas, 100bpm, analog tape, no horns",
    arrangementLyricsPrompt: "[Intro: Rhodes and vibraphone, room tone, tape hiss] [Groove: upright bass and drums enter with a slow syncopated Ethio-jazz pocket] [Main: vibraphone plays contemplative modal lines, organ holds low notes] [Break: drums and congas only, unquantized] [Outro: Rhodes fade, tape saturation, room tone]",
    negativePrompt: ETHIO_JAZZ_NEGATIVE_PROMPT,
    instrumentation: [
      "Vibraphone (contemplative modal melodies)",
      "Fender Rhodes electric piano (warm bell-tone chords)",
      "Hammond organ (deep sustained low-register pedal tones)",
      "Upright bass (slow, syncopated deep pocket)",
      "Live drums, congas & shakers (subtle unquantized grooves)"
    ],
    productionTraits: [
      "100 BPM deep syncopated pocket",
      "Warm valve compression & analog tape saturation",
      "Room tone with vintage tape hiss",
      "Unquantized, deeply expressive human timing"
    ],
    tips: [
      "Fender Rhodes bell-like resonance blends with the metallic vibraphone to create Mulatu's signature dark modal timbre.",
      "The organ holding low pedal notes establishes harmonic grounding without distracting from the upright bass walking line.",
      "Paste 'no horns, no trumpet, no saxophone, no brass, no flute, no vocals' to guarantee horn-free isolation.",
      "100 BPM is the gold-standard tempo for late-night contemplative Ethio-jazz modal journeys."
    ]
  }
];
