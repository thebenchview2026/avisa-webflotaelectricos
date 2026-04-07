import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET() {
  const testimonials = await storage.getTestimonials();
  return NextResponse.json(testimonials);
}
