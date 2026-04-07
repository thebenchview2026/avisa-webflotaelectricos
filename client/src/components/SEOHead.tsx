"use client";
import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SITE_NAME = "Grupo Avisa";
const BASE_URL = "https://electricos.grupoavisa.com";
const DEFAULT_TITLE = "Grupo Avisa | Vehículos Eléctricos e Híbridos en Andalucía y Extremadura";
const DEFAULT_DESC = "Concesionario oficial líder en vehículos eléctricos e híbridos enchufables. Volkswagen, Audi, Škoda. Ofertas, Plan MOVES y servicio postventa especializado.";
const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&auto=format&q=80";

function setMetaTag(name: string, content: string, attribute = "name") {
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(data: Record<string, any> | Record<string, any>[]) {
  let el = document.querySelector('script[data-seo-jsonld]') as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-seo-jsonld", "true");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

function removeJsonLd() {
  const el = document.querySelector('script[data-seo-jsonld]');
  if (el) el.remove();
}

export default function SEOHead({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
    document.title = fullTitle;

    const desc = description || DEFAULT_DESC;
    setMetaTag("description", desc);

    setMetaTag("og:title", ogTitle || title || DEFAULT_TITLE, "property");
    setMetaTag("og:description", ogDescription || desc, "property");
    setMetaTag("og:type", ogType, "property");
    setMetaTag("og:image", ogImage || DEFAULT_OG_IMAGE, "property");
    setMetaTag("og:image:type", "image/webp", "property");
    setMetaTag("og:image:width", "1200", "property");
    setMetaTag("og:image:height", "630", "property");
    setMetaTag("og:site_name", SITE_NAME, "property");
    setMetaTag("og:locale", "es_ES", "property");

    const canonicalUrl = canonical
      ? (canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`)
      : `${BASE_URL}${window.location.pathname}`;
    setMetaTag("og:url", canonicalUrl, "property");
    setLinkTag("canonical", canonicalUrl);

    if (noindex) {
      setMetaTag("robots", "noindex, nofollow");
    } else {
      setMetaTag("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    setMetaTag("twitter:card", "summary_large_image", "name");
    setMetaTag("twitter:title", ogTitle || title || DEFAULT_TITLE, "name");
    setMetaTag("twitter:description", ogDescription || desc, "name");
    setMetaTag("twitter:image", ogImage || DEFAULT_OG_IMAGE, "name");

    const today = new Date().toISOString().split("T")[0];
    setMetaTag("last-modified", today);

    if (jsonLd) {
      setJsonLd(jsonLd);
    }

    return () => {
      removeJsonLd();
    };
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, noindex, jsonLd]);

  return null;
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${BASE_URL}/#organization`,
  "name": "Grupo Avisa",
  "url": BASE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": DEFAULT_OG_IMAGE,
    "width": 1200,
    "height": 630
  },
  "description": "Concesionario oficial de vehículos eléctricos e híbridos en Andalucía y Extremadura. Volkswagen, Audi, Škoda.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C/ Alhami 2-4",
    "addressLocality": "Sevilla",
    "postalCode": "41020",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "telephone": "+34955034600",
  "email": "info@grupoavisa.com",
  "sameAs": [
    "https://www.google.com/maps/place/Grupo+Avisa"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+34955034600",
      "contactType": "sales",
      "availableLanguage": "Spanish",
      "areaServed": "ES"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+34955034600",
      "contactType": "customer service",
      "availableLanguage": "Spanish",
      "areaServed": "ES"
    }
  ],
  "foundingLocation": {
    "@type": "Place",
    "name": "Sevilla, España"
  }
};

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${BASE_URL}/#localbusiness`,
  "name": "Grupo Avisa - Concesionario Oficial",
  "image": DEFAULT_OG_IMAGE,
  "url": BASE_URL,
  "telephone": "+34955034600",
  "email": "info@grupoavisa.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "C/ Alhami 2-4",
    "addressLocality": "Sevilla",
    "postalCode": "41020",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 37.3748,
    "longitude": -5.9637
  },
  "areaServed": [
    { "@type": "State", "name": "Andalucía" },
    { "@type": "State", "name": "Extremadura" }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "14:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "00:00",
      "closes": "00:00"
    }
  ],
  "priceRange": "€€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Efectivo, Tarjeta, Financiación",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Vehículos Eléctricos e Híbridos",
    "itemListElement": [
      { "@type": "OfferCatalog", "name": "Vehículos 100% Eléctricos" },
      { "@type": "OfferCatalog", "name": "Vehículos Híbridos Enchufables" }
    ]
  }
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  "name": "Grupo Avisa",
  "url": BASE_URL,
  "description": "Concesionario oficial de vehículos eléctricos e híbridos en Andalucía y Extremadura.",
  "publisher": { "@id": `${BASE_URL}/#organization` },
  "inLanguage": "es",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${BASE_URL}/preguntas?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export function buildFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      }
    }))
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function buildVehicleJsonLd(vehicle: {
  name: string;
  brand: string;
  price?: number;
  imageUrl?: string;
  description?: string;
  slug: string;
  type: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": vehicle.name,
    "brand": {
      "@type": "Brand",
      "name": vehicle.brand
    },
    "description": vehicle.description || `${vehicle.name} - Vehículo ${vehicle.type} disponible en Grupo Avisa, Sevilla`,
    "image": vehicle.imageUrl,
    "url": `${BASE_URL}/vehiculos/${vehicle.type === "electrico" ? "electricos" : "hibridos"}/${vehicle.slug}`,
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "fuelType": vehicle.type === "electrico" ? "Electricity" : "Electricity, Gasoline"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": vehicle.brand
    },
    ...(vehicle.price ? {
      "offers": {
        "@type": "Offer",
        "price": vehicle.price,
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Grupo Avisa"
        }
      }
    } : {})
  };
}

export function buildServiceJsonLd(services: { name: string; description: string; url?: string }[]) {
  return services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "AutoDealer",
      "@id": `${BASE_URL}/#organization`,
      "name": "Grupo Avisa"
    },
    "areaServed": {
      "@type": "State",
      "name": "Andalucía"
    },
    "serviceType": "Automotive Service",
    ...(service.url ? { "url": service.url.startsWith("http") ? service.url : `${BASE_URL}${service.url}` } : {})
  }));
}

export function buildReviewJsonLd(reviews: { author: string; rating: number; text: string; date?: string }[]) {
  return reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "reviewBody": review.text,
    ...(review.date ? { "datePublished": review.date } : {})
  }));
}

export function buildAggregateRatingJsonLd(ratingValue: number, reviewCount: number) {
  return {
    "@type": "AggregateRating",
    "ratingValue": ratingValue.toString(),
    "reviewCount": reviewCount.toString(),
    "bestRating": "5",
    "worstRating": "1"
  };
}

export function buildLocalBusinessWithReviewsJsonLd(
  reviews: { author: string; rating: number; text: string; date?: string }[],
  aggregateRating?: { ratingValue: number; reviewCount: number }
) {
  return {
    ...localBusinessJsonLd,
    ...(reviews.length > 0 ? { "review": buildReviewJsonLd(reviews) } : {}),
    ...(aggregateRating ? { "aggregateRating": buildAggregateRatingJsonLd(aggregateRating.ratingValue, aggregateRating.reviewCount) } : {})
  };
}

export function buildPostventaServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${BASE_URL}/postventa/#service`,
    "name": "Grupo Avisa - Servicio Postventa Especializado",
    "url": `${BASE_URL}/postventa`,
    "description": "Taller oficial especializado en mantenimiento y reparación de vehículos eléctricos e híbridos enchufables. Técnicos certificados y repuestos originales.",
    "telephone": "+34955034600",
    "email": "info@grupoavisa.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C/ Alhami 2-4",
      "addressLocality": "Sevilla",
      "postalCode": "41020",
      "addressRegion": "Andalucía",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.3748,
      "longitude": -5.9637
    },
    "parentOrganization": {
      "@type": "AutoDealer",
      "@id": `${BASE_URL}/#organization`,
      "name": "Grupo Avisa"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Postventa",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mantenimiento preventivo EV",
            "description": "Revisión completa de batería, motor eléctrico, frenos regenerativos y sistemas de carga"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Diagnóstico avanzado",
            "description": "Diagnóstico electrónico especializado para vehículos eléctricos e híbridos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Reparación de baterías",
            "description": "Servicio técnico certificado para sistemas de batería de alto voltaje"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Instalación de puntos de carga",
            "description": "Instalación profesional de wallbox y puntos de recarga domésticos y empresariales"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ]
  };
}
