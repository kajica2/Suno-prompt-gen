import { Type } from "@google/genai";
import { generateProceduralPrompt } from "../lib/proceduralPromptEngine";
import { generateProceduralStyleBreeding } from "../lib/styleBreederEngine";
import { generateProceduralProtocolResponse } from "../lib/protocolAiEngine";
import { getGeminiClient } from "./gemini";
import {
  GENERATE_SYSTEM_INSTRUCTION,
  buildBreedPrompt,
  buildGenerateUserPrompt,
  buildProtocolContents,
  buildProtocolSystemInstruction,
} from "./prompts";

/**
 * The three API operations, as plain request-shaped -> response-shaped
 * functions.
 *
 * They are deliberately free of Express and of Vercel types: the same
 * code runs behind the Express server (server.ts, used for local dev
 * and the Google AI Studio export) and behind the Vercel functions
 * (api/*). One implementation, two transports, no drift.
 *
 * Every operation degrades to its procedural engine rather than
 * failing: a missing key, a quota wall or a malformed model reply
 * still returns a usable prompt.
 */

/** Strip a ```json fence from a model reply. */
function stripFence(text: string): string {
  let out = text.trim();
  if (out.startsWith("```json")) {
    out = out.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (out.startsWith("```")) {
    out = out.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return out;
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

  let ai;
  try {
    ai = getGeminiClient();
  } catch (keyErr: any) {
    console.warn(
      "[Gemini API] API Key not configured or invalid, utilizing procedural harmonic engine:",
      keyErr.message,
    );
    return generateProceduralPrompt(
      body,
      "Gemini API key not configured. Generated with built-in Harmonic Engine.",
    );
  }

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
    let lastError: any = null;

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
                  type: "ARRAY",
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
        lastError = err;
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

    if (!response?.text) {
      console.warn(
        "[Gemini API] All candidate models encountered quota/availability limits. Seamlessly activating procedural Harmonic Engine fallback.",
      );
      return generateProceduralPrompt(
        body,
        "AI free-tier rate limit active (resetting soon). Prompt composed with the built-in Harmonic Engine.",
      );
    }

    const data = JSON.parse(stripFence(response.text));

    if (negativePrompt && typeof negativePrompt === "string" && negativePrompt.trim()) {
      const cleanNeg = negativePrompt.trim();
      data.negativePrompt = data.negativePrompt || cleanNeg;

      if (appendExclusionsToStyle !== false) {
        // If the styleTags does not already include the negative exclusions, append what fits within 120 chars
        if (!data.styleTags.toLowerCase().includes("no ")) {
          if (`${data.styleTags}, ${cleanNeg}`.length <= 120) {
            data.styleTags = `${data.styleTags}, ${cleanNeg}`;
          } else {
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
        }
      }
    }

    return data;
  } catch (error: any) {
    console.error("Error generating prompt, falling back to procedural engine:", error);
    try {
      return generateProceduralPrompt(body, "Generated with built-in Harmonic Engine.");
    } catch {
      throw new Error("Failed to generate prompt. Please try again.");
    }
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

  let ai;
  try {
    ai = getGeminiClient();
  } catch (keyErr: any) {
    console.warn("[Breed API] Gemini API key not present, using procedural style breeder engine.");
    return generateProceduralStyleBreeding(body);
  }

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

    // Build suggestedConfig for instant Studio loading
    data.suggestedConfig = {
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
    };

    return data;
  } catch (err: any) {
    console.warn("[Breed API] Failed AI breeding, invoking procedural fallback:", err.message);
    return generateProceduralStyleBreeding(body);
  }
}

/**
 * Run one turn of the 7 Living Integration Protocols dialogue.
 */
export async function handleProtocolDialogue(body: any): Promise<any> {
  const { protocolId, userMessage, history = [], context = {} } = body;

  let ai;
  try {
    ai = getGeminiClient();
  } catch (keyErr: any) {
    console.warn("[Protocol API] Gemini API key not present, using procedural protocol engine.");
    return generateProceduralProtocolResponse(protocolId, userMessage, context);
  }

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

    if (!response?.text) {
      return generateProceduralProtocolResponse(protocolId, userMessage, context);
    }

    let parsed: any;
    try {
      parsed = JSON.parse(stripFence(response.text));
    } catch (parseErr) {
      console.warn("[Protocol API] JSON parse error, using fallback procedural response:", parseErr);
      parsed = generateProceduralProtocolResponse(protocolId, userMessage, context);
    }
    return parsed;
  } catch (err: any) {
    console.error("[Protocol API] Error during generation, falling back to procedural engine:", err);
    return generateProceduralProtocolResponse(protocolId, userMessage, context);
  }
}
