import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS, TRUST_METRICS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";
import { generateContent, type GeneratedContent } from "./seo-content-generator";
import { generateLinkPlan, type LinkPlan } from "./internal-link-optimizer";
import { getMultiLayerFaqs, type MultiLayerFAQResult } from "./faq-engine";

export type RefreshTrigger =
  | "new-page"
  | "new-service"
  | "new-brand"
  | "new-problem"
  | "new-city"
  | "new-sub-service"
  | "content-audit"
  | "periodic"
  | "manual";

export type RefreshAction =
  | "update-faqs"
  | "add-internal-links"
  | "improve-metadata"
  | "add-contextual-content"
  | "update-schema"
  | "add-related-pages"
  | "update-breadcrumbs"
  | "refresh-cta";

export type RefreshPriority = "critical" | "high" | "medium" | "low";

export interface RefreshTask {
  id: string;
  pagePath: string;
  action: RefreshAction;
  trigger: RefreshTrigger;
  priority: RefreshPriority;
  description: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown>;
  affectedPages: string[];
  estimatedImpact: "alto" | "medio" | "bajo";
}

export interface RefreshResult {
  trigger: RefreshTrigger;
  triggerEntity: string;
  timestamp: string;
  tasksGenerated: number;
  tasks: RefreshTask[];
  affectedPages: string[];
  summary: RefreshSummary;
}

export interface RefreshSummary {
  totalTasks: number;
  byAction: Record<RefreshAction, number>;
  byPriority: Record<RefreshPriority, number>;
  totalAffectedPages: number;
  estimatedTimeMinutes: number;
}

interface ContentSnapshot {
  slug: string;
  contentHash: string;
  faqCount: number;
  linkCount: number;
  metaTitleLength: number;
  metaDescLength: number;
  sectionCount: number;
  hasSchema: boolean;
  lastRefreshed: string;
}

const contentRegistry = new Map<string, ContentSnapshot>();

function taskId(path: string, action: RefreshAction): string {
  const ts = Date.now().toString(36);
  const slug = path.replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
  return `${action}-${slug}-${ts}`;
}

function getServiceBrandPaths(serviceSlug: string, brandSlug: string): string[] {
  const paths = [`/servicios/${serviceSlug}-${brandSlug}`];
  for (const city of SERVICE_CITIES) {
    paths.push(`/servicios/${serviceSlug}-${brandSlug}-${city.slug}`);
  }
  return paths;
}

function getAllBrandPaths(brandSlug: string): string[] {
  const paths = [`/marcas/${brandSlug}`];
  for (const ss of SERVICE_SLUGS) {
    paths.push(`/servicios/${ss}-${brandSlug}`);
    for (const city of SERVICE_CITIES) {
      paths.push(`/servicios/${ss}-${brandSlug}-${city.slug}`);
    }
  }
  for (const p of PROBLEM_TOPICS) {
    paths.push(`/problemas/${p.slug}-${brandSlug}`);
    for (const city of SERVICE_CITIES) {
      paths.push(`/problemas/${p.slug}-${brandSlug}-${city.slug}`);
    }
  }
  for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
    for (const sub of subs) {
      paths.push(`/servicios/${sub.slug}-${brandSlug}`);
    }
  }
  return paths;
}

function getAllServicePaths(serviceSlug: string): string[] {
  const paths = [`/servicios/${serviceSlug}`];
  for (const brand of Object.keys(BRAND_NAMES)) {
    paths.push(`/servicios/${serviceSlug}-${brand}`);
    for (const city of SERVICE_CITIES) {
      paths.push(`/servicios/${serviceSlug}-${brand}-${city.slug}`);
    }
  }
  return paths;
}

function auditMetadata(content: GeneratedContent): RefreshTask[] {
  const tasks: RefreshTask[] = [];
  const path = content.type.includes("problem")
    ? `/problemas/${content.slug}`
    : `/servicios/${content.slug}`;

  if (content.metaTitle.length > 60) {
    tasks.push({
      id: taskId(path, "improve-metadata"),
      pagePath: path,
      action: "improve-metadata",
      trigger: "content-audit",
      priority: "high",
      description: `Title demasiado largo (${content.metaTitle.length} chars, max 60). Recortar manteniendo keyword principal.`,
      before: { metaTitle: content.metaTitle, length: content.metaTitle.length },
      after: { metaTitle: content.metaTitle.substring(0, 57) + "...", length: 60 },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (content.metaTitle.length < 30) {
    tasks.push({
      id: taskId(path, "improve-metadata"),
      pagePath: path,
      action: "improve-metadata",
      trigger: "content-audit",
      priority: "high",
      description: `Title demasiado corto (${content.metaTitle.length} chars, min 30). Añadir keywords secundarias.`,
      before: { metaTitle: content.metaTitle, length: content.metaTitle.length },
      after: { suggestion: "Añadir modificadores de localización o tipo de servicio" },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  if (content.metaDescription.length > 160) {
    tasks.push({
      id: taskId(path, "improve-metadata"),
      pagePath: path,
      action: "improve-metadata",
      trigger: "content-audit",
      priority: "medium",
      description: `Descripción demasiado larga (${content.metaDescription.length} chars, max 160). Puede truncarse en SERPs.`,
      before: { metaDescription: content.metaDescription, length: content.metaDescription.length },
      after: { metaDescription: content.metaDescription.substring(0, 157) + "...", length: 160 },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  if (content.metaDescription.length < 120) {
    tasks.push({
      id: taskId(path, "improve-metadata"),
      pagePath: path,
      action: "improve-metadata",
      trigger: "content-audit",
      priority: "medium",
      description: `Descripción corta (${content.metaDescription.length} chars, ideal 120-160). Espacio desaprovechado en SERPs.`,
      before: { length: content.metaDescription.length },
      after: { suggestion: "Ampliar con CTA o USP adicional" },
      affectedPages: [path],
      estimatedImpact: "bajo",
    });
  }

  return tasks;
}

function auditFAQs(content: GeneratedContent, faqData: MultiLayerFAQResult | null): RefreshTask[] {
  const tasks: RefreshTask[] = [];
  const path = content.type.includes("problem")
    ? `/problemas/${content.slug}`
    : `/servicios/${content.slug}`;

  if (content.faqs.length < 4) {
    tasks.push({
      id: taskId(path, "update-faqs"),
      pagePath: path,
      action: "update-faqs",
      trigger: "content-audit",
      priority: "high",
      description: `Solo ${content.faqs.length} FAQs. Mínimo recomendado: 4 para FAQPage JSON-LD completo.`,
      before: { faqCount: content.faqs.length },
      after: { faqCount: Math.max(4, content.faqs.length), suggestion: "Añadir FAQs de precio, tiempo y garantía" },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (faqData && faqData.sections.length < 3) {
    tasks.push({
      id: taskId(path, "update-faqs"),
      pagePath: path,
      action: "update-faqs",
      trigger: "content-audit",
      priority: "medium",
      description: `Solo ${faqData.sections.length} capas FAQ. El sistema soporta 4 capas semánticas.`,
      before: { layers: faqData.sections.length },
      after: { layers: 4, suggestion: "Activar capas: service-only, brand-only, general-ev" },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  const shortAnswers = content.faqs.filter((f) => f.answer.length < 80);
  if (shortAnswers.length > 0) {
    tasks.push({
      id: taskId(path, "update-faqs"),
      pagePath: path,
      action: "update-faqs",
      trigger: "content-audit",
      priority: "medium",
      description: `${shortAnswers.length} respuestas FAQ demasiado cortas (<80 chars). Ampliar para mayor valor SEO.`,
      before: { shortAnswers: shortAnswers.map((f) => ({ q: f.question, len: f.answer.length })) },
      after: { suggestion: "Respuestas de 100-200 chars con datos específicos" },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  return tasks;
}

function auditLinks(linkPlan: LinkPlan): RefreshTask[] {
  const tasks: RefreshTask[] = [];
  const path = linkPlan.pagePath;

  if (linkPlan.totalLinks < 10) {
    tasks.push({
      id: taskId(path, "add-internal-links"),
      pagePath: path,
      action: "add-internal-links",
      trigger: "content-audit",
      priority: "high",
      description: `Solo ${linkPlan.totalLinks} enlaces internos. Mínimo recomendado: 10 para buena distribución de autoridad.`,
      before: { totalLinks: linkPlan.totalLinks },
      after: { totalLinks: Math.max(10, linkPlan.totalLinks), distribution: linkPlan.linkDistribution },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (linkPlan.pillarLinks.length < 2) {
    tasks.push({
      id: taskId(path, "add-internal-links"),
      pagePath: path,
      action: "add-internal-links",
      trigger: "content-audit",
      priority: "critical",
      description: `Solo ${linkPlan.pillarLinks.length} enlace(s) a páginas pilar. Mínimo: 2 (marca + servicio).`,
      before: { pillarLinks: linkPlan.pillarLinks.length },
      after: { suggestion: "Añadir enlaces a marca pilar y servicio pilar" },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (linkPlan.contextualInsertions.length > 0) {
    tasks.push({
      id: taskId(path, "add-internal-links"),
      pagePath: path,
      action: "add-internal-links",
      trigger: "content-audit",
      priority: "medium",
      description: `${linkPlan.contextualInsertions.length} oportunidades de enlace contextual detectadas en el contenido.`,
      before: null,
      after: {
        insertions: linkPlan.contextualInsertions.map((ci) => ({
          text: ci.targetText,
          href: ci.href,
          position: ci.position,
        })),
      },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  if (linkPlan.inboundOpportunities.length > 0) {
    const inboundPaths = linkPlan.inboundOpportunities.map((io) => io.fromPage);
    tasks.push({
      id: taskId(path, "add-internal-links"),
      pagePath: path,
      action: "add-internal-links",
      trigger: "content-audit",
      priority: "high",
      description: `${linkPlan.inboundOpportunities.length} páginas deberían enlazar hacia ${path}.`,
      before: null,
      after: {
        inbound: linkPlan.inboundOpportunities.map((io) => ({
          from: io.fromPage,
          anchor: io.suggestedAnchor,
          reason: io.reason,
        })),
      },
      affectedPages: [...inboundPaths, path],
      estimatedImpact: "alto",
    });
  }

  return tasks;
}

function auditSchema(content: GeneratedContent): RefreshTask[] {
  const tasks: RefreshTask[] = [];
  const path = content.type.includes("problem")
    ? `/problemas/${content.slug}`
    : `/servicios/${content.slug}`;

  if (!content.jsonLdServiceType) {
    tasks.push({
      id: taskId(path, "update-schema"),
      pagePath: path,
      action: "update-schema",
      trigger: "content-audit",
      priority: "critical",
      description: "Sin tipo de servicio para JSON-LD. Impide generar Service schema válido.",
      before: { jsonLdServiceType: null },
      after: { jsonLdServiceType: "AutoRepair" },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (content.faqs.length >= 3) {
    const snapshot = contentRegistry.get(content.slug);
    if (!snapshot || !snapshot.hasSchema) {
      tasks.push({
        id: taskId(path, "update-schema"),
        pagePath: path,
        action: "update-schema",
        trigger: "content-audit",
        priority: "high",
        description: `${content.faqs.length} FAQs disponibles para FAQPage schema. Asegurar JSON-LD FAQPage activo.`,
        before: { hasSchema: false },
        after: { hasSchema: true, faqCount: content.faqs.length },
        affectedPages: [path],
        estimatedImpact: "alto",
      });
    }
  }

  if (content.breadcrumbs.length > 0) {
    tasks.push({
      id: taskId(path, "update-schema"),
      pagePath: path,
      action: "update-schema",
      trigger: "content-audit",
      priority: "medium",
      description: "Verificar BreadcrumbList JSON-LD coincide con breadcrumbs renderizados.",
      before: null,
      after: { breadcrumbs: content.breadcrumbs },
      affectedPages: [path],
      estimatedImpact: "medio",
    });
  }

  return tasks;
}

function auditContextualContent(content: GeneratedContent): RefreshTask[] {
  const tasks: RefreshTask[] = [];
  const path = content.type.includes("problem")
    ? `/problemas/${content.slug}`
    : `/servicios/${content.slug}`;

  const totalParagraphs =
    content.introduction.paragraphs.length +
    content.specialization.paragraphs.length +
    content.commonProblems.paragraphs.length +
    content.process.paragraphs.length +
    content.benefits.paragraphs.length;

  if (totalParagraphs < 12) {
    tasks.push({
      id: taskId(path, "add-contextual-content"),
      pagePath: path,
      action: "add-contextual-content",
      trigger: "content-audit",
      priority: "high",
      description: `Solo ${totalParagraphs} párrafos. Riesgo de thin content. Mínimo recomendado: 12.`,
      before: { totalParagraphs },
      after: { suggestion: "Ampliar secciones de proceso y problemas frecuentes" },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  const sections = [
    content.introduction,
    content.specialization,
    content.commonProblems,
    content.process,
    content.benefits,
  ];
  const emptySections = sections.filter((s) => s.paragraphs.length === 0);
  if (emptySections.length > 0) {
    tasks.push({
      id: taskId(path, "add-contextual-content"),
      pagePath: path,
      action: "add-contextual-content",
      trigger: "content-audit",
      priority: "critical",
      description: `${emptySections.length} sección(es) sin contenido: ${emptySections.map((s) => s.id).join(", ")}.`,
      before: { emptySections: emptySections.map((s) => s.id) },
      after: { suggestion: "Generar contenido para cada sección vacía" },
      affectedPages: [path],
      estimatedImpact: "alto",
    });
  }

  if (!content.specialization.bullets || content.specialization.bullets.length < 3) {
    tasks.push({
      id: taskId(path, "add-contextual-content"),
      pagePath: path,
      action: "add-contextual-content",
      trigger: "content-audit",
      priority: "medium",
      description: `Sección de especialización con ${content.specialization.bullets?.length || 0} bullets. Recomendado: 4.`,
      before: { bulletCount: content.specialization.bullets?.length || 0 },
      after: { suggestion: "Añadir bullets de certificación, equipamiento, experiencia" },
      affectedPages: [path],
      estimatedImpact: "bajo",
    });
  }

  return tasks;
}

export function onNewPage(pagePath: string): RefreshResult {
  const tasks: RefreshTask[] = [];
  const affectedPages = new Set<string>([pagePath]);

  const linkPlan = generateLinkPlan(pagePath);

  for (const io of linkPlan.inboundOpportunities) {
    affectedPages.add(io.fromPage);
    tasks.push({
      id: taskId(io.fromPage, "add-internal-links"),
      pagePath: io.fromPage,
      action: "add-internal-links",
      trigger: "new-page",
      priority: "high",
      description: `Nueva página ${pagePath} creada. Añadir enlace desde ${io.fromPageLabel}.`,
      before: null,
      after: { newLink: { href: pagePath, anchor: io.suggestedAnchor, reason: io.reason } },
      affectedPages: [io.fromPage, pagePath],
      estimatedImpact: "alto",
    });
  }

  tasks.push({
    id: taskId(pagePath, "add-internal-links"),
    pagePath,
    action: "add-internal-links",
    trigger: "new-page",
    priority: "critical",
    description: `Configurar enlazado interno completo para nueva página (${linkPlan.totalLinks} enlaces planificados).`,
    before: null,
    after: {
      pillarLinks: linkPlan.pillarLinks.length,
      siblingLinks: linkPlan.siblingLinks.length,
      childLinks: linkPlan.childLinks.length,
      crossEntityLinks: linkPlan.crossEntityLinks.length,
    },
    affectedPages: [pagePath],
    estimatedImpact: "alto",
  });

  if (linkPlan.contextualInsertions.length > 0) {
    tasks.push({
      id: taskId(pagePath, "add-contextual-content"),
      pagePath,
      action: "add-contextual-content",
      trigger: "new-page",
      priority: "medium",
      description: `Insertar ${linkPlan.contextualInsertions.length} enlaces contextuales en el contenido de la página.`,
      before: null,
      after: { insertions: linkPlan.contextualInsertions },
      affectedPages: [pagePath],
      estimatedImpact: "medio",
    });
  }

  tasks.push({
    id: taskId(pagePath, "update-schema"),
    pagePath,
    action: "update-schema",
    trigger: "new-page",
    priority: "critical",
    description: "Generar JSON-LD completo: WebPage, Service/AutoRepair, FAQPage, BreadcrumbList.",
    before: null,
    after: { schemas: ["WebPage", "Service", "FAQPage", "BreadcrumbList"] },
    affectedPages: [pagePath],
    estimatedImpact: "alto",
  });

  tasks.push({
    id: taskId(pagePath, "update-faqs"),
    pagePath,
    action: "update-faqs",
    trigger: "new-page",
    priority: "high",
    description: "Generar FAQs multi-capa para la nueva página y sincronizar con JSON-LD.",
    before: null,
    after: { faqLayers: 4 },
    affectedPages: [pagePath],
    estimatedImpact: "alto",
  });

  return buildResult("new-page", pagePath, tasks, [...affectedPages]);
}

export function onNewService(serviceSlug: string, serviceName: string): RefreshResult {
  const tasks: RefreshTask[] = [];
  const affectedPages = new Set<string>();

  affectedPages.add(`/servicios/${serviceSlug}`);
  tasks.push({
    id: taskId(`/servicios/${serviceSlug}`, "add-contextual-content"),
    pagePath: `/servicios/${serviceSlug}`,
    action: "add-contextual-content",
    trigger: "new-service",
    priority: "critical",
    description: `Crear página pilar para nuevo servicio "${serviceName}".`,
    before: null,
    after: { serviceSlug, serviceName, sections: 5, faqs: 5 },
    affectedPages: [`/servicios/${serviceSlug}`],
    estimatedImpact: "alto",
  });

  for (const brand of Object.keys(BRAND_NAMES)) {
    const brandName = BRAND_NAMES[brand];
    const clusterPath = `/servicios/${serviceSlug}-${brand}`;
    affectedPages.add(clusterPath);

    tasks.push({
      id: taskId(clusterPath, "add-contextual-content"),
      pagePath: clusterPath,
      action: "add-contextual-content",
      trigger: "new-service",
      priority: "high",
      description: `Generar contenido para ${serviceName} ${brandName}.`,
      before: null,
      after: { serviceSlug, brandSlug: brand },
      affectedPages: [clusterPath],
      estimatedImpact: "alto",
    });

    const brandPath = `/marcas/${brand}`;
    affectedPages.add(brandPath);
    tasks.push({
      id: taskId(brandPath, "add-internal-links"),
      pagePath: brandPath,
      action: "add-internal-links",
      trigger: "new-service",
      priority: "high",
      description: `Añadir enlace a "${serviceName} ${brandName}" desde la página de marca.`,
      before: null,
      after: { newLink: { href: clusterPath, anchor: `${serviceName} ${brandName}` } },
      affectedPages: [brandPath, clusterPath],
      estimatedImpact: "medio",
    });
  }

  tasks.push({
    id: taskId("/postventa", "add-internal-links"),
    pagePath: "/postventa",
    action: "add-internal-links",
    trigger: "new-service",
    priority: "high",
    description: `Añadir nuevo servicio "${serviceName}" a la navegación de postventa.`,
    before: null,
    after: { newLink: { href: `/servicios/${serviceSlug}`, anchor: serviceName } },
    affectedPages: ["/postventa"],
    estimatedImpact: "medio",
  });

  tasks.push({
    id: taskId("sitemap", "update-schema"),
    pagePath: "/sitemap.xml",
    action: "update-schema",
    trigger: "new-service",
    priority: "critical",
    description: `Regenerar sitemap para incluir nuevo servicio y sus ${Object.keys(BRAND_NAMES).length} combinaciones de marca.`,
    before: null,
    after: { newUrls: Object.keys(BRAND_NAMES).length + 1 },
    affectedPages: ["/sitemap.xml"],
    estimatedImpact: "alto",
  });

  for (const ss of SERVICE_SLUGS) {
    if (ss === serviceSlug) continue;
    const pillarPath = `/servicios/${ss}`;
    affectedPages.add(pillarPath);
    tasks.push({
      id: taskId(pillarPath, "add-related-pages"),
      pagePath: pillarPath,
      action: "add-related-pages",
      trigger: "new-service",
      priority: "medium",
      description: `Añadir "${serviceName}" como servicio relacionado en la pilar de ${SERVICE_DEFINITIONS[ss]?.title || ss}.`,
      before: null,
      after: { relatedService: { href: `/servicios/${serviceSlug}`, text: serviceName } },
      affectedPages: [pillarPath],
      estimatedImpact: "bajo",
    });
  }

  return buildResult("new-service", serviceSlug, tasks, [...affectedPages]);
}

export function onNewBrand(brandSlug: string, brandName: string): RefreshResult {
  const tasks: RefreshTask[] = [];
  const affectedPages = new Set<string>();
  const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
  const tt = isOfficial ? "Taller Oficial" : "Taller Especializado";

  affectedPages.add(`/marcas/${brandSlug}`);
  tasks.push({
    id: taskId(`/marcas/${brandSlug}`, "add-contextual-content"),
    pagePath: `/marcas/${brandSlug}`,
    action: "add-contextual-content",
    trigger: "new-brand",
    priority: "critical",
    description: `Crear página pilar para nueva marca "${brandName}" (${tt}).`,
    before: null,
    after: { brandSlug, brandName, tallerType: tt },
    affectedPages: [`/marcas/${brandSlug}`],
    estimatedImpact: "alto",
  });

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    const clusterPath = `/servicios/${ss}-${brandSlug}`;
    affectedPages.add(clusterPath);

    tasks.push({
      id: taskId(clusterPath, "add-contextual-content"),
      pagePath: clusterPath,
      action: "add-contextual-content",
      trigger: "new-brand",
      priority: "high",
      description: `Generar contenido para ${def.title} ${brandName}.`,
      before: null,
      after: { serviceSlug: ss, brandSlug },
      affectedPages: [clusterPath],
      estimatedImpact: "alto",
    });

    tasks.push({
      id: taskId(clusterPath, "update-faqs"),
      pagePath: clusterPath,
      action: "update-faqs",
      trigger: "new-brand",
      priority: "high",
      description: `Generar FAQs multi-capa para ${def.title} ${brandName}.`,
      before: null,
      after: { faqLayers: 4 },
      affectedPages: [clusterPath],
      estimatedImpact: "alto",
    });

    for (const city of SERVICE_CITIES) {
      const localPath = `/servicios/${ss}-${brandSlug}-${city.slug}`;
      affectedPages.add(localPath);
      tasks.push({
        id: taskId(localPath, "add-contextual-content"),
        pagePath: localPath,
        action: "add-contextual-content",
        trigger: "new-brand",
        priority: "medium",
        description: `Generar página programática ${def.title} ${brandName} en ${city.city}.`,
        before: null,
        after: { serviceSlug: ss, brandSlug, citySlug: city.slug },
        affectedPages: [localPath],
        estimatedImpact: "medio",
      });
    }

    const pillarPath = `/servicios/${ss}`;
    affectedPages.add(pillarPath);
    tasks.push({
      id: taskId(pillarPath, "add-internal-links"),
      pagePath: pillarPath,
      action: "add-internal-links",
      trigger: "new-brand",
      priority: "high",
      description: `Añadir enlace a ${def.title} ${brandName} desde pilar de servicio.`,
      before: null,
      after: { newLink: { href: clusterPath, anchor: `${def.title} ${brandName}` } },
      affectedPages: [pillarPath, clusterPath],
      estimatedImpact: "medio",
    });
  }

  tasks.push({
    id: taskId("/electrificacion", "add-internal-links"),
    pagePath: "/electrificacion",
    action: "add-internal-links",
    trigger: "new-brand",
    priority: "high",
    description: `Añadir ${brandName} a la página de electrificación.`,
    before: null,
    after: { newLink: { href: `/marcas/${brandSlug}`, anchor: brandName } },
    affectedPages: ["/electrificacion"],
    estimatedImpact: "medio",
  });

  tasks.push({
    id: taskId("sitemap", "update-schema"),
    pagePath: "/sitemap.xml",
    action: "update-schema",
    trigger: "new-brand",
    priority: "critical",
    description: `Regenerar sitemap para incluir nueva marca y sus ${SERVICE_SLUGS.length * (SERVICE_CITIES.length + 1) + 1} URLs.`,
    before: null,
    after: { newUrls: SERVICE_SLUGS.length * (SERVICE_CITIES.length + 1) + 1 },
    affectedPages: ["/sitemap.xml"],
    estimatedImpact: "alto",
  });

  for (const [otherBrand, otherName] of Object.entries(BRAND_NAMES)) {
    if (otherBrand === brandSlug) continue;
    const otherPath = `/marcas/${otherBrand}`;
    tasks.push({
      id: taskId(otherPath, "add-related-pages"),
      pagePath: otherPath,
      action: "add-related-pages",
      trigger: "new-brand",
      priority: "low",
      description: `Añadir ${brandName} como marca relacionada en la página de ${otherName}.`,
      before: null,
      after: { relatedBrand: { href: `/marcas/${brandSlug}`, text: brandName } },
      affectedPages: [otherPath],
      estimatedImpact: "bajo",
    });
  }

  return buildResult("new-brand", brandSlug, tasks, [...affectedPages]);
}

export function onNewProblem(problemSlug: string, problemName: string, relatedServices: string[]): RefreshResult {
  const tasks: RefreshTask[] = [];
  const affectedPages = new Set<string>();

  for (const brand of Object.keys(BRAND_NAMES)) {
    const brandName = BRAND_NAMES[brand];
    const problemPath = `/problemas/${problemSlug}-${brand}`;
    affectedPages.add(problemPath);

    tasks.push({
      id: taskId(problemPath, "add-contextual-content"),
      pagePath: problemPath,
      action: "add-contextual-content",
      trigger: "new-problem",
      priority: "high",
      description: `Generar página de problema "${problemName}" para ${brandName}.`,
      before: null,
      after: { problemSlug, brandSlug: brand },
      affectedPages: [problemPath],
      estimatedImpact: "alto",
    });

    for (const rs of relatedServices) {
      const servicePath = `/servicios/${rs}-${brand}`;
      affectedPages.add(servicePath);
      tasks.push({
        id: taskId(servicePath, "add-internal-links"),
        pagePath: servicePath,
        action: "add-internal-links",
        trigger: "new-problem",
        priority: "high",
        description: `Enlazar "${problemName} ${brandName}" desde ${SERVICE_DEFINITIONS[rs]?.title || rs} ${brandName}.`,
        before: null,
        after: { newLink: { href: problemPath, anchor: `${problemName} ${brandName}` } },
        affectedPages: [servicePath, problemPath],
        estimatedImpact: "medio",
      });
    }

    for (const city of SERVICE_CITIES) {
      const cityPath = `/problemas/${problemSlug}-${brand}-${city.slug}`;
      affectedPages.add(cityPath);
      tasks.push({
        id: taskId(cityPath, "add-contextual-content"),
        pagePath: cityPath,
        action: "add-contextual-content",
        trigger: "new-problem",
        priority: "medium",
        description: `Generar página ${problemName} ${brandName} en ${city.city}.`,
        before: null,
        after: { problemSlug, brandSlug: brand, citySlug: city.slug },
        affectedPages: [cityPath],
        estimatedImpact: "medio",
      });
    }
  }

  return buildResult("new-problem", problemSlug, tasks, [...affectedPages]);
}

export function runContentAudit(paths?: string[]): RefreshResult {
  const tasks: RefreshTask[] = [];
  const affectedPages = new Set<string>();

  const targetPaths = paths || generateSamplePaths();

  for (const path of targetPaths) {
    const slug = path.split("/").pop() || "";
    const content = generateContent(slug);
    if (!content) continue;

    affectedPages.add(path);

    const metaTasks = auditMetadata(content);
    const linkPlan = generateLinkPlan(path);
    const linkTasks = auditLinks(linkPlan);
    const contentTasks = auditContextualContent(content);
    const schemaTasks = auditSchema(content);

    let faqData: MultiLayerFAQResult | null = null;
    if (content.type === "service-brand") {
      const parts = slug.split("-");
      const serviceSlug = parts[0];
      const brandSlug = parts.slice(1).join("-");
      if (SERVICE_SLUGS.includes(serviceSlug) && BRAND_NAMES[brandSlug]) {
        faqData = getMultiLayerFaqs(serviceSlug, brandSlug);
      }
    }
    const faqTasks = auditFAQs(content, faqData);

    tasks.push(...metaTasks, ...linkTasks, ...contentTasks, ...schemaTasks, ...faqTasks);

    for (const t of [...metaTasks, ...linkTasks, ...contentTasks, ...schemaTasks, ...faqTasks]) {
      for (const p of t.affectedPages) affectedPages.add(p);
    }

    contentRegistry.set(slug, {
      slug,
      contentHash: content.contentHash,
      faqCount: content.faqs.length,
      linkCount: linkPlan.totalLinks,
      metaTitleLength: content.metaTitle.length,
      metaDescLength: content.metaDescription.length,
      sectionCount: 5,
      hasSchema: !!content.jsonLdServiceType,
      lastRefreshed: new Date().toISOString(),
    });
  }

  return buildResult("content-audit", `${targetPaths.length} pages`, tasks, [...affectedPages]);
}

function generateSamplePaths(): string[] {
  const paths: string[] = [];
  const brands = Object.keys(BRAND_NAMES).slice(0, 5);

  for (const ss of SERVICE_SLUGS.slice(0, 3)) {
    for (const bs of brands) {
      paths.push(`/servicios/${ss}-${bs}`);
    }
  }
  for (const p of PROBLEM_TOPICS.slice(0, 3)) {
    for (const bs of brands.slice(0, 3)) {
      paths.push(`/problemas/${p.slug}-${bs}`);
    }
  }
  return paths;
}

function buildResult(
  trigger: RefreshTrigger,
  triggerEntity: string,
  tasks: RefreshTask[],
  affectedPages: string[]
): RefreshResult {
  const byAction: Record<RefreshAction, number> = {
    "update-faqs": 0,
    "add-internal-links": 0,
    "improve-metadata": 0,
    "add-contextual-content": 0,
    "update-schema": 0,
    "add-related-pages": 0,
    "update-breadcrumbs": 0,
    "refresh-cta": 0,
  };
  const byPriority: Record<RefreshPriority, number> = { critical: 0, high: 0, medium: 0, low: 0 };

  for (const t of tasks) {
    byAction[t.action]++;
    byPriority[t.priority]++;
  }

  const timeEstimate = byPriority.critical * 5 + byPriority.high * 3 + byPriority.medium * 1 + byPriority.low * 0.5;

  return {
    trigger,
    triggerEntity,
    timestamp: new Date().toISOString(),
    tasksGenerated: tasks.length,
    tasks,
    affectedPages: [...new Set(affectedPages)],
    summary: {
      totalTasks: tasks.length,
      byAction,
      byPriority,
      totalAffectedPages: new Set(affectedPages).size,
      estimatedTimeMinutes: Math.round(timeEstimate),
    },
  };
}

export function getRefreshStatus(): {
  registeredPages: number;
  lastAudit: string | null;
  contentHashes: Record<string, string>;
} {
  const hashes: Record<string, string> = {};
  let lastAudit: string | null = null;

  for (const [slug, snapshot] of contentRegistry) {
    hashes[slug] = snapshot.contentHash;
    if (!lastAudit || snapshot.lastRefreshed > lastAudit) {
      lastAudit = snapshot.lastRefreshed;
    }
  }

  return {
    registeredPages: contentRegistry.size,
    lastAudit,
    contentHashes: hashes,
  };
}
