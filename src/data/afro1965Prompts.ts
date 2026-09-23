export interface AfroRhythmPrompt {
  id: string;
  number: number;
  title: string;
  year: number;
  region: string;
  genre: string;
  tempo: string;
  stylePrompt: string;
  reinforcedPrefixStylePrompt: string;
  compactStyleTags: string;
  arrangementLyricsPrompt: string;
  negativePrompt: string;
  instrumentation: string[];
  productionTraits: string[];
  tips: string[];
}

export const AFRO_1965_HARD_PREFIX = "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody";

export const AFRO_1965_NEGATIVE_PROMPT = "no horns, no trumpet, no sax, no saxophone, no brass, no flute, no lead melody, no vocals, no singing";

export const AFRO_1965_PROMPTS: AfroRhythmPrompt[] = [
  {
    id: "lagos-1965",
    number: 1,
    title: "Lagos 1965",
    year: 1965,
    region: "Lagos, Nigeria",
    genre: "1965 Afrobeat & Highlife Rhythm Section",
    tempo: "105–112 BPM (Loose 1965 Afrobeat pulse)",
    stylePrompt: "1965 Afrobeat rhythm section only, instrumental, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, talking drum, congas, shekere, agogô, upright bass, drums, rhythm guitar, organ comping, no horns, no trumpet, no sax, no lead melody.",
    reinforcedPrefixStylePrompt: "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody, 1965 Afrobeat rhythm section only, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, talking drum, congas, shekere, agogô, upright bass, drums, rhythm guitar, organ comping.",
    compactStyleTags: "1965 afrobeat rhythm section, vintage mono, analog tape, talking drum, congas, shekere, upright bass, no horns, no melody",
    arrangementLyricsPrompt: "[Intro: Solo talking drum and shekere, close-mic'd, tape hiss, room tone.] [Groove: Upright bass and clean highlife rhythm guitar lock into a loose 1965 Afrobeat pulse. Organ comps chords. Congas and agogô enter.] [Breakdown: Drum call-and-response, unquantized. Stick noise, hand noise, breath, spit.] [Outro: One-take ending, tape saturation, room ambience fades. No horns.]",
    negativePrompt: AFRO_1965_NEGATIVE_PROMPT,
    instrumentation: [
      "Talking drum (pitch-gliding Yoruba rhythm)",
      "Shekere & Agogô (polyrhythmic bell & shaker groove)",
      "Clean highlife rhythm guitar (strict comping chords, no solos)",
      "Hammond organ (percussive harmonic comping)",
      "Upright bass & live drums (unquantized 1965 pocket)",
      "Congas (open tones & slaps)"
    ],
    productionTraits: [
      "Vintage mono summing",
      "Analog tape drive with valve compression",
      "Live one-take room tone & tape hiss",
      "Organic tactile acoustic bleed: stick clicks, hand slaps, breath"
    ],
    tips: [
      "If Suno attempts to inject trumpet or saxophone melodies, prepend: 'instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody'.",
      "In the arrangement box, '[Breakdown: Drum call-and-response...]' keeps the rhythm section organic and evolving without needing melodic vocals.",
      "The combination of upright bass with clean highlife rhythm guitar comping captures the early pre-Fela 1965 Koola Lobitos transition period."
    ]
  },
  {
    id: "addis-1965",
    number: 2,
    title: "Addis 1965",
    year: 1965,
    region: "Addis Ababa, Ethiopia",
    genre: "1965 Ethio-Jazz Rhythm Section",
    tempo: "92–98 BPM (Slow human Ethio-jazz swing)",
    stylePrompt: "1965 Ethio-jazz rhythm section only, instrumental, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, upright bass, drums, congas, hand percussion, krar rhythm, piano comping, no horns, no trumpet, no sax, no lead melody.",
    reinforcedPrefixStylePrompt: "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody, 1965 Ethio-jazz rhythm section only, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, upright bass, drums, congas, hand percussion, krar rhythm, piano comping.",
    compactStyleTags: "1965 ethio-jazz rhythm section, vintage mono, analog tape, upright bass, drums, congas, krar rhythm, piano comp, no horns",
    arrangementLyricsPrompt: "[Intro: Krar and hand percussion, tape hiss, room tone.] [Rhythm: Upright bass, congas, and hand drums enter with slow human swing. Piano comps chords. No quantization.] [Breakdown: Bass and drums alone, close-mic'd. Valve compression, tape saturation.] [Outro: Live one-take stop, room tone and echo tail. No trumpet, no sax.]",
    negativePrompt: AFRO_1965_NEGATIVE_PROMPT,
    instrumentation: [
      "Krar rhythm (traditional Ethiopian lyre rhythmic comping)",
      "Acoustic piano (modal minor chordal comping only, no lead lines)",
      "Upright bass (slow swing, wood resonance)",
      "Live drums & congas (unquantized, subtle slaps)",
      "Hand percussion (shakers, woodblock clicks)"
    ],
    productionTraits: [
      "Vintage mono acoustic mix",
      "Close-mic'd upright bass with valve saturation",
      "Authentic room tone and warm echo tail",
      "Unquantized human swing (Amha Records 1960s aesthetic)"
    ],
    tips: [
      "Krar rhythm plucking provides the indigenous Ethiopian modal framework while the piano strictly comps background chords.",
      "The breakdown isolates the raw wood tone of the upright bass with the drums for a sparse, meditative backdrop.",
      "Adding 'instrumental rhythm section only' to the style box suppresses the modal saxophone stabs typical of late 60s Ethio-jazz."
    ]
  },
  {
    id: "accra-1965",
    number: 3,
    title: "Accra 1965",
    year: 1965,
    region: "Accra, Ghana",
    genre: "1965 Highlife & Palm-Wine Rhythm Section",
    tempo: "100–108 BPM (Relaxed palm-wine highlife pulse)",
    stylePrompt: "1965 highlife rhythm section only, instrumental, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, palm-wine rhythm guitar, upright bass, drums, congas, shekere, cowbell, no horns, no trumpet, no sax, no flute, no lead melody.",
    reinforcedPrefixStylePrompt: "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody, 1965 highlife rhythm section only, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, palm-wine rhythm guitar, upright bass, drums, congas, shekere, cowbell, no flute.",
    compactStyleTags: "1965 highlife rhythm section, palm-wine rhythm guitar, vintage mono, analog tape, upright bass, shekere, cowbell, congas, no horns",
    arrangementLyricsPrompt: "[Intro: Palm-wine rhythm guitar and shekere, close-mic'd. Tape hiss and room tone.] [Groove: Upright bass and shekere set a relaxed highlife pulse. Congas, cowbell, and hand claps enter. Guitar plays rhythm chords only.] [Breakdown: Guitar and percussion trade rhythmic lines. Unquantized, live feel.] [Outro: Tape saturation, room tone, final conga hit. No horns.]",
    negativePrompt: "no horns, no trumpet, no sax, no saxophone, no brass, no flute, no lead melody, no vocals, no singing",
    instrumentation: [
      "Palm-wine rhythm guitar (two-finger picking rhythmic comping)",
      "Upright bass (bouncing syncopated Ghanaian highlife groove)",
      "Shekere, cowbell & hand claps (interlocking West African bell patterns)",
      "Congas & live drums (organic, unquantized live swing)"
    ],
    productionTraits: [
      "Vintage Ghanaian 1960s mono tape sound",
      "Warm valve compression and natural flutter",
      "Acoustic room tone with close-mic guitar scrape",
      "One-take ending with lingering room decay"
    ],
    tips: [
      "Highlife relies on the timeline pattern established by the cowbell and shekere; keeping the guitar purely rhythmic prevents AI solos.",
      "The [Breakdown: Guitar and percussion trade rhythmic lines] section generates lively polyrhythms without any brass intervention.",
      "Use 'no flute' in the negative exclusions, as AI highlife prompts frequently introduce high-pitched wooden flutes."
    ]
  },
  {
    id: "afro-cuban-1965",
    number: 4,
    title: "Afro-Cuban 1965",
    year: 1965,
    region: "Havana / New York Descarga",
    genre: "1965 Afro-Cuban Descarga & Son Rhythm Section",
    tempo: "108–118 BPM (Tight syncopated son & descarga groove)",
    stylePrompt: "1965 Afro-Cuban jazz rhythm section only, descarga, son, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, congas, timbales, bongos, cowbell, upright bass, piano montuno, guiro, claves, no horns, no trumpet, no sax, no lead melody.",
    reinforcedPrefixStylePrompt: "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody, 1965 Afro-Cuban jazz rhythm section only, descarga, son, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, congas, timbales, bongos, cowbell, upright bass, piano montuno, guiro, claves.",
    compactStyleTags: "1965 afro-cuban rhythm section, descarga, son, vintage mono, congas, timbales, upright bass, piano montuno, claves, no horns",
    arrangementLyricsPrompt: "[Intro: Congas and timbales, close-mic'd, room tone, tape hiss.] [Groove: Upright bass and piano montuno lock in. Bongos, cowbell, guiro, and claves enter.] [Breakdown: Descarga section, unquantized hand percussion and bass. Piano comps rhythmically.] [Outro: Live one-take ending, tape saturation, room ambience. No horns.]",
    negativePrompt: AFRO_1965_NEGATIVE_PROMPT,
    instrumentation: [
      "Piano montuno (percussive two-handed cyclic arpeggiated comping)",
      "Upright bass (tumbao pattern locking with kick and conga slap)",
      "Timbales (cascara shell patterns & rim clicks)",
      "Congas (tumbao open tones and slaps)",
      "Bongos, cowbell, guiro & claves (complete Afro-Cuban percussion battery)"
    ],
    productionTraits: [
      "1965 Alegre / Fania style mono vintage tape session",
      "Unquantized live descarga human timing",
      "Dynamic acoustic valve saturation",
      "Room tone ambience with natural microphone bleed"
    ],
    tips: [
      "The piano montuno acts as both harmonic foundation and rhythm instrument, so no melodic soloing is needed.",
      "The cascara (timbales side-shell stick pattern) paired with upright bass tumbao provides immense drive without horns.",
      "Descarga sessions are renowned for their raw jam-session energy—this prompt forces Suno to keep that energy strictly in the percussion."
    ]
  },
  {
    id: "afro-soul-1965",
    number: 5,
    title: "1965 Afro-Soul",
    year: 1965,
    region: "Transatlantic Afro-Soul / Deep Funk",
    genre: "1965 Afro-Soul, Early Afrobeat & Deep Funk Rhythm Section",
    tempo: "98–105 BPM (Deep, loose, heavy pocket groove)",
    stylePrompt: "1965 Afro-soul rhythm section only, Afrobeat, deep funk, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, Hammond organ comping, upright bass, drums, tambourine, congas, rhythm guitar, no horns, no trumpet, no sax, no lead melody.",
    reinforcedPrefixStylePrompt: "instrumental rhythm section only, no horns, no trumpet, no sax, no lead melody, 1965 Afro-soul rhythm section only, Afrobeat, deep funk, vintage mono, analog tape, live one-take, unquantized human timing, room tone, valve compression, tape saturation, Hammond organ comping, upright bass, drums, tambourine, congas, rhythm guitar.",
    compactStyleTags: "1965 afro-soul rhythm section, afrobeat, deep funk, vintage mono, hammond organ comping, upright bass, congas, no horns, no melody",
    arrangementLyricsPrompt: "[Intro: Hammond organ and tambourine, tape hiss, room tone.] [Groove: Upright bass and drums play a loose Afro-soul pocket. Congas and rhythm guitar enter. Organ comps chords.] [Breakdown: Organ rhythmic stabs, unquantized drums, hand percussion.] [Outro: One-take fade, tape saturation, room tone. No horns.]",
    negativePrompt: AFRO_1965_NEGATIVE_PROMPT,
    instrumentation: [
      "Hammond organ (percussive drawbar chord stabs & swell comping)",
      "Rhythm guitar (syncopated funk-soul comping chops)",
      "Upright bass (heavy warm walking/syncopated groove)",
      "Live drums (open snare, unquantized ghost notes)",
      "Tambourine & congas (driving acoustic pulse)"
    ],
    productionTraits: [
      "1965 vintage mono tape saturation",
      "Heavy valve compression with tube punch",
      "Acoustic room tone, natural tape flutter & hiss",
      "Live one-take groove with human unquantized micro-drifts"
    ],
    tips: [
      "The Hammond organ's rhythmic chops replace any need for horn section stabs.",
      "The tambourine gives the drum groove vintage Stax / Tamla / West African crossover energy.",
      "Prefixing with 'instrumental rhythm section only, no horns' guarantees Suno won't add Memphis or Lagos brass sections."
    ]
  }
];
