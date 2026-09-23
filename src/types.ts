export interface PromptConfig {
  subtheme: string;
  genre: string;
  mood: string;
  tempo: string;
  vocalType: string;
  instruments: string;
  structure: string;
  enableRoomTone?: boolean;
  roomTone?: string;
  negativePrompt?: string;
  appendExclusionsToStyle?: boolean;
}

export interface PromptResult {
  styleTags: string;
  promptDescription: string;
  title: string;
  lyrics: string;
  tips: string[];
  isFallback?: boolean;
  fallbackReason?: string;
  negativePrompt?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: PromptConfig;
  sampleResult: PromptResult;
}

export interface BreedStyleParent {
  name: string;
  styleTags: string;
  instrumentation: string;
  tempo?: string;
  meter?: string;
  negativePrompt?: string;
  structureSnippet?: string;
}

export interface BreedStylesRequest {
  parentA: BreedStyleParent;
  parentB: BreedStyleParent;
  ratio: number; // 0 to 100 (percentage influence of Parent A vs Parent B)
  hybridMode: "harmonic_fusion" | "rhythmic_crossbreed" | "contrast_chasm" | "polymetric_hybrid" | "custom";
  targetMeter?: string;
  mutationFactor?: number; // 0 (strict genetic blend) to 100 (wild experimental mutations)
  additionalDesires?: string;
}

export interface BreedStylesResult {
  childTitle: string;
  hybridName: string;
  geneticBreakdown: {
    inheritedFromA: string[];
    inheritedFromB: string[];
    mutations: string[];
  };
  styleTags: string;
  promptDescription: string;
  tempoDesc: string;
  meter: string;
  arrangementPrompt: string;
  negativePrompt: string;
  suggestedConfig: PromptConfig;
  tips: string[];
  isFallback?: boolean;
}

