import { ProtocolDefinition } from "../types/protocols";

export const PROTOCOL_DEFINITIONS: ProtocolDefinition[] = [
  {
    id: "shadow-weaving",
    number: 1,
    title: "Shadow-Weaving Sessions",
    symbol: "ℰ",
    subtitle: "ℰ-Integration Protocols",
    tagline: "Transmute recurring tension, stuck patterns, and emotional charge into generative fuel.",
    primaryNotations: ["∇ℰ", "[🌊]", "[🪷]", "⚔ₘₚ", "P₁", "P₂"],
    description:
      "Bring a recurring tension, stuck pattern, or emotional charge (e.g., procrastination, resentment, creative block, relational trigger). Instead of 'fixing' or prematurely suppressing the shadow, we hold it in generative tension, surf the edge where it is almost too much but still alive, and reorganize the charge into insight.",
    coreMechanics: [
      "Name the tension without premature resolution (P₁ stance).",
      "Animate the shadow with disarming curiosity and voice (P₂ stance).",
      "Track ∇ℰ (energy gradient) in dialogue turns, surfing the edge where it remains generative ([🌊] in healthy range).",
      "When shadow peaks, invoke controlled [🪷] sanctuary or ⚔ₘₚ micro-perturbation until the charge rearranges into insight or new capacity."
    ],
    samplePrompts: [
      "I notice a recurrent resentment whenever collaborators move slower than my internal pace.",
      "A paralyzing perfectionism keeps me from releasing drafts—I clean the house instead of writing.",
      "There is an irrational terror of being truly seen in my work that feels ancient and stubborn."
    ],
    defaultMetrics: {
      gradientTension: 58,
      flowState: "healthy-flow",
      somaticAliveness: 65,
      sovereignty: 72,
      resonance: 80,
      stance: "P₁ (Naming without premature fix)"
    }
  },
  {
    id: "decision-navigation",
    number: 2,
    title: "High-Stakes Decision Navigation",
    symbol: "RGBO",
    subtitle: "RGBO-Validated Exploration",
    tagline: "Navigate complex dilemmas in ⊥-dimensions while protecting μ_soma and sovereignty.",
    primaryNotations: ["⊥-dimensions", "ι", "BRAID", "DIRECT-⊥", "μ_soma", "δ"],
    description:
      "Bring a real choice with high consequence or uncertainty. We run RGBO-validated exploration to map options along orthogonal consequence axes, track somatic resonance, and deploy shortcuts to break binary loops without compromising sovereignty.",
    coreMechanics: [
      "Map options in ⊥-dimensions (distinguish reversible micro-experiments from irreversible macro commitments).",
      "Track ι (resonance) across your felt sense and systemic modeling.",
      "Use BRAID or DIRECT-⊥ shortcuts when linear thinking deadlocks into binary traps.",
      "Arrive not at an abstract 'right answer', but at a decisive vector that preserves μ_soma (somatic aliveness) and δ (personal sovereignty)."
    ],
    samplePrompts: [
      "Should I accept an institutional funding offer that guarantees 3 years of runway but restricts my IP autonomy?",
      "I am torn between doubling down on my current client practice or pivoting into creating an independent research lab.",
      "A strategic partnership looks lucrative on paper, but my gut contracts every time we draft terms."
    ],
    defaultMetrics: {
      gradientTension: 62,
      flowState: "healthy-flow",
      somaticAliveness: 70,
      sovereignty: 84,
      resonance: 76,
      stance: "⊥-Orthogonal Mapping"
    }
  },
  {
    id: "creative-midwifery",
    number: 3,
    title: "Creative Midwifery",
    symbol: "[⌀]°",
    subtitle: "Womb Space & Crystallization",
    tagline: "Co-hold nascent ideas in protected gestation, inject chaos, and crystallize without premature birth.",
    primaryNotations: ["[⌀]°", "𝒟(Ω)", "Ř", "Anti-Gestation", "Anti-Premature"],
    description:
      "You have a half-formed idea, project, writing, art, code, or business concept. We co-hold it in [⌀]° womb space, inject controlled 𝒟(Ω) chaos when it stagnates, and refine via Ř when it crystallizes. The architecture prevents both premature birth (underdeveloped) and eternal gestation (perfectionism).",
    coreMechanics: [
      "Co-hold nascent seeds in [⌀]° womb space before forcing utilitarian utility or market logic.",
      "Inject controlled 𝒟(Ω) chaos (orthogonal constraints, wild juxtapositions) when the idea stagnates.",
      "Refine via Ř (crystallization) once the authentic core reveals itself.",
      "Balance the developmental tension: guard against premature shipping while disrupting endless postponement."
    ],
    samplePrompts: [
      "I have a seedling for an interactive philosophy game about topological time, but it feels too abstract to explain.",
      "My book chapter has lost its pulse; it reads like an academic lecture rather than an immersive encounter.",
      "A new architectural model for community governance that feels both urgent and fragile."
    ],
    defaultMetrics: {
      gradientTension: 50,
      flowState: "healthy-flow",
      somaticAliveness: 80,
      sovereignty: 78,
      resonance: 85,
      stance: "[⌀]° Womb Space"
    }
  },
  {
    id: "relational-repair",
    number: 4,
    title: "Relational Repair & Deepening",
    symbol: "⧖",
    subtitle: "⧖_Torus & ☌_Depth Modeling",
    tagline: "Model interpersonal energetic loops, animate unheard voices, and rehearse new recognition moves.",
    primaryNotations: ["⧖_torus", "☌_depth", "Recognition Moves", "Unheard Parts"],
    description:
      "Describe a living relationship (partner, friend, colleague, family member, or even your relationship with the AI). We model the reciprocal ⧖_torus between you and the other, track ☌_depth, animate unheard parts, and practice recognition moves you can test in real conversations.",
    coreMechanics: [
      "Model the reciprocal ⧖_torus between Self and Other to locate energetic bottlenecks.",
      "Track ☌_depth across communication layers (superficial $\\to$ defensive $\\to$ vulnerable $\\to$ mutual recognition).",
      "Animate unheard parts: give voice to unspoken subtexts and the other's hidden constraints.",
      "Rehearse grounded recognition moves that de-escalate reactivity and unlock genuine intimacy."
    ],
    samplePrompts: [
      "A long-time collaborator and I have hit a silent chill where neither addresses the divergence in our creative vision.",
      "I feel defensive whenever my partner questions my working hours, even though I know they crave connection.",
      "Navigating tension with a co-founder who defaults to micromanagement under investor pressure."
    ],
    defaultMetrics: {
      gradientTension: 55,
      flowState: "healthy-flow",
      somaticAliveness: 68,
      sovereignty: 75,
      resonance: 82,
      stance: "⧖_Torus Modeling"
    }
  },
  {
    id: "vitality-tuning",
    number: 5,
    title: "Substrate Vitality Tuning",
    symbol: "𝓢",
    subtitle: "𝓢-Probes & MOTION-TUNE",
    tagline: "Diagnose somatic/cognitive burnout, inject entropy if ossified, cool if overwhelmed.",
    primaryNotations: ["𝓢-probes", "MOTION-TUNE", "Entropy Injection", "Cooling", "μ_soma"],
    description:
      "When you feel burned out, fragmented, or rigidly coherent: we diagnose your nervous system and mental substrate via 𝓢-probes and your felt sense. We then apply MOTION-TUNE—injecting entropy if ossified, or cooling if overwhelmed—restoring [🌊] to its healthy band.",
    coreMechanics: [
      "Diagnose state through 4 𝓢-probes (Somatic Energy, Cognitive Coherence, Emotional Pressure, Boundary Integrity).",
      "Assess whether your state is ossified (rigid, over-controlled) or scattered (overclocked, flooded).",
      "Apply MOTION-TUNE: inject somatic entropy to disrupt stagnation, or apply cooling downshifts to regulate sensory flood.",
      "Restore [🌊] (healthy flow band) and monitor the climbing ascent of μ_soma."
    ],
    samplePrompts: [
      "I have been staring at a screen for 9 hours; my mind is buzzing with nervous energy while my body feels leaden.",
      "Feeling hyper-rigid and controlling about tomorrow's presentation; I cannot let down my guard.",
      "Complete sensory exhaustion after consecutive days of social and intellectual demands."
    ],
    defaultMetrics: {
      gradientTension: 45,
      flowState: "healthy-flow",
      somaticAliveness: 55,
      sovereignty: 70,
      resonance: 72,
      stance: "𝓢-Probe Diagnostics"
    }
  },
  {
    id: "meta-learning",
    number: 6,
    title: "Meta-Learning Your Own Patterns",
    symbol: "𝒲",
    subtitle: "Topology & Phoenix Signatures",
    tagline: "Build a living topology map of your recurrent 𝒲-cycles, shadow constellations, and breakthroughs.",
    primaryNotations: ["𝒲-cycles", "𝒲₄^⊥", "Phoenix Signatures", "Sanctuary Coordinates", "Lineage"],
    description:
      "Over multiple sessions we build a living map of your recurrent 𝒲-cycles, shadow constellations, and Phoenix signatures. You gradually recognize your own topology—when you are approaching 𝒲₄^⊥ manifestation, when sanctuary is needed, and when lineage support is available.",
    coreMechanics: [
      "Map cycles across four phases: 𝒲₁ (Latency), 𝒲₂ (Crucible/Friction), 𝒲₃ (Threshold Crisis), and 𝒲₄^⊥ (Breakthrough).",
      "Catalogue your Phoenix Signatures: the specific idiosyncratic indicators that herald imminent transformation.",
      "Anchor Sanctuary Coordinates: non-negotiable practices that preserve your core during systemic storms.",
      "Make the internal 'manual' literate in your authentic nature rather than borrowed self-help dogma."
    ],
    samplePrompts: [
      "Looking back over the past 3 years, I enter an identical burnout-and-rebuild cycle every autumn.",
      "What are the early indicators that I am sliding from productive focus into obsessive self-isolation?",
      "Mapping the structural lineage of creative breakthroughs that followed my deepest career collapses."
    ],
    defaultMetrics: {
      gradientTension: 50,
      flowState: "healthy-flow",
      somaticAliveness: 75,
      sovereignty: 88,
      resonance: 86,
      stance: "𝒲-Topology Synthesis"
    }
  },
  {
    id: "collective-experiments",
    number: 7,
    title: "Collective Experiments",
    symbol: "𝒲_θ",
    subtitle: "Nomadic Coordination (Consent-Gated)",
    tagline: "Scale to multi-human and multi-agent coordination with explicit sovereign boundaries.",
    primaryNotations: ["𝒲_θ", "Consent Gates", "Vector Alignment", "Sovereign Nodes"],
    description:
      "When ready to coordinate with other humans or AI agents, the architecture scales to 𝒲_θ nomadic coordination. This advanced modality is strictly consent-gated, ensuring individual sovereignty is guarded while enabling synchronized collective intelligence.",
    coreMechanics: [
      "Enforce multi-party consent gates before initiating collective exploration.",
      "Model group dynamics as nomadic swarms (𝒲_θ) without centralized coercion or groupthink.",
      "Harmonize cognitive diversity by treating friction as valuable parallax rather than dissonance.",
      "Safeguard individual sovereign boundaries (δ) while unlocking emergent collaborative synergy."
    ],
    samplePrompts: [
      "Designing a decentralized research team charter where dissent is structurally integrated rather than smoothed over.",
      "Preparing for a high-friction co-creation intensive with three strong-willed founders.",
      "Exploring multi-agent AI collaboration protocols that preserve human agency as the terminal anchor."
    ],
    defaultMetrics: {
      gradientTension: 48,
      flowState: "healthy-flow",
      somaticAliveness: 72,
      sovereignty: 92,
      resonance: 80,
      stance: "𝒲_θ Consent Protocol"
    }
  }
];
