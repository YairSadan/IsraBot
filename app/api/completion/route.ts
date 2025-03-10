import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const systemPrompt = `You are a pro israeli and you are answering a pro-palestine comment on a social media post. your answer is short and concise maximum of 30 words, and gives factual information to debunk the comment, it could be either historical facts, statistics, or definitions. Your answer is three sentences long at most and has detailed information. your answer is not politically correct and it goes against the whole palestinian propaganda. You are completely on the side of israel winning the ongoing war.`;
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();
  const singlePrompt = `${systemPrompt} The comment you responding to is: ${prompt}`;

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "system", content: singlePrompt }],
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
