import type { Metadata } from "next";
import PreguntasDetallePage from "@/pages/preguntas-detalle";
import { generateMetadata as seoMeta, generateJsonLd, type SeoContext } from "@/lib/seo-engine";

export async function generateMetadata({ params }: { params: Promise<{ categoria: string; pregunta: string }> }): Promise<Metadata> {
  const { categoria, pregunta } = await params;

  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/faqs/by-slug/${pregunta}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.faq) {
        const ctx: SeoContext = {
          pageType: "faq-detail",
          slug: pregunta,
          faq: {
            question: data.faq.metaTitle || data.faq.question,
            answer: data.faq.metaDescription || data.faq.answer?.substring(0, 155) || "",
            categorySlug: categoria,
          },
        };
        return seoMeta(ctx);
      }
    }
  } catch {}

  const titleFromSlug = pregunta.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const ctx: SeoContext = {
    pageType: "faq-detail",
    slug: pregunta,
    faq: { question: titleFromSlug, answer: "", categorySlug: categoria },
  };
  return seoMeta(ctx);
}

export default async function Page({ params }: { params: Promise<{ categoria: string; pregunta: string }> }) {
  const { categoria, pregunta } = await params;

  let jsonLdSchemas: Record<string, unknown>[] = [];
  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/faqs/by-slug/${pregunta}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.faq) {
        const ctx: SeoContext = {
          pageType: "faq-detail",
          slug: pregunta,
          faq: {
            question: data.faq.question,
            answer: data.faq.answer || "",
            categorySlug: categoria,
            categoryName: data.faq.categoryName,
          },
        };
        jsonLdSchemas = generateJsonLd(ctx);
      }
    }
  } catch {}

  return (
    <>
      {jsonLdSchemas.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchemas) }}
        />
      )}
      <PreguntasDetallePage categoria={categoria} pregunta={pregunta} />
    </>
  );
}
