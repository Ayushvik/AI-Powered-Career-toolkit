// /api/user-stats.ts
import prisma from "@/lib/prisma";

export async function GET() {
  const totalUsers = await prisma.user.count();

  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const onlineUsers = await prisma.onlineStatus.count({
    where: { lastSeen: { gte: twoMinutesAgo } },
  });

  return Response.json({ totalUsers, onlineUsers });
}
