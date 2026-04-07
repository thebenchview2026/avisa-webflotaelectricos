import type { Metadata } from "next";
import { BRAND_NAMES, SERVICE_DEFINITIONS, getServiceBrandData, isServicePillarSlug, getServicePillarData, getServiceBrands } from "./servicios-data";
import { BRAND_ENTITY_IDS, OFFICIAL_BRANDS, SERVICE_ENTITY_MAP, SERVICE_CATEGORIES, TRUST_METRICS, DEALER_LOCATIONS } from "./entity-data";
import { EDITORIAL_TYPES, type EditorialType } from "./editorial-data";
import { SERVICE_CITIES, getCityLandingData, getCityBySlug, SERVICES_OFFERED } from "./local-seo";
import { getBrandPillarData, getBrandServices } from "./marcas-data";

const BASE_URL = "https://electricos.grupoavisa.com";
const SITE_NAME = "Grupo Avisa";
const DEFAULT_OG_IMAGE = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&auto=format&q=80";
const DEFAULT_CITY = "Sevilla";
const DEFAULT_REGION = "Andalucía y Extremadura";
const PHONE = "+34955034600";
const EMAIL = "info@grupoavisa.com";

export type PageType =
  | "home"
  | "service-pillar"
  | "service-brand"
  | "brand"
  | "city"
  | "vehicle-electric"
  | "vehicle-hybrid"
  | "editorial-hub"
  | "editorial-detail"
  | "faq-hub"
  | "faq-category"
  | "faq-detail"
  | "static";

export interface SeoContext {
  pageType: PageType;
  slug?: string;
  brand?: string;
  service?: string;
  city?: string;
  editorialType?: EditorialType;
  article?: {
    title: string;
    excerpt?: string;
    metaTitle?: string;
    metaDescription?: string;
    author?: string;
    publishedAt?: string;
    updatedAt?: string;
    featuredImage?: string;
    tags?: string[];
    category?: string;
  };
  vehicle?: {
    brand: string;
    model: string;
    slug: string;
    tagline?: string;
  };
  faq?: {
    question: string;
    answer: string;
    categoryName?: string;
    categorySlug?: string;
  };
}

function resolveBrandName(slug?: string): string {
  if (!slug) return "";
  return BRAND_NAMES[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function resolveServiceName(slug?: string): string {
  if (!slug) return "";
  const def = SERVICE_DEFINITIONS[slug];
  return def?.title || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function resolveCity(slug?: string): string {
  if (!slug) return DEFAULT_CITY;
  const city = SERVICE_CITIES.find(c => c.slug === slug);
  return city?.city || slug.charAt(0).toUpperCase() + slug.slice(1);
}

function isOfficialBrand(brandSlug?: string): boolean {
  return brandSlug ? OFFICIAL_BRANDS.includes(brandSlug) : false;
}

function tallerType(brandSlug?: string): string {
  return isOfficialBrand(brandSlug) ? "Taller Oficial" : "Taller Especializado";
}

function clampLength(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.substring(0, max - 3);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.substring(0, lastSpace) : cut) + "...";
}

export function generateMetadata(ctx: SeoContext): Metadata {
  const { title, description } = generateTitleDescription(ctx);
  const canonical = generateCanonical(ctx);
  const keywords = generateKeywords(ctx);

  return {
    title: clampLength(title, 55),
    description: clampLength(description, 155),
    alternates: { canonical },
    openGraph: {
      title: clampLength(`${title} | ${SITE_NAME}`, 70),
      description: clampLength(description, 155),
      url: canonical,
      type: ctx.pageType === "editorial-detail" ? "article" : "website",
      siteName: SITE_NAME,
      ...(ctx.article?.featuredImage ? { images: [ctx.article.featuredImage] } : { images: [DEFAULT_OG_IMAGE] }),
    },
    twitter: {
      card: "summary_large_image",
      title: clampLength(title, 60),
      description: clampLength(description, 155),
    },
    ...(keywords.length > 0 ? { keywords } : {}),
  };
}

function generateTitleDescription(ctx: SeoContext): { title: string; description: string } {
  const brandName = resolveBrandName(ctx.brand);
  const serviceName = resolveServiceName(ctx.service);
  const city = resolveCity(ctx.city);
  const official = isOfficialBrand(ctx.brand);

  switch (ctx.pageType) {
    case "service-brand": {
      const title = `${serviceName} ${brandName} en ${city}`;
      const credentialText = official
        ? "Técnicos del fabricante y repuestos originales"
        : "Técnicos certificados en alta tensión";
      const description = `${serviceName} profesional para vehículos ${brandName} en ${city}. ${credentialText}. Solicita tu cita en ${SITE_NAME}.`;
      return { title, description };
    }

    case "service-pillar": {
      const title = `${serviceName} Eléctricos e Híbridos en ${city}`;
      const description = `${serviceName} para ${TRUST_METRICS.brandsServed} marcas de eléctricos e híbridos en ${city}. +${TRUST_METRICS.certifiedTechnicians} técnicos certificados en alta tensión. Pide cita.`;
      return { title, description };
    }

    case "brand": {
      const tt = tallerType(ctx.brand);
      const title = `${tt} ${brandName} Eléctrico en ${city}`;
      const credentialText = official
        ? "Técnicos del fabricante y repuestos originales"
        : "Técnicos certificados en alta tensión";
      const description = `${tt} ${brandName} eléctrico e híbrido en ${city}. ${credentialText}. Pide cita.`;
      return { title, description };
    }

    case "city": {
      const title = `Taller Eléctricos e Híbridos en ${city}`;
      const description = `Taller especializado en coches eléctricos e híbridos en ${city}. Servicio oficial para ${TRUST_METRICS.brandsServed} marcas. Pide cita: 955 034 600.`;
      return { title, description };
    }

    case "vehicle-electric": {
      const v = ctx.vehicle;
      if (!v) return { title: "Vehículo Eléctrico", description: "" };
      const title = `${v.brand} ${v.model} - Vehículo 100% Eléctrico`;
      const description = v.tagline
        ? `${v.tagline}. Descubre el ${v.brand} ${v.model} en ${SITE_NAME}. Precio, autonomía y financiación. Plan MOVES disponible.`
        : `Descubre el ${v.brand} ${v.model} en ${SITE_NAME}. Precio, especificaciones, autonomía y financiación.`;
      return { title, description };
    }

    case "vehicle-hybrid": {
      const v = ctx.vehicle;
      if (!v) return { title: "Vehículo Híbrido", description: "" };
      const title = `${v.brand} ${v.model} - Híbrido Enchufable`;
      const description = v.tagline
        ? `${v.tagline}. Descubre el ${v.brand} ${v.model} en ${SITE_NAME}. Precio, especificaciones y financiación.`
        : `Descubre el ${v.brand} ${v.model} en ${SITE_NAME}. Precio, especificaciones y financiación.`;
      return { title, description };
    }

    case "editorial-hub": {
      const eType = ctx.editorialType;
      if (!eType || !EDITORIAL_TYPES[eType]) return { title: "Contenido", description: "" };
      const config = EDITORIAL_TYPES[eType];
      return {
        title: config.metaTitle,
        description: config.metaDescription,
      };
    }

    case "editorial-detail": {
      const a = ctx.article;
      const eType = ctx.editorialType;
      if (!a) return { title: "Artículo", description: "" };
      const sectionName = eType ? EDITORIAL_TYPES[eType]?.plural : "Contenido";
      const title = a.metaTitle || `${a.title} | ${sectionName} - ${SITE_NAME}`;
      const description = a.metaDescription || a.excerpt || "";
      return { title, description };
    }

    case "faq-hub": {
      return {
        title: "Preguntas Frecuentes Coches Eléctricos",
        description: `Resolvemos tus dudas sobre coches eléctricos e híbridos: autonomía, carga, mantenimiento, ayudas y más. ${SITE_NAME}.`,
      };
    }

    case "faq-category": {
      const catName = ctx.faq?.categoryName || "Categoría";
      return {
        title: `${catName} - Preguntas Frecuentes`,
        description: `Preguntas frecuentes sobre ${catName.toLowerCase()} de vehículos eléctricos e híbridos. Respuestas de expertos de ${SITE_NAME}.`,
      };
    }

    case "faq-detail": {
      const q = ctx.faq;
      if (!q) return { title: "Pregunta", description: "" };
      const title = q.question;
      const answerPreview = q.answer ? clampLength(q.answer.replace(/<[^>]*>/g, ""), 155) : "";
      return { title, description: answerPreview };
    }

    case "home": {
      return {
        title: `${SITE_NAME} | Vehículos Eléctricos e Híbridos en ${DEFAULT_REGION}`,
        description: `Concesionario oficial líder en vehículos eléctricos e híbridos enchufables. Volkswagen, Audi, Škoda. Ofertas, Plan MOVES y servicio postventa especializado.`,
      };
    }

    default: {
      return {
        title: SITE_NAME,
        description: `${SITE_NAME} - Concesionario y taller especializado en vehículos eléctricos e híbridos en ${DEFAULT_REGION}.`,
      };
    }
  }
}

function generateCanonical(ctx: SeoContext): string {
  switch (ctx.pageType) {
    case "home":
      return BASE_URL;
    case "service-pillar":
      return `${BASE_URL}/servicios/${ctx.service}`;
    case "service-brand":
      return `${BASE_URL}/servicios/${ctx.slug || `${ctx.service}-${ctx.brand}`}`;
    case "brand":
      return `${BASE_URL}/marcas/${ctx.brand}`;
    case "city":
      return `${BASE_URL}/taller-electricos-${ctx.city}`;
    case "vehicle-electric":
      return `${BASE_URL}/vehiculos/electricos/${ctx.vehicle?.slug || ctx.slug}`;
    case "vehicle-hybrid":
      return `${BASE_URL}/vehiculos/hibridos/${ctx.vehicle?.slug || ctx.slug}`;
    case "editorial-hub": {
      const eType = ctx.editorialType;
      const section = eType ? EDITORIAL_TYPES[eType]?.slug : "novedades";
      return `${BASE_URL}/${section}`;
    }
    case "editorial-detail": {
      const eType = ctx.editorialType;
      const section = eType ? EDITORIAL_TYPES[eType]?.slug : "novedades";
      return `${BASE_URL}/${section}/${ctx.slug}`;
    }
    case "faq-hub":
      return `${BASE_URL}/preguntas`;
    case "faq-category":
      return `${BASE_URL}/preguntas/${ctx.faq?.categorySlug}`;
    case "faq-detail":
      return `${BASE_URL}/preguntas/${ctx.faq?.categorySlug}/${ctx.slug}`;
    default:
      return ctx.slug ? `${BASE_URL}/${ctx.slug}` : BASE_URL;
  }
}

function generateKeywords(ctx: SeoContext): string[] {
  const brandName = resolveBrandName(ctx.brand);
  const serviceName = resolveServiceName(ctx.service);
  const city = resolveCity(ctx.city);
  const official = isOfficialBrand(ctx.brand);

  switch (ctx.pageType) {
    case "service-brand":
      return [
        `${serviceName.toLowerCase()} ${brandName.toLowerCase()} eléctrico`,
        `${serviceName.toLowerCase()} ${brandName.toLowerCase()} ${city}`,
        `taller ${brandName.toLowerCase()} eléctrico ${city}`,
        `${brandName.toLowerCase()} eléctrico ${serviceName.toLowerCase()}`,
        `${official ? "concesionario" : "taller"} ${brandName.toLowerCase()} ${city}`,
      ];

    case "service-pillar":
      return [
        `${serviceName.toLowerCase()} coche eléctrico ${city}`,
        `${serviceName.toLowerCase()} vehículo eléctrico`,
        `taller ${serviceName.toLowerCase()} eléctrico ${city}`,
        `${serviceName.toLowerCase()} híbrido enchufable`,
      ];

    case "brand":
      return [
        `taller ${brandName.toLowerCase()} eléctrico ${city}`,
        `${brandName.toLowerCase()} eléctrico ${city}`,
        `${official ? "concesionario" : "taller"} ${brandName.toLowerCase()} ${city}`,
        `mantenimiento ${brandName.toLowerCase()} eléctrico`,
        `reparación ${brandName.toLowerCase()} eléctrico`,
      ];

    case "city":
      return [
        `taller eléctricos ${city}`,
        `taller coches eléctricos ${city}`,
        `mantenimiento eléctrico ${city}`,
        `reparación coche eléctrico ${city}`,
        `punto de carga ${city}`,
        `concesionario eléctrico ${city}`,
      ];

    case "vehicle-electric": {
      const v = ctx.vehicle;
      if (!v || !v.brand || !v.model) return [];
      const vb = v.brand.toLowerCase();
      const vm = v.model.toLowerCase();
      return [
        `${vb} ${vm} precio`,
        `${vb} ${vm} eléctrico`,
        `${vb} ${vm} autonomía`,
        `comprar ${vb} ${vm}`,
        `${vb} ${vm} ficha técnica`,
      ];
    }

    case "vehicle-hybrid": {
      const v = ctx.vehicle;
      if (!v || !v.brand || !v.model) return [];
      const vb = v.brand.toLowerCase();
      const vm = v.model.toLowerCase();
      return [
        `${vb} ${vm} híbrido`,
        `${vb} ${vm} precio`,
        `${vb} ${vm} PHEV`,
        `comprar ${vb} ${vm}`,
      ];
    }

    case "editorial-hub": {
      const eType = ctx.editorialType;
      if (!eType) return [];
      const config = EDITORIAL_TYPES[eType];
      return [
        `${config.plural.toLowerCase()} coches eléctricos`,
        `${config.plural.toLowerCase()} vehículos eléctricos`,
        `${config.plural.toLowerCase()} híbridos enchufables`,
      ];
    }

    case "editorial-detail": {
      const a = ctx.article;
      if (!a?.tags || a.tags.length === 0) return [];
      return a.tags.slice(0, 5);
    }

    case "faq-hub":
      return [
        "preguntas frecuentes coches eléctricos",
        "dudas vehículos eléctricos",
        "FAQ híbridos enchufables",
      ];

    case "faq-category": {
      const catName = ctx.faq?.categoryName || "";
      if (!catName) return [];
      return [
        `${catName.toLowerCase()} coches eléctricos`,
        `preguntas ${catName.toLowerCase()}`,
      ];
    }

    case "faq-detail": {
      const q = ctx.faq?.question || "";
      if (!q) return [];
      return [q.toLowerCase()];
    }

    case "home":
      return [
        "concesionario eléctrico Sevilla",
        "coches eléctricos Sevilla",
        "híbridos enchufables Sevilla",
        "taller eléctrico Sevilla",
      ];

    default:
      return [];
  }
}

export function generateJsonLd(ctx: SeoContext): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];

  switch (ctx.pageType) {
    case "service-brand":
      schemas.push(...buildServiceBrandSchemas(ctx));
      break;
    case "service-pillar":
      schemas.push(...buildServicePillarSchemas(ctx));
      break;
    case "brand":
      schemas.push(...buildBrandSchemas(ctx));
      break;
    case "city":
      schemas.push(...buildCitySchemas(ctx));
      break;
    case "vehicle-electric":
    case "vehicle-hybrid":
      schemas.push(...buildVehicleSchemas(ctx));
      break;
    case "editorial-detail":
      schemas.push(...buildArticleSchemas(ctx));
      break;
    case "faq-detail":
      schemas.push(...buildFaqSchemas(ctx));
      break;
  }

  return schemas;
}

function buildBreadcrumb(items: { name: string; path?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.path ? { item: `${BASE_URL}${item.path}` } : {}),
      })),
    ],
  };
}

function orgRef() {
  return { "@type": "AutoDealer", "@id": `${BASE_URL}/#organization`, name: SITE_NAME };
}

function buildServiceBrandSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const brandName = resolveBrandName(ctx.brand);
  const serviceName = resolveServiceName(ctx.service);
  const city = resolveCity(ctx.city);
  const official = isOfficialBrand(ctx.brand);
  const url = generateCanonical(ctx);
  const brandEntity = ctx.brand ? BRAND_ENTITY_IDS[ctx.brand] : undefined;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${serviceName} ${brandName} en ${city} | ${SITE_NAME}`,
    description: `Servicio de ${serviceName.toLowerCase()} para ${brandName} eléctrico e híbrido en ${city}.`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: [
      { "@id": `${BASE_URL}/#service-${ctx.service}` },
      { "@id": `${BASE_URL}/#brand-${ctx.brand}` },
      { "@id": `${BASE_URL}/#organization` },
    ],
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: "Servicios", path: "/postventa" },
      { name: serviceName, path: `/servicios/${ctx.service}` },
      { name: `${serviceName} ${brandName}` },
    ]),
    significantLink: [
      `${BASE_URL}/servicios/${ctx.service}`,
      `${BASE_URL}/marcas/${ctx.brand}`,
    ],
    lastReviewed: new Date().toISOString().split("T")[0],
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: `${serviceName} ${brandName} Eléctrico e Híbrido`,
    description: `${serviceName} para ${brandName} eléctrico e híbrido en ${city}. ${official ? "Taller oficial con técnicos certificados por el fabricante." : "Taller especializado con técnicos certificados en alta tensión."}`,
    url,
    category: SERVICE_CATEGORIES[ctx.service || ""] || serviceName,
    serviceType: ctx.service === "carga" ? "Instalación eléctrica" : "Servicio postventa automotriz",
    provider: {
      "@type": official ? "AutoDealer" : "AutoRepair",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      telephone: PHONE,
      email: EMAIL,
    },
    brand: {
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-${ctx.brand}`,
      name: brandName,
      ...(brandEntity ? { sameAs: brandEntity.sameAs } : {}),
    },
    areaServed: [
      { "@type": "State", name: "Andalucía", sameAs: "https://www.wikidata.org/wiki/Q5783" },
      { "@type": "State", name: "Extremadura", sameAs: "https://www.wikidata.org/wiki/Q5765" },
    ],
  };

  return [webPage, service];
}

function buildServicePillarSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const serviceName = resolveServiceName(ctx.service);
  const url = generateCanonical(ctx);

  const brands = ctx.service ? getServiceBrands(ctx.service) : [];

  const webPage = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CollectionPage"],
    "@id": `${url}/#webpage`,
    url,
    name: `${serviceName} de Coches Eléctricos e Híbridos en ${DEFAULT_CITY} | ${SITE_NAME}`,
    description: `Servicio de ${serviceName.toLowerCase()} para ${TRUST_METRICS.brandsServed} marcas de coches eléctricos e híbridos.`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: [
      { "@id": `${BASE_URL}/#service-${ctx.service}` },
      { "@id": `${BASE_URL}/#organization` },
    ],
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: "Servicios", path: "/postventa" },
      { name: serviceName },
    ]),
    mainEntity: {
      "@type": "ItemList",
      name: `${serviceName} por marca`,
      itemListElement: brands.map((b, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${serviceName} ${b.brandName}`,
        url: `${BASE_URL}${b.url}`,
      })),
    },
    significantLink: brands.map(b => `${BASE_URL}${b.url}`),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE_URL}/#service-${ctx.service}`,
    name: `${serviceName} de Vehículos Eléctricos e Híbridos`,
    url,
    provider: orgRef(),
    areaServed: [
      { "@type": "State", name: "Andalucía" },
      { "@type": "State", name: "Extremadura" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${serviceName} por marca`,
      itemListElement: brands.map(b => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${serviceName} ${b.brandName}`,
          url: `${BASE_URL}${b.url}`,
        },
      })),
    },
  };

  return [webPage, serviceSchema];
}

function buildBrandSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const brandName = resolveBrandName(ctx.brand);
  const url = generateCanonical(ctx);
  const official = isOfficialBrand(ctx.brand);
  const brandEntity = ctx.brand ? BRAND_ENTITY_IDS[ctx.brand] : undefined;
  const services = ctx.brand ? getBrandServices(ctx.brand) : [];

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${tallerType(ctx.brand)} ${brandName} Eléctrico en ${DEFAULT_CITY} | ${SITE_NAME}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: [
      { "@id": `${BASE_URL}/#brand-${ctx.brand}` },
      { "@id": `${BASE_URL}/#organization` },
    ],
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: "Marcas", path: "/electrificacion" },
      { name: brandName },
    ]),
    significantLink: services.map(s => `${BASE_URL}${s.url}`),
  };

  const dealerSchema = {
    "@context": "https://schema.org",
    "@type": official ? "AutoDealer" : "AutoRepair",
    "@id": `${url}/#dealer`,
    name: `${SITE_NAME} - ${tallerType(ctx.brand)} ${brandName}`,
    url,
    brand: {
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-${ctx.brand}`,
      name: brandName,
      ...(brandEntity ? { sameAs: brandEntity.sameAs } : {}),
    },
    parentOrganization: orgRef(),
    areaServed: [
      { "@type": "State", name: "Andalucía" },
      { "@type": "State", name: "Extremadura" },
    ],
    makesOffer: services.map(s => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        url: `${BASE_URL}${s.url}`,
      },
    })),
  };

  return [webPage, dealerSchema];
}

function buildCitySchemas(ctx: SeoContext): Record<string, unknown>[] {
  const cityName = resolveCity(ctx.city);
  const url = generateCanonical(ctx);
  const cityData = ctx.city ? getCityLandingData(ctx.city) : null;
  const cityInfo = ctx.city ? getCityBySlug(ctx.city) : null;

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `Taller de Vehículos Eléctricos en ${cityName} | ${SITE_NAME}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: "Concesionarios", path: "/concesionarios" },
      { name: cityName },
    ]),
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "@id": `${url}/#localbusiness`,
    name: `${SITE_NAME} ${cityName}`,
    url,
    telephone: PHONE,
    email: EMAIL,
    areaServed: {
      "@type": "City",
      name: cityName,
      ...(cityInfo ? { geo: { "@type": "GeoCoordinates", latitude: cityInfo.lat, longitude: cityInfo.lng } } : {}),
    },
    parentOrganization: orgRef(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios disponibles",
      itemListElement: SERVICES_OFFERED.map(s => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.description,
        },
      })),
    },
  };

  return [webPage, localBusiness];
}

function buildVehicleSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const v = ctx.vehicle;
  if (!v) return [];
  const url = generateCanonical(ctx);
  const isElectric = ctx.pageType === "vehicle-electric";
  const fuelType = isElectric ? "Electric" : "Hybrid";
  const brandSlug = ctx.brand || v.brand.toLowerCase().replace(/\s+/g, "-");
  const brandEntity = BRAND_ENTITY_IDS[brandSlug];

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${v.brand} ${v.model} - ${isElectric ? "Vehículo 100% Eléctrico" : "Híbrido Enchufable"} | ${SITE_NAME}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#brand-${brandSlug}` },
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: isElectric ? "Vehículos Eléctricos" : "Vehículos Híbridos", path: isElectric ? "/promociones-electricos" : "/promociones-hibridos" },
      { name: `${v.brand} ${v.model}` },
    ]),
    significantLink: [
      `${BASE_URL}/marcas/${brandSlug}`,
      `${BASE_URL}/servicios/mantenimiento-${brandSlug}`,
    ],
  };

  const car = {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${url}/#vehicle`,
    name: `${v.brand} ${v.model}`,
    brand: {
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-${brandSlug}`,
      name: v.brand,
      ...(brandEntity ? { sameAs: brandEntity.sameAs } : {}),
    },
    description: v.tagline
      ? `${v.tagline}. ${isElectric ? "Vehículo 100% eléctrico" : "Híbrido enchufable"} disponible en ${SITE_NAME}.`
      : `${v.brand} ${v.model} ${isElectric ? "eléctrico" : "híbrido enchufable"} en ${SITE_NAME}.`,
    fuelType,
    url,
    vehicleConfiguration: isElectric ? "100% Eléctrico" : "Híbrido Enchufable PHEV",
    offers: {
      "@type": "Offer",
      seller: orgRef(),
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      itemCondition: "https://schema.org/NewCondition",
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Etiqueta DGT", value: "CERO emisiones" },
      { "@type": "PropertyValue", name: "Tipo de motor", value: isElectric ? "100% Eléctrico" : "Híbrido Enchufable PHEV" },
    ],
  };

  return [webPage, car];
}

function buildArticleSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const a = ctx.article;
  if (!a) return [];
  const url = generateCanonical(ctx);
  const eType = ctx.editorialType;
  const sectionName = eType ? EDITORIAL_TYPES[eType]?.plural : "Contenido";
  const sectionSlug = eType ? EDITORIAL_TYPES[eType]?.slug : "novedades";

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}/#article`,
    headline: a.metaTitle || a.title,
    description: a.metaDescription || a.excerpt || "",
    url,
    datePublished: a.publishedAt || new Date().toISOString(),
    ...(a.updatedAt ? { dateModified: a.updatedAt } : {}),
    author: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: a.author || SITE_NAME,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}/#webpage` },
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "es",
    ...(a.featuredImage ? { image: { "@type": "ImageObject", url: a.featuredImage } } : {}),
    ...(a.tags && a.tags.length > 0 ? { keywords: a.tags.join(", ") } : {}),
    articleSection: sectionName,
    breadcrumb: buildBreadcrumb([
      { name: sectionName!, path: `/${sectionSlug}` },
      { name: a.title },
    ]),
  };

  return [article];
}

function buildFaqSchemas(ctx: SeoContext): Record<string, unknown>[] {
  const q = ctx.faq;
  if (!q) return [];
  const url = generateCanonical(ctx);

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}/#faqpage`,
    mainEntity: [
      {
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer },
      },
    ],
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url,
    name: `${q.question} | ${SITE_NAME}`,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "es",
    breadcrumb: buildBreadcrumb([
      { name: "Preguntas Frecuentes", path: "/preguntas" },
      ...(q.categoryName ? [{ name: q.categoryName, path: `/preguntas/${q.categorySlug}` }] : []),
      { name: clampLength(q.question, 40) },
    ]),
  };

  return [webPage, faq];
}

export function generateInternalLinks(ctx: SeoContext): { text: string; href: string; rel?: string }[] {
  const links: { text: string; href: string; rel?: string }[] = [];
  const brandName = resolveBrandName(ctx.brand);
  const serviceName = resolveServiceName(ctx.service);

  switch (ctx.pageType) {
    case "service-brand": {
      links.push({ text: `Todos los servicios de ${serviceName}`, href: `/servicios/${ctx.service}` });
      links.push({ text: `${brandName} - Página de marca`, href: `/marcas/${ctx.brand}` });
      const otherServices = Object.entries(SERVICE_DEFINITIONS)
        .filter(([slug]) => slug !== ctx.service)
        .map(([slug, def]) => ({
          text: `${def.title} ${brandName}`,
          href: `/servicios/${slug}-${ctx.brand}`,
        }));
      links.push(...otherServices);
      links.push({ text: "Solicitar cita", href: "/postventa" });
      break;
    }

    case "service-pillar": {
      const brands = ctx.service ? getServiceBrands(ctx.service) : [];
      brands.forEach(b => {
        links.push({ text: `${serviceName} ${b.brandName}`, href: b.url });
      });
      links.push({ text: "Todos los servicios", href: "/postventa" });
      break;
    }

    case "brand": {
      Object.entries(SERVICE_DEFINITIONS).forEach(([slug, def]) => {
        links.push({ text: `${def.title} ${brandName}`, href: `/servicios/${slug}-${ctx.brand}` });
      });
      links.push({ text: `Vehículos eléctricos ${brandName}`, href: "/promociones-electricos" });
      links.push({ text: "Todas las marcas", href: "/electrificacion" });
      break;
    }

    case "city": {
      SERVICES_OFFERED.forEach(s => {
        links.push({ text: s.name, href: `/servicios/${s.slug}` });
      });
      links.push({ text: "Todos los concesionarios", href: "/concesionarios" });
      break;
    }

    case "vehicle-electric":
    case "vehicle-hybrid": {
      const v = ctx.vehicle;
      if (v) {
        const brandSlug = ctx.brand || v.brand.toLowerCase().replace(/\s+/g, "-");
        links.push({ text: `Marca ${v.brand}`, href: `/marcas/${brandSlug}` });
        links.push({ text: `Mantenimiento ${v.brand}`, href: `/servicios/mantenimiento-${brandSlug}` });
        links.push({ text: `Diagnóstico ${v.brand}`, href: `/servicios/diagnostico-${brandSlug}` });
      }
      links.push({
        text: ctx.pageType === "vehicle-electric" ? "Todos los eléctricos" : "Todos los híbridos",
        href: ctx.pageType === "vehicle-electric" ? "/promociones-electricos" : "/promociones-hibridos",
      });
      break;
    }

    case "editorial-detail": {
      const eType = ctx.editorialType;
      if (eType) {
        const config = EDITORIAL_TYPES[eType];
        links.push({ text: `Más ${config.plural.toLowerCase()}`, href: `/${config.slug}` });
      }
      Object.entries(EDITORIAL_TYPES).forEach(([key, config]) => {
        if (key !== ctx.editorialType) {
          links.push({ text: config.plural, href: `/${config.slug}` });
        }
      });
      break;
    }

    case "editorial-hub": {
      Object.entries(EDITORIAL_TYPES).forEach(([, config]) => {
        links.push({ text: config.plural, href: `/${config.slug}` });
      });
      links.push({ text: "Preguntas frecuentes", href: "/preguntas" });
      break;
    }

    case "faq-hub":
    case "faq-category":
      links.push({ text: "Servicios postventa", href: "/postventa" });
      links.push({ text: "Novedades", href: "/novedades" });
      links.push({ text: "Todas las marcas", href: "/electrificacion" });
      break;

    case "faq-detail": {
      const cat = ctx.faq?.categorySlug;
      if (cat) links.push({ text: "Volver a la categoría", href: `/preguntas/${cat}` });
      links.push({ text: "Todas las preguntas", href: "/preguntas" });
      links.push({ text: "Solicitar cita", href: "/postventa" });
      break;
    }

    case "home":
      links.push({ text: "Vehículos eléctricos", href: "/promociones-electricos" });
      links.push({ text: "Vehículos híbridos", href: "/promociones-hibridos" });
      links.push({ text: "Servicios postventa", href: "/postventa" });
      links.push({ text: "Preguntas frecuentes", href: "/preguntas" });
      break;
  }

  return links;
}

export function generateH1(ctx: SeoContext): string {
  const brandName = resolveBrandName(ctx.brand);
  const serviceName = resolveServiceName(ctx.service);
  const city = resolveCity(ctx.city);

  switch (ctx.pageType) {
    case "service-brand":
      return `${serviceName} ${brandName} Eléctrico en ${city}`;
    case "service-pillar":
      return `${serviceName} de Vehículos Eléctricos e Híbridos`;
    case "brand":
      return `${tallerType(ctx.brand)} ${brandName} Eléctrico`;
    case "city":
      return `Taller de Vehículos Eléctricos e Híbridos en ${city}`;
    case "vehicle-electric":
      return ctx.vehicle ? `${ctx.vehicle.brand} ${ctx.vehicle.model}` : "Vehículo Eléctrico";
    case "vehicle-hybrid":
      return ctx.vehicle ? `${ctx.vehicle.brand} ${ctx.vehicle.model}` : "Vehículo Híbrido";
    case "editorial-detail":
      return ctx.article?.title || "Artículo";
    case "editorial-hub": {
      const eType = ctx.editorialType;
      return eType ? EDITORIAL_TYPES[eType].plural : "Contenido";
    }
    case "faq-detail":
      return ctx.faq?.question || "Pregunta frecuente";
    case "faq-category":
      return ctx.faq?.categoryName || "Categoría";
    case "faq-hub":
      return "Preguntas Frecuentes sobre Coches Eléctricos e Híbridos";
    case "home":
      return `${SITE_NAME} - Vehículos Eléctricos e Híbridos`;
    default:
      return SITE_NAME;
  }
}

export function generateSeoBundle(ctx: SeoContext) {
  return {
    metadata: generateMetadata(ctx),
    jsonLd: generateJsonLd(ctx),
    internalLinks: generateInternalLinks(ctx),
    h1: generateH1(ctx),
    canonical: generateCanonical(ctx),
  };
}

export { BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE, DEFAULT_CITY };
