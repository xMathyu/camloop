import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/webrtc";
import io, { Socket } from "socket.io-client";

export const useChat = (username: string) => {
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<typeof Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const socket = socketRef.current;

    socket.on("chat-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !username || !socketRef.current) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date(),
    };

    socketRef.current.emit("chat-message", message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    if (chatInputRef.current) {
      chatInputRef.current.focus();
    }
  };

  return {
    chatInputRef,
    chatMessagesRef,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
  };
};
