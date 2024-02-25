"use client";
import { ChatList } from "./chat-list";
import React from "react";
import { useChat } from "ai/react";

export function Chat() {
  const { input, messages, handleInputChange, handleSubmit } = useChat();
  messages ?? [
    {
      role: "user",
      content: "Hello, I am a user",
    },
  ];

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatList
        messages={messages}
        onSubmit={handleSubmit}
        input={input}
        onInputChange={handleInputChange}
      />
    </div>
  );
}
