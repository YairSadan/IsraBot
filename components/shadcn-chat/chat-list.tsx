"use client";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { Message } from "ai/react";

interface ChatListProps {
  messages?: Message[];
  input: string;
  onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isInputEnabled: boolean;
}

export function ChatList({
  messages,
  input,
  onInputChange,
  onSubmit,
  isInputEnabled,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 whitespace-pre-wrap p-4",
                message.role !== "user" ? "items-end" : "items-start",
              )}
            >
              <div className="flex items-center gap-3">
                {message.role === "user" && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={"/israelIcon.svg"}
                      alt={"todo"}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className=" max-w-xs rounded-md bg-accent p-3">
                  {message.content}
                </span>
                {message.role !== "user" && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={"/vercel.svg"}
                      alt={"todo"}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {isInputEnabled && (
        <ChatBottombar
          onSubmit={onSubmit}
          input={input}
          onInputChange={onInputChange}
        />
      )}
    </div>
  );
}
