import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const plans = await storage.getMaintenancePlans();
  return NextResponse.json(plans);
}
