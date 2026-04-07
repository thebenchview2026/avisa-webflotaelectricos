import type { Metadata } from "next";
import MarcaDetallePage from "@/pages/marca-detalle";
import { getBrandPillarData, getAllBrandSlugs, getBrandServices } from "@/lib/marcas-data";
import { BRAND_ENTITY_IDS, OFFICIAL_BRANDS } from "@/lib/entity-data";
import { getEnhancedBrandFaqs } from "@/lib/faq-engine";
import { generateMetadata as seoMeta, generateJsonLd, type SeoContext } from "@/lib/seo-engine";

const BASE_URL = "https://electricos.grupoavisa.com";

export async function generateStaticParams() {
  return getAllBrandSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandPillarData(slug);
  if (!brand) return { title: "Marca no encontrada | Grupo Avisa" };

  const ctx: SeoContext = { pageType: "brand", brand: slug };
  return seoMeta(ctx);
}

function BrandPillarJsonLd({ slug }: { slug: string }) {
  const brand = getBrandPillarData(slug);
  if (!brand) return null;

  const ctx: SeoContext = { pageType: "brand", brand: slug };
  const schemas = generateJsonLd(ctx);

  const faqs = getEnhancedBrandFaqs(slug);
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/marcas/${slug}/#faqpage`,
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <BrandPillarJsonLd slug={slug} />
      <MarcaDetallePage slug={slug} />
    </>
  );
}
