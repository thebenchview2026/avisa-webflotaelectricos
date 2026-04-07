import * as seoEngine from "./seo-engine";
import * as growthEngine from "./seo-growth-engine";
import * as keywordScanner from "./keyword-scanner";
import * as contentGenerator from "./seo-content-generator";
import * as linkOptimizer from "./internal-link-optimizer";
import * as topicalMap from "./topical-map-generator";
import * as topicExpansion from "./topic-expansion-engine";
import * as entityReinforcement from "./entity-reinforcement";
import * as refreshEngine from "./seo-refresh-engine";
import * as authorityBuilder from "./topical-authority-builder";
import * as intentEngine from "./search-intent-engine";
import * as analytics from "./seo-analytics";
import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS } from "./seo-growth-engine";

export type EventType =
  | "new-service"
  | "new-brand"
  | "new-problem"
  | "new-city"
  | "new-sub-service"
  | "new-page"
  | "content-audit"
  | "full-rebuild";

export interface SEOEvent {
  type: EventType;
  payload: Record<string, string>;
  timestamp: string;
}

export interface PipelineStep {
  id: string;
  module: string;
  action: string;
  status: "pending" | "running" | "completed" | "skipped" | "error";
  result: unknown;
  durationMs: number;
  itemsProcessed: number;
}

export interface PipelineResult {
  eventType: EventType;
  payload: Record<string, string>;
  timestamp: string;
  totalSteps: number;
  completedSteps: number;
  totalDurationMs: number;
  steps: PipelineStep[];
  summary: PipelineSummary;
}

export interface PipelineSummary {
  pagesGenerated: number;
  contentPieces: number;
  linksCreated: number;
  schemasGenerated: number;
  faqsGenerated: number;
  entitiesReinforced: number;
  keywordsDiscovered: number;
  sitemapUpdated: boolean;
  refreshTasks: number;
  authorityScore: number;
}

export interface SystemStatus {
  timestamp: string;
  healthy: boolean;
  modules: ModuleHealth[];
  globalMetrics: GlobalMetrics;
  lastEvents: SEOEvent[];
  automationCapabilities: string[];
}

export interface ModuleHealth {
  name: string;
  status: "active" | "degraded" | "inactive";
  lastRun: string;
  itemCount: number;
  description: string;
}

export interface GlobalMetrics {
  totalPages: number;
  totalKeywords: number;
  totalLinks: number;
  totalFaqs: number;
  totalEntities: number;
  avgAuthorityScore: number;
  avgIntentScore: number;
  siloPurity: number;
  topicalCoverage: number;
  healthScore: number;
  growthPotential: number;
}

export interface AutoExpansionPlan {
  timestamp: string;
  currentState: GlobalMetrics;
  expansionOpportunities: ExpansionOpportunity[];
  totalNewPages: number;
  totalNewKeywords: number;
  estimatedTrafficGrowth: string;
  prioritizedActions: PrioritizedAction[];
  projections: GrowthProjection;
}

export interface ExpansionOpportunity {
  source: string;
  type: string;
  description: string;
  newPages: number;
  newKeywords: number;
  priority: number;
  effort: "low" | "medium" | "high";
}

export interface PrioritizedAction {
  rank: number;
  action: string;
  module: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  description: string;
  estimatedPages: number;
}

export interface GrowthProjection {
  currentPages: number;
  potentialPages: number;
  currentKeywords: number;
  potentialKeywords: number;
  currentAuthority: number;
  projectedAuthority: number;
  growthMultiplier: number;
}

function runStep(id: string, module: string, action: string, fn: () => unknown): PipelineStep {
  const start = Date.now();
  let status: PipelineStep["status"] = "pending";
  let result: unknown = null;
  let itemsProcessed = 0;

  try {
    status = "running";
    result = fn();
    status = "completed";
    if (typeof result === "number") itemsProcessed = result;
    else if (Array.isArray(result)) itemsProcessed = result.length;
    else if (result && typeof result === "object" && "length" in (result as any)) itemsProcessed = (result as any).length;
    else if (result && typeof result === "object") itemsProcessed = 1;
  } catch (e) {
    status = "error";
    result = { error: (e as Error).message };
  }

  return { id, module, action, status, result, durationMs: Date.now() - start, itemsProcessed };
}

export function processEvent(event: SEOEvent): PipelineResult {
  const startTime = Date.now();
  const steps: PipelineStep[] = [];
  const summary: PipelineSummary = {
    pagesGenerated: 0, contentPieces: 0, linksCreated: 0,
    schemasGenerated: 0, faqsGenerated: 0, entitiesReinforced: 0,
    keywordsDiscovered: 0, sitemapUpdated: false, refreshTasks: 0,
    authorityScore: 0,
  };

  switch (event.type) {
    case "new-service": {
      const serviceSlug = event.payload.slug || "";
      const serviceName = event.payload.name || "";

      steps.push(runStep("growth-pages", "seo-growth-engine", "generateGrowthPages", () => {
        const slugs = growthEngine.getAllGrowthSlugs().filter((s) => s.slug.includes(serviceSlug));
        summary.pagesGenerated += slugs.length;
        return slugs;
      }));

      steps.push(runStep("content-gen", "seo-content-generator", "generateContent", () => {
        const brands = Object.keys(BRAND_NAMES);
        const contents: unknown[] = [];
        for (const brand of brands) {
          const content = contentGenerator.generateContent(`${serviceSlug}-${brand}`);
          if (content) { contents.push(content); summary.contentPieces++; }
        }
        return contents;
      }));

      steps.push(runStep("keywords", "keyword-scanner", "scanServiceKeywords", () => {
        const kws = keywordScanner.getKeywordsByService(serviceSlug);
        summary.keywordsDiscovered += kws.length;
        return kws;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "generateLinks", () => {
        const plan = linkOptimizer.generateLinkPlan(`/servicios/${serviceSlug}`);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforceEntities", () => {
        const plan = entityReinforcement.getPageEntityPlan(`/servicios/${serviceSlug}`);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length + plan.secondaryEntities.length;
        return plan;
      }));

      steps.push(runStep("refresh", "seo-refresh-engine", "triggerRefresh", () => {
        const tasks = refreshEngine.onNewService(serviceSlug, serviceName);
        summary.refreshTasks += tasks.length;
        return tasks;
      }));

      steps.push(runStep("topical-map", "topical-map-generator", "updateMap", () => {
        const map = topicalMap.generateTopicalMap();
        return { nodes: map.nodes.length, edges: map.edges.length };
      }));

      steps.push(runStep("authority", "topical-authority-builder", "buildAuthority", () => {
        const arch = authorityBuilder.getAuthoritySummary();
        summary.authorityScore = arch.avgScore;
        return arch;
      }));

      summary.sitemapUpdated = true;
      break;
    }

    case "new-brand": {
      const brandSlug = event.payload.slug || "";
      const brandName = event.payload.name || "";

      steps.push(runStep("growth-pages", "seo-growth-engine", "generateBrandPages", () => {
        const slugs = growthEngine.getAllGrowthSlugs().filter((s) => s.slug.includes(brandSlug));
        summary.pagesGenerated += slugs.length;
        return slugs;
      }));

      steps.push(runStep("content-gen", "seo-content-generator", "generateBrandContent", () => {
        const contents: unknown[] = [];
        for (const ss of SERVICE_SLUGS) {
          const content = contentGenerator.generateContent(`${ss}-${brandSlug}`);
          if (content) { contents.push(content); summary.contentPieces++; }
        }
        return contents;
      }));

      steps.push(runStep("keywords", "keyword-scanner", "scanBrandKeywords", () => {
        const kws = keywordScanner.getKeywordsByBrand(brandSlug);
        summary.keywordsDiscovered += kws.length;
        return kws;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "generateBrandLinks", () => {
        const plan = linkOptimizer.generateLinkPlan(`/marcas/${brandSlug}`);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforceBrand", () => {
        const plan = entityReinforcement.getPageEntityPlan(`/marcas/${brandSlug}`);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length + plan.secondaryEntities.length;
        return plan;
      }));

      steps.push(runStep("intent", "search-intent-engine", "classifyBrandIntent", () => {
        const profile = intentEngine.getPageIntentProfile(`/marcas/${brandSlug}`);
        return profile;
      }));

      steps.push(runStep("refresh", "seo-refresh-engine", "triggerBrandRefresh", () => {
        const tasks = refreshEngine.onNewBrand(brandSlug, brandName);
        summary.refreshTasks += tasks.length;
        return tasks;
      }));

      steps.push(runStep("authority", "topical-authority-builder", "buildAuthority", () => {
        const arch = authorityBuilder.getAuthoritySummary();
        summary.authorityScore = arch.avgScore;
        return arch;
      }));

      summary.sitemapUpdated = true;
      break;
    }

    case "new-problem": {
      const problemSlug = event.payload.slug || "";

      steps.push(runStep("growth-pages", "seo-growth-engine", "generateProblemPages", () => {
        const slugs = growthEngine.getAllGrowthSlugs().filter((s) => s.slug.includes(problemSlug));
        summary.pagesGenerated += slugs.length;
        return slugs;
      }));

      steps.push(runStep("content-gen", "seo-content-generator", "generateProblemContent", () => {
        const contents: unknown[] = [];
        for (const brand of Object.keys(BRAND_NAMES)) {
          const content = contentGenerator.generateContent(`${problemSlug}-${brand}`);
          if (content) { contents.push(content); summary.contentPieces++; }
        }
        return contents;
      }));

      steps.push(runStep("keywords", "keyword-scanner", "scanProblemKeywords", () => {
        const kws = keywordScanner.scanKeywords().filter((k) => k.keyword.includes(problemSlug.replace(/-/g, " ")));
        summary.keywordsDiscovered += kws.length;
        return kws;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "linkProblemPages", () => {
        const firstBrand = Object.keys(BRAND_NAMES)[0];
        const plan = linkOptimizer.generateLinkPlan(`/problemas/${problemSlug}-${firstBrand}`);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforceProblem", () => {
        const firstBrand = Object.keys(BRAND_NAMES)[0];
        const plan = entityReinforcement.getPageEntityPlan(`/problemas/${problemSlug}-${firstBrand}`);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length;
        return plan;
      }));

      steps.push(runStep("refresh", "seo-refresh-engine", "triggerRefresh", () => {
        const tasks = refreshEngine.onNewPage(`/problemas/${problemSlug}-${Object.keys(BRAND_NAMES)[0]}`);
        summary.refreshTasks += tasks.length;
        return tasks;
      }));

      summary.sitemapUpdated = true;
      break;
    }

    case "new-page": {
      const pagePath = event.payload.path || "";

      steps.push(runStep("content-gen", "seo-content-generator", "generatePageContent", () => {
        const slug = pagePath.replace(/^\/servicios\/|^\/problemas\//, "");
        const content = contentGenerator.generateContent(slug);
        if (content) summary.contentPieces++;
        return content;
      }));

      steps.push(runStep("seo-bundle", "seo-engine", "generateSeoBundle", () => {
        const parts = pagePath.split("/").filter(Boolean);
        if (parts.length >= 2) {
          const ctx: seoEngine.SeoContext = {
            pageType: parts[0] === "servicios" ? "service-brand" : "brand",
            brandSlug: parts[1]?.split("-").pop() || "",
            serviceSlug: parts[1]?.split("-")[0] || "",
          };
          return seoEngine.generateSeoBundle(ctx);
        }
        return null;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "generatePageLinks", () => {
        const plan = linkOptimizer.generateLinkPlan(pagePath);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("intent", "search-intent-engine", "classifyPageIntent", () => {
        return intentEngine.getPageIntentProfile(pagePath);
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforcePage", () => {
        const plan = entityReinforcement.getPageEntityPlan(pagePath);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length;
        return plan;
      }));

      steps.push(runStep("refresh", "seo-refresh-engine", "triggerPageRefresh", () => {
        const tasks = refreshEngine.onNewPage(pagePath);
        summary.refreshTasks += tasks.length;
        return tasks;
      }));

      summary.pagesGenerated = 1;
      summary.sitemapUpdated = true;
      break;
    }

    case "content-audit": {
      steps.push(runStep("audit-refresh", "seo-refresh-engine", "runContentAudit", () => {
        const tasks = refreshEngine.runContentAudit();
        summary.refreshTasks += tasks.length;
        return tasks;
      }));

      steps.push(runStep("link-health", "internal-link-optimizer", "analyzeLinkHealth", () => {
        const health = linkOptimizer.analyzeLinkHealth(30);
        summary.linksCreated = health.totalLinksAnalyzed;
        return health;
      }));

      steps.push(runStep("keyword-gaps", "keyword-scanner", "findGaps", () => {
        const gaps = keywordScanner.getKeywordGaps();
        summary.keywordsDiscovered += gaps.length;
        return gaps;
      }));

      steps.push(runStep("intent-mismatches", "search-intent-engine", "findMismatches", () => {
        const report = intentEngine.generateIntentReport(100);
        return { mismatches: report.intentMismatches.length, gaps: report.intentGaps.length };
      }));

      steps.push(runStep("expansion", "topic-expansion-engine", "discoverTopics", () => {
        const report = topicExpansion.getExpansionSummary();
        summary.pagesGenerated = report.totalNewPages;
        return report;
      }));

      steps.push(runStep("authority-check", "topical-authority-builder", "checkAuthority", () => {
        const arch = authorityBuilder.getAuthoritySummary();
        summary.authorityScore = arch.avgScore;
        return { score: arch.avgScore, gaps: arch.topGaps.length, purity: arch.siloPurity.avgPurity };
      }));

      break;
    }

    case "full-rebuild": {
      steps.push(runStep("topical-map", "topical-map-generator", "generateMap", () => {
        const map = topicalMap.generateTopicalMap();
        return { nodes: map.nodes.length, edges: map.edges.length, clusters: map.clusters.length };
      }));

      steps.push(runStep("authority", "topical-authority-builder", "buildArchitecture", () => {
        const arch = authorityBuilder.buildAuthorityArchitecture();
        summary.authorityScore = arch.avgAuthorityScore;
        summary.pagesGenerated = arch.totalPages;
        summary.linksCreated = arch.totalLinks;
        return {
          pillars: arch.totalPillars, clusters: arch.totalClusters,
          pages: arch.totalPages, links: arch.totalLinks,
          score: arch.avgAuthorityScore, purity: arch.siloPurity.avgPurity,
        };
      }));

      steps.push(runStep("growth-analysis", "seo-growth-engine", "analyzeOpportunities", () => {
        const report = growthEngine.analyzeGrowthOpportunities();
        return { totalPages: report.totalNewPages, byType: report.byType };
      }));

      steps.push(runStep("keyword-scan", "keyword-scanner", "fullScan", () => {
        const report = keywordScanner.generateScanReport();
        summary.keywordsDiscovered = report.total;
        return { total: report.total, gaps: report.gaps.length, clusters: report.clusters.length };
      }));

      steps.push(runStep("content-stats", "seo-content-generator", "getStats", () => {
        const stats = contentGenerator.getContentStats();
        summary.contentPieces = stats.totalGeneratable;
        summary.faqsGenerated = stats.avgFaqs * stats.totalGeneratable;
        return stats;
      }));

      steps.push(runStep("link-health", "internal-link-optimizer", "analyzeHealth", () => {
        const health = linkOptimizer.analyzeLinkHealth(30);
        return { avgLinks: health.avgLinksPerPage, orphanRisk: health.orphanRiskPages, duplicates: health.duplicateLinks };
      }));

      steps.push(runStep("entity-catalog", "entity-reinforcement", "buildCatalog", () => {
        const catalog = entityReinforcement.getEntityCatalog();
        summary.entitiesReinforced = catalog.length;
        return { totalEntities: catalog.length };
      }));

      steps.push(runStep("entity-scores", "entity-reinforcement", "analyzeScores", () => {
        const report = entityReinforcement.getEntitySummary();
        return { avgScore: report.avgScore, avgMentions: report.avgMentions, zoneCoverage: report.avgZoneCoverage };
      }));

      steps.push(runStep("intent-analysis", "search-intent-engine", "analyzeIntents", () => {
        const summary = intentEngine.getIntentSummary();
        return { avgScore: summary.avgScore, byIntent: summary.byIntent, bottleneck: summary.funnelAnalysis.bottleneck };
      }));

      steps.push(runStep("expansion", "topic-expansion-engine", "discoverExpansion", () => {
        const report = topicExpansion.getExpansionSummary();
        return { topics: report.totalTopics, newPages: report.totalNewPages, byCategory: report.byCategory };
      }));

      steps.push(runStep("refresh-audit", "seo-refresh-engine", "runAudit", () => {
        const tasks = refreshEngine.runContentAudit();
        summary.refreshTasks = tasks.length;
        return { tasks: tasks.length };
      }));

      steps.push(runStep("analytics", "seo-analytics", "generateMetrics", () => {
        const dashboard = analytics.getDashboardData();
        return {
          pages: dashboard.metrics.pages,
          keywords: dashboard.metrics.keywords,
          health: dashboard.metrics.healthScore,
        };
      }));

      summary.sitemapUpdated = true;
      summary.schemasGenerated = summary.entitiesReinforced;
      break;
    }

    case "new-city": {
      const citySlug = event.payload.slug || "";
      const cityName = event.payload.name || "";

      steps.push(runStep("local-pages", "seo-growth-engine", "generateLocalPages", () => {
        const slugs = growthEngine.getAllGrowthSlugs().filter((s) => s.slug.includes(citySlug));
        summary.pagesGenerated += slugs.length;
        return slugs;
      }));

      steps.push(runStep("content-gen", "seo-content-generator", "generateLocalContent", () => {
        const contents: unknown[] = [];
        for (const ss of SERVICE_SLUGS) {
          for (const brand of Object.keys(BRAND_NAMES).slice(0, 4)) {
            const content = contentGenerator.generateContent(`${ss}-${brand}-${citySlug}`);
            if (content) { contents.push(content); summary.contentPieces++; }
          }
        }
        return contents;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "generateLocalLinks", () => {
        const plan = linkOptimizer.generateLinkPlan(`/taller-electricos-${citySlug}`);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforceLocal", () => {
        const plan = entityReinforcement.getPageEntityPlan(`/taller-electricos-${citySlug}`);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length;
        return plan;
      }));

      summary.sitemapUpdated = true;
      break;
    }

    case "new-sub-service": {
      const subSlug = event.payload.slug || "";

      steps.push(runStep("growth-pages", "seo-growth-engine", "generateSubServicePages", () => {
        const slugs = growthEngine.getAllGrowthSlugs().filter((s) => s.slug.includes(subSlug));
        summary.pagesGenerated += slugs.length;
        return slugs;
      }));

      steps.push(runStep("content-gen", "seo-content-generator", "generateSubContent", () => {
        const contents: unknown[] = [];
        for (const brand of Object.keys(BRAND_NAMES)) {
          const content = contentGenerator.generateContent(`${subSlug}-${brand}`);
          if (content) { contents.push(content); summary.contentPieces++; }
        }
        return contents;
      }));

      steps.push(runStep("links", "internal-link-optimizer", "linkSubService", () => {
        const firstBrand = Object.keys(BRAND_NAMES)[0];
        const plan = linkOptimizer.generateLinkPlan(`/servicios/${subSlug}-${firstBrand}`);
        summary.linksCreated += plan.links.length;
        return plan;
      }));

      steps.push(runStep("entity-reinforcement", "entity-reinforcement", "reinforceSubService", () => {
        const firstBrand = Object.keys(BRAND_NAMES)[0];
        const plan = entityReinforcement.getPageEntityPlan(`/servicios/${subSlug}-${firstBrand}`);
        summary.schemasGenerated += plan.schemaPlan.length;
        summary.faqsGenerated += plan.faqPlan.length;
        summary.entitiesReinforced += plan.primaryEntities.length;
        return plan;
      }));

      summary.sitemapUpdated = true;
      break;
    }
  }

  const completedSteps = steps.filter((s) => s.status === "completed").length;

  return {
    eventType: event.type,
    payload: event.payload,
    timestamp: event.timestamp,
    totalSteps: steps.length,
    completedSteps,
    totalDurationMs: Date.now() - startTime,
    steps,
    summary,
  };
}

export function getSystemStatus(): SystemStatus {
  const modules: ModuleHealth[] = [];
  const now = new Date().toISOString();

  try {
    const growthSlugs = growthEngine.getAllGrowthSlugs();
    modules.push({ name: "SEO Growth Engine", status: "active", lastRun: now, itemCount: growthSlugs.length, description: `${growthSlugs.length} growth pages (sub-services, problems, local)` });
  } catch { modules.push({ name: "SEO Growth Engine", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const report = keywordScanner.generateScanReport();
    modules.push({ name: "Keyword Scanner", status: "active", lastRun: now, itemCount: report.total, description: `${report.total} keywords, ${report.gaps.length} gaps` });
  } catch { modules.push({ name: "Keyword Scanner", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const stats = contentGenerator.getContentStats();
    modules.push({ name: "Content Generator", status: "active", lastRun: now, itemCount: stats.totalGeneratable, description: `${stats.totalGeneratable} pages, avg ${stats.avgFaqs} FAQs/page` });
  } catch { modules.push({ name: "Content Generator", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const health = linkOptimizer.analyzeLinkHealth(20);
    modules.push({ name: "Internal Link Optimizer", status: "active", lastRun: now, itemCount: health.totalLinksAnalyzed, description: `${health.avgLinksPerPage.toFixed(1)} avg links/page, ${health.duplicateLinks} duplicates` });
  } catch { modules.push({ name: "Internal Link Optimizer", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const mapSummary = topicalMap.getTopicalMapSummary();
    modules.push({ name: "Topical Map Generator", status: "active", lastRun: now, itemCount: mapSummary.stats.totalNodes, description: `${mapSummary.stats.totalNodes} nodes, ${mapSummary.stats.totalEdges} edges, ${mapSummary.stats.totalClusters} clusters` });
  } catch { modules.push({ name: "Topical Map Generator", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const expSummary = topicExpansion.getExpansionSummary();
    modules.push({ name: "Topic Expansion Engine", status: "active", lastRun: now, itemCount: expSummary.totalTopics, description: `${expSummary.totalTopics} topics, ${expSummary.totalNewPages} potential pages` });
  } catch { modules.push({ name: "Topic Expansion Engine", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const entSummary = entityReinforcement.getEntitySummary();
    modules.push({ name: "Entity Reinforcement", status: "active", lastRun: now, itemCount: entSummary.totalEntities, description: `${entSummary.totalEntities} entities, avg score ${entSummary.avgScore}%` });
  } catch { modules.push({ name: "Entity Reinforcement", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const authSummary = authorityBuilder.getAuthoritySummary();
    modules.push({ name: "Topical Authority Builder", status: "active", lastRun: now, itemCount: authSummary.totalPillars, description: `${authSummary.totalPillars} pillars, ${authSummary.totalClusters} clusters, score ${authSummary.avgScore}%` });
  } catch { modules.push({ name: "Topical Authority Builder", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const intentSummary = intentEngine.getIntentSummary();
    modules.push({ name: "Search Intent Engine", status: "active", lastRun: now, itemCount: intentSummary.totalPages, description: `${intentSummary.totalPages} pages classified, avg score ${intentSummary.avgScore}` });
  } catch { modules.push({ name: "Search Intent Engine", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const refreshTasks = refreshEngine.runContentAudit();
    modules.push({ name: "SEO Refresh Engine", status: "active", lastRun: now, itemCount: refreshTasks.length, description: `${refreshTasks.length} refresh tasks pending` });
  } catch { modules.push({ name: "SEO Refresh Engine", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  try {
    const dashboard = analytics.getDashboardData();
    modules.push({ name: "SEO Analytics", status: "active", lastRun: now, itemCount: dashboard.metrics.pages, description: `Health: ${dashboard.metrics.healthScore}%` });
  } catch { modules.push({ name: "SEO Analytics", status: "inactive", lastRun: now, itemCount: 0, description: "Error" }); }

  const activeModules = modules.filter((m) => m.status === "active").length;
  const healthy = activeModules >= modules.length * 0.8;

  let totalPages = 0, totalKeywords = 0, totalLinks = 0, totalFaqs = 0;
  let totalEntities = 0, avgAuthority = 0, avgIntent = 0, siloPurity = 0, topicalCoverage = 0;

  try {
    const dashboard = analytics.getDashboardData();
    totalPages = dashboard.metrics.pages;
    totalKeywords = dashboard.metrics.keywords;
    totalLinks = dashboard.metrics.links;
    totalFaqs = dashboard.metrics.faqs;
  } catch {}

  try { totalEntities = entityReinforcement.getEntityCatalog().length; } catch {}
  try { avgAuthority = authorityBuilder.getAuthoritySummary().avgScore; } catch {}
  try { avgIntent = intentEngine.getIntentSummary().avgScore; } catch {}
  try { siloPurity = authorityBuilder.getAuthoritySummary().siloPurity.avgPurity; } catch {}
  try { topicalCoverage = topicalMap.getTopicalMapSummary().stats.coverageScore; } catch {}

  const healthScore = Math.round(
    (activeModules / modules.length) * 30 +
    (avgAuthority / 100) * 25 +
    (siloPurity / 100) * 20 +
    (topicalCoverage / 100) * 15 +
    (avgIntent / 100) * 10
  );

  let growthPotential = 0;
  try {
    const exp = topicExpansion.getExpansionSummary();
    growthPotential = Math.round((exp.totalNewPages / (totalPages || 1)) * 100);
  } catch {}

  return {
    timestamp: now,
    healthy,
    modules,
    globalMetrics: {
      totalPages, totalKeywords, totalLinks, totalFaqs, totalEntities,
      avgAuthorityScore: avgAuthority, avgIntentScore: avgIntent,
      siloPurity, topicalCoverage, healthScore,
      growthPotential: Math.min(growthPotential, 999),
    },
    lastEvents: [],
    automationCapabilities: [
      "Generación automática de páginas SEO al añadir entidad/servicio",
      "Contenido estructurado con 5 secciones + FAQs por página",
      "Esquema JSON-LD (AutoRepair, Service, Brand, LocalBusiness, Article)",
      "Enlaces internos optimizados con 8 categorías de contexto",
      "Refuerzo de entidades en 9 zonas por página",
      "Mapa topical con 1,800+ nodos y relaciones semánticas",
      "Arquitectura de silos con 96% pureza",
      "Clasificación de intención de búsqueda por keyword y página",
      "Motor de expansión con detección automática de nuevos temas",
      "Motor de refresco con 5 triggers y 8 tipos de acción",
      "Sitemap dinámico con auto-split y caché de 30 min",
      "Dashboard analítico unificado con 6 tabs",
    ],
  };
}

export function generateAutoExpansionPlan(): AutoExpansionPlan {
  const status = getSystemStatus();
  const opportunities: ExpansionOpportunity[] = [];

  try {
    const exp = topicExpansion.getExpansionSummary();
    for (const cat of exp.categoryBreakdown) {
      opportunities.push({
        source: "topic-expansion",
        type: cat.category,
        description: `${cat.label}: ${cat.topicCount} temas → ${cat.pageCount} páginas nuevas`,
        newPages: cat.pageCount,
        newKeywords: cat.topicCount * 3,
        priority: Math.round(cat.avgPriority),
        effort: cat.pageCount > 100 ? "high" : cat.pageCount > 20 ? "medium" : "low",
      });
    }
  } catch {}

  try {
    const authSummary = authorityBuilder.getAuthoritySummary();
    for (const gap of authSummary.topGaps.slice(0, 5)) {
      opportunities.push({
        source: "authority-builder",
        type: gap.type,
        description: gap.description,
        newPages: gap.type === "missing-cluster" ? 14 : 1,
        newKeywords: gap.type === "missing-cluster" ? 42 : 5,
        priority: gap.priority,
        effort: "medium",
      });
    }
  } catch {}

  try {
    const intentSummary = intentEngine.getIntentSummary();
    for (const gap of intentSummary.topGaps.slice(0, 3)) {
      opportunities.push({
        source: "search-intent",
        type: "intent-gap",
        description: gap.description,
        newPages: 5,
        newKeywords: gap.suggestedKeywords.length,
        priority: gap.priority,
        effort: "medium",
      });
    }
  } catch {}

  try {
    const kwGaps = keywordScanner.getKeywordGaps();
    if (kwGaps.length > 0) {
      opportunities.push({
        source: "keyword-scanner",
        type: "keyword-gap",
        description: `${kwGaps.length} keywords sin página de destino asignada`,
        newPages: Math.min(kwGaps.length, 50),
        newKeywords: kwGaps.length,
        priority: 7,
        effort: kwGaps.length > 100 ? "high" : "medium",
      });
    }
  } catch {}

  opportunities.sort((a, b) => b.priority - a.priority);

  const totalNewPages = opportunities.reduce((s, o) => s + o.newPages, 0);
  const totalNewKeywords = opportunities.reduce((s, o) => s + o.newKeywords, 0);

  const prioritizedActions: PrioritizedAction[] = opportunities.slice(0, 15).map((o, i) => ({
    rank: i + 1,
    action: o.description,
    module: o.source,
    impact: o.priority >= 8 ? "high" : o.priority >= 6 ? "medium" : "low",
    effort: o.effort,
    description: o.description,
    estimatedPages: o.newPages,
  }));

  const currentPages = status.globalMetrics.totalPages;
  const currentKws = status.globalMetrics.totalKeywords;
  const currentAuth = status.globalMetrics.avgAuthorityScore;

  const projections: GrowthProjection = {
    currentPages,
    potentialPages: currentPages + totalNewPages,
    currentKeywords: currentKws,
    potentialKeywords: currentKws + totalNewKeywords,
    currentAuthority: currentAuth,
    projectedAuthority: Math.min(100, currentAuth + 5),
    growthMultiplier: currentPages > 0 ? Math.round(((currentPages + totalNewPages) / currentPages) * 100) / 100 : 1,
  };

  const growth = currentPages > 0 ? `${Math.round((totalNewPages / currentPages) * 100)}%` : "N/A";

  return {
    timestamp: new Date().toISOString(),
    currentState: status.globalMetrics,
    expansionOpportunities: opportunities,
    totalNewPages,
    totalNewKeywords,
    estimatedTrafficGrowth: growth,
    prioritizedActions,
    projections,
  };
}

export function simulateEvent(type: EventType, payload: Record<string, string>): PipelineResult {
  return processEvent({
    type,
    payload,
    timestamp: new Date().toISOString(),
  });
}
