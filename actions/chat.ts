"use server";
import { Message } from "ai/react";
import { db } from "../lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Generate a unique key for the chat based on the messages and userId
const generateChatKey = (messages: Message[], userId: string): string => {
  // Combine message content for generating the key
  const combinedContent = messages.map((message) => message.content).join("");
  return combinedContent + userId;
};

const generatePreviousChatKey = (
  messages: Message[],
  userId: string
): string => {
  // Remove the last two messages
  const previousMessages = messages.slice(0, -2);
  // Combine message content for generating the key
  const combinedContent = previousMessages
    .map((message) => message.content)
    .join("");
  return combinedContent + userId;
};

// Create/Update chat
export const saveChat = async (messages: Message[]) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");
  const key = generateChatKey(messages, userId);
  const previousKey = generatePreviousChatKey(messages, userId);

  const chat = await db.chat.findUnique({
    where: { id: previousKey },
    include: { messages: true },
  });

  if (chat) {
    await db.chat.update({ where: { id: previousKey }, data: { id: key } });
  } else {
    await db.chat.create({ data: { id: key, userId: userId } });
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

export const getChatById = async (chatId: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });

  if (!chat) throw new Error("Chat not found");

  return chat;
};
