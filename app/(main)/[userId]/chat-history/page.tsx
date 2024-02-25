import { getLatestChatByUserId } from "@/actions/chat";
import Chat from "@/components/chat";
import MessageBox from "@/components/message-box";
import React from "react";

export default async function ChatHistoryPage({
  params,
}: {
  params: { userId: string           };
}) {
  // const chat = await getLatestChatByUserId(params.userId);
  // console.log(chat);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="bg-gradient-to-r from-primary to-secondary-foreground bg-clip-text text-transparent">
        <h1 className="text-center text-xl font-bold leading-none md:text-3xl">
          Chat History
        </h1>
      </div>
      <div className="flex w-full justify-center">
        <Chat />
      </div>
    </div>
  );
}
