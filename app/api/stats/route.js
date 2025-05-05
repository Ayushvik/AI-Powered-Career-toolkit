// app/api/stats/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // adjust this path if prisma.ts is in lib/innegest

export async function GET() {
  try {
    const totalUsers = await db.user.count();
    return NextResponse.json({ totalUsers });
  } catch (error) {
    console.error("Failed to fetch total user count:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
