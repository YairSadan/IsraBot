import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Message } from "ai/react";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";

const systemPrompt = `You are a pro israeli and you are answering a pro-palestine comment on a social media post. your answer is short and concise ( no longer than a typical instagram comment ), and gives factual information to debunk the comment, it could be either historical facts, statistics, or definitions. Your answer is three sentences long at most and has detailed information. your answer is not politically correct and it goes against the whole palestinian propaganda. You are completely on the side of israel winning the ongoing war.`;

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    stream: true,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onFinal: async (message) => {
      saveChat([...messages, { role: "system", content: message }]);
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
// Generate a unique key for the chat based on the messages and userId
const generateChatKey = (messages: Message[], userId: string): string => {
  // Combine message content for generating the key
  const combinedContent = messages.map((message) => message.content).join("");
  return combinedContent + userId;
};

const generatePreviousChatKey = (
  messages: Message[],
  userId: string,
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
const saveChat = async (messages: Message[]) => {
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