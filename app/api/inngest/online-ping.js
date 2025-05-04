import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function POST() {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  await prisma.onlineStatus.upsert({
    where: { userId },
    update: { lastSeen: new Date() },
    create: { userId, lastSeen: new Date() },
  });

  return new Response("OK");
}
