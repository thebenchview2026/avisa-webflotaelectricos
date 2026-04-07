import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await storage.getEditorialContentBySlug(slug);
  if (!article) return NextResponse.json({ message: "Article not found" }, { status: 404 });
  return NextResponse.json(article);
}
