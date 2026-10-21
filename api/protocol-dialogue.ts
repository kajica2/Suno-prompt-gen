import { handleProtocolDialogue } from "../src/server/handlers.js";

/**
 * Vercel serverless function: POST /api/protocol-dialogue
 *
 * The handler is shared with the Express server (server.ts) so both
 * transports produce the same response. Vercel parses the JSON body
 * before the function runs, so `req.body` is already the object.
 */
export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    res.json(await handleProtocolDialogue(req.body ?? {}));
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to run the protocol dialogue. Please try again." });
  }
}
