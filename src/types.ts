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
}

export interface PromptResult {
  styleTags: string;
  promptDescription: string;
  title: string;
  lyrics: string;
  tips: string[];
  isFallback?: boolean;
  fallbackReason?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  config: PromptConfig;
  sampleResult: PromptResult;
}
