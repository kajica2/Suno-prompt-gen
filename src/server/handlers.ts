import { Type } from "@google/genai";
import { generateProceduralPrompt } from "../lib/proceduralPromptEngine.js";
import { generateProceduralStyleBreeding } from "../lib/styleBreederEngine.js";
import { generateProceduralProtocolResponse } from "../lib/protocolAiEngine.js";
import { getGeminiClient } from "./gemini.js";
import { callFreeApi } from "./freeApi.js";
import { parseJsonReply, stripFence } from "./jsonReply.js";
import {
  buildFreeBreedPrompt,
  buildFreeGeneratePrompt,
  buildFreeProtocolPrompt,
  normalizeFreeBreed,
  normalizeFreeGenerate,
  normalizeFreeProtocol,
} from "./freePrompts.js";
import {
  GENERATE_SYSTEM_INSTRUCTION,
  buildBreedPrompt,
  buildGenerateUserPrompt,
  buildProtocolContents,
  buildProtocolSystemInstruction,
} from "./prompts.js";

/**
 * The three API operations, as plain request-shaped -> response-shaped
 * functions.
 *
 * They are deliberately free of Express and of Vercel types: the same
 * code runs behind the Express server (server.ts, used for local dev
 * and the Google AI Studio export) and behind the Vercel functions
 * (api/*). One implementation, two transports, no drift.
 *
 * PROVIDER ORDER
 *
 *   1. Gemini    - only when GEMINI_API_KEY is set and non-empty.
 *   2. Free API  - the keyless tier, always available, costs nothing.
 *   3. Local     - the Harmonic Engine. No network, never fails.
 *
 * The free provider sits in the middle on purpose: it is what makes
 * the app work with no key, no signup and no billing, while a
 * configured Gemini key still gets first pick on quality. The local
 * engine is last because it is the only one that cannot fail.
 */

/**
 * Append the negative prompt to the style tags, respecting Suno's
 * 120-character limit. Shared by the Gemini and free paths so both
 * enforce the same law.
 */
function applyNegativeExclusions(
  data: any,
  negativePrompt: unknown,
  appendExclusionsToStyle: unknown,
): void {
  if (typeof negativePrompt !== "string" || !negativePrompt.trim()) return;
  const cleanNeg = negativePrompt.trim();
  data.negativePrompt = data.negativePrompt || cleanNeg;

  if (appendExclusionsToStyle === false) return;
  if (String(data.styleTags || "").toLowerCase().includes("no ")) return;

  if (`${data.styleTags}, ${cleanNeg}`.length <= 120) {
    data.styleTags = `${data.styleTags}, ${cleanNeg}`;
    return;
  }
  const parts = cleanNeg
    .split(",")
    .map((p: string) => p.trim())
    .filter(Boolean);
  for (const p of parts) {
    if (`${data.styleTags}, ${p}`.length <= 120) {
      data.styleTags = `${data.styleTags}, ${p}`;
    }
  }
}

/**
 * Generate a Suno prompt suite (style tags, description, title, lyrics, tips).
 */
export async function handleGeneratePrompt(body: any): Promise<any> {
  const {
    subtheme,
    genre,
    mood,
    tempo,
    vocalType,
    instruments,
    structure,
    enableRoomTone,
    roomTone,
    negativePrompt,
    appendExclusionsToStyle,
  } = body;

  // 1. Gemini, when a key is configured.
  let ai = null;
  try {
    ai = getGeminiClient();
  } catch {
    // No key: fall through to the free provider.
    ai = null;
  }

  if (ai) {
    try {
      const systemInstruction = GENERATE_SYSTEM_INSTRUCTION;
      const userPrompt = buildGenerateUserPrompt({
        subtheme,
        genre,
        mood,
        tempo,
        vocalType,
        instruments,
        structure,
        enableRoomTone,
        roomTone,
        negativePrompt,
      });

      // Multi-model resilience: prioritize gemini-3.8-flash, then gemini-3.1-flash-lite
      const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
      let response: any = null;

      for (const model of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: userPrompt,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  styleTags: {
                    type: Type.STRING,
                    description:
                      "Suno Style of Music tags: strictly comma-separated, under 115 characters. Example: 'ethereal indie folk, fingerstyle acoustic guitar, soft warm female vocals, slow, meditative'",
                  },
                  promptDescription: {
                    type: Type.STRING,
                    description:
                      "A short, evocative musical description suitable for Suno prompt box, maximum 180 characters.",
                  },
                  title: {
                    type: Type.STRING,
                    description:
                      "A beautiful, evocative song title related to Shine in Peace.",
                  },
                  lyrics: {
                    type: Type.STRING,
                    description:
                      "Full poetic lyrics with structural tags like [Verse], [Chorus], [Bridge], [Outro]. Length strictly up to a maximum of 3,000 characters.",
                  },
                  tips: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description:
                      "3 brief, helpful tricks for Suno music generation using this style.",
                  },
                },
                required: ["styleTags", "promptDescription", "title", "lyrics", "tips"],
              },
            },
          });

          if (response?.text) {
            break; // Successfully generated content
          }
        } catch (err: any) {
          const status = err?.status || err?.code || err?.error?.code;
          const msg = String(err?.message || "");
          const isQuota =
            status === 429 ||
            msg.includes("429") ||
            msg.includes("quota") ||
            msg.includes("RESOURCE_EXHAUSTED") ||
            msg.includes("Quota exceeded");
          const isServerBusy =
            status === 503 || msg.includes("503") || msg.includes("high demand") || msg.includes("UNAVAILABLE");
          const isTimeout =
            status === 504 || msg.includes("504") || msg.includes("timed out") || msg.includes("DEADLINE_EXCEEDED");

          console.warn(
            `[Gemini API] Model ${model} encountered ${isQuota ? "quota limit" : isServerBusy ? "transient demand spike" : isTimeout ? "timeout" : "error"}:`,
            msg.slice(0, 200),
          );
          // Continue to next candidate model immediately without waiting for timeouts
          continue;
        }
      }

      if (response?.text) {
        const data = JSON.parse(stripFence(response.text));
        applyNegativeExclusions(data, negativePrompt, appendExclusionsToStyle);
        data.engine = "gemini";
        return data;
      }

      console.warn(
        "[Gemini API] All candidate models encountered quota/availability limits. Falling back to the free provider.",
      );
    } catch (error: any) {
      console.error("[Gemini API] Error generating prompt, falling back to the free provider:", error);
    }
  }

  // 2. The free, keyless provider.
  try {
    const { system, user } = buildFreeGeneratePrompt(body);
    const raw = await callFreeApi(system, user, { maxTokens: 1200 });
    const data = raw ? parseJsonReply(raw) : null;
    if (data) {
      const result = normalizeFreeGenerate(data, body);
      applyNegativeExclusions(result, negativePrompt, appendExclusionsToStyle);
      return result;
    }
    console.warn("[Free API] No usable reply, falling back to the procedural engine.");
  } catch (error: any) {
    console.error("[Free API] Error generating prompt, falling back to the procedural engine:", error);
  }

  // 3. The local Harmonic Engine. It never fails.
  try {
    const fallback = generateProceduralPrompt(
      body,
      "Generated with built-in Harmonic Engine.",
    );
    return fallback;
  } catch {
    throw new Error("Failed to generate prompt. Please try again.");
  }
}

/**
 * Breed a new hybrid style from two parents.
 */
export async function handleBreedStyles(body: any): Promise<any> {
  const {
    parentA,
    parentB,
    ratio = 50,
    hybridMode = "harmonic_fusion",
    targetMeter,
    mutationFactor = 25,
    additionalDesires,
  } = body;

  const buildSuggestedConfig = (data: any) => ({
    subtheme: `Style Breed: ${data.childTitle}`,
    genre: data.styleTags,
    mood: `Hybrid Genetic Fusion (${ratio}% / ${100 - ratio}%), Analog Saturation`,
    tempo: data.tempoDesc || "100 BPM",
    vocalType: "Instrumental (No Vocals, [Instrumental])",
    instruments: [
      ...(data.geneticBreakdown?.inheritedFromA || []),
      ...(data.geneticBreakdown?.inheritedFromB || []),
    ].join(", "),
    structure: data.arrangementPrompt,
    enableRoomTone: true,
    roomTone: "analog tape hiss, close-mic room tone, warm valve compression",
    negativePrompt: data.negativePrompt,
    appendExclusionsToStyle: true,
  });

  // 1. Gemini, when a key is configured.
  let ai = null;
  try {
    ai = getGeminiClient();
  } catch {
    ai = null;
  }

  if (ai) {
    try {
      const prompt = buildBreedPrompt({
        parentA,
        parentB,
        ratio,
        hybridMode,
        targetMeter,
        mutationFactor,
        additionalDesires,
      });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.75,
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error("Empty response from AI");
      }

      const data = JSON.parse(text);
      data.suggestedConfig = buildSuggestedConfig(data);
      data.engine = "gemini";
      return data;
    } catch (err: any) {
      console.warn("[Breed API] Failed AI breeding, trying the free provider:", err.message);
    }
  }

  // 2. The free, keyless provider.
  try {
    const { system, user } = buildFreeBreedPrompt({
      parentA,
      parentB,
      ratio,
      hybridMode,
      targetMeter,
      mutationFactor,
      additionalDesires,
    });
    const raw = await callFreeApi(system, user, { maxTokens: 700 });
    const data = raw ? parseJsonReply(raw) : null;
    if (data) {
      const result: any = normalizeFreeBreed(data, body);
      result.suggestedConfig = buildSuggestedConfig(result);
      return result;
    }
    console.warn("[Free API] No usable breed reply, falling back to the procedural engine.");
  } catch (error: any) {
    console.error("[Free API] Error breeding styles, falling back to the procedural engine:", error);
  }

  // 3. The local procedural breeder.
  return generateProceduralStyleBreeding(body);
}

/**
 * Run one turn of the 7 Living Integration Protocols dialogue.
 */
export async function handleProtocolDialogue(body: any): Promise<any> {
  const { protocolId, userMessage, history = [], context = {} } = body;

  // 1. Gemini, when a key is configured.
  let ai = null;
  try {
    ai = getGeminiClient();
  } catch {
    ai = null;
  }

  if (ai) {
    const systemInstruction = buildProtocolSystemInstruction(protocolId, context);
    try {
      const contents = buildProtocolContents(history, userMessage);

      const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite"];
      let response: any = null;

      for (const model of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model,
            contents,
            config: {
              systemInstruction,
              responseMimeType: "application/json",
              temperature: 0.75,
            },
          });
          if (response?.text) break;
        } catch (err: any) {
          console.warn(`[Protocol API] Model ${model} failed, trying next:`, err.message);
        }
      }

      if (response?.text) {
        const parsed = parseJsonReply(response.text);
        if (parsed) return { ...parsed, engine: "gemini" };
        console.warn("[Protocol API] JSON parse error, trying the free provider.");
      }
    } catch (err: any) {
      console.error("[Protocol API] Error during generation, trying the free provider:", err);
    }
  }

  // 2. The free, keyless provider.
  try {
    const { system, user } = buildFreeProtocolPrompt({ protocolId, userMessage, context });
    const raw = await callFreeApi(system, user, { maxTokens: 1000 });
    const data = raw ? parseJsonReply(raw) : null;
    if (data) {
      return { ...normalizeFreeProtocol(data), engine: "free" };
    }
    console.warn("[Free API] No usable protocol reply, falling back to the procedural engine.");
  } catch (error: any) {
    console.error("[Free API] Error during protocol generation, falling back to the procedural engine:", error);
  }

  // 3. The local procedural facilitator.
  return generateProceduralProtocolResponse(protocolId, userMessage, context);
}
