import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export type KeywordIntent = "transactional" | "informational" | "navigational" | "commercial";
export type PageTarget = "landing" | "faq" | "blog" | "service" | "problem" | "local";
export type KeywordPriority = "alta" | "media" | "baja";

export interface ScannedKeyword {
  keyword: string;
  slug: string;
  intent: KeywordIntent;
  targets: PageTarget[];
  priority: KeywordPriority;
  category: string;
  entities: { brand?: string; service?: string; city?: string; problem?: string; model?: string };
  existingPage: string | null;
  gap: boolean;
}

export interface KeywordCluster {
  head: string;
  keywords: ScannedKeyword[];
  totalKeywords: number;
  avgPriority: number;
  topTarget: PageTarget;
}

export interface ScanReport {
  totalKeywords: number;
  byIntent: Record<KeywordIntent, number>;
  byTarget: Record<PageTarget, number>;
  byPriority: Record<KeywordPriority, number>;
  coveredByExistingPages: number;
  gaps: number;
  clusters: KeywordCluster[];
  topGaps: ScannedKeyword[];
}

const BRANDS = Object.entries(BRAND_NAMES);
const CITIES = SERVICE_CITIES.map((c) => ({ slug: c.slug, name: c.city }));

const SERVICE_SYNONYMS: Record<string, string[]> = {
  reparacion: ["reparación", "reparar", "arreglo", "arreglar", "avería", "averías", "taller"],
  diagnostico: ["diagnóstico", "diagnosticar", "escáner", "revisión electrónica", "lectura de fallos", "chequeo"],
  mantenimiento: ["mantenimiento", "revisión", "ITV", "inspección", "servicio periódico", "cambio de aceite"],
  carga: ["carga", "cargador", "wallbox", "punto de carga", "instalación cargador", "estación de carga"],
  garantia: ["garantía", "extensión garantía", "cobertura", "seguro", "recall", "campaña de servicio"],
};

const PRICE_MODIFIERS = ["precio", "cuánto cuesta", "coste", "presupuesto", "tarifa", "barato", "económico"];
const LOCATION_MODIFIERS = ["cerca de mí", "cerca", "mejor", "recomendado", "de confianza"];
const QUALIFIER_MODIFIERS = ["oficial", "especializado", "certificado", "profesional", "urgente", "24 horas"];
const PROBLEM_VERBS = ["solucionar", "reparar", "arreglar", "diagnosticar", "detectar", "resolver"];
const QUESTION_STARTERS = ["cómo", "cuánto cuesta", "dónde", "cuándo", "por qué", "es normal", "qué hacer si"];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function priorityFromFactors(isOfficial: boolean, hasCity: boolean, hasPrice: boolean): KeywordPriority {
  const score = (isOfficial ? 2 : 0) + (hasCity ? 1 : 0) + (hasPrice ? 2 : 0);
  if (score >= 3) return "alta";
  if (score >= 1) return "media";
  return "baja";
}

function findExistingPage(entities: ScannedKeyword["entities"]): string | null {
  const { brand, service, city, problem } = entities;

  if (service && brand && city) {
    return `/servicios/${service}-${brand}-${city}`;
  }
  if (service && brand) {
    return `/servicios/${service}-${brand}`;
  }
  if (problem && brand && city) {
    return `/problemas/${problem}-${brand}-${city}`;
  }
  if (problem && brand) {
    return `/problemas/${problem}-${brand}`;
  }
  if (service) {
    return `/servicios/${service}`;
  }
  if (brand) {
    return `/marcas/${brand}`;
  }
  if (city) {
    return `/taller-electricos-${city}`;
  }
  return null;
}

function scanServiceBrandKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  for (const serviceSlug of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[serviceSlug];
    if (!def) continue;
    const serviceName = def.title.toLowerCase();
    const synonyms = SERVICE_SYNONYMS[serviceSlug] || [serviceName];

    for (const [brandSlug, brandName] of BRANDS) {
      const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
      const bn = brandName.toLowerCase();

      for (const syn of synonyms) {
        results.push({
          keyword: `${syn} ${bn} eléctrico`,
          slug: slugify(`${syn}-${bn}-electrico`),
          intent: "transactional",
          targets: ["service"],
          priority: priorityFromFactors(isOfficial, false, false),
          category: "service-brand",
          entities: { brand: brandSlug, service: serviceSlug },
          existingPage: `/servicios/${serviceSlug}-${brandSlug}`,
          gap: false,
        });
      }

      for (const priceM of PRICE_MODIFIERS.slice(0, 3)) {
        results.push({
          keyword: `${priceM} ${serviceName} ${bn} eléctrico`,
          slug: slugify(`${priceM}-${serviceName}-${bn}-electrico`),
          intent: "commercial",
          targets: ["service", "faq"],
          priority: "alta",
          category: "price-query",
          entities: { brand: brandSlug, service: serviceSlug },
          existingPage: `/servicios/${serviceSlug}-${brandSlug}`,
          gap: false,
        });
      }

      for (const city of CITIES) {
        results.push({
          keyword: `${serviceName} ${bn} ${city.name.toLowerCase()}`,
          slug: slugify(`${serviceName}-${bn}-${city.name}`),
          intent: "transactional",
          targets: ["local", "service"],
          priority: priorityFromFactors(isOfficial, true, false),
          category: "service-brand-city",
          entities: { brand: brandSlug, service: serviceSlug, city: city.slug },
          existingPage: `/servicios/${serviceSlug}-${brandSlug}-${city.slug}`,
          gap: false,
        });

        results.push({
          keyword: `${priceQ(serviceName)} ${bn} en ${city.name.toLowerCase()}`,
          slug: slugify(`precio-${serviceName}-${bn}-${city.name}`),
          intent: "commercial",
          targets: ["local", "faq"],
          priority: "alta",
          category: "price-local",
          entities: { brand: brandSlug, service: serviceSlug, city: city.slug },
          existingPage: `/servicios/${serviceSlug}-${brandSlug}-${city.slug}`,
          gap: false,
        });
      }

      for (const qual of QUALIFIER_MODIFIERS.slice(0, 2)) {
        results.push({
          keyword: `taller ${qual} ${bn} eléctrico`,
          slug: slugify(`taller-${qual}-${bn}-electrico`),
          intent: "navigational",
          targets: ["service", "landing"],
          priority: priorityFromFactors(isOfficial, false, false),
          category: "qualifier",
          entities: { brand: brandSlug },
          existingPage: `/marcas/${brandSlug}`,
          gap: false,
        });
      }
    }
  }

  return results;
}

function priceQ(service: string): string {
  return `precio ${service}`;
}

function scanProblemKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  for (const problem of PROBLEM_TOPICS) {
    const pName = problem.name.toLowerCase();

    for (const [brandSlug, brandName] of BRANDS) {
      const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
      const bn = brandName.toLowerCase();
      const existing = `/problemas/${problem.slug}-${brandSlug}`;

      results.push({
        keyword: `${pName} ${bn} eléctrico`,
        slug: slugify(`${pName}-${bn}-electrico`),
        intent: "informational",
        targets: ["problem", "blog"],
        priority: priorityFromFactors(isOfficial, false, false),
        category: "problem-brand",
        entities: { brand: brandSlug, problem: problem.slug },
        existingPage: existing,
        gap: false,
      });

      for (const verb of PROBLEM_VERBS.slice(0, 2)) {
        results.push({
          keyword: `${verb} ${pName} ${bn}`,
          slug: slugify(`${verb}-${pName}-${bn}`),
          intent: "transactional",
          targets: ["problem", "service"],
          priority: priorityFromFactors(isOfficial, false, false),
          category: "problem-action",
          entities: { brand: brandSlug, problem: problem.slug },
          existingPage: existing,
          gap: false,
        });
      }

      for (const qs of QUESTION_STARTERS.slice(0, 3)) {
        results.push({
          keyword: `${qs} ${pName} en ${bn}`,
          slug: slugify(`${qs}-${pName}-${bn}`),
          intent: "informational",
          targets: ["faq", "blog"],
          priority: "media",
          category: "question-problem",
          entities: { brand: brandSlug, problem: problem.slug },
          existingPage: existing,
          gap: false,
        });
      }

      for (const city of CITIES) {
        results.push({
          keyword: `${pName} ${bn} ${city.name.toLowerCase()}`,
          slug: slugify(`${pName}-${bn}-${city.name}`),
          intent: "transactional",
          targets: ["local", "problem"],
          priority: priorityFromFactors(isOfficial, true, false),
          category: "problem-brand-city",
          entities: { brand: brandSlug, problem: problem.slug, city: city.slug },
          existingPage: `/problemas/${problem.slug}-${brandSlug}-${city.slug}`,
          gap: false,
        });
      }
    }

    results.push({
      keyword: `${pName} coche eléctrico`,
      slug: slugify(`${pName}-coche-electrico`),
      intent: "informational",
      targets: ["blog", "faq"],
      priority: "media",
      category: "problem-generic",
      entities: { problem: problem.slug },
      existingPage: null,
      gap: true,
    });

    results.push({
      keyword: `${pName} híbrido enchufable`,
      slug: slugify(`${pName}-hibrido-enchufable`),
      intent: "informational",
      targets: ["blog", "faq"],
      priority: "baja",
      category: "problem-generic",
      entities: { problem: problem.slug },
      existingPage: null,
      gap: true,
    });
  }

  return results;
}

function scanModelKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  for (const [brandSlug, models] of Object.entries(VEHICLE_MODEL_FAMILIES)) {
    const brandName = BRAND_NAMES[brandSlug];
    if (!brandName) continue;
    const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);

    for (const model of models) {
      const modelLower = model.toLowerCase();

      for (const serviceSlug of SERVICE_SLUGS) {
        const serviceName = SERVICE_DEFINITIONS[serviceSlug]?.title.toLowerCase() || serviceSlug;

        results.push({
          keyword: `${serviceName} ${brandName.toLowerCase()} ${modelLower}`,
          slug: slugify(`${serviceName}-${brandSlug}-${modelLower}`),
          intent: "transactional",
          targets: ["service", "landing"],
          priority: priorityFromFactors(isOfficial, false, false),
          category: "service-model",
          entities: { brand: brandSlug, service: serviceSlug, model },
          existingPage: `/servicios/${serviceSlug}-${brandSlug}`,
          gap: false,
        });
      }

      for (const problem of PROBLEM_TOPICS.slice(0, 5)) {
        results.push({
          keyword: `${problem.name.toLowerCase()} ${brandName.toLowerCase()} ${modelLower}`,
          slug: slugify(`${problem.slug}-${brandSlug}-${modelLower}`),
          intent: "informational",
          targets: ["blog", "problem"],
          priority: "media",
          category: "problem-model",
          entities: { brand: brandSlug, problem: problem.slug, model },
          existingPage: `/problemas/${problem.slug}-${brandSlug}`,
          gap: false,
        });
      }

      results.push({
        keyword: `problemas ${brandName.toLowerCase()} ${modelLower}`,
        slug: slugify(`problemas-${brandSlug}-${modelLower}`),
        intent: "informational",
        targets: ["blog", "faq"],
        priority: "media",
        category: "brand-model-problems",
        entities: { brand: brandSlug, model },
        existingPage: `/marcas/${brandSlug}`,
        gap: true,
      });

      results.push({
        keyword: `opiniones taller ${brandName.toLowerCase()} ${modelLower}`,
        slug: slugify(`opiniones-taller-${brandSlug}-${modelLower}`),
        intent: "navigational",
        targets: ["landing"],
        priority: "baja",
        category: "brand-model-reviews",
        entities: { brand: brandSlug, model },
        existingPage: `/marcas/${brandSlug}`,
        gap: true,
      });
    }
  }

  return results;
}

function scanSubServiceKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  for (const parentSlug of SERVICE_SLUGS) {
    const subs = SUB_SERVICE_SLUGS[parentSlug] || [];
    for (const sub of subs) {
      const subName = sub.name.toLowerCase();

      for (const [brandSlug, brandName] of BRANDS) {
        const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
        const bn = brandName.toLowerCase();

        results.push({
          keyword: `${subName} ${bn}`,
          slug: slugify(`${subName}-${bn}`),
          intent: "transactional",
          targets: ["service"],
          priority: priorityFromFactors(isOfficial, false, false),
          category: "sub-service-brand",
          entities: { brand: brandSlug, service: parentSlug },
          existingPage: `/servicios/${sub.slug}-${brandSlug}`,
          gap: false,
        });

        results.push({
          keyword: `${priceQ(subName)} ${bn}`,
          slug: slugify(`precio-${subName}-${bn}`),
          intent: "commercial",
          targets: ["service", "faq"],
          priority: "alta",
          category: "sub-service-price",
          entities: { brand: brandSlug, service: parentSlug },
          existingPage: `/servicios/${sub.slug}-${brandSlug}`,
          gap: false,
        });
      }

      results.push({
        keyword: `${subName} coche eléctrico`,
        slug: slugify(`${subName}-coche-electrico`),
        intent: "informational",
        targets: ["blog", "service"],
        priority: "media",
        category: "sub-service-generic",
        entities: { service: parentSlug },
        existingPage: `/servicios/${parentSlug}`,
        gap: true,
      });
    }
  }

  return results;
}

function scanFAQKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  const faqPatterns = [
    { template: (b: string) => `¿cuánto cuesta mantener un ${b} eléctrico?`, intent: "commercial" as KeywordIntent, target: "faq" as PageTarget },
    { template: (b: string) => `¿merece la pena un ${b} eléctrico?`, intent: "informational" as KeywordIntent, target: "blog" as PageTarget },
    { template: (b: string) => `¿cada cuánto se revisa un ${b} eléctrico?`, intent: "informational" as KeywordIntent, target: "faq" as PageTarget },
    { template: (b: string) => `¿cuánto dura la batería de un ${b}?`, intent: "informational" as KeywordIntent, target: "faq" as PageTarget },
    { template: (b: string) => `mejor taller ${b} eléctrico`, intent: "navigational" as KeywordIntent, target: "landing" as PageTarget },
    { template: (b: string) => `taller ${b} eléctrico cerca de mí`, intent: "navigational" as KeywordIntent, target: "local" as PageTarget },
    { template: (b: string) => `garantía batería ${b}`, intent: "informational" as KeywordIntent, target: "faq" as PageTarget },
    { template: (b: string) => `autonomía real ${b}`, intent: "informational" as KeywordIntent, target: "blog" as PageTarget },
    { template: (b: string) => `cómo cargar ${b} en casa`, intent: "informational" as KeywordIntent, target: "faq" as PageTarget },
    { template: (b: string) => `${b} eléctrico problemas conocidos`, intent: "informational" as KeywordIntent, target: "blog" as PageTarget },
  ];

  for (const [brandSlug, brandName] of BRANDS) {
    const bn = brandName.toLowerCase();

    for (const pattern of faqPatterns) {
      const kw = pattern.template(bn);
      results.push({
        keyword: kw,
        slug: slugify(kw),
        intent: pattern.intent,
        targets: [pattern.target],
        priority: pattern.intent === "commercial" ? "alta" : "media",
        category: "faq-pattern",
        entities: { brand: brandSlug },
        existingPage: findExistingPage({ brand: brandSlug }),
        gap: pattern.target === "blog",
      });
    }
  }

  const genericFAQs = [
    "diferencia coche eléctrico e híbrido enchufable",
    "plan moves ayudas coche eléctrico",
    "cuánto se ahorra con coche eléctrico",
    "es seguro cargar coche eléctrico en lluvia",
    "se puede instalar cargador en garaje comunitario",
    "qué pasa si se queda sin batería coche eléctrico",
    "coste mantenimiento coche eléctrico vs gasolina",
    "mejor coche eléctrico calidad precio",
    "cuánto tarda en cargar un coche eléctrico",
    "ventajas coche eléctrico en ciudad",
    "coche eléctrico para viajes largos",
    "cómo cuidar batería coche eléctrico",
    "ITV coche eléctrico qué revisan",
    "seguro coche eléctrico más barato",
    "puntos de carga rápida en andalucía",
  ];

  for (const kw of genericFAQs) {
    results.push({
      keyword: kw,
      slug: slugify(kw),
      intent: "informational",
      targets: ["blog", "faq"],
      priority: "media",
      category: "generic-ev-faq",
      entities: {},
      existingPage: null,
      gap: true,
    });
  }

  return results;
}

function scanCompetitiveKeywords(): ScannedKeyword[] {
  const results: ScannedKeyword[] = [];

  const comparisons = [
    ["volkswagen", "tesla"],
    ["volkswagen", "hyundai"],
    ["audi", "bmw"],
    ["audi", "mercedes-benz"],
    ["skoda", "kia"],
    ["cupra", "tesla"],
    ["byd", "hyundai"],
    ["peugeot", "renault"],
  ];

  for (const [a, b] of comparisons) {
    const nameA = BRAND_NAMES[a];
    const nameB = BRAND_NAMES[b];
    if (!nameA || !nameB) continue;

    results.push({
      keyword: `${nameA.toLowerCase()} vs ${nameB.toLowerCase()} eléctrico`,
      slug: slugify(`${a}-vs-${b}-electrico`),
      intent: "informational",
      targets: ["blog"],
      priority: "media",
      category: "comparison",
      entities: { brand: a },
      existingPage: null,
      gap: true,
    });
  }

  const topicalKeywords = [
    { kw: "mejores coches eléctricos 2025", cat: "topical" },
    { kw: "coches eléctricos baratos españa", cat: "topical" },
    { kw: "suv eléctrico familiar", cat: "topical" },
    { kw: "coche eléctrico autonomía 500 km", cat: "topical" },
    { kw: "coches eléctricos entrega inmediata sevilla", cat: "topical-local" },
    { kw: "concesionario eléctricos andalucía", cat: "topical-local" },
    { kw: "ofertas coche eléctrico sevilla", cat: "topical-local" },
    { kw: "plan moves andalucía cuantía", cat: "topical" },
    { kw: "cargar coche eléctrico gratis sevilla", cat: "topical-local" },
    { kw: "taller coches eléctricos sevilla", cat: "topical-local" },
  ];

  for (const { kw, cat } of topicalKeywords) {
    results.push({
      keyword: kw,
      slug: slugify(kw),
      intent: cat.includes("local") ? "navigational" : "informational",
      targets: [cat.includes("local") ? "local" : "blog"],
      priority: cat.includes("local") ? "alta" : "media",
      category: cat,
      entities: {},
      existingPage: null,
      gap: true,
    });
  }

  return results;
}

function deduplicateKeywords(keywords: ScannedKeyword[]): ScannedKeyword[] {
  const seen = new Map<string, ScannedKeyword>();
  for (const kw of keywords) {
    const norm = kw.keyword
      .toLowerCase()
      .replace(/[¿?¡!]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!seen.has(norm)) {
      seen.set(norm, kw);
    }
  }
  return [...seen.values()];
}

function clusterKeywords(keywords: ScannedKeyword[]): KeywordCluster[] {
  const groups = new Map<string, ScannedKeyword[]>();

  for (const kw of keywords) {
    let head = "general";
    if (kw.entities.brand && kw.entities.service) {
      head = `${kw.entities.service}-${kw.entities.brand}`;
    } else if (kw.entities.brand && kw.entities.problem) {
      head = `${kw.entities.problem}-${kw.entities.brand}`;
    } else if (kw.entities.brand) {
      head = kw.entities.brand;
    } else if (kw.entities.service) {
      head = kw.entities.service;
    } else if (kw.entities.problem) {
      head = kw.entities.problem;
    } else {
      head = kw.category;
    }

    if (!groups.has(head)) groups.set(head, []);
    groups.get(head)!.push(kw);
  }

  const priorityScore: Record<KeywordPriority, number> = { alta: 3, media: 2, baja: 1 };
  const clusters: KeywordCluster[] = [];

  for (const [head, kws] of groups) {
    const avg = kws.reduce((s, k) => s + priorityScore[k.priority], 0) / kws.length;
    const targetCounts = new Map<PageTarget, number>();
    for (const k of kws) {
      for (const t of k.targets) {
        targetCounts.set(t, (targetCounts.get(t) || 0) + 1);
      }
    }
    let topTarget: PageTarget = "service";
    let topCount = 0;
    for (const [t, c] of targetCounts) {
      if (c > topCount) { topTarget = t; topCount = c; }
    }

    clusters.push({
      head,
      keywords: kws,
      totalKeywords: kws.length,
      avgPriority: Math.round(avg * 100) / 100,
      topTarget,
    });
  }

  clusters.sort((a, b) => b.avgPriority - a.avgPriority || b.totalKeywords - a.totalKeywords);
  return clusters;
}

export function scanKeywords(): ScannedKeyword[] {
  const raw = [
    ...scanServiceBrandKeywords(),
    ...scanProblemKeywords(),
    ...scanModelKeywords(),
    ...scanSubServiceKeywords(),
    ...scanFAQKeywords(),
    ...scanCompetitiveKeywords(),
  ];
  return deduplicateKeywords(raw);
}

export function generateScanReport(): ScanReport {
  const keywords = scanKeywords();

  const byIntent: Record<KeywordIntent, number> = { transactional: 0, informational: 0, navigational: 0, commercial: 0 };
  const byTarget: Record<PageTarget, number> = { landing: 0, faq: 0, blog: 0, service: 0, problem: 0, local: 0 };
  const byPriority: Record<KeywordPriority, number> = { alta: 0, media: 0, baja: 0 };
  let covered = 0;
  let gaps = 0;

  for (const kw of keywords) {
    byIntent[kw.intent]++;
    byPriority[kw.priority]++;
    for (const t of kw.targets) byTarget[t]++;
    if (kw.existingPage) covered++;
    if (kw.gap) gaps++;
  }

  const clusters = clusterKeywords(keywords);
  const topGaps = keywords
    .filter((k) => k.gap)
    .sort((a, b) => {
      const ps: Record<KeywordPriority, number> = { alta: 3, media: 2, baja: 1 };
      return ps[b.priority] - ps[a.priority];
    })
    .slice(0, 50);

  return {
    totalKeywords: keywords.length,
    byIntent,
    byTarget,
    byPriority,
    coveredByExistingPages: covered,
    gaps,
    clusters,
    topGaps,
  };
}

export function getKeywordsByBrand(brandSlug: string): ScannedKeyword[] {
  return scanKeywords().filter((k) => k.entities.brand === brandSlug);
}

export function getKeywordsByService(serviceSlug: string): ScannedKeyword[] {
  return scanKeywords().filter((k) => k.entities.service === serviceSlug);
}

export function getKeywordGaps(): ScannedKeyword[] {
  return scanKeywords().filter((k) => k.gap);
}

export function getKeywordsByTarget(target: PageTarget): ScannedKeyword[] {
  return scanKeywords().filter((k) => k.targets.includes(target));
}

export function exportKeywordsCSV(): string {
  const keywords = scanKeywords();
  const header = "keyword,slug,intent,targets,priority,category,brand,service,city,problem,model,existing_page,gap";
  const rows = keywords.map((k) =>
    [
      `"${k.keyword}"`,
      k.slug,
      k.intent,
      k.targets.join("|"),
      k.priority,
      k.category,
      k.entities.brand || "",
      k.entities.service || "",
      k.entities.city || "",
      k.entities.problem || "",
      k.entities.model || "",
      k.existingPage || "",
      k.gap ? "true" : "false",
    ].join(","),
  );
  return [header, ...rows].join("\n");
}
