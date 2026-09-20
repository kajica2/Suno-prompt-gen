import { useState } from "react";
import { Lock, Unlock, Users, Shield, CheckCircle, AlertTriangle, Send } from "lucide-react";
import { ProtocolMetricState } from "../../types/protocols";

interface CollectiveExperimentsProps {
  metrics: ProtocolMetricState;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const CONSENT_GATES = [
  {
    id: "gate-sovereignty",
    title: "Sovereign Boundary Protection (δ)",
    description: "Every participant retains total unilateral right of exit without penalty or social shaming."
  },
  {
    id: "gate-dissent",
    title: "Dissent Welcoming as Parallax",
    description: "Divergence is treated as vital topological parallax, never smoothed over for false consensus."
  },
  {
    id: "gate-anonymity",
    title: "Vulnerability Sanctuary",
    description: "Personal revelations remain within the session container under Chatham House rules."
  },
  {
    id: "gate-clarity",
    title: "Explicit Vector Alignment",
    description: "The shared inquiry has defined boundaries and does not covertly extract unpaid labor or ideas."
  }
];

export default function CollectiveExperimentsInstrument({
  metrics,
  onSelectPrompt,
  disabled = false
}: CollectiveExperimentsProps) {
  const [gatesAccepted, setGatesAccepted] = useState<Record<string, boolean>>({
    "gate-sovereignty": true,
    "gate-dissent": true,
    "gate-anonymity": false,
    "gate-clarity": false
  });

  const allGatesPassed = Object.values(gatesAccepted).every(Boolean);

  const toggleGate = (id: string) => {
    setGatesAccepted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [𝒲_θ Nomadic Coordination]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #7
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Multi-human & multi-agent coordination. <strong>Consent-Gated Architecture</strong> preserving individual sovereignty (δ).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-xl flex items-center gap-1.5 border ${
              allGatesPassed
                ? "bg-teal-500/20 text-teal-300 border-teal-500/40 font-bold"
                : "bg-amber-500/10 text-amber-300 border-amber-500/20"
            }`}
          >
            {allGatesPassed ? <Unlock className="w-3.5 h-3.5 text-teal-400" /> : <Lock className="w-3.5 h-3.5 text-amber-400" />}
            <span>{allGatesPassed ? "Consent Protocol Verified" : "Consent Gate Pending"}</span>
          </span>
        </div>
      </div>

      {/* Consent Gating Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-stone-400">
          <span>Required Consent Gates (All 4 must be ratified):</span>
          <span>{Object.values(gatesAccepted).filter(Boolean).length} / 4 Ratified</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONSENT_GATES.map((gate) => {
            const isChecked = !!gatesAccepted[gate.id];
            return (
              <div
                key={gate.id}
                onClick={() => toggleGate(gate.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isChecked
                    ? "bg-teal-950/30 border-teal-500/40 text-stone-200"
                    : "bg-stone-950/60 border-stone-800 text-stone-400 hover:border-stone-700"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? "bg-teal-500 border-teal-400 text-stone-950"
                      : "border-stone-700 bg-stone-900"
                  }`}
                >
                  {isChecked && <CheckCircle className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
                <div>
                  <h4 className={`text-xs font-semibold ${isChecked ? "text-teal-200" : "text-stone-300"}`}>
                    {gate.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-light mt-1 leading-relaxed">
                    {gate.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Initiation Action */}
      <div className="p-4 rounded-xl bg-stone-950/80 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs font-mono text-stone-300">
          {allGatesPassed ? (
            <span className="text-teal-300 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              <span>Sovereignty contracts authenticated. Nomadic swarm channels open.</span>
            </span>
          ) : (
            <span className="text-amber-400/90 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Please ratify all 4 consent gates before convening collective field.</span>
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={!allGatesPassed || disabled}
          onClick={() =>
            onSelectPrompt(
              `Initiating 𝒲_θ Nomadic Coordination: We are convening a collective inquiry with multi-party consent ratified. How do we align our vector field without coercing convergence?`
            )
          }
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            allGatesPassed
              ? "bg-teal-500 text-stone-950 hover:bg-teal-400 shadow-md"
              : "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700"
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Convene Collective Swarm</span>
        </button>
      </div>
    </div>
  );
}
