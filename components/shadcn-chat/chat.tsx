"use client";
import { ChatList } from "./chat-list";
import React, { useEffect } from "react";
import { useChat } from "ai/react";
import { useSearchParams } from "next/navigation";
import { saveChat } from "@/actions/chat";

export function Chat() {
  const { input, messages, setMessages, handleInputChange, handleSubmit } =
    useChat({
      onFinish: async (message) => {
        saveChat([{ role: "user", content: input, id: "input" }, message]);
      },
    });
  const searchParams = useSearchParams();

  useEffect(() => {
    const chatId = searchParams.get("chatId");
    async function fetchChat() {
      const response = await fetch(`/api/chat/${chatId}`);
      const data = await response.json();
      setMessages(data.messages);
    }
    if (chatId) fetchChat();
    else setMessages([]);
  }, [searchParams, setMessages]);

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
