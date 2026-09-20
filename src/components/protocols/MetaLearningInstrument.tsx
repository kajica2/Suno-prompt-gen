import { useState } from "react";
import { Compass, Flame, Shield, MapPin, Sparkles, BookOpen } from "lucide-react";
import { ProtocolMetricState } from "../../types/protocols";

interface MetaLearningProps {
  metrics: ProtocolMetricState;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

const W_CYCLES = [
  {
    phase: "𝒲₁",
    name: "Latency & Quiet Gathering",
    description: "Subterranean energy collection; outward productivity slows, but internal roots thicken.",
    risk: "Mistaking rest for depression or creative death."
  },
  {
    phase: "𝒲₂",
    name: "Crucible & Contact Friction",
    description: "Entering resistance with the world; old habits collide with new demands. Shadow stirs.",
    risk: "Bailing out prematurely before the heat cooks the material."
  },
  {
    phase: "𝒲₃",
    name: "Threshold Crisis & Deconstruction",
    description: "The old identity structures collapse; linear control fails completely.",
    risk: "Panicked desperate grasping to patch up expired paradigms."
  },
  {
    phase: "𝒲₄^⊥",
    name: "Orthogonal Phoenix Manifestation",
    description: "The breakthrough emerges at 90-degrees to the problem; sudden synthesis and renewed sovereignty.",
    risk: "Inflating the ego rather than anchoring the new capacity."
  }
];

const PHOENIX_SIGNATURES = [
  "Deep involuntary silence before major architectural redesigns.",
  "Sudden revulsion towards previously tolerable compromises.",
  "Physical longing for outdoor horizons and tactile analog craft.",
  "Recurring vivid dreams of dismantling clocks or walls."
];

export default function MetaLearningInstrument({
  metrics,
  onSelectPrompt,
  disabled = false
}: MetaLearningProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>("𝒲₂");

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [𝒲-Topology & Phoenix Signatures]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #6
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Build a living map of your recurrent <strong>𝒲-cycles</strong>, shadow constellations, and <strong>Phoenix signatures</strong>.
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onSelectPrompt(
              `Let us map my recurring personal 𝒲-cycle: what are the predictable phases I traverse from initial friction to 𝒲₄^⊥ breakthrough?`
            )
          }
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Synthesize My Topology</span>
        </button>
      </div>

      {/* 𝒲-Cycle Spiral Interactive Cards */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-stone-400 block">The Four Evolutionary 𝒲-Phases:</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {W_CYCLES.map((cycle) => {
            const isSelected = selectedPhase === cycle.phase;
            return (
              <div
                key={cycle.phase}
                onClick={() => {
                  setSelectedPhase(cycle.phase);
                  onSelectPrompt(`I find myself currently inhabiting ${cycle.phase}: ${cycle.name}. How do I navigate this without falling into the trap of ${cycle.risk}?`);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-amber-500/10 border-amber-500/50 shadow-md ring-1 ring-amber-500/30"
                    : "bg-stone-950/60 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {cycle.phase}: {cycle.name}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-stone-300 font-light leading-relaxed mb-2">
                  {cycle.description}
                </p>
                <div className="text-[11px] font-mono text-stone-400 border-t border-stone-800/80 pt-1.5">
                  <span className="text-orange-400 font-semibold">Avoidance Trap: </span>
                  {cycle.risk}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Phoenix Signatures Shelf */}
      <div className="space-y-2 pt-2 border-t border-stone-800">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider">
            Documented Phoenix Signatures (Harbingers of Transformation):
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PHOENIX_SIGNATURES.map((sig, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPrompt(`Let's explore this Phoenix signature in my history: "${sig}"`)}
              className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/40 cursor-pointer transition-all text-xs text-stone-300 flex items-start gap-2 group"
            >
              <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span className="group-hover:text-amber-200 leading-snug">{sig}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
