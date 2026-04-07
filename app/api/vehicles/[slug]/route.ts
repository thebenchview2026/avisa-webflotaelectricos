import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const vehicle = await storage.getVehicleBySlug(slug);
  if (!vehicle) return NextResponse.json({ message: "Vehicle not found" }, { status: 404 });
  return NextResponse.json(vehicle);
}
