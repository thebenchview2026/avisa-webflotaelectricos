import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational" | "local";
export type EntityType = "service" | "brand" | "problem" | "sub-service" | "city" | "model" | "faq-topic" | "comparison";
export type NodeDepth = "pillar" | "cluster" | "leaf" | "micro";
export type RelationType = "parent-child" | "sibling" | "cross-entity" | "semantic" | "geographic" | "faq" | "comparison";

export interface TopicalNode {
  id: string;
  title: string;
  slug: string;
  path: string;
  depth: NodeDepth;
  intent: SearchIntent;
  entities: { type: EntityType; slug: string; name: string }[];
  keywords: string[];
  parentId: string | null;
  childIds: string[];
  relatedIds: string[];
  searchVolumeTier: "high" | "medium" | "low" | "micro";
  competitionLevel: "high" | "medium" | "low";
  contentStatus: "exists" | "planned" | "gap";
  priority: number;
}

export interface TopicalEdge {
  from: string;
  to: string;
  relation: RelationType;
  weight: number;
  label: string;
}

export interface TopicalCluster {
  id: string;
  name: string;
  pillarId: string;
  intent: SearchIntent;
  nodes: TopicalNode[];
  edges: TopicalEdge[];
  coverage: number;
  depth: number;
  keywords: number;
}

export interface TopicalMap {
  timestamp: string;
  pillars: TopicalNode[];
  clusters: TopicalCluster[];
  nodes: TopicalNode[];
  edges: TopicalEdge[];
  stats: TopicalMapStats;
  intentDistribution: Record<SearchIntent, number>;
  depthDistribution: Record<NodeDepth, number>;
  entityCoverage: EntityCoverageReport;
  gaps: TopicalGap[];
}

export interface TopicalMapStats {
  totalNodes: number;
  totalEdges: number;
  totalClusters: number;
  totalPillars: number;
  avgClusterDepth: number;
  avgNodesPerCluster: number;
  totalKeywords: number;
  coverageScore: number;
}

export interface EntityCoverageReport {
  brands: { slug: string; name: string; nodes: number; clusters: number; score: number }[];
  services: { slug: string; name: string; nodes: number; clusters: number; score: number }[];
  problems: { slug: string; name: string; nodes: number; score: number }[];
  cities: { slug: string; name: string; nodes: number; score: number }[];
}

export interface TopicalGap {
  type: "missing-cluster" | "missing-leaf" | "weak-intent" | "no-local" | "no-faq" | "no-comparison";
  description: string;
  suggestedTitle: string;
  suggestedPath: string;
  intent: SearchIntent;
  priority: number;
  entities: string[];
}

const FAQ_TOPICS = [
  { slug: "autonomia", name: "Autonomía y Rango", intent: "informational" as SearchIntent },
  { slug: "carga", name: "Carga y Cargadores", intent: "informational" as SearchIntent },
  { slug: "bateria", name: "Batería y Vida Útil", intent: "informational" as SearchIntent },
  { slug: "costes", name: "Costes y Ahorro", intent: "commercial" as SearchIntent },
  { slug: "garantia", name: "Garantía Eléctricos", intent: "commercial" as SearchIntent },
  { slug: "mantenimiento-ev", name: "Mantenimiento EV", intent: "informational" as SearchIntent },
  { slug: "seguridad", name: "Seguridad EV", intent: "informational" as SearchIntent },
  { slug: "tecnologia", name: "Tecnología EV", intent: "informational" as SearchIntent },
];

const COMPARISON_PAIRS: [string, string][] = [
  ["volkswagen", "tesla"],
  ["volkswagen", "bmw"],
  ["audi", "mercedes-benz"],
  ["audi", "bmw"],
  ["hyundai", "kia"],
  ["byd", "tesla"],
  ["cupra", "volkswagen"],
  ["peugeot", "renault"],
  ["skoda", "volkswagen"],
  ["volvo", "bmw"],
];

const PRICE_QUERIES: { template: string; intent: SearchIntent }[] = [
  { template: "precio {service} {brand}", intent: "commercial" },
  { template: "cuánto cuesta {service} {brand}", intent: "commercial" },
  { template: "cuánto tarda {service} {brand}", intent: "informational" },
  { template: "{service} {brand} opiniones", intent: "informational" },
  { template: "{service} {brand} cerca de mí", intent: "local" },
  { template: "mejor taller {service} {brand}", intent: "transactional" },
  { template: "taller oficial {brand} {city}", intent: "local" },
  { template: "{brand} eléctrico problemas", intent: "informational" },
  { template: "{brand} eléctrico vs híbrido", intent: "commercial" },
];

let nodeCounter = 0;
function nextId(prefix: string): string {
  return `${prefix}-${++nodeCounter}`;
}

function slug(s: string): string {
  return s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function makeNode(
  title: string,
  path: string,
  depth: NodeDepth,
  intent: SearchIntent,
  entities: { type: EntityType; slug: string; name: string }[],
  keywords: string[],
  parentId: string | null,
  volumeTier: "high" | "medium" | "low" | "micro" = "medium",
  competition: "high" | "medium" | "low" = "medium",
  status: "exists" | "planned" | "gap" = "exists",
  priority: number = 5
): TopicalNode {
  return {
    id: nextId("node"),
    title,
    slug: slug(title),
    path,
    depth,
    intent,
    entities,
    keywords,
    parentId,
    childIds: [],
    relatedIds: [],
    searchVolumeTier: volumeTier,
    competitionLevel: competition,
    contentStatus: status,
    priority,
  };
}

function makeEdge(from: string, to: string, relation: RelationType, weight: number, label: string): TopicalEdge {
  return { from, to, relation, weight, label };
}

function brandEntity(brandSlug: string): { type: EntityType; slug: string; name: string } {
  return { type: "brand", slug: brandSlug, name: BRAND_NAMES[brandSlug] || brandSlug };
}

function serviceEntity(serviceSlug: string): { type: EntityType; slug: string; name: string } {
  const def = SERVICE_DEFINITIONS[serviceSlug];
  return { type: "service", slug: serviceSlug, name: def?.title || serviceSlug };
}

function cityEntity(citySlug: string, cityName: string): { type: EntityType; slug: string; name: string } {
  return { type: "city", slug: citySlug, name: cityName };
}

function generateServicePillars(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  const brands = Object.keys(BRAND_NAMES);

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    const serviceName = def.title;

    const pillar = makeNode(
      serviceName,
      `/servicios/${ss}`,
      "pillar",
      "navigational",
      [serviceEntity(ss)],
      [serviceName.toLowerCase(), `${serviceName.toLowerCase()} eléctricos`, `${serviceName.toLowerCase()} híbridos`],
      null,
      "high",
      "high",
      "exists",
      10
    );
    allNodes.push(pillar);

    const clusterNodes: TopicalNode[] = [pillar];
    const clusterEdges: TopicalEdge[] = [];

    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const isOfficial = OFFICIAL_BRANDS.includes(brand);
      const tallerType = isOfficial ? "Taller Oficial" : "Taller Especializado";

      const sbNode = makeNode(
        `${serviceName} ${brandName}`,
        `/servicios/${ss}-${brand}`,
        "cluster",
        "transactional",
        [serviceEntity(ss), brandEntity(brand)],
        [
          `${serviceName.toLowerCase()} ${brandName.toLowerCase()}`,
          `${serviceName.toLowerCase()} ${brandName.toLowerCase()} eléctrico`,
          `${tallerType.toLowerCase()} ${brandName.toLowerCase()} ${serviceName.toLowerCase()}`,
          `precio ${serviceName.toLowerCase()} ${brandName.toLowerCase()}`,
        ],
        pillar.id,
        isOfficial ? "high" : "medium",
        isOfficial ? "medium" : "low",
        "exists",
        isOfficial ? 9 : 7
      );
      pillar.childIds.push(sbNode.id);
      allNodes.push(sbNode);
      clusterNodes.push(sbNode);
      clusterEdges.push(makeEdge(pillar.id, sbNode.id, "parent-child", 10, `${serviceName} → ${brandName}`));

      for (const city of SERVICE_CITIES) {
        const cityNode = makeNode(
          `${serviceName} ${brandName} en ${city.city}`,
          `/servicios/${ss}-${brand}-${city.slug}`,
          "leaf",
          "local",
          [serviceEntity(ss), brandEntity(brand), cityEntity(city.slug, city.city)],
          [
            `${serviceName.toLowerCase()} ${brandName.toLowerCase()} ${city.city.toLowerCase()}`,
            `taller ${brandName.toLowerCase()} ${city.city.toLowerCase()}`,
            `${serviceName.toLowerCase()} coche eléctrico ${city.city.toLowerCase()}`,
          ],
          sbNode.id,
          "low",
          "low",
          "exists",
          5
        );
        sbNode.childIds.push(cityNode.id);
        allNodes.push(cityNode);
        clusterNodes.push(cityNode);
        clusterEdges.push(makeEdge(sbNode.id, cityNode.id, "parent-child", 8, `${brandName} → ${city.city}`));
        clusterEdges.push(makeEdge(pillar.id, cityNode.id, "parent-child", 3, `pilar → local`));
      }
    }

    const subs = SUB_SERVICE_SLUGS[ss] || [];
    for (const sub of subs) {
      for (const brand of brands) {
        const brandName = BRAND_NAMES[brand];
        const subNode = makeNode(
          `${sub.name} ${brandName}`,
          `/servicios/${sub.slug}-${brand}`,
          "leaf",
          "transactional",
          [
            { type: "sub-service", slug: sub.slug, name: sub.name },
            brandEntity(brand),
          ],
          [
            `${sub.name.toLowerCase()} ${brandName.toLowerCase()}`,
            `${sub.name.toLowerCase()} ${brandName.toLowerCase()} precio`,
          ],
          pillar.id,
          "low",
          "low",
          "exists",
          6
        );
        pillar.childIds.push(subNode.id);
        allNodes.push(subNode);
        clusterNodes.push(subNode);
        clusterEdges.push(makeEdge(pillar.id, subNode.id, "parent-child", 6, `pilar → sub-servicio`));
      }
    }

    for (let i = 0; i < brands.length; i++) {
      for (let j = i + 1; j < brands.length; j++) {
        const n1 = clusterNodes.find((n) => n.path === `/servicios/${ss}-${brands[i]}`);
        const n2 = clusterNodes.find((n) => n.path === `/servicios/${ss}-${brands[j]}`);
        if (n1 && n2) {
          clusterEdges.push(makeEdge(n1.id, n2.id, "sibling", 5, `${BRAND_NAMES[brands[i]]} ↔ ${BRAND_NAMES[brands[j]]}`));
        }
      }
    }

    allClusters.push({
      id: `cluster-service-${ss}`,
      name: serviceName,
      pillarId: pillar.id,
      intent: "transactional",
      nodes: clusterNodes,
      edges: clusterEdges,
      coverage: 100,
      depth: 3,
      keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
    });
    allEdges.push(...clusterEdges);
  }
}

function generateBrandPillars(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  const brands = Object.keys(BRAND_NAMES);

  for (const brand of brands) {
    const brandName = BRAND_NAMES[brand];
    const isOfficial = OFFICIAL_BRANDS.includes(brand);

    const pillar = makeNode(
      `${brandName} Eléctricos`,
      `/marcas/${brand}`,
      "pillar",
      "navigational",
      [brandEntity(brand)],
      [
        `${brandName.toLowerCase()} eléctrico`,
        `coches eléctricos ${brandName.toLowerCase()}`,
        `taller ${brandName.toLowerCase()} eléctrico`,
        isOfficial ? `taller oficial ${brandName.toLowerCase()}` : `taller especializado ${brandName.toLowerCase()}`,
      ],
      null,
      isOfficial ? "high" : "medium",
      "high",
      "exists",
      10
    );
    allNodes.push(pillar);

    const clusterNodes: TopicalNode[] = [pillar];
    const clusterEdges: TopicalEdge[] = [];

    const serviceNodes = allNodes.filter((n) =>
      n.depth === "cluster" && n.entities.some((e) => e.type === "brand" && e.slug === brand) &&
      n.entities.some((e) => e.type === "service")
    );
    for (const sn of serviceNodes) {
      pillar.childIds.push(sn.id);
      sn.relatedIds.push(pillar.id);
      clusterEdges.push(makeEdge(pillar.id, sn.id, "parent-child", 9, `${brandName} → ${sn.title}`));
      clusterNodes.push(sn);
    }

    const models = VEHICLE_MODEL_FAMILIES[brand] || [];
    for (const model of models) {
      const modelNode = makeNode(
        `${model} — Servicio y Mantenimiento`,
        `/marcas/${brand}#${slug(model)}`,
        "micro",
        "informational",
        [
          brandEntity(brand),
          { type: "model", slug: slug(model), name: model },
        ],
        [
          `${model.toLowerCase()} mantenimiento`,
          `${model.toLowerCase()} problemas`,
          `${model.toLowerCase()} taller`,
          `${model.toLowerCase()} revisión`,
        ],
        pillar.id,
        "low",
        "low",
        "planned",
        4
      );
      pillar.childIds.push(modelNode.id);
      allNodes.push(modelNode);
      clusterNodes.push(modelNode);
      clusterEdges.push(makeEdge(pillar.id, modelNode.id, "parent-child", 4, `${brandName} → modelo`));
    }

    allClusters.push({
      id: `cluster-brand-${brand}`,
      name: `${brandName} (${isOfficial ? "Oficial" : "Especializado"})`,
      pillarId: pillar.id,
      intent: "navigational",
      nodes: clusterNodes,
      edges: clusterEdges,
      coverage: 100,
      depth: 2,
      keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
    });
    allEdges.push(...clusterEdges);
  }
}

function generateProblemClusters(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  const brands = Object.keys(BRAND_NAMES);

  for (const problem of PROBLEM_TOPICS) {
    const problemPillar = makeNode(
      problem.name,
      `/problemas/${problem.slug}`,
      "pillar",
      "informational",
      [{ type: "problem", slug: problem.slug, name: problem.name }],
      [
        problem.name.toLowerCase(),
        `${problem.name.toLowerCase()} coche eléctrico`,
        `solución ${problem.name.toLowerCase()}`,
        `causas ${problem.name.toLowerCase()}`,
      ],
      null,
      "medium",
      "medium",
      "planned",
      8
    );
    allNodes.push(problemPillar);

    const clusterNodes: TopicalNode[] = [problemPillar];
    const clusterEdges: TopicalEdge[] = [];

    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const pbNode = makeNode(
        `${problem.name} ${brandName}`,
        `/problemas/${problem.slug}-${brand}`,
        "cluster",
        "informational",
        [
          { type: "problem", slug: problem.slug, name: problem.name },
          brandEntity(brand),
        ],
        [
          `${problem.name.toLowerCase()} ${brandName.toLowerCase()}`,
          `${brandName.toLowerCase()} ${problem.name.toLowerCase()} solución`,
          `${brandName.toLowerCase()} eléctrico ${problem.name.toLowerCase()}`,
        ],
        problemPillar.id,
        "low",
        "low",
        "exists",
        6
      );
      problemPillar.childIds.push(pbNode.id);
      allNodes.push(pbNode);
      clusterNodes.push(pbNode);
      clusterEdges.push(makeEdge(problemPillar.id, pbNode.id, "parent-child", 8, `${problem.name} → ${brandName}`));

      for (const city of SERVICE_CITIES) {
        const pbcNode = makeNode(
          `${problem.name} ${brandName} en ${city.city}`,
          `/problemas/${problem.slug}-${brand}-${city.slug}`,
          "leaf",
          "local",
          [
            { type: "problem", slug: problem.slug, name: problem.name },
            brandEntity(brand),
            cityEntity(city.slug, city.city),
          ],
          [
            `${problem.name.toLowerCase()} ${brandName.toLowerCase()} ${city.city.toLowerCase()}`,
            `solucionar ${problem.name.toLowerCase()} ${city.city.toLowerCase()}`,
          ],
          pbNode.id,
          "micro",
          "low",
          "exists",
          4
        );
        pbNode.childIds.push(pbcNode.id);
        allNodes.push(pbcNode);
        clusterNodes.push(pbcNode);
        clusterEdges.push(makeEdge(pbNode.id, pbcNode.id, "parent-child", 6, `${brandName} → ${city.city}`));
      }
    }

    for (const relService of problem.relatedServices) {
      const serviceNodes = allNodes.filter((n) =>
        n.depth === "pillar" && n.entities.some((e) => e.type === "service" && e.slug === relService)
      );
      for (const sn of serviceNodes) {
        clusterEdges.push(makeEdge(problemPillar.id, sn.id, "cross-entity", 7, `${problem.name} ↔ ${sn.title}`));
        problemPillar.relatedIds.push(sn.id);
        sn.relatedIds.push(problemPillar.id);
      }
    }

    allClusters.push({
      id: `cluster-problem-${problem.slug}`,
      name: problem.name,
      pillarId: problemPillar.id,
      intent: "informational",
      nodes: clusterNodes,
      edges: clusterEdges,
      coverage: 100,
      depth: 3,
      keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
    });
    allEdges.push(...clusterEdges);
  }
}

function generateFAQClusters(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  const faqPillar = makeNode(
    "Preguntas Frecuentes sobre Vehículos Eléctricos",
    "/preguntas",
    "pillar",
    "informational",
    [{ type: "faq-topic", slug: "faq-general", name: "FAQ General" }],
    ["preguntas frecuentes coche eléctrico", "dudas coche eléctrico", "faq vehículo eléctrico"],
    null,
    "high",
    "low",
    "exists",
    8
  );
  allNodes.push(faqPillar);

  const clusterNodes: TopicalNode[] = [faqPillar];
  const clusterEdges: TopicalEdge[] = [];

  for (const topic of FAQ_TOPICS) {
    const topicNode = makeNode(
      topic.name,
      `/preguntas/${topic.slug}`,
      "cluster",
      topic.intent,
      [{ type: "faq-topic", slug: topic.slug, name: topic.name }],
      [
        `${topic.name.toLowerCase()} coche eléctrico`,
        `${topic.name.toLowerCase()} vehículo eléctrico`,
        `preguntas ${topic.name.toLowerCase()}`,
      ],
      faqPillar.id,
      "medium",
      "low",
      "exists",
      6
    );
    faqPillar.childIds.push(topicNode.id);
    allNodes.push(topicNode);
    clusterNodes.push(topicNode);
    clusterEdges.push(makeEdge(faqPillar.id, topicNode.id, "parent-child", 8, `FAQ → ${topic.name}`));
  }

  const brands = Object.keys(BRAND_NAMES);
  for (const brand of brands.slice(0, 6)) {
    const brandName = BRAND_NAMES[brand];
    const brandFaqNode = makeNode(
      `Preguntas sobre ${brandName} Eléctrico`,
      `/preguntas/${brand}-electrico`,
      "leaf",
      "informational",
      [{ type: "faq-topic", slug: `faq-${brand}`, name: `FAQ ${brandName}` }, brandEntity(brand)],
      [
        `preguntas ${brandName.toLowerCase()} eléctrico`,
        `dudas ${brandName.toLowerCase()} eléctrico`,
        `${brandName.toLowerCase()} eléctrico opiniones`,
      ],
      faqPillar.id,
      "low",
      "low",
      "planned",
      5
    );
    faqPillar.childIds.push(brandFaqNode.id);
    allNodes.push(brandFaqNode);
    clusterNodes.push(brandFaqNode);
    clusterEdges.push(makeEdge(faqPillar.id, brandFaqNode.id, "parent-child", 5, `FAQ → ${brandName}`));
  }

  allClusters.push({
    id: "cluster-faq",
    name: "Preguntas Frecuentes",
    pillarId: faqPillar.id,
    intent: "informational",
    nodes: clusterNodes,
    edges: clusterEdges,
    coverage: 100,
    depth: 2,
    keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
  });
  allEdges.push(...clusterEdges);
}

function generateLocalClusters(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  for (const city of SERVICE_CITIES) {
    const localPillar = makeNode(
      `Taller de Eléctricos en ${city.city}`,
      `/taller-electricos-${city.slug}`,
      "pillar",
      "local",
      [cityEntity(city.slug, city.city)],
      [
        `taller eléctricos ${city.city.toLowerCase()}`,
        `taller coches eléctricos ${city.city.toLowerCase()}`,
        `reparación eléctrico ${city.city.toLowerCase()}`,
        `taller híbridos ${city.city.toLowerCase()}`,
      ],
      null,
      city.slug === "sevilla" ? "high" : "medium",
      "medium",
      "exists",
      9
    );
    allNodes.push(localPillar);

    const clusterNodes: TopicalNode[] = [localPillar];
    const clusterEdges: TopicalEdge[] = [];

    const cityLeaves = allNodes.filter((n) =>
      n.depth === "leaf" && n.intent === "local" &&
      n.entities.some((e) => e.type === "city" && e.slug === city.slug)
    );
    for (const leaf of cityLeaves.slice(0, 20)) {
      localPillar.relatedIds.push(leaf.id);
      leaf.relatedIds.push(localPillar.id);
      clusterEdges.push(makeEdge(localPillar.id, leaf.id, "geographic", 6, `${city.city} → ${leaf.title}`));
      clusterNodes.push(leaf);
    }

    allClusters.push({
      id: `cluster-local-${city.slug}`,
      name: `${city.city} — Cobertura Local`,
      pillarId: localPillar.id,
      intent: "local",
      nodes: clusterNodes,
      edges: clusterEdges,
      coverage: 100,
      depth: 2,
      keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
    });
    allEdges.push(...clusterEdges);
  }
}

function generateComparisonNodes(allNodes: TopicalNode[], allEdges: TopicalEdge[], allClusters: TopicalCluster[]): void {
  const clusterNodes: TopicalNode[] = [];
  const clusterEdges: TopicalEdge[] = [];

  const compPillar = makeNode(
    "Comparativas de Marcas Eléctricas",
    "/comparativas",
    "pillar",
    "commercial",
    [{ type: "comparison", slug: "comparativas", name: "Comparativas" }],
    ["comparativa coches eléctricos", "mejor coche eléctrico", "comparar marcas eléctricas"],
    null,
    "high",
    "medium",
    "planned",
    7
  );
  allNodes.push(compPillar);
  clusterNodes.push(compPillar);

  for (const [brandA, brandB] of COMPARISON_PAIRS) {
    const nameA = BRAND_NAMES[brandA];
    const nameB = BRAND_NAMES[brandB];
    const compNode = makeNode(
      `${nameA} vs ${nameB} — Eléctricos`,
      `/comparativas/${brandA}-vs-${brandB}`,
      "leaf",
      "commercial",
      [
        brandEntity(brandA),
        brandEntity(brandB),
        { type: "comparison", slug: `${brandA}-vs-${brandB}`, name: `${nameA} vs ${nameB}` },
      ],
      [
        `${nameA.toLowerCase()} vs ${nameB.toLowerCase()} eléctrico`,
        `${nameA.toLowerCase()} o ${nameB.toLowerCase()} eléctrico`,
        `comparar ${nameA.toLowerCase()} ${nameB.toLowerCase()}`,
        `mejor eléctrico ${nameA.toLowerCase()} ${nameB.toLowerCase()}`,
      ],
      compPillar.id,
      "medium",
      "low",
      "gap",
      6
    );
    compPillar.childIds.push(compNode.id);
    allNodes.push(compNode);
    clusterNodes.push(compNode);
    clusterEdges.push(makeEdge(compPillar.id, compNode.id, "parent-child", 7, `comp → ${nameA} vs ${nameB}`));

    const brandANode = allNodes.find((n) => n.path === `/marcas/${brandA}`);
    const brandBNode = allNodes.find((n) => n.path === `/marcas/${brandB}`);
    if (brandANode) {
      clusterEdges.push(makeEdge(compNode.id, brandANode.id, "comparison", 5, `vs → ${nameA}`));
      compNode.relatedIds.push(brandANode.id);
    }
    if (brandBNode) {
      clusterEdges.push(makeEdge(compNode.id, brandBNode.id, "comparison", 5, `vs → ${nameB}`));
      compNode.relatedIds.push(brandBNode.id);
    }
  }

  allClusters.push({
    id: "cluster-comparisons",
    name: "Comparativas",
    pillarId: compPillar.id,
    intent: "commercial",
    nodes: clusterNodes,
    edges: clusterEdges,
    coverage: 100,
    depth: 2,
    keywords: clusterNodes.reduce((s, n) => s + n.keywords.length, 0),
  });
  allEdges.push(...clusterEdges);
}

function generatePriceQueryNodes(allNodes: TopicalNode[], allEdges: TopicalEdge[]): void {
  const brands = Object.keys(BRAND_NAMES);
  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    const serviceName = def.title;
    for (const brand of brands.slice(0, 6)) {
      const brandName = BRAND_NAMES[brand];
      const clusterNode = allNodes.find((n) => n.path === `/servicios/${ss}-${brand}`);
      if (!clusterNode) continue;

      for (const pq of PRICE_QUERIES.slice(0, 3)) {
        const kwText = pq.template
          .replace("{service}", serviceName.toLowerCase())
          .replace("{brand}", brandName.toLowerCase())
          .replace("{city}", "sevilla");
        if (!clusterNode.keywords.includes(kwText)) {
          clusterNode.keywords.push(kwText);
        }
      }
    }
  }
}

function detectGaps(allNodes: TopicalNode[], allClusters: TopicalCluster[]): TopicalGap[] {
  const gaps: TopicalGap[] = [];
  const brands = Object.keys(BRAND_NAMES);

  const comparisonPaths = new Set(allNodes.filter((n) =>
    n.entities.some((e) => e.type === "comparison")
  ).map((n) => n.path));

  for (let i = 0; i < brands.length; i++) {
    for (let j = i + 1; j < brands.length; j++) {
      const p1 = `/comparativas/${brands[i]}-vs-${brands[j]}`;
      const p2 = `/comparativas/${brands[j]}-vs-${brands[i]}`;
      if (!comparisonPaths.has(p1) && !comparisonPaths.has(p2)) {
        const nameA = BRAND_NAMES[brands[i]];
        const nameB = BRAND_NAMES[brands[j]];
        gaps.push({
          type: "no-comparison",
          description: `No existe comparativa entre ${nameA} y ${nameB}`,
          suggestedTitle: `${nameA} vs ${nameB} — Eléctricos`,
          suggestedPath: p1,
          intent: "commercial",
          priority: 4,
          entities: [brands[i], brands[j]],
        });
      }
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    const problemPillar = allNodes.find((n) => n.path === `/problemas/${problem.slug}` && n.depth === "pillar");
    if (!problemPillar || problemPillar.contentStatus === "planned") {
      gaps.push({
        type: "missing-cluster",
        description: `Falta página pilar para problema "${problem.name}"`,
        suggestedTitle: `${problem.name} — Guía Completa`,
        suggestedPath: `/problemas/${problem.slug}`,
        intent: "informational",
        priority: 7,
        entities: [problem.slug],
      });
    }
  }

  for (const topic of FAQ_TOPICS) {
    const faqNode = allNodes.find((n) => n.path === `/preguntas/${topic.slug}`);
    if (!faqNode) {
      gaps.push({
        type: "no-faq",
        description: `Falta categoría FAQ para "${topic.name}"`,
        suggestedTitle: `FAQ: ${topic.name}`,
        suggestedPath: `/preguntas/${topic.slug}`,
        intent: "informational",
        priority: 5,
        entities: [topic.slug],
      });
    }
  }

  for (const brand of brands) {
    const brandName = BRAND_NAMES[brand];
    for (const ss of SERVICE_SLUGS) {
      const serviceName = SERVICE_DEFINITIONS[ss]?.title || ss;
      const path = `/servicios/${ss}-${brand}`;
      const node = allNodes.find((n) => n.path === path);
      if (!node) {
        gaps.push({
          type: "missing-leaf",
          description: `Falta página ${serviceName} ${brandName}`,
          suggestedTitle: `${serviceName} ${brandName}`,
          suggestedPath: path,
          intent: "transactional",
          priority: 8,
          entities: [ss, brand],
        });
      }
    }
  }

  gaps.sort((a, b) => b.priority - a.priority);
  return gaps;
}

function buildEntityCoverage(allNodes: TopicalNode[]): EntityCoverageReport {
  const brands = Object.keys(BRAND_NAMES);
  const maxBrandNodes = SERVICE_SLUGS.length + SERVICE_SLUGS.length * SERVICE_CITIES.length +
    PROBLEM_TOPICS.length + PROBLEM_TOPICS.length * SERVICE_CITIES.length + 1;

  const brandCov = brands.map((b) => {
    const nodes = allNodes.filter((n) => n.entities.some((e) => e.type === "brand" && e.slug === b));
    const clusters = new Set(nodes.filter((n) => n.depth === "cluster" || n.depth === "pillar").map((n) => n.id));
    return {
      slug: b,
      name: BRAND_NAMES[b],
      nodes: nodes.length,
      clusters: clusters.size,
      score: Math.min(100, Math.round((nodes.length / maxBrandNodes) * 100)),
    };
  });

  const maxServiceNodes = brands.length + brands.length * SERVICE_CITIES.length + 1;
  const serviceCov = SERVICE_SLUGS.map((ss) => {
    const nodes = allNodes.filter((n) => n.entities.some((e) => e.type === "service" && e.slug === ss));
    const clusters = new Set(nodes.filter((n) => n.depth === "cluster" || n.depth === "pillar").map((n) => n.id));
    return {
      slug: ss,
      name: SERVICE_DEFINITIONS[ss]?.title || ss,
      nodes: nodes.length,
      clusters: clusters.size,
      score: Math.min(100, Math.round((nodes.length / maxServiceNodes) * 100)),
    };
  });

  const problemCov = PROBLEM_TOPICS.map((p) => {
    const nodes = allNodes.filter((n) => n.entities.some((e) => e.type === "problem" && e.slug === p.slug));
    return {
      slug: p.slug,
      name: p.name,
      nodes: nodes.length,
      score: Math.min(100, Math.round((nodes.length / (brands.length * (SERVICE_CITIES.length + 1) + 1)) * 100)),
    };
  });

  const cityCov = SERVICE_CITIES.map((c) => {
    const nodes = allNodes.filter((n) => n.entities.some((e) => e.type === "city" && e.slug === c.slug));
    return {
      slug: c.slug,
      name: c.city,
      nodes: nodes.length,
      score: Math.min(100, Math.round((nodes.length / (brands.length * SERVICE_SLUGS.length + brands.length * PROBLEM_TOPICS.length + 1)) * 100)),
    };
  });

  return { brands: brandCov, services: serviceCov, problems: problemCov, cities: cityCov };
}

export function generateTopicalMap(): TopicalMap {
  nodeCounter = 0;
  const allNodes: TopicalNode[] = [];
  const allEdges: TopicalEdge[] = [];
  const allClusters: TopicalCluster[] = [];

  generateServicePillars(allNodes, allEdges, allClusters);
  generateBrandPillars(allNodes, allEdges, allClusters);
  generateProblemClusters(allNodes, allEdges, allClusters);
  generateFAQClusters(allNodes, allEdges, allClusters);
  generateLocalClusters(allNodes, allEdges, allClusters);
  generateComparisonNodes(allNodes, allEdges, allClusters);
  generatePriceQueryNodes(allNodes, allEdges);

  const gaps = detectGaps(allNodes, allClusters);
  const pillars = allNodes.filter((n) => n.depth === "pillar");

  const intentDist: Record<SearchIntent, number> = { informational: 0, commercial: 0, transactional: 0, navigational: 0, local: 0 };
  const depthDist: Record<NodeDepth, number> = { pillar: 0, cluster: 0, leaf: 0, micro: 0 };
  let totalKw = 0;

  for (const n of allNodes) {
    intentDist[n.intent]++;
    depthDist[n.depth]++;
    totalKw += n.keywords.length;
  }

  const entityCoverage = buildEntityCoverage(allNodes);

  const avgCoverageScore = Math.round(
    (entityCoverage.brands.reduce((s, b) => s + b.score, 0) / entityCoverage.brands.length +
      entityCoverage.services.reduce((s, sv) => s + sv.score, 0) / entityCoverage.services.length +
      entityCoverage.problems.reduce((s, p) => s + p.score, 0) / entityCoverage.problems.length +
      entityCoverage.cities.reduce((s, c) => s + c.score, 0) / entityCoverage.cities.length) / 4
  );

  return {
    timestamp: new Date().toISOString(),
    pillars,
    clusters: allClusters,
    nodes: allNodes,
    edges: allEdges,
    stats: {
      totalNodes: allNodes.length,
      totalEdges: allEdges.length,
      totalClusters: allClusters.length,
      totalPillars: pillars.length,
      avgClusterDepth: Math.round((allClusters.reduce((s, c) => s + c.depth, 0) / allClusters.length) * 10) / 10,
      avgNodesPerCluster: Math.round((allNodes.length / allClusters.length) * 10) / 10,
      totalKeywords: totalKw,
      coverageScore: avgCoverageScore,
    },
    intentDistribution: intentDist,
    depthDistribution: depthDist,
    entityCoverage,
    gaps,
  };
}

export interface TopicalMapSummary {
  stats: TopicalMapStats;
  pillars: { id: string; title: string; path: string; children: number; keywords: number }[];
  clusterSummary: { id: string; name: string; intent: SearchIntent; nodes: number; keywords: number; depth: number }[];
  intentDistribution: Record<SearchIntent, number>;
  depthDistribution: Record<NodeDepth, number>;
  brandCoverage: { brand: string; nodes: number; score: number }[];
  serviceCoverage: { service: string; nodes: number; score: number }[];
  problemCoverage: { problem: string; nodes: number; score: number }[];
  cityCoverage: { city: string; nodes: number; score: number }[];
  topGaps: TopicalGap[];
  treePreview: string[];
}

export function getTopicalMapSummary(): TopicalMapSummary {
  const map = generateTopicalMap();

  const pillars = map.pillars.map((p) => ({
    id: p.id,
    title: p.title,
    path: p.path,
    children: p.childIds.length,
    keywords: p.keywords.length,
  }));

  const clusterSummary = map.clusters.map((c) => ({
    id: c.id,
    name: c.name,
    intent: c.intent,
    nodes: c.nodes.length,
    keywords: c.keywords,
    depth: c.depth,
  }));

  const treePreview = buildTreePreview(map);

  return {
    stats: map.stats,
    pillars,
    clusterSummary,
    intentDistribution: map.intentDistribution,
    depthDistribution: map.depthDistribution,
    brandCoverage: map.entityCoverage.brands.map((b) => ({ brand: b.name, nodes: b.nodes, score: b.score })),
    serviceCoverage: map.entityCoverage.services.map((s) => ({ service: s.name, nodes: s.nodes, score: s.score })),
    problemCoverage: map.entityCoverage.problems.map((p) => ({ problem: p.name, nodes: p.nodes, score: p.score })),
    cityCoverage: map.entityCoverage.cities.map((c) => ({ city: c.name, nodes: c.nodes, score: c.score })),
    topGaps: map.gaps.slice(0, 20),
    treePreview,
  };
}

function buildTreePreview(map: TopicalMap): string[] {
  const lines: string[] = [];

  const servicePillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "service"));
  const brandPillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "brand") && !p.entities.some((e) => e.type === "service"));
  const problemPillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "problem"));
  const faqPillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "faq-topic"));
  const localPillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "city") && p.depth === "pillar");
  const compPillars = map.pillars.filter((p) => p.entities.some((e) => e.type === "comparison"));

  lines.push("SERVICIOS (" + servicePillars.length + " pilares)");
  for (const sp of servicePillars) {
    lines.push("│");
    lines.push("├─ " + sp.title);
    const children = map.nodes.filter((n) => n.parentId === sp.id && n.depth === "cluster");
    for (const ch of children.slice(0, 4)) {
      lines.push("│  ├─ " + ch.title);
      const leafCount = map.nodes.filter((n) => n.parentId === ch.id).length;
      if (leafCount > 0) {
        lines.push("│  │  └─ (" + leafCount + " páginas locales/sub)");
      }
    }
    if (children.length > 4) {
      lines.push("│  └─ ...+" + (children.length - 4) + " marcas más");
    }
  }

  lines.push("");
  lines.push("MARCAS (" + brandPillars.length + " pilares)");
  for (const bp of brandPillars.slice(0, 5)) {
    lines.push("│");
    lines.push("├─ " + bp.title);
    const childCount = bp.childIds.length;
    lines.push("│  └─ " + childCount + " nodos hijos (servicios + modelos)");
  }
  if (brandPillars.length > 5) {
    lines.push("│");
    lines.push("└─ ...+" + (brandPillars.length - 5) + " marcas más");
  }

  lines.push("");
  lines.push("PROBLEMAS (" + problemPillars.length + " pilares)");
  for (const pp of problemPillars.slice(0, 4)) {
    lines.push("│");
    lines.push("├─ " + pp.title);
    const brandNodes = map.nodes.filter((n) => n.parentId === pp.id).length;
    lines.push("│  └─ " + brandNodes + " combinaciones marca");
  }
  if (problemPillars.length > 4) {
    lines.push("│");
    lines.push("└─ ...+" + (problemPillars.length - 4) + " problemas más");
  }

  lines.push("");
  lines.push("FAQ (" + faqPillars.length + " pilares)");
  for (const fp of faqPillars) {
    lines.push("├─ " + fp.title + " (" + fp.childIds.length + " categorías)");
  }

  lines.push("");
  lines.push("LOCAL (" + localPillars.length + " ciudades)");
  for (const lp of localPillars) {
    lines.push("├─ " + lp.title);
  }

  lines.push("");
  lines.push("COMPARATIVAS (" + compPillars.length + " pilares)");
  for (const cp of compPillars) {
    lines.push("├─ " + cp.title + " (" + cp.childIds.length + " comparativas)");
  }

  return lines;
}

export function getClusterDetail(clusterId: string): TopicalCluster | null {
  const map = generateTopicalMap();
  return map.clusters.find((c) => c.id === clusterId) || null;
}

export function getNodesByEntity(entityType: EntityType, entitySlug: string): TopicalNode[] {
  const map = generateTopicalMap();
  return map.nodes.filter((n) => n.entities.some((e) => e.type === entityType && e.slug === entitySlug));
}

export function getRelatedNodes(nodeId: string): { node: TopicalNode; relation: RelationType; weight: number }[] {
  const map = generateTopicalMap();
  const node = map.nodes.find((n) => n.id === nodeId);
  if (!node) return [];

  const related: { node: TopicalNode; relation: RelationType; weight: number }[] = [];

  for (const edge of map.edges) {
    if (edge.from === nodeId) {
      const target = map.nodes.find((n) => n.id === edge.to);
      if (target) related.push({ node: target, relation: edge.relation, weight: edge.weight });
    } else if (edge.to === nodeId) {
      const source = map.nodes.find((n) => n.id === edge.from);
      if (source) related.push({ node: source, relation: edge.relation, weight: edge.weight });
    }
  }

  return related.sort((a, b) => b.weight - a.weight);
}
