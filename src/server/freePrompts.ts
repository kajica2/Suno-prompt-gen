import type { BreedStylesResult, PromptConfig, PromptResult } from "../types.js";
import type { ProtocolAiResponse } from "../lib/protocolAiEngine.js";
import type { ProtocolId } from "../types/protocols.js";

/**
 * Compact prompts for the free provider, and the normalizers that turn
 * a free-model reply into a shape the app can always render.
 *
 * The Gemini prompts in prompts.ts are long by design - they encode
 * house rules for a strong model. The free model is a 20B reasoning
 * model, and a long prompt makes it slow enough to time out. These
 * prompts are shorter and more direct, which is both faster and a
 * better fit for a small model.
 *
 * The normalizers matter more than the prompts. A free model may omit
 * a key, or invent a shape the app does not expect. Every reply is
 * coerced into the exact type the endpoint promises, so a partial
 * answer still renders instead of crashing the client.
 */

export interface FreePromptPair {
  system: string;
  user: string;
}

// ---------------------------------------------------------------------------
// Generate a Suno prompt suite
// ---------------------------------------------------------------------------

export function buildFreeGeneratePrompt(config: Partial<PromptConfig>): FreePromptPair {
  const system = [
    "You write Suno AI prompts. Reply with ONLY a JSON object - no prose, no markdown, no code fences.",
    "Keys: styleTags (lowercase comma-separated tags, UNDER 115 characters), promptDescription (one evocative sentence), title (a song title), lyrics (lyrics with [Verse]/[Chorus] section tags, 4 to 10 short lines), tips (array of 3 short strings).",
    "The theme is 'Shine in Peace': finding inner light, peace amid motion, quiet healing.",
  ].join("\n");

  const user = [
    `Genre: ${config.genre || "Acoustic Folk"}.`,
    `Mood: ${config.mood || "Peaceful"}.`,
    `Tempo: ${config.tempo || "Slow"}.`,
    `Vocals: ${config.vocalType || "Warm Female Lead"}.`,
    `Instruments: ${config.instruments || "acoustic guitar, violin"}.`,
    `Structure: ${config.structure || "Standard"}.`,
    config.subtheme ? `Theme: ${config.subtheme}.` : "",
    "Write the JSON now.",
  ]
    .filter(Boolean)
    .join(" ");

  return { system, user };
}

/** Coerce a free-model reply into a complete PromptResult. */
export function normalizeFreeGenerate(data: any, config: Partial<PromptConfig>): PromptResult {
  const asString = (v: unknown, fallback: string) =>
    typeof v === "string" && v.trim() ? v.trim() : fallback;

  let styleTags = asString(data?.styleTags, "acoustic folk, peaceful, warm female vocals, slow");
  // The 120-character law is the product's promise; a model that
  // overshoots it would be rejected by Suno, so trim it here.
  if (styleTags.length > 115) styleTags = styleTags.slice(0, 112).replace(/[,\s]+$/, "") + "...";

  const tips = Array.isArray(data?.tips)
    ? data.tips.filter((t: unknown) => typeof t === "string").slice(0, 3).map((t: string) => t)
    : [];

  return {
    title: asString(data?.title, "Shine in Peace"),
    styleTags,
    promptDescription: asString(
      data?.promptDescription,
      "Peaceful acoustic folk around a quiet inner light, close-mic and human.",
    ),
    lyrics: asString(data?.lyrics, "[Intro]\n[Verse]\nA quiet glow inside me wakes.\n\n[Chorus]\nShine in the silence."),
    tips: tips.length ? tips : ["Keep the tempo slow and the room tone audible."],
    negativePrompt: config.negativePrompt?.trim() || undefined,
    engine: "free",
  };
}

// ---------------------------------------------------------------------------
// Breed two styles
// ---------------------------------------------------------------------------

export function buildFreeBreedPrompt(params: {
  parentA: any;
  parentB: any;
  ratio?: number;
  hybridMode?: string;
  targetMeter?: string;
  mutationFactor?: number;
  additionalDesires?: string;
}): FreePromptPair {
  const { parentA, parentB, ratio = 50, hybridMode = "harmonic_fusion", targetMeter, mutationFactor = 25, additionalDesires } = params;

  const system = [
    "You are a sonic geneticist breeding a hybrid music style. Reply with ONLY a JSON object - no prose, no markdown.",
    "Keys: childTitle, hybridName, styleTags (lowercase comma-separated, under 120 characters), promptDescription (one short sentence), tempoDesc, meter, geneticBreakdown (object with inheritedFromA, inheritedFromB, mutations - each a SHORT array of 2 strings).",
    "Keep the whole JSON under 600 characters.",
  ].join("\n");

  const user = [
    `Parent A: ${parentA?.name || "Unknown"} (${parentA?.styleTags || "unknown"}), ${parentA?.instrumentation || "?"}, ${parentA?.tempo || "?"}, ${parentA?.meter || "?"}.`,
    `Parent B: ${parentB?.name || "Unknown"} (${parentB?.styleTags || "unknown"}), ${parentB?.instrumentation || "?"}, ${parentB?.tempo || "?"}, ${parentB?.meter || "?"}.`,
    `Ratio ${ratio}/${100 - ratio}, mode ${hybridMode}, target meter ${targetMeter || "auto"}, mutation ${mutationFactor}.`,
    additionalDesires ? `Extra: ${additionalDesires}.` : "",
    "Write the JSON now.",
  ]
    .filter(Boolean)
    .join(" ");

  return { system, user };
}

/** Coerce a free-model reply into a complete BreedStylesResult. */
export function normalizeFreeBreed(data: any, params: any): Omit<BreedStylesResult, "suggestedConfig"> {
  const asString = (v: unknown, fallback: string) =>
    typeof v === "string" && v.trim() ? v.trim() : fallback;

  const breakdown = data?.geneticBreakdown ?? {};
  const list = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x: unknown) => typeof x === "string").slice(0, 3) : [];

  let styleTags = asString(data?.styleTags, "hybrid fusion, analog warmth, live drums");
  if (styleTags.length > 115) styleTags = styleTags.slice(0, 112).replace(/[,\s]+$/, "") + "...";

  const nameA = params?.parentA?.name || "Parent A";
  const nameB = params?.parentB?.name || "Parent B";
  const negativePrompt = [params?.parentA?.negativePrompt, params?.parentB?.negativePrompt]
    .filter((v: unknown): v is string => typeof v === "string" && v.trim().length > 0)
    .join(", ") || "no generic stock synths";

  return {
    childTitle: asString(data?.childTitle, `${nameA} × ${nameB} Hybrid`),
    hybridName: asString(data?.hybridName, `${nameA} ${nameB} Graft`),
    geneticBreakdown: {
      inheritedFromA: list(breakdown.inheritedFromA).length
        ? list(breakdown.inheritedFromA)
        : [asString(params?.parentA?.styleTags, "parent A lineage")],
      inheritedFromB: list(breakdown.inheritedFromB).length
        ? list(breakdown.inheritedFromB)
        : [asString(params?.parentB?.styleTags, "parent B lineage")],
      mutations: list(breakdown.mutations).length
        ? list(breakdown.mutations)
        : ["analog tape saturation", "shared harmonic vocabulary"],
    },
    styleTags,
    promptDescription: asString(
      data?.promptDescription,
      `A cross-bred hybrid of ${nameA} and ${nameB}, fused rather than layered.`,
    ),
    tempoDesc: asString(data?.tempoDesc, "102 BPM"),
    meter: asString(data?.meter, params?.targetMeter || "4/4"),
    arrangementPrompt: asString(
      data?.arrangementPrompt,
      `[Intro: ${styleTags}] [Groove: hybrid pocket] [Main: both lineages trade lines] [Break: mutation exposed] [Outro: decay]`,
    ),
    negativePrompt,
    tips: [
      `Cross-bred Style: ${asString(data?.childTitle, `${nameA} × ${nameB}`)}`,
      `Lineage: ${params?.ratio ?? 50}% ${nameA} × ${100 - (params?.ratio ?? 50)}% ${nameB}`,
    ],
    engine: "free",
  };
}

// ---------------------------------------------------------------------------
// Protocol dialogue
// ---------------------------------------------------------------------------

export function buildFreeProtocolPrompt(params: {
  protocolId: string;
  userMessage: string;
  context?: any;
}): FreePromptPair {
  const system = [
    "You are a perceptive facilitator. Reply with ONLY a JSON object - no prose, no markdown.",
    "Keys: reply (2-4 sentences, warm and concrete, no platitudes), metrics (object with gradientTension, flowState, somaticAliveness, sovereignty - numbers 0-100, flowState is one of low|healthy-flow|overwhelm), stance (short label), suggestedAction (one concrete small experiment), somaticFocusPrompt (one physical cue).",
  ].join("\n");

  const user = `Protocol: ${params.protocolId}. The person says: "${params.userMessage}".\nWrite the JSON now.`;

  return { system, user };
}

/** Coerce a free-model reply into a complete protocol response. */
export function normalizeFreeProtocol(data: any): ProtocolAiResponse {
  const asString = (v: unknown, fallback: string) =>
    typeof v === "string" && v.trim() ? v.trim() : fallback;

  const num = (v: unknown, fallback: number) => {
    const n = typeof v === "number" ? v : Number(v);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : fallback;
  };

  const flowState = data?.metrics?.flowState;
  const metrics = {
    gradientTension: num(data?.metrics?.gradientTension, 50),
    flowState:
      flowState === "low" || flowState === "overwhelm" || flowState === "healthy-flow"
        ? flowState
        : ("healthy-flow" as const),
    somaticAliveness: num(data?.metrics?.somaticAliveness, 60),
    sovereignty: num(data?.metrics?.sovereignty, 60),
    resonance: num(data?.metrics?.resonance, 50),
    stance: asString(data?.stance, "P1 Stance"),
  };

  return {
    reply: asString(
      data?.reply,
      "Name the thing you are avoiding, without turning it into a problem to solve yet. Then choose one small, concrete step you could take in the next ten minutes.",
    ),
    metrics,
    suggestedAction: asString(
      data?.suggestedAction,
      "Write the hardest next action on one line, then do the first two minutes of it.",
    ),
    somaticFocusPrompt: asString(
      data?.somaticFocusPrompt,
      "Unclench your jaw, drop your shoulders, and let your breath land low in the belly.",
    ),
  } as ProtocolAiResponse;
}
