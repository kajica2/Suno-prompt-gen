export interface FidelityLockProtocol {
  id: string;
  number: number;
  title: string;
  category: "Master Replica" | "Cover Feature" | "Extend Clip" | "Vocal Lock" | "Instrumental Lock" | "Structure Lock" | "Mix Texture" | "Anti-Remix";
  tagline: string;
  promptText: string;
  recommendedSunoFeature: "Upload Audio & Extend" | "Cover Audio" | "Extend Only" | "Stem / Inpainting" | "Universal Audio Upload";
  suggestedAudioInfluence: string; // e.g. "85% - 95%"
  keyExclusions: string;
  characterCount: number;
  bestFor: string;
  proTips: string[];
}

export const FIDELITY_UNIVERSAL_NEGATIVE_PROMPT =
  "no new instruments, no new melodies, no stylistic changes, no genre shifts, no remix, no new harmonies, no added sections, no removed sections, no tempo change, no key change, no auto-tune, no digital polish, no reverb plugins, no EDM, no trap";

export const FIDELITY_LOCK_PROTOCOLS: FidelityLockProtocol[] = [
  {
    id: "absolute-fidelity-lock",
    number: 1,
    title: "Absolute Fidelity Lock",
    category: "Master Replica",
    tagline: "Follow the upload like a strict blueprint and output the closest possible replica.",
    promptText:
      "Use the uploaded audio as the only and definitive reference. Reproduce it as faithfully as possible, with no creative interpretation. Do not change, rewrite, rearrange, replace, add, remove, shorten, extend, or embellish anything. Preserve the exact melody, vocal phrasing, lyrics, breaths, ad-libs, timing, rhythm, groove, tempo, key, tuning, chord progression, bassline, drum pattern, instrumentation, arrangement, song structure, dynamics, mix balance, stereo image, effects, genre, mood, energy, emotional delivery, vocal tone, accent, and atmosphere. Make only the minimum technical changes required for the generation to work. No new sections, no new harmonies, no new instruments, no stylistic changes, no production choices beyond the source. Follow the upload like a strict blueprint and output the closest possible replica.",
    recommendedSunoFeature: "Universal Audio Upload",
    suggestedAudioInfluence: "90% - 95%",
    keyExclusions: "no creative interpretation, no embellishment, no new harmonies, no stylistic changes",
    characterCount: 887,
    bestFor: "Master reference cloning, exact re-renders, and preventing any AI creative liberties.",
    proTips: [
      "Paste into the Style of Music or Description box when initiating generation from an uploaded audio clip.",
      "Pair with Audio Influence set between 90% and 95% in Suno to pin down pitch, groove, and timbral identity.",
      "Ensures zero hallucinations of new bridges, drum breaks, or synth layers."
    ]
  },
  {
    id: "cover-feature-fidelity",
    number: 2,
    title: "Cover Feature Fidelity",
    category: "Cover Feature",
    tagline: "Treat the original clip as master and final authority during cover generation.",
    promptText:
      "Create a cover that stays as close as possible to the uploaded audio reference. Treat the original clip as the master and final authority. Do not alter the melody, lyrics, vocal phrasing, rhythm, tempo, key, chord progression, bassline, drum pattern, instrumentation, arrangement, or song structure. Preserve the same vocal style, vocal tone, emotional delivery, accent, timing, breaths, inflections, and ad-libs. Keep the original genre, mood, energy, dynamics, mix character, stereo image, reverb, and atmosphere. Make only the minimum technical changes required for the cover generation to work. No creative reinterpretation, no added sections, no removed sections, no new harmonies, no production embellishments. Reproduce the uploaded clip as faithfully as the system allows.",
    recommendedSunoFeature: "Cover Audio",
    suggestedAudioInfluence: "85% - 92%",
    keyExclusions: "no creative reinterpretation, no added sections, no removed sections, no production embellishments",
    characterCount: 850,
    bestFor: "Using Suno's 'Cover' feature without allowing it to deviate from the original performance or arrangement.",
    proTips: [
      "Suno's Cover algorithm naturally tries to reinvent the genre; this prompt acts as an iron governor.",
      "Locks the vocal inflections, breaths, and accent identical to the source singer.",
      "Maintains the exact same chord progression, baseline groove, and song structure."
    ]
  },
  {
    id: "seamless-extend-preservation",
    number: 3,
    title: "Seamless Extend Preservation",
    category: "Extend Clip",
    tagline: "Continue the song as if it were always meant to be there with zero sonic seams.",
    promptText:
      "Extend the uploaded clip seamlessly while preserving every musical and performance detail of the original. Continue the song as if it were always meant to be there, without changing the melody, lyrics, vocal phrasing, rhythm, groove, tempo, key, tuning, chord progression, bassline, drum pattern, instrumentation, arrangement, dynamics, mix balance, stereo image, effects, genre, mood, energy, emotional delivery, vocal tone, accent, or atmosphere. Do not rewrite, rearrange, replace, add, remove, or reinterpret anything in the original section. Make only the minimum technical changes required for the extension to function. The new section must match the upload’s style, timing, performance nuances, and sonic texture exactly. No new instruments, no new harmonies, no stylistic shifts, no creative liberties.",
    recommendedSunoFeature: "Extend Only",
    suggestedAudioInfluence: "80% - 90%",
    keyExclusions: "no stylistic shifts, no creative liberties, no new instruments, no new harmonies",
    characterCount: 894,
    bestFor: "Extending clips past the initial generation mark while maintaining seamless continuity in reverb and mix.",
    proTips: [
      "Set your Extend timestamp exactly at the start of the final chord or natural vocal breath.",
      "Matches the room tone, stereo image, and tape hiss/reverb decay of the parent clip perfectly.",
      "Prevents the common Suno bug where extensions suddenly speed up or switch vocalists."
    ]
  },
  {
    id: "vocal-performance-preservation",
    number: 4,
    title: "Vocal Performance Preservation",
    category: "Vocal Lock",
    tagline: "Keep every syllable, breath, pause, inflection, and emotional nuance locked in place.",
    promptText:
      "Preserve the exact vocal performance from the uploaded audio. Keep every lyric, syllable, breath, pause, inflection, accent, ad-lib, and emotional nuance in the same place and with the same delivery. Do not change the vocal tone, vocal gender, range, phrasing, timing, vibrato, rasp, softness, power, or expression. Maintain the original melody and melodic contours exactly. Do not rewrite, rearrange, replace, add, remove, or reinterpret any vocal line. Keep the same relationship between the vocals and the instrumental, including dynamics, mix balance, reverb, delay, and stereo placement. Make only the minimum technical changes required for generation to work. No stylistic reinterpretation, no new vocal layers, no harmonies added, no effects added. Reproduce the uploaded vocal as faithfully as possible.",
    recommendedSunoFeature: "Stem / Inpainting",
    suggestedAudioInfluence: "85% - 95%",
    keyExclusions: "no vocal gender changes, no new vocal layers, no harmonies added, no effects added",
    characterCount: 887,
    bestFor: "Preserving human vocal authenticity, speech inflections, dialect, and breathing cadence.",
    proTips: [
      "Use when the uploaded audio has an irreplaceable vocal take you cannot afford to have morphed.",
      "Guarantees the vocal gender, rasp, chest-voice/head-voice balance, and vibrato remain identical.",
      "Crucial for preserving unquantized micro-timing in vocal deliveries."
    ]
  },
  {
    id: "instrumental-performance-preservation",
    number: 5,
    title: "Instrumental Performance Preservation",
    category: "Instrumental Lock",
    tagline: "Definitive instrumental blueprint: lock rhythm, fills, riffs, bassline, and tuning.",
    promptText:
      "Preserve the exact instrumental performance from the uploaded audio. Keep the same melody, chord progression, bassline, drum pattern, rhythm, groove, timing, tempo, key, tuning, riffs, fills, transitions, and arrangement. Do not alter, replace, add, remove, or reinterpret any instrument or musical part. Maintain the original genre, mood, energy, dynamics, mix balance, stereo image, EQ character, reverb, delay, and atmosphere. Make only the minimum technical changes required for the generation to work. No new instruments, no new sections, no new harmonies, no production embellishments, no creative changes. Treat the uploaded clip as the definitive instrumental blueprint and reproduce it as closely as possible.",
    recommendedSunoFeature: "Universal Audio Upload",
    suggestedAudioInfluence: "85% - 92%",
    keyExclusions: "no new instruments, no new sections, no new harmonies, no production embellishments",
    characterCount: 818,
    bestFor: "Backing tracks, instrumental busking solos, rhythm section tracks, and odd-meter grooves.",
    proTips: [
      "Preserves custom acoustic tuning, modal basslines, and intricate drum pocket nuances.",
      "Forbids Suno from inserting generic synth pads or guitar solos over your acoustic groove.",
      "Ideal for re-rendering 1965 Afro rhythm sections or Mulatu Astatke modal compositions."
    ]
  },
  {
    id: "structure-arrangement-lock",
    number: 6,
    title: "Structure and Arrangement Lock",
    category: "Structure Lock",
    tagline: "Preserve the exact order and length of every intro, verse, chorus, break, and transition.",
    promptText:
      "Keep the song structure and arrangement identical to the uploaded audio. Preserve the exact order and length of every section: intro, verse, pre-chorus, chorus, bridge, instrumental break, outro, and any transitions. Do not add, remove, shorten, extend, rearrange, or replace any section. Maintain the same melody, lyrics, vocal phrasing, rhythm, tempo, key, chord progression, bassline, drum pattern, instrumentation, dynamics, and emotional arc. Keep the original genre, mood, energy, mix balance, stereo image, effects, and atmosphere. Make only the minimum technical changes required for generation to work. No creative reinterpretation, no new parts, no stylistic changes, no production decisions beyond the source. Follow the uploaded clip as the definitive structural reference.",
    recommendedSunoFeature: "Cover Audio",
    suggestedAudioInfluence: "85% - 90%",
    keyExclusions: "no new parts, no stylistic changes, no production decisions beyond source",
    characterCount: 864,
    bestFor: "Fixing bar counts, song form, verse-chorus transitions, and break durations.",
    proTips: [
      "Prevents Suno from inserting an unrequested 30-second EDM drop or repeating a chorus three times.",
      "Locks the structural architecture so that verse 1 is exactly 16 bars and the break is 4 bars.",
      "Pair with explicit timestamp tags like `[Verse 1: 00:00 - 00:24]` in the lyrics field."
    ]
  },
  {
    id: "mix-sonic-texture-preservation",
    number: 7,
    title: "Mix and Sonic Texture Preservation",
    category: "Mix Texture",
    tagline: "Protect EQ balance, compression feel, tape saturation, reverb depth, and loudness.",
    promptText:
      "Preserve the original mix, sonic texture, and production character of the uploaded audio. Keep the same EQ balance, compression feel, reverb, delay, stereo image, panning, loudness, dynamics, and frequency response. Do not change the vocal tone, instrumental tone, drum sound, bass sound, guitar tone, synth texture, or any other sonic element. Maintain the original genre, mood, energy, atmosphere, and emotional delivery. Make only the minimum technical changes required for the generation to work. No creative changes, no stylistic reinterpretation, no added effects, no removed effects, no remixing, no mastering changes beyond what is strictly necessary. Treat the uploaded clip as the final sonic reference and reproduce it as faithfully as possible.",
    recommendedSunoFeature: "Stem / Inpainting",
    suggestedAudioInfluence: "88% - 94%",
    keyExclusions: "no remixing, no mastering changes, no added effects, no removed effects",
    characterCount: 846,
    bestFor: "Preserving analog room ambience, tape saturation, vintage console warmth, and dynamic headroom.",
    proTips: [
      "Crucial for live room recordings (e.g. Abbey Road Studio 2, Van Gelder, stone church acoustics).",
      "Stops Suno's internal limiter from squashing delicate acoustic dynamic range.",
      "Retains the authentic panning separation and stereo image of the original upload."
    ]
  },
  {
    id: "minimal-technical-change-only",
    number: 8,
    title: "Minimal Technical Change Only",
    category: "Master Replica",
    tagline: "Make strictly the minimum computational modifications required for the generation to run.",
    promptText:
      "Treat the uploaded audio as a master reference that must remain virtually unchanged. Make only the minimum technical changes required for Suno to generate the output. Do not change, rewrite, rearrange, replace, add, remove, shorten, extend, or reinterpret anything. Preserve the exact melody, lyrics, vocal phrasing, rhythm, groove, tempo, key, tuning, chord progression, bassline, drum pattern, instrumentation, arrangement, song structure, dynamics, mix balance, stereo image, effects, genre, mood, energy, emotional delivery, vocal tone, accent, and atmosphere. No new sections, no new harmonies, no new instruments, no stylistic changes, no creative liberties. The output should sound as close to the uploaded clip as the system can possibly produce.",
    recommendedSunoFeature: "Universal Audio Upload",
    suggestedAudioInfluence: "92% - 96%",
    keyExclusions: "no creative liberties, no stylistic changes, no new instruments, no new harmonies",
    characterCount: 853,
    bestFor: "Master stem recovery, fidelity audio cleanup, and direct bit-exact model conditioning.",
    proTips: [
      "The phrase 'minimum technical changes required' forces Suno's diffusion model into low-temperature fidelity.",
      "Best choice when re-exporting audio to get higher bitrates without changing the composition.",
      "Audio Influence should be set at maximum stable threshold (92% - 96%)."
    ]
  },
  {
    id: "strict-reproduction-not-remix",
    number: 9,
    title: "Strict Reproduction, Not Remix",
    category: "Anti-Remix",
    tagline: "Explicitly forbids remixing, reimagining, and stylistic modernizations.",
    promptText:
      "This is a strict reproduction task, not a remix, reimagining, cover, or stylistic reinterpretation. Use the uploaded audio as the definitive and only reference. Reproduce it as faithfully as possible. Do not change, rewrite, rearrange, replace, add, remove, shorten, extend, or embellish anything. Preserve the exact melody, vocal phrasing, lyrics, breaths, ad-libs, timing, rhythm, groove, tempo, key, tuning, chord progression, bassline, drum pattern, instrumentation, arrangement, song structure, dynamics, mix balance, stereo image, effects, genre, mood, energy, emotional delivery, vocal tone, accent, and atmosphere. Make only the minimum technical changes required for generation to work. No creative choices, no production embellishments, no new parts. Follow the upload exactly and output the closest possible replica.",
    recommendedSunoFeature: "Cover Audio",
    suggestedAudioInfluence: "88% - 95%",
    keyExclusions: "not a remix, not a reimagining, no creative choices, no production embellishments",
    characterCount: 890,
    bestFor: "Overcoming Suno's bias towards modernizing vintage, folk, jazz, or classical tracks.",
    proTips: [
      "The opening sentence explicitly counters the internal prompt priors that favor pop/EDM remixing.",
      "Maintains vintage acoustic textures without Suno trying to 'enhance' them with sub-bass or 808s.",
      "Protects organic rubato tempo and human performance quirks from being quantized."
    ]
  },
  {
    id: "ultimate-reference-lock",
    number: 10,
    title: "Ultimate Reference Lock",
    category: "Master Replica",
    tagline: "Uploaded clip is the absolute authority for every musical, vocal, structural, and sonic decision.",
    promptText:
      "Use the uploaded clip as the absolute authority for every musical, vocal, structural, and sonic decision. Reproduce it as faithfully as possible with no creative deviation. Do not change, rewrite, rearrange, replace, add, remove, shorten, extend, or reinterpret anything. Preserve the exact melody, lyrics, vocal phrasing, breaths, ad-libs, timing, rhythm, groove, tempo, key, tuning, chord progression, bassline, drum pattern, instrumentation, arrangement, song structure, dynamics, mix balance, stereo image, effects, genre, mood, energy, emotional delivery, vocal tone, accent, and atmosphere. Make only the minimum technical changes required for the generation to work. No new sections, no new harmonies, no new instruments, no stylistic changes, no production choices beyond the source. Treat the upload as the final master and output the closest possible match.",
    recommendedSunoFeature: "Universal Audio Upload",
    suggestedAudioInfluence: "90% - 95%",
    keyExclusions: "no creative deviation, no production choices beyond source, treat as final master",
    characterCount: 887,
    bestFor: "The most authoritative, comprehensive reference lock for high-stakes generation tasks.",
    proTips: [
      "Our most robust all-in-one fidelity prompt. Use this as your standard upload conditioning directive.",
      "Covers all four pillars: melodic/vocal, harmonic/rhythmic, structural, and mix/mastering.",
      "Use in conjunction with 'no new instruments, no auto-tune, no digital polish' negative exclusions."
    ]
  }
];
