export interface RagaPrompt {
  id: string;
  number: number;
  title: string;
  ragaName: string;
  tradition: "Hindustani" | "Carnatic" | "Acoustic Fusion" | "Ambient Drone";
  ensemble: string;
  timeOfDay: string;
  mood: string;
  isVocalise: boolean;
  tags: string[];
  rawStyleText: string;
  filterSafeStyleText: string;
  lyricsStructure: string;
  description: string;
  swaras?: {
    arohana?: string;
    avarohana?: string;
    vadi?: string;
    samvadi?: string;
  };
}

export const RAGA_FILTER_REPLACEMENT =
  "Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative";

export const RAGA_PROMPTS: RagaPrompt[] = [
  {
    id: "raga-01-sitar-yaman",
    number: 1,
    title: "Sitar & Tanpura – Raga Yaman",
    ragaName: "Raga Yaman (Kalyan Thaat)",
    tradition: "Hindustani",
    ensemble: "Solo Sitar, Tanpura Drone",
    timeOfDay: "Evening (First Prahar of Night)",
    mood: "Meditative, Devotional, Serene & Romantic",
    isVocalise: false,
    tags: ["Sitar", "Tanpura", "Alaap", "Jor", "Jhala", "Meend", "Gamak", "Unquantized"],
    rawStyleText:
      "Instrumental. Hindustani classical raga, Raga Yaman. Solo sitar, tanpura drone. Slow alaap, jor, jhala. Meditative, evening, microtonal meend, gamak, andolan. Close-mic'd, string noise, finger noise, room tone, natural reverb, human timing, unquantized. No tabla, no drums, no synth, no beat, no autotune.",
    filterSafeStyleText:
      "Instrumental. Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Solo sitar, tanpura drone. Slow alaap, jor, jhala. Meditative, evening, microtonal meend, gamak, andolan. Close-mic'd, string noise, finger noise, room tone, natural reverb, human timing, unquantized. No tabla, no drums, no synth, no beat, no autotune.",
    lyricsStructure: `[Instrumental] [Alaap] [Jor] [Jhala] [Outro]`,
    description:
      "Solo sitar and resonant tanpura drone navigating evening peace with microtonal bends, sympathetic string ring, and unquantized human timing.",
    swaras: {
      arohana: "N' R G M# D N S'",
      avarohana: "S' N D P M# G R S",
      vadi: "Ga (Gandhar)",
      samvadi: "Ni (Nishad)"
    }
  },
  {
    id: "raga-02-bansuri-bhairav",
    number: 2,
    title: "Bansuri & Tabla – Raga Bhairav",
    ragaName: "Raga Bhairav (Bhairav Thaat)",
    tradition: "Hindustani",
    ensemble: "Solo Bansuri, Tabla, Tanpura",
    timeOfDay: "Morning (Dawn Prahar)",
    mood: "Devotional, Solemn, Awakened & Contemplative",
    isVocalise: false,
    tags: ["Bansuri", "Tabla", "Audible Breaths", "Bamboo Noise", "Komai Re & Dha", "Gat", "Tihai"],
    rawStyleText:
      "Instrumental. Hindustani classical raga, Raga Bhairav. Solo bansuri, tabla, tanpura. Morning, devotional, breathy flute, bamboo noise, audible breaths, tabla skin noise, human timing, unquantized. Close-mic, room tone, natural reverb. No synth, no drum kit, no pop beat, no autotune.",
    filterSafeStyleText:
      "Instrumental. Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Solo bansuri, tabla only, no drum kit, tanpura. Morning, devotional, breathy flute, bamboo noise, audible breaths, tabla skin noise, human timing, unquantized. Close-mic, room tone, natural reverb. No synth, no pop beat, no autotune.",
    lyricsStructure: `[Instrumental] [Alaap] [Gat] [Tihai] [Outro]`,
    description:
      "Breathy bamboo bansuri and organic tabla skin vibrations celebrating dawn with komal Re and Dha microtonal oscillations.",
    swaras: {
      arohana: "S r G M P d N S'",
      avarohana: "S' N d P M G r S",
      vadi: "Dha (Dhaivat)",
      samvadi: "Re (Rishabh)"
    }
  },
  {
    id: "raga-03-sarod-darbari",
    number: 3,
    title: "Sarod & Pakhavaj – Raga Darbari Kanada",
    ragaName: "Raga Darbari Kanada (Asavari Thaat)",
    tradition: "Hindustani",
    ensemble: "Sarod, Pakhavaj Barrel Drum, Tanpura",
    timeOfDay: "Late Night (Midnight Prahar)",
    mood: "Majestic, Deep, Solemn & Resonant",
    isVocalise: false,
    tags: ["Sarod", "Pakhavaj", "Dhrupad", "Fretless Glide", "Slow Alaap", "Skin Noise", "Unquantized"],
    rawStyleText:
      "Instrumental. Hindustani classical dhrupad, Raga Darbari Kanada. Sarod, pakhavaj, tanpura. Solemn, deep, slow, resonant. String noise, finger noise, skin noise, room tone, human timing, unquantized. No synth, no drum kit, no autotune.",
    filterSafeStyleText:
      "Instrumental. Indian classical dhrupad, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Sarod, pakhavaj barrel drum only, tanpura. Solemn, deep, slow, resonant. String noise, finger noise, skin noise, room tone, human timing, unquantized. No synth, no drum kit, no autotune.",
    lyricsStructure: `[Instrumental] [Alaap] [Jor] [Dhrupad Gat] [Outro]`,
    description:
      "Fretless chrome fingerboard glides of the sarod paired with the deep barrel-drum thud of the pakhavaj for solemn nocturnal gravitas.",
    swaras: {
      arohana: "S R g M P d n S'",
      avarohana: "S' d n P M P g m R S",
      vadi: "Re (Rishabh)",
      samvadi: "Pa (Pancham)"
    }
  },
  {
    id: "raga-04-sarangi-marwa",
    number: 4,
    title: "Sarangi & Santoor – Raga Marwa",
    ragaName: "Raga Marwa (Marwa Thaat)",
    tradition: "Hindustani",
    ensemble: "Sarangi, Hammered Santoor, Tanpura",
    timeOfDay: "Sunset (Twilight Sandhiprakash)",
    mood: "Introspective, Yearning, Eerie & Haunting",
    isVocalise: false,
    tags: ["Sarangi", "Santoor", "Sunset", "Microtonal Bends", "Bowing Noise", "Hammered Strings", "No Drums"],
    rawStyleText:
      "Instrumental. Hindustani classical raga, Raga Marwa. Sarangi, santoor, tanpura. Sunset, introspective, bowing noise, hammered strings, microtonal bends, close-mic, room tone, natural reverb, human timing. No drums, no beat, no synth, no autotune.",
    filterSafeStyleText:
      "Instrumental. Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Sarangi, santoor, tanpura. Sunset twilight, introspective, bowing noise, hammered strings, microtonal bends, close-mic, room tone, natural reverb, human timing. No drums, no beat, no synth, no autotune.",
    lyricsStructure: `[Instrumental] [Alaap] [Gat] [Interlude] [Outro]`,
    description:
      "Bowed gut strings of the sarangi and delicate wooden mallets striking santoor strings, omitting the fifth (Pa) for twilight yearning.",
    swaras: {
      arohana: "N' r G M# D N S'",
      avarohana: "S' N D M# G r S",
      vadi: "Dha (Dhaivat)",
      samvadi: "Re (Rishabh)"
    }
  },
  {
    id: "raga-05-vocal-malkauns",
    number: 5,
    title: "Hindustani Vocal Khayal – Raga Malkauns",
    ragaName: "Raga Malkauns (Bhairavi Thaat)",
    tradition: "Hindustani",
    ensemble: "Wordless Vocalise, Tanpura, Tabla, Sarangi",
    timeOfDay: "Small Hours of Night (Late Night)",
    mood: "Deep, Meditative, Incantatory & Powerful",
    isVocalise: true,
    tags: ["Khayal Vocalise", "Pentatonic", "Tabla", "Sarangi", "Tanpura", "Alaap", "Vistaar", "Taans"],
    rawStyleText:
      "Vocal. Hindustani classical khayal, Raga Malkauns. Wordless vocalise, tanpura, tabla, sarangi. Deep, meditative, alaap, vistaar, taans. Breath, microtones, meend, gamak, close-mic, room tone, human timing, no autotune, no synth, no drum kit.",
    filterSafeStyleText:
      "Vocal. Indian classical khayal, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Wordless vocalise, tanpura, tabla only no drum kit, sarangi. Deep, meditative, alaap, vistaar, taans. Breath, microtones, meend, gamak, close-mic, room tone, human timing, no autotune, no synth.",
    lyricsStructure: `[Vocalise] [Alaap] [Vistaar] [Bandish] [Taans] [Outro]`,
    description:
      "Audible human breaths, sliding meends, and soaring taans in a wordless khayal vocal over resonant tanpura and supporting sarangi.",
    swaras: {
      arohana: "S g M d n S'",
      avarohana: "S' n d M g S",
      vadi: "Ma (Madhyam)",
      samvadi: "Sa (Shadja)"
    }
  },
  {
    id: "raga-06-thumri-bageshri",
    number: 6,
    title: "Thumri – Raga Bageshri",
    ragaName: "Raga Bageshri (Kafi Thaat)",
    tradition: "Hindustani",
    ensemble: "Wordless Vocalise, Tabla, Sarangi, Tanpura",
    timeOfDay: "Midnight",
    mood: "Romantic, Expressive, Longing & Tender",
    isVocalise: true,
    tags: ["Thumri", "Wordless Vocalise", "Tabla", "Sarangi", "Murki", "Bols", "Human Timing"],
    rawStyleText:
      "Vocal. Hindustani light classical thumri, Raga Bageshri. Wordless vocalise, tabla, sarangi, tanpura. Romantic, expressive, meend, murki, bols. Close-mic, breath, room tone, human timing, unquantized. No synth, no autotune, no pop beat.",
    filterSafeStyleText:
      "Vocal. Indian light classical thumri, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Wordless vocalise, tabla only no drum kit, sarangi, tanpura. Romantic, expressive, meend, murki, bols. Close-mic, breath, room tone, human timing, unquantized. No synth, no autotune, no pop beat.",
    lyricsStructure: `[Vocalise] [Alaap] [Thumri] [Bols] [Outro]`,
    description:
      "Intimate, expressive semi-classical vocalise with delicate murki embellishments and syncopated tabla bols.",
    swaras: {
      arohana: "S R g M D n S'",
      avarohana: "S' n D M g R S",
      vadi: "Ma (Madhyam)",
      samvadi: "Sa (Shadja)"
    }
  },
  {
    id: "raga-07-veena-charukeshi",
    number: 7,
    title: "Carnatic Veena & Mridangam – Raga Charukeshi",
    ragaName: "Raga Charukeshi (26th Melakarta)",
    tradition: "Carnatic",
    ensemble: "Saraswati Veena, Mridangam, Ghatam, Tanpura",
    timeOfDay: "Anytime (Universal Affect)",
    mood: "Bittersweet, Lyrical, Devotional & Virtuosic",
    isVocalise: false,
    tags: ["Veena", "Mridangam", "Ghatam", "Gamakas", "Kalpana Swaram", "Carnatic", "Unquantized"],
    rawStyleText:
      "Instrumental. Carnatic classical, Raga Charukeshi. Veena, mridangam, ghatam, tanpura. Gamakas, kalpana swaram, microtonal bends. Close-mic, string noise, finger noise, skin noise, room tone, human timing, unquantized. No synth, no drum kit, no autotune.",
    filterSafeStyleText:
      "Instrumental. Carnatic Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Saraswati veena, mridangam only no drum kit, ghatam clay pot, tanpura. Gamakas, kalpana swaram, microtonal bends. Close-mic, string noise, finger noise, skin noise, room tone, human timing, unquantized. No synth, no autotune.",
    lyricsStructure: `[Instrumental] [Alapana] [Tanam] [Kriti] [Kalpana Swaram] [Outro]`,
    description:
      "The Saraswati veena's brass frets and curved neck glides coupled with double-headed mridangam and clay ghatam rhythms.",
    swaras: {
      arohana: "S R2 G3 M1 P D1 N2 S'",
      avarohana: "S' N2 D1 P M1 G3 R2 S",
      vadi: "Pa (Pancham)",
      samvadi: "Sa (Shadja)"
    }
  },
  {
    id: "raga-08-flute-kirwani",
    number: 8,
    title: "Carnatic Flute & Violin – Raga Kirwani",
    ragaName: "Raga Kirwani (21st Melakarta)",
    tradition: "Carnatic",
    ensemble: "Carnatic Solo Flute, Violin, Mridangam, Kanjira, Tanpura",
    timeOfDay: "Evening / Night",
    mood: "Poignant, Nostalgic, Melodic & Cascading",
    isVocalise: false,
    tags: ["Carnatic Flute", "Violin", "Mridangam", "Kanjira", "Alapana", "Pallavi", "Niraval"],
    rawStyleText:
      "Instrumental. Carnatic classical, Raga Kirwani. Solo flute, violin, mridangam, kanjira, tanpura. Breathy flute, bow noise, gamakas, close-mic, room tone, natural reverb, human timing. No synth, no drum kit, no autotune.",
    filterSafeStyleText:
      "Instrumental. Carnatic Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Solo wooden flute, violin, mridangam only no drum kit, kanjira frame drum, tanpura. Breathy flute, bow noise, gamakas, close-mic, room tone, natural reverb, human timing. No synth, no autotune.",
    lyricsStructure: `[Instrumental] [Alapana] [Pallavi] [Niraval] [Outro]`,
    description:
      "Harmonic minor-like modal beauty delivered through breathy South Indian bamboo flute and expressive acoustic violin unison phrasing.",
    swaras: {
      arohana: "S R2 G2 M1 P D1 N3 S'",
      avarohana: "S' N3 D1 P M1 G2 R2 S",
      vadi: "Ga (Sadharana Gandhara)",
      samvadi: "Dha (Shuddha Dhaivata)"
    }
  },
  {
    id: "raga-09-jazz-fusion-puriya",
    number: 9,
    title: "New Raga-Jazz Fusion – Raga Puriya Dhanashree",
    ragaName: "Raga Puriya Dhanashree",
    tradition: "Acoustic Fusion",
    ensemble: "Sitar, Upright Acoustic Bass, Brushes, Tabla, Tanpura",
    timeOfDay: "Late Afternoon / Twilight",
    mood: "Spacious, Hypnotic, Earthy & Complex",
    isVocalise: false,
    tags: ["Sitar", "Acoustic Bass", "Tabla", "Brushes", "Modal Jazz", "Tape Saturation", "No Synth"],
    rawStyleText:
      "Instrumental. New raga-inspired acoustic fusion, Raga Puriya Dhanashree. Sitar, acoustic bass, brushes, tabla, tanpura. Modal, spacious, microtonal bends, meend, human timing, unquantized, close-mic, room tone, tape saturation. No synth, no electric guitar, no autotune, no drum kit.",
    filterSafeStyleText:
      "Instrumental. New raga-inspired acoustic fusion, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Sitar, acoustic upright bass, brush snare, tabla only no drum kit, tanpura. Modal, spacious, microtonal bends, meend, human timing, unquantized, close-mic, room tone, tape saturation. No synth, no electric guitar, no autotune.",
    lyricsStructure: `[Instrumental] [Alaap] [Fusion Gat] [Bass Interlude] [Tihai] [Outro]`,
    description:
      "Acoustic chamber fusion marrying sitar meends with deep warm upright bass walking lines, brushed snare, and rhythmic tabla tihais.",
    swaras: {
      arohana: "N' r G M# P D N S'",
      avarohana: "S' N D P M# G r S",
      vadi: "Pa (Pancham)",
      samvadi: "Re (Rishabh)"
    }
  },
  {
    id: "raga-10-ambient-drone-todi",
    number: 10,
    title: "Ambient Raga Drone – Raga Todi",
    ragaName: "Raga Todi (Miyan Ki Todi)",
    tradition: "Ambient Drone",
    ensemble: "Tanpura, Swarmandal Harp, Sarangi, Singing Bowls",
    timeOfDay: "Morning (Second Prahar)",
    mood: "Trance-Inducing, Deep, Still & Timeless",
    isVocalise: false,
    tags: ["Tanpura", "Swarmandal", "Sarangi", "Singing Bowls", "No Rhythm", "Drone", "Tape Hiss"],
    rawStyleText:
      "Instrumental. New raga-inspired ambient, Raga Todi. Tanpura, swarmandal, sarangi, singing bowls. Meditative, drone, no rhythm. Microtonal, close-mic, room tone, natural reverb, tape hiss, human timing. No drums, no beat, no synth, no autotune.",
    filterSafeStyleText:
      "Instrumental. New raga-inspired ambient, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. Tanpura drone, swarmandal harp, sarangi, singing bowls. Meditative, drone, no rhythm. Microtonal, close-mic, room tone, natural reverb, tape hiss, human timing. No drums, no beat, no synth, no autotune.",
    lyricsStructure: `[Instrumental] [Drone] [Alaap] [Sarangi Interlude] [Fade]`,
    description:
      "Immersive acoustic sound bath of shimmering swarmandal zither, resonant singing bowl overtones, and slow bowing without any pulse.",
    swaras: {
      arohana: "S r g M# P d N S'",
      avarohana: "S' N d P M# g r S",
      vadi: "Dha (Komal Dhaivat)",
      samvadi: "Ga (Komal Gandhar)"
    }
  }
];

export interface RagaGlossaryTerm {
  term: string;
  category: "Structure" | "Ornamentation" | "Instrument" | "Concept";
  phonetic: string;
  meaning: string;
  sunoUsageTip: string;
}

export const RAGA_GLOSSARY: RagaGlossaryTerm[] = [
  {
    term: "Alaap",
    category: "Structure",
    phonetic: "ah-LAHP",
    meaning: "The slow, unmetered, improvised melodic exposition introducing the notes and mood of the raga.",
    sunoUsageTip: "Use [Alaap] at the start of Suno's lyrics box for a calm, ambient tempo before any pulse enters."
  },
  {
    term: "Jor",
    category: "Structure",
    phonetic: "ZHOR",
    meaning: "The second section where a steady rhythmic pulse enters, but still without drums or percussion.",
    sunoUsageTip: "Put [Jor] after [Alaap] to transition into a rhythmic strumming pace."
  },
  {
    term: "Jhala",
    category: "Structure",
    phonetic: "JHAH-lah",
    meaning: "Fast, rhythmic climax using the chikari (drone strings) to create rapid sparkling tremolo texture.",
    sunoUsageTip: "Use [Jhala] as the energetic pre-outro or finale peak."
  },
  {
    term: "Gat / Bandish",
    category: "Structure",
    phonetic: "GUT / BUN-dish",
    meaning: "Fixed instrumental composition (gat) or vocal composition (bandish) locked to a rhythmic tala cycle.",
    sunoUsageTip: "Tag [Gat] or [Bandish] when the main rhythmic theme should lock in."
  },
  {
    term: "Meend",
    category: "Ornamentation",
    phonetic: "MEEND",
    meaning: "Smooth, continuous microtonal glide from one note to another without steps.",
    sunoUsageTip: "Include 'microtonal meend' in Style box to prevent discrete Western 12-TET piano steps."
  },
  {
    term: "Gamak",
    category: "Ornamentation",
    phonetic: "GUH-muk",
    meaning: "Fast, wide, forceful oscillation or shake between two notes with heavy weight.",
    sunoUsageTip: "Include 'gamak' alongside 'meend' for authentic Indian vocal or veena phrasing."
  },
  {
    term: "Andolan",
    category: "Ornamentation",
    phonetic: "un-DOH-lun",
    meaning: "A gentle, delicate oscillation or swing around a specific microtonal pitch (e.g. komal Re in Bhairav).",
    sunoUsageTip: "Signals subtle human pitch drifting in acoustic solo performances."
  },
  {
    term: "Tanpura Drone",
    category: "Instrument",
    phonetic: "TAHN-poo-rah",
    meaning: "Four or five-string acoustic drone lute tuned to Pa-Sa-Sa-Sa providing the harmonic tonal foundation.",
    sunoUsageTip: "Always specify 'tanpura drone' to ground the entire generation in the root tonic."
  },
  {
    term: "Tabla Only (No Drum Kit)",
    category: "Concept",
    phonetic: "TUB-lah",
    meaning: "Pair of hand drums consisting of the dayan (wood) and bayan (metal/clay) producing tuned tonal bols.",
    sunoUsageTip: "CRITICAL: Suno often introduces Western snares and cymbals unless you explicitly write 'tabla only, no drum kit'."
  }
];
