import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const vehicles = await storage.getVehicles();
  return NextResponse.json(vehicles);
}
