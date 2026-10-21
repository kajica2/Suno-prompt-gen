import { GoogleGenAI } from "@google/genai";

/**
 * The Gemini client, shared by the Express entry point (server.ts) and
 * the Vercel functions (api/*).
 *
 * Lazy on purpose: a missing GEMINI_API_KEY must not crash the process
 * at boot. Every caller treats "no client" as "use the procedural
 * engine" and the app stays usable without an API key.
 */
let aiInstance: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY environment variable is missing. Please add it in the Settings > Secrets panel of Google AI Studio.",
      );
    }
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        timeout: 12000,
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiInstance;
}
