export interface TrumpetPrompt {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  category: "Muted & Smoky" | "Dialogue & Interplay" | "Dub & Ambient" | "Rhythmic & High-Energy" | "Raw & Imperfect";
  rawStyleText: string;
  filterSafeStyleText: string;
  lyricsStructure: string;
  description: string;
  acousticCharacter: string;
  tags: string[];
}

export const TRUMPET_MASTER_TIPS = [
  {
    title: "Filter Avoidance (Jazz Trumpet Flagging)",
    snippet: "acoustic trumpet, Harmon mute, smoky, blue notes, breathy, behind the beat",
    explanation: "If Suno filters 'jazz trumpet' or specific artist names, swap in physical acoustics and stylistic attributes."
  },
  {
    title: "Anti-Smooth-Jazz Guard",
    snippet: "no smooth jazz, no saxophone, no pop brass",
    explanation: "Prevents Suno from defaulting to 1980s adult contemporary saxophone or generic elevator brass."
  },
  {
    title: "Maximum Acoustic Imperfection",
    snippet: "valve noise, breath, lip noise, room tone, no reverb, close-mic",
    explanation: "Forces tactile, unplugged intimacy and stops Suno from synthesizing synthetic polished brass pads."
  },
  {
    title: "Single Soloist vs. Section Guard",
    snippet: "solo acoustic trumpet, single horn, no brass section, sparse",
    explanation: "Keep the trumpet cues sparse. If you stack too many brass descriptors, Suno will generate a bombastic big band."
  },
  {
    title: "Organic Pulse Enforcement",
    snippet: "no autotune, no pop synth, no EDM drop, no quantized",
    explanation: "Essential for liquid drum & bass and microhouse to preserve unquantized swing and human breath."
  }
];

export const TRUMPET_PROMPTS: TrumpetPrompt[] = [
  {
    id: "trumpet-01-smoky-muted-lead",
    number: 1,
    title: "Smoky Muted Trumpet Lead",
    subtitle: "Harmon mute, smoky blue notes & lyrical phrasing behind the beat",
    category: "Muted & Smoky",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, Harmon mute, smoky, lyrical, blue notes, breathy, valve noise, behind the beat. Close-mic, room tone, human timing, unquantized. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, Harmon mute, smoky, lyrical, blue notes, breathy, valve noise, behind the beat. Close-mic, room tone, human timing, unquantized. No autotune, no pop synth, no EDM drop, no smooth jazz, no saxophone.",
    lyricsStructure: `[Vocal]
[Intro]
[Trumpet Theme]
[Drop]
[Trumpet Solo]
[Outro]`,
    description:
      "A classic Harmon-muted lead floating over liquid breakbeats and microhouse clicks with blue notes and behind-the-beat lyrical drag.",
    acousticCharacter: "Harmon mute buzz, audible valve action, intimate close-mic room tone",
    tags: ["Harmon Mute", "Smoky", "Blue Notes", "Behind the Beat", "Liquid DnB", "Tabla", "Dub Delay", "Unquantized"]
  },
  {
    id: "trumpet-02-call-and-response",
    number: 2,
    title: "Trumpet & Voice Call-and-Response",
    subtitle: "Antiphonal conversation between intimate vocal and muted trumpet phrases",
    category: "Dialogue & Interplay",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet answering vocal phrases, call-and-response, muted trumpet, breathy, blue notes, room tone, human timing. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet answering vocal phrases, call-and-response, muted trumpet, breathy, blue notes, room tone, human timing. No autotune, no pop synth, no EDM drop, no smooth jazz.",
    lyricsStructure: `[Vocal]
[Trumpet Response]
[Groove]
[Break]
[Outro]`,
    description:
      "Antiphonal dialogue where each vocal motif is met with a breathy, muted trumpet counter-line over rolling liquid bass.",
    acousticCharacter: "Conversational dynamic between vocal timbres and dry muted brass",
    tags: ["Call-and-Response", "Antiphonal", "Muted Trumpet", "Microhouse Clicks", "Tabla", "Dub Delay"]
  },
  {
    id: "trumpet-03-ambient-dub-trumpet",
    number: 3,
    title: "Ambient Dub Trumpet",
    subtitle: "Drenched in tape dub delays, valve noise and spacious floating trails",
    category: "Dub & Ambient",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Heavy submerged dub delay, echoing vocal tails, trumpet drenched in dub delay. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, spacious, floating, valve noise, breath. Close-mic, room tone, human timing. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Heavy submerged dub delay, echoing vocal tails, trumpet drenched in dub delay. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, spacious, floating, valve noise, breath. Close-mic, room tone, human timing. No autotune, no pop synth, no EDM drop, no smooth jazz.",
    lyricsStructure: `[Vocal]
[Dub Trumpet]
[Drop]
[Outro]`,
    description:
      "Deep tape space: trumpet notes enter dry and then dissolve into infinite submerged feedback tails alongside tabla low-end.",
    acousticCharacter: "Heavy dub echo feedback with warm analog tape warmth and valve noise",
    tags: ["Dub Delay", "Tape Echo", "Ambient Float", "Deep Sub", "Spacious", "Valve Noise"]
  },
  {
    id: "trumpet-04-tabla-jugalbandi",
    number: 4,
    title: "Trumpet + Tabla Jugalbandi",
    subtitle: "Microtonal bends, fast Indian rhythmic dialogue and tabla teental interplay",
    category: "Dialogue & Interplay",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse, raga noon inflections. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures. Acoustic jazz trumpet in dialogue with tabla, jugalbandi, microtonal bends, blue notes, breathy, valve noise, room tone, unquantized. No autotune, no pop synth.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse, raga noon inflections. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures. Acoustic trumpet in dialogue with tabla, jugalbandi, microtonal bends, blue notes, breathy, valve noise, room tone, unquantized. No autotune, no pop synth, no EDM drop.",
    lyricsStructure: `[Vocal]
[Tabla]
[Trumpet]
[Jugalbandi]
[Drop]
[Outro]`,
    description:
      "An Indian classical jugalbandi duel between rapid tabla bols and trumpet microtonal bends over a seamless 174 BPM liquid groove.",
    acousticCharacter: "Rhythmic sparring matching bayam-dayam bayan modulations with half-valve glides",
    tags: ["Jugalbandi", "Tabla Dialogue", "Microtonal Bends", "Raga Noon", "Blue Notes", "Unquantized"]
  },
  {
    id: "trumpet-05-contemplative-ballad",
    number: 5,
    title: "Contemplative Ballad Trumpet",
    subtitle: "Flugelhorn-like warmth, rubato pacing, lyrical breath and deep stillness",
    category: "Muted & Smoky",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, low-energy pulse, deep contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, flugelhorn-like, breathy, rubato, lyrical, minimal, close-mic, room tone, human timing. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, low-energy pulse, deep contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, flugelhorn-like, breathy, rubato, lyrical, minimal, close-mic, room tone, human timing. No autotune, no pop synth, no EDM drop, no smooth jazz.",
    lyricsStructure: `[Vocal]
[Intro]
[Trumpet Ballad]
[Break]
[Outro]`,
    description:
      "A serene, low-pulse meditation favoring round, velvety flugelhorn-style acoustic tone and gentle rubato breathing.",
    acousticCharacter: "Velvety, dark, conical acoustic tone with deep breath and spacious room air",
    tags: ["Ballad", "Flugelhorn-Like", "Rubato", "Contemplative", "Close-Mic", "Low-Energy Pulse"]
  },
  {
    id: "trumpet-06-high-energy-liquid-dnb",
    number: 6,
    title: "High-Energy Liquid DnB Trumpet",
    subtitle: "Punchy muted stabs propelling a 174 BPM rolling liquid breakbeat",
    category: "Rhythmic & High-Energy",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet stabs, energetic, muted, blue notes, breath, valve noise, close-mic, human timing, unquantized. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet stabs, energetic, muted, blue notes, breath, valve noise, close-mic, human timing, unquantized. No autotune, no pop synth, no EDM drop.",
    lyricsStructure: `[Vocal]
[Intro]
[Build]
[Trumpet Stabs]
[Drop]
[Outro]`,
    description:
      "Percussive, sharp brass stabs synchronizing with rolling breakbeats and tabla high accents for maximum momentum.",
    acousticCharacter: "Percussive attack, tight mute bite, rhythmic valve snap",
    tags: ["High-Energy", "Trumpet Stabs", "Rolling Liquid DnB", "174 BPM", "Punchy", "Unquantized"]
  },
  {
    id: "trumpet-07-microhouse-pointillist",
    number: 7,
    title: "Microhouse Pointillist Trumpet",
    subtitle: "Sparse pointillistic staccato clicks, Harmon mute chirps & valve clicks",
    category: "Rhythmic & High-Energy",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, sparse, pointillistic, short notes, Harmon mute, breathy, valve clicks, room tone, human timing. No autotune, no pop synth.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, sparse, pointillistic, short notes, Harmon mute, breathy, valve clicks, room tone, human timing. No autotune, no pop synth, no EDM drop.",
    lyricsStructure: `[Vocal]
[Clicks]
[Trumpet]
[Groove]
[Outro]`,
    description:
      "Hyper-minimalist microhouse texture: the trumpet acts almost like rhythmic percussion with isolated valve clicks and tiny Harmon chirp bursts.",
    acousticCharacter: "Isolated pointillistic staccato chirps, mechanical valve snaps, dry acoustic proximity",
    tags: ["Microhouse", "Pointillist", "Valve Clicks", "Harmon Mute", "Minimalist", "Short Notes"]
  },
  {
    id: "trumpet-08-raga-inflected-jazz",
    number: 8,
    title: "Raga-Inflected Jazz Trumpet",
    subtitle: "Microtonal meend glides, gamak oscillations & modal jazz phrasing",
    category: "Muted & Smoky",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse, raga noon inflections. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures. Acoustic jazz trumpet with meend and gamak-like bends, modal jazz, blue notes, breathy, close-mic, room tone, human timing, unquantized. No autotune, no pop synth.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse, raga noon inflections. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures. Acoustic trumpet with meend and gamak-like bends, modal trumpet, blue notes, breathy, close-mic, room tone, human timing, unquantized. No autotune, no pop synth.",
    lyricsStructure: `[Vocal]
[Alaap]
[Trumpet]
[Groove]
[Outro]`,
    description:
      "Half-valve glides mimic Hindustani vocal meend, curving through noon raga scales (like Sarang or Shuddha Sarang) within a modal jazz framework.",
    acousticCharacter: "Half-valve microtonal glides, continuous pitch inflections, warm room resonance",
    tags: ["Meend Glides", "Gamak", "Modal Jazz", "Raga Noon", "Microtonal", "Unquantized"]
  },
  {
    id: "trumpet-09-acoustic-jazz-trio",
    number: 9,
    title: "Acoustic Jazz Trio Meets Electronics",
    subtitle: "Upright bass, brushed textures & ride cymbals grounded in deep sub",
    category: "Dub & Ambient",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, upright bass, ride cymbal, brushed textures, blue notes, breathy, valve noise, room tone, human timing. No autotune, no pop synth.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, upright bass, ride cymbal, brushed textures, blue notes, breathy, valve noise, room tone, human timing. No autotune, no pop synth, no EDM drop.",
    lyricsStructure: `[Vocal]
[Intro]
[Trumpet]
[Bass]
[Drop]
[Outro]`,
    description:
      "Live acoustic jazz trio instrumentation (trumpet, upright bass, brushed snare) fused into a deep electronic sub-bass and microhouse grid.",
    acousticCharacter: "Woody upright bass slap, brushed brass sizzle, intimate room microphones",
    tags: ["Jazz Trio", "Upright Bass", "Ride Cymbal", "Brushed Textures", "Acoustic-Electronic", "Blue Notes"]
  },
  {
    id: "trumpet-10-unplugged-imperfect",
    number: 10,
    title: "Unplugged Imperfect Trumpet",
    subtitle: "Extreme mechanical fidelity: valve clicks, spit, breath, tape drift & room tone",
    category: "Raw & Imperfect",
    rawStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic jazz trumpet, close-mic’d, valve clicks, breath, lip noise, spit, room tone, tape saturation, human timing drift, unquantized. No autotune, no pop synth, no EDM drop.",
    filterSafeStyleText:
      "Liquid drum and bass, ambient microhouse. Intimate rhythmic voice, restrained doubles, high-energy pulse, contemplative float. Submerged dub delay, echoing vocal tails. Wide low-end, minimal immersive space. Hand-played tabla over deep sub, microhouse clicks, sparse ambient synth textures, raga noon inflections. Acoustic trumpet, close-mic’d, valve clicks, breath, lip noise, spit, room tone, tape saturation, human timing drift, unquantized. No autotune, no pop synth, no EDM drop, no smooth jazz.",
    lyricsStructure: `[Vocal]
[Trumpet Solo]
[Groove]
[Outro]`,
    description:
      "Hyper-realistic unplugged acoustic recording capturing raw physical human performance nuances: spit, lip buzz, valve mechanics, and room air.",
    acousticCharacter: "Tactile mechanical fidelity, close-mic spit, lip buzz, unquantized timing drift",
    tags: ["Unplugged", "Valve Clicks", "Lip Noise", "Spit", "Tape Saturation", "Human Drift"]
  }
];
