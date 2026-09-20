import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Headphones,
  Volume2,
  VolumeX,
  Radio,
  Layers,
  ArrowRight,
  Music,
  SlidersHorizontal,
  Info,
  Flame,
  Play,
  Square,
  FileText,
  Compass,
  CheckCircle2,
  Ear
} from "lucide-react";
import { DDSP_ASMR_PROTOCOLS, DdspAsmrProtocol } from "../data/ddspAsmrProtocols";
import { PromptConfig, PromptResult } from "../types";

interface ProtocolsSuiteProps {
  onApplyToStudio?: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio?: () => void;
}

export default function ProtocolsSuite({
  onApplyToStudio,
  onSwitchToStudio
}: ProtocolsSuiteProps) {
  const [activeProtocolId, setActiveProtocolId] = useState<string>("shadow-weaving");
  const [includeBinauralInLyrics, setIncludeBinauralInLyrics] = useState<boolean>(false);
  const [useRadioEditForMaster, setUseRadioEditForMaster] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"focused" | "grid" | "markdown">("focused");

  // Copy feedbacks
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedLyricsId, setCopiedLyricsId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedFullSuite, setCopiedFullSuite] = useState<boolean>(false);

  // Web Audio ASMR Binaural Audition
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<{ stop: () => void } | null>(null);

  const activeProtocol =
    DDSP_ASMR_PROTOCOLS.find((p) => p.id === activeProtocolId) ||
    DDSP_ASMR_PROTOCOLS[0];

  const getEffectiveStylePrompt = (proto: DdspAsmrProtocol) => {
    if (proto.id === "master-console" && useRadioEditForMaster && proto.radioEditStylePrompt) {
      return proto.radioEditStylePrompt;
    }
    return proto.stylePrompt;
  };

  const getEffectiveLyrics = (proto: DdspAsmrProtocol) => {
    if (includeBinauralInLyrics) {
      return `[Instrumental]\n\n${proto.binauralPanningInstructions}`;
    }
    return proto.lyrics;
  };

  const copyToClipboard = (text: string, type: "style" | "lyrics" | "all", id: string) => {
    navigator.clipboard.writeText(text);
    if (type === "style") {
      setCopiedStyleId(id);
      setTimeout(() => setCopiedStyleId(null), 2000);
    } else if (type === "lyrics") {
      setCopiedLyricsId(id);
      setTimeout(() => setCopiedLyricsId(null), 2000);
    } else if (type === "all") {
      setCopiedAllId(id);
      setTimeout(() => setCopiedAllId(null), 2000);
    }
  };

  const generateFullMarkdown = () => {
    let md = `Here are the **DDSP ASMR instrumental** versions of the 7 Living Integration Protocols, plus the ℰ-Integration Console master, customized specifically for **acoustic trumpet, flugelhorn, and natural organic instruments** (100% natural room capture, zero synthetic AI artifacts). Each is a Suno-ready Style prompt with \`[Instrumental]\` in the Lyrics box. All are soft, binaural, textural, and under 3000 characters.\n\n---\n\n`;

    DDSP_ASMR_PROTOCOLS.forEach((proto) => {
      const styleText = getEffectiveStylePrompt(proto);
      const lyricsText = getEffectiveLyrics(proto);

      md += `## ${proto.title}\n\n`;
      md += `**Style**\n\`\`\`text\n${styleText}\n\`\`\`\n`;
      md += `**Lyrics**\n\`\`\`text\n${lyricsText}\n\`\`\`\n\n---\n\n`;
    });

    md += `*Note: All prompts feature authentic acoustic instrument performance cues (Harmon mute, cup mute, velvet flugelhorn breath, pedal tones, half-valve inflections, real cello, upright bass, singing bowls) with explicit anti-AI-artifact acoustic realism instructions.*`;
    return md;
  };

  const copyFullMarkdownSuite = () => {
    const md = generateFullMarkdown();
    navigator.clipboard.writeText(md);
    setCopiedFullSuite(true);
    setTimeout(() => setCopiedFullSuite(false), 2500);
  };

  const handleApplyToStudio = (proto: DdspAsmrProtocol) => {
    if (!onApplyToStudio) return;

    const styleText = getEffectiveStylePrompt(proto);
    const lyricsText = getEffectiveLyrics(proto);

    const config: PromptConfig = {
      subtheme: proto.shortTitle,
      genre: "DDSP ASMR Neural Instrumental",
      mood: "Whisper-soft, binaural, textural, intimate",
      tempo: proto.bpm,
      vocalType: "None / [Instrumental]",
      instruments: proto.keyTextures.join(", "),
      structure: "Organic continuous binaural flow, seamless timbral transfer"
    };

    const result: PromptResult = {
      title: `${proto.title.replace("— DDSP ASMR", "")} (DDSP ASMR)`,
      styleTags: styleText,
      promptDescription: proto.sonicDescription,
      lyrics: lyricsText,
      tips: [
        ...proto.sunoTips,
        `Tempo calibrated to ${proto.bpm} for optimal ASMR brainwave induction.`,
        "Check headphones stereo balance for full 3D binaural separation."
      ]
    };

    onApplyToStudio(config, result);
    if (onSwitchToStudio) {
      onSwitchToStudio();
    }
  };

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      if (activeNodesRef.current) {
        try {
          activeNodesRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Web Audio ASMR Binaural Simulator
  const toggleAuditionAudio = () => {
    if (isPlayingAudio) {
      if (activeNodesRef.current) {
        activeNodesRef.current.stop();
        activeNodesRef.current = null;
      }
      setIsPlayingAudio(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master gain set very gentle for ASMR
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Stereo panner for binaural split
      // Left oscillator (carrier 136.1 Hz - OM frequency)
      const leftOsc = ctx.createOscillator();
      const leftGain = ctx.createGain();
      const leftPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      leftOsc.type = "sine";
      leftOsc.frequency.setValueAtTime(136.1, ctx.currentTime);
      leftGain.gain.setValueAtTime(0.08, ctx.currentTime);

      if (leftPanner) {
        leftPanner.pan.setValueAtTime(-0.85, ctx.currentTime);
        leftOsc.connect(leftGain);
        leftGain.connect(leftPanner);
        leftPanner.connect(masterGain);
      } else {
        leftOsc.connect(leftGain);
        leftGain.connect(masterGain);
      }

      // Right oscillator (142.1 Hz -> 6.0 Hz Theta Binaural Beat for ASMR tingles)
      const rightOsc = ctx.createOscillator();
      const rightGain = ctx.createGain();
      const rightPanner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      rightOsc.type = "sine";
      rightOsc.frequency.setValueAtTime(142.1, ctx.currentTime);
      rightGain.gain.setValueAtTime(0.08, ctx.currentTime);

      if (rightPanner) {
        rightPanner.pan.setValueAtTime(0.85, ctx.currentTime);
        rightOsc.connect(rightGain);
        rightGain.connect(rightPanner);
        rightPanner.connect(masterGain);
      } else {
        rightOsc.connect(rightGain);
        rightGain.connect(masterGain);
      }

      // Filtered whisper pink-noise bed for tactile texture
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.08;
      }

      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.setValueAtTime(450, ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.8, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.04, ctx.currentTime);

      noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Start all
      leftOsc.start();
      rightOsc.start();
      noiseNode.start();

      activeNodesRef.current = {
        stop: () => {
          try {
            leftOsc.stop();
            rightOsc.stop();
            noiseNode.stop();
          } catch (e) {
            // ignore
          }
        }
      };

      setIsPlayingAudio(true);
    } catch (err) {
      console.warn("Could not start Web Audio preview:", err);
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Master Introduction Box */}
      <div className="rounded-3xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-950 border border-stone-800 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5 text-amber-400" />
                <span>DDSP ASMR Acoustic Trumpet Suite</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800/80 border border-stone-700 text-stone-300 font-mono text-[11px]">
                Acoustic Trumpet & Flugelhorn
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px]">
                100% Real Instruments (No AI Glaze)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 font-mono text-[11px]">
                &lt; 3000 Chars (Suno Ready)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              DDSP ASMR Instrumental Versions
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              Crafted specifically for the <strong className="text-amber-300 font-medium">trumpet player</strong>: all 7 Living Integration Protocols and the ℰ-Integration Console Master feature <strong className="text-white font-medium">real acoustic trumpet and flugelhorn</strong> (Harmon mute whispers, cup mutes, velvet breath, pedal tones, flutter-tonguing, and valve release clicks) paired with <strong className="text-white font-medium">genuine acoustic instruments</strong> (cello, upright bass, hammered bowls, skin drums) recorded in real room acoustics with zero synthetic AI sheen.
            </p>
          </div>

          {/* Quick Utility Actions */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={copyFullMarkdownSuite}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
            >
              {copiedFullSuite ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFullSuite ? "Copied All as Markdown" : "Copy Complete Suite"}</span>
            </button>

            <button
              type="button"
              onClick={toggleAuditionAudio}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                isPlayingAudio
                  ? "bg-amber-500/20 border-amber-500 text-amber-300 animate-pulse"
                  : "bg-stone-900/80 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Square className="w-4 h-4 text-amber-400" />
                  <span>Stop Binaural ASMR Tone</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-amber-400" />
                  <span>Audition Binaural Texture</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Parameter Controls Bar */}
        <div className="mt-6 pt-5 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Binaural Cues Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 cursor-pointer hover:border-stone-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <Ear className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-xs font-semibold text-stone-200">
                  Binaural Panning Cues
                </div>
                <div className="text-[10px] text-stone-400 font-light">
                  Include left/right ear spatial tags in Lyrics
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeBinauralInLyrics}
              onChange={(e) => setIncludeBinauralInLyrics(e.target.checked)}
              className="accent-amber-500 w-4 h-4 cursor-pointer"
            />
          </label>

          {/* Master Radio Edit Toggle */}
          <label className="flex items-center justify-between p-3 rounded-xl bg-stone-900/60 border border-stone-800/80 cursor-pointer hover:border-stone-700 transition-colors">
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-teal-400" />
              <div>
                <div className="text-xs font-semibold text-stone-200">
                  Master Radio-Edit (&lt;1500)
                </div>
                <div className="text-[10px] text-stone-400 font-light">
                  Condensed style prompt for tight windows
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={useRadioEditForMaster}
              onChange={(e) => setUseRadioEditForMaster(e.target.checked)}
              className="accent-teal-500 w-4 h-4 cursor-pointer"
            />
          </label>

          {/* View Mode Selector */}
          <div className="flex items-center p-1 rounded-xl bg-stone-950 border border-stone-800 text-xs font-mono">
            <button
              type="button"
              onClick={() => setViewMode("focused")}
              className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "focused"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Single Inspector
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "grid"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              8-Card Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("markdown")}
              className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
                viewMode === "markdown"
                  ? "bg-amber-500 text-stone-950 font-bold"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Raw Markdown
            </button>
          </div>
        </div>
      </div>

      {/* Protocol Quick-Select Pills Bar */}
      <div className="p-2 rounded-2xl bg-stone-900/80 border border-stone-800">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {DDSP_ASMR_PROTOCOLS.map((proto) => {
            const isSelected = proto.id === activeProtocolId;
            return (
              <button
                key={proto.id}
                type="button"
                onClick={() => setActiveProtocolId(proto.id)}
                className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/15 border-amber-500/50 shadow-md text-amber-300 ring-1 ring-amber-500/30"
                    : "bg-stone-950/60 border-stone-800/80 text-stone-400 hover:text-white hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-stone-900 border border-stone-800 text-stone-300">
                    {proto.number}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-amber-400">
                    {proto.symbol}
                  </span>
                </div>
                <div className="text-xs font-semibold truncate">
                  {proto.shortTitle}
                </div>
                <div className="text-[10px] font-mono text-stone-500 truncate mt-0.5">
                  {proto.bpm}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: Focused Inspector View */}
      {viewMode === "focused" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Card (8 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-6 shadow-xl">
            {/* Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {activeProtocol.number} · {activeProtocol.symbol}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
                    {activeProtocol.bpm}
                  </span>
                  {activeProtocol.id === "master-console" && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold border border-purple-500/30">
                      Grand Master
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-serif font-bold text-white mt-1">
                  {activeProtocol.title}
                </h2>
                <p className="text-xs text-stone-300 mt-1 font-light leading-relaxed">
                  {activeProtocol.sonicDescription}
                </p>
              </div>

              {onApplyToStudio && (
                <button
                  type="button"
                  onClick={() => handleApplyToStudio(activeProtocol)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all shadow cursor-pointer shrink-0"
                >
                  <span>Apply to Suno Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Style Prompt Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5" />
                  <span>Style Box (Suno)</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-400">
                    {getEffectiveStylePrompt(activeProtocol).length} characters
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        getEffectiveStylePrompt(activeProtocol),
                        "style",
                        activeProtocol.id
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                  >
                    {copiedStyleId === activeProtocol.id ? (
                      <>
                        <Check className="w-3 h-3 text-teal-400" />
                        <span>Copied Style</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Style</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs leading-relaxed select-all">
                {getEffectiveStylePrompt(activeProtocol)}
              </div>

              {activeProtocol.id === "master-console" && (
                <div className="flex items-center justify-between text-[11px] font-mono text-stone-400 pt-1">
                  <span>
                    Radio-Edit alternative: {activeProtocol.radioEditStylePrompt?.length} chars (&lt; 1500 limit).
                  </span>
                  <button
                    type="button"
                    onClick={() => setUseRadioEditForMaster(!useRadioEditForMaster)}
                    className="text-amber-400 hover:underline cursor-pointer"
                  >
                    {useRadioEditForMaster ? "Switch to Full Master" : "Use Radio-Edit"}
                  </button>
                </div>
              )}
            </div>

            {/* Lyrics Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Lyrics Box (Suno)</span>
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-stone-400">
                    {getEffectiveLyrics(activeProtocol).length} characters
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        getEffectiveLyrics(activeProtocol),
                        "lyrics",
                        activeProtocol.id
                      )
                    }
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-xs font-mono text-stone-200 border border-stone-700 transition-colors cursor-pointer"
                  >
                    {copiedLyricsId === activeProtocol.id ? (
                      <>
                        <Check className="w-3 h-3 text-teal-400" />
                        <span>Copied Lyrics</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Lyrics</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs leading-relaxed whitespace-pre-line select-all">
                {getEffectiveLyrics(activeProtocol)}
              </div>
            </div>

            {/* Binaural Panning Instructions Detail */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                  <Ear className="w-3.5 h-3.5 text-amber-400" />
                  <span>Binaural Panning Instructions (Left / Right Ear Cues)</span>
                </span>
                <span className="text-[11px] font-mono text-stone-400">
                  3D Spatial Headphone Guidance
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-stone-950/70 border border-stone-800/80 text-[11px] font-mono text-stone-300 leading-relaxed whitespace-pre-line">
                {activeProtocol.binauralPanningInstructions}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Key Textures & Suno Guidance (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Key Textures Card */}
            <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Key Neural Textures</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {activeProtocol.keyTextures.map((tex, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-xs text-stone-300 font-mono"
                  >
                    {tex}
                  </span>
                ))}
              </div>
            </div>

            {/* Suno Generation Guidance Card */}
            <div className="p-5 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
              <h3 className="text-xs font-mono font-bold text-stone-200 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span>Suno Production Directives</span>
              </h3>
              <ul className="space-y-2">
                {activeProtocol.sunoTips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-stone-400 font-light flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Master Suite Quick Jump */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-stone-950 border border-amber-500/30 space-y-2">
              <div className="text-xs font-mono font-bold text-amber-300">
                Flagship Console Master
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                Weave all 7 protocols simultaneously into an integrated 60 BPM ambient continuum.
              </p>
              <button
                type="button"
                onClick={() => setActiveProtocolId("master-console")}
                className="w-full py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Inspect ℰ-Console Master
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: 8-Card Grid View */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {DDSP_ASMR_PROTOCOLS.map((proto) => {
            const stylePrompt = getEffectiveStylePrompt(proto);
            const lyrics = getEffectiveLyrics(proto);
            const isMaster = proto.id === "master-console";

            return (
              <div
                key={proto.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                  isMaster
                    ? "bg-gradient-to-b from-stone-900 to-stone-950 border-purple-500/40 shadow-xl"
                    : "bg-stone-900/90 border-stone-800"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {proto.number}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-mono">
                        {proto.bpm}
                      </span>
                      {isMaster && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                          Grand Master
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          `Style:\n${stylePrompt}\n\nLyrics:\n${lyrics}`,
                          "all",
                          proto.id
                        )
                      }
                      className="p-1.5 rounded-lg bg-stone-800 text-stone-300 hover:text-white transition-colors cursor-pointer"
                      title="Copy Style & Lyrics"
                    >
                      {copiedAllId === proto.id ? (
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white">
                    {proto.title}
                  </h3>

                  {/* Style Box */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-amber-400 font-bold">
                      Style Prompt ({stylePrompt.length} chars):
                    </div>
                    <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 leading-relaxed select-all">
                      {stylePrompt}
                    </div>
                  </div>

                  {/* Lyrics Box */}
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-teal-400 font-bold">
                      Lyrics Box:
                    </div>
                    <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] font-mono text-stone-300 whitespace-pre-line select-all">
                      {lyrics}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveProtocolId(proto.id);
                      setViewMode("focused");
                    }}
                    className="text-xs font-mono text-stone-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    View Details & Panning →
                  </button>

                  {onApplyToStudio && (
                    <button
                      type="button"
                      onClick={() => handleApplyToStudio(proto)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all cursor-pointer shadow"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 3: Raw Markdown View */}
      {viewMode === "markdown" && (
        <div className="rounded-3xl bg-stone-900/90 border border-stone-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Exact Markdown Output
            </span>
            <button
              type="button"
              onClick={copyFullMarkdownSuite}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-mono font-bold hover:bg-amber-400 transition-all cursor-pointer"
            >
              {copiedFullSuite ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFullSuite ? "Copied" : "Copy Markdown"}</span>
            </button>
          </div>

          <pre className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-stone-300 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap select-all">
            {generateFullMarkdown()}
          </pre>
        </div>
      )}
    </div>
  );
}
