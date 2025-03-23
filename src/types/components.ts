import { FormEvent, RefObject } from "react";
import { Message } from "./webrtc";

export interface ChatSectionProps {
  chatInputRef: RefObject<HTMLInputElement>;
  chatMessagesRef: RefObject<HTMLDivElement>;
  messages: Message[];
  newMessage: string;
  username: string;
  onNewMessageChange: (value: string) => void;
  onSendMessage: (e: FormEvent<HTMLFormElement>) => void;
}

export interface UsernameFormProps {
  username: string;
  setUsername: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
