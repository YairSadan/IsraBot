import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

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
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
