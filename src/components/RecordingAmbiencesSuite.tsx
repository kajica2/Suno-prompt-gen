import { useState } from "react";
import {
  Volume2,
  Copy,
  Check,
  ArrowRight,
  Disc,
  Clock,
  Music,
  Info,
  Ban,
  Layers,
  Sparkles,
  Sliders,
  Dna,
  BookOpen,
  Waves,
  Radio,
  Flame,
  Shuffle,
  ShieldAlert,
  Zap,
  Building2,
  Compass
} from "lucide-react";
import {
  LEGENDARY_STUDIOS,
  IMPOSSIBLE_HYBRID_STUDIOS,
  RECORDING_AMBIENCES,
  AMBIENCE_HYBRIDS,
  STUDIO_UNIVERSAL_NEGATIVE,
  HYBRID_UNIVERSAL_NEGATIVE,
  AMBIENCE_UNIVERSAL_NEGATIVE_PROMPT,
  LegendaryStudio,
  ImpossibleHybridStudio,
  RecordingAmbience
} from "../data/recordingAmbiences";
import { PromptConfig, PromptResult } from "../types";

interface RecordingAmbiencesSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
  onOpenStyleBreeder?: () => void;
}

export default function RecordingAmbiencesSuite({
  onApplyToStudio,
  onSwitchToStudio,
  onOpenStyleBreeder
}: RecordingAmbiencesSuiteProps) {
  // Navigation tabs: impossible hybrids, legendary studios, physical spaces, custom fusion, matrices
  const [activeTab, setActiveTab] = useState<"hybrids" | "legendary" | "spaces" | "fusion" | "matrix">("hybrids");

  // Filter selections
  const [selectedHybridId, setSelectedHybridId] = useState<string>("all");
  const [selectedStudioId, setSelectedStudioId] = useState<string>("all");
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>("all");

  // Modifiers state for impossible hybrids
  const [hybridModes, setHybridModes] = useState<Record<string, "standard" | "oddmeter" | "solo">>({});

  // Interactive Impossible Studio Fusion Lab state
  const [customStudioA, setCustomStudioA] = useState<string>("abbey-road-2");
  const [customStudioB, setCustomStudioB] = useState<string>("columbia-30th");
  const [customOddMeter, setCustomOddMeter] = useState<string>("11/8");
  const [customSoloInstrument, setCustomSoloInstrument] = useState<string>("hangpan");
  const [includeOddMeter, setIncludeOddMeter] = useState<boolean>(true);
  const [includeSoloInstrument, setIncludeSoloInstrument] = useState<boolean>(false);
  const [includeThirdStudio, setIncludeThirdStudio] = useState<boolean>(false);
  const [customStudioC, setCustomStudioC] = useState<string>("black-ark");

  // Copy feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedNegativeType, setCopiedNegativeType] = useState<string | null>(null);
  const [copiedFullDoc, setCopiedFullDoc] = useState<boolean>(false);
  const [showMarkdownDrawer, setShowMarkdownDrawer] = useState<boolean>(false);

  const copyText = (text: string, id: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedSection(section);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedSection(null);
    }, 2000);
  };

  const copyNegative = (negText: string, type: string) => {
    navigator.clipboard.writeText(negText);
    setCopiedNegativeType(type);
    setTimeout(() => setCopiedNegativeType(null), 2000);
  };

  // Handlers to send prompts directly to Main Studio
  const handleApplyLegendaryStudio = (studio: LegendaryStudio) => {
    const config: PromptConfig = {
      subtheme: `Legendary Studio #${studio.number}: ${studio.name} (${studio.subtitle})`,
      genre: studio.stylePrompt,
      mood: `${studio.character}, Analog Tape, Valve Compression`,
      tempo: "Organic Live Rubato / Groove",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: `Acoustic rhythm section, vintage studio console, ${studio.signature}`,
      structure: studio.arrangementPrompt,
      enableRoomTone: true,
      roomTone: `${studio.name.toLowerCase()} room tone, ${studio.signature}`,
      negativePrompt: studio.negativePrompt,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${studio.name} — "${studio.subtitle}"`,
      styleTags: studio.stylePrompt.length <= 120 ? studio.stylePrompt : studio.stylePrompt.slice(0, 115) + "...",
      promptDescription: `${studio.character} Historic era: ${studio.era}. Notable artists: ${studio.notableArtists}.`,
      lyrics: studio.arrangementPrompt,
      negativePrompt: studio.negativePrompt,
      tips: [
        `Historical Room: ${studio.spaceType} (${studio.era})`,
        `Signature Acoustic Footprint: ${studio.signature}`,
        `Intro Room Tone Anchor: ${studio.introSeconds} seconds before notes tells Suno "this is a real room".`,
        `Outro Payoff: ${studio.outroSeconds} seconds room decay into natural silence.`,
        "Never add reverb plugins in the prompt — the room IS the reverb."
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const handleApplyImpossibleHybrid = (
    hybrid: ImpossibleHybridStudio,
    variantOverride?: "standard" | "oddmeter" | "solo"
  ) => {
    const mode = variantOverride || hybridModes[hybrid.id] || "standard";
    let style = hybrid.stylePrompt;
    let description = `${hybrid.character} Impossible Physics: ${hybrid.contradiction}`;

    if (mode === "oddmeter" && hybrid.oddMeterVariant) {
      style = hybrid.oddMeterVariant;
      description = `Odd Meter Edition: ${hybrid.oddMeterVariant}. ${description}`;
    } else if (mode === "solo" && hybrid.soloVariant) {
      style = hybrid.soloVariant;
      description = `Solo Instrument Edition: ${hybrid.soloVariant}. ${description}`;
    }

    const config: PromptConfig = {
      subtheme: `Impossible Hybrid Studio #${hybrid.number}: ${hybrid.name} (${hybrid.subtitle})`,
      genre: style,
      mood: `${hybrid.character}, ${hybrid.contradiction}`,
      tempo: "Unquantized Human Timing",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: mode === "solo" ? "Solo acoustic instrument only, natural room microphones" : "Impossible hybrid acoustic setup, dual room tracking",
      structure: hybrid.arrangementPrompt,
      enableRoomTone: true,
      roomTone: `${hybrid.name.toLowerCase()} impossible room tone, ${hybrid.contradiction}`,
      negativePrompt: hybrid.negativePrompt,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${hybrid.name} — "${hybrid.subtitle}"`,
      styleTags: style.length <= 120 ? style : style.slice(0, 115) + "...",
      promptDescription: description,
      lyrics: hybrid.arrangementPrompt,
      negativePrompt: hybrid.negativePrompt,
      tips: [
        `Fusing Two Legendary Rooms: ${hybrid.spaceA} × ${hybrid.spaceB}`,
        `Impossible Physics: ${hybrid.contradiction}`,
        `Room Tone Anchor: ${hybrid.introSeconds} seconds intro hum, ${hybrid.outroSeconds} seconds outro decay`,
        "Universal negatives prevent modern reverb plugins and ensure pure physical room simulation."
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const handleApplyPhysicalSpace = (space: RecordingAmbience) => {
    const config: PromptConfig = {
      subtheme: `Recording Ambience #${space.number}: ${space.title} (${space.spaceName})`,
      genre: space.stylePrompt,
      mood: `${space.acousticSignature}, Unquantized, Valve Compression`,
      tempo: "Natural Rubato / Organic Groove",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "Live acoustic instruments, tape machine, room microphones",
      structure: space.arrangementPrompt,
      enableRoomTone: true,
      roomTone: `${space.title.toLowerCase()} room tone, ${space.acousticSignature}`,
      negativePrompt: space.negativePrompt,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${space.number}. ${space.title} — "${space.spaceName}"`,
      styleTags: space.stylePrompt.length <= 120 ? space.stylePrompt : space.compactStyleTags,
      promptDescription: space.character,
      lyrics: space.arrangementPrompt,
      negativePrompt: space.negativePrompt,
      tips: [
        `Anchor Rule: ${space.introAnchorSeconds} seconds of room tone before notes begin tells Suno "this is a real room".`,
        `Outro Payoff: Room tone lingers for ${space.outroTailSeconds} seconds into silence.`,
        "Never add 'reverb' in the prompt — the room IS the reverb.",
        ...space.proTips
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  // Build live custom impossible studio
  const studioAObj = LEGENDARY_STUDIOS.find((s) => s.id === customStudioA) || LEGENDARY_STUDIOS[0];
  const studioBObj = LEGENDARY_STUDIOS.find((s) => s.id === customStudioB) || LEGENDARY_STUDIOS[1];
  const studioCObj = LEGENDARY_STUDIOS.find((s) => s.id === customStudioC) || LEGENDARY_STUDIOS[4];

  const buildCustomPrompt = () => {
    let style = `${studioAObj.name} fused with ${studioBObj.name}`;
    if (includeThirdStudio) {
      style += ` and ${studioCObj.name}`;
    }
    style += `, ${studioAObj.subtitle} meets ${studioBObj.subtitle}`;
    if (includeOddMeter) {
      style += `, ${customOddMeter} time signature`;
    }
    if (includeSoloInstrument) {
      style += `, solo ${customSoloInstrument} only, no band`;
    }
    style += `, analog tape, valve compression, unquantized human timing, breath, valve clicks, room tone, one-take, no overdubs, no reverb plugins, no digital polish, mono`;

    const arrangement = `[Intro: 4 seconds of ${studioAObj.name} room tone meeting ${studioBObj.name} atmosphere]\n[Groove: ${
      includeSoloInstrument ? `solo ${customSoloInstrument} enters` : "instruments enter"
    } with ${studioAObj.signature}, ringing into ${studioBObj.signature}]\n[Break: room tone alone, hybrid acoustic reflections for 3 seconds]\n[Outro: instruments stop, impossible room decay continues 8 seconds, fades]`;

    return { style, arrangement };
  };

  const customFusionPrompt = buildCustomPrompt();

  const handleApplyCustomFusion = () => {
    const config: PromptConfig = {
      subtheme: `Custom Fusion: ${studioAObj.name} × ${studioBObj.name}${includeThirdStudio ? ` × ${studioCObj.name}` : ""}`,
      genre: customFusionPrompt.style,
      mood: `${studioAObj.character} fused with ${studioBObj.character}`,
      tempo: includeOddMeter ? `${customOddMeter} Odd Meter Groove` : "Organic Live Rubato",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: includeSoloInstrument ? `Solo ${customSoloInstrument} only` : "Hybrid acoustic ensemble, dual studio tracking",
      structure: customFusionPrompt.arrangement,
      enableRoomTone: true,
      roomTone: `${studioAObj.name} and ${studioBObj.name} layered room tone`,
      negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
      appendExclusionsToStyle: true
    };

    const result: PromptResult = {
      title: `${studioAObj.name} // ${studioBObj.name} Impossible Room`,
      styleTags: customFusionPrompt.style.length <= 120 ? customFusionPrompt.style : customFusionPrompt.style.slice(0, 115) + "...",
      promptDescription: `Custom impossible room fusion synthesizing ${studioAObj.name} (${studioAObj.signature}) and ${studioBObj.name} (${studioBObj.signature}).`,
      lyrics: customFusionPrompt.arrangement,
      negativePrompt: HYBRID_UNIVERSAL_NEGATIVE,
      tips: [
        `Dual Room Collision: ${studioAObj.name} + ${studioBObj.name}`,
        includeOddMeter ? `Asymmetrical Meter: ${customOddMeter}` : "Standard timing",
        includeSoloInstrument ? `Stripped Instrumentation: Solo ${customSoloInstrument}` : "Full acoustic ensemble",
        "The studio is not a genre — it is a physical space. Suno builds the room around your music."
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const generateFullMarkdown = () => {
    let md = `# Legendary Studios & 7 Impossible Hybrid Spaces — Suno Prompts\n\n`;
    md += `## Universal Negatives for Legendary Studios:\n\`\`\`\n${STUDIO_UNIVERSAL_NEGATIVE}\n\`\`\`\n\n`;
    md += `## Universal Negatives for Impossible Hybrids:\n\`\`\`\n${HYBRID_UNIVERSAL_NEGATIVE}\n\`\`\`\n\n---\n\n`;

    md += `## Part 1: The 7 Impossible Hybrid Studios\n\n`;
    IMPOSSIBLE_HYBRID_STUDIOS.forEach((h) => {
      md += `### ${h.number}. ${h.name} — "${h.subtitle}"\n`;
      md += `**Fusion:** ${h.spaceA} + ${h.spaceB}\n`;
      md += `**Impossible Physics:** ${h.contradiction}\n`;
      md += `**Character:** ${h.character} (${h.era})\n\n`;
      md += `**Style Prompt:**\n\`\`\`\n${h.stylePrompt}\n\`\`\`\n\n`;
      md += `**Arrangement Prompt:**\n\`\`\`\n${h.arrangementPrompt}\n\`\`\`\n\n`;
      if (h.oddMeterVariant) md += `**Odd Meter Variant:** \`${h.oddMeterVariant}\`\n\n`;
      if (h.soloVariant) md += `**Solo Instrument Variant:** \`${h.soloVariant}\`\n\n`;
      md += `---\n\n`;
    });

    md += `## Part 2: The 7 Legendary Recording Studios\n\n`;
    LEGENDARY_STUDIOS.forEach((s) => {
      md += `### ${s.number}. ${s.name} — "${s.subtitle}"\n`;
      md += `**Space:** ${s.spaceType} (${s.era}) | **Artists:** ${s.notableArtists}\n`;
      md += `**Signature:** ${s.signature}\n\n`;
      md += `**Style Prompt:**\n\`\`\`\n${s.stylePrompt}\n\`\`\`\n\n`;
      md += `**Arrangement Prompt:**\n\`\`\`\n${s.arrangementPrompt}\n\`\`\`\n\n---\n\n`;
    });

    md += `## Part 3: The 7 Physical Space Archetypes\n\n`;
    RECORDING_AMBIENCES.forEach((a) => {
      md += `### ${a.number}. ${a.title} — "${a.spaceName}"\n`;
      md += `**Decay:** ${a.decay} | **Air:** ${a.air}\n\n`;
      md += `**Style Prompt:**\n\`\`\`\n${a.stylePrompt}\n\`\`\`\n\n`;
      md += `**Arrangement Prompt:**\n\`\`\`\n${a.arrangementPrompt}\n\`\`\`\n\n---\n\n`;
    });

    return md;
  };

  const handleCopyFullMarkdown = () => {
    navigator.clipboard.writeText(generateFullMarkdown());
    setCopiedFullDoc(true);
    setTimeout(() => setCopiedFullDoc(false), 2000);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                Historic Studios & Impossible Spaces
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                7 Legendary Rooms &middot; 7 Impossible Hybrids
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-[11px] font-mono font-semibold">
                No Digital Reverb Plugins
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif tracking-tight text-white font-medium">
              Legendary Studios & Impossible Hybrid Spaces
            </h1>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed font-light">
              <strong className="text-amber-200">The studio is not a genre — it is a physical space.</strong> Describe the walls, the ceiling, the air, the machine, and the era: Suno will build the room around your music. Fuse two contradictory acoustic architectures (like a tight TG console in a 100-foot cathedral) to force Suno to synthesize impossible rooms.
            </p>
          </div>

          {/* Quick Copy Action Badges */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => copyNegative(HYBRID_UNIVERSAL_NEGATIVE, "hybrid")}
              className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow"
              title="Copy universal hybrid negatives: anti-reverb, anti-horns, anti-EDM"
            >
              <div className="flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-rose-400" />
                <span>Hybrid Negatives (Anti-Horns)</span>
              </div>
              {copiedNegativeType === "hybrid" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => copyNegative(STUDIO_UNIVERSAL_NEGATIVE, "studio")}
              className="flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-200 text-xs font-mono font-semibold transition-all cursor-pointer shadow"
              title="Copy universal studio negatives: no reverb plugins, no digital polish"
            >
              <div className="flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-amber-400" />
                <span>Studio Negatives (7 Rooms)</span>
              </div>
              {copiedNegativeType === "studio" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleCopyFullMarkdown}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedFullDoc ? "Copied All Prompts & Hybrids!" : "Copy Complete Collection"}</span>
              {copiedFullDoc && <Check className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* The Golden Rule & Navigation Trigger */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono bg-stone-950/80 p-4 rounded-2xl border border-amber-500/30">
          <div className="flex items-start md:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-amber-300 font-bold">The Golden Ambience Formula:</span>
                <span className="text-white font-medium">1. Describe physical walls & machines &middot; 2. Inject room tone in BOTH prompts &middot; 3. Fuse contradictory rooms</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                Add odd meters (11/8, 7/8, 13/8), strip to solo instruments (hangpan, krar), or stack three studios to push Suno into unmapped sonic territory.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowMarkdownDrawer(!showMarkdownDrawer)}
            className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono transition-colors border border-white/10 cursor-pointer flex items-center gap-1.5 shrink-0 self-end md:self-auto"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showMarkdownDrawer ? "Hide Markdown" : "View Full Guide"}</span>
          </button>
        </div>
      </div>

      {/* Markdown Guide Drawer */}
      {showMarkdownDrawer && (
        <div className="p-6 rounded-2xl bg-stone-950 border border-amber-500/30 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono text-amber-300 uppercase tracking-widest flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Complete Studio & Impossible Hybrid Guide
            </h3>
            <button
              onClick={handleCopyFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors border border-amber-500/30 cursor-pointer"
            >
              {copiedFullDoc ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFullDoc ? "Copied!" : "Copy Raw Markdown"}</span>
            </button>
          </div>
          <pre className="p-4 bg-stone-900 rounded-xl text-stone-300 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed max-h-96 border border-white/5">
            {generateFullMarkdown()}
          </pre>
        </div>
      )}

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setActiveTab("hybrids")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === "hybrids"
                ? "bg-purple-500 text-stone-950 shadow-md shadow-purple-500/20"
                : "bg-stone-900/80 text-purple-300 hover:text-white border border-purple-500/20"
            }`}
          >
            <Dna className="w-4 h-4" />
            <span>7 Impossible Hybrids</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-950 text-[10px] text-purple-300 font-bold">
              {IMPOSSIBLE_HYBRID_STUDIOS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("legendary")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === "legendary"
                ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20"
                : "bg-stone-900/80 text-amber-300 hover:text-white border border-amber-500/20"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>7 Legendary Studios</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-950 text-[10px] text-amber-300 font-bold">
              {LEGENDARY_STUDIOS.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("spaces")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === "spaces"
                ? "bg-emerald-500 text-stone-950 shadow-md shadow-emerald-500/20"
                : "bg-stone-900/80 text-stone-400 hover:text-white border border-white/10"
            }`}
          >
            <Waves className="w-4 h-4" />
            <span>7 Physical Spaces</span>
            <span className="px-1.5 py-0.2 rounded-full bg-stone-950 text-[10px] text-emerald-300 font-bold">
              {RECORDING_AMBIENCES.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("fusion")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === "fusion"
                ? "bg-cyan-500 text-stone-950 shadow-md shadow-cyan-500/20"
                : "bg-stone-900/80 text-cyan-300 hover:text-white border border-cyan-500/20"
            }`}
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Impossible Fusion Lab</span>
          </button>

          <button
            onClick={() => setActiveTab("matrix")}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer font-bold flex items-center gap-1.5 ${
              activeTab === "matrix"
                ? "bg-stone-200 text-stone-950 shadow-md"
                : "bg-stone-900/80 text-stone-300 hover:text-white border border-white/10"
            }`}
          >
            <Layers className="w-4 h-4 text-stone-400" />
            <span>Comparison Matrices</span>
          </button>
        </div>

        {/* Tab Subfilters */}
        {activeTab === "hybrids" && (
          <div className="hidden lg:flex items-center gap-1 text-xs font-mono overflow-x-auto">
            <button
              onClick={() => setSelectedHybridId("all")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedHybridId === "all" ? "bg-stone-800 text-white font-bold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              All (7)
            </button>
            {IMPOSSIBLE_HYBRID_STUDIOS.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHybridId(h.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer truncate max-w-[120px] ${
                  selectedHybridId === h.id
                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                #{h.number} {h.name.split(" ")[0]}
              </button>
            ))}
          </div>
        )}

        {activeTab === "legendary" && (
          <div className="hidden lg:flex items-center gap-1 text-xs font-mono overflow-x-auto">
            <button
              onClick={() => setSelectedStudioId("all")}
              className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                selectedStudioId === "all" ? "bg-stone-800 text-white font-bold" : "text-stone-400 hover:text-stone-200"
              }`}
            >
              All (7)
            </button>
            {LEGENDARY_STUDIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStudioId(s.id)}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer truncate max-w-[120px] ${
                  selectedStudioId === s.id
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold"
                    : "text-stone-400 hover:text-stone-200"
                }`}
              >
                #{s.number} {s.name.split(" ")[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* TAB 1: 7 IMPOSSIBLE HYBRID STUDIOS */}
      {activeTab === "hybrids" && (
        <div className="space-y-8">
          <div className="p-4 rounded-2xl bg-purple-950/20 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono text-purple-200">
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-purple-400 shrink-0" />
              <span>
                <strong>Impossible Physics:</strong> Each prompt fuses two legendary rooms into a space that has never existed. The contradictory acoustic physics forces Suno to synthesize entirely new room algorithms.
              </span>
            </div>
            <span className="text-[11px] text-purple-300/80 shrink-0">
              Universal Negatives enforce `no horns` & `no reverb plugins`
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {IMPOSSIBLE_HYBRID_STUDIOS.filter((h) => selectedHybridId === "all" || h.id === selectedHybridId).map((hybrid) => {
              const currentMode = hybridModes[hybrid.id] || "standard";
              const activeStyle =
                currentMode === "oddmeter" && hybrid.oddMeterVariant
                  ? hybrid.oddMeterVariant
                  : currentMode === "solo" && hybrid.soloVariant
                  ? hybrid.soloVariant
                  : hybrid.stylePrompt;

              const bundleText = [
                `=== #${hybrid.number} ${hybrid.name.toUpperCase()} — "${hybrid.subtitle.toUpperCase()}" ===`,
                `Space A: ${hybrid.spaceA}`,
                `Space B: ${hybrid.spaceB}`,
                `Impossible Physics: ${hybrid.contradiction}`,
                `Character: ${hybrid.character} (${hybrid.era})`,
                "",
                "--- [STYLE OF MUSIC PROMPT] ---",
                activeStyle,
                "",
                "--- [ARRANGEMENT PROMPT] ---",
                hybrid.arrangementPrompt,
                "",
                "--- [UNIVERSAL NEGATIVE EXCLUSIONS] ---",
                hybrid.negativePrompt
              ].join("\n");

              return (
                <div
                  key={hybrid.id}
                  className="rounded-3xl border border-purple-500/30 bg-stone-900/80 hover:border-purple-500/60 transition-all p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/[0.04] rounded-full blur-3xl pointer-events-none" />

                  {/* Card Header */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/5 pb-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-mono text-sm font-bold flex items-center justify-center border border-purple-500/30">
                          {hybrid.number}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                          {hybrid.name}
                        </h2>
                        <span className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-200 text-xs font-mono font-bold border border-purple-500/40">
                          "{hybrid.subtitle}"
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                          Era: {hybrid.era}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                        <span className="text-stone-400">Fusion:</span>
                        <span className="text-amber-300 font-medium">{hybrid.spaceA}</span>
                        <span className="text-purple-400 font-bold">&times;</span>
                        <span className="text-cyan-300 font-medium">{hybrid.spaceB}</span>
                      </div>

                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                        <strong className="text-purple-300 font-medium">Contradictory Physics:</strong> {hybrid.contradiction}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-start">
                      <button
                        onClick={() => copyText(bundleText, hybrid.id, "bundle")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                        title="Copy complete bundle for this impossible space"
                      >
                        {copiedId === hybrid.id && copiedSection === "bundle" ? (
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
                        onClick={() => handleApplyImpossibleHybrid(hybrid, currentMode)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-purple-500/20"
                        title="Load this impossible hybrid into the Prompt Studio"
                      >
                        <span>Load in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Mode Selector: Standard vs Odd Meter vs Solo Instrument */}
                  <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-stone-950/80 rounded-xl border border-white/5 text-xs font-mono">
                    <div className="flex items-center gap-2 text-stone-400">
                      <Sliders className="w-4 h-4 text-purple-400" />
                      <span>Hybrid Style Variant:</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setHybridModes((prev) => ({ ...prev, [hybrid.id]: "standard" }))}
                        className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs ${
                          currentMode === "standard"
                            ? "bg-purple-500 text-stone-950 font-bold"
                            : "bg-stone-900 text-stone-400 hover:text-white"
                        }`}
                      >
                        Standard Impossible Space
                      </button>

                      {hybrid.oddMeterVariant && (
                        <button
                          onClick={() => setHybridModes((prev) => ({ ...prev, [hybrid.id]: "oddmeter" }))}
                          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                            currentMode === "oddmeter"
                              ? "bg-cyan-500 text-stone-950 font-bold"
                              : "bg-stone-900 text-cyan-300 hover:text-white"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>Odd Meter Edition</span>
                        </button>
                      )}

                      {hybrid.soloVariant && (
                        <button
                          onClick={() => setHybridModes((prev) => ({ ...prev, [hybrid.id]: "solo" }))}
                          className={`px-3 py-1 rounded-lg transition-colors cursor-pointer text-xs flex items-center gap-1 ${
                            currentMode === "solo"
                              ? "bg-amber-500 text-stone-950 font-bold"
                              : "bg-stone-900 text-amber-300 hover:text-white"
                          }`}
                        >
                          <Music className="w-3 h-3" />
                          <span>Solo Instrument Edition</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 1. Style Prompt Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-purple-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                          1. Style of Music Prompt {currentMode !== "standard" && `(${currentMode.toUpperCase()})`}
                        </span>
                      </div>

                      <button
                        onClick={() => copyText(activeStyle, hybrid.id, "style")}
                        className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 transition-colors border border-purple-500/20 cursor-pointer"
                      >
                        {copiedId === hybrid.id && copiedSection === "style" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Style!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Style</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                      <p className="font-mono text-xs sm:text-sm text-purple-100 leading-relaxed select-all">
                        {activeStyle}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                        <span>Characters: {activeStyle.length}</span>
                        <span className="text-purple-300/80">Mono &middot; Unquantized &middot; Valve Compression</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Arrangement Prompt Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                          2. Arrangement / Lyrics Prompt (Room Tone Anchors)
                        </span>
                      </div>

                      <button
                        onClick={() => copyText(hybrid.arrangementPrompt, hybrid.id, "arrangement")}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 cursor-pointer"
                      >
                        {copiedId === hybrid.id && copiedSection === "arrangement" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Arrangement!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Arrangement</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                      <p className="font-mono text-xs sm:text-sm text-cyan-100 leading-relaxed select-all whitespace-pre-line">
                        {hybrid.arrangementPrompt}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                        <span>Intro Anchor: {hybrid.introSeconds}s pure room tone</span>
                        <span>Outro Linger: {hybrid.outroSeconds}s tail decay</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Universal Hybrid Negative Exclusions */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-rose-500/20 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Ban className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                          Hybrid Negative Exclusions (Includes Anti-Horns)
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        Forces pure acoustic room reality
                      </span>
                    </div>
                    <p className="font-mono text-xs text-rose-200/90 leading-relaxed select-all bg-stone-900/90 p-3 rounded-xl border border-white/5">
                      {hybrid.negativePrompt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 7 LEGENDARY RECORDING STUDIOS */}
      {activeTab === "legendary" && (
        <div className="space-y-8">
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono text-amber-200">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Physical Studio Footprints:</strong> 7 historic facilities that shaped modern music. The room is not a genre; specify the console, walls, and era to reconstruct their natural acoustic properties.
              </span>
            </div>
            <span className="text-[11px] text-amber-300/80 shrink-0">
              Universal Negatives: no reverb plugins, no digital polish
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {LEGENDARY_STUDIOS.filter((s) => selectedStudioId === "all" || s.id === selectedStudioId).map((studio) => {
              const bundleText = [
                `=== #${studio.number} ${studio.name.toUpperCase()} — "${studio.subtitle.toUpperCase()}" ===`,
                `Space: ${studio.spaceType} (${studio.era})`,
                `Signature: ${studio.signature}`,
                `Notable Artists: ${studio.notableArtists}`,
                `Character: ${studio.character}`,
                "",
                "--- [STYLE OF MUSIC PROMPT] ---",
                studio.stylePrompt,
                "",
                "--- [ARRANGEMENT PROMPT] ---",
                studio.arrangementPrompt,
                "",
                "--- [UNIVERSAL NEGATIVE PROMPT] ---",
                studio.negativePrompt
              ].join("\n");

              return (
                <div
                  key={studio.id}
                  className="rounded-3xl border border-amber-500/30 bg-stone-900/80 hover:border-amber-500/60 transition-all p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.04] rounded-full blur-3xl pointer-events-none" />

                  {/* Top Row */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/5 pb-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 font-mono text-sm font-bold flex items-center justify-center border border-amber-500/30">
                          {studio.number}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                          {studio.name}
                        </h2>
                        <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-200 text-xs font-mono font-bold border border-amber-500/40">
                          "{studio.subtitle}"
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                          Era: {studio.era}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-400">
                        <span>Facility Type:</span>
                        <span className="text-amber-200">{studio.spaceType}</span>
                        <span>&middot; Artists:</span>
                        <span className="text-stone-300 font-light">{studio.notableArtists}</span>
                      </div>

                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                        <strong className="text-amber-300 font-medium">Acoustic Signature:</strong> {studio.signature} &mdash; {studio.character}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-start">
                      <button
                        onClick={() => copyText(bundleText, studio.id, "bundle")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                        title="Copy full studio prompt bundle"
                      >
                        {copiedId === studio.id && copiedSection === "bundle" ? (
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
                        onClick={() => handleApplyLegendaryStudio(studio)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                        title="Load this studio into the Prompt Studio"
                      >
                        <span>Load in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 1. Style Prompt Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Music className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                          1. Style of Music Prompt
                        </span>
                      </div>

                      <button
                        onClick={() => copyText(studio.stylePrompt, studio.id, "style")}
                        className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors border border-amber-500/20 cursor-pointer"
                      >
                        {copiedId === studio.id && copiedSection === "style" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Style!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Style</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                      <p className="font-mono text-xs sm:text-sm text-amber-100 leading-relaxed select-all">
                        {studio.stylePrompt}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                        <span>Characters: {studio.stylePrompt.length}</span>
                        <span className="text-amber-300/80">Mono &middot; Tape Hiss &middot; Valve Compression</span>
                      </div>
                    </div>
                  </div>

                  {/* 2. Arrangement Prompt Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-stone-300 font-bold">
                          2. Arrangement / Lyrics Prompt (Room Tone Anchors)
                        </span>
                      </div>

                      <button
                        onClick={() => copyText(studio.arrangementPrompt, studio.id, "arrangement")}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 cursor-pointer"
                      >
                        {copiedId === studio.id && copiedSection === "arrangement" ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied Arrangement!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Arrangement</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                      <p className="font-mono text-xs sm:text-sm text-cyan-100 leading-relaxed select-all whitespace-pre-line">
                        {studio.arrangementPrompt}
                      </p>
                      <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-stone-400">
                        <span>Intro Anchor: {studio.introSeconds}s pure studio room tone</span>
                        <span>Outro Payoff: {studio.outroSeconds}s tail decay into silence</span>
                      </div>
                    </div>
                  </div>

                  {/* 3. Universal Negative Prompt */}
                  <div className="p-4 rounded-2xl bg-stone-950/80 border border-rose-500/20 space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Ban className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                          Studio Universal Negatives
                        </span>
                      </div>
                      <span className="text-[10px] text-stone-400 font-mono">
                        Blocks artificial reverb and digital master sheen
                      </span>
                    </div>
                    <p className="font-mono text-xs text-rose-200/90 leading-relaxed select-all bg-stone-900/90 p-3 rounded-xl border border-white/5">
                      {studio.negativePrompt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: 7 PHYSICAL SPACES (ORIGINAL 7 AMBIENCES) */}
      {activeTab === "spaces" && (
        <div className="space-y-8">
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono text-emerald-200">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Pure Room Acoustic Archetypes:</strong> Small wooden studio, stone church, concrete basement, living room, tape room, open courtyard at night, and old jazz club.
              </span>
            </div>
            <span className="text-[11px] text-emerald-300/80 shrink-0">
              Universal Negatives: no reverb, no digital polish
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {RECORDING_AMBIENCES.filter((a) => selectedSpaceId === "all" || a.id === selectedSpaceId).map((space) => {
              const bundleText = [
                `=== #${space.number} ${space.title.toUpperCase()} — "${space.spaceName.toUpperCase()}" ===`,
                `Character: ${space.character}`,
                `Decay: ${space.decay} | Air: ${space.air}`,
                "",
                "--- [STYLE PROMPT] ---",
                space.stylePrompt,
                "",
                "--- [ARRANGEMENT PROMPT] ---",
                space.arrangementPrompt,
                "",
                "--- [UNIVERSAL NEGATIVE PROMPT] ---",
                space.negativePrompt
              ].join("\n");

              return (
                <div
                  key={space.id}
                  className="rounded-3xl border border-emerald-500/30 bg-stone-900/80 hover:border-emerald-500/60 transition-all p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-white/5 pb-5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono text-sm font-bold flex items-center justify-center border border-emerald-500/30">
                          {space.number}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-serif text-white font-medium">
                          {space.title}
                        </h2>
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-200 text-xs font-mono font-bold border border-emerald-500/40">
                          "{space.spaceName}"
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                          Decay: {space.decay}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 text-[11px] font-mono">
                          Air: {space.air}
                        </span>
                      </div>

                      <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                        <strong className="text-emerald-300 font-medium">Acoustic Character:</strong> {space.character}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-start">
                      <button
                        onClick={() => copyText(bundleText, space.id, "bundle")}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
                      >
                        {copiedId === space.id && copiedSection === "bundle" ? (
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
                        onClick={() => handleApplyPhysicalSpace(space)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        <span>Load in Studio</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Style Prompt */}
                  <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-300 uppercase tracking-widest font-bold">
                      <span>Style of Music Prompt</span>
                      <button
                        onClick={() => copyText(space.stylePrompt, space.id, "style")}
                        className="text-emerald-400 hover:text-white flex items-center gap-1 normal-case font-normal"
                      >
                        {copiedId === space.id && copiedSection === "style" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono text-xs sm:text-sm text-stone-200 select-all leading-relaxed">
                      {space.stylePrompt}
                    </p>
                  </div>

                  {/* Arrangement Prompt */}
                  <div className="p-4 bg-stone-950 rounded-2xl border border-white/5 space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-300 uppercase tracking-widest font-bold">
                      <span>Arrangement Prompt (Room Tone Anchors)</span>
                      <button
                        onClick={() => copyText(space.arrangementPrompt, space.id, "arrangement")}
                        className="text-cyan-400 hover:text-white flex items-center gap-1 normal-case font-normal"
                      >
                        {copiedId === space.id && copiedSection === "arrangement" ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <p className="font-mono text-xs sm:text-sm text-cyan-100 select-all leading-relaxed whitespace-pre-line">
                      {space.arrangementPrompt}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: IMPOSSIBLE FUSION LAB */}
      {activeTab === "fusion" && (
        <div className="rounded-3xl border border-cyan-500/30 bg-stone-900/90 p-6 md:p-10 space-y-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Live Impossible Room Synthesizer
                </span>
              </div>
              <h2 className="text-2xl font-serif text-white font-medium">
                Fuse Any Two Legendary Rooms
              </h2>
              <p className="text-xs md:text-sm text-stone-300 font-light">
                Combine the acoustics of two historic spaces, inject asymmetrical odd meters, or strip to solo instruments.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const studios = LEGENDARY_STUDIOS;
                  const idxA = Math.floor(Math.random() * studios.length);
                  let idxB = Math.floor(Math.random() * studios.length);
                  while (idxB === idxA) idxB = Math.floor(Math.random() * studios.length);
                  setCustomStudioA(studios[idxA].id);
                  setCustomStudioB(studios[idxB].id);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-mono transition-colors border border-white/10 cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Random Pair</span>
              </button>

              <button
                onClick={handleApplyCustomFusion}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span>Load in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fusion Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Studio A */}
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-amber-500/30 space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold block">
                Primary Room A (Immediate Micro-Acoustics)
              </label>
              <select
                value={customStudioA}
                onChange={(e) => setCustomStudioA(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                {LEGENDARY_STUDIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    #{s.number} {s.name} ({s.subtitle})
                  </option>
                ))}
              </select>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                <strong>Footprint:</strong> {studioAObj.signature} &middot; {studioAObj.spaceType} ({studioAObj.era})
              </p>
            </div>

            {/* Studio B */}
            <div className="p-5 rounded-2xl bg-stone-950/80 border border-purple-500/30 space-y-3">
              <label className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold block">
                Secondary Room B (Decay Tail & Atmospheric Dissipation)
              </label>
              <select
                value={customStudioB}
                onChange={(e) => setCustomStudioB(e.target.value)}
                className="w-full bg-stone-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-400 cursor-pointer"
              >
                {LEGENDARY_STUDIOS.map((s) => (
                  <option key={s.id} value={s.id}>
                    #{s.number} {s.name} ({s.subtitle})
                  </option>
                ))}
              </select>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                <strong>Footprint:</strong> {studioBObj.signature} &middot; {studioBObj.spaceType} ({studioBObj.era})
              </p>
            </div>
          </div>

          {/* Modifiers: Odd Meters, Solo Acoustic, Triple Studio Stack */}
          <div className="p-5 rounded-2xl bg-stone-950/80 border border-white/10 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-300 font-bold block">
              Push The Impossible Physics:
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              {/* Odd Meter Modifier */}
              <div className="p-3 bg-stone-900 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-300 font-medium">Add Odd Meter</span>
                  <input
                    type="checkbox"
                    checked={includeOddMeter}
                    onChange={(e) => setIncludeOddMeter(e.target.checked)}
                    className="rounded accent-cyan-500 cursor-pointer"
                  />
                </div>
                {includeOddMeter && (
                  <select
                    value={customOddMeter}
                    onChange={(e) => setCustomOddMeter(e.target.value)}
                    className="w-full bg-stone-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="7/8">7/8 (Tezeta Odd Groove)</option>
                    <option value="9/8">9/8 (Bati Asymmetrical Pulse)</option>
                    <option value="11/8">11/8 (Ambassel Tri-Stacked)</option>
                    <option value="10/8">10/8 (Afro-Jazz Polymetric)</option>
                    <option value="5/4">5/4 (Unorthodox Quintuple)</option>
                    <option value="13/8">13/8 (Polymetric Jungle Footwork)</option>
                  </select>
                )}
              </div>

              {/* Strip the Band (Solo) */}
              <div className="p-3 bg-stone-900 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-medium">Remove Band (Solo Instrument)</span>
                  <input
                    type="checkbox"
                    checked={includeSoloInstrument}
                    onChange={(e) => setIncludeSoloInstrument(e.target.checked)}
                    className="rounded accent-amber-500 cursor-pointer"
                  />
                </div>
                {includeSoloInstrument && (
                  <select
                    value={customSoloInstrument}
                    onChange={(e) => setCustomSoloInstrument(e.target.value)}
                    className="w-full bg-stone-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="hangpan">Solo Hangpan only</option>
                    <option value="krar">Solo Krar (Ethiopian Lyre) only</option>
                    <option value="upright bass">Solo Upright Bass only</option>
                    <option value="kalimba">Solo Kalimba only</option>
                    <option value="slide resonator guitar">Solo Slide Resonator only</option>
                  </select>
                )}
              </div>

              {/* Triple Studio Stack */}
              <div className="p-3 bg-stone-900 rounded-xl border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-medium">Stack a Third Studio</span>
                  <input
                    type="checkbox"
                    checked={includeThirdStudio}
                    onChange={(e) => setIncludeThirdStudio(e.target.checked)}
                    className="rounded accent-purple-500 cursor-pointer"
                  />
                </div>
                {includeThirdStudio && (
                  <select
                    value={customStudioC}
                    onChange={(e) => setCustomStudioC(e.target.value)}
                    className="w-full bg-stone-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    {LEGENDARY_STUDIOS.map((s) => (
                      <option key={s.id} value={s.id}>
                        #{s.number} {s.name} ({s.subtitle})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* Generated Result Output */}
          <div className="space-y-4">
            <div className="p-4 bg-stone-950 rounded-2xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 uppercase tracking-widest font-bold">
                <span>Synthesized Style of Music Prompt</span>
                <button
                  onClick={() => copyText(customFusionPrompt.style, "custom", "style")}
                  className="text-cyan-400 hover:text-white flex items-center gap-1 normal-case font-normal"
                >
                  {copiedId === "custom" && copiedSection === "style" ? "Copied!" : "Copy Style"}
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm text-cyan-100 select-all leading-relaxed">
                {customFusionPrompt.style}
              </p>
            </div>

            <div className="p-4 bg-stone-950 rounded-2xl border border-cyan-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-stone-300 uppercase tracking-widest font-bold">
                <span>Synthesized Arrangement Prompt</span>
                <button
                  onClick={() => copyText(customFusionPrompt.arrangement, "custom", "arrangement")}
                  className="text-cyan-400 hover:text-white flex items-center gap-1 normal-case font-normal"
                >
                  {copiedId === "custom" && copiedSection === "arrangement" ? "Copied!" : "Copy Arrangement"}
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm text-stone-300 select-all leading-relaxed whitespace-pre-line">
                {customFusionPrompt.arrangement}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: COMPARISON MATRICES */}
      {activeTab === "matrix" && (
        <div className="space-y-10">
          {/* Matrix 1: 7 Impossible Hybrid Studios */}
          <div className="rounded-3xl border border-purple-500/30 bg-stone-900/80 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-lg font-serif text-white font-medium flex items-center gap-2">
                <Dna className="w-5 h-5 text-purple-400" />
                7 Impossible Hybrid Studios Matrix
              </h3>
              <p className="text-xs text-stone-300 font-light">
                Side-by-side comparison of contradictory physical spaces and acoustic characters.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-stone-400 uppercase tracking-widest text-[10px]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Hybrid Space</th>
                    <th className="py-3 px-4">Space A</th>
                    <th className="py-3 px-4">Space B</th>
                    <th className="py-3 px-4">Impossible Contradiction</th>
                    <th className="py-3 px-4">Character</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {IMPOSSIBLE_HYBRID_STUDIOS.map((h) => (
                    <tr key={h.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="py-3 px-4 text-purple-400 font-bold">{h.number}</td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {h.name}
                        <span className="block text-[10px] text-stone-400 font-light">"{h.subtitle}"</span>
                      </td>
                      <td className="py-3 px-4 text-amber-300">{h.spaceA.split(" (")[0]}</td>
                      <td className="py-3 px-4 text-cyan-300">{h.spaceB.split(" (")[0]}</td>
                      <td className="py-3 px-4 text-stone-300 font-light max-w-xs leading-relaxed">
                        {h.contradiction}
                      </td>
                      <td className="py-3 px-4 text-purple-200">{h.character.split(".")[0]}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleApplyImpossibleHybrid(h)}
                          className="px-2.5 py-1 rounded bg-purple-500 hover:bg-purple-400 text-stone-950 font-bold transition-colors cursor-pointer text-[11px]"
                        >
                          Load
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Matrix 2: 7 Legendary Recording Studios */}
          <div className="rounded-3xl border border-amber-500/30 bg-stone-900/80 p-6 md:p-8 space-y-6 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-lg font-serif text-white font-medium flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" />
                7 Legendary Studios Matrix
              </h3>
              <p className="text-xs text-stone-300 font-light">
                Historic facilities, architectural footprint, and signature hardware.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-stone-400 uppercase tracking-widest text-[10px]">
                    <th className="py-3 px-4">#</th>
                    <th className="py-3 px-4">Studio</th>
                    <th className="py-3 px-4">Space Type</th>
                    <th className="py-3 px-4">Era</th>
                    <th className="py-3 px-4">Acoustic Signature</th>
                    <th className="py-3 px-4">Notable Artists</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-stone-200">
                  {LEGENDARY_STUDIOS.map((s) => (
                    <tr key={s.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="py-3 px-4 text-amber-400 font-bold">{s.number}</td>
                      <td className="py-3 px-4 font-semibold text-white">
                        {s.name}
                        <span className="block text-[10px] text-stone-400 font-light">"{s.subtitle}"</span>
                      </td>
                      <td className="py-3 px-4 text-stone-300">{s.spaceType}</td>
                      <td className="py-3 px-4 text-amber-300">{s.era}</td>
                      <td className="py-3 px-4 text-stone-300 font-light max-w-xs leading-relaxed">
                        {s.signature}
                      </td>
                      <td className="py-3 px-4 text-stone-400 text-[11px]">{s.notableArtists}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleApplyLegendaryStudio(s)}
                          className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-colors cursor-pointer text-[11px]"
                        >
                          Load
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
