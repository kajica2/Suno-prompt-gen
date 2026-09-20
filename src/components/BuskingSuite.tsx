import { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Volume2,
  ShieldCheck,
  Disc,
  Layers,
  Search,
  Sliders,
  Music,
  Info,
  Flame,
  Radio,
  ExternalLink
} from "lucide-react";
import {
  BUSKING_PROMPTS,
  BUSKING_AUDIO_INFLUENCE_TIPS,
  ROOM_TONE_OPTIONS,
  BuskingPrompt
} from "../data/buskingPrompts";
import { PromptConfig, PromptResult } from "../types";

interface BuskingSuiteProps {
  onApplyToStudio: (config: PromptConfig, result: PromptResult) => void;
  onSwitchToStudio: () => void;
}

export default function BuskingSuite({ onApplyToStudio, onSwitchToStudio }: BuskingSuiteProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [enableRoomTone, setEnableRoomTone] = useState(true);
  const [selectedRoomTone, setSelectedRoomTone] = useState<string>("intimate jazz club noise");
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [copiedTagsId, setCopiedTagsId] = useState<string | null>(null);
  const [copiedStyleId, setCopiedStyleId] = useState<string | null>(null);
  const [copiedAllId, setCopiedAllId] = useState<string | null>(null);
  const [copiedTipsGuide, setCopiedTipsGuide] = useState(false);
  const [showFullMarkdown, setShowFullMarkdown] = useState(false);
  const [copiedFullMarkdown, setCopiedFullMarkdown] = useState(false);

  // Computes the effective prompt text with room tone if enabled
  const getEffectivePromptText = (prompt: BuskingPrompt) => {
    if (!enableRoomTone) return prompt.promptText;
    return `${prompt.promptText} Natural room tone: ${selectedRoomTone}.`;
  };

  // Computes the effective style tags with room tone if enabled
  const getEffectiveStyleTags = (prompt: BuskingPrompt) => {
    if (!enableRoomTone) return prompt.styleTags;
    const shortRoom = selectedRoomTone.split(",")[0].trim();
    const combined = `${prompt.styleTags}, ${shortRoom}`;
    return combined.length > 120 ? combined.slice(0, 118) : combined;
  };

  const copyToClipboard = (text: string, id: string, type: "prompt" | "tags" | "style" | "all") => {
    navigator.clipboard.writeText(text);
    if (type === "prompt") {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } else if (type === "tags") {
      setCopiedTagsId(id);
      setTimeout(() => setCopiedTagsId(null), 2000);
    } else if (type === "style") {
      setCopiedStyleId(id);
      setTimeout(() => setCopiedStyleId(null), 2000);
    } else if (type === "all") {
      setCopiedAllId(id);
      setTimeout(() => setCopiedAllId(null), 2000);
    }
  };

  const handleApply = (prompt: BuskingPrompt) => {
    const effectivePrompt = getEffectivePromptText(prompt);
    const effectiveStyle = getEffectiveStyleTags(prompt);

    const config: PromptConfig = {
      subtheme: `Jazz Fusion Busking (#${prompt.number} ${prompt.title})`,
      genre: "Instrumental Jazz Fusion Backing Track",
      mood: "Syncopated, Blues-Influenced Pocket (105 BPM)",
      tempo: "105 BPM, 4/4 Steady Human Pocket",
      vocalType: "Instrumental (No Vocals, [Instrumental])",
      instruments: "percussive drums with brushes, deep electric bass, slap accents, hi-hat ghost notes",
      structure: prompt.tags.join(" "),
      enableRoomTone: enableRoomTone,
      roomTone: selectedRoomTone
    };

    const result: PromptResult = {
      title: `${prompt.number}. ${prompt.title} (105 BPM)`,
      styleTags: effectiveStyle,
      promptDescription: effectivePrompt,
      lyrics: prompt.tags.join(" ") + "\n\n[Instrumental]\n[Exclusive backing track: no saxophone, no vocals, no guitar]\n[Wide dynamic space for live acoustic trumpet soloing]",
      tips: [
        "Audio Influence: Set to 81% in Suno when uploading your reference groove.",
        "Leaves high-mid frequencies completely open for live trumpet or horn improv.",
        "Negative prompt: no saxophone, no soprano saxophone, no vocals, no voice, no guitar, no spoken word.",
        `Room tone enabled: ${enableRoomTone ? selectedRoomTone : "Off"}`
      ]
    };

    onApplyToStudio(config, result);
    onSwitchToStudio();
  };

  const filteredPrompts = BUSKING_PROMPTS.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.focus.toLowerCase().includes(q) ||
      p.promptText.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const generateFullMarkdown = () => {
    return BUSKING_PROMPTS.map((p) => {
      const pText = getEffectivePromptText(p);
      const tagsText = p.tags.join(" ");
      return `### ${p.number}. ${p.title}

\`\`\`text
${pText}
\`\`\`
**Tags:** \`${tagsText}\`
`;
    }).join("\n---\n\n") + `\n\n### Quick Tips for Using Audio Influence 81%:
1. Upload a reference audio (a busking backing track or a jazz fusion loop you like).
2. Set Audio Influence to 81%.
3. Keep the text prompt focused on instrumentation, timbre, and feel — the reference will handle structure, melody, and rhythm.
4. Use the negative prompt field (or add to style) to exclude saxophone, vocals, guitar, etc.
5. If Suno adds unwanted instruments, strengthen the exclusions: no saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word.
6. These 10 variations give you different angles on the same core backing track, so you can test which one pairs best with your reference audio at 81% influence.`;
  };

  const handleCopyFullMarkdown = () => {
    navigator.clipboard.writeText(generateFullMarkdown());
    setCopiedFullMarkdown(true);
    setTimeout(() => setCopiedFullMarkdown(false), 2200);
  };

  const handleCopyTipsGuide = () => {
    const guideText = `Quick tips for using Audio Influence 81%:
1. Upload a reference audio (a busking backing track or a jazz fusion loop you like).
2. Set Audio Influence to 81%.
3. Keep the text prompt focused on instrumentation, timbre, and feel — the reference will handle structure, melody, and rhythm.
4. Use the negative prompt field (or add to style) to exclude saxophone, vocals, guitar, etc.
5. If Suno adds unwanted instruments, strengthen the exclusions: no saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word.
6. These 10 variations give you different angles on the same core backing track, so you can test which one pairs best with your reference audio at 81% influence.`;
    navigator.clipboard.writeText(guideText);
    setCopiedTipsGuide(true);
    setTimeout(() => setCopiedTipsGuide(false), 2200);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-stone-900/90 via-stone-950 to-amber-950/20 border border-amber-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-semibold flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-amber-400" />
                <span>10 Jazz Fusion Backing Tracks</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Audio Influence 81% Optimized
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 font-mono text-[11px]">
                105 BPM · 4/4 Pocket
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[11px]">
                Trumpet Solo Ready (No Sax / No Vocals / No Guitar)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Jazz Fusion Busking Backing Track Suite
            </h1>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
              10 dialed variations of the core <strong className="text-amber-300 font-medium">105 BPM jazz fusion backing track</strong> crafted specifically for street busking, live solo practice, and loop performance. With saxophone, guitar, and vocals strictly stripped out, wide acoustic headroom is preserved for your <strong className="text-white font-medium">live acoustic trumpet or horn solo</strong>.
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
            <button
              onClick={handleCopyTipsGuide}
              className="px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              {copiedTipsGuide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTipsGuide ? "Guide Copied!" : "Copy 81% Tips Guide"}</span>
            </button>

            <button
              onClick={() => setShowFullMarkdown(!showFullMarkdown)}
              className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{showFullMarkdown ? "Hide Markdown" : "View Full Markdown"}</span>
            </button>
          </div>
        </div>

        {/* Global Room Tone Controller */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl transition-all ${
              enableRoomTone ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "bg-stone-800 text-stone-500"
            }`}>
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-white">Room Tone & Organic Ambience Injection</span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold">
                  Anti-AI Acoustic
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-light">
                Automatically appends environmental room noise keywords to prompt text and style tags.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setEnableRoomTone(!enableRoomTone)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                enableRoomTone
                  ? "bg-amber-500 text-stone-950 border-amber-400 font-bold"
                  : "bg-stone-800 text-stone-400 border-stone-700"
              }`}
            >
              {enableRoomTone ? "Room Tone: ON" : "Room Tone: OFF"}
            </button>

            {enableRoomTone && (
              <select
                value={selectedRoomTone}
                onChange={(e) => setSelectedRoomTone(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-stone-900 border border-white/15 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="intimate jazz club noise">Intimate Jazz Club Noise</option>
                <option value="captured in an wooden concert hall">Captured in an Wooden Concert Hall</option>
                <option value="natural room ambience">Natural Room Ambience</option>
                <option value="live studio bleed and acoustic room reflections">Live Studio Bleed & Room Reflections</option>
              </select>
            )}
          </div>
        </div>
      </div>

      {/* Audio Influence 81% Quick Tips Guide */}
      <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Quick Tips for Using Audio Influence 81% in Suno
              </h3>
              <p className="text-[11px] text-stone-400 font-light">
                How to lock down rhythm with uploaded references while retaining acoustic headroom for trumpet.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Audio Influence = 81%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUSKING_AUDIO_INFLUENCE_TIPS.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-stone-900/70 border border-white/5 space-y-1.5 hover:border-amber-500/20 transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <h4 className="text-xs font-semibold text-white leading-tight">
                  {tip.title}
                </h4>
              </div>
              <p className="text-[11px] text-stone-300 font-light leading-relaxed pl-7">
                {tip.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Negative Exclusions Strip */}
        <div className="p-3 rounded-xl bg-black/40 border border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 font-bold">
              Mandatory Negative Exclusions (Suno Exclude Field):
            </span>
            <p className="text-xs font-mono text-red-200/90">
              no saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText("no saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word");
            }}
            className="px-2.5 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-[11px] font-mono shrink-0 transition-colors cursor-pointer"
          >
            Copy Exclusions
          </button>
        </div>
      </div>

      {/* Full Markdown Viewer Modal / Drawer */}
      {showFullMarkdown && (
        <div className="p-5 rounded-2xl bg-stone-950 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-stone-400 uppercase tracking-wider font-semibold">
              Complete Suno-Ready Markdown (All 10 Backing Tracks + 81% Guide)
            </span>
            <button
              onClick={handleCopyFullMarkdown}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedFullMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedFullMarkdown ? "Copied Markdown!" : "Copy Full Markdown"}</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-stone-900/90 border border-white/5 text-stone-300 font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap max-h-96">
            {generateFullMarkdown()}
          </pre>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by instrument or groove (e.g. 'slap', 'brushes', 'organ', 'electric piano', 'ghost notes', 'behind the beat')..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 border border-white/10 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="px-3 py-2.5 rounded-xl bg-stone-800 text-stone-300 text-xs font-mono hover:bg-stone-700 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* 10 Track Variations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredPrompts.map((prompt) => {
          const effectivePrompt = getEffectivePromptText(prompt);
          const effectiveStyle = getEffectiveStyleTags(prompt);

          return (
            <div
              key={prompt.id}
              className="p-5 sm:p-6 rounded-2xl bg-stone-900/70 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-4 shadow-lg group relative overflow-hidden"
            >
              {/* Background Glow on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/10 transition-all" />

              <div className="space-y-3 relative z-10">
                {/* Header Badge & Title */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold flex items-center justify-center border border-amber-500/30">
                        {prompt.number}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                        105 BPM · 4/4 · Jazz Fusion
                      </span>
                    </div>
                    <h3 className="text-base font-serif font-bold text-white tracking-wide">
                      {prompt.title}
                    </h3>
                  </div>

                  <span className="px-2 py-1 rounded-md bg-stone-800 text-[10px] font-mono text-amber-300/90 font-medium shrink-0">
                    Busking Pocket
                  </span>
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {prompt.focus}
                </p>

                {/* Prompt Text Box (Exact Suno Prompt) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Suno Prompt Description (Text)</span>
                    <button
                      onClick={() => copyToClipboard(effectivePrompt, prompt.id, "prompt")}
                      className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedPromptId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800 text-stone-200 font-mono text-xs leading-relaxed select-all">
                    {effectivePrompt}
                  </div>
                </div>

                {/* Tags / Structure for Lyrics Box */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Lyrics Box Tags</span>
                    <button
                      onClick={() => copyToClipboard(prompt.tags.join(" "), prompt.id, "tags")}
                      className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedTagsId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Tags</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-stone-950/80 border border-stone-800">
                    {prompt.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-amber-300 font-mono text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Style of Music Box (<= 120 chars) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] uppercase font-mono tracking-widest text-stone-400">
                    <span>Style of Music Box ({effectiveStyle.length}/120 chars)</span>
                    <button
                      onClick={() => copyToClipboard(effectiveStyle, prompt.id, "style")}
                      className="text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedStyleId === prompt.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Style</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-200/90 font-mono text-xs truncate select-all">
                    {effectiveStyle}
                  </div>
                </div>

                {/* Key Features Bullet List */}
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-stone-500 font-semibold">
                    Acoustic Elements & Headroom:
                  </span>
                  <ul className="text-xs text-stone-400 space-y-0.5">
                    {prompt.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5 font-light">
                        <span className="w-1 h-1 rounded-full bg-amber-400/80 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 relative z-10">
                <button
                  onClick={() => {
                    const bundle = `${prompt.title}\n\n[PROMPT DESCRIPTION]\n${effectivePrompt}\n\n[STYLE TAGS]\n${effectiveStyle}\n\n[LYRICS BOX TAGS]\n${prompt.tags.join(" ")}\n\n[EXCLUSIONS / NEGATIVE PROMPT]\nno saxophone, no soprano saxophone, no vocals, no voice, no singing, no beatboxing, no acoustic guitar, no electric guitar, no spoken word`;
                    copyToClipboard(bundle, prompt.id, "all");
                  }}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedAllId === prompt.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAllId === prompt.id ? "Bundle Copied!" : "Copy Full Bundle"}</span>
                </button>

                <button
                  onClick={() => handleApply(prompt)}
                  className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md hover:shadow-amber-500/20"
                >
                  <span>Apply to Studio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
