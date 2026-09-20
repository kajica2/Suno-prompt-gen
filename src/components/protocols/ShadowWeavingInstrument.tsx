import { useState } from "react";
import { Shield, Flame, Sparkles, RefreshCw, AlertCircle, Compass, Wind } from "lucide-react";
import { ProtocolMetricState } from "../../types/protocols";

interface ShadowWeavingInstrumentProps {
  metrics: ProtocolMetricState;
  onTriggerIntervention: (type: "sanctuary" | "micro-perturbation" | "transmute", customPrompt?: string) => void;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const COMMON_TENSIONS = [
  {
    title: "The Silent Resentment",
    text: "I feel a bitter resentment towards collaborators moving slowly, while I silently take on their burden.",
    charge: 76,
  },
  {
    title: "Paralyzing Perfectionism",
    text: "I freeze right before publishing or shipping; I find trivial administrative chores to avoid judgment.",
    charge: 64,
  },
  {
    title: "The Fear of Exposure",
    text: "A visceral dread strikes whenever my authentic creative voice is visible without an academic disguise.",
    charge: 82,
  },
  {
    title: "Relational Withdrawal",
    text: "When emotionally challenged, I turn cold and intellectualize rather than staying in vulnerable contact.",
    charge: 70,
  },
];

export default function ShadowWeavingInstrument({
  metrics,
  onTriggerIntervention,
  onSelectPrompt,
  disabled = false,
}: ShadowWeavingInstrumentProps) {
  const [localTension, setLocalTension] = useState(metrics.gradientTension || 58);
  const [activeStance, setActiveStance] = useState<"P1" | "P2">("P1");

  const tensionVal = metrics.gradientTension ?? localTension;
  const isHealthyBand = tensionVal >= 45 && tensionVal <= 78;
  const isOverwhelm = tensionVal > 78;

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header & Principle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [ℰ-Integration Console]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #1
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Track <strong>∇ℰ (Gradient Tension)</strong> and hold the fertile edge <strong>[🌊]</strong> without premature resolution.
          </p>
        </div>

        {/* Stance Selector: P1 vs P2 */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-950 rounded-xl border border-stone-800">
          <button
            type="button"
            onClick={() => setActiveStance("P1")}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
              activeStance === "P1"
                ? "bg-amber-500 text-stone-950 font-bold shadow"
                : "text-stone-400 hover:text-white"
            }`}
            title="P1: Naming the tension without premature fix"
          >
            P₁ Naming
          </button>
          <button
            type="button"
            onClick={() => setActiveStance("P2")}
            className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
              activeStance === "P2"
                ? "bg-orange-500 text-stone-950 font-bold shadow"
                : "text-stone-400 hover:text-white"
            }`}
            title="P2: Animate the shadow with curious voice"
          >
            P₂ Voice
          </button>
        </div>
      </div>

      {/* Live Gradient Tension ∇ℰ Meter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-300 flex items-center gap-1.5">
            <Flame className={`w-3.5 h-3.5 ${isOverwhelm ? "text-red-400 animate-pulse" : isHealthyBand ? "text-amber-400" : "text-blue-400"}`} />
            <span>Energy Gradient ∇ℰ</span>
          </span>
          <span className="font-bold text-amber-300">{tensionVal}%</span>
        </div>

        <div className="relative h-3 w-full bg-stone-950 rounded-full overflow-hidden border border-stone-800">
          {/* Healthy Band Indicator (45% - 78%) */}
          <div className="absolute left-[45%] w-[33%] h-full bg-amber-500/20 border-x border-amber-500/40" />

          {/* Value bar */}
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isOverwhelm
                ? "bg-gradient-to-r from-amber-500 to-red-500"
                : isHealthyBand
                ? "bg-gradient-to-r from-blue-500 via-amber-400 to-orange-500"
                : "bg-blue-500/80"
            }`}
            style={{ width: `${tensionVal}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 pt-0.5">
          <span>0% Numb / Idle</span>
          <span className={`px-2 py-0.5 rounded ${isHealthyBand ? "bg-amber-500/20 text-amber-300 font-semibold" : ""}`}>
            [🌊] Healthy Flow Band (45–78%)
          </span>
          <span>100% Critical Peak</span>
        </div>
      </div>

      {/* Protocol Intervention Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onTriggerIntervention("sanctuary")}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-teal-950/40 hover:bg-teal-900/50 text-teal-300 border border-teal-500/30 text-xs font-mono transition-all cursor-pointer hover:border-teal-400 shadow-sm"
        >
          <Shield className="w-3.5 h-3.5 text-teal-400" />
          <span>[🪷] Sanctuary Protocol</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onTriggerIntervention("micro-perturbation")}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-500/30 text-xs font-mono transition-all cursor-pointer hover:border-amber-400 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>⚔ₘₚ Micro-Perturbation</span>
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onTriggerIntervention("transmute")}
          className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-orange-950/40 hover:bg-orange-900/50 text-orange-300 border border-orange-500/30 text-xs font-mono transition-all cursor-pointer hover:border-orange-400 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
          <span>Rearrange into Fuel</span>
        </button>
      </div>

      {/* Archetypal Tension Presets */}
      <div className="space-y-2 pt-2 border-t border-stone-800">
        <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider block">
          Select an Archetypal Tension to Inhabit:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {COMMON_TENSIONS.map((t, idx) => (
            <div
              key={idx}
              onClick={() => {
                setLocalTension(t.charge);
                onSelectPrompt(t.text);
              }}
              className="p-2.5 rounded-xl bg-stone-950/60 hover:bg-stone-900 border border-stone-800/80 hover:border-amber-500/40 cursor-pointer transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-stone-200 group-hover:text-amber-300">
                  {t.title}
                </span>
                <span className="text-[10px] font-mono text-amber-400/80">
                  ∇ℰ {t.charge}%
                </span>
              </div>
              <p className="text-[11px] text-stone-400 line-clamp-2 mt-1">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
