import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const vehicles = await storage.getFeaturedVehicles();
  return NextResponse.json(vehicles);
}
