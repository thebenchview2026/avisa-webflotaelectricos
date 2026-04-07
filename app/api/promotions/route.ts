import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const promotions = type
    ? await storage.getPromotionsByType(type)
    : await storage.getPromotions();
  return NextResponse.json(promotions);
}
