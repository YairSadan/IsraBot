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
    <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-4 py-12">
      {completion && (
        <Card className="max-h-80 w-full overflow-scroll overflow-y-hidden">
          <MessageBox
            message={{ role: "system", content: completion, id: completion }}
          />
        </Card>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm items-center space-x-2"
      >
        <div className="relative flex w-full">
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
