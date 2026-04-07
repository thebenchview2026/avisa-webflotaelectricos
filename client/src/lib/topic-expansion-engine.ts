import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import {
  PROBLEM_TOPICS,
  SUB_SERVICE_SLUGS,
  VEHICLE_MODEL_FAMILIES,
  getAllGrowthSlugs,
} from "./seo-growth-engine";

export type TopicCategory =
  | "problema-comun"
  | "sintoma-averia"
  | "mantenimiento"
  | "reparacion"
  | "diagnostico"
  | "componente"
  | "modelo-especifico"
  | "comparativa"
  | "guia"
  | "coste"
  | "tecnologia";

export type ExpansionPriority = "alta" | "media" | "baja";

export type PageSuggestionType =
  | "problem-brand"
  | "problem-brand-city"
  | "symptom-brand"
  | "component-brand"
  | "model-service"
  | "guide"
  | "comparison"
  | "cost-page"
  | "technology";

export interface ExpandedTopic {
  id: string;
  topic: string;
  slug: string;
  category: TopicCategory;
  relatedService: string;
  relatedBrands: string[];
  keywords: string[];
  searchVolumeTier: "alto" | "medio" | "bajo";
  competitionTier: "alta" | "media" | "baja";
  priority: ExpansionPriority;
  priorityScore: number;
  isNew: boolean;
  parentTopic: string | null;
  suggestedPages: PageSuggestion[];
}

export interface PageSuggestion {
  path: string;
  title: string;
  type: PageSuggestionType;
  brand: string | null;
  city: string | null;
  targetKeywords: string[];
  estimatedDifficulty: "fácil" | "media" | "difícil";
  funnelStage: "awareness" | "consideration" | "decision";
  contentBrief: string;
}

export interface ExpansionReport {
  timestamp: string;
  totalTopicsDiscovered: number;
  totalNewPages: number;
  byCategory: Record<TopicCategory, number>;
  byPriority: Record<ExpansionPriority, number>;
  byService: Record<string, number>;
  existingCoverage: number;
  expansionPotential: number;
  topics: ExpandedTopic[];
  topSuggestions: PageSuggestion[];
  categoryBreakdown: CategoryBreakdown[];
}

export interface CategoryBreakdown {
  category: TopicCategory;
  label: string;
  topicCount: number;
  pageCount: number;
  avgPriority: number;
  examples: string[];
}

interface TopicSeed {
  topic: string;
  slug: string;
  category: TopicCategory;
  service: string;
  keywords: string[];
  volumeTier: "alto" | "medio" | "bajo";
  competitionTier: "alta" | "media" | "baja";
  parent: string | null;
}

const SYMPTOM_SEEDS: TopicSeed[] = [
  { topic: "Ruido en motor", slug: "ruido-motor", category: "sintoma-averia", service: "diagnostico", keywords: ["ruido motor", "sonido extraño motor", "vibración motor"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Luz de motor encendida", slug: "luz-motor", category: "sintoma-averia", service: "diagnostico", keywords: ["luz motor encendida", "testigo motor", "check engine"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Vibración al frenar", slug: "vibracion-frenar", category: "sintoma-averia", service: "reparacion", keywords: ["vibración al frenar", "frenos vibran", "temblor pedal freno"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Pérdida de potencia", slug: "perdida-potencia", category: "sintoma-averia", service: "diagnostico", keywords: ["pérdida potencia", "coche no acelera", "falta fuerza motor"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Consumo excesivo de batería", slug: "consumo-excesivo-bateria", category: "sintoma-averia", service: "diagnostico", keywords: ["consumo excesivo batería", "batería se descarga rápido", "autonomía baja"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Olor a quemado", slug: "olor-quemado", category: "sintoma-averia", service: "diagnostico", keywords: ["olor quemado coche", "huele a quemado", "olor cables quemados"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Fallo en pantalla", slug: "fallo-pantalla", category: "sintoma-averia", service: "reparacion", keywords: ["pantalla coche no funciona", "infotainment falla", "pantalla congelada"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Dirección dura", slug: "direccion-dura", category: "sintoma-averia", service: "reparacion", keywords: ["dirección dura", "volante duro", "dirección asistida falla"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Carga lenta", slug: "carga-lenta", category: "sintoma-averia", service: "diagnostico", keywords: ["coche eléctrico carga lento", "carga lenta eléctrico", "velocidad carga baja"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Testigo batería alta tensión", slug: "testigo-bateria-alta-tension", category: "sintoma-averia", service: "diagnostico", keywords: ["testigo batería alta tensión", "aviso batería HV", "warning batería"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Ruido al girar volante", slug: "ruido-girar-volante", category: "sintoma-averia", service: "diagnostico", keywords: ["ruido al girar", "crujido volante", "chirrido dirección"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Fallo en aire acondicionado", slug: "fallo-aire-acondicionado", category: "sintoma-averia", service: "reparacion", keywords: ["aire acondicionado no enfría", "climatización falla", "AC no funciona"], volumeTier: "medio", competitionTier: "media", parent: null },
];

const PROBLEM_SEEDS: TopicSeed[] = [
  { topic: "Fallo en sensor de aparcamiento", slug: "fallo-sensor-aparcamiento", category: "problema-comun", service: "reparacion", keywords: ["sensor aparcamiento falla", "parking sensor error", "sensor proximidad averiado"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Problemas de turbo", slug: "problemas-turbo", category: "problema-comun", service: "reparacion", keywords: ["problemas turbo", "turbo falla", "turbo pierde presión"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Fallo en sensor de temperatura", slug: "fallo-sensor-temperatura", category: "problema-comun", service: "diagnostico", keywords: ["sensor temperatura falla", "lectura temperatura incorrecta", "termostato averiado"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Error en sistema de frenos ABS", slug: "error-frenos-abs", category: "problema-comun", service: "reparacion", keywords: ["fallo ABS", "luz ABS encendida", "error sistema frenos"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Problema en bomba de agua eléctrica", slug: "problema-bomba-agua", category: "problema-comun", service: "reparacion", keywords: ["bomba agua eléctrica", "refrigeración motor falla", "bomba coolant"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Fallo en módulo de control", slug: "fallo-modulo-control", category: "problema-comun", service: "diagnostico", keywords: ["ECU falla", "módulo control averiado", "centralita error"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Desgaste prematuro neumáticos", slug: "desgaste-neumaticos", category: "problema-comun", service: "mantenimiento", keywords: ["desgaste neumáticos eléctrico", "neumáticos coche eléctrico duración", "ruedas eléctrico"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Fallo conector de carga", slug: "fallo-conector-carga", category: "problema-comun", service: "reparacion", keywords: ["conector carga roto", "puerto carga no funciona", "enchufe carga falla"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Error en asistente de conducción", slug: "error-asistente-conduccion", category: "problema-comun", service: "diagnostico", keywords: ["ADAS error", "asistente conducción falla", "lane assist no funciona"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Corrosión en contactos eléctricos", slug: "corrosion-contactos", category: "problema-comun", service: "reparacion", keywords: ["corrosión contactos", "oxidación conectores", "terminales corroídos"], volumeTier: "bajo", competitionTier: "baja", parent: null },
  { topic: "Fallo en suspensión neumática", slug: "fallo-suspension-neumatica", category: "problema-comun", service: "reparacion", keywords: ["suspensión neumática falla", "air suspension error", "compresor suspensión"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Problema en motor de arranque", slug: "problema-motor-arranque", category: "problema-comun", service: "reparacion", keywords: ["motor arranque falla", "coche no arranca", "starter motor"], volumeTier: "alto", competitionTier: "alta", parent: null },
];

const MAINTENANCE_SEEDS: TopicSeed[] = [
  { topic: "Cambio líquido refrigerante", slug: "cambio-liquido-refrigerante", category: "mantenimiento", service: "mantenimiento", keywords: ["cambio refrigerante eléctrico", "coolant coche eléctrico", "líquido refrigerante"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Revisión sistema frenado", slug: "revision-sistema-frenado", category: "mantenimiento", service: "mantenimiento", keywords: ["revisión frenos eléctrico", "pastillas freno eléctrico", "frenos coche eléctrico"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Actualización software", slug: "actualizacion-software", category: "mantenimiento", service: "mantenimiento", keywords: ["actualización software coche", "update firmware", "OTA update"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Revisión batería 12V", slug: "revision-bateria-12v", category: "mantenimiento", service: "mantenimiento", keywords: ["batería 12V eléctrico", "batería auxiliar", "cambiar batería 12V"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Cambio filtro habitáculo", slug: "cambio-filtro-habitaculo", category: "mantenimiento", service: "mantenimiento", keywords: ["filtro habitáculo eléctrico", "filtro aire interior", "filtro polen"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Alineación y equilibrado", slug: "alineacion-equilibrado", category: "mantenimiento", service: "mantenimiento", keywords: ["alineación eléctrico", "equilibrado ruedas", "alineación dirección"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Inspección sistema alta tensión", slug: "inspeccion-alta-tension", category: "mantenimiento", service: "mantenimiento", keywords: ["inspección alta tensión", "revisión HV", "seguridad alta tensión"], volumeTier: "bajo", competitionTier: "baja", parent: null },
  { topic: "Mantenimiento bomba de calor", slug: "mantenimiento-bomba-calor", category: "mantenimiento", service: "mantenimiento", keywords: ["bomba calor coche eléctrico", "mantenimiento climatización", "heat pump"], volumeTier: "medio", competitionTier: "baja", parent: null },
];

const REPAIR_SEEDS: TopicSeed[] = [
  { topic: "Reparación inversor", slug: "reparacion-inversor", category: "reparacion", service: "reparacion", keywords: ["reparar inversor", "inversor potencia averiado", "cambio inversor"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Reparación cableado alta tensión", slug: "reparacion-cableado-hv", category: "reparacion", service: "reparacion", keywords: ["cableado alta tensión", "reparar cable HV", "harness alta tensión"], volumeTier: "bajo", competitionTier: "baja", parent: null },
  { topic: "Sustitución módulo batería", slug: "sustitucion-modulo-bateria", category: "reparacion", service: "reparacion", keywords: ["cambio módulo batería", "sustituir celda batería", "módulo batería precio"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Reparación motor eléctrico", slug: "reparacion-motor-electrico", category: "reparacion", service: "reparacion", keywords: ["reparar motor eléctrico", "motor eléctrico averiado", "rebobinar motor"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Reparación sistema de carga", slug: "reparacion-sistema-carga", category: "reparacion", service: "reparacion", keywords: ["reparar cargador bordo", "OBC averiado", "sistema carga falla"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Reparación compresor AC eléctrico", slug: "reparacion-compresor-ac", category: "reparacion", service: "reparacion", keywords: ["compresor AC eléctrico", "reparar aire acondicionado eléctrico", "compresor climatización"], volumeTier: "medio", competitionTier: "media", parent: null },
];

const DIAGNOSTIC_SEEDS: TopicSeed[] = [
  { topic: "Diagnóstico con escáner OBD", slug: "diagnostico-obd", category: "diagnostico", service: "diagnostico", keywords: ["diagnóstico OBD", "escáner OBD eléctrico", "códigos error eléctrico"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Lectura códigos de error", slug: "lectura-codigos-error", category: "diagnostico", service: "diagnostico", keywords: ["códigos error coche", "DTC eléctrico", "leer códigos avería"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Test de aislamiento alta tensión", slug: "test-aislamiento-hv", category: "diagnostico", service: "diagnostico", keywords: ["test aislamiento HV", "megger alta tensión", "aislamiento batería"], volumeTier: "bajo", competitionTier: "baja", parent: null },
  { topic: "Diagnóstico capacidad batería", slug: "diagnostico-capacidad-bateria", category: "diagnostico", service: "diagnostico", keywords: ["test capacidad batería", "SOH batería", "estado salud batería"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Análisis rendimiento motor", slug: "analisis-rendimiento-motor", category: "diagnostico", service: "diagnostico", keywords: ["rendimiento motor eléctrico", "test potencia motor", "curva par motor"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Diagnóstico sistema regenerativo", slug: "diagnostico-regenerativo", category: "diagnostico", service: "diagnostico", keywords: ["frenada regenerativa diagnóstico", "regeneración falla", "test regenerativo"], volumeTier: "medio", competitionTier: "baja", parent: null },
];

const COMPONENT_SEEDS: TopicSeed[] = [
  { topic: "Batería de alta tensión", slug: "bateria-alta-tension", category: "componente", service: "reparacion", keywords: ["batería alta tensión", "battery pack", "batería HV"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Inversor de potencia", slug: "inversor-potencia", category: "componente", service: "reparacion", keywords: ["inversor potencia coche", "power inverter", "convertidor DC-AC"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Cargador de a bordo (OBC)", slug: "cargador-bordo-obc", category: "componente", service: "reparacion", keywords: ["on-board charger", "cargador bordo", "OBC eléctrico"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "BMS (Battery Management System)", slug: "bms-gestion-bateria", category: "componente", service: "diagnostico", keywords: ["BMS coche eléctrico", "gestión batería", "battery management"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Motor síncrono de imanes permanentes", slug: "motor-sincrono-imanes", category: "componente", service: "reparacion", keywords: ["motor síncrono", "PMSM", "motor imanes permanentes"], volumeTier: "bajo", competitionTier: "baja", parent: null },
  { topic: "Reductor de velocidad", slug: "reductor-velocidad", category: "componente", service: "reparacion", keywords: ["reductor velocidad eléctrico", "transmisión eléctrico", "engranaje reductor"], volumeTier: "bajo", competitionTier: "baja", parent: null },
];

const TECHNOLOGY_SEEDS: TopicSeed[] = [
  { topic: "Carga rápida DC (CCS)", slug: "carga-rapida-dc-ccs", category: "tecnologia", service: "carga", keywords: ["carga rápida CCS", "cargador DC", "fast charging"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Vehicle to Grid (V2G)", slug: "vehicle-to-grid-v2g", category: "tecnologia", service: "carga", keywords: ["V2G", "vehicle to grid", "bidireccional"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Batería estado sólido", slug: "bateria-estado-solido", category: "tecnologia", service: "reparacion", keywords: ["batería estado sólido", "solid state battery", "nueva tecnología batería"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Plataforma MEB", slug: "plataforma-meb", category: "tecnologia", service: "reparacion", keywords: ["plataforma MEB Volkswagen", "MEB platform", "arquitectura MEB"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Preacondicionamiento de batería", slug: "preacondicionamiento-bateria", category: "tecnologia", service: "mantenimiento", keywords: ["preacondicionamiento batería", "precalentar batería", "battery preconditioning"], volumeTier: "medio", competitionTier: "baja", parent: null },
];

const COST_SEEDS: TopicSeed[] = [
  { topic: "Coste reparación batería", slug: "coste-reparacion-bateria", category: "coste", service: "reparacion", keywords: ["precio reparar batería eléctrico", "cuánto cuesta reparar batería", "coste batería coche eléctrico"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Coste mantenimiento anual", slug: "coste-mantenimiento-anual", category: "coste", service: "mantenimiento", keywords: ["coste mantenimiento eléctrico anual", "cuánto cuesta mantener eléctrico", "revisión anual precio"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Precio diagnóstico avanzado", slug: "precio-diagnostico-avanzado", category: "coste", service: "diagnostico", keywords: ["precio diagnóstico eléctrico", "cuánto cuesta diagnóstico", "tarifa diagnóstico"], volumeTier: "medio", competitionTier: "media", parent: null },
  { topic: "Coste instalación wallbox", slug: "coste-instalacion-wallbox", category: "coste", service: "carga", keywords: ["precio instalar wallbox", "cuánto cuesta wallbox", "instalación punto carga precio"], volumeTier: "alto", competitionTier: "alta", parent: null },
];

const GUIDE_SEEDS: TopicSeed[] = [
  { topic: "Guía primer coche eléctrico", slug: "guia-primer-coche-electrico", category: "guia", service: "mantenimiento", keywords: ["primer coche eléctrico", "guía comprar eléctrico", "consejos coche eléctrico"], volumeTier: "alto", competitionTier: "alta", parent: null },
  { topic: "Cómo maximizar autonomía", slug: "como-maximizar-autonomia", category: "guia", service: "mantenimiento", keywords: ["aumentar autonomía eléctrico", "maximizar batería", "más kilómetros eléctrico"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Conducción eficiente eléctrico", slug: "conduccion-eficiente-electrico", category: "guia", service: "mantenimiento", keywords: ["conducción eficiente eléctrico", "eco driving eléctrico", "ahorrar batería conduciendo"], volumeTier: "medio", competitionTier: "baja", parent: null },
  { topic: "Viaje largo con eléctrico", slug: "viaje-largo-electrico", category: "guia", service: "carga", keywords: ["viaje largo eléctrico", "ruta eléctrico cargadores", "planificar viaje eléctrico"], volumeTier: "alto", competitionTier: "media", parent: null },
  { topic: "Cuidados batería invierno", slug: "cuidados-bateria-invierno", category: "guia", service: "mantenimiento", keywords: ["batería eléctrico invierno", "frío batería eléctrico", "autonomía invierno"], volumeTier: "medio", competitionTier: "baja", parent: null },
];

const ALL_SEEDS: TopicSeed[] = [
  ...SYMPTOM_SEEDS,
  ...PROBLEM_SEEDS,
  ...MAINTENANCE_SEEDS,
  ...REPAIR_SEEDS,
  ...DIAGNOSTIC_SEEDS,
  ...COMPONENT_SEEDS,
  ...TECHNOLOGY_SEEDS,
  ...COST_SEEDS,
  ...GUIDE_SEEDS,
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getExistingPaths(): Set<string> {
  const existing = new Set<string>();
  const growthSlugs = getAllGrowthSlugs();
  for (const entry of growthSlugs) {
    const routePath = typeof entry === "string" ? entry : entry.routePath;
    if (routePath) existing.add(routePath);
  }
  for (const ss of SERVICE_SLUGS) {
    existing.add(`/servicios/${ss}`);
    for (const brand of Object.keys(BRAND_NAMES)) {
      existing.add(`/servicios/${ss}-${brand}`);
      for (const city of SERVICE_CITIES) {
        existing.add(`/servicios/${ss}-${brand}-${city.slug}`);
      }
    }
  }
  for (const brand of Object.keys(BRAND_NAMES)) {
    existing.add(`/marcas/${brand}`);
  }
  return existing;
}

function generatePageSuggestions(seed: TopicSeed, existingPaths: Set<string>): PageSuggestion[] {
  const suggestions: PageSuggestion[] = [];
  const brands = Object.keys(BRAND_NAMES);

  const isSymptomOrProblem = seed.category === "sintoma-averia" || seed.category === "problema-comun";
  const isDiagOrRepair = seed.category === "diagnostico" || seed.category === "reparacion";
  const isComponent = seed.category === "componente";
  const isGuide = seed.category === "guia";
  const isCost = seed.category === "coste";
  const isTech = seed.category === "tecnologia";

  if (isSymptomOrProblem || isDiagOrRepair || isComponent) {
    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const path = `/problemas/${seed.slug}-${brand}`;

      if (!existingPaths.has(path)) {
        const type: PageSuggestionType = isSymptomOrProblem ? "symptom-brand" : isComponent ? "component-brand" : "problem-brand";
        suggestions.push({
          path,
          title: `${seed.topic} en ${brandName} Eléctrico`,
          type,
          brand,
          city: null,
          targetKeywords: seed.keywords.map((kw) => `${kw} ${brandName.toLowerCase()}`),
          estimatedDifficulty: seed.competitionTier === "alta" ? "difícil" : seed.competitionTier === "media" ? "media" : "fácil",
          funnelStage: isSymptomOrProblem ? "awareness" : "consideration",
          contentBrief: `Página sobre ${seed.topic.toLowerCase()} específico para vehículos ${brandName}. Incluir causas, síntomas, diagnóstico y solución. CTA a servicio de ${SERVICE_DEFINITIONS[seed.service]?.title || seed.service}.`,
        });
      }

      const topCities = SERVICE_CITIES.slice(0, 3);
      for (const city of topCities) {
        const cityPath = `/problemas/${seed.slug}-${brand}-${city.slug}`;
        if (!existingPaths.has(cityPath)) {
          suggestions.push({
            path: cityPath,
            title: `${seed.topic} ${brandName} en ${city.city}`,
            type: "problem-brand-city",
            brand,
            city: city.slug,
            targetKeywords: [`${seed.slug} ${brandName.toLowerCase()} ${city.city.toLowerCase()}`],
            estimatedDifficulty: "fácil",
            funnelStage: "decision",
            contentBrief: `Landing local: ${seed.topic.toLowerCase()} para ${brandName} en ${city.city}. CTA directo a taller.`,
          });
        }
      }
    }
  }

  if (isGuide || isTech) {
    const path = `/guias/${seed.slug}`;
    if (!existingPaths.has(path)) {
      suggestions.push({
        path,
        title: seed.topic,
        type: "guide",
        brand: null,
        city: null,
        targetKeywords: seed.keywords,
        estimatedDifficulty: seed.competitionTier === "alta" ? "difícil" : "media",
        funnelStage: "awareness",
        contentBrief: `Guía completa sobre ${seed.topic.toLowerCase()}. Contenido informacional para captar tráfico top-of-funnel. Incluir datos, ejemplos y enlazar a servicios.`,
      });
    }
  }

  if (isCost) {
    const path = `/precios/${seed.slug}`;
    if (!existingPaths.has(path)) {
      suggestions.push({
        path,
        title: seed.topic,
        type: "cost-page",
        brand: null,
        city: null,
        targetKeywords: seed.keywords,
        estimatedDifficulty: "media",
        funnelStage: "decision",
        contentBrief: `Página de costes sobre ${seed.topic.toLowerCase()}. Incluir rangos de precio, factores que influyen, y CTA a presupuesto personalizado.`,
      });
    }

    for (const brand of brands.slice(0, 6)) {
      const brandName = BRAND_NAMES[brand];
      const brandPath = `/precios/${seed.slug}-${brand}`;
      if (!existingPaths.has(brandPath)) {
        suggestions.push({
          path: brandPath,
          title: `${seed.topic} ${brandName}`,
          type: "cost-page",
          brand,
          city: null,
          targetKeywords: seed.keywords.map((kw) => `${kw} ${brandName.toLowerCase()}`),
          estimatedDifficulty: "fácil",
          funnelStage: "decision",
          contentBrief: `Costes específicos de ${seed.topic.toLowerCase()} para vehículos ${brandName}. Rango de precios y CTA a presupuesto.`,
        });
      }
    }
  }

  return suggestions;
}

function generateModelSpecificTopics(existingPaths: Set<string>): ExpandedTopic[] {
  const topics: ExpandedTopic[] = [];
  const brands = Object.keys(BRAND_NAMES);

  const modelTopics = [
    { suffix: "mantenimiento", service: "mantenimiento", category: "mantenimiento" as TopicCategory, keywords: ["mantenimiento", "revisión", "servicio"] },
    { suffix: "problemas", service: "diagnostico", category: "problema-comun" as TopicCategory, keywords: ["problemas", "averías", "fallos comunes"] },
    { suffix: "bateria", service: "reparacion", category: "componente" as TopicCategory, keywords: ["batería", "autonomía", "degradación batería"] },
  ];

  for (const brand of brands) {
    const models = VEHICLE_MODEL_FAMILIES[brand] || [];
    const brandName = BRAND_NAMES[brand];

    for (const model of models.slice(0, 3)) {
      for (const mt of modelTopics) {
        const modelSlug = slugify(model);
        const topicSlug = `${modelSlug}-${mt.suffix}`;
        const path = `/modelos/${topicSlug}`;

        if (!existingPaths.has(path)) {
          const id = `model-${topicSlug}`;
          topics.push({
            id,
            topic: `${model} — ${mt.suffix.charAt(0).toUpperCase() + mt.suffix.slice(1)}`,
            slug: topicSlug,
            category: mt.category,
            relatedService: mt.service,
            relatedBrands: [brand],
            keywords: mt.keywords.map((kw) => `${kw} ${brandName} ${model}`.toLowerCase()),
            searchVolumeTier: "medio",
            competitionTier: "baja",
            priority: "media",
            priorityScore: 6,
            isNew: true,
            parentTopic: `${brandName} Eléctricos`,
            suggestedPages: [{
              path,
              title: `${model} — ${mt.suffix.charAt(0).toUpperCase() + mt.suffix.slice(1)} y Servicio`,
              type: "model-service",
              brand,
              city: null,
              targetKeywords: mt.keywords.map((kw) => `${kw} ${model}`.toLowerCase()),
              estimatedDifficulty: "fácil",
              funnelStage: "consideration",
              contentBrief: `Página sobre ${mt.suffix} del ${brandName} ${model}. Incluir especificaciones del modelo, calendario de mantenimiento y CTA.`,
            }],
          });
        }
      }
    }
  }

  return topics;
}

function generateComparisonTopics(existingPaths: Set<string>): ExpandedTopic[] {
  const topics: ExpandedTopic[] = [];
  const brands = Object.keys(BRAND_NAMES);

  const comparisonPairs = [
    ["volkswagen", "tesla"], ["audi", "bmw"], ["hyundai", "kia"],
    ["skoda", "cupra"], ["mercedes-benz", "bmw"], ["peugeot", "renault"],
    ["byd", "tesla"], ["volkswagen", "hyundai"], ["audi", "mercedes-benz"],
    ["volvo", "bmw"],
  ];

  for (const [brandA, brandB] of comparisonPairs) {
    if (!brands.includes(brandA) || !brands.includes(brandB)) continue;
    const nameA = BRAND_NAMES[brandA];
    const nameB = BRAND_NAMES[brandB];
    const slug = `${brandA}-vs-${brandB}`;
    const path = `/comparativas/${slug}`;

    if (!existingPaths.has(path)) {
      topics.push({
        id: `comp-${slug}`,
        topic: `${nameA} vs ${nameB} Eléctrico`,
        slug,
        category: "comparativa",
        relatedService: "diagnostico",
        relatedBrands: [brandA, brandB],
        keywords: [
          `${nameA.toLowerCase()} vs ${nameB.toLowerCase()} eléctrico`,
          `comparar ${nameA.toLowerCase()} ${nameB.toLowerCase()}`,
          `mejor eléctrico ${nameA.toLowerCase()} o ${nameB.toLowerCase()}`,
        ],
        searchVolumeTier: "alto",
        competitionTier: "alta",
        priority: "alta",
        priorityScore: 9,
        isNew: true,
        parentTopic: null,
        suggestedPages: [{
          path,
          title: `${nameA} vs ${nameB}: Comparativa Eléctricos`,
          type: "comparison",
          brand: null,
          city: null,
          targetKeywords: [`${nameA.toLowerCase()} vs ${nameB.toLowerCase()}`, `comparativa ${nameA.toLowerCase()} ${nameB.toLowerCase()}`],
          estimatedDifficulty: "media",
          funnelStage: "consideration",
          contentBrief: `Comparativa detallada entre ${nameA} y ${nameB} eléctricos. Tabla de modelos, autonomía, precio, coste mantenimiento. CTA a servicios para ambas marcas.`,
        }],
      });
    }
  }

  return topics;
}

function scorePriority(seed: TopicSeed): { priority: ExpansionPriority; score: number } {
  let score = 5;
  if (seed.volumeTier === "alto") score += 3;
  else if (seed.volumeTier === "medio") score += 1;

  if (seed.competitionTier === "baja") score += 2;
  else if (seed.competitionTier === "media") score += 1;

  if (seed.category === "sintoma-averia" || seed.category === "problema-comun") score += 1;
  if (seed.category === "coste") score += 1;

  const priority: ExpansionPriority = score >= 9 ? "alta" : score >= 7 ? "media" : "baja";
  return { priority, score: Math.min(score, 10) };
}

export function discoverTopics(): ExpandedTopic[] {
  const existingPaths = getExistingPaths();
  const topics: ExpandedTopic[] = [];

  for (const seed of ALL_SEEDS) {
    const pages = generatePageSuggestions(seed, existingPaths);
    const { priority, score } = scorePriority(seed);

    topics.push({
      id: `topic-${seed.slug}`,
      topic: seed.topic,
      slug: seed.slug,
      category: seed.category,
      relatedService: seed.service,
      relatedBrands: Object.keys(BRAND_NAMES),
      keywords: seed.keywords,
      searchVolumeTier: seed.volumeTier,
      competitionTier: seed.competitionTier,
      priority,
      priorityScore: score,
      isNew: pages.length > 0,
      parentTopic: seed.parent,
      suggestedPages: pages,
    });
  }

  topics.push(...generateModelSpecificTopics(existingPaths));
  topics.push(...generateComparisonTopics(existingPaths));

  topics.sort((a, b) => b.priorityScore - a.priorityScore);

  return topics;
}

export function getExpansionReport(): ExpansionReport {
  const topics = discoverTopics();

  const byCategory: Record<TopicCategory, number> = {
    "problema-comun": 0, "sintoma-averia": 0, mantenimiento: 0,
    reparacion: 0, diagnostico: 0, componente: 0,
    "modelo-especifico": 0, comparativa: 0, guia: 0, coste: 0, tecnologia: 0,
  };
  const byPriority: Record<ExpansionPriority, number> = { alta: 0, media: 0, baja: 0 };
  const byService: Record<string, number> = {};

  let totalNewPages = 0;

  for (const t of topics) {
    byCategory[t.category] = (byCategory[t.category] || 0) + 1;
    byPriority[t.priority]++;
    byService[t.relatedService] = (byService[t.relatedService] || 0) + 1;
    totalNewPages += t.suggestedPages.length;
  }

  const allSuggestions = topics.flatMap((t) => t.suggestedPages);
  allSuggestions.sort((a, b) => {
    const stageOrder = { decision: 3, consideration: 2, awareness: 1 };
    return (stageOrder[b.funnelStage] || 0) - (stageOrder[a.funnelStage] || 0);
  });

  const existingPaths = getExistingPaths();
  const existingCoverage = existingPaths.size;
  const expansionPotential = totalNewPages;

  const categoryLabels: Record<TopicCategory, string> = {
    "problema-comun": "Problemas Comunes",
    "sintoma-averia": "Síntomas de Avería",
    mantenimiento: "Mantenimiento",
    reparacion: "Reparación",
    diagnostico: "Diagnóstico",
    componente: "Componentes",
    "modelo-especifico": "Modelos Específicos",
    comparativa: "Comparativas",
    guia: "Guías",
    coste: "Costes y Precios",
    tecnologia: "Tecnología",
  };

  const categoryBreakdown: CategoryBreakdown[] = Object.entries(byCategory)
    .filter(([, count]) => count > 0)
    .map(([cat, count]) => {
      const catTopics = topics.filter((t) => t.category === cat);
      const pageCount = catTopics.reduce((sum, t) => sum + t.suggestedPages.length, 0);
      const avgPriority = catTopics.length > 0
        ? Math.round((catTopics.reduce((sum, t) => sum + t.priorityScore, 0) / catTopics.length) * 10) / 10
        : 0;
      return {
        category: cat as TopicCategory,
        label: categoryLabels[cat as TopicCategory] || cat,
        topicCount: count,
        pageCount,
        avgPriority,
        examples: catTopics.slice(0, 3).map((t) => t.topic),
      };
    })
    .sort((a, b) => b.avgPriority - a.avgPriority);

  return {
    timestamp: new Date().toISOString(),
    totalTopicsDiscovered: topics.length,
    totalNewPages,
    byCategory,
    byPriority,
    byService,
    existingCoverage,
    expansionPotential,
    topics,
    topSuggestions: allSuggestions.slice(0, 50),
    categoryBreakdown,
  };
}

export function getTopicsByCategory(category: TopicCategory): ExpandedTopic[] {
  return discoverTopics().filter((t) => t.category === category);
}

export function getTopicsByBrand(brandSlug: string): ExpandedTopic[] {
  return discoverTopics().filter((t) => t.relatedBrands.includes(brandSlug));
}

export function getTopicsByService(serviceSlug: string): ExpandedTopic[] {
  return discoverTopics().filter((t) => t.relatedService === serviceSlug);
}

export function getExpansionSummary(): {
  totalTopics: number;
  totalNewPages: number;
  byCategory: Record<string, number>;
  byPriority: Record<string, number>;
  topTopics: { topic: string; category: string; priority: string; pages: number }[];
  topPages: { path: string; title: string; type: string; funnelStage: string }[];
  categoryBreakdown: CategoryBreakdown[];
} {
  const report = getExpansionReport();
  return {
    totalTopics: report.totalTopicsDiscovered,
    totalNewPages: report.totalNewPages,
    byCategory: report.byCategory,
    byPriority: report.byPriority,
    topTopics: report.topics.slice(0, 20).map((t) => ({
      topic: t.topic,
      category: t.category,
      priority: t.priority,
      pages: t.suggestedPages.length,
    })),
    topPages: report.topSuggestions.slice(0, 20).map((p) => ({
      path: p.path,
      title: p.title,
      type: p.type,
      funnelStage: p.funnelStage,
    })),
    categoryBreakdown: report.categoryBreakdown,
  };
}
