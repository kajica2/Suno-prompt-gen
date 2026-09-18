import { PromptConfig, PromptResult } from "../types";

/**
 * Intelligent procedural prompt engine for Suno AI.
 * Used as a fallback when the Gemini API encounters rate limits (429/quota limits)
 * or transient service spikes, ensuring that the creative flow is never broken.
 */
export function generateProceduralPrompt(config: PromptConfig, reason?: string): PromptResult {
  const {
    subtheme = "Shine in Peace",
    genre = "Acoustic Folk",
    mood = "Peaceful",
    tempo = "Moderate",
    vocalType = "Warm Vocal Lead",
    instruments = "acoustic guitar, piano",
    structure = "Standard",
  } = config;

  const isInstrumental =
    vocalType.toLowerCase().includes("instrumental") ||
    vocalType.toLowerCase().includes("no vocal") ||
    genre.toLowerCase().includes("solo piano") ||
    genre.toLowerCase().includes("ambient soundscape");

  const isSerbianOrBalkan =
    subtheme.toLowerCase().includes("sijaj") ||
    subtheme.toLowerCase().includes("miru") ||
    vocalType.toLowerCase().includes("serbian") ||
    genre.toLowerCase().includes("serbian") ||
    genre.toLowerCase().includes("balkan");

  const isDebussyOrImpressionist =
    genre.toLowerCase().includes("debussy") ||
    genre.toLowerCase().includes("impressionis") ||
    instruments.toLowerCase().includes("felt piano") ||
    subtheme.toLowerCase().includes("impressionist");

  const isLiquidDnB =
    genre.toLowerCase().includes("liquid") ||
    genre.toLowerCase().includes("dnb") ||
    genre.toLowerCase().includes("drum and bass") ||
    tempo.toLowerCase().includes("174");

  // 1. Compute Title
  let title = "Shine in Peace";
  if (isSerbianOrBalkan) {
    title = isLiquidDnB ? "Sijaj u Miru (Liquid DnB Meditation)" : "Sijaj u Miru (Shine in Peace)";
  } else if (isDebussyOrImpressionist) {
    title = "Reflets de la Paix (Impressions of Peace)";
  } else if (subtheme && subtheme.trim().length > 3) {
    const cleanSub = subtheme.replace(/["'()]/g, "").trim();
    title = cleanSub.length > 36 ? cleanSub.slice(0, 36).trim() + "..." : cleanSub;
  } else {
    title = `${mood} Radiance (Shine in Peace)`;
  }

  // 2. Compute Style Tags (STRICTLY <= 115 characters, comma-separated)
  let tagElements: string[] = [];

  if (isLiquidDnB) {
    tagElements = ["liquid dnb", "microhouse clicks", "tabla", "deep sub", "dub delay", "174bpm"];
    if (isSerbianOrBalkan) tagElements.splice(4, 0, "serbian vocal");
  } else if (isDebussyOrImpressionist) {
    tagElements = ["french impressionist", "solo felt piano", "rubato", "whole-tone", "pedal noise", "no drums"];
  } else if (isInstrumental) {
    const mainInst = instruments.split(",")[0]?.trim().toLowerCase() || "solo piano";
    tagElements = [
      genre.toLowerCase().split(" ")[0] || "ambient",
      mainInst,
      mood.toLowerCase().split(" ")[0] || "peaceful",
      "intimate acoustic space",
      "no beat",
      "no drums"
    ];
  } else {
    const gPart = genre.toLowerCase().split(",")[0].trim();
    const mPart = mood.toLowerCase().split(",")[0].trim();
    const vPart = vocalType.toLowerCase().includes("female") ? "warm female vocal" : vocalType.toLowerCase().includes("male") ? "intimate male vocal" : "expressive vocal";
    tagElements = [gPart, mPart, vPart, "reverb tails", "peaceful"];
  }

  // Format into comma-separated tags strictly <= 115 chars
  let styleTags = tagElements.join(", ").toLowerCase();
  if (styleTags.length > 115) {
    while (styleTags.length > 115 && tagElements.length > 2) {
      tagElements.pop();
      styleTags = tagElements.join(", ").toLowerCase();
    }
    if (styleTags.length > 115) {
      styleTags = styleTags.slice(0, 112).trim() + "...";
    }
  }

  // 3. Compute Prompt Description (Evocative, <= 180 characters)
  let promptDescription = "";
  if (isDebussyOrImpressionist) {
    promptDescription = "French Impressionist solo piano. Whole-tone cascades, ninth chords, room tone, pedal resonance, rubato timing. Delicate, unquantized, peaceful. No drums, no synths.";
  } else if (isLiquidDnB) {
    promptDescription = "Liquid drum and bass meditation with rolling breaks, deep sub bass glide, tabla accents, and ethereal vocal reverberations. Finding serene peace in motion.";
  } else if (isInstrumental) {
    promptDescription = `${mood} ${genre} meditation featuring ${instruments}. Organic acoustic presence, natural reverberation, and unhurried peaceful resolution. No percussion.`;
  } else {
    promptDescription = `${mood} ${genre} focusing on ${subtheme}. Features ${instruments}, ${vocalType}, and layered vocal harmonies invoking quiet healing and inner light.`;
  }
  if (promptDescription.length > 180) {
    promptDescription = promptDescription.slice(0, 177).trim() + "...";
  }

  // 4. Compute Lyrics & Structural Meta-tags
  let lyrics = "";

  if (isDebussyOrImpressionist) {
    lyrics = `[Instrumental]
[French Impressionist solo felt piano, close-mic, natural room tone, audible pedal noise, unquantized rubato]
[no drums, no synths, no beat]

[Theme: soft whole-tone cascading arpeggios, parallel ninths, lingering sustain pedal]

[Interlude: modal shift from pentatonic peace to hazy unresolved harmonies, gentle half-pedal color]

[Bridge: subterranean low-register fifths, high-register bell tones ringing in warm acoustic reverb]

[Outro: quiet single notes dissolving into harmonic resonance, final chord held until silent air]`;
  } else if (isInstrumental) {
    lyrics = `[Instrumental]
[${genre}, ${mood.toLowerCase()} space, ${instruments}]
[natural dynamic bloom, wide stereo field, no drums, no beat]

[Theme: gentle recurring motif on ${instruments.split(",")[0] || "lead instrument"}, generous negative space]

[Movement II: contemplative swell, harmonized acoustic counter-melodies, warm analog tape saturation]

[Bridge: suspended chordal tension, delicate breath and string-scrape textures, rubato timing]

[Outro: harmonic resonance fading slowly, quiet lingering notes into pure silence]`;
  } else if (isSerbianOrBalkan) {
    lyrics = `[Intro]
[${instruments}, quiet acoustic resonance, ambient delay tails]

[Verse 1: intimate whispered Serbian vocal, close-mic presence, dry acoustic space]
Tišina diše u dubini bas-a
(Silence breathes in the depth of the bass)
Iza svakog nemira, mirna je staza
(Behind every unrest, lies a peaceful path)
Svetlost se preliva kroz zlatan zrak
(Light spills through the golden ray)
Pronađi svoj centar, rastopi mrak
(Find your center, dissolve the dark)

[Restrained Doubles: whispered vocal layer in stereo]
Zastani na tren... udahni dah...
(Pause for a moment... take a breath...)
Oseti mir... nestaje strah...
(Feel the peace... fear disappears...)

[Chorus: high-energy pulse with weightless rolling break, deep sub bass glide]
Sijaj u miru, neka sija duša
(Shine in peace, let the soul shine)
Dok svet u daljini vetrove sluša
(While the world in the distance listens to the winds)
Sijaj u miru, kroz talase svetla
(Shine in peace, through waves of light)
Nema više nemira, noć se rasplela
(No more unrest, the night has unraveled)

[Bridge: break drops to half-time, sub bass and resonant acoustic textures]
Aaaa-aaah... sijaj u miru...
(Shine in peace...)
Mir u kapi... mir u srcu... mir u dahu...
(Peace in a drop... peace in the heart... peace in the breath...)

[Outro: gentle stripped-back groove, warm sub pulse, echoing vocal tails drifting into silence]
Sijaj u miru...
(Shine in peace...)
Sijaj...`;
  } else {
    lyrics = `[Intro]
[${instruments}, soft ambient air, delicate melodic motif establishing serene tempo]

[Verse 1: ${vocalType}, close-mic presence, intimate breath audible before first line]
The noise of the morning softens away
Leaving the shadows where sunlight can play
Every rushing thought comes down to a rest
Finding the quiet that beats in my chest

[Pre-Chorus: gentle harmony enters in third intervals, subtle low-end warmth]
Let the river run slow
Let the gentle tide flow
Everything you need is already here

[Chorus: wide vocal layering, rich acoustic bloom, uplifting peaceful energy]
Shine in peace, let your spirit glow
Brighter than the quietest waters know
Shine in peace, no need to hurry on
The storm is over and the dark has gone
Shine in peace...

[Verse 2: stripped back instrumentation, solo vocal clarity]
A lantern lit inside an open room
Healing that rises like flowers in bloom
You don't have to carry the weight of the skies
Just close your eyes and let the silence rise

[Bridge: ambient wash, suspended fourths resolving into major warmth]
Breathe in the stillness...
Breathe out the night...
Standing centered in the golden light...

[Chorus: full expressive resonance, soaring backing vocals, warm reverberant field]
Shine in peace, let your spirit glow
Brighter than the quietest waters know
Shine in peace, no need to hurry on
The storm is over and the dark has gone
Shine in peace...

[Outro: single acoustic chords, vocal drifting to an intimate whisper, fading naturally]
Shine in peace...
Quiet in the light...
Peace...`;
  }

  // 5. Suno Pro Tips
  const tips = isInstrumental
    ? [
        "Include '[Instrumental]' at the very top of Suno's lyrics box to strictly suppress artificial humming or vocalizing.",
        "Keep instrument lists sparse: combining too many acoustic instruments triggers Suno's AI to insert a standard pop drumbeat.",
        "Use tactile physical tags like 'pedal noise, room tone, unquantized, no click track' to elicit authentic human realism."
      ]
    : [
        "Use inline bracket tags like '[Verse: whispered vocal, acoustic guitar only]' to control dynamic build and mix density.",
        "If including non-English phrases, place the English translation in parentheses underneath each line so Suno maintains correct lyrical pacing.",
        "Keep style tags under 115 characters—Suno prioritizes the first 4-5 keywords and truncates or ignores excess tags."
      ];

  return {
    title,
    styleTags,
    promptDescription,
    lyrics,
    tips,
    isFallback: true,
    fallbackReason: reason || "Gemini API free-tier quota rate limit reached. Auto-composed with the built-in Harmonic Engine so your creative flow is uninterrupted."
  };
}
