/**
 * Harmonic Progression JSON Exporter
 * Formats harmonic sequences into clean, industry-standard JSON structures
 * for import into external DAWs (Ableton, Logic, Reaper, FL Studio)
 * and music notation / composition software (MuseScore, Sibelius, Dorico, Tone.js, Python mido/pretty_midi).
 */

export interface ChordProgressionEvent {
  step: number;
  name: string;
  romanNumeral?: string;
  functionalRole?: string;
  root: string;
  bass?: string;
  midiNotes: number[];
  noteNames: string[];
  pitchClasses: number[];
  frequenciesHz: number[];
  startBeat: number;
  durationBeats: number;
  startTick: number; // Standard PPQ = 480
  durationTicks: number;
  velocity: number;
  voicingDescription?: string;
}

export interface HarmonicFrameworkExportJSON {
  format: "HarmonicStudyEngine_Progression_v1";
  frameworkId: string;
  frameworkName: string;
  theoreticalApproach: string;
  key: string;
  scaleOrMode: string;
  tempoBPM: number;
  timeSignature: string;
  ppq: number; // Pulses Per Quarter Note (standard 480)
  totalBeats: number;
  totalBars: number;
  exportedAt: string;
  source: string;
  softwareCompatibility: string[];
  dawImportInstructions: {
    abletonLive: string;
    logicPro: string;
    reaper: string;
    flStudio: string;
    musescoreAndNotation: string;
    codeAndScripting: string;
  };
  summary: {
    chordCount: number;
    pitchRange: {
      minMidi: number;
      maxMidi: number;
      minNote: string;
      maxNote: string;
    };
    allPitchClassesUsed: number[];
  };
  progression: ChordProgressionEvent[];
}

const NOTE_NAMES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function midiToNoteName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  const name = NOTE_NAMES[midi % 12];
  return `${name}${octave}`;
}

export function midiToPitchClass(midi: number): number {
  return midi % 12;
}

export function midiToFrequency(midi: number): number {
  return parseFloat((440 * Math.pow(2, (midi - 69) / 12)).toFixed(2));
}

const DAW_INSTRUCTIONS = {
  abletonLive: "Import via Max for Live MIDI Tool or Python MIDI script; use 'midiNotes' and 'startBeat' for Clip sequencing.",
  logicPro: "Paste chord MIDI numbers into Logic Pro Scripter MIDI plugin or import into Chord Track via AppleScript.",
  reaper: "Run ReaScript (Python/Lua) to populate MIDI take items using 'midiNotes', 'startTick', and 'durationTicks'.",
  flStudio: "Import as MIDI event list or use Piano Roll script generator targeting 'midiNotes' pitch numbers.",
  musescoreAndNotation: "Import into MuseScore 4 / Sibelius / Dorico via MusicXML generator script or JSON-to-score plugin.",
  codeAndScripting: "Directly consumable by Tone.js (Part / PolySynth), Web Audio API, Python pretty_midi / music21 / mido, and Sonic Pi."
};

const COMPATIBILITY_LIST = [
  "Ableton Live (MIDI / Max for Live)",
  "Apple Logic Pro (Scripter / MIDI)",
  "Cockos Reaper (ReaScript Python/Lua)",
  "FL Studio (Piano Roll Script)",
  "MuseScore 4 / Sibelius / Dorico (Music21)",
  "Tone.js / Web Audio API",
  "Python pretty_midi & mido",
  "Sonic Pi / SuperCollider"
];

interface FrameworkStateParams {
  jazzVoicingType?: "drop2" | "minimum" | "root";
  selectedAxisPole?: "C" | "F#" | "Eb" | "A";
  neoCurrentChord?: { name: string; notes: number[]; triad: string };
  neoHistory?: string[];
}

export function generateHarmonicProgressionJSON(
  frameworkId: string,
  params?: FrameworkStateParams
): HarmonicFrameworkExportJSON {
  const PPQ = 480; // Standard MIDI pulses per quarter note
  let frameworkName = "Functional Tonality";
  let theoreticalApproach = "Common-Practice Tonic-Dominant Polarity";
  let key = "C Major";
  let scaleOrMode = "Major (Ionian)";
  let tempoBPM = 96;
  const timeSignature = "4/4";
  let rawChords: {
    name: string;
    roman: string;
    role: string;
    root: string;
    bass?: string;
    notes: number[];
    beats: number;
    voicing: string;
  }[] = [];

  if (frameworkId === "jazz") {
    frameworkName = "Jazz Harmony & II-V-I Cadence";
    theoreticalApproach = "Extended & Altered Chord Function with Half-Step Voice Leading";
    key = "C Major";
    tempoBPM = 120;
    const voicing = params?.jazzVoicingType || "minimum";

    if (voicing === "minimum") {
      rawChords = [
        {
          name: "Dm7",
          roman: "ii⁷",
          role: "Pre-Dominant (Preparation)",
          root: "D",
          bass: "C",
          notes: [60, 65, 69, 74], // C4, F4, A4, D5
          beats: 4,
          voicing: "Minimum-Motion (Smooth Voice Leading)"
        },
        {
          name: "G7",
          roman: "V⁷",
          role: "Dominant (Seventh C drops to B, 3rd F held invariant)",
          root: "G",
          bass: "B",
          notes: [59, 65, 67, 74], // B3, F4, G4, D5
          beats: 4,
          voicing: "Minimum-Motion (Voice-Led V7)"
        },
        {
          name: "Cmaj7",
          roman: "IΔ",
          role: "Tonic Resolution (Seventh F drops to 3rd E)",
          root: "C",
          bass: "B",
          notes: [59, 64, 67, 72], // B3, E4, G4, C5
          beats: 4,
          voicing: "Minimum-Motion (Resolved Tonic)"
        }
      ];
    } else if (voicing === "drop2") {
      rawChords = [
        {
          name: "Dm7",
          roman: "ii⁷",
          role: "Pre-Dominant",
          root: "D",
          bass: "F",
          notes: [53, 62, 65, 69], // F3, D4, F4, A4
          beats: 4,
          voicing: "Drop-2 Voicing (2nd voice from top dropped an octave)"
        },
        {
          name: "G7",
          roman: "V⁷",
          role: "Dominant",
          root: "G",
          bass: "G",
          notes: [55, 62, 65, 71], // G3, D4, F4, B4
          beats: 4,
          voicing: "Drop-2 Voicing"
        },
        {
          name: "Cmaj7",
          roman: "IΔ",
          role: "Tonic Resolution",
          root: "C",
          bass: "E",
          notes: [52, 60, 64, 71], // E3, C4, E4, B4
          beats: 4,
          voicing: "Drop-2 Voicing"
        }
      ];
    } else {
      // Root position
      rawChords = [
        {
          name: "Dm7",
          roman: "ii⁷",
          role: "Pre-Dominant",
          root: "D",
          bass: "D",
          notes: [62, 65, 69, 72], // D4, F4, A4, C5
          beats: 4,
          voicing: "Root Position"
        },
        {
          name: "G7",
          roman: "V⁷",
          role: "Dominant",
          root: "G",
          bass: "G",
          notes: [55, 59, 62, 65], // G3, B3, D4, F4
          beats: 4,
          voicing: "Root Position"
        },
        {
          name: "Cmaj7",
          roman: "IΔ",
          role: "Tonic Resolution",
          root: "C",
          bass: "C",
          notes: [60, 64, 67, 71], // C4, E4, G4, B4
          beats: 4,
          voicing: "Root Position"
        }
      ];
    }
  } else if (frameworkId === "bartok") {
    frameworkName = "Bartók Symmetrical Axis System";
    theoreticalApproach = "Lendvai Axis System Organised by Tritone & Minor Third Polarity";
    key = "C Tonic Axis (C - Eb - F# - A)";
    scaleOrMode = "Octatonic / Symmetrical";
    tempoBPM = 104;

    rawChords = [
      {
        name: "C Major",
        roman: "Tonic (Primary Pole)",
        role: "Primary Axis Ground",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67], // C3, C4, E4, G4
        beats: 4,
        voicing: "Tonic Axis Primary Pole"
      },
      {
        name: "F# Major",
        roman: "Counterpole (Tritone)",
        role: "Tritone Polar Substitution (Same functional branch without dominant prep)",
        root: "F#",
        bass: "F#",
        notes: [54, 66, 70, 73], // F#3, F#4, A#4, C#5
        beats: 4,
        voicing: "Tritone Counterpole"
      },
      {
        name: "Eb Major",
        roman: "Tonic Axis Branch",
        role: "Relative Minor-Third Pole Substitute",
        root: "Eb",
        bass: "Eb",
        notes: [51, 63, 67, 70], // Eb3, Eb4, G4, Bb4
        beats: 4,
        voicing: "Minor-Third Polar Branch"
      },
      {
        name: "A Major",
        roman: "Tonic Axis Branch",
        role: "Relative Minor-Third Counterpole Substitute",
        root: "A",
        bass: "A",
        notes: [57, 69, 73, 76], // A3, A4, C#5, E5
        beats: 4,
        voicing: "Minor-Third Polar Branch"
      },
      {
        name: "C Major",
        roman: "Tonic Axis Return",
        role: "Final Rest on Primary Pole",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67, 72],
        beats: 4,
        voicing: "Full Axis Resolution"
      }
    ];
  } else if (frameworkId === "schenker") {
    frameworkName = "Schenkerian Prolongation & Ursatz";
    theoreticalApproach = "Hierarchical Levels (Vordergrund, Mittelgrund, Hintergrund) & Urlinie 3̂-2̂-1̂";
    key = "C Major";
    tempoBPM = 72;

    rawChords = [
      {
        name: "C Major (Urlinie 3̂)",
        roman: "I (Hintergrund)",
        role: "Background Tonic with Urlinie Kopfton 3̂ (E5)",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67, 76], // C3, C4, E4, G4, E5 (3̂)
        beats: 4,
        voicing: "Ursatz Tonic Initiation"
      },
      {
        name: "Dm7 / F (Passing Mittelgrund)",
        roman: "ii⁶ / IV",
        role: "Middleground Prolongation & Voice-Leading Expansion",
        root: "D",
        bass: "F",
        notes: [53, 60, 62, 65, 74], // F3, C4, D4, F4, D5
        beats: 4,
        voicing: "Contrapuntal Prolongation"
      },
      {
        name: "G Major (Urlinie 2̂)",
        roman: "V (Hintergrund)",
        role: "Background Dominant Divider with Urlinie 2̂ (D5)",
        root: "G",
        bass: "G",
        notes: [55, 59, 62, 67, 74], // G3, B3, D4, G4, D5 (2̂)
        beats: 4,
        voicing: "Ursatz Dominant Divider"
      },
      {
        name: "C Major (Urlinie 1̂)",
        roman: "I (Hintergrund)",
        role: "Background Tonic Final Closure with Urlinie 1̂ (C5)",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67, 72], // C3, C4, E4, G4, C5 (1̂)
        beats: 4,
        voicing: "Ursatz Tonic Closure"
      }
    ];
  } else if (frameworkId === "neoriemannian") {
    frameworkName = "Neo-Riemannian Theory & Tonnetz";
    theoreticalApproach = "Parsimonious Voice Leading via P (Parallel), L (Leittonwechsel), and R (Relative) Transformations";
    key = "Non-Tonal Triadic Space";
    scaleOrMode = "Chromatic Tonnetz";
    tempoBPM = 84;

    const currentNotes = params?.neoCurrentChord?.notes || [60, 64, 67];
    const currentName = params?.neoCurrentChord?.name || "C Major";

    // Build parsimonious sequence based on state / history
    rawChords = [
      {
        name: "C Major",
        roman: "Triad [0]",
        role: "Initial Consonant Triad",
        root: "C",
        bass: "C",
        notes: [60, 64, 67],
        beats: 4,
        voicing: "Root Position Triad"
      },
      {
        name: "C Minor",
        roman: "P (Parallel)",
        role: "Parallel Transformation: 3rd moves by half-step (E4 -> Eb4)",
        root: "C",
        bass: "C",
        notes: [60, 63, 67],
        beats: 4,
        voicing: "Parsimonious Step (Holding C & G invariant)"
      },
      {
        name: "Eb Major",
        roman: "R (Relative)",
        role: "Relative Transformation: 5th moves by whole-step (G4 -> Bb4)",
        root: "Eb",
        bass: "Eb",
        notes: [51, 63, 67, 70],
        beats: 4,
        voicing: "Parsimonious Step (Holding Eb & G invariant)"
      },
      {
        name: "G Minor",
        roman: "L (Leittonwechsel)",
        role: "Leading-Tone Exchange: Root moves by half-step (Eb -> D)",
        root: "G",
        bass: "D",
        notes: [55, 62, 67, 70],
        beats: 4,
        voicing: "Parsimonious Step"
      }
    ];

    // If current chord is different from last, append current active chord
    if (currentName !== "G Minor") {
      rawChords.push({
        name: currentName,
        roman: "Active Tonnetz Node",
        role: "User Interactive Transformation State",
        root: currentName.split(" ")[0],
        bass: midiToNoteName(currentNotes[0]).replace(/\d/, ""),
        notes: currentNotes,
        beats: 4,
        voicing: "Current Transformed Triad"
      });
    }
  } else if (frameworkId === "settheory") {
    frameworkName = "Pitch-Class Set Theory (Allen Forte)";
    theoreticalApproach = "Post-Tonal Pitch-Class Sets, Octatonic Collections & Interval-Class Vectors";
    key = "Non-Tonal / Octatonic";
    scaleOrMode = "Octatonic Collection (C, C#, D#, E, F#, G, A, A#)";
    tempoBPM = 112;

    rawChords = [
      {
        name: "C Major Triad",
        roman: "Forte 3-11B [0, 4, 7]",
        role: "Tonal Component A (Pitch classes 0, 4, 7)",
        root: "C",
        bass: "C",
        notes: [60, 64, 67],
        beats: 4,
        voicing: "Set Element 1"
      },
      {
        name: "F# Major Triad",
        roman: "Forte 3-11B [6, 10, 1]",
        role: "Tonal Component B (Pitch classes 6, 10, 1 - Tritone Transposition)",
        root: "F#",
        bass: "F#",
        notes: [66, 70, 73],
        beats: 4,
        voicing: "Set Element 2"
      },
      {
        name: "Petrushka Bitonal Octatonic Chord",
        roman: "Forte 6-30 [0, 1, 4, 6, 7, 10]",
        role: "Union of C Major + F# Major; Interval Vector <2, 2, 4, 2, 2, 3>",
        root: "C/F#",
        bass: "C",
        notes: [60, 64, 67, 66, 70, 73],
        beats: 4,
        voicing: "Symmetrical Octatonic Hexachord"
      },
      {
        name: "All-Interval Tetrachord",
        roman: "Forte 4-19 [0, 1, 4, 8]",
        role: "Contains interval classes 1 through 6 in compact prime form",
        root: "C",
        bass: "C",
        notes: [60, 61, 64, 68],
        beats: 4,
        voicing: "Prime Form Tetrachord"
      }
    ];
  } else if (frameworkId === "scientific") {
    frameworkName = "Scientific Psychoacoustics & Spectral Harmonics";
    theoreticalApproach = "Overtone Series, Fourier Partials & Plomp-Levelt Sensory Roughness Modeling";
    key = "C Fundamental (C2 = 65.4 Hz)";
    scaleOrMode = "Harmonic Series (Partials 1 to 16)";
    tempoBPM = 68;

    rawChords = [
      {
        name: "Fundamental & Octave (Partials 1-2)",
        roman: "Harmonics 1, 2",
        role: "Grounding Anchor (0 cents roughness, maximum sensory consonance)",
        root: "C",
        bass: "C",
        notes: [36, 48], // C2, C3
        beats: 4,
        voicing: "Pure Acoustic Anchor"
      },
      {
        name: "Triadic Core (Partials 3, 4, 5, 6)",
        roman: "Harmonics 3-6",
        role: "Just Major Triad (5th G3, 3rd E4 14 cents flat compared to 12-TET)",
        root: "C",
        bass: "C",
        notes: [48, 55, 60, 64, 67], // C3, G3, C4, E4, G4
        beats: 4,
        voicing: "Just Intonation Core Triad"
      },
      {
        name: "Spectral Seventh Chord (Partials 7-8)",
        roman: "Harmonic 7 (31 cents flat)",
        role: "Natural Seventh (267 Hz / Bb4), smooth acoustic blending",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67, 70], // Bb4
        beats: 4,
        voicing: "Spectral Subdominant Tendency"
      },
      {
        name: "Full Spectral Resonant Chord (Partials 1-12)",
        roman: "Spectral Chord",
        role: "High Partials (9=D5, 10=E5, 11=F#5 -49c, 12=G5) generating iridescent shimmer",
        root: "C",
        bass: "C",
        notes: [36, 48, 55, 60, 64, 67, 70, 72, 74, 76, 78, 79],
        beats: 8,
        voicing: "Full Overtone Series Cloud"
      }
    ];
  } else if (frameworkId === "prompts") {
    // Grand Medley
    frameworkName = "Grand Harmonic Medley (All 6 Traditions)";
    theoreticalApproach = "Polystylistic Progression Through All 6 Analytical Traditions in 1 Sequence";
    key = "C Major / Multi-Polar";
    scaleOrMode = "Composite Polystylistic";
    tempoBPM = 100;

    rawChords = [
      {
        name: "Baroque Cadence: I - IV - V7 - I",
        roman: "I - IV - V⁷ - I",
        role: "Tradition 1: Functional Tonality",
        root: "C",
        bass: "C",
        notes: [48, 53, 55, 60, 64, 67],
        beats: 4,
        voicing: "Harpsichord & Strings Choral Cadence"
      },
      {
        name: "Jazz II-V-I: Dm7 -> G7 -> Cmaj7",
        roman: "ii⁷ → V⁷ → IΔ",
        role: "Tradition 2: Jazz Voice Leading",
        root: "D/G/C",
        bass: "D",
        notes: [60, 65, 69, 74],
        beats: 4,
        voicing: "Drop-2 Rhodes & Upright Bass"
      },
      {
        name: "Bartók Axis: C Major <-> F# Major",
        roman: "Tonic ↔ Counterpole",
        role: "Tradition 3: Symmetrical Tritone Opposites",
        root: "C / F#",
        bass: "C",
        notes: [48, 54, 60, 66, 70, 73],
        beats: 4,
        voicing: "String Quartet Polar Axis"
      },
      {
        name: "Neo-Riemannian: C Maj -> C min -> Eb Maj",
        roman: "P → R Transform",
        role: "Tradition 4: Parsimonious Common-Tone Shifts",
        root: "C / Eb",
        bass: "C",
        notes: [60, 63, 67, 70],
        beats: 4,
        voicing: "Ambient Pads & French Horns"
      },
      {
        name: "Atonal: Petrushka Chord [0, 1, 4, 6, 7, 10]",
        roman: "Forte 6-30",
        role: "Tradition 5: Pitch-Class Set Theory",
        root: "C/F#",
        bass: "C",
        notes: [60, 64, 67, 66, 70, 73],
        beats: 4,
        voicing: "Prepared Piano & Wind Octatonic Set"
      },
      {
        name: "Spectral: Harmonic Overtone Series on C",
        roman: "Partials 1-12",
        role: "Tradition 6: Psychoacoustic Overtones",
        root: "C",
        bass: "C",
        notes: [36, 48, 55, 60, 64, 67, 70, 72, 74, 76, 78, 79],
        beats: 8,
        voicing: "Spectral Drones & Ethereal Resonance"
      }
    ];
  } else {
    // Default Functional Tonality (IV - V7 - I)
    rawChords = [
      {
        name: "C Major",
        roman: "I",
        role: "Tonic (Rest & Grounding)",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67],
        beats: 4,
        voicing: "Four-Part Vocal / Chamber Strings"
      },
      {
        name: "F Major",
        roman: "IV",
        role: "Subdominant (Harmonic Preparation)",
        root: "F",
        bass: "F",
        notes: [53, 57, 60, 65],
        beats: 4,
        voicing: "Four-Part Vocal / Chamber Strings"
      },
      {
        name: "G7",
        roman: "V⁷",
        role: "Dominant Seventh (Maximum Tension & Leading Tone B)",
        root: "G",
        bass: "G",
        notes: [55, 59, 62, 65],
        beats: 4,
        voicing: "Leading-Tone Seventh Chord"
      },
      {
        name: "C Major",
        roman: "I",
        role: "Tonic (Complete Resolution)",
        root: "C",
        bass: "C",
        notes: [48, 60, 64, 67, 72],
        beats: 4,
        voicing: "Final Authenticated Resolution"
      }
    ];
  }

  // Calculate timeline and summary stats
  let currentBeat = 0;
  const allMidiNotes: number[] = [];
  const pitchClassesSet = new Set<number>();

  const progression: ChordProgressionEvent[] = rawChords.map((chord, index) => {
    const startBeat = currentBeat;
    const durationBeats = chord.beats;
    const startTick = Math.round(startBeat * PPQ);
    const durationTicks = Math.round(durationBeats * PPQ);
    currentBeat += durationBeats;

    chord.notes.forEach(n => {
      allMidiNotes.push(n);
      pitchClassesSet.add(midiToPitchClass(n));
    });

    return {
      step: index + 1,
      name: chord.name,
      romanNumeral: chord.roman,
      functionalRole: chord.role,
      root: chord.root,
      bass: chord.bass || chord.root,
      midiNotes: chord.notes,
      noteNames: chord.notes.map(midiToNoteName),
      pitchClasses: chord.notes.map(midiToPitchClass),
      frequenciesHz: chord.notes.map(midiToFrequency),
      startBeat,
      durationBeats,
      startTick,
      durationTicks,
      velocity: 90,
      voicingDescription: chord.voicing
    };
  });

  const minMidi = Math.min(...allMidiNotes);
  const maxMidi = Math.max(...allMidiNotes);
  const totalBeats = currentBeat;
  const totalBars = Math.ceil(totalBeats / 4);

  return {
    format: "HarmonicStudyEngine_Progression_v1",
    frameworkId,
    frameworkName,
    theoreticalApproach,
    key,
    scaleOrMode,
    tempoBPM,
    timeSignature,
    ppq: PPQ,
    totalBeats,
    totalBars,
    exportedAt: new Date().toISOString(),
    source: "Shine in Peace - Harmonic Study Engine",
    softwareCompatibility: COMPATIBILITY_LIST,
    dawImportInstructions: DAW_INSTRUCTIONS,
    summary: {
      chordCount: progression.length,
      pitchRange: {
        minMidi,
        maxMidi,
        minNote: midiToNoteName(minMidi),
        maxNote: midiToNoteName(maxMidi)
      },
      allPitchClassesUsed: Array.from(pitchClassesSet).sort((a, b) => a - b)
    },
    progression
  };
}

/**
 * Initiates browser download of JSON file
 */
export function downloadProgressionJSON(
  frameworkId: string,
  params?: FrameworkStateParams
): { filename: string; jsonData: HarmonicFrameworkExportJSON } {
  const jsonData = generateHarmonicProgressionJSON(frameworkId, params);
  const sanitizedId = frameworkId.replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase();
  const filename = `harmonic_progression_${sanitizedId}.json`;
  
  const jsonStr = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  return { filename, jsonData };
}
