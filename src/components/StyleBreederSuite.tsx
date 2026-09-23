import { useState } from "react";
import {
  Sparkles,
  Dna,
  Shuffle,
  Copy,
  Check,
  ArrowRight,
  Sliders,
  Flame,
  Disc,
  Radio,
  Clock,
  Music,
  Info,
  Layers,
  Ban,
  RefreshCw,
  Zap,
  BookOpen
} from "lucide-react";
import { PRESETS } from "../presets";
import {
  BreedStyleParent,
  BreedStylesRequest,
  BreedStylesResult,
  PromptConfig,
  PromptResult,
  Preset
} from "../types";

interface StyleBreederSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function StyleBreederSuite({ onApplyToStudio, onSwitchToStudio }: StyleBreederSuiteProps) {
  // Selectable presets pool
  const allPresets = PRESETS;

  // Selected Parents
  const [selectedParentAId, setSelectedParentAId] = useState<string>(
    allPresets.find((p) => p.id.startsWith("oddmeter-seven-eight"))?.id || allPresets[0].id
  );
  const [selectedParentBId, setSelectedParentBId] = useState<string>(
    allPresets.find((p) => p.id.startsWith("afro1965-lagos-1965"))?.id || allPresets[1].id
  );

  // Breeding Controls
  const [ratio, setRatio] = useState<number>(50); // % Parent A vs Parent B
  const [hybridMode, setHybridMode] = useState<"harmonic_fusion" | "rhythmic_crossbreed" | "contrast_chasm" | "polymetric_hybrid" | "custom">("harmonic_fusion");
  const [targetMeter, setTargetMeter] = useState<string>("auto");
  const [mutationFactor, setMutationFactor] = useState<number>(30);
  const [additionalDesires, setAdditionalDesires] = useState<string>("");

  // Result state
  const [isBreeding, setIsBreeding] = useState<boolean>(false);
  const [breedingResult, setBreedingResult] = useState<BreedStylesResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Copy feedbacks
  const [copiedStyle, setCopiedStyle] = useState<boolean>(false);
  const [copiedArrangement, setCopiedArrangement] = useState<boolean>(false);
  const [copiedBundle, setCopiedBundle] = useState<boolean>(false);
  const [copiedNegative, setCopiedNegative] = useState<boolean>(false);

  // Helper to get parent info from selected ID
  const getParentData = (presetId: string): BreedStyleParent => {
    const p = allPresets.find((item) => item.id === presetId) || allPresets[0];
    return {
      name: p.name,
      styleTags: p.sampleResult.styleTags,
      instrumentation: p.config.instruments,
      tempo: p.config.tempo,
      meter: p.id.startsWith("oddmeter") ? p.config.subtheme.match(/\b(\d+\/\d+)\b/)?.[1] : undefined,
      negativePrompt: p.config.negativePrompt,
      structureSnippet: p.config.structure
    };
  };

  const handleRandomizeParents = () => {
    const idxA = Math.floor(Math.random() * allPresets.length);
    let idxB = Math.floor(Math.random() * allPresets.length);
    while (idxB === idxA && allPresets.length > 1) {
      idxB = Math.floor(Math.random() * allPresets.length);
    }
    setSelectedParentAId(allPresets[idxA].id);
    setSelectedParentBId(allPresets[idxB].id);
  };

  const handleSwapParents = () => {
    const temp = selectedParentAId;
    setSelectedParentAId(selectedParentBId);
    setSelectedParentBId(temp);
  };

  const handleBreed = async () => {
    setIsBreeding(true);
    setError(null);

    const parentA = getParentData(selectedParentAId);
    const parentB = getParentData(selectedParentBId);

    const payload: BreedStylesRequest = {
      parentA,
      parentB,
      ratio,
      hybridMode,
      targetMeter: targetMeter === "auto" ? undefined : targetMeter,
      mutationFactor,
      additionalDesires: additionalDesires.trim() || undefined
    };

    try {
      const res = await fetch("/api/breed-styles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Breeding failed with status ${res.status}`);
      }

      const data: BreedStylesResult = await res.json();
      setBreedingResult(data);
    } catch (err: any) {
      console.error("Breeding error:", err);
      setError("Breeding service encountered an error. A fallback procedural hybrid was generated.");
    } finally {
      setIsBreeding(false);
    }
  };

  const handleApplyToStudio = () => {
    if (!breedingResult) return;
    const config: PromptConfig = breedingResult.suggestedConfig;
    const result: PromptResult = {
      title: breedingResult.childTitle,
      styleTags: breedingResult.styleTags,
      promptDescription: breedingResult.promptDescription,
      lyrics: breedingResult.arrangementPrompt,
      negativePrompt: breedingResult.negativePrompt,
      tips: [
        `Cross-bred Style: ${breedingResult.childTitle}`,
        `Lineage: ${ratio}% ${getParentData(selectedParentAId).name} × ${100 - ratio}% ${getParentData(selectedParentBId).name}`,
        ...breedingResult.tips
      ],
      isFallback: breedingResult.isFallback
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const parentAData = getParentData(selectedParentAId);
  const parentBData = getParentData(selectedParentBId);

  const copyToClipboard = (text: string, type: "style" | "arrangement" | "bundle" | "negative") => {
    navigator.clipboard.writeText(text);
    if (type === "style") {
      setCopiedStyle(true);
      setTimeout(() => setCopiedStyle(false), 2000);
    } else if (type === "arrangement") {
      setCopiedArrangement(true);
      setTimeout(() => setCopiedArrangement(false), 2000);
    } else if (type === "bundle") {
      setCopiedBundle(true);
      setTimeout(() => setCopiedBundle(false), 2000);
    } else if (type === "negative") {
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-cyan-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                <Dna className="w-3.5 h-3.5 text-purple-400" />
                Genetic Style Breeder
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                Cross-Pollinate Musical Traditions
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono border border-cyan-500/30">
                Ethio-Jazz × Afrobeat × Odd Meters × ASMR
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white font-medium">
              Breed Novel Musical Styles
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
              Cross-pollinate two disparate musical traditions, select their lineage ratio, inject controlled sonic mutations, and breed a completely coherent new musical genre ready for Suno AI.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRandomizeParents}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-purple-400" />
              <span>Surprise Parents</span>
            </button>
            <button
              onClick={handleSwapParents}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
              title="Swap Parent A and Parent B"
            >
              <RefreshCw className="w-4 h-4 text-cyan-400" />
              <span>Swap Lineage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Breeding Lab Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Parents Selection & Chromosome Knobs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Chromosome Pair Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Parent A Selection Card */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-purple-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-300 font-bold flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5 text-purple-400" />
                  Parent A ({ratio}%)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  Primary Chromosome
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">Select Musical Heritage:</label>
                <select
                  value={selectedParentAId}
                  onChange={(e) => setSelectedParentAId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-purple-500/50"
                >
                  {allPresets.map((p) => (
                    <option key={`a-${p.id}`} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-stone-950/60 rounded-xl border border-white/5 space-y-1 text-xs font-mono">
                <div className="text-[11px] text-stone-300 truncate">
                  <span className="text-stone-500">Tags:</span> {parentAData.styleTags}
                </div>
                <div className="text-[11px] text-stone-400 truncate">
                  <span className="text-stone-500">Instruments:</span> {parentAData.instrumentation}
                </div>
              </div>
            </div>

            {/* Parent B Selection Card */}
            <div className="p-5 rounded-2xl bg-stone-900/80 border border-cyan-500/30 space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5 text-cyan-400" />
                  Parent B ({100 - ratio}%)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                  Secondary Chromosome
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">Select Musical Heritage:</label>
                <select
                  value={selectedParentBId}
                  onChange={(e) => setSelectedParentBId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-cyan-500/50"
                >
                  {allPresets.map((p) => (
                    <option key={`b-${p.id}`} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-3 bg-stone-950/60 rounded-xl border border-white/5 space-y-1 text-xs font-mono">
                <div className="text-[11px] text-stone-300 truncate">
                  <span className="text-stone-500">Tags:</span> {parentBData.styleTags}
                </div>
                <div className="text-[11px] text-stone-400 truncate">
                  <span className="text-stone-500">Instruments:</span> {parentBData.instrumentation}
                </div>
              </div>
            </div>
          </div>

          {/* Genetic Ratio Slider */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold">
                Parent A: {ratio}%
              </span>
              <span className="text-stone-400 uppercase tracking-wider text-[11px]">
                Genetic Dominance Ratio
              </span>
              <span className="text-cyan-300 font-bold">
                Parent B: {100 - ratio}%
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={90}
              value={ratio}
              onChange={(e) => setRatio(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer h-2 bg-stone-950 rounded-lg appearance-none"
            />

            <div className="flex justify-between text-[10px] font-mono text-stone-500">
              <span>Dominant Parent A</span>
              <span>50/50 Equidistant Braid</span>
              <span>Dominant Parent B</span>
            </div>
          </div>

          {/* Breeding Parameters */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-amber-400" />
              Hybridization Architecture
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Architecture Mode */}
              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">Hybrid Mode:</label>
                <select
                  value={hybridMode}
                  onChange={(e: any) => setHybridMode(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-amber-500/50"
                >
                  <option value="harmonic_fusion">Harmonic Fusion (Modal Braid)</option>
                  <option value="rhythmic_crossbreed">Rhythmic Crossbreed (Polyrhythmic Graft)</option>
                  <option value="contrast_chasm">Contrast Chasm (Dark / Bright Dynamic)</option>
                  <option value="polymetric_hybrid">Polymetric Hybrid (Odd Meter Engine)</option>
                </select>
              </div>

              {/* Target Meter */}
              <div>
                <label className="text-[11px] font-mono text-stone-400 block mb-1">Metric Grid / Time Signature:</label>
                <select
                  value={targetMeter}
                  onChange={(e) => setTargetMeter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-amber-500/50"
                >
                  <option value="auto">Auto (Synthesized from lineage)</option>
                  <option value="7/8">7/8 (Tezeta Additive Pulse)</option>
                  <option value="3/4">3/4 (Contemplative Waltz Swing)</option>
                  <option value="9/8">9/8 (Syncopated Bounce)</option>
                  <option value="11/8">11/8 (Hypnotic Drift)</option>
                  <option value="10/8">10/8 (3-3-2-2 African Pocket)</option>
                  <option value="5/4">5/4 (3-2 Clave Feel)</option>
                  <option value="13/8">13/8 (Extended Cycle)</option>
                  <option value="4/4 syncopated">Syncopated 4/4 Pocket</option>
                </select>
              </div>
            </div>

            {/* Mutation Factor */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-stone-300">Novel Mutation Factor:</span>
                <span className="text-amber-400 font-bold">{mutationFactor}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={mutationFactor}
                onChange={(e) => setMutationFactor(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-stone-950 rounded-lg appearance-none"
              />
              <p className="text-[10px] text-stone-400 font-light">
                Higher mutation introduces spontaneous timbres: analog tape flutter, binaural breath, or microtonal inflections.
              </p>
            </div>

            {/* Additional Desires */}
            <div>
              <label className="text-[11px] font-mono text-stone-400 block mb-1">Specific Nuances / Additional Direction (Optional):</label>
              <input
                type="text"
                value={additionalDesires}
                onChange={(e) => setAdditionalDesires(e.target.value)}
                placeholder="e.g. emphasize vibraphone lead over heavy sub-bass..."
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-amber-500/50 placeholder:text-stone-600"
              />
            </div>
          </div>

          {/* Trigger Breed Button */}
          <button
            onClick={handleBreed}
            disabled={isBreeding}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 hover:opacity-95 text-stone-950 text-sm font-mono font-bold transition-all cursor-pointer shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isBreeding ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Sequencing & Breeding Hybrid Chromosomes...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-stone-950" />
                <span>Breed New Style Now</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Bred Hybrid Offspring Incubator */}
        <div className="lg:col-span-6 space-y-6">
          {breedingResult ? (
            <div className="rounded-3xl border border-purple-500/40 bg-stone-900/90 p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden animate-in fade-in duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Child Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                      Genetically Bred Offspring
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                      {breedingResult.meter}
                    </span>
                  </div>
                  <h2 className="text-2xl font-serif text-white font-medium">
                    {breedingResult.childTitle}
                  </h2>
                  <p className="text-xs text-stone-300 font-mono">
                    Lineage: <span className="text-purple-300">{parentAData.name} ({ratio}%)</span> × <span className="text-cyan-300">{parentBData.name} ({100 - ratio}%)</span>
                  </p>
                </div>

                <button
                  onClick={handleApplyToStudio}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 text-xs font-mono font-bold transition-all shrink-0 cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  <span>Load in Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Genetic Breakdown Tags */}
              <div className="space-y-2 p-4 rounded-2xl bg-stone-950/70 border border-white/5 text-xs font-mono">
                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block mb-1">
                  Inherited Genetic Traits:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <span className="text-[10px] text-purple-300 font-bold block">From Parent A:</span>
                    <div className="flex flex-wrap gap-1">
                      {breedingResult.geneticBreakdown.inheritedFromA.map((trait, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-200 text-[10px] border border-purple-500/20">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-300 font-bold block">From Parent B:</span>
                    <div className="flex flex-wrap gap-1">
                      {breedingResult.geneticBreakdown.inheritedFromB.map((trait, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-200 text-[10px] border border-cyan-500/20">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-amber-300 font-bold block">Novel Mutations:</span>
                    <div className="flex flex-wrap gap-1">
                      {breedingResult.geneticBreakdown.mutations.map((mut, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-200 text-[10px] border border-amber-500/20">
                          {mut}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Style Tags Output */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-purple-400" />
                    Suno Style of Music Prompt
                  </span>
                  <button
                    onClick={() => copyToClipboard(breedingResult.styleTags, "style")}
                    className="text-xs text-purple-300 hover:text-purple-200 font-mono flex items-center gap-1 py-1 px-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 cursor-pointer"
                  >
                    {copiedStyle ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedStyle ? "Copied!" : "Copy Style"}</span>
                  </button>
                </div>
                <div className="p-4 bg-stone-950 rounded-xl border border-white/5">
                  <p className="font-mono text-xs text-purple-100 leading-relaxed select-all">
                    {breedingResult.styleTags}
                  </p>
                  <span className="text-[10px] text-stone-500 font-mono block mt-1">
                    Length: {breedingResult.styleTags.length} characters (Optimized for Suno under 120 chars)
                  </span>
                </div>
              </div>

              {/* Arrangement / Lyrics Prompt */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    Arrangement / Lyrics Prompt
                  </span>
                  <button
                    onClick={() => copyToClipboard(breedingResult.arrangementPrompt, "arrangement")}
                    className="text-xs text-cyan-300 hover:text-cyan-200 font-mono flex items-center gap-1 py-1 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 cursor-pointer"
                  >
                    {copiedArrangement ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedArrangement ? "Copied!" : "Copy Arrangement"}</span>
                  </button>
                </div>
                <div className="p-4 bg-stone-950 rounded-xl border border-white/5">
                  <p className="font-mono text-xs text-cyan-100 leading-relaxed select-all">
                    {breedingResult.arrangementPrompt}
                  </p>
                </div>
              </div>

              {/* Negative Exclusions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5 text-rose-400" />
                    Merged Negative Prompt (Exclude Styles)
                  </span>
                  <button
                    onClick={() => copyToClipboard(breedingResult.negativePrompt, "negative")}
                    className="text-xs text-rose-300 hover:text-rose-200 font-mono flex items-center gap-1 py-1 px-2.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 cursor-pointer"
                  >
                    {copiedNegative ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedNegative ? "Copied!" : "Copy Exclusions"}</span>
                  </button>
                </div>
                <div className="p-3 bg-stone-950 rounded-xl border border-rose-500/20">
                  <p className="font-mono text-xs text-rose-200/90 leading-relaxed select-all">
                    {breedingResult.negativePrompt}
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="p-4 rounded-xl bg-stone-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 font-bold block">
                  Geneticist Synthesis Tips:
                </span>
                <ul className="text-xs text-stone-400 space-y-1 font-light list-disc list-inside">
                  {breedingResult.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/10 bg-stone-950/40 p-10 flex flex-col items-center justify-center text-center space-y-4 min-h-[450px]">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <Dna className="w-8 h-8" />
              </div>
              <div className="space-y-1 max-w-sm">
                <h3 className="text-base font-serif text-white">Hybrid Incubator Empty</h3>
                <p className="text-xs text-stone-400 leading-relaxed font-light">
                  Choose two parent musical traditions on the left, calibrate their genetic ratio and architecture, and click <strong>Breed New Style Now</strong> to sequence a custom sonic hybrid.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
