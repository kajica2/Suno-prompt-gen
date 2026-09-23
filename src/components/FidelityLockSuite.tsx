import { useState } from "react";
import {
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  SlidersHorizontal,
  Lock,
  ArrowRight,
  Radio,
  Layers,
  Mic,
  Disc,
  FileText,
  Workflow,
  AlertTriangle,
  Info,
  Maximize2
} from "lucide-react";
import {
  FIDELITY_LOCK_PROTOCOLS,
  FIDELITY_UNIVERSAL_NEGATIVE_PROMPT,
  FidelityLockProtocol
} from "../data/fidelityLockPrompts";
import { PromptConfig, PromptResult } from "../types";

interface FidelityLockSuiteProps {
  onApplyToStudio?: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio?: () => void;
}

export default function FidelityLockSuite({
  onApplyToStudio,
  onSwitchToStudio
}: FidelityLockSuiteProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProtocolId, setActiveProtocolId] = useState<string>("absolute-fidelity-lock");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedNegative, setCopiedNegative] = useState<boolean>(false);
  const [copiedBundleId, setCopiedBundleId] = useState<string | null>(null);
  const [copiedAllMarkdown, setCopiedAllMarkdown] = useState<boolean>(false);

  // Multi-lock stacker state
  const [stackedLockIds, setStackedLockIds] = useState<string[]>([
    "seamless-extend-preservation",
    "vocal-performance-preservation"
  ]);
  const [copiedStackedPrompt, setCopiedStackedPrompt] = useState<boolean>(false);

  const activeProtocol =
    FIDELITY_LOCK_PROTOCOLS.find((p) => p.id === activeProtocolId) ||
    FIDELITY_LOCK_PROTOCOLS[0];

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyNegative = () => {
    navigator.clipboard.writeText(FIDELITY_UNIVERSAL_NEGATIVE_PROMPT);
    setCopiedNegative(true);
    setTimeout(() => setCopiedNegative(false), 2500);
  };

  const handleCopyBundle = (protocol: FidelityLockProtocol) => {
    const bundle = `=== SUNO AUDIO UPLOAD REFERENCE LOCK: ${protocol.title.toUpperCase()} ===\n\n[RECOMMENDED SUNO FEATURE]: ${protocol.recommendedSunoFeature}\n[AUDIO INFLUENCE SLIDER]: ${protocol.suggestedAudioInfluence}\n\n[STYLE / CONDITIONING PROMPT]:\n${protocol.promptText}\n\n[UNIVERSAL EXCLUDE STYLES / NEGATIVE PROMPT]:\n${FIDELITY_UNIVERSAL_NEGATIVE_PROMPT}\n\n[KEY GUARDRAILS]:\n${protocol.keyExclusions}\n\n[BEST FOR]:\n${protocol.bestFor}`;
    navigator.clipboard.writeText(bundle);
    setCopiedBundleId(protocol.id);
    setTimeout(() => setCopiedBundleId(null), 2500);
  };

  const handleLoadInStudio = (protocol: FidelityLockProtocol) => {
    if (!onApplyToStudio) return;

    const config: PromptConfig = {
      subtheme: `Fidelity Lock: ${protocol.title}`,
      genre: `Audio Upload Reference Lock (${protocol.category})`,
      mood: "Absolute Master Fidelity, Zero Deviations, Blueprint Replication",
      tempo: "Source Clip Exact Tempo & Human Pocket",
      vocalType: "Source Vocal Pitch, Delivery, Inflections & Breaths Preserved",
      instruments: "Source Instrumentation, Mix Balance & Frequency Response Preserved",
      structure: "Source Song Structure, Section Durations & Transitions Locked"
    };

    const result: PromptResult = {
      title: `${protocol.title} (Upload Conditioning)`,
      styleTags: "audio upload fidelity lock, master reference blueprint, exact replica, no creative liberties, unaltered source",
      promptDescription: protocol.promptText,
      lyrics: `[AUDIO REFERENCE LOCK DIRECTIVE]
[Target Feature: ${protocol.recommendedSunoFeature}]
[Recommended Audio Influence: ${protocol.suggestedAudioInfluence}]

[EXCLUSION GUARDRAILS]:
${FIDELITY_UNIVERSAL_NEGATIVE_PROMPT}

[REFERENCE LOCK PROMPT]:
${protocol.promptText}`,
      tips: protocol.proTips
    };

    onApplyToStudio(config, result);
    if (onSwitchToStudio) {
      onSwitchToStudio();
    }
  };

  const toggleStackedLock = (id: string) => {
    if (stackedLockIds.includes(id)) {
      if (stackedLockIds.length > 1) {
        setStackedLockIds(stackedLockIds.filter((item) => item !== id));
      }
    } else {
      if (stackedLockIds.length < 4) {
        setStackedLockIds([...stackedLockIds, id]);
      }
    }
  };

  // Generate composite stacked prompt
  const getCompositePrompt = () => {
    const selectedProtos = FIDELITY_LOCK_PROTOCOLS.filter((p) =>
      stackedLockIds.includes(p.id)
    );
    const titles = selectedProtos.map((p) => p.title).join(" + ");
    const texts = selectedProtos.map((p) => p.promptText).join("\n\n");
    return `[COMPOSITE SUNO REFERENCE LOCK: ${titles}]\n\n${texts}\n\n[MANDATORY EXCLUSIONS]:\n${FIDELITY_UNIVERSAL_NEGATIVE_PROMPT}`;
  };

  const handleCopyStacked = () => {
    navigator.clipboard.writeText(getCompositePrompt());
    setCopiedStackedPrompt(true);
    setTimeout(() => setCopiedStackedPrompt(false), 2500);
  };

  const handleCopyAllMarkdown = () => {
    let md = `# Suno Audio Upload Reference Lock Protocols (10 Master Blueprint Prompts)\n\n`;
    md += `Use these prompts when uploading audio to Suno v3.5 and v4.0 (for Extend, Cover, Audio Reuse, and Stem Continuation) to lock down melody, rhythm, vocals, instruments, and structure.\n\n`;
    md += `## Universal Negative Exclusions:\n\`\`\`\n${FIDELITY_UNIVERSAL_NEGATIVE_PROMPT}\n\`\`\`\n\n`;

    FIDELITY_LOCK_PROTOCOLS.forEach((p) => {
      md += `### ${p.number}. ${p.title} (${p.category})\n`;
      md += `* **Target Feature:** ${p.recommendedSunoFeature}\n`;
      md += `* **Recommended Audio Influence:** ${p.suggestedAudioInfluence}\n`;
      md += `* **Key Exclusions:** ${p.keyExclusions}\n`;
      md += `* **Best For:** ${p.bestFor}\n\n`;
      md += `**Prompt Directive:**\n\`\`\`text\n${p.promptText}\n\`\`\`\n\n---\n\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedAllMarkdown(true);
    setTimeout(() => setCopiedAllMarkdown(false), 2500);
  };

  const filteredProtocols = FIDELITY_LOCK_PROTOCOLS.filter((p) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "master") return p.category === "Master Replica";
    if (selectedCategory === "cover") return p.category === "Cover Feature" || p.category === "Anti-Remix";
    if (selectedCategory === "extend") return p.category === "Extend Clip";
    if (selectedCategory === "vocal") return p.category === "Vocal Lock";
    if (selectedCategory === "instrumental") return p.category === "Instrumental Lock";
    if (selectedCategory === "mix") return p.category === "Mix Texture" || p.category === "Structure Lock";
    return true;
  });

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* Top Banner Hero */}
      <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950/60 via-stone-900/90 to-stone-950 border border-indigo-500/30 p-6 md:p-10 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                Audio Upload Authority
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/30">
                Suno v3.5 & v4.0 Precision Lock
              </span>
              <span className="text-xs font-mono text-stone-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                10 Reference Blueprint Directives
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Absolute Fidelity & Reference Lock Suite
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed">
              When uploading audio to Suno for <strong className="text-white">Extend</strong>, <strong className="text-white">Cover</strong>, or <strong className="text-white">Audio Reuse</strong>, the model naturally attempts to modernize, add drums, alter chords, or change vocalists. These 10 authoritative prompts act as an <span className="text-indigo-300 font-medium">immutable reference lock</span>—forcing Suno to treat your uploaded audio as the sole, non-negotiable blueprint.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyAllMarkdown}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold transition-all shadow-lg cursor-pointer"
            >
              {copiedAllMarkdown ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Copied All 10 Protocols!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Export All 10 as Markdown</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleLoadInStudio(activeProtocol)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-stone-200 hover:text-white font-mono text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Load Active Lock in Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Suno Audio Upload Architecture Quick Rules */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-indigo-400 font-bold flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>1. Audio Influence Slider (85%–95%)</span>
            </div>
            <p className="text-stone-400 leading-normal">
              High values anchor Suno to source pitch, harmony & timbre. Set 90%+ for clones, 85% for extends.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5" />
              <span>2. Negative Exclusions Guardrail</span>
            </div>
            <p className="text-stone-400 leading-normal">
              Pair with strict exclusions: <em className="text-stone-300">no new instruments, no remix, no auto-tune</em> to shut down AI deviations.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>3. Minimum Technical Change Rule</span>
            </div>
            <p className="text-stone-400 leading-normal">
              Forces diffusion into low-entropy reconstruction instead of generative variation.
            </p>
          </div>
        </div>
      </div>

      {/* Universal Negatives Ribbon Box */}
      <div className="p-5 rounded-2xl bg-stone-900/80 border border-indigo-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono font-bold text-indigo-400 tracking-wider">
              Universal Audio Upload Negative Exclusions
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
              Crucial for All 10 Locks
            </span>
          </div>
          <code className="text-xs font-mono text-stone-300 block select-all bg-black/40 p-2 rounded-lg border border-white/5">
            {FIDELITY_UNIVERSAL_NEGATIVE_PROMPT}
          </code>
        </div>

        <button
          type="button"
          onClick={handleCopyNegative}
          className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
        >
          {copiedNegative ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Copied Negatives!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Negatives</span>
            </>
          )}
        </button>
      </div>

      {/* Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 font-mono text-xs">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium ${
            selectedCategory === "all"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          All 10 Reference Locks
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("master")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "master"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-indigo-400" />
          <span>Master Replicas (3)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("cover")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "cover"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <Disc className="w-3.5 h-3.5 text-purple-400" />
          <span>Cover Feature & Anti-Remix (2)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("extend")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "extend"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Seamless Extend (1)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("vocal")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "vocal"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <Mic className="w-3.5 h-3.5 text-amber-400" />
          <span>Vocal Performance (1)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("instrumental")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "instrumental"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-emerald-400" />
          <span>Instrumental Blueprint (1)</span>
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("mix")}
          className={`px-3 py-2 rounded-xl transition-all cursor-pointer shrink-0 font-medium flex items-center gap-1.5 ${
            selectedCategory === "mix"
              ? "bg-indigo-600 text-white font-bold shadow"
              : "text-stone-400 hover:text-white bg-stone-900/60"
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-rose-400" />
          <span>Structure & Mix Texture (2)</span>
        </button>
      </div>

      {/* Main Grid: Protocol Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProtocols.map((protocol) => {
          const isActive = protocol.id === activeProtocolId;
          const isCopied = copiedId === protocol.id;
          const isBundleCopied = copiedBundleId === protocol.id;

          return (
            <div
              key={protocol.id}
              onClick={() => setActiveProtocolId(protocol.id)}
              className={`rounded-2xl transition-all p-6 flex flex-col justify-between cursor-pointer border ${
                isActive
                  ? "bg-stone-900/90 border-indigo-500 shadow-xl shadow-indigo-950/40 ring-1 ring-indigo-500/50"
                  : "bg-stone-950/80 border-white/10 hover:border-white/20 hover:bg-stone-900/40"
              }`}
            >
              <div className="space-y-4">
                {/* Header line */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center justify-center border border-indigo-500/30">
                        {protocol.number}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                        {protocol.title}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-400 font-mono mt-1">
                      {protocol.tagline}
                    </p>
                  </div>

                  <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-white/10 text-stone-300 border border-white/10 shrink-0">
                    {protocol.category}
                  </span>
                </div>

                {/* Suno feature recommendation badges */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <div className="px-2.5 py-0.5 rounded-md bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 flex items-center gap-1">
                    <Workflow className="w-3 h-3" />
                    <span>Target: {protocol.recommendedSunoFeature}</span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/40 flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Audio Influence: {protocol.suggestedAudioInfluence}</span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-md bg-stone-900 text-stone-400 border border-white/5">
                    {protocol.characterCount} chars
                  </div>
                </div>

                {/* Prompt Text Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                    <span>Master Conditioning Directive:</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyText(protocol.promptText, protocol.id);
                      }}
                      className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-stone-200 leading-relaxed max-h-48 overflow-y-auto selection:bg-indigo-500/30">
                    {protocol.promptText}
                  </div>
                </div>

                {/* Best For & Exclusions */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-1.5 text-stone-300">
                    <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-200">Best for:</strong> {protocol.bestFor}
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 text-stone-400 font-mono text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-300">Strict Exclusions:</strong> {protocol.keyExclusions}
                    </span>
                  </div>
                </div>

                {/* Pro Tips List */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-stone-400 font-bold block">
                    Execution Instructions:
                  </span>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-400 text-xs font-light">
                    {protocol.proTips.map((tip, idx) => (
                      <li key={idx} className="leading-snug">
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyBundle(protocol);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
                >
                  {isBundleCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Full Bundle!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Bundle</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLoadInStudio(protocol);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Load in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Multi-Lock Fusion Lab / Composite Stacker */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-stone-900/90 via-stone-950 to-indigo-950/40 border border-indigo-500/30 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
                Advanced Tool
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white mt-1">
              Multi-Lock Composite Synthesizer
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl mt-1">
              Combine up to 4 specialized reference locks into a single monolithic directive (e.g. <em>Seamless Extend</em> + <em>Vocal Preservation</em> + <em>Mix Texture Lock</em>).
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopyStacked}
            className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-stone-950 font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg shrink-0 cursor-pointer"
          >
            {copiedStackedPrompt ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span className="text-white">Copied Composite Directive!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Composite Lock Directive</span>
              </>
            )}
          </button>
        </div>

        {/* Lock Selector Chips */}
        <div className="space-y-2">
          <span className="text-xs font-mono text-stone-400 block">
            Select 1 to 4 locks to stack:
          </span>
          <div className="flex flex-wrap gap-2">
            {FIDELITY_LOCK_PROTOCOLS.map((p) => {
              const isSelected = stackedLockIds.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggleStackedLock(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400 font-semibold"
                      : "bg-black/40 text-stone-400 border border-white/5 hover:border-white/20"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-cyan-400" : "bg-stone-600"}`} />
                  <span>#{p.number} {p.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Composite Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-stone-400">
            <span>Generated Composite Directive ({stackedLockIds.length} stacked):</span>
          </div>
          <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono text-stone-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto selection:bg-cyan-500/30">
            {getCompositePrompt()}
          </pre>
        </div>
      </div>

      {/* Suno Audio Upload Workflow Master Guide */}
      <div className="p-6 md:p-8 rounded-3xl bg-stone-950 border border-white/10 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-serif font-bold text-white">
              Suno Audio Upload Execution Guide: Step-by-Step
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              How to avoid AI hallucinations and lock down audio uploads in Suno v3.5 & v4.0
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 space-y-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
              1
            </div>
            <h4 className="text-white font-bold">Upload Your Clip</h4>
            <p className="text-stone-400 leading-relaxed">
              In Suno, click <strong className="text-stone-200">Create &rarr; Upload Audio</strong>. Select an MP3 or WAV (up to 60–120 seconds).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 space-y-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
              2
            </div>
            <h4 className="text-white font-bold">Enable Custom Mode</h4>
            <p className="text-stone-400 leading-relaxed">
              Always toggle on <strong className="text-stone-200">Custom Mode</strong> to reveal the Style of Music, Lyrics, and Exclude Styles boxes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 space-y-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
              3
            </div>
            <h4 className="text-white font-bold">Inject Reference Lock</h4>
            <p className="text-stone-400 leading-relaxed">
              Paste your selected Fidelity Lock into <strong className="text-stone-200">Style of Music</strong> or <strong className="text-stone-200">Prompt Description</strong>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/60 border border-white/5 space-y-2">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-xs">
              4
            </div>
            <h4 className="text-white font-bold">Set Slider & Negatives</h4>
            <p className="text-stone-400 leading-relaxed">
              Set <strong className="text-stone-200">Audio Influence to 88%–95%</strong> and paste our Universal Negatives into <strong className="text-stone-200">Exclude Styles</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
