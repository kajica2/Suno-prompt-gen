import { useState } from "react";
import { PromptConfig } from "../types";
import { Sliders, Sparkles, RefreshCw, HelpCircle, BookOpen, Volume2, ShieldCheck, Gauge, Ban, Check, Copy, RotateCcw, Dna, Waves } from "lucide-react";
import { ROOM_TONE_OPTIONS } from "../data/buskingPrompts";

interface PromptFormProps {
  config: PromptConfig;
  onChange: (config: PromptConfig) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onOpenHarmonicEngine?: () => void;
  onOpenStyleBreeder?: () => void;
  onOpenAmbiences?: () => void;
}

export const NEGATIVE_EXCLUSION_CHIPS = [
  { id: "no-reverb", tag: "no reverb", label: "no reverb", desc: "Forces acoustic room reality: the physical space IS the reverb" },
  { id: "no-digital-polish", tag: "no digital polish", label: "no digital polish", desc: "Eliminates modern glossy plugins, gating, and digital mastering" },
  { id: "no-horns", tag: "no horns", label: "no horns", desc: "Suppresses all horn instruments (vital for rhythm section dominance)" },
  { id: "no-lead-melody", tag: "no lead melody", label: "no lead melody", desc: "Strictly forces backing rhythm section only without melodic solos" },
  { id: "no-4-4", tag: "no 4/4 straight beat", label: "no 4/4 straight beat", desc: "Crucial for odd meters: prevents Suno from collapsing 7/8, 9/8, 11/8 into 4/4" },
  { id: "no-brass", tag: "no brass", label: "no brass", desc: "Prevents brass section and horn stabs" },
  { id: "no-flute", tag: "no flute", label: "no flute", desc: "Prevents high woodwind intrusions" },
  { id: "no-trumpet", tag: "no trumpet", label: "no trumpet", desc: "Excludes trumpet for rhythm section or keys dominance" },
  { id: "no-sax", tag: "no sax", label: "no sax", desc: "Prevents saxophone from stealing lead space" },
  { id: "no-vocals", tag: "no vocals", label: "no vocals", desc: "Forces pure instrumental arrangement" },
  { id: "no-guitar", tag: "no guitar", label: "no guitar", desc: "Leaves acoustic headroom for lead instrument & bass" },
  { id: "no-synths", tag: "no synthesizer", label: "no synthesizer", desc: "Eliminates synthetic artificial pads" },
  { id: "no-edm", tag: "no EDM drop", label: "no EDM drop", desc: "Avoids loud artificial beat drops" },
  { id: "no-quantized", tag: "no quantized drums", label: "no quantized drums", desc: "Preserves natural human pocket timing" },
  { id: "no-autotune", tag: "no autotune", label: "no autotune", desc: "Suppresses vocal processing artifacts" },
  { id: "no-spoken", tag: "no spoken word", label: "no spoken word", desc: "Prevents AI verbal chatter over breaks" },
];

export const NEGATIVE_FOCUS_PRESETS = [
  {
    id: "fidelity-universal-negatives",
    title: "Audio Upload Reference Lock (Universal Negatives)",
    tags: "no new instruments, no new melodies, no stylistic changes, no genre shifts, no remix, no new harmonies, no added sections, no removed sections, no tempo change, no key change, no auto-tune, no digital polish, no reverb plugins, no EDM, no trap",
    description: "Universal negative exclusions for uploaded audio clips: strictly prevents Suno from adding unwanted instruments, harmonies, remixing, or altering key and tempo."
  },
  {
    id: "impossible-hybrid-studios",
    title: "Impossible Hybrids (Universal Negatives + No Horns)",
    tags: "no reverb plugins, no digital polish, no noise reduction, no gating, no stereo widening, no auto-tune, no EDM, no trap, no horns, no trumpet, no sax, no brass",
    description: "Universal negatives for the 7 Impossible Hybrid Studios: forces contradictory room synthesis and suppresses modern reverb plugins and horn intrusions."
  },
  {
    id: "legendary-studios-7",
    title: "7 Legendary Studios (No Reverb Plugins / No Polish)",
    tags: "no reverb plugins, no digital polish, no noise reduction, no gating, no stereo widening, no auto-tune, no EDM, no trap",
    description: "Universal negatives for Abbey Road, Columbia 30th St, Stax, Van Gelder, Black Ark, Muscle Shoals & Hansa Studios."
  },
  {
    id: "ambience-physical-spaces",
    title: "Physical Ambience (No Reverb / Digital Polish)",
    tags: "no reverb, no digital polish, no noise reduction, no gating, no compression, no EQ, no stereo widening, no delay, no chorus",
    description: "Universal negatives for physical recording spaces: the room IS the reverb. Strictly prevents digital polish and fake plugins."
  },
  {
    id: "odd-meter-stack",
    title: "Odd Meter Tri-Stack Exclusions",
    tags: "no horns, no trumpet, no saxophone, no brass, no flute, no vocals, no 4/4 straight beat, no quantized grid, no EDM, no trap",
    description: "Essential for 7/8, 3/4, 9/8, 11/8, 10/8, 5/4, 13/8: strictly suppresses horns, vocals, and standard 4/4 pop grids."
  },
  {
    id: "afro-1965-rhythm",
    title: "1965 Afro Rhythm Section Only",
    tags: "no horns, no trumpet, no sax, no lead melody, no vocals",
    description: "1965 Afrobeat / Ethio-jazz / Highlife / Descarga: pure rhythm section only, no horns, no trumpet, no sax, no lead melody."
  },
  {
    id: "ethio-no-horns",
    title: "Ethio-Jazz No-Horns Pocket",
    tags: "no horns, no trumpet, no saxophone, no brass, no flute, no vocals",
    description: "Mulatu Astatke modal pocket: strictly suppresses all horns & vocals to let vibraphone, keys & drums lead."
  },
  {
    id: "trumpet-drum",
    title: "Trumpet & Drum Focus",
    tags: "no saxophone, no vocals, no guitar, no synthesizer",
    description: "Centers solo acoustic trumpet and drum pocket without competing lead instruments."
  },
  {
    id: "busking-pure",
    title: "Busking Rhythm Pocket",
    tags: "no saxophone, no vocals, no guitar, no spoken word",
    description: "Clean rhythm foundation for live outdoor busking soloists."
  },
  {
    id: "organic-anti-ai",
    title: "Organic Acoustic Realism",
    tags: "no vocals, no autotune, no EDM drop, no quantized drums",
    description: "Anti-AI filter that preserves natural acoustic space."
  }
];

const GENRE_SUGGESTIONS = [
  "Mulatu Astatke-Inspired Ethio-Jazz, 1960s/70s Ethiopian Jazz",
  "Modal Minor Pentatonic Groove with Vibraphone Lead",
  "Bartókian Modern Classical & Symmetrical Axes",
  "Late Romantic Cinematic & Neo-Riemannian Film Score",
  "Modal Jazz & Warm Soul Harmony",
  "French Impressionist Solo Piano (Debussy-esque)",
  "French Impressionist Chamber Music",
  "Liquid Drum and Bass Ambient Microhouse",
  "Raw Acoustic Folk, Intimate, Unplugged",
  "Indie Acoustic Folk",
  "Ethereal Ambient Synth",
  "Cinematic Orchestral",
  "Uplifting Traditional Gospel",
  "Chilled Lofi Hip Hop",
  "Synthwave / Dreamwave",
  "Acoustic Singer-Songwriter",
  "Neoclassical Piano & Strings"
];

const MOOD_SUGGESTIONS = [
  "Tritone Polar Opposition, Symmetrical Harmony, Restful Balance",
  "Parsimonious Triadic Transformations, P-L-R Voice Leading, Dreamy",
  "Rich Alterations, Drop-2 Voice Leading, Peaceful Cadence",
  "Delicate, Atmospheric, Rubato, Whole-Tone Scales",
  "Shimmering, Aquatic, Modal, Parallel Chords, No Beat",
  "Slow, Loose, Organic Groove, Nothing Quantized",
  "Weightless Pulse, Meditative & Hypnotic",
  "Peaceful & Serene",
  "Warm & Comforting",
  "Meditative & Breathable",
  "Triumphant & Majestic",
  "Nostalgic & Bittersweet",
  "Dreamy & Floating",
  "Optimistic & Uplifting",
  "Deeply Spiritual"
];

const VOCAL_SUGGESTIONS = [
  "Instrumental (No Vocals, [Instrumental])",
  "Warm intimate jazz vocalist, subtle breath and restrained doubles",
  "Deep weathered male baritone, husky, breathy, imperfect, close to the microphone",
  "Intimate rhythmic Serbian vocal, restrained doubles, raga noon inflections",
  "Warm Female Lead Vocal",
  "Soft Whispering Male Lead",
  "Acoustic Duet (Male & Female Harmony)",
  "Uplifting Traditional Gospel Choir",
  "Soaring Soprano Soloist",
  "Soulful R&B Vocalist"
];

const TEMPO_SUGGESTIONS = [
  "Rubato, Unquantized, Organic Breathing (68 BPM)",
  "Slow & Floating (64 BPM)",
  "Laid-back Swing (84 BPM)",
  "Rubato, Unquantized, Human Timing Imperfections",
  "Loose Unquantized Slow Groove (72 BPM)",
  "Weightless Rolling Breakbeat (174 BPM)",
  "Slow & Meditative (60-75 BPM)",
  "Gentle & Flowing (80-95 BPM)",
  "Moderate Walk (100-115 BPM)",
  "Upbeat & Joyful (120-135 BPM)",
  "Free Tempo / Unmetered Atmospheric"
];

const STRUCTURE_SUGGESTIONS = [
  "Axis Flow ([Intro: C pole] - [Theme: F# counterpole] - [Interlude: whole-tone] - [Outro: axis resolution])",
  "Tonnetz Progression ([Intro: C Maj] - [Theme: P/L shifts] - [Bridge: distant triads] - [Outro: pure resolution])",
  "Jazz Standard (Intro - Verse - II-V-I Chorus - Solo - Bridge - Outro)",
  "Impressionist Theme ([Intro: rubato] - [Theme] - [Interlude] - [Bridge] - [Outro])",
  "Chamber Flow ([Intro: solo flute] - [Theme: harp & muted strings] - [Interlude] - [Outro])",
  "Raw Unplugged (Intro - Verse - Chorus - Instrumental - Verse - Chorus - Outro)",
  "Atmospheric Liquid DnB (Intro-AtmosphericSwell-Verse-Chorus-Drop-Verse-Chorus-Bridge-Outro)",
  "Standard Folk (Verse-Chorus-Verse-Chorus-Bridge-Chorus)",
  "Short & Cozy (Intro-Verse-Chorus-Outro)",
  "Epic Build (Intro-Verse-Swell-Chorus-Climax-Outro)",
  "Call and Response (Intro-Verse-Chorus-CallAndResponse-Outro)",
  "Atmospheric (Long instrumental intro, short meditative refrain)"
];

export default function PromptForm({ config, onChange, onSubmit, isLoading, onOpenHarmonicEngine, onOpenStyleBreeder, onOpenAmbiences }: PromptFormProps) {
  const [showInstrumentsTip, setShowInstrumentsTip] = useState(false);
  const [copiedNegative, setCopiedNegative] = useState(false);

  const currentExclusions = (config.negativePrompt || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  const isChipActive = (tag: string) => currentExclusions.includes(tag.toLowerCase());

  const toggleExclusionChip = (tag: string) => {
    const normTag = tag.trim();
    let nextList: string[];
    if (isChipActive(normTag)) {
      nextList = currentExclusions.filter((s) => s !== normTag.toLowerCase());
    } else {
      nextList = [...currentExclusions, normTag];
    }
    onChange({
      ...config,
      negativePrompt: nextList.join(", "),
      appendExclusionsToStyle: config.appendExclusionsToStyle ?? true
    });
  };

  const handleFieldChange = (field: keyof PromptConfig, value: string) => {
    onChange({
      ...config,
      [field]: value,
    });
  };

  const handleRandomize = () => {
    const randomGenre = GENRE_SUGGESTIONS[Math.floor(Math.random() * GENRE_SUGGESTIONS.length)];
    const randomMood = MOOD_SUGGESTIONS[Math.floor(Math.random() * MOOD_SUGGESTIONS.length)];
    const randomVocal = VOCAL_SUGGESTIONS[Math.floor(Math.random() * VOCAL_SUGGESTIONS.length)];
    const randomTempo = TEMPO_SUGGESTIONS[Math.floor(Math.random() * TEMPO_SUGGESTIONS.length)];
    const randomStructure = STRUCTURE_SUGGESTIONS[Math.floor(Math.random() * STRUCTURE_SUGGESTIONS.length)];
    
    let randomInstruments = "acoustic guitar, violin, warm pads";
    if (randomGenre.includes("Orchestral")) randomInstruments = "grand piano, violin section, deep brass, kettle drums";
    else if (randomGenre.includes("Ambient")) randomInstruments = "slow warm pads, sparkling chimes, tape echo delay, airy flute";
    else if (randomGenre.includes("Gospel")) randomInstruments = "hammond B3 organ, upright piano, acoustic bass, tambourine";
    else if (randomGenre.includes("Lofi")) randomInstruments = "vinyl crackle, smooth electric rhodes piano, jazzy saxophone, muted drums";
    else if (randomGenre.includes("Synthwave")) randomInstruments = "retro analog synthesizers, fat bassline, 808 drum machine, digital delay";
    else if (randomGenre.includes("Piano")) randomInstruments = "concert grand piano, emotional solo cello, viola quintet";

    onChange({
      subtheme: "Shine in Peace (" + randomMood.split(" & ")[0] + ")",
      genre: randomGenre,
      mood: randomMood,
      tempo: randomTempo,
      vocalType: randomVocal,
      instruments: randomInstruments,
      structure: randomStructure
    });
  };

  return (
    <div className="glass rounded-2xl p-6 bg-white/[0.02] relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-amber-400">
            <Sliders className="w-4 h-4" />
          </div>
          <h2 className="font-serif text-base font-medium text-white italic">
            Synth Parameters
          </h2>
        </div>

        <button
          onClick={handleRandomize}
          disabled={isLoading}
          className="text-[10px] uppercase tracking-widest text-white/50 hover:text-white flex items-center gap-1 py-1 px-2.5 rounded-md hover:bg-white/5 transition-all border border-white/10 disabled:opacity-50"
        >
          <RefreshCw className="w-3 h-3" />
          Randomize
        </button>
      </div>

      {onOpenHarmonicEngine && (
        <div className="mb-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <BookOpen className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="font-sans font-light">Study <strong>Bartók axes, II-V-I & Neo-Riemannian</strong> harmony</span>
          </div>
          <button
            type="button"
            onClick={onOpenHarmonicEngine}
            className="text-[11px] font-mono text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer font-medium"
          >
            Open Engine →
          </button>
        </div>
      )}

      {onOpenAmbiences && (
        <div className="mb-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-emerald-200">
            <Waves className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="font-sans font-light">Explore <strong>7 Physical Recording Ambiences</strong> (no reverb/digital polish)</span>
          </div>
          <button
            type="button"
            onClick={onOpenAmbiences}
            className="text-[11px] font-mono text-emerald-300 hover:text-white bg-emerald-500/20 hover:bg-emerald-500/30 px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer font-medium"
          >
            Open Ambiences →
          </button>
        </div>
      )}

      {onOpenStyleBreeder && (
        <div className="mb-5 p-3 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs text-purple-200">
            <Dna className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span className="font-sans font-light">Cross-pollinate & <strong>breed new styles</strong> from 2 traditions</span>
          </div>
          <button
            type="button"
            onClick={onOpenStyleBreeder}
            className="text-[11px] font-mono text-purple-300 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 px-2.5 py-1 rounded-lg transition-colors shrink-0 cursor-pointer font-medium"
          >
            Open Breeder →
          </button>
        </div>
      )}

      <div className="space-y-4">
        {/* Subtheme / Inspiration */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Song Sub-theme & Concept
          </label>
          <input
            type="text"
            value={config.subtheme}
            onChange={(e) => handleFieldChange("subtheme", e.target.value)}
            placeholder="e.g., Shine in Peace (After the Storm)"
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-black/40 text-white placeholder-white/20"
          />
        </div>

        {/* Musical Genre */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Musical Genre
          </label>
          <select
            value={config.genre}
            onChange={(e) => handleFieldChange("genre", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
          >
            {GENRE_SUGGESTIONS.map((g) => (
              <option key={g} value={g} className="bg-stone-950">{g}</option>
            ))}
          </select>
        </div>

        {/* Overall Mood */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Overall Mood
          </label>
          <select
            value={config.mood}
            onChange={(e) => handleFieldChange("mood", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
          >
            {MOOD_SUGGESTIONS.map((m) => (
              <option key={m} value={m} className="bg-stone-950">{m}</option>
            ))}
          </select>
        </div>

        {/* Key Instrumentation */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold">
              Key Instrumentation
            </label>
            <button
              onClick={() => setShowInstrumentsTip(!showInstrumentsTip)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
            </button>
          </div>

          {showInstrumentsTip && (
            <div className="mb-2 p-3 bg-amber-500/[0.04] border border-amber-500/20 rounded-xl text-xs text-white/70 leading-relaxed font-sans font-light">
              Specifying tactile instrumentations (e.g. "fingerstyle steel-string acoustic guitar") helps Suno synthesize realistic and rich arrangements.
            </div>
          )}

          <input
            type="text"
            value={config.instruments}
            onChange={(e) => handleFieldChange("instruments", e.target.value)}
            placeholder="e.g., fingerstyle guitar, gentle violin, wind chimes"
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-black/40 text-white placeholder-white/20"
          />
        </div>

        {/* Vocal Direction */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Vocal Direction
          </label>
          <select
            value={config.vocalType}
            onChange={(e) => handleFieldChange("vocalType", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
          >
            {VOCAL_SUGGESTIONS.map((v) => (
              <option key={v} value={v} className="bg-stone-950">{v}</option>
            ))}
          </select>
        </div>

        {/* Tempo / Pace with Visual BPM Slider */}
        <div>
          {(() => {
            const match = config.tempo.match(/\b(\d{2,3})\s*BPM\b/i) || config.tempo.match(/\((\d{2,3})\s*BPM\)/i) || config.tempo.match(/\b(\d{2,3})\b/);
            const currentBpm = match ? parseInt(match[1], 10) : 105;

            const updateBpm = (newBpm: number) => {
              const bpmRegex = /\b\d{2,3}\s*BPM\b/i;
              let newTempo = config.tempo;
              if (bpmRegex.test(newTempo)) {
                newTempo = newTempo.replace(bpmRegex, `${newBpm} BPM`);
              } else if (/\(\d{2,3}-\d{2,3}\s*BPM\)/i.test(newTempo)) {
                newTempo = newTempo.replace(/\(\d{2,3}-\d{2,3}\s*BPM\)/i, `(${newBpm} BPM)`);
              } else {
                newTempo = `${newBpm} BPM, ${newTempo}`;
              }
              handleFieldChange("tempo", newTempo);
            };

            return (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold">
                    Tempo & Timing
                  </label>
                  <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    <Gauge className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentBpm} BPM</span>
                  </div>
                </div>

                {/* Interactive BPM Slider */}
                <div className="p-3 bg-stone-900/90 rounded-xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span>60 Ambient</span>
                    <span>105 Busking</span>
                    <span>128 Trance</span>
                    <span>174 DnB</span>
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={180}
                    step={1}
                    value={currentBpm}
                    onChange={(e) => updateBpm(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500 h-1.5 bg-stone-950 rounded-lg cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[72, 84, 100, 105, 112, 128, 140, 174].map((pBpm) => (
                      <button
                        key={pBpm}
                        type="button"
                        onClick={() => updateBpm(pBpm)}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer border ${
                          currentBpm === pBpm
                            ? "bg-amber-500 text-stone-950 font-bold border-amber-400"
                            : "bg-stone-950 text-stone-400 border-stone-800 hover:text-white"
                        }`}
                      >
                        {pBpm}
                      </button>
                    ))}
                  </div>
                </div>

                <select
                  value={config.tempo}
                  onChange={(e) => handleFieldChange("tempo", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
                >
                  {TEMPO_SUGGESTIONS.map((t) => (
                    <option key={t} value={t} className="bg-stone-950">{t}</option>
                  ))}
                  {!TEMPO_SUGGESTIONS.includes(config.tempo) && (
                    <option value={config.tempo} className="bg-stone-950">{config.tempo}</option>
                  )}
                </select>
              </div>
            );
          })()}
        </div>

        {/* Song Structure */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Arrangement Structure
          </label>
          <select
            value={config.structure}
            onChange={(e) => handleFieldChange("structure", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
          >
            {STRUCTURE_SUGGESTIONS.map((s) => (
              <option key={s} value={s} className="bg-stone-950">{s}</option>
            ))}
          </select>
        </div>

        {/* Room Tone & Organic Ambience Toggle */}
        <div className="pt-2 pb-1 border-t border-white/5">
          <div className="p-3.5 rounded-xl bg-stone-900/80 border border-white/10 hover:border-amber-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`p-1.5 rounded-lg transition-colors ${
                  config.enableRoomTone ? "bg-amber-500/20 text-amber-300 border border-amber-500/30" : "bg-white/5 text-stone-400"
                }`}>
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-white">Room Tone & Organic Ambience</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-2.5 h-2.5" />
                      Anti-AI Organic
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-400 font-light mt-0.5">
                    Appends physical room noise keywords to style tags to prevent sterile AI sound.
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  const newState = !config.enableRoomTone;
                  onChange({
                    ...config,
                    enableRoomTone: newState,
                    roomTone: config.roomTone || "natural room ambience"
                  });
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out shrink-0 ${
                  config.enableRoomTone ? "bg-amber-500" : "bg-stone-800 border border-stone-700"
                }`}
                role="switch"
                aria-checked={config.enableRoomTone}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    config.enableRoomTone ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Room Tone Selector Dropdown / Chips when active */}
            {config.enableRoomTone && (
              <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                <label className="block text-[10px] uppercase tracking-widest text-amber-300/80 font-mono font-bold">
                  Acoustic Environment Keyword
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {[
                    { id: "concert", label: "Wooden Concert Hall", val: "captured in an wooden concert hall" },
                    { id: "ambience", label: "Natural Room Ambience", val: "natural room ambience" },
                    { id: "club", label: "Intimate Jazz Club Noise", val: "intimate jazz club noise" },
                    { id: "studio", label: "Live Studio Bleed", val: "live studio bleed and acoustic room reflections" }
                  ].map((env) => {
                    const isSelected = (config.roomTone || "natural room ambience").includes(env.val);
                    return (
                      <button
                        key={env.id}
                        type="button"
                        onClick={() => {
                          onChange({
                            ...config,
                            enableRoomTone: true,
                            roomTone: env.val
                          });
                        }}
                        className={`text-left px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all border flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "bg-amber-500/20 border-amber-500/50 text-amber-200 font-medium"
                            : "bg-black/30 border-white/5 text-stone-400 hover:text-stone-200 hover:border-white/15"
                        }`}
                      >
                        <span className="truncate">{env.label}</span>
                        {isSelected && <span className="text-[10px] text-amber-400 font-bold ml-1">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-[10px] text-stone-400 font-mono flex items-center justify-between">
                  <span className="text-stone-500 uppercase tracking-wider">Active Tag:</span>
                  <span className="text-amber-300 font-semibold">{config.roomTone || "natural room ambience"}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Negative Prompt & Strict Exclusions Control */}
        <div className="pt-2 pb-1 border-t border-white/5">
          <div className="p-4 rounded-xl bg-stone-900/80 border border-white/10 hover:border-rose-500/30 transition-all space-y-3.5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0 mt-0.5">
                  <Ban className="w-3.5 h-3.5 text-rose-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-medium text-white tracking-wide">
                      Negative Prompt & Strict Exclusions
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono font-semibold border border-rose-500/30">
                      Trumpet & Drum Focus
                    </span>
                    {currentExclusions.length > 0 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-stone-300 font-mono">
                        {currentExclusions.length} active
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-400 font-light mt-0.5 leading-relaxed">
                    Appends strict negative exclusion parameters (<code className="text-rose-300/90 font-mono">no saxophone, no vocals, no guitar</code>) to the style output to ensure Suno focuses on the acoustic trumpet and drum pocket without instrument competition.
                  </p>
                </div>
              </div>

              {config.negativePrompt && (
                <button
                  type="button"
                  onClick={() => onChange({ ...config, negativePrompt: "" })}
                  className="text-[10px] font-mono text-stone-400 hover:text-rose-300 transition-colors px-2 py-1 rounded hover:bg-white/5 cursor-pointer shrink-0 border border-transparent hover:border-white/10"
                  title="Clear all negative exclusions"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Focus Combo Presets */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono font-bold">
                  Quick Focus Combos
                </span>
                <span className="text-[10px] text-stone-500 font-mono">1-Click Apply</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
                {NEGATIVE_FOCUS_PRESETS.map((preset) => {
                  const isPresetActive = (config.negativePrompt || "")
                    .toLowerCase()
                    .includes("no saxophone") &&
                    (config.negativePrompt || "").toLowerCase().includes("no guitar") &&
                    preset.id === "trumpet-drum";
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => onChange({
                        ...config,
                        negativePrompt: preset.tags,
                        appendExclusionsToStyle: config.appendExclusionsToStyle ?? true
                      })}
                      className={`px-2.5 py-2 rounded-lg text-left transition-all border cursor-pointer ${
                        isPresetActive
                          ? "bg-rose-500/20 border-rose-500/50 text-rose-200 shadow-sm shadow-rose-950/40"
                          : "bg-black/30 border-white/5 text-stone-300 hover:border-white/20 hover:bg-white/5"
                      }`}
                    >
                      <div className="text-xs font-medium text-white flex items-center justify-between">
                        <span>{preset.title}</span>
                        {isPresetActive && <span className="text-[10px] text-rose-400 font-bold">✓</span>}
                      </div>
                      <p className="text-[10px] text-stone-400 font-light mt-0.5 line-clamp-1 font-mono">
                        {preset.tags}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Toggle Exclusion Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono font-bold block">
                Toggle Specific Exclusions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {NEGATIVE_EXCLUSION_CHIPS.map((chip) => {
                  const active = isChipActive(chip.tag);
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => toggleExclusionChip(chip.tag)}
                      title={chip.desc}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all border flex items-center gap-1.5 cursor-pointer ${
                        active
                          ? "bg-rose-500/20 border-rose-500/50 text-rose-200 font-medium shadow-sm shadow-rose-950/40"
                          : "bg-black/30 border-white/5 text-stone-400 hover:text-stone-200 hover:border-white/15"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-rose-400" : "bg-stone-600"}`} />
                      <span>{chip.label}</span>
                      {active && <span className="text-[10px] text-rose-400 font-bold">×</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Editable Negative Prompt Field */}
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase tracking-wider text-white/50 font-mono font-bold">
                Exclusion Keywords (Comma-Separated)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={config.negativePrompt || ""}
                  onChange={(e) => onChange({
                    ...config,
                    negativePrompt: e.target.value,
                    appendExclusionsToStyle: config.appendExclusionsToStyle ?? true
                  })}
                  placeholder="e.g. no saxophone, no vocals, no guitar"
                  className="w-full px-3 py-2 rounded-xl border border-white/10 text-xs font-mono bg-stone-950 text-white placeholder-stone-600 focus:outline-none focus:border-rose-500/50 pr-20"
                />
                {config.negativePrompt && (
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(config.negativePrompt || "");
                        setCopiedNegative(true);
                        setTimeout(() => setCopiedNegative(false), 1500);
                      }}
                      className="px-2 py-0.5 text-[10px] font-mono text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                      title="Copy negative prompt to clipboard"
                    >
                      {copiedNegative ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Checkbox: Append to Style output */}
            <div className="pt-1 flex items-center justify-between border-t border-white/5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={config.appendExclusionsToStyle ?? true}
                  onChange={(e) => onChange({ ...config, appendExclusionsToStyle: e.target.checked })}
                  className="rounded border-white/20 bg-stone-950 text-rose-500 focus:ring-rose-500/30 accent-rose-500 cursor-pointer"
                />
                <span className="text-xs text-stone-300 font-light">
                  Append exclusions directly to <strong className="text-white font-medium">Style of Music tags</strong>
                </span>
              </label>
              <span className="text-[10px] font-mono text-stone-500">
                Max 120 chars
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full py-4 bg-white text-black uppercase tracking-[0.3em] text-[10px] font-bold mt-4 hover:bg-stone-200 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Synthesizing...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-600/30" />
              Generate Prompt Suite
            </>
          )}
        </button>
      </div>
    </div>
  );
}
