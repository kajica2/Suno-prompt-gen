export interface LegendaryStudio {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  spaceType: string;
  era: string;
  signature: string;
  notableArtists: string;
  character: string;
  stylePrompt: string;
  arrangementPrompt: string;
  introSeconds: number;
  outroSeconds: number;
  negativePrompt: string;
}

export interface ImpossibleHybridStudio {
  id: string;
  number: number;
  name: string;
  subtitle: string;
  spaceA: string;
  spaceB: string;
  contradiction: string;
  character: string;
  era: string;
  stylePrompt: string;
  arrangementPrompt: string;
  introSeconds: number;
  outroSeconds: number;
  negativePrompt: string;
  oddMeterVariant?: string;
  soloVariant?: string;
}

export interface RecordingAmbience {
  id: string;
  number: number;
  title: string;
  spaceName: string;
  character: string;
  decay: "Short" | "Very long" | "Short, boxy" | "None" | "None (open)" | "Medium";
  air: "Low" | "High" | "None" | "Medium" | "Very high";
  acousticSignature: string;
  stylePrompt: string;
  compactStyleTags: string;
  arrangementPrompt: string;
  introAnchorSeconds: number;
  outroTailSeconds: number;
  negativePrompt: string;
  proTips: string[];
}

// Universal Negatives
export const STUDIO_UNIVERSAL_NEGATIVE =
  "no reverb plugins, no digital polish, no noise reduction, no gating, no stereo widening, no auto-tune, no EDM, no trap";

export const HYBRID_UNIVERSAL_NEGATIVE =
  "no reverb plugins, no digital polish, no noise reduction, no gating, no stereo widening, no auto-tune, no EDM, no trap, no horns, no trumpet, no sax, no brass";

export const AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT =
  "no reverb, no digital polish, no noise reduction, no gating, no compression, no EQ, no stereo widening, no delay, no chorus";

// 1. The 7 Legendary Recording Studios
export const LEGENDARY_STUDIOS: LegendaryStudio[] = [
  {
    id: "abbey-road-2",
    number: 1,
    name: "Abbey Road Studio 2",
    subtitle: "TG Console Air",
    spaceType: "Tall live room",
    era: "1969",
    signature: "EMI TG12345 console, Studio 2 tall live room, plate reverb on back wall",
    notableArtists: "The Beatles, Pink Floyd",
    character: "Warm, punchy, slightly compressed, valve-driven. The Beatles' Abbey Road ambience.",
    stylePrompt:
      "Abbey Road Studio 2 ambience, EMI TG console warmth, tall live room reflections, valve compression, analog tape, unquantized human timing, breath, valve clicks, stool creak, one-take, no overdubs, no reverb plugins, no digital polish, mono, warm, punchy, 1969",
    arrangementPrompt:
      "[Intro: 3 seconds of Studio 2 room tone, TG console hum, tape hiss]\n[Groove: instruments enter with tall room reflections, natural valve compression]\n[Break: room tone alone, plate reverb tail from the back wall, 2 seconds]\n[Outro: instruments stop, TG hum continues 4 seconds, fades to silence]",
    introSeconds: 3,
    outroSeconds: 4,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "columbia-30th",
    number: 2,
    name: "Columbia 30th Street Studio",
    subtitle: "Converted Church",
    spaceType: "Converted Presbyterian church",
    era: "1959",
    signature: "100-foot ceiling, natural reverb tail, wooden pews, stone walls",
    notableArtists: "Miles Davis (Kind of Blue), Bob Dylan (Highway 61)",
    character: "Sacred, spacious, massive natural decay tail, stone wall warmth.",
    stylePrompt:
      "Columbia 30th Street Studio ambience, converted church, 100-foot ceiling natural decay, stone and wood reflections, analog tape, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, sacred, spacious, 1959",
    arrangementPrompt:
      "[Intro: 5 seconds of church room tone, distant street hum through stone walls]\n[Groove: instruments enter, every note rings into the 100-foot ceiling]\n[Break: single note decays for 4 seconds in the natural church reverb]\n[Outro: instruments stop, church decay continues 8 seconds, fades]",
    introSeconds: 5,
    outroSeconds: 8,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "stax-records",
    number: 3,
    name: "Stax Records",
    subtitle: "The Snake Pit",
    spaceType: "Converted movie theater",
    era: "1967",
    signature: "Sloped floor, old stage, gritty raw concrete reflections",
    notableArtists: "Booker T & the MGs, Isaac Hayes, Otis Redding",
    character: "The sound of sweat and concrete. Sloped movie theater acoustics, gritty midrange punch.",
    stylePrompt:
      "Stax Records ambience, converted movie theater, sloped floor, raw concrete reflections, gritty midrange, analog tape, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, raw, 1967",
    arrangementPrompt:
      "[Intro: 2 seconds of theater room tone, distant street noise]\n[Groove: instruments enter raw and gritty, concrete reflections]\n[Break: room tone alone, sloped floor slap-back, 2 seconds]\n[Outro: instruments stop, theater air continues 4 seconds, fades]",
    introSeconds: 2,
    outroSeconds: 4,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "van-gelder",
    number: 4,
    name: "Van Gelder Studio",
    subtitle: "Blue Note Air",
    spaceType: "Hackensack living room studio",
    era: "1963",
    signature: "Warm wood reflections, living room acoustics, intimate jazz room",
    notableArtists: "John Coltrane, Miles Davis, Herbie Hancock, Thelonious Monk",
    character: "Warm, pristine, intimate. The sound of legendary jazz captured in a home living room.",
    stylePrompt:
      "Van Gelder Studio ambience, Hackensack living room, warm wood reflections, intimate jazz room, analog tape, valve compression, unquantized human timing, breath, valve clicks, stool creak, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, warm, 1963",
    arrangementPrompt:
      "[Intro: 3 seconds of living room tone, distant suburban hum]\n[Groove: instruments enter close and warm, wooden floor reflections]\n[Break: room tone alone, faint domestic sounds, 2 seconds]\n[Outro: instruments stop, room tone continues 5 seconds, fades]",
    introSeconds: 3,
    outroSeconds: 5,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "black-ark",
    number: 5,
    name: "Black Ark",
    subtitle: "Lee Perry's Dub Chamber",
    spaceType: "Kingston backyard shack",
    era: "1976",
    signature: "Smoke-filled air, tape saturation, submerged dub delay, echoing tails",
    notableArtists: "Lee 'Scratch' Perry, The Congos, Max Romeo",
    character: "Lo-fi, psychedelic, smoke-filled. The sound of genius and madness.",
    stylePrompt:
      "Black Ark Studio ambience, Lee Perry Kingston backyard, lo-fi psychedelic, smoke-filled air, tape saturation, submerged dub delay, echoing vocal tails, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, 1976",
    arrangementPrompt:
      "[Intro: 3 seconds of smoky room tone, tape machine hum, distant Kingston]\n[Groove: instruments enter lo-fi and saturated, dub delay tails behind every note]\n[Break: tape delay feedback alone, 3 seconds, echoing into smoke]\n[Outro: instruments stop, delay tails decay 6 seconds, tape hiss fades]",
    introSeconds: 3,
    outroSeconds: 6,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "muscle-shoals",
    number: 6,
    name: "Muscle Shoals Sound",
    subtitle: "The Swamp",
    spaceType: "Converted coffin showroom",
    era: "1969",
    signature: "Converted coffin showroom, tight, warm, swampy river air, cicadas",
    notableArtists: "Aretha Franklin, Rolling Stones, Lynyrd Skynyrd, Wilson Pickett",
    character: "Tight, warm, swampy. The sound of the Tennessee River and Alabama soul.",
    stylePrompt:
      "Muscle Shoals Sound Studio ambience, converted coffin showroom, tight warm swampy, river air, analog tape, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, warm, 1969",
    arrangementPrompt:
      "[Intro: 3 seconds of swampy room tone, distant river, cicadas]\n[Groove: instruments enter tight and warm, no reflections, close and dry]\n[Break: room tone alone, river air, 2 seconds]\n[Outro: instruments stop, river air continues 5 seconds, fades]",
    introSeconds: 3,
    outroSeconds: 5,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  },
  {
    id: "hansa-studios",
    number: 7,
    name: "Hansa Studios",
    subtitle: "The Wall",
    spaceType: "Former Nazi ballroom in Berlin",
    era: "1977",
    signature: "Massive industrial room, Cold War air, concrete and steel reflections next to the Wall",
    notableArtists: "David Bowie (Heroes), Iggy Pop, Nick Cave, Depeche Mode",
    character: "Cold, vast, haunted. Massive industrial room reflections and Cold War tension.",
    stylePrompt:
      "Hansa Studios ambience, Berlin ballroom, massive industrial room, Cold War air, concrete and steel reflections, analog tape, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, cold, vast, 1977",
    arrangementPrompt:
      "[Intro: 5 seconds of vast industrial room tone, distant Berlin, cold air]\n[Groove: instruments enter, notes disappear into massive decay]\n[Break: room tone alone, concrete reflections, 3 seconds]\n[Outro: instruments stop, industrial decay continues 8 seconds, fades]",
    introSeconds: 5,
    outroSeconds: 8,
    negativePrompt: STUDIO_UNIVERSAL_NEGATIVE
  }
];

// 2. The 7 Impossible Hybrid Studios
export const IMPOSSIBLE_HYBRID_STUDIOS: ImpossibleHybridStudio[] = [
  {
    id: "hybrid-abbey-road-church",
    number: 1,
    name: "Abbey Road Church",
    subtitle: "TG Console in a Cathedral",
    spaceA: "Abbey Road Studio 2 (Tight, punchy, valve)",
    spaceB: "Columbia 30th Street (100-ft stone cathedral)",
    contradiction: "Dry, punchy TG console immediacy coupled with an 8-to-10 second natural church tail.",
    character: "Sacred punch. The EMI TG console sits directly inside a 100-foot stone cathedral nave.",
    era: "1968",
    stylePrompt:
      "Abbey Road Studio 2 fused with Columbia 30th Street church, EMI TG console warmth inside a 100-foot stone cathedral, valve compression, analog tape, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, sacred, punchy, 1968",
    arrangementPrompt:
      "[Intro: 4 seconds of cathedral room tone with faint TG console hum]\n[Groove: instruments enter punchy and dry, but every note rings into stone decay]\n[Break: single note hits the TG compressor then decays 6 seconds in the church]\n[Outro: instruments stop, stone decay continues 10 seconds, TG hum fades]",
    introSeconds: 4,
    outroSeconds: 10,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Abbey Road Church, 11/8 Ethio-jazz, hangpan, no horns, TG console, 100-foot decay",
    soloVariant:
      "Abbey Road Church, solo acoustic hangpan only, unquantized, room tone, breath, TG warmth"
  },
  {
    id: "hybrid-stax-ark",
    number: 2,
    name: "Stax Ark",
    subtitle: "Memphis Dub Chamber",
    spaceA: "Stax Records (Gritty theater, raw concrete)",
    spaceB: "Black Ark (Lo-fi backyard shack, smoke, dub delay)",
    contradiction: "Sloped movie theater concrete acoustics hosting a smoke-saturated Kingston dub shack.",
    character: "Memphis dub. Raw concrete slap-back layered with heavy tape saturation and submerged feedback tails.",
    era: "1974",
    stylePrompt:
      "Stax Records fused with Black Ark Studio, converted movie theater meets Kingston backyard shack, raw concrete reflections, lo-fi psychedelic smoke, tape saturation, submerged dub delay, echoing vocal tails, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, gritty, 1974",
    arrangementPrompt:
      "[Intro: 3 seconds of theater room tone with distant Kingston street, tape hum]\n[Groove: instruments enter raw and gritty, dub delay tails behind every note]\n[Break: tape delay feedback alone in the theater, 3 seconds, smoke audible]\n[Outro: instruments stop, delay tails decay 6 seconds, concrete air fades]",
    introSeconds: 3,
    outroSeconds: 6,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Stax Ark, 7/8 Afro-dub rhythm section, talking drum, organ, submerged tape delay, no horns",
    soloVariant:
      "Stax Ark, solo upright bass and tape feedback, sloped floor slap-back, smoke-filled air"
  },
  {
    id: "hybrid-van-gelder-wall",
    number: 3,
    name: "Van Gelder Wall",
    subtitle: "Living Room in a Ballroom",
    spaceA: "Van Gelder Studio (Intimate living room, warm wood)",
    spaceB: "Hansa Studios (Vast Nazi ballroom, cold industrial decay)",
    contradiction: "A cozy Hackensack living room encased inside a 50-foot Cold War ballroom ceiling.",
    character: "Warm cold. Intimate 3-foot wood reflections that simultaneously disperse into infinite haunted concrete decay.",
    era: "1975",
    stylePrompt:
      "Van Gelder Studio fused with Hansa Studios, intimate Hackensack living room inside a vast Berlin ballroom, warm wood meets cold concrete and steel, massive industrial decay, analog tape, valve compression, unquantized human timing, breath, valve clicks, stool creak, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, intimate, haunted, 1975",
    arrangementPrompt:
      "[Intro: 4 seconds of living room tone with vast ballroom air behind it]\n[Groove: instruments enter close and warm, but notes disappear into industrial decay]\n[Break: room tone alone, intimate wood and distant Berlin air, 3 seconds]\n[Outro: instruments stop, ballroom decay continues 8 seconds, warm wood fades]",
    introSeconds: 4,
    outroSeconds: 8,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Van Gelder Wall, 9/8 modal Ethio-jazz, vibraphone and upright bass, cold ballroom decay, no horns",
    soloVariant:
      "Van Gelder Wall, solo krar only, 7/8, room tone, breath, vast industrial decay, warm wood"
  },
  {
    id: "hybrid-muscle-shoals-cathedral",
    number: 4,
    name: "Muscle Shoals Cathedral",
    subtitle: "Swamp Gospel",
    spaceA: "Muscle Shoals (Tight coffin showroom, swampy river air)",
    spaceB: "Columbia 30th Street (Sacred church, 100-ft stone decay)",
    contradiction: "A tight, dry, dead showroom flooded with cicadas, suspended inside a 100-foot stone nave.",
    character: "Swamp gospel. Alabama river humidity meeting sacred Gothic stone reverberation.",
    era: "1971",
    stylePrompt:
      "Muscle Shoals Sound fused with Columbia 30th Street church, tight coffin showroom inside a stone cathedral, swampy river air meets sacred stone decay, analog tape, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, swampy, sacred, 1971",
    arrangementPrompt:
      "[Intro: 3 seconds of swampy room tone with church air behind it, cicadas]\n[Groove: instruments enter tight and dry, but every note rings into stone]\n[Break: river air and stone decay alone, 2 seconds]\n[Outro: instruments stop, church decay continues 7 seconds, cicadas fade]",
    introSeconds: 3,
    outroSeconds: 7,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Muscle Shoals Cathedral, 10/8 swamp groove, Wurlitzer, upright bass, river air, church decay",
    soloVariant:
      "Muscle Shoals Cathedral, solo slide resonator guitar, river air, stone decay tail"
  },
  {
    id: "hybrid-abbey-ark",
    number: 5,
    name: "Abbey Ark",
    subtitle: "TG Console in a Kingston Shack",
    spaceA: "Abbey Road Studio 2 (Pristine TG console, tall live room)",
    spaceB: "Black Ark (Lo-fi backyard shack, smoke, dub delay)",
    contradiction: "Pristine British engineering console installed inside a smoke-filled Kingston shack. Hi-fi meets lo-fi.",
    character: "Warm psychedelia. Transformer warmth and EMI valve limiters driving heavily saturated analog dub delay.",
    era: "1975",
    stylePrompt:
      "Abbey Road Studio 2 fused with Black Ark Studio, EMI TG console inside a Kingston backyard shack, tall room reflections meet lo-fi smoke, tape saturation, submerged dub delay, echoing vocal tails, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, warm, psychedelic, 1975",
    arrangementPrompt:
      "[Intro: 3 seconds of Kingston room tone with distant TG console hum, smoke]\n[Groove: instruments enter warm and punchy, dub delay tails behind every note]\n[Break: tape delay feedback alone, 3 seconds, smoke and kingston air]\n[Outro: instruments stop, delay tails decay 6 seconds, TG hum fades]",
    introSeconds: 3,
    outroSeconds: 6,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Abbey Ark, 13/8 polymetric dub groove, talking drum, Rhodes, TG warmth, smoke feedback, no horns",
    soloVariant:
      "Abbey Ark, solo kalimba through TG console and submerged dub delay, backyard smoke"
  },
  {
    id: "hybrid-hansa-stax",
    number: 6,
    name: "Hansa Stax",
    subtitle: "Cold Memphis Concrete",
    spaceA: "Hansa Studios (Vast Nazi ballroom, cold industrial)",
    spaceB: "Stax Records (Gritty theater, raw concrete, sloped floor)",
    contradiction: "A sloped Memphis movie theater floor constructed inside a vast, freezing Berlin ballroom.",
    character: "Cold grit. Cold War Berlin concrete air fused with raw Southern sweat and theater midrange punch.",
    era: "1976",
    stylePrompt:
      "Hansa Studios fused with Stax Records, vast Berlin ballroom with a sloped Memphis theater floor, cold concrete and steel meets raw gritty midrange, massive industrial decay, analog tape, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, cold, gritty, 1976",
    arrangementPrompt:
      "[Intro: 4 seconds of vast industrial room tone with distant Memphis street]\n[Groove: instruments enter raw and gritty, notes disappear into massive decay]\n[Break: room tone alone, sloped floor slap-back in a ballroom, 3 seconds]\n[Outro: instruments stop, industrial decay continues 8 seconds, gritty air fades]",
    introSeconds: 4,
    outroSeconds: 8,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Hansa Stax, 7/8 Afrobeat rhythm section, sloped concrete punch, Berlin industrial decay, no horns",
    soloVariant:
      "Hansa Stax, solo drum kit with sloped floor slap-back inside vast ballroom decay"
  },
  {
    id: "hybrid-van-gelder-30th",
    number: 7,
    name: "Van Gelder 30th Street",
    subtitle: "Living Room in a Church",
    spaceA: "Van Gelder Studio (Intimate living room, warm wood)",
    spaceB: "Columbia 30th Street (Sacred church, 100-ft stone decay)",
    contradiction: "Rudy Van Gelder's cozy Hackensack living room topped by a 100-foot Gothic stone cathedral dome.",
    character: "Warm sacred. Cozy close-mic wood proximity that resonates upward into awe-inspiring stone architecture.",
    era: "1962",
    stylePrompt:
      "Van Gelder Studio fused with Columbia 30th Street church, intimate Hackensack living room inside a 100-foot stone cathedral, warm wood meets sacred stone decay, analog tape, valve compression, unquantized human timing, breath, valve clicks, stool creak, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono, warm, sacred, 1962",
    arrangementPrompt:
      "[Intro: 4 seconds of living room tone with church air above it]\n[Groove: instruments enter close and warm, every note rings into stone]\n[Break: room tone alone, intimate wood and sacred stone, 2 seconds]\n[Outro: instruments stop, church decay continues 7 seconds, warm wood fades]",
    introSeconds: 4,
    outroSeconds: 7,
    negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
    oddMeterVariant:
      "Van Gelder 30th Street, 5/4 modal Tezeta jazz, vibraphone, upright bass, wooden warmth, stone decay",
    soloVariant:
      "Van Gelder 30th Street, solo upright bass only, warm wooden floor bleed, 100-foot stone tail"
  }
];

// 3. Physical Space Archetypes
export const RECORDING_AMBIENCES: RecordingAmbience[] = [
  {
    id: "wooden-studio",
    number: 1,
    title: "Small Wooden Studio",
    spaceName: "Tight & Dry",
    character: "Close, warm, wooden reflections, almost no decay. Every instrument feels 3 feet away.",
    decay: "Short",
    air: "Low",
    acousticSignature: "Natural wood reflections, intimate close proximity, tight organic decay",
    stylePrompt:
      "live room recording, small wooden studio, tight and dry, natural wood reflections, close-mic, analog tape hiss, valve compression, unquantized human timing, breath, valve clicks, stool creak, finger squeaks, one-take, no overdubs, no reverb, no digital polish, mono, intimate",
    compactStyleTags:
      "live room recording, small wooden studio, tight and dry, natural wood reflections, close-mic, analog tape hiss, mono, intimate",
    arrangementPrompt:
      "[Intro: 2 seconds of wooden room tone before any instrument]\n[Groove: instruments enter with natural bleed, no isolation, tight decay]\n[Break: room tone alone for 1 second, wooden reflections audible]\n[Outro: instruments stop, room tone continues 3 seconds, fades to silence]",
    introAnchorSeconds: 2,
    outroTailSeconds: 3,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "The 2-second intro room tone is the anchor that forces Suno to register a physical wood room before notes begin.",
      "Close-mic detail like 'stool creak, finger squeaks' reinforces intimate 3-foot proximity without artificial room simulators.",
      "Outro room tone continues for 3 seconds into natural silence."
    ]
  },
  {
    id: "stone-church",
    number: 2,
    title: "Stone Church",
    spaceName: "Long Natural Decay",
    character: "Tall stone walls, long natural reverb tail, airy, sacred, cold at the edges, warm in the middle.",
    decay: "Very long",
    air: "High",
    acousticSignature: "High stone arches, sacred cold-warm natural decay tail, distant cathedral air",
    stylePrompt:
      "live recording in a stone church, natural long decay, stone wall reflections, high ceiling air, analog tape, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no artificial reverb, no digital polish, mono, spacious, contemplative",
    compactStyleTags:
      "live recording in a stone church, natural long decay, stone wall reflections, high ceiling air, analog tape, mono, contemplative",
    arrangementPrompt:
      "[Intro: 4 seconds of church room tone, air, distant hum]\n[Groove: instruments enter, natural stone decay trails behind every note]\n[Break: single note rings into the stone, 3 seconds of natural tail]\n[Outro: instruments stop, stone decay continues 6 seconds, fades to silence]",
    introAnchorSeconds: 4,
    outroTailSeconds: 6,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "Never write 'digital reverb' or 'hall effect' — the stone church acoustics ARE the natural reverberation.",
      "Intro requires 4 full seconds of church room tone, high-ceiling air, and distant ambient hum.",
      "The break lets a single note ring into the stone for 3 seconds of pure acoustic tail."
    ]
  },
  {
    id: "concrete-basement",
    number: 3,
    title: "Concrete Basement",
    spaceName: "Dark & Boxy",
    character: "Low ceiling, concrete walls, boxy midrange, damp, dark, muffled highs, no air.",
    decay: "Short, boxy",
    air: "None",
    acousticSignature: "Boxy concrete slap-back, damp subterranean midrange, suffocated treble",
    stylePrompt:
      "live recording in a concrete basement, boxy and dark, low ceiling reflections, damp air, analog tape hiss, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb, no digital polish, mono, claustrophobic",
    compactStyleTags:
      "live recording in a concrete basement, boxy and dark, low ceiling reflections, damp air, analog tape hiss, mono, claustrophobic",
    arrangementPrompt:
      "[Intro: 2 seconds of damp basement room tone, low hum]\n[Groove: instruments enter, boxy reflections, no high-end air]\n[Break: room tone alone, concrete slap-back audible]\n[Outro: instruments stop, damp air continues 3 seconds, fades]",
    introAnchorSeconds: 2,
    outroTailSeconds: 3,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "Suppressing 'air' and high frequencies forces Suno to simulate thick concrete slap-back and damp subterranean midrange.",
      "Intro room tone specifies 'low hum' and 'damp air'.",
      "Notice the break tag: 'concrete slap-back audible' triggers early mechanical reflections."
    ]
  },
  {
    id: "living-room",
    number: 4,
    title: "Living Room",
    spaceName: "Soft & Intimate",
    character: "Carpet, couch, curtains — soft absorption, no reflections, everything close and quiet. The sound of a home.",
    decay: "None",
    air: "Low",
    acousticSignature: "Soft furnishings absorption, dead acoustic reflections, domestic proximity",
    stylePrompt:
      "live recording in a living room, soft furnishings, carpet and curtains absorbing reflections, close-mic, analog tape hiss, valve compression, unquantized, breath, lip noise, stool creak, finger squeaks, one-take, no overdubs, no reverb, no digital polish, mono, intimate, quiet",
    compactStyleTags:
      "live recording in a living room, soft furnishings, carpet and curtains absorbing reflections, close-mic, tape hiss, mono, intimate",
    arrangementPrompt:
      "[Intro: 2 seconds of soft room tone, distant traffic outside]\n[Groove: instruments enter close and dry, no reflections]\n[Break: room tone alone, faint domestic sounds]\n[Outro: instruments stop, room tone continues 4 seconds, fades]",
    introAnchorSeconds: 2,
    outroTailSeconds: 4,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "Specifying 'carpet and curtains absorbing reflections' neutralizes Suno's reflex to insert shiny high-frequency algorithmic reverb.",
      "The phrase 'distant traffic outside' and 'faint domestic sounds' gives the AI a grounded psychoacoustic room context.",
      "Outro room tone continues for 4 seconds before natural decay."
    ]
  },
  {
    id: "tape-room",
    number: 5,
    title: "Tape Room / Control Room Bleed",
    spaceName: "Machine Air",
    character: "Reel-to-reel machines humming, monitor bleed, the sound of a control room with the door open. Mechanical, warm, electrical.",
    decay: "None",
    air: "Medium",
    acousticSignature: "Reel-to-reel mechanical motor hum, console bleed, transformer warmth",
    stylePrompt:
      "live recording in a tape room, reel-to-reel machine hum, control room bleed, monitor speakers faintly audible, analog tape hiss, valve compression, unquantized, breath, valve clicks, chair creak, one-take, no overdubs, no reverb, no digital polish, mono, warm, mechanical",
    compactStyleTags:
      "live recording in a tape room, reel-to-reel machine hum, control room bleed, monitor speakers, analog tape hiss, mono, warm, mechanical",
    arrangementPrompt:
      "[Intro: 3 seconds of tape machine hum and room tone]\n[Groove: instruments enter with faint monitor bleed behind them]\n[Break: tape machine hum alone, 2 seconds]\n[Outro: instruments stop, machine hum continues 5 seconds, fades]",
    introAnchorSeconds: 3,
    outroTailSeconds: 5,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "The phrase 'faint monitor bleed behind them' gives Suno the subtle acoustic phase bleed characteristic of vintage tracking dates.",
      "Intro anchors with 3 seconds of tape motor hum and hardware room tone.",
      "Machine hum continues for 5 seconds on the outro."
    ]
  },
  {
    id: "open-courtyard",
    number: 6,
    title: "Open Courtyard at Night",
    spaceName: "Outdoor Air",
    character: "Open sky, distant city, insects, night air. No walls. Sound disappears into space instead of reflecting.",
    decay: "None (open)",
    air: "Very high",
    acousticSignature: "Non-reflective open night sky, nocturnal air, distant crickets and city murmur",
    stylePrompt:
      "live recording in an open courtyard at night, outdoor air, distant city hum, insects, no wall reflections, analog tape, valve compression, unquantized human timing, breath, room tone, one-take, no overdubs, no reverb, no digital polish, mono, open, spacious, nocturnal",
    compactStyleTags:
      "live recording in an open courtyard at night, outdoor air, distant city hum, insects, no wall reflections, mono, nocturnal",
    arrangementPrompt:
      "[Intro: 4 seconds of night air, insects, distant traffic]\n[Groove: instruments enter, sound disappears into open space]\n[Break: night air alone, 2 seconds, distant city hum]\n[Outro: instruments stop, night air continues 6 seconds, fades]",
    introAnchorSeconds: 4,
    outroTailSeconds: 6,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "Specifying 'no wall reflections, sound disappears into open space' cues Suno to kill standard room slap, creating infinite open-air dissipation.",
      "Intro anchors with 4 seconds of night air, crickets/insects, and distant traffic murmurs.",
      "Outro allows night air and environmental tone to linger for 6 full seconds."
    ]
  },
  {
    id: "jazz-club",
    number: 7,
    title: "Old Jazz Club",
    spaceName: "Small Stage, Late Night",
    character: "Small stage, wooden floor, low ceiling, faint crowd, glasses clinking, smoke-stained walls. The sound of a room that has heard thousands of sets.",
    decay: "Medium",
    air: "Medium",
    acousticSignature: "Lived-in club stage bleed, clinking glassware, wooden floorboards, late-night intimacy",
    stylePrompt:
      "live recording in an old jazz club, small stage, wooden floor reflections, low ceiling, faint crowd murmur, glasses clinking, analog tape hiss, valve compression, unquantized human timing, breath, valve clicks, chair creak, one-take, no overdubs, no reverb, no digital polish, mono, warm, late night, intimate",
    compactStyleTags:
      "live recording in an old jazz club, small stage, wooden floor, faint crowd murmur, glasses clinking, analog tape hiss, mono, warm, late night",
    arrangementPrompt:
      "[Intro: 3 seconds of club room tone, faint crowd, glasses]\n[Groove: instruments enter with natural stage bleed, wooden floor reflections]\n[Break: room tone alone, distant conversation, 2 seconds]\n[Outro: instruments stop, crowd murmur continues 5 seconds, fades]",
    introAnchorSeconds: 3,
    outroTailSeconds: 5,
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
    proTips: [
      "Faint crowd murmur and glasses clinking are mixed as room tone, establishing an authentic smoky after-hours stage.",
      "Intro anchors with 3 seconds of ambient club room tone and table glassware.",
      "Stage bleed and wooden floor reflections provide organic acoustic depth without artificial digital reverb."
    ]
  }
];

export interface AmbienceHybrid {
  id: string;
  title: string;
  parentA: string;
  parentB: string;
  acousticConcept: string;
  stylePrompt: string;
  arrangementPrompt: string;
  negativePrompt: string;
}

export const AMBIENCE_HYBRIDS: AmbienceHybrid[] = [
  {
    id: "hybrid-church-courtyard",
    title: "Stone Church at Night with Distant Insects",
    parentA: "Stone Church",
    parentB: "Open Courtyard at Night",
    acousticConcept:
      "A stone chapel with the double doors flung open to the night air: sacred high-arch stone decay tails colliding with nocturnal breeze, crickets, and open-sky dissipation.",
    stylePrompt:
      "live recording in a stone church with open courtyard doors at night, stone decay tail meeting open night air, distant insects, high ceiling reflections, analog tape, valve compression, unquantized, room tone, one-take, no artificial reverb, no digital polish, mono, nocturnal, sacred",
    arrangementPrompt:
      "[Intro: 4 seconds of church air meeting night breeze, faint insects and stone hum]\n[Groove: instruments enter, stone decay rings out while fading into outdoor open sky]\n[Break: single note rings across the stone nave and drifts into the night air]\n[Outro: instruments stop, sacred stone tail and crickets linger 6 seconds into silence]",
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT
  },
  {
    id: "hybrid-tape-jazzclub",
    title: "Tape Room with Jazz Club Bleed",
    parentA: "Tape Room / Control Room",
    parentB: "Old Jazz Club",
    acousticConcept:
      "The analog control room console room right next to the jazz club stage door: mechanical reel-to-reel motor hums and tape hiss interwoven with clinking highball glasses, faint crowd murmurs, and stage spill.",
    stylePrompt:
      "live recording from tape control room with jazz club stage bleed, reel-to-reel motor hum, monitor spill, glasses clinking, faint crowd murmur, wooden floor reflections, analog tape hiss, valve compression, unquantized, one-take, no reverb, no digital polish, mono, warm, mechanical, late night",
    arrangementPrompt:
      "[Intro: 3 seconds of reel-to-reel machine hum layered over faint jazz club glasses]\n[Groove: instruments enter with control room monitor bleed and stage floorboard rumble]\n[Break: tape machine hum and distant bartender conversation alone for 2 seconds]\n[Outro: instruments stop, reel-to-reel hum and clinking glasses continue 5 seconds, fades]",
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT
  },
  {
    id: "hybrid-basement-livingroom",
    title: "Concrete Basement & Draped Living Room Braid",
    parentA: "Concrete Basement",
    parentB: "Living Room",
    acousticConcept:
      "Subterranean cellar furnished with thick carpets and heavy velvet curtains: boxy subterranean midrange weight stripped of high-frequency flutter, creating deep dry acoustic intimacy.",
    stylePrompt:
      "live recording in a damp subterranean room with heavy velvet curtains and rugs, boxy concrete low-end weight, dead high-end absorption, analog tape hiss, valve compression, close-mic, unquantized, breath, chair creak, one-take, no reverb, no digital polish, mono, dark, intimate",
    arrangementPrompt:
      "[Intro: 3 seconds of damp subterranean room tone, heavy muffled dead air]\n[Groove: instruments enter dry, intimate 2-foot proximity, heavy low-end concrete punch]\n[Break: room tone alone, dead absorption, breath and valve clicks]\n[Outro: instruments stop, dead room tone fades 4 seconds into dark silence]",
    negativePrompt: AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT
  }
];
