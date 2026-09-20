import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Volume2,
  ShieldCheck,
  Disc,
  Search,
  Flame,
  Radio,
  ExternalLink,
  Layers,
  Heart,
  Music,
  Compass,
  Mic2
} from "lucide-react";
import {
  BAMBAM_PROMPTS,
  BAMBAM_SUITE_TIPS,
  BamBamPrompt
} from "../data/bambamPrompts";
import { ROOM_TONE_OPTIONS } from "../data/buskingPrompts";
import { PromptConfig, PromptResult } from "../types";

interface BamBamSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function BamBamSuite({ onApplyToStudio, onSwitchToStudio }: BamBamSuiteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [enableRoomTone, setEnableRoomTone] = useState(true);
  const [selectedRoomTone, setSelectedRoomTone] = useState<string>("natural room ambience");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedTagsId, setCopiedTagsId] = useState<string | null>(null);
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedTipsGuide, setCopiedTipsGuide] = useState(false);
  const [showFullMarkdown, setShowFullMarkdown] = useState(false);
  const [copiedFullMarkdown, setCopiedFullMarkdown] = useState(false);

  // Computes effective prompt text with room tone if enabled
  const getEffectivePromptText = (prompt: BamBamPrompt) => {
    if (!enableRoomTone) return prompt.promptText;
    return `${prompt.promptText} Room tone: ${selectedRoomTone}.`;
  };

  // Computes effective style tags with room tone if enabled
  const getEffectiveStyleTags = (prompt: BamBamPrompt) => {
    if (!enableRoomTone) return prompt.styleTags;
    const shortRoom = selectedRoomTone.split(",")[0].trim();
    const combined = `${prompt.styleTags}, ${shortRoom}`;
    return combined.length > 120 ? combined.slice(0, 118) : combined;
  };

  const copyToClipboard = (text: string, id: string, type: "prompt" | "tags" | "style" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "prompt") {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } else if (type === "tags") {
      setCopiedTagsId(id);
      setTimeout(() => setCopiedTagsId(null), 2000);
    } else if (type === "style") {
      setCopiedStyleId(id);
      setTimeout(() => setCopiedStyleId(null), 2000);
    } else if (type === "all") {
      setCopiedAllId(id);
      setTimeout(() => setCopiedAllId(null), 2000);
    }
  };

  const handleApply = (prompt: BamBamPrompt) => {
    const effectivePrompt = getEffectivePromptText(prompt);
    const effectiveStyle = getEffectiveStyleTags(prompt);

    const config: PromptConfig = {
      subtheme: `Bam Bam Kolektiv (#${prompt.number} ${prompt.title})`,
      genre: prompt.genreFusion,
      mood: "Ritual, Tribal Sub-Bass & Acoustic Trumpet",
      tempo: `${prompt.bpm} BPM, ${prompt.meter} Human Pocket`,
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: `acoustic trumpet, ${prompt.styleTags}`,
      structure: prompt.tags.join(" "),
      enableRoomTone: enableRoomTone,
      roomTone: selectedRoomTone
    };

    const result: PromptResult = {
      title: `${prompt.number}. ${prompt.title} (Bam Bam Kolektiv)`,
      styleTags: effectiveStyle,
      promptDescription: effectivePrompt,
      lyrics: prompt.tags.join(" ") + `\n\n[Instrumental]\n[Trumpet Lead: ${prompt.trumpetRole}]\n[Exclusions: no vocals, no pop, no EDM drop, no autotune, no quantized]`,
      tips: [
        "Audio Influence: Set between 70% and 85% in Suno when using a reference live drum loop.",
        `Trumpet role: ${prompt.trumpetRole}`,
        "Negative prompt: no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune.",
        `Room tone enabled: ${enableRoomTone ? selectedRoomTone : "Off"}`
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const filteredPrompts = BAMBAM_PROMPTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.originalSerbianTitle.toLowerCase().includes(q) ||
      p.focus.toLowerCase().includes(q) ||
      p.genreFusion.toLowerCase().includes(q) ||
      p.promptText.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const generateFullMarkdown = () => {
    return `# Bam Bam Kolektiv (United Arts Healing Jamm) — 10 Tribal Bass & Acoustic Trumpet Prompts

${BAMBAM_PROMPTS.map((p) => {
  const pText = getEffectivePromptText(p);
  const tagsText = p.tags.join(" ");
  return `### ${p.number}. ${p.title}
*Original Focus: ${p.originalSerbianFocus}*
*English Focus: ${p.focus}*

\`\`\`text
${pText}
\`\`\`
**Tags:** \`${tagsText}\`
**Style of Music (120 chars):** \`${getEffectiveStyleTags(p)}\`
**Acoustic Trumpet Role:** ${p.trumpetRole}
`;
}).join("\n---\n\n")}

### Tips for Using Audio Influence (70%–85%) with Bam Bam Kolektiv:
1. Audio Influence: Set between 70% and 85% when pairing with a live drum reference loop or djembe recording.
2. Negative Exclusions: Always add "no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune".
3. Organic Realism: Include keywords like "close-mic, room tone, human timing, tape saturation, analog hiss, unquantized".
4. Filter Bypass: If Suno filters 'tribal' or 'raga', substitute with "communal drumming, primal rhythm, Indian classical modal inflections".
5. Ecstatic Dance Structure: Use [Gentle Start] [Build] [Ecstatic Peak] [Soft Landing] for authentic dance wave dynamics.
6. Trumpet Headroom: Keep mid-range synth pads out so the live acoustic trumpet commands the sonic space above the heavy sub bass.`;
  };

  const handleCopyFullMarkdown = () => {
    navigator.clipboard.writeText(generateFullMarkdown());
    setCopiedFullMarkdown(true);
    setTimeout(() => setCopiedFullMarkdown(false), 2200);
  };

  const handleCopyTipsGuide = () => {
    const guideText = `Bam Bam Kolektiv (United Arts Healing Jamm) — Tips & Best Practices:
1. Audio Influence (70–85%): Set to 70–85% alongside your live drumming or tribal bass reference.
2. Negative Prompt: no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune.
3. Anti-AI Organic Sound: close-mic, room tone, human timing, tape saturation, analog hiss, unquantized.
4. Filter Workarounds: If "tribal" or "raga" gets flagged, use "communal drumming, primal rhythm, Indian classical modal inflections".
5. Ecstatic Dance Wave: [Gentle Start] [Build] [Ecstatic Peak] [Soft Landing].
6. Trumpet Lead: Keep mid synths clear so acoustic horn solos ride cleanly above heavy sub-bass.`;
    navigator.clipboard.writeText(guideText);
    setCopiedTipsGuide(true);
    setTimeout(() => setCopiedTipsGuide(false), 2200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900/90 via-stone-950 to-orange-950/20 border border-orange-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Bam Bam Kolektiv · United Arts Healing Jamm</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Audio Influence 70–85%
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[11px] flex items-center gap-1">
                <Mic2 className="w-3 h-3 text-amber-400" />
                Acoustic Trumpet Lead & Solo
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[11px]">
                Ecstatic Dance & Sound Healing
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Bam Bam Kolektiv: Tribal Bass & Acoustic Trumpet Suite
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              10 translated and trumpet-infused Suno variations embodying the musical identity of <strong className="text-orange-300 font-medium">Bam Bam Kolektiv (United Arts Healing Jamm)</strong>. Fusing ritual tribal drumming, heavy sub-bass frequencies (reggae, dub, dubstep, liquid drum & bass, trance), and sound healing with <strong className="text-white font-medium">live acoustic trumpet improvisation</strong> and zero synthetic AI gloss.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={handleCopyTipsGuide}
              className="px-3.5 py-2 rounded-xl bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              {copiedTipsGuide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTipsGuide ? "Guide Copied!" : "Copy Jamm Tips Guide"}</span>
            </button>

            <button
              onClick={() => setShowFullMarkdown(!showFullMarkdown)}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{showFullMarkdown ? "Hide Markdown" : "View Full Markdown"}</span>
            </button>
          </div>
        </div>

        {/* Global Room Tone & Ambience Controller */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-all ${
              enableRoomTone ? "bg-orange-500/20 text-orange-300 border border-orange-500/40" : "bg-stone-800 text-stone-500"
            }`}>
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white">Room Tone & Organic Ambience Injection</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                  Anti-AI Acoustic
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                Automatically injects natural acoustic room noise into all 10 Bam Bam prompts for organic timbre.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setEnableRoomTone(!enableRoomTone)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                enableRoomTone
                  ? "bg-orange-500 text-stone-950 border-orange-400 font-bold"
                  : "bg-stone-800 text-stone-400 border-stone-700"
              }`}
            >
              {enableRoomTone ? "Room Tone: ON" : "Room Tone: OFF"}
            </button>

            {enableRoomTone && (
              <select
                value={selectedRoomTone}
                onChange={(e) => setSelectedRoomTone(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-stone-900 border border-white/15 text-xs text-orange-300 font-mono focus:outline-none focus:border-orange-500/50 cursor-pointer"
              >
                <option value="natural room ambience">Natural Room Ambience</option>
                <option value="intimate jazz club noise">Intimate Jazz Club Noise</option>
                <option value="captured in an wooden concert hall">Captured in an Wooden Concert Hall</option>
                <option value="live studio bleed and acoustic room reflections">Live Studio Bleed & Room Reflections</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Bam Bam Kolektiv Guide & Tips */}
      <div className="p-5 rounded-2xl bg-orange-500/5 border border-orange-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Best Practices & Guidance: Bam Bam Kolektiv (United Arts Healing Jamm)
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                Translated from original notes to maximize organic acoustic timbre and ecstatic dance arc.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-orange-300 font-bold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
            Audio Influence: 70% – 85%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BAMBAM_SUITE_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-stone-900/70 border border-white/5 space-y-1.5 hover:border-orange-500/20 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-semibold text-white leading-tight">
                  {tip.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-300 font-light leading-relaxed pl-7">
                {tip.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Negative Exclusions Strip */}
        <div className="p-3 rounded-xl bg-black/40 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">
              Mandatory Negative Exclusions (Suno Exclude Field):
            </span>
            <p className="text-xs font-mono text-red-200/90">
              no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("no vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune");
            }}
            className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-mono shrink-0 transition-colors cursor-pointer"
          >
            Copy Exclusions
          </button>
        </div>
      </div>

      {/* Full Markdown Drawer */}
      {showFullMarkdown && (
        <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">
              Complete English & Trumpet Markdown (All 10 Variations + Guide)
            </span>
            <button
              onClick={handleCopyFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedFullMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFullMarkdown ? "Copied Markdown!" : "Copy Full Markdown"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-stone-900/90 border border-white/5 text-stone-300 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-96">
            {generateFullMarkdown()}
          </pre>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Bam Bam prompts (e.g., 'dnb', 'ecstatic', 'healing', 'trance', 'djembe', 'flugelhorn', 'raga')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-orange-500/50 font-mono"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-3 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-mono hover:bg-stone-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* 10 Variations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredPrompts.map((prompt) => {
          const effectivePrompt = getEffectivePromptText(prompt);
          const effectiveStyle = getEffectiveStyleTags(prompt);

          return (
            <div
              key={prompt.id}
              className="p-5 sm:p-6 rounded-2xl bg-stone-900/70 border border-white/10 hover:border-orange-500/30 transition-all flex flex-col justify-between space-y-4 shadow-lg group relative overflow-hidden"
            >
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/10 transition-all" />

              <div className="space-y-3 relative z-10">
                {/* Header Badge & Title */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-300 font-mono text-xs font-bold flex items-center justify-center border border-orange-500/30">
                        {prompt.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                        {prompt.bpm} BPM · {prompt.meter} · Bam Bam
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-white tracking-wide">
                      {prompt.title}
                    </h3>
                    <div className="text-[11px] text-stone-400/80 italic font-sans mt-0.5">
                      Orig: {prompt.originalSerbianFocus}
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-stone-800 text-[10px] font-mono text-orange-300/90 font-medium shrink-0">
                    Healing Jamm
                  </span>
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {prompt.focus}
                </p>

                {/* Acoustic Trumpet Lead Highlight */}
                <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 space-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-orange-300 font-semibold">
                    <Mic2 className="w-3 h-3 text-orange-400" />
                    <span>Acoustic Trumpet Lead & Presence:</span>
                  </div>
                  <p className="text-xs text-amber-200/90 font-light leading-relaxed">
                    {prompt.trumpetRole}
                  </p>
                </div>

                {/* Prompt Text Box (Exact Suno Prompt with Trumpet) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Suno Prompt Description (Text)</span>
                    <button
                      onClick={() => copyToClipboard(effectivePrompt, prompt.id, "prompt")}
                      className="text-orange-300 hover:text-orange-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPromptId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs leading-relaxed select-all">
                    {effectivePrompt}
                  </div>
                </div>

                {/* Tags / Structure for Lyrics Box */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Lyrics Box Tags (Wave Structure)</span>
                    <button
                      onClick={() => copyToClipboard(prompt.tags.join(" "), prompt.id, "tags")}
                      className="text-orange-300 hover:text-orange-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedTagsId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Tags</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-stone-950/80 border border-stone-800">
                    {prompt.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-orange-300 font-mono text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Style of Music Box (<= 120 chars) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Style of Music Box ({effectiveStyle.length}/120 chars)</span>
                    <button
                      onClick={() => copyToClipboard(effectiveStyle, prompt.id, "style")}
                      className="text-orange-300 hover:text-orange-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedStyleId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Style</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-orange-200/90 font-mono text-xs truncate select-all">
                    {effectiveStyle}
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-semibold">
                    Acoustic Elements & Ritual Dynamics:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-0.5">
                    {prompt.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5 font-light">
                        <span className="w-1 h-1 rounded-full bg-orange-400/80 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
                <button
                  onClick={() => {
                    const bundle = `${prompt.title} (Bam Bam Kolektiv)\n\n[PROMPT DESCRIPTION]\n${effectivePrompt}\n\n[STYLE TAGS]\n${effectiveStyle}\n\n[LYRICS BOX TAGS]\n${prompt.tags.join(" ")}\n\n[EXCLUSIONS / NEGATIVE PROMPT]\nno vocals, no voice, no singing, no pop, no EDM drop, no quantized, no autotune`;
                    copyToClipboard(bundle, prompt.id, "all");
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAllId === prompt.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAllId === prompt.id ? "Bundle Copied!" : "Copy Full Bundle"}</span>
                </button>

                <button
                  onClick={() => handleApply(prompt)}
                  className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-orange-500/20"
                >
                  <span>Apply to Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
