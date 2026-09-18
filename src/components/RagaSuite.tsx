import { useState, useRef, useEffect } from "react";
import {
  RAGA_PROMPTS,
  RagaPrompt,
  RAGA_GLOSSARY,
  RAGA_FILTER_REPLACEMENT
} from "../data/ragaPrompts";
import { PromptConfig, PromptResult } from "../types";
import {
  Sparkles,
  Copy,
  Check,
  Music,
  Volume2,
  VolumeX,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Filter,
  Flame,
  Sun,
  Moon,
  Compass,
  Wand2,
  BookOpen,
  Info
} from "lucide-react";

interface RagaSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function RagaSuite({
  onApplyToStudio,
  onSwitchToStudio
}: RagaSuiteProps) {
  // Filter bypass toggle: Replaces "raga" and specific raga names with safe descriptors
  const [bypassRagaFilter, setBypassRagaFilter] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);

  // Tanpura Drone Web Audio state
  const [isDronePlaying, setIsDronePlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ stop: () => void } | null>(null);

  // Invent a New Raga State
  const [inventTime, setInventTime] = useState("Dawn (Early Morning)");
  const [inventMood, setInventMood] = useState("Devotional & Meditative");
  const [inventArohana, setInventArohana] = useState("S R G P N S'");
  const [inventAvarohana, setInventAvarohana] = useState("S' N D P M G R S");
  const [inventOrnaments, setInventOrnaments] = useState("heavy meend, gamak, and andolan");
  const [inventInstrument, setInventInstrument] = useState("Solo Sitar, Tanpura Drone");
  const [copiedInventedPrompt, setCopiedInventedPrompt] = useState(false);

  // Filter prompts by category
  const categories = ["All", "Hindustani", "Carnatic", "Vocalise", "Fusion & Ambient"];
  const filteredPrompts = RAGA_PROMPTS.filter((p) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Hindustani") return p.tradition === "Hindustani";
    if (selectedCategory === "Carnatic") return p.tradition === "Carnatic";
    if (selectedCategory === "Vocalise") return p.isVocalise;
    if (selectedCategory === "Fusion & Ambient")
      return p.tradition === "Acoustic Fusion" || p.tradition === "Ambient Drone";
    return true;
  });

  const handleCopy = (text: string, id: string, type: "style" | "lyrics") => {
    navigator.clipboard.writeText(text);
    if (type === "style") {
      setCopiedStyleId(id);
      setTimeout(() => setCopiedStyleId(null), 2500);
    } else {
      setCopiedLyricsId(id);
      setTimeout(() => setCopiedLyricsId(null), 2500);
    }
  };

  const handleLoadInStudio = (prompt: RagaPrompt) => {
    const styleText = bypassRagaFilter ? prompt.filterSafeStyleText : prompt.rawStyleText;

    const studioConfig: PromptConfig = {
      subtheme: `${prompt.title} (Indian Classical)`,
      genre: `${prompt.tradition} Classical (${prompt.ensemble})`,
      mood: `${prompt.mood}, Microtonal Meend, Unplugged`,
      tempo: "Slow Alaap into Steady Gat (Unquantized Human Timing)",
      vocalType: prompt.isVocalise ? "Wordless Classical Vocalise" : "Instrumental (No Vocals)",
      instruments: prompt.tags.join(", "),
      structure: prompt.isVocalise ? "Khayal / Thumri Flow" : "Raga Arch ([Alaap] - [Jor] - [Gat] - [Jhala])"
    };

    const studioResult: PromptResult = {
      title: `${prompt.title}`,
      styleTags: styleText.length <= 115 ? styleText : styleText.slice(0, 112).trim() + "...",
      promptDescription: styleText,
      lyrics: prompt.lyricsStructure,
      tips: [
        bypassRagaFilter
          ? "Raga filter bypass is ACTIVE: uses 'Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative' to prevent Suno copyright or word filtering."
          : "Quick tip: If Suno blocks 'raga' or specific raga names, replace with: 'Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative'.",
        "For tabla, always write 'tabla only, no drum kit' to explicitly suppress Western snare or rock cymbals.",
        prompt.isVocalise
          ? "Wordless vocalise uses [Vocalise] in the lyrics box to generate pure melodic singing without simulated words."
          : "Keep '[Instrumental]' at the top of the lyrics box to strictly prevent unwanted speech or lyrics.",
        "Acoustic realism: 'string noise, finger noise, skin noise, room tone, unquantized' forces Suno to render physical chamber presence."
      ]
    };

    onApplyToStudio(studioConfig, studioResult);
    onSwitchToStudio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Web Audio API: Authentic Tanpura Pa-Sa-Sa-Sa Drone Synthesizer
  const toggleTanpuraDrone = () => {
    if (isDronePlaying) {
      if (droneNodesRef.current) {
        droneNodesRef.current.stop();
        droneNodesRef.current = null;
      }
      setIsDronePlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.2, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Tanpura standard tuning in C# / C:
      // String 1 (Pa): ~196 Hz (G3)
      // String 2 (Middle Sa): ~261.63 Hz (C4)
      // String 3 (Middle Sa): ~261.63 Hz (C4)
      // String 4 (Kharaj / Low Sa): ~130.81 Hz (C3)
      const pitches = [196.0, 261.63, 261.63, 130.81];
      const cycleInterval = 1.4; // 1.4s per string pluck
      let isAlive = true;
      const activeOscillators: OscillatorNode[] = [];

      const schedulePluck = (stringIdx: number, time: number) => {
        if (!isAlive) return;
        const freq = pitches[stringIdx];

        // Harmonic series for authentic buzzing jawari (bridge) tone
        [1, 2, 3, 4, 5, 6].forEach((harmonic, hIdx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = hIdx % 2 === 0 ? "sawtooth" : "triangle";
          // Subtle detune for natural acoustic microtonal shimmer
          const detune = (Math.random() - 0.5) * 6;
          osc.frequency.setValueAtTime(freq * harmonic, time);
          osc.detune.setValueAtTime(detune, time);

          const hGain = 0.12 / Math.pow(harmonic, 1.3);
          gain.gain.setValueAtTime(0.0001, time);
          gain.gain.exponentialRampToValueAtTime(hGain, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, time + 3.8);

          osc.connect(gain);
          gain.connect(masterGain);

          osc.start(time);
          osc.stop(time + 4.0);
          activeOscillators.push(osc);
        });
      };

      // Continuous loop scheduler
      let nextTime = ctx.currentTime;
      let currentString = 0;

      const timerId = setInterval(() => {
        if (!isAlive || ctx.state === "closed") return;
        while (nextTime < ctx.currentTime + 2.0) {
          schedulePluck(currentString, nextTime);
          currentString = (currentString + 1) % 4;
          nextTime += cycleInterval;
        }
      }, 400);

      droneNodesRef.current = {
        stop: () => {
          isAlive = false;
          clearInterval(timerId);
          masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
          setTimeout(() => {
            try {
              ctx.close();
            } catch (e) {}
          }, 600);
        }
      };

      setIsDronePlaying(true);
    } catch (e) {
      console.error("Audio error", e);
      setIsDronePlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (droneNodesRef.current) {
        droneNodesRef.current.stop();
      }
    };
  }, []);

  // Construct invented new raga prompt text
  const inventedStyleText = bypassRagaFilter
    ? `Instrumental. Indian classical, modal, drone, microtonal bends, meend, gamak, ascending/descending, meditative. ${inventInstrument}. New raga: ${inventTime.toLowerCase()}, ${inventMood.toLowerCase()}, ascending ${inventArohana}, descending ${inventAvarohana}, ${inventOrnaments}. Close-mic, room tone, finger noise, unquantized, human timing. No drums, no synth, no beat, no autotune.`
    : `Instrumental. Hindustani classical raga. ${inventInstrument}. New raga: ${inventTime.toLowerCase()}, ${inventMood.toLowerCase()}, ascending ${inventArohana}, descending ${inventAvarohana}, ${inventOrnaments}. Close-mic, room tone, finger noise, unquantized, human timing. No drums, no synth, no beat, no autotune.`;

  const handleCopyInvented = () => {
    navigator.clipboard.writeText(inventedStyleText);
    setCopiedInventedPrompt(true);
    setTimeout(() => setCopiedInventedPrompt(false), 2500);
  };

  const handleLoadInventedInStudio = () => {
    const studioConfig: PromptConfig = {
      subtheme: `Custom New Raga (${inventTime})`,
      genre: "Indian Classical (Invented Raga Formulation)",
      mood: `${inventMood}, Ascending ${inventArohana}, Descending ${inventAvarohana}`,
      tempo: "Slow Alaap into Jor (Human Timing Drift)",
      vocalType: "Instrumental (No Vocals)",
      instruments: `${inventInstrument}, Tanpura Drone, ${inventOrnaments}`,
      structure: "Alaap - Jor - Jhala - Outro"
    };

    const studioResult: PromptResult = {
      title: `New Raga Formulation (${inventTime.split(" ")[0]})`,
      styleTags:
        inventedStyleText.length <= 115
          ? inventedStyleText
          : inventedStyleText.slice(0, 112).trim() + "...",
      promptDescription: inventedStyleText,
      lyrics: `[Instrumental] [Alaap] [Jor] [Jhala] [Outro]`,
      tips: [
        "Your custom ascending/descending scale and ornaments are encoded directly into the style formulation.",
        "Suno understands swara syntax (S R G M P D N) when framed as 'ascending ... descending ...'.",
        "Keep [Instrumental] in the lyrics box to maintain pure acoustic focus."
      ]
    };

    onApplyToStudio(studioConfig, studioResult);
    onSwitchToStudio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border border-amber-500/20 p-8 sm:p-10 shadow-2xl">
        {/* Ambient atmospheric terracotta/saffron & amber glows */}
        <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-amber-600/15 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Indian Classical Raga Suite
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-xs">
              10 Unplugged Prompts
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-300 font-mono text-xs">
              Hindustani & Carnatic Traditions
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Raga Classical & Unplugged Prompts
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-3xl">
            A master collection of 10 acoustic Indian classical prompts calibrated for{" "}
            <strong className="text-white font-medium">natural, unplugged, and imperfect</strong> audio.
            Engineered with authentic raga vocabulary (<em>alaap, jor, jhala, meend, gamak, tanpura drone</em>)
            and physical acoustic realism (<em>close-mic, room tone, finger noise, tabla skin noise, microtonal bends</em>)—with{" "}
            <strong className="text-amber-300 font-medium">no synths, no drum kits, and no quantization</strong>.
          </p>

          {/* Interactive Tanpura & Navigation Action Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={toggleTanpuraDrone}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                isDronePlaying
                  ? "bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/25"
                  : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
              }`}
            >
              {isDronePlaying ? (
                <>
                  <VolumeX className="w-4 h-4 text-stone-950 animate-pulse" />
                  <span>Stop Tanpura Drone (Pa-Sa-Sa-Sa)</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Start Meditative Tanpura Drone</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => onSwitchToStudio()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs font-medium transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Go to Prompt Studio</span>
            </button>

            <a
              href="#invent-raga"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 font-mono text-xs transition-colors cursor-pointer"
            >
              <Wand2 className="w-4 h-4 text-amber-400" />
              <span>Invent a New Raga</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3 Core Rules & Workarounds Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rule 1: Style of Music Box */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs flex items-center justify-center mb-3">
              01
            </div>
            <h3 className="font-serif font-bold text-base text-white">Style Box Formulation</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              Paste the <span className="text-amber-300 font-mono">Style</span> text into Suno's <strong>Style of Music</strong> box. Always pairs specific acoustic instruments with timing instructions like <code className="text-white/80 bg-black/40 px-1 py-0.5 rounded">human timing, unquantized</code> and tactile noise.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
            Paste in: <span className="text-white/80">Style of Music Box</span>
          </div>
        </div>

        {/* Rule 2: Tabla Only (No Drum Kit) */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-300 font-mono font-bold text-xs flex items-center justify-center mb-3">
              02
            </div>
            <h3 className="font-serif font-bold text-base text-white">Suppress Western Drums</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              Suno often defaults to modern pop drum kits if percussion is left ambiguous. In our prompts, we strictly specify <strong className="text-amber-300">"tabla only, no drum kit"</strong> (or pakhavaj/mridangam) to keep the rhythm 100% authentic.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
            Enforced: <span className="text-amber-300 font-bold">tabla only, no drum kit</span>
          </div>
        </div>

        {/* Rule 3: Raga Filter Workaround Switch */}
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                Filter Workaround
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>

            <h3 className="font-serif font-bold text-base text-white">Bypass Raga Filter</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              If Suno filters "raga" or specific raga names, toggle this switch to automatically substitute:
              <span className="block mt-2 p-2 rounded-lg bg-black/50 text-[11px] font-mono text-amber-200/90 border border-amber-500/20">
                "{RAGA_FILTER_REPLACEMENT}"
              </span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-xs font-mono text-stone-300">Filter Bypass:</span>
            <button
              type="button"
              onClick={() => setBypassRagaFilter(!bypassRagaFilter)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                bypassRagaFilter
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${bypassRagaFilter ? "block" : "hidden"}`} />
              <span>{bypassRagaFilter ? "Bypass ON (Recommended)" : "Show Raw Names"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-white/40">
          Showing <span className="text-amber-300 font-bold">{filteredPrompts.length}</span> of 10 prompts
        </div>
      </div>

      {/* 10 Raga Prompts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredPrompts.map((prompt) => {
          const currentStyle = bypassRagaFilter ? prompt.filterSafeStyleText : prompt.rawStyleText;
          const isCopiedStyle = copiedStyleId === prompt.id;
          const isCopiedLyrics = copiedLyricsId === prompt.id;

          return (
            <div
              key={prompt.id}
              className="rounded-3xl bg-stone-950 border border-white/10 overflow-hidden shadow-xl hover:border-amber-500/30 transition-all flex flex-col justify-between"
            >
              {/* Card Header */}
              <div className="p-6 border-b border-white/5 bg-stone-900/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                        #{prompt.number.toString().padStart(2, "0")}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-300 font-mono text-[10px]">
                        {prompt.tradition}
                      </span>
                      <span className="text-[11px] font-mono text-white/50 flex items-center gap-1">
                        {prompt.timeOfDay.includes("Morning") || prompt.timeOfDay.includes("Dawn") ? (
                          <Sun className="w-3 h-3 text-amber-400 inline" />
                        ) : (
                          <Moon className="w-3 h-3 text-indigo-400 inline" />
                        )}
                        <span>{prompt.timeOfDay}</span>
                      </span>
                      {prompt.isVocalise && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[9px] font-bold uppercase">
                          Wordless [Vocalise]
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                      {prompt.number}. {prompt.title}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-mono mt-0.5">
                      {prompt.ragaName} • {prompt.mood}
                    </p>
                    <p className="text-xs text-stone-300 font-light mt-1.5">
                      {prompt.description}
                    </p>
                  </div>

                  {/* Send to Studio Generator button */}
                  <button
                    type="button"
                    onClick={() => handleLoadInStudio(prompt)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium transition-all shrink-0 cursor-pointer"
                    title="Load this prompt into Prompt Studio generator"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open in Studio</span>
                  </button>
                </div>

                {/* Swara Notes details if present */}
                {prompt.swaras && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-400">
                    {prompt.swaras.arohana && (
                      <div>
                        <span className="text-amber-400/80">Arohana (Asc): </span>
                        <span className="text-stone-200">{prompt.swaras.arohana}</span>
                      </div>
                    )}
                    {prompt.swaras.avarohana && (
                      <div>
                        <span className="text-orange-400/80">Avarohana (Desc): </span>
                        <span className="text-stone-200">{prompt.swaras.avarohana}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/5">
                  {prompt.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-mono text-stone-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 space-y-5">
                {/* 1. Style Text Box */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                        1. Style Box Text
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        ({currentStyle.length} chars)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(currentStyle, prompt.id, "style")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      {isCopiedStyle ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">Copied Style!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Style</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-amber-200/90 leading-relaxed select-all">
                    {currentStyle}
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    💡 Paste directly into Suno's <strong>"Style"</strong> box in Custom Mode.
                  </div>
                </div>

                {/* 2. Lyrics / Section Structure Box */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
                        2. Lyrics / Structure Tags
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-500/15 text-orange-300">
                        {prompt.isVocalise ? "[Vocalise]" : "[Instrumental]"}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(prompt.lyricsStructure, prompt.id, "lyrics")}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      {isCopiedLyrics ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300 font-bold">Copied Tags!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Lyrics Box</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-stone-300 leading-relaxed select-all">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-stone-300">
                      {prompt.lyricsStructure}
                    </pre>
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    💡 Paste in Suno's <strong>"Lyrics"</strong> box to cue organic progression without verbal artifacts.
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-stone-900/60 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-white/50">
                  Acoustic character: <span className="text-amber-300">Unplugged & Microtonal</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleLoadInStudio(prompt)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer"
                >
                  <span>Load in Prompt Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive "Invent a New Raga" Generator Tool */}
      <div
        id="invent-raga"
        className="rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 border border-amber-500/30 p-8 sm:p-10 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl relative z-10 space-y-6">
          <div className="flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Invent a New Custom Raga for Suno
            </h2>
          </div>

          <p className="text-sm text-stone-300 font-light leading-relaxed">
            Per the Suno prompt craft rule: To invent a custom raga, describe its <strong>mood</strong>,{" "}
            <strong>time of day</strong>, <strong>ascending (Arohana) / descending (Avarohana) swara shape</strong>,
            and <strong>ornaments</strong>. Adjust the controls below to generate a tailored prompt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Time of Day */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Time of Day
              </label>
              <select
                value={inventTime}
                onChange={(e) => setInventTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="Dawn (Early Morning)">Dawn (Bhairav Prahar)</option>
                <option value="Morning (Second Prahar)">Morning (Todi / Bilawal Prahar)</option>
                <option value="Afternoon (Third Prahar)">Afternoon (Sarang Prahar)</option>
                <option value="Sunset / Twilight (Sandhiprakash)">Sunset / Twilight (Marwa Prahar)</option>
                <option value="Evening (First Prahar of Night)">Evening (Yaman Prahar)</option>
                <option value="Midnight (Deep Night)">Midnight (Darbari / Bageshri Prahar)</option>
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Affect / Mood
              </label>
              <select
                value={inventMood}
                onChange={(e) => setInventMood(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="Devotional & Meditative">Devotional & Meditative (Shanta / Bhakti)</option>
                <option value="Romantic & Expressive">Romantic & Longing (Shringara)</option>
                <option value="Solemn, Deep & Majestic">Solemn, Deep & Majestic (Veera)</option>
                <option value="Introspective & Haunting">Introspective & Haunting (Karuna)</option>
                <option value="Mysterious & Trance-Inducing">Mysterious & Trance-Inducing (Adbhuta)</option>
              </select>
            </div>

            {/* Arohana (Ascending) */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Ascending Swara Shape (Arohana)
              </label>
              <input
                type="text"
                value={inventArohana}
                onChange={(e) => setInventArohana(e.target.value)}
                placeholder="e.g. S R G P N S'"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-white/40 mt-1 block">
                Quick: Pentatonic (S R G P D S') or Hexatonic (S R G P N S')
              </span>
            </div>

            {/* Avarohana (Descending) */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Descending Swara Shape (Avarohana)
              </label>
              <input
                type="text"
                value={inventAvarohana}
                onChange={(e) => setInventAvarohana(e.target.value)}
                placeholder="e.g. S' N D P M G R S"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-white/40 mt-1 block">
                Can include zigzag (vakra) paths or omitted notes
              </span>
            </div>

            {/* Instrumentation */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Acoustic Lead Ensemble
              </label>
              <select
                value={inventInstrument}
                onChange={(e) => setInventInstrument(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="Solo Sitar, Tanpura Drone">Solo Sitar & Tanpura Drone</option>
                <option value="Solo Bansuri, Tabla only no drum kit, Tanpura">Solo Bamboo Bansuri, Tabla, Tanpura</option>
                <option value="Sarod, Pakhavaj barrel drum, Tanpura">Sarod, Pakhavaj & Tanpura</option>
                <option value="Bowed Sarangi, Hammered Santoor, Tanpura">Sarangi, Santoor & Tanpura</option>
                <option value="Saraswati Veena, Mridangam only, Tanpura">Saraswati Veena, Mridangam, Tanpura</option>
                <option value="Wordless Khayal Vocalise, Tanpura, Tabla only">Wordless Khayal Vocalise & Tabla</option>
              </select>
            </div>

            {/* Ornaments */}
            <div>
              <label className="block text-xs font-mono uppercase text-amber-400 font-bold mb-2">
                Ornamentation & Touch
              </label>
              <input
                type="text"
                value={inventOrnaments}
                onChange={(e) => setInventOrnaments(e.target.value)}
                placeholder="e.g. heavy meend, gamak, and andolan"
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
              />
              <span className="text-[10px] font-mono text-white/40 mt-1 block">
                Keywords: meend (glide), gamak (shake), andolan (slow swing), murki (grace)
              </span>
            </div>
          </div>

          {/* Generated Formulation Result */}
          <div className="p-5 rounded-2xl bg-black/70 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Generated Suno Style Formulation ({inventedStyleText.length} chars)
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyInvented}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-mono text-xs font-bold transition-all hover:bg-amber-400 cursor-pointer"
                >
                  {copiedInventedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-stone-950" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Style Text</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleLoadInventedInStudio}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Send to Studio</span>
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-stone-950 border border-white/10 font-mono text-xs text-amber-200/90 leading-relaxed select-all">
              {inventedStyleText}
            </div>

            <div className="text-[11px] font-mono text-stone-400 flex items-center gap-2">
              <span className="text-white/60">Lyrics Box:</span>
              <code className="bg-black/50 px-2 py-0.5 rounded text-orange-300">
                [Instrumental] [Alaap] [Jor] [Jhala] [Outro]
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Core Raga Vocabulary Guide */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900/80 via-stone-950 to-stone-900/80 border border-white/10 text-stone-300 space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-lg text-white">
              Core Raga Vocabulary Reference Sheet
            </h3>
          </div>
          <span className="text-xs font-mono text-white/50">
            Terms recognized by Suno's diffusion model
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RAGA_GLOSSARY.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-white text-sm">
                  {item.term}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 text-[9px] font-mono uppercase">
                  {item.category}
                </span>
              </div>
              <p className="text-[11px] text-stone-300 font-light leading-relaxed">
                {item.meaning}
              </p>
              <div className="pt-2 border-t border-white/5 text-[10px] font-mono text-amber-300/80">
                💡 {item.sunoUsageTip}
              </div>
            </div>
          ))}
        </div>

        {/* Exclusions Checklist */}
        <div className="p-4 rounded-2xl bg-red-950/20 border border-red-500/20 text-xs text-stone-300 space-y-2">
          <div className="flex items-center gap-2 text-red-300 font-mono font-bold uppercase text-[11px]">
            <Info className="w-4 h-4" />
            <span>Crucial Exclusions for Authentic Acoustic Raga Generations</span>
          </div>
          <p className="text-[11px] font-light leading-relaxed">
            Always retain negative constraints in Suno's style formulation:
            <code className="text-white/90 bg-black/40 px-1.5 py-0.5 rounded ml-1 font-mono">
              no synth, no EDM, no pop, no autotune, no quantized, no drum kit, no electric instruments
            </code>
            . This prevents modern 4/4 beats or synthetic pads from intruding into the acoustic chamber.
          </p>
        </div>
      </div>
    </div>
  );
}
