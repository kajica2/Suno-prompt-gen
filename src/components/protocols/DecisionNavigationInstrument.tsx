import { useState } from "react";
import { Compass, GitBranch, Heart, Shield, Plus, Sparkles } from "lucide-react";
import { DecisionOption, ProtocolMetricState } from "../../types/protocols";

interface DecisionNavigationInstrumentProps {
  metrics: ProtocolMetricState;
  onTriggerIntervention: (type: "braid" | "direct-perp", customPrompt?: string) => void;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const SAMPLE_DECISION_OPTIONS: DecisionOption[] = [
  {
    id: "opt-1",
    label: "Option A: Institutional Security (Full-time Contract)",
    consequenceType: "irreversible-macro",
    somaticAliveness: 48,
    sovereignty: 45,
    resonance: 55,
    notes: "Guaranteed revenue, but surrenders autonomy and creates creative stifling."
  },
  {
    id: "opt-2",
    label: "Option B: Sovereign Independence (Self-Funded Lab)",
    consequenceType: "irreversible-macro",
    somaticAliveness: 88,
    sovereignty: 95,
    resonance: 90,
    notes: "High somatic aliveness; requires 6 months of disciplined runway management."
  },
  {
    id: "opt-3",
    label: "Option C: 48-Hour Paid Pilot / Micro-Grant (Orthogonal Move)",
    consequenceType: "reversible-micro",
    somaticAliveness: 82,
    sovereignty: 88,
    resonance: 92,
    notes: "Completely reversible micro-consequence; tests appetite without ceding IP."
  }
];

export default function DecisionNavigationInstrument({
  metrics,
  onTriggerIntervention,
  onSelectPrompt,
  disabled = false
}: DecisionNavigationInstrumentProps) {
  const [options, setOptions] = useState<DecisionOption[]>(SAMPLE_DECISION_OPTIONS);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("opt-2");

  const selectedOpt = options.find((o) => o.id === selectedOptionId) || options[0];

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [RGBO Decision Navigator]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #2
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Map choices along <strong>⊥-dimensions</strong> (reversible micro vs irreversible macro) while preserving <strong>μ_soma</strong> and <strong>δ (sovereignty)</strong>.
          </p>
        </div>

        {/* Shortcuts: BRAID and DIRECT-⊥ */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTriggerIntervention("braid")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-mono transition-all cursor-pointer"
            title="Weave intuitive resonance and analytical modeling"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>BRAID Shortcut</span>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTriggerIntervention("direct-perp")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
            title="Deploy orthogonal 90-degree leap beyond binary traps"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>DIRECT-⊥ Leap</span>
          </button>
        </div>
      </div>

      {/* Options Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span>Explore Decision Branches:</span>
          <span>Click to examine metrics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {options.map((opt) => {
            const isSelected = opt.id === selectedOptionId;
            const isReversible = opt.consequenceType === "reversible-micro";

            return (
              <div
                key={opt.id}
                onClick={() => {
                  setSelectedOptionId(opt.id);
                  onSelectPrompt(`Let's navigate this choice: ${opt.label}. Notes: ${opt.notes}`);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${
                        isReversible
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      }`}
                    >
                      {isReversible ? "⊥ Reversible Micro" : "Irreversible Macro"}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      ι {opt.resonance}%
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold text-white leading-snug">
                    {opt.label}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-light mt-1.5 leading-relaxed">
                    {opt.notes}
                  </p>
                </div>

                {/* Micro Meters */}
                <div className="mt-3 pt-2.5 border-t border-stone-800/80 grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-1 text-stone-300">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>μ_soma: {opt.somaticAliveness}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-stone-300 justify-end">
                    <Shield className="w-3 h-3 text-amber-400" />
                    <span>δ: {opt.sovereignty}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Metric Inspector for Active Option */}
      {selectedOpt && (
        <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-300 font-bold">
              Active Focus: {selectedOpt.label}
            </span>
            <span className="text-amber-400 text-[11px]">
              {selectedOpt.consequenceType === "reversible-micro" ? "Low Risk / High Learning" : "High Commitment Threshold"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <div className="flex justify-between text-stone-400 text-[11px] mb-1">
                <span>μ_soma (Felt Aliveness)</span>
                <span className="text-amber-300 font-bold">{selectedOpt.somaticAliveness}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 rounded-full" style={{ width: `${selectedOpt.somaticAliveness}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-400 text-[11px] mb-1">
                <span>δ (Personal Sovereignty)</span>
                <span className="text-amber-300 font-bold">{selectedOpt.sovereignty}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedOpt.sovereignty}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-stone-400 text-[11px] mb-1">
                <span>ι (Systemic Resonance)</span>
                <span className="text-amber-300 font-bold">{selectedOpt.resonance}%</span>
              </div>
              <div className="h-1.5 w-full bg-stone-900 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full" style={{ width: `${selectedOpt.resonance}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
