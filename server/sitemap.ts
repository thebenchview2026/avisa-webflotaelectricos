import type { Express } from "express";
import { storage } from "./storage";
import * as growthEngineModule from "../client/src/lib/seo-growth-engine";
import * as keywordScannerModule from "../client/src/lib/keyword-scanner";
import * as contentGeneratorModule from "../client/src/lib/seo-content-generator";
import * as linkOptimizerModule from "../client/src/lib/internal-link-optimizer";
import * as refreshEngineModule from "../client/src/lib/seo-refresh-engine";
import * as seoAnalyticsModule from "../client/src/lib/seo-analytics";
import * as topicalMapModule from "../client/src/lib/topical-map-generator";
import * as searchIntentModule from "../client/src/lib/search-intent-engine";
import * as topicExpansionModule from "../client/src/lib/topic-expansion-engine";
import * as entityReinforcementModule from "../client/src/lib/entity-reinforcement";
import * as topicalAuthorityModule from "../client/src/lib/topical-authority-builder";
import * as seoSystem from "../client/src/lib/seo-system";
import * as aiSearchModule from "../client/src/lib/ai-search-engine";
import * as snippetOptimizerModule from "../client/src/lib/snippet-optimizer";
import * as knowledgeGraphModule from "../client/src/lib/knowledge-graph";
import * as expansionEngineModule from "../client/src/lib/seo-expansion-engine";
import * as autonomousSeoModule from "../client/src/lib/autonomous-seo-system";

const BASE_URL = "https://electricos.grupoavisa.com";
const MAX_URLS_PER_SITEMAP = 500;
const CACHE_TTL_MS = 30 * 60 * 1000;

function xmlHeader(): string {
  return '<?xml version="1.0" encoding="UTF-8"?>\n';
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
  category: string;
}

function urlEntry(u: SitemapUrl): string {
  return `  <url>\n    <loc>${escapeXml(u.loc)}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority.toFixed(1)}</priority>\n  </url>\n`;
}

function sitemapIndexEntry(loc: string, lastmod: string): string {
  return `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </sitemap>\n`;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function toDateStr(d: Date | null | undefined): string {
  if (!d) return getToday();
  return new Date(d).toISOString().split("T")[0];
}

const EDITORIAL_TYPE_TO_PATH: Record<string, string> = {
  novedad: "novedades",
  guia: "guias",
  comparativa: "comparativas",
  consejo: "consejos",
};

const SERVICE_SLUGS = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"];
const BRAND_SLUGS = ["volkswagen", "audi", "skoda", "cupra", "seat", "tesla", "byd", "hyundai", "bmw", "mercedes-benz", "kia", "volvo", "peugeot", "renault"];
const CITY_SLUGS = ["sevilla", "dos-hermanas", "huelva", "cordoba", "badajoz", "caceres"];

function getGrowthEngine() {
  return growthEngineModule;
}

interface SitemapRegistry {
  urls: SitemapUrl[];
  byCategory: Map<string, SitemapUrl[]>;
  sitemapFiles: { name: string; urls: SitemapUrl[] }[];
  generatedAt: number;
  stats: Record<string, number>;
}

let cachedRegistry: SitemapRegistry | null = null;

function collectStaticPages(today: string): SitemapUrl[] {
  const pages = [
    { path: "/", changefreq: "weekly", priority: 1.0 },
    { path: "/promociones-electricos", changefreq: "weekly", priority: 0.9 },
    { path: "/promociones-hibridos", changefreq: "weekly", priority: 0.9 },
    { path: "/autoplus", changefreq: "monthly", priority: 0.8 },
    { path: "/postventa", changefreq: "monthly", priority: 0.8 },
    { path: "/preguntas", changefreq: "weekly", priority: 0.8 },
    { path: "/concesionarios", changefreq: "monthly", priority: 0.8 },
    { path: "/electrificacion", changefreq: "monthly", priority: 0.7 },
    { path: "/conductores-adopcion", changefreq: "monthly", priority: 0.6 },
    { path: "/novedades", changefreq: "daily", priority: 0.8 },
    { path: "/guias", changefreq: "weekly", priority: 0.8 },
    { path: "/comparativas", changefreq: "weekly", priority: 0.8 },
    { path: "/consejos", changefreq: "weekly", priority: 0.8 },
    // Páginas comerciales B2C — alto valor
    { path: "/renting-coche-electrico", changefreq: "monthly", priority: 0.8 },
    { path: "/leasing-coche-electrico", changefreq: "monthly", priority: 0.8 },
    { path: "/punto-de-carga", changefreq: "monthly", priority: 0.8 },
    { path: "/ayudas-moves3-vehiculo-electrico", changefreq: "monthly", priority: 0.9 },
    // Páginas de atributos EV
    { path: "/vehiculos/electricos/autonomia-mas-400km", changefreq: "monthly", priority: 0.8 },
    { path: "/vehiculos/electricos/carga-rapida-dc", changefreq: "monthly", priority: 0.8 },
    { path: "/vehiculos/hibridos/phev-enchufables", changefreq: "monthly", priority: 0.8 },
    { path: "/vehiculos/electricos/etiqueta-cero-dgt", changefreq: "monthly", priority: 0.8 },
  ];
  return pages.map((p) => ({
    loc: `${BASE_URL}${p.path}`,
    lastmod: today,
    changefreq: p.changefreq,
    priority: p.priority,
    category: "pages",
  }));
}

function collectBrandsPillar(today: string): SitemapUrl[] {
  return BRAND_SLUGS.map((b) => ({
    loc: `${BASE_URL}/marcas/${b}`,
    lastmod: today,
    changefreq: "weekly",
    priority: 0.8,
    category: "brands",
  }));
}

function collectServicesPillar(today: string): SitemapUrl[] {
  return SERVICE_SLUGS.map((s) => ({
    loc: `${BASE_URL}/servicios/${s}`,
    lastmod: today,
    changefreq: "weekly",
    priority: 0.8,
    category: "services-pillar",
  }));
}

function collectServiceBrandCombinations(today: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const brand of BRAND_SLUGS) {
      urls.push({
        loc: `${BASE_URL}/servicios/${service}-${brand}`,
        lastmod: today,
        changefreq: "monthly",
        priority: 0.7,
        category: "services",
      });
    }
  }
  return urls;
}

function collectLocalPages(today: string): SitemapUrl[] {
  return CITY_SLUGS.map((c) => ({
    loc: `${BASE_URL}/taller-electricos-${c}`,
    lastmod: today,
    changefreq: "monthly",
    priority: 0.8,
    category: "local",
  }));
}

function collectProgrammaticPages(today: string): SitemapUrl[] {
  const urls: SitemapUrl[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const brand of BRAND_SLUGS) {
      for (const city of CITY_SLUGS) {
        urls.push({
          loc: `${BASE_URL}/servicios/${service}-${brand}-${city}`,
          lastmod: today,
          changefreq: "monthly",
          priority: 0.5,
          category: "local-services",
        });
      }
    }
  }
  return urls;
}

async function collectVehicles(today: string): Promise<SitemapUrl[]> {
  try {
    const vehicles = await storage.getVehicles();
    return vehicles
      .filter((v) => v.slug)
      .map((v) => ({
        loc: `${BASE_URL}/vehiculos/${v.vehicleType === "hibrido" ? "hibridos" : "electricos"}/${v.slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: 0.8,
        category: "vehicles",
      }));
  } catch (e) {
    console.error("[sitemap] vehicles fetch error:", e instanceof Error ? e.message : e);
    return [];
  }
}

async function collectFaqs(today: string): Promise<SitemapUrl[]> {
  try {
    const [categories, faqs] = await Promise.all([storage.getFaqCategories(), storage.getFaqs()]);
    const catMap = new Map<string, string>();
    for (const cat of categories) {
      if ((cat as any).id) catMap.set((cat as any).id, cat.slug);
    }

    const urls: SitemapUrl[] = [];
    for (const cat of categories) {
      if (!cat.slug) continue;
      urls.push({
        loc: `${BASE_URL}/preguntas/${cat.slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: 0.7,
        category: "faqs",
      });
    }
    for (const faq of faqs) {
      if (!faq.published || !faq.slug) continue;
      const catSlug = catMap.get(faq.categoryId);
      if (!catSlug) continue;
      urls.push({
        loc: `${BASE_URL}/preguntas/${catSlug}/${faq.slug}`,
        lastmod: today,
        changefreq: "monthly",
        priority: 0.6,
        category: "faqs",
      });
    }
    return urls;
  } catch (e) {
    console.error("[sitemap] faqs fetch error:", e instanceof Error ? e.message : e);
    return [];
  }
}

async function collectEditorial(): Promise<SitemapUrl[]> {
  try {
    const articles = await storage.getPublishedEditorial();
    return articles.map((a) => ({
      loc: `${BASE_URL}/${EDITORIAL_TYPE_TO_PATH[a.type] || "novedades"}/${a.slug}`,
      lastmod: toDateStr(a.updatedAt || a.publishedAt),
      changefreq: "weekly",
      priority: 0.7,
      category: "editorial",
    }));
  } catch (e) {
    console.error("[sitemap] editorial fetch error:", e instanceof Error ? e.message : e);
    return [];
  }
}

function collectGrowthPages(today: string): SitemapUrl[] {
  const engine = getGrowthEngine();
  if (!engine) return [];

  try {
    const configs = engine.getAllGrowthSlugs();
    return configs.map((c: { type: string; canonicalUrl: string; routePath: string }) => ({
      loc: c.canonicalUrl,
      lastmod: today,
      changefreq: "monthly",
      priority: c.type === "sub-service-brand" ? 0.6 : c.type === "problem-brand" ? 0.6 : 0.4,
      category: c.type === "sub-service-brand" ? "growth-services" : "growth-problems",
    }));
  } catch (e) {
    console.error("[sitemap] growth pages error:", e instanceof Error ? e.message : e);
    return [];
  }
}

async function buildRegistry(): Promise<SitemapRegistry> {
  if (cachedRegistry && Date.now() - cachedRegistry.generatedAt < CACHE_TTL_MS) {
    return cachedRegistry;
  }

  const today = getToday();

  const [vehicleUrls, faqUrls, editorialUrls] = await Promise.all([
    collectVehicles(today),
    collectFaqs(today),
    collectEditorial(),
  ]);

  const growthUrls = collectGrowthPages(today);

  const allUrls: SitemapUrl[] = [
    ...collectStaticPages(today),
    ...collectBrandsPillar(today),
    ...collectServicesPillar(today),
    ...collectServiceBrandCombinations(today),
    ...collectLocalPages(today),
    ...collectProgrammaticPages(today),
    ...vehicleUrls,
    ...faqUrls,
    ...editorialUrls,
    ...growthUrls,
  ];

  const byCategory = new Map<string, SitemapUrl[]>();
  for (const url of allUrls) {
    if (!byCategory.has(url.category)) byCategory.set(url.category, []);
    byCategory.get(url.category)!.push(url);
  }

  const sitemapFiles: { name: string; urls: SitemapUrl[] }[] = [];

  const categoryOrder = [
    "pages",
    "vehicles",
    "faqs",
    "brands",
    "services-pillar",
    "services",
    "local",
    "local-services",
    "editorial",
    "growth-services",
    "growth-problems",
  ];

  for (const cat of categoryOrder) {
    const catUrls = byCategory.get(cat);
    if (!catUrls || catUrls.length === 0) continue;

    if (catUrls.length <= MAX_URLS_PER_SITEMAP) {
      sitemapFiles.push({ name: `sitemap-${cat}.xml`, urls: catUrls });
    } else {
      const chunks = Math.ceil(catUrls.length / MAX_URLS_PER_SITEMAP);
      for (let i = 0; i < chunks; i++) {
        const slice = catUrls.slice(i * MAX_URLS_PER_SITEMAP, (i + 1) * MAX_URLS_PER_SITEMAP);
        sitemapFiles.push({ name: `sitemap-${cat}-${i + 1}.xml`, urls: slice });
      }
    }
  }

  const stats: Record<string, number> = {};
  for (const [cat, urls] of byCategory) {
    stats[cat] = urls.length;
  }
  stats["_total"] = allUrls.length;
  stats["_sitemapFiles"] = sitemapFiles.length;

  console.log(`[sitemap] Registry built: ${allUrls.length} URLs across ${sitemapFiles.length} sitemaps`);
  for (const [cat, count] of Object.entries(stats)) {
    if (!cat.startsWith("_")) console.log(`  ${cat}: ${count} URLs`);
  }

  cachedRegistry = { urls: allUrls, byCategory, sitemapFiles, generatedAt: Date.now(), stats };
  return cachedRegistry;
}

function buildUrlset(urls: SitemapUrl[]): string {
  let xml = xmlHeader();
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const u of urls) {
    xml += urlEntry(u);
  }
  xml += "</urlset>";
  return xml;
}

function buildSitemapIndex(files: { name: string }[], today: string): string {
  let xml = xmlHeader();
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const f of files) {
    xml += sitemapIndexEntry(`${BASE_URL}/${f.name}`, today);
  }
  xml += "</sitemapindex>";
  return xml;
}

async function buildImageSitemap(): Promise<string> {
  const today = getToday();
  let xml = xmlHeader();
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
  try {
    const vehicles = await storage.getVehicles();
    for (const v of vehicles) {
      if (!v.slug) continue;
      const path = `/vehiculos/${v.vehicleType === "hibrido" ? "hibridos" : "electricos"}/${v.slug}`;
      const imageUrl = v.imageUrl;
      const galleryUrls: string[] = v.galleryUrls || [];
      const allImages = [imageUrl, ...galleryUrls].filter(Boolean) as string[];
      if (allImages.length === 0) continue;
      xml += `  <url>\n    <loc>${escapeXml(BASE_URL + path)}</loc>\n    <lastmod>${today}</lastmod>\n`;
      for (const img of allImages.slice(0, 5)) {
        const fullImg = img.startsWith("http") ? img : `${BASE_URL}${img}`;
        xml += `    <image:image>\n      <image:loc>${escapeXml(fullImg)}</image:loc>\n      <image:title>${escapeXml(v.model || "")}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }
  } catch (e) {
    console.error("[sitemap] image sitemap error:", e instanceof Error ? e.message : e);
  }
  xml += "</urlset>";
  return xml;
}

export function registerSitemapRoutes(app: Express): void {
  app.get("/sitemap.xml", async (_req, res) => {
    try {
      const registry = await buildRegistry();
      const today = getToday();
      const indexFiles = [
        ...registry.sitemapFiles,
        { name: "sitemap-images.xml" },
      ];
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
      res.send(buildSitemapIndex(indexFiles, today));
    } catch (e) {
      console.error("[sitemap] index error:", e);
      res.status(500).set("Content-Type", "application/xml; charset=utf-8");
      res.send(xmlHeader() + '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</sitemapindex>');
    }
  });

  app.get("/sitemap-images.xml", async (_req, res) => {
    try {
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
      res.send(await buildImageSitemap());
    } catch (e) {
      console.error("[sitemap] images error:", e);
      res.status(500).set("Content-Type", "application/xml; charset=utf-8");
      res.send(xmlHeader() + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>');
    }
  });

  app.get("/sitemap-:segment.xml", async (req, res) => {
    try {
      const segment = req.params.segment;
      const registry = await buildRegistry();
      const fileName = `sitemap-${segment}.xml`;

      const file = registry.sitemapFiles.find((f) => f.name === fileName);
      if (!file) {
        const legacyMap: Record<string, string> = {
          "brands-pillar": "brands",
          "services-pillar": "services-pillar",
          "local-services": "local-services",
        };
        const mappedName = legacyMap[segment];
        const fallback = mappedName
          ? registry.sitemapFiles.find((f) => f.name === `sitemap-${mappedName}.xml`)
          : null;

        if (!fallback) {
          res.status(404).set("Content-Type", "application/xml; charset=utf-8");
          res.send(xmlHeader() + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>');
          return;
        }
        res.set("Content-Type", "application/xml; charset=utf-8");
        res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
        res.send(buildUrlset(fallback.urls));
        return;
      }

      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");
      res.send(buildUrlset(file.urls));
    } catch (e) {
      console.error(`[sitemap] segment error:`, e);
      res.status(500).set("Content-Type", "application/xml; charset=utf-8");
      res.send(xmlHeader() + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>');
    }
  });

  app.get("/api/admin/sitemap-stats", async (_req, res) => {
    try {
      const registry = await buildRegistry();
      const engine = getGrowthEngine();
      const growthStats = engine ? engine.getGrowthStats() : null;

      res.json({
        totalUrls: registry.stats["_total"],
        sitemapFiles: registry.sitemapFiles.map((f) => ({ name: f.name, urls: f.urls.length })),
        categories: Object.fromEntries(
          Object.entries(registry.stats).filter(([k]) => !k.startsWith("_")),
        ),
        generatedAt: new Date(registry.generatedAt).toISOString(),
        maxUrlsPerSitemap: MAX_URLS_PER_SITEMAP,
        growth: growthStats,
      });
    } catch (e) {
      res.status(500).json({ error: "Failed to build sitemap registry" });
    }
  });

  app.get("/api/admin/seo-growth-report", (_req, res) => {
    try {
      const engine = getGrowthEngine();
      if (!engine) {
        res.status(500).json({ error: "Growth engine not available" });
        return;
      }
      const report = engine.analyzeGrowthOpportunities();
      res.json(report);
    } catch (e) {
      res.status(500).json({ error: "Failed to generate growth report" });
    }
  });

  app.get("/api/admin/keyword-scan", (req, res) => {
    try {
      const keywordScanner = keywordScannerModule;
      const format = req.query.format as string;

      if (format === "csv") {
        const csv = keywordScanner.exportKeywordsCSV();
        res.setHeader("Content-Type", "text/csv; charset=utf-8");
        res.setHeader("Content-Disposition", "attachment; filename=keywords-scan.csv");
        res.send(csv);
        return;
      }

      const brand = req.query.brand as string;
      const service = req.query.service as string;
      const target = req.query.target as string;
      const gapsOnly = req.query.gaps === "true";

      let keywords;
      if (brand) {
        keywords = keywordScanner.getKeywordsByBrand(brand);
      } else if (service) {
        keywords = keywordScanner.getKeywordsByService(service);
      } else if (target) {
        keywords = keywordScanner.getKeywordsByTarget(target);
      } else if (gapsOnly) {
        keywords = keywordScanner.getKeywordGaps();
      } else {
        const report = keywordScanner.generateScanReport();
        res.json({
          totalKeywords: report.totalKeywords,
          byIntent: report.byIntent,
          byTarget: report.byTarget,
          byPriority: report.byPriority,
          coveredByExistingPages: report.coveredByExistingPages,
          gaps: report.gaps,
          topClusters: report.clusters.slice(0, 30).map((c: any) => ({
            head: c.head,
            totalKeywords: c.totalKeywords,
            avgPriority: c.avgPriority,
            topTarget: c.topTarget,
          })),
          topGaps: report.topGaps.slice(0, 30),
        });
        return;
      }

      res.json({
        count: keywords.length,
        keywords: keywords.slice(0, 200),
      });
    } catch (e) {
      console.error("[keyword-scan] Error:", e);
      res.status(500).json({ error: "Failed to scan keywords" });
    }
  });

  app.get("/api/admin/link-optimizer", (req, res) => {
    try {
      const path = req.query.path as string;

      if (!path) {
        const health = linkOptimizerModule.analyzeLinkHealth();
        res.json(health);
        return;
      }

      const plan = linkOptimizerModule.generateLinkPlan(path);
      res.json(plan);
    } catch (e) {
      console.error("[link-optimizer] Error:", e);
      res.status(500).json({ error: "Failed to generate link plan" });
    }
  });

  app.get("/api/admin/topical-authority", (req, res) => {
    try {
      const pillarId = req.query.pillar as string;
      const matrix = req.query.matrix as string;

      if (pillarId) {
        const detail = topicalAuthorityModule.getPillarDetail(pillarId);
        if (!detail) { res.status(404).json({ error: "Pillar not found" }); return; }
        res.json(detail);
        return;
      }

      if (matrix === "true") {
        const cells = topicalAuthorityModule.getCoverageMatrix();
        res.json({ matrix: cells, total: cells.length });
        return;
      }

      const summary = topicalAuthorityModule.getAuthoritySummary();
      res.json(summary);
    } catch (e) {
      console.error("[topical-authority] Error:", e);
      res.status(500).json({ error: "Failed to build topical authority" });
    }
  });

  app.get("/api/admin/entity-reinforcement", (req, res) => {
    try {
      const path = req.query.path as string;
      const catalog = req.query.catalog as string;

      if (path) {
        const plan = entityReinforcementModule.getPageEntityPlan(path);
        res.json(plan);
        return;
      }

      if (catalog === "true") {
        const entities = entityReinforcementModule.getEntityCatalog();
        res.json({ entities, total: entities.length });
        return;
      }

      const summary = entityReinforcementModule.getEntitySummary();
      res.json(summary);
    } catch (e) {
      console.error("[entity-reinforcement] Error:", e);
      res.status(500).json({ error: "Failed to generate entity reinforcement" });
    }
  });

  app.get("/api/admin/entity-reinforcement/report", (_req, res) => {
    try {
      const report = entityReinforcementModule.getEntityReinforcementReport();
      const { entityCatalog, samplePlans, ...summary } = report;
      res.json({
        ...summary,
        catalogSize: entityCatalog.length,
        samplePlansCount: samplePlans.length,
        samplePlans: samplePlans.slice(0, 5),
      });
    } catch (e) {
      console.error("[entity-reinforcement] Report error:", e);
      res.status(500).json({ error: "Failed to generate entity reinforcement report" });
    }
  });

  app.get("/api/admin/topic-expansion", (req, res) => {
    try {
      const category = req.query.category as string;
      const brand = req.query.brand as string;
      const service = req.query.service as string;

      if (category) {
        const topics = topicExpansionModule.getTopicsByCategory(category as any);
        res.json({ category, topics, total: topics.length });
        return;
      }

      if (brand) {
        const topics = topicExpansionModule.getTopicsByBrand(brand);
        res.json({ brand, topics: topics.slice(0, 50), total: topics.length });
        return;
      }

      if (service) {
        const topics = topicExpansionModule.getTopicsByService(service);
        res.json({ service, topics, total: topics.length });
        return;
      }

      const summary = topicExpansionModule.getExpansionSummary();
      res.json(summary);
    } catch (e) {
      console.error("[topic-expansion] Error:", e);
      res.status(500).json({ error: "Failed to generate topic expansion" });
    }
  });

  app.get("/api/admin/topic-expansion/report", (_req, res) => {
    try {
      const report = topicExpansionModule.getExpansionReport();
      const { topics, ...summary } = report;
      res.json({
        ...summary,
        topicsPreview: topics.slice(0, 30),
        totalTopicsInReport: topics.length,
      });
    } catch (e) {
      console.error("[topic-expansion] Report error:", e);
      res.status(500).json({ error: "Failed to generate expansion report" });
    }
  });

  app.get("/api/admin/search-intent", (req, res) => {
    try {
      const path = req.query.path as string;
      const keyword = req.query.keyword as string;
      const keywords = req.query.keywords as string;

      if (path) {
        const profile = searchIntentModule.getPageIntentProfile(path);
        res.json(profile);
        return;
      }

      if (keyword) {
        const result = searchIntentModule.classifyKeyword(keyword);
        res.json({ keyword, ...result });
        return;
      }

      if (keywords) {
        const kwList = keywords.split(",").map((k: string) => k.trim());
        const results = searchIntentModule.classifyKeywords(kwList);
        res.json({ keywords: results, total: results.length });
        return;
      }

      const summary = searchIntentModule.getIntentSummary();
      res.json(summary);
    } catch (e) {
      console.error("[search-intent] Error:", e);
      res.status(500).json({ error: "Failed to analyze search intent" });
    }
  });

  app.get("/api/admin/search-intent/report", (_req, res) => {
    try {
      const report = searchIntentModule.generateIntentReport();
      res.json(report);
    } catch (e) {
      console.error("[search-intent] Report error:", e);
      res.status(500).json({ error: "Failed to generate intent report" });
    }
  });

  app.get("/api/admin/topical-map", (req, res) => {
    try {
      const clusterId = req.query.cluster as string;
      const entityType = req.query.entityType as string;
      const entitySlug = req.query.entitySlug as string;

      if (clusterId) {
        const detail = topicalMapModule.getClusterDetail(clusterId);
        if (!detail) { res.status(404).json({ error: "Cluster not found" }); return; }
        res.json(detail);
        return;
      }

      if (entityType && entitySlug) {
        const nodes = topicalMapModule.getNodesByEntity(entityType as any, entitySlug);
        res.json({ entityType, entitySlug, nodes, total: nodes.length });
        return;
      }

      const summary = topicalMapModule.getTopicalMapSummary();
      res.json(summary);
    } catch (e) {
      console.error("[topical-map] Error:", e);
      res.status(500).json({ error: "Failed to generate topical map" });
    }
  });

  app.get("/api/admin/seo-analytics", (_req, res) => {
    try {
      const dashboard = seoAnalyticsModule.getDashboardData();
      res.json(dashboard);
    } catch (e) {
      console.error("[seo-analytics] Error:", e);
      res.status(500).json({ error: "Failed to generate SEO analytics" });
    }
  });

  app.get("/api/admin/seo-metrics", (_req, res) => {
    try {
      const metrics = seoAnalyticsModule.generateSEOMetrics();
      res.json(metrics);
    } catch (e) {
      console.error("[seo-metrics] Error:", e);
      res.status(500).json({ error: "Failed to generate SEO metrics" });
    }
  });

  app.get("/api/admin/seo-refresh", (req, res) => {
    try {
      const trigger = req.query.trigger as string;
      const entity = req.query.entity as string;
      const name = req.query.name as string;
      const path = req.query.path as string;
      const relatedServices = req.query.relatedServices as string;

      if (!trigger) {
        const status = refreshEngineModule.getRefreshStatus();
        res.json(status);
        return;
      }

      let result;
      switch (trigger) {
        case "new-page":
          if (!path) { res.status(400).json({ error: "path is required for new-page trigger" }); return; }
          result = refreshEngineModule.onNewPage(path);
          break;
        case "new-service":
          if (!entity || !name) { res.status(400).json({ error: "entity and name are required for new-service trigger" }); return; }
          result = refreshEngineModule.onNewService(entity, name);
          break;
        case "new-brand":
          if (!entity || !name) { res.status(400).json({ error: "entity and name are required for new-brand trigger" }); return; }
          result = refreshEngineModule.onNewBrand(entity, name);
          break;
        case "new-problem":
          if (!entity || !name) { res.status(400).json({ error: "entity and name are required for new-problem trigger" }); return; }
          result = refreshEngineModule.onNewProblem(entity, name, relatedServices ? relatedServices.split(",") : []);
          break;
        case "content-audit": {
          const paths = path ? path.split(",") : undefined;
          result = refreshEngineModule.runContentAudit(paths);
          break;
        }
        default:
          res.status(400).json({ error: `Unknown trigger: ${trigger}. Valid: new-page, new-service, new-brand, new-problem, content-audit` });
          return;
      }

      res.json(result);
    } catch (e) {
      console.error("[seo-refresh] Error:", e);
      res.status(500).json({ error: "Failed to run SEO refresh" });
    }
  });

  app.get("/api/admin/content-generator", (req, res) => {
    try {
      const slug = req.query.slug as string;

      if (!slug) {
        const stats = contentGeneratorModule.getContentStats();
        res.json(stats);
        return;
      }

      const content = contentGeneratorModule.generateContent(slug);
      if (!content) {
        res.status(404).json({ error: "No content could be generated for this slug" });
        return;
      }
      res.json(content);
    } catch (e) {
      console.error("[content-generator] Error:", e);
      res.status(500).json({ error: "Failed to generate content" });
    }
  });

  app.get("/api/admin/ai-search", (req, res) => {
    try {
      const slug = req.query.slug as string;
      const format = req.query.format as string;
      if (format === "llms-txt") { res.type("text/plain").send(aiSearchModule.generateLLMsTxt()); return; }
      if (format === "ai-hints") { res.json(aiSearchModule.generateAIHints()); return; }
      if (slug) {
        const profile = aiSearchModule.generateAIProfile(slug);
        if (!profile) { res.status(404).json({ error: "No AI profile for this slug" }); return; }
        res.json(profile); return;
      }
      res.json(aiSearchModule.getAISiteProfile());
    } catch (e) {
      console.error("[ai-search] Error:", e);
      res.status(500).json({ error: "Failed to generate AI search profile" });
    }
  });

  app.get("/api/admin/snippet-optimizer", (req, res) => {
    try {
      const slug = req.query.slug as string;
      const problem = req.query.problem as string;
      const brand = req.query.brand as string;
      if (slug) {
        const profile = snippetOptimizerModule.generateSnippetProfile(slug);
        if (!profile) { res.status(404).json({ error: "No snippet profile" }); return; }
        res.json(profile); return;
      }
      if (problem && brand) {
        const blocks = snippetOptimizerModule.generateProblemSnippet(problem, brand);
        res.json({ blocks, total: blocks.length }); return;
      }
      const size = parseInt(req.query.size as string) || 50;
      res.json(snippetOptimizerModule.getSnippetSiteReport(size));
    } catch (e) {
      console.error("[snippet-optimizer] Error:", e);
      res.status(500).json({ error: "Failed to optimize snippets" });
    }
  });

  app.get("/api/admin/knowledge-graph", (req, res) => {
    try {
      const entityId = req.query.entity as string;
      const path = req.query.path as string;
      if (entityId) {
        const result = knowledgeGraphModule.queryEntity(entityId);
        if (!result) { res.status(404).json({ error: "Entity not found in graph" }); return; }
        res.json(result); return;
      }
      if (path) {
        const links = knowledgeGraphModule.getInternalLinksFromGraph(path);
        res.json({ path, links, total: links.length }); return;
      }
      res.json(knowledgeGraphModule.getKGSiteReport());
    } catch (e) {
      console.error("[knowledge-graph] Error:", e);
      res.status(500).json({ error: "Failed to build knowledge graph" });
    }
  });

  app.get("/api/admin/seo-expansion", (req, res) => {
    try {
      const slug = req.query.slug as string;
      const sitemap = req.query.sitemap as string;
      if (slug) {
        const spec = expansionEngineModule.generateExpansionPage(slug);
        if (!spec) { res.status(404).json({ error: "No expansion spec for this slug" }); return; }
        res.json(spec); return;
      }
      if (sitemap === "true") {
        const entries = expansionEngineModule.getSitemapExpansion();
        res.json({ entries, total: entries.length }); return;
      }
      res.json(expansionEngineModule.getExpansionReport());
    } catch (e) {
      console.error("[seo-expansion] Error:", e);
      res.status(500).json({ error: "Failed to expand SEO" });
    }
  });

  app.get("/api/admin/autonomous-seo/status", (_req, res) => {
    try {
      res.json(autonomousSeoModule.getFullSystemStatus());
    } catch (e) {
      console.error("[autonomous-seo] Status error:", e);
      res.status(500).json({ error: "Failed to get autonomous system status" });
    }
  });

  app.post("/api/admin/autonomous-seo/run-cycle", (_req, res) => {
    try {
      const cycle = autonomousSeoModule.runExpansionCycle();
      res.json(cycle);
    } catch (e) {
      console.error("[autonomous-seo] Cycle error:", e);
      res.status(500).json({ error: "Failed to run expansion cycle" });
    }
  });

  app.get("/api/admin/autonomous-seo/page", (req, res) => {
    try {
      const slug = req.query.slug as string;
      if (!slug) { res.status(400).json({ error: "slug is required" }); return; }
      const result = autonomousSeoModule.generateSinglePage(slug);
      res.json(result);
    } catch (e) {
      console.error("[autonomous-seo] Page error:", e);
      res.status(500).json({ error: "Failed to generate page" });
    }
  });

  app.get("/llms.txt", (_req, res) => {
    try {
      res.type("text/plain").send(aiSearchModule.generateLLMsTxt());
    } catch (e) {
      res.status(500).send("Error generating llms.txt");
    }
  });

  app.get("/ai-hints.json", (_req, res) => {
    try {
      res.json(aiSearchModule.generateAIHints());
    } catch (e) {
      res.status(500).json({ error: "Error generating ai-hints.json" });
    }
  });

  app.get("/api/admin/seo-system/status", (_req, res) => {
    try {
      const status = seoSystem.getSystemStatus();
      res.json(status);
    } catch (e) {
      console.error("[seo-system] Status error:", e);
      res.status(500).json({ error: "Failed to get system status" });
    }
  });

  app.get("/api/admin/seo-system/expansion-plan", (_req, res) => {
    try {
      const plan = seoSystem.generateAutoExpansionPlan();
      res.json(plan);
    } catch (e) {
      console.error("[seo-system] Expansion plan error:", e);
      res.status(500).json({ error: "Failed to generate expansion plan" });
    }
  });

  app.post("/api/admin/seo-system/event", (req, res) => {
    try {
      const { type, payload } = req.body as { type: seoSystem.EventType; payload: Record<string, string> };
      if (!type) { res.status(400).json({ error: "type is required" }); return; }
      const result = seoSystem.simulateEvent(type, payload || {});
      res.json(result);
    } catch (e) {
      console.error("[seo-system] Event error:", e);
      res.status(500).json({ error: "Failed to process SEO event" });
    }
  });

  app.get("/api/admin/seo-system/simulate", (req, res) => {
    try {
      const type = (req.query.type as seoSystem.EventType) || "full-rebuild";
      const payload: Record<string, string> = {};
      for (const [k, v] of Object.entries(req.query)) {
        if (k !== "type" && typeof v === "string") payload[k] = v;
      }
      const result = seoSystem.simulateEvent(type, payload);
      res.json(result);
    } catch (e) {
      console.error("[seo-system] Simulate error:", e);
      res.status(500).json({ error: "Failed to simulate SEO event" });
    }
  });
}
