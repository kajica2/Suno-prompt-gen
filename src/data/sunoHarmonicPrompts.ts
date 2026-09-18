export interface SunoVocalPrompt {
  id: string;
  number: number;
  title: string;
  frameworkCategory: string;
  styleTags: string;
  vocalType: string;
  lyrics: string;
  description: string;
  characterCount: number;
  lyricsCharacterCount: number;
  bpm: number;
  tags: string[];
}

export const VOCAL_STRUCTURE_TAGS = `[Intro: sparse piano] [Verse: soft vocal, close-mic] [Chorus: lush strings, harmonic lift] [Bridge: tritone modulation] [Outro: unresolved cadence]`;

export const SUNO_VOCAL_HARMONIC_PROMPTS: SunoVocalPrompt[] = [
  {
    id: "baroque-functional",
    number: 1,
    title: "1. Baroque / Functional Tonality",
    frameworkCategory: "Common-Practice & Tonal Architecture",
    vocalType: "Clear female vocal, elegant, articulate",
    styleTags: "Baroque chamber ensemble, harpsichord, strings, counterpoint, functional harmony, I-IV-V-I cadences, circle-of-fifths motion, terraced dynamics, 96 BPM, clear female vocal, elegant, resolved, instrumental sections",
    lyrics: `[Intro: harpsichord, instrumental]

[Verse 1: female vocal, clear]
Tonic and dominant, the pillars of the key,
Roman numerals marching, ordered and free.
Subdominant prepares, the dominant demands,
A leading tone that reaches out with open hands.

[Pre-Chorus: strings swell]
The circle turns, the fifths descend,
A cadence waits around the bend.

[Chorus: full ensemble]
I-IV-V-I, the ancient path we know,
Tension into resolution, let the tonic glow.
Functional tonality, the architecture stands,
A universe of order in the composer's hands.

[Verse 2: female vocal, softer]
Counterpoint above, a horizontal line,
Prolonging the triad, a contrapuntal design.
The bass walks down, the upper voices sing,
A common-practice harmony, a timeless, living thing.

[Bridge: harpsichord solo, instrumental]

[Outro: female vocal, fading]
I-IV-V-I... home.`,
    description: "Baroque chamber ensemble with harpsichord and counterpoint. Lyrically explores tonic-dominant polarity, Roman numerals, circle-of-fifths motion, and cadential resolution.",
    characterCount: 207,
    lyricsCharacterCount: 809,
    bpm: 96,
    tags: ["Baroque", "Harpsichord", "I-IV-V-I", "Circle of Fifths", "Terraced Dynamics", "Female Vocal"]
  },
  {
    id: "jazz-ii-v-i",
    number: 2,
    title: "2. Jazz II–V–I",
    frameworkCategory: "Modal & Altered Jazz Voice-Leading",
    vocalType: "Smooth male vocal, late-night, sophisticated",
    styleTags: "Smoky jazz trio, upright bass, brushed drums, Rhodes piano, ii-V-I progressions, extended chords, drop-2 voicings, walking bass, 120 BPM, smooth male vocal, late-night, sophisticated, instrumental breaks",
    lyrics: `[Intro: brushed drums, upright bass, instrumental]

[Verse 1: male vocal, smooth]
Two minor seven, the journey starts,
A tonic note that pulls at hearts.
Then five dominant, with alterations sweet,
The seventh falls, the third completes.

[Pre-Chorus: Rhodes chords]
A half-step down, a half-step up,
The voice leading fills the cup.

[Chorus: full trio]
ii-V-I, the cadence of the night,
Drop-2 voicings, everything's alright.
Extensions bloom, the tensions sigh,
A jazz resolve beneath the sky.

[Verse 2: male vocal, scatting lightly]
Minimum motion, common tones,
The bass walks down in mellow zones.
From two to five to one we glide,
A harmonic rollercoaster ride.

[Bridge: piano solo, instrumental]

[Outro: male vocal, whispered]
ii... V... I...`,
    description: "Smoky jazz trio with brushed drums and Rhodes chords. Explores ii-V-I voice-leading mechanics, drop-2 voicings, alterations, and chromatic guide tones.",
    characterCount: 202,
    lyricsCharacterCount: 746,
    bpm: 120,
    tags: ["Jazz Trio", "Rhodes", "ii-V-I", "Drop-2 Voicings", "Walking Bass", "Male Vocal"]
  },
  {
    id: "bartok-axis",
    number: 3,
    title: "3. Bartók Axis System",
    frameworkCategory: "Symmetrical Axes & Tritone Modulation",
    vocalType: "Dark female vocal, mysterious, folk-like",
    styleTags: "Modern classical string quartet, Bartók axis system, tritone pole modulation, symmetrical harmony, folk-like asymmetric rhythms, octatonic colors, 104 BPM, dark female vocal, mysterious, instrumental passages",
    lyrics: `[Intro: strings, pizzicato, instrumental]

[Verse 1: female vocal, dark]
Tonic and counterpole, a tritone twin,
No dominant to pull me in.
C and F-sharp, they interchange,
A symmetrical world, beautiful and strange.

[Pre-Chorus: strings tremolo]
Axis of tonic, axis of light,
Poles in balance, day and night.

[Chorus: full quartet]
Bartók axis, no functional chain,
Just polar opposites, joy and pain.
Modulate sideways, no leading tone,
In this symmetry, I am not alone.

[Verse 2: female vocal, folk-like]
Subdominant axis, dominant too,
Four poles turning, a chromatic hue.
No resolution, just shifting space,
A mirrored harmony, a different grace.

[Bridge: string harmonics, instrumental]

[Outro: female vocal, fading]
C... F-sharp... C... F-sharp...`,
    description: "Modern classical string quartet exploring Lendvai's Bartók axis system. Lyrically dissects tritone counterpoles (C and F#), symmetrical harmony, and non-functional modulation.",
    characterCount: 209,
    lyricsCharacterCount: 771,
    bpm: 104,
    tags: ["String Quartet", "Bartók Axis", "Tritone Pole", "Symmetrical Harmony", "Octatonic", "Dark Vocal"]
  },
  {
    id: "neo-riemannian",
    number: 4,
    title: "4. Neo-Riemannian",
    frameworkCategory: "Parsimonious Triadic Transformations",
    vocalType: "Ethereal female vocal, floating, cinematic",
    styleTags: "Ambient film score, neo-Riemannian triadic transformations, smooth voice leading, suspended tonality, piano, strings, warm pads, 72 BPM, ethereal female vocal, floating, cinematic, instrumental swells",
    lyrics: `[Intro: warm pads, piano, instrumental]

[Verse 1: female vocal, ethereal]
P, L, R, a single voice moves,
One note changes, the triad improves.
Parallel, leading-tone, relative too,
A parsimonious path for me and you.

[Pre-Chorus: strings rise]
Tonnetz pathways, a triadic map,
Every transformation a gentle lap.

[Chorus: full arrangement]
Neo-Riemannian, the chords transform,
No function here, just a different norm.
One voice shifts, the other two stay,
A smooth connection, a luminous way.

[Verse 2: female vocal, floating]
C major to E minor, a leading-tone slide,
A minor to C major, nowhere to hide.
Triads as nodes in a shimmering net,
The most parsimonious motion yet.

[Bridge: piano arpeggios, instrumental]

[Outro: female vocal, whispered]
P... L... R...`,
    description: "Cinematic ambient score on the Tonnetz network. Explores the P (Parallel), L (Leading-tone exchange), and R (Relative) minimal-motion transformations.",
    characterCount: 197,
    lyricsCharacterCount: 775,
    bpm: 72,
    tags: ["Neo-Riemannian", "Tonnetz", "P-L-R", "Parsimonious Voice Leading", "Film Score", "Ethereal Vocal"]
  },
  {
    id: "atonal-pitch-class",
    number: 5,
    title: "5. Atonal / Pitch-Class Set",
    frameworkCategory: "Pitch-Class Sets & Post-Tonal Geometry",
    vocalType: "Spoken-sung male vocal, angular, rhythmic",
    styleTags: "Avant-garde contemporary classical, atonal, pitch-class sets, angular melodies, prepared piano, string harmonics, percussion, 80 BPM, spoken-sung male vocal, unsettling, abstract, instrumental textures",
    lyrics: `[Intro: prepared piano, percussion, instrumental]

[Verse 1: male vocal, spoken-sung]
Pitch-class zero, C for convenience,
No tonal center, no tonal sequence.
Interval vectors, a census of sound,
Prime form reductions, where structure is found.

[Pre-Chorus: strings, dissonant]
No tonic, no dominant, no home to return,
Just sets and relations, a different concern.

[Chorus: full ensemble, angular]
Pitch-class set theory, the atonal code,
Similarity relations, a heavy load.
Transposition, inversion, the operations spin,
A twelve-tone universe from deep within.

[Verse 2: male vocal, rhythmic]
Octatonic collections, symmetric and bright,
Petrushka chords in the dead of night.
No resolution, no cadence to plead,
Just interval classes and structural need.

[Bridge: string harmonics, instrumental]

[Outro: male vocal, whispered]
Zero... eleven... six... four...`,
    description: "Avant-garde post-tonal chamber piece with prepared piano. Lyrically examines interval-class vectors, prime forms, pitch-class zero, and Forte numbers.",
    characterCount: 203,
    lyricsCharacterCount: 835,
    bpm: 80,
    tags: ["Atonal", "Pitch-Class Sets", "Prepared Piano", "Interval Vectors", "Spoken-Sung"]
  },
  {
    id: "spectral-psychoacoustic",
    number: 6,
    title: "6. Spectral / Psychoacoustic",
    frameworkCategory: "Spectralism & Psychoacoustic Harmony",
    vocalType: "Haunting female vocal, microtonal, immersive",
    styleTags: "Spectral composition, psychoacoustic harmony, Fourier-based timbres, microtonal, evolving drones, tension curves, 65 BPM, haunting female vocal, immersive, experimental, instrumental layers",
    lyrics: `[Intro: evolving drone, instrumental]

[Verse 1: female vocal, haunting]
Fourier analysis, the overtones sing,
Partials unfolding on a spectral wing.
Roughness and tension, a psychoacoustic curve,
Harmonicity and dissonance, the ear's reserve.

[Pre-Chorus: microtonal strings]
No twelve-tone grid, just a continuum of sound,
Where frequencies float and are never quite bound.

[Chorus: full spectral texture]
Spectral harmony, the timbre is the chord,
A shimmering cloud that cannot be ignored.
Tension and release in a continuous stream,
A psychoacoustic, immersive dream.

[Verse 2: female vocal, floating]
Consonance, dissonance, sensory blend,
A harmonic series that seems without end.
The engine of perception, a scientific art,
Spectral composition, a brand new start.

[Bridge: evolving drones, instrumental]

[Outro: female vocal, fading]
Overtones... partials... light...`,
    description: "Spectral composition inspired by French spectralists and acoustic physics. Lyrically delves into Fourier analysis, overtones, roughness curves, and sensory dissonance.",
    characterCount: 190,
    lyricsCharacterCount: 802,
    bpm: 65,
    tags: ["Spectralism", "Fourier Analysis", "Overtones", "Psychoacoustics", "Microtonal", "Haunting Vocal"]
  },
  {
    id: "combined-harmonic-medley",
    number: 7,
    title: "7. Combined Vocal Medley (All 6 Approaches)",
    frameworkCategory: "Grand Synesthetic Tour de Force",
    vocalType: "Dual Vocal: Ethereal female & smooth male vocals",
    styleTags: "Epic cinematic jazz-classical fusion medley, moving through Baroque functional tonality, jazz ii-V-I, Bartók axis, neo-Riemannian triads, atonal pitch-class sets, spectral psychoacoustic harmony. Harpsichord, jazz trio, string quartet, prepared piano, evolving drones, ethereal female and smooth male vocals, 100 BPM, dynamic, instrumental breaks.",
    lyrics: `[Intro: spoken, soft piano]
From tonic to axis, from set to spectral light...

[Verse 1: Baroque, harpsichord, female vocal]
Tonic and dominant, pillars of the key,
Roman numerals marching, ordered and free.
I-IV-V-I, the ancient path we know,
Tension into resolution, let the tonic glow.

[Chorus: full band, both vocals]
Harmonic study engine, paint the chords in light,
Synesthesia matrix burning through the night.
From ii-V-I to tritone poles,
Every resolution takes its toll.

[Verse 2: Jazz, trio, male vocal]
ii-V-I, the cadence of the night,
Drop-2 voicings, everything's alright.
Extensions bloom, the tensions sigh,
A jazz resolve beneath the sky.

[Chorus]

[Verse 3: Bartók, string quartet, female vocal]
Tonic and counterpole, a tritone twin,
No dominant to pull me in.
C and F-sharp, they interchange,
A symmetrical world, beautiful and strange.

[Chorus]

[Verse 4: Neo-Riemannian, ambient pads, female vocal]
P, L, R, a single voice moves,
One note changes, the triad improves.
Tonnetz pathways, a triadic map,
Every transformation a gentle lap.

[Chorus]

[Verse 5: Atonal, prepared piano, male spoken-sung]
Pitch-class zero, C for convenience,
No tonal center, no tonal sequence.
Interval vectors, a census of sound,
Prime form reductions, where structure is found.

[Chorus]

[Verse 6: Spectral, drones, female haunting]
Fourier analysis, the overtones sing,
Partials unfolding on a spectral wing.
Roughness and tension, a psychoacoustic curve,
Harmonicity and dissonance, the ear's reserve.

[Outro: fading, both vocals]
From functional to fractal, the harmonics gleam,
We are living in a harmonic dream.`,
    description: "A monumental single-song journey traveling through all six harmonic frameworks in sequence: Baroque functional tonality, jazz ii-V-I cadences, Bartók's tritone axis, Neo-Riemannian voice leading, atonal pitch-class sets, and French spectral overtones.",
    characterCount: 338,
    lyricsCharacterCount: 1515,
    bpm: 100,
    tags: ["Medley", "Epic Fusion", "Jazz-Classical", "Dual Vocals", "All 6 Traditions", "100 BPM"]
  }
];

export const SUNO_COMBINED_MEDLEY_PROMPT = SUNO_VOCAL_HARMONIC_PROMPTS[6];

// Alias for backward compatibility
export const SUNO_READY_HARMONIC_PROMPTS = SUNO_VOCAL_HARMONIC_PROMPTS;
export type SunoReadyPrompt = SunoVocalPrompt;
