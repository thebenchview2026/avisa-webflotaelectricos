import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS } from "./seo-growth-engine";

export type SnippetType =
  | "paragraph"
  | "numbered-list"
  | "bulleted-list"
  | "table"
  | "definition-box"
  | "comparison-table"
  | "step-by-step"
  | "people-also-ask";

export type SnippetTrigger =
  | "qué-es"
  | "cómo-funciona"
  | "cuánto-cuesta"
  | "cuánto-tarda"
  | "por-qué-ocurre"
  | "cómo-detectar"
  | "cuándo-necesito"
  | "diferencia-entre"
  | "pasos-para"
  | "qué-incluye"
  | "es-obligatorio";

export interface SnippetBlock {
  trigger: SnippetTrigger;
  type: SnippetType;
  heading: string;
  content: string;
  wordCount: number;
  targetQuery: string;
  estimatedPosition: number;
  htmlHint: string;
}

export interface SnippetProfile {
  slug: string;
  path: string;
  blocks: SnippetBlock[];
  totalBlocks: number;
  snippetScore: number;
  featuredSnippetProbability: number;
  peopleAlsoAskItems: string[];
  tableOfContents: string[];
}

export interface SnippetSiteReport {
  timestamp: string;
  totalPages: number;
  avgSnippetScore: number;
  avgFeaturedProb: number;
  byTrigger: Record<SnippetTrigger, number>;
  byType: Record<SnippetType, number>;
  topPages: { path: string; score: number }[];
  recommendations: string[];
}

const COMPANY = "Grupo Avisa";
const PHONE = "955 034 600";
const LOCATION = "Sevilla";

function paragraphBlock(trigger: SnippetTrigger, heading: string, text: string, query: string): SnippetBlock {
  const words = text.split(" ").length;
  return {
    trigger,
    type: "paragraph",
    heading,
    content: text,
    wordCount: words,
    targetQuery: query,
    estimatedPosition: words >= 40 && words <= 60 ? 1 : 2,
    htmlHint: `<p class="snippet-paragraph">${text}</p>`,
  };
}

function listBlock(trigger: SnippetTrigger, heading: string, items: string[], query: string, numbered = true): SnippetBlock {
  const content = items.map((item, i) => (numbered ? `${i + 1}. ${item}` : `• ${item}`)).join("\n");
  return {
    trigger,
    type: numbered ? "numbered-list" : "bulleted-list",
    heading,
    content,
    wordCount: content.split(" ").length,
    targetQuery: query,
    estimatedPosition: items.length >= 3 && items.length <= 8 ? 1 : 2,
    htmlHint: numbered
      ? `<ol>${items.map((i) => `<li>${i}</li>`).join("")}</ol>`
      : `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`,
  };
}

function tableBlock(trigger: SnippetTrigger, heading: string, rows: string[][], query: string): SnippetBlock {
  const content = rows.map((r) => r.join(" | ")).join("\n");
  return {
    trigger,
    type: "table",
    heading,
    content,
    wordCount: content.split(" ").length,
    targetQuery: query,
    estimatedPosition: 2,
    htmlHint: `<table><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`,
  };
}

function definitionBlock(trigger: SnippetTrigger, heading: string, text: string, query: string): SnippetBlock {
  const words = text.split(" ").length;
  return {
    trigger,
    type: "definition-box",
    heading,
    content: text,
    wordCount: words,
    targetQuery: query,
    estimatedPosition: 1,
    htmlHint: `<div class="definition-box"><strong>${heading}</strong><p>${text}</p></div>`,
  };
}

export function generateSnippetProfile(slug: string): SnippetProfile | null {
  const parts = slug.split("-");
  const service = parts[0];
  if (!SERVICE_SLUGS.includes(service as typeof SERVICE_SLUGS[number])) return null;

  const brand = parts.slice(1).join("-");
  const brandName = BRAND_NAMES[brand];
  if (!brandName) return null;

  const city = SERVICE_CITIES[0].city;
  const isOfficial = OFFICIAL_BRANDS.includes(brand);
  const talleTipo = isOfficial ? "Taller Oficial" : "Taller Especializado";
  const svcDef = SERVICE_DEFINITIONS[service as keyof typeof SERVICE_DEFINITIONS];
  const svcName = svcDef?.name || service;

  const blocks: SnippetBlock[] = [];

  blocks.push(definitionBlock(
    "qué-es",
    `Qué es el ${svcName} de ${brandName}`,
    `El ${svcName} de ${brandName} es el proceso técnico realizado por ${COMPANY} en ${city} ` +
    `para verificar, mantener o restaurar el correcto funcionamiento del sistema eléctrico e híbrido ` +
    `del vehículo. ${COMPANY} es ${talleTipo} con más de 50 técnicos certificados en alta tensión.`,
    `qué es el ${svcName} de ${brandName}`
  ));

  const howSteps: Record<string, string[]> = {
    reparacion: ["Diagnóstico con escáner oficial", "Presupuesto detallado", "Reparación por técnico HV certificado", "Control de calidad", "Garantía de 12 meses"],
    diagnostico: ["Conexión al puerto OBD-II", "Lectura de códigos de fallo", "Análisis del BMS de batería", "Revisión de parámetros eléctricos", "Informe técnico completo"],
    mantenimiento: ["Inspección visual del sistema HV", "Análisis de capacidad de batería", "Cambio de fluidos", "Revisión de frenada regenerativa", "Actualización de software"],
    carga: ["Visita técnica gratuita", "Propuesta de wallbox", "Tramitación de subvenciones", "Instalación certificada ITC-BT-52", "Activación y configuración"],
    garantia: ["Diagnóstico gratuito de cobertura", "Comunicación con fabricante", "Solicitud formal de intervención", "Reparación o sustitución sin coste", "Documentación del proceso"],
  };
  blocks.push(listBlock(
    "cómo-funciona",
    `Cómo funciona el ${svcName} de ${brandName} en ${COMPANY}`,
    howSteps[service] || howSteps["diagnostico"],
    `cómo funciona el ${svcName} de ${brandName}`
  ));

  const costData: Record<string, string> = {
    reparacion: "150-2.500 €",
    diagnostico: "60-120 € (gratuito si repara)",
    mantenimiento: "150-400 €",
    carga: "499-1.200 €",
    garantia: "Gratuito si cubierto",
  };
  const durationData: Record<string, string> = {
    reparacion: "1-5 días laborables",
    diagnostico: "2-4 horas",
    mantenimiento: "1 día",
    carga: "4-8 horas",
    garantia: "1-14 días",
  };
  blocks.push(tableBlock(
    "cuánto-cuesta",
    `Precio y duración del ${svcName} de ${brandName}`,
    [
      ["Concepto", "Detalle"],
      ["Precio estimado", costData[service] || "Consultar"],
      ["Duración estimada", durationData[service] || "Consultar"],
      ["Garantía del trabajo", "12 meses"],
      ["Presupuesto previo", "Gratis y sin compromiso"],
      ["Cita previa", PHONE],
    ],
    `cuánto cuesta el ${svcName} de ${brandName}`
  ));

  blocks.push(paragraphBlock(
    "cuándo-necesito",
    `Cuándo necesito el ${svcName} de ${brandName}`,
    service === "diagnostico"
      ? `Se recomienda realizar el diagnóstico de ${brandName} cuando aparece algún testigo luminoso en el cuadro, cuando el vehículo pierde autonomía de forma repentina, o cuando la carga no funciona correctamente. ${COMPANY} recomienda un diagnóstico preventivo anual para vehículos con más de 3 años o 60.000 km.`
      : service === "mantenimiento"
      ? `El mantenimiento de ${brandName} eléctrico debe realizarse cada 20.000 km o una vez al año, lo que ocurra primero. Aunque los vehículos eléctricos requieren menos mantenimiento que los de combustión, la revisión anual de la batería de tracción es imprescindible para mantener la garantía.`
      : service === "reparacion"
      ? `Se requiere reparación cuando el vehículo presenta fallos técnicos confirmados por diagnóstico, pérdida de potencia, errores de carga persistentes o cualquier anomalía en el sistema de alta tensión de ${brandName}. Nunca intente reparar componentes de alta tensión sin asistencia profesional.`
      : service === "carga"
      ? `La instalación de punto de carga para ${brandName} es necesaria al adquirir el vehículo o cuando la instalación eléctrica existente no soporta la demanda. ${COMPANY} recomienda instalar un wallbox desde el primer día para optimizar los ciclos de carga.`
      : `La garantía de ${brandName} debe activarse ante cualquier fallo de fabricación en los primeros ${isOfficial ? "5 años o 100.000 km" : "2 años"}. ${COMPANY} gestiona la garantía directamente con el importador.`,
    `cuándo necesito ${svcName} de ${brandName}`
  ));

  const paaQuestions = [
    `¿Cuánto cuesta el ${svcName} de ${brandName} en ${city}?`,
    `¿Cuánto tarda el ${svcName} de ${brandName}?`,
    `¿Dónde hacer el ${svcName} de ${brandName} en ${city}?`,
    `¿Es obligatorio el ${svcName} de ${brandName} para la garantía?`,
    `¿Qué incluye el ${svcName} de ${brandName} en ${COMPANY}?`,
    `¿${COMPANY} es taller oficial de ${brandName}?`,
    `¿Se puede hacer el ${svcName} de ${brandName} sin cita previa?`,
    `¿Qué diferencia hay entre ${svcName} en taller oficial y multimarca para ${brandName}?`,
  ];

  if (service === "reparacion" || service === "diagnostico") {
    blocks.push(listBlock(
      "por-qué-ocurre",
      `Causas más comunes que requieren ${svcName} en ${brandName}`,
      [
        `Degradación natural de la batería de tracción (>80.000 km)`,
        `Fallos del sistema BMS (Battery Management System)`,
        `Problemas con el cargador embarcado o el puerto de carga`,
        `Avería del inversor de potencia o del motor eléctrico`,
        `Fallos en el sistema de refrigeración de la batería`,
        `Errores de software que requieren actualización OTA`,
      ],
      `por qué falla ${brandName} eléctrico`,
      false
    ));
  }

  blocks.push(listBlock(
    "qué-incluye",
    `Qué incluye el ${svcName} de ${brandName} en ${COMPANY}`,
    howSteps[service] || howSteps["diagnostico"],
    `qué incluye ${svcName} ${brandName}`,
    false
  ));

  const snippetScore = Math.round(
    (blocks.filter((b) => b.estimatedPosition === 1).length / blocks.length) * 100
  );
  const featuredProb = Math.min(95, 50 + snippetScore * 0.45);

  return {
    slug,
    path: `/servicios/${slug}`,
    blocks,
    totalBlocks: blocks.length,
    snippetScore,
    featuredSnippetProbability: Math.round(featuredProb),
    peopleAlsoAskItems: paaQuestions,
    tableOfContents: blocks.map((b) => b.heading),
  };
}

export function generateProblemSnippet(problemSlug: string, brand: string): SnippetBlock[] {
  const brandName = BRAND_NAMES[brand];
  const problem = PROBLEM_TOPICS.find((p) => p.slug === problemSlug);
  if (!brandName || !problem) return [];

  const city = SERVICE_CITIES[0].city;
  const blocks: SnippetBlock[] = [];

  blocks.push(definitionBlock(
    "qué-es",
    `Qué es "${problem.name}" en ${brandName}`,
    `${problem.name} en ${brandName} es un fallo técnico del sistema eléctrico que provoca ` +
    `una reducción del rendimiento o una anomalía en el comportamiento del vehículo. ` +
    `${COMPANY} en ${city} diagnostica y resuelve este tipo de fallos con equipamiento oficial.`,
    `qué es ${problem.name.toLowerCase()} en ${brandName}`
  ));

  blocks.push(listBlock(
    "por-qué-ocurre",
    `Por qué ocurre "${problem.name}" en ${brandName}`,
    [
      `Degradación de celdas de batería por uso o temperatura extrema`,
      `Fallo en el sensor o módulo de control específico`,
      `Actualización de software pendiente`,
      `Problema en el cableado o conectores de alta tensión`,
      `Fallo en el sistema de refrigeración del módulo afectado`,
    ],
    `por qué ${problem.name.toLowerCase()} ${brandName}`,
    false
  ));

  blocks.push(listBlock(
    "cómo-detectar",
    `Cómo detectar "${problem.name}" en ${brandName}`,
    [
      `Testigo de batería o motor eléctrico encendido en el cuadro`,
      `Reducción repentina de autonomía o potencia`,
      `Mensajes de error en la pantalla central del vehículo`,
      `Comportamiento errático durante la carga`,
      `Temperatura anómala en el maletero o bajo el vehículo`,
    ],
    `cómo detectar ${problem.name.toLowerCase()} ${brandName}`
  ));

  blocks.push(listBlock(
    "pasos-para",
    `Pasos para resolver "${problem.name}" en ${brandName}`,
    [
      `Llevar el vehículo a ${COMPANY} en ${city}`,
      `Diagnóstico electrónico con escáner oficial ${brand}`,
      `Identificación del componente afectado`,
      `Presupuesto de reparación gratuito`,
      `Reparación por técnico certificado en alta tensión`,
      `Garantía de 12 meses en la reparación`,
    ],
    `cómo arreglar ${problem.name.toLowerCase()} ${brandName}`
  ));

  return blocks;
}

export function getSnippetSiteReport(sampleSize = 50): SnippetSiteReport {
  const brands = Object.keys(BRAND_NAMES);
  const profiles: SnippetProfile[] = [];

  let count = 0;
  outer: for (const s of SERVICE_SLUGS) {
    for (const b of brands) {
      if (count >= sampleSize) break outer;
      const p = generateSnippetProfile(`${s}-${b}`);
      if (p) { profiles.push(p); count++; }
    }
  }

  const byTrigger: Record<string, number> = {};
  const byType: Record<string, number> = {};

  for (const p of profiles) {
    for (const b of p.blocks) {
      byTrigger[b.trigger] = (byTrigger[b.trigger] || 0) + 1;
      byType[b.type] = (byType[b.type] || 0) + 1;
    }
  }

  const sorted = [...profiles].sort((a, b) => b.snippetScore - a.snippetScore);
  const avgScore = Math.round(profiles.reduce((s, p) => s + p.snippetScore, 0) / profiles.length);
  const avgFeatured = Math.round(profiles.reduce((s, p) => s + p.featuredSnippetProbability, 0) / profiles.length);

  return {
    timestamp: new Date().toISOString(),
    totalPages: profiles.length,
    avgSnippetScore: avgScore,
    avgFeaturedProb: avgFeatured,
    byTrigger: byTrigger as Record<SnippetTrigger, number>,
    byType: byType as Record<SnippetType, number>,
    topPages: sorted.slice(0, 15).map((p) => ({ path: p.path, score: p.snippetScore })),
    recommendations: [
      `Añadir bloque "cuánto-cuesta" con tabla en todas las páginas de servicio`,
      `Usar respuestas de 40-60 palabras para preguntas "qué-es" (óptimo para featured snippet)`,
      `Implementar listas numeradas con 5-8 pasos para preguntas "cómo-funciona"`,
      `Añadir sección "People Also Ask" con al menos 6 preguntas relacionadas`,
      `Marcar cada bloque con schema FAQPage o HowTo para aumentar elegibilidad`,
      `Incluir tablas comparativas para páginas de tipo "diferencia-entre"`,
    ],
  };
}
