"use client";

import { Message, useChat } from "ai/react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import MessageBox from "./message-box";
import { useState } from "react";
import { Card } from "./ui/card";

export default function Chat() {
  const [messagess, setMessagess] = useState<Message[]>([
    { content: "Hello, I am IsraBot", role: "system", id: "1" },
    { content: "I am here to user you", role: "user", id: "2" },
  ]);
  const { input, messages, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col w-full max-w-md py-12 mx-auto space-y-4 justify-center items-center">
      <Card className="w-full">
        {messagess.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </Card>
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
