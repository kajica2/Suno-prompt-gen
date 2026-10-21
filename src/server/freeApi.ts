/**
 * The free, keyless text API.
 *
 * Pollinations serves an OpenAI-compatible chat endpoint on an
 * "anonymous" tier: no API key, no signup, no billing, no quota to
 * configure. That makes it the app's default AI provider - the app
 * works the moment it is deployed, with nothing to set up.
 *
 * It is a shared public service, so it is treated as best-effort:
 * every failure returns null and the caller moves on to the next
 * provider. The last provider in the chain is the local Harmonic
 * Engine, which never fails and never touches the network.
 *
 * Latency is the other constraint. The free model is a 20B reasoning
 * model, so a long system prompt and a long requested output get slow
 * (the shipped Gemini prompt is ~4.4 kB and asks for 3,000 characters
 * of lyrics; that took over two minutes). The prompts in freePrompts.ts
 * are therefore deliberately compact, and TIMEOUT_MS is a hard ceiling.
 */

/** OpenAI-compatible endpoint on the anonymous (keyless) tier. */
const ENDPOINT = "https://text.pollinations.ai/openai";

/** The one model on the free tier. */
const MODEL = "openai-fast";

/** Hard ceiling on a single call. Past this the request is abandoned. */
const TIMEOUT_MS = 20_000;

/** How the provider is named in the UI. */
export const FREE_ENGINE_LABEL = "Free AI";

export interface FreeApiOptions {
  /** Upper bound on the reply length. Smaller is faster. */
  maxTokens?: number;
  /** Aborts the request early. Defaults to the module ceiling. */
  timeoutMs?: number;
}

/**
 * Ask the free API for a JSON reply.
 *
 * Returns the raw reply text on success and null on ANY failure -
 * network, timeout, non-2xx, empty body, or a reply that is not a
 * string. The caller never has to distinguish those cases: there is
 * always another provider behind it.
 */
export async function callFreeApi(
  system: string,
  user: string,
  options: FreeApiOptions = {},
): Promise<string | null> {
  const { maxTokens = 1200, timeoutMs = TIMEOUT_MS } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        response_format: { type: "json_object" },
        max_tokens: maxTokens,
        // The free model reasons before it answers. Left at the default
        // it spends the whole token budget thinking and returns an
        // empty body; "low" keeps the reasoning short.
        reasoning_effort: "low",
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;
    const data: any = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) return null;
    return content;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
