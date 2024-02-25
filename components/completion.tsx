"use client";

import { useCompletion } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaperPlaneIcon, StopIcon } from "@radix-ui/react-icons";
import { Card } from "./ui/card";
import MessageBox from "./message-box";

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="flex flex-col w-full max-w-md py-12 mx-auto space-y-4 justify-center items-center">
      {completion && (
        <Card className="w-full max-h-80 overflow-y-hidden overflow-scroll">
          <MessageBox
            message={{ role: "system", content: completion, id: completion }}
          />
        </Card>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <div className="flex relative w-full">
          <Input
            value={input}
            placeholder="Enter the idiotic comment..."
            onChange={handleInputChange}
          />
          {isLoading && (
            <Button
              size={"icon"}
              variant={"destructive"}
              type="button"
              onClick={stop}
              className="absolute right-0"
            >
              <StopIcon />
            </Button>
          )}
        </div>
        <Button disabled={isLoading} type="submit">
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
}
