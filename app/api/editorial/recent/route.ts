import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const articles = await storage.getRecentEditorial(limit);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("[editorial/recent] Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
