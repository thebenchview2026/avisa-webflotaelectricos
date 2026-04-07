import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ pageSlug: string }> }) {
  const { pageSlug } = await params;
  const sections = await storage.getSectionsByPage(pageSlug);
  return NextResponse.json(sections);
}
