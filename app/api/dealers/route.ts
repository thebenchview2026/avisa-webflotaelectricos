import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const dealers = await storage.getDealers();
  return NextResponse.json(dealers);
}
