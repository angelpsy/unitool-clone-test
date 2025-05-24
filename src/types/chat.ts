export type MessageType = 'user' | 'ai';

export interface Message {
  id: string;
  text: string;
  from: MessageType;
  timestamp: number;
}

export type ChatStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export type ChatEvent = 'set_language' | 'user_input' | 'ai_input' | 'error';

export interface SetLanguagePayload {
  language: 'ru' | 'en';
}

export interface UserInputPayload {
  text: string;
}

export interface AiInputPayload {
  text: string;
}

export interface ErrorPayload {
  message: string;
}

export interface ChatState {
  messages: Message[];
  status: ChatStatus;
  errorMessage: string | null;
  language: 'ru' | 'en';
}
