import { Preset } from "./types";
import { DEBUSSY_PROMPTS } from "./data/debussyPrompts";
import { RAGA_PROMPTS } from "./data/ragaPrompts";
import { TRUMPET_PROMPTS } from "./data/trumpetPrompts";
import { BUSKING_PROMPTS } from "./data/buskingPrompts";
import { BAMBAM_PROMPTS } from "./data/bambamPrompts";

export const BAMBAM_PRESETS: Preset[] = BAMBAM_PROMPTS.map((p) => ({
  id: `bambam-${p.id}`,
  name: `Bam Bam Jamm #${p.number}: ${p.title}`,
  description: `${p.focus} (${p.bpm} BPM · Healing Jamm)`,
  config: {
    subtheme: `Bam Bam Kolektiv (${p.title})`,
    genre: p.genreFusion,
    mood: "Ritual Tribal Sub-Bass & Acoustic Trumpet",
    tempo: `${p.bpm} BPM, ${p.meter} Human Pocket`,
    vocalType: "Instrumental (No Vocals, [Instrumental])",
    instruments: `acoustic trumpet, ${p.styleTags}`,
    structure: p.tags.join(" "),
    enableRoomTone: true,
    roomTone: "natural room ambience",
    negativePrompt: "no saxophone, no vocals, no guitar, no pop, no EDM drop",
    appendExclusionsToStyle: true
  },
  sampleResult: {
    title: `${p.number}. ${p.title} (Bam Bam Kolektiv)`,
    styleTags: p.styleTags,
    promptDescription: p.promptText,
    lyrics: p.tags.join(" ") + `\n\n[Instrumental]\n[Trumpet Lead: ${p.trumpetRole}]\n[Exclusions: no vocals, no pop, no EDM drop, no autotune, no quantized]`,
    negativePrompt: "no saxophone, no vocals, no guitar, no pop, no EDM drop",
    tips: [
      "Audio Influence: 70–85% with live drum reference loop.",
      `Acoustic trumpet role: ${p.trumpetRole}`,
      "Negative prompt: no saxophone, no vocals, no guitar, no pop, no EDM drop, no quantized, no autotune."
    ]
  }
}));

export const BUSKING_PRESETS: Preset[] = BUSKING_PROMPTS.map((p) => ({
  id: `busking-${p.id}`,
  name: `Busking Track #${p.number}: ${p.title}`,
  description: `${p.focus} • 105 BPM (Audio Influence 81%)`,
  config: {
    subtheme: `Jazz Fusion Busking (${p.title})`,
    genre: "Instrumental Jazz Fusion Backing Track",
    mood: "Syncopated, Blues-Influenced Pocket (105 BPM)",
    tempo: "105 BPM, 4/4 Steady Human Pocket",
    vocalType: "Instrumental (No Vocals, [Instrumental])",
    instruments: "percussive drums with brushes, deep electric bass, slap accents, hi-hat ghost notes",
    structure: p.tags.join(" "),
    enableRoomTone: true,
    roomTone: "intimate jazz club noise",
    negativePrompt: "no saxophone, no vocals, no guitar, no spoken word",
    appendExclusionsToStyle: true
  },
  sampleResult: {
    title: `${p.number}. ${p.title} (105 BPM)`,
    styleTags: p.styleTags,
    promptDescription: p.promptText,
    lyrics: p.tags.join(" ") + "\n\n[Instrumental]\n[No saxophone, no vocals, no guitar, no spoken word]\n[Leaves dynamic acoustic space for live trumpet or horn soloing]",
    negativePrompt: "no saxophone, no vocals, no guitar, no spoken word",
    tips: [
      "Audio Influence: Set to 81% in Suno when uploading your reference audio loop.",
      "Room Tone: Natural ambient room acoustics combat AI artificial sheen.",
      "Negative prompt: no saxophone, no soprano saxophone, no vocals, no voice, no guitar, no spoken word."
    ]
  }
}));

export const TRUMPET_PRESETS: Preset[] = TRUMPET_PROMPTS.map((p) => ({
  id: p.id,
  name: `Trumpet Fusion: ${p.title}`,
  description: `${p.subtitle} (Liquid DnB • Microhouse • Raga)`,
  config: {
    subtheme: `${p.title} (Acoustic Jazz Trumpet Fusion)`,
    genre: "Liquid Drum and Bass, Ambient Microhouse, Jazz Trumpet",
    mood: `${p.acousticCharacter}, Contemplative Float, Unquantized`,
    tempo: p.category === "Rhythmic & High-Energy" ? "Rolling Breakbeat (174 BPM)" : "Liquid Breakbeat Pulse (174 BPM / Rubato)",
    vocalType: "Intimate rhythmic voice, restrained doubles, raga noon inflections",
    instruments: `acoustic jazz trumpet (${p.tags[0]}), hand-played tabla, deep sub, microhouse clicks, submerged dub delay`,
    structure: p.lyricsStructure
  },
  sampleResult: {
    title: p.title,
    styleTags: p.filterSafeStyleText.length <= 115 ? p.filterSafeStyleText : p.filterSafeStyleText.slice(0, 112).trim() + "...",
    promptDescription: p.filterSafeStyleText,
    lyrics: p.lyricsStructure,
    tips: [
      "Paste into Suno's Style box. Use filter-safe acoustic tags to prevent generic brass pads.",
      "Paste bracketed tags into Suno's Lyrics box to direct trumpet solos and drops without verbal lyrics.",
      "Add 'no autotune, no pop synth, no EDM drop, no quantized' to keep the organic pulse.",
      "If Suno filters 'jazz trumpet', use: 'acoustic trumpet, Harmon mute, smoky, blue notes, breathy, behind the beat'."
    ]
  }
}));

export const RAGA_PRESETS: Preset[] = RAGA_PROMPTS.map((p) => ({
  id: p.id,
  name: `Raga: ${p.title}`,
  description: `${p.ragaName} • ${p.ensemble} (${p.timeOfDay})`,
  config: {
    subtheme: `${p.title} (Indian Classical)`,
    genre: `${p.tradition} Classical (${p.ensemble})`,
    mood: `${p.mood}, Microtonal Meend, Unplugged`,
    tempo: "Slow Alaap into Steady Gat (Unquantized Human Timing)",
    vocalType: p.isVocalise ? "Wordless Classical Vocalise" : "Instrumental (No Vocals)",
    instruments: p.tags.join(", "),
    structure: p.isVocalise ? "Khayal / Thumri Flow" : "Raga Arch ([Alaap] - [Jor] - [Gat] - [Jhala])"
  },
  sampleResult: {
    title: `${p.title}`,
    styleTags: p.filterSafeStyleText.length <= 115 ? p.filterSafeStyleText : p.filterSafeStyleText.slice(0, 112).trim() + "...",
    promptDescription: p.rawStyleText,
    lyrics: p.lyricsStructure,
    tips: [
      "Paste into Suno's Style box. If 'raga' is filtered, use: 'Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative'.",
      "Always specify 'tabla only, no drum kit' to suppress Western snare/drum kits.",
      p.isVocalise ? "Use '[Vocalise]' in the Lyrics box for wordless singing." : "Keep '[Instrumental]' at the top of the Lyrics box.",
      "Acoustic realism: 'string noise, finger noise, skin noise, room tone, unquantized' produces natural chamber depth."
    ]
  }
}));

export const DEBUSSY_PRESETS: Preset[] = DEBUSSY_PROMPTS.map((p) => ({
  id: p.id,
  name: `Debussy: ${p.title}`,
  description: `${p.subtitle} (${p.ensemble})`,
  config: {
    subtheme: `Impressionist ${p.title} (Debussy Sound)`,
    genre: p.ensemble,
    mood: "French Impressionist, Whole-Tone, Rubato, Unplugged",
    tempo: "Rubato (Unquantized Human Timing Drift)",
    vocalType: p.isVocalise ? "Wordless Mezzo-Soprano Vocalise" : "Instrumental (No Vocals)",
    instruments: p.tags.join(", "),
    structure: p.isVocalise ? "Vocalise Flow" : "Impressionist Arch ([Intro] - [Theme] - [Bridge] - [Outro])"
  },
  sampleResult: {
    title: `${p.title} (Impressionist)`,
    styleTags: p.filterSafeStyleText.length <= 115 ? p.filterSafeStyleText : p.filterSafeStyleText.slice(0, 112).trim() + "...",
    promptDescription: p.rawStyleText,
    lyrics: p.lyricsStructure,
    tips: [
      "Paste into Suno's Style box. If 'Debussy' is filtered, use: 'French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato'.",
      p.isVocalise ? "For wordless vocals, use '[Vocalise]' in the Lyrics box." : "Put '[Instrumental]' at the top of the Lyrics box.",
      "Keywords like 'room tone', 'pedal noise', 'unquantized', and 'breathy' create lifelike unplugged acoustic presence."
    ]
  }
}));

export const BASE_PRESETS: Preset[] = [
  {
    id: "liquid-dnb-serbian-raga",
    name: "Sijaj u Miru — Liquid DnB & Microhouse",
    description: "Liquid drum & bass ambient microhouse featuring hand-played tabla over deep sub, microhouse clicks, submerged dub delays, and intimate rhythmic Serbian vocals with raga noon inflections.",
    config: {
      subtheme: "Shine in Peace (Sijaj u miru - Liquid DnB Meditation)",
      genre: "Liquid Drum and Bass Ambient Microhouse",
      mood: "Weightless Pulse, Meditative & Hypnotic",
      tempo: "Weightless Rolling Breakbeat (174 BPM)",
      vocalType: "Intimate rhythmic Serbian vocal, restrained doubles, raga noon inflections",
      instruments: "hand-played tabla, deep sub bass, microhouse clicks, sparse ambient synths, submerged dub delay",
      structure: "Atmospheric Liquid DnB (Intro-AtmosphericSwell-Verse-Chorus-Drop-Verse-Chorus-Bridge-Outro)",
      enableRoomTone: true,
      roomTone: "natural room ambience",
      negativePrompt: "no saxophone, no autotune, no EDM drop, no pop synth",
      appendExclusionsToStyle: true
    },
    sampleResult: {
      title: "Sijaj u Miru (Shine in Peace)",
      styleTags: "liquid dnb, microhouse clicks, tabla, deep sub, serbian vocal, raga inflections, dub delay, 174bpm, no sax",
      promptDescription: "Liquid drum and bass meets ambient microhouse. Hand-played tabla over deep sub, rolling break, dub delay tails, and intimate rhythmic Serbian vocals with raga noon inflections.",
      negativePrompt: "no saxophone, no autotune, no EDM drop, no pop synth",
      lyrics: `[Intro]
[hand-played tabla rhythms over deep sub, delicate microhouse clicks, sparse ambient synth pads]
[minimal immersive space, submerged dub delay tails]

[Atmospheric Swell]
[submerged dub delay, echoing vocal tails, wide low-end, weightless rolling liquid breakbeat enters at 174 bpm]

[Verse 1]
[intimate rhythmic Serbian vocal, dry and close, raga noon melodic inflections]
Tišina diše u dubini bas-a
(Silence breathes in the depth of the bass)
Iza svakog nemira, mirna je staza
(Behind every unrest, lies a peaceful path)
Svetlost se preliva kroz zlatan zrak
(Light spills through the golden ray)
Pronađi svoj centar, rastopi mrak
(Find your center, dissolve the dark)

[Restrained Doubles]
[tight whispered Serbian vocal double]
Zastani na tren... udahni dah...
(Pause for a moment... take a breath...)
Oseti mir... nestaje strah...
(Feel the peace... fear disappears...)

[Chorus]
[high-energy pulse with weightless rolling break, deep sub bass glide, tabla accents]
Sijaj u miru, neka sija duša
(Shine in peace, let the soul shine)
Dok svet u daljini vetrove sluša
(While the world in the distance listens to winds)
Sijaj u miru, kroz talase svetla
(Shine in peace, through waves of light)
Nema više nemira, noć se rasplela
(No more unrest, the night has unraveled)

[Instrumental Drop]
[liquid rolling breakbeat, intricate tabla improvisation, microhouse percussion clicks, submerged dub delays echoing in wide space]

[Verse 2]
[rhythmic Serbian vocal with raga noon microtonal ornaments, restrained vocal doubles]
Korak po korak, reka nas nosi
(Step by step, the river carries us)
Zlatna rosa u tvojoj kosi
(Golden dew in your hair)
Svaka kapljica odjekuje u tami
(Every droplet echoes in the dark)
Nikada nismo na ovom putu sami
(We are never alone on this path)

[Restrained Doubles]
[whispered echoes behind rolling drums]
Samo plovi... samo teci...
(Just float... just flow...)

[Chorus]
[high-energy pulse with weightless rolling break, deep sub bass glide, soaring resonance]
Sijaj u miru, neka sija duša
(Shine in peace, let the soul shine)
Dok svet u daljini vetrove sluša
(While the world in the distance listens to winds)
Sijaj u miru, kroz talase svetla
(Shine in peace, through waves of light)
Nema više nemira, noć se rasplela
(No more unrest, the night has unraveled)

[Bridge]
[break drops to half-time, sub bass and resonant tabla, raga vocal improvisation with tape delay]
Aaaa-aaah... sijaj u miru...
(Shine in peace...)
Mir u kapi... mir u srcu... mir u dahu...
(Peace in a drop... peace in the heart... peace in the breath...)
(Ooooh, sijaj...)

[Outro]
[breakbeat gradually strips back to bare essentials, leaving tabla Dayan and Bayan nuances]
[delicate microhouse clicks, warm sub pulse, echoing vocal tails drifting into silence]
Sijaj u miru...
(Shine in peace...)
Sijaj...
(Shine...)
[Fade Out]`,
      tips: [
        "In Suno, prompting for Serbian lyrics with bracketed English parentheticals guides vocal timing without confusing pronunciation.",
        "Pairing 'liquid dnb' with 'tabla' in the style box yields organic syncopated world percussion woven seamlessly inside 174 BPM liquid breaks.",
        "Use 'submerged dub delay, raga inflections' to prompt modal microtonal vocal nuances and vast cavernous space on the vocal tails."
      ]
    }
  },
  {
    id: "ethereal-ambient",
    name: "Ethereal Ambient Sanctuary",
    description: "A deeply meditative, glowing atmospheric arrangement with slow pads and whispering celestial vocals.",
    config: {
      subtheme: "Shine in Peace (Glow of Sanctuary)",
      genre: "Ethereal Ambient",
      mood: "Meditative",
      tempo: "Slow & Fluid (60 BPM)",
      vocalType: "Soft Whispering Female Lead",
      instruments: "celestial synthesizer pads, crystal chimes, distant flute, reverb",
      structure: "Atmospheric (Intro-Verse-Refrain-Ambient Solo-Outro)"
    },
    sampleResult: {
      title: "Glow of Sanctuary",
      styleTags: "ethereal ambient, slow spacey pads, crystal chimes, soft whispering female vocals, meditative, 60bpm",
      promptDescription: "A deeply atmospheric, meditative ambient track with slow glowing synthesizer pads, sparkling crystal chimes, and soft whispering female vocals wrapped in lush reverb.",
      lyrics: `[Intro]
[soft ambient pads swelling, crystal chimes sparkling in deep space]

[Verse 1]
The storm is gone, the wind is still
A quiet light upon the hill
No more weight, no more tears
A soft glow washing through the years

[Refrain]
Shine in peace, sweet gentle flame
The night has forgotten your old name
Be at rest, be at home
You are no longer bound to roam

[Ambient Solo]
[reverb-drenched flute carrying a serene, fluid melody over a pulsing drone]

[Verse 2]
Every scar is a line of gold
A beautiful story waiting to be told
Step out from the heavy shade
Into the sanctuary you have made

[Refrain]
Shine in peace, sweet gentle flame
The night has forgotten your old name
Be at rest, be at home
You are no longer bound to roam

[Outro]
[synthesizer pads slowly fading, chimes twinkling, whispering vocal hums]
[Fade Out]`,
      tips: [
        "In Suno, ambient pads sometimes trigger longer instrumental sections; if you want more vocals, use short verses.",
        "Add style tags like 'reverb' and 'spacey' to get that spacious, cathedral-like atmosphere.",
        "To get whispering vocals, the bracket [soft whispering vocal] works wonders right before verses."
      ]
    }
  },
  {
    id: "raw-acoustic-folk",
    name: "Raw Acoustic Folk (Unplugged)",
    description: "Raw acoustic folk, intimate, unplugged. Deep weathered male baritone, husky, breathy, imperfect, close to the microphone. Fingerpicked woody guitar with fret noise, sparse upright bass, unquantized organic groove.",
    config: {
      subtheme: "Shine in Peace (Raw Porch Solitude)",
      genre: "Raw Acoustic Folk, Intimate, Unplugged",
      mood: "Slow, Loose, Organic Groove, Nothing Quantized",
      tempo: "Loose Unquantized Slow Groove (72 BPM)",
      vocalType: "Deep weathered male baritone, husky, breathy, imperfect, close to the microphone",
      instruments: "fingerpicked acoustic guitar recorded dry and woody with fret noise, sparse upright bass, natural room reverb",
      structure: "Raw Unplugged (Intro - Verse - Chorus - Instrumental - Verse - Chorus - Outro)"
    },
    sampleResult: {
      title: "Wood & Wire (Shine in Peace)",
      styleTags: "raw acoustic folk, intimate unplugged, weathered baritone, woody guitar, fret noise, upright bass, natural room reverb",
      promptDescription: "Raw acoustic folk, intimate, unplugged. Deep weathered male baritone, husky, breathy, imperfect, close to the microphone. Fingerpicked acoustic guitar, recorded dry and woody with fret noise. Sparse upright bass. Slow, loose, organic groove. Nothing quantized. Natural room reverb, subtle outdoor spaciousness.",
      lyrics: `[Intro: woody fingerpicked acoustic guitar, audible fret noise, natural room reverb, slow unquantized groove]

[Verse: whispered vocals, close-mic presence, audible breath before line, acoustic guitar only]
Old pine floorboards creak under the dawn
All the fighting and the hurry is gone
Dust motes drifting through the kitchen light
We made it through the longest night

[Chorus: deep weathered baritone, intimate harmonies, warm sparse upright bass enters]
Shine in peace, let the embers glow
Nowhere else we gotta go
Rest your bones beside the open fire
Nothing left for the world to require

[Instrumental: dry acoustic guitar fingerpicking, delicate fret squeak, gentle upright bass slides]

[Verse 2: whispered vocals, close-mic presence, audible breath, subtle outdoor spaciousness]
Creek running slow by the cedar tree
Finally quiet enough to be free
No heavy words, no promises to keep
Just a tired soul falling into sleep

[Chorus: deep weathered baritone, close-mic, subtle room reverb]
Shine in peace, let the embers glow
Nowhere else we gotta go
Rest your bones beside the open fire
Nothing left for the world to require

[Outro: fingerpicked guitar slows down, last breath before the final hum, natural room decay into silence]
Shine in peace...
Shine...
[Fade Out]`,
      tips: [
        "In Suno, using the bracket cue '[Verse: whispered vocals, close-mic presence, audible breath before line, acoustic guitar only]' forces the AI to drop all other instruments and place the vocal dry and intimate.",
        "Include sonic imperfection keywords like 'fret noise', 'woody', 'unquantized', and 'breathy' in your prompt description to avoid over-polished, synthetic AI production.",
        "Specifying 'sparse upright bass' and 'natural room reverb' creates authentic acoustic separation and vintage analog warmth."
      ]
    }
  },
  {
    id: "debussy-solo-piano",
    name: "French Impressionist Solo Piano (Debussy-esque)",
    description: "Delicate, atmospheric, rubato, whole-tone scales, parallel chords, unresolved harmonies, cascading arpeggios. Felt piano, close-mic'd, pedal noise, room tone, human timing imperfections, unquantized. No drums, no synths, no beat.",
    config: {
      subtheme: "French Impressionist (Clair de Paix - Solo Piano)",
      genre: "French Impressionist Solo Piano (Debussy-esque)",
      mood: "Delicate, Atmospheric, Rubato, Whole-Tone Scales",
      tempo: "Rubato, Unquantized, Human Timing Imperfections",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "felt piano, close-mic'd, pedal noise, room tone, unquantized, no drums, no synths, no beat",
      structure: "Impressionist Theme ([Intro: soft rubato] - [Theme] - [Interlude] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "Clair de Paix (French Impressionist Solo Piano)",
      styleTags: "french impressionist solo piano, rubato, whole-tone, parallel chords, felt piano, pedal noise, room tone, unquantized",
      promptDescription: "Instrumental. French Impressionist solo piano in the style of Debussy. Delicate, atmospheric, rubato, whole-tone scales, parallel chords, unresolved harmonies, cascading arpeggios. Felt piano, close-mic'd, pedal noise, room tone, human timing imperfections, unquantized. No drums, no synths, no beat. [Intro: soft rubato arpeggios] [Theme: hazy whole-tone melody] [Bridge: modal drift, half-pedal] [Outro: fading, unresolved]",
      lyrics: `[Instrumental]

[Intro: soft rubato arpeggios, close-mic'd felt piano, pedal noise and room tone]

[Theme: hazy whole-tone melody, parallel chords, unresolved harmonies]

[Interlude: cascading arpeggios, subtle rubato tempo fluctuations, no click track]

[Bridge: modal drift, half-pedal, human timing imperfections, quiet room resonance]

[Theme: return of delicate whole-tone melody, floating without a pulse]

[Outro: fading, unresolved harmony, gentle pedal release, room tone decay]
[Fade Out]`,
      tips: [
        "If 'Debussy' gets filtered by Suno's copyright safety filter, use: 'French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato'.",
        "Always place '[Instrumental]' at the top of the Lyrics box in Custom Mode to strictly prevent Suno from humming or singing unwanted vocalizations.",
        "Section tags matter: '[Verse]' doesn't fit Debussy—use '[Theme]', '[Bridge]', '[Outro]', and '[Interlude]' instead.",
        "Keep it sparse: Too many instruments trigger Suno to insert an unwanted drum beat. Start with solo felt piano.",
        "For authentic acoustic realism, push imperfection keywords: 'pedal noise', 'room tone', 'micro timing fluctuation', and 'no click track'."
      ]
    }
  },
  {
    id: "debussy-chamber-ensemble",
    name: "French Impressionist Chamber Music",
    description: "Debussy-esque chamber ensemble with flute, harp, muted strings, clarinet, no percussion. Shimmering, aquatic, modal, whole-tone, parallel chords. Rubato, natural room reverb, tape saturation, human timing, audible breaths, page turns, chair creak. No beat, no drums, no synth.",
    config: {
      subtheme: "French Impressionist (Nocturne Aquatique - Chamber Ensemble)",
      genre: "French Impressionist Chamber Music (Debussy-esque)",
      mood: "Shimmering, Aquatic, Modal, Whole-Tone, Parallel Chords",
      tempo: "Rubato, Natural Room Reverb, Human Timing, No Beat",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "flute, harp, muted strings, clarinet, natural room reverb, tape saturation, audible breaths, page turns, chair creak, no drums, no synth",
      structure: "Chamber Flow ([Intro: solo flute] - [Theme: harp & muted strings] - [Interlude] - [Bridge] - [Outro: unresolved])"
    },
    sampleResult: {
      title: "Nocturne Aquatique (Impressionist Chamber)",
      styleTags: "french impressionist chamber, flute, harp, muted strings, clarinet, whole-tone, rubato, natural room reverb, no beat",
      promptDescription: "Instrumental. French Impressionist chamber music, Debussy-esque. Flute, harp, muted strings, clarinet, no percussion. Shimmering, aquatic, modal, whole-tone, parallel chords. Rubato, natural room reverb, tape saturation, human timing, audible breaths, page turns, chair creak. No beat, no drums, no synth. [Intro: solo flute, breathy] [Theme: harp and muted strings, hazy] [Outro: unresolved, fading room tone]",
      lyrics: `[Instrumental]

[Intro: solo flute, breathy, gentle key clicks, close natural room tone]

[Theme: harp and muted strings, hazy whole-tone parallel chords, aquatic and shimmering]

[Interlude: expressive clarinet line, woodwind resonance, audible breath and page turn]

[Bridge: modal drift, rubato string swells, subtle chair creak, delicate tape saturation]

[Theme: flute and harp duet, floating melody, unquantized human timing]

[Outro: unresolved chord, fading room tone and quiet air decay]
[Fade Out]`,
      tips: [
        "If 'Debussy' gets filtered, substitute: 'French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato'.",
        "Use '[Instrumental]' at the top of the lyrics box to avoid vocal murmurs or synthetic backing.",
        "Avoid any percussion: Specify 'no percussion, no drums, no beat, no synth' to lock Suno strictly into acoustic orchestral textures.",
        "Include room ambiance tags like 'audible breaths, page turns, chair creak, natural room reverb' for live performance depth.",
        "Section tags like '[Theme: harp and muted strings, hazy]' and '[Intro: solo flute, breathy]' keep each instrument in its exact acoustic register."
      ]
    }
  },
  {
    id: "cinematic-orchestral",
    name: "Symphonic Peace Rising",
    description: "An epic, sweeping cinematic orchestral build starting with a delicate piano and rising to a triumphant brass climax.",
    config: {
      subtheme: "Shine in Peace (The Sovereign Dawn)",
      genre: "Cinematic Orchestral",
      mood: "Triumphant & Majestic",
      tempo: "Slow Build to Powerful (90 BPM)",
      vocalType: "Ethereal, Soaring Soprano",
      instruments: "piano, violin section, french horns, deep tympani, grand strings",
      structure: "Symphonic Build (Intro-Verse-Swell-Chorus-Climax-Outro)"
    },
    sampleResult: {
      title: "The Sovereign Dawn",
      styleTags: "cinematic orchestral, slow build, soaring soprano, majestic strings, piano, french horn, 90bpm",
      promptDescription: "A breathtaking cinematic masterpiece starting with a solitary piano, gradually swelling with lush strings and french horns to a triumphant soprano climax.",
      lyrics: `[Intro]
[soft, simple piano notes, slow and expressive, strings slowly fade in from the background]

[Verse 1]
Darkest valley, longest night
We have fought the silent fight
But the eastern sky is gray
Foretelling a majestic day

[Swell]
[strings grow louder and more intense, french horns enter with a noble melody]

[Chorus]
Shine in peace, the dawn is won!
Brighter than the morning sun
Stand upon the mountain tall
Let the fears of yesterday fall

[Climax]
[powerful tympani roll, brass section triumphant, soprano voice soaring to high notes]
Ooh, rise and shine!
The peace is yours, the peace is mine!

[Outro]
[climax subsides, leaving a solitary violin and a final warm piano chord]
Shine... in... peace.
[Fade Out]`,
      tips: [
        "Use [Swell] or [Crescendo] brackets to prompt Suno to increase energy and build orchestration.",
        "To get high soaring notes, write vocalizations like 'Ooh, rise!' or 'Ahhh' in their own lyric lines.",
        "Keep the lyrics slightly shorter so Suno has space to build the massive symphonic orchestra."
      ]
    }
  },
  {
    id: "soulful-gospel",
    name: "Gospel Jubilee Dawn",
    description: "A soul-stirring, uplifting gospel hymn filled with rich organ chords, warm handclaps, and a powerful choir backing.",
    config: {
      subtheme: "Shine in Peace (Joyous Deliverance)",
      genre: "Traditional Gospel",
      mood: "Uplifting & Spiritual",
      tempo: "Mid-Tempo Swing (95 BPM)",
      vocalType: "Powerful Soulful Lead with Choir Backing",
      instruments: "hammond B3 organ, upright piano, tambourine, warm bass",
      structure: "Gospel Hymn (Intro-Verse-Chorus-Verse-Chorus-CallAndResponse-Outro)"
    },
    sampleResult: {
      title: "Peace Like a River",
      styleTags: "gospel, hammond organ, soulful lead, choir backing, handclaps, uplifting, tambourine, 95bpm",
      promptDescription: "An uplifting, joyous traditional gospel track featuring a powerful soulful lead vocalist, backing choir harmonies, warm Hammond B3 organ, and handclaps.",
      lyrics: `[Intro]
[rich Hammond B3 organ chords swelling, soft handclaps setting a soulful swing]

[Verse 1]
There's a light that's shining deep inside
A sacred hope that cannot hide
Through the valley of the darkest shadow
I found the strength, I found the meadow

[Chorus]
Oh, shine in peace! Let the glory roll!
Sweet, sweet water to my weary soul
No more crying, no more strife
Shining in peace, shining in life!

[Verse 2]
Every burden now is lifted high
Like a bird into the summer sky
My feet are dancing on the solid ground
Hear that sweet, sweet joyous sound!

[Chorus]
Oh, shine in peace! Let the glory roll!
Sweet, sweet water to my weary soul
No more crying, no more strife
Shining in peace, shining in life!

[Call and Response]
[Lead] Shine in peace!
[Choir] (Shine in peace!)
[Lead] Deep in my soul!
[Choir] (Deep in my soul!)
[Lead] Oh, shine in peace!
[Choir] (He made me whole!)

[Outro]
[tambourine shakes, organ building to a joyful finish, choir holding a final beautiful chord]
Shining in peace... yes, shining in peace!
[Fade Out]`,
      tips: [
        "Call and Response is incredibly fun in Suno! Use parenthesis like (Shine in peace!) to prompt the backing vocals/choir.",
        "Specify 'Hammond B3 organ' to get that authentic, warm, spinning rotary vintage gospel feel.",
        "Handclaps are highly interactive and add instant organic rhythm when specified in style tags."
      ]
    }
  },
  {
    id: "bartok-symmetrical-axis",
    name: "Bartók Symmetrical Axis (Tritone Polar Shift)",
    description: "Symmetrical modern classical inspired by Béla Bartók and Ernő Lendvai's axis system. Explores tritone polar opposition (C to F#) without functional dominant resolution, felt piano, and unquantized room resonance.",
    config: {
      subtheme: "Shine in Peace (Symmetrical Axis Meditation)",
      genre: "Bartókian Modern Classical & Symmetrical Axes",
      mood: "Tritone Polar Opposition, Symmetrical Harmony, Restful Balance",
      tempo: "Rubato, Unquantized, Organic Breathing (68 BPM)",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "felt piano, close-mic'd, pedal noise, muted cello, celesta, no drums, no synth",
      structure: "Axis Flow ([Intro: C pole] - [Theme: F# counterpole] - [Interlude: whole-tone] - [Outro: axis resolution])"
    },
    sampleResult: {
      title: "Axis of Serenity (C – F♯ Pole)",
      styleTags: "bartok axis, tritone substitution, felt piano, pedal noise, muted cello, rubato, unquantized, no drums",
      promptDescription: "Instrumental. Bartókian modern classical exploring Lendvai's axis system. Felt piano and muted cello, shifting symmetrically between C tonic pole and F# tritone counterpole. Unquantized, pedal noise, natural room tone.",
      lyrics: `[Instrumental]
[Intro: felt piano rubato, gentle pedal noise, C major anchor pole]

[Theme: tritone modulation to F# pole, muted cello entry, unquantized natural timing]

[Interlude: cascading whole-tone runs, celesta harmonics, room tone presence]

[Bridge: axis counterpole balance, slow modal drift, audible breaths]

[Outro: quiet dissolution between C and F# poles, fading pedal resonance into silence]`,
      tips: [
        "Lendvai's axis system pairs C with F# a tritone away as interchangeable polar partners.",
        "Using '[Instrumental]' at the very top guarantees Suno won't add stray vocalizations.",
        "Emphasize 'no drums, no synth' to preserve pure acoustic space and natural timing fluctuations."
      ]
    }
  },
  {
    id: "neoriemannian-cinematic",
    name: "Neo-Riemannian Cinematic (P-L-R Triadic Drift)",
    description: "Cinematic late-Romantic triadic transformations based on David Lewin's P (Parallel), L (Leittonwechsel), and R (Relative) voice-leading operations. Smooth single-semitone voice leading over lush strings.",
    config: {
      subtheme: "Shine in Peace (Parsimonious Triadic Drift)",
      genre: "Late Romantic Cinematic & Neo-Riemannian Film Score",
      mood: "Parsimonious Triadic Transformations, P-L-R Voice Leading, Dreamy",
      tempo: "Slow & Floating (64 BPM)",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "chamber strings, french horns, warm harp, solitary piano, room tone",
      structure: "Tonnetz Progression ([Intro: C Maj] - [Theme: P/L shifts] - [Bridge: distant triads] - [Outro: pure resolution])"
    },
    sampleResult: {
      title: "Tonnetz of Peace",
      styleTags: "neo-riemannian, cinematic strings, french horn, harp, parsimonious harmony, late romantic, 64bpm",
      promptDescription: "Instrumental. Late Romantic cinematic film cue utilizing Neo-Riemannian triadic transformations (P, L, R). Smooth voice-leading parsimony with chamber strings, French horn, and delicate harp.",
      lyrics: `[Instrumental]
[Intro: solitary piano outlining pure C major triad, natural room decay]

[Theme: P-transformation to C minor (E drops to Eb), warm chamber strings enter]

[Interlude: L-transformation to E minor (C drops to B), solitary French horn melody]

[Bridge: R-transformation to G major and A minor, harp arpeggios glissando]

[Outro: parsimonious return to home triad, long string sustain, breathing room tone into quiet]`,
      tips: [
        "Neo-Riemannian operations move only one voice by a half-step while holding common tones steady.",
        "Generates the distinctive mystical harmonic wonder heard in modern fantasy and sci-fi film scores.",
        "Pair with slow tempos (60-70 BPM) to let each parsimonious transformation breathe."
      ]
    }
  },
  {
    id: "modal-jazz-ii-v-i",
    name: "Modal Jazz & II-V-I (Drop-2 & Altered Tensions)",
    description: "Rich modern jazz harmony focusing on the essential ii-V-I cadence with Drop-2 smooth voice-leading, altered dominant tensions (b9, #11, b13), and semi-hollow guitar over brushed drums.",
    config: {
      subtheme: "Shine in Peace (II-V-I Warm Resolution)",
      genre: "Modal Jazz & Warm Soul Harmony",
      mood: "Rich Alterations, Drop-2 Voice Leading, Peaceful Cadence",
      tempo: "Laid-back Swing (84 BPM)",
      vocalType: "Warm intimate jazz vocalist, subtle breath and restrained doubles",
      instruments: "semi-hollow jazz guitar, upright bass, brushed snare, warm Rhodes chords",
      structure: "Jazz Standard (Intro - Verse - II-V-I Chorus - Solo - Bridge - Outro)"
    },
    sampleResult: {
      title: "Half-Step to Peace (II-V-I)",
      styleTags: "modal jazz, drop-2 voicings, ii-v-i, brushed drums, rhodes, upright bass, warm female vocal, 84bpm",
      promptDescription: "Intimate modal jazz ballad centered on smooth ii-V-I cadences and Drop-2 voicings. Warm Rhodes, upright bass, brushed snare, and close-mic'd breathy vocal.",
      lyrics: `[Intro: warm Rhodes piano chords in Drop-2 voicing, subtle ride cymbal brush, upright bass walk]

[Verse 1: close-mic female jazz vocal, intimate presence, audible breath]
Step into the quiet room
Where gentle shadows softly bloom
Two minor steps, a fifth to bend
Every journey finds its end

[Chorus: rich II-V-I cadence, altered tensions resolving smoothly to major tonic]
Shine in peace, let the colors fall
Through the harmony that heals it all
From tension's breath to restful grace
We find our solace in this sacred place

[Solo: semi-hollow guitar improvisation over II-V-I progression, delicate thumb picking]

[Bridge: modal drift, voice and bass duet with soft Rhodes sustain]
Half-step down, the leading tone
Never truly left alone
Resolve... and let it be...
Peace inside of you and me

[Outro: final extended Cmaj9#11 chord, brush stroke on snare, upright bass low C sustain]
Shine in peace...
Shine... in... peace...`,
      tips: [
        "The ii-V-I cadence is the universal harmonic language of jazz and Broadway.",
        "Drop-2 voicings spread inner voices across octaves, creating crystal-clear voice leading.",
        "Mentioning 'Rhodes piano' and 'brushed snare' automatically prompts Suno for vintage acoustic warmth."
      ]
    }
  },
  {
    id: "suno-vocal-baroque",
    name: "1. Baroque / Functional Tonality (Vocal)",
    description: "Baroque chamber ensemble with harpsichord, strings, counterpoint, and clear female vocal exploring tonic-dominant polarity and Roman numeral cadences at 96 BPM.",
    config: {
      subtheme: "Shine in Peace (Baroque Functional Architecture)",
      genre: "Baroque Chamber Ensemble & Counterpoint",
      mood: "Functional Harmony, I-IV-V-I Cadences, Elegant, Resolved",
      tempo: "96 BPM (Terraced Dynamics & Circle-of-Fifths)",
      vocalType: "Clear female vocal, elegant, articulate",
      instruments: "harpsichord, baroque chamber strings, cello continuo, natural room acoustic",
      structure: "Common-Practice Arch ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "1. Baroque / Functional Tonality",
      styleTags: "Baroque chamber ensemble, harpsichord, strings, counterpoint, functional harmony, I-IV-V-I cadences, circle-of-fifths motion, terraced dynamics, 96 BPM, clear female vocal, elegant, resolved, instrumental sections",
      promptDescription: "Baroque chamber ensemble with harpsichord and counterpoint. Lyrically explores tonic-dominant polarity, Roman numerals, circle-of-fifths motion, and cadential resolution.",
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
      tips: [
        "Style prompt is 207 characters—under Suno's limit with maximum keyword density.",
        "Lyrics provide explicit cues like [Intro: harpsichord, instrumental] and [Pre-Chorus: strings swell] for dynamic arrangement.",
        "For pure instrumental generation in Suno, replace the Lyrics box with '[Instrumental]'."
      ]
    }
  },
  {
    id: "suno-vocal-jazz",
    name: "2. Jazz II–V–I (Vocal)",
    description: "Smoky jazz trio with upright bass, brushed drums, Rhodes piano, and smooth male vocal exploring ii-V-I voice leading and drop-2 voicings at 120 BPM.",
    config: {
      subtheme: "Shine in Peace (Late-Night II-V-I Voice Leading)",
      genre: "Smoky Jazz Trio & Drop-2 Voicings",
      mood: "Late-Night, Sophisticated, ii-V-I Resolution",
      tempo: "120 BPM (Walking Bass & Brushed Swing)",
      vocalType: "Smooth male vocal, late-night, sophisticated",
      instruments: "upright bass, brushed drums, Rhodes piano, subtle ride cymbal",
      structure: "Jazz Standard Flow ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "2. Jazz II–V–I",
      styleTags: "Smoky jazz trio, upright bass, brushed drums, Rhodes piano, ii-V-I progressions, extended chords, drop-2 voicings, walking bass, 120 BPM, smooth male vocal, late-night, sophisticated, instrumental breaks",
      promptDescription: "Smoky jazz trio with brushed drums and Rhodes chords. Explores ii-V-I voice-leading mechanics, drop-2 voicings, alterations, and chromatic guide tones.",
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
      tips: [
        "Style prompt is 202 characters—perfect token density for Suno V3.5/V4.",
        "The bracket tag '[Verse 2: male vocal, scatting lightly]' cues vocal improvisation in Suno.",
        "Walking bass and brushed snare provide Suno with acoustic swing momentum."
      ]
    }
  },
  {
    id: "suno-vocal-bartok",
    name: "3. Bartók Axis System (Vocal)",
    description: "Modern classical string quartet exploring Bartók's tritone pole axis system, symmetrical harmony, and dark female vocal at 104 BPM.",
    config: {
      subtheme: "Shine in Peace (Tritone Axis & Polar Modulation)",
      genre: "Modern Classical String Quartet & Bartók Axis",
      mood: "Dark, Mysterious, Symmetrical Harmony, Octatonic Colors",
      tempo: "104 BPM (Folk-like Asymmetric Rhythms)",
      vocalType: "Dark female vocal, mysterious, folk-like",
      instruments: "string quartet, muted cello, violins sul ponticello, viola pizzicato",
      structure: "Symmetrical Axis ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "3. Bartók Axis System",
      styleTags: "Modern classical string quartet, Bartók axis system, tritone pole modulation, symmetrical harmony, folk-like asymmetric rhythms, octatonic colors, 104 BPM, dark female vocal, mysterious, instrumental passages",
      promptDescription: "Modern classical string quartet exploring Lendvai's Bartók axis system. Lyrically dissects tritone counterpoles (C and F#), symmetrical harmony, and non-functional modulation.",
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
      tips: [
        "Tritone pole modulation shifts smoothly between antipodal keys (C and F#) without functional dominant cadence.",
        "Folk-like asymmetric rhythms trigger Eastern European rhythmic vitality in Suno.",
        "Strings tremolo and string harmonics cue evocative timbral shifts."
      ]
    }
  },
  {
    id: "suno-vocal-neoriemannian",
    name: "4. Neo-Riemannian (Vocal)",
    description: "Ambient film score exploring parsimonious triadic transformations (P, L, R) with ethereal female vocal, piano, strings, and warm pads at 72 BPM.",
    config: {
      subtheme: "Shine in Peace (Tonnetz P-L-R Triadic Transformations)",
      genre: "Ambient Film Score & Neo-Riemannian Harmony",
      mood: "Parsimonious Triadic Transformations, P-L-R Voice Leading, Floating",
      tempo: "72 BPM (Slow & Floating)",
      vocalType: "Ethereal female vocal, floating, cinematic",
      instruments: "warm pads, solitary piano, chamber strings, french horn",
      structure: "Tonnetz Flow ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "4. Neo-Riemannian",
      styleTags: "Ambient film score, neo-Riemannian triadic transformations, smooth voice leading, suspended tonality, piano, strings, warm pads, 72 BPM, ethereal female vocal, floating, cinematic, instrumental swells",
      promptDescription: "Cinematic ambient score on the Tonnetz network. Explores the P (Parallel), L (Leading-tone exchange), and R (Relative) minimal-motion transformations.",
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
      tips: [
        "Neo-Riemannian operations shift only one voice by a half-step while holding common tones steady.",
        "Produces that signature cinematic mystery and wonder heard in fantasy/sci-fi scores.",
        "Piano arpeggios and warm pad swells give Suno space to linger on each transformation."
      ]
    }
  },
  {
    id: "suno-vocal-atonal",
    name: "5. Atonal / Pitch-Class Set (Vocal)",
    description: "Avant-garde contemporary classical with pitch-class sets, prepared piano, string harmonics, and spoken-sung male vocal at 80 BPM.",
    config: {
      subtheme: "Shine in Peace (Interval-Class Vectors & Prime Form)",
      genre: "Avant-Garde Contemporary Classical & Set Theory",
      mood: "Unsettling, Abstract, Post-Tonal Symmetry",
      tempo: "80 BPM (Angular Melodies & Unmetered Rubato)",
      vocalType: "Spoken-sung male vocal, angular, rhythmic",
      instruments: "prepared piano, string harmonics, dissonant strings, percussion",
      structure: "Set-Theoretic Arc ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "5. Atonal / Pitch-Class Set",
      styleTags: "Avant-garde contemporary classical, atonal, pitch-class sets, angular melodies, prepared piano, string harmonics, percussion, 80 BPM, spoken-sung male vocal, unsettling, abstract, instrumental textures",
      promptDescription: "Avant-garde post-tonal chamber piece with prepared piano. Lyrically examines interval-class vectors, prime forms, pitch-class zero, and Forte numbers.",
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
      tips: [
        "'Spoken-sung' instructs Suno to deliver Sprechstimme-style vocal delivery.",
        "Prepared piano and percussion prevent Suno from falling back into generic pop patterns.",
        "Whispered pitch-class numbers in the Outro create an authentic avant-garde finish."
      ]
    }
  },
  {
    id: "suno-vocal-spectral",
    name: "6. Spectral / Psychoacoustic (Vocal)",
    description: "Spectral composition with Fourier-based timbres, microtonal strings, evolving drones, and haunting female vocal at 65 BPM.",
    config: {
      subtheme: "Shine in Peace (Fourier Overtones & Psychoacoustic Waves)",
      genre: "Spectral Composition & Psychoacoustic Harmony",
      mood: "Immersive, Experimental, Sensory Dissonance & Peace",
      tempo: "65 BPM (Evolving Drones & Tension Curves)",
      vocalType: "Haunting female vocal, microtonal, immersive",
      instruments: "evolving drones, microtonal strings, acoustic overtones, bowed vibraphone",
      structure: "Continuous Spectrum ([Intro] - [Verse 1] - [Pre-Chorus] - [Chorus] - [Verse 2] - [Bridge] - [Outro])"
    },
    sampleResult: {
      title: "6. Spectral / Psychoacoustic",
      styleTags: "Spectral composition, psychoacoustic harmony, Fourier-based timbres, microtonal, evolving drones, tension curves, 65 BPM, haunting female vocal, immersive, experimental, instrumental layers",
      promptDescription: "Spectral composition inspired by French spectralists and acoustic physics. Lyrically delves into Fourier analysis, overtones, roughness curves, and sensory dissonance.",
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
      tips: [
        "Fourier-based timbres and evolving drones prompt Suno for acoustic micro-fluctuations.",
        "Haunting female vocal over microtonal strings creates deep psychoacoustic immersion.",
        "Both Style (190 chars) and Lyrics (802 chars) are well within Suno's limits."
      ]
    }
  },
  {
    id: "combined-harmonic-medley",
    name: "Harmonic Medley — All 6 Frameworks in 1 Track",
    description: "Epic cinematic jazz-classical medley traveling sequentially through Baroque I-IV-V-I, Jazz ii-V-I, Bartók axis, Neo-Riemannian P/L/R shifts, Atonal pitch-class sets, and Spectral psychoacoustic overtones.",
    config: {
      subtheme: "Shine in Peace (The Grand Harmonic Medley)",
      genre: "Epic Cinematic Jazz-Classical Fusion Medley",
      mood: "Monumental, Transformative, Polystylistic & Unified",
      tempo: "100 BPM (Dynamic Fluid Shifts)",
      vocalType: "Dual Vocal: Ethereal female & smooth male vocals",
      instruments: "harpsichord, jazz trio, string quartet, prepared piano, evolving drones, ambient pads",
      structure: "Medley Journey ([Intro] - [Verse 1: Baroque] - [Chorus] - [Verse 2: Jazz] - [Chorus] - [Verse 3: Bartók] - [Chorus] - [Verse 4: Neo-Riemannian] - [Chorus] - [Verse 5: Atonal] - [Chorus] - [Verse 6: Spectral] - [Outro])"
    },
    sampleResult: {
      title: "Harmonic Medley: From Functional to Fractal",
      styleTags: "Epic cinematic jazz-classical fusion medley, moving through Baroque functional tonality, jazz ii-V-I, Bartók axis, neo-Riemannian triads, atonal pitch-class sets, spectral psychoacoustic harmony. Harpsichord, jazz trio, string quartet, prepared piano, evolving drones, ethereal female and smooth male vocals, 100 BPM, dynamic, instrumental breaks.",
      promptDescription: "A monumental single-song journey traveling through all six harmonic frameworks in sequence: Baroque functional tonality, jazz ii-V-I cadences, Bartók's tritone axis, Neo-Riemannian voice leading, atonal pitch-class sets, and French spectral overtones.",
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
      tips: [
        "Style prompt is 338 characters and covers all 6 distinct instrumentations and theoretical systems.",
        "Lyrics prompt is 1,515 characters, structured with clear bracketed performance tags for Suno.",
        "Features dual vocal chemistry (ethereal female and smooth male vocals) across alternating verses."
      ]
    }
  }
];

export const PRESETS: Preset[] = [...BAMBAM_PRESETS, ...BUSKING_PRESETS, ...TRUMPET_PRESETS, ...RAGA_PRESETS, ...DEBUSSY_PRESETS, ...BASE_PRESETS];


