/**
 * Model replies arrive as text, not as JSON. A well-behaved model
 * returns bare JSON; a chatty one wraps it in a ```json fence or adds
 * a sentence of preamble. Both shapes are handled here, once, so no
 * provider has to think about it.
 */

/** Remove a ```json fence (or a bare ``` fence) from a model reply. */
export function stripFence(text: string): string {
  let out = text.trim();
  if (out.startsWith("```json")) {
    out = out.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (out.startsWith("```")) {
    out = out.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return out.trim();
}

/**
 * Parse a model reply into an object, or return null.
 *
 * Returns null rather than throwing: a malformed reply is a provider
 * problem, and the caller has a next provider to try.
 */
export function parseJsonReply(text: string): any | null {
  if (!text) return null;
  const cleaned = stripFence(text);

  // Fast path: the whole reply is JSON.
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === "object") return parsed;
  } catch {
    /* fall through to the fenced / embedded scan */
  }

  // The reply is prose with a JSON object somewhere inside it.
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(cleaned.slice(start, end + 1));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
