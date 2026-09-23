import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Disc,
  Search,
  Music,
  Info,
  Ban,
  Layers,
  BookOpen,
  Volume2,
  ShieldAlert,
  Flame,
  Radio
} from "lucide-react";
import {
  AFRO_1965_PROMPTS,
  AFRO_1965_HARD_PREFIX,
  AFRO_1965_NEGATIVE_PROMPT,
  AfroRhythmPrompt
} from "../data/afro1965Prompts";
import { PromptConfig, PromptResult } from "../types";

interface Afro1965SuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function Afro1965Suite({ onApplyToStudio, onSwitchToStudio }: Afro1965SuiteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [useReinforcedPrefix, setUseReinforcedPrefix] = useState(false);
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);
  const [copiedNegativeId, setCopiedNegativeId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedGlobalNegative, setCopiedGlobalNegative] = useState(false);
  const [copiedGlobalPrefix, setCopiedGlobalPrefix] = useState(false);
  const [copiedFullMarkdown, setCopiedFullMarkdown] = useState(false);
  const [showFullMarkdown, setShowFullMarkdown] = useState(false);

  const copyToClipboard = (text: string, id: string, type: "style" | "lyrics" | "negative" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "style") {
      setCopiedStyleId(id);
      setTimeout(() => setCopiedStyleId(null), 2000);
    } else if (type === "lyrics") {
      setCopiedLyricsId(id);
      setTimeout(() => setCopiedLyricsId(null), 2000);
    } else if (type === "negative") {
      setCopiedNegativeId(id);
      setTimeout(() => setCopiedNegativeId(null), 2000);
    } else if (type === "all") {
      setCopiedAllId(id);
      setTimeout(() => setCopiedAllId(null), 2000);
    }
  };

  const copyGlobalNegative = () => {
    navigator.clipboard.writeText(AFRO_1965_NEGATIVE_PROMPT);
    setCopiedGlobalNegative(true);
    setTimeout(() => setCopiedGlobalNegative(false), 2000);
  };

  const copyGlobalPrefix = () => {
    navigator.clipboard.writeText(AFRO_1965_HARD_PREFIX);
    setCopiedGlobalPrefix(true);
    setTimeout(() => setCopiedGlobalPrefix(false), 2000);
  };

  const handleApply = (prompt: AfroRhythmPrompt) => {
    const activeStyle = useReinforcedPrefix
      ? prompt.reinforcedPrefixStylePrompt
      : prompt.stylePrompt;

    const config: PromptConfig = {
      subtheme: `1965 Afro Rhythm Section (#${prompt.number} ${prompt.title})`,
      genre: `${prompt.genre}, Vintage Mono, Live One-Take`,
      mood: "Unquantized Human Timing, Valve Compression, Room Tone",
      tempo: prompt.tempo,
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: prompt.instrumentation.join(", "),
      structure: prompt.arrangementLyricsPrompt,
      enableRoomTone: true,
      roomTone: "vintage mono analog tape hiss, room tone, valve compression",
      negativePrompt: prompt.negativePrompt,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${prompt.number}. ${prompt.title} (1965 Rhythm Section Only)`,
      styleTags: activeStyle.length <= 120 ? activeStyle : prompt.compactStyleTags,
      promptDescription: activeStyle,
      lyrics: prompt.arrangementLyricsPrompt,
      negativePrompt: prompt.negativePrompt,
      tips: [
        ...prompt.tips,
        `Hard Prefix rule: ${AFRO_1965_HARD_PREFIX}`,
        `Region: ${prompt.region}`,
        `Negative exclusions: ${prompt.negativePrompt}`
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const filteredPrompts = AFRO_1965_PROMPTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.genre.toLowerCase().includes(q) ||
      p.stylePrompt.toLowerCase().includes(q) ||
      p.arrangementLyricsPrompt.toLowerCase().includes(q) ||
      p.instrumentation.some((inst) => inst.toLowerCase().includes(q))
    );
  });

  const generateFullMarkdown = () => {
    return AFRO_1965_PROMPTS.map((p) => {
      const activeStyle = useReinforcedPrefix
        ? p.reinforcedPrefixStylePrompt
        : p.stylePrompt;

      return `### ${p.number}. ${p.title} (${p.region} · 1965 Rhythm Section Only)
**Genre:** ${p.genre}
**Tempo:** ${p.tempo}

**Style Prompt:**
\`\`\`
${activeStyle}
\`\`\`

**Lyrics / Arrangement Prompt:**
\`\`\`
${p.arrangementLyricsPrompt}
\`\`\`

**Negative Prompt (Exclude Styles):**
\`\`\`
${p.negativePrompt}
\`\`\`

**Instrumentation:**
${p.instrumentation.map((i) => `- ${i}`).join("\n")}

**Production Characteristics:**
${p.productionTraits.map((t) => `- ${t}`).join("\n")}
`;
    }).join("\n---\n\n");
  };

  const handleCopyFullMarkdown = () => {
    navigator.clipboard.writeText(generateFullMarkdown());
    setCopiedFullMarkdown(true);
    setTimeout(() => setCopiedFullMarkdown(false), 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-amber-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-yellow-400" />
                1965 Afro Styles · Pure Rhythm Section Only
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-mono font-semibold">
                No Horns · No Trumpet · No Sax · No Lead Melody
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                5 Historical Sessions
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white font-medium">
              1965 Afro Rhythm Section Prompts
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
              5 authentic 1965 vintage mono live-session prompts designed purely for backing rhythm sections—featuring upright bass, talking drums, congas, shekere, timbales, piano montunos, krar, and organ comping with unquantized human timing, tape saturation, and room tone.
            </p>
          </div>

          {/* Quick Actions & Controls */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={copyGlobalPrefix}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/40 text-yellow-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow-lg hover:shadow-yellow-500/10"
              title="Copy the strict anti-horn style prefix rule"
            >
              <ShieldAlert className="w-4 h-4 text-yellow-400" />
              <span>{copiedGlobalPrefix ? "Copied Strict Prefix!" : "Copy Anti-Horn Prefix"}</span>
              {copiedGlobalPrefix ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3.5 h-3.5 ml-1" />}
            </button>

            <button
              onClick={copyGlobalNegative}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow-lg hover:shadow-rose-500/10"
              title="Copy the full negative exclusion string for Suno"
            >
              <Ban className="w-4 h-4 text-rose-400" />
              <span>{copiedGlobalNegative ? "Copied Exclusions!" : "Copy Exclude Styles"}</span>
              {copiedGlobalNegative ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3.5 h-3.5 ml-1" />}
            </button>

            <button
              onClick={handleCopyFullMarkdown}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-yellow-500/20"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedFullMarkdown ? "Copied 5 Tracks!" : "Copy All 5 Prompts"}</span>
              {copiedFullMarkdown && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Global Reinforcement Banner & Toggle */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono bg-stone-950/80 p-4 rounded-2xl border border-yellow-500/30">
          <div className="flex items-start md:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center shrink-0 text-yellow-300">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-yellow-300 font-bold">Strict Anti-Horn Start Rule:</span>
                <span className="text-stone-300 font-mono text-[11px] bg-stone-900 px-2 py-0.5 rounded border border-white/10">
                  "{AFRO_1965_HARD_PREFIX}"
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                If Suno AI still adds horns, placing this rule at the very beginning of the Style of Music prompt forces the AI transformer to allocate 100% of its generation capacity solely to the rhythm section.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
            <label className="flex items-center gap-2 cursor-pointer bg-stone-900 px-3 py-2 rounded-xl border border-white/10 hover:border-yellow-500/40 transition-colors">
              <input
                type="checkbox"
                checked={useReinforcedPrefix}
                onChange={(e) => setUseReinforcedPrefix(e.target.checked)}
                className="rounded border-stone-700 text-yellow-500 focus:ring-yellow-500/40"
              />
              <span className="text-xs text-yellow-200 font-medium">Auto-Prepend Prefix in Prompts</span>
            </label>

            <button
              onClick={() => setShowFullMarkdown(!showFullMarkdown)}
              className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono transition-colors border border-white/10 cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showFullMarkdown ? "Hide Reference" : "View Reference"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Markdown Guide Drawer */}
      {showFullMarkdown && (
        <div className="p-6 rounded-2xl bg-stone-950 border border-yellow-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-yellow-300 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-yellow-400" />
              Full Markdown Copy for Suno AI & Production Notes
            </h3>
            <button
              onClick={handleCopyFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-yellow-500/30 cursor-pointer"
            >
              {copiedFullMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFullMarkdown ? "Copied!" : "Copy Raw Markdown"}</span>
            </button>
          </div>
          <pre className="p-4 bg-stone-900 rounded-xl text-stone-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 border border-white/5">
            {generateFullMarkdown()}
          </pre>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, location, instruments, genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-yellow-500/50 transition-colors placeholder:text-stone-500"
          />
        </div>

        <div className="text-xs font-mono text-stone-400 flex items-center gap-2 self-start sm:self-auto">
          <span>Showing <strong className="text-yellow-300">{filteredPrompts.length}</strong> of 5 sessions</span>
          {useReinforcedPrefix && (
            <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-semibold">
              Prefix Active
            </span>
          )}
        </div>
      </div>

      {/* 5 Sessions Cards List */}
      <div className="space-y-8">
        {filteredPrompts.map((prompt) => {
          const activeStyle = useReinforcedPrefix
            ? prompt.reinforcedPrefixStylePrompt
            : prompt.stylePrompt;

          const bundleText = [
            `=== #${prompt.number} ${prompt.title.toUpperCase()} (${prompt.region} · 1965) ===`,
            "",
            "--- [SUNO STYLE OF MUSIC PROMPT] ---",
            activeStyle,
            "",
            "--- [SUNO ARRANGEMENT / LYRICS PROMPT] ---",
            prompt.arrangementLyricsPrompt,
            "",
            "--- [SUNO EXCLUDE STYLES / NEGATIVE PROMPT] ---",
            prompt.negativePrompt,
            "",
            "--- [SESSION PRODUCTION NOTES] ---",
            `Genre: ${prompt.genre}`,
            `Tempo: ${prompt.tempo}`,
            ...prompt.tips
          ].join("\n");

          return (
            <div
              key={prompt.id}
              className="group rounded-3xl border border-white/10 bg-stone-900/70 hover:bg-stone-900/90 hover:border-yellow-500/40 transition-all p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden"
            >
              {/* Subtle ambient background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/[0.03] group-hover:bg-yellow-500/[0.06] rounded-full blur-3xl pointer-events-none transition-all" />

              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-yellow-500/20 text-yellow-300 font-mono text-xs font-bold flex items-center justify-center border border-yellow-500/30">
                      {prompt.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                      {prompt.title} — Rhythm Section Only
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-yellow-300 text-[11px] font-mono border border-yellow-500/20">
                      {prompt.region}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-300 text-[11px] font-mono border border-rose-500/20">
                      No Horns / No Lead
                    </span>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    <strong className="text-yellow-200 font-medium">{prompt.genre}</strong> · {prompt.tempo}
                  </p>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-start">
                  <button
                    onClick={() => copyToClipboard(bundleText, prompt.id, "all")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                    title="Copy complete bundle (Style + Arrangement + Exclusions)"
                  >
                    {copiedAllId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Bundle!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Bundle</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleApply(prompt)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-yellow-500/20"
                    title="Load this prompt configuration directly into Prompt Studio"
                  >
                    <span>Load in Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* SECTION 1: STYLE PROMPT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Music className="w-3.5 h-3.5 text-yellow-400" />
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                      1. Style of Music Prompt
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-300 font-mono">
                      Suno Style Box
                    </span>
                    {useReinforcedPrefix && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                        + Anti-Horn Prefix Active
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => copyToClipboard(activeStyle, prompt.id, "style")}
                    className="text-xs text-yellow-400 hover:text-yellow-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors border border-yellow-500/20 cursor-pointer"
                  >
                    {copiedStyleId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Style!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Style Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                  <p className="font-mono text-xs sm:text-sm text-stone-200 leading-relaxed select-all">
                    {activeStyle}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                    <span>Length: {activeStyle.length} characters</span>
                    <span className="text-yellow-300/80">Tip: Paste into Suno v3.5/v4 Style of Music box</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: ARRANGEMENT / LYRICS PROMPT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                      2. Arrangement / Lyrics Prompt
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono">
                      Suno Lyrics Box
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(prompt.arrangementLyricsPrompt, prompt.id, "lyrics")}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 cursor-pointer"
                  >
                    {copiedLyricsId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Arrangement!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Lyrics Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                  <p className="font-mono text-xs sm:text-sm text-emerald-200/90 leading-relaxed select-all">
                    {prompt.arrangementLyricsPrompt}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                    <span>Structural Tags: [Intro] [Groove] [Breakdown] [Outro]</span>
                    <span className="text-emerald-300/80">Guarantees unquantized drum calls and clean live stops</span>
                  </div>
                </div>
              </div>

              {/* SECTION 3: NEGATIVE EXCLUSION BOX */}
              <div className="p-4 rounded-2xl bg-stone-950/80 border border-rose-500/20 space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Ban className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                      3. Negative Prompt (Exclude Styles)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                      Strict Rhythm Isolation
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(prompt.negativePrompt, prompt.id, "negative")}
                    className="text-xs text-rose-300/80 hover:text-rose-200 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/20 cursor-pointer"
                  >
                    {copiedNegativeId === prompt.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied Exclusions!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Exclusions</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="p-3 bg-stone-900/90 rounded-xl border border-white/5">
                  <p className="font-mono text-xs text-rose-200/90 leading-relaxed break-words select-all">
                    {prompt.negativePrompt}
                  </p>
                </div>

                <p className="text-[10px] text-stone-400 font-light leading-relaxed">
                  💡 Paste into Suno's <strong className="text-rose-300 font-medium">Exclude Styles</strong> box to guarantee that guitar/keyboard comping, upright bass, and percussion drive the track without brass solos or synthetic lead lines.
                </p>
              </div>

              {/* Instrumentation & Production Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Rhythm Instrumentation:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.instrumentation.map((inst, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-stone-800/80 text-stone-300 text-[11px] font-mono border border-white/5"
                      >
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Acoustic & Tape Traits:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.productionTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-yellow-950/30 text-yellow-200 text-[11px] font-mono border border-yellow-500/20"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Session Guidance */}
              <div className="p-4 rounded-xl bg-stone-900/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400/80 flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-yellow-400" />
                  Historical Session Advice
                </span>
                <ul className="text-xs text-stone-400 space-y-1 list-disc list-inside font-light">
                  {prompt.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
