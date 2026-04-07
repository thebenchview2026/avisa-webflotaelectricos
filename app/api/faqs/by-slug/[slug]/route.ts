import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allFaqs = await storage.getFaqs();
  const faq = allFaqs.find((f: any) => f.slug === slug && f.published);
  if (!faq) return NextResponse.json({ message: "Pregunta no encontrada" }, { status: 404 });
  const categories = await storage.getFaqCategories();
  const category = categories.find((c: any) => c.id === faq.categoryId);
  const relatedSlugs: string[] = (faq as any).relatedSlugs || [];
  const relatedFaqs = allFaqs
    .filter((f: any) => relatedSlugs.includes(f.slug) && f.published)
    .map((f: any) => {
      const cat = categories.find((c: any) => c.id === f.categoryId);
      return { id: f.id, slug: f.slug, question: f.question, categorySlug: cat?.slug || "" };
    });
  return NextResponse.json({ faq, category, relatedFaqs });
}
