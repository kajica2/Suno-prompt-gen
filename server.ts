import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

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
    } = req.body;

    const ai = getGeminiClient();

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
- Incorporate the theme of shining in peace / finding peace naturally and poignantly.`;

    const userPrompt = `Generate a Suno prompt suite for:
- Theme / Inspiration: "${subtheme || 'Shine in Peace'}"
- Musical Genre: "${genre || 'Acoustic Folk'}"
- Overall Mood: "${mood || 'Peaceful'}"
- Tempo: "${tempo || 'Slow'}"
- Vocal Direction: "${vocalType || 'Warm Female Lead'}"
- Key Instrumentation: "${instruments || 'acoustic guitar, violin'}"
- Arrangement Structure: "${structure || 'Standard'}"

Provide output in JSON matching the exact schema specified.
- styleTags: strictly under 115 characters, highly relevant, comma-separated keywords.
- lyrics: deep, evocative, structured with brackets, fully articulated, strictly up to a maximum of 3,000 characters (max 3000 chars limit).`;

    // Multi-model resilience: primary model with fast lightweight fallbacks if 503/demand spikes occur
    const candidateModels = ["gemini-3.8-flash", "gemini-3.1-flash-lite", "gemini-2.5-flash"];
    let response: any = null;
    let lastError: any = null;

    for (const model of candidateModels) {
      for (let attempt = 1; attempt <= 2; attempt++) {
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
          const msg = err?.message || "";
          const isTransient = status === 503 || status === 429 || msg.includes("503") || msg.includes("high demand") || msg.includes("UNAVAILABLE") || msg.includes("RESOURCE_EXHAUSTED");

          console.warn(`[Gemini API] Model ${model} attempt ${attempt} encountered ${isTransient ? "transient demand spike" : "error"}:`, msg);

          if (isTransient && attempt < 2) {
            // Short backoff before retrying this model
            await new Promise((resolve) => setTimeout(resolve, 1000));
            continue;
          }
          // Move to next candidate model
          break;
        }
      }

      if (response?.text) {
        break;
      }
    }

    if (!response?.text) {
      const errMsg = lastError?.message || "";
      if (errMsg.includes("503") || errMsg.includes("high demand") || errMsg.includes("UNAVAILABLE")) {
        throw new Error("The AI model is experiencing high demand right now. Please wait a moment and try again.");
      }
      throw lastError || new Error("Failed to generate prompt from AI service.");
    }

    const resultText = response.text;
    const data = JSON.parse(resultText);
    res.json(data);

  } catch (error: any) {
    console.error("Error generating prompt:", error);
    let friendlyMessage = error?.message || "Failed to generate prompt";
    try {
      // Check if message is a serialized JSON error from the API client
      if (friendlyMessage.includes("{") && friendlyMessage.includes("message")) {
        const jsonMatch = friendlyMessage.match(/\{.*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed?.error?.message) {
            friendlyMessage = parsed.error.message;
          }
        }
      }
    } catch {
      // Keep original friendlyMessage
    }
    res.status(500).json({ error: friendlyMessage });
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
