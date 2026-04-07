import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await storage.getFaqCategories();
  const category = categories.find((c: any) => c.slug === slug);
  if (!category) return NextResponse.json({ message: "Categoría no encontrada" }, { status: 404 });
  const allFaqs = await storage.getFaqs();
  const categoryFaqs = allFaqs.filter((f: any) => f.categoryId === category.id && f.published);
  return NextResponse.json({ category, faqs: categoryFaqs });
}
