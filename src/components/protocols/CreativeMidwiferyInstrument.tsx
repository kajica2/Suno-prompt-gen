import { useState } from "react";
import { Sparkles, Dna, Disc, Filter, ArrowRight, Zap } from "lucide-react";
import { ProtocolMetricState } from "../../types/protocols";

interface CreativeMidwiferyProps {
  metrics: ProtocolMetricState;
  onTriggerIntervention: (type: "chaos-injection" | "crystallize", customPrompt?: string) => void;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const CHAOS_WILDCARDS = [
  "Inversion: What if this idea is completely forbidden to its obvious market?",
  "Physicalization: Turn this abstract digital concept into a wooden, tactile artifact.",
  "Decapitation: Remove the first 50% of the premise and begin in media res.",
  "Ancient Context: Frame this contemporary problem as an archaic Greek or Vedic dilemma.",
  "Anti-Ego: Strip out every element that makes you look clever or impressive."
];

export default function CreativeMidwiferyInstrument({
  metrics,
  onTriggerIntervention,
  onSelectPrompt,
  disabled = false
}: CreativeMidwiferyProps) {
  const [gestationPhase, setGestationPhase] = useState<"seed" | "womb" | "chaos" | "crystallize" | "birth">("womb");
  const [activeChaosIdx, setActiveChaosIdx] = useState<number>(0);

  const handleNextChaos = () => {
    const nextIdx = (activeChaosIdx + 1) % CHAOS_WILDCARDS.length;
    setActiveChaosIdx(nextIdx);
    onSelectPrompt(`Let's apply this 𝒟(Ω) chaos constraint to my project: "${CHAOS_WILDCARDS[nextIdx]}"`);
  };

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [Creative Midwifery Womb Space]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #3
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Co-hold in <strong>[⌀]° womb space</strong>, inject <strong>𝒟(Ω) chaos</strong> when stagnant, and refine via <strong>Ř crystallization</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTriggerIntervention("chaos-injection")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>𝒟(Ω) Chaos Pulse</span>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTriggerIntervention("crystallize")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-mono transition-all cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-teal-400" />
            <span>Ř Crystallization</span>
          </button>
        </div>
      </div>

      {/* Gestation Pipeline */}
      <div className="space-y-2">
        <span className="text-xs font-mono text-stone-400 block">Developmental Horizon:</span>
        <div className="grid grid-cols-5 gap-1.5 text-center text-[10px] font-mono">
          {[
            { id: "seed", label: "Seedling" },
            { id: "womb", label: "[⌀]° Womb" },
            { id: "chaos", label: "𝒟(Ω) Chaos" },
            { id: "crystallize", label: "Ř Crystal" },
            { id: "birth", label: "Manifest" }
          ].map((step) => {
            const isActive = gestationPhase === step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setGestationPhase(step.id as any)}
                className={`py-2 px-1 rounded-xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md"
                    : "bg-stone-950/60 border-stone-800 text-stone-400 hover:text-white"
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dual Risk Balancer: Premature Birth vs Eternal Gestation */}
      <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-300 font-medium">The Developmental Tension:</span>
          <span className="text-amber-400 text-[11px] font-mono">Golden Middle: Gestational Coherence</span>
        </div>

        <div className="relative h-3 w-full bg-stone-900 rounded-full overflow-hidden border border-stone-800">
          <div className="absolute left-[35%] w-[30%] h-full bg-teal-500/30 border-x border-teal-500/50" />
          <div className="h-full bg-gradient-to-r from-red-500 via-teal-400 to-amber-500 w-[55%]" />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
          <span className="text-red-400">⚠️ Premature Birth (Rushed)</span>
          <span className="text-teal-300 font-bold">Fertile Womb Space</span>
          <span className="text-amber-400">⚠️ Eternal Gestation (Perfectionist)</span>
        </div>
      </div>

      {/* Active Chaos Wildcard Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/30 via-stone-900 to-stone-950 border border-orange-500/30 flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-orange-400" />
            <span>Active Chaos Wildcard:</span>
          </span>
          <p className="text-xs text-stone-200 font-mono leading-relaxed">
            "{CHAOS_WILDCARDS[activeChaosIdx]}"
          </p>
        </div>

        <button
          type="button"
          onClick={handleNextChaos}
          className="shrink-0 p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 text-xs font-mono transition-colors cursor-pointer"
          title="Cycle to next chaos wildcard"
        >
          Shuffle Chaos
        </button>
      </div>
    </div>
  );
}
