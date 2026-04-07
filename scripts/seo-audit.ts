import http from "http";

const BASE_URL = "http://localhost:5000";
const PROD_DOMAIN = "https://electricos.grupoavisa.com";
const CONCURRENCY = 10;
const TIMEOUT_MS = 10000;

const SITEMAP_FILES = [
  "sitemap-pages.xml",
  "sitemap-brands-pillar.xml",
  "sitemap-services-pillar.xml",
  "sitemap-services.xml",
  "sitemap-local.xml",
  "sitemap-local-services.xml",
  "sitemap-editorial.xml",
  "sitemap-vehicles.xml",
  "sitemap-faqs.xml",
];

const NOINDEX_PREFIXES = [
  "/admin",
  "/api/",
  "/confirmacion-",
  "/aviso-legal",
  "/terminos",
  "/politica-cookies",
  "/condiciones-uso",
  "/accesibilidad",
];

interface PageAudit {
  url: string;
  status: number;
  h1Count: number;
  h1Texts: string[];
  hasTitle: boolean;
  title: string;
  hasDescription: boolean;
  description: string;
  hasCanonical: boolean;
  hasOgTitle: boolean;
  hasOgDescription: boolean;
  hasOgImage: boolean;
  hasJsonLd: boolean;
  jsonLdTypes: string[];
  imagesWithoutAlt: number;
  imgDetails: string[];
  internalLinks: string[];
  isNoindex: boolean;
  errors: string[];
}

interface AuditReport {
  totalPages: number;
  pagesAudited: number;
  pagesWithoutH1: PageAudit[];
  pagesMultipleH1: PageAudit[];
  pagesWithoutTitle: PageAudit[];
  pagesWithoutDescription: PageAudit[];
  pagesWithoutCanonical: PageAudit[];
  pagesWithoutOg: PageAudit[];
  pagesWithoutJsonLd: PageAudit[];
  imagesWithoutAlt: { url: string; count: number; details: string[] }[];
  brokenLinks: { source: string; target: string; status: number }[];
  pagesNotInSitemap: string[];
  sitemapPagesNotAccessible: { url: string; status: number }[];
  titleIssues: { url: string; title: string; issue: string }[];
  descriptionIssues: { url: string; description: string; issue: string }[];
  duplicateTitles: { title: string; urls: string[] }[];
  duplicateDescriptions: { desc: string; urls: string[] }[];
  orphanPages: string[];
}

function fetch(url: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Timeout: ${url}`)), TIMEOUT_MS);
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        clearTimeout(timeout);
        resolve({ status: res.statusCode || 0, body: data });
      });
      res.on("error", (e) => {
        clearTimeout(timeout);
        reject(e);
      });
    }).on("error", (e) => {
      clearTimeout(timeout);
      reject(e);
    });
  });
}

async function fetchWithRetry(url: string, retries = 2): Promise<{ status: number; body: string }> {
  for (let i = 0; i <= retries; i++) {
    try {
      return await fetch(url);
    } catch (e) {
      if (i === retries) return { status: 0, body: "" };
      await new Promise((r) => setTimeout(r, 500));
    }
  }
  return { status: 0, body: "" };
}

async function getSitemapUrls(): Promise<Set<string>> {
  const urls = new Set<string>();
  for (const file of SITEMAP_FILES) {
    try {
      const { body } = await fetch(`${BASE_URL}/${file}`);
      const matches = body.matchAll(/<loc>([^<]+)<\/loc>/g);
      for (const m of matches) {
        urls.add(m[1].replace(PROD_DOMAIN, ""));
      }
    } catch {
      console.error(`  ⚠ Could not fetch ${file}`);
    }
  }
  return urls;
}

function toLocalUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : "/" + path}`;
}

function isNoindexPath(path: string): boolean {
  return NOINDEX_PREFIXES.some((p) => path.startsWith(p));
}

function auditHtml(html: string, url: string): Omit<PageAudit, "url" | "status"> {
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const h1Texts = h1Matches.map((m) => m[1].replace(/<[^>]+>/g, "").trim());

  const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1].trim() : "";

  const canonicalMatch = html.match(/<link\s+rel=["']canonical["'][^>]*>/i);
  const ogTitleMatch = html.match(/<meta\s+property=["']og:title["']/i);
  const ogDescMatch = html.match(/<meta\s+property=["']og:description["']/i);
  const ogImageMatch = html.match(/<meta\s+property=["']og:image["']/i);

  const jsonLdBlocks = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const jsonLdTypes: string[] = [];
  for (const block of jsonLdBlocks) {
    try {
      const data = JSON.parse(block[1]);
      if (Array.isArray(data)) {
        data.forEach((item: Record<string, unknown>) => {
          if (item["@type"]) jsonLdTypes.push(String(item["@type"]));
        });
      } else if (data["@type"]) {
        jsonLdTypes.push(String(data["@type"]));
      }
    } catch {}
  }

  const imgMatches = [...html.matchAll(/<img\b([^>]*)>/gi)];
  const imgDetails: string[] = [];
  let imagesWithoutAlt = 0;
  for (const m of imgMatches) {
    const attrs = m[1];
    const hasAlt = /\balt\s*=\s*["'][^"']*["']/i.test(attrs);
    const isSvgData = /src=["']data:image\/svg/i.test(attrs);
    const isHidden = /aria-hidden=["']true["']/i.test(attrs) || /role=["']presentation["']/i.test(attrs);
    if (!hasAlt && !isSvgData && !isHidden) {
      imagesWithoutAlt++;
      const srcMatch = attrs.match(/src=["']([^"']+)["']/i);
      imgDetails.push(srcMatch ? srcMatch[1].substring(0, 100) : "(unknown src)");
    }
  }

  const internalLinks: string[] = [];
  const linkMatches = [...html.matchAll(/<a\s+[^>]*href=["']([^"'#]+)["'][^>]*>/gi)];
  for (const m of linkMatches) {
    const href = m[1];
    if (href.startsWith("/") && !href.startsWith("//")) {
      internalLinks.push(href.split("?")[0].split("#")[0]);
    } else if (href.startsWith(PROD_DOMAIN)) {
      const path = href.replace(PROD_DOMAIN, "").split("?")[0].split("#")[0];
      internalLinks.push(path || "/");
    }
  }

  const isNoindex = /noindex/i.test(
    html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] || ""
  );

  const errors: string[] = [];
  if (title.length > 70) errors.push(`Title too long (${title.length} chars, max 70)`);
  if (title.length > 0 && title.length < 20) errors.push(`Title too short (${title.length} chars)`);
  if (description.length > 160) errors.push(`Description too long (${description.length} chars, max 160)`);
  if (description.length > 0 && description.length < 50) errors.push(`Description too short (${description.length} chars)`);

  return {
    h1Count: h1Texts.length,
    h1Texts,
    hasTitle: title.length > 0,
    title,
    hasDescription: description.length > 0,
    description,
    hasCanonical: !!canonicalMatch,
    hasOgTitle: !!ogTitleMatch,
    hasOgDescription: !!ogDescMatch,
    hasOgImage: !!ogImageMatch,
    hasJsonLd: jsonLdTypes.length > 0,
    jsonLdTypes,
    imagesWithoutAlt,
    imgDetails,
    internalLinks: [...new Set(internalLinks)],
    isNoindex,
    errors,
  };
}

async function runInParallel<T>(items: T[], fn: (item: T) => Promise<void>, concurrency: number): Promise<void> {
  let index = 0;
  const workers = Array.from({ length: concurrency }, async () => {
    while (index < items.length) {
      const i = index++;
      await fn(items[i]);
    }
  });
  await Promise.all(workers);
}

async function discoverPages(sitemapPaths: Set<string>): Promise<string[]> {
  const knownPaths = new Set<string>(sitemapPaths);
  const staticRoutes = [
    "/",
    "/promociones-electricos",
    "/promociones-hibridos",
    "/postventa",
    "/concesionarios",
    "/preguntas",
    "/autoplus",
    "/electrificacion-vehiculo-electrico",
    "/sobre-nosotros",
    "/contacto",
    "/conductores",
  ];
  for (const r of staticRoutes) {
    knownPaths.add(r);
  }
  return [...knownPaths].sort();
}

function printSeparator(char = "─", len = 70) {
  console.log(char.repeat(len));
}

function printSection(title: string) {
  console.log();
  printSeparator("═");
  console.log(`  ${title}`);
  printSeparator("═");
}

async function main() {
  console.log();
  console.log("╔══════════════════════════════════════════════════════════════════════╗");
  console.log("║               🔍  SEO AUDIT REPORT — Grupo Avisa                   ║");
  console.log("╚══════════════════════════════════════════════════════════════════════╝");
  console.log();

  const startTime = Date.now();

  console.log("📡 Fetching sitemap URLs...");
  const sitemapPaths = await getSitemapUrls();
  console.log(`   Found ${sitemapPaths.size} URLs in sitemaps`);

  const allPaths = await discoverPages(sitemapPaths);
  const indexablePaths = allPaths.filter((p) => !isNoindexPath(p));
  console.log(`   Total pages to audit: ${indexablePaths.length}`);
  console.log();

  const audits: Map<string, PageAudit> = new Map();
  let progress = 0;

  console.log("🔎 Auditing pages...");
  await runInParallel(
    indexablePaths,
    async (path) => {
      try {
        const { status, body } = await fetchWithRetry(toLocalUrl(path));
        const audit = auditHtml(body, path);
        audits.set(path, { url: path, status, ...audit });
      } catch (e) {
        audits.set(path, {
          url: path,
          status: 0,
          h1Count: 0,
          h1Texts: [],
          hasTitle: false,
          title: "",
          hasDescription: false,
          description: "",
          hasCanonical: false,
          hasOgTitle: false,
          hasOgDescription: false,
          hasOgImage: false,
          hasJsonLd: false,
          jsonLdTypes: [],
          imagesWithoutAlt: 0,
          imgDetails: [],
          internalLinks: [],
          isNoindex: false,
          errors: [`Fetch error: ${e}`],
        });
      }
      progress++;
      if (progress % 25 === 0 || progress === indexablePaths.length) {
        process.stdout.write(`   Progress: ${progress}/${indexablePaths.length}\r`);
      }
    },
    CONCURRENCY,
  );
  console.log();

  const report: AuditReport = {
    totalPages: indexablePaths.length,
    pagesAudited: audits.size,
    pagesWithoutH1: [],
    pagesMultipleH1: [],
    pagesWithoutTitle: [],
    pagesWithoutDescription: [],
    pagesWithoutCanonical: [],
    pagesWithoutOg: [],
    pagesWithoutJsonLd: [],
    imagesWithoutAlt: [],
    brokenLinks: [],
    pagesNotInSitemap: [],
    sitemapPagesNotAccessible: [],
    titleIssues: [],
    descriptionIssues: [],
    duplicateTitles: [],
    duplicateDescriptions: [],
    orphanPages: [],
  };

  const allLinkedPages = new Set<string>();
  const titleMap = new Map<string, string[]>();
  const descMap = new Map<string, string[]>();

  for (const [path, audit] of audits) {
    if (audit.status !== 200) continue;
    if (audit.isNoindex) continue;

    if (audit.h1Count === 0) report.pagesWithoutH1.push(audit);
    if (audit.h1Count > 1) report.pagesMultipleH1.push(audit);
    if (!audit.hasTitle) report.pagesWithoutTitle.push(audit);
    if (!audit.hasDescription) report.pagesWithoutDescription.push(audit);
    if (!audit.hasCanonical) report.pagesWithoutCanonical.push(audit);
    if (!audit.hasOgTitle || !audit.hasOgDescription || !audit.hasOgImage) report.pagesWithoutOg.push(audit);
    if (!audit.hasJsonLd) report.pagesWithoutJsonLd.push(audit);
    if (audit.imagesWithoutAlt > 0)
      report.imagesWithoutAlt.push({ url: path, count: audit.imagesWithoutAlt, details: audit.imgDetails });

    for (const err of audit.errors) {
      if (err.startsWith("Title")) report.titleIssues.push({ url: path, title: audit.title, issue: err });
      if (err.startsWith("Description"))
        report.descriptionIssues.push({ url: path, description: audit.description, issue: err });
    }

    if (audit.title) {
      const key = audit.title.toLowerCase().trim();
      if (!titleMap.has(key)) titleMap.set(key, []);
      titleMap.get(key)!.push(path);
    }
    if (audit.description) {
      const key = audit.description.toLowerCase().trim();
      if (!descMap.has(key)) descMap.set(key, []);
      descMap.get(key)!.push(path);
    }

    for (const link of audit.internalLinks) {
      allLinkedPages.add(link);
    }
  }

  for (const [title, urls] of titleMap) {
    if (urls.length > 1) report.duplicateTitles.push({ title, urls });
  }
  for (const [desc, urls] of descMap) {
    if (urls.length > 1) report.duplicateDescriptions.push({ desc: desc.substring(0, 80) + "...", urls });
  }

  console.log("🔗 Checking internal links for broken references...");
  const checkedLinks = new Set<string>();
  const linksToCheck: { source: string; target: string }[] = [];

  for (const [path, audit] of audits) {
    if (audit.status !== 200) continue;
    for (const link of audit.internalLinks) {
      if (!checkedLinks.has(link) && !link.startsWith("/api/") && !link.startsWith("/admin")) {
        checkedLinks.add(link);
        linksToCheck.push({ source: path, target: link });
      }
    }
  }

  const linkSample = linksToCheck.slice(0, 200);
  await runInParallel(
    linkSample,
    async ({ source, target }) => {
      try {
        const { status } = await fetchWithRetry(toLocalUrl(target), 1);
        if (status >= 400 || status === 0) {
          report.brokenLinks.push({ source, target, status });
        }
      } catch {
        report.brokenLinks.push({ source, target, status: 0 });
      }
    },
    CONCURRENCY,
  );

  for (const [path, audit] of audits) {
    if (audit.status === 200 && !audit.isNoindex && !sitemapPaths.has(path) && !isNoindexPath(path)) {
      report.pagesNotInSitemap.push(path);
    }
  }

  for (const sitemapPath of sitemapPaths) {
    const audit = audits.get(sitemapPath);
    if (audit && audit.status !== 200) {
      report.sitemapPagesNotAccessible.push({ url: sitemapPath, status: audit.status });
    }
  }

  for (const [path, audit] of audits) {
    if (audit.status === 200 && !audit.isNoindex && !allLinkedPages.has(path) && path !== "/") {
      report.orphanPages.push(path);
    }
  }

  printSection("📊  SUMMARY");
  console.log(`  Total pages in sitemaps:     ${sitemapPaths.size}`);
  console.log(`  Total pages audited:         ${report.pagesAudited}`);
  console.log(`  Internal links checked:      ${linkSample.length}`);
  console.log();

  const checks = [
    { label: "Pages without H1", count: report.pagesWithoutH1.length, severity: "🔴" },
    { label: "Pages with multiple H1", count: report.pagesMultipleH1.length, severity: "🟡" },
    { label: "Pages without <title>", count: report.pagesWithoutTitle.length, severity: "🔴" },
    { label: "Pages without description", count: report.pagesWithoutDescription.length, severity: "🔴" },
    { label: "Pages without canonical", count: report.pagesWithoutCanonical.length, severity: "🟡" },
    { label: "Pages without Open Graph", count: report.pagesWithoutOg.length, severity: "🟡" },
    { label: "Pages without JSON-LD", count: report.pagesWithoutJsonLd.length, severity: "🟡" },
    { label: "Images without alt text", count: report.imagesWithoutAlt.reduce((s, i) => s + i.count, 0), severity: "🟠" },
    { label: "Broken internal links", count: report.brokenLinks.length, severity: "🔴" },
    { label: "Pages not in any sitemap", count: report.pagesNotInSitemap.length, severity: "🟠" },
    { label: "Sitemap URLs not accessible", count: report.sitemapPagesNotAccessible.length, severity: "🔴" },
    { label: "Title length issues", count: report.titleIssues.length, severity: "🟡" },
    { label: "Description length issues", count: report.descriptionIssues.length, severity: "🟡" },
    { label: "Duplicate titles", count: report.duplicateTitles.length, severity: "🟠" },
    { label: "Duplicate descriptions", count: report.duplicateDescriptions.length, severity: "🟠" },
    { label: "Orphan pages (no inlinks)", count: report.orphanPages.length, severity: "🟠" },
  ];

  for (const c of checks) {
    const status = c.count === 0 ? "✅" : c.severity;
    console.log(`  ${status}  ${c.label.padEnd(35)} ${c.count}`);
  }

  const total = report.pagesAudited || 1;
  const pct = (n: number) => (n / total) * 100;

  const penalties =
    Math.min(25, pct(report.pagesWithoutH1.length) * 2.5) +
    Math.min(15, pct(report.pagesMultipleH1.length) * 0.15) +
    Math.min(25, pct(report.pagesWithoutTitle.length) * 2.5) +
    Math.min(15, pct(report.pagesWithoutDescription.length) * 1.5) +
    Math.min(10, pct(report.pagesWithoutJsonLd.length) * 1) +
    Math.min(15, report.brokenLinks.length * 2) +
    Math.min(5, report.imagesWithoutAlt.reduce((s, i) => s + i.count, 0) * 0.5) +
    Math.min(5, report.duplicateTitles.length * 2) +
    Math.min(5, pct(report.pagesNotInSitemap.length) * 0.5);

  const finalScore = Math.max(0, Math.min(100, Math.round(100 - penalties)));
  const scoreColor = finalScore >= 90 ? "🟢" : finalScore >= 70 ? "🟡" : "🔴";

  console.log();
  console.log(`  ${scoreColor}  SEO Health Score: ${finalScore}/100`);

  if (report.pagesWithoutH1.length > 0) {
    printSection("🔴  PAGES WITHOUT H1");
    for (const p of report.pagesWithoutH1) {
      console.log(`  • ${p.url}`);
    }
  }

  if (report.pagesMultipleH1.length > 0) {
    printSection("🟡  PAGES WITH MULTIPLE H1");
    for (const p of report.pagesMultipleH1) {
      console.log(`  • ${p.url} (${p.h1Count} H1s)`);
      for (const h of p.h1Texts) console.log(`    └─ "${h.substring(0, 80)}"`);
    }
  }

  if (report.pagesWithoutTitle.length > 0) {
    printSection("🔴  PAGES WITHOUT <title>");
    for (const p of report.pagesWithoutTitle) {
      console.log(`  • ${p.url}`);
    }
  }

  if (report.pagesWithoutDescription.length > 0) {
    printSection("🔴  PAGES WITHOUT META DESCRIPTION");
    for (const p of report.pagesWithoutDescription) {
      console.log(`  • ${p.url}`);
    }
  }

  if (report.pagesWithoutJsonLd.length > 0) {
    printSection("🟡  PAGES WITHOUT JSON-LD SCHEMA");
    for (const p of report.pagesWithoutJsonLd) {
      console.log(`  • ${p.url}`);
    }
  }

  if (report.imagesWithoutAlt.length > 0) {
    printSection("🟠  IMAGES WITHOUT ALT TEXT");
    for (const img of report.imagesWithoutAlt) {
      console.log(`  • ${img.url} (${img.count} images)`);
      for (const d of img.details.slice(0, 3)) console.log(`    └─ ${d}`);
    }
  }

  if (report.brokenLinks.length > 0) {
    printSection("🔴  BROKEN INTERNAL LINKS");
    for (const l of report.brokenLinks) {
      console.log(`  • ${l.target} → HTTP ${l.status}`);
      console.log(`    Found on: ${l.source}`);
    }
  }

  if (report.pagesNotInSitemap.length > 0) {
    printSection("🟠  PAGES NOT IN ANY SITEMAP");
    for (const p of report.pagesNotInSitemap.slice(0, 20)) {
      console.log(`  • ${p}`);
    }
    if (report.pagesNotInSitemap.length > 20) {
      console.log(`  ... and ${report.pagesNotInSitemap.length - 20} more`);
    }
  }

  if (report.sitemapPagesNotAccessible.length > 0) {
    printSection("🔴  SITEMAP URLs NOT ACCESSIBLE");
    for (const p of report.sitemapPagesNotAccessible) {
      console.log(`  • ${p.url} → HTTP ${p.status}`);
    }
  }

  if (report.titleIssues.length > 0) {
    printSection("🟡  TITLE LENGTH ISSUES");
    for (const t of report.titleIssues.slice(0, 15)) {
      console.log(`  • ${t.url}`);
      console.log(`    ${t.issue}: "${t.title.substring(0, 80)}"`);
    }
    if (report.titleIssues.length > 15) {
      console.log(`  ... and ${report.titleIssues.length - 15} more`);
    }
  }

  if (report.descriptionIssues.length > 0) {
    printSection("🟡  DESCRIPTION LENGTH ISSUES");
    for (const d of report.descriptionIssues.slice(0, 15)) {
      console.log(`  • ${d.url}`);
      console.log(`    ${d.issue}`);
    }
    if (report.descriptionIssues.length > 15) {
      console.log(`  ... and ${report.descriptionIssues.length - 15} more`);
    }
  }

  if (report.duplicateTitles.length > 0) {
    printSection("🟠  DUPLICATE TITLES");
    for (const d of report.duplicateTitles.slice(0, 10)) {
      console.log(`  • "${d.title.substring(0, 70)}"`);
      for (const u of d.urls) console.log(`    └─ ${u}`);
    }
  }

  if (report.duplicateDescriptions.length > 0) {
    printSection("🟠  DUPLICATE DESCRIPTIONS");
    for (const d of report.duplicateDescriptions.slice(0, 10)) {
      console.log(`  • "${d.desc}"`);
      for (const u of d.urls) console.log(`    └─ ${u}`);
    }
  }

  if (report.orphanPages.length > 0) {
    printSection("🟠  ORPHAN PAGES (no internal links pointing to them)");
    for (const p of report.orphanPages.slice(0, 20)) {
      console.log(`  • ${p}`);
    }
    if (report.orphanPages.length > 20) {
      console.log(`  ... and ${report.orphanPages.length - 20} more`);
    }
  }

  if (report.pagesWithoutOg.length > 0) {
    printSection("🟡  PAGES WITH INCOMPLETE OPEN GRAPH");
    for (const p of report.pagesWithoutOg.slice(0, 15)) {
      const missing: string[] = [];
      if (!p.hasOgTitle) missing.push("og:title");
      if (!p.hasOgDescription) missing.push("og:description");
      if (!p.hasOgImage) missing.push("og:image");
      console.log(`  • ${p.url} — missing: ${missing.join(", ")}`);
    }
    if (report.pagesWithoutOg.length > 15) {
      console.log(`  ... and ${report.pagesWithoutOg.length - 15} more`);
    }
  }

  printSection("⏱  AUDIT COMPLETE");
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`  Duration: ${elapsed}s`);
  console.log(`  Pages: ${report.pagesAudited} | Links checked: ${linkSample.length}`);
  console.log(`  Score: ${finalScore}/100`);
  console.log();
}

main().catch((e) => {
  console.error("Audit failed:", e);
  process.exit(1);
});
