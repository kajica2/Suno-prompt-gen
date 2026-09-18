import { useState, useRef } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Music,
  Info,
  ShieldCheck,
  Disc,
  Play,
  Square,
  Wand2,
  Radio,
  Layers,
  Flame,
  Search
} from "lucide-react";
import { TRUMPET_PROMPTS, TRUMPET_MASTER_TIPS, TrumpetPrompt } from "../data/trumpetPrompts";
import { PromptConfig, PromptResult } from "../types";

interface TrumpetSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function TrumpetSuite({ onApplyToStudio, onSwitchToStudio }: TrumpetSuiteProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bypassTrumpetFilter, setBypassTrumpetFilter] = useState(true);
  const [enforceOrganicTags, setEnforceOrganicTags] = useState(true);
  const [boostImperfections, setBoostImperfections] = useState(false);
  const [antiSmoothJazzGuard, setAntiSmoothJazzGuard] = useState(true);

  // Copy states
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedTipIdx, setCopiedTipIdx] = useState<number | null>(null);

  // Web Audio Muted Trumpet Audition Synth
  const [isAuditionPlaying, setIsAuditionPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeOscsRef = useRef<{ stop: () => void } | null>(null);

  const categories = [
    "All",
    "Muted & Smoky",
    "Dialogue & Interplay",
    "Dub & Ambient",
    "Rhythmic & High-Energy",
    "Raw & Imperfect"
  ];

  // Computes active style text based on user toggles
  const getActiveStyleText = (prompt: TrumpetPrompt) => {
    let text = bypassTrumpetFilter ? prompt.filterSafeStyleText : prompt.rawStyleText;

    if (boostImperfections && !text.includes("valve noise, breath, lip noise")) {
      text += " valve noise, breath, lip noise, room tone, close-mic, no reverb.";
    }

    if (antiSmoothJazzGuard && !text.includes("no smooth jazz")) {
      text += " no smooth jazz, no saxophone, no pop brass.";
    }

    if (enforceOrganicTags && !text.includes("no autotune")) {
      text += " no autotune, no pop synth, no EDM drop, no quantized.";
    }

    return text.trim();
  };

  // Filter prompts
  const filteredPrompts = TRUMPET_PROMPTS.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.rawStyleText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

  const handleCopyAll = (prompt: TrumpetPrompt) => {
    const activeStyle = getActiveStyleText(prompt);
    const lines = [
      `=== ${prompt.title.toUpperCase()} ===`,
      `Variation #${prompt.number} | Category: ${prompt.category}`,
      `Acoustic Character: ${prompt.acousticCharacter}`,
      `Tags: ${prompt.tags.join(", ")}`,
      "",
      "--- [STYLE OF MUSIC / TAGS] ---",
      activeStyle,
      "",
      "--- [DESCRIPTION] ---",
      prompt.description,
      "",
      "--- [LYRICS / SECTION STRUCTURE] ---",
      prompt.lyricsStructure
    ];
    navigator.clipboard.writeText(lines.join("\n"));
    setCopiedAllId(prompt.id);
    setTimeout(() => setCopiedAllId(null), 2500);
  };

  const handleCopyTip = (snippet: string, idx: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedTipIdx(idx);
    setTimeout(() => setCopiedTipIdx(null), 2000);
  };

  const handleLoadInStudio = (prompt: TrumpetPrompt) => {
    const activeStyle = getActiveStyleText(prompt);

    const studioConfig: PromptConfig = {
      subtheme: `${prompt.title} (Liquid DnB Trumpet Fusion)`,
      genre: "Liquid Drum and Bass, Ambient Microhouse, Jazz Trumpet",
      mood: `${prompt.acousticCharacter}, Contemplative Float, Unquantized`,
      tempo: prompt.category === "Rhythmic & High-Energy" ? "Rolling Breakbeat (174 BPM)" : "Liquid Breakbeat Pulse (174 BPM / Rubato)",
      vocalType: "Intimate rhythmic voice, restrained doubles, raga noon inflections",
      instruments: `acoustic jazz trumpet (${prompt.tags[0]}), hand-played tabla, deep sub, microhouse clicks, dub delay`,
      structure: prompt.lyricsStructure
    };

    const studioResult: PromptResult = {
      title: prompt.title,
      styleTags: activeStyle.length <= 120 ? activeStyle : activeStyle.slice(0, 117).trim() + "...",
      promptDescription: activeStyle,
      lyrics: prompt.lyricsStructure,
      tips: [
        "Paste the full Style prompt into Suno's 'Style of Music' box.",
        "Paste the bracketed tags into Suno's 'Lyrics' box to cue the trumpet solos and breaks without verbal lyrics.",
        bypassTrumpetFilter
          ? "Bypass Filter mode is ON: 'acoustic trumpet, Harmon mute, smoky' replaces generic 'jazz trumpet' to ensure acoustic realization."
          : "Standard mode: uses raw prompt text.",
        "Keep the trumpet cues sparse to prevent Suno from synthesizing an entire brass section."
      ]
    };

    onApplyToStudio(studioConfig, studioResult);
    onSwitchToStudio();
  };

  // Play Harmon Mute Trumpet Acoustic Demo (Web Audio)
  const playHarmonTrumpetDemo = () => {
    if (isAuditionPlaying) {
      if (activeOscsRef.current) activeOscsRef.current.stop();
      setIsAuditionPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Modal phrase in C: C4, Eb4, F4, F#4, G4, Bb4, C5 (Blue note raga/jazz inflection)
      const notes = [261.63, 311.13, 349.23, 369.99, 392.0, 466.16, 523.25];
      const durations = [0.45, 0.4, 0.5, 0.35, 0.65, 0.45, 0.9];
      let currentTime = ctx.currentTime + 0.05;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.35, ctx.currentTime);

      // Harmon Mute Filter: Bandpass at ~1500Hz with high resonance + notch at 3kHz
      const muteFilter = ctx.createBiquadFilter();
      muteFilter.type = "bandpass";
      muteFilter.frequency.setValueAtTime(1450, ctx.currentTime);
      muteFilter.Q.setValueAtTime(4.2, ctx.currentTime);

      const highShelf = ctx.createBiquadFilter();
      highShelf.type = "highshelf";
      highShelf.frequency.setValueAtTime(3200, ctx.currentTime);
      highShelf.gain.setValueAtTime(-9, ctx.currentTime);

      muteFilter.connect(highShelf);
      highShelf.connect(masterGain);
      masterGain.connect(ctx.destination);

      const activeNodes: OscillatorNode[] = [];

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        // Sawtooth wave filtered down yields characteristic brass buzz
        osc.type = "sawtooth";
        // Subtle microtonal pitch drift (meend/blue note bend)
        const bend = i === 3 ? -12 : i === 4 ? 6 : 0;
        osc.frequency.setValueAtTime(freq + bend, currentTime);

        // Brass envelope: sharp breath attack, sustain, soft release
        noteGain.gain.setValueAtTime(0.0001, currentTime);
        noteGain.gain.exponentialRampToValueAtTime(0.5, currentTime + 0.04);
        noteGain.gain.exponentialRampToValueAtTime(0.35, currentTime + 0.2);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, currentTime + durations[i]);

        osc.connect(noteGain);
        noteGain.connect(muteFilter);

        osc.start(currentTime);
        osc.stop(currentTime + durations[i] + 0.05);
        activeNodes.push(osc);

        currentTime += durations[i] * 0.92; // Legato overlap
      });

      setIsAuditionPlaying(true);
      activeOscsRef.current = {
        stop: () => {
          activeNodes.forEach((o) => {
            try {
              o.stop();
            } catch (e) {}
          });
          ctx.close();
        }
      };

      setTimeout(() => {
        setIsAuditionPlaying(false);
      }, (currentTime - ctx.currentTime + 0.2) * 1000);
    } catch (err) {
      console.error("Web audio failed:", err);
      setIsAuditionPlaying(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Header */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-b from-amber-950/40 via-stone-900 to-stone-950 border border-amber-500/30 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-amber-500/30">
              <Disc className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span>Suno Fusion Suite</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 font-mono text-xs border border-white/10">
              10 Acoustic Jazz Trumpet Variations
            </span>
            <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-mono text-xs">
              Liquid DnB • Microhouse • Raga Noon
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Acoustic Jazz Trumpet × Liquid DnB
          </h1>

          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
            Ten meticulously crafted Suno prompt formulations pairing an intimate rhythmic vocal, hand-played tabla, microhouse clicks, and submerged dub delay with <strong>expressive acoustic trumpet</strong>. Featuring Harmon mutes, behind-the-beat blue notes, jugalbandi tabla duels, flugelhorn warmth, and tactile valve clicks.
          </p>

          {/* Quick Audition & Studio Button Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={playHarmonTrumpetDemo}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all shadow-lg cursor-pointer border ${
                isAuditionPlaying
                  ? "bg-amber-400 text-stone-950 border-amber-300 shadow-amber-500/30"
                  : "bg-white/10 hover:bg-white/15 text-amber-300 border-amber-500/30"
              }`}
              title="Preview Harmon-muted brass timbre synthesized in browser Web Audio"
            >
              {isAuditionPlaying ? (
                <>
                  <Square className="w-4 h-4 fill-current" />
                  <span>Playing Harmon Mute Tone...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Audition Harmon Mute Timbre</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleLoadInStudio(TRUMPET_PROMPTS[0])}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-mono text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Load Lead Trumpet in Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Control Bar: Toggles & Search */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-white/10 space-y-5 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Prompt Engine Modifiers</span>
            </span>
            <p className="text-xs text-stone-400 font-light mt-0.5">
              Toggle automatic filter bypass, organic pulse tags, and acoustic imperfection layers across all 10 cards.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search trumpet techniques..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 4 Interactive Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/5">
          {/* Toggle 1: Bypass AI Filter */}
          <div
            onClick={() => setBypassTrumpetFilter(!bypassTrumpetFilter)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
              bypassTrumpetFilter
                ? "bg-amber-500/15 border-amber-500/40 text-white"
                : "bg-black/40 border-white/5 text-stone-400 hover:border-white/10"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-md ${bypassTrumpetFilter ? "bg-amber-500 text-stone-950 font-bold" : "bg-white/10 text-white/40"}`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold flex items-center gap-1">
                <span>Filter Bypass</span>
                <span className="text-[10px] text-amber-300 font-normal">(Active)</span>
              </div>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">
                Swaps flagged "jazz trumpet" with tactile acoustic descriptors.
              </p>
            </div>
          </div>

          {/* Toggle 2: Enforce Organic Pulse */}
          <div
            onClick={() => setEnforceOrganicTags(!enforceOrganicTags)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
              enforceOrganicTags
                ? "bg-amber-500/15 border-amber-500/40 text-white"
                : "bg-black/40 border-white/5 text-stone-400 hover:border-white/10"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-md ${enforceOrganicTags ? "bg-amber-500 text-stone-950 font-bold" : "bg-white/10 text-white/40"}`}>
              <Radio className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold">Organic Pulse Guard</div>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">
                Appends "no autotune, no pop synth, no EDM drop, no quantized".
              </p>
            </div>
          </div>

          {/* Toggle 3: Anti-Smooth-Jazz Guard */}
          <div
            onClick={() => setAntiSmoothJazzGuard(!antiSmoothJazzGuard)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
              antiSmoothJazzGuard
                ? "bg-amber-500/15 border-amber-500/40 text-white"
                : "bg-black/40 border-white/5 text-stone-400 hover:border-white/10"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-md ${antiSmoothJazzGuard ? "bg-amber-500 text-stone-950 font-bold" : "bg-white/10 text-white/40"}`}>
              <Music className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold">Anti-Smooth-Jazz</div>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">
                Blocks 1980s elevator sax: "no smooth jazz, no saxophone".
              </p>
            </div>
          </div>

          {/* Toggle 4: Boost Imperfections */}
          <div
            onClick={() => setBoostImperfections(!boostImperfections)}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3 ${
              boostImperfections
                ? "bg-amber-500/15 border-amber-500/40 text-white"
                : "bg-black/40 border-white/5 text-stone-400 hover:border-white/10"
            }`}
          >
            <div className={`mt-0.5 p-1 rounded-md ${boostImperfections ? "bg-amber-500 text-stone-950 font-bold" : "bg-white/10 text-white/40"}`}>
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold">Acoustic Imperfections</div>
              <p className="text-[11px] text-stone-400 font-light mt-0.5">
                Injects valve clicks, breath, lip noise, spit, room tone.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/5 scrollbar-thin scrollbar-thumb-white/10">
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider shrink-0 mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-sm"
                  : "bg-white/5 hover:bg-white/10 border-white/5 text-stone-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 10 Variations Cards Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredPrompts.map((prompt) => {
          const activeStyle = getActiveStyleText(prompt);
          const isCopiedStyle = copiedStyleId === prompt.id;
          const isCopiedLyrics = copiedLyricsId === prompt.id;
          const isCopiedAll = copiedAllId === prompt.id;

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
                        {prompt.category}
                      </span>
                      <span className="text-[11px] font-mono text-white/50">
                        {prompt.acousticCharacter}
                      </span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                      {prompt.number}. {prompt.title}
                    </h3>
                    <p className="text-xs text-amber-300/80 font-mono mt-0.5">
                      {prompt.subtitle}
                    </p>
                    <p className="text-xs text-stone-300 font-light mt-1.5 leading-relaxed">
                      {prompt.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopyAll(prompt)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                        isCopiedAll
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/30 text-amber-300"
                      }`}
                      title="Copy Style, Tags, and Lyrics all together"
                    >
                      {isCopiedAll ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied All!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy All &#123;Style, Tags, Lyrics&#125;</span>
                        </>
                      )}
                    </button>

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
                </div>

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

              {/* Two Prompt Boxes: Style & Lyrics */}
              <div className="p-6 space-y-4 flex-1">
                {/* 1. Style Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1.5">
                      <Music className="w-3 h-3 text-amber-400" />
                      <span>Suno Style Box ({activeStyle.length} chars)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(activeStyle, prompt.id, "style")}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-amber-300 transition-colors cursor-pointer border border-white/5"
                    >
                      {isCopiedStyle ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Style Box</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-stone-200 leading-relaxed select-all">
                    {activeStyle}
                  </div>
                </div>

                {/* 2. Lyrics Box */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-300 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-orange-400" />
                      <span>Suno Lyrics Box (Structure Cues)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => handleCopy(prompt.lyricsStructure, prompt.id, "lyrics")}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-orange-300 transition-colors cursor-pointer border border-white/5"
                    >
                      {isCopiedLyrics ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
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
                    <pre className="whitespace-pre-wrap font-mono text-xs text-amber-200/90">
                      {prompt.lyricsStructure}
                    </pre>
                  </div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    💡 Paste into Suno's <strong>"Lyrics"</strong> box to dictate trumpet solos, breaks, and drop sequencing without verbal artifacts.
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-stone-900/60 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyAll(prompt)}
                  className="flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
                >
                  {isCopiedAll ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-bold">
                      <Check className="w-3.5 h-3.5" /> Copied &#123;Style, Tags, Lyrics&#125;
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5" /> Copy All &#123;Style, Tags, Lyrics&#125;
                    </span>
                  )}
                </button>

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
      <div className="p-8 rounded-3xl bg-gradient-to-r from-stone-900/80 via-stone-950 to-stone-900/80 border border-white/10 text-stone-300 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="font-serif font-bold text-lg text-white">
            Master Rules for Suno Trumpet & Brass Generations
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRUMPET_MASTER_TIPS.map((tip, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono font-bold text-amber-300 mb-1">{tip.title}</div>
                <p className="text-xs text-white/60 font-light leading-relaxed">{tip.explanation}</p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                <code className="text-[11px] font-mono text-amber-200/90 truncate max-w-[200px]" title={tip.snippet}>
                  {tip.snippet}
                </code>
                <button
                  type="button"
                  onClick={() => handleCopyTip(tip.snippet, idx)}
                  className="px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-[10px] font-mono text-amber-400 shrink-0 transition-colors cursor-pointer"
                >
                  {copiedTipIdx === idx ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200/90 leading-relaxed flex items-start gap-3">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Why Single Soloist Precision Matters:</strong> Suno’s neural audio model treats the term "brass" or multi-layered instrument lists as a prompt to synthesize a dense horn section or big band. Sticking strictly to <code>solo acoustic trumpet, Harmon mute, lyrical, single horn</code> guarantees the intimate, smoky club presence needed for liquid DnB and microhouse.
          </div>
        </div>
      </div>
    </div>
  );
}
