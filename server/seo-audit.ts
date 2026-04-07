import { storage } from "./storage";

const EDITORIAL_TYPE_TO_PATH: Record<string, string> = {
  novedad: "novedades",
  guia: "guias",
  comparativa: "comparativas",
  consejo: "consejos",
};

export interface SeoIssue {
  path: string;
  severity: "critical" | "warning" | "info";
  category: string;
  message: string;
}

export interface SeoAuditResult {
  timestamp: string;
  totalPages: number;
  totalIssues: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  issues: SeoIssue[];
  categorySummary: Record<string, number>;
  pagesWithoutIssues: number;
}

async function getAllSitemapPaths(): Promise<Set<string>> {
  const paths = new Set<string>();

  const staticPages = [
    "/", "/promociones-electricos", "/promociones-hibridos", "/autoplus",
    "/postventa", "/preguntas", "/concesionarios", "/electrificacion",
    "/conductores-adopcion", "/novedades", "/guias", "/comparativas", "/consejos",
  ];
  staticPages.forEach(p => paths.add(p));

  try {
    const brands = await storage.getBrands();
    for (const b of brands) {
      if (b.slug) paths.add(`/marcas/${b.slug}`);
    }
  } catch {}

  const brandSlugs = ["volkswagen", "audi", "skoda", "cupra", "seat", "tesla", "byd", "hyundai", "bmw", "mercedes-benz", "kia", "volvo", "peugeot", "renault"];
  brandSlugs.forEach(b => paths.add(`/marcas/${b}`));

  try {
    const vehicles = await storage.getVehicles();
    for (const v of vehicles) {
      if (!v.slug) continue;
      const type = v.vehicleType === "hibrido" ? "hibridos" : "electricos";
      paths.add(`/vehiculos/${type}/${v.slug}`);
    }
  } catch {}

  try {
    const faqCats = await storage.getFaqCategories();
    const faqs = await storage.getFaqs();
    const catMap = new Map<string, string>();
    for (const c of faqCats) {
      if ((c as any).id && c.slug) {
        catMap.set((c as any).id, c.slug);
        paths.add(`/preguntas/${c.slug}`);
      }
    }
    for (const f of faqs) {
      if (!f.published || !f.slug) continue;
      const catSlug = catMap.get(f.categoryId);
      if (catSlug) paths.add(`/preguntas/${catSlug}/${f.slug}`);
    }
  } catch {}

  const services = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"];
  services.forEach(s => paths.add(`/servicios/${s}`));
  for (const s of services) {
    for (const b of brandSlugs) {
      paths.add(`/servicios/${s}-${b}`);
    }
  }

  const cities = ["sevilla", "dos-hermanas", "huelva", "cordoba", "badajoz", "caceres"];
  cities.forEach(c => paths.add(`/taller-electricos-${c}`));

  try {
    const editorial = await storage.getPublishedEditorial();
    for (const a of editorial) {
      const prefix = EDITORIAL_TYPE_TO_PATH[a.type] || "novedades";
      paths.add(`/${prefix}/${a.slug}`);
    }
  } catch {}

  return paths;
}

function getAllCrawlablePaths(): string[] {
  const staticPages = [
    "/", "/promociones-electricos", "/promociones-hibridos", "/autoplus",
    "/postventa", "/preguntas", "/concesionarios", "/electrificacion",
    "/conductores-adopcion", "/novedades", "/guias", "/comparativas", "/consejos",
  ];

  const brandSlugs = ["volkswagen", "audi", "skoda", "cupra", "seat", "tesla", "byd", "hyundai", "bmw", "mercedes-benz", "kia", "volvo", "peugeot", "renault"];
  const services = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"];
  const cities = ["sevilla", "dos-hermanas", "huelva", "cordoba", "badajoz", "caceres"];

  const pages = [...staticPages];

  brandSlugs.forEach(b => pages.push(`/marcas/${b}`));
  services.forEach(s => pages.push(`/servicios/${s}`));
  cities.forEach(c => pages.push(`/taller-electricos-${c}`));

  for (const s of services) {
    for (const b of brandSlugs) {
      pages.push(`/servicios/${s}-${b}`);
    }
  }

  return pages;
}

function analyzeHtml(path: string, html: string): SeoIssue[] {
  const issues: SeoIssue[] = [];

  const htmlWithoutNoscript = html.replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const h1Regex = /<h1[^>]*>/gi;
  const h1Tags: string[] = [];
  let h1m;
  while ((h1m = h1Regex.exec(htmlWithoutNoscript)) !== null) {
    h1Tags.push(h1m[0]);
  }
  if (h1Tags.length === 0) {
    issues.push({ path, severity: "critical", category: "h1", message: "Página sin H1" });
  } else if (h1Tags.length > 1) {
    const srOnlyCount = h1Tags.filter(t => /sr-only|visually-hidden|clip-rect/i.test(t)).length;
    const visibleH1s = h1Tags.length - srOnlyCount;
    if (visibleH1s > 1) {
      issues.push({ path, severity: "warning", category: "h1-multiple", message: `Múltiples H1 visibles detectados (${visibleH1s})` });
    }
  }

  const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
  if (!titleMatch || !titleMatch[1]?.trim()) {
    issues.push({ path, severity: "critical", category: "title", message: "Sin etiqueta <title>" });
  } else {
    const titleText = titleMatch[1].trim();
    if (titleText.length > 70) {
      issues.push({ path, severity: "warning", category: "title-length", message: `Title demasiado largo (${titleText.length} chars)` });
    }
    if (titleText.length < 10) {
      issues.push({ path, severity: "warning", category: "title-length", message: `Title demasiado corto (${titleText.length} chars)` });
    }
  }

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/is)
    || html.match(/<meta\s+content=["'](.*?)["']\s+name=["']description["']/is);
  if (!descMatch || !descMatch[1]?.trim()) {
    issues.push({ path, severity: "critical", category: "meta-description", message: "Sin meta description" });
  } else {
    const descText = descMatch[1].trim();
    if (descText.length > 160) {
      issues.push({ path, severity: "warning", category: "meta-description-length", message: `Meta description demasiado larga (${descText.length} chars)` });
    }
    if (descText.length < 50) {
      issues.push({ path, severity: "warning", category: "meta-description-length", message: `Meta description demasiado corta (${descText.length} chars)` });
    }
  }

  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*>/i);
  if (!canonicalMatch) {
    issues.push({ path, severity: "warning", category: "canonical", message: "Sin etiqueta canonical" });
  }

  const schemaMatch = html.match(/<script\s+type=["']application\/ld\+json["']/i);
  if (!schemaMatch) {
    issues.push({ path, severity: "critical", category: "schema", message: "Sin JSON-LD schema" });
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const bodyContent = bodyMatch[1];
    const textContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (textContent.length < 100) {
      issues.push({ path, severity: "critical", category: "ssr-content", message: `Contenido SSR insuficiente (${textContent.length} chars de texto)` });
    }
  }

  const imgRegex = /<img\s+[^>]*>/gi;
  let imgMatch;
  let imgCount = 0;
  let missingAlt = 0;
  while ((imgMatch = imgRegex.exec(html)) !== null) {
    imgCount++;
    const tag = imgMatch[0];
    if (!/\balt\s*=/i.test(tag)) {
      missingAlt++;
    } else {
      const altMatch = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
      if (altMatch && altMatch[1].trim() === "") {
        const isDecorative = /\brole\s*=\s*["']presentation["']/i.test(tag)
          || /\baria-hidden\s*=\s*["']true["']/i.test(tag);
        if (!isDecorative) {
          missingAlt++;
        }
      }
    }
  }
  if (missingAlt > 0) {
    issues.push({ path, severity: "warning", category: "img-alt", message: `${missingAlt} de ${imgCount} imágenes sin alt text` });
  }

  const ogTitle = html.match(/<meta\s+[^>]*property=["']og:title["']/i);
  const ogDesc = html.match(/<meta\s+[^>]*property=["']og:description["']/i);
  if (!ogTitle || !ogDesc) {
    issues.push({ path, severity: "info", category: "og-tags", message: "Faltan Open Graph tags (og:title/og:description)" });
  }

  return issues;
}

function extractInternalLinks(html: string): string[] {
  const links: string[] = [];
  const hrefRegex = /href=["'](\/[^"'#?]*)/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];
    if (href.startsWith("/api/") || href.startsWith("/admin/")
      || href.startsWith("/_next/") || href.startsWith("/confirmacion-")
      || href === "/favicon.ico") continue;
    links.push(href);
  }
  return [...new Set(links)];
}

export async function runSeoAudit(baseUrl: string, options?: { maxPages?: number; sampleDynamic?: number }): Promise<SeoAuditResult> {
  const maxPages = options?.maxPages || 50;
  const sampleDynamic = options?.sampleDynamic || 5;

  const sitemapPaths = await getAllSitemapPaths();
  const staticPaths = getAllCrawlablePaths();

  let dynamicPaths: string[] = [];
  try {
    const vehicles = await storage.getVehicles();
    for (const v of vehicles.slice(0, sampleDynamic)) {
      if (!v.slug) continue;
      const type = v.vehicleType === "hibrido" ? "hibridos" : "electricos";
      dynamicPaths.push(`/vehiculos/${type}/${v.slug}`);
    }
  } catch {}

  try {
    const editorial = await storage.getPublishedEditorial();
    for (const a of editorial.slice(0, sampleDynamic)) {
      const prefix = EDITORIAL_TYPE_TO_PATH[a.type] || "novedades";
      dynamicPaths.push(`/${prefix}/${a.slug}`);
    }
  } catch {}

  try {
    const faqCats = await storage.getFaqCategories();
    const faqs = await storage.getFaqs();
    const catMap = new Map<string, string>();
    for (const c of faqCats) {
      if ((c as any).id && c.slug) catMap.set((c as any).id, c.slug);
    }
    const publishedFaqs = faqs.filter(f => f.published && f.slug);
    for (const f of publishedFaqs.slice(0, sampleDynamic)) {
      const catSlug = catMap.get(f.categoryId);
      if (catSlug) dynamicPaths.push(`/preguntas/${catSlug}/${f.slug}`);
    }
  } catch {}

  const staticQuota = Math.min(staticPaths.length, Math.floor(maxPages * 0.7));
  const dynamicQuota = maxPages - staticQuota;
  const selectedStatic = staticPaths.slice(0, staticQuota);
  const selectedDynamic = dynamicPaths.slice(0, dynamicQuota);
  const allPaths = [...new Set([...selectedStatic, ...selectedDynamic])];

  const issues: SeoIssue[] = [];
  const allInternalLinks = new Set<string>();
  const crawledPaths = new Set<string>();
  let pagesWithoutIssues = 0;

  for (const path of allPaths) {
    try {
      const response = await fetch(`${baseUrl}${path}`, {
        headers: { "User-Agent": "GrupoAvisa-SEO-Auditor/1.0" },
        redirect: "follow",
      });

      if (!response.ok) {
        issues.push({
          path,
          severity: "critical",
          category: "http-error",
          message: `HTTP ${response.status} ${response.statusText}`,
        });
        continue;
      }

      const html = await response.text();
      crawledPaths.add(path);

      const pageIssues = analyzeHtml(path, html);

      if (!sitemapPaths.has(path)) {
        const isNoindex = /<meta[^>]*noindex/i.test(html);
        if (!isNoindex) {
          pageIssues.push({
            path,
            severity: "warning",
            category: "sitemap",
            message: "Página indexable no incluida en sitemap",
          });
        }
      }

      const links = extractInternalLinks(html);
      links.forEach(l => allInternalLinks.add(l));

      if (pageIssues.length === 0) {
        pagesWithoutIssues++;
      }
      issues.push(...pageIssues);
    } catch (err: any) {
      issues.push({
        path,
        severity: "critical",
        category: "fetch-error",
        message: `Error al rastrear: ${err.message}`,
      });
    }
  }

  const knownPaths = new Set([...allPaths, ...sitemapPaths]);
  const legalPages = ["/aviso-legal", "/terminos", "/politica-cookies", "/condiciones-uso", "/accesibilidad"];
  legalPages.forEach(p => knownPaths.add(p));
  ["/", "#"].forEach(p => knownPaths.add(p));

  for (const link of allInternalLinks) {
    const normalized = link.replace(/\/$/, "") || "/";
    if (!knownPaths.has(normalized)) {
      const isHashOrAnchor = link.startsWith("#") || link.includes("#");
      if (!isHashOrAnchor) {
        try {
          const response = await fetch(`${baseUrl}${normalized}`, {
            method: "HEAD",
            headers: { "User-Agent": "GrupoAvisa-SEO-Auditor/1.0" },
            redirect: "follow",
          });
          const isRedirect = [301, 302, 307, 308].includes(response.status);
          if (!response.ok && !isRedirect) {
            issues.push({
              path: normalized,
              severity: "critical",
              category: "broken-link",
              message: `Enlace interno roto (HTTP ${response.status})`,
            });
          }
        } catch {
          issues.push({
            path: normalized,
            severity: "warning",
            category: "broken-link",
            message: "Enlace interno no verificable",
          });
        }
      }
    }
  }

  const categorySummary: Record<string, number> = {};
  for (const issue of issues) {
    categorySummary[issue.category] = (categorySummary[issue.category] || 0) + 1;
  }

  return {
    timestamp: new Date().toISOString(),
    totalPages: crawledPaths.size,
    totalIssues: issues.length,
    criticalCount: issues.filter(i => i.severity === "critical").length,
    warningCount: issues.filter(i => i.severity === "warning").length,
    infoCount: issues.filter(i => i.severity === "info").length,
    issues: issues.sort((a, b) => {
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    }),
    categorySummary,
    pagesWithoutIssues,
  };
}
