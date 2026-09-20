import { useState } from "react";
import { PromptConfig, PromptResult, Preset } from "./types";
import { PRESETS } from "./presets";
import Header from "./components/Header";
import PresetCard from "./components/PresetCard";
import PromptForm from "./components/PromptForm";
import HarmonicStudyEngine from "./components/HarmonicStudyEngine";
import DebussySuite from "./components/DebussySuite";
import RagaSuite from "./components/RagaSuite";
import TrumpetSuite from "./components/TrumpetSuite";
import ProtocolsSuite from "./components/ProtocolsSuite";
import BuskingSuite from "./components/BuskingSuite";
import BamBamSuite from "./components/BamBamSuite";
import { Copy, Check, Sparkles, Music, Compass, BookOpen, Heart, Info, AlertCircle, ArrowRight, Edit3, Eye, RefreshCw, Feather, Flame, Disc, Layers, Radio, Ban } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<"protocols" | "studio" | "busking" | "bambam" | "harmonic" | "debussy" | "raga" | "trumpet">("protocols");
  const [presetCategory, setPresetCategory] = useState<"all" | "bambam" | "busking" | "trumpet" | "raga" | "debussy" | "harmonic" | "other">("all");
  const [config, setConfig] = useState<PromptConfig>(PRESETS[0].config);
  const [result, setResult] = useState<PromptResult | null>(PRESETS[0].sampleResult);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditingLyrics, setIsEditingLyrics] = useState(false);

  // Clipboard copy feedbacks
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleLoadPreset = (preset: Preset) => {
    setConfig(preset.config);
    setResult(preset.sampleResult);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate prompt from service.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred while channeling the melody.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, type: "tags" | "negative" | "prompt" | "lyrics" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "tags") {
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    } else if (type === "negative") {
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    } else if (type === "prompt") {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else if (type === "lyrics") {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    } else if (type === "all") {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    }
  };

  const handleCopyAll = () => {
    if (!result) return;
    const activeNegative = result.negativePrompt || config.negativePrompt;
    const bundleText = [
      `=== ${result.title.toUpperCase()} ===`,
      "",
      "--- [STYLE OF MUSIC / TAGS] ---",
      result.styleTags,
      "",
      ...(activeNegative ? [
        "--- [NEGATIVE PROMPT / EXCLUDE STYLES] ---",
        activeNegative,
        ""
      ] : []),
      "--- [PROMPT DESCRIPTION] ---",
      result.promptDescription,
      "",
      "--- [LYRICS / SECTION STRUCTURE] ---",
      result.lyrics
    ].join("\n");

    copyToClipboard(bundleText, "all");
  };

  // Highlights structured brackets in Suno lyrics and parenthetical backing/translations
  const highlightLyrics = (text: string) => {
    if (!text) return null;
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      const isBracket = trimmed.startsWith("[") && trimmed.endsWith("]");
      const isParen = trimmed.startsWith("(") && trimmed.endsWith(")");

      if (isBracket) {
        if (trimmed.includes(":")) {
          const inner = trimmed.slice(1, -1);
          const colonIdx = inner.indexOf(":");
          const tag = inner.slice(0, colonIdx).trim();
          const cues = inner.slice(colonIdx + 1).trim();
          return (
            <span key={idx} className="block mt-4 mb-1 font-mono text-[11px] tracking-wider">
              <span className="text-amber-400 font-bold uppercase">[{tag}: </span>
              <span className="text-amber-200/80 font-normal normal-case">{cues}]</span>
            </span>
          );
        }
        return (
          <span key={idx} className="block text-amber-400 font-bold tracking-wider text-[11px] uppercase mt-4 mb-1 font-mono">
            {line}
          </span>
        );
      }
      if (isParen) {
        return (
          <span key={idx} className="block text-white/45 italic text-xs leading-relaxed font-sans font-light">
            {line}
          </span>
        );
      }
      return <span key={idx} className="block text-white/90 leading-relaxed font-sans font-normal">{line}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white flex flex-col md:flex-row sans relative selection:bg-amber-500/30 selection:text-white">
      
      {/* Decorative Left Sidebar - Artistic Theme Accent */}
      <div className="hidden lg:flex w-16 border-r border-white/5 flex-col items-center py-12 justify-between bg-[#08080a] select-none shrink-0">
        <span className="writing-v uppercase tracking-[0.4em] text-[9px] text-white/30 font-mono">
          Suno Prompt Synthesis // 2026
        </span>
        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02]">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
        </div>
        <span className="writing-v uppercase tracking-[0.4em] text-[9px] text-white/30 font-mono">
          v.3.5 / v4.0
        </span>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Ambient background glows */}
        <div className="absolute top-[-150px] right-[-150px] w-[600px] h-[600px] bg-indigo-950/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-150px] left-[-150px] w-[500px] h-[500px] bg-amber-950/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Global Navigation Header */}
        <Header currentView={currentView} onSelectView={setCurrentView} />

        {currentView === "protocols" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:px-10 relative z-10">
            <ProtocolsSuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "harmonic" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <HarmonicStudyEngine
              onApplyConfig={(newConfig, newResult) => {
                setConfig(newConfig);
                if (newResult) {
                  setResult(newResult);
                }
              }}
              onSwitchToGenerator={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "trumpet" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <TrumpetSuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "raga" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <RagaSuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "debussy" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <DebussySuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "busking" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <BuskingSuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : currentView === "bambam" ? (
          <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 md:px-12 relative z-10">
            <BamBamSuite
              onApplyToStudio={(newConfig, newResult) => {
                setConfig(newConfig);
                setResult(newResult);
                setError(null);
              }}
              onSwitchToStudio={() => setCurrentView("studio")}
            />
          </main>
        ) : (
          <>
            {/* Featured Unplugged & Fusion Suites Ribbons */}
            <div className="max-w-7xl w-full mx-auto px-6 pt-6 md:px-12 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Bam Bam Jamm Suite Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/20 via-stone-900/90 to-stone-950 border border-orange-500/40 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-300 shrink-0">
                    <Flame className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        Bam Bam Jamm
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-semibold">
                        10 Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      Tribal bass, ecstatic dance & acoustic trumpet solos (Audio Influence 70–85%).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("bambam")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* Busking Backing Track Suite Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-stone-900/90 to-stone-950 border border-amber-500/40 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Radio className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        Busking Tracks
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                        10 Pocket Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      105 BPM jazz fusion, 81% Audio Influence, no sax/guitar/vox for trumpet soloing.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("busking")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {/* DDSP ASMR Protocols Suite Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/15 via-amber-500/10 to-stone-950 border border-purple-500/40 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        DDSP ASMR Trumpet
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                        8 Acoustic Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      Acoustic trumpet, flugelhorn & real organic instruments across all 7 Living Protocols + ℰ-Console Master.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("protocols")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Trumpet Fusion Suite Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-stone-900/90 to-stone-950 border border-amber-500/40 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 shrink-0">
                    <Disc className="w-5 h-5 animate-spin" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        Acoustic Trumpet Suite
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono font-semibold">
                        10 Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      Liquid DnB, microhouse, raga-noon & Harmon-muted jazz trumpet.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("trumpet")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Raga Suite Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-orange-500/15 via-stone-900/90 to-stone-950 border border-orange-500/30 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-300 shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        Indian Classical Raga Suite
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 font-mono font-semibold">
                        10 Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      Sitar, bansuri, sarod, khayal, tanpura drone & unquantized meend.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("raga")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Debussy Suite Ribbon */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/15 via-stone-900/90 to-stone-950 border border-teal-500/30 flex items-center justify-between gap-3 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 shrink-0">
                    <Feather className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-serif font-bold text-white tracking-wide">
                        Debussy Impressionist Suite
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-mono font-semibold">
                        10 Prompts
                      </span>
                    </div>
                    <p className="text-xs text-stone-300 font-light mt-0.5">
                      Felt piano, whole-tone scales, wordless vocalise & room tone.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentView("debussy")}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shrink-0 cursor-pointer shadow"
                >
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* Column 1: Config Form (lg:col-span-5) */}
              <div className="lg:col-span-5 space-y-6">
                <PromptForm
                  config={config}
                  onChange={setConfig}
                  onSubmit={handleGenerate}
                  isLoading={isLoading}
                  onOpenHarmonicEngine={() => setCurrentView("harmonic")}
                />

            {/* Suno limits card */}
            <div className="glass rounded-2xl p-5 bg-white/[0.01]">
              <h3 className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" />
                Suno AI Rules of Thumb & Pro Tips
              </h3>
              <ul className="space-y-3.5 text-xs text-white/60 font-sans font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>Suno's <strong className="text-white/90">Style of Music</strong> box only accepts keywords, moods, and instruments. Long sentences are ignored. Keep it strictly under <strong className="text-amber-300">120 characters</strong>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>The <strong className="text-white/90">Lyrics</strong> box has a strict limit of <strong className="text-amber-300 font-mono">max 3,000 characters</strong>. This accommodates rich arrangements with multiple verses, bridges, breakdown drops, and instrumental solos.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Instrumental Tracks:</strong> Place <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300">[Instrumental]</code> at the very top of the Lyrics box to strictly prevent unwanted singing, vocalizations, or humming.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Debussy / Impressionist Filter Bypass:</strong> If "Debussy" gets filtered by Suno's copyright safety filter, use: <em className="text-amber-200">French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato</em>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Classical Section Tags:</strong> <code className="text-white/70 font-mono">[Verse]</code> doesn't fit Debussy—use <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300">[Theme]</code>, <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300">[Bridge]</code>, <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300">[Interlude]</code>, and <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300">[Outro]</code> instead.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Keep it Sparse:</strong> Too many instruments will prompt Suno to add a drum beat. Start with solo piano or small chamber group (e.g. flute, harp, muted strings, clarinet) and declare <code className="text-amber-300/90 font-mono">no drums, no beat, no synth</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Push Human Imperfections:</strong> Use keywords like <code className="text-amber-200 font-mono">pedal noise, chair creak, page turn, audible breath, micro timing fluctuation, unquantized, no click track</code> for uncanny acoustic realism.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Audio Influence 81% & Room Tone:</strong> When uploading busking backing tracks or loops into Suno, set Audio Influence to <strong className="text-amber-300">81%</strong> and enable <strong className="text-emerald-300">Room Tone</strong> to append environmental cues (e.g. <em>intimate jazz club noise, captured in an wooden concert hall</em>) for pure non-AI acoustic physics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span><strong>Inline Vocal & Mic Meta-Tags:</strong> For vocal songs, use <code className="bg-white/5 border border-white/10 px-1 rounded font-mono text-amber-300 text-[11px]">[Verse: whispered vocals, close-mic presence, audible breath before line, acoustic guitar only]</code>.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 2: Output Presentation Workspace (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Error banner if generation fails */}
            {error && (
              <div className="border border-red-500/30 bg-red-500/10 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-red-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold mb-0.5">Could not materialize song data</h4>
                    <p className="font-light text-xs text-red-300/90 leading-relaxed">{error}</p>
                  </div>
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 rounded-xl text-xs font-mono font-medium text-white transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>Retry Generation</span>
                </button>
              </div>
            )}

            {/* Results Display Pane */}
            <div className="glass rounded-3xl p-6 md:p-8 bg-white/[0.02] relative min-h-[500px] flex flex-col">
              
              {isLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-full border border-amber-500/20 flex items-center justify-center animate-spin">
                      <div className="w-8 h-8 rounded-full border-t-2 border-amber-500" />
                    </div>
                    <Sparkles className="w-6 h-6 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-xl font-medium italic text-stone-100">Harmonizing Peace</h3>
                  <p className="text-white/40 text-xs font-mono tracking-widest mt-2 uppercase">
                    Consulting cosmic songwriter guides...
                  </p>
                  
                  {/* Poetic quote during load */}
                  <p className="mt-8 text-xs italic text-amber-500/60 max-w-sm leading-relaxed">
                    "The storm has cleared, the wind is low... Let the quiet healing of peace wash over and shine light."
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-8 flex-1">
                  
                  {/* Results Header block */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">
                          Generated Masterpiece Title
                        </span>
                        {result.isFallback && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-[9px] uppercase tracking-wider font-semibold">
                            Harmonic Engine
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-3xl md:text-4xl italic font-medium text-white tracking-tight mt-1">
                        {result.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={handleCopyAll}
                        className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${
                          copiedAll
                            ? "bg-emerald-500 text-stone-950 shadow-emerald-500/25"
                            : "bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20 hover:scale-[1.02]"
                        }`}
                        title="Copy Style, Tags, and Lyrics all formatted in one click"
                      >
                        {copiedAll ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied All!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy All &#123;Style, Tags, Lyrics&#125;</span>
                          </>
                        )}
                      </button>

                      <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-white/10">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                          Ready for Suno
                        </span>
                      </div>
                    </div>
                  </div>

                  {result.isFallback && (
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-200/90 font-light">
                      <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-amber-300">Generated with built-in Harmonic Engine: </span>
                        <span>{result.fallbackReason || "Gemini API rate limit active. Prompt and lyrics are fully composed and ready for Suno."}</span>
                      </div>
                    </div>
                  )}

                  {/* SUNO STYLING KEYWORDS SECTION (MOST IMPORTANT FOR SUNO) */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                          1. Style of Music Tags
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${result.styleTags.length > 120 ? 'bg-red-500/20 text-red-300' : 'bg-white/5 text-amber-400'}`}>
                          {result.styleTags.length} / 120 chars
                        </span>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(result.styleTags, "tags")}
                        className="text-xs text-white/50 hover:text-amber-400 font-mono flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors border border-white/5"
                      >
                        {copiedTags ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Tags</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 relative group">
                      <p className="font-mono text-sm text-white/90 leading-relaxed break-words">
                        {result.styleTags}
                      </p>
                      {result.styleTags.length > 120 && (
                        <div className="mt-2 text-[10px] text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Warning: Exceeds Suno's 120 character limit. Try removing a word.</span>
                        </div>
                      )}
                    </div>
                    <p className="text-[10px] text-white/40 font-light mt-1.5 leading-relaxed">
                      💡 Paste this exact line into the <strong className="text-white/60">Style of Music</strong> prompt input inside Suno's Custom Mode.
                    </p>
                  </div>

                  {/* NEGATIVE EXCLUSIONS / SUNO EXCLUDE STYLES SECTION */}
                  {(result.negativePrompt || config.negativePrompt) && (
                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-rose-500/20 space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <Ban className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                            Strict Negative Exclusions
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">
                            Trumpet & Drum Focus
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => copyToClipboard(result.negativePrompt || config.negativePrompt || "", "negative")}
                          className="text-xs text-rose-300/80 hover:text-rose-200 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 transition-colors border border-rose-500/20 cursor-pointer"
                        >
                          {copiedNegative ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Copied!</span>
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
                        <p className="font-mono text-xs text-rose-200/90 leading-relaxed break-words">
                          {result.negativePrompt || config.negativePrompt}
                        </p>
                      </div>

                      <p className="text-[10px] text-stone-400 font-light leading-relaxed">
                        💡 Paste into Suno's <strong className="text-rose-300 font-medium">Exclude Styles</strong> box (or let it auto-append to Style tags) to guarantee acoustic trumpet and drum focus without saxophone, vocals, or guitar clutter.
                      </p>
                    </div>
                  )}

                  {/* PROMPT DESCRIPTION SECTION */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                          2. Ready-to-Paste Suno Prompt
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-white/5 text-amber-400">
                          {result.promptDescription.length} chars
                        </span>
                      </div>
                      
                      <button
                        onClick={() => copyToClipboard(result.promptDescription, "prompt")}
                        className="text-xs text-white/50 hover:text-amber-400 font-mono flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors border border-white/5"
                      >
                        {copiedPrompt ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Prompt</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5">
                      <p className="font-serif italic text-base text-white/90 leading-relaxed">
                        "{result.promptDescription}"
                      </p>
                    </div>
                    <p className="text-[10px] text-white/40 font-light mt-1.5 leading-relaxed">
                      💡 Paste directly into Suno's prompt description box in standard mode, or use to shape Custom Mode backdrops.
                    </p>
                  </div>

                  {/* POETIC LYRIC SHEET SECTION */}
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
                          {result.lyrics.includes("[Instrumental]") ? "3. Instrumental Arrangement & Section Cues" : "3. Custom Lyrical Masterpiece"}
                        </span>
                        {result.lyrics.includes("[Instrumental]") && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded font-mono bg-amber-400/15 text-amber-300 font-semibold border border-amber-400/25">
                            [Instrumental]
                          </span>
                        )}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${result.lyrics.length > 3000 ? 'bg-red-500/20 text-red-300 font-bold' : 'bg-white/5 text-amber-400'}`}>
                          {result.lyrics.length.toLocaleString()} / 3,000 chars
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsEditingLyrics(!isEditingLyrics)}
                          className="text-xs text-white/50 hover:text-amber-400 font-mono flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors border border-white/5"
                          title={isEditingLyrics ? "View formatted bracketed lyrics" : "Edit or add custom lyrics"}
                        >
                          {isEditingLyrics ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-amber-400" />
                              <span>View Formatted</span>
                            </>
                          ) : (
                            <>
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit / Tweak</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => copyToClipboard(result.lyrics, "lyrics")}
                          className="text-xs text-white/50 hover:text-amber-400 font-mono flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-white/5 transition-colors border border-white/5"
                        >
                          {copiedLyrics ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-green-400" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Lyrics</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {isEditingLyrics ? (
                      <textarea
                        value={result.lyrics}
                        onChange={(e) => setResult({ ...result, lyrics: e.target.value })}
                        rows={16}
                        className="w-full p-4 bg-stone-950 rounded-2xl border border-amber-500/30 text-white/90 font-mono text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500/50 resize-y shadow-inner"
                        placeholder="Type or paste your lyrics with [Intro], [Verse], [Chorus] tags..."
                      />
                    ) : (
                      <div className="p-5 md:p-6 bg-stone-950 rounded-2xl border border-white/5 max-h-96 overflow-y-auto shadow-inner scrollbar-thin scrollbar-thumb-white/10">
                        <div className="space-y-1">
                          {highlightLyrics(result.lyrics)}
                        </div>
                      </div>
                    )}

                    {result.lyrics.length > 3000 ? (
                      <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>Warning: Exceeds Suno's 3,000 character maximum limit by {(result.lyrics.length - 3000).toLocaleString()} characters. Suno AI will cut off excess text.</span>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-white/40 font-light mt-1.5 gap-1">
                        <span>💡 Paste into Suno's <strong className="text-white/60">Lyrics</strong> box in Custom Mode. Max 3,000 characters allowed.</span>
                        <span className="font-mono text-stone-400 shrink-0">{(3000 - result.lyrics.length).toLocaleString()} chars remaining</span>
                      </div>
                    )}
                  </div>

                  {/* LIVE PROD TIPS FOR THIS GENRE */}
                  {result.tips && result.tips.length > 0 && (
                    <div className="pt-4 border-t border-white/5">
                      <h4 className="text-xs uppercase tracking-widest text-white/40 font-mono font-bold mb-3">
                        Live Producer Advice
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {result.tips.map((tip, idx) => (
                          <div key={idx} className="bg-white/[0.01] border border-white/5 p-3.5 rounded-xl text-xs text-white/60 leading-relaxed font-sans font-light">
                            <span className="block text-amber-400 font-mono font-bold mb-1">Tip 0{idx+1}</span>
                            {tip}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick Bottom Action Bar for Copy All */}
                  <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/70 p-4 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-serif font-bold text-white">Full Prompt Package Ready</div>
                        <div className="text-[11px] text-stone-400 font-light">Bundle includes Style Keywords, Description &amp; Lyric Suite</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyAll}
                      className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-md ${
                        copiedAll
                          ? "bg-emerald-500 text-stone-950"
                          : "bg-amber-500 hover:bg-amber-400 text-stone-950"
                      }`}
                    >
                      {copiedAll ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied All &#123;Style, Tags, Lyrics&#125;!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy All &#123;Style, Tags, Lyrics&#125;</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-24 text-center">
                  <Compass className="w-12 h-12 text-white/10 mb-4 animate-spin-slow" />
                  <h3 className="font-serif text-lg italic text-white/60">No generation live</h3>
                  <p className="text-white/40 text-xs font-sans max-w-xs leading-relaxed mt-2">
                    Alter parameters on the left pane and trigger the synthesis to explore custom poetic prompt layouts.
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Masterpiece Presets Shelf */}
        <section className="border-t border-white/5 bg-black/30 py-16 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="h-px w-10 bg-amber-500/40"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] gold-text font-bold">Curated Sound Presets</span>
              </div>

              {/* Preset category switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-950 border border-white/10 overflow-x-auto max-w-full text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setPresetCategory("all")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    presetCategory === "all" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  All ({PRESETS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("bambam")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    presetCategory === "bambam" ? "bg-orange-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Bam Bam Jamm (10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("busking")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    presetCategory === "busking" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-amber-300" />
                  <span>Busking (10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("trumpet")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    presetCategory === "trumpet" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Disc className="w-3.5 h-3.5 text-amber-300" />
                  <span>Trumpet Fusion (10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("raga")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    presetCategory === "raga" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Raga Classical (10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("debussy")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    presetCategory === "debussy" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  <Feather className="w-3.5 h-3.5 text-teal-400" />
                  <span>Debussy Unplugged (10)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresetCategory("harmonic")}
                  className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
                    presetCategory === "harmonic" ? "bg-amber-500 text-stone-950 font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  Harmonic Traditions
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {PRESETS.filter((preset) => {
                if (presetCategory === "bambam") return preset.id.startsWith("bambam");
                if (presetCategory === "busking") return preset.id.startsWith("busking");
                if (presetCategory === "trumpet") return preset.id.startsWith("trumpet");
                if (presetCategory === "raga") return preset.id.startsWith("raga");
                if (presetCategory === "debussy") return preset.id.startsWith("debussy");
                if (presetCategory === "harmonic") return preset.id.startsWith("suno-vocal") || preset.id.startsWith("modal-jazz") || preset.id.startsWith("bartok");
                return true;
              }).map((preset) => (
                <PresetCard
                  key={preset.id}
                  preset={preset}
                  onLoadConfig={handleLoadPreset}
                />
              ))}
            </div>
          </div>
        </section>
        </>
        )}

        {/* Studio Footer */}
        <footer className="py-8 px-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-white/40 uppercase tracking-widest font-mono gap-4">
          <div>Concept: Shine in Peace // Studio Synthesizer Suite</div>
          <div>Session Status: Serenity Anchored</div>
        </footer>

      </div>
    </div>
  );
}
