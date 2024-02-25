"use client";

import { useChat } from "ai/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MessageBox from "./message-box";
import { Card } from "./ui/card";

export default function Chat() {
  const { input, messages, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-12 mx-auto space-y-4 justify-center items-center">
      {messages[0] && (
        <Card className="w-full max-h-80 overflow-y-hidden overflow-scroll">
          {messages.map((message) => (
            <MessageBox key={message.id} message={message} />
          ))}
        </Card>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <Input
          value={input}
          placeholder="Enter the idiotic comment"
          onChange={handleInputChange}
        />
        <Button type="submit">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
}
