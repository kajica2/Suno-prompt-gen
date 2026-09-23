import { BreedStylesRequest, BreedStylesResult } from "../types";

export function generateProceduralStyleBreeding(req: BreedStylesRequest): BreedStylesResult {
  const { parentA, parentB, ratio = 50, hybridMode = "harmonic_fusion", targetMeter, mutationFactor = 25, additionalDesires } = req;

  // Split tags and clean
  const cleanTagsA = parentA.styleTags.split(",").map((s) => s.trim()).filter(Boolean);
  const cleanTagsB = parentB.styleTags.split(",").map((s) => s.trim()).filter(Boolean);

  const instA = parentA.instrumentation.split(",").map((s) => s.trim()).filter(Boolean);
  const instB = parentB.instrumentation.split(",").map((s) => s.trim()).filter(Boolean);

  // Blend tags based on ratio
  const countA = Math.max(1, Math.round((cleanTagsA.length * ratio) / 100));
  const countB = Math.max(1, Math.round((cleanTagsB.length * (100 - ratio)) / 100));

  const inheritedA = cleanTagsA.slice(0, countA);
  const inheritedB = cleanTagsB.slice(0, countB);

  // Inherited instruments
  const instCountA = Math.max(1, Math.round((instA.length * ratio) / 100));
  const instCountB = Math.max(1, Math.round((instB.length * (100 - ratio)) / 100));
  const selectedInstA = instA.slice(0, instCountA);
  const selectedInstB = instB.slice(0, instCountB);

  // Creative mutations based on mutationFactor
  const possibleMutations = [
    "analog tape flutter",
    "unquantized human pocket",
    "resonant modal overtones",
    "vintage valve saturation",
    "close-mic room tone",
    "tribal sub-bass pulse",
    "binaural spatial breath",
    "deep tape compression",
    "odd metric cadence",
    "microtonal lyre inflections"
  ];

  const mutationCount = Math.min(3, Math.max(1, Math.round((mutationFactor / 100) * 3)));
  const chosenMutations = possibleMutations.slice(0, mutationCount);

  // Combined title
  const cleanNameA = parentA.name.replace(/#\d+[:.]?\s*/i, "").trim();
  const cleanNameB = parentB.name.replace(/#\d+[:.]?\s*/i, "").trim();

  let hybridTitle = `${cleanNameA} × ${cleanNameB}`;
  if (hybridMode === "harmonic_fusion") hybridTitle = `${cleanNameA} [Harmonic Braid] ${cleanNameB}`;
  if (hybridMode === "rhythmic_crossbreed") hybridTitle = `${cleanNameA} [Polyrhythmic Graft] ${cleanNameB}`;
  if (hybridMode === "polymetric_hybrid") hybridTitle = `${cleanNameA} [Polymeter Fusion] ${cleanNameB}`;

  // Meter determination
  const determinedMeter = targetMeter || parentA.meter || parentB.meter || "7/8 or syncopated odd meter";

  // Build style tags (under 120 chars if possible)
  const combinedInstruments = Array.from(new Set([...selectedInstA, ...selectedInstB])).join(", ");
  const rawTags = Array.from(new Set([...inheritedA, ...inheritedB, ...chosenMutations]));

  let finalStyleTags = rawTags.join(", ");
  if (finalStyleTags.length > 120) {
    finalStyleTags = rawTags.slice(0, 5).join(", ");
  }

  // Negative prompt combination
  const negA = (parentA.negativePrompt || "").split(",").map((s) => s.trim()).filter(Boolean);
  const negB = (parentB.negativePrompt || "").split(",").map((s) => s.trim()).filter(Boolean);
  const combinedNeg = Array.from(
    new Set([
      ...negA,
      ...negB,
      "no vocals",
      "no EDM",
      "no 4/4 straight beat"
    ])
  ).join(", ");

  // Build arrangement prompt
  const introLead = selectedInstA[0] || "shakers";
  const grooveLead = selectedInstB[0] || "upright bass";

  const arrangementPrompt = `[Intro: ${introLead} sets rhythmic ground, tape hiss, room tone, ${determinedMeter} count] [Groove: ${grooveLead} enters with unquantized pulse, hybrid pocket locking ${ratio}% ${cleanNameA} to ${100 - ratio}% ${cleanNameB}] [Main: trading call-and-response between ${combinedInstruments.slice(0, 40)}] [Break: isolated rhythm section transients, analog valve warmth, unquantized] [Outro: tape saturation fade, room ambience into natural silence]`;

  const promptDescription = `A genetically bred hybrid fusing ${ratio}% ${cleanNameA} with ${100 - ratio}% ${cleanNameB}. Mode: ${hybridMode}. Features ${combinedInstruments} in ${determinedMeter} timing.`;

  return {
    childTitle: hybridTitle,
    hybridName: `${cleanNameA} // ${cleanNameB} Graft`,
    geneticBreakdown: {
      inheritedFromA: [...inheritedA.slice(0, 3), ...selectedInstA.slice(0, 2)],
      inheritedFromB: [...inheritedB.slice(0, 3), ...selectedInstB.slice(0, 2)],
      mutations: chosenMutations
    },
    styleTags: finalStyleTags,
    promptDescription,
    tempoDesc: parentA.tempo || parentB.tempo || "102 BPM",
    meter: determinedMeter,
    arrangementPrompt,
    negativePrompt: combinedNeg,
    suggestedConfig: {
      subtheme: `Style Breed: ${hybridTitle}`,
      genre: finalStyleTags,
      mood: `Hybrid Genetic Fusion (${ratio}/${100 - ratio}), Analog Tape Saturation`,
      tempo: parentA.tempo || parentB.tempo || "102 BPM",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: combinedInstruments,
      structure: arrangementPrompt,
      enableRoomTone: true,
      roomTone: "analog tape hiss, close-mic room tone, warm valve compression",
      negativePrompt: combinedNeg,
      appendExclusionsToStyle: true
    },
    tips: [
      `Breeding Ratio: ${ratio}% Parent A (${cleanNameA}) : ${100 - ratio}% Parent B (${cleanNameB}).`,
      `Hybrid Architecture: ${hybridMode.replace("_", " ").toUpperCase()}.`,
      `Genetic Mutations Injected: ${chosenMutations.join(", ")}.`,
      `Negative exclusions combined from both lineages to prevent genre bleed.`
    ],
    isFallback: true
  };
}
