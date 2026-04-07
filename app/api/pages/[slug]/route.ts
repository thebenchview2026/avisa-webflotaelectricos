import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await storage.getPageBySlug(slug);
  if (!page) return NextResponse.json({ message: "Page not found" }, { status: 404 });
  return NextResponse.json(page);
}
