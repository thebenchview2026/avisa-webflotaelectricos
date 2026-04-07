import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const faqs = await storage.getHomeFeaturedFaqs();
  return NextResponse.json(faqs);
}
