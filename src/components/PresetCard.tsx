import { useState } from "react";
import { Preset } from "../types";
import { Copy, Check, ChevronDown, ChevronUp, Sliders } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PresetCardProps {
  key?: string;
  preset: Preset;
  onLoadConfig: (preset: Preset) => void;
}

export default function PresetCard({ preset, onLoadConfig }: PresetCardProps) {
  const [copiedTags, setCopiedTags] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const copyText = (text: string, type: "tags" | "lyrics") => {
    navigator.clipboard.writeText(text);
    if (type === "tags") {
      setCopiedTags(true);
      setTimeout(() => setCopiedTags(false), 2000);
    } else {
      setCopiedLyrics(true);
      setTimeout(() => setCopiedLyrics(false), 2000);
    }
  };

  return (
    <div className="glass rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col h-full bg-white/[0.02]">
      {/* Card Header */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-block px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-white/60 text-[10px] font-mono tracking-wider uppercase">
            {preset.config.genre}
          </span>
          <span className="text-[10px] text-white/40 font-mono tracking-wider">
            {preset.config.tempo.split(" (")[1]?.replace(")", "") || "Gentle"}
          </span>
        </div>
        
        <h3 className="font-serif text-xl font-medium text-stone-100 mb-2 italic">
          {preset.name}
        </h3>
        
        <p className="text-white/60 text-xs font-sans font-light leading-relaxed mb-4 flex-1">
          {preset.description}
        </p>

        {/* Music Tags Quick View */}
        <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3 mt-auto">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] uppercase tracking-widest text-white/40 font-mono font-bold">
              Style Tags Limit (120 Chars)
            </span>
            <button
              onClick={() => copyText(preset.sampleResult.styleTags, "tags")}
              className="text-white/40 hover:text-amber-400 transition-colors"
              title="Copy tags to clipboard"
            >
              {copiedTags ? (
                <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1">
                  <Check className="w-2.5 h-2.5" /> Copied
                </span>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <p className="text-xs font-mono text-white/80 line-clamp-2 leading-relaxed">
            {preset.sampleResult.styleTags}
          </p>
        </div>
      </div>

      {/* Card Footer / Action Bar */}
      <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[11px] uppercase tracking-wider text-white/50 hover:text-white font-medium flex items-center gap-1 py-1 px-2.5 rounded-md hover:bg-white/5 transition-colors"
        >
          {isExpanded ? (
            <>
              Hide Lyrics <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              Show Lyrics <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <button
          onClick={() => onLoadConfig(preset)}
          className="text-[10px] uppercase tracking-widest bg-white hover:bg-stone-200 text-black font-bold flex items-center gap-1.5 py-2 px-3 rounded-lg transition-all"
        >
          <Sliders className="w-3 h-3" />
          Load Style
        </button>
      </div>

      {/* Expanded Details Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="border-t border-white/5 bg-black/40 overflow-hidden"
          >
            <div className="p-6 border-b border-white/5">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[10px] uppercase tracking-widest text-amber-400 font-mono font-bold">
                  Demo Lyric Suite: "{preset.sampleResult.title}"
                </h4>
                <button
                  onClick={() => copyText(preset.sampleResult.lyrics, "lyrics")}
                  className="bg-white/5 border border-white/10 text-white/60 hover:text-white p-1.5 rounded-lg transition-all"
                  title="Copy full lyrics"
                >
                  {copiedLyrics ? (
                    <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono text-white/70 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto bg-stone-950/80 border border-white/5 rounded-xl p-4 shadow-inner">
                {preset.sampleResult.lyrics}
              </pre>
            </div>

            <div className="p-6 bg-amber-500/[0.02]">
              <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-mono font-bold mb-2">
                Production Tips
              </h4>
              <ul className="space-y-2">
                {preset.sampleResult.tips.map((tip, idx) => (
                  <li key={idx} className="text-xs text-white/60 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-400 font-mono font-semibold">0{idx + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
