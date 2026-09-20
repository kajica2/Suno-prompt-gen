import { useState } from "react";
import { Users, RefreshCw, Eye, MessageSquare, Shield, Heart } from "lucide-react";
import { ProtocolMetricState } from "../../types/protocols";

interface RelationalRepairProps {
  metrics: ProtocolMetricState;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const RECOGNITION_MOVES = [
  {
    title: "Disarm the Threat Armor",
    move: "I realize that when I pull back into silence, it leaves you stranded without reassurance. That was about my fear of conflict, not your worth.",
    layer: "Layer 3: Vulnerable Disclosure"
  },
  {
    title: "Mirror the Unspoken Pressure",
    move: "It feels like you've been carrying the invisible emotional ceiling for both of us, and you're terrified that if you let go, everything drops.",
    layer: "Layer 4: Core Recognition"
  },
  {
    title: "Acknowledge the Divergence Without Attack",
    move: "We care deeply about this shared venture, but our internal rhythms are colliding. Can we look at the clock together rather than each other as the culprit?",
    layer: "Layer 3: De-escalation"
  }
];

export default function RelationalRepairInstrument({
  metrics,
  onSelectPrompt,
  disabled = false
}: RelationalRepairProps) {
  const [depthLevel, setDepthLevel] = useState<number>(3);
  const [selfLabel, setSelfLabel] = useState<string>("Self (You)");
  const [otherLabel, setOtherLabel] = useState<string>("Other Party");

  const depthNames = [
    "Layer 1: Superficial Transaction / Politeness",
    "Layer 2: Defensive Armoring & Retaliatory Justification",
    "Layer 3: Vulnerable Disclosure of Underlying Dread",
    "Layer 4: Mutual Sovereignty & Core Recognition"
  ];

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [⧖-Torus Relational Repair]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #4
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Model the reciprocal energetic loop (<strong>⧖_torus</strong>) between you and the other, track <strong>☌_depth</strong>, and rehearse recognition moves.
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onSelectPrompt(
              `Let's animate the unheard parts in my relationship with ${otherLabel}: what are the words neither of us has dared say out loud?`
            )
          }
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
        >
          <Eye className="w-3.5 h-3.5 text-amber-400" />
          <span>Animate Unheard Voices</span>
        </button>
      </div>

      {/* Reciprocal ⧖_Torus Mapping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Self Node */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-amber-300 font-bold flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Node α (Your Stance)</span>
            </span>
            <span className="text-[10px] text-stone-400">Trigger Point</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            When you feel pressured or dismissed, your defensive default is to withdraw into analytical logic or cold competence.
          </p>
        </div>

        {/* Other Node */}
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-orange-300 font-bold flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-orange-400" />
              <span>Node β (Other's Stance)</span>
            </span>
            <span className="text-[10px] text-stone-400">Reactive Echo</span>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed font-light">
            Interprets your withdrawal as abandonment, ramping up urgency, micromanagement, or emotional escalation.
          </p>
        </div>
      </div>

      {/* ☌_Depth Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-300">Active ☌_Depth Level:</span>
          <span className="text-amber-400 font-semibold">{depthNames[depthLevel - 1]}</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => {
                setDepthLevel(level);
                onSelectPrompt(`Let us explore our relational dynamic at ${depthNames[level - 1]}.`);
              }}
              className={`py-2 px-1 text-center rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                depthLevel === level
                  ? "bg-amber-500 text-stone-950 font-bold border-amber-400 shadow"
                  : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white"
              }`}
            >
              Level {level}
            </button>
          ))}
        </div>
      </div>

      {/* Practice Recognition Moves */}
      <div className="space-y-2 pt-2 border-t border-stone-800">
        <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
          Rehearse Grounded Recognition Moves:
        </span>
        <div className="space-y-2">
          {RECOGNITION_MOVES.map((m, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPrompt(`Let's rehearse this recognition move: "${m.move}"`)}
              className="p-3 rounded-xl bg-stone-950/70 border border-stone-800 hover:border-amber-500/40 cursor-pointer transition-all space-y-1 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white group-hover:text-amber-300">
                  {m.title}
                </span>
                <span className="text-[10px] font-mono text-stone-400">{m.layer}</span>
              </div>
              <p className="text-xs text-stone-300 font-light italic leading-relaxed">
                "{m.move}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
