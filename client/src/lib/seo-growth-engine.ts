import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS, TRUST_METRICS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";

const CITY_DATA = SERVICE_CITIES.map((c) => ({ slug: c.slug, city: c.city, region: c.region, nearbyAreas: c.nearbyAreas }));

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

export const SUB_SERVICE_SLUGS: Record<string, { slug: string; name: string; parent: string }[]> = {
  reparacion: [
    { slug: "bateria-alto-voltaje", name: "Reparación de Batería de Alto Voltaje", parent: "reparacion" },
    { slug: "motor-electrico", name: "Reparación de Motor Eléctrico", parent: "reparacion" },
    { slug: "inversor-potencia", name: "Reparación de Inversor de Potencia", parent: "reparacion" },
    { slug: "sistema-frenado-regenerativo", name: "Reparación del Sistema de Frenado Regenerativo", parent: "reparacion" },
  ],
  diagnostico: [
    { slug: "diagnostico-bateria", name: "Diagnóstico de Batería HV", parent: "diagnostico" },
    { slug: "calibracion-adas", name: "Calibración de Sistemas ADAS", parent: "diagnostico" },
    { slug: "diagnostico-carga", name: "Diagnóstico de Problemas de Carga", parent: "diagnostico" },
  ],
  mantenimiento: [
    { slug: "revision-pre-itv", name: "Revisión Pre-ITV Eléctrico", parent: "mantenimiento" },
    { slug: "cambio-liquido-refrigerante-hv", name: "Cambio de Líquido Refrigerante HV", parent: "mantenimiento" },
    { slug: "actualizacion-software", name: "Actualización de Software del Vehículo", parent: "mantenimiento" },
  ],
  carga: [
    { slug: "instalacion-wallbox-domicilio", name: "Instalación Wallbox a Domicilio", parent: "carga" },
    { slug: "instalacion-cargador-empresa", name: "Instalación de Cargador para Empresa", parent: "carga" },
    { slug: "instalacion-cargador-comunidad", name: "Instalación Cargador en Comunidad de Vecinos", parent: "carga" },
  ],
  garantia: [
    { slug: "extension-garantia-bateria", name: "Extensión de Garantía de Batería", parent: "garantia" },
    { slug: "gestion-recalls", name: "Gestión de Recalls y Campañas", parent: "garantia" },
  ],
};

export const PROBLEM_TOPICS: { slug: string; name: string; relatedServices: string[] }[] = [
  { slug: "perdida-autonomia", name: "Pérdida de Autonomía", relatedServices: ["diagnostico", "mantenimiento", "reparacion"] },
  { slug: "error-carga", name: "Error de Carga", relatedServices: ["diagnostico", "carga", "reparacion"] },
  { slug: "aviso-bateria", name: "Aviso de Batería", relatedServices: ["diagnostico", "reparacion", "garantia"] },
  { slug: "ruido-motor-electrico", name: "Ruido en Motor Eléctrico", relatedServices: ["diagnostico", "reparacion"] },
  { slug: "fallo-frenada-regenerativa", name: "Fallo en Frenada Regenerativa", relatedServices: ["diagnostico", "reparacion", "mantenimiento"] },
  { slug: "degradacion-bateria", name: "Degradación de Batería", relatedServices: ["diagnostico", "garantia", "reparacion"] },
  { slug: "error-inversor", name: "Error en Inversor de Potencia", relatedServices: ["diagnostico", "reparacion"] },
  { slug: "problema-climatizacion", name: "Problema de Climatización / Bomba de Calor", relatedServices: ["diagnostico", "reparacion", "mantenimiento"] },
  { slug: "fallo-cargador-bordo", name: "Fallo del Cargador a Bordo", relatedServices: ["diagnostico", "reparacion"] },
  { slug: "calibracion-adas", name: "Calibración de Sensores ADAS", relatedServices: ["diagnostico", "mantenimiento"] },
];

export const VEHICLE_MODEL_FAMILIES: Record<string, string[]> = {
  volkswagen: ["ID.3", "ID.4", "ID.5", "ID.7", "ID. Buzz", "e-Golf"],
  audi: ["e-tron", "e-tron GT", "Q4 e-tron", "Q6 e-tron", "Q8 e-tron"],
  skoda: ["Enyaq iV", "Enyaq Coupé iV", "Elroq"],
  cupra: ["Born", "Tavascan"],
  seat: ["Mó eScooter 125"],
  tesla: ["Model 3", "Model Y", "Model S", "Model X"],
  byd: ["Atto 3", "Dolphin", "Seal", "Tang", "Han"],
  hyundai: ["IONIQ 5", "IONIQ 6", "Kona Electric"],
  bmw: ["iX1", "iX3", "iX", "i4", "i5", "i7", "iX2"],
  "mercedes-benz": ["EQA", "EQB", "EQC", "EQE", "EQS", "EQS SUV", "EQV"],
  kia: ["EV6", "EV9", "Niro EV", "Soul EV"],
  volvo: ["EX30", "EX40", "EX90", "EC40"],
  peugeot: ["e-208", "e-308", "e-2008", "e-3008", "e-5008"],
  renault: ["Megane E-Tech", "Scenic E-Tech", "ZOE", "R5 E-Tech"],
};

export type GrowthPageType = "sub-service-brand" | "problem-brand" | "problem-brand-city";

export interface GrowthPageConfig {
  type: GrowthPageType;
  slug: string;
  routePath: string;
  canonicalUrl: string;
}

export interface GrowthPage {
  config: GrowthPageConfig;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  sections: GrowthContentSection[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
  relatedLinks: { label: string; href: string }[];
  breadcrumbs: { label: string; href: string }[];
  jsonLdService: string;
}

export interface GrowthContentSection {
  heading: string;
  icon: string;
  paragraphs: string[];
}

export interface GrowthOpportunity {
  type: GrowthPageType;
  slug: string;
  estimatedSearchVolume: "alta" | "media" | "baja";
  competition: "alta" | "media" | "baja";
  priority: number;
  reason: string;
}

export interface GrowthReport {
  existingPages: {
    static: number;
    serviceBrand: number;
    programmatic: number;
    total: number;
  };
  newOpportunities: {
    subServiceBrand: number;
    problemBrand: number;
    problemBrandCity: number;
    total: number;
  };
  projectedTotal: number;
  opportunities: GrowthOpportunity[];
  topPriority: GrowthOpportunity[];
}

function getAllSubServiceBrandSlugs(): string[] {
  const slugs: string[] = [];
  for (const parentService of SERVICE_SLUGS) {
    const subs = SUB_SERVICE_SLUGS[parentService] || [];
    for (const sub of subs) {
      for (const brand of Object.keys(BRAND_NAMES)) {
        slugs.push(`${sub.slug}-${brand}`);
      }
    }
  }
  return slugs;
}

function getAllProblemBrandSlugs(): string[] {
  const slugs: string[] = [];
  for (const problem of PROBLEM_TOPICS) {
    for (const brand of Object.keys(BRAND_NAMES)) {
      slugs.push(`${problem.slug}-${brand}`);
    }
  }
  return slugs;
}

function getAllProblemBrandCitySlugs(): string[] {
  const slugs: string[] = [];
  for (const problem of PROBLEM_TOPICS) {
    for (const brand of Object.keys(BRAND_NAMES)) {
      for (const city of CITY_DATA) {
        slugs.push(`${problem.slug}-${brand}-${city.slug}`);
      }
    }
  }
  return slugs;
}

export function getAllGrowthSlugs(): GrowthPageConfig[] {
  const configs: GrowthPageConfig[] = [];

  for (const slug of getAllSubServiceBrandSlugs()) {
    configs.push({
      type: "sub-service-brand",
      slug,
      routePath: `/servicios/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/servicios/${slug}`,
    });
  }

  for (const slug of getAllProblemBrandSlugs()) {
    configs.push({
      type: "problem-brand",
      slug,
      routePath: `/problemas/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/problemas/${slug}`,
    });
  }

  for (const slug of getAllProblemBrandCitySlugs()) {
    configs.push({
      type: "problem-brand-city",
      slug,
      routePath: `/problemas/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/problemas/${slug}`,
    });
  }

  return configs;
}

export function parseGrowthSlug(slug: string): {
  type: GrowthPageType;
  subService?: { slug: string; name: string; parent: string };
  problem?: { slug: string; name: string; relatedServices: string[] };
  brandSlug: string;
  brandName: string;
  citySlug?: string;
  cityName?: string;
} | null {
  for (const parentService of SERVICE_SLUGS) {
    const subs = SUB_SERVICE_SLUGS[parentService] || [];
    for (const sub of subs) {
      if (!slug.startsWith(sub.slug + "-")) continue;
      const rest = slug.slice(sub.slug.length + 1);
      for (const brand of Object.keys(BRAND_NAMES)) {
        if (rest === brand) {
          return { type: "sub-service-brand", subService: sub, brandSlug: brand, brandName: BRAND_NAMES[brand] };
        }
      }
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    if (!slug.startsWith(problem.slug + "-")) continue;
    const rest = slug.slice(problem.slug.length + 1);

    for (const brand of Object.keys(BRAND_NAMES)) {
      if (rest === brand) {
        return { type: "problem-brand", problem, brandSlug: brand, brandName: BRAND_NAMES[brand] };
      }
      if (rest.startsWith(brand + "-")) {
        const citySlug = rest.slice(brand.length + 1);
        const cityData = CITY_DATA.find((c) => c.slug === citySlug);
        if (cityData) {
          return {
            type: "problem-brand-city",
            problem,
            brandSlug: brand,
            brandName: BRAND_NAMES[brand],
            citySlug,
            cityName: cityData.city,
          };
        }
      }
    }
  }

  return null;
}

export function isGrowthSlug(slug: string, prefix: "servicios" | "problemas"): boolean {
  const parsed = parseGrowthSlug(slug);
  if (!parsed) return false;
  if (prefix === "servicios") return parsed.type === "sub-service-brand";
  return parsed.type === "problem-brand" || parsed.type === "problem-brand-city";
}

export function generateGrowthPage(slug: string): GrowthPage | null {
  const parsed = parseGrowthSlug(slug);
  if (!parsed) return null;

  const { brandSlug, brandName } = parsed;
  const official = OFFICIAL_BRANDS.includes(brandSlug);
  const tt = official ? "Taller Oficial" : "Taller Especializado";
  const seed = hash(slug);
  const models = VEHICLE_MODEL_FAMILIES[brandSlug] || [];
  const modelList = models.length > 0 ? models.slice(0, 4).join(", ") : `modelos ${brandName}`;

  if (parsed.type === "sub-service-brand" && parsed.subService) {
    return generateSubServiceBrandPage(slug, parsed.subService, brandSlug, brandName, official, tt, seed, modelList);
  }

  if (parsed.type === "problem-brand" && parsed.problem) {
    return generateProblemBrandPage(slug, parsed.problem, brandSlug, brandName, official, tt, seed, modelList);
  }

  if (parsed.type === "problem-brand-city" && parsed.problem && parsed.citySlug && parsed.cityName) {
    return generateProblemBrandCityPage(slug, parsed.problem, brandSlug, brandName, parsed.citySlug, parsed.cityName, official, tt, seed, modelList);
  }

  return null;
}

function generateSubServiceBrandPage(
  slug: string,
  sub: { slug: string; name: string; parent: string },
  brandSlug: string,
  brandName: string,
  official: boolean,
  tt: string,
  seed: number,
  modelList: string,
): GrowthPage {
  const parentDef = SERVICE_DEFINITIONS[sub.parent];
  const parentTitle = parentDef?.title || sub.parent;

  const h1Templates = [
    `${sub.name} para ${brandName} Eléctrico`,
    `${sub.name} ${brandName} — ${tt}`,
    `Servicio de ${sub.name} para ${brandName}`,
  ];

  const titleTemplates = [
    `${sub.name} ${brandName} Eléctrico`,
    `${sub.name} para ${brandName}`,
  ];

  const h1 = pick(h1Templates, seed);
  let metaTitle = pick(titleTemplates, seed + 1);
  if (metaTitle.length > 55) metaTitle = metaTitle.slice(0, 52) + "...";

  const descTemplates = [
    `Servicio especializado de ${sub.name.toLowerCase()} para ${brandName} eléctrico e híbrido. ${tt} con técnicos certificados. Presupuesto sin compromiso.`,
    `${sub.name} para tu ${brandName} eléctrico. +${TRUST_METRICS.yearsExperience} años de experiencia, equipamiento oficial. Pide cita online.`,
  ];

  let metaDescription = pick(descTemplates, seed + 2);
  if (metaDescription.length > 155) metaDescription = metaDescription.slice(0, 152) + "...";

  const introTemplates = [
    `En Grupo Avisa ofrecemos un servicio especializado de ${sub.name.toLowerCase()} para vehículos ${brandName} eléctricos e híbridos enchufables. Como ${tt.toLowerCase()} con más de ${TRUST_METRICS.yearsExperience} años de experiencia, nuestros técnicos están certificados para trabajar con los sistemas de alta tensión de ${brandName}, incluyendo modelos como ${modelList}.`,
    `¿Tu ${brandName} eléctrico necesita ${sub.name.toLowerCase()}? Nuestro ${tt.toLowerCase()} cuenta con el equipamiento más avanzado y técnicos formados específicamente en la arquitectura eléctrica de ${brandName}. Atendemos todos los modelos: ${modelList}.`,
    `La ${sub.name.toLowerCase()} de vehículos ${brandName} eléctricos requiere conocimiento especializado y herramientas específicas. En nuestro ${tt.toLowerCase()} disponemos de todo lo necesario para intervenir con total seguridad y garantía en tu ${brandName}.`,
  ];

  const sections: GrowthContentSection[] = [
    {
      heading: `¿En qué consiste la ${sub.name.toLowerCase()} de ${brandName}?`,
      icon: "ri-information-line",
      paragraphs: getSubServiceExplanation(sub.slug, brandName, modelList),
    },
    {
      heading: `¿Cuándo necesita tu ${brandName} este servicio?`,
      icon: "ri-error-warning-line",
      paragraphs: getSubServiceSymptoms(sub.slug, brandName),
    },
    {
      heading: `Proceso en nuestro ${tt}`,
      icon: "ri-list-check-2",
      paragraphs: getSubServiceProcess(sub.slug, brandName, tt),
    },
    {
      heading: `Garantía y calidad certificada`,
      icon: "ri-shield-check-line",
      paragraphs: [
        official
          ? `Al ser concesionario oficial ${brandName}, cada intervención de ${sub.name.toLowerCase()} se realiza con repuestos originales y se registra en el historial oficial del vehículo, manteniendo la garantía del fabricante.`
          : `Como taller especializado en ${brandName}, utilizamos repuestos de primera calidad homologados y seguimos los protocolos del fabricante para cada intervención de ${sub.name.toLowerCase()}.`,
        `Ofrecemos garantía de 2 años en piezas y mano de obra. Más de ${TRUST_METRICS.vehiclesServiced} vehículos electrificados avalan nuestra experiencia.`,
      ],
    },
  ];

  const faqs = generateSubServiceFaqs(sub, brandName, tt, seed);

  const relatedLinks = [
    { label: `${parentTitle} ${brandName}`, href: `/servicios/${sub.parent}-${brandSlug}` },
    ...SERVICE_SLUGS.filter((s) => s !== sub.parent)
      .slice(0, 3)
      .map((s) => ({
        label: `${SERVICE_DEFINITIONS[s]?.title || s} ${brandName}`,
        href: `/servicios/${s}-${brandSlug}`,
      })),
  ];

  return {
    config: {
      type: "sub-service-brand",
      slug,
      routePath: `/servicios/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/servicios/${slug}`,
    },
    h1,
    metaTitle,
    metaDescription,
    intro: pick(introTemplates, seed + 3),
    sections,
    faqs,
    ctaHeading: `¿Necesitas ${sub.name.toLowerCase()} para tu ${brandName}?`,
    ctaText: `Contacta con nuestro equipo especializado. Presupuesto sin compromiso y cita inmediata para tu ${brandName} eléctrico.`,
    relatedLinks,
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/postventa" },
      { label: parentTitle, href: `/servicios/${sub.parent}` },
      { label: `${sub.name} ${brandName}`, href: `/servicios/${slug}` },
    ],
    jsonLdService: sub.name,
  };
}

function generateProblemBrandPage(
  slug: string,
  problem: { slug: string; name: string; relatedServices: string[] },
  brandSlug: string,
  brandName: string,
  official: boolean,
  tt: string,
  seed: number,
  modelList: string,
): GrowthPage {
  const h1Templates = [
    `${problem.name} en ${brandName} Eléctrico — Solución Profesional`,
    `Solucionar ${problem.name} en tu ${brandName} Eléctrico`,
    `${problem.name} ${brandName}: Diagnóstico y Reparación`,
  ];

  const h1 = pick(h1Templates, seed);

  const titleTemplates = [
    `${problem.name} ${brandName} Eléctrico`,
    `Solucionar ${problem.name} en ${brandName}`,
  ];

  let metaTitle = pick(titleTemplates, seed + 1);
  if (metaTitle.length > 55) metaTitle = metaTitle.slice(0, 52) + "...";

  let metaDescription = `¿${problem.name} en tu ${brandName} eléctrico? ${tt} con diagnóstico avanzado y técnicos certificados. Solución garantizada. Pide cita.`;
  if (metaDescription.length > 155) metaDescription = metaDescription.slice(0, 152) + "...";

  const introTemplates = [
    `Si tu ${brandName} eléctrico presenta ${problem.name.toLowerCase()}, es fundamental acudir a un ${tt.toLowerCase()} con experiencia en sistemas de alta tensión. En Grupo Avisa diagnosticamos y solucionamos este problema en modelos como ${modelList}, con equipamiento oficial y técnicos certificados.`,
    `El ${problem.name.toLowerCase()} es uno de los problemas más consultados por propietarios de ${brandName} eléctricos. Nuestro ${tt.toLowerCase()} cuenta con la tecnología y experiencia necesarias para identificar la causa raíz y aplicar la solución más eficaz.`,
    `¿Tu ${brandName} muestra síntomas de ${problem.name.toLowerCase()}? No esperes a que el problema se agrave. Nuestro equipo de técnicos especializados en ${brandName} diagnostica y resuelve este tipo de incidencias a diario, con garantía de 2 años.`,
  ];

  const sections: GrowthContentSection[] = [
    {
      heading: `¿Qué causa ${problem.name.toLowerCase()} en ${brandName}?`,
      icon: "ri-question-line",
      paragraphs: getProblemCauses(problem.slug, brandName, modelList),
    },
    {
      heading: `Síntomas que debes vigilar`,
      icon: "ri-alert-line",
      paragraphs: getProblemSymptoms(problem.slug, brandName),
    },
    {
      heading: `Nuestro proceso de diagnóstico y solución`,
      icon: "ri-tools-line",
      paragraphs: getProblemSolution(problem.slug, brandName, tt),
    },
    {
      heading: `Coste y tiempo de reparación`,
      icon: "ri-money-euro-circle-line",
      paragraphs: getProblemCostTime(problem.slug, brandName),
    },
  ];

  const faqs = generateProblemFaqs(problem, brandName, tt, seed);

  const relatedLinks = problem.relatedServices.slice(0, 3).map((s) => ({
    label: `${SERVICE_DEFINITIONS[s]?.title || s} ${brandName}`,
    href: `/servicios/${s}-${brandSlug}`,
  }));

  CITY_DATA.slice(0, 3).forEach((c) => {
    relatedLinks.push({
      label: `${problem.name} ${brandName} en ${c.city}`,
      href: `/problemas/${problem.slug}-${brandSlug}-${c.slug}`,
    });
  });

  return {
    config: {
      type: "problem-brand",
      slug,
      routePath: `/problemas/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/problemas/${slug}`,
    },
    h1,
    metaTitle,
    metaDescription,
    intro: pick(introTemplates, seed + 3),
    sections,
    faqs,
    ctaHeading: `¿Tu ${brandName} presenta ${problem.name.toLowerCase()}?`,
    ctaText: `Diagnóstico profesional sin compromiso. Nuestros técnicos identifican y solucionan el problema con garantía.`,
    relatedLinks,
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Problemas frecuentes", href: "/problemas" },
      { label: `${problem.name} ${brandName}`, href: `/problemas/${slug}` },
    ],
    jsonLdService: `Diagnóstico y reparación: ${problem.name}`,
  };
}

function generateProblemBrandCityPage(
  slug: string,
  problem: { slug: string; name: string; relatedServices: string[] },
  brandSlug: string,
  brandName: string,
  citySlug: string,
  cityName: string,
  official: boolean,
  tt: string,
  seed: number,
  modelList: string,
): GrowthPage {
  const h1Templates = [
    `${problem.name} en ${brandName} Eléctrico en ${cityName}`,
    `Solucionar ${problem.name} ${brandName} · ${cityName}`,
    `${problem.name} ${brandName} en ${cityName} — ${tt}`,
  ];

  const h1 = pick(h1Templates, seed);

  let metaTitle = `${problem.name} ${brandName} en ${cityName}`;
  if (metaTitle.length > 55) metaTitle = metaTitle.slice(0, 52) + "...";

  let metaDescription = `${problem.name} en tu ${brandName} eléctrico en ${cityName}. ${tt} con diagnóstico avanzado. Solución garantizada. Pide cita.`;
  if (metaDescription.length > 155) metaDescription = metaDescription.slice(0, 152) + "...";

  const cityData = CITY_DATA.find((c) => c.slug === citySlug);
  const nearbyAreas = cityData?.nearbyAreas?.slice(0, 4).join(", ") || cityName;

  const introTemplates = [
    `Si tu ${brandName} eléctrico presenta ${problem.name.toLowerCase()} en ${cityName} o alrededores (${nearbyAreas}), nuestro ${tt.toLowerCase()} ofrece diagnóstico especializado y solución garantizada. Atendemos modelos como ${modelList}.`,
    `¿${problem.name} en tu ${brandName} eléctrico en ${cityName}? No te preocupes: nuestros técnicos en ${cityName} están especializados en sistemas de alta tensión ${brandName} y resuelven este problema a diario con garantía de 2 años.`,
  ];

  const sections: GrowthContentSection[] = [
    {
      heading: `${problem.name} en ${brandName}: causas frecuentes`,
      icon: "ri-question-line",
      paragraphs: getProblemCauses(problem.slug, brandName, modelList),
    },
    {
      heading: `Cómo lo solucionamos en ${cityName}`,
      icon: "ri-tools-line",
      paragraphs: getProblemSolution(problem.slug, brandName, tt),
    },
    {
      heading: `Cobertura en ${cityName} y alrededores`,
      icon: "ri-map-pin-line",
      paragraphs: [
        `Atendemos a propietarios de ${brandName} eléctrico en ${cityName} y zonas cercanas: ${nearbyAreas}. Disponemos de servicio de recogida y entrega a domicilio en un radio de 30 km.`,
        `Nuestro centro en ${cityName} está equipado con la tecnología de diagnóstico más avanzada para vehículos eléctricos ${brandName}, incluyendo analizadores de batería de alto voltaje y equipos de calibración ADAS.`,
      ],
    },
  ];

  const faqs = generateProblemFaqs(problem, brandName, tt, seed, cityName);

  const relatedLinks = [
    { label: `${problem.name} ${brandName}`, href: `/problemas/${problem.slug}-${brandSlug}` },
    ...problem.relatedServices.slice(0, 2).map((s) => ({
      label: `${SERVICE_DEFINITIONS[s]?.title || s} ${brandName} en ${cityName}`,
      href: `/servicios/${s}-${brandSlug}-${citySlug}`,
    })),
    { label: `Taller eléctricos ${cityName}`, href: `/taller-electricos-${citySlug}` },
  ];

  return {
    config: {
      type: "problem-brand-city",
      slug,
      routePath: `/problemas/${slug}`,
      canonicalUrl: `https://electricos.grupoavisa.com/problemas/${slug}`,
    },
    h1,
    metaTitle,
    metaDescription,
    intro: pick(introTemplates, seed + 3),
    sections,
    faqs,
    ctaHeading: `¿${problem.name} en tu ${brandName} en ${cityName}?`,
    ctaText: `Diagnóstico sin compromiso. Cita inmediata en nuestro centro de ${cityName}.`,
    relatedLinks,
    breadcrumbs: [
      { label: "Inicio", href: "/" },
      { label: "Problemas frecuentes", href: "/problemas" },
      { label: `${problem.name} ${brandName}`, href: `/problemas/${problem.slug}-${brandSlug}` },
      { label: cityName, href: `/problemas/${slug}` },
    ],
    jsonLdService: `Diagnóstico y reparación: ${problem.name}`,
  };
}

function getSubServiceExplanation(subSlug: string, brand: string, models: string): string[] {
  const explanations: Record<string, string[]> = {
    "bateria-alto-voltaje": [
      `La batería de alto voltaje es el componente más crítico y costoso de tu ${brand} eléctrico. Su reparación requiere técnicos con certificación de alta tensión (nivel 3) y equipamiento de seguridad especializado.`,
      `Realizamos diagnóstico célula a célula, sustitución de módulos individuales, reparación del BMS (Battery Management System) y recalibración del pack de baterías para modelos como ${models}. Cada intervención se realiza en zona de trabajo con aislamiento específico de alto voltaje.`,
    ],
    "motor-electrico": [
      `El motor eléctrico de tu ${brand} es un componente de alta precisión que requiere herramientas de diagnóstico específicas. Aunque los motores eléctricos son más fiables que los de combustión, pueden presentar problemas en rodamientos, bobinado o sensores de posición.`,
      `Nuestros técnicos especializados en ${brand} diagnostican y reparan motores eléctricos con equipamiento de medición de aislamiento, análisis de vibraciones y verificación de corrientes de fuga. Cubrimos modelos: ${models}.`,
    ],
    "inversor-potencia": [
      `El inversor de potencia controla la conversión de corriente continua de la batería a corriente alterna para el motor de tu ${brand}. Es un componente electrónico de alta complejidad que requiere diagnóstico especializado.`,
      `Diagnosticamos fallos en IGBTs, capacitores, circuitos de control y refrigeración del inversor. Disponemos de bancos de prueba específicos para verificar el rendimiento del inversor en condiciones controladas.`,
    ],
    "sistema-frenado-regenerativo": [
      `El sistema de frenado regenerativo de tu ${brand} recupera energía durante la deceleración, pero su complejidad electromecánica requiere mantenimiento especializado. Un mal funcionamiento afecta tanto a la autonomía como a la seguridad.`,
      `Verificamos la integración entre el frenado regenerativo y el frenado mecánico, calibramos los niveles de recuperación y comprobamos los sensores de velocidad de rueda y el módulo de control de estabilidad.`,
    ],
    "diagnostico-bateria": [
      `El diagnóstico de la batería de alto voltaje va mucho más allá del indicador del cuadro de instrumentos. Medimos la capacidad real (SOH), resistencia interna de cada celda, equilibrado del pack y eficiencia del sistema de refrigeración.`,
      `Para tu ${brand} utilizamos herramientas de diagnóstico que acceden directamente al BMS y proporcionan datos precisos sobre el estado de cada módulo de la batería. Modelos cubiertos: ${models}.`,
    ],
    "calibracion-adas": [
      `Los sistemas ADAS (Advanced Driver Assistance Systems) de tu ${brand} requieren calibración precisa tras sustitución de parabrisas, reparación de carrocería, alineación de dirección o cualquier impacto que pueda haber desplazado los sensores.`,
      `Disponemos de equipamiento de calibración estática y dinámica para cámaras frontales, radares de medio y largo alcance, sensores ultrasónicos y lidar, específicos para los modelos ${brand}: ${models}.`,
    ],
    "diagnostico-carga": [
      `Los problemas de carga en vehículos ${brand} eléctricos pueden originarse en el cargador a bordo, el puerto de carga, el protocolo de comunicación con la infraestructura o el propio BMS. Un diagnóstico preciso es esencial para identificar la causa.`,
      `Verificamos la comunicación entre tu ${brand} y el punto de carga (protocolo ISO 15118), el funcionamiento del cargador a bordo en AC y DC, los relés de aislamiento y los sensores de temperatura del circuito de carga.`,
    ],
    "revision-pre-itv": [
      `La ITV de un vehículo eléctrico ${brand} incluye verificaciones específicas del sistema de alta tensión además de los controles habituales. Una revisión pre-ITV especializada evita rechazos y te ahorra tiempo.`,
      `Comprobamos emisiones acústicas (según normativa UN R138), aislamiento del circuito de alta tensión, funcionamiento de luces y señalización, frenos (mecánicos y regenerativo), suspensión, neumáticos y estado del cableado HV. Cubrimos: ${models}.`,
    ],
    "cambio-liquido-refrigerante-hv": [
      `El circuito de refrigeración de la batería de tu ${brand} utiliza un líquido refrigerante específico de baja conductividad eléctrica. Su sustitución periódica es esencial para mantener la eficiencia térmica y proteger la batería.`,
      `Utilizamos exclusivamente el líquido refrigerante especificado por ${brand} y realizamos un purgado completo del circuito para evitar bolsas de aire que podrían comprometer la refrigeración. Intervalos habituales: cada 4-5 años o 80.000 km.`,
    ],
    "actualizacion-software": [
      `Las actualizaciones de software de tu ${brand} pueden mejorar la autonomía, optimizar los perfiles de carga, añadir funcionalidades y corregir problemas conocidos. Algunas actualizaciones requieren instalación en taller con el equipo de diagnóstico oficial.`,
      `Verificamos si hay actualizaciones pendientes para todas las centralitas de tu ${brand}: BMS, motor, inversor, cargador a bordo, ADAS, infotainment y conectividad. Aplicamos las actualizaciones siguiendo los protocolos oficiales para modelos: ${models}.`,
    ],
    "instalacion-wallbox-domicilio": [
      `La instalación de un wallbox doméstico para tu ${brand} incluye el estudio de tu instalación eléctrica, la selección del cargador más compatible y la instalación certificada con boletín eléctrico oficial.`,
      `Gestionamos las ayudas del Plan MOVES que pueden cubrir hasta el 80% del coste. Te asesoramos sobre programación de carga inteligente para maximizar el ahorro en la tarifa eléctrica con tu ${brand}.`,
    ],
    "instalacion-cargador-empresa": [
      `La instalación de puntos de carga para empresa permite ofrecer este servicio a empleados con vehículos ${brand} eléctricos y visitantes. Diseñamos soluciones escalables con gestión de carga inteligente y facturación por usuario.`,
      `Cubrimos desde instalaciones de 1-2 puntos para pymes hasta flotas corporativas con decenas de cargadores, incluyendo sistemas de gestión de energía que evitan sobrecargas y optimizan el consumo.`,
    ],
    "instalacion-cargador-comunidad": [
      `La ley ampara tu derecho a instalar un punto de carga en tu plaza de garaje comunitario para tu ${brand} eléctrico. Solo necesitas comunicarlo a la comunidad de propietarios; no requiere aprobación de junta.`,
      `Realizamos el estudio de viabilidad eléctrica, la instalación con contador individual y boletín oficial, y gestionamos las ayudas del Plan MOVES. Experiencia en más de 200 comunidades en la zona.`,
    ],
    "extension-garantia-bateria": [
      `La batería de tu ${brand} tiene una garantía de fábrica de 8 años o 160.000 km. Nuestra extensión de garantía puede ampliar esta cobertura hasta 5 años adicionales, cubriendo la degradación por debajo del 70% del SOH.`,
      `Monitorizamos el estado de tu batería en cada visita y te alertamos si detectamos una degradación que podría dar lugar a una reclamación de garantía, ya sea de fábrica o extendida.`,
    ],
    "gestion-recalls": [
      `Verificamos si tu ${brand} tiene campañas de servicio (recalls) pendientes relacionadas con el sistema eléctrico, software de la batería, actualizaciones de seguridad u otros componentes. Las aplicamos sin coste para ti.`,
      `Los recalls en vehículos eléctricos ${brand} suelen estar relacionados con actualizaciones del BMS, firmware del cargador a bordo o calibraciones de seguridad. Es importante mantener tu vehículo al día para garantizar su correcto funcionamiento.`,
    ],
  };

  return explanations[subSlug] || [
    `Servicio especializado de ${subSlug.replace(/-/g, " ")} para tu ${brand} eléctrico. Nuestros técnicos certificados cuentan con la formación y el equipamiento necesarios para intervenir con total seguridad y garantía.`,
    `Cubrimos todos los modelos ${brand} eléctricos e híbridos: ${models}.`,
  ];
}

function getSubServiceSymptoms(subSlug: string, brand: string): string[] {
  const symptoms: Record<string, string[]> = {
    "bateria-alto-voltaje": [
      `Si tu ${brand} muestra alguno de estos síntomas, la batería de alto voltaje puede necesitar intervención: pérdida notable de autonomía (>15% respecto al inicio), tiempos de carga anormalmente largos, mensajes de error en el cuadro de instrumentos relacionados con la batería, o limitación repentina de potencia.`,
      `También es recomendable un chequeo si el vehículo ha estado parado más de 3 meses, ha sufrido un impacto en la zona inferior o ha sido expuesto a inundaciones.`,
    ],
    "motor-electrico": [
      `Presta atención a: vibraciones inusuales al acelerar, ruidos metálicos o zumbidos anómalos, pérdida de potencia o mensajes de "potencia reducida", sobrecalentamiento del motor indicado en el cuadro de instrumentos.`,
      `Un diagnóstico temprano evita daños mayores en los rodamientos del motor y el inversor de tu ${brand}.`,
    ],
    "inversor-potencia": [
      `Los síntomas de un fallo en el inversor incluyen: mensajes de error de propulsión, limitación de potencia o velocidad, el vehículo entra en modo "limp" (marcha de emergencia), o el motor no responde al acelerador.`,
      `Si experimentas cualquiera de estos síntomas en tu ${brand}, te recomendamos no conducir el vehículo y solicitar asistencia inmediata.`,
    ],
  };

  return symptoms[subSlug] || [
    `Si notas algún comportamiento inusual en tu ${brand} relacionado con este sistema, te recomendamos solicitar un diagnóstico preventivo. La detección temprana evita averías mayores y reduce costes de reparación.`,
  ];
}

function getSubServiceProcess(subSlug: string, brand: string, tt: string): string[] {
  return [
    `En nuestro ${tt.toLowerCase()} seguimos un proceso riguroso para el servicio de ${subSlug.replace(/-/g, " ")} de tu ${brand}: recepción con inspección visual, diagnóstico electrónico completo, presupuesto detallado, intervención certificada, control de calidad y entrega con garantía escrita.`,
    `Cada paso se documenta y registra en el historial de tu ${brand}. Si la intervención supera las 4 horas, disponemos de vehículo de cortesía eléctrico sin coste adicional.`,
  ];
}

function generateSubServiceFaqs(
  sub: { slug: string; name: string; parent: string },
  brand: string,
  tt: string,
  seed: number,
): { question: string; answer: string }[] {
  const baseFaqs = [
    { question: `¿Cuánto cuesta el servicio de ${sub.name.toLowerCase()} para ${brand}?`, answer: `El coste varía según el modelo y la intervención requerida. Te proporcionamos un presupuesto detallado sin compromiso tras el diagnóstico inicial. Al ser ${tt.toLowerCase()}, nuestros precios son competitivos y transparentes.` },
    { question: `¿Cuánto tiempo tarda el servicio de ${sub.name.toLowerCase()}?`, answer: `El tiempo depende de la complejidad de la intervención. Diagnósticos e intervenciones menores se resuelven en el mismo día. Para intervenciones de mayor envergadura, te informamos del plazo exacto en el presupuesto.` },
    { question: `¿Mantiene la garantía de mi ${brand} este servicio?`, answer: `Sí. Todas nuestras intervenciones se realizan siguiendo los protocolos del fabricante y con componentes que mantienen la garantía oficial de tu ${brand}. Registramos cada servicio en el historial del vehículo.` },
    { question: `¿Necesito cita previa para ${sub.name.toLowerCase()}?`, answer: `Recomendamos cita previa para garantizar la disponibilidad de nuestros técnicos especializados en ${brand}. Puedes reservar online las 24 horas o llamarnos al +34 955 034 600.` },
  ];

  return baseFaqs;
}

function getProblemCauses(problemSlug: string, brand: string, models: string): string[] {
  const causes: Record<string, string[]> = {
    "perdida-autonomia": [
      `La pérdida de autonomía en ${brand} eléctrico puede deberse a múltiples factores: degradación natural de la batería (normal un 2-3% anual), hábitos de carga inadecuados (cargas frecuentes al 100%), temperaturas extremas, consumo excesivo de climatización o un problema real en el BMS.`,
      `En modelos como ${models}, también puede influir una actualización de software pendiente que optimice la gestión energética, o un fallo en el sistema de frenada regenerativa que reduce la recuperación de energía.`,
    ],
    "error-carga": [
      `Los errores de carga en ${brand} eléctrico pueden originarse en: incompatibilidad con el punto de carga (firmware desactualizado), fallo en el cargador a bordo, problema en el puerto de carga o conector, fallo en el sistema de aislamiento eléctrico, o un error de comunicación entre vehículo e infraestructura.`,
      `En modelos ${models}, hemos identificado que las causas más frecuentes son problemas de firmware solucionables con actualización y fallos en el actuador de bloqueo del conector.`,
    ],
    "aviso-bateria": [
      `Los avisos de batería en tu ${brand} pueden indicar: desequilibrio entre celdas del pack, sensor de temperatura fuera de rango, fallo de comunicación del BMS, o una degradación que requiere atención. Es importante no ignorar estos avisos.`,
      `Nuestro diagnóstico identifica si el aviso corresponde a un fallo real o a un error de sensor, y te proporciona la solución más adecuada para modelos ${models}.`,
    ],
    "ruido-motor-electrico": [
      `Los motores eléctricos de ${brand} son extremadamente silenciosos, por lo que cualquier ruido inusual es indicativo de un problema: desgaste de rodamientos, desalineación del rotor, problemas en el reductor de velocidad o interferencias electromagnéticas.`,
      `En los modelos ${models}, los ruidos más reportados están relacionados con los rodamientos del motor y el reductor planetario.`,
    ],
    "fallo-frenada-regenerativa": [
      `El fallo en la frenada regenerativa de tu ${brand} puede deberse a: batería al 100% (no acepta más carga), temperatura extrema de la batería, fallo en el sensor de velocidad de rueda, o un problema en la electrónica de control del motor.`,
      `Es un sistema que debe funcionar en perfecta coordinación con el frenado mecánico. Un mal funcionamiento afecta tanto a la autonomía como al comportamiento de frenado.`,
    ],
    "degradacion-bateria": [
      `La degradación de la batería en ${brand} eléctrico es un proceso natural pero que puede acelerarse por: cargas frecuentes en corriente continua (DC), exposición prolongada a temperaturas extremas, mantener la batería al 100% o al 0% durante períodos prolongados.`,
      `En modelos ${models}, la garantía cubre la degradación por debajo del 70% del SOH durante 8 años o 160.000 km. Monitorizamos este parámetro en cada visita.`,
    ],
    "error-inversor": [
      `El inversor de potencia de tu ${brand} puede presentar errores por: sobrecalentamiento (fallo en el circuito de refrigeración), desgaste de los IGBTs (transistores de potencia), o fallos en el circuito de control electrónico.`,
      `Los síntomas incluyen limitación de potencia, modo de emergencia y mensajes de error del tren motriz. Es una avería que requiere diagnóstico inmediato.`,
    ],
    "problema-climatizacion": [
      `Los problemas de climatización y bomba de calor en ${brand} eléctrico impactan directamente en la autonomía. Las causas habituales son: fuga de refrigerante, fallo del compresor eléctrico, sensor de temperatura defectuoso o problemas en la válvula de expansión electrónica.`,
      `En los modelos ${models} con bomba de calor, un mal funcionamiento puede reducir la autonomía hasta un 30% en invierno.`,
    ],
    "fallo-cargador-bordo": [
      `El cargador a bordo (OBC) de tu ${brand} convierte la corriente alterna del punto de carga en corriente continua para la batería. Los fallos pueden deberse a: sobrecalentamiento, componentes electrónicos degradados o problemas de firmware.`,
      `Los síntomas incluyen: imposibilidad de cargar en AC (pero funciona en DC), carga lenta o interrumpida, y errores de comunicación con el wallbox.`,
    ],
    "calibracion-adas": [
      `Los sistemas ADAS de tu ${brand} pueden descalibrarse tras: sustitución de parabrisas, reparación de carrocería, alineación de dirección, impacto (incluso menor) o modificación de la altura del vehículo.`,
      `Una calibración incorrecta puede causar falsas alertas de frenada de emergencia, mal funcionamiento del control de crucero adaptativo o errores en el mantenimiento de carril.`,
    ],
  };

  return causes[problemSlug] || [
    `Este problema en vehículos ${brand} eléctricos puede tener múltiples causas que requieren un diagnóstico profesional para identificar la causa raíz y aplicar la solución correcta.`,
    `Nuestros técnicos especializados en ${brand} cuentan con la experiencia y equipamiento para diagnosticar y resolver este tipo de incidencias en modelos como ${models}.`,
  ];
}

function getProblemSymptoms(problemSlug: string, brand: string): string[] {
  const symptomMap: Record<string, string[]> = {
    "perdida-autonomia": [
      `Vigila estos indicadores en tu ${brand}: la autonomía estimada es significativamente menor que la nominal del modelo, el consumo medio ha aumentado más de un 15%, la carga completa proporciona menos kilómetros que hace unos meses, o el indicador de estado de batería muestra menos del 85%.`,
    ],
    "error-carga": [
      `Síntomas frecuentes: el vehículo no inicia la carga al conectar el cable, la carga se interrumpe repetidamente, el conector queda bloqueado o no se desbloquea, aparecen mensajes de error de carga en el cuadro de instrumentos, o la velocidad de carga es muy inferior a la esperada.`,
    ],
    "aviso-bateria": [
      `Presta atención si tu ${brand} muestra: iconos de batería con exclamación, mensajes de "comprobar sistema de alta tensión", reducción repentina de la autonomía estimada, o el vehículo entra en modo de potencia reducida sin causa aparente.`,
    ],
  };

  return symptomMap[problemSlug] || [
    `Si observas cualquier comportamiento anómalo en tu ${brand} eléctrico, te recomendamos solicitar un diagnóstico profesional lo antes posible. La detección temprana reduce significativamente los costes de reparación.`,
  ];
}

function getProblemSolution(problemSlug: string, brand: string, tt: string): string[] {
  return [
    `En nuestro ${tt.toLowerCase()} seguimos un protocolo de diagnóstico en 4 fases para ${problemSlug.replace(/-/g, " ")} en ${brand}: (1) lectura completa de códigos de error y datos en tiempo real, (2) análisis específico del sistema afectado con equipamiento de diagnóstico avanzado, (3) verificación de causas secundarias y descartes, (4) presupuesto de reparación transparente con opciones.`,
    `Una vez aprobado el presupuesto, nuestros técnicos certificados en ${brand} realizan la intervención siguiendo los protocolos del fabricante. Cada reparación se verifica con un test funcional completo antes de la entrega.`,
    `Ofrecemos garantía de 2 años en piezas y mano de obra, y registramos la intervención en el historial oficial de tu ${brand}.`,
  ];
}

function getProblemCostTime(problemSlug: string, brand: string): string[] {
  const costMap: Record<string, string[]> = {
    "perdida-autonomia": [
      `El diagnóstico de autonomía para ${brand} tiene un coste de 89€-149€. Si la causa es degradación normal, no requiere reparación. Si se detecta un fallo en celdas o BMS, la reparación puede oscilar entre 500€ y 3.000€ según la intervención necesaria.`,
      `Tiempo estimado: diagnóstico 2-3 horas, reparación de módulos de batería 2-5 días laborables.`,
    ],
    "error-carga": [
      `El diagnóstico de problemas de carga en ${brand} tiene un coste de 49€-89€. Las reparaciones más habituales (firmware, actuador de conector) oscilan entre 150€ y 500€. Sustitución del cargador a bordo: 800€-2.500€.`,
      `Tiempo: diagnóstico 1-2 horas, reparaciones menores en el día, sustitución de componentes 2-3 días.`,
    ],
    "degradacion-bateria": [
      `El análisis completo del SOH para ${brand} cuesta 89€-149€ e incluye informe detallado. Si la degradación está cubierta por garantía (<70% SOH en 8 años), la sustitución es sin coste. Reparación de módulos individuales: 500€-2.000€.`,
      `Tiempo: diagnóstico 2-3 horas, sustitución de módulos 3-5 días, sustitución de pack completo según disponibilidad de piezas.`,
    ],
  };

  return costMap[problemSlug] || [
    `El coste de diagnóstico y reparación de ${problemSlug.replace(/-/g, " ")} en ${brand} varía según la causa del problema. Te proporcionamos presupuesto detallado y sin compromiso tras el diagnóstico inicial (49€-149€).`,
    `Los tiempos de reparación dependen de la disponibilidad de piezas y la complejidad de la intervención. Te informamos del plazo exacto en el presupuesto.`,
  ];
}

function generateProblemFaqs(
  problem: { slug: string; name: string },
  brand: string,
  tt: string,
  seed: number,
  city?: string,
): { question: string; answer: string }[] {
  const cityRef = city ? ` en ${city}` : "";

  return [
    { question: `¿Es grave el problema de ${problem.name.toLowerCase()} en mi ${brand}?`, answer: `Depende de la causa. Algunos casos se resuelven con una actualización de software o ajuste menor. Otros pueden requerir intervención en componentes de alta tensión. Lo importante es diagnosticarlo cuanto antes para evitar que se agrave y te proporcionemos una solución con garantía.` },
    { question: `¿Cuánto cuesta solucionar ${problem.name.toLowerCase()} en ${brand}${cityRef}?`, answer: `El diagnóstico inicial tiene un coste de 49€-149€. El coste de la reparación depende de la causa identificada. Te proporcionamos un presupuesto detallado y sin compromiso antes de iniciar cualquier intervención en tu ${brand}.` },
    { question: `¿Puedo seguir conduciendo mi ${brand} con ${problem.name.toLowerCase()}?`, answer: `En general, si el vehículo no ha entrado en modo de emergencia ni muestra avisos críticos, puedes conducir con precaución hasta nuestro ${tt.toLowerCase()}${cityRef}. Sin embargo, te recomendamos solicitar diagnóstico lo antes posible para evitar daños mayores.` },
    { question: `¿Está cubierto por la garantía de ${brand}?`, answer: `Depende del origen del problema y el estado de la garantía de tu ${brand}. La batería tiene cobertura de 8 años / 160.000 km. Otros componentes del tren motriz eléctrico suelen tener 5 años. Lo verificamos gratuitamente al realizar el diagnóstico.` },
  ];
}

export function analyzeGrowthOpportunities(): GrowthReport {
  const brands = Object.keys(BRAND_NAMES);
  const cities = CITY_DATA;

  const existingPages = {
    static: 13,
    serviceBrand: SERVICE_SLUGS.length * brands.length,
    programmatic: SERVICE_SLUGS.length * brands.length * cities.length,
    total: 0,
  };
  existingPages.total = existingPages.static + existingPages.serviceBrand + existingPages.programmatic;

  const subServiceCount = Object.values(SUB_SERVICE_SLUGS).reduce((sum, arr) => sum + arr.length, 0);
  const newOpportunities = {
    subServiceBrand: subServiceCount * brands.length,
    problemBrand: PROBLEM_TOPICS.length * brands.length,
    problemBrandCity: PROBLEM_TOPICS.length * brands.length * cities.length,
    total: 0,
  };
  newOpportunities.total = newOpportunities.subServiceBrand + newOpportunities.problemBrand + newOpportunities.problemBrandCity;

  const opportunities: GrowthOpportunity[] = [];

  for (const problem of PROBLEM_TOPICS) {
    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const priority = problem.relatedServices.length * 10 + (OFFICIAL_BRANDS.includes(brand) ? 20 : 5);
      opportunities.push({
        type: "problem-brand",
        slug: `${problem.slug}-${brand}`,
        estimatedSearchVolume: problem.relatedServices.length >= 3 ? "alta" : "media",
        competition: OFFICIAL_BRANDS.includes(brand) ? "media" : "baja",
        priority,
        reason: `"${problem.name} ${brandName}" — intent de usuario alto, ${problem.relatedServices.length} servicios relacionados`,
      });
    }
  }

  for (const parentService of SERVICE_SLUGS) {
    const subs = SUB_SERVICE_SLUGS[parentService] || [];
    for (const sub of subs) {
      for (const brand of brands) {
        const brandName = BRAND_NAMES[brand];
        const priority = OFFICIAL_BRANDS.includes(brand) ? 25 : 10;
        opportunities.push({
          type: "sub-service-brand",
          slug: `${sub.slug}-${brand}`,
          estimatedSearchVolume: "media",
          competition: "baja",
          priority,
          reason: `"${sub.name} ${brandName}" — búsqueda long-tail específica`,
        });
      }
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    for (const brand of brands) {
      for (const city of cities) {
        const brandName = BRAND_NAMES[brand];
        const priority = (problem.relatedServices.length * 5) + (OFFICIAL_BRANDS.includes(brand) ? 10 : 3) + (city.slug === "sevilla" ? 5 : 0);
        opportunities.push({
          type: "problem-brand-city",
          slug: `${problem.slug}-${brand}-${city.slug}`,
          estimatedSearchVolume: "baja",
          competition: "baja",
          priority,
          reason: `"${problem.name} ${brandName} ${city.city}" — intent local + problema específico`,
        });
      }
    }
  }

  opportunities.sort((a, b) => b.priority - a.priority);

  return {
    existingPages,
    newOpportunities,
    projectedTotal: existingPages.total + newOpportunities.total,
    opportunities,
    topPriority: opportunities.slice(0, 30),
  };
}

export function getGrowthSitemapUrls(): { loc: string; changefreq: string; priority: number }[] {
  const urls: { loc: string; changefreq: string; priority: number }[] = [];
  const configs = getAllGrowthSlugs();

  for (const config of configs) {
    urls.push({
      loc: config.canonicalUrl,
      changefreq: "monthly",
      priority: config.type === "sub-service-brand" ? 0.6 : config.type === "problem-brand" ? 0.6 : 0.4,
    });
  }

  return urls;
}

export function getGrowthStats(): {
  totalNewPages: number;
  byType: Record<GrowthPageType, number>;
  brands: number;
  subServices: number;
  problems: number;
  cities: number;
  vehicleModels: number;
} {
  const allConfigs = getAllGrowthSlugs();
  const byType: Record<GrowthPageType, number> = {
    "sub-service-brand": 0,
    "problem-brand": 0,
    "problem-brand-city": 0,
  };
  for (const c of allConfigs) {
    byType[c.type]++;
  }

  const totalModels = Object.values(VEHICLE_MODEL_FAMILIES).reduce((sum, arr) => sum + arr.length, 0);

  return {
    totalNewPages: allConfigs.length,
    byType,
    brands: Object.keys(BRAND_NAMES).length,
    subServices: Object.values(SUB_SERVICE_SLUGS).reduce((sum, arr) => sum + arr.length, 0),
    problems: PROBLEM_TOPICS.length,
    cities: CITY_DATA.length,
    vehicleModels: totalModels,
  };
}
