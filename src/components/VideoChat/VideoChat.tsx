"use client";

import { useState } from "react";
import { useWebRTC } from "@/hooks/useWebRTC";
import { useChat } from "@/hooks/useChat";
import { UsernameForm } from "./UsernameForm";
import { VideoSection } from "./VideoSection";
import { ChatSection } from "./ChatSection";
export default function VideoChat() {
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);

  const {
    localVideoRef,
    remoteVideoRef,
    isConnected,
    isStreaming,
    connectionError,
    startVideo,
    stopVideo,
    findPartner,
  } = useWebRTC();

  const {
    chatInputRef,
    chatMessagesRef,
    messages,
    newMessage,
    setNewMessage,
    handleSendMessage,
  } = useChat(username);

  const setUsernameHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsUsernameSet(true);
    }
  };

  if (!isUsernameSet) {
    return (
      <UsernameForm
        username={username}
        setUsername={setUsername}
        onSubmit={setUsernameHandler}
      />
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center items-stretch">
      <VideoSection
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        isStreaming={isStreaming}
        isConnected={isConnected}
        connectionError={connectionError}
        onStartVideo={startVideo}
        onStopVideo={stopVideo}
        onFindPartner={findPartner}
      />
      <ChatSection
        chatInputRef={chatInputRef}
        chatMessagesRef={chatMessagesRef}
        messages={messages}
        newMessage={newMessage}
        username={username}
        onNewMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
