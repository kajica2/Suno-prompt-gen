export type ProtocolId =
  | "shadow-weaving"
  | "decision-navigation"
  | "creative-midwifery"
  | "relational-repair"
  | "vitality-tuning"
  | "meta-learning"
  | "collective-experiments";

export interface ProtocolMetricState {
  gradientTension?: number; // 0-100 (∇ℰ)
  flowState?: "low" | "healthy-flow" | "overwhelm"; // [🌊]
  somaticAliveness?: number; // 0-100 (μ_soma)
  sovereignty?: number; // 0-100 (δ)
  resonance?: number; // 0-100 (ι)
  stance?: string; // P1, P2, ⊥, [⌀]°, ⧖, 𝓢, 𝒲_θ
  appliedIntervention?: string;
}

export interface DialogueMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  metrics?: ProtocolMetricState;
  interventionTriggered?: string;
}

export interface DecisionOption {
  id: string;
  label: string;
  consequenceType: "reversible-micro" | "irreversible-macro";
  somaticAliveness: number; // 0-100 (μ_soma)
  sovereignty: number; // 0-100 (δ)
  resonance: number; // 0-100 (ι)
  notes?: string;
}

export interface VitalityProbes {
  somaticEnergy: number; // 0-100 (Depleted -> Overclocked)
  cognitiveCoherence: number; // 0-100 (Brain Fog -> Rigid Ossification)
  emotionalPressure: number; // 0-100 (Numbed -> Overwhelmed)
  boundaryIntegrity: number; // 0-100 (Porous -> Fortified)
}

export interface ProtocolDefinition {
  id: ProtocolId;
  number: number;
  title: string;
  symbol: string;
  subtitle: string;
  tagline: string;
  primaryNotations: string[];
  description: string;
  coreMechanics: string[];
  samplePrompts: string[];
  defaultMetrics: ProtocolMetricState;
}
