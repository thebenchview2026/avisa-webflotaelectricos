import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const brands = await storage.getBrands();
  return NextResponse.json(brands);
}
