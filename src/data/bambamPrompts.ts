export interface BamBamPrompt {
  id: string;
  number: number;
  title: string;
  originalSerbianTitle: string;
  focus: string;
  originalSerbianFocus: string;
  promptText: string;
  tags: string[];
  styleTags: string;
  bpm: number | string;
  meter: string;
  genreFusion: string;
  trumpetRole: string;
  keyFeatures: string[];
  tips: string[];
}

export const BAMBAM_SUITE_TIPS = [
  {
    title: "Audio Influence (70% – 85%)",
    detail: "If you want to lock in a specific live jam rhythm or ceremony structure, set Audio Influence between 70% and 85% paired with a live drum reference loop."
  },
  {
    title: "Mandatory Negative Exclusions",
    detail: "Always add 'no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune' to keep the vibe pure, acoustic, and ceremonial."
  },
  {
    title: "Organic Acoustic Realism (Anti-AI)",
    detail: "Always include tactile keywords like 'close-mic, room tone, human timing, tape saturation, analog hiss, unquantized' for a living, breathing sound."
  },
  {
    title: "Safety Filter Workarounds",
    detail: "If Suno filters words like 'tribal' or 'raga', substitute with 'communal drumming, primal rhythm, Indian classical modal inflections'."
  },
  {
    title: "Ecstatic Dance Wave Structure",
    detail: "For classic Ecstatic Dance wave dynamics, use the section progression: [Gentle Start] [Build] [Ecstatic Peak] [Soft Landing]."
  },
  {
    title: "Acoustic Trumpet Headroom",
    detail: "Trumpet naturally cuts through deep sub-bass without competing. Keep midrange synths out so the live acoustic horn stays front-and-center."
  }
];

export const BAMBAM_PROMPTS: BamBamPrompt[] = [
  {
    id: "bambam-tribal-bass",
    number: 1,
    title: "Tribal Drumming & Deep Bass Foundation",
    originalSerbianTitle: "Tribal Drumming & Deep Bass Foundation",
    focus: "Live communal percussion, tribal gathering, and expressive acoustic trumpet calls",
    originalSerbianFocus: "Živi perkusivni nastup, zajedničko bubnjanje, 'plemensko okupljanje'.",
    promptText: "Instrumental. Ritual tribal drumming, deep bass frequencies, live percussion jam with acoustic jazz trumpet lead. Hand drums, djembe, congas, shakers, Harmon-muted trumpet melodies. Heavy sub bass, reggae dub foundation, hypnotic groove. Ecstatic dance, communal drum circle, primal brass energy. No vocals, no pop, no EDM drop. Raw, organic, unquantized.",
    tags: ["[Instrumental]", "[Drum Circle]", "[Deep Bass]", "[Trumpet Solo]", "[Tribal Groove]", "[Outro]"],
    styleTags: "tribal drums, deep sub bass, acoustic trumpet, djembe, reggae dub, unquantized, organic, instrumental",
    bpm: 100,
    meter: "4/4",
    genreFusion: "Tribal Percussion & Reggae Dub with Jazz Trumpet",
    trumpetRole: "Harmon-muted acoustic trumpet floating over djembe polyrhythms and heavy sub bass",
    keyFeatures: [
      "Live hand drums: djembe, congas, shakers, and dunun",
      "Heavy physical sub-bass rooted in reggae dub tradition",
      "Harmon-muted trumpet improvising modal melodies",
      "Communal drum circle energy with zero synthetic quantization"
    ],
    tips: [
      "The Harmon mute creates intimate acoustic buzz that cuts cleanly through heavy sub frequencies.",
      "Unquantized hand drums give the authentic living feel of a Bam Bam jam gathering."
    ]
  },
  {
    id: "bambam-dub-dnb",
    number: 2,
    title: "Dub & Drum and Bass Fusion",
    originalSerbianTitle: "Dub & Drum and Bass Fusion",
    focus: "Heavy bass music from BamBam Festival: reggae dub, dubstep, and liquid DnB with echoing trumpet",
    originalSerbianFocus: "Teški bas žanrovi sa BamBam Festivala — reggae, dub, dubstep, drum & bass.",
    promptText: "Instrumental. Heavy bass music, reggae dub, dubstep, liquid drum and bass with live acoustic trumpet. Tribal percussion, live drums, deep sub bass, echoing dub delay on trumpet riffs. Psychedelic, hypnotic, ritualistic. Ecstatic dance floor, late-night festival. No vocals, no pop. Unquantized human timing, analog warmth.",
    tags: ["[Instrumental]", "[Dub Intro]", "[Trumpet Theme]", "[DnB Drop]", "[Tribal Break]", "[Outro]"],
    styleTags: "reggae dub, liquid dnb, acoustic trumpet, heavy sub bass, dub delay, unquantized, 174bpm, instrumental",
    bpm: 174,
    meter: "4/4",
    genreFusion: "Dub, Dubstep & Liquid Drum and Bass with Horn Stabs",
    trumpetRole: "Dub-delayed trumpet riffs answering rolling liquid breaks and deep 808 sub drops",
    keyFeatures: [
      "Rolling liquid drum & bass breaks intertwined with tribal percussion",
      "Space-echo and tape-delay feedback on acoustic trumpet notes",
      "Massive festival-grade sub bass foundation",
      "Late-night energetic festival dance floor acceleration"
    ],
    tips: [
      "Set tempo to 174 BPM for liquid drum and bass rolling tempo.",
      "The [DnB Drop] bracket signals Suno to switch into rolling breakbeats seamlessly."
    ]
  },
  {
    id: "bambam-ecstatic-journey",
    number: 3,
    title: "Ecstatic Dance Journey",
    originalSerbianTitle: "Ecstatic Dance Journey",
    focus: "Conscious movement, emotional arc from gentle meditative trumpet to ecstatic brass release",
    originalSerbianFocus: "Svesno kretanje, emotivni luk od nežnog do vrhunskog oslobađanja.",
    promptText: "Instrumental. Ecstatic dance journey with soaring acoustic trumpet. Tribal percussion, deep bass, hypnotic rhythm. Starts gentle with breathy trumpet, builds to ecstatic brass release, then soft landing. Live improvisation, dub delays, trance textures. Healing, drug-free, communal. No vocals, no pop, no EDM drop.",
    tags: ["[Instrumental]", "[Gentle Start]", "[Trumpet Build]", "[Ecstatic Peak]", "[Soft Landing]"],
    styleTags: "ecstatic dance, acoustic trumpet, tribal percussion, deep bass, hypnotic build, healing, instrumental",
    bpm: "90 - 130",
    meter: "4/4",
    genreFusion: "Ecstatic Dance Wave & Organic Trance Journey",
    trumpetRole: "Breathy, gentle horn lines building dynamically into cathartic open-bell ecstatic solos",
    keyFeatures: [
      "Gradual dynamic progression following the classic 5Rhythms / Ecstatic wave",
      "Starts contemplative and breathy with open acoustic trumpet",
      "Builds into exhilarating communal trance rhythms",
      "Gently descends into meditative grounding integration"
    ],
    tips: [
      "Use the bracket tags [Gentle Start] and [Soft Landing] to enforce the ceremonial wave shape.",
      "Keeps the energy conscious, organic, and drug-free as in authentic ecstatic dance gatherings."
    ]
  },
  {
    id: "bambam-sound-healing",
    number: 4,
    title: "Sound Healing & Ceremony",
    originalSerbianTitle: "Sound Healing & Ceremony",
    focus: "Sound therapy, 'Healing Day' sessions, singing bowls, resonant bass, and warm flugelhorn",
    originalSerbianFocus: "Zvučna terapija, 'Healing Day' sesije, svesno kretanje.",
    promptText: "Instrumental. Sound healing ceremony with warm acoustic trumpet and flugelhorn. Tribal drums, deep resonant bass, singing bowls, gongs, field recordings. Slow, meditative, ritualistic brass swells. Live percussion, organic textures, analog hiss. Ecstatic dance integration, communal healing. No vocals, no pop, no EDM.",
    tags: ["[Instrumental]", "[Ceremony]", "[Trumpet Healing]", "[Integration]", "[Outro]"],
    styleTags: "sound healing ceremony, acoustic trumpet, singing bowls, deep bass drone, meditative, instrumental",
    bpm: 72,
    meter: "Free / 4/4",
    genreFusion: "Sound Therapy, Ambient Ceremony & Acoustic Brass",
    trumpetRole: "Warm, lingering flugelhorn and trumpet swells harmonizing with Tibetan singing bowls",
    keyFeatures: [
      "Acoustic brass swells blending with crystal singing bowls and resonant gongs",
      "Deep 432 Hz-style grounding sub-bass drones",
      "Forest and river field recordings for physical grounding",
      "Intimate close-mic recording with analog tape warmth"
    ],
    tips: [
      "Flugelhorn and Harmon mute provide soothing, therapeutic acoustic resonance.",
      "Pair with room tone tags to keep the acoustic presence physical and tangible."
    ]
  },
  {
    id: "bambam-trance-latenight",
    number: 5,
    title: "Trance & Hypnotic Late-Night Set",
    originalSerbianTitle: "Trance & Hypnotic Late-Night Set",
    focus: "Late-night festival sets: hypnotic trance, driving tribal rhythm, and psychedelic trumpet echoes",
    originalSerbianFocus: "Kasni noćni delovi — trance, hipnotički elektronski setovi.",
    promptText: "Instrumental. Hypnotic trance, psychedelic electronic with live improvised acoustic trumpet. Tribal percussion, deep rolling bass, driving rhythm, tape-echoed trumpet riffs. Late-night festival, ecstatic dance peak. Repetitive, evolving, immersive. Analog warmth, vinyl crackle, unquantized. No vocals, no pop, no EDM drop.",
    tags: ["[Instrumental]", "[Hypnotic Intro]", "[Trumpet Call]", "[Trance Groove]", "[Peak]", "[Outro]"],
    styleTags: "hypnotic trance, acoustic trumpet, deep rolling bass, tribal percussion, tape delay, instrumental",
    bpm: 128,
    meter: "4/4",
    genreFusion: "Organic Psy-Trance & Tribal Electronic Fusion",
    trumpetRole: "Hypnotic repeated trumpet motifs with stereo tape delay floating above 128 BPM basslines",
    keyFeatures: [
      "Continuous driving tribal trance percussion",
      "Deep rolling bassline with organic acoustic articulation",
      "Psychedelic stereo dub echo and tape feedback on trumpet",
      "Late-night festival peak trance atmosphere"
    ],
    tips: [
      "Tape delay on trumpet mimics the famous live fusion trumpet of Jon Hassell and Nils Petter Molvær.",
      "The [Peak] tag elevates energy without needing artificial synth risers."
    ]
  },
  {
    id: "bambam-live-jam",
    number: 6,
    title: "Live Improvisation Jam",
    originalSerbianTitle: "Live Improvisation Jam",
    focus: "Spontaneous jam, eclectic blend, 'Healing open jam' with virtuosic trumpet improvisation",
    originalSerbianFocus: "Živa improvizacija, eklektičan spoj, 'Healing open jam'.",
    promptText: "Instrumental. Live improvisation jam, Bam Bam Kolektiv style with lead acoustic trumpet. Tribal drums, percussion, deep bass, dub delays on horn. Eclectic fusion: reggae, dub, drum and bass, trance. Communal, ritualistic, unpredictable trumpet soloing. No vocals, no pop, no quantized. Room tone, human timing.",
    tags: ["[Instrumental]", "[Jam]", "[Trumpet Improvisation]", "[Groove]", "[Outro]"],
    styleTags: "live improvisation jam, acoustic trumpet solo, tribal drums, deep dub bass, unquantized, instrumental",
    bpm: 110,
    meter: "4/4",
    genreFusion: "Open Eclectic Jam: Reggae Dub, DnB & Tribal Trance",
    trumpetRole: "Spontaneous acoustic trumpet solos interacting directly with live drum fills and bass slaps",
    keyFeatures: [
      "Authentic open-jam spontaneity with real human push-and-pull timing",
      "Eclectic genre shifts between dub reggae, trance, and jungle breaks",
      "Audible natural room acoustics and instrument bleed",
      "Extended trumpet improvisation sections"
    ],
    tips: [
      "The phrase 'unpredictable trumpet soloing' encourages Suno to generate varied melodic phrases.",
      "Ideal for live busking, stage soloing, and spontaneous jam sessions."
    ]
  },
  {
    id: "bambam-festival-peak",
    number: 7,
    title: "Festival Peak Time",
    originalSerbianTitle: "Festival Peak Time",
    focus: "BamBam Festival at Ada Ciganlija: heavy bass, outdoor riverside energy, driving brass power",
    originalSerbianFocus: "BamBam Festival, Ada Ciganlija, teški bas, energija.",
    promptText: "Instrumental. Festival peak time with high-energy acoustic trumpet riffs. Heavy bass, reggae dub, dubstep, drum and bass. Tribal percussion, live drums, deep sub, cutting trumpet lead. Ecstatic dance floor, outdoor, riverside. Psychedelic, hypnotic, driving. No vocals, no pop. Analog warmth, unquantized.",
    tags: ["[Instrumental]", "[Festival Intro]", "[Trumpet Lead]", "[Heavy Bass Drop]", "[Tribal Break]", "[Outro]"],
    styleTags: "festival bass, acoustic trumpet, reggae dub, heavy sub, live tribal drums, outdoor, instrumental",
    bpm: 140,
    meter: "4/4",
    genreFusion: "Heavy Festival Dubstep, Dub & Tribal Percussion",
    trumpetRole: "Powerful, high-register trumpet horn stabs puncturing the heavy bass drops",
    keyFeatures: [
      "Captures the unique open-air energy of Ada Ciganlija riverside festivals",
      "Heavy sub frequencies shaking the outdoor dance floor",
      "Dynamic shift between dub half-time and double-time tribal breaks",
      "Raw brass brilliance that commands pedestrian and crowd attention"
    ],
    tips: [
      "Great for outdoor busking and festival performances where you need high acoustic impact.",
      "The [Heavy Bass Drop] tag provides maximum dynamic contrast."
    ]
  },
  {
    id: "bambam-sunrise-closing",
    number: 8,
    title: "Sunrise Closing Ceremony",
    originalSerbianTitle: "Sunrise Closing Ceremony",
    focus: "End of the night, gentle descent, quiet integration with contemplative flugelhorn/trumpet",
    originalSerbianFocus: "Završetak noći, tiho spuštanje, integracija.",
    promptText: "Instrumental. Sunrise closing ceremony with gentle acoustic flugelhorn and trumpet. Soft tribal drums, deep gentle bass, ambient textures. Downtempo, meditative, healing. Ecstatic dance integration, communal, ritualistic. Field recordings, room tone, analog hiss. No vocals, no pop, no EDM.",
    tags: ["[Instrumental]", "[Sunrise]", "[Gentle Trumpet]", "[Groove]", "[Integration]", "[Fade]"],
    styleTags: "sunrise closing ceremony, acoustic flugelhorn, gentle tribal drums, downtempo healing, instrumental",
    bpm: 84,
    meter: "4/4",
    genreFusion: "Downtempo Ambient Dub & Healing Ceremony",
    trumpetRole: "Warm, mellow flugelhorn phrases welcoming the dawn with peaceful vibrato",
    keyFeatures: [
      "Gentle, organic tribal percussion playing at relaxed morning tempos",
      "Deep, warm acoustic bass that comforts without overwhelming",
      "Natural morning bird sounds and river ambience in the field recordings",
      "Gradual peaceful fading outro"
    ],
    tips: [
      "Matches the 'Shine in Peace' core identity with tranquil morning sunlight vibes.",
      "The [Fade] tag ensures a serene, seamless finish."
    ]
  },
  {
    id: "bambam-ritual-opening",
    number: 9,
    title: "Ritualistic Opening",
    originalSerbianTitle: "Ritualistic Opening",
    focus: "Ceremony opening, call to gather, tribal trance with ceremonial trumpet invocation",
    originalSerbianFocus: "Početak ceremonije, poziv na okupljanje, plemenski trans.",
    promptText: "Instrumental. Ritualistic opening featuring ceremonial acoustic trumpet invocation. Slow tribal drumming, deep bass drone, chanting textures (wordless). Invocation, communal gathering, primal brass resonance. Live percussion, organic, unquantized. Ecstatic dance beginning. No vocals, no pop, no EDM drop.",
    tags: ["[Instrumental]", "[Trumpet Invocation]", "[Tribal Build]", "[Gathering]", "[Outro]"],
    styleTags: "ritual opening, acoustic trumpet invocation, deep bass drone, tribal drums, communal, instrumental",
    bpm: 78,
    meter: "4/4",
    genreFusion: "Ceremonial Invocation & Tribal Trance Drone",
    trumpetRole: "Ancient ceremonial horn calls echoing across open space to gather the community",
    keyFeatures: [
      "Solemn, resonant trumpet opening reminiscent of ceremonial mountain horns",
      "Deep grounding bass drone establishing harmonic root and security",
      "Gradual acceleration from slow heartbeat drums to rhythmic groove",
      "Wordless communal vocal breath textures without singing"
    ],
    tips: [
      "Use as the first track to open a live set, ceremony, or yoga practice.",
      "The [Trumpet Invocation] tag directs Suno to start with an expressive solo brass fanfare."
    ]
  },
  {
    id: "bambam-raga-tribal",
    number: 10,
    title: "Raga-Infused Tribal Fusion",
    originalSerbianTitle: "Raga-Infused Tribal Fusion",
    focus: "Synthesis of Indian classical raga microtones, tribal drums, and expressive trumpet meend",
    originalSerbianFocus: "Spoj indijske klasične muzike i plemenskog basa (nastavak prethodnih eksperimenata).",
    promptText: "Instrumental. Raga-infused tribal fusion with microtonal acoustic trumpet. Tabla, tanpura drone, deep sub bass, raga-inflected trumpet ornamentations. Tribal drums, dub delays, drum and bass half-time. Ecstatic dance, healing, hypnotic. Microtonal bends, meend, gamak. Close-mic, room tone, unquantized. No vocals, no pop, no EDM drop.",
    tags: ["[Instrumental]", "[Alaap]", "[Raga Trumpet]", "[Tribal Drop]", "[Healing Groove]", "[Outro]"],
    styleTags: "raga tribal fusion, acoustic trumpet, tabla, tanpura drone, deep sub, microtonal, instrumental",
    bpm: 112,
    meter: "Tintal / 4/4",
    genreFusion: "Indian Classical Raga, Tabla & Heavy Tribal Sub-Bass",
    trumpetRole: "Microtonal trumpet executing delicate meend (glides) and gamak oscillations over tanpura",
    keyFeatures: [
      "Real tabla bols and baya bass modulations paired with acoustic drum kit",
      "Continuous meditative tanpura drone in D or C#",
      "Microtonal brass phrasing inspired by Raga Bhairav and Yaman",
      "Dynamic drop from free-meter alaap into deep dub tribal groove"
    ],
    tips: [
      "The alaap tag allows the trumpet to open freely without a rigid drum tempo.",
      "Gives a transcendental bridge between Indian classical heritage and modern bass culture."
    ]
  }
];
