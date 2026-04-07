import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS } from "./seo-growth-engine";

export type KGEntityType =
  | "organization"
  | "service"
  | "brand"
  | "problem"
  | "symptom"
  | "component"
  | "technology"
  | "location"
  | "vehicle-model"
  | "regulation"
  | "concept";

export type KGRelationType =
  | "ofrece"
  | "especializado-en"
  | "detecta"
  | "resuelve"
  | "causa"
  | "síntoma-de"
  | "compuesto-por"
  | "requiere"
  | "ubicado-en"
  | "cubre"
  | "certifica"
  | "relacionado-con"
  | "subservicio-de"
  | "modelo-de"
  | "regulado-por"
  | "usa-tecnología";

export interface KGEntity {
  id: string;
  type: KGEntityType;
  label: string;
  aliases: string[];
  description: string;
  url?: string;
  importance: number;
  properties: Record<string, string>;
}

export interface KGRelation {
  from: string;
  to: string;
  type: KGRelationType;
  label: string;
  weight: number;
  bidirectional: boolean;
  context?: string;
}

export interface KnowledgeGraph {
  entities: KGEntity[];
  relations: KGRelation[];
  totalEntities: number;
  totalRelations: number;
  density: number;
  topHubs: { id: string; label: string; degree: number }[];
}

export interface KGQueryResult {
  entity: KGEntity;
  neighbors: { entity: KGEntity; relation: KGRelation }[];
  depth2: KGEntity[];
  internalLinks: { text: string; href: string }[];
  faqs: string[];
  contentHints: string[];
}

export interface KGSiteReport {
  timestamp: string;
  totalEntities: number;
  totalRelations: number;
  byType: Record<KGEntityType, number>;
  byRelationType: Record<KGRelationType, number>;
  topHubs: { id: string; label: string; degree: number }[];
  coverageScore: number;
  schemaCompatibility: string[];
  recommendations: string[];
}

const COMPANY_ID = "org-grupo-avisa";
const BASE_URL = "https://electricos.grupoavisa.com";

const COMPONENTS: { id: string; label: string; aliases: string[] }[] = [
  { id: "comp-bateria", label: "Batería de Tracción", aliases: ["paquete de baterías", "battery pack", "acumulador HV"] },
  { id: "comp-inversor", label: "Inversor de Potencia", aliases: ["convertidor DC/AC", "power inverter"] },
  { id: "comp-bms", label: "BMS (Battery Management System)", aliases: ["sistema de gestión de batería", "BMS"] },
  { id: "comp-motor-elec", label: "Motor Eléctrico", aliases: ["e-motor", "motor de inducción", "motor permanente"] },
  { id: "comp-obc", label: "Cargador Embarcado (OBC)", aliases: ["on-board charger", "cargador AC"] },
  { id: "comp-dcdc", label: "Convertidor DC/DC", aliases: ["DC/DC converter", "convertidor de baja tensión"] },
  { id: "comp-freno-regen", label: "Sistema de Frenada Regenerativa", aliases: ["freno regenerativo", "recuperación de energía"] },
  { id: "comp-refrig-bat", label: "Sistema de Refrigeración de Batería", aliases: ["thermal management", "gestión térmica"] },
  { id: "comp-hvil", label: "HVIL (High Voltage Interlock)", aliases: ["interbloqueo de alta tensión", "HVIL"] },
  { id: "comp-wallbox", label: "Wallbox / Punto de Carga", aliases: ["EVSE", "cargador doméstico", "punto de recarga"] },
];

const TECHNOLOGIES: { id: string; label: string; aliases: string[] }[] = [
  { id: "tech-ev", label: "Vehículo Eléctrico Puro (BEV)", aliases: ["BEV", "eléctrico", "100% eléctrico"] },
  { id: "tech-phev", label: "Híbrido Enchufable (PHEV)", aliases: ["PHEV", "plug-in hybrid", "híbrido recargable"] },
  { id: "tech-hev", label: "Híbrido Suave (HEV)", aliases: ["HEV", "mild hybrid", "híbrido convencional"] },
  { id: "tech-fcev", label: "Pila de Combustible (FCEV)", aliases: ["fuel cell", "hidrógeno", "FCEV"] },
  { id: "tech-ccs2", label: "CCS2 (Carga Rápida DC)", aliases: ["Combined Charging System", "CSS2", "carga DC rápida"] },
  { id: "tech-type2", label: "Type 2 (Carga AC)", aliases: ["Mennekes", "IEC 62196-2", "carga AC"] },
];

const REGULATIONS: { id: string; label: string }[] = [
  { id: "reg-itc-bt52", label: "ITC-BT-52 (Infraestructura de Recarga)" },
  { id: "reg-moves3", label: "Plan MOVES III (Subvenciones EV)" },
  { id: "reg-iec60900", label: "IEC 60900 (Trabajo en Alta Tensión)" },
  { id: "reg-r100", label: "Reglamento UNECE R100 (Seguridad EV)" },
];

const SYMPTOMS: { id: string; label: string; problemSlugs: string[] }[] = [
  { id: "sym-perdida-autonomia", label: "Pérdida de Autonomía", problemSlugs: ["perdida-autonomia", "degradacion-bateria"] },
  { id: "sym-luz-testigo", label: "Luz Testigo Batería Encendida", problemSlugs: ["aviso-bateria", "error-carga"] },
  { id: "sym-no-carga", label: "No Carga o Carga Lenta", problemSlugs: ["error-carga"] },
  { id: "sym-ruido-motor", label: "Ruido en Motor Eléctrico", problemSlugs: ["ruido-motor-electrico"] },
  { id: "sym-freno-raro", label: "Frenada Irregular o Sin Regeneración", problemSlugs: ["fallo-frenada-regenerativa"] },
  { id: "sym-calor-excesivo", label: "Temperatura Excesiva Bajo Vehículo", problemSlugs: ["degradacion-bateria"] },
  { id: "sym-pantalla-error", label: "Mensajes de Error en Pantalla", problemSlugs: ["error-inversor-potencia", "aviso-bateria"] },
  { id: "sym-climatizacion", label: "Climatización Ineficaz", problemSlugs: ["problema-climatizacion"] },
];

function makeEntity(id: string, type: KGEntityType, label: string, aliases: string[], description: string, url?: string, importance = 5, properties: Record<string, string> = {}): KGEntity {
  return { id, type, label, aliases, description, url, importance, properties };
}

function makeRelation(from: string, to: string, type: KGRelationType, label: string, weight = 5, bidirectional = false, context?: string): KGRelation {
  return { from, to, type, label, weight, bidirectional, context };
}

export function buildKnowledgeGraph(): KnowledgeGraph {
  const entities: KGEntity[] = [];
  const relations: KGRelation[] = [];

  entities.push(makeEntity(
    COMPANY_ID, "organization", "Grupo Avisa",
    ["Avisa", "Grupo Avisa Sevilla", "Taller Oficial VW Audi Skoda"],
    "Concesionario y taller oficial de vehículos eléctricos e híbridos en Sevilla. Volkswagen, Audi y Škoda oficiales. +50 técnicos certificados.",
    `${BASE_URL}`, 10,
    { phone: "955 034 600", email: "info@grupoavisa.com", founded: "2000", employees: "200+" }
  ));

  for (const s of SERVICE_SLUGS) {
    const svcDef = SERVICE_DEFINITIONS[s as keyof typeof SERVICE_DEFINITIONS];
    const svcId = `svc-${s}`;
    entities.push(makeEntity(
      svcId, "service", svcDef?.name || s,
      [s, svcDef?.name || s],
      svcDef?.description || `Servicio de ${s} para vehículos eléctricos e híbridos en ${svcDef?.name || s}.`,
      `${BASE_URL}/servicios/${s}`, 8
    ));
    relations.push(makeRelation(COMPANY_ID, svcId, "ofrece", `${svcDef?.name || s} ofrecido por Grupo Avisa`, 9));

    for (const [ss, subList] of Object.entries(SUB_SERVICE_SLUGS)) {
      if (ss === s) {
        for (const sub of subList) {
          const subId = `svc-${sub.slug}`;
          entities.push(makeEntity(
            subId, "service", sub.name,
            [sub.slug, sub.name],
            `Sub-servicio de ${sub.name} como parte del servicio de ${svcDef?.name || s}.`,
            `${BASE_URL}/servicios/${sub.slug}`, 5
          ));
          relations.push(makeRelation(subId, svcId, "subservicio-de", `${sub.name} es parte de ${svcDef?.name || s}`, 7));
          relations.push(makeRelation(COMPANY_ID, subId, "ofrece", `${sub.name} ofrecido por Grupo Avisa`, 6));
        }
      }
    }
  }

  for (const [brandSlug, brandName] of Object.entries(BRAND_NAMES)) {
    const brandId = `brand-${brandSlug}`;
    const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
    entities.push(makeEntity(
      brandId, "brand", brandName,
      [brandSlug, brandName, `${brandName} eléctrico`, `${brandName} híbrido`],
      `${brandName} es ${isOfficial ? "marca oficial de Grupo Avisa" : "marca especializada en Grupo Avisa"} en Sevilla.`,
      `${BASE_URL}/marcas/${brandSlug}`, isOfficial ? 9 : 7,
      { official: String(isOfficial), type: isOfficial ? "official-dealer" : "specialist" }
    ));

    if (isOfficial) {
      relations.push(makeRelation(COMPANY_ID, brandId, "certifica", `Grupo Avisa es concesionario oficial de ${brandName}`, 10));
    } else {
      relations.push(makeRelation(COMPANY_ID, brandId, "especializado-en", `Grupo Avisa especializado en ${brandName}`, 7));
    }

    for (const s of SERVICE_SLUGS) {
      const svcId = `svc-${s}`;
      const svcDef = SERVICE_DEFINITIONS[s as keyof typeof SERVICE_DEFINITIONS];
      relations.push(makeRelation(svcId, brandId, "especializado-en", `${svcDef?.name || s} disponible para ${brandName}`, 6));
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    const probId = `prob-${problem.slug}`;
    entities.push(makeEntity(
      probId, "problem", problem.name,
      [problem.slug, problem.name, `fallo ${problem.name.toLowerCase()}`, `error ${problem.name.toLowerCase()}`],
      `Problema técnico en vehículos eléctricos e híbridos: ${problem.name}. Detectado y resuelto por Grupo Avisa.`,
      `${BASE_URL}/problemas/${problem.slug}`, 7
    ));

    for (const relSvc of problem.relatedServices) {
      relations.push(makeRelation(`svc-${relSvc}`, probId, "resuelve", `${SERVICE_DEFINITIONS[relSvc as keyof typeof SERVICE_DEFINITIONS]?.name || relSvc} resuelve ${problem.name}`, 8));
      relations.push(makeRelation(`svc-diagnostico`, probId, "detecta", `Diagnóstico detecta ${problem.name}`, 7, false));
    }

    for (const [brandSlug] of Object.entries(BRAND_NAMES)) {
      relations.push(makeRelation(probId, `brand-${brandSlug}`, "relacionado-con", `${problem.name} puede afectar a ${BRAND_NAMES[brandSlug]}`, 5));
    }
  }

  for (const sym of SYMPTOMS) {
    entities.push(makeEntity(
      sym.id, "symptom", sym.label,
      [sym.label.toLowerCase()],
      `Síntoma observable: ${sym.label}. Puede indicar uno o varios problemas técnicos en el vehículo eléctrico.`,
      undefined, 6
    ));
    for (const pSlug of sym.problemSlugs) {
      relations.push(makeRelation(sym.id, `prob-${pSlug}`, "síntoma-de", `${sym.label} es síntoma de ${pSlug}`, 7));
    }
    relations.push(makeRelation(`svc-diagnostico`, sym.id, "detecta", `Diagnóstico detecta síntoma: ${sym.label}`, 6));
  }

  for (const comp of COMPONENTS) {
    entities.push(makeEntity(
      comp.id, "component", comp.label,
      comp.aliases,
      `Componente de alta tensión de vehículos eléctricos: ${comp.label}. Mantenimiento y reparación por técnicos certificados de Grupo Avisa.`,
      undefined, 6
    ));
    relations.push(makeRelation(`svc-reparacion`, comp.id, "compuesto-por", `Reparación incluye ${comp.label}`, 6));
    relations.push(makeRelation(`svc-diagnostico`, comp.id, "compuesto-por", `Diagnóstico analiza ${comp.label}`, 6));
  }

  for (const tech of TECHNOLOGIES) {
    entities.push(makeEntity(
      tech.id, "technology", tech.label,
      tech.aliases,
      `Tecnología de propulsión: ${tech.label}. Grupo Avisa ofrece todos los servicios para esta tecnología.`,
      undefined, 7
    ));
    for (const s of SERVICE_SLUGS) {
      relations.push(makeRelation(`svc-${s}`, tech.id, "usa-tecnología", `${s} aplica a tecnología ${tech.label}`, 5));
    }
  }

  for (const reg of REGULATIONS) {
    entities.push(makeEntity(
      reg.id, "regulation", reg.label,
      [reg.label],
      `Marco regulatorio aplicable: ${reg.label}.`,
      undefined, 5
    ));
  }
  relations.push(makeRelation(COMPANY_ID, "reg-itc-bt52", "regulado-por", "Grupo Avisa cumple ITC-BT-52", 8));
  relations.push(makeRelation(COMPANY_ID, "reg-iec60900", "certifica", "Técnicos certificados IEC 60900", 9));
  relations.push(makeRelation(`svc-carga`, "reg-itc-bt52", "regulado-por", "Instalación carga regulada por ITC-BT-52", 8));
  relations.push(makeRelation(`svc-carga`, "reg-moves3", "relacionado-con", "Gestión Plan MOVES III en instalaciones", 7));

  for (const city of SERVICE_CITIES) {
    const cityId = `loc-${city.slug}`;
    entities.push(makeEntity(
      cityId, "location", city.city,
      [city.city, city.slug, `${city.city} ${city.region}`],
      `Ciudad de cobertura de Grupo Avisa: ${city.city} (${city.region}).`,
      `${BASE_URL}/taller-electricos-${city.slug}`, 7,
      { region: city.region }
    ));
    relations.push(makeRelation(COMPANY_ID, cityId, "ubicado-en", `Grupo Avisa ofrece servicios en ${city.city}`, 7));
  }

  const degree: Record<string, number> = {};
  for (const r of relations) {
    degree[r.from] = (degree[r.from] || 0) + 1;
    degree[r.to] = (degree[r.to] || 0) + 1;
  }

  const topHubs = Object.entries(degree)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([id, deg]) => ({
      id,
      label: entities.find((e) => e.id === id)?.label || id,
      degree: deg,
    }));

  const density = relations.length / Math.max(entities.length * (entities.length - 1), 1);

  return {
    entities,
    relations,
    totalEntities: entities.length,
    totalRelations: relations.length,
    density: Math.round(density * 1000) / 1000,
    topHubs,
  };
}

export function queryEntity(entityId: string): KGQueryResult | null {
  const graph = buildKnowledgeGraph();
  const entity = graph.entities.find((e) => e.id === entityId);
  if (!entity) return null;

  const directRelations = graph.relations.filter((r) => r.from === entityId || (r.bidirectional && r.to === entityId));
  const neighbors = directRelations.map((r) => {
    const neighborId = r.from === entityId ? r.to : r.from;
    const neighborEntity = graph.entities.find((e) => e.id === neighborId);
    return neighborEntity ? { entity: neighborEntity, relation: r } : null;
  }).filter(Boolean) as { entity: KGEntity; relation: KGRelation }[];

  const neighborIds = new Set(neighbors.map((n) => n.entity.id));
  const depth2Ids = new Set<string>();
  for (const nId of neighborIds) {
    graph.relations
      .filter((r) => (r.from === nId || r.to === nId) && r.from !== entityId && r.to !== entityId)
      .forEach((r) => {
        const other = r.from === nId ? r.to : r.from;
        if (!neighborIds.has(other)) depth2Ids.add(other);
      });
  }
  const depth2 = graph.entities.filter((e) => depth2Ids.has(e.id)).slice(0, 10);

  const internalLinks = neighbors.slice(0, 8).map((n) => ({
    text: n.entity.label,
    href: n.entity.url || `#${n.entity.id}`,
  }));

  const faqs = [
    `¿Qué relación tiene "${entity.label}" con los servicios de Grupo Avisa?`,
    `¿Cómo detecta Grupo Avisa problemas relacionados con "${entity.label}"?`,
    `¿Qué marcas atendidas por Grupo Avisa están relacionadas con "${entity.label}"?`,
  ];

  const contentHints = neighbors.slice(0, 5).map((n) => `Mencionar "${n.entity.label}" al hablar de "${entity.label}"`);

  return { entity, neighbors, depth2, internalLinks, faqs, contentHints };
}

export function getKGSiteReport(): KGSiteReport {
  const graph = buildKnowledgeGraph();

  const byType: Record<string, number> = {};
  for (const e of graph.entities) {
    byType[e.type] = (byType[e.type] || 0) + 1;
  }

  const byRelationType: Record<string, number> = {};
  for (const r of graph.relations) {
    byRelationType[r.type] = (byRelationType[r.type] || 0) + 1;
  }

  const coverage = Math.min(100, Math.round((graph.totalEntities / 150) * 100));

  return {
    timestamp: new Date().toISOString(),
    totalEntities: graph.totalEntities,
    totalRelations: graph.totalRelations,
    byType: byType as Record<KGEntityType, number>,
    byRelationType: byRelationType as Record<KGRelationType, number>,
    topHubs: graph.topHubs,
    coverageScore: coverage,
    schemaCompatibility: [
      "schema:Organization → Grupo Avisa (organization)",
      "schema:Service → 5 servicios principales (service)",
      "schema:Brand → 14 marcas (brand)",
      "schema:MedicalCondition → problemas técnicos (problem)",
      "schema:Place → 6 ciudades (location)",
      "schema:DefinedTerm → componentes y tecnologías (component, technology)",
    ],
    recommendations: [
      `Añadir ${graph.entities.filter((e) => !e.url).length} URLs faltantes en entidades sin URL`,
      "Implementar schema:KnowledgeGraph en la página /sobre-nosotros",
      "Añadir relaciones bidireccionales entre síntomas y problemas en el HTML",
      "Generar páginas de componentes (/componentes/bateria-traccion) para entidades de alta importancia",
      "Añadir links internos basados en el grafo: cada página debe enlazar a sus entidades vecinas",
    ],
  };
}

export function getInternalLinksFromGraph(pagePath: string): { text: string; href: string; context: string }[] {
  const graph = buildKnowledgeGraph();
  const parts = pagePath.split("/").filter(Boolean);
  if (parts.length < 2) return [];

  const prefix = parts[0];
  const slug = parts.slice(1).join("/");

  let entityId = "";
  if (prefix === "servicios") entityId = `svc-${slug.split("-")[0]}`;
  else if (prefix === "marcas") entityId = `brand-${slug}`;
  else if (prefix === "problemas") entityId = `prob-${slug.split("-").slice(0, -1).join("-")}`;

  const result = queryEntity(entityId);
  if (!result) return [];

  return result.neighbors.slice(0, 8).map((n) => ({
    text: n.entity.label,
    href: n.entity.url || "#",
    context: n.relation.label,
  }));
}
