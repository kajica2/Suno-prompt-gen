import { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Play, 
  Square, 
  RotateCcw, 
  ArrowRight, 
  Volume2, 
  Music, 
  BookOpen, 
  Layers, 
  Compass, 
  Activity, 
  Check, 
  ExternalLink,
  ChevronRight,
  Info,
  Copy,
  FileText,
  CheckCheck,
  Download,
  FileCode,
  X
} from "lucide-react";
import { PromptConfig, PromptResult } from "../types";
import { SUNO_VOCAL_HARMONIC_PROMPTS, VOCAL_STRUCTURE_TAGS, SunoVocalPrompt } from "../data/sunoHarmonicPrompts";
import { 
  downloadProgressionJSON, 
  generateHarmonicProgressionJSON, 
  HarmonicFrameworkExportJSON 
} from "../utils/harmonicProgressionExport";

interface HarmonicStudyEngineProps {
  onApplyConfig: (config: PromptConfig, sampleResult?: PromptResult) => void;
  onSwitchToGenerator: () => void;
}

const PROMPT_TO_FRAMEWORK_MAP: Record<string, string> = {
  "baroque-functional": "functional",
  "jazz-cadence": "jazz",
  "bartok-axis": "bartok",
  "neoriemannian-triads": "neoriemannian",
  "atonal-pitch-class": "settheory",
  "spectral-psychoacoustic": "scientific",
  "combined-harmonic-medley": "prompts"
};

// Frequency helper for MIDI note number
function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

// Simple Web Audio Player for Chords & Voicings
class SimpleHarmonicSynth {
  private ctx: AudioContext | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];

  private getContext(): AudioContext {
    if (!this.ctx || this.ctx.state === "closed") {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playChord(midiNotes: number[], durationSec = 1.6) {
    this.stop();
    const ctx = this.getContext();
    const now = ctx.currentTime;

    midiNotes.forEach((midi) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Warm blended wave: triangle with soft harmonics
      osc.type = "triangle";
      osc.frequency.setValueAtTime(midiToFreq(midi), now);

      // ADSR Envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.12 / Math.sqrt(midiNotes.length), now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.08 / Math.sqrt(midiNotes.length), now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + durationSec + 0.1);

      this.activeNodes.push({ osc, gain });
    });
  }

  stop() {
    if (this.ctx && this.activeNodes.length > 0) {
      this.activeNodes.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(this.ctx!.currentTime);
          gain.gain.setValueAtTime(0.0001, this.ctx!.currentTime);
          osc.stop(this.ctx!.currentTime);
        } catch {
          // Ignore already stopped nodes
        }
      });
      this.activeNodes = [];
    }
  }
}

export default function HarmonicStudyEngine({ onApplyConfig, onSwitchToGenerator }: HarmonicStudyEngineProps) {
  const synthRef = useRef<SimpleHarmonicSynth | null>(null);
  const [activeTab, setActiveTab] = useState<
    "prompts" | "functional" | "jazz" | "bartok" | "schenker" | "neoriemannian" | "settheory" | "scientific" | "summary"
  >("prompts");

  // Clipboard copy state, vocal structure toggles, and instrumental toggles
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [vocalTagsEnabled, setVocalTagsEnabled] = useState<{ [id: string]: boolean }>({});
  const [instrumentalMode, setInstrumentalMode] = useState<{ [id: string]: boolean }>({});

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const toggleInstrumentalMode = (id: string) => {
    setInstrumentalMode(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleVocalTags = (id: string) => {
    setVocalTagsEnabled(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Jazz Voicing interactive state
  const [jazzVoicingType, setJazzVoicingType] = useState<"drop2" | "minimum" | "root">("minimum");
  const [jazzChordIndex, setJazzChordIndex] = useState<number>(0);
  const [isPlayingJazzSeq, setIsPlayingJazzSeq] = useState(false);

  // Bartók Axis interactive state
  const [selectedAxisPole, setSelectedAxisPole] = useState<"C" | "F#" | "Eb" | "A">("C");
  const [isAxisModulating, setIsAxisModulating] = useState(false);

  // Neo-Riemannian state
  const [neoCurrentChord, setNeoCurrentChord] = useState<{ name: string; notes: number[]; triad: "C Maj" | "C min" | "E min" | "A min" }>({
    name: "C Major",
    triad: "C Maj",
    notes: [60, 64, 67] // C4, E4, G4
  });
  const [neoHistory, setNeoHistory] = useState<string[]>(["C Major (Initial)"]);

  // Applied feedback
  const [appliedBadge, setAppliedBadge] = useState<string | null>(null);

  // JSON Progression Export State
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [currentExportJSON, setCurrentExportJSON] = useState<HarmonicFrameworkExportJSON | null>(null);
  const [exportSuccessMessage, setExportSuccessMessage] = useState<string | null>(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Export current or selected framework progression to JSON
  const handleExportProgression = (overrideFrameworkId?: string, openPreview = false) => {
    const targetId = overrideFrameworkId || activeTab;
    const json = generateHarmonicProgressionJSON(targetId, {
      jazzVoicingType,
      selectedAxisPole,
      neoCurrentChord,
      neoHistory
    });

    if (openPreview) {
      setCurrentExportJSON(json);
      setPreviewModalOpen(true);
      setJsonCopied(false);
    } else {
      const { filename } = downloadProgressionJSON(targetId, {
        jazzVoicingType,
        selectedAxisPole,
        neoCurrentChord,
        neoHistory
      });
      setExportSuccessMessage(`Downloaded "${filename}" — ready to import into external DAWs and notation software!`);
      setTimeout(() => setExportSuccessMessage(null), 6000);
    }
  };

  useEffect(() => {
    synthRef.current = new SimpleHarmonicSynth();
    return () => {
      synthRef.current?.stop();
    };
  }, []);

  const playNotes = (notes: number[], duration = 1.4) => {
    synthRef.current?.playChord(notes, duration);
  };

  // Jazz II-V-I Voicings in C Major
  const JAZZ_VOICINGS = {
    root: [
      { name: "Dm7 (ii⁷)", roman: "ii⁷", notes: [62, 65, 69, 72], noteNames: ["D4", "F4", "A4", "C5"] },
      { name: "G7 (V⁷)", roman: "V⁷", notes: [55, 59, 62, 65], noteNames: ["G3", "B3", "D4", "F4"] },
      { name: "Cmaj7 (IΔ)", roman: "IΔ", notes: [60, 64, 67, 71], noteNames: ["C4", "E4", "G4", "B4"] }
    ],
    minimum: [
      // Minimum motion smooth voice leading:
      // Dm7: C4 - F4 - A4 - D5
      // G7:  B3 - F4 - G4 - D5 (7th C drops to B, 3rd F stays, 5th A drops to G)
      // Cmaj7: B3 - E4 - G4 - C5 (7th F drops to E, leading tone B resolves to C or stays as major 7th)
      { name: "Dm7 (Smooth ii⁷)", roman: "ii⁷", notes: [60, 65, 69, 74], noteNames: ["C4", "F4", "A4", "D5"] },
      { name: "G7 (Voice-led V⁷)", roman: "V⁷", notes: [59, 65, 67, 74], noteNames: ["B3", "F4", "G4", "D5"] },
      { name: "Cmaj7 (Resolved IΔ)", roman: "IΔ", notes: [59, 64, 67, 72], noteNames: ["B3", "E4", "G4", "C5"] }
    ],
    drop2: [
      // Drop-2 voicing: Take second voice from top and drop down an octave
      { name: "Dm7 (Drop-2)", roman: "ii⁷", notes: [53, 62, 65, 69], noteNames: ["F3", "D4", "F4", "A4"] },
      { name: "G7 (Drop-2)", roman: "V⁷", notes: [55, 62, 65, 71], noteNames: ["G3", "D4", "F4", "B4"] },
      { name: "Cmaj7 (Drop-2)", roman: "IΔ", notes: [52, 60, 64, 71], noteNames: ["E3", "C4", "E4", "B4"] }
    ]
  };

  const handlePlayJazzSequence = () => {
    if (isPlayingJazzSeq) return;
    setIsPlayingJazzSeq(true);
    const chords = JAZZ_VOICINGS[jazzVoicingType];
    
    // Chord 1 (ii)
    setJazzChordIndex(0);
    playNotes(chords[0].notes, 1.2);

    // Chord 2 (V)
    setTimeout(() => {
      setJazzChordIndex(1);
      playNotes(chords[1].notes, 1.2);
    }, 1300);

    // Chord 3 (I)
    setTimeout(() => {
      setJazzChordIndex(2);
      playNotes(chords[2].notes, 2.0);
    }, 2600);

    setTimeout(() => {
      setIsPlayingJazzSeq(false);
    }, 4600);
  };

  // Bartók Axis System Chords
  const playAxisPole = (pole: "C" | "F#" | "Eb" | "A") => {
    setSelectedAxisPole(pole);
    if (pole === "C") playNotes([48, 60, 64, 67]); // C Major / Tonic pole
    else if (pole === "F#") playNotes([54, 66, 70, 73]); // F# Major / Tritone counterpole
    else if (pole === "Eb") playNotes([51, 63, 67, 70]); // Eb Major
    else if (pole === "A") playNotes([57, 69, 73, 76]); // A Major
  };

  const handleAxisModulationDemo = () => {
    setIsAxisModulating(true);
    // Play Tonic C pole
    setSelectedAxisPole("C");
    playNotes([48, 60, 64, 67], 1.5);

    // After 1.6s, modulate directly to F# counterpole without V
    setTimeout(() => {
      setSelectedAxisPole("F#");
      playNotes([54, 66, 70, 73], 2.2);
    }, 1600);

    setTimeout(() => {
      setIsAxisModulating(false);
    }, 3800);
  };

  // Neo-Riemannian Transformations
  const handleNeoTransformation = (op: "P" | "L" | "R") => {
    if (op === "P") {
      // Parallel: C Major (C-E-G) <-> C Minor (C-Eb-G)
      if (neoCurrentChord.triad === "C Maj") {
        setNeoCurrentChord({ name: "C minor", triad: "C min", notes: [60, 63, 67] });
        setNeoHistory(prev => [...prev, "P (Parallel) → C minor (E moved down to E♭)"]);
        playNotes([60, 63, 67], 1.5);
      } else {
        setNeoCurrentChord({ name: "C Major", triad: "C Maj", notes: [60, 64, 67] });
        setNeoHistory(prev => [...prev, "P (Parallel) → C Major (E♭ moved up to E)"]);
        playNotes([60, 64, 67], 1.5);
      }
    } else if (op === "L") {
      // Leittonwechsel: C Major (C-E-G) <-> E Minor (B-E-G)
      if (neoCurrentChord.triad === "C Maj") {
        setNeoCurrentChord({ name: "E minor", triad: "E min", notes: [59, 64, 67] });
        setNeoHistory(prev => [...prev, "L (Leittonwechsel) → E minor (C moved down to B)"]);
        playNotes([59, 64, 67], 1.5);
      } else {
        setNeoCurrentChord({ name: "C Major", triad: "C Maj", notes: [60, 64, 67] });
        setNeoHistory(prev => [...prev, "L (Leittonwechsel) → C Major (B moved up to C)"]);
        playNotes([60, 64, 67], 1.5);
      }
    } else if (op === "R") {
      // Relative: C Major (C-E-G) <-> A Minor (C-E-A)
      if (neoCurrentChord.triad === "C Maj") {
        setNeoCurrentChord({ name: "A minor", triad: "A min", notes: [57, 60, 64] });
        setNeoHistory(prev => [...prev, "R (Relative) → A minor (G moved up to A)"]);
        playNotes([57, 60, 64], 1.5);
      } else {
        setNeoCurrentChord({ name: "C Major", triad: "C Maj", notes: [60, 64, 67] });
        setNeoHistory(prev => [...prev, "R (Relative) → C Major (A moved down to G)"]);
        playNotes([60, 64, 67], 1.5);
      }
    }
  };

  // Reset Neo-Riemannian to C Major
  const handleNeoReset = () => {
    setNeoCurrentChord({ name: "C Major", triad: "C Maj", notes: [60, 64, 67] });
    setNeoHistory(["C Major (Reset)"]);
    playNotes([60, 64, 67], 1.2);
  };

  // Bridge helper to apply harmonic framework to Suno Aura Generator
  const applyFrameworkToSuno = (frameworkKey: string) => {
    let targetConfig: PromptConfig;

    if (frameworkKey === "bartok") {
      targetConfig = {
        subtheme: "Shine in Peace (Symmetrical Axis Meditation)",
        genre: "Bartókian Modern Classical & Symmetrical Axes",
        mood: "Tritone Polar Opposition, Symmetrical Harmony, Restful Balance",
        tempo: "Rubato, Unquantized, Organic Breathing (68 BPM)",
        vocalType: "Instrumental (No Vocals, [Instrumental])",
        instruments: "felt piano, close-mic'd, pedal noise, muted cello, celesta, no drums, no synth",
        structure: "Axis Flow ([Intro: C pole] - [Theme: F# counterpole] - [Interlude: whole-tone] - [Outro: axis resolution])"
      };
      setAppliedBadge("Bartók Axis Framework");
    } else if (frameworkKey === "jazz") {
      targetConfig = {
        subtheme: "Shine in Peace (II-V-I Warm Resolution)",
        genre: "Modal Jazz & Warm Soul Harmony",
        mood: "Rich Alterations, Drop-2 Voice Leading, Peaceful Cadence",
        tempo: "Laid-back Swing (84 BPM)",
        vocalType: "Warm intimate jazz vocalist, subtle breath and restrained doubles",
        instruments: "semi-hollow jazz guitar, upright bass, brushed snare, warm Rhodes chords",
        structure: "Jazz Standard (Intro - Verse - II-V-I Chorus - Solo - Bridge - Outro)"
      };
      setAppliedBadge("Jazz II-V-I Voice-Leading");
    } else if (frameworkKey === "neoriemannian") {
      targetConfig = {
        subtheme: "Shine in Peace (Parsimonious Triadic Drift)",
        genre: "Late Romantic Cinematic & Neo-Riemannian Film Score",
        mood: "Parsimonious Triadic Transformations, P-L-R Voice Leading, Dreamy",
        tempo: "Slow & Floating (64 BPM)",
        vocalType: "Instrumental (No Vocals, [Instrumental])",
        instruments: "chamber strings, french horns, warm harp, solitary piano, room tone",
        structure: "Tonnetz Progression ([Intro: C Maj] - [Theme: P/L shifts] - [Bridge: distant triads] - [Outro: pure resolution])"
      };
      setAppliedBadge("Neo-Riemannian P-L-R Framework");
    } else if (frameworkKey === "schenker") {
      targetConfig = {
        subtheme: "Shine in Peace (Prolonged Triadic Urlinie)",
        genre: "Neoclassical & Structural Piano Quintet",
        mood: "Organic Prolongation, Deep Structural Calm, Contrapuntal Peace",
        tempo: "Adagio Espressivo (72 BPM)",
        vocalType: "Instrumental (No Vocals, [Instrumental])",
        instruments: "concert grand piano, string quartet, natural room reverb",
        structure: "Schenkerian Arch ([Vordergrund: embellishments] - [Mittelgrund: expansion] - [Hintergrund: Urlinie descent])"
      };
      setAppliedBadge("Schenkerian Prolongation");
    } else if (frameworkKey === "settheory") {
      targetConfig = {
        subtheme: "Shine in Peace (Petrushka Octatonic Colors)",
        genre: "Post-Tonal Avant-Garde & Impressionist Octatonic",
        mood: "Interval-Class Symmetries, Floating Polar Centers, Mystical",
        tempo: "Fluid Unmetered Rubato",
        vocalType: "Instrumental (No Vocals, [Instrumental])",
        instruments: "two grand pianos, muted trumpet, marimba, flute",
        structure: "Set-Theoretic Mosaic ([Set A: C triad] - [Set B: F# triad] - [Octatonic Union] - [Quiet Dissolution])"
      };
      setAppliedBadge("Pitch-Class Set Theory");
    } else {
      targetConfig = {
        subtheme: "Shine in Peace (Pure Functional Resolution)",
        genre: "Common-Practice Classical & Baroque Choral",
        mood: "Tonic-Dominant Polarity, Restful Resolution, Sacred Calm",
        tempo: "Andante Cantabile (80 BPM)",
        vocalType: "Warm vocal ensemble & SATB choral blend",
        instruments: "pipe organ, chamber strings, harpsichord, natural church acoustics",
        structure: "Tonal Cadence (Tonic I - Subdominant IV - Dominant V7 - Final Tonic I)"
      };
      setAppliedBadge("Functional Tonality");
    }

    onApplyConfig(targetConfig);
    setTimeout(() => {
      onSwitchToGenerator();
    }, 600);
  };

  // Helper to load specific Suno Ready Vocal Prompt directly into the prompt generator
  const handleApplySunoReadyPrompt = (p: SunoVocalPrompt, isInstrumental = false) => {
    const targetConfig: PromptConfig = {
      subtheme: `Shine in Peace (${p.title})`,
      genre: p.tags.slice(0, 2).join(" & "),
      mood: p.tags.slice(2).join(", "),
      tempo: `${p.bpm} BPM`,
      vocalType: isInstrumental ? "Instrumental (No Vocals, [Instrumental])" : p.vocalType,
      instruments: p.tags.slice(0, 3).join(", "),
      structure: isInstrumental ? "Instrumental Sections" : "Verse-Chorus-Bridge with Section Brackets"
    };

    const targetResult: PromptResult = {
      title: p.title,
      styleTags: p.styleTags,
      promptDescription: p.description,
      lyrics: isInstrumental ? "[Instrumental]" : p.lyrics,
      tips: [
        `Style prompt is ${p.characterCount} characters (well under Suno's 3,000 char limit).`,
        `Lyrics prompt is ${p.lyricsCharacterCount} characters with clear bracket section tags.`,
        `BPM is tuned to ${p.bpm} for optimal tempo and acoustic flow in Suno.`
      ]
    };

    setAppliedBadge(p.title);
    onApplyConfig(targetConfig, targetResult);
    setTimeout(() => {
      onSwitchToGenerator();
    }, 600);
  };

  // Highlights bracketed cues and section names in Suno lyrics
  const renderLyricsFormatted = (lyricsText: string) => {
    return lyricsText.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      const isBracket = trimmed.startsWith("[") && trimmed.endsWith("]");
      if (isBracket) {
        if (trimmed.includes(":")) {
          const inner = trimmed.slice(1, -1);
          const colonIdx = inner.indexOf(":");
          const tag = inner.slice(0, colonIdx).trim();
          const cues = inner.slice(colonIdx + 1).trim();
          return (
            <div key={idx} className="mt-3 mb-1 font-mono text-[11px]">
              <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold uppercase">
                [{tag}: <span className="text-amber-200/90 font-normal normal-case">{cues}]</span>
              </span>
            </div>
          );
        }
        return (
          <div key={idx} className="mt-3 mb-1 font-mono text-[11px]">
            <span className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold uppercase">
              {trimmed}
            </span>
          </div>
        );
      }
      return (
        <div key={idx} className="text-stone-300 font-sans text-xs leading-relaxed">
          {line || <span className="inline-block h-2" />}
        </div>
      );
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Hero Banner */}
      <div className="glass rounded-3xl p-6 md:p-8 bg-gradient-to-br from-amber-500/10 via-stone-900/60 to-purple-900/10 border border-amber-500/20 relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-mono font-medium tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Synesthesia & Analysis Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
              The Harmonic Study Engine
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm font-sans font-light max-w-3xl leading-relaxed">
              Explore the rich tapestry of analytical frameworks that govern musical motion—from common-practice functional resolution to Bartók’s symmetrical axes and Neo-Riemannian parsimony. Audition each principle directly and apply verified, ready-to-paste prompts into Suno AI.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleExportProgression(activeTab, false)}
              className="flex items-center gap-2 px-3.5 py-2.5 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl font-mono text-xs font-bold transition-all shadow-md hover:shadow-amber-500/10 cursor-pointer"
              title="Download selected chord progression as a JSON file for DAWs & notation software"
            >
              <Download className="w-4 h-4" />
              <span>Export Progression (JSON)</span>
            </button>

            <button
              type="button"
              onClick={() => handleExportProgression(activeTab, true)}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white rounded-xl font-mono text-xs font-medium transition-all cursor-pointer"
              title="Preview JSON schema and copy to clipboard"
            >
              <FileCode className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Preview</span>
            </button>

            <button
              onClick={onSwitchToGenerator}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-mono text-xs font-bold transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
            >
              <span>Return to Suno Generator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {exportSuccessMessage && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-mono flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{exportSuccessMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => handleExportProgression(activeTab, true)}
              className="text-[11px] underline text-emerald-300 hover:text-white cursor-pointer"
            >
              Inspect JSON
            </button>
          </div>
        )}

        {appliedBadge && (
          <div className="mt-4 p-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-200 text-xs font-mono flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-green-400" />
            <span>Applied <strong>{appliedBadge}</strong> to the Suno prompt configuration! Redirecting to studio...</span>
          </div>
        )}
      </div>

      {/* Analytical Framework Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
        {[
          { id: "prompts", label: "Suno Prompts & Medley (7)", icon: "🎙️" },
          { id: "functional", label: "Functional Tonality", icon: "🎼" },
          { id: "jazz", label: "Jazz Harmony & II-V-I", icon: "🎷" },
          { id: "bartok", label: "Bartók Axis System", icon: "🎹" },
          { id: "schenker", label: "Schenkerian Analysis", icon: "🧬" },
          { id: "neoriemannian", label: "Neo-Riemannian Theory", icon: "🔄" },
          { id: "settheory", label: "Pitch-Class Set Theory", icon: "🔢" },
          { id: "scientific", label: "Scientific & Computational", icon: "🔬" },
          { id: "summary", label: "Comparison Matrix", icon: "💎" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs whitespace-nowrap transition-all cursor-pointer border ${
              activeTab === tab.id
                ? "bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold shadow-inner"
                : "bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT AREA */}

      {/* 0. SUNO-READY VOCAL PROMPTS TAB */}
      {activeTab === "prompts" && (
        <div className="space-y-6">
          {/* Overview Banner */}
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-amber-500/30 bg-stone-900/50">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Suno Vocal Generation Suites</span>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
                  7 Curated Vocal Suites & The Grand Medley
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm font-light mt-1 max-w-2xl">
                  Explore 6 focused individual harmonic frameworks, plus a monumental <strong>Combined Vocal Medley</strong> that journeys sequentially through all six traditions in a single song. All under Suno’s 3,000-character limit.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCheck className="w-4 h-4 text-emerald-400" />
                  <span>All &lt; 3,000 chars limit</span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>6 Frameworks + 1 Medley</span>
                </div>
              </div>
            </div>

            {/* General Vocal Structure Tags Reference Pill Banner */}
            <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-amber-300 font-semibold">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Quick Reference: Universal Vocal Structure Tags</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(VOCAL_STRUCTURE_TAGS, "vocal-tags-banner")}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-mono transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {copiedKey === "vocal-tags-banner" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Universal Tags</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-950 font-mono text-[11px] text-amber-200/80 border border-white/5 overflow-x-auto select-all">
                {VOCAL_STRUCTURE_TAGS}
              </div>
            </div>
          </div>

          {/* The 7 Suno Vocal Prompt Cards */}
          <div className="space-y-6">
            {SUNO_VOCAL_HARMONIC_PROMPTS.map((prompt) => {
              const isInst = !!instrumentalMode[prompt.id];
              const isMedley = prompt.id === "combined-harmonic-medley";
              const activeLyrics = isInst ? "[Instrumental]" : prompt.lyrics;
              const activeLyricsCount = activeLyrics.length;
              const fullBundle = `=== SUNO STYLE PROMPT (${prompt.characterCount} chars) ===\n${prompt.styleTags}\n\n=== SUNO LYRICS BOX (${activeLyricsCount} chars) ===\n${activeLyrics}`;

              return (
                <div 
                  key={prompt.id}
                  className={`glass rounded-3xl p-6 md:p-8 space-y-6 border transition-all shadow-xl ${
                    isMedley
                      ? "border-amber-500/50 bg-gradient-to-br from-amber-500/15 via-stone-900/60 to-purple-900/20 ring-1 ring-amber-500/30"
                      : "border-white/10 hover:border-amber-500/30 bg-stone-900/40"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {isMedley ? (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 font-mono text-[11px] font-bold shadow-sm">
                            ★ GRAND MEDLEY
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold">
                            #{prompt.number}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 font-mono text-[11px]">
                          {prompt.frameworkCategory}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[11px]">
                          {prompt.bpm} BPM
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px]">
                          🎙️ {prompt.vocalType}
                        </span>
                      </div>
                      <h4 className={`text-xl font-serif font-bold pt-1 ${isMedley ? "text-amber-200" : "text-white"}`}>
                        {prompt.title}
                      </h4>
                      <p className="text-stone-300 text-xs font-light max-w-2xl leading-relaxed">
                        {prompt.description}
                      </p>
                    </div>

                    {/* Character Count & Load Action */}
                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono text-emerald-400 font-bold">
                          Style: {prompt.characterCount}c | Lyrics: {activeLyricsCount}c
                        </div>
                        <div className="text-[10px] text-white/40 font-mono">
                          Well under 3,000 max
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleExportProgression(PROMPT_TO_FRAMEWORK_MAP[prompt.id] || "functional")}
                        className="flex items-center gap-1.5 px-3 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl font-mono text-xs font-medium transition-all cursor-pointer"
                        title="Export chord progression as JSON for external DAWs"
                      >
                        <Download className="w-3.5 h-3.5 text-amber-400" />
                        <span>Export JSON</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleApplySunoReadyPrompt(prompt, isInst)}
                        className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl font-mono text-xs font-bold transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Load into Studio →</span>
                      </button>
                    </div>
                  </div>

                  {/* Two Boxes: Style & Lyrics */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    
                    {/* Style Prompt Box (5 cols) */}
                    <div className="lg:col-span-5 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                            Suno Style Box
                          </span>
                          <span className="text-[10px] font-mono text-white/40">
                            {prompt.characterCount} / 3000 chars
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-stone-950 font-mono text-xs text-stone-200 border border-white/5 select-all leading-relaxed min-h-[140px]">
                          {prompt.styleTags}
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-white/5">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(prompt.styleTags, `style-${prompt.id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                        >
                          {copiedKey === `style-${prompt.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-300">Style Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Style</span>
                            </>
                          )}
                        </button>

                        <div className="flex flex-wrap items-center gap-1">
                          {prompt.tags.slice(0, 3).map((t, idx) => (
                            <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Lyrics Box (7 cols) */}
                    <div className="lg:col-span-7 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 font-semibold">
                              Suno Lyrics Box
                            </span>
                            <span className="text-[10px] font-mono text-white/40">
                              {activeLyricsCount} / 3000 chars
                            </span>
                          </div>

                          {/* Switch between Vocal Lyrics and Instrumental mode */}
                          <button
                            type="button"
                            onClick={() => toggleInstrumentalMode(prompt.id)}
                            className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 ${
                              isInst
                                ? "bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30"
                                : "bg-sky-500/20 text-sky-300 border-sky-500/40 hover:bg-sky-500/30"
                            }`}
                          >
                            {isInst ? (
                              <>
                                <span>🎹 Mode: [Instrumental]</span>
                                <span className="underline ml-1">Switch to Vocals</span>
                              </>
                            ) : (
                              <>
                                <span>🎙️ Mode: Vocal Lyrics</span>
                                <span className="underline ml-1">Switch to Instrumental</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Lyrics content box with scroll */}
                        <div className="p-3.5 rounded-xl bg-stone-950 border border-white/5 select-all leading-relaxed max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                          {isInst ? (
                            <div className="font-mono text-amber-300 font-bold text-sm py-4 text-center">
                              [Instrumental]
                            </div>
                          ) : (
                            renderLyricsFormatted(prompt.lyrics)
                          )}
                        </div>
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(activeLyrics, `lyrics-${prompt.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-xs font-mono transition-colors cursor-pointer"
                          >
                            {copiedKey === `lyrics-${prompt.id}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Lyrics Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Lyrics</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(fullBundle, `bundle-${prompt.id}`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
                          >
                            {copiedKey === `bundle-${prompt.id}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-300">Bundle Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Full Bundle</span>
                              </>
                            )}
                          </button>
                        </div>

                        <span className="text-[11px] font-mono text-white/40">
                          Ready for Suno Studio
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 1. FUNCTIONAL TONALITY */}
      {activeTab === "functional" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Common-Practice Harmony
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Functional Tonality (Tonic–Dominant Polarity)</h3>
            </div>
            <button
              onClick={() => applyFrameworkToSuno("functional")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send to Suno Generator</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
              <p>
                <strong>Functional tonality</strong> is the bedrock of Western harmonic thought from the Baroque through the Romantic era. Its core premise is that chords acquire meaning through their function within a key—primarily <strong>Tonic (I)</strong>, <strong>Subdominant (IV)</strong>, and <strong>Dominant (V)</strong>.
              </p>
              <p>
                The dynamic tension between these functions, especially the dominant's pull toward the tonic, drives musical motion. This approach relies on <em>Roman numeral analysis</em>, where chords are labeled by their scale degree and quality (e.g., <code className="text-amber-300 font-mono">ii⁷, V⁷, IΔ</code>).
              </p>
              <div className="p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-2">
                <div className="text-xs font-mono uppercase text-white/40 tracking-wider">Hierarchy of Tonal Functions</div>
                <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                    <div className="text-blue-300 font-bold">Subdominant (IV)</div>
                    <div className="text-[10px] text-white/50 mt-1">Preparation</div>
                  </div>
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="text-red-300 font-bold">Dominant (V⁷)</div>
                    <div className="text-[10px] text-white/50 mt-1">Maximum Tension</div>
                  </div>
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <div className="text-amber-300 font-bold">Tonic (I)</div>
                    <div className="text-[10px] text-white/50 mt-1">Ultimate Rest</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Functional Cadence Audition */}
            <div className="lg:col-span-5 p-5 bg-stone-950 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold mb-3 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Audition: Authentic Cadence (IV - V - I)</span>
                </div>
                <p className="text-xs text-white/60 font-light mb-4">
                  Listen to the preparation in F major (IV), the tension in G7 (V⁷), and the final peaceful rest in C major (I).
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      playNotes([53, 57, 60, 65], 1.0); // F major
                      setTimeout(() => playNotes([55, 59, 62, 65], 1.0), 1100); // G7
                      setTimeout(() => playNotes([48, 60, 64, 67], 2.0), 2200); // C Major
                    }}
                    className="flex-1 w-full py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play IV → V⁷ → I Cadence</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleExportProgression("functional")}
                    className="w-full sm:w-auto px-3.5 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Export IV-V-I progression to JSON"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-400" />
                    <span>Export JSON</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-white/40 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                💡 In Suno: prompts like <em>"authentic functional resolution, warm choral cadence, church organ"</em> cleanly instruct the model to land firmly on the home tonic.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. JAZZ HARMONY & II-V-I */}
      {activeTab === "jazz" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Path I: The Resolution
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Jazz Harmony & The II–V–I Cadence</h3>
            </div>
            <button
              onClick={() => applyFrameworkToSuno("jazz")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send to Suno Generator</span>
            </button>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Jazz harmony extends functional tonality by enriching chords with extensions (<strong>7ths, 9ths, 11ths, 13ths</strong>) and alterations (<strong>♭9, ♯11, ♭13</strong>). The <strong>ii–V–I progression</strong> is the genre's most ubiquitous cadential formula.
            </p>
            <p>
              The progression's power lies in its voice leading: 
              the <strong>seventh of the ii⁷ chord</strong> (C) resolves down a half-step to the <strong>third of the V⁷ chord</strong> (B), while the <strong>seventh of the V⁷</strong> (F) resolves down a half-step to the <strong>third of the I chord</strong> (E). This creates an unbroken chain of satisfying half-step resolutions.
            </p>
          </div>

          {/* Interactive Voicing Selector & Player */}
          <div className="p-6 bg-stone-950 rounded-2xl border border-white/5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold block mb-1">
                  Select Voicing Principle
                </span>
                <div className="flex items-center gap-2">
                  {[
                    { id: "minimum", label: "Minimum-Motion (Smooth)" },
                    { id: "drop2", label: "Drop-2 Voicing" },
                    { id: "root", label: "Root Position" }
                  ].map(v => (
                    <button
                      key={v.id}
                      onClick={() => setJazzVoicingType(v.id as any)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                        jazzVoicingType === v.id
                          ? "bg-amber-500 text-stone-950 font-bold"
                          : "bg-white/5 text-white/60 hover:text-white"
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayJazzSequence}
                  disabled={isPlayingJazzSeq}
                  className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isPlayingJazzSeq ? 'animate-pulse' : ''}`} />
                  <span>{isPlayingJazzSeq ? "Auditioning Cadence..." : "Play ii⁷ → V⁷ → IΔ"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportProgression("jazz")}
                  className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Export currently selected jazz voicing to JSON"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Chord Progression Display Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {JAZZ_VOICINGS[jazzVoicingType].map((chord, idx) => (
                <div
                  key={idx}
                  onClick={() => playNotes(chord.notes, 1.4)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    jazzChordIndex === idx && isPlayingJazzSeq
                      ? "bg-amber-500/20 border-amber-400 ring-1 ring-amber-400/50 shadow-lg shadow-amber-500/10"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">{chord.roman}</span>
                    <Volume2 className="w-3.5 h-3.5 text-white/40" />
                  </div>
                  <div className="text-base font-serif font-bold text-white mb-2">{chord.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {chord.noteNames.map((n, i) => (
                      <span key={i} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/70">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] font-mono text-white/40 leading-relaxed border-t border-white/5 pt-3">
              💡 <strong>Voice-Leading Insight:</strong> Notice how in Minimum-Motion voicing, the voice moving from C4 to B3 to C5 preserves acoustic inertia, reducing cognitive effort and maximizing harmonic elegance.
            </div>
          </div>
        </div>
      )}

      {/* 3. BARTÓK'S AXIS SYSTEM */}
      {activeTab === "bartok" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Ernő Lendvai Theoretical Model
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Béla Bartók’s Symmetrical Axis System</h3>
            </div>
            <button
              onClick={() => applyFrameworkToSuno("bartok")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send to Suno Generator</span>
            </button>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Béla Bartók's harmonic language, theorized by Ernő Lendvai, replaces the traditional tonic–dominant polarity with a <strong>symmetrical axis system</strong>. A tonic (e.g., <strong>C</strong>) is paired with its <strong>counterpole a tritone away (F♯)</strong>. These poles are not conflicting opposites, but rather interchangeable substitutes that share the same relative major/minor relationships.
            </p>
            <p>
              The axis system organizes all twelve chromatic pitches into three symmetrical cross-axes (minor thirds apart):
            </p>
          </div>

          {/* Symmetrical Axis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
              <div className="text-xs font-mono text-amber-300 font-bold uppercase mb-1">Tonic Axis</div>
              <div className="text-lg font-mono font-bold text-white mb-2">C – E♭ – F♯ – A</div>
              <p className="text-[11px] text-white/60 font-light">
                C is the primary pole; F♯ is the counterpole (tritone). E♭ and A are relative branch poles.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
              <div className="text-xs font-mono text-blue-300 font-bold uppercase mb-1">Subdominant Axis</div>
              <div className="text-lg font-mono font-bold text-white mb-2">F – A♭ – B – D</div>
              <p className="text-[11px] text-white/60 font-light">
                F pole is paired with B counterpole. A♭ and D act as relative polar substitutes.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30">
              <div className="text-xs font-mono text-purple-300 font-bold uppercase mb-1">Dominant Axis</div>
              <div className="text-lg font-mono font-bold text-white mb-2">G – B♭ – C♯ – E</div>
              <p className="text-[11px] text-white/60 font-light">
                G pole is paired with C♯ counterpole. Resolves symmetrically to the tonic axis.
              </p>
            </div>
          </div>

          {/* Interactive What If? Axis Modulation Playground */}
          <div className="p-6 bg-stone-950 rounded-2xl border border-white/5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  What if? · Axis Modulation (C → F♯)
                </h4>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Modulate directly from C to F♯ (a tritone away) sharing no functional dominant, establishing polar balance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAxisModulationDemo}
                  disabled={isAxisModulating}
                  className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                >
                  <Play className={`w-3.5 h-3.5 ${isAxisModulating ? 'animate-pulse' : ''}`} />
                  <span>{isAxisModulating ? "Modulating..." : "Play Axis Modulation (C → F♯)"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportProgression("bartok")}
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Export Bartók Axis progression to JSON"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export JSON</span>
                </button>
              </div>
            </div>

            {/* Visual Cross Pole Representation */}
            <div className="grid grid-cols-4 gap-3 pt-2">
              {[
                { pole: "C", name: "C (Primary Pole)", color: "border-amber-400 bg-amber-500/10 text-amber-300" },
                { pole: "Eb", name: "E♭ (Relative)", color: "border-white/10 bg-white/5 text-white/80" },
                { pole: "F#", name: "F♯ (Counterpole)", color: "border-purple-400 bg-purple-500/10 text-purple-300" },
                { pole: "A", name: "A (Relative)", color: "border-white/10 bg-white/5 text-white/80" }
              ].map(p => (
                <button
                  key={p.pole}
                  onClick={() => playAxisPole(p.pole as any)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedAxisPole === p.pole
                      ? "ring-2 ring-amber-400 shadow-md font-bold " + p.color
                      : "border-white/5 bg-white/[0.02] text-white/60 hover:text-white"
                  }`}
                >
                  <div className="text-base font-mono font-bold">{p.pole}</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/40 mt-1">{p.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. SCHENKERIAN ANALYSIS */}
      {activeTab === "schenker" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Hierarchical Prolongation & Urlinie
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Schenkerian Analysis</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExportProgression("schenker")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
                title="Export Schenkerian Ursatz structure to JSON"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Ursatz (JSON)</span>
              </button>
              <button
                onClick={() => applyFrameworkToSuno("schenker")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send to Suno Generator</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Heinrich Schenker's approach views tonal music as a <strong>prolongation of a single tonic triad</strong> across multiple structural levels:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">1. Vordergrund (Foreground)</div>
                <p className="text-xs text-white/70 font-light">
                  The musical surface: notes, arpeggios, passing tones, ornamental rhythms, and dynamic performance gestures.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">2. Mittelgrund (Middleground)</div>
                <p className="text-xs text-white/70 font-light">
                  The structural voice-leading lines and secondary prolongations connecting key arrival points.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase mb-1">3. Hintergrund (Background)</div>
                <p className="text-xs text-white/70 font-light">
                  The fundamental structure (<em>Ursatz</em>): a basic I–V–I harmonic progression supporting the descending fundamental line (<em>Urlinie</em>: 3̂–2̂–1̂ or 5̂–4̂–3̂–2̂–1̂).
                </p>
              </div>
            </div>

            <p>
              In Suno prompt engineering, Schenkerian principles remind us that extended atmospheric instrumental tracks must preserve a clear harmonic spine: surface micro-glitches and ambient pads should prolong a single grounding tonic key without losing harmonic coherence.
            </p>
          </div>
        </div>
      )}

      {/* 5. NEO-RIEMANNIAN THEORY */}
      {activeTab === "neoriemannian" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Parsimonious Voice Leading & Tonnetz
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Neo-Riemannian Theory (P, L, R Operations)</h3>
            </div>
            <button
              onClick={() => applyFrameworkToSuno("neoriemannian")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send to Suno Generator</span>
            </button>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Pioneered by David Lewin and Richard Cohn, <strong>Neo-Riemannian theory</strong> shifts focus from chord function to <strong>chord transformation</strong>. Instead of asking "what key is this in?", it asks "which single voice moved by a half-step?".
            </p>
            <p>
              It models relationships between major and minor triads through three primary parsimonious operations:
            </p>
          </div>

          {/* P, L, R Interactive Operational Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => handleNeoTransformation("P")}
              className="p-5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-300 font-bold uppercase">P (Parallel)</span>
                <Play className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-base font-serif font-bold text-white mb-1">C Major ↔ C Minor</div>
              <p className="text-xs text-white/60 font-light">
                Moves the 3rd by a half-step (E ↔ E♭) while holding C and G invariant.
              </p>
            </button>

            <button
              onClick={() => handleNeoTransformation("L")}
              className="p-5 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-blue-300 font-bold uppercase">L (Leittonwechsel)</span>
                <Play className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-base font-serif font-bold text-white mb-1">C Major ↔ E Minor</div>
              <p className="text-xs text-white/60 font-light">
                Moves the root down by a half-step (C ↔ B) while holding E and G invariant.
              </p>
            </button>

            <button
              onClick={() => handleNeoTransformation("R")}
              className="p-5 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-purple-300 font-bold uppercase">R (Relative)</span>
                <Play className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </div>
              <div className="text-base font-serif font-bold text-white mb-1">C Major ↔ A Minor</div>
              <p className="text-xs text-white/60 font-light">
                Moves the 5th by a whole-step (G ↔ A) while holding C and E invariant.
              </p>
            </button>
          </div>

          {/* Interactive State & History */}
          <div className="p-6 bg-stone-950 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-white/40 font-bold">Current Triad on Tonnetz</span>
                <div className="text-xl font-serif font-bold text-amber-300 mt-0.5">{neoCurrentChord.name}</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => playNotes(neoCurrentChord.notes, 1.4)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audition Triad</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportProgression("neoriemannian")}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer border border-white/10"
                  title="Export Tonnetz triads and transformation history to JSON"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Tonnetz (JSON)</span>
                </button>
                <button
                  onClick={handleNeoReset}
                  className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 rounded-lg text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset to C Maj</span>
                </button>
              </div>
            </div>

            {/* Transform History Log */}
            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5 max-h-28 overflow-y-auto font-mono text-xs text-white/60 space-y-1">
              {neoHistory.map((entry, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-white/20">#{idx + 1}</span>
                  <span>{entry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. PITCH-CLASS SET THEORY */}
      {activeTab === "settheory" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Post-Tonal & Atonal Symmetries
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Pitch-Class Set Theory (Allen Forte)</h3>
            </div>
            <button
              onClick={() => applyFrameworkToSuno("settheory")}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Send to Suno Generator</span>
            </button>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              For atonal and post-tonal music, <strong>pitch-class set theory</strong> (associated with Allen Forte) reduces pitches to their pitch-class numbers (<strong>0–11, where C=0, C♯=1, ... B=11</strong>) and analyzes harmonic collections by their <strong>interval vector</strong> (the count of each interval class).
            </p>
            <p>
              A famous example is Stravinsky's <strong>"Petrushka chord"</strong> (C major + F♯ major simultaneously: C, E, G, F♯, A♯, C♯), forming an octatonic set [0,1,3,4,6,7,9,10] with shimmering symmetrical brilliance.
            </p>

            <div className="p-5 bg-stone-950 rounded-2xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-amber-400 font-bold uppercase">Petrushka Chord Audition</div>
                <div className="text-sm font-serif text-white font-medium mt-1">C Major Triad + F♯ Major Triad (Bitonal / Octatonic)</div>
                <div className="text-[11px] font-mono text-white/50 mt-1">Notes: C4, E4, G4 + F♯4, A♯4, C♯5</div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => playNotes([60, 64, 67, 66, 70, 73], 2.2)}
                  className="px-4 py-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-bold flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Play className="w-4 h-4" />
                  <span>Audition Petrushka Set</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportProgression("settheory")}
                  className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Export Forte pitch-class sets & Petrushka chord to JSON"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Export Sets (JSON)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. SCIENTIFIC & COMPUTATIONAL */}
      {activeTab === "scientific" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Psychoacoustics & Synesthesia Matrix
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Scientific & Computational Approaches</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleExportProgression("scientific")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
                title="Export overtone series & spectral harmonic data to JSON"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Spectral Partials (JSON)</span>
              </button>
              <button
                onClick={() => applyFrameworkToSuno("functional")}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Send to Suno Generator</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            <p>
              Recent decades have seen the rise of <strong>psychoacoustic and computational models of harmony</strong>. Researchers employ Fourier analysis, sensory roughness curves (Plomp & Levelt), and tonal pitch space distance metrics (Fred Lerdahl) to quantify why harmonies feel tense or resolved.
            </p>
          </div>

          {/* Color-Coded Synesthesia Matrix Legend */}
          <div className="p-6 bg-stone-950 rounded-2xl border border-white/5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-white/40 font-bold">
              Synesthesia Matrix: Color-Coded Harmonic Tension Legend
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="text-xs font-mono font-bold text-amber-300">Root & Fundamental</span>
                </div>
                <p className="text-[11px] text-white/60 font-light">
                  0 cents deviation. Maximum grounding anchor. Perfect perceptual stability.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-blue-500/40 bg-blue-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-400" />
                  <span className="text-xs font-mono font-bold text-blue-300">3rd & 5th (Triad Core)</span>
                </div>
                <p className="text-[11px] text-white/60 font-light">
                  Consonant foundation. Dictates major/minor valence with minimal roughness.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-purple-400" />
                  <span className="text-xs font-mono font-bold text-purple-300">7th (Guide Tone)</span>
                </div>
                <p className="text-[11px] text-white/60 font-light">
                  Harmonic director. Creates resolution expectation into the subsequent chord.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-rose-500/40 bg-rose-500/10">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="text-xs font-mono font-bold text-rose-300">Tensions (9th, ♯11, ♭13)</span>
                </div>
                <p className="text-[11px] text-white/60 font-light">
                  Acoustic color and friction. High sensory richness that demands artistic release.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. SUMMARY MATRIX TABLE */}
      {activeTab === "summary" && (
        <div className="glass rounded-3xl p-6 md:p-8 space-y-6 border border-white/10">
          <div className="border-b border-white/5 pb-4">
            <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
              Comparative Analysis
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Summary of Major Harmonic Frameworks</h3>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/5 bg-stone-950">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/5 text-white/50 uppercase tracking-wider border-b border-white/5">
                <tr>
                  <th className="py-3 px-4">Approach</th>
                  <th className="py-3 px-4">Core Concept</th>
                  <th className="py-3 px-4">Typical Repertoire</th>
                  <th className="py-3 px-4">Key Analytical Tool</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-stone-300 font-light">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Functional Tonality</td>
                  <td className="py-3.5 px-4">Tonic–Dominant polarity</td>
                  <td className="py-3.5 px-4">Baroque–Romantic</td>
                  <td className="py-3.5 px-4 text-amber-300">Roman numerals</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("functional")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Jazz Harmony</td>
                  <td className="py-3.5 px-4">II–V–I, extensions/alterations</td>
                  <td className="py-3.5 px-4">Jazz, Broadway</td>
                  <td className="py-3.5 px-4 text-amber-300">Lead sheets, voicings</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("jazz")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Bartók Axis System</td>
                  <td className="py-3.5 px-4">Tritone pole substitution</td>
                  <td className="py-3.5 px-4">Bartók, Kodály</td>
                  <td className="py-3.5 px-4 text-amber-300">Axis diagrams</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("bartok")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Schenkerian Analysis</td>
                  <td className="py-3.5 px-4">Prolongation of a triad</td>
                  <td className="py-3.5 px-4">Common-practice tonal</td>
                  <td className="py-3.5 px-4 text-amber-300">Reduction graphs</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("schenker")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Neo-Riemannian</td>
                  <td className="py-3.5 px-4">Triadic transformations</td>
                  <td className="py-3.5 px-4">Late Romantic, film</td>
                  <td className="py-3.5 px-4 text-amber-300">Tonnetz, P/L/R operations</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("neoriemannian")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Pitch-Class Set Theory</td>
                  <td className="py-3.5 px-4">Interval-class vectors</td>
                  <td className="py-3.5 px-4">Atonal, post-tonal</td>
                  <td className="py-3.5 px-4 text-amber-300">Prime form, similarity</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("settheory")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">Scientific / Computational</td>
                  <td className="py-3.5 px-4">Psychoacoustic models</td>
                  <td className="py-3.5 px-4">Empirical studies</td>
                  <td className="py-3.5 px-4 text-amber-300">Tension curves, Fourier</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => applyFrameworkToSuno("functional")}
                      className="px-2.5 py-1 bg-white/5 hover:bg-amber-500/20 text-amber-400 rounded text-[11px] cursor-pointer"
                    >
                      Use in Suno
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* JSON Progression Export & Preview Modal */}
      {previewModalOpen && currentExportJSON && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl max-h-[92vh] bg-stone-950 border border-amber-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-start justify-between gap-4 bg-stone-900/80">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    DAW & Notation Interchange (JSON)
                  </span>
                  <span className="text-[11px] font-mono text-white/60">
                    {currentExportJSON.frameworkName}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                  Harmonic Progression JSON Export
                </h3>
                <p className="text-xs text-stone-300 font-light mt-1 max-w-xl">
                  Serialized chord sequence with precise MIDI notes, pitch classes, frequencies (Hz), tick timings (PPQ=480), and voice leading annotations.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="px-5 sm:px-6 py-3 bg-white/[0.02] border-b border-white/5 flex flex-wrap items-center gap-2.5 text-xs font-mono text-stone-300">
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                Chords: <strong className="text-amber-300">{currentExportJSON.summary.chordCount}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                Key: <strong className="text-amber-300">{currentExportJSON.key}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                Tempo: <strong className="text-amber-300">{currentExportJSON.tempoBPM} BPM</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                Range: <strong className="text-amber-300">{currentExportJSON.summary.pitchRange.minNote} – {currentExportJSON.summary.pitchRange.maxNote}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                PPQ: <strong className="text-amber-300">{currentExportJSON.ppq}</strong>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                Bars: <strong className="text-amber-300">{currentExportJSON.totalBars}</strong>
              </div>
            </div>

            {/* Software Compatibility List */}
            <div className="px-5 sm:px-6 py-2.5 bg-stone-900/40 border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono scrollbar-none">
              <span className="text-white/40 uppercase tracking-wider shrink-0">Compatible with:</span>
              {currentExportJSON.softwareCompatibility.map((sw, i) => (
                <span key={i} className="px-2 py-0.5 rounded-full bg-white/5 text-stone-300 shrink-0 border border-white/5">
                  {sw}
                </span>
              ))}
            </div>

            {/* DAW Quick Import Tip */}
            <div className="px-5 sm:px-6 py-2 bg-amber-500/10 border-b border-amber-500/20 text-[11px] font-mono text-amber-200/90 flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Each chord includes <code className="text-amber-300">midiNotes</code>, <code className="text-amber-300">startTick</code>, and <code className="text-amber-300">durationTicks</code> for direct MIDI clip construction.
              </span>
            </div>

            {/* Formatted JSON Code Container */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1 font-mono text-xs max-h-80 sm:max-h-96 select-all bg-black/70 border-b border-white/5 scrollbar-thin scrollbar-thumb-white/10">
              <pre className="text-amber-200/90 leading-relaxed whitespace-pre font-mono">
                {JSON.stringify(currentExportJSON, null, 2)}
              </pre>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-4 sm:p-5 bg-stone-900/90 flex flex-wrap items-center justify-between gap-3">
              <div className="text-[11px] font-mono text-white/50">
                Target file: <span className="text-amber-300/90">harmonic_progression_{currentExportJSON.frameworkId}.json</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(currentExportJSON, null, 2));
                    setJsonCopied(true);
                    setTimeout(() => setJsonCopied(false), 3000);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  {jsonCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300 font-bold">JSON Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    downloadProgressionJSON(currentExportJSON.frameworkId, {
                      jazzVoicingType,
                      selectedAxisPole,
                      neoCurrentChord,
                      neoHistory
                    });
                    setExportSuccessMessage(`Downloaded "harmonic_progression_${currentExportJSON.frameworkId}.json"!`);
                    setPreviewModalOpen(false);
                    setTimeout(() => setExportSuccessMessage(null), 6000);
                  }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .JSON File</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
