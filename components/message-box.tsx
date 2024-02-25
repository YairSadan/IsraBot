import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Message } from "ai";
import React, { useCallback } from "react";
import { Button } from "./ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const MessageBox = ({ message }: { message: Message }) => {
  const isUserMessage = message.role === "user";
  const { user } = useUser();
  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    toast("Copied to clipboard", { position: "bottom-center" });
  }, []);

  return (
    <div
      className={`m-2 flex ${isUserMessage ? "flex-row" : "flex-row-reverse"}`}
    >
      <Avatar className={cn(isUserMessage ? "mr-2" : "ml-2")}>
        <AvatarImage
          src={isUserMessage ? `${user?.imageUrl}` : "/israelIcon.svg"}
          alt="IsraBot"
        />
        <AvatarFallback>IL</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
          isUserMessage ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-x-2",
            isUserMessage ? "" : "flex-row-reverse",
          )}
        >
          <p className="w-fit">{message.content}</p>
          <Button
            variant={"chatCopyIcon"}
            className={cn(
              isUserMessage
                ? "bg-secondary/10 hover:bg-secondary/30"
                : "bg-primary/10 hover:bg-primary/30",
            )}
            size={"chatCopyIcon"}
            onClick={() => copyToClipboard(message.content)}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
