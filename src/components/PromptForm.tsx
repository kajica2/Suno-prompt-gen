import { useState } from "react";
import { PromptConfig } from "../types";
import { Sliders, Sparkles, RefreshCw, HelpCircle, BookOpen, Volume2, ShieldCheck } from "lucide-react";
import { ROOM_TONE_OPTIONS } from "../data/buskingPrompts";

interface PromptFormProps {
  config: PromptConfig;
  onChange: (config: PromptConfig) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onOpenHarmonicEngine?: () => void;
}

const GENRE_SUGGESTIONS = [
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

export default function PromptForm({ config, onChange, onSubmit, isLoading, onOpenHarmonicEngine }: PromptFormProps) {
  const [showInstrumentsTip, setShowInstrumentsTip] = useState(false);

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
        <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-2">
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

        {/* Tempo / Pace */}
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-1.5">
            Tempo & Timing
          </label>
          <select
            value={config.tempo}
            onChange={(e) => handleFieldChange("tempo", e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-white/10 text-sm focus:outline-none focus:border-amber-500/50 font-sans font-light bg-stone-900 text-white"
          >
            {TEMPO_SUGGESTIONS.map((t) => (
              <option key={t} value={t} className="bg-stone-950">{t}</option>
            ))}
          </select>
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
