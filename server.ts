import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import {
  handleBreedStyles,
  handleGeneratePrompt,
  handleProtocolDialogue,
} from "./src/server/handlers";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

/*
 * The API operations themselves live in src/server/handlers.ts so that
 * this Express server and the Vercel functions (api/*) run the SAME
 * code. This file is the transport, not the logic.
 */

// API: Generate Suno prompt & lyrics
app.post("/api/generate-prompt", async (req, res) => {
  try {
    res.json(await handleGeneratePrompt(req.body));
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to generate prompt. Please try again." });
  }
});

// API: Breed New Styles by Combining Existing Styles & Traditions
app.post("/api/breed-styles", async (req, res) => {
  try {
    res.json(await handleBreedStyles(req.body));
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to breed styles. Please try again." });
  }
});

// API: 7 Protocols Interactive Dialogue & Facilitation
app.post("/api/protocol-dialogue", async (req, res) => {
  try {
    res.json(await handleProtocolDialogue(req.body));
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to run the protocol dialogue. Please try again." });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
