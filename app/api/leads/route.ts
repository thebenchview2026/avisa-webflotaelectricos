import { NextResponse } from "next/server";
import { storage } from "@server/storage";
import { insertLeadSchema } from "@shared/schema";

export async function POST(request: Request) {
  const body = await request.json();
  const result = insertLeadSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ message: "Invalid data", errors: result.error.flatten() }, { status: 400 });
  }
  const lead = await storage.createLead(result.data);
  return NextResponse.json(lead, { status: 201 });
}
