import { Message } from "ai/react";
import { db } from "../lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Create/Update chat
export const saveChat = async (messages: Message[]) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const previousKey = JSON.stringify(messages.slice(0, -1));

  const chat = await db.chat.findFirst({
    where: {
      id: previousKey,
      userId: userId,
    },
    include: {
      messages: true,
    },
  });

  const key = JSON.stringify(messages);
  if (chat) {
    await db.chat.update({
      where: {
        id: previousKey,
      },
      data: {
        id: key,
      },
    });
  } else {
    await db.chat.create({
      data: {
        id: key,
        userId: userId,
      },
    });
  }

  const newMessages = messages.slice(chat ? chat.messages.length : 0);

  await db.message.createMany({
    data: newMessages.map((message) => ({
      chatId: key,
      content: message.content,
      role: message.role,
      userId: userId,
    })),
  });

  return NextResponse.json({ success: true });
};

// Read chat
export const getChatsByUserId = async (userID: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  if (userId !== userID) throw new Error("Unauthorized");

  const chats = await db.chat.findMany({
    where: {
      userId: userId,
    },
    include: {
      messages: true,
    },
  });

  return chats;
};

export const getLatestChatByUserId = async (userID: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  if (userId !== userID) throw new Error("Unauthorized");

  const chat = await db.chat.findFirst({
    where: {
      userId: userId,
    },
    include: {
      messages: true,
    },
  });

  return chat;
}