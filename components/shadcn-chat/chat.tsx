"use client";
import { ChatList } from "./chat-list";
import React, { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import { getChatById } from "@/actions/chat";

export function Chat() {
  const { input, messages, handleInputChange, handleSubmit } = useChat();
  const searchParams = useSearchParams();

  const [existingChat, setExistingChat] = useState<Awaited<
    ReturnType<typeof getChatById>
  > | null>(null);

  useEffect(() => {
    const chatId = searchParams.get("chatId");
    async function fetchChat() {
      if (!chatId) {
        setExistingChat(null);
        return;
      }
      const response = await fetch(`/api/chat/${chatId}`);
      setExistingChat(await response.json());
    }
    fetchChat();
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatList
        messages={existingChat?.messages || messages}
        onSubmit={handleSubmit}
        input={input}
        onInputChange={handleInputChange}
        isInputEnabled={!!!existingChat?.messages}
      />
    </div>
  );
}
