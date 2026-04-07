import type { Metadata } from "next";
import ServicioMarcaPage from "@/pages/servicio-marca";
import ServicioPilarPage from "@/pages/servicio-pilar";
import ServicioLocalPage from "@/pages/servicio-local";
import { getServiceBrandData, getAllServiceBrandSlugs, isServicePillarSlug, getServicePillarData, getAllServicePillarSlugs, getServiceBrands } from "@/lib/servicios-data";
import { getUniquePageContent } from "@/lib/content-engine";
import { BRAND_ENTITY_IDS, OFFICIAL_BRANDS, SERVICE_CATEGORIES } from "@/lib/entity-data";
import { generateMetadata as seoMeta, generateJsonLd, type SeoContext } from "@/lib/seo-engine";
import { isProgrammaticSlug, parseProgrammaticSlug, generateProgrammaticPage, getAllProgrammaticSlugs } from "@/lib/programmatic-seo";
import { getMultiLayerFaqs } from "@/lib/faq-engine";

const BASE_URL = "https://electricos.grupoavisa.com";

export async function generateStaticParams() {
  const clusterSlugs = getAllServiceBrandSlugs().map((slug) => ({ slug }));
  const pillarSlugs = getAllServicePillarSlugs().map((slug) => ({ slug }));
  const programmaticSlugs = getAllProgrammaticSlugs().map((slug) => ({ slug }));
  return [...pillarSlugs, ...clusterSlugs, ...programmaticSlugs];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  if (isProgrammaticSlug(slug)) {
    const parsed = parseProgrammaticSlug(slug)!;
    const page = generateProgrammaticPage(parsed.serviceSlug, parsed.brandSlug, parsed.citySlug);
    if (!page) return { title: "Servicio no encontrado | Grupo Avisa" };
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `${BASE_URL}/servicios/${slug}` },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `${BASE_URL}/servicios/${slug}`,
        type: "website",
        siteName: "Grupo Avisa",
      },
      twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
    };
  }

  if (isServicePillarSlug(slug)) {
    const ctx: SeoContext = { pageType: "service-pillar", service: slug, slug };
    return seoMeta(ctx);
  }

  const data = getServiceBrandData(slug);
  if (!data) return { title: "Servicio no encontrado | Grupo Avisa" };

  const { serviceSlug, brandSlug } = data;
  const uniqueContent = getUniquePageContent(serviceSlug, brandSlug);
  const ctx: SeoContext = { pageType: "service-brand", service: serviceSlug, brand: brandSlug, slug };

  if (uniqueContent?.metaTitle || uniqueContent?.metaDescription) {
    const meta = seoMeta(ctx);
    if (uniqueContent.metaTitle) (meta as any).title = uniqueContent.metaTitle;
    if (uniqueContent.metaDescription) (meta as any).description = uniqueContent.metaDescription;
    return meta;
  }

  return seoMeta(ctx);
}

function ProgrammaticJsonLd({ slug }: { slug: string }) {
  const parsed = parseProgrammaticSlug(slug);
  if (!parsed) return null;
  const page = generateProgrammaticPage(parsed.serviceSlug, parsed.brandSlug, parsed.citySlug);
  if (!page) return null;

  const url = `${BASE_URL}/servicios/${slug}`;
  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${url}/#webpage`,
      url,
      name: page.metaTitle,
      description: page.metaDescription,
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: [
        { "@id": `${BASE_URL}/#brand-${page.brandSlug}` },
        { "@id": `${BASE_URL}/#service-${page.serviceSlug}` },
      ],
      inLanguage: "es",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Servicios", item: `${BASE_URL}/postventa` },
          { "@type": "ListItem", position: 3, name: page.serviceName, item: `${BASE_URL}/servicios/${page.serviceSlug}` },
          { "@type": "ListItem", position: 4, name: `${page.serviceName} ${page.brandName}`, item: `${BASE_URL}/servicios/${page.serviceSlug}-${page.brandSlug}` },
          { "@type": "ListItem", position: 5, name: page.cityName },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${url}/#service`,
      name: `${page.serviceName} ${page.brandName} en ${page.cityName}`,
      url,
      provider: {
        "@type": page.isOfficial ? "AutoDealer" : "AutoRepair",
        "@id": `${BASE_URL}/#organization`,
        name: "Grupo Avisa",
      },
      areaServed: {
        "@type": "City",
        name: page.cityName,
      },
      serviceType: `${page.serviceName} de Vehículos Eléctricos`,
    },
  ];

  if (page.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}/#faqpage`,
      mainEntity: page.faqs.map(faq => ({
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

function ServicePillarJsonLd({ slug }: { slug: string }) {
  const ctx: SeoContext = { pageType: "service-pillar", service: slug, slug };
  const schemas = generateJsonLd(ctx);

  const pillar = getServicePillarData(slug);
  if (pillar?.pillarFaqs) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/servicios/${slug}/#faqpage`,
      mainEntity: pillar.pillarFaqs.map((faq) => ({
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

function ServiceBrandJsonLd({ slug }: { slug: string }) {
  const data = getServiceBrandData(slug);
  if (!data) return null;

  const { serviceDef, brandName, serviceSlug, brandSlug } = data;
  const ctx: SeoContext = { pageType: "service-brand", service: serviceSlug, brand: brandSlug, slug };
  const schemas = generateJsonLd(ctx);

  const uniqueContent = getUniquePageContent(serviceSlug, brandSlug);
  const multiLayer = getMultiLayerFaqs(serviceSlug, brandSlug);
  const allFaqs = [
    ...(uniqueContent?.uniqueFaqs || []),
    ...multiLayer.allFaqs,
  ];

  const seen = new Set<string>();
  const dedupedFaqs = allFaqs.filter(f => {
    const key = f.question.toLowerCase().replace(/[¿?]/g, "").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  if (dedupedFaqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${BASE_URL}/servicios/${slug}/#faqpage`,
      mainEntity: dedupedFaqs.map((faq) => ({
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

  if (isProgrammaticSlug(slug)) {
    return (
      <>
        <ProgrammaticJsonLd slug={slug} />
        <ServicioLocalPage slug={slug} />
      </>
    );
  }

  if (isServicePillarSlug(slug)) {
    return (
      <>
        <ServicePillarJsonLd slug={slug} />
        <ServicioPilarPage slug={slug} />
      </>
    );
  }

  return (
    <>
      <ServiceBrandJsonLd slug={slug} />
      <ServicioMarcaPage slug={slug} />
    </>
  );
}
