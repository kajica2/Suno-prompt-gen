export interface DebussyPrompt {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  ensemble: string;
  rawStyleText: string;
  filterSafeStyleText: string;
  lyricsStructure: string;
  description: string;
  isVocalise?: boolean;
  tags: string[];
}

export const DEBUSSY_FILTER_REPLACEMENT = "French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato";

export const DEBUSSY_PROMPTS: DebussyPrompt[] = [
  {
    id: "debussy-01-felt-piano-nocturne",
    number: 1,
    title: "Felt Piano Nocturne",
    subtitle: "Solo felt piano with intimate room resonance & pedal mechanics",
    ensemble: "Solo Felt Piano",
    rawStyleText:
      "Instrumental. French Impressionist solo piano, Debussy-esque. Felt piano, close-mic'd, soft pedal, half-pedal, sustain pedal noise, cascading arpeggios, whole-tone scales, parallel chords, unresolved 9ths, rubato, human timing drift, unquantized, chair creak, room tone. No drums, no synth, no beat, no autotune.",
    filterSafeStyleText:
      "Instrumental. French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Felt piano, close-mic'd, soft pedal, half-pedal, sustain pedal noise, cascading arpeggios, unresolved 9ths, human timing drift, unquantized, chair creak, room tone. No drums, no synth, no beat, no autotune.",
    lyricsStructure: `[Instrumental]

[Intro: felt piano, close-mic'd, soft pedal, sustain pedal noise, quiet room tone]

[Theme: cascading whole-tone arpeggios, parallel chords, unresolved 9ths, rubato timing]

[Bridge: modal drift into half-pedal resonance, chair creak, unquantized human timing drift]

[Outro: final unresolved chord lingering in room tone, pedal release, silence]`,
    description:
      "French Impressionist solo piano featuring close-mic'd felt piano, soft pedal, cascading whole-tone scales, unresolved 9ths, and authentic human room noise.",
    isVocalise: false,
    tags: ["Felt Piano", "Solo Piano", "Whole-Tone", "Rubato", "Nocturne", "Unquantized", "Room Tone"]
  },
  {
    id: "debussy-02-flute-harp-watercolor",
    number: 2,
    title: "Flute & Harp Watercolor",
    subtitle: "Aquatic, shimmering chamber with breathy woodwinds & tape warmth",
    ensemble: "Chamber: Flute, Harp & Muted Strings",
    rawStyleText:
      "Instrumental. French Impressionist chamber, Debussy-esque. Solo flute, harp, muted strings, string harmonics. Aquatic, hazy, shimmering, modal drift, whole-tone. Breathy flute, audible breaths, page turns, natural room reverb, tape saturation, human timing. No percussion, no drums, no beat, no synth.",
    filterSafeStyleText:
      "Instrumental. French Impressionist chamber, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Solo flute, harp, muted strings, string harmonics. Aquatic, hazy, shimmering, modal drift. Breathy flute, audible breaths, page turns, natural room reverb, tape saturation, human timing. No percussion, no drums, no beat, no synth.",
    lyricsStructure: `[Instrumental]

[Intro: solo flute, breathy, audible breaths, natural room reverb]

[Theme: harp glissandi and muted strings, aquatic, hazy, shimmering modal drift]

[Bridge: whole-tone string harmonics, gentle page turn, tape saturation warmth]

[Outro: flute lingering note over dissolving harp resonance into silence]`,
    description:
      "Aquatic, hazy chamber ensemble featuring breathy solo flute, harp glissandi, and muted strings drifting through whole-tone modal ambiguity.",
    isVocalise: false,
    tags: ["Flute", "Harp", "Muted Strings", "Harmonics", "Aquatic", "Tape Saturation"]
  },
  {
    id: "debussy-03-muted-string-quartet",
    number: 3,
    title: "Muted String Quartet Impression",
    subtitle: "Intimate chamber strings with bow friction, divisi & modal ambiguity",
    ensemble: "Muted String Quartet",
    rawStyleText:
      "Instrumental. French Impressionist string quartet, Debussy-esque. Muted violins, viola, cello, divisi, harmonics, parallel chords, modal ambiguity, rubato. Close-mic'd, natural room, chair creak, bow noise, finger noise, unquantized. No drums, no beat, no synth, no electric instruments.",
    filterSafeStyleText:
      "Instrumental. French Impressionist string quartet, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Muted violins, viola, cello, divisi, harmonics, modal ambiguity. Close-mic'd, natural room, chair creak, bow noise, finger noise, unquantized. No drums, no beat, no synth, no electric instruments.",
    lyricsStructure: `[Instrumental]

[Intro: muted violins with sordino, gentle bow noise, close-mic'd room tone]

[Theme: divisi chords, parallel fifths and octaves, modal ambiguity, rubato breathing]

[Bridge: cello harmonics, viola counter-melody, subtle chair creak and fingerboard noise]

[Outro: four muted strings fading into a soft unmeasured chord, air decay]`,
    description:
      "Close-mic'd French Impressionist string quartet with mutes (con sordino), bow friction, divisi harmonics, and unquantized rubato timing.",
    isVocalise: false,
    tags: ["String Quartet", "Muted Strings", "Divisi", "Harmonics", "Bow Noise", "Rubato"]
  },
  {
    id: "debussy-04-clarinet-piano-arabesque",
    number: 4,
    title: "Clarinet & Piano Arabesque",
    subtitle: "Expressive woody woodwinds dancing over cascading felt piano arpeggios",
    ensemble: "Clarinet & Felt Piano",
    rawStyleText:
      "Instrumental. French Impressionist clarinet and piano, Debussy-esque. Clarinet, felt piano. Whole-tone, parallel chords, cascading arpeggios, rubato, breathy clarinet, key clicks, pedal clunks, close-mic, room tone, human timing. No drums, no beat, no synth, no autotune.",
    filterSafeStyleText:
      "Instrumental. French Impressionist clarinet and piano, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Clarinet, felt piano. Whole-tone, cascading arpeggios, breathy clarinet, key clicks, pedal clunks, close-mic, room tone, human timing. No drums, no beat, no synth, no autotune.",
    lyricsStructure: `[Instrumental]

[Intro: felt piano cascading arpeggios, pedal clunks, natural room tone]

[Theme: breathy clarinet enters with expressive arabesque line, audible key clicks]

[Bridge: whole-tone dialogue between clarinet and piano, unquantized rubato drift]

[Outro: clarinet ascending flutter fading over lingering low piano bass note]`,
    description:
      "Delicate Impressionist duet between breathy clarinet and felt piano, full of audible mechanical key clicks, pedal clunks, and cascading whole-tone runs.",
    isVocalise: false,
    tags: ["Clarinet", "Felt Piano", "Arabesque", "Key Clicks", "Pedal Clunks", "Whole-Tone"]
  },
  {
    id: "debussy-05-cello-piano-elegy",
    number: 5,
    title: "Cello & Piano Elegy",
    subtitle: "Soulful, modal cello with finger squeaks & resonant piano half-pedal",
    ensemble: "Cello & Felt Piano",
    rawStyleText:
      "Instrumental. French Impressionist cello and piano, Debussy-esque. Cello, felt piano. Modal, unresolved, sparse, rubato. Close-mic'd, bow noise, finger squeaks, pedal noise, audible breaths, natural room reverb, unquantized. No drums, no beat, no synth, no heavy bass.",
    filterSafeStyleText:
      "Instrumental. French Impressionist cello and piano, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Cello, felt piano. Modal, unresolved, sparse. Close-mic'd, bow noise, finger squeaks, pedal noise, audible breaths, natural room reverb, unquantized. No drums, no beat, no synth, no heavy bass.",
    lyricsStructure: `[Instrumental]

[Intro: felt piano sparse chords, pedal noise, audible breath before cello entrance]

[Theme: deep soulful cello, modal, unresolved, bow friction and finger squeaks on fingerboard]

[Bridge: delicate cello upper-register harmonics over cascading impressionist piano arpeggios]

[Outro: cello sustained low tone drifting into silent room reverb]`,
    description:
      "Sparse, unresolved Impressionist dialogue between warm acoustic cello and felt piano, capturing organic finger squeaks, bow friction, and natural breathing.",
    isVocalise: false,
    tags: ["Cello", "Felt Piano", "Elegy", "Finger Squeaks", "Bow Noise", "Sparse"]
  },
  {
    id: "debussy-06-wordless-melodie",
    number: 6,
    title: "Wordless Mélodie",
    subtitle: "Intimate mezzo-soprano vocalise without lyrics over soft impressionist piano",
    ensemble: "Mezzo-Soprano Vocalise & Felt Piano",
    rawStyleText:
      "Instrumental. French Impressionist art song, Debussy-esque. Wordless mezzo-soprano vocalise, felt piano. Breathy, intimate, no words, natural pitch imperfections, audible breaths, mouth noise, rubato, close-mic, room tone. No autotune, no drums, no beat, no synth.",
    filterSafeStyleText:
      "Instrumental. French Impressionist art song, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Wordless mezzo-soprano vocalise, felt piano. Breathy, intimate, no words, natural pitch imperfections, audible breaths, mouth noise, close-mic, room tone. No autotune, no drums, no beat, no synth.",
    lyricsStructure: `[Vocalise]

[Intro: felt piano rubato chords, close-mic, audible pedal noise]

[Theme: intimate wordless mezzo-soprano vocalise, breathy and close to the microphone, no words]
(Ahhhhh... ooooh-aaaah... mmm-aaaah...)

[Bridge: modal parallel ninths, voice floating over soft whole-tone piano ripples, audible breath]
(Aaaaah... ee-oooh... aaaaah...)

[Outro: quiet whispered vocalise dissolving into piano pedal resonance, final breath]
(Ahhh...)`,
    description:
      "Intimate French art song featuring a breathy, wordless mezzo-soprano vocalise with organic mouth noises, audible breaths, and zero autotune.",
    isVocalise: true,
    tags: ["Vocalise", "Wordless Mezzo-Soprano", "Art Song", "No Words", "Breathy", "No Autotune"]
  },
  {
    id: "debussy-07-harp-solo-reflection",
    number: 7,
    title: "Harp Solo Reflection",
    subtitle: "Fluid cascading glissandi, bell-like harmonics & mechanical pedal nuances",
    ensemble: "Solo Concert Harp",
    rawStyleText:
      "Instrumental. French Impressionist solo harp, Debussy-esque. Harp glissandi, harmonics, whole-tone, modal, fluid. Close-mic'd, pedal noise, finger noise, string squeaks, room tone, human timing, unquantized. No drums, no beat, no synth, no percussion.",
    filterSafeStyleText:
      "Instrumental. French Impressionist solo harp, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Harp glissandi, harmonics, modal, fluid. Close-mic'd, pedal noise, finger noise, string squeaks, room tone, human timing, unquantized. No drums, no beat, no synth, no percussion.",
    lyricsStructure: `[Instrumental]

[Intro: solo harp, quiet string harmonics, close-mic'd finger noise and room tone]

[Theme: fluid cascading whole-tone glissandi, modal shifts, pedal mechanism noise]

[Bridge: delicate bell-like harmonics, rubato pacing, human timing drift]

[Outro: gentle final glissando resolving onto an open fifth, string ring decaying naturally]`,
    description:
      "Mesmerizing solo concert harp with cascading glissandi, crystalline harmonics, string squeaks, and subtle mechanical pedal movements.",
    isVocalise: false,
    tags: ["Solo Harp", "Glissandi", "Harmonics", "Whole-Tone", "String Squeaks", "Fluid"]
  },
  {
    id: "debussy-08-oboe-strings-pastorale",
    number: 8,
    title: "Oboe & Strings Pastorale",
    subtitle: "Hazy pastoral woodwind soaring over warm muted chamber strings",
    ensemble: "Oboe & Muted Strings",
    rawStyleText:
      "Instrumental. French Impressionist oboe and muted strings, Debussy-esque. Oboe, violins, viola, cello, no percussion. Hazy, pastoral, modal, parallel chords, rubato. Breathy oboe, page turns, chair creak, natural room reverb, tape saturation. No drums, no beat, no synth.",
    filterSafeStyleText:
      "Instrumental. French Impressionist oboe and muted strings, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Oboe, violins, viola, cello, no percussion. Hazy, pastoral, modal. Breathy oboe, page turns, chair creak, natural room reverb, tape saturation. No drums, no beat, no synth.",
    lyricsStructure: `[Instrumental]

[Intro: muted string quartet drone, quiet room tone, faint chair creak]

[Theme: breathy oboe enters with pastoral melody, modal inflections, tape saturation]

[Bridge: parallel chords swell in muted strings, page turn sound, rubato tempo ebb and flow]

[Outro: oboe holding long pastoral note as strings gently evaporate into room reverb]`,
    description:
      "A hazy, sunlit pastoral landscape featuring breathy lyrical oboe weaving through lush, muted impressionist string textures.",
    isVocalise: false,
    tags: ["Oboe", "Muted Strings", "Pastorale", "Hazy", "Tape Saturation", "Page Turns"]
  },
  {
    id: "debussy-09-piano-four-hands-daydream",
    number: 9,
    title: "Piano Four Hands Daydream",
    subtitle: "Two performers weaving interlocking arpeggios, bench creaks & shared pedals",
    ensemble: "Piano Four Hands (Duo)",
    rawStyleText:
      "Instrumental. French Impressionist piano four hands, Debussy-esque. Two pianos or four hands, felt piano, interlocking arpeggios, whole-tone, parallel chords, rubato. Close-mic'd, pedal noise, bench creak, human timing drift, unquantized, room tone. No drums, no beat, no synth, no autotune.",
    filterSafeStyleText:
      "Instrumental. French Impressionist piano four hands, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Two pianos or four hands, felt piano, interlocking arpeggios, whole-tone. Close-mic'd, pedal noise, bench creak, human timing drift, unquantized, room tone. No drums, no beat, no synth, no autotune.",
    lyricsStructure: `[Instrumental]

[Intro: felt piano four hands, primo and secondo parts, bench creak, pedal noise]

[Theme: interlocking cascading arpeggios, dense impressionist ninth chords, rubato pulse]

[Bridge: conversational counterpoint across high and low registers, unquantized human rubato]

[Outro: gentle descending four-hand cadence, shared pedal sustain fading into room air]`,
    description:
      "Intimate four-hand piano work capturing two performers on one felt piano with interlocking whole-tone arpeggios, audible bench creaks, and shared pedals.",
    isVocalise: false,
    tags: ["Four Hands", "Piano Duo", "Interlocking Arpeggios", "Bench Creak", "Felt Piano"]
  },
  {
    id: "debussy-10-chamber-open-window",
    number: 10,
    title: "Chamber with Open Window",
    subtitle: "Atmospheric quartet with distant bird chirps, breeze & natural room ambiance",
    ensemble: "Chamber: Felt Piano, Flute, Cello & Harp",
    rawStyleText:
      "Instrumental. French Impressionist small chamber, Debussy-esque. Felt piano, flute, cello, harp. Hazy, aquatic, modal, unresolved. Natural room tone, distant birds, open window, chair creak, page turns, audible breaths, close-mic, tape saturation, unquantized. No drums, no beat, no synth, no percussion.",
    filterSafeStyleText:
      "Instrumental. French Impressionist small chamber, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato. Felt piano, flute, cello, harp. Hazy, aquatic, modal, unresolved. Natural room tone, distant birds, open window, chair creak, page turns, audible breaths, close-mic, tape saturation, unquantized. No drums, no beat, no synth, no percussion.",
    lyricsStructure: `[Instrumental]

[Intro: natural room tone with distant birds through open window, solitary felt piano note]

[Theme: flute and cello trade hazy modal phrases over gentle harp arpeggios, unquantized]

[Bridge: full acoustic chamber swell, page turn and chair creak, warm tape saturation]

[Outro: unresolved modal chord held to silence, leaving only the open window room tone]`,
    description:
      "A cinematic, sensory chamber setting combining felt piano, flute, cello, and harp with open-window room ambiance, distant birds, and acoustic intimacy.",
    isVocalise: false,
    tags: ["Open Window", "Ambient Birds", "Chamber Quartet", "Flute", "Cello", "Harp", "Sensory"]
  }
];
