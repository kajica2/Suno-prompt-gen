import { useState } from "react";
import { DEBUSSY_PROMPTS, DebussyPrompt } from "../data/debussyPrompts";
import { PromptConfig, PromptResult } from "../types";
import {
  Sparkles,
  Copy,
  Check,
  Music,
  Wind,
  Layers,
  Volume2,
  Info,
  ShieldCheck,
  ArrowRight,
  Sliders,
  Filter
} from "lucide-react";

interface DebussySuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function DebussySuite({
  onApplyToStudio,
  onSwitchToStudio,
}: DebussySuiteProps) {
  // Toggle for composer filter bypass:
  // Replaces "Debussy-esque" with "French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato"
  const [bypassComposerFilter, setBypassComposerFilter] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Filter prompts by category
  const allTags = ["All", "Felt Piano", "Chamber", "Strings", "Flute", "Harp", "Vocalise"];
  const filteredPrompts = DEBUSSY_PROMPTS.filter((p) => {
    if (selectedTag === "All") return true;
    if (selectedTag === "Felt Piano") return p.tags.some((t) => t.includes("Piano"));
    if (selectedTag === "Chamber") return p.tags.some((t) => t.includes("Chamber") || t.includes("Quartet"));
    if (selectedTag === "Strings") return p.tags.some((t) => t.includes("Strings") || t.includes("Cello"));
    if (selectedTag === "Flute") return p.tags.some((t) => t.includes("Flute") || t.includes("Clarinet") || t.includes("Oboe"));
    if (selectedTag === "Harp") return p.tags.some((t) => t.includes("Harp"));
    if (selectedTag === "Vocalise") return p.isVocalise;
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

  const handleLoadInStudio = (prompt: DebussyPrompt) => {
    const styleText = bypassComposerFilter ? prompt.filterSafeStyleText : prompt.rawStyleText;

    // Convert into studio config
    const studioConfig: PromptConfig = {
      subtheme: `Impressionist ${prompt.title} (Debussy Sound)`,
      genre: prompt.ensemble,
      mood: "Impressionist, Whole-Tone, Rubato, Unplugged",
      tempo: "Rubato (Unquantized Human Drift)",
      vocalType: prompt.isVocalise ? "Wordless Mezzo-Soprano Vocalise" : "Instrumental (No Vocals)",
      instruments: prompt.tags.join(", "),
      structure: prompt.isVocalise ? "Vocalise Flow" : "Impressionist Arch"
    };

    // Prepare studio result
    const studioResult: PromptResult = {
      title: `${prompt.title} (Impressionist)`,
      styleTags: styleText.length <= 115 ? styleText : styleText.slice(0, 112).trim() + "...",
      promptDescription: styleText,
      lyrics: prompt.lyricsStructure,
      tips: [
        bypassComposerFilter
          ? "Composer filter bypass is ACTIVE: uses 'French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato' to prevent Suno copyright warnings."
          : "Quick tip: If Suno blocks 'Debussy', replace with 'French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato'.",
        prompt.isVocalise
          ? "For wordless vocals, '[Vocalise]' in Suno's Lyrics box prompts melodic humming without lyrical babble."
          : "Keep '[Instrumental]' at the top of Suno's lyrics box to strictly suppress artificial voices.",
        "Acoustic realism: keywords like 'pedal noise', 'room tone', 'chair creak', and 'tape saturation' instruct Suno's diffusion model to render lifelike analog space."
      ]
    };

    onApplyToStudio(studioConfig, studioResult);
    onSwitchToStudio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Web Audio Demo: Play an authentic French Impressionist whole-tone / ninth chord
  const playImpressionistChords = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      setIsPlayingAudio(true);

      // Whole-tone & 9th chord frequencies: C4, D4, E4, F#4, G#4, Bb4, D5 (pure whole-tone scale)
      const freqs = [261.63, 293.66, 329.63, 369.99, 415.3, 466.16, 587.33];

      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Soft sine-triangle blend for warm felt piano / harp timbre
        osc.type = idx % 2 === 0 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Rubato staggered arpeggio entry
        const startTime = ctx.currentTime + idx * 0.14;
        const stopTime = startTime + 3.2;

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.18 / (idx * 0.3 + 1), startTime + 0.08);
        // Soft linger and long pedal sustain decay
        gain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(stopTime);
      });

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 4200);
    } catch (e) {
      console.error(e);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border border-amber-500/20 p-8 sm:p-10 shadow-2xl">
        {/* Ambient atmospheric watercolor glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-wider font-semibold">
              Impressionist Master Collection
            </span>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 font-mono text-xs">
              10 Unplugged Prompts
            </span>
            <span className="px-3 py-1 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-xs">
              Natural Room Tone & Rubato
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Debussy-Style Natural & Unplugged Prompts
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mt-3 max-w-3xl">
            A curated suite of 10 authentic acoustic French Impressionist prompts designed to evoke
            warm felt piano, breathy woodwinds, muted strings, whole-tone harmonies, and organic room
            imperfections—with <strong className="text-white font-medium">zero drums, zero synths, and no artificial beats</strong>.
          </p>

          {/* Quick Audio & Action Bar */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={playImpressionistChords}
              disabled={isPlayingAudio}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20"
                  : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-pulse" : "text-amber-400"}`} />
              <span>{isPlayingAudio ? "Auditioning Whole-Tone Ninth Chord..." : "Play Whole-Tone Harmonic Preview"}</span>
            </button>

            <button
              type="button"
              onClick={() => onSwitchToStudio()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-mono text-xs font-medium transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4" />
              <span>Go to Prompt Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* How To Use & Filter Bypass Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 1: Style Box */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-bold text-xs flex items-center justify-center mb-3">
              01
            </div>
            <h3 className="font-serif font-bold text-base text-white">Suno Style Box</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              Copy the <span className="text-amber-300 font-mono">Style Text</span> into Suno's <strong>Style of Music</strong> box. It specifies exact acoustic timbres, whole-tone scales, and negative space (e.g. <em>no drums, no synth, no beat</em>).
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
            Paste in: <span className="text-white/80">Style of Music Box</span>
          </div>
        </div>

        {/* Step 2: Lyrics Box */}
        <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 flex flex-col justify-between">
          <div>
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/30 text-teal-300 font-mono font-bold text-xs flex items-center justify-center mb-3">
              02
            </div>
            <h3 className="font-serif font-bold text-base text-white">Lyrics / Section Box</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              For instrumental tracks, put <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">[Instrumental]</code> plus section cues <code className="text-teal-300 bg-black/40 px-1 py-0.5 rounded">[Intro] [Theme] [Bridge] [Outro]</code> in the <strong>Lyrics</strong> box. For track 06, use <code className="text-amber-300 bg-black/40 px-1 py-0.5 rounded">[Vocalise]</code> instead!
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-white/50">
            Paste in: <span className="text-white/80">Lyrics Box (Custom Mode)</span>
          </div>
        </div>

        {/* Step 3: Composer Filter Bypass */}
        <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                Pro Tip
              </span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>

            <h3 className="font-serif font-bold text-base text-white">Bypass Composer Filter</h3>
            <p className="text-xs text-stone-300 mt-1.5 leading-relaxed font-light">
              If Suno flags or filters the word <em>"Debussy"</em>, toggle this switch to auto-substitute:
              <span className="block mt-2 p-2 rounded-lg bg-black/50 text-[11px] font-mono text-amber-200/90 border border-amber-500/20">
                "French Impressionist, early 20th century, whole-tone, parallel chords, pedal-heavy, rubato"
              </span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-amber-500/20 flex items-center justify-between">
            <span className="text-xs font-mono text-stone-300">Filter Bypass:</span>
            <button
              type="button"
              onClick={() => setBypassComposerFilter(!bypassComposerFilter)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                bypassComposerFilter
                  ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${bypassComposerFilter ? "block" : "hidden"}`} />
              <span>{bypassComposerFilter ? "Bypass ON (Recommended)" : "Show Raw Name"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between flex-wrap gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs transition-all cursor-pointer shrink-0 ${
                selectedTag === tag
                  ? "bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-white/40">
          Showing <span className="text-amber-300 font-bold">{filteredPrompts.length}</span> of 10 prompts
        </div>
      </div>

      {/* 10 Prompts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredPrompts.map((prompt) => {
          const currentStyle = bypassComposerFilter ? prompt.filterSafeStyleText : prompt.rawStyleText;
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
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold">
                        #{prompt.number.toString().padStart(2, "0")}
                      </span>
                      <span className="text-[11px] font-mono text-teal-300/80">
                        {prompt.ensemble}
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
                    <p className="text-xs text-stone-300 font-light mt-1">
                      {prompt.subtitle}
                    </p>
                  </div>

                  {/* Send to Generator button */}
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

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
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
                        1. Style Text
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
                      <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                        2. Lyrics / Structure Cues
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-300">
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
                          <span className="text-emerald-300 font-bold">Copied Structure!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Lyrics Box</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-stone-300 leading-relaxed max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 select-all">
                    <pre className="whitespace-pre-wrap font-mono text-xs text-stone-300">
                      {prompt.lyricsStructure}
                    </pre>
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    💡 Paste into Suno's <strong>"Lyrics"</strong> box to dictate pacing without unwanted words.
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-stone-900/60 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="text-[11px] font-mono text-white/50">
                  Acoustic character: <span className="text-amber-300">Natural & Unplugged</span>
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

      {/* Bottom Summary & Master Tips Box */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900/80 via-stone-950 to-stone-900/80 border border-white/10 text-stone-300 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif font-bold text-lg text-white">
            Master Rules for Debussy & Impressionist Suno Generations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed font-light">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-amber-300 block font-mono font-medium">1. Avoid Unwanted Beats & Drums</strong>
            <p>
              Suno's diffusion model defaults to pop drums if you specify too many modern instruments. Keep prompts sparse and always reinforce with <code>No drums, no synth, no beat</code>.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-amber-300 block font-mono font-medium">2. Tactile Room Mechanics</strong>
            <p>
              Keywords like <code>pedal noise</code>, <code>room tone</code>, <code>bench creak</code>, <code>audible breaths</code>, and <code>tape saturation</code> anchor the audio in authentic acoustic physics.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
            <strong className="text-amber-300 block font-mono font-medium">3. Unquantized Rubato Timing</strong>
            <p>
              Impressionism relies on expressive tempo flexibility. Specifying <code>rubato</code> and <code>human timing drift, unquantized</code> prevents mechanical grid alignment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
