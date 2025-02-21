import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function GET({ params }: { params: Promise<{ chatId: string }> }) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { chatId } = await params;
  if (!chatId) return new Response("Missing chatId", { status: 400 });

  const chat = await db.chat.findUnique({
    where: { id: chatId },
    include: { messages: true },
  });
  if (!chat) {
    return new Response("Chat not found", { status: 404 });
  }

  return new Response(JSON.stringify(chat), {
    headers: {
      "content-type": "application/json",
    },
  });
}
