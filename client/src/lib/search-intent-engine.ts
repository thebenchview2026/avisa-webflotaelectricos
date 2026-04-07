import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS } from "./seo-growth-engine";

export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational";

export type IntentStrength = "primary" | "secondary" | "tertiary";

export type FunnelStage = "awareness" | "consideration" | "decision" | "retention";

export type ContentFormat = "guide" | "service-page" | "landing" | "faq" | "comparison" | "local-landing" | "pillar" | "problem-solution" | "catalog";

export interface IntentSignal {
  keyword: string;
  intent: SearchIntent;
  strength: IntentStrength;
  modifier: string;
  funnelStage: FunnelStage;
}

export interface PageIntentProfile {
  pagePath: string;
  pageType: string;
  primaryIntent: SearchIntent;
  secondaryIntent: SearchIntent | null;
  funnelStage: FunnelStage;
  contentFormat: ContentFormat;
  intentScore: number;
  signals: IntentSignal[];
  targetKeywords: string[];
  ctaType: string;
  contentGuidance: ContentGuidanceItem[];
  serpsFeatures: string[];
  entities: { type: string; slug: string; name: string }[];
  conversionPath: string;
}

export interface ContentGuidanceItem {
  section: string;
  purpose: string;
  intentAlignment: SearchIntent;
}

export interface IntentReport {
  timestamp: string;
  totalPages: number;
  byIntent: Record<SearchIntent, number>;
  byFunnel: Record<FunnelStage, number>;
  byFormat: Record<ContentFormat, number>;
  avgIntentScore: number;
  intentMismatches: IntentMismatch[];
  intentGaps: IntentGapItem[];
  funnelAnalysis: FunnelAnalysis;
  pageProfiles: PageIntentProfile[];
}

export interface IntentMismatch {
  pagePath: string;
  currentIntent: SearchIntent;
  suggestedIntent: SearchIntent;
  reason: string;
  priority: number;
}

export interface IntentGapItem {
  intent: SearchIntent;
  funnelStage: FunnelStage;
  description: string;
  suggestedKeywords: string[];
  suggestedPath: string;
  priority: number;
}

export interface FunnelAnalysis {
  awareness: { pages: number; percent: number; strong: boolean };
  consideration: { pages: number; percent: number; strong: boolean };
  decision: { pages: number; percent: number; strong: boolean };
  retention: { pages: number; percent: number; strong: boolean };
  bottleneck: FunnelStage | null;
  recommendation: string;
}

const INFORMATIONAL_MODIFIERS = [
  "qué es", "cómo funciona", "por qué", "causas", "síntomas",
  "guía", "tipos", "diferencias", "vs", "problemas", "fallos",
  "fallos comunes", "averías", "señales", "indicadores",
  "vida útil", "duración", "fiabilidad", "opiniones",
];

const COMMERCIAL_MODIFIERS = [
  "mejor", "recomendado", "comparar", "comparativa", "alternativa",
  "review", "análisis", "especialista", "experto", "profesional",
  "certificado", "oficial", "homologado", "taller",
  "servicio", "diagnóstico", "diagnostico", "mantenimiento",
  "reparación", "reparacion", "instalación", "instalacion",
  "garantía", "garantia", "revisión", "revision", "carga",
];

const TRANSACTIONAL_MODIFIERS = [
  "precio", "cuánto cuesta", "cuánto tarda", "pedir cita",
  "presupuesto", "descuento", "oferta", "promoción",
  "reservar", "contratar", "comprar", "solicitar",
  "cita previa", "cita", "llamar", "contactar", "urgente",
];

const NAVIGATIONAL_MODIFIERS = [
  "grupo avisa", "avisa", "dónde está", "horario",
  "teléfono", "dirección", "cómo llegar", "mapa",
];

function classifyKeywordIntent(keyword: string): { intent: SearchIntent; strength: IntentStrength; modifier: string } {
  const kw = keyword.toLowerCase();

  for (const mod of NAVIGATIONAL_MODIFIERS) {
    if (kw.includes(mod)) return { intent: "navigational", strength: "primary", modifier: mod };
  }

  for (const mod of TRANSACTIONAL_MODIFIERS) {
    if (kw.includes(mod)) return { intent: "transactional", strength: "primary", modifier: mod };
  }

  for (const mod of COMMERCIAL_MODIFIERS) {
    if (kw.includes(mod)) return { intent: "commercial", strength: "primary", modifier: mod };
  }

  for (const mod of INFORMATIONAL_MODIFIERS) {
    if (kw.includes(mod)) return { intent: "informational", strength: "primary", modifier: mod };
  }

  if (SERVICE_CITIES.some((c) => kw.includes(c.city.toLowerCase()))) {
    return { intent: "transactional", strength: "secondary", modifier: "local" };
  }

  for (const brand of Object.values(BRAND_NAMES)) {
    if (kw.includes(brand.toLowerCase())) {
      for (const ss of SERVICE_SLUGS) {
        const def = SERVICE_DEFINITIONS[ss];
        if (def && kw.includes(def.title.toLowerCase())) {
          return { intent: "commercial", strength: "secondary", modifier: "service+brand" };
        }
      }
    }
  }

  return { intent: "informational", strength: "tertiary", modifier: "default" };
}

function detectPageType(path: string): string {
  if (path === "/") return "home";
  if (path === "/contacto") return "contact";
  if (path === "/postventa") return "postventa-pillar";
  if (path === "/electrificacion") return "electrificacion";
  if (path.startsWith("/marcas/")) return "brand-pillar";
  if (path.startsWith("/preguntas/")) return path.split("/").length > 2 ? "faq-detail" : "faq-hub";
  if (path.startsWith("/preguntas")) return "faq-hub";
  if (path.startsWith("/comparativas/")) return "comparison";
  if (path.startsWith("/comparativas")) return "comparison-hub";
  if (path.match(/^\/taller-electricos-/)) return "local-landing";
  if (path.startsWith("/vehiculos/")) return "vehicle-detail";
  if (path.startsWith("/concesionarios")) return "dealers";
  if (path.startsWith("/promociones")) return "promotion";

  if (path.startsWith("/problemas/")) {
    const slug = path.replace("/problemas/", "");
    const parts = slug.split("-");
    if (parts.length > 2 && SERVICE_CITIES.some((c) => slug.endsWith(`-${c.slug}`))) return "problem-brand-city";
    if (Object.keys(BRAND_NAMES).some((b) => slug.endsWith(`-${b}`))) return "problem-brand";
    return "problem-pillar";
  }

  if (path.startsWith("/servicios/")) {
    const slug = path.replace("/servicios/", "");

    if (SERVICE_SLUGS.includes(slug as any)) return "service-pillar";

    if (SERVICE_CITIES.some((c) => slug.endsWith(`-${c.slug}`))) return "service-brand-city";

    for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
      for (const sub of subs) {
        if (Object.keys(BRAND_NAMES).some((b) => slug === `${sub.slug}-${b}`)) return "sub-service-brand";
      }
    }

    return "service-brand";
  }

  if (path.includes("aviso-legal") || path.includes("politica-cookies") || path.includes("terminos") || path.includes("condiciones-uso") || path.includes("accesibilidad")) return "legal";

  return "static";
}

function resolveEntities(path: string, pageType: string): { type: string; slug: string; name: string }[] {
  const entities: { type: string; slug: string; name: string }[] = [];

  if (pageType === "brand-pillar") {
    const brandSlug = path.replace("/marcas/", "");
    if (BRAND_NAMES[brandSlug]) entities.push({ type: "brand", slug: brandSlug, name: BRAND_NAMES[brandSlug] });
  }

  if (pageType === "service-pillar") {
    const serviceSlug = path.replace("/servicios/", "");
    const def = SERVICE_DEFINITIONS[serviceSlug];
    if (def) entities.push({ type: "service", slug: serviceSlug, name: def.title });
  }

  if (pageType === "service-brand" || pageType === "service-brand-city" || pageType === "sub-service-brand") {
    const slug = path.replace("/servicios/", "");
    for (const ss of SERVICE_SLUGS) {
      for (const brand of Object.keys(BRAND_NAMES)) {
        if (slug.startsWith(`${ss}-${brand}`)) {
          const def = SERVICE_DEFINITIONS[ss];
          if (def) entities.push({ type: "service", slug: ss, name: def.title });
          entities.push({ type: "brand", slug: brand, name: BRAND_NAMES[brand] });
        }
      }
    }
    for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
      for (const sub of subs) {
        for (const brand of Object.keys(BRAND_NAMES)) {
          if (slug === `${sub.slug}-${brand}`) {
            entities.push({ type: "sub-service", slug: sub.slug, name: sub.name });
            entities.push({ type: "brand", slug: brand, name: BRAND_NAMES[brand] });
          }
        }
      }
    }
    if (pageType === "service-brand-city") {
      for (const city of SERVICE_CITIES) {
        if (slug.endsWith(`-${city.slug}`)) {
          entities.push({ type: "city", slug: city.slug, name: city.city });
        }
      }
    }
  }

  if (pageType === "problem-brand" || pageType === "problem-brand-city") {
    const slug = path.replace("/problemas/", "");
    for (const problem of PROBLEM_TOPICS) {
      for (const brand of Object.keys(BRAND_NAMES)) {
        if (slug.startsWith(`${problem.slug}-${brand}`)) {
          entities.push({ type: "problem", slug: problem.slug, name: problem.name });
          entities.push({ type: "brand", slug: brand, name: BRAND_NAMES[brand] });
        }
      }
    }
    if (pageType === "problem-brand-city") {
      for (const city of SERVICE_CITIES) {
        if (slug.endsWith(`-${city.slug}`)) {
          entities.push({ type: "city", slug: city.slug, name: city.city });
        }
      }
    }
  }

  if (pageType === "local-landing") {
    const slug = path.replace("/taller-electricos-", "");
    const city = SERVICE_CITIES.find((c) => c.slug === slug);
    if (city) entities.push({ type: "city", slug: city.slug, name: city.city });
  }

  return entities;
}

function determineIntentProfile(path: string): PageIntentProfile {
  const pageType = detectPageType(path);
  const entities = resolveEntities(path, pageType);

  const brandName = entities.find((e) => e.type === "brand")?.name || "";
  const serviceName = entities.find((e) => e.type === "service")?.name || "";
  const subServiceName = entities.find((e) => e.type === "sub-service")?.name || "";
  const problemName = entities.find((e) => e.type === "problem")?.name || "";
  const cityName = entities.find((e) => e.type === "city")?.name || "";
  const brandSlug = entities.find((e) => e.type === "brand")?.slug || "";
  const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
  const tallerType = isOfficial ? "Taller Oficial" : "Taller Especializado";

  let primaryIntent: SearchIntent = "informational";
  let secondaryIntent: SearchIntent | null = null;
  let funnelStage: FunnelStage = "awareness";
  let contentFormat: ContentFormat = "guide";
  let intentScore = 70;
  let ctaType = "informative";
  let conversionPath = "/contacto";
  const signals: IntentSignal[] = [];
  const targetKeywords: string[] = [];
  const contentGuidance: ContentGuidanceItem[] = [];
  const serpsFeatures: string[] = [];

  switch (pageType) {
    case "home":
      primaryIntent = "navigational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "pillar";
      intentScore = 90;
      ctaType = "explore";
      serpsFeatures.push("sitelinks", "knowledge-panel");
      targetKeywords.push("grupo avisa", "taller eléctricos sevilla", "coches eléctricos taller");
      contentGuidance.push(
        { section: "Hero", purpose: "Captar atención y posicionar marca", intentAlignment: "navigational" },
        { section: "Servicios", purpose: "Mostrar capacidades del taller", intentAlignment: "commercial" },
        { section: "Marcas", purpose: "Demostrar autoridad en marcas", intentAlignment: "navigational" },
        { section: "CTA", purpose: "Convertir a contacto", intentAlignment: "transactional" },
      );
      break;

    case "service-pillar":
      primaryIntent = "commercial";
      secondaryIntent = "informational";
      funnelStage = "consideration";
      contentFormat = "pillar";
      intentScore = 85;
      ctaType = "service-request";
      conversionPath = "/contacto";
      serpsFeatures.push("featured-snippet", "faq-rich-result", "sitelinks");
      targetKeywords.push(
        `${serviceName.toLowerCase()} coche eléctrico`,
        `${serviceName.toLowerCase()} vehículo eléctrico`,
        `${serviceName.toLowerCase()} híbrido`,
      );
      contentGuidance.push(
        { section: "Introducción", purpose: "Explicar el servicio y por qué es necesario", intentAlignment: "informational" },
        { section: "Marcas cubiertas", purpose: "Mostrar capacidad multi-marca", intentAlignment: "commercial" },
        { section: "Proceso", purpose: "Generar confianza mostrando metodología", intentAlignment: "commercial" },
        { section: "FAQs", purpose: "Resolver dudas frecuentes para Featured Snippets", intentAlignment: "informational" },
        { section: "CTA", purpose: "Convertir usuarios en contacto phase", intentAlignment: "transactional" },
      );
      break;

    case "service-brand":
      primaryIntent = "commercial";
      secondaryIntent = "transactional";
      funnelStage = "consideration";
      contentFormat = "service-page";
      intentScore = 90;
      ctaType = "quote-request";
      conversionPath = "/contacto";
      serpsFeatures.push("faq-rich-result", "local-pack");
      targetKeywords.push(
        `${serviceName.toLowerCase()} ${brandName.toLowerCase()}`,
        `${serviceName.toLowerCase()} ${brandName.toLowerCase()} eléctrico`,
        `${tallerType.toLowerCase()} ${brandName.toLowerCase()} ${serviceName.toLowerCase()}`,
        `precio ${serviceName.toLowerCase()} ${brandName.toLowerCase()}`,
        `cuánto cuesta ${serviceName.toLowerCase()} ${brandName.toLowerCase()}`,
      );
      signals.push(
        { keyword: `${serviceName.toLowerCase()} ${brandName.toLowerCase()}`, intent: "commercial", strength: "primary", modifier: "service+brand", funnelStage: "consideration" },
        { keyword: `precio ${serviceName.toLowerCase()} ${brandName.toLowerCase()}`, intent: "transactional", strength: "secondary", modifier: "precio", funnelStage: "decision" },
      );
      contentGuidance.push(
        { section: "Introducción", purpose: `Posicionar como ${tallerType} de ${brandName}`, intentAlignment: "commercial" },
        { section: "Especialización", purpose: `Demostrar expertise específico en ${brandName}`, intentAlignment: "commercial" },
        { section: "Problemas frecuentes", purpose: "Captar búsquedas informational de marca", intentAlignment: "informational" },
        { section: "Proceso", purpose: "Describir paso a paso → reducir fricción", intentAlignment: "commercial" },
        { section: "Beneficios", purpose: "Diferenciarse de competencia", intentAlignment: "commercial" },
        { section: "FAQs", purpose: "Precio, tiempo, garantía → Featured Snippets", intentAlignment: "transactional" },
        { section: "CTA", purpose: "Solicitar presupuesto / cita", intentAlignment: "transactional" },
      );
      break;

    case "service-brand-city":
      primaryIntent = "transactional";
      secondaryIntent = "commercial";
      funnelStage = "decision";
      contentFormat = "local-landing";
      intentScore = 95;
      ctaType = "book-appointment";
      conversionPath = "/contacto";
      serpsFeatures.push("local-pack", "maps", "faq-rich-result");
      targetKeywords.push(
        `${serviceName.toLowerCase()} ${brandName.toLowerCase()} ${cityName.toLowerCase()}`,
        `taller ${brandName.toLowerCase()} ${cityName.toLowerCase()}`,
        `${serviceName.toLowerCase()} coche eléctrico ${cityName.toLowerCase()}`,
        `${tallerType.toLowerCase()} ${brandName.toLowerCase()} ${cityName.toLowerCase()}`,
      );
      signals.push(
        { keyword: `${serviceName.toLowerCase()} ${brandName.toLowerCase()} ${cityName.toLowerCase()}`, intent: "transactional", strength: "primary", modifier: "local", funnelStage: "decision" },
      );
      contentGuidance.push(
        { section: "Introducción local", purpose: `${serviceName} ${brandName} en ${cityName} — inmediata relevancia local`, intentAlignment: "transactional" },
        { section: "Ubicación", purpose: "Dirección, mapa, horarios — señal local fuerte", intentAlignment: "navigational" },
        { section: "Servicio", purpose: "Qué incluye el servicio en este taller", intentAlignment: "commercial" },
        { section: "CTA urgente", purpose: "Pedir cita / llamar ahora", intentAlignment: "transactional" },
      );
      break;

    case "sub-service-brand":
      primaryIntent = "transactional";
      secondaryIntent = "commercial";
      funnelStage = "decision";
      contentFormat = "service-page";
      intentScore = 88;
      ctaType = "quote-request";
      targetKeywords.push(
        `${subServiceName.toLowerCase()} ${brandName.toLowerCase()}`,
        `${subServiceName.toLowerCase()} ${brandName.toLowerCase()} precio`,
        `${subServiceName.toLowerCase()} ${brandName.toLowerCase()} taller`,
      );
      signals.push(
        { keyword: `${subServiceName.toLowerCase()} ${brandName.toLowerCase()}`, intent: "transactional", strength: "primary", modifier: "sub-service+brand", funnelStage: "decision" },
      );
      contentGuidance.push(
        { section: "Qué es", purpose: `Explicar ${subServiceName} brevemente`, intentAlignment: "informational" },
        { section: "Para tu ${brandName}", purpose: "Especificidad de marca", intentAlignment: "commercial" },
        { section: "Precio orientativo", purpose: "Responder búsqueda transaccional", intentAlignment: "transactional" },
        { section: "CTA", purpose: "Solicitar presupuesto específico", intentAlignment: "transactional" },
      );
      break;

    case "brand-pillar":
      primaryIntent = "navigational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "pillar";
      intentScore = 85;
      ctaType = "explore-services";
      serpsFeatures.push("sitelinks", "knowledge-panel");
      targetKeywords.push(
        `${brandName.toLowerCase()} eléctrico`,
        `taller ${brandName.toLowerCase()} eléctrico`,
        `coches eléctricos ${brandName.toLowerCase()}`,
        `${tallerType.toLowerCase()} ${brandName.toLowerCase()}`,
      );
      contentGuidance.push(
        { section: "Marca", purpose: `Presentar a ${brandName} y su gama eléctrica`, intentAlignment: "informational" },
        { section: "Servicios disponibles", purpose: "Enumerar todos los servicios para esta marca", intentAlignment: "commercial" },
        { section: "Modelos", purpose: "Listar modelos atendidos → long-tail", intentAlignment: "informational" },
        { section: "Por qué elegirnos", purpose: `Posicionar como ${tallerType}`, intentAlignment: "commercial" },
      );
      break;

    case "problem-brand":
      primaryIntent = "informational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "problem-solution";
      intentScore = 85;
      ctaType = "diagnose";
      serpsFeatures.push("featured-snippet", "faq-rich-result", "people-also-ask");
      targetKeywords.push(
        `${problemName.toLowerCase()} ${brandName.toLowerCase()}`,
        `${brandName.toLowerCase()} ${problemName.toLowerCase()} solución`,
        `${brandName.toLowerCase()} eléctrico ${problemName.toLowerCase()}`,
        `causas ${problemName.toLowerCase()} ${brandName.toLowerCase()}`,
      );
      signals.push(
        { keyword: `${problemName.toLowerCase()} ${brandName.toLowerCase()}`, intent: "informational", strength: "primary", modifier: "problema+marca", funnelStage: "awareness" },
        { keyword: `solución ${problemName.toLowerCase()} ${brandName.toLowerCase()}`, intent: "commercial", strength: "secondary", modifier: "solución", funnelStage: "consideration" },
      );
      contentGuidance.push(
        { section: "Qué es", purpose: `Definir ${problemName} para ${brandName} — Featured Snippet target`, intentAlignment: "informational" },
        { section: "Causas", purpose: "Enumerar causas frecuentes — People Also Ask", intentAlignment: "informational" },
        { section: "Síntomas", purpose: "Ayudar a identificar el problema", intentAlignment: "informational" },
        { section: "Solución", purpose: `Transicionar a servicio → ${serviceName || "Diagnóstico"}`, intentAlignment: "commercial" },
        { section: "CTA diagnóstico", purpose: "Convertir de awareness a consideration", intentAlignment: "transactional" },
      );
      break;

    case "problem-brand-city":
      primaryIntent = "transactional";
      secondaryIntent = "informational";
      funnelStage = "decision";
      contentFormat = "local-landing";
      intentScore = 92;
      ctaType = "book-urgent";
      serpsFeatures.push("local-pack", "maps");
      targetKeywords.push(
        `${problemName.toLowerCase()} ${brandName.toLowerCase()} ${cityName.toLowerCase()}`,
        `solucionar ${problemName.toLowerCase()} ${cityName.toLowerCase()}`,
        `taller ${problemName.toLowerCase()} ${cityName.toLowerCase()}`,
      );
      contentGuidance.push(
        { section: "Problema local", purpose: `${problemName} ${brandName} en ${cityName} — máxima especificidad`, intentAlignment: "transactional" },
        { section: "Solución rápida", purpose: "Describir proceso de resolución", intentAlignment: "commercial" },
        { section: "CTA urgente", purpose: "Llamar / WhatsApp / cita", intentAlignment: "transactional" },
      );
      break;

    case "local-landing":
      primaryIntent = "transactional";
      secondaryIntent = "navigational";
      funnelStage = "decision";
      contentFormat = "local-landing";
      intentScore = 95;
      ctaType = "visit-workshop";
      serpsFeatures.push("local-pack", "maps", "knowledge-panel");
      targetKeywords.push(
        `taller eléctricos ${cityName.toLowerCase()}`,
        `taller coches eléctricos ${cityName.toLowerCase()}`,
        `reparación eléctrico ${cityName.toLowerCase()}`,
      );
      contentGuidance.push(
        { section: "Ubicación", purpose: "Dirección, mapa, horarios", intentAlignment: "navigational" },
        { section: "Servicios en " + cityName, purpose: "Todos los servicios disponibles en esta ubicación", intentAlignment: "commercial" },
        { section: "CTA", purpose: "Pedir cita / cómo llegar / llamar", intentAlignment: "transactional" },
      );
      break;

    case "faq-hub":
      primaryIntent = "informational";
      funnelStage = "awareness";
      contentFormat = "faq";
      intentScore = 80;
      ctaType = "learn-more";
      serpsFeatures.push("faq-rich-result", "featured-snippet", "people-also-ask");
      targetKeywords.push("preguntas frecuentes coche eléctrico", "dudas vehículo eléctrico");
      contentGuidance.push(
        { section: "Categorías", purpose: "Organizar FAQs por tema para navegación", intentAlignment: "navigational" },
        { section: "Preguntas populares", purpose: "Captar People Also Ask", intentAlignment: "informational" },
      );
      break;

    case "faq-detail":
      primaryIntent = "informational";
      funnelStage = "awareness";
      contentFormat = "faq";
      intentScore = 85;
      ctaType = "related-service";
      serpsFeatures.push("featured-snippet", "people-also-ask");
      contentGuidance.push(
        { section: "Respuesta directa", purpose: "Párrafo conciso para Featured Snippet", intentAlignment: "informational" },
        { section: "Detalle", purpose: "Expandir respuesta con datos", intentAlignment: "informational" },
        { section: "Enlace a servicio", purpose: "Transicionar de informational → commercial", intentAlignment: "commercial" },
      );
      break;

    case "comparison":
      primaryIntent = "commercial";
      secondaryIntent = "informational";
      funnelStage = "consideration";
      contentFormat = "comparison";
      intentScore = 85;
      ctaType = "explore-both";
      serpsFeatures.push("featured-snippet", "comparison-table");
      contentGuidance.push(
        { section: "Tabla comparativa", purpose: "Comparación visual directa — snippet bait", intentAlignment: "commercial" },
        { section: "Análisis", purpose: "Profundizar en diferencias", intentAlignment: "informational" },
        { section: "Recomendación", purpose: "Guiar decisión del usuario", intentAlignment: "commercial" },
      );
      break;

    case "electrificacion":
      primaryIntent = "informational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "pillar";
      intentScore = 80;
      ctaType = "explore-services";
      serpsFeatures.push("featured-snippet", "sitelinks");
      targetKeywords.push("electrificación vehículos", "coches eléctricos España", "transición eléctrica");
      contentGuidance.push(
        { section: "Tendencia", purpose: "Contextualizar la electrificación del automóvil", intentAlignment: "informational" },
        { section: "Servicios", purpose: "Enlazar a servicios especializados", intentAlignment: "commercial" },
      );
      break;

    case "comparison-hub":
      primaryIntent = "commercial";
      secondaryIntent = "informational";
      funnelStage = "consideration";
      contentFormat = "comparison";
      intentScore = 82;
      ctaType = "explore-both";
      serpsFeatures.push("featured-snippet");
      targetKeywords.push("comparar coches eléctricos", "mejor coche eléctrico 2024");
      contentGuidance.push(
        { section: "Lista comparativas", purpose: "Hub de navegación a comparativas", intentAlignment: "commercial" },
      );
      break;

    case "dealers":
      primaryIntent = "navigational";
      secondaryIntent = "transactional";
      funnelStage = "decision";
      contentFormat = "local-landing";
      intentScore = 85;
      ctaType = "visit-workshop";
      serpsFeatures.push("local-pack", "maps");
      targetKeywords.push("concesionarios grupo avisa", "talleres avisa ubicaciones");
      contentGuidance.push(
        { section: "Ubicaciones", purpose: "Listar talleres y concesionarios", intentAlignment: "navigational" },
        { section: "CTA", purpose: "Contactar o visitar", intentAlignment: "transactional" },
      );
      break;

    case "problem-pillar":
      primaryIntent = "informational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "pillar";
      intentScore = 83;
      ctaType = "diagnose";
      serpsFeatures.push("featured-snippet", "people-also-ask");
      contentGuidance.push(
        { section: "Definición", purpose: "Explicar el problema de forma genérica", intentAlignment: "informational" },
        { section: "Marcas afectadas", purpose: "Enlazar a páginas problem×brand", intentAlignment: "commercial" },
        { section: "Solución", purpose: "Transicionar a servicios", intentAlignment: "commercial" },
      );
      break;

    case "contact":
      primaryIntent = "transactional";
      funnelStage = "decision";
      contentFormat = "landing";
      intentScore = 100;
      ctaType = "submit-form";
      serpsFeatures.push("local-pack");
      targetKeywords.push("contacto grupo avisa", "pedir cita taller eléctricos", "teléfono taller eléctricos sevilla");
      contentGuidance.push(
        { section: "Formulario", purpose: "Captar lead con mínima fricción", intentAlignment: "transactional" },
        { section: "Datos de contacto", purpose: "Teléfono, email, WhatsApp", intentAlignment: "navigational" },
        { section: "Mapa", purpose: "Ubicación del taller", intentAlignment: "navigational" },
      );
      break;

    case "postventa-pillar":
      primaryIntent = "navigational";
      secondaryIntent = "commercial";
      funnelStage = "awareness";
      contentFormat = "pillar";
      intentScore = 80;
      ctaType = "explore-services";
      serpsFeatures.push("sitelinks");
      targetKeywords.push("servicio postventa eléctricos", "postventa grupo avisa");
      contentGuidance.push(
        { section: "Servicios", purpose: "Hub de navegación a todos los servicios", intentAlignment: "navigational" },
        { section: "Ventajas", purpose: "Diferenciación del servicio postventa", intentAlignment: "commercial" },
      );
      break;

    case "promotion":
      primaryIntent = "transactional";
      secondaryIntent = "commercial";
      funnelStage = "decision";
      contentFormat = "landing";
      intentScore = 90;
      ctaType = "claim-offer";
      serpsFeatures.push("product-result");
      contentGuidance.push(
        { section: "Oferta", purpose: "Destacar promoción con urgencia", intentAlignment: "transactional" },
        { section: "Condiciones", purpose: "Transparencia → confianza", intentAlignment: "informational" },
        { section: "CTA", purpose: "Aprovechar oferta ahora", intentAlignment: "transactional" },
      );
      break;

    case "vehicle-detail":
      primaryIntent = "informational";
      secondaryIntent = "commercial";
      funnelStage = "consideration";
      contentFormat = "catalog";
      intentScore = 75;
      ctaType = "explore-services";
      serpsFeatures.push("product-result", "image-pack");
      contentGuidance.push(
        { section: "Ficha técnica", purpose: "Datos del vehículo — snippet bait", intentAlignment: "informational" },
        { section: "Servicios disponibles", purpose: "Enlazar a servicios relevantes", intentAlignment: "commercial" },
      );
      break;

    case "legal":
      primaryIntent = "navigational";
      funnelStage = "retention";
      contentFormat = "guide";
      intentScore = 50;
      ctaType = "none";
      break;

    default:
      primaryIntent = "informational";
      funnelStage = "awareness";
      contentFormat = "guide";
      intentScore = 60;
      ctaType = "learn-more";
      break;
  }

  if (signals.length === 0) {
    for (const kw of targetKeywords.slice(0, 3)) {
      const classified = classifyKeywordIntent(kw);
      signals.push({
        keyword: kw,
        intent: classified.intent,
        strength: classified.strength,
        modifier: classified.modifier,
        funnelStage,
      });
    }
  }

  return {
    pagePath: path,
    pageType,
    primaryIntent,
    secondaryIntent,
    funnelStage,
    contentFormat,
    intentScore,
    signals,
    targetKeywords,
    ctaType,
    contentGuidance,
    serpsFeatures,
    entities,
    conversionPath,
  };
}

function getAllPagePaths(): string[] {
  const paths: string[] = [];
  const brands = Object.keys(BRAND_NAMES);

  paths.push("/", "/contacto", "/postventa", "/electrificacion", "/preguntas", "/concesionarios");

  for (const ss of SERVICE_SLUGS) {
    paths.push(`/servicios/${ss}`);
    for (const brand of brands) {
      paths.push(`/servicios/${ss}-${brand}`);
      for (const city of SERVICE_CITIES) {
        paths.push(`/servicios/${ss}-${brand}-${city.slug}`);
      }
    }
  }

  for (const brand of brands) {
    paths.push(`/marcas/${brand}`);
  }

  for (const problem of PROBLEM_TOPICS) {
    for (const brand of brands) {
      paths.push(`/problemas/${problem.slug}-${brand}`);
      for (const city of SERVICE_CITIES) {
        paths.push(`/problemas/${problem.slug}-${brand}-${city.slug}`);
      }
    }
  }

  for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
    for (const sub of subs) {
      for (const brand of brands) {
        paths.push(`/servicios/${sub.slug}-${brand}`);
      }
    }
  }

  for (const city of SERVICE_CITIES) {
    paths.push(`/taller-electricos-${city.slug}`);
  }

  return paths;
}

function analyzeFunnel(profiles: PageIntentProfile[]): FunnelAnalysis {
  const total = profiles.length || 1;
  const stages: Record<FunnelStage, number> = { awareness: 0, consideration: 0, decision: 0, retention: 0 };
  for (const p of profiles) stages[p.funnelStage]++;

  const awareness = { pages: stages.awareness, percent: Math.round((stages.awareness / total) * 100), strong: stages.awareness >= total * 0.15 };
  const consideration = { pages: stages.consideration, percent: Math.round((stages.consideration / total) * 100), strong: stages.consideration >= total * 0.2 };
  const decision = { pages: stages.decision, percent: Math.round((stages.decision / total) * 100), strong: stages.decision >= total * 0.3 };
  const retention = { pages: stages.retention, percent: Math.round((stages.retention / total) * 100), strong: stages.retention >= total * 0.05 };

  let bottleneck: FunnelStage | null = null;
  let recommendation = "Embudo de conversión equilibrado.";

  if (!awareness.strong) {
    bottleneck = "awareness";
    recommendation = "Crear más contenido informacional (guías, problemas, FAQs) para captar tráfico top-of-funnel.";
  } else if (!consideration.strong) {
    bottleneck = "consideration";
    recommendation = "Reforzar páginas de servicio×marca y comparativas para mover usuarios a fase de evaluación.";
  } else if (!decision.strong) {
    bottleneck = "decision";
    recommendation = "Añadir más páginas locales y landing pages transaccionales para cerrar conversiones.";
  } else if (!retention.strong) {
    bottleneck = "retention";
    recommendation = "Crear contenido de fidelización: guías de mantenimiento, newsletters, programas de puntos.";
  }

  return { awareness, consideration, decision, retention, bottleneck, recommendation };
}

function detectMismatches(profiles: PageIntentProfile[]): IntentMismatch[] {
  const mismatches: IntentMismatch[] = [];

  for (const p of profiles) {
    if (p.pageType === "problem-brand" && p.primaryIntent !== "informational") {
      mismatches.push({
        pagePath: p.pagePath,
        currentIntent: p.primaryIntent,
        suggestedIntent: "informational",
        reason: "Páginas de problemas deben ser informacionales para captar awareness",
        priority: 7,
      });
    }

    if (p.pageType === "service-brand-city" && p.primaryIntent !== "transactional") {
      mismatches.push({
        pagePath: p.pagePath,
        currentIntent: p.primaryIntent,
        suggestedIntent: "transactional",
        reason: "Páginas locales servicio×marca×ciudad deben ser transaccionales",
        priority: 8,
      });
    }

    if (p.intentScore < 60) {
      mismatches.push({
        pagePath: p.pagePath,
        currentIntent: p.primaryIntent,
        suggestedIntent: p.primaryIntent,
        reason: `Intent score bajo (${p.intentScore}). Contenido no alineado con intención.`,
        priority: 6,
      });
    }
  }

  return mismatches.sort((a, b) => b.priority - a.priority);
}

function detectIntentGaps(profiles: PageIntentProfile[]): IntentGapItem[] {
  const gaps: IntentGapItem[] = [];
  const brands = Object.keys(BRAND_NAMES);

  const hasComparison = profiles.some((p) => p.contentFormat === "comparison");
  if (!hasComparison) {
    gaps.push({
      intent: "commercial",
      funnelStage: "consideration",
      description: "No existen páginas de comparativa de marcas — oportunidad commercial/consideration.",
      suggestedKeywords: ["volkswagen vs tesla eléctrico", "mejor coche eléctrico 2024", "comparar marcas eléctricas"],
      suggestedPath: "/comparativas",
      priority: 8,
    });
  }

  const hasRetention = profiles.some((p) => p.funnelStage === "retention" && p.pageType !== "legal");
  if (!hasRetention) {
    gaps.push({
      intent: "informational",
      funnelStage: "retention",
      description: "Sin contenido de retención más allá de páginas legales. Faltan guías post-servicio.",
      suggestedKeywords: ["cuidados coche eléctrico después reparación", "mantenimiento preventivo eléctrico"],
      suggestedPath: "/guias/post-servicio",
      priority: 6,
    });
  }

  for (const brand of brands.slice(0, 6)) {
    const brandName = BRAND_NAMES[brand];
    const brandProblems = profiles.filter((p) =>
      p.pageType === "problem-brand" && p.entities.some((e) => e.type === "brand" && e.slug === brand)
    );
    if (brandProblems.length < 3) {
      gaps.push({
        intent: "informational",
        funnelStage: "awareness",
        description: `Solo ${brandProblems.length} páginas de problemas para ${brandName}. Aumentar cobertura informacional.`,
        suggestedKeywords: [`problemas ${brandName.toLowerCase()} eléctrico`, `averías ${brandName.toLowerCase()}`],
        suggestedPath: `/problemas?brand=${brand}`,
        priority: 5,
      });
    }
  }

  return gaps.sort((a, b) => b.priority - a.priority);
}

export function getPageIntentProfile(path: string): PageIntentProfile {
  return determineIntentProfile(path);
}

export function classifyKeyword(keyword: string): { intent: SearchIntent; strength: IntentStrength; modifier: string } {
  return classifyKeywordIntent(keyword);
}

export function classifyKeywords(keywords: string[]): IntentSignal[] {
  return keywords.map((kw) => {
    const c = classifyKeywordIntent(kw);
    const funnelMap: Record<SearchIntent, FunnelStage> = {
      informational: "awareness",
      commercial: "consideration",
      transactional: "decision",
      navigational: "awareness",
    };
    return { keyword: kw, intent: c.intent, strength: c.strength, modifier: c.modifier, funnelStage: funnelMap[c.intent] };
  });
}

export function generateIntentReport(sampleSize?: number): IntentReport {
  const allPaths = getAllPagePaths();
  const targetPaths = sampleSize ? allPaths.slice(0, sampleSize) : allPaths;

  const profiles = targetPaths.map((p) => determineIntentProfile(p));

  const byIntent: Record<SearchIntent, number> = { informational: 0, commercial: 0, transactional: 0, navigational: 0 };
  const byFunnel: Record<FunnelStage, number> = { awareness: 0, consideration: 0, decision: 0, retention: 0 };
  const byFormat: Record<ContentFormat, number> = {
    guide: 0, "service-page": 0, landing: 0, faq: 0,
    comparison: 0, "local-landing": 0, pillar: 0, "problem-solution": 0, catalog: 0,
  };

  let totalScore = 0;

  for (const p of profiles) {
    byIntent[p.primaryIntent]++;
    byFunnel[p.funnelStage]++;
    byFormat[p.contentFormat] = (byFormat[p.contentFormat] || 0) + 1;
    totalScore += p.intentScore;
  }

  return {
    timestamp: new Date().toISOString(),
    totalPages: profiles.length,
    byIntent,
    byFunnel,
    byFormat,
    avgIntentScore: Math.round(totalScore / (profiles.length || 1)),
    intentMismatches: detectMismatches(profiles),
    intentGaps: detectIntentGaps(profiles),
    funnelAnalysis: analyzeFunnel(profiles),
    pageProfiles: profiles,
  };
}

export function getIntentSummary(): {
  totalPages: number;
  byIntent: Record<SearchIntent, number>;
  byFunnel: Record<FunnelStage, number>;
  avgScore: number;
  funnelAnalysis: FunnelAnalysis;
  topMismatches: IntentMismatch[];
  topGaps: IntentGapItem[];
} {
  const report = generateIntentReport(200);
  return {
    totalPages: report.totalPages,
    byIntent: report.byIntent,
    byFunnel: report.byFunnel,
    avgScore: report.avgIntentScore,
    funnelAnalysis: report.funnelAnalysis,
    topMismatches: report.intentMismatches.slice(0, 10),
    topGaps: report.intentGaps.slice(0, 10),
  };
}
