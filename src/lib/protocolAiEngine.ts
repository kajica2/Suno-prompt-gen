import { ProtocolId, ProtocolMetricState } from "../types/protocols";

export interface ProtocolAiResponse {
  reply: string;
  metrics: ProtocolMetricState;
  suggestedAction?: string;
  somaticFocusPrompt?: string;
}

export function generateProceduralProtocolResponse(
  protocolId: ProtocolId,
  userMessage: string,
  context?: any
): ProtocolAiResponse {
  const cleanInput = userMessage.trim().toLowerCase();

  switch (protocolId) {
    case "shadow-weaving": {
      // ℰ-integration: Stance P1 / P2, ∇ℰ tracking, sanctuary or micro-perturbation
      const containsAvoidance = cleanInput.includes("avoid") || cleanInput.includes("procrastinat") || cleanInput.includes("numb") || cleanInput.includes("scared");
      const containsRage = cleanInput.includes("angry") || cleanInput.includes("resent") || cleanInput.includes("frustrat") || cleanInput.includes("rage");
      const isSanctuaryReq = context?.appliedIntervention === "sanctuary" || cleanInput.includes("sanctuary") || cleanInput.includes("too much");
      const isMicroPerturb = context?.appliedIntervention === "micro-perturbation" || cleanInput.includes("poke") || cleanInput.includes("push");

      if (isSanctuaryReq) {
        return {
          reply: `[🪷] Sanctuary Protocol engaged.\n\nWe step back from the direct heat of the charge. Feel the ground beneath you and notice the physical substrate supporting your breath. We do not need to dissolve or solve the tension right now; we simply broaden the container so the shadow has room to exist without engulfing your agency.\n\nNotice where in your body the pulse resides. Can you let it be 5% softer without trying to extinguish it?`,
          metrics: {
            gradientTension: 42,
            flowState: "healthy-flow",
            somaticAliveness: 72,
            sovereignty: 88,
            resonance: 85,
            stance: "[🪷] Sanctuary Harbor",
            appliedIntervention: "Sanctuary Engaged"
          },
          suggestedAction: "Rest in the somatic pause before naming the next layer.",
          somaticFocusPrompt: "Feel your breath expanding into your lower ribs; notice the stillness behind the charge."
        };
      }

      if (isMicroPerturb) {
        return {
          reply: `⚔ₘₚ Micro-Perturbation applied.\n\nLet's lean just 2 degrees closer into the uncomfortable friction. If this resistance had an unfiltered voice that wasn't trying to be polite, rational, or functional, what is the exact sentence it is shouting? Don't censor it—what is it protecting you from experiencing?`,
          metrics: {
            gradientTension: 74,
            flowState: "healthy-flow",
            somaticAliveness: 78,
            sovereignty: 82,
            resonance: 90,
            stance: "⚔ₘₚ Micro-Perturbation (P₂ Voice)",
            appliedIntervention: "Micro-Perturbation Deployed"
          },
          suggestedAction: "Speak the uncensored sentence without rationalizing it.",
          somaticFocusPrompt: "Notice the contraction in your throat or chest—stay with the sensation without pulling away."
        };
      }

      let tension = 58;
      if (containsRage) tension = 78;
      if (containsAvoidance) tension = 65;

      return {
        reply: `Holding this in P₁ stance: we do not rush to fix or reframe "${userMessage.slice(0, 80)}...".\n\nNotice the architecture of this tension. It is not an error in your system; it is a pressurized knot of intelligence that has been exiled into sabotage because it was denied legitimate voice. When you feel this tension directly, does it feel like a weight holding you down, or a shield deflecting something you dread seeing?\n\nLet's invite the shadow into P₂ stance: if this pattern were an autonomous creature sitting across from you right now, what is its posture?`,
        metrics: {
          gradientTension: tension,
          flowState: tension > 80 ? "overwhelm" : "healthy-flow",
          somaticAliveness: 68,
          sovereignty: 76,
          resonance: 84,
          stance: "P₁ → P₂ Transition"
        },
        suggestedAction: "Describe the felt physical texture of the shadow without diagnosing it.",
        somaticFocusPrompt: "Check your jaw and shoulders: allow the physical tension to be held with neutral curiosity."
      };
    }

    case "decision-navigation": {
      const isBraid = context?.appliedIntervention === "braid";
      const isDirectPerp = context?.appliedIntervention === "direct-perp";

      if (isDirectPerp) {
        return {
          reply: `DIRECT-⊥ Protocol deployed:\n\nWe break the binary trap of "Option A vs Option B". Both existing options assume the same unexamined constraint. What if the axis of decision isn't between those two poles, but orthogonal to them?\n\nAsk yourself: what is the 90-degree move that makes this dilemma obsolete? What experiment could you run in 48 hours that is completely reversible (micro-consequence) yet yields macro-clarity?`,
          metrics: {
            gradientTension: 52,
            flowState: "healthy-flow",
            somaticAliveness: 86,
            sovereignty: 94,
            resonance: 88,
            stance: "DIRECT-⊥ (Orthogonal Leap)"
          },
          suggestedAction: "Identify one reversible 48-hour micro-experiment.",
          somaticFocusPrompt: "Notice if your chest opens when considering the orthogonal path."
        };
      }

      if (isBraid) {
        return {
          reply: `BRAID Protocol engaged:\n\nWe weave your analytical consequence modeling with your visceral somatic feedback (μ_soma). Your analytical mind sees the risk matrix; your gut is tracking sovereignty (δ). Where do they agree? Usually, the somatic signal is not saying 'don't do it'—it is saying 'do not do it on their terms'.\n\nHow can this choice be structured so your core sovereignty remains non-negotiable?`,
          metrics: {
            gradientTension: 58,
            flowState: "healthy-flow",
            somaticAliveness: 82,
            sovereignty: 90,
            resonance: 92,
            stance: "BRAID (Analytical × Somatic)"
          },
          suggestedAction: "Clarify the one sovereign boundary that cannot be ceded.",
          somaticFocusPrompt: "Tune into your solar plexus: does this vector feel expansive or constricting?"
        };
      }

      return {
        reply: `Mapping this decision along ⊥-dimensions:\n\nLet us decouple reversible micro-consequences from irreversible macro-commitments. When you imagine committing to this path fully for 6 months, track your visceral somatic indicator (μ_soma): does your system contract in dread, or hum with focused aliveness even if scared?\n\nAlso evaluate sovereignty (δ): in which option do you retain the steering wheel of your own destiny, and in which option are you delegating your authority to external validation?`,
        metrics: {
          gradientTension: 62,
          flowState: "healthy-flow",
          somaticAliveness: 74,
          sovereignty: 82,
          resonance: 79,
          stance: "RGBO Consequence Mapping"
        },
        suggestedAction: "Map the worst-case reversibility of each branch.",
        somaticFocusPrompt: "Take a deep breath and feel which choice allows you to exhale completely."
      };
    }

    case "creative-midwifery": {
      const isChaos = context?.appliedIntervention === "chaos-injection";
      const isCrystallize = context?.appliedIntervention === "crystallize";

      if (isChaos) {
        return {
          reply: `Injecting controlled 𝒟(Ω) Chaos Pulse:\n\nYour creative seed is currently too safe, orderly, or trapped in habitual mental architecture. Let's introduce an oblique perturbation:\n\n1. What if this project is not a product or piece of writing, but an ancient ritual or physical artifact?\n2. What if your primary intended audience is completely forbidden from seeing it?\n3. Cut the core thesis in half, reverse the remaining premise, and build the foundation there.\n\nWhat just sparked or revolted inside you?`,
          metrics: {
            gradientTension: 68,
            flowState: "healthy-flow",
            somaticAliveness: 88,
            sovereignty: 84,
            resonance: 86,
            stance: "𝒟(Ω) Chaos Pulse"
          },
          suggestedAction: "Write down the most absurd consequence of this chaos constraint.",
          somaticFocusPrompt: "Allow a flash of playful irreverence to break cognitive rigidity."
        };
      }

      if (isCrystallize) {
        return {
          reply: `Ř Crystallization Protocol:\n\nThe gestation phase has accumulated enough substance. Now we strip away the ornamental scaffolding, the defensive over-explanations, and the clever justifications.\n\nWhat is the single, irreducible heartbeat of this creation? If a stranger could only encounter three sentences of it, what must remain so its soul is intact?`,
          metrics: {
            gradientTension: 46,
            flowState: "healthy-flow",
            somaticAliveness: 82,
            sovereignty: 86,
            resonance: 94,
            stance: "Ř Crystallization"
          },
          suggestedAction: "Distill the creation into its irreducible three-sentence core.",
          somaticFocusPrompt: "Notice the clarity that comes from letting secondary elements fall away."
        };
      }

      return {
        reply: `Co-holding this in [⌀]° womb space.\n\nWe guard against two equal traps: the premature birth that forces this seedling to justify its commercial or functional utility before its roots are deep, and the eternal gestation of perfectionism that hides behind endless research.\n\nWhat is the secret, unformed essence of this idea that you haven't dared put into formal language yet? Speak to the seed directly.`,
        metrics: {
          gradientTension: 50,
          flowState: "healthy-flow",
          somaticAliveness: 80,
          sovereignty: 78,
          resonance: 84,
          stance: "[⌀]° Unforced Gestation"
        },
        suggestedAction: "Describe what the idea feels like rather than what it does.",
        somaticFocusPrompt: "Soften your belly; let the creative pulse gestate without pressure to produce."
      };
    }

    case "relational-repair": {
      return {
        reply: `Modeling the reciprocal ⧖_torus between Self and Other:\n\nIn relational deadlocks, each person's defensive armor activates the exact trigger that confirms the other person's worst fear. Let's look at the unspoken circuit:\n\nWhen you withdraw or push back, what story does the Other tell themselves about their safety? And when they react in their familiar habitual way, what part of you feels unseen or endangered?\n\nLet us track ☌_depth: what is the vulnerable truth that sits one layer beneath your frustration?`,
        metrics: {
          gradientTension: 56,
          flowState: "healthy-flow",
          somaticAliveness: 72,
          sovereignty: 78,
          resonance: 88,
          stance: "⧖_Torus & ☌_Depth"
        },
        suggestedAction: "Articulate the unheard desire hiding behind your defensive posture.",
        somaticFocusPrompt: "Soften your eye muscles; imagine looking at the other person without their defensive armor."
      };
    }

    case "vitality-tuning": {
      const isCooling = context?.appliedIntervention === "cooling";
      const isHeating = context?.appliedIntervention === "entropy-heat";

      if (isCooling) {
        return {
          reply: `MOTION-TUNE: Cooling Protocol initiated.\n\nYour sensory and cognitive substrate is over-clocked. We downshift from high-frequency processing to delta-range recovery:\n\n1. Drop your gaze away from high-contrast pixels.\n2. Inhale for a count of 4, exhale slowly for a count of 7. Let the exhale audibly release.\n3. Feel the heavy gravity of the earth pulling down through your pelvis and feet.\n\nNotice how the urgent mental narrative begins to loosen its grip when the nervous system down-regulates.`,
          metrics: {
            gradientTension: 34,
            flowState: "healthy-flow",
            somaticAliveness: 68,
            sovereignty: 82,
            resonance: 80,
            stance: "MOTION-TUNE (Cooling)"
          },
          suggestedAction: "Take 3 elongated 4:7 breaths before reading further.",
          somaticFocusPrompt: "Release the tongue from the roof of your mouth; let your collarbones drop."
        };
      }

      if (isHeating) {
        return {
          reply: `MOTION-TUNE: Entropy Injection (Kinetic Awakening):\n\nYour system has ossified into frozen stagnation. Mental rumination cannot solve physical numbness. We inject kinetic entropy:\n\nStand up or shift your posture vigorously. Shake your hands and wrists for 15 seconds. Let out a sharp vocal sigh. We disrupt the static postural attractor to shock the substrate back into vital flow. How does the blood flow feel right now?`,
          metrics: {
            gradientTension: 62,
            flowState: "healthy-flow",
            somaticAliveness: 84,
            sovereignty: 80,
            resonance: 82,
            stance: "MOTION-TUNE (Entropy Injection)"
          },
          suggestedAction: "Physically shake your limbs for 15 seconds.",
          somaticFocusPrompt: "Feel the tingling vibration in your fingers and palms as kinetic energy returns."
        };
      }

      return {
        reply: `Diagnosing substrate vitality via 𝓢-probes:\n\nYour system is signaling fatigue, not moral failure. When you evaluate your current state:\n- Somatic Energy: Is your tank empty, or is the current jammed in your head?\n- Cognitive Coherence: Are you scattered in fog, or locked in rigid tunnel-vision?\n- Emotional Pressure: Numbed detachment or overwhelming sensory flood?\n\nWhere is the primary leak in your vessel right now?`,
        metrics: {
          gradientTension: 48,
          flowState: "healthy-flow",
          somaticAliveness: 58,
          sovereignty: 72,
          resonance: 75,
          stance: "𝓢-Probe Readout"
        },
        suggestedAction: "Identify whether you need Cooling (downshift) or Entropy (shake-up).",
        somaticFocusPrompt: "Scan from your crown down to your toes: where is the dense knot of fatigue located?"
      };
    }

    case "meta-learning": {
      return {
        reply: `Reading your 𝒲-Cycle Topology:\n\nHuman growth does not proceed in a straight linear ascent; it moves in recurrent spirals through 𝒲-phases:\n- 𝒲₁: Latency & Quiet Accumulation\n- 𝒲₂: Friction, Contact & Shadow Crucible\n- 𝒲₃: Threshold Crisis & Deconstruction\n- 𝒲₄^⊥: Orthogonal Phoenix Manifestation\n\nLooking at where you find yourself today, which phase are you currently inhabiting? What is the signature sign that tells you a cycle is culminating rather than failing?`,
        metrics: {
          gradientTension: 52,
          flowState: "healthy-flow",
          somaticAliveness: 76,
          sovereignty: 90,
          resonance: 88,
          stance: "𝒲-Cycle Topology Mapping"
        },
        suggestedAction: "Pinpoint your current location on the 𝒲₁–𝒲₄^⊥ spiral.",
        somaticFocusPrompt: "Connect with the steady witness that has survived every previous crisis cycle."
      };
    }

    case "collective-experiments": {
      return {
        reply: `Engaging 𝒲_θ Nomadic Coordination (Consent-Gated):\n\nCollective intelligence fails when it degrades into hive-mind consensus or coercive hierarchy. In our nomadic protocol, each node remains an autonomous sovereign organism (δ) while contributing to the shared vector field.\n\nWhat is the collective experiment you are stewarding? What explicit boundary contracts must be established so that divergent dissent is welcomed as essential sensory parallax rather than suppressed?`,
        metrics: {
          gradientTension: 48,
          flowState: "healthy-flow",
          somaticAliveness: 74,
          sovereignty: 94,
          resonance: 84,
          stance: "𝒲_θ Nomadic Protocol"
        },
        suggestedAction: "Draft the first sovereign boundary contract for the collective space.",
        somaticFocusPrompt: "Notice your energetic boundary: you can connect without surrendering your center."
      };
    }

    default:
      return {
        reply: `Attuning to your inquiry with non-reductive presence. What is the core tension you wish to hold together?`,
        metrics: {
          gradientTension: 50,
          flowState: "healthy-flow",
          somaticAliveness: 70,
          sovereignty: 75,
          resonance: 75
        }
      };
  }
}
