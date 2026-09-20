export interface BuskingPrompt {
  id: string;
  number: number;
  title: string;
  focus: string;
  promptText: string;
  tags: string[];
  styleTags: string;
  bpm: number;
  meter: string;
  keyFeatures: string[];
  recommendedReference: string;
  tips: string[];
}

export const BUSKING_AUDIO_INFLUENCE_TIPS = [
  {
    title: "Upload a Reference Audio",
    detail: "Upload a busking backing track or a jazz fusion drum/bass loop you love to prime Suno's engine."
  },
  {
    title: "Set Audio Influence to 81%",
    detail: "81% is the sweet spot: high enough to tightly lock the tempo, groove pocket, and arrangement, yet flexible enough to accept rich acoustic timbre."
  },
  {
    title: "Focus on Timbre, Instrumentation & Feel",
    detail: "Keep the text prompt focused on acoustic textures, drum articulation, and bass feel — the 81% audio reference will handle structure, chord changes, and rhythm."
  },
  {
    title: "Use Negative Exclusions for Trumpet Solo Space",
    detail: "Use the negative prompt field (or add to style) to strictly exclude saxophone, vocals, guitar, etc. This leaves wide open sonic frequency space for your live acoustic trumpet to lead."
  },
  {
    title: "Strengthen Anti-Hallucination Exclusions",
    detail: "If Suno adds unwanted instruments, strengthen the exclusions: 'no saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word'."
  },
  {
    title: "Test Multiple Variations against Reference",
    detail: "These 10 variations offer different pocket emphases (brushes, slap bass, ghost notes, organ, unquantized feel) to find the exact dynamic balance for your busking set."
  }
];

export const BUSKING_PROMPTS: BuskingPrompt[] = [
  {
    id: "brush-walking-bass",
    number: 1,
    title: "Brush & Walking Bass Focus",
    focus: "Percussive drums with brushes & deep electric walking bassline",
    promptText: "Instrumental jazz fusion backing track. Percussive drums with brushes, deep electric bass walking bassline, syncopated groove, 105 BPM, 4/4, blues-influenced. Kick and snare pocket, hi-hat ghost notes. Slap bass accents. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Intro]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, brush drums, walking electric bass, syncopated, 105 bpm, blues pocket, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Drum brushes for soft high-end acoustic texture",
      "Continuous deep electric walking bassline",
      "Slap bass accents on syncopated upbeats",
      "Kick and snare in tight pocket"
    ],
    recommendedReference: "Upbeat walking bass groove with soft wire brush drum pattern",
    tips: [
      "Brushes leave the high-mid frequencies completely open for muted or open trumpet.",
      "Walking bass keeps continuous forward momentum without cluttering harmonic space."
    ]
  },
  {
    id: "slap-bass-syncopation",
    number: 2,
    title: "Slap Bass & Syncopation Focus",
    focus: "Punchy electric slap bass & syncopated funk-jazz groove",
    promptText: "Instrumental jazz fusion backing track. Deep electric bass slap bass, syncopated groove, percussive drums, 105 BPM, 4/4, blues-influenced. Walking bassline, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Slap Bass]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, slap electric bass, syncopated groove, brush drums, 105 bpm, funk-blues, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Prominent slap bass pops & percussive thumb thumps",
      "Syncopated rhythmic interlock with kick drum",
      "Hi-hat ghost notes maintaining subdivisions",
      "Brush jazz drums keeping top end organic"
    ],
    recommendedReference: "Marcus Miller or Victor Wooten style slap groove with brush drum accompaniment",
    tips: [
      "Slap bass gives instant street-busking energy that catches pedestrians' attention.",
      "The [Break] section tag allows for dynamic trumpet solo fills."
    ]
  },
  {
    id: "blues-infused-pocket",
    number: 3,
    title: "Blues-Infused Pocket",
    focus: "Blues-influenced harmonic foundation with walking & slap bass",
    promptText: "Instrumental jazz fusion backing track. Blues-influenced, percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Blues Intro]", "[Pocket]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, blues pocket, electric bass, brush drums, 105 bpm, walking bass, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Strong blues inflection in bass note choices and micro-bends",
      "Deep grounded pocket ideal for minor pentatonic & blues scale trumpet",
      "Kick and snare lock on beats 2 and 4 with syncopation",
      "Dynamic [Blues Intro] setting immediate soul tone"
    ],
    recommendedReference: "Slow-to-mid tempo blues shuffle or 12-bar fusion groove reference",
    tips: [
      "Ideal for Harmon-muted trumpet playing Miles-style blues lines.",
      "The blues pocket provides an intuitive harmonic framework for extended soloing."
    ]
  },
  {
    id: "hi-hat-ghost-notes",
    number: 4,
    title: "Hi-Hat Ghost Notes Focus",
    focus: "Intricate hi-hat ghost note subdivisions & tight snare pocket",
    promptText: "Instrumental jazz fusion backing track. Hi-hat ghost notes, percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Ghost Notes]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, hi-hat ghost notes, percussive drums, electric bass, 105 bpm, tight pocket, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Subtle 16th-note hi-hat ghost articulations",
      "Interplay between snare ghost taps and bass slaps",
      "Crisp, clear human rhythmic micro-timing",
      "Spacious mid-range for horn lead"
    ],
    recommendedReference: "Bernard Purdie or Steve Gadd style ghost-note groove",
    tips: [
      "Ghost notes supply rhythmic momentum without increasing overall volume.",
      "Pairs exceptionally well with fast, articulate trumpet double-tonguing."
    ]
  },
  {
    id: "simple-steady-busking",
    number: 5,
    title: "Busking Backing Track – Simple & Steady",
    focus: "Reliable, unshakeable groove loop for effortless street busking",
    promptText: "Instrumental jazz fusion backing track for busking. Steady syncopated groove, percussive drums, deep electric bass, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass accents, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Steady Groove]", "[Loop]", "[Outro]"],
    styleTags: "jazz fusion, steady busking backing, electric bass, brush drums, 105 bpm, loop groove, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Steady, hypnotic rhythm that loops seamlessly",
      "Minimal erratic dynamic jumps for consistent live street sound",
      "Slap bass accents provide periodic rhythmic punctuation",
      "Balanced low-end that sounds great on portable busking amps"
    ],
    recommendedReference: "Solid, unvarying funk/jazz 2-bar or 4-bar drum & bass loop",
    tips: [
      "Use this when you want an anchor track that won't throw off your solo timing.",
      "The [Loop] tag tells Suno to maintain continuous steady energy."
    ]
  },
  {
    id: "fusion-electric-piano",
    number: 6,
    title: "Fusion with Electric Piano",
    focus: "Warm vintage electric piano chords floating over the drum & bass pocket",
    promptText: "Instrumental jazz fusion backing track. Percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Warm electric piano chords. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Electric Piano]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, rhodes electric piano chords, electric bass, brush drums, 105 bpm, warm, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Warm vintage Fender Rhodes or Wurlitzer electric piano comping",
      "Spacious chord voicings (9ths, 11ths, altered dominants)",
      "Deep electric bass locking with electric piano bass notes",
      "Percussive brush drum support"
    ],
    recommendedReference: "Herbie Hancock Headhunters or Chick Corea electric piano groove",
    tips: [
      "Electric piano provides lush harmonic chords while leaving the lead frequency band open for trumpet.",
      "Adds rich jazz-funk sophistication without competing with brass solo lines."
    ]
  },
  {
    id: "organ-trio-feel",
    number: 7,
    title: "Organ Trio Feel",
    focus: "Warm Hammond organ pads & percussive rotary swell harmonics",
    promptText: "Instrumental jazz fusion backing track. Percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Warm organ pads. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Organ]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, hammond organ pads, electric bass, brush drums, 105 bpm, blues soul, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Warm Hammond B3 organ bed and rotary speaker Leslie chorale",
      "Blues-infused organ chord swells underneath walking bass",
      "Slap bass accents complementing organ percussion clicks",
      "Deep, soulful street-vibe"
    ],
    recommendedReference: "Jimmy Smith or Larry Young organ trio groove with drums and bass",
    tips: [
      "Organ pads create a lush, enveloping acoustic cushion for trumpet timbre.",
      "Great for emotional, melodic trumpet playing with rich vibrato."
    ]
  },
  {
    id: "percussion-heavy-fusion",
    number: 8,
    title: "Percussion-Heavy Fusion",
    focus: "Congas, shakers, and syncopated Afro-Cuban/funk cross-rhythms",
    promptText: "Instrumental jazz fusion backing track. Percussive drums, congas, shakers, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Percussion]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, congas, shakers, percussive drums, electric bass, 105 bpm, syncopated, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Organic hand-struck conga slaps and open tones",
      "Continuous shaker groove generating steady 16th-note air",
      "Layered percussive polyrhythms beneath walking electric bass",
      "Vibrant street festival energy"
    ],
    recommendedReference: "Afro-Cuban or Latin jazz fusion rhythm section with congas and electric bass",
    tips: [
      "Conga slaps cut through outdoor traffic noise, making busking sound much fuller.",
      "Provides upbeat, infectious rhythmic energy that makes passersby stop and dance."
    ]
  },
  {
    id: "laid-back-behind-beat",
    number: 9,
    title: "Laid-Back Behind the Beat",
    focus: "Relaxed D'Angelo / J Dilla style behind-the-beat human swing pocket",
    promptText: "Instrumental jazz fusion backing track. Laid-back, behind the beat, percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Laid-Back]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, laid-back behind the beat, electric bass, brush drums, 105 bpm, neo-soul pocket, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Snare hitting slightly late (behind the beat) for deep relaxed groove",
      "Organic bass swing that feels human and unhurried",
      "Deep kick drum grounding the pulse",
      "Mellow, super-cool atmospheric swagger"
    ],
    recommendedReference: "Neo-soul neo-jazz rhythm track with delayed snare and swinging bass",
    tips: [
      "Allows the trumpet player to play loose, expressive, blues-inflected phrases.",
      "The behind-the-beat pocket gives an effortless, sophisticated feel."
    ]
  },
  {
    id: "tight-pocket-unquantized",
    number: 10,
    title: "Tight Pocket & Unquantized Feel",
    focus: "Human timing imperfections, organic micro-fluctuations, zero robotic grid",
    promptText: "Instrumental jazz fusion backing track. Tight pocket, unquantized human timing, percussive drums, deep electric bass, syncopated groove, 105 BPM, 4/4, blues-influenced. Walking bassline, slap bass, jazz drums with brushes, kick and snare pocket, hi-hat ghost notes. Backing track for busking. No saxophone, no vocals, no guitar, no spoken word.",
    tags: ["[Instrumental]", "[Tight Pocket]", "[Groove]", "[Break]", "[Outro]"],
    styleTags: "jazz fusion, tight pocket, unquantized human timing, electric bass, brush drums, 105 bpm, instrumental",
    bpm: 105,
    meter: "4/4",
    keyFeatures: [
      "Unquantized live human feel with organic micro-timing variations",
      "Zero robotic grid rigidity or sterile synthetic quantize",
      "Deep interplay between bass and drum velocity dynamics",
      "Pure acoustic feel as if recorded live in a jazz basement"
    ],
    recommendedReference: "Live studio recording of master rhythm section with natural human push and pull",
    tips: [
      "The phrase 'unquantized human timing' signals Suno's transformer to avoid mechanical MIDI loops.",
      "Best for natural acoustic trumpet solos that breathe and flex with the players."
    ]
  }
];

export const ROOM_TONE_OPTIONS = [
  {
    id: "club",
    label: "Intimate Jazz Club Noise",
    tag: "intimate jazz club noise, warm room acoustics, natural ambient bleed",
    description: "Subtle background room warmth, club acoustics, uncompressed ambience"
  },
  {
    id: "hall",
    label: "Captured in a Wooden Concert Hall",
    tag: "captured in an wooden concert hall, natural wood resonance, air reflections",
    description: "Warm wooden reverberations, natural hall decay, pristine acoustic presence"
  },
  {
    id: "ambience",
    label: "Natural Room Ambience",
    tag: "natural room ambience, unquantized room bleed, live studio acoustics",
    description: "Pure physical room microphone bleed, organic air, zero digital haze"
  },
  {
    id: "studio",
    label: "Live Studio Bleed & Room Reflections",
    tag: "live studio bleed, room reflections, vintage mic preamp warmth",
    description: "Analog studio tape warmth, acoustic bleed between bass and drum mics"
  }
];
