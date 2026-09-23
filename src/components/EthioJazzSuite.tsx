import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Disc,
  Search,
  Sliders,
  Music,
  Info,
  Radio,
  Ban,
  Layers,
  BookOpen,
  Volume2
} from "lucide-react";
import {
  ETHIO_JAZZ_PROMPTS,
  ETHIO_JAZZ_GUIDE_TIPS,
  ETHIO_JAZZ_NEGATIVE_PROMPT,
  EthioJazzPrompt
} from "../data/ethioJazzPrompts";
import { PromptConfig, PromptResult } from "../types";

interface EthioJazzSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function EthioJazzSuite({ onApplyToStudio, onSwitchToStudio }: EthioJazzSuiteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);
  const [copiedNegativeId, setCopiedNegativeId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedGlobalNegative, setCopiedGlobalNegative] = useState(false);
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
    navigator.clipboard.writeText(ETHIO_JAZZ_NEGATIVE_PROMPT);
    setCopiedGlobalNegative(true);
    setTimeout(() => setCopiedGlobalNegative(false), 2000);
  };

  const handleApply = (prompt: EthioJazzPrompt) => {
    const config: PromptConfig = {
      subtheme: `Mulatu Astatke Ethio-Jazz (#${prompt.number} ${prompt.title})`,
      genre: "1960s/70s Ethiopian Jazz, Mulatu Astatke-Inspired",
      mood: `${prompt.modalScale}, Syncopated Pocket, Analog Tape`,
      tempo: `${prompt.tempo} BPM, ${prompt.meter}`,
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: prompt.instrumentation.join(", "),
      structure: prompt.arrangementLyricsPrompt,
      enableRoomTone: true,
      roomTone: "close-mic room tone with tape hiss",
      negativePrompt: prompt.negativePrompt,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${prompt.number}. ${prompt.title} (${prompt.tempo} BPM)`,
      styleTags: prompt.stylePrompt.length <= 120 ? prompt.stylePrompt : prompt.compactStyleTags,
      promptDescription: prompt.stylePrompt,
      lyrics: prompt.arrangementLyricsPrompt,
      negativePrompt: prompt.negativePrompt,
      tips: [
        ...prompt.tips,
        `Modal Scale: ${prompt.modalScale}`,
        `Lead Instrument: ${prompt.leadInstrument}`,
        `Negative Exclusions: ${prompt.negativePrompt}`
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const filteredPrompts = ETHIO_JAZZ_PROMPTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.focus.toLowerCase().includes(q) ||
      p.modalScale.toLowerCase().includes(q) ||
      p.leadInstrument.toLowerCase().includes(q) ||
      p.stylePrompt.toLowerCase().includes(q) ||
      p.arrangementLyricsPrompt.toLowerCase().includes(q)
    );
  });

  const generateFullMarkdown = () => {
    return ETHIO_JAZZ_PROMPTS.map((p) => {
      return `### ${p.number}. ${p.title} (${p.tempo} BPM · ${p.meter})
**Focus:** ${p.focus}
**Modal Scale:** ${p.modalScale}
**Lead Instrument:** ${p.leadInstrument}

**Style Prompt:**
\`\`\`
${p.stylePrompt}
\`\`\`

**Arrangement / Lyrics Prompt:**
\`\`\`
${p.arrangementLyricsPrompt}
\`\`\`

**Negative Prompt (Exclude Styles):**
\`\`\`
${p.negativePrompt}
\`\`\`

**Instrumentation:**
${p.instrumentation.map((i) => `- ${i}`).join("\n")}

**Production Notes:**
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
      {/* Hero / Header Section */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                Ethio-Jazz Suite · 1960s/70s Golden Era
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-medium">
                Horn-Free Vibraphone Lead
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                5 Mulatu Astatke Prompts
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white font-medium">
              Mulatu Astatke Ethio-Jazz Prompts
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
              5 authentic 1960s/70s Ethiopian jazz compositions featuring vibraphone leads, wah-wah rhythm guitars, Fender Rhodes/Hammond organ, upright bass, and Afro-Cuban polyrhythms (congas, timbales, shakers). Engineered with analog tape warmth, unquantized human timing, and strict negative horn exclusions to prevent AI brass bleed.
            </p>
          </div>

          {/* Quick Global Actions Card */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={copyGlobalNegative}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow-lg hover:shadow-rose-500/10"
              title="Copies 'no horns, no trumpet, no saxophone, no brass, no flute, no vocals' for Suno Exclude Styles box"
            >
              <Ban className="w-4 h-4 text-rose-400" />
              <span>{copiedGlobalNegative ? "Copied Negative Exclusions!" : "Copy Negative Exclusions"}</span>
              {copiedGlobalNegative ? <Check className="w-3.5 h-3.5 text-emerald-400 ml-1" /> : <Copy className="w-3.5 h-3.5 ml-1" />}
            </button>

            <button
              onClick={handleCopyFullMarkdown}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedFullMarkdown ? "Copied All 5 Prompts!" : "Copy Full 5-Track Bundle"}</span>
              {copiedFullMarkdown && <Check className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => setShowFullMarkdown(!showFullMarkdown)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 text-stone-300 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{showFullMarkdown ? "Hide Markdown Guide" : "View Markdown Guide"}</span>
            </button>
          </div>
        </div>

        {/* Global Horn Exclusion Notice Banner */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono text-stone-400 bg-stone-950/60 p-4 rounded-2xl border border-rose-500/20">
          <div className="flex items-start md:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center shrink-0 text-rose-300">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <span className="text-rose-300 font-semibold block sm:inline">Strict Negative Prompt Strategy: </span>
              <span className="text-stone-300 font-mono text-[11px] bg-stone-900 px-2 py-0.5 rounded border border-white/10 break-all">
                {ETHIO_JAZZ_NEGATIVE_PROMPT}
              </span>
              <span className="block text-[11px] text-stone-400 mt-1">
                Suno AI often injects loud saxophones and brass sections into "Ethiopian jazz." Paste this into Suno's <strong className="text-rose-300">Exclude Styles</strong> box to preserve vibraphone, keys, and drum pocket purity.
              </span>
            </div>
          </div>
          <button
            onClick={copyGlobalNegative}
            className="self-end md:self-auto px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-mono flex items-center gap-1.5 transition-colors border border-rose-500/30 cursor-pointer shrink-0"
          >
            {copiedGlobalNegative ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>Copy Exclusions</span>
          </button>
        </div>
      </div>

      {/* Markdown Guide Drawer */}
      {showFullMarkdown && (
        <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Full Markdown Reference for Suno AI & DAWs
            </h3>
            <button
              onClick={handleCopyFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-amber-500/30 cursor-pointer"
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

      {/* Production Guide Accordion / Lore Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ETHIO_JAZZ_GUIDE_TIPS.slice(0, 3).map((tip, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-stone-900/60 border border-white/5 hover:border-amber-500/20 transition-all space-y-2"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{tip.title}</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed font-light">
              {tip.detail}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by title, BPM, modal scale, instruments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900/90 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-stone-500"
          />
        </div>

        <div className="text-xs font-mono text-stone-400 flex items-center gap-2 self-start sm:self-auto">
          <span>Showing <strong className="text-amber-300">{filteredPrompts.length}</strong> of 5 Ethio-jazz tracks</span>
        </div>
      </div>

      {/* Prompts Cards Grid */}
      <div className="space-y-8">
        {filteredPrompts.map((prompt) => {
          const bundleText = [
            `=== #${prompt.number} ${prompt.title.toUpperCase()} (${prompt.tempo} BPM) ===`,
            "",
            "--- [SUNO STYLE OF MUSIC PROMPT] ---",
            prompt.stylePrompt,
            "",
            "--- [SUNO ARRANGEMENT / LYRICS PROMPT] ---",
            prompt.arrangementLyricsPrompt,
            "",
            "--- [SUNO EXCLUDE STYLES / NEGATIVE PROMPT] ---",
            prompt.negativePrompt,
            "",
            "--- [PRODUCTION NOTES & TIPS] ---",
            `Modal Scale: ${prompt.modalScale}`,
            `Lead: ${prompt.leadInstrument}`,
            ...prompt.tips
          ].join("\n");

          return (
            <div
              key={prompt.id}
              className="group rounded-3xl border border-white/10 bg-stone-900/70 hover:bg-stone-900/90 hover:border-amber-500/40 transition-all p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden"
            >
              {/* Background ambient accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.03] group-hover:bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none transition-all" />

              {/* Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/5 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/30">
                      {prompt.number}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                      {prompt.title}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-amber-300 text-[11px] font-mono border border-amber-500/20">
                      {prompt.tempo} BPM
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono border border-white/10">
                      {prompt.meter}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 text-[11px] font-mono border border-emerald-500/20">
                      {prompt.modalScale}
                    </span>
                  </div>

                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    {prompt.focus} · <strong className="text-amber-200 font-medium">Lead:</strong> {prompt.leadInstrument}
                  </p>
                </div>

                {/* Top Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-start">
                  <button
                    onClick={() => copyToClipboard(bundleText, prompt.id, "all")}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                    title="Copy full bundle (Style + Arrangement + Exclusions)"
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-md shadow-amber-500/20"
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
                    <Music className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                      1. Style of Music Prompt
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 font-mono">
                      Suno Style Box
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(prompt.stylePrompt, prompt.id, "style")}
                    className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors border border-amber-500/20 cursor-pointer"
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
                    {prompt.stylePrompt}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                    <span>Length: {prompt.stylePrompt.length} characters</span>
                    <span className="text-amber-300/80">Tip: Paste directly into Suno v3.5/v4 Style of Music box</span>
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
                    <span>Structural Tags: [Intro] [Groove] [Main] [Break] [Outro]</span>
                    <span className="text-emerald-300/80">Controls transitions and solos without verbal singing</span>
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
                      Strict Horn Suppression
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
                  💡 Paste into Suno's <strong className="text-rose-300 font-medium">Exclude Styles</strong> box to guarantee that vibraphone, electric keys, and congas lead without horn stabs or synthetic brass bleeding in.
                </p>
              </div>

              {/* Instrumentation & Production Badges */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Instrumentation:</span>
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
                  <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">Production Engineering:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.productionTraits.map((trait, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-amber-950/30 text-amber-200 text-[11px] font-mono border border-amber-500/20"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suno Tips */}
              <div className="p-4 rounded-xl bg-stone-900/40 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400/80 flex items-center gap-1.5">
                  <Info className="w-3 h-3 text-amber-400" />
                  Suno Generation Advice
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
