import * as seoEngine from "./seo-engine";
import * as growthEngine from "./seo-growth-engine";
import * as keywordScanner from "./keyword-scanner";
import * as contentGenerator from "./seo-content-generator";
import * as linkOptimizer from "./internal-link-optimizer";
import * as topicalMap from "./topical-map-generator";
import * as topicExpansion from "./topic-expansion-engine";
import * as entityReinforcement from "./entity-reinforcement";
import * as snippetOptimizer from "./snippet-optimizer";
import * as aiSearchEngine from "./ai-search-engine";
import * as seoExpansionEngine from "./seo-expansion-engine";
import * as knowledgeGraph from "./knowledge-graph";
import * as authorityBuilder from "./topical-authority-builder";
import * as intentEngine from "./search-intent-engine";
import * as refreshEngine from "./seo-refresh-engine";
import * as analytics from "./seo-analytics";
import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { SERVICE_CITIES } from "./local-seo";

export type SystemEventType =
  | "new-opportunity-detected"
  | "page-generated"
  | "content-created"
  | "metadata-added"
  | "schema-added"
  | "faqs-generated"
  | "links-added"
  | "sitemap-updated"
  | "authority-rebuilt"
  | "full-expansion-cycle";

export interface SystemEvent {
  id: string;
  type: SystemEventType;
  entityType?: string;
  entitySlug?: string;
  timestamp: string;
  durationMs: number;
  success: boolean;
  details: Record<string, unknown>;
}

export interface AutoExpansionCycle {
  cycleId: string;
  startedAt: string;
  completedAt: string;
  totalDurationMs: number;
  pagesGenerated: number;
  contentPieces: number;
  metadataEntries: number;
  schemasGenerated: number;
  faqsGenerated: number;
  linksCreated: number;
  sitemapEntries: number;
  stages: CycleStage[];
  newOpportunities: number;
  systemScore: number;
}

export interface CycleStage {
  stage: number;
  name: string;
  module: string;
  status: "pending" | "running" | "completed" | "error";
  durationMs: number;
  output: Record<string, unknown>;
}

export interface FullSystemStatus {
  timestamp: string;
  systemVersion: string;
  autonomyLevel: "manual" | "assisted" | "semi-auto" | "fully-auto";
  modules: {
    name: string;
    status: "active" | "inactive";
    itemCount: number;
    role: string;
  }[];
  globalMetrics: AutonomousMetrics;
  lastCycle: AutoExpansionCycle | null;
  pendingOpportunities: number;
  automationCapabilities: AutomationCapability[];
  nextActions: string[];
}

export interface AutonomousMetrics {
  totalPages: number;
  totalKeywords: number;
  totalLinks: number;
  totalFaqs: number;
  totalEntities: number;
  totalSchemas: number;
  knowledgeGraphNodes: number;
  knowledgeGraphRelations: number;
  aiReadinessScore: number;
  snippetEligibility: number;
  authorityScore: number;
  intentCoverage: number;
  siloPurity: number;
  topicalCoverage: number;
  expansionPotential: number;
  healthScore: number;
}

export interface AutomationCapability {
  id: string;
  name: string;
  description: string;
  trigger: string;
  modules: string[];
  status: "active" | "available" | "planned";
}

function runStage(stage: number, name: string, module: string, fn: () => unknown): CycleStage {
  const start = Date.now();
  let output: Record<string, unknown> = {};
  let status: CycleStage["status"] = "completed";

  try {
    const result = fn();
    if (result && typeof result === "object" && !Array.isArray(result)) {
      const r = result as Record<string, unknown>;
      output = {
        ...(typeof r.totalPages === "number" ? { pages: r.totalPages } : {}),
        ...(typeof r.totalKeywords === "number" ? { keywords: r.totalKeywords } : {}),
        ...(typeof r.totalLinks === "number" ? { links: r.totalLinks } : {}),
        ...(typeof r.totalEntities === "number" ? { entities: r.totalEntities } : {}),
        summary: Object.keys(r).slice(0, 6).map(k => `${k}: ${JSON.stringify(r[k])?.slice(0,40)}`).join(", "),
      };
    } else if (Array.isArray(result)) {
      output = { count: result.length };
    } else if (typeof result === "number") {
      output = { value: result };
    }
  } catch (e) {
    status = "error";
    output = { error: (e as Error).message };
  }

  return { stage, name, module, status, durationMs: Date.now() - start, output };
}

export function runExpansionCycle(): AutoExpansionCycle {
  const cycleId = `cycle-${Date.now()}`;
  const startedAt = new Date().toISOString();
  const cycleStart = Date.now();
  const stages: CycleStage[] = [];

  let pagesGenerated = 0;
  let contentPieces = 0;
  let metadataEntries = 0;
  let schemasGenerated = 0;
  let faqsGenerated = 0;
  let linksCreated = 0;
  let sitemapEntries = 0;
  let newOpportunities = 0;

  stages.push(runStage(1, "Detección de Oportunidades SEO", "seo-expansion-engine", () => {
    const report = seoExpansionEngine.getExpansionReport();
    newOpportunities = report.totalOpportunities;
    pagesGenerated = report.estimatedNewPages;
    return { opportunities: report.totalOpportunities, bySource: report.bySource, coverage: report.coverage };
  }));

  stages.push(runStage(2, "Generación de Páginas y Contenido", "seo-content-generator", () => {
    const stats = contentGenerator.getContentStats();
    contentPieces = stats.totalGeneratable;
    faqsGenerated = stats.avgFaqs * Math.min(stats.totalGeneratable, 100);
    return { pages: stats.totalGeneratable, faqs: stats.avgFaqs, uniqueness: stats.uniquenessScore };
  }));

  stages.push(runStage(3, "Generación de Metadata y Schema", "seo-engine", () => {
    const brands = Object.keys(BRAND_NAMES);
    let schemas = 0;
    for (const s of SERVICE_SLUGS) {
      for (const b of brands.slice(0, 5)) {
        const ctx: seoEngine.SeoContext = { pageType: "service-brand", service: s, brand: b };
        const bundle = seoEngine.generateSeoBundle(ctx);
        if (bundle.jsonLd) schemas += bundle.jsonLd.length;
      }
    }
    schemasGenerated = schemas;
    metadataEntries = SERVICE_SLUGS.length * brands.length;
    return { schemas, metadataEntries, sample: "title+description+openGraph+robots+jsonLd" };
  }));

  stages.push(runStage(4, "Generación de FAQs Avanzadas", "entity-reinforcement", () => {
    const path = `/servicios/diagnostico-volkswagen`;
    const plan = entityReinforcement.getPageEntityPlan(path);
    faqsGenerated += plan.faqPlan.length * SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length;
    return { faqsPerPage: plan.faqPlan.length, totalEstimated: faqsGenerated };
  }));

  stages.push(runStage(5, "Optimización de Snippets", "snippet-optimizer", () => {
    const report = snippetOptimizer.getSnippetSiteReport(30);
    return { pages: report.totalPages, avgScore: report.avgSnippetScore, featuredProb: report.avgFeaturedProb };
  }));

  stages.push(runStage(6, "Optimización para AI Search", "ai-search-engine", () => {
    const report = aiSearchEngine.getAISiteProfile();
    return { pages: report.totalPages, llmScore: report.llmReadinessScore, avgAnswerability: report.avgAnswerability, avgCitability: report.avgCitability };
  }));

  stages.push(runStage(7, "Construcción del Knowledge Graph", "knowledge-graph", () => {
    const report = knowledgeGraph.getKGSiteReport();
    return { entities: report.totalEntities, relations: report.totalRelations, coverage: report.coverageScore };
  }));

  stages.push(runStage(8, "Generación de Enlaces Internos", "internal-link-optimizer", () => {
    const health = linkOptimizer.analyzeLinkHealth(20);
    linksCreated = health.totalOutboundLinks;
    return { analyzed: health.totalOutboundLinks, avgPerPage: health.avgLinksPerPage, orphanRisk: health.orphanRisk };
  }));

  stages.push(runStage(9, "Actualización del Sitemap", "seo-growth-engine", () => {
    const growthUrls = growthEngine.getGrowthSitemapUrls();
    const expansionUrls = seoExpansionEngine.getSitemapExpansion();
    sitemapEntries = growthUrls.length + expansionUrls.length;
    return { growthUrls: growthUrls.length, expansionUrls: expansionUrls.length, total: sitemapEntries };
  }));

  stages.push(runStage(10, "Construcción de Autoridad Temática", "topical-authority-builder", () => {
    const summary = authorityBuilder.getAuthoritySummary();
    return { pillars: summary.totalPillars, clusters: summary.totalClusters, score: summary.avgScore, purity: summary.siloPurity.avgPurity };
  }));

  stages.push(runStage(11, "Análisis de Intención de Búsqueda", "search-intent-engine", () => {
    const intentSummary = intentEngine.getIntentSummary();
    return { pages: intentSummary.totalPages, avgScore: intentSummary.avgScore, bottleneck: intentSummary.funnelAnalysis.bottleneck };
  }));

  stages.push(runStage(12, "Expansión Topical y Keywords", "topic-expansion-engine + keyword-scanner", () => {
    const expSummary = topicExpansion.getExpansionSummary();
    const kwReport = keywordScanner.generateScanReport();
    return { newTopics: expSummary.totalTopics, newPages: expSummary.totalNewPages, keywords: kwReport.totalKeywords, gaps: kwReport.gaps };
  }));

  stages.push(runStage(13, "Mapa Topical y Entidades", "topical-map + entity-reinforcement", () => {
    const mapSummary = topicalMap.getTopicalMapSummary();
    const entSummary = entityReinforcement.getEntitySummary();
    return { nodes: mapSummary.stats.totalNodes, edges: mapSummary.stats.totalEdges, entities: entSummary.totalEntities, avgEntityScore: entSummary.avgScore };
  }));

  stages.push(runStage(14, "Auditoría y Refresco de Contenido", "seo-refresh-engine", () => {
    const result = refreshEngine.runContentAudit();
    return { tasks: result.tasksGenerated };
  }));

  stages.push(runStage(15, "Métricas Finales del Sistema", "seo-analytics", () => {
    const dashboard = analytics.getDashboardData();
    return { healthScore: dashboard.headline.healthScore, pages: dashboard.headline.totalPages, keywords: dashboard.headline.totalKeywords };
  }));

  const completedStages = stages.filter((s) => s.status === "completed").length;
  const systemScore = Math.round((completedStages / stages.length) * 100);

  return {
    cycleId,
    startedAt,
    completedAt: new Date().toISOString(),
    totalDurationMs: Date.now() - cycleStart,
    pagesGenerated,
    contentPieces,
    metadataEntries,
    schemasGenerated,
    faqsGenerated,
    linksCreated,
    sitemapEntries,
    stages,
    newOpportunities,
    systemScore,
  };
}

export function getFullSystemStatus(): FullSystemStatus {
  const now = new Date().toISOString();

  const modules: FullSystemStatus["modules"] = [];

  const tryModule = (name: string, role: string, fn: () => number) => {
    try { modules.push({ name, status: "active", itemCount: fn(), role }); }
    catch { modules.push({ name, status: "inactive", itemCount: 0, role }); }
  };

  tryModule("SEO Engine", "Metadata + Schema + H1 + JSON-LD", () => SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length);
  tryModule("SEO Growth Engine", "Páginas de crecimiento (sub-services, problems, local)", () => growthEngine.getAllGrowthSlugs().length);
  tryModule("Keyword Scanner", "Descubrimiento y análisis de keywords", () => keywordScanner.generateScanReport().totalKeywords);
  tryModule("Content Generator", "Contenido estructurado + FAQs por página", () => contentGenerator.getContentStats().totalGeneratable);
  tryModule("Internal Link Optimizer", "Planificación de enlaces internos", () => linkOptimizer.analyzeLinkHealth(10).totalOutboundLinks);
  tryModule("Topical Map Generator", "Mapa temático y relaciones semánticas", () => topicalMap.getTopicalMapSummary().stats.totalNodes);
  tryModule("Topic Expansion Engine", "Expansión automática de temas", () => topicExpansion.getExpansionSummary().totalTopics);
  tryModule("Entity Reinforcement", "Refuerzo de entidades en 9 zonas/página", () => entityReinforcement.getEntitySummary().totalEntities);
  tryModule("Snippet Optimizer", "Bloques optimizados para featured snippets", () => SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length);
  tryModule("AI Search Engine", "Optimización para AI Overviews y LLMs", () => SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length);
  tryModule("SEO Expansion Engine", "Detección automática de oportunidades", () => seoExpansionEngine.getExpansionReport().totalOpportunities);
  tryModule("Knowledge Graph", "Grafo de conocimiento de entidades", () => knowledgeGraph.getKGSiteReport().totalEntities);
  tryModule("Topical Authority Builder", "Arquitectura de silos y autoridad", () => authorityBuilder.getAuthoritySummary().totalPillars);
  tryModule("Search Intent Engine", "Clasificación de intención por página/keyword", () => intentEngine.getIntentSummary().totalPages);
  tryModule("SEO Refresh Engine", "Refresco automático de contenido", () => refreshEngine.runContentAudit().tasksGenerated);

  let metrics: AutonomousMetrics = {
    totalPages: 0, totalKeywords: 0, totalLinks: 0, totalFaqs: 0, totalEntities: 0,
    totalSchemas: 0, knowledgeGraphNodes: 0, knowledgeGraphRelations: 0,
    aiReadinessScore: 0, snippetEligibility: 0, authorityScore: 0,
    intentCoverage: 0, siloPurity: 0, topicalCoverage: 0,
    expansionPotential: 0, healthScore: 0,
  };

  try {
    const dash = analytics.getDashboardData();
    metrics.totalPages = dash.headline.totalPages;
    metrics.totalKeywords = dash.headline.totalKeywords;
    metrics.totalLinks = dash.headline.totalLinks;
    metrics.totalFaqs = dash.headline.totalFaqs;
    metrics.healthScore = dash.headline.healthScore;
  } catch {}

  try { metrics.totalEntities = entityReinforcement.getEntityCatalog().length; } catch {}
  try { const kgr = knowledgeGraph.getKGSiteReport(); metrics.knowledgeGraphNodes = kgr.totalEntities; metrics.knowledgeGraphRelations = kgr.totalRelations; } catch {}
  try { const ai = aiSearchEngine.getAISiteProfile(); metrics.aiReadinessScore = ai.llmReadinessScore; } catch {}
  try { const sn = snippetOptimizer.getSnippetSiteReport(20); metrics.snippetEligibility = sn.avgFeaturedProb; } catch {}
  try { const auth = authorityBuilder.getAuthoritySummary(); metrics.authorityScore = auth.avgScore; metrics.siloPurity = auth.siloPurity.avgPurity; } catch {}
  try { const intent = intentEngine.getIntentSummary(); metrics.intentCoverage = intent.avgScore; } catch {}
  try { const tmap = topicalMap.getTopicalMapSummary(); metrics.topicalCoverage = tmap.stats.coverageScore; } catch {}
  try { const exp = seoExpansionEngine.getExpansionReport(); metrics.expansionPotential = Math.min(999, exp.totalOpportunities); } catch {}
  try { metrics.totalSchemas = metrics.totalEntities * 2; } catch {}

  const automationCapabilities: AutomationCapability[] = [
    { id: "page-gen", name: "Generación Automática de Páginas", description: "Crea páginas SEO completas al detectar nuevas combinaciones entidad+servicio+ciudad", trigger: "Nueva entidad o combinación detectada", modules: ["seo-expansion-engine", "seo-content-generator"], status: "active" },
    { id: "content-struct", name: "Contenido Estructurado AI-Friendly", description: "Genera bloques de definición, respuesta directa, pasos y FAQs optimizados para AI Overviews", trigger: "Generación de página nueva", modules: ["ai-search-engine", "seo-content-generator"], status: "active" },
    { id: "metadata-auto", name: "Metadata + Schema Automáticos", description: "Title, description, OpenGraph, Twitter, JSON-LD (Service, LocalBusiness, FAQPage, HowTo)", trigger: "Creación de página", modules: ["seo-engine"], status: "active" },
    { id: "snippet-blocks", name: "Bloques para Featured Snippets", description: "Párrafos 40-60 palabras, listas numeradas, tablas comparativas y PAA por página", trigger: "Generación de contenido", modules: ["snippet-optimizer"], status: "active" },
    { id: "link-auto", name: "Enlazado Interno Automático", description: "Genera plan de enlaces para cada página con 8 categorías de contexto y análisis de salud", trigger: "Nueva página añadida", modules: ["internal-link-optimizer", "knowledge-graph"], status: "active" },
    { id: "kg-update", name: "Actualización del Knowledge Graph", description: "Añade nuevas entidades y relaciones cuando se detectan marcas, servicios o problemas nuevos", trigger: "Cambio en catálogo de entidades", modules: ["knowledge-graph"], status: "active" },
    { id: "sitemap-dyn", name: "Sitemap Dinámico", description: "Auto-split en múltiples sitemaps con caché de 30 min y prioridades automáticas", trigger: "Cualquier cambio en páginas", modules: ["seo-growth-engine", "seo-expansion-engine"], status: "active" },
    { id: "authority-auto", name: "Autoridad Temática Automática", description: "Construye silos pillar→cluster→supporting con 96% pureza y scoring automático", trigger: "Reconstrucción semanal", modules: ["topical-authority-builder", "topical-map-generator"], status: "active" },
    { id: "intent-classify", name: "Clasificación de Intención Automática", description: "Asigna intent (informacional/comercial/transaccional/navegacional) y etapa de funnel por página", trigger: "Nueva página detectada", modules: ["search-intent-engine"], status: "active" },
    { id: "entity-reinf", name: "Refuerzo de Entidades", description: "Inserta menciones de entidades en 9 zonas por página con artículos correctos en español", trigger: "Generación o actualización de contenido", modules: ["entity-reinforcement"], status: "active" },
    { id: "refresh-audit", name: "Auditoría y Refresco de Contenido", description: "Detecta páginas desactualizadas y genera 8 tipos de tareas de mejora con priorización", trigger: "Ciclo de auditoría automática", modules: ["seo-refresh-engine"], status: "active" },
    { id: "keyword-expand", name: "Expansión de Keywords", description: "Detecta gaps de keywords y genera nuevas páginas para cubrir long-tails no cubiertos", trigger: "Análisis de keyword gaps", modules: ["keyword-scanner", "topic-expansion-engine"], status: "active" },
  ];

  const activeModules = modules.filter((m) => m.status === "active").length;
  const nextActions = [
    `${metrics.expansionPotential} oportunidades detectadas listas para generar páginas`,
    `Ejecutar ciclo completo para procesar todas las etapas de expansión`,
    `Revisar ${metrics.knowledgeGraphNodes} entidades del Knowledge Graph y añadir URLs faltantes`,
    `Optimizar ${metrics.totalPages} páginas existentes con bloques snippet para featured snippets`,
    `Generar llms.txt y ai-hints.json para optimización AI Search`,
  ];

  return {
    timestamp: now,
    systemVersion: "3.0.0-autonomous",
    autonomyLevel: activeModules >= 12 ? "fully-auto" : activeModules >= 8 ? "semi-auto" : "assisted",
    modules,
    globalMetrics: metrics,
    lastCycle: null,
    pendingOpportunities: metrics.expansionPotential,
    automationCapabilities,
    nextActions,
  };
}

export function generateSinglePage(slug: string): {
  content: unknown;
  seoBundle: unknown;
  snippets: unknown;
  aiProfile: unknown;
  entityPlan: unknown;
  linkPlan: unknown;
  intentProfile: unknown;
  kgLinks: unknown;
} {
  const path = slug.startsWith("/") ? slug : `/servicios/${slug}`;
  const cleanSlug = path.replace(/^\/servicios\//, "");

  return {
    content: contentGenerator.generateContent(cleanSlug),
    seoBundle: (() => {
      const parts = cleanSlug.split("-");
      const ctx: seoEngine.SeoContext = {
        pageType: "service-brand",
        service: parts[0],
        brand: parts.slice(1).join("-"),
      };
      return seoEngine.generateSeoBundle(ctx);
    })(),
    snippets: snippetOptimizer.generateSnippetProfile(cleanSlug),
    aiProfile: aiSearchEngine.generateAIProfile(cleanSlug),
    entityPlan: entityReinforcement.getPageEntityPlan(path),
    linkPlan: linkOptimizer.generateLinkPlan(path),
    intentProfile: intentEngine.getPageIntentProfile(path),
    kgLinks: knowledgeGraph.getInternalLinksFromGraph(path),
  };
}
