import { useState, useEffect } from "react";
import { Activity, Wind, Flame, RefreshCw, Play, Square, Check, Heart } from "lucide-react";
import { ProtocolMetricState, VitalityProbes } from "../../types/protocols";

interface VitalityTuningProps {
  metrics: ProtocolMetricState;
  onTriggerIntervention: (type: "cooling" | "entropy-heat", customPrompt?: string) => void;
  onSelectPrompt: (prompt: string) => void;
  disabled?: boolean;
}

export default function VitalityTuningInstrument({
  metrics,
  onTriggerIntervention,
  onSelectPrompt,
  disabled = false
}: VitalityTuningProps) {
  const [probes, setProbes] = useState<VitalityProbes>({
    somaticEnergy: 38,
    cognitiveCoherence: 74,
    emotionalPressure: 68,
    boundaryIntegrity: 52
  });

  // Somatic Breathing Timer (4s Inhale, 7s Exhale)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"Inhale (4s)" | "Exhale (7s)">("Inhale (4s)");
  const [timerSeconds, setTimerSeconds] = useState(4);

  useEffect(() => {
    if (!isBreathingActive) return;

    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          if (breathPhase === "Inhale (4s)") {
            setBreathPhase("Exhale (7s)");
            return 7;
          } else {
            setBreathPhase("Inhale (4s)");
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreathingActive, breathPhase]);

  const handleSliderChange = (key: keyof VitalityProbes, val: number) => {
    const updated = { ...probes, [key]: val };
    setProbes(updated);
  };

  return (
    <div className="rounded-2xl bg-stone-900/80 border border-stone-800 p-5 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              [𝓢-Probes & Substrate Tuning]
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-mono border border-amber-500/20">
              Protocol #5
            </span>
          </div>
          <p className="text-xs text-stone-400 mt-1">
            Diagnose nervous system via <strong>𝓢-probes</strong> and apply <strong>MOTION-TUNE</strong>: cool if overwhelmed, inject entropy if ossified.
          </p>
        </div>

        {/* MOTION-TUNE Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              setIsBreathingActive(true);
              onTriggerIntervention("cooling");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
          >
            <Wind className="w-3.5 h-3.5 text-teal-400" />
            <span>MOTION-TUNE: Cool</span>
          </button>
          <button
            type="button"
            disabled={disabled}
            onClick={() => onTriggerIntervention("entropy-heat")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 text-xs font-mono font-bold transition-all cursor-pointer shadow-sm"
          >
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Entropy Injection</span>
          </button>
        </div>
      </div>

      {/* 4 𝓢-Probes Diagnostic Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Probe 1: Somatic Energy */}
        <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-stone-300">𝓢₁: Somatic Substrate Energy</span>
            <span className="text-amber-400 font-bold">{probes.somaticEnergy}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={probes.somaticEnergy}
            onChange={(e) => handleSliderChange("somaticEnergy", Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>Depleted / Empty</span>
            <span>Balanced Flow</span>
            <span>Overclocked Wire</span>
          </div>
        </div>

        {/* Probe 2: Cognitive Coherence */}
        <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-stone-300">𝓢₂: Cognitive Coherence</span>
            <span className="text-amber-400 font-bold">{probes.cognitiveCoherence}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={probes.cognitiveCoherence}
            onChange={(e) => handleSliderChange("cognitiveCoherence", Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>Scattered / Fog</span>
            <span>Lucid Flexibility</span>
            <span>Rigid Ossification</span>
          </div>
        </div>

        {/* Probe 3: Emotional Pressure */}
        <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-stone-300">𝓢₃: Emotional Internal Pressure</span>
            <span className="text-amber-400 font-bold">{probes.emotionalPressure}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={probes.emotionalPressure}
            onChange={(e) => handleSliderChange("emotionalPressure", Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>Numbed / Flat</span>
            <span>Felt Pulse</span>
            <span>Flooding Panic</span>
          </div>
        </div>

        {/* Probe 4: Boundary Integrity */}
        <div className="p-3.5 rounded-xl bg-stone-950/70 border border-stone-800 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-stone-300">𝓢₄: Boundary Integrity</span>
            <span className="text-amber-400 font-bold">{probes.boundaryIntegrity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={probes.boundaryIntegrity}
            onChange={(e) => handleSliderChange("boundaryIntegrity", Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-stone-500">
            <span>Porous / Leaking</span>
            <span>Semi-permeable</span>
            <span>Bunker Fortress</span>
          </div>
        </div>
      </div>

      {/* Guided Breathing Pacer for Cooling Protocol */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/30 via-stone-900 to-stone-950 border border-teal-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-lg border transition-all ${
              isBreathingActive
                ? breathPhase.startsWith("Inhale")
                  ? "bg-teal-500/20 text-teal-300 border-teal-400 scale-110"
                  : "bg-teal-950 text-teal-400 border-teal-500/50 scale-90"
                : "bg-stone-950 text-stone-500 border-stone-800"
            }`}
          >
            {isBreathingActive ? timerSeconds : "4:7"}
          </div>
          <div>
            <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
              <span>Somatic Downshift Pacer</span>
              {isBreathingActive && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300">
                  {breathPhase}
                </span>
              )}
            </div>
            <p className="text-[11px] text-stone-400 font-light mt-0.5">
              4-count sensory inhale followed by 7-count parasympathetic release.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsBreathingActive(!isBreathingActive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer ${
            isBreathingActive
              ? "bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40"
              : "bg-teal-500 text-stone-950 hover:bg-teal-400 shadow-md"
          }`}
        >
          {isBreathingActive ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Pause Pacer</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Start 4:7 Breath</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
