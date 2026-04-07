import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await storage.getBrandBySlug(slug);
  if (!brand) return NextResponse.json({ message: "Brand not found" }, { status: 404 });
  return NextResponse.json(brand);
}
