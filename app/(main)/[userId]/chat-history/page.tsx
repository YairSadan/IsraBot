import { getLatestChatByUserId } from "@/actions/chat";
import MessageBox from "@/components/message-box";
import React from "react";

export default async function ChatHistoryPage({
  params,
}: {
  params: { userId: string };
}) {
  const chat = await getLatestChatByUserId(params.userId);
  console.log(chat);
  return (
    <div className="flex flex-col h-full w-full justify-center items-center">
      <h1>Chat History</h1>
      <ul>
        {chat?.messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
}
