import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { EDITORIAL_TYPES, type EditorialType } from "./editorial-data";

export interface InternalLink {
  text: string;
  href: string;
  title: string;
  entity: string;
  entityType: "brand" | "service" | "city" | "concept" | "editorial";
  priority: number;
}

interface LinkingConfig {
  maxLinksPerSection: number;
  maxLinksPerEntity: number;
  currentPath?: string;
  excludePaths?: string[];
  preferEntityTypes?: ("brand" | "service" | "city" | "concept" | "editorial")[];
}

const DEFAULT_CONFIG: LinkingConfig = {
  maxLinksPerSection: 5,
  maxLinksPerEntity: 1,
};

interface EntityPattern {
  pattern: RegExp;
  entity: string;
  entityType: "brand" | "service" | "city" | "concept" | "editorial";
  href: string;
  title: string;
  priority: number;
}

const SERVICE_ALIASES: Record<string, string[]> = {
  reparacion: [
    "reparación", "reparar", "reparaciones", "avería", "averías",
    "arreglo", "arreglar",
  ],
  diagnostico: [
    "diagnóstico", "diagnosticar", "diagnósticos", "escáner",
    "análisis electrónico", "lectura de errores",
  ],
  mantenimiento: [
    "mantenimiento", "revisión", "revisiones", "ITV",
    "servicio periódico", "puesta a punto",
  ],
  carga: [
    "punto de carga", "cargador", "wallbox", "carga doméstica",
    "estación de carga", "instalación de carga",
    "recarga", "infraestructura de carga",
  ],
  garantia: [
    "garantía", "garantías", "extensión de garantía",
    "cobertura", "garantía extendida",
  ],
};

const BRAND_ALIASES: Record<string, string[]> = {
  volkswagen: ["Volkswagen", "VW"],
  audi: ["Audi"],
  skoda: ["Škoda", "Skoda"],
  cupra: ["CUPRA", "Cupra"],
  seat: ["SEAT", "Seat"],
  tesla: ["Tesla"],
  byd: ["BYD"],
  hyundai: ["Hyundai"],
  bmw: ["BMW"],
  "mercedes-benz": ["Mercedes-Benz", "Mercedes", "Benz"],
  kia: ["Kia"],
  volvo: ["Volvo"],
  peugeot: ["Peugeot"],
  renault: ["Renault"],
};

const CONCEPT_ENTITIES: { terms: string[]; href: string; title: string; entity: string }[] = [
  {
    terms: ["eléctrico", "eléctricos", "vehículo eléctrico", "vehículos eléctricos", "coche eléctrico", "coches eléctricos", "BEV"],
    href: "/promociones-electricos",
    title: "Catálogo de vehículos 100% eléctricos",
    entity: "vehículos eléctricos",
  },
  {
    terms: ["híbrido", "híbridos", "híbrido enchufable", "híbridos enchufables", "PHEV", "plug-in"],
    href: "/promociones-hibridos",
    title: "Catálogo de vehículos híbridos enchufables",
    entity: "vehículos híbridos",
  },
  {
    terms: ["Plan MOVES", "MOVES III", "ayudas MOVES", "subvención MOVES"],
    href: "/promociones-electricos",
    title: "Promociones y ayudas para vehículos eléctricos",
    entity: "Plan MOVES",
  },
  {
    terms: ["postventa", "servicio postventa", "taller", "taller oficial"],
    href: "/postventa",
    title: "Servicios postventa para eléctricos e híbridos",
    entity: "postventa",
  },
  {
    terms: ["concesionario", "concesionarios", "punto de venta"],
    href: "/concesionarios",
    title: "Red de concesionarios Grupo Avisa",
    entity: "concesionarios",
  },
  {
    terms: ["electrificación", "movilidad eléctrica", "transición eléctrica"],
    href: "/electrificacion",
    title: "Electrificación - Todas las marcas eléctricas",
    entity: "electrificación",
  },
  {
    terms: ["batería de alto voltaje", "batería HV", "batería eléctrica", "pack de baterías"],
    href: "/servicios/diagnostico",
    title: "Diagnóstico de batería de alto voltaje",
    entity: "batería alto voltaje",
  },
  {
    terms: ["frenada regenerativa", "freno regenerativo"],
    href: "/servicios/mantenimiento",
    title: "Mantenimiento del sistema de frenada regenerativa",
    entity: "frenada regenerativa",
  },
];

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function wordBoundaryPattern(term: string): RegExp {
  const escaped = escapeRegex(term);
  return new RegExp(`(?:^|[\\s,.;:!?()\\[\\]"'–—/])${escaped}(?=[\\s,.;:!?()\\[\\]"'–—/]|$)`, "gi");
}

function buildEntityPatterns(): EntityPattern[] {
  const patterns: EntityPattern[] = [];

  for (const [brandSlug, aliases] of Object.entries(BRAND_ALIASES)) {
    const brandName = BRAND_NAMES[brandSlug] || aliases[0];
    const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
    const tallerLabel = isOfficial ? "Taller Oficial" : "Taller Especializado";

    for (const alias of aliases) {
      patterns.push({
        pattern: wordBoundaryPattern(alias),
        entity: brandName,
        entityType: "brand",
        href: `/marcas/${brandSlug}`,
        title: `${tallerLabel} ${brandName} Eléctrico`,
        priority: 10,
      });
    }
  }

  for (const [serviceSlug, aliases] of Object.entries(SERVICE_ALIASES)) {
    const def = SERVICE_DEFINITIONS[serviceSlug];
    if (!def) continue;

    for (const alias of aliases) {
      patterns.push({
        pattern: wordBoundaryPattern(alias),
        entity: def.title,
        entityType: "service",
        href: `/servicios/${serviceSlug}`,
        title: `${def.title} de Vehículos Eléctricos e Híbridos`,
        priority: 8,
      });
    }
  }

  for (const cityData of SERVICE_CITIES) {
    patterns.push({
      pattern: wordBoundaryPattern(cityData.city),
      entity: cityData.city,
      entityType: "city",
      href: `/taller-electricos-${cityData.slug}`,
      title: `Taller de Eléctricos en ${cityData.city}`,
      priority: 6,
    });
  }

  for (const concept of CONCEPT_ENTITIES) {
    for (const term of concept.terms) {
      patterns.push({
        pattern: wordBoundaryPattern(term),
        entity: concept.entity,
        entityType: "concept",
        href: concept.href,
        title: concept.title,
        priority: 5,
      });
    }
  }

  for (const [key, config] of Object.entries(EDITORIAL_TYPES)) {
    const terms = [config.plural.toLowerCase(), config.singular.toLowerCase()];
    for (const term of terms) {
      patterns.push({
        pattern: wordBoundaryPattern(term),
        entity: config.plural,
        entityType: "editorial",
        href: `/${config.slug}`,
        title: config.metaTitle,
        priority: 4,
      });
    }
  }

  return patterns.sort((a, b) => b.priority - a.priority);
}

let cachedPatterns: EntityPattern[] | null = null;
function getPatterns(): EntityPattern[] {
  if (!cachedPatterns) cachedPatterns = buildEntityPatterns();
  return cachedPatterns;
}

export function detectEntities(
  text: string,
  config: Partial<LinkingConfig> = {}
): InternalLink[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const patterns = getPatterns();
  const candidates: InternalLink[] = [];
  const linkedEntities = new Set<string>();
  const linkedHrefs = new Set<string>();

  if (cfg.currentPath) linkedHrefs.add(cfg.currentPath);
  if (cfg.excludePaths) cfg.excludePaths.forEach(p => linkedHrefs.add(p));

  const collectLimit = cfg.maxLinksPerSection * 3;

  for (const ep of patterns) {
    if (candidates.length >= collectLimit) break;

    const entityKey = `${ep.entityType}:${ep.entity}`;
    if (linkedEntities.has(entityKey)) continue;
    if (linkedHrefs.has(ep.href)) continue;

    ep.pattern.lastIndex = 0;
    if (ep.pattern.test(text)) {
      ep.pattern.lastIndex = 0;

      candidates.push({
        text: ep.entity,
        href: ep.href,
        title: ep.title,
        entity: ep.entity,
        entityType: ep.entityType,
        priority: ep.priority,
      });

      linkedEntities.add(entityKey);
      linkedHrefs.add(ep.href);
    }
  }

  if (cfg.preferEntityTypes && cfg.preferEntityTypes.length > 0) {
    const preferSet = new Set(cfg.preferEntityTypes);
    candidates.sort((a, b) => {
      const aPref = preferSet.has(a.entityType) ? 0 : 1;
      const bPref = preferSet.has(b.entityType) ? 0 : 1;
      if (aPref !== bPref) return aPref - bPref;
      return b.priority - a.priority;
    });
  }

  return candidates.slice(0, cfg.maxLinksPerSection);
}

export function annotateText(
  html: string,
  config: Partial<LinkingConfig> = {}
): { html: string; links: InternalLink[] } {
  const plainText = html.replace(/<[^>]*>/g, " ");
  const links = detectEntities(plainText, config);

  if (links.length === 0) return { html, links };

  let annotated = html;
  const applied = new Set<string>();

  for (const link of links) {
    if (applied.has(link.entity)) continue;

    const patterns = getPatterns().filter(
      p => p.entity === link.entity && p.entityType === link.entityType
    );

    let matched = false;
    for (const ep of patterns) {
      if (matched) break;

      const linkTag = `<a href="${link.href}" title="${link.title}" class="auto-link" data-entity-type="${link.entityType}">`;

      annotated = annotated.replace(
        new RegExp(
          `(?<!<a[^>]*>)(?<![\\w-])${escapeRegex(ep.entity)}(?![\\w-])(?![^<]*<\\/a>)`,
          "i"
        ),
        (match) => {
          matched = true;
          return `${linkTag}${match}</a>`;
        }
      );
    }

    if (matched) applied.add(link.entity);
  }

  return { html: annotated, links };
}

export function getRelatedPages(
  currentPath: string,
  config: Partial<LinkingConfig> = {}
): InternalLink[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const related: InternalLink[] = [];
  const addedHrefs = new Set<string>([currentPath]);

  const segments = currentPath.split("/").filter(Boolean);

  if (segments[0] === "servicios" && segments[1]) {
    const slug = segments[1];

    const serviceSlug = SERVICE_SLUGS.find(s => slug === s || slug.startsWith(s + "-"));
    if (serviceSlug) {
      const def = SERVICE_DEFINITIONS[serviceSlug];
      const isCluster = slug !== serviceSlug;

      if (isCluster) {
        const brandSlug = slug.replace(serviceSlug + "-", "");
        const brandName = BRAND_NAMES[brandSlug];

        if (brandName && !addedHrefs.has(`/marcas/${brandSlug}`)) {
          related.push({
            text: brandName,
            href: `/marcas/${brandSlug}`,
            title: `Página de ${brandName}`,
            entity: brandName,
            entityType: "brand",
            priority: 10,
          });
          addedHrefs.add(`/marcas/${brandSlug}`);
        }

        if (!addedHrefs.has(`/servicios/${serviceSlug}`)) {
          related.push({
            text: `Todos los ${def.title.toLowerCase()}`,
            href: `/servicios/${serviceSlug}`,
            title: `${def.title} por marca`,
            entity: def.title,
            entityType: "service",
            priority: 9,
          });
          addedHrefs.add(`/servicios/${serviceSlug}`);
        }

        for (const [otherSlug, otherDef] of Object.entries(SERVICE_DEFINITIONS)) {
          if (otherSlug === serviceSlug) continue;
          const otherHref = `/servicios/${otherSlug}-${brandSlug}`;
          if (!addedHrefs.has(otherHref)) {
            related.push({
              text: `${otherDef.title} ${brandName}`,
              href: otherHref,
              title: `${otherDef.title} para ${brandName}`,
              entity: otherDef.title,
              entityType: "service",
              priority: 7,
            });
            addedHrefs.add(otherHref);
          }
        }
      } else {
        const topBrands = Object.entries(BRAND_NAMES).slice(0, 4);
        for (const [bs, bn] of topBrands) {
          const clusterHref = `/servicios/${serviceSlug}-${bs}`;
          if (!addedHrefs.has(clusterHref)) {
            related.push({
              text: `${def.title} ${bn}`,
              href: clusterHref,
              title: `${def.title} para ${bn}`,
              entity: bn,
              entityType: "brand",
              priority: 8,
            });
            addedHrefs.add(clusterHref);
          }
        }
      }
    }
  }

  if (segments[0] === "marcas" && segments[1]) {
    const brandSlug = segments[1];
    const brandName = BRAND_NAMES[brandSlug];
    if (brandName) {
      for (const [sSlug, sDef] of Object.entries(SERVICE_DEFINITIONS)) {
        const sHref = `/servicios/${sSlug}-${brandSlug}`;
        if (!addedHrefs.has(sHref)) {
          related.push({
            text: `${sDef.title} ${brandName}`,
            href: sHref,
            title: `${sDef.title} para ${brandName}`,
            entity: sDef.title,
            entityType: "service",
            priority: 9,
          });
          addedHrefs.add(sHref);
        }
      }
    }
  }

  if (currentPath.startsWith("/taller-electricos-")) {
    const citySlug = currentPath.replace("/taller-electricos-", "");
    for (const otherCity of SERVICE_CITIES) {
      if (otherCity.slug === citySlug) continue;
      const otherHref = `/taller-electricos-${otherCity.slug}`;
      if (!addedHrefs.has(otherHref)) {
        related.push({
          text: `Taller en ${otherCity.city}`,
          href: otherHref,
          title: `Taller de eléctricos en ${otherCity.city}`,
          entity: otherCity.city,
          entityType: "city",
          priority: 6,
        });
        addedHrefs.add(otherHref);
      }
    }
  }

  if (segments[0] === "vehiculos") {
    const isElectric = segments[1] === "electricos";
    const altType = isElectric ? "híbridos" : "eléctricos";
    const altHref = isElectric ? "/promociones-hibridos" : "/promociones-electricos";
    related.push({
      text: `Ver ${altType}`,
      href: altHref,
      title: `Catálogo de vehículos ${altType}`,
      entity: altType,
      entityType: "concept",
      priority: 7,
    });
    related.push({
      text: "Servicios postventa",
      href: "/postventa",
      title: "Servicios postventa para eléctricos e híbridos",
      entity: "postventa",
      entityType: "service",
      priority: 6,
    });
  }

  return related.slice(0, cfg.maxLinksPerSection);
}

export function buildSectionLinks(
  sectionContent: string,
  currentPath: string,
  options: {
    maxLinks?: number;
    preferEntityTypes?: ("brand" | "service" | "city" | "concept" | "editorial")[];
    additionalExclude?: string[];
  } = {}
): InternalLink[] {
  const { maxLinks = 5, preferEntityTypes, additionalExclude = [] } = options;

  const excludeSet = new Set([currentPath, ...additionalExclude]);

  const contentLinks = detectEntities(sectionContent, {
    maxLinksPerSection: maxLinks,
    currentPath,
    excludePaths: additionalExclude,
    preferEntityTypes,
  });

  const contextLinks = getRelatedPages(currentPath, {
    maxLinksPerSection: Math.max(0, maxLinks - contentLinks.length),
  });

  const allHrefs = new Set(contentLinks.map(l => l.href));
  const merged = [...contentLinks];
  for (const cl of contextLinks) {
    if (merged.length >= maxLinks) break;
    if (allHrefs.has(cl.href)) continue;
    if (excludeSet.has(cl.href)) continue;
    merged.push(cl);
    allHrefs.add(cl.href);
  }

  return merged;
}

export function generateLinkGraph(): {
  nodes: { path: string; label: string; type: string }[];
  edges: { from: string; to: string; label: string }[];
} {
  const nodes: { path: string; label: string; type: string }[] = [];
  const edges: { from: string; to: string; label: string }[] = [];

  nodes.push({ path: "/", label: "Inicio", type: "home" });
  nodes.push({ path: "/postventa", label: "Postventa", type: "hub" });
  nodes.push({ path: "/electrificacion", label: "Electrificación", type: "hub" });
  nodes.push({ path: "/concesionarios", label: "Concesionarios", type: "hub" });
  nodes.push({ path: "/promociones-electricos", label: "Eléctricos", type: "catalog" });
  nodes.push({ path: "/promociones-hibridos", label: "Híbridos", type: "catalog" });
  nodes.push({ path: "/preguntas", label: "FAQ", type: "hub" });

  for (const [slug, def] of Object.entries(SERVICE_DEFINITIONS)) {
    const pillarPath = `/servicios/${slug}`;
    nodes.push({ path: pillarPath, label: def.title, type: "service-pillar" });
    edges.push({ from: "/postventa", to: pillarPath, label: "servicio" });

    for (const [brandSlug, brandName] of Object.entries(BRAND_NAMES)) {
      const clusterPath = `/servicios/${slug}-${brandSlug}`;
      nodes.push({ path: clusterPath, label: `${def.title} ${brandName}`, type: "service-cluster" });
      edges.push({ from: pillarPath, to: clusterPath, label: "marca" });
      edges.push({ from: `/marcas/${brandSlug}`, to: clusterPath, label: "servicio" });
    }
  }

  for (const [brandSlug, brandName] of Object.entries(BRAND_NAMES)) {
    const brandPath = `/marcas/${brandSlug}`;
    nodes.push({ path: brandPath, label: brandName, type: "brand" });
    edges.push({ from: "/electrificacion", to: brandPath, label: "marca" });
  }

  for (const city of SERVICE_CITIES) {
    const cityPath = `/taller-electricos-${city.slug}`;
    nodes.push({ path: cityPath, label: city.city, type: "city" });
    edges.push({ from: "/concesionarios", to: cityPath, label: "ciudad" });
  }

  for (const [, config] of Object.entries(EDITORIAL_TYPES)) {
    const hubPath = `/${config.slug}`;
    nodes.push({ path: hubPath, label: config.plural, type: "editorial-hub" });
    edges.push({ from: "/", to: hubPath, label: "editorial" });
  }

  return { nodes, edges };
}
