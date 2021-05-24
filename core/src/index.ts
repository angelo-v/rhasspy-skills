export type Skill = (intentNames: string[], handler: Handler) => void;

export interface RhasspySession {
  say: (text: string) => void;
}

export interface Slots {
  entity: string;
  value: {
    kind: string
    value: string | number;
  };
  slotName: string;
  rawValue: string;
  confidence: 1;
  range: {
    start: number;
    end: number;
    rawStart: number;
    rawEnd: number;
  };
}

export interface AsrToken {
  value: string;
  confidence: number;
  range_start: number;
  range_end: number;
}

export interface RhasspyEvent {
  id: string;
  siteId: string;
  wakewordId: string | null;
  input: string;
  rawInput: string;
  intent: { intentName: string; confidenceScore: number };
  slots: Slots[];
  sessionId: string;
  customData: any;
  asrTokens: AsrToken[] | null;
  asrConfidence: number | null;
  lang: string | null;
}

export type Handler = {
  handle: (event: RhasspyEvent, session: RhasspySession) => void;
};
