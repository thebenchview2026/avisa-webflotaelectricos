import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const services = await storage.getServices();
  return NextResponse.json(services);
}
