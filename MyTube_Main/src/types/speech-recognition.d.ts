//This File is create by GROK AI

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any)
    | null;
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any)
    | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}
interface Window {
  SpeechRecognition: typeof SpeechRecognition | undefined;
  webkitSpeechRecognition: typeof SpeechRecognition | undefined;
}
declare var SpeechRecognition: typeof SpeechRecognition | undefined;
declare var webkitSpeechRecognition: typeof SpeechRecognition | undefined;
