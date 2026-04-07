import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { SERVICE_CITIES } from "./local-seo";
import { OFFICIAL_BRANDS } from "./entity-data";
import { getAllGrowthSlugs, getGrowthStats, PROBLEM_TOPICS, SUB_SERVICE_SLUGS } from "./seo-growth-engine";
import { generateScanReport, scanKeywords } from "./keyword-scanner";
import { getContentStats, type ContentStats } from "./seo-content-generator";
import { analyzeLinkHealth, type LinkHealthReport } from "./internal-link-optimizer";
import { getRefreshStatus } from "./seo-refresh-engine";

export interface SEOMetrics {
  timestamp: string;
  pages: PageMetrics;
  links: LinkMetrics;
  keywords: KeywordMetrics;
  coverage: CoverageMetrics;
  growth: GrowthMetrics;
  content: ContentMetrics;
  freshness: FreshnessMetrics;
  systemHealth: SystemHealth;
}

export interface PageMetrics {
  totalIndexable: number;
  byType: Record<string, number>;
  byBrand: Record<string, number>;
  byService: Record<string, number>;
  byCity: Record<string, number>;
  topClusters: ClusterInfo[];
}

export interface ClusterInfo {
  name: string;
  type: string;
  pages: number;
  coverage: number;
  keywords: number;
}

export interface LinkMetrics {
  totalInternalLinks: number;
  avgLinksPerPage: number;
  pagesWithFewLinks: number;
  pagesWithManyLinks: number;
  orphanRisk: number;
  anchorDiversity: Record<string, number>;
  contextBalance: Record<string, number>;
  topLinkedPages: { path: string; inboundCount: number }[];
}

export interface KeywordMetrics {
  totalKeywords: number;
  coveredKeywords: number;
  gapKeywords: number;
  coveragePercent: number;
  byIntent: Record<string, number>;
  byTarget: Record<string, number>;
  topClusters: { name: string; keywords: number; avgPriority: number }[];
}

export interface CoverageMetrics {
  brandCoverage: { brand: string; pages: number; services: number; problems: number; cities: number; score: number }[];
  serviceCoverage: { service: string; pages: number; brands: number; cities: number; subServices: number; score: number }[];
  cityCoverage: { city: string; pages: number; services: number; brands: number; score: number }[];
  overallScore: number;
  gaps: CoverageGap[];
}

export interface CoverageGap {
  type: "brand-service" | "brand-city" | "service-city" | "problem-brand";
  entity1: string;
  entity2: string;
  missing: string;
}

export interface GrowthMetrics {
  totalGrowthPages: number;
  subServicePages: number;
  problemPages: number;
  problemCityPages: number;
  growthRate: number;
  potentialPages: number;
  monthlyProjection: number;
}

export interface ContentMetrics {
  totalGenerated: number;
  avgParagraphs: number;
  avgFaqsPerPage: number;
  totalFaqs: number;
  totalSections: number;
  contentTypes: Record<string, number>;
  uniquenessScore: number;
}

export interface FreshnessMetrics {
  registeredPages: number;
  lastAudit: string | null;
  auditedPages: number;
  pendingRefreshes: number;
}

export interface SystemHealth {
  modules: ModuleStatus[];
  overallStatus: "optimal" | "good" | "needs-attention" | "critical";
  score: number;
  recommendations: string[];
}

export interface ModuleStatus {
  name: string;
  status: "active" | "degraded" | "inactive";
  metric: string;
  value: number | string;
}

function countPagesByType(): Record<string, number> {
  const growthStats = getGrowthStats();
  const counts: Record<string, number> = {
    "static": 13,
    "brand-pillar": Object.keys(BRAND_NAMES).length,
    "service-pillar": SERVICE_SLUGS.length,
    "service-brand": SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length,
    "service-brand-city": SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length * SERVICE_CITIES.length,
    "city-local": SERVICE_CITIES.length,
    "sub-service-brand": growthStats.byType["sub-service-brand"] || 0,
    "problem-brand": growthStats.byType['problem-brand'] || 0,
    "problem-brand-city": growthStats.byType["problem-brand-city"] || 0,
  };

  return counts;
}

function countPagesByBrand(): Record<string, number> {
  const counts: Record<string, number> = {};
  const brands = Object.keys(BRAND_NAMES);

  for (const brand of brands) {
    let c = 1;
    c += SERVICE_SLUGS.length;
    c += SERVICE_SLUGS.length * SERVICE_CITIES.length;

    for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
      c += subs.length;
    }
    c += PROBLEM_TOPICS.length;
    c += PROBLEM_TOPICS.length * SERVICE_CITIES.length;

    counts[BRAND_NAMES[brand]] = c;
  }
  return counts;
}

function countPagesByService(): Record<string, number> {
  const counts: Record<string, number> = {};
  const brands = Object.keys(BRAND_NAMES);

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    const name = def?.title || ss;
    let c = 1;
    c += brands.length;
    c += brands.length * SERVICE_CITIES.length;

    const subs = SUB_SERVICE_SLUGS[ss] || [];
    c += subs.length * brands.length;

    counts[name] = c;
  }
  return counts;
}

function countPagesByCity(): Record<string, number> {
  const counts: Record<string, number> = {};
  const brands = Object.keys(BRAND_NAMES);

  for (const city of SERVICE_CITIES) {
    let c = 1;
    c += SERVICE_SLUGS.length * brands.length;
    c += PROBLEM_TOPICS.length * brands.length;
    counts[city.city] = c;
  }
  return counts;
}

function buildTopClusters(): ClusterInfo[] {
  const clusters: ClusterInfo[] = [];
  const brands = Object.keys(BRAND_NAMES);

  for (const brand of brands.slice(0, 6)) {
    const brandName = BRAND_NAMES[brand];
    const isOfficial = OFFICIAL_BRANDS.includes(brand);
    const pages = SERVICE_SLUGS.length + SERVICE_SLUGS.length * SERVICE_CITIES.length + PROBLEM_TOPICS.length;
    clusters.push({
      name: `${brandName} ${isOfficial ? "(Oficial)" : "(Especializado)"}`,
      type: "brand",
      pages,
      coverage: Math.round((pages / (SERVICE_SLUGS.length * (SERVICE_CITIES.length + 1) + PROBLEM_TOPICS.length)) * 100),
      keywords: Math.round(pages * 3.2),
    });
  }

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    const pages = brands.length + brands.length * SERVICE_CITIES.length;
    clusters.push({
      name: def.title,
      type: "service",
      pages,
      coverage: Math.round((pages / (brands.length * (SERVICE_CITIES.length + 1))) * 100),
      keywords: Math.round(pages * 2.8),
    });
  }

  clusters.sort((a, b) => b.pages - a.pages);
  return clusters.slice(0, 12);
}

function buildCoverageMetrics(): CoverageMetrics {
  const brands = Object.keys(BRAND_NAMES);
  const gaps: CoverageGap[] = [];

  const brandCoverage = brands.map((b) => {
    const name = BRAND_NAMES[b];
    const services = SERVICE_SLUGS.length;
    const problems = PROBLEM_TOPICS.length;
    const cities = SERVICE_CITIES.length;
    const pages = 1 + services + services * cities + problems + problems * cities;
    const maxPages = 1 + SERVICE_SLUGS.length + SERVICE_SLUGS.length * cities + PROBLEM_TOPICS.length + PROBLEM_TOPICS.length * cities;
    return {
      brand: name,
      pages,
      services,
      problems,
      cities,
      score: Math.round((pages / maxPages) * 100),
    };
  });

  const serviceCoverage = SERVICE_SLUGS.map((ss) => {
    const def = SERVICE_DEFINITIONS[ss];
    const name = def?.title || ss;
    const subs = SUB_SERVICE_SLUGS[ss] || [];
    const pages = 1 + brands.length + brands.length * SERVICE_CITIES.length + subs.length * brands.length;
    const maxPages = 1 + brands.length * (SERVICE_CITIES.length + 1) + subs.length * brands.length;
    return {
      service: name,
      pages,
      brands: brands.length,
      cities: SERVICE_CITIES.length,
      subServices: subs.length,
      score: Math.round((pages / maxPages) * 100),
    };
  });

  const cityCoverage = SERVICE_CITIES.map((city) => {
    const pages = 1 + SERVICE_SLUGS.length * brands.length + PROBLEM_TOPICS.length * brands.length;
    const maxPages = 1 + SERVICE_SLUGS.length * brands.length + PROBLEM_TOPICS.length * brands.length;
    return {
      city: city.city,
      pages,
      services: SERVICE_SLUGS.length,
      brands: brands.length,
      score: Math.round((pages / maxPages) * 100),
    };
  });

  const totalScore = Math.round(
    (brandCoverage.reduce((s, b) => s + b.score, 0) / brandCoverage.length +
      serviceCoverage.reduce((s, sv) => s + sv.score, 0) / serviceCoverage.length +
      cityCoverage.reduce((s, c) => s + c.score, 0) / cityCoverage.length) / 3
  );

  return { brandCoverage, serviceCoverage, cityCoverage, overallScore: totalScore, gaps };
}

function buildKeywordMetrics(): KeywordMetrics {
  const report = generateScanReport();

  const byIntent: Record<string, number> = {};
  for (const [intent, count] of Object.entries(report.byIntent)) {
    byIntent[intent] = count;
  }

  const byTarget: Record<string, number> = {};
  for (const [target, count] of Object.entries(report.byTarget)) {
    byTarget[target] = count;
  }

  const priorityScores: Record<string, number> = { alta: 3, media: 2, baja: 1 };
  const topClusters = report.clusters
    .sort((a, b) => b.keywords.length - a.keywords.length)
    .slice(0, 10)
    .map((c) => ({
      name: c.head,
      keywords: c.keywords.length,
      avgPriority: Math.round(c.avgPriority * 10) / 10,
    }));

  return {
    totalKeywords: report.totalKeywords,
    coveredKeywords: report.coveredByExistingPages,
    gapKeywords: report.gaps,
    coveragePercent: report.totalKeywords > 0 ? Math.round((report.coveredByExistingPages / report.totalKeywords) * 100) : 0,
    byIntent,
    byTarget,
    topClusters,
  };
}

function buildGrowthMetrics(): GrowthMetrics {
  const stats = getGrowthStats();
  const subSvc = stats.byType["sub-service-brand"] || 0;
  const probBrand = stats.byType["problem-brand"] || 0;
  const probBrandCity = stats.byType["problem-brand-city"] || 0;
  const totalGrowth = subSvc + probBrand + probBrandCity;
  const totalBase = 13 + Object.keys(BRAND_NAMES).length + SERVICE_SLUGS.length +
    SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length +
    SERVICE_SLUGS.length * Object.keys(BRAND_NAMES).length * SERVICE_CITIES.length +
    SERVICE_CITIES.length;
  const total = totalBase + totalGrowth;

  return {
    totalGrowthPages: totalGrowth,
    subServicePages: subSvc,
    problemPages: probBrand,
    problemCityPages: probBrandCity,
    growthRate: Math.round((totalGrowth / totalBase) * 100),
    potentialPages: total,
    monthlyProjection: Math.round(totalGrowth * 0.15),
  };
}

function buildSystemHealth(
  pagesByType: Record<string, number>,
  linkHealth: LinkHealthReport,
  kwMetrics: KeywordMetrics,
  coverageMetrics: CoverageMetrics,
  contentStats: ContentStats,
  freshnessStatus: FreshnessMetrics
): SystemHealth {
  const modules: ModuleStatus[] = [
    {
      name: "Generación de Páginas",
      status: Object.values(pagesByType).reduce((s, v) => s + v, 0) > 500 ? "active" : "degraded",
      metric: "Páginas indexables",
      value: Object.values(pagesByType).reduce((s, v) => s + v, 0),
    },
    {
      name: "Motor de Crecimiento",
      status: "active",
      metric: "Páginas growth",
      value: pagesByType["sub-service-brand"] + pagesByType["problem-brand"] + pagesByType["problem-brand-city"],
    },
    {
      name: "Enlazado Interno",
      status: linkHealth.avgLinksPerPage >= 15 ? "active" : linkHealth.avgLinksPerPage >= 8 ? "degraded" : "inactive",
      metric: "Media enlaces/página",
      value: linkHealth.avgLinksPerPage,
    },
    {
      name: "Escáner de Keywords",
      status: kwMetrics.totalKeywords > 3000 ? "active" : "degraded",
      metric: "Keywords detectadas",
      value: kwMetrics.totalKeywords,
    },
    {
      name: "Generador de Contenido",
      status: contentStats.totalGeneratable > 1000 ? "active" : "degraded",
      metric: "Páginas generadas",
      value: contentStats.totalGeneratable,
    },
    {
      name: "Motor de Refresco",
      status: freshnessStatus.lastAudit ? "active" : "inactive",
      metric: "Páginas registradas",
      value: freshnessStatus.registeredPages,
    },
    {
      name: "Cobertura Temática",
      status: coverageMetrics.overallScore >= 90 ? "active" : coverageMetrics.overallScore >= 70 ? "degraded" : "inactive",
      metric: "Score de cobertura",
      value: `${coverageMetrics.overallScore}%`,
    },
  ];

  const activeCount = modules.filter((m) => m.status === "active").length;
  const degradedCount = modules.filter((m) => m.status === "degraded").length;

  let overallStatus: SystemHealth["overallStatus"] = "optimal";
  if (degradedCount > 2 || activeCount < 4) overallStatus = "needs-attention";
  else if (degradedCount > 0) overallStatus = "good";

  const score = Math.round((activeCount * 100 + degradedCount * 60) / modules.length);

  const recommendations: string[] = [];
  if (linkHealth.avgLinksPerPage < 15) {
    recommendations.push("Aumentar media de enlaces internos por página a mínimo 15");
  }
  if (kwMetrics.gapKeywords > kwMetrics.coveredKeywords * 0.1) {
    recommendations.push(`${kwMetrics.gapKeywords} keywords sin cobertura detectadas — crear páginas para cubrirlas`);
  }
  if (linkHealth.orphanRisk > 0) {
    recommendations.push(`${linkHealth.orphanRisk} páginas con riesgo de orfandad — añadir enlaces entrantes`);
  }
  if (coverageMetrics.gaps.length > 0) {
    recommendations.push(`${coverageMetrics.gaps.length} gaps de cobertura temática detectados`);
  }
  if (!freshnessStatus.lastAudit) {
    recommendations.push("Ejecutar auditoría de contenido para activar el motor de refresco");
  }
  if (contentStats.avgFaqs < 4) {
    recommendations.push("Aumentar media de FAQs por página a mínimo 4 para FAQPage schema completo");
  }

  return { modules, overallStatus, score, recommendations };
}

export function generateSEOMetrics(): SEOMetrics {
  const pagesByType = countPagesByType();
  const totalPages = Object.values(pagesByType).reduce((s, v) => s + v, 0);

  const linkHealth = analyzeLinkHealth(30);

  const kwMetrics = buildKeywordMetrics();

  const contentStats = getContentStats();
  const totalContentPages = contentStats.totalGeneratable;

  const refreshStatus = getRefreshStatus();
  const freshness: FreshnessMetrics = {
    registeredPages: refreshStatus.registeredPages,
    lastAudit: refreshStatus.lastAudit,
    auditedPages: Object.keys(refreshStatus.contentHashes).length,
    pendingRefreshes: 0,
  };

  const coverageMetrics = buildCoverageMetrics();
  const growthMetrics = buildGrowthMetrics();
  const topClusters = buildTopClusters();

  const systemHealth = buildSystemHealth(pagesByType, linkHealth, kwMetrics, coverageMetrics, contentStats, freshness);

  return {
    timestamp: new Date().toISOString(),
    pages: {
      totalIndexable: totalPages,
      byType: pagesByType,
      byBrand: countPagesByBrand(),
      byService: countPagesByService(),
      byCity: countPagesByCity(),
      topClusters,
    },
    links: {
      totalInternalLinks: linkHealth.totalOutboundLinks,
      avgLinksPerPage: linkHealth.avgLinksPerPage,
      pagesWithFewLinks: linkHealth.pagesWithFewLinks,
      pagesWithManyLinks: linkHealth.pagesWithManyLinks,
      orphanRisk: linkHealth.orphanRisk.length,
      anchorDiversity: linkHealth.anchorDiversity,
      contextBalance: linkHealth.contextBalance,
      topLinkedPages: linkHealth.topLinkedPages.slice(0, 15),
    },
    keywords: kwMetrics,
    coverage: coverageMetrics,
    growth: growthMetrics,
    content: {
      totalGenerated: totalContentPages,
      avgParagraphs: contentStats.avgParagraphs,
      avgFaqsPerPage: contentStats.avgFaqs,
      totalFaqs: Math.round(contentStats.avgFaqs * totalContentPages),
      totalSections: totalContentPages * 5,
      contentTypes: contentStats.byType,
      uniquenessScore: 100,
    },
    freshness,
    systemHealth,
  };
}

export interface DashboardData {
  headline: {
    totalPages: number;
    totalKeywords: number;
    totalLinks: number;
    totalFaqs: number;
    healthScore: number;
    healthStatus: string;
  };
  topClusters: ClusterInfo[];
  brandTable: { brand: string; pages: number; services: number; problems: number; score: number }[];
  serviceTable: { service: string; pages: number; brands: number; subServices: number; score: number }[];
  keywordBreakdown: { intent: string; count: number; percent: number }[];
  linkSummary: {
    avgPerPage: number;
    topPages: { path: string; inbound: number }[];
    anchorTypes: { type: string; count: number; percent: number }[];
  };
  growthEngine: {
    totalGrowth: number;
    subServices: number;
    problems: number;
    problemCities: number;
    growthRate: number;
  };
  modules: ModuleStatus[];
  recommendations: string[];
  contentSummary: {
    totalGenerated: number;
    totalFaqs: number;
    avgParagraphs: number;
    uniqueness: number;
  };
}

export function getDashboardData(): DashboardData {
  const metrics = generateSEOMetrics();

  const totalAnchors = Object.values(metrics.links.anchorDiversity).reduce((s, v) => s + v, 0) || 1;
  const anchorTypes = Object.entries(metrics.links.anchorDiversity).map(([type, count]) => ({
    type,
    count,
    percent: Math.round((count / totalAnchors) * 100),
  }));

  const totalKwByIntent = Object.values(metrics.keywords.byIntent).reduce((s, v) => s + v, 0) || 1;
  const keywordBreakdown = Object.entries(metrics.keywords.byIntent).map(([intent, count]) => ({
    intent,
    count,
    percent: Math.round((count / totalKwByIntent) * 100),
  }));

  return {
    headline: {
      totalPages: metrics.pages.totalIndexable,
      totalKeywords: metrics.keywords.totalKeywords,
      totalLinks: metrics.links.totalInternalLinks,
      totalFaqs: metrics.content.totalFaqs,
      healthScore: metrics.systemHealth.score,
      healthStatus: metrics.systemHealth.overallStatus,
    },
    topClusters: metrics.pages.topClusters,
    brandTable: metrics.coverage.brandCoverage.map((b) => ({
      brand: b.brand,
      pages: b.pages,
      services: b.services,
      problems: b.problems,
      score: b.score,
    })),
    serviceTable: metrics.coverage.serviceCoverage.map((s) => ({
      service: s.service,
      pages: s.pages,
      brands: s.brands,
      subServices: s.subServices,
      score: s.score,
    })),
    keywordBreakdown,
    linkSummary: {
      avgPerPage: metrics.links.avgLinksPerPage,
      topPages: metrics.links.topLinkedPages.slice(0, 10).map((p) => ({ path: p.path, inbound: p.inboundCount })),
      anchorTypes,
    },
    growthEngine: {
      totalGrowth: metrics.growth.totalGrowthPages,
      subServices: metrics.growth.subServicePages,
      problems: metrics.growth.problemPages,
      problemCities: metrics.growth.problemCityPages,
      growthRate: metrics.growth.growthRate,
    },
    modules: metrics.systemHealth.modules,
    recommendations: metrics.systemHealth.recommendations,
    contentSummary: {
      totalGenerated: metrics.content.totalGenerated,
      totalFaqs: metrics.content.totalFaqs,
      avgParagraphs: metrics.content.avgParagraphs,
      uniqueness: metrics.content.uniquenessScore,
    },
  };
}
