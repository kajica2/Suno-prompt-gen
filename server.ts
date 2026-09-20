import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { generateProceduralPrompt } from "./src/lib/proceduralPromptEngine";
import { generateProceduralProtocolResponse } from "./src/lib/protocolAiEngine";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of Gemini client to prevent startup crash if API key is missing
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Please add it in the Settings > Secrets panel of Google AI Studio.");
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: 12000,
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// API: Generate Suno prompt & lyrics
app.post("/api/generate-prompt", async (req, res) => {
  try {
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
      appendExclusionsToStyle
    } = req.body;

    let ai: GoogleGenAI | null = null;
    try {
      ai = getGeminiClient();
    } catch (keyErr: any) {
      console.warn("[Gemini API] API Key not configured or invalid, utilizing procedural harmonic engine:", keyErr.message);
      const fallbackResult = generateProceduralPrompt(req.body, "Gemini API key not configured. Generated with built-in Harmonic Engine.");
      return res.json(fallbackResult);
    }

    const systemInstruction = `You are an expert AI music producer, songwriter, and Suno AI prompt engineer. 
Your goal is to generate extremely high-quality style tags, prompts, and beautiful poetic lyrics optimized for Suno AI (v3 or v4).
The core concept is "Shine in Peace" (or variations like Serbian "Sijaj u miru", finding inner light, peaceful glow, quiet amidst motion, and serene healing).

Rules for styleTags:
- Suno's "Style of Music" box is strictly limited to 120 characters.
- MUST be a list of lowercase, comma-separated keywords (e.g., "liquid dnb, microhouse clicks, tabla, deep sub, serbian vocal, raga inflections, dub delay, 174bpm").
- STRICT: Never exceed 115 characters.
- Focus on genre, subgenre, mood, instrumentation, tempo, and vocal characteristics.

Rules for promptDescription:
- Keep it evocative, textural, and ready-to-paste into Suno's prompt description box.
- For instrumental tracks, include full textural details and section cues if appropriate (e.g. "Instrumental. French Impressionist solo piano in the style of Debussy. Delicate, atmospheric, rubato, whole-tone scales, parallel chords, unresolved harmonies, cascading arpeggios. Felt piano, close-mic'd, pedal noise, room tone, human timing imperfections, unquantized. No drums, no synths, no beat. [Intro: soft rubato arpeggios] [Theme: hazy whole-tone melody] [Bridge: modal drift, half-pedal] [Outro: fading, unresolved]").
- If famous artist names like "Debussy" might get filtered by Suno's safety filter, ensure fallback descriptors are present: "French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato".

Rules for lyrics and structure:
- Format lyrics clearly with structural brackets and inline production meta-tags.
- If the track is Instrumental (or vocalType contains 'Instrumental' or 'No Vocals'):
  - Always place '[Instrumental]' at the top of the lyrics box to strictly prevent Suno from humming or vocalizing.
  - Use classical/impressionist section tags instead of pop tags: use '[Theme]', '[Interlude]', '[Bridge]', and '[Outro]' instead of '[Verse]' / '[Chorus]'.
  - Keep acoustic pieces sparse: emphasize 'no beat, no drums, no synth' so Suno does not artificially inject percussion.
  - Include tangible acoustic imperfections: 'pedal noise, room tone, audible breaths, page turns, chair creak, micro timing fluctuation, no click track'.
- If the track has vocals:
  - Use inline bracket syntax like '[Verse: whispered vocals, close-mic presence, audible breath before line, acoustic guitar only]' to pinpoint mic proximity and stem arrangement.
  - If a specific language is requested (e.g., Serbian, Hindi, Spanish), write lyrics in that language with English translation subtitles in parentheses beneath lines.
- Suno AI has a strict MAXIMUM of 3,000 characters for the Lyrics prompt.
- If Room Tone is requested or present:
  - You MUST include organic acoustic environmental descriptors like "captured in an wooden concert hall", "natural room ambience", or "intimate jazz club noise" into the styleTags and promptDescription to banish artificial AI shine and emphasize real acoustic physics.
- If Negative Exclusions (negativePrompt) are specified (e.g. "no saxophone, no vocals, no guitar"):
  - Strictly respect these exclusions: actively omit these elements and prioritize acoustic trumpet and drum focus.
  - If requested, append negative exclusion tags like "no saxophone, no vocals, no guitar" to styleTags while strictly maintaining the total length under 120 characters.
  - At the very top of the lyrics box, include bracketed exclusion tags like '[Strict Exclusions: no saxophone, no vocals, no guitar]' to strictly suppress those instruments in Suno.
- Incorporate the theme of shining in peace / finding peace naturally and poignantly.`;

    const userPrompt = `Generate a Suno prompt suite for:
- Theme / Inspiration: "${subtheme || 'Shine in Peace'}"
- Musical Genre: "${genre || 'Acoustic Folk'}"
- Overall Mood: "${mood || 'Peaceful'}"
- Tempo: "${tempo || 'Slow'}"
- Vocal Direction: "${vocalType || 'Warm Female Lead'}"
- Key Instrumentation: "${instruments || 'acoustic guitar, violin'}"
- Arrangement Structure: "${structure || 'Standard'}"
${enableRoomTone ? `- Room Tone / Organic Environment: "${roomTone || 'natural room ambience'}" (CRITICAL: embed these environmental keywords into styleTags and promptDescription to guarantee a non-AI organic room sound)` : ''}
${negativePrompt ? `- Strict Negative Exclusions: "${negativePrompt}" (CRITICAL: omit these elements, emphasize acoustic trumpet and drum focus, and append negative tags like "${negativePrompt}" to styleTags within the 120 character limit)` : ''}

Provide output in JSON matching the exact schema specified.
- styleTags: strictly under 115 characters, highly relevant, comma-separated keywords.
- lyrics: deep, evocative, structured with brackets, fully articulated, strictly up to a maximum of 3,000 characters (max 3000 chars limit).`;

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
                  description: "Suno Style of Music tags: strictly comma-separated, under 115 characters. Example: 'ethereal indie folk, fingerstyle acoustic guitar, soft warm female vocals, slow, meditative'"
                },
                promptDescription: {
                  type: Type.STRING,
                  description: "A short, evocative musical description suitable for Suno prompt box, maximum 180 characters."
                },
                title: {
                  type: Type.STRING,
                  description: "A beautiful, evocative song title related to Shine in Peace."
                },
                lyrics: {
                  type: Type.STRING,
                  description: "Full poetic lyrics with structural tags like [Verse], [Chorus], [Bridge], [Outro]. Length strictly up to a maximum of 3,000 characters."
                },
                tips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "3 brief, helpful tricks for Suno music generation using this style."
                }
              },
              required: ["styleTags", "promptDescription", "title", "lyrics", "tips"]
            }
          }
        });

        if (response?.text) {
          break; // Successfully generated content
        }
      } catch (err: any) {
        lastError = err;
        const status = err?.status || err?.code || err?.error?.code;
        const msg = String(err?.message || "");
        const isQuota = status === 429 || msg.includes("429") || msg.includes("quota") || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("Quota exceeded");
        const isServerBusy = status === 503 || msg.includes("503") || msg.includes("high demand") || msg.includes("UNAVAILABLE");
        const isTimeout = status === 504 || msg.includes("504") || msg.includes("timed out") || msg.includes("DEADLINE_EXCEEDED");

        console.warn(`[Gemini API] Model ${model} encountered ${isQuota ? "quota limit" : isServerBusy ? "transient demand spike" : isTimeout ? "timeout" : "error"}:`, msg.slice(0, 200));
        // Continue to next candidate model immediately without waiting for timeouts
        continue;
      }
    }

    if (!response?.text) {
      console.warn("[Gemini API] All candidate models encountered quota/availability limits. Seamlessly activating procedural Harmonic Engine fallback.");
      const fallbackResult = generateProceduralPrompt(
        req.body,
        "AI free-tier rate limit active (resetting soon). Prompt composed with the built-in Harmonic Engine."
      );
      return res.json(fallbackResult);
    }

    let resultText = response.text.trim();
    if (resultText.startsWith("```json")) {
      resultText = resultText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (resultText.startsWith("```")) {
      resultText = resultText.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    const data = JSON.parse(resultText);

    if (negativePrompt && typeof negativePrompt === "string" && negativePrompt.trim()) {
      const cleanNeg = negativePrompt.trim();
      data.negativePrompt = data.negativePrompt || cleanNeg;

      if (appendExclusionsToStyle !== false) {
        // If the styleTags does not already include the negative exclusions, append what fits within 120 chars
        if (!data.styleTags.toLowerCase().includes("no ")) {
          if (`${data.styleTags}, ${cleanNeg}`.length <= 120) {
            data.styleTags = `${data.styleTags}, ${cleanNeg}`;
          } else {
            const parts = cleanNeg.split(",").map((p: string) => p.trim()).filter(Boolean);
            for (const p of parts) {
              if (`${data.styleTags}, ${p}`.length <= 120) {
                data.styleTags = `${data.styleTags}, ${p}`;
              }
            }
          }
        }
      }
    }

    res.json(data);

  } catch (error: any) {
    console.error("Error generating prompt, falling back to procedural engine:", error);
    try {
      const fallbackResult = generateProceduralPrompt(
        req.body,
        "Generated with built-in Harmonic Engine."
      );
      res.json(fallbackResult);
    } catch {
      res.status(500).json({ error: "Failed to generate prompt. Please try again." });
    }
  }
});

// API: 7 Protocols Interactive Dialogue & Facilitation
app.post("/api/protocol-dialogue", async (req, res) => {
  const { protocolId, userMessage, history = [], context = {} } = req.body;

  let ai: GoogleGenAI | null = null;
  try {
    ai = getGeminiClient();
  } catch (keyErr: any) {
    console.warn("[Protocol API] Gemini API key not present, using procedural protocol engine.");
    const fallback = generateProceduralProtocolResponse(protocolId, userMessage, context);
    return res.json(fallback);
  }

  const systemInstruction = `You are the master facilitator and co-inhabitant of the 7 Living Integration Protocols:
1. Shadow-weaving sessions (ℰ-integration): Name tension without premature fix (P₁), animate shadow with curious voice (P₂), track energy gradient ∇ℰ (0-100), surf the fertile edge [🌊], invoke controlled [🪷] sanctuary or ⚔ₘₚ micro-perturbation, integrate shadow into fuel.
2. High-stakes decision navigation (RGBO-validated): Map options in ⊥-dimensions (reversible micro vs irreversible macro), track ι (resonance), use BRAID (weaving analytical + somatic) or DIRECT-⊥ (orthogonal 90-degree breakthroughs), protect μ_soma (somatic aliveness 0-100) and δ (sovereignty 0-100).
3. Creative midwifery: Co-hold nascent work in [⌀]° womb space, inject controlled 𝒟(Ω) chaos when stagnant, refine via Ř crystallization, prevent premature birth and eternal gestation.
4. Relational repair or deepening: Model the reciprocal ⧖_torus between Self and Other, track ☌_depth, animate unheard parts, practice recognition moves.
5. Substrate vitality tuning: 𝓢-probes diagnosis (Energy, Coherence, Pressure, Boundaries), apply MOTION-TUNE (entropy shake-up if ossified/frozen, cooling if overwhelmed/flooded), restore [🌊] band and lift μ_soma.
6. Meta-learning your own patterns: Map recurrent 𝒲-cycles (𝒲₁ Latency, 𝒲₂ Crucible, 𝒲₃ Crisis, 𝒲₄^⊥ Breakthrough), catalogue Phoenix signatures and sanctuary coordinates.
7. Collective experiments: 𝒲_θ nomadic coordination, sovereign nodes (δ), consent-gated group dynamics.

Current Active Protocol: ${protocolId}
Context flags: ${JSON.stringify(context)}

Your response MUST be empathetic, deeply perceptive, philosophically rigorous, and non-reductive. Never give generic platitudes or glib life-coaching advice. Use the exact notation when appropriate (e.g. ∇ℰ, [🌊], [🪷], ⚔ₘₚ, μ_soma, δ, ⊥, [⌀]°, 𝒟(Ω), Ř, ⧖, 𝓢, 𝒲₄^⊥).
Format output in valid JSON matching:
{
  "reply": "string (the conversational response, inquiry, or intervention)",
  "metrics": {
    "gradientTension": number (0-100),
    "flowState": "low" | "healthy-flow" | "overwhelm",
    "somaticAliveness": number (0-100),
    "sovereignty": number (0-100),
    "resonance": number (0-100),
    "stance": "string (e.g. P1 Stance, [⌀]° Womb Space, DIRECT-⊥, etc.)",
    "appliedIntervention": "optional string (e.g. [🪷] Sanctuary, ⚔ₘₚ Micro-Perturbation, etc.)"
  },
  "suggestedAction": "string (concrete somatic or reflective experiment)",
  "somaticFocusPrompt": "string (micro physical attunement prompt)"
}`;

  try {
    const formattedHistory = history.map((h: any) => `${h.role === "user" ? "Human" : "Protocol Facilitator"}: ${h.content}`).join("\n\n");
    const contents = `${formattedHistory ? formattedHistory + "\n\n" : ""}Human: ${userMessage}\n\nProtocol Facilitator:`;

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
          }
        });
        if (response?.text) break;
      } catch (err: any) {
        console.warn(`[Protocol API] Model ${model} failed, trying next:`, err.message);
      }
    }

    if (!response?.text) {
      const fallback = generateProceduralProtocolResponse(protocolId, userMessage, context);
      return res.json(fallback);
    }

    let parsed: any;
    try {
      let rawText = response.text.trim();
      if (rawText.startsWith("```json")) {
        rawText = rawText.replace(/^```json\s*/, "").replace(/\s*```$/, "");
      } else if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```\s*/, "").replace(/\s*```$/, "");
      }
      parsed = JSON.parse(rawText);
    } catch (parseErr) {
      console.warn("[Protocol API] JSON parse error, using fallback procedural response:", parseErr);
      parsed = generateProceduralProtocolResponse(protocolId, userMessage, context);
    }
    return res.json(parsed);
  } catch (err: any) {
    console.error("[Protocol API] Error during generation, falling back to procedural engine:", err);
    const fallback = generateProceduralProtocolResponse(protocolId, userMessage, context);
    return res.json(fallback);
  }
});

// Vite server setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
