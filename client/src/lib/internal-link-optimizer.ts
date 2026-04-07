import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export interface OptimizedLink {
  text: string;
  href: string;
  title: string;
  rel: string;
  context: LinkContext;
  priority: number;
  anchor: AnchorType;
}

export type LinkContext =
  | "pillar"
  | "sibling"
  | "child"
  | "parent"
  | "cross-entity"
  | "geographic"
  | "faq"
  | "cta"
  | "editorial"
  | "breadcrumb";

export type AnchorType = "exact-match" | "branded" | "contextual" | "generic" | "navigational";

export interface LinkPlan {
  pagePath: string;
  pageType: string;
  entities: PageEntities;
  pillarLinks: OptimizedLink[];
  siblingLinks: OptimizedLink[];
  childLinks: OptimizedLink[];
  parentLinks: OptimizedLink[];
  crossEntityLinks: OptimizedLink[];
  geographicLinks: OptimizedLink[];
  faqLinks: OptimizedLink[];
  ctaLinks: OptimizedLink[];
  contextualInsertions: ContextualInsertion[];
  totalLinks: number;
  linkDistribution: Record<LinkContext, number>;
  anchorDistribution: Record<AnchorType, number>;
  inboundOpportunities: InboundOpportunity[];
}

export interface ContextualInsertion {
  targetText: string;
  replacementAnchor: string;
  href: string;
  position: "inline" | "end-of-paragraph" | "related-section";
}

export interface InboundOpportunity {
  fromPage: string;
  fromPageLabel: string;
  suggestedAnchor: string;
  reason: string;
}

interface PageEntities {
  brandSlug?: string;
  brandName?: string;
  serviceSlug?: string;
  serviceName?: string;
  citySlug?: string;
  cityName?: string;
  problemSlug?: string;
  problemName?: string;
  subServiceSlug?: string;
  subServiceName?: string;
  isOfficial: boolean;
}

const CITY_MAP = new Map(SERVICE_CITIES.map((c) => [c.slug, c]));

function tallerType(brandSlug: string): string {
  return OFFICIAL_BRANDS.includes(brandSlug) ? "Taller Oficial" : "Taller Especializado";
}

function parsePagePath(path: string): PageEntities {
  const entities: PageEntities = { isOfficial: false };
  const segments = path.split("/").filter(Boolean);

  if (segments[0] === "marcas" && segments[1]) {
    entities.brandSlug = segments[1];
    entities.brandName = BRAND_NAMES[segments[1]];
  }

  if (segments[0] === "servicios" && segments[1]) {
    const slug = segments[1];

    for (const city of SERVICE_CITIES) {
      for (const service of SERVICE_SLUGS) {
        for (const brand of Object.keys(BRAND_NAMES)) {
          if (slug === `${service}-${brand}-${city.slug}`) {
            entities.serviceSlug = service;
            entities.serviceName = SERVICE_DEFINITIONS[service]?.title;
            entities.brandSlug = brand;
            entities.brandName = BRAND_NAMES[brand];
            entities.citySlug = city.slug;
            entities.cityName = city.city;
            entities.isOfficial = OFFICIAL_BRANDS.includes(brand);
            return entities;
          }
        }
      }
    }

    for (const service of SERVICE_SLUGS) {
      for (const brand of Object.keys(BRAND_NAMES)) {
        if (slug === `${service}-${brand}`) {
          entities.serviceSlug = service;
          entities.serviceName = SERVICE_DEFINITIONS[service]?.title;
          entities.brandSlug = brand;
          entities.brandName = BRAND_NAMES[brand];
          entities.isOfficial = OFFICIAL_BRANDS.includes(brand);
          return entities;
        }
      }
    }

    for (const [parent, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
      for (const sub of subs) {
        for (const brand of Object.keys(BRAND_NAMES)) {
          if (slug === `${sub.slug}-${brand}`) {
            entities.subServiceSlug = sub.slug;
            entities.subServiceName = sub.name;
            entities.serviceSlug = parent;
            entities.serviceName = SERVICE_DEFINITIONS[parent]?.title;
            entities.brandSlug = brand;
            entities.brandName = BRAND_NAMES[brand];
            entities.isOfficial = OFFICIAL_BRANDS.includes(brand);
            return entities;
          }
        }
      }
    }

    for (const service of SERVICE_SLUGS) {
      if (slug === service) {
        entities.serviceSlug = service;
        entities.serviceName = SERVICE_DEFINITIONS[service]?.title;
        return entities;
      }
    }
  }

  if (segments[0] === "problemas" && segments[1]) {
    const slug = segments[1];

    for (const problem of PROBLEM_TOPICS) {
      for (const brand of Object.keys(BRAND_NAMES)) {
        for (const city of SERVICE_CITIES) {
          if (slug === `${problem.slug}-${brand}-${city.slug}`) {
            entities.problemSlug = problem.slug;
            entities.problemName = problem.name;
            entities.brandSlug = brand;
            entities.brandName = BRAND_NAMES[brand];
            entities.citySlug = city.slug;
            entities.cityName = city.city;
            entities.isOfficial = OFFICIAL_BRANDS.includes(brand);
            return entities;
          }
        }
        if (slug === `${problem.slug}-${brand}`) {
          entities.problemSlug = problem.slug;
          entities.problemName = problem.name;
          entities.brandSlug = brand;
          entities.brandName = BRAND_NAMES[brand];
          entities.isOfficial = OFFICIAL_BRANDS.includes(brand);
          return entities;
        }
      }
    }
  }

  if (path.startsWith("/taller-electricos-")) {
    const citySlug = path.replace("/taller-electricos-", "");
    const city = CITY_MAP.get(citySlug);
    if (city) {
      entities.citySlug = city.slug;
      entities.cityName = city.city;
    }
  }

  if (entities.brandSlug) {
    entities.isOfficial = OFFICIAL_BRANDS.includes(entities.brandSlug);
  }

  return entities;
}

function detectPageType(path: string, entities: PageEntities): string {
  if (entities.subServiceSlug && entities.brandSlug) return "sub-service-brand";
  if (entities.problemSlug && entities.brandSlug && entities.citySlug) return "problem-brand-city";
  if (entities.problemSlug && entities.brandSlug) return "problem-brand";
  if (entities.serviceSlug && entities.brandSlug && entities.citySlug) return "service-brand-city";
  if (entities.serviceSlug && entities.brandSlug) return "service-brand";
  if (entities.serviceSlug) return "service-pillar";
  if (entities.brandSlug) return "brand-pillar";
  if (entities.citySlug) return "city-page";
  return "other";
}

function makeLink(
  text: string,
  href: string,
  title: string,
  context: LinkContext,
  priority: number,
  anchor: AnchorType
): OptimizedLink {
  return { text, href, title, rel: "", context, priority, anchor };
}

function buildPillarLinks(entities: PageEntities, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  if (entities.brandSlug && entities.brandName) {
    const href = `/marcas/${entities.brandSlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        entities.brandName,
        href,
        `${tallerType(entities.brandSlug)} ${entities.brandName} Eléctrico`,
        "pillar",
        10,
        "branded"
      ));
      added.add(href);
    }
  }

  if (entities.serviceSlug && entities.serviceName) {
    const href = `/servicios/${entities.serviceSlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        entities.serviceName,
        href,
        `${entities.serviceName} de Vehículos Eléctricos`,
        "pillar",
        9,
        "exact-match"
      ));
      added.add(href);
    }
  }

  const alwaysLink = [
    { href: "/postventa", text: "Servicio Postventa", title: "Postventa para eléctricos e híbridos" },
    { href: "/contacto", text: "Contacto", title: "Contacta con Grupo Avisa" },
  ];

  for (const al of alwaysLink) {
    if (!added.has(al.href)) {
      links.push(makeLink(al.text, al.href, al.title, "pillar", 5, "navigational"));
      added.add(al.href);
    }
  }

  if (entities.citySlug && entities.cityName) {
    const href = `/taller-electricos-${entities.citySlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        `Taller en ${entities.cityName}`,
        href,
        `Taller de eléctricos en ${entities.cityName}`,
        "pillar",
        7,
        "contextual"
      ));
      added.add(href);
    }
  }

  return links;
}

function buildSiblingLinks(entities: PageEntities, pageType: string, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  if (pageType === "service-brand" || pageType === "service-brand-city") {
    const otherServices = SERVICE_SLUGS.filter((s) => s !== entities.serviceSlug);
    for (const os of otherServices) {
      const def = SERVICE_DEFINITIONS[os];
      if (!def || !entities.brandSlug) continue;
      const href = `/servicios/${os}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${def.title} ${entities.brandName}`,
          href,
          `${def.title} para ${entities.brandName} eléctrico`,
          "sibling",
          7,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (pageType === "problem-brand" || pageType === "problem-brand-city") {
    const otherProblems = PROBLEM_TOPICS.filter((p) => p.slug !== entities.problemSlug);
    for (const op of otherProblems.slice(0, 4)) {
      if (!entities.brandSlug) continue;
      const href = `/problemas/${op.slug}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${op.name} ${entities.brandName}`,
          href,
          `${op.name} en ${entities.brandName} eléctrico`,
          "sibling",
          6,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (pageType === "brand-pillar" && entities.brandSlug) {
    const otherBrands = Object.entries(BRAND_NAMES).filter(([slug]) => slug !== entities.brandSlug);
    for (const [bs, bn] of otherBrands.slice(0, 4)) {
      const href = `/marcas/${bs}`;
      if (!added.has(href)) {
        links.push(makeLink(bn, href, `${tallerType(bs)} ${bn}`, "sibling", 5, "branded"));
        added.add(href);
      }
    }
  }

  if (pageType === "sub-service-brand" && entities.subServiceSlug && entities.serviceSlug) {
    const subs = SUB_SERVICE_SLUGS[entities.serviceSlug] || [];
    for (const sub of subs) {
      if (sub.slug === entities.subServiceSlug || !entities.brandSlug) continue;
      const href = `/servicios/${sub.slug}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${sub.name} ${entities.brandName}`,
          href,
          `${sub.name} para ${entities.brandName}`,
          "sibling",
          6,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  return links;
}

function buildChildLinks(entities: PageEntities, pageType: string, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  if (pageType === "service-brand" && entities.serviceSlug && entities.brandSlug) {
    for (const city of SERVICE_CITIES.slice(0, 4)) {
      const href = `/servicios/${entities.serviceSlug}-${entities.brandSlug}-${city.slug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.serviceName} ${entities.brandName} en ${city.city}`,
          href,
          `${entities.serviceName} para ${entities.brandName} en ${city.city}`,
          "child",
          6,
          "contextual"
        ));
        added.add(href);
      }
    }

    const subs = SUB_SERVICE_SLUGS[entities.serviceSlug] || [];
    for (const sub of subs.slice(0, 3)) {
      const href = `/servicios/${sub.slug}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${sub.name} ${entities.brandName}`,
          href,
          `${sub.name} para ${entities.brandName}`,
          "child",
          5,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (pageType === "service-pillar" && entities.serviceSlug) {
    for (const [bs, bn] of Object.entries(BRAND_NAMES).slice(0, 6)) {
      const href = `/servicios/${entities.serviceSlug}-${bs}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.serviceName} ${bn}`,
          href,
          `${entities.serviceName} para ${bn}`,
          "child",
          8,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (pageType === "brand-pillar" && entities.brandSlug) {
    for (const ss of SERVICE_SLUGS) {
      const def = SERVICE_DEFINITIONS[ss];
      if (!def) continue;
      const href = `/servicios/${ss}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${def.title} ${entities.brandName}`,
          href,
          `${def.title} para ${entities.brandName}`,
          "child",
          8,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (pageType === "problem-brand" && entities.problemSlug && entities.brandSlug) {
    for (const city of SERVICE_CITIES.slice(0, 3)) {
      const href = `/problemas/${entities.problemSlug}-${entities.brandSlug}-${city.slug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.problemName} ${entities.brandName} en ${city.city}`,
          href,
          `Solucionar ${entities.problemName} de ${entities.brandName} en ${city.city}`,
          "child",
          5,
          "contextual"
        ));
        added.add(href);
      }
    }
  }

  return links;
}

function buildParentLinks(entities: PageEntities, pageType: string, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  if (pageType === "service-brand-city" && entities.serviceSlug && entities.brandSlug) {
    const href = `/servicios/${entities.serviceSlug}-${entities.brandSlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        `${entities.serviceName} ${entities.brandName}`,
        href,
        `${entities.serviceName} para ${entities.brandName} eléctrico`,
        "parent",
        8,
        "exact-match"
      ));
      added.add(href);
    }
  }

  if (pageType === "problem-brand-city" && entities.problemSlug && entities.brandSlug) {
    const href = `/problemas/${entities.problemSlug}-${entities.brandSlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        `${entities.problemName} ${entities.brandName}`,
        href,
        `${entities.problemName} en ${entities.brandName}`,
        "parent",
        8,
        "exact-match"
      ));
      added.add(href);
    }
  }

  if (pageType === "sub-service-brand" && entities.serviceSlug && entities.brandSlug) {
    const href = `/servicios/${entities.serviceSlug}-${entities.brandSlug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        `${entities.serviceName} ${entities.brandName}`,
        href,
        `Todos los servicios de ${entities.serviceName} para ${entities.brandName}`,
        "parent",
        8,
        "exact-match"
      ));
      added.add(href);
    }
  }

  return links;
}

function buildCrossEntityLinks(entities: PageEntities, pageType: string, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  if (entities.brandSlug && entities.serviceSlug) {
    const otherBrands = Object.entries(BRAND_NAMES).filter(([slug]) => slug !== entities.brandSlug);
    for (const [bs, bn] of otherBrands.slice(0, 3)) {
      const href = `/servicios/${entities.serviceSlug}-${bs}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.serviceName} ${bn}`,
          href,
          `${entities.serviceName} para ${bn}`,
          "cross-entity",
          4,
          "exact-match"
        ));
        added.add(href);
      }
    }
  }

  if (entities.problemSlug && entities.brandSlug) {
    const problem = PROBLEM_TOPICS.find((p) => p.slug === entities.problemSlug);
    if (problem) {
      for (const rs of problem.relatedServices.slice(0, 2)) {
        const def = SERVICE_DEFINITIONS[rs];
        if (!def) continue;
        const href = `/servicios/${rs}-${entities.brandSlug}`;
        if (!added.has(href)) {
          links.push(makeLink(
            `${def.title} ${entities.brandName}`,
            href,
            `${def.title} para ${entities.brandName}`,
            "cross-entity",
            6,
            "contextual"
          ));
          added.add(href);
        }
      }
    }
  }

  if (entities.brandSlug && !entities.problemSlug) {
    const relatedProblems = PROBLEM_TOPICS.filter((p) =>
      entities.serviceSlug ? p.relatedServices.includes(entities.serviceSlug) : true
    ).slice(0, 2);
    for (const rp of relatedProblems) {
      const href = `/problemas/${rp.slug}-${entities.brandSlug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${rp.name} ${entities.brandName}`,
          href,
          `Solucionar ${rp.name} en ${entities.brandName}`,
          "cross-entity",
          4,
          "contextual"
        ));
        added.add(href);
      }
    }
  }

  return links;
}

function buildGeographicLinks(entities: PageEntities, pageType: string, currentPath: string, childLinkHrefs: Set<string>): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath, ...childLinkHrefs]);

  const otherCities = SERVICE_CITIES.filter((c) => c.slug !== entities.citySlug);

  if (pageType !== "service-brand" && entities.serviceSlug && entities.brandSlug) {
    for (const city of otherCities.slice(0, 3)) {
      const href = `/servicios/${entities.serviceSlug}-${entities.brandSlug}-${city.slug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.serviceName} ${entities.brandName} en ${city.city}`,
          href,
          `${entities.serviceName} para ${entities.brandName} en ${city.city}`,
          "geographic",
          4,
          "contextual"
        ));
        added.add(href);
      }
    }
  } else if (entities.problemSlug && entities.brandSlug) {
    for (const city of otherCities.slice(0, 3)) {
      const href = `/problemas/${entities.problemSlug}-${entities.brandSlug}-${city.slug}`;
      if (!added.has(href)) {
        links.push(makeLink(
          `${entities.problemName} ${entities.brandName} en ${city.city}`,
          href,
          `${entities.problemName} de ${entities.brandName} en ${city.city}`,
          "geographic",
          4,
          "contextual"
        ));
        added.add(href);
      }
    }
  }

  for (const city of otherCities.slice(0, 2)) {
    const href = `/taller-electricos-${city.slug}`;
    if (!added.has(href)) {
      links.push(makeLink(
        `Taller en ${city.city}`,
        href,
        `Taller de eléctricos en ${city.city}`,
        "geographic",
        3,
        "navigational"
      ));
      added.add(href);
    }
  }

  return links;
}

function buildFAQLinks(entities: PageEntities, currentPath: string): OptimizedLink[] {
  const links: OptimizedLink[] = [];
  const added = new Set<string>([currentPath]);

  const faqCategories = [
    { slug: "autonomia", text: "Autonomía real", title: "Preguntas sobre autonomía" },
    { slug: "carga", text: "Carga y cargadores", title: "Preguntas sobre carga" },
    { slug: "costes", text: "Costes de mantenimiento", title: "Preguntas sobre costes" },
    { slug: "bateria", text: "Batería y garantía", title: "Preguntas sobre batería" },
  ];

  const relevant = entities.serviceSlug === "carga"
    ? faqCategories.filter((f) => f.slug === "carga" || f.slug === "costes")
    : entities.serviceSlug === "garantia"
    ? faqCategories.filter((f) => f.slug === "bateria" || f.slug === "costes")
    : entities.serviceSlug === "mantenimiento"
    ? faqCategories.filter((f) => f.slug === "costes" || f.slug === "autonomia")
    : faqCategories.slice(0, 2);

  for (const faq of relevant) {
    const href = `/preguntas/${faq.slug}`;
    if (!added.has(href)) {
      links.push(makeLink(faq.text, href, faq.title, "faq", 4, "contextual"));
      added.add(href);
    }
  }

  const mainFaq = "/preguntas";
  if (!added.has(mainFaq)) {
    links.push(makeLink("Preguntas frecuentes", mainFaq, "Todas las preguntas sobre eléctricos", "faq", 3, "navigational"));
  }

  return links;
}

function buildCTALinks(entities: PageEntities): OptimizedLink[] {
  const links: OptimizedLink[] = [];

  links.push(makeLink(
    "Solicitar cita",
    "/contacto",
    "Contacta con Grupo Avisa",
    "cta",
    10,
    "generic"
  ));

  if (entities.brandSlug && entities.brandName) {
    links.push(makeLink(
      `Ver catálogo ${entities.brandName}`,
      `/marcas/${entities.brandSlug}`,
      `Catálogo ${entities.brandName} eléctrico`,
      "cta",
      6,
      "branded"
    ));
  }

  return links;
}

function buildContextualInsertions(entities: PageEntities, pageType: string): ContextualInsertion[] {
  const insertions: ContextualInsertion[] = [];

  if (entities.brandName) {
    insertions.push({
      targetText: entities.brandName,
      replacementAnchor: entities.brandName,
      href: `/marcas/${entities.brandSlug}`,
      position: "inline",
    });
  }

  if (entities.serviceName && entities.serviceSlug) {
    insertions.push({
      targetText: entities.serviceName.toLowerCase(),
      replacementAnchor: entities.serviceName.toLowerCase(),
      href: `/servicios/${entities.serviceSlug}`,
      position: "inline",
    });
  }

  if (entities.cityName && entities.citySlug) {
    insertions.push({
      targetText: entities.cityName,
      replacementAnchor: `taller en ${entities.cityName}`,
      href: `/taller-electricos-${entities.citySlug}`,
      position: "inline",
    });
  }

  const models = entities.brandSlug ? (VEHICLE_MODEL_FAMILIES[entities.brandSlug] || []) : [];
  for (const model of models.slice(0, 2)) {
    if (entities.serviceSlug && entities.brandSlug) {
      insertions.push({
        targetText: model,
        replacementAnchor: model,
        href: `/servicios/${entities.serviceSlug}-${entities.brandSlug}`,
        position: "inline",
      });
    }
  }

  if (entities.problemSlug && entities.brandSlug) {
    const problem = PROBLEM_TOPICS.find((p) => p.slug === entities.problemSlug);
    if (problem) {
      for (const rs of problem.relatedServices.slice(0, 2)) {
        const def = SERVICE_DEFINITIONS[rs];
        if (!def) continue;
        insertions.push({
          targetText: def.title.toLowerCase(),
          replacementAnchor: `servicio de ${def.title.toLowerCase()}`,
          href: `/servicios/${rs}-${entities.brandSlug}`,
          position: "end-of-paragraph",
        });
      }
    }
  }

  return insertions;
}

function buildInboundOpportunities(entities: PageEntities, pageType: string, currentPath: string): InboundOpportunity[] {
  const opportunities: InboundOpportunity[] = [];

  if (entities.brandSlug && entities.brandName) {
    opportunities.push({
      fromPage: `/marcas/${entities.brandSlug}`,
      fromPageLabel: `Página de ${entities.brandName}`,
      suggestedAnchor: entities.serviceName
        ? `${entities.serviceName} ${entities.brandName}`
        : entities.problemName
        ? `${entities.problemName} ${entities.brandName}`
        : entities.brandName,
      reason: "La página de marca debe enlazar a todos los servicios y problemas de esa marca",
    });
  }

  if (entities.serviceSlug && entities.serviceName) {
    opportunities.push({
      fromPage: `/servicios/${entities.serviceSlug}`,
      fromPageLabel: `Pilar ${entities.serviceName}`,
      suggestedAnchor: entities.brandName
        ? `${entities.serviceName} ${entities.brandName}`
        : entities.serviceName,
      reason: "La página pilar de servicio debe enlazar a todas las variantes por marca",
    });
  }

  if (entities.serviceSlug && entities.brandSlug && entities.citySlug) {
    opportunities.push({
      fromPage: `/servicios/${entities.serviceSlug}-${entities.brandSlug}`,
      fromPageLabel: `${entities.serviceName} ${entities.brandName}`,
      suggestedAnchor: `${entities.serviceName} ${entities.brandName} en ${entities.cityName}`,
      reason: "La página servicio-marca debe enlazar a sus variantes por ciudad",
    });
  }

  if (entities.problemSlug && entities.brandSlug) {
    const problem = PROBLEM_TOPICS.find((p) => p.slug === entities.problemSlug);
    if (problem) {
      for (const rs of problem.relatedServices) {
        const def = SERVICE_DEFINITIONS[rs];
        if (!def) continue;
        opportunities.push({
          fromPage: `/servicios/${rs}-${entities.brandSlug}`,
          fromPageLabel: `${def.title} ${entities.brandName}`,
          suggestedAnchor: `${entities.problemName} en ${entities.brandName}`,
          reason: `La página de ${def.title} debe enlazar al problema relacionado`,
        });
      }
    }
  }

  if (entities.citySlug && entities.cityName) {
    opportunities.push({
      fromPage: `/taller-electricos-${entities.citySlug}`,
      fromPageLabel: `Taller ${entities.cityName}`,
      suggestedAnchor: entities.serviceName
        ? `${entities.serviceName} en ${entities.cityName}`
        : entities.problemName
        ? `${entities.problemName} en ${entities.cityName}`
        : `servicios en ${entities.cityName}`,
      reason: "La página local debe enlazar a los servicios y problemas de esa ciudad",
    });
  }

  return opportunities;
}

export function generateLinkPlan(pagePath: string): LinkPlan {
  const entities = parsePagePath(pagePath);
  const pageType = detectPageType(pagePath, entities);

  const pillarLinks = buildPillarLinks(entities, pagePath);
  const siblingLinks = buildSiblingLinks(entities, pageType, pagePath);
  const childLinks = buildChildLinks(entities, pageType, pagePath);
  const parentLinks = buildParentLinks(entities, pageType, pagePath);
  const crossEntityLinks = buildCrossEntityLinks(entities, pageType, pagePath);
  const childHrefs = new Set(childLinks.map((l) => l.href));
  const geographicLinks = buildGeographicLinks(entities, pageType, pagePath, childHrefs);
  const faqLinks = buildFAQLinks(entities, pagePath);
  const ctaLinks = buildCTALinks(entities);
  const contextualInsertions = buildContextualInsertions(entities, pageType);
  const inboundOpportunities = buildInboundOpportunities(entities, pageType, pagePath);

  const allLinks = [
    ...pillarLinks, ...siblingLinks, ...childLinks, ...parentLinks,
    ...crossEntityLinks, ...geographicLinks, ...faqLinks, ...ctaLinks,
  ];

  const linkDistribution: Record<LinkContext, number> = {
    pillar: pillarLinks.length,
    sibling: siblingLinks.length,
    child: childLinks.length,
    parent: parentLinks.length,
    "cross-entity": crossEntityLinks.length,
    geographic: geographicLinks.length,
    faq: faqLinks.length,
    cta: ctaLinks.length,
    editorial: 0,
    contextual: 0,
    breadcrumb: 0,
  };

  const anchorDistribution: Record<AnchorType, number> = {
    "exact-match": 0, branded: 0, contextual: 0, generic: 0, navigational: 0,
  };
  for (const link of allLinks) {
    anchorDistribution[link.anchor]++;
  }

  return {
    pagePath,
    pageType,
    entities,
    pillarLinks,
    siblingLinks,
    childLinks,
    parentLinks,
    crossEntityLinks,
    geographicLinks,
    faqLinks,
    ctaLinks,
    contextualInsertions,
    totalLinks: allLinks.length,
    linkDistribution,
    anchorDistribution,
    inboundOpportunities,
  };
}

export function generateBulkLinkPlans(paths: string[]): LinkPlan[] {
  return paths.map((p) => generateLinkPlan(p));
}

export interface LinkHealthReport {
  totalPages: number;
  totalOutboundLinks: number;
  avgLinksPerPage: number;
  pagesWithFewLinks: number;
  pagesWithManyLinks: number;
  orphanRisk: string[];
  anchorDiversity: Record<AnchorType, number>;
  contextBalance: Record<LinkContext, number>;
  topLinkedPages: { path: string; inboundCount: number }[];
}

export function analyzeLinkHealth(sampleSize: number = 50): LinkHealthReport {
  const samplePaths: string[] = [];

  for (const ss of SERVICE_SLUGS.slice(0, 3)) {
    for (const bs of Object.keys(BRAND_NAMES).slice(0, 5)) {
      samplePaths.push(`/servicios/${ss}-${bs}`);
    }
  }
  for (const p of PROBLEM_TOPICS.slice(0, 3)) {
    for (const bs of Object.keys(BRAND_NAMES).slice(0, 3)) {
      samplePaths.push(`/problemas/${p.slug}-${bs}`);
    }
  }
  for (const bs of Object.keys(BRAND_NAMES).slice(0, 4)) {
    samplePaths.push(`/marcas/${bs}`);
  }
  for (const ss of SERVICE_SLUGS.slice(0, 2)) {
    samplePaths.push(`/servicios/${ss}`);
  }

  const plans = generateBulkLinkPlans(samplePaths.slice(0, sampleSize));

  const anchorTotal: Record<AnchorType, number> = {
    "exact-match": 0, branded: 0, contextual: 0, generic: 0, navigational: 0,
  };
  const contextTotal: Record<LinkContext, number> = {
    pillar: 0, sibling: 0, child: 0, parent: 0,
    "cross-entity": 0, geographic: 0, faq: 0, cta: 0,
    editorial: 0, contextual: 0, breadcrumb: 0,
  };

  const inboundMap = new Map<string, number>();
  let totalLinks = 0;
  let fewLinks = 0;
  let manyLinks = 0;
  const orphanRisk: string[] = [];

  for (const plan of plans) {
    totalLinks += plan.totalLinks;

    if (plan.totalLinks < 5) {
      fewLinks++;
      orphanRisk.push(plan.pagePath);
    }
    if (plan.totalLinks > 30) manyLinks++;

    for (const [ctx, count] of Object.entries(plan.linkDistribution)) {
      contextTotal[ctx as LinkContext] += count;
    }
    for (const [anchor, count] of Object.entries(plan.anchorDistribution)) {
      anchorTotal[anchor as AnchorType] += count;
    }

    const allLinks = [
      ...plan.pillarLinks, ...plan.siblingLinks, ...plan.childLinks,
      ...plan.parentLinks, ...plan.crossEntityLinks, ...plan.geographicLinks,
      ...plan.faqLinks, ...plan.ctaLinks,
    ];
    for (const link of allLinks) {
      inboundMap.set(link.href, (inboundMap.get(link.href) || 0) + 1);
    }
  }

  const topLinked = [...inboundMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([path, count]) => ({ path, inboundCount: count }));

  return {
    totalPages: plans.length,
    totalOutboundLinks: totalLinks,
    avgLinksPerPage: plans.length > 0 ? Math.round((totalLinks / plans.length) * 10) / 10 : 0,
    pagesWithFewLinks: fewLinks,
    pagesWithManyLinks: manyLinks,
    orphanRisk,
    anchorDiversity: anchorTotal,
    contextBalance: contextTotal,
    topLinkedPages: topLinked,
  };
}
