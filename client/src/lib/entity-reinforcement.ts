import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export type EntityCategory = "organization" | "brand" | "service" | "sub-service" | "problem" | "city" | "model" | "component" | "technology";

export type ReinforcementZone = "heading" | "content" | "schema" | "internal-link" | "faq" | "meta" | "breadcrumb" | "cta" | "alt-text";

export interface Entity {
  id: string;
  name: string;
  slug: string;
  category: EntityCategory;
  aliases: string[];
  parentEntity: string | null;
  schemaType: string;
  sameAs: string[];
  importance: number;
}

export interface ZoneReinforcement {
  zone: ReinforcementZone;
  entityId: string;
  entityName: string;
  placement: string;
  template: string;
  priority: number;
}

export interface PageEntityPlan {
  pagePath: string;
  pageType: string;
  primaryEntities: Entity[];
  secondaryEntities: Entity[];
  reinforcements: ZoneReinforcement[];
  headingPlan: HeadingReinforcement[];
  contentPlan: ContentReinforcement[];
  schemaPlan: SchemaReinforcement[];
  linkPlan: LinkReinforcement[];
  faqPlan: FaqReinforcement[];
  entityDensity: EntityDensityReport;
  score: number;
}

export interface HeadingReinforcement {
  level: "h1" | "h2" | "h3";
  template: string;
  entities: string[];
  purpose: string;
}

export interface ContentReinforcement {
  section: string;
  entityMentions: { entity: string; frequency: number; context: string }[];
  coOccurrences: string[];
  semanticField: string[];
}

export interface SchemaReinforcement {
  schemaType: string;
  properties: Record<string, string | string[] | Record<string, string>>;
  entities: string[];
}

export interface LinkReinforcement {
  anchor: string;
  href: string;
  entityId: string;
  context: string;
  rel: string;
}

export interface FaqReinforcement {
  question: string;
  answerTemplate: string;
  entities: string[];
  targetKeyword: string;
}

export interface EntityDensityReport {
  totalEntityMentions: number;
  uniqueEntities: number;
  primaryDensity: number;
  secondaryDensity: number;
  zoneCoverage: Record<ReinforcementZone, boolean>;
  missingZones: ReinforcementZone[];
  score: number;
}

export interface EntityReinforcementReport {
  timestamp: string;
  totalEntities: number;
  totalPages: number;
  avgScore: number;
  entityCatalog: Entity[];
  byCategory: Record<EntityCategory, number>;
  globalDensity: { avgMentions: number; avgUnique: number; avgZoneCoverage: number };
  weakPages: { path: string; score: number; missingZones: string[] }[];
  strongPages: { path: string; score: number; topEntities: string[] }[];
  recommendations: string[];
  samplePlans: PageEntityPlan[];
}

const ORG_ENTITY: Entity = {
  id: "org-grupo-avisa",
  name: "Grupo Avisa",
  slug: "grupo-avisa",
  category: "organization",
  aliases: ["Avisa", "Grupo Avisa", "Talleres Avisa", "Grupo Avisa Sevilla"],
  parentEntity: null,
  schemaType: "AutoRepair",
  sameAs: ["https://electricos.grupoavisa.com"],
  importance: 10,
};

function buildEntityCatalog(): Entity[] {
  const entities: Entity[] = [ORG_ENTITY];

  for (const [slug, name] of Object.entries(BRAND_NAMES)) {
    const isOfficial = OFFICIAL_BRANDS.includes(slug);
    const models = VEHICLE_MODEL_FAMILIES[slug] || [];
    entities.push({
      id: `brand-${slug}`,
      name,
      slug,
      category: "brand",
      aliases: [
        name,
        `${name} eléctrico`,
        `${name} híbrido`,
        ...(isOfficial ? [`${name} oficial`, `Taller Oficial ${name}`] : [`Taller Especializado ${name}`]),
      ],
      parentEntity: null,
      schemaType: "Brand",
      sameAs: [],
      importance: isOfficial ? 9 : 7,
    });

    for (const model of models) {
      entities.push({
        id: `model-${slug}-${model.toLowerCase().replace(/[\s.]+/g, "-")}`,
        name: `${name} ${model}`,
        slug: `${slug}-${model.toLowerCase().replace(/[\s.]+/g, "-")}`,
        category: "model",
        aliases: [model, `${name} ${model}`, `${model} eléctrico`],
        parentEntity: `brand-${slug}`,
        schemaType: "Car",
        sameAs: [],
        importance: 4,
      });
    }
  }

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    entities.push({
      id: `service-${ss}`,
      name: def.title,
      slug: ss,
      category: "service",
      aliases: [def.title, `${def.title} vehículo eléctrico`, `${def.title} coche eléctrico`, `servicio de ${def.title.toLowerCase()}`],
      parentEntity: null,
      schemaType: "Service",
      sameAs: [],
      importance: 8,
    });
  }

  for (const [serviceSlug, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
    for (const sub of subs) {
      entities.push({
        id: `sub-service-${sub.slug}`,
        name: sub.name,
        slug: sub.slug,
        category: "sub-service",
        aliases: [sub.name, sub.name.replace(/^Reparación de |^Diagnóstico de |^Calibración de /, "")],
        parentEntity: `service-${serviceSlug}`,
        schemaType: "Service",
        sameAs: [],
        importance: 5,
      });
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    entities.push({
      id: `problem-${problem.slug}`,
      name: problem.name,
      slug: problem.slug,
      category: "problem",
      aliases: [problem.name, problem.name.toLowerCase()],
      parentEntity: null,
      schemaType: "Thing",
      sameAs: [],
      importance: 6,
    });
  }

  for (const city of SERVICE_CITIES) {
    entities.push({
      id: `city-${city.slug}`,
      name: city.city,
      slug: city.slug,
      category: "city",
      aliases: [city.city, `${city.city} (${city.province || ""})`].filter(Boolean),
      parentEntity: null,
      schemaType: "City",
      sameAs: [],
      importance: 6,
    });
  }

  const techEntities = [
    { name: "Batería de Alto Voltaje", slug: "bateria-alto-voltaje", aliases: ["batería HV", "battery pack", "batería alta tensión"] },
    { name: "Motor Eléctrico", slug: "motor-electrico", aliases: ["motor síncrono", "PMSM", "motor tracción"] },
    { name: "Inversor de Potencia", slug: "inversor-potencia", aliases: ["power inverter", "convertidor DC-AC", "inversor"] },
    { name: "Frenada Regenerativa", slug: "frenada-regenerativa", aliases: ["freno regenerativo", "regeneración energía", "KERS"] },
    { name: "Cargador a Bordo", slug: "cargador-bordo", aliases: ["OBC", "on-board charger", "cargador AC"] },
    { name: "BMS", slug: "bms", aliases: ["Battery Management System", "gestión batería", "sistema gestión batería"] },
    { name: "Punto de Carga", slug: "punto-de-carga", aliases: ["wallbox", "estación carga", "EVSE", "cargador doméstico"] },
    { name: "ADAS", slug: "adas", aliases: ["asistente conducción", "sistemas ADAS", "conducción asistida", "sensores ADAS"] },
  ];

  for (const tech of techEntities) {
    entities.push({
      id: `component-${tech.slug}`,
      name: tech.name,
      slug: tech.slug,
      category: "component",
      aliases: tech.aliases,
      parentEntity: null,
      schemaType: "Product",
      sameAs: [],
      importance: 5,
    });
  }

  const technologyEntities = [
    { name: "Carga Rápida DC", slug: "carga-rapida-dc", aliases: ["CCS", "carga rápida", "DC fast charging", "carga directa"] },
    { name: "Vehicle-to-Grid", slug: "vehicle-to-grid", aliases: ["V2G", "carga bidireccional", "vehicle to grid"] },
    { name: "Plataforma MEB", slug: "plataforma-meb", aliases: ["MEB", "Modular Electric Drive Toolkit"] },
  ];

  for (const tech of technologyEntities) {
    entities.push({
      id: `technology-${tech.slug}`,
      name: tech.name,
      slug: tech.slug,
      category: "technology",
      aliases: tech.aliases,
      parentEntity: null,
      schemaType: "Thing",
      sameAs: [],
      importance: 4,
    });
  }

  return entities;
}

let cachedCatalog: Entity[] | null = null;
function getCatalog(): Entity[] {
  if (!cachedCatalog) cachedCatalog = buildEntityCatalog();
  return cachedCatalog;
}

function detectPageType(path: string): string {
  if (path === "/") return "home";
  if (path === "/contacto") return "contact";
  if (path === "/postventa") return "postventa";
  if (path === "/electrificacion") return "electrificacion";
  if (path.startsWith("/marcas/")) return "brand-pillar";
  if (path.startsWith("/preguntas")) return "faq";
  if (path.match(/^\/taller-electricos-/)) return "local-landing";
  if (path.startsWith("/problemas/")) {
    if (SERVICE_CITIES.some((c) => path.endsWith(`-${c.slug}`))) return "problem-brand-city";
    return "problem-brand";
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
  return "static";
}

function resolvePageEntities(path: string, pageType: string): { primary: Entity[]; secondary: Entity[] } {
  const catalog = getCatalog();
  const primary: Entity[] = [];
  const secondary: Entity[] = [];
  const brands = Object.keys(BRAND_NAMES);

  primary.push(ORG_ENTITY);

  if (pageType === "brand-pillar") {
    const brandSlug = path.replace("/marcas/", "");
    const brandEntity = catalog.find((e) => e.id === `brand-${brandSlug}`);
    if (brandEntity) primary.push(brandEntity);
    const models = catalog.filter((e) => e.parentEntity === `brand-${brandSlug}`);
    secondary.push(...models.slice(0, 4));
    const services = catalog.filter((e) => e.category === "service");
    secondary.push(...services);
  }

  if (pageType === "service-pillar") {
    const serviceSlug = path.replace("/servicios/", "");
    const serviceEntity = catalog.find((e) => e.id === `service-${serviceSlug}`);
    if (serviceEntity) primary.push(serviceEntity);
    const subs = catalog.filter((e) => e.parentEntity === `service-${serviceSlug}`);
    secondary.push(...subs);
    const topBrands = catalog.filter((e) => e.category === "brand" && e.importance >= 9);
    secondary.push(...topBrands);
  }

  if (pageType === "service-brand" || pageType === "service-brand-city" || pageType === "sub-service-brand") {
    const slug = path.replace("/servicios/", "");
    for (const ss of SERVICE_SLUGS) {
      for (const brand of brands) {
        if (slug.startsWith(`${ss}-${brand}`)) {
          const svcEnt = catalog.find((e) => e.id === `service-${ss}`);
          const brandEnt = catalog.find((e) => e.id === `brand-${brand}`);
          if (svcEnt) primary.push(svcEnt);
          if (brandEnt) primary.push(brandEnt);
          const models = catalog.filter((e) => e.parentEntity === `brand-${brand}`).slice(0, 3);
          secondary.push(...models);
        }
      }
    }
    for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
      for (const sub of subs) {
        for (const brand of brands) {
          if (slug === `${sub.slug}-${brand}`) {
            const subEnt = catalog.find((e) => e.id === `sub-service-${sub.slug}`);
            if (subEnt) primary.push(subEnt);
          }
        }
      }
    }
    if (pageType === "service-brand-city") {
      for (const city of SERVICE_CITIES) {
        if (slug.endsWith(`-${city.slug}`)) {
          const cityEnt = catalog.find((e) => e.id === `city-${city.slug}`);
          if (cityEnt) primary.push(cityEnt);
        }
      }
    }
  }

  if (pageType === "problem-brand" || pageType === "problem-brand-city") {
    const slug = path.replace("/problemas/", "");
    for (const problem of PROBLEM_TOPICS) {
      for (const brand of brands) {
        if (slug.startsWith(`${problem.slug}-${brand}`)) {
          const probEnt = catalog.find((e) => e.id === `problem-${problem.slug}`);
          const brandEnt = catalog.find((e) => e.id === `brand-${brand}`);
          if (probEnt) primary.push(probEnt);
          if (brandEnt) primary.push(brandEnt);
          const diagService = catalog.find((e) => e.id === "service-diagnostico");
          const repService = catalog.find((e) => e.id === "service-reparacion");
          if (diagService) secondary.push(diagService);
          if (repService) secondary.push(repService);
        }
      }
    }
    if (pageType === "problem-brand-city") {
      for (const city of SERVICE_CITIES) {
        if (slug.endsWith(`-${city.slug}`)) {
          const cityEnt = catalog.find((e) => e.id === `city-${city.slug}`);
          if (cityEnt) primary.push(cityEnt);
        }
      }
    }
  }

  if (pageType === "local-landing") {
    const citySlug = path.replace("/taller-electricos-", "");
    const cityEnt = catalog.find((e) => e.id === `city-${citySlug}`);
    if (cityEnt) primary.push(cityEnt);
    const services = catalog.filter((e) => e.category === "service");
    secondary.push(...services);
    const topBrands = catalog.filter((e) => e.category === "brand" && e.importance >= 9);
    secondary.push(...topBrands);
  }

  if (pageType === "home") {
    const services = catalog.filter((e) => e.category === "service");
    secondary.push(...services);
    const topBrands = catalog.filter((e) => e.category === "brand" && e.importance >= 8);
    secondary.push(...topBrands);
  }

  if (pageType === "contact") {
    const services = catalog.filter((e) => e.category === "service").slice(0, 3);
    secondary.push(...services);
  }

  const primaryIds = new Set(primary.map((e) => e.id));
  const dedupedSecondary = secondary.filter((e) => !primaryIds.has(e.id));
  const uniqueSecondary: Entity[] = [];
  const seenIds = new Set<string>();
  for (const e of dedupedSecondary) {
    if (!seenIds.has(e.id)) {
      seenIds.add(e.id);
      uniqueSecondary.push(e);
    }
  }

  return { primary, secondary: uniqueSecondary };
}

function generateHeadingPlan(primary: Entity[], pageType: string, path: string): HeadingReinforcement[] {
  const headings: HeadingReinforcement[] = [];
  const brandEnt = primary.find((e) => e.category === "brand");
  const serviceEnt = primary.find((e) => e.category === "service");
  const subServiceEnt = primary.find((e) => e.category === "sub-service");
  const problemEnt = primary.find((e) => e.category === "problem");
  const cityEnt = primary.find((e) => e.category === "city");
  const brandName = brandEnt?.name || "";
  const serviceName = serviceEnt?.name || "";
  const isOfficial = brandEnt ? OFFICIAL_BRANDS.includes(brandEnt.slug) : false;
  const tallerType = isOfficial ? "Taller Oficial" : "Taller Especializado";

  switch (pageType) {
    case "service-brand":
      headings.push(
        { level: "h1", template: `${serviceName} ${brandName} Eléctrico — ${tallerType}`, entities: [serviceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Posicionar servicio+marca+autoridad" },
        { level: "h2", template: `¿Por qué elegir a Grupo Avisa para ${serviceName.toLowerCase()} de tu ${brandName}?`, entities: ["org-grupo-avisa", serviceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Reforzar marca organizacional + servicio" },
        { level: "h2", template: `Especialistas en ${brandName} Eléctricos e Híbridos`, entities: [brandEnt?.id].filter(Boolean) as string[], purpose: "Reforzar expertise de marca" },
        { level: "h2", template: `Proceso de ${serviceName} para ${brandName}`, entities: [serviceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Co-ocurrencia servicio+marca en heading" },
        { level: "h2", template: `Preguntas Frecuentes sobre ${serviceName} ${brandName}`, entities: [serviceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "FAQ section con entidades" },
      );
      break;

    case "service-brand-city":
      headings.push(
        { level: "h1", template: `${serviceName} ${brandName} en ${cityEnt?.name || ""} — ${tallerType}`, entities: [serviceEnt?.id, brandEnt?.id, cityEnt?.id].filter(Boolean) as string[], purpose: "Triple entidad: servicio+marca+ciudad" },
        { level: "h2", template: `${tallerType} ${brandName} en ${cityEnt?.name || ""}`, entities: [brandEnt?.id, cityEnt?.id].filter(Boolean) as string[], purpose: "Reforzar marca+ciudad" },
        { level: "h2", template: `Servicio de ${serviceName} para tu ${brandName}`, entities: [serviceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Servicio+marca co-ocurrencia" },
      );
      break;

    case "service-pillar":
      headings.push(
        { level: "h1", template: `${serviceName} de Vehículos Eléctricos e Híbridos — Grupo Avisa`, entities: [serviceEnt?.id, "org-grupo-avisa"].filter(Boolean) as string[], purpose: "Servicio pilar + organización" },
        { level: "h2", template: `¿Qué incluye nuestro servicio de ${serviceName.toLowerCase()}?`, entities: [serviceEnt?.id].filter(Boolean) as string[], purpose: "Definir servicio" },
        { level: "h2", template: "Marcas que Atendemos", entities: [], purpose: "Sección para enlazar entidades de marca" },
      );
      break;

    case "brand-pillar":
      headings.push(
        { level: "h1", template: `${brandName} Eléctrico — ${tallerType} en Grupo Avisa`, entities: [brandEnt?.id, "org-grupo-avisa"].filter(Boolean) as string[], purpose: "Marca+organización+autoridad" },
        { level: "h2", template: `Servicios para tu ${brandName} Eléctrico`, entities: [brandEnt?.id].filter(Boolean) as string[], purpose: "Marca en contexto servicios" },
        { level: "h2", template: `Modelos ${brandName} que Atendemos`, entities: [brandEnt?.id].filter(Boolean) as string[], purpose: "Marca+modelos" },
      );
      break;

    case "problem-brand":
      headings.push(
        { level: "h1", template: `${problemEnt?.name || ""} en ${brandName} — Causas, Síntomas y Solución`, entities: [problemEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Problema+marca+intención informacional" },
        { level: "h2", template: `¿Por qué se produce ${problemEnt?.name?.toLowerCase() || ""} en ${brandName}?`, entities: [problemEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Reforzar problema+marca" },
        { level: "h2", template: `Diagnóstico de ${problemEnt?.name || ""} en ${brandName}`, entities: [problemEnt?.id, brandEnt?.id, "service-diagnostico"].filter(Boolean) as string[], purpose: "Problema+marca+servicio co-ocurrencia" },
        { level: "h2", template: `Solución en Grupo Avisa`, entities: ["org-grupo-avisa"].filter(Boolean) as string[], purpose: "Reforzar organización como solución" },
      );
      break;

    case "problem-brand-city":
      headings.push(
        { level: "h1", template: `${problemEnt?.name || ""} ${brandName} en ${cityEnt?.name || ""} — Resolución Profesional`, entities: [problemEnt?.id, brandEnt?.id, cityEnt?.id].filter(Boolean) as string[], purpose: "Triple entidad local" },
        { level: "h2", template: `Resolvemos ${problemEnt?.name?.toLowerCase() || ""} en tu ${brandName}`, entities: [problemEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Problema+marca" },
      );
      break;

    case "sub-service-brand":
      headings.push(
        { level: "h1", template: `${subServiceEnt?.name || ""} ${brandName} — Grupo Avisa`, entities: [subServiceEnt?.id, brandEnt?.id, "org-grupo-avisa"].filter(Boolean) as string[], purpose: "Sub-servicio+marca+organización" },
        { level: "h2", template: `Especialistas en ${subServiceEnt?.name || ""} para ${brandName}`, entities: [subServiceEnt?.id, brandEnt?.id].filter(Boolean) as string[], purpose: "Reforzar expertise" },
      );
      break;

    case "local-landing":
      headings.push(
        { level: "h1", template: `Taller de Vehículos Eléctricos en ${cityEnt?.name || ""} — Grupo Avisa`, entities: [cityEnt?.id, "org-grupo-avisa"].filter(Boolean) as string[], purpose: "Ciudad+organización" },
        { level: "h2", template: `Servicios en ${cityEnt?.name || ""}`, entities: [cityEnt?.id].filter(Boolean) as string[], purpose: "Ciudad+servicios" },
      );
      break;

    case "home":
      headings.push(
        { level: "h1", template: "Grupo Avisa — Taller Especializado en Vehículos Eléctricos e Híbridos", entities: ["org-grupo-avisa"], purpose: "Marca organizacional dominante" },
        { level: "h2", template: "Nuestros Servicios", entities: [], purpose: "Sección servicios" },
        { level: "h2", template: "Marcas que Atendemos", entities: [], purpose: "Sección marcas" },
      );
      break;

    default:
      headings.push(
        { level: "h1", template: `Grupo Avisa — ${path.replace(/\//g, " ").trim()}`, entities: ["org-grupo-avisa"], purpose: "Organización base" },
      );
      break;
  }

  return headings;
}

function generateContentPlan(primary: Entity[], secondary: Entity[], pageType: string): ContentReinforcement[] {
  const sections: ContentReinforcement[] = [];
  const brandEnt = primary.find((e) => e.category === "brand");
  const serviceEnt = primary.find((e) => e.category === "service");
  const problemEnt = primary.find((e) => e.category === "problem");
  const cityEnt = primary.find((e) => e.category === "city");

  sections.push({
    section: "Introducción",
    entityMentions: [
      { entity: "Grupo Avisa", frequency: 1, context: "En Grupo Avisa, somos especialistas en..." },
      ...(brandEnt ? [{ entity: brandEnt.name, frequency: 2, context: `vehículos ${brandEnt.name} eléctricos e híbridos` }] : []),
      ...(serviceEnt ? [{ entity: serviceEnt.name, frequency: 1, context: `servicio de ${serviceEnt.name.toLowerCase()}` }] : []),
      ...(cityEnt ? [{ entity: cityEnt.name, frequency: 1, context: `en ${cityEnt.name}` }] : []),
    ],
    coOccurrences: [
      brandEnt && serviceEnt ? `${serviceEnt.name} ${brandEnt.name}` : "",
      brandEnt ? `Grupo Avisa + ${brandEnt.name}` : "",
    ].filter(Boolean),
    semanticField: ["vehículo eléctrico", "coche eléctrico", "híbrido enchufable", "movilidad sostenible"],
  });

  if (serviceEnt) {
    sections.push({
      section: "Servicio Detallado",
      entityMentions: [
        { entity: serviceEnt.name, frequency: 3, context: `nuestro proceso de ${serviceEnt.name.toLowerCase()}` },
        ...(brandEnt ? [{ entity: brandEnt.name, frequency: 2, context: `específico para ${brandEnt.name}` }] : []),
      ],
      coOccurrences: [
        brandEnt ? `${serviceEnt.name} + ${brandEnt.name}` : "",
        "Grupo Avisa + especialistas",
      ].filter(Boolean),
      semanticField: ["equipamiento homologado", "técnicos certificados", "tecnología avanzada"],
    });
  }

  if (problemEnt) {
    sections.push({
      section: "Descripción del Problema",
      entityMentions: [
        { entity: problemEnt.name, frequency: 3, context: `${problemEnt.name} es un problema frecuente en...` },
        ...(brandEnt ? [{ entity: brandEnt.name, frequency: 2, context: `en modelos ${brandEnt.name}` }] : []),
      ],
      coOccurrences: [
        brandEnt ? `${problemEnt.name} + ${brandEnt.name}` : "",
      ].filter(Boolean),
      semanticField: ["avería", "fallo", "diagnóstico", "síntoma", "causa"],
    });
  }

  const modelEntities = secondary.filter((e) => e.category === "model");
  if (modelEntities.length > 0) {
    sections.push({
      section: "Modelos Atendidos",
      entityMentions: modelEntities.map((m) => ({
        entity: m.name,
        frequency: 1,
        context: `${m.name}: servicio completo disponible`,
      })),
      coOccurrences: modelEntities.map((m) => `${m.name} + Grupo Avisa`),
      semanticField: ["gama eléctrica", "modelos disponibles", "catálogo"],
    });
  }

  sections.push({
    section: "CTA / Cierre",
    entityMentions: [
      { entity: "Grupo Avisa", frequency: 1, context: "Confía en Grupo Avisa para..." },
      ...(cityEnt ? [{ entity: cityEnt.name, frequency: 1, context: `Visítanos en ${cityEnt.name}` }] : []),
    ],
    coOccurrences: ["Grupo Avisa + confianza + experiencia"],
    semanticField: ["presupuesto", "cita previa", "contacto", "profesionalidad"],
  });

  return sections;
}

function generateSchemaPlan(primary: Entity[], pageType: string, path: string): SchemaReinforcement[] {
  const schemas: SchemaReinforcement[] = [];
  const brandEnt = primary.find((e) => e.category === "brand");
  const serviceEnt = primary.find((e) => e.category === "service");
  const cityEnt = primary.find((e) => e.category === "city");
  const problemEnt = primary.find((e) => e.category === "problem");
  const isOfficial = brandEnt ? OFFICIAL_BRANDS.includes(brandEnt.slug) : false;

  schemas.push({
    schemaType: "AutoRepair",
    properties: {
      name: "Grupo Avisa",
      url: "https://electricos.grupoavisa.com",
      telephone: "+34955034600",
      email: "info@grupoavisa.com",
      areaServed: SERVICE_CITIES.map((c) => c.city).join(", "),
    },
    entities: ["org-grupo-avisa"],
  });

  if (serviceEnt) {
    schemas.push({
      schemaType: "Service",
      properties: {
        name: serviceEnt.name + (brandEnt ? ` ${brandEnt.name}` : ""),
        provider: "Grupo Avisa",
        serviceType: serviceEnt.name,
        ...(brandEnt ? { brand: brandEnt.name } : {}),
        ...(cityEnt ? { areaServed: cityEnt.name } : {}),
      },
      entities: [serviceEnt.id, ...(brandEnt ? [brandEnt.id] : [])],
    });
  }

  if (brandEnt) {
    schemas.push({
      schemaType: "Brand",
      properties: {
        name: brandEnt.name,
        description: `${isOfficial ? "Taller Oficial" : "Taller Especializado"} ${brandEnt.name} en Grupo Avisa`,
      },
      entities: [brandEnt.id],
    });
  }

  if (cityEnt) {
    schemas.push({
      schemaType: "LocalBusiness",
      properties: {
        name: `Grupo Avisa — ${cityEnt.name}`,
        address: cityEnt.name,
        areaServed: cityEnt.name,
      },
      entities: ["org-grupo-avisa", cityEnt.id],
    });
  }

  if (problemEnt) {
    schemas.push({
      schemaType: "Article",
      properties: {
        headline: `${problemEnt.name}${brandEnt ? ` en ${brandEnt.name}` : ""}: Causas, Síntomas y Solución`,
        author: "Grupo Avisa",
        publisher: "Grupo Avisa",
        about: problemEnt.name,
      },
      entities: [problemEnt.id, ...(brandEnt ? [brandEnt.id] : [])],
    });
  }

  return schemas;
}

function generateLinkPlan(primary: Entity[], secondary: Entity[], pageType: string): LinkReinforcement[] {
  const links: LinkReinforcement[] = [];
  const brandEnt = primary.find((e) => e.category === "brand");
  const serviceEnt = primary.find((e) => e.category === "service");

  links.push({
    anchor: "Grupo Avisa",
    href: "/",
    entityId: "org-grupo-avisa",
    context: "Enlace a la marca principal en cada página",
    rel: "",
  });

  if (brandEnt) {
    links.push({
      anchor: `${brandEnt.name} Eléctrico`,
      href: `/marcas/${brandEnt.slug}`,
      entityId: brandEnt.id,
      context: "Enlace a pillar de marca",
      rel: "",
    });
  }

  if (serviceEnt) {
    links.push({
      anchor: `${serviceEnt.name} de Vehículos Eléctricos`,
      href: `/servicios/${serviceEnt.slug}`,
      entityId: serviceEnt.id,
      context: "Enlace a pillar de servicio",
      rel: "",
    });
  }

  if (brandEnt && serviceEnt) {
    links.push({
      anchor: `${serviceEnt.name} ${brandEnt.name}`,
      href: `/servicios/${serviceEnt.slug}-${brandEnt.slug}`,
      entityId: serviceEnt.id,
      context: "Enlace contextual servicio×marca",
      rel: "",
    });
  }

  for (const ent of secondary.filter((e) => e.category === "service").slice(0, 3)) {
    links.push({
      anchor: ent.name,
      href: `/servicios/${ent.slug}`,
      entityId: ent.id,
      context: "Enlace cruzado a servicio relacionado",
      rel: "",
    });
  }

  for (const ent of secondary.filter((e) => e.category === "brand").slice(0, 3)) {
    links.push({
      anchor: `${ent.name} Eléctrico`,
      href: `/marcas/${ent.slug}`,
      entityId: ent.id,
      context: "Enlace cruzado a marca relacionada",
      rel: "",
    });
  }

  links.push({
    anchor: "Solicitar presupuesto",
    href: "/contacto",
    entityId: "org-grupo-avisa",
    context: "CTA transaccional",
    rel: "",
  });

  return links;
}

function generateFaqPlan(primary: Entity[], pageType: string): FaqReinforcement[] {
  const faqs: FaqReinforcement[] = [];
  const brandEnt = primary.find((e) => e.category === "brand");
  const serviceEnt = primary.find((e) => e.category === "service");
  const problemEnt = primary.find((e) => e.category === "problem");
  const cityEnt = primary.find((e) => e.category === "city");
  const brandName = brandEnt?.name || "eléctricos";
  const rawServiceName = serviceEnt?.name?.toLowerCase() || "servicio";
  const serviceName = rawServiceName;
  const serviceArticle = ["reparación", "instalación de punto de carga", "garantía y extensión de garantía", "calibración"].some((s) => rawServiceName.startsWith(s)) ? "la" : "el";
  const isOfficial = brandEnt ? OFFICIAL_BRANDS.includes(brandEnt.slug) : false;
  const tallerType = isOfficial ? "Taller Oficial" : "Taller Especializado";

  if (serviceEnt && brandEnt) {
    faqs.push(
      {
        question: `¿Cuánto cuesta ${serviceArticle} ${serviceName} de un ${brandName} eléctrico en Grupo Avisa?`,
        answerTemplate: `El precio de ${serviceArticle} ${serviceName} de tu ${brandName} eléctrico en Grupo Avisa depende del modelo y la intervención necesaria. Como ${tallerType} ${brandName}, ofrecemos presupuestos personalizados sin compromiso.`,
        entities: [serviceEnt.id, brandEnt.id, "org-grupo-avisa"],
        targetKeyword: `precio ${serviceName} ${brandName.toLowerCase()}`,
      },
      {
        question: `¿Grupo Avisa es ${tallerType} ${brandName} para ${serviceName}?`,
        answerTemplate: `Sí, Grupo Avisa es ${tallerType} ${brandName}. Contamos con técnicos certificados y equipamiento homologado para realizar ${serviceArticle} ${serviceName} de todos los modelos eléctricos e híbridos de ${brandName}.`,
        entities: [brandEnt.id, "org-grupo-avisa", serviceEnt.id],
        targetKeyword: `${tallerType.toLowerCase()} ${brandName.toLowerCase()} ${serviceName}`,
      },
      {
        question: `¿Cuánto tarda ${serviceArticle} ${serviceName} de un ${brandName} eléctrico?`,
        answerTemplate: `El tiempo de ${serviceName} de tu ${brandName} eléctrico en Grupo Avisa varía según el modelo y la complejidad. Nuestros técnicos especializados en ${brandName} trabajan con la máxima eficiencia para minimizar el tiempo en taller.`,
        entities: [serviceEnt.id, brandEnt.id, "org-grupo-avisa"],
        targetKeyword: `tiempo ${serviceName} ${brandName.toLowerCase()}`,
      },
    );
  }

  if (problemEnt && brandEnt) {
    faqs.push(
      {
        question: `¿Qué causa ${problemEnt.name.toLowerCase()} en ${brandName} eléctrico?`,
        answerTemplate: `${problemEnt.name} en ${brandName} eléctrico puede deberse a múltiples factores. En Grupo Avisa, como ${tallerType} ${brandName}, realizamos un diagnóstico completo para identificar la causa exacta y ofrecer la solución más adecuada.`,
        entities: [problemEnt.id, brandEnt.id, "org-grupo-avisa"],
        targetKeyword: `causas ${problemEnt.name.toLowerCase()} ${brandName.toLowerCase()}`,
      },
      {
        question: `¿Cómo soluciona Grupo Avisa ${problemEnt.name.toLowerCase()} en ${brandName}?`,
        answerTemplate: `En Grupo Avisa resolvemos ${problemEnt.name.toLowerCase()} en ${brandName} mediante diagnóstico avanzado con equipamiento homologado. Como ${tallerType} ${brandName}, aplicamos los protocolos oficiales de reparación.`,
        entities: [problemEnt.id, brandEnt.id, "org-grupo-avisa"],
        targetKeyword: `solución ${problemEnt.name.toLowerCase()} ${brandName.toLowerCase()}`,
      },
    );
  }

  if (cityEnt) {
    faqs.push({
      question: `¿Dónde está el taller Grupo Avisa en ${cityEnt.name}?`,
      answerTemplate: `Grupo Avisa dispone de instalaciones en ${cityEnt.name} equipadas para atender vehículos eléctricos e híbridos. Puedes contactarnos en el 955 034 600 o por WhatsApp para solicitar cita previa.`,
      entities: ["org-grupo-avisa", cityEnt.id],
      targetKeyword: `taller eléctricos ${cityEnt.name.toLowerCase()}`,
    });
  }

  if (faqs.length === 0) {
    faqs.push({
      question: "¿Por qué elegir Grupo Avisa para mi vehículo eléctrico?",
      answerTemplate: "Grupo Avisa es referente en el mantenimiento y reparación de vehículos eléctricos e híbridos. Contamos con técnicos certificados, equipamiento de última generación y somos Taller Oficial de las principales marcas del grupo Volkswagen.",
      entities: ["org-grupo-avisa"],
      targetKeyword: "taller eléctricos grupo avisa",
    });
  }

  return faqs;
}

function calculateDensity(plan: PageEntityPlan): EntityDensityReport {
  const allEntities = new Set<string>();
  let totalMentions = 0;
  let primaryMentions = 0;
  let secondaryMentions = 0;

  const primaryIds = new Set(plan.primaryEntities.map((e) => e.id));

  for (const cr of plan.contentPlan) {
    for (const m of cr.entityMentions) {
      totalMentions += m.frequency;
      allEntities.add(m.entity);
      const isPrimary = plan.primaryEntities.some((e) => e.name === m.entity || e.aliases.includes(m.entity));
      if (isPrimary) primaryMentions += m.frequency;
      else secondaryMentions += m.frequency;
    }
  }

  const zoneCoverage: Record<ReinforcementZone, boolean> = {
    heading: plan.headingPlan.length > 0,
    content: plan.contentPlan.length > 0,
    schema: plan.schemaPlan.length > 0,
    "internal-link": plan.linkPlan.length > 0,
    faq: plan.faqPlan.length > 0,
    meta: true,
    breadcrumb: true,
    cta: plan.linkPlan.some((l) => l.context.includes("CTA")),
    "alt-text": plan.contentPlan.some((c) => c.section === "Modelos Atendidos"),
  };

  const missingZones = (Object.entries(zoneCoverage) as [ReinforcementZone, boolean][])
    .filter(([, covered]) => !covered)
    .map(([zone]) => zone);

  const coveredCount = Object.values(zoneCoverage).filter(Boolean).length;
  const totalZones = Object.keys(zoneCoverage).length;
  const score = Math.round((coveredCount / totalZones) * 100);

  return {
    totalEntityMentions: totalMentions,
    uniqueEntities: allEntities.size,
    primaryDensity: totalMentions > 0 ? Math.round((primaryMentions / totalMentions) * 100) : 0,
    secondaryDensity: totalMentions > 0 ? Math.round((secondaryMentions / totalMentions) * 100) : 0,
    zoneCoverage,
    missingZones,
    score,
  };
}

export function getEntityCatalog(): Entity[] {
  return getCatalog();
}

export function getPageEntityPlan(path: string): PageEntityPlan {
  const pageType = detectPageType(path);
  const { primary, secondary } = resolvePageEntities(path, pageType);

  const reinforcements: ZoneReinforcement[] = [];
  for (const ent of primary) {
    const zones: ReinforcementZone[] = ["heading", "content", "schema", "internal-link", "faq", "meta"];
    for (const zone of zones) {
      reinforcements.push({
        zone,
        entityId: ent.id,
        entityName: ent.name,
        placement: `${zone} — ${ent.name} como entidad primaria`,
        template: `Incluir "${ent.name}" en ${zone}`,
        priority: ent.importance,
      });
    }
  }
  for (const ent of secondary) {
    const zones: ReinforcementZone[] = ["content", "internal-link"];
    for (const zone of zones) {
      reinforcements.push({
        zone,
        entityId: ent.id,
        entityName: ent.name,
        placement: `${zone} — ${ent.name} como entidad secundaria`,
        template: `Mencionar "${ent.name}" en ${zone}`,
        priority: ent.importance,
      });
    }
  }

  const headingPlan = generateHeadingPlan(primary, pageType, path);
  const contentPlan = generateContentPlan(primary, secondary, pageType);
  const schemaPlan = generateSchemaPlan(primary, pageType, path);
  const linkPlan = generateLinkPlan(primary, secondary, pageType);
  const faqPlan = generateFaqPlan(primary, pageType);

  const plan: PageEntityPlan = {
    pagePath: path,
    pageType,
    primaryEntities: primary,
    secondaryEntities: secondary,
    reinforcements,
    headingPlan,
    contentPlan,
    schemaPlan,
    linkPlan,
    faqPlan,
    entityDensity: { totalEntityMentions: 0, uniqueEntities: 0, primaryDensity: 0, secondaryDensity: 0, zoneCoverage: {} as any, missingZones: [], score: 0 },
    score: 0,
  };

  plan.entityDensity = calculateDensity(plan);
  plan.score = plan.entityDensity.score;

  return plan;
}

export function getEntityReinforcementReport(sampleSize?: number): EntityReinforcementReport {
  const catalog = getCatalog();
  const brands = Object.keys(BRAND_NAMES);

  const samplePaths: string[] = ["/"];
  for (const ss of SERVICE_SLUGS) {
    samplePaths.push(`/servicios/${ss}`);
    for (const brand of brands.slice(0, 4)) {
      samplePaths.push(`/servicios/${ss}-${brand}`);
    }
  }
  for (const brand of brands.slice(0, 4)) {
    samplePaths.push(`/marcas/${brand}`);
  }
  for (const problem of PROBLEM_TOPICS.slice(0, 3)) {
    for (const brand of brands.slice(0, 3)) {
      samplePaths.push(`/problemas/${problem.slug}-${brand}`);
    }
  }
  for (const city of SERVICE_CITIES.slice(0, 3)) {
    samplePaths.push(`/taller-electricos-${city.slug}`);
  }
  samplePaths.push("/contacto");

  const targetPaths = sampleSize ? samplePaths.slice(0, sampleSize) : samplePaths;
  const plans = targetPaths.map((p) => getPageEntityPlan(p));

  const byCategory: Record<EntityCategory, number> = {
    organization: 0, brand: 0, service: 0, "sub-service": 0,
    problem: 0, city: 0, model: 0, component: 0, technology: 0,
  };
  for (const e of catalog) byCategory[e.category]++;

  const totalMentions = plans.reduce((sum, p) => sum + p.entityDensity.totalEntityMentions, 0);
  const totalUnique = plans.reduce((sum, p) => sum + p.entityDensity.uniqueEntities, 0);
  const totalZoneCov = plans.reduce((sum, p) => {
    const covered = Object.values(p.entityDensity.zoneCoverage).filter(Boolean).length;
    const total = Object.keys(p.entityDensity.zoneCoverage).length;
    return sum + (total > 0 ? covered / total : 0);
  }, 0);

  const n = plans.length || 1;
  const avgScore = Math.round(plans.reduce((sum, p) => sum + p.score, 0) / n);

  const sortedByScore = [...plans].sort((a, b) => a.score - b.score);
  const weakPages = sortedByScore.slice(0, 5).map((p) => ({
    path: p.pagePath,
    score: p.score,
    missingZones: p.entityDensity.missingZones,
  }));
  const strongPages = sortedByScore.slice(-5).reverse().map((p) => ({
    path: p.pagePath,
    score: p.score,
    topEntities: p.primaryEntities.map((e) => e.name),
  }));

  const recommendations: string[] = [];
  if (avgScore < 80) recommendations.push("Aumentar cobertura de entidades en zonas faltantes (schema, FAQs, alt-text).");
  const weakCount = plans.filter((p) => p.score < 70).length;
  if (weakCount > 0) recommendations.push(`${weakCount} páginas con score < 70. Priorizar refuerzo de entidades en esas páginas.`);
  const noFaq = plans.filter((p) => p.faqPlan.length === 0).length;
  if (noFaq > 0) recommendations.push(`${noFaq} páginas sin FAQs con entidades. Añadir FAQs con mención a Grupo Avisa + marca/servicio.`);
  if (recommendations.length === 0) recommendations.push("Cobertura de entidades óptima. Mantener consistencia en nuevas páginas.");

  return {
    timestamp: new Date().toISOString(),
    totalEntities: catalog.length,
    totalPages: plans.length,
    avgScore,
    entityCatalog: catalog,
    byCategory,
    globalDensity: {
      avgMentions: Math.round(totalMentions / n),
      avgUnique: Math.round(totalUnique / n),
      avgZoneCoverage: Math.round((totalZoneCov / n) * 100),
    },
    weakPages,
    strongPages,
    recommendations,
    samplePlans: plans.slice(0, 10),
  };
}

export function getEntitySummary(): {
  totalEntities: number;
  byCategory: Record<string, number>;
  avgScore: number;
  avgMentions: number;
  avgZoneCoverage: number;
  weakPages: { path: string; score: number; missingZones: string[] }[];
  strongPages: { path: string; score: number; topEntities: string[] }[];
  recommendations: string[];
} {
  const report = getEntityReinforcementReport();
  return {
    totalEntities: report.totalEntities,
    byCategory: report.byCategory,
    avgScore: report.avgScore,
    avgMentions: report.globalDensity.avgMentions,
    avgZoneCoverage: report.globalDensity.avgZoneCoverage,
    weakPages: report.weakPages,
    strongPages: report.strongPages,
    recommendations: report.recommendations,
  };
}
