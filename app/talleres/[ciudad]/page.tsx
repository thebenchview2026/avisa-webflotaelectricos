import type { Metadata } from "next";
import TallerLocalPage from "@/pages/taller-local";
import { getAllCitySlugs, getCityLandingData, getCityBySlug, SERVICES_OFFERED } from "@/lib/local-seo";
import { TRUST_METRICS } from "@/lib/entity-data";
import { generateMetadata as seoMeta, type SeoContext } from "@/lib/seo-engine";

const BASE_URL = "https://electricos.grupoavisa.com";

export async function generateStaticParams() {
  return getAllCitySlugs().map((ciudad) => ({ ciudad }));
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }): Promise<Metadata> {
  const { ciudad } = await params;
  const data = getCityLandingData(ciudad);
  if (!data) return { title: "Ciudad no encontrada" };

  const ctx: SeoContext = { pageType: "city", city: ciudad };
  return seoMeta(ctx);
}

function CityJsonLd({ ciudad }: { ciudad: string }) {
  const data = getCityLandingData(ciudad);
  const cityInfo = getCityBySlug(ciudad);
  if (!data || !cityInfo) return null;

  const url = `${BASE_URL}/taller-electricos-${ciudad}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${data.h1} | Grupo Avisa`,
    description: data.metaDescription,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "es",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Concesionarios", item: `${BASE_URL}/concesionarios` },
        { "@type": "ListItem", position: 3, name: `Taller ${data.city}`, item: url },
      ],
    },
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["AutoRepair", "AutoDealer"],
    "@id": `${url}/#localbusiness`,
    name: `Grupo Avisa - Taller Eléctricos ${data.city}`,
    description: data.intro,
    url,
    telephone: "+34955034600",
    email: "info@grupoavisa.com",
    address: data.dealers.length > 0
      ? {
          "@type": "PostalAddress",
          streetAddress: data.dealers[0].street,
          addressLocality: data.city,
          addressRegion: data.region,
          postalCode: data.dealers[0].postal,
          addressCountry: "ES",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: data.city,
          addressRegion: data.region,
          addressCountry: "ES",
        },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.lat,
      longitude: data.lng,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: data.lat,
        longitude: data.lng,
      },
      geoRadius: `${cityInfo.radiusKm}000`,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "€€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Efectivo, Tarjeta, Transferencia, Financiación",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(TRUST_METRICS.ratingValue),
      reviewCount: String(TRUST_METRICS.reviewCount),
      bestRating: "5",
      worstRating: "1",
    },
    makesOffer: SERVICES_OFFERED.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${svc.name} de Vehículos Eléctricos en ${data.city}`,
        url: `${BASE_URL}/servicios/${svc.slug}`,
      },
    })),
    parentOrganization: { "@id": `${BASE_URL}/#organization` },
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Certificación de alto voltaje automotriz" },
      ...(data.brands.includes("Volkswagen")
        ? [{ "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Volkswagen" }]
        : []),
      ...(data.brands.includes("Audi")
        ? [{ "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Audi" }]
        : []),
      ...(data.brands.includes("Škoda")
        ? [{ "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Škoda" }]
        : []),
    ],
    knowsAbout: [
      { "@type": "Thing", name: "Vehículo eléctrico", sameAs: "https://www.wikidata.org/wiki/Q193692" },
      { "@type": "Thing", name: "Vehículo híbrido enchufable", sameAs: "https://www.wikidata.org/wiki/Q2095831" },
      { "@type": "Thing", name: "Batería de iones de litio", sameAs: "https://www.wikidata.org/wiki/Q899079" },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([webPageSchema, localBusinessSchema]) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params;
  return (
    <>
      <CityJsonLd ciudad={ciudad} />
      <TallerLocalPage ciudad={ciudad} />
    </>
  );
}
