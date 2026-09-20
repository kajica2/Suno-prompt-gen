export interface DdspAsmrProtocol {
  id: string;
  number: string;
  symbol: string;
  title: string;
  shortTitle: string;
  protocolName: string;
  bpm: string;
  stylePrompt: string;
  radioEditStylePrompt?: string;
  lyrics: string;
  binauralPanningInstructions: string;
  characterCount: {
    style: number;
    radioEdit?: number;
    lyrics: number;
  };
  sonicDescription: string;
  keyTextures: string[];
  sunoTips: string[];
}

export const DDSP_ASMR_PROTOCOLS: DdspAsmrProtocol[] = [
  {
    id: "shadow-weaving",
    number: "#1",
    symbol: "ℰ",
    title: "#1 · ℰ · Shadow-Weaving — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Shadow-Weaving",
    protocolName: "ℰ · Shadow-Weaving",
    bpm: "60 BPM",
    stylePrompt: `DDSP ASMR, real acoustic Harmon-muted trumpet whispers, natural breathy trumpet embouchure, reversed acoustic cello granules, warm organic sub-bass acoustic resonance, binaural close-mic, genuine acoustic room capture, soft tactile valve clicks, pure acoustic instruments, no synthetic artifacts, low-volume shadow ambient, 60 BPM, tingles, intimate, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Breathy Harmon-muted trumpet whisper air & soft tactile valve clicks]\n[Right Ear: Acoustic reversed cello granules & natural room air resonance]\n[Center: Low acoustic subterranean drone, organic brass embouchure micro-tingles shifting 60 BPM]\n[Both Ears: Pure natural acoustic instrument capture, intimate uncompressed closeness]`,
    characterCount: {
      style: 312,
      lyrics: 14
    },
    sonicDescription: "Subterranean energy collection and deep shadow integration rendered through real acoustic Harmon-muted trumpet whispers, breathy embouchure air, tactile brass valve releases, and organic cello resonance—completely free of synthetic AI artifacts.",
    keyTextures: [
      "Real Harmon-muted trumpet",
      "Breathy embouchure air",
      "Tactile brass valve clicks",
      "Acoustic cello granules",
      "Organic room resonance (No AI sheen)"
    ],
    sunoTips: [
      "Natural acoustic capture: prompts specifically enforce genuine brass physics and tactile valve noise.",
      "Harmon mute (stem out) generates whisper-quiet high-frequency air tingles perfect for binaural ASMR.",
      "Include [Instrumental] in the Lyrics box to prevent vocal hallucinations."
    ]
  },
  {
    id: "rgbo-high-stakes",
    number: "#2",
    symbol: "RGBO",
    title: "#2 · RGBO · High-Stakes — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "RGBO High-Stakes",
    protocolName: "RGBO · High-Stakes Decision Navigation",
    bpm: "72 BPM",
    stylePrompt: `DDSP ASMR, natural acoustic cup-muted trumpet, organic flugelhorn pulses, real hand-struck taiko, close-mic acoustic brass breath, natural room reverb, warm acoustic instruments, no synthetic digital artifacts, red-green-blue textural color coding, 72 BPM, high-stakes yet gentle acoustic intimacy, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Red grounding pulse (real hand-struck wooden taiko, gentle rim tap, 72 BPM)]\n[Right Ear: Blue acoustic cup-muted trumpet whisper & delicate bell resonance]\n[Center: Green warm flugelhorn air column oscillating softly with human breath]\n[Both Ears: 100% natural acoustic instruments, organic dynamic breath release]`,
    characterCount: {
      style: 285,
      lyrics: 14
    },
    sonicDescription: "High-stakes crossroads navigated with organic acoustic warmth: natural cup-muted trumpet whispers, warm flugelhorn breath, and hand-struck wooden taiko skin without synthetic digital processing.",
    keyTextures: [
      "Natural cup-muted trumpet",
      "Organic flugelhorn pulses",
      "Real hand-struck taiko",
      "Acoustic brass breath",
      "True acoustic studio space"
    ],
    sunoTips: [
      "Cup mute dampens harsh upper harmonics, yielding a woody, intimate acoustic tone.",
      "72 BPM aligns with a calm, focused human heart rate.",
      "Organic acoustic instrument cues instruct Suno to prioritize realistic physical room recording."
    ]
  },
  {
    id: "creative-womb",
    number: "#3",
    symbol: "[⌀]°",
    title: "#3 · [⌀]° · Creative Womb — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Creative Womb",
    protocolName: "[⌀]° · Creative Womb & Oblique Spark",
    bpm: "55 BPM",
    stylePrompt: `DDSP ASMR, real acoustic flugelhorn breath tones, soft velvet trumpet overtones, genuine hammered Tibetan singing bowls, organic acoustic heartbeat pulse, close-mic brass embouchure air, pure natural instruments, zero AI metallic glaze, fertile acoustic void, 55 BPM, tactile tingles, soft, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Real hammered singing bowl rim friction & subtle brass valve breathing]\n[Right Ear: Velvet flugelhorn air trail & delicate brass bell overtone sparks]\n[Center: Soft acoustic heartbeat sub-thud, fertile quiet space [⌀]]\n[Both Ears: Pure organic instrument physics, zero synthetic glaze, deep ASMR tingles]`,
    characterCount: {
      style: 281,
      lyrics: 14
    },
    sonicDescription: "The generative gestational void: ultra-soft acoustic flugelhorn breath tones, velvety trumpet overtones, and genuine hand-hammered singing bowls recorded with natural room air.",
    keyTextures: [
      "Velvet acoustic flugelhorn",
      "Breathy trumpet overtones",
      "Hammered Tibetan bowls",
      "Acoustic heartbeat pulse",
      "Zero AI metallic glaze"
    ],
    sunoTips: [
      "Flugelhorn offers a broader, darker conical bore tone that blends seamlessly with acoustic singing bowls.",
      "Microscopic valve and breath noises create intense binaural ASMR sensation in headphones.",
      "Spacious 55 BPM tempo leaves breathing room between acoustic phrases."
    ]
  },
  {
    id: "relational-torus",
    number: "#4",
    symbol: "⧖",
    title: "#4 · ⧖ · Relational — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Relational Torus",
    protocolName: "⧖ · Relational Repair & Deepening",
    bpm: "68 BPM",
    stylePrompt: `DDSP ASMR, intimate acoustic trumpet dialogue, warm flugelhorn, real acoustic upright bass with fingerboard slide clicks, authentic vintage Rhodes tines, genuine room acoustics, organic uncompressed acoustic instruments, no AI artifacts, toroidal binaural cycle, 68 BPM, warm, relational, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Warm acoustic flugelhorn melodic murmur & subtle key click]\n[Right Ear: Breathy acoustic trumpet response with felt-damped upright bass slide]\n[Toroidal Panning: Figure-8 stereo dialogue between the two acoustic brass voices at 68 BPM]\n[Both Ears: Genuine studio acoustic bleed, deeply warm and relational]`,
    characterCount: {
      style: 280,
      lyrics: 14
    },
    sonicDescription: "Continuous toroidal dialogue between two real brass instruments: intimate acoustic trumpet and warm flugelhorn conversing over felt-damped upright bass and genuine Rhodes tines.",
    keyTextures: [
      "Acoustic trumpet dialogue",
      "Warm flugelhorn counterpoint",
      "Upright bass finger slides",
      "Genuine Rhodes tines",
      "Organic uncompressed room"
    ],
    sunoTips: [
      "Pairing acoustic trumpet with flugelhorn creates a rich, natural conversation between brighter and darker brass colors.",
      "Acoustic fingerboard slides and brass valve releases ground the sound in physical human performance.",
      "The toroidal loop keeps the harmonic flow continuous without abrupt changes."
    ]
  },
  {
    id: "substrate-vitality",
    number: "#5",
    symbol: "𝓢",
    title: "#5 · 𝓢 · Substrate — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Substrate Vitality",
    protocolName: "𝓢 · Substrate Vitality Tuning",
    bpm: "52 BPM",
    stylePrompt: `DDSP ASMR, deep pedal-tone acoustic trumpet, dark flugelhorn sub-frequencies, close-mic brass air column, real acoustic bowed bass, sonar-like acoustic bell pings, pure organic acoustic capture, no synthetic haze, natural bedrock resonance, 52 BPM, foundational, quiet, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Deep acoustic trumpet pedal tone (sub-harmonic vibration, 52 BPM)]\n[Right Ear: Acoustic chime ping & tactile valve slide adjustment]\n[Center: Real bowed double bass low fundamental & slow diaphragmatic breath]\n[Both Ears: Visceral biological acoustic grounding, zero synthetic distortion]`,
    characterCount: {
      style: 271,
      lyrics: 14
    },
    sonicDescription: "Biological grounding in the visceral body: low acoustic trumpet pedal tones, dark flugelhorn sub-frequencies, bowed double bass, and close-mic brass air columns—unadulterated by digital synthesizers.",
    keyTextures: [
      "Acoustic trumpet pedal tones",
      "Dark flugelhorn sub-harmonics",
      "Real bowed double bass",
      "Close-mic air column",
      "Natural bedrock resonance"
    ],
    sunoTips: [
      "Trumpet pedal tones produce raw, deep acoustic buzz frequencies that resonate physically.",
      "52 BPM supports parasympathetic down-regulation and deep somatic relaxation.",
      "Close-micing captures the natural warmth of the player's acoustic air stream."
    ]
  },
  {
    id: "meta-learning",
    number: "#6",
    symbol: "𝒲",
    title: "#6 · 𝒲 · Meta-Learning — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Meta-Learning",
    protocolName: "𝒲 · Meta-Learning & Phoenix Topology",
    bpm: "76 BPM",
    stylePrompt: `DDSP ASMR, acoustic trumpet flutter-tongue micro-textures, plunger mute half-valve inflections, natural acoustic brushes on snare, real wooden percussion, close-mic organic brass, authentic acoustic instruments, zero digital harshness, adaptive acoustic morphing, 76 BPM, quiet, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Acoustic trumpet flutter-tongue whisper & soft plunger mute vocalization]\n[Right Ear: Real wire brush sweeps on acoustic snare drum skin]\n[Stereo Morph: Half-valve acoustic inflections panning gently across the stereo field at 76 BPM]\n[Both Ears: Authentic acoustic instrumental virtuosity, micro-tactile tingles]`,
    characterCount: {
      style: 283,
      lyrics: 14
    },
    sonicDescription: "Self-transforming acoustic virtuosity: delicate trumpet flutter-tonguing, plunger mute vocalizations, half-valve micro-tonal inflections, and real wire brushes on drum skins.",
    keyTextures: [
      "Trumpet flutter-tongue whisper",
      "Plunger mute half-valve inflections",
      "Real wire snare brushes",
      "Wooden acoustic percussion",
      "Zero digital harshness"
    ],
    sunoTips: [
      "Flutter-tonguing and half-valve techniques generate acoustic ASMR textures naturally without digital effects.",
      "Wire brushes on drum heads provide organic, tactile high-frequency sparkle.",
      "Adaptive acoustic phrasing encourages Suno to explore nuanced brass articulations."
    ]
  },
  {
    id: "collective-nomadic",
    number: "#7",
    symbol: "𝒲_θ",
    title: "#7 · 𝒲_θ · Collective Nomadic — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "Collective Nomadic",
    protocolName: "𝒲_θ · Collective Nomadic Coordination",
    bpm: "64 BPM",
    stylePrompt: `DDSP ASMR, acoustic open-bell trumpet drone, soft flugelhorn harmonies, real goat-skin frame drums, natural acoustic throat-singing breath, close-mic organic brass warmth, pure natural acoustic ensemble, no AI sheen, gathered acoustic intimacy, 64 BPM, soft, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[Left Ear: Acoustic open-bell trumpet soft drone & quiet valve movement]\n[Right Ear: Real goat-skin frame drum rim clicks & shaker granules]\n[Center: Soft flugelhorn melodic hum & acoustic overtone breath]\n[Both Ears: 360-degree gathered acoustic campfire circle, 100% human-performed instruments]`,
    characterCount: {
      style: 272,
      lyrics: 14
    },
    sonicDescription: "Consensual multi-agent gathering around a nocturnal fire: open-bell acoustic trumpet drones, warm flugelhorn harmonies, real goat-skin frame drums, and organic breath.",
    keyTextures: [
      "Open-bell acoustic trumpet drone",
      "Soft flugelhorn harmonies",
      "Real goat-skin frame drum",
      "Acoustic breath and overtones",
      "Pure natural ensemble"
    ],
    sunoTips: [
      "Open-bell trumpet played pianissimo provides a singing, resonant acoustic foundation.",
      "Real frame drum skins offer earthy, non-electronic low-end warmth.",
      "The acoustic ensemble prompt cues Suno to build a cohesive room sound rather than separate synthetic tracks."
    ]
  },
  {
    id: "master-console",
    number: "Master",
    symbol: "ℰ-Master",
    title: "ℰ-Integration Console · Master — DDSP ASMR (Acoustic Trumpet)",
    shortTitle: "ℰ-Console Master",
    protocolName: "ℰ-Integration Console · Master",
    bpm: "60 BPM",
    stylePrompt: `DDSP ASMR, master acoustic trumpet and flugelhorn integration: Harmon mute whispers, cup-muted brass, velvet flugelhorn breath, real acoustic cello, upright bass, singing bowls, brush snare, frame drum. 100% natural organic acoustic instruments, pure room capture, zero synthetic AI artifacts, 60 BPM, integrated, quiet, instrumental`,
    radioEditStylePrompt: `DDSP ASMR, acoustic trumpet & flugelhorn master: Harmon whispers, cup mute, velvet breath, real cello, upright bass, singing bowls, natural room acoustics, organic instruments, no AI artifacts, 60 BPM, quiet, instrumental`,
    lyrics: `[Instrumental]`,
    binauralPanningInstructions: `[0:00-0:30 Left Ear: Acoustic Harmon-muted trumpet whispers & tactile valve releases]\n[0:30-1:00 Right Ear: Cup-muted trumpet dialogue with soft wood taiko pulse]\n[1:00-1:30 Center: Velvet flugelhorn breath over real hammered singing bowls]\n[1:30-2:00 Torus Panning: Dual trumpet/flugelhorn acoustic dialogue with upright bass]\n[2:00-2:30 Low Bed: Trumpet pedal tone & bowed acoustic double bass]\n[2:30-3:00 Stereo Swirl: Plunger half-valve textures & wire brush sweeps]\n[3:00+ 360° Binaural: Gathered acoustic brass ensemble drone, pure room resonance, stillness]`,
    characterCount: {
      style: 317,
      radioEdit: 216,
      lyrics: 14
    },
    sonicDescription: "The definitive master integration crafted for the trumpet player: an acoustic tapestry uniting Harmon-muted whispers, cup mute, velvet flugelhorn breath, pedal tones, and plunger half-valves alongside cello, upright bass, and singing bowls. 100% organic acoustic capture with zero synthetic AI sheen.",
    keyTextures: [
      "Master acoustic trumpet palette",
      "Harmon mute & cup mute whispers",
      "Velvet flugelhorn breath",
      "Pedal tones & half-valves",
      "100% natural organic instruments"
    ],
    sunoTips: [
      "The Master console weaves every acoustic trumpet timbre into a single continuous journey.",
      "Radio-edit version under 1500 chars is optimized for constrained prompt windows.",
      "Add the Binaural Panning timestamps into the lyrics box for guided movement in Suno."
    ]
  }
];
