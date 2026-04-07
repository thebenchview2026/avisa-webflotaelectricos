import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;
    const articles = await storage.getPublishedEditorial(type);
    return NextResponse.json(articles);
  } catch (error) {
    console.error("[editorial] Error:", error);
    return NextResponse.json([], { status: 200 });
  }
}
