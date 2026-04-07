import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, getAllGrowthSlugs, GrowthPageConfig } from "./seo-growth-engine";

export type DetectionSource =
  | "keyword-gap"
  | "entity-gap"
  | "competitor-pattern"
  | "long-tail"
  | "question-pattern"
  | "local-gap"
  | "brand-gap"
  | "problem-gap"
  | "seasonal"
  | "trend";

export type ExpansionStatus = "detected" | "queued" | "generating" | "ready" | "published";

export interface DetectedOpportunity {
  id: string;
  source: DetectionSource;
  slug: string;
  path: string;
  title: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  estimatedVolume: number;
  difficulty: number;
  priority: number;
  status: ExpansionStatus;
  generatedContent: GeneratedPageSpec | null;
}

export interface GeneratedPageSpec {
  slug: string;
  path: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  sections: GeneratedSection[];
  faqs: GeneratedFAQ[];
  schema: Record<string, unknown>;
  internalLinks: { text: string; href: string }[];
  sitemapEntry: { loc: string; changefreq: string; priority: number };
}

export interface GeneratedSection {
  heading: string;
  content: string;
  type: "definition" | "steps" | "benefits" | "costs" | "local" | "faq-teaser";
}

export interface GeneratedFAQ {
  question: string;
  answer: string;
}

export interface ExpansionReport {
  timestamp: string;
  totalOpportunities: number;
  bySource: Record<DetectionSource, number>;
  byStatus: Record<ExpansionStatus, number>;
  estimatedNewPages: number;
  estimatedNewKeywords: number;
  topOpportunities: DetectedOpportunity[];
  generationQueue: DetectedOpportunity[];
  coverage: { current: number; potential: number; growth: string };
}

const COMPANY = "Grupo Avisa";
const PHONE = "955 034 600";
const BASE_URL = "https://electricos.grupoavisa.com";

const LONG_TAIL_PATTERNS = [
  "precio-{service}-{brand}",
  "coste-{service}-{brand}",
  "cuanto-cuesta-{service}-{brand}",
  "cuanto-tarda-{service}-{brand}",
  "{service}-{brand}-garantia",
  "{service}-{brand}-sin-cita",
  "mejor-taller-{brand}-{city}",
  "revisar-bateria-{brand}-{city}",
  "error-{problem}-{brand}",
  "solucionar-{problem}-{brand}",
];

const QUESTION_PATTERNS = [
  "que-es-{service}-{brand}",
  "como-funciona-{service}-{brand}",
  "cuando-hacer-{service}-{brand}",
  "es-necesario-{service}-{brand}",
  "donde-{service}-{brand}-{city}",
];

const SEASONAL_TOPICS = [
  { slug: "revision-verano-electrico", title: "Revisión de Verano Vehículo Eléctrico", season: "verano", volume: 1800 },
  { slug: "revision-invierno-electrico", title: "Revisión de Invierno Vehículo Eléctrico", season: "invierno", volume: 2200 },
  { slug: "bateria-frio-electrico", title: "Batería Eléctrica y Frío — Cómo Protegerla", season: "invierno", volume: 4500 },
  { slug: "carga-calor-electrico", title: "Carga Vehículo Eléctrico en Verano — Consejos", season: "verano", volume: 2100 },
  { slug: "autonomia-carretera-verano", title: "Autonomía Eléctrico en Carretera — Verano", season: "verano", volume: 3200 },
];

const COMPARISON_PATTERNS = [
  { a: "volkswagen", b: "tesla", label: "Volkswagen vs Tesla Eléctrico" },
  { a: "audi", b: "bmw", label: "Audi vs BMW Eléctrico" },
  { a: "seat", b: "cupra", label: "SEAT vs CUPRA Eléctrico" },
  { a: "volkswagen", b: "hyundai", label: "Volkswagen vs Hyundai Eléctrico" },
  { a: "audi", b: "mercedes", label: "Audi vs Mercedes Eléctrico" },
  { a: "skoda", b: "seat", label: "Škoda vs SEAT Eléctrico en Sevilla" },
];

function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[áàä]/g, "a").replace(/[éèë]/g, "e").replace(/[íìï]/g, "i").replace(/[óòö]/g, "o").replace(/[úùü]/g, "u").replace(/[ñ]/g, "n").replace(/[ç]/g, "c").replace(/[^a-z0-9-]/g, "");
}

function hashNum(s: string, mod: number): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h) % mod;
}

function generatePageSpec(opp: Omit<DetectedOpportunity, "generatedContent">): GeneratedPageSpec {
  const { slug, path, title, primaryKeyword, relatedKeywords } = opp;
  const city = SERVICE_CITIES[0].city;
  const parts = slug.split("-");

  const intro =
    `${title} es uno de los servicios más solicitados en ${COMPANY} en ${city}. ` +
    `Nuestros técnicos certificados en electromovilidad ofrecen ${title.toLowerCase()} ` +
    `con garantía de 12 meses y presupuesto sin compromiso. ` +
    `Llama al ${PHONE} o reserva cita online en ${BASE_URL}/contacto.`;

  const sections: GeneratedSection[] = [
    {
      type: "definition",
      heading: `Qué es ${title}`,
      content:
        `${title} consiste en el diagnóstico, mantenimiento o reparación especializada ` +
        `de vehículos eléctricos e híbridos realizado por ${COMPANY} con equipamiento homologado. ` +
        `El servicio está disponible para vehículos de todas las marcas, con especial especialización ` +
        `en Volkswagen, Audi, Škoda, CUPRA y Tesla.`,
    },
    {
      type: "steps",
      heading: `Cómo realizamos ${title}`,
      content:
        `1. Recepción del vehículo y diagnóstico inicial\n` +
        `2. Análisis con equipo de diagnóstico oficial\n` +
        `3. Presupuesto detallado y aprobación del cliente\n` +
        `4. Intervención por técnico certificado en alta tensión\n` +
        `5. Control de calidad y prueba de funcionamiento\n` +
        `6. Entrega con informe técnico y garantía escrita`,
    },
    {
      type: "benefits",
      heading: `Por qué elegir ${COMPANY} para ${title}`,
      content:
        `• +50 técnicos certificados en electromovilidad\n` +
        `• Equipamiento homologado por fabricantes EV\n` +
        `• Garantía de 12 meses en todas las intervenciones\n` +
        `• Presupuesto sin compromiso y transparencia total\n` +
        `• Servicio de recogida y entrega disponible en ${city}\n` +
        `• Taller oficial Volkswagen, Audi y Škoda`,
    },
    {
      type: "local",
      heading: `${title} en ${city}`,
      content:
        `${COMPANY} ofrece ${title.toLowerCase()} en ${city} y área metropolitana. ` +
        `Con cobertura a toda Andalucía y Extremadura, el taller principal está ubicado en Sevilla ` +
        `con instalaciones de última generación. Horario: L-V 8:00-18:00, Sáb 9:00-13:00. ` +
        `Cita previa: ${PHONE}.`,
    },
  ];

  const faqs: GeneratedFAQ[] = [
    {
      question: `¿Cuánto cuesta ${title.toLowerCase()} en ${COMPANY}?`,
      answer: `El precio de ${title.toLowerCase()} varía según el tipo de vehículo y la complejidad del trabajo. Ofrecemos presupuesto gratuito y sin compromiso. Llama al ${PHONE} para obtener un precio exacto.`,
    },
    {
      question: `¿Es necesario pedir cita para ${title.toLowerCase()}?`,
      answer: `Sí, recomendamos cita previa para garantizar atención inmediata. Puedes reservar online en ${BASE_URL}/contacto o llamando al ${PHONE}. En casos de urgencia, atendemos sin cita según disponibilidad.`,
    },
    {
      question: `¿${COMPANY} ofrece garantía en ${title.toLowerCase()}?`,
      answer: `Sí, todos los servicios de ${COMPANY} incluyen garantía de 12 meses en piezas y mano de obra. Además, trabajamos con piezas OEM o de calidad equivalente homologada.`,
    },
    {
      question: `¿Cuánto tarda ${title.toLowerCase()} en ${COMPANY}?`,
      answer: `El tiempo varía según el servicio: diagnóstico (2-4 horas), mantenimiento (1 día), reparaciones (1-5 días). Informamos del plazo exacto al recibir el vehículo.`,
    },
  ];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    provider: {
      "@type": "AutoRepair",
      name: COMPANY,
      telephone: PHONE,
      url: BASE_URL,
      address: { "@type": "PostalAddress", addressLocality: city, addressCountry: "ES" },
    },
    serviceType: title,
    areaServed: { "@type": "City", name: city },
    url: `${BASE_URL}${path}`,
  };

  const internalLinks = [
    { text: "Diagnóstico Electrónico", href: "/servicios/diagnostico" },
    { text: "Reparación de Vehículos Eléctricos", href: "/servicios/reparacion" },
    { text: "Mantenimiento Eléctrico", href: "/servicios/mantenimiento" },
    { text: "Instalación Punto de Carga", href: "/servicios/carga" },
    { text: `Servicios en ${city}`, href: `/taller-electricos-${slugify(city)}` },
  ];

  const volScore = opp.estimatedVolume > 5000 ? 0.9 : opp.estimatedVolume > 1000 ? 0.7 : 0.5;

  return {
    slug,
    path,
    title,
    metaDescription: `${title} en ${COMPANY}, ${city}. +50 técnicos certificados. Presupuesto sin compromiso. ☎ ${PHONE}.`,
    h1: title,
    introduction: intro,
    sections,
    faqs,
    schema,
    internalLinks,
    sitemapEntry: { loc: `${BASE_URL}${path}`, changefreq: "monthly", priority: volScore },
  };
}

function detectLongTailOpportunities(): DetectedOpportunity[] {
  const opps: DetectedOpportunity[] = [];
  const brands = Object.keys(BRAND_NAMES).slice(0, 6);
  const services = SERVICE_SLUGS.slice(0, 3);

  for (const pattern of LONG_TAIL_PATTERNS.slice(0, 5)) {
    for (const s of services) {
      for (const b of brands) {
        const slug = pattern.replace("{service}", s).replace("{brand}", b).replace("{city}", SERVICE_CITIES[0].slug);
        const opp: Omit<DetectedOpportunity, "generatedContent"> = {
          id: `lt-${slug}`,
          source: "long-tail",
          slug,
          path: `/servicios/${slug}`,
          title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          primaryKeyword: slug.replace(/-/g, " "),
          relatedKeywords: [slug.replace(/-/g, " "), `${s} ${BRAND_NAMES[b]}`, `${s} ${b} ${SERVICE_CITIES[0].city}`],
          estimatedVolume: 200 + hashNum(slug, 800),
          difficulty: 20 + hashNum(slug + "d", 40),
          priority: 6 + hashNum(slug + "p", 3),
          status: "detected",
        };
        opps.push({ ...opp, generatedContent: generatePageSpec(opp) });
      }
    }
  }
  return opps;
}

function detectLocalGapOpportunities(): DetectedOpportunity[] {
  const opps: DetectedOpportunity[] = [];
  for (const city of SERVICE_CITIES) {
    for (const s of SERVICE_SLUGS) {
      const svcName = SERVICE_DEFINITIONS[s as keyof typeof SERVICE_DEFINITIONS]?.name || s;
      const slug = `taller-${s}-${city.slug}`;
      const opp: Omit<DetectedOpportunity, "generatedContent"> = {
        id: `local-${slug}`,
        source: "local-gap",
        slug,
        path: `/${slug}`,
        title: `Taller ${svcName} en ${city.city}`,
        primaryKeyword: `taller ${s} ${city.city}`,
        relatedKeywords: [`${s} ${city.city}`, `taller electrico ${city.city}`, `reparacion electrico ${city.city}`],
        estimatedVolume: 400 + hashNum(slug, 1600),
        difficulty: 15 + hashNum(slug + "d", 30),
        priority: 8,
        status: "queued",
      };
      opps.push({ ...opp, generatedContent: generatePageSpec(opp) });
    }
  }
  return opps;
}

function detectProblemGapOpportunities(): DetectedOpportunity[] {
  const opps: DetectedOpportunity[] = [];
  const brands = Object.keys(BRAND_NAMES).slice(0, 5);
  for (const problem of PROBLEM_TOPICS) {
    for (const b of brands) {
      const slug = `como-solucionar-${problem.slug}-${b}`;
      const opp: Omit<DetectedOpportunity, "generatedContent"> = {
        id: `prob-${slug}`,
        source: "problem-gap",
        slug,
        path: `/problemas/${slug}`,
        title: `Cómo Solucionar ${problem.name} en ${BRAND_NAMES[b]}`,
        primaryKeyword: `solucionar ${problem.name.toLowerCase()} ${BRAND_NAMES[b]}`,
        relatedKeywords: [
          `${problem.name.toLowerCase()} ${BRAND_NAMES[b]}`,
          `error ${problem.name.toLowerCase()} ${b}`,
          `${problem.name.toLowerCase()} ${SERVICE_CITIES[0].city}`,
        ],
        estimatedVolume: 300 + hashNum(slug, 1200),
        difficulty: 25 + hashNum(slug + "d", 35),
        priority: 7,
        status: "detected",
      };
      opps.push({ ...opp, generatedContent: generatePageSpec(opp) });
    }
  }
  return opps;
}

function detectSeasonalOpportunities(): DetectedOpportunity[] {
  return SEASONAL_TOPICS.map((st) => {
    const opp: Omit<DetectedOpportunity, "generatedContent"> = {
      id: `seasonal-${st.slug}`,
      source: "seasonal",
      slug: st.slug,
      path: `/blog/${st.slug}`,
      title: st.title,
      primaryKeyword: st.title.toLowerCase(),
      relatedKeywords: [st.title.toLowerCase(), `${st.season} vehiculo electrico`, `cuidado bateria ${st.season}`],
      estimatedVolume: st.volume,
      difficulty: 35 + hashNum(st.slug, 20),
      priority: 9,
      status: "queued",
    };
    return { ...opp, generatedContent: generatePageSpec(opp) };
  });
}

function detectComparisonOpportunities(): DetectedOpportunity[] {
  return COMPARISON_PATTERNS.map((cp) => {
    const slug = `comparativa-${cp.a}-vs-${cp.b}-electrico`;
    const opp: Omit<DetectedOpportunity, "generatedContent"> = {
      id: `comp-${slug}`,
      source: "competitor-pattern",
      slug,
      path: `/comparativa/${cp.a}-vs-${cp.b}`,
      title: cp.label,
      primaryKeyword: `${cp.a} vs ${cp.b} electrico`,
      relatedKeywords: [`comparar ${cp.a} ${cp.b}`, `${cp.a} o ${cp.b} electrico`, `diferencia ${cp.a} ${cp.b}`],
      estimatedVolume: 1200 + hashNum(slug, 3000),
      difficulty: 40 + hashNum(slug + "d", 25),
      priority: 8,
      status: "detected",
    };
    return { ...opp, generatedContent: generatePageSpec(opp) };
  });
}

export function detectOpportunities(): DetectedOpportunity[] {
  return [
    ...detectLongTailOpportunities(),
    ...detectLocalGapOpportunities(),
    ...detectProblemGapOpportunities(),
    ...detectSeasonalOpportunities(),
    ...detectComparisonOpportunities(),
  ].sort((a, b) => b.priority - a.priority);
}

export function generateExpansionPage(slug: string): GeneratedPageSpec | null {
  const opps = detectOpportunities();
  const opp = opps.find((o) => o.slug === slug);
  return opp?.generatedContent ?? null;
}

export function getExpansionReport(): ExpansionReport {
  const opps = detectOpportunities();

  const bySource: Record<string, number> = {};
  const byStatus: Record<string, number> = {};

  for (const o of opps) {
    bySource[o.source] = (bySource[o.source] || 0) + 1;
    byStatus[o.status] = (byStatus[o.status] || 0) + 1;
  }

  const currentPages = SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length;
  const potentialPages = currentPages + opps.length;

  return {
    timestamp: new Date().toISOString(),
    totalOpportunities: opps.length,
    bySource: bySource as Record<DetectionSource, number>,
    byStatus: byStatus as Record<ExpansionStatus, number>,
    estimatedNewPages: opps.length,
    estimatedNewKeywords: opps.reduce((s, o) => s + o.relatedKeywords.length, 0),
    topOpportunities: opps.slice(0, 20),
    generationQueue: opps.filter((o) => o.status === "queued").slice(0, 10),
    coverage: {
      current: currentPages,
      potential: potentialPages,
      growth: `+${Math.round(((potentialPages - currentPages) / currentPages) * 100)}%`,
    },
  };
}

export function getSitemapExpansion(): { loc: string; changefreq: string; priority: number }[] {
  return detectOpportunities()
    .filter((o) => o.generatedContent)
    .map((o) => o.generatedContent!.sitemapEntry);
}
