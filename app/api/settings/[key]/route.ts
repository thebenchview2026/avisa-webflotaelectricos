import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const settings = await storage.getSettings();
  const setting = settings.find((s: any) => s.key === key);
  if (!setting) return NextResponse.json({ message: "Setting not found" }, { status: 404 });
  return NextResponse.json(setting);
}
