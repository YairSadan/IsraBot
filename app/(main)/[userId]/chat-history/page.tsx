import { getChatsByUserId } from "@/actions/chat";
import { ChatLayout } from "@/components/shadcn-chat/chat-layout";
import React from "react";

export default async function ChatHistoryPage({
  params,
}: {
  params: { userId: string };
}) {
  const chats = await getChatsByUserId(params.userId);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center border border-red-900 pt-24">
      <h1 className="text-5xl">Chat History</h1>
      <div className="z-10 h-full w-full max-w-5xl rounded-lg border text-sm lg:flex">
        <ChatLayout
          defaultLayout={undefined}
          navCollapsedSize={8}
          userChats={chats}
        />
      </div>
    </div>
  );
}
