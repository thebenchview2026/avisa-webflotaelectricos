import { BRAND_NAMES, SERVICE_SLUGS, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export type PillarType = "service" | "brand" | "problem" | "local" | "hub";
export type ClusterRole = "pillar" | "cluster" | "supporting" | "local-variant";
export type LinkDirection = "pillar-to-cluster" | "cluster-to-pillar" | "cluster-to-cluster" | "cross-pillar" | "supporting-to-cluster" | "local-link";

export interface AuthorityPillar {
  id: string;
  type: PillarType;
  title: string;
  path: string;
  slug: string;
  clusters: AuthorityCluster[];
  totalPages: number;
  totalLinks: number;
  authorityScore: number;
  depth: number;
  breadth: number;
  entityCoverage: string[];
  schemaType: string;
}

export interface AuthorityCluster {
  id: string;
  pillarId: string;
  role: ClusterRole;
  title: string;
  path: string;
  slug: string;
  children: ClusterChild[];
  internalLinks: AuthorityLink[];
  totalPages: number;
  authorityScore: number;
  entities: string[];
}

export interface ClusterChild {
  title: string;
  path: string;
  role: ClusterRole;
  entities: string[];
}

export interface AuthorityLink {
  from: string;
  to: string;
  anchor: string;
  direction: LinkDirection;
  weight: number;
  context: string;
}

export interface AuthorityArchitecture {
  timestamp: string;
  pillars: AuthorityPillar[];
  totalPillars: number;
  totalClusters: number;
  totalPages: number;
  totalLinks: number;
  avgAuthorityScore: number;
  globalLinks: AuthorityLink[];
  topicalDepth: Record<string, number>;
  coverageMatrix: CoverageCell[];
  authorityGaps: AuthorityGap[];
  siloPurity: SiloPurityReport;
  treePreview: string[];
}

export interface CoverageCell {
  service: string;
  brand: string;
  hasPillar: boolean;
  hasCluster: boolean;
  hasLocalPages: boolean;
  hasSubServices: boolean;
  score: number;
}

export interface AuthorityGap {
  type: "missing-cluster" | "weak-interlinking" | "orphan-page" | "missing-local" | "shallow-depth";
  description: string;
  suggestedAction: string;
  priority: number;
  affectedPillar: string;
}

export interface SiloPurityReport {
  avgPurity: number;
  silos: { pillarId: string; title: string; purity: number; crossLinks: number; internalLinks: number }[];
  recommendation: string;
}

const brands = Object.keys(BRAND_NAMES);

function buildServicePillars(): AuthorityPillar[] {
  const pillars: AuthorityPillar[] = [];

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    const pillarId = `pillar-service-${ss}`;
    const clusters: AuthorityCluster[] = [];
    const allLinks: AuthorityLink[] = [];
    let totalPages = 1;

    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const isOfficial = OFFICIAL_BRANDS.includes(brand);
      const clusterId = `cluster-${ss}-${brand}`;
      const clusterPath = `/servicios/${ss}-${brand}`;
      const children: ClusterChild[] = [];
      const clusterLinks: AuthorityLink[] = [];

      clusterLinks.push({
        from: clusterPath,
        to: `/servicios/${ss}`,
        anchor: `${def.title} de Vehículos Eléctricos`,
        direction: "cluster-to-pillar",
        weight: 10,
        context: "Enlace ascendente al pilar de servicio",
      });

      allLinks.push({
        from: `/servicios/${ss}`,
        to: clusterPath,
        anchor: `${def.title} ${brandName}`,
        direction: "pillar-to-cluster",
        weight: 9,
        context: `Enlace descendente a cluster ${brandName}`,
      });

      for (const city of SERVICE_CITIES) {
        const cityPath = `/servicios/${ss}-${brand}-${city.slug}`;
        children.push({
          title: `${def.title} ${brandName} en ${city.city}`,
          path: cityPath,
          role: "local-variant",
          entities: [brand, ss, city.slug],
        });

        clusterLinks.push({
          from: cityPath,
          to: clusterPath,
          anchor: `${def.title} ${brandName}`,
          direction: "supporting-to-cluster",
          weight: 7,
          context: `Enlace local → cluster ${brandName}`,
        });

        clusterLinks.push({
          from: clusterPath,
          to: cityPath,
          anchor: `${def.title} ${brandName} en ${city.city}`,
          direction: "local-link",
          weight: 6,
          context: `Enlace cluster → variante local ${city.city}`,
        });

        totalPages++;
      }

      const subs = SUB_SERVICE_SLUGS[ss] || [];
      for (const sub of subs) {
        const subPath = `/servicios/${sub.slug}-${brand}`;
        children.push({
          title: `${sub.name} ${brandName}`,
          path: subPath,
          role: "supporting",
          entities: [brand, sub.slug],
        });

        clusterLinks.push({
          from: subPath,
          to: clusterPath,
          anchor: `${def.title} ${brandName}`,
          direction: "supporting-to-cluster",
          weight: 8,
          context: `Sub-servicio → cluster padre`,
        });

        clusterLinks.push({
          from: clusterPath,
          to: subPath,
          anchor: sub.name,
          direction: "cluster-to-cluster",
          weight: 7,
          context: `Cluster → sub-servicio específico`,
        });

        totalPages++;
      }

      const siblingBrands = brands.filter((b) => b !== brand).slice(0, 3);
      for (const sib of siblingBrands) {
        clusterLinks.push({
          from: clusterPath,
          to: `/servicios/${ss}-${sib}`,
          anchor: `${def.title} ${BRAND_NAMES[sib]}`,
          direction: "cluster-to-cluster",
          weight: 5,
          context: `Enlace sibling entre marcas del mismo servicio`,
        });
      }

      clusterLinks.push({
        from: clusterPath,
        to: `/marcas/${brand}`,
        anchor: `${brandName} Eléctrico`,
        direction: "cross-pillar",
        weight: 6,
        context: `Cross-pillar: servicio → marca`,
      });

      clusters.push({
        id: clusterId,
        pillarId,
        role: "cluster",
        title: `${def.title} ${brandName}` + (isOfficial ? " — Taller Oficial" : ""),
        path: clusterPath,
        slug: `${ss}-${brand}`,
        children,
        internalLinks: clusterLinks,
        totalPages: 1 + children.length,
        authorityScore: 0,
        entities: [brand, ss],
      });

      totalPages++;
      allLinks.push(...clusterLinks);
    }

    for (const cluster of clusters) {
      const childCount = cluster.children.length;
      const linkCount = cluster.internalLinks.length;
      cluster.authorityScore = Math.min(100, Math.round(
        (childCount >= 6 ? 30 : (childCount / 6) * 30) +
        (linkCount >= 10 ? 40 : (linkCount / 10) * 40) +
        30
      ));
    }

    const avgClusterScore = clusters.length > 0
      ? Math.round(clusters.reduce((s, c) => s + c.authorityScore, 0) / clusters.length)
      : 0;

    pillars.push({
      id: pillarId,
      type: "service",
      title: def.title,
      path: `/servicios/${ss}`,
      slug: ss,
      clusters,
      totalPages,
      totalLinks: allLinks.length,
      authorityScore: avgClusterScore,
      depth: 3,
      breadth: clusters.length,
      entityCoverage: [ss, ...brands],
      schemaType: "Service",
    });
  }

  return pillars;
}

function buildBrandPillars(): AuthorityPillar[] {
  const pillars: AuthorityPillar[] = [];

  for (const brand of brands) {
    const brandName = BRAND_NAMES[brand];
    const isOfficial = OFFICIAL_BRANDS.includes(brand);
    const pillarId = `pillar-brand-${brand}`;
    const clusters: AuthorityCluster[] = [];
    let totalPages = 1;
    const allLinks: AuthorityLink[] = [];

    for (const ss of SERVICE_SLUGS) {
      const def = SERVICE_DEFINITIONS[ss];
      if (!def) continue;
      const clusterPath = `/servicios/${ss}-${brand}`;

      allLinks.push({
        from: `/marcas/${brand}`,
        to: clusterPath,
        anchor: `${def.title} ${brandName}`,
        direction: "pillar-to-cluster",
        weight: 9,
        context: `Marca → servicio ${def.title}`,
      });

      allLinks.push({
        from: clusterPath,
        to: `/marcas/${brand}`,
        anchor: `${brandName} Eléctrico`,
        direction: "cluster-to-pillar",
        weight: 8,
        context: `Servicio → marca pilar`,
      });
    }

    const models = VEHICLE_MODEL_FAMILIES[brand] || [];
    const modelChildren: ClusterChild[] = models.map((model) => ({
      title: `${brandName} ${model}`,
      path: `/marcas/${brand}#${model.toLowerCase().replace(/[\s.]+/g, "-")}`,
      role: "supporting" as ClusterRole,
      entities: [brand, model.toLowerCase()],
    }));

    clusters.push({
      id: `cluster-brand-${brand}-models`,
      pillarId,
      role: "cluster",
      title: `Modelos ${brandName} Eléctricos`,
      path: `/marcas/${brand}`,
      slug: `${brand}-models`,
      children: modelChildren,
      internalLinks: [],
      totalPages: 1,
      authorityScore: Math.min(100, 50 + models.length * 5),
      entities: [brand],
    });

    const problems = PROBLEM_TOPICS.slice(0, 5);
    for (const problem of problems) {
      const probPath = `/problemas/${problem.slug}-${brand}`;

      allLinks.push({
        from: `/marcas/${brand}`,
        to: probPath,
        anchor: `${problem.name} en ${brandName}`,
        direction: "pillar-to-cluster",
        weight: 7,
        context: `Marca → problema relacionado`,
      });

      allLinks.push({
        from: probPath,
        to: `/marcas/${brand}`,
        anchor: `${brandName} Eléctrico`,
        direction: "cluster-to-pillar",
        weight: 7,
        context: `Problema → marca pilar`,
      });
    }

    totalPages += SERVICE_SLUGS.length + problems.length;

    const linkCount = allLinks.length;
    const score = Math.min(100, Math.round(
      (SERVICE_SLUGS.length >= 5 ? 30 : (SERVICE_SLUGS.length / 5) * 30) +
      (models.length >= 3 ? 20 : (models.length / 3) * 20) +
      (linkCount >= 10 ? 30 : (linkCount / 10) * 30) +
      (isOfficial ? 20 : 10)
    ));

    pillars.push({
      id: pillarId,
      type: "brand",
      title: `${brandName} Eléctrico` + (isOfficial ? " — Taller Oficial" : ""),
      path: `/marcas/${brand}`,
      slug: brand,
      clusters,
      totalPages,
      totalLinks: allLinks.length,
      authorityScore: score,
      depth: 2,
      breadth: SERVICE_SLUGS.length + problems.length,
      entityCoverage: [brand, ...SERVICE_SLUGS],
      schemaType: "Brand",
    });
  }

  return pillars;
}

function buildProblemPillars(): AuthorityPillar[] {
  const pillars: AuthorityPillar[] = [];

  for (const problem of PROBLEM_TOPICS) {
    const pillarId = `pillar-problem-${problem.slug}`;
    const clusters: AuthorityCluster[] = [];
    let totalPages = 0;
    const allLinks: AuthorityLink[] = [];

    for (const brand of brands) {
      const brandName = BRAND_NAMES[brand];
      const clusterPath = `/problemas/${problem.slug}-${brand}`;
      const children: ClusterChild[] = [];
      const clusterLinks: AuthorityLink[] = [];

      for (const city of SERVICE_CITIES) {
        const cityPath = `/problemas/${problem.slug}-${brand}-${city.slug}`;
        children.push({
          title: `${problem.name} ${brandName} en ${city.city}`,
          path: cityPath,
          role: "local-variant",
          entities: [brand, problem.slug, city.slug],
        });

        clusterLinks.push({
          from: cityPath,
          to: clusterPath,
          anchor: `${problem.name} ${brandName}`,
          direction: "supporting-to-cluster",
          weight: 7,
          context: `Local → cluster problema×marca`,
        });

        clusterLinks.push({
          from: clusterPath,
          to: cityPath,
          anchor: `${problem.name} ${brandName} en ${city.city}`,
          direction: "local-link",
          weight: 6,
          context: `Cluster → variante local`,
        });
      }

      clusterLinks.push({
        from: clusterPath,
        to: `/servicios/diagnostico-${brand}`,
        anchor: `Diagnóstico ${brandName}`,
        direction: "cross-pillar",
        weight: 8,
        context: `Problema → servicio diagnóstico (conversión)`,
      });

      clusterLinks.push({
        from: clusterPath,
        to: `/servicios/reparacion-${brand}`,
        anchor: `Reparación ${brandName}`,
        direction: "cross-pillar",
        weight: 7,
        context: `Problema → servicio reparación (conversión)`,
      });

      clusterLinks.push({
        from: clusterPath,
        to: `/marcas/${brand}`,
        anchor: `${brandName} Eléctrico`,
        direction: "cross-pillar",
        weight: 6,
        context: `Problema → marca pilar`,
      });

      const siblingBrands = brands.filter((b) => b !== brand).slice(0, 2);
      for (const sib of siblingBrands) {
        clusterLinks.push({
          from: clusterPath,
          to: `/problemas/${problem.slug}-${sib}`,
          anchor: `${problem.name} ${BRAND_NAMES[sib]}`,
          direction: "cluster-to-cluster",
          weight: 5,
          context: `Enlace sibling entre marcas del mismo problema`,
        });
      }

      clusters.push({
        id: `cluster-${problem.slug}-${brand}`,
        pillarId,
        role: "cluster",
        title: `${problem.name} en ${brandName}`,
        path: clusterPath,
        slug: `${problem.slug}-${brand}`,
        children,
        internalLinks: clusterLinks,
        totalPages: 1 + children.length,
        authorityScore: Math.min(100, Math.round(60 + children.length * 4 + clusterLinks.length * 2)),
        entities: [brand, problem.slug],
      });

      totalPages += 1 + children.length;
      allLinks.push(...clusterLinks);
    }

    const avgScore = clusters.length > 0
      ? Math.round(clusters.reduce((s, c) => s + c.authorityScore, 0) / clusters.length)
      : 0;

    pillars.push({
      id: pillarId,
      type: "problem",
      title: problem.name,
      path: `/problemas/${problem.slug}`,
      slug: problem.slug,
      clusters,
      totalPages,
      totalLinks: allLinks.length,
      authorityScore: avgScore,
      depth: 3,
      breadth: clusters.length,
      entityCoverage: [problem.slug, ...brands],
      schemaType: "Article",
    });
  }

  return pillars;
}

function buildLocalPillars(): AuthorityPillar[] {
  const pillars: AuthorityPillar[] = [];

  for (const city of SERVICE_CITIES) {
    const pillarId = `pillar-local-${city.slug}`;
    const clusters: AuthorityCluster[] = [];
    let totalPages = 1;
    const allLinks: AuthorityLink[] = [];
    const pillarPath = `/taller-electricos-${city.slug}`;

    for (const ss of SERVICE_SLUGS) {
      const def = SERVICE_DEFINITIONS[ss];
      if (!def) continue;
      const children: ClusterChild[] = [];

      for (const brand of brands.slice(0, 6)) {
        const brandName = BRAND_NAMES[brand];
        const pagePath = `/servicios/${ss}-${brand}-${city.slug}`;
        children.push({
          title: `${def.title} ${brandName} en ${city.city}`,
          path: pagePath,
          role: "local-variant",
          entities: [brand, ss, city.slug],
        });

        allLinks.push({
          from: pagePath,
          to: pillarPath,
          anchor: `Taller Eléctricos ${city.city}`,
          direction: "cluster-to-pillar",
          weight: 7,
          context: `Página local → pilar local ${city.city}`,
        });

        allLinks.push({
          from: pillarPath,
          to: pagePath,
          anchor: `${def.title} ${brandName} ${city.city}`,
          direction: "pillar-to-cluster",
          weight: 6,
          context: `Pilar local → servicio local`,
        });

        totalPages++;
      }

      clusters.push({
        id: `cluster-local-${city.slug}-${ss}`,
        pillarId,
        role: "cluster",
        title: `${def.title} en ${city.city}`,
        path: pillarPath,
        slug: `${city.slug}-${ss}`,
        children,
        internalLinks: [],
        totalPages: children.length,
        authorityScore: Math.min(100, 50 + children.length * 5),
        entities: [city.slug, ss],
      });
    }

    const otherCities = SERVICE_CITIES.filter((c) => c.slug !== city.slug);
    for (const other of otherCities) {
      allLinks.push({
        from: pillarPath,
        to: `/taller-electricos-${other.slug}`,
        anchor: `Taller Eléctricos ${other.city}`,
        direction: "cluster-to-cluster",
        weight: 4,
        context: `Enlace geográfico entre ciudades`,
      });
    }

    pillars.push({
      id: pillarId,
      type: "local",
      title: `Taller Eléctricos ${city.city}`,
      path: pillarPath,
      slug: city.slug,
      clusters,
      totalPages,
      totalLinks: allLinks.length,
      authorityScore: Math.min(100, 60 + totalPages),
      depth: 2,
      breadth: clusters.length,
      entityCoverage: [city.slug, ...SERVICE_SLUGS],
      schemaType: "LocalBusiness",
    });
  }

  return pillars;
}

function generateCoverageMatrix(): CoverageCell[] {
  const matrix: CoverageCell[] = [];

  for (const ss of SERVICE_SLUGS) {
    const def = SERVICE_DEFINITIONS[ss];
    if (!def) continue;
    for (const brand of brands) {
      const subs = SUB_SERVICE_SLUGS[ss] || [];
      const hasSubServices = subs.length > 0;
      const cityCount = SERVICE_CITIES.length;
      const score = Math.round(
        25 + // pillar always exists
        25 + // cluster always exists
        (cityCount >= 6 ? 25 : (cityCount / 6) * 25) +
        (hasSubServices ? 25 : 0)
      );

      matrix.push({
        service: def.title,
        brand: BRAND_NAMES[brand],
        hasPillar: true,
        hasCluster: true,
        hasLocalPages: cityCount > 0,
        hasSubServices,
        score,
      });
    }
  }

  return matrix;
}

function detectAuthorityGaps(pillars: AuthorityPillar[]): AuthorityGap[] {
  const gaps: AuthorityGap[] = [];

  for (const pillar of pillars) {
    if (pillar.type === "problem") {
      gaps.push({
        type: "missing-cluster",
        description: `Falta página pilar dedicada para "${pillar.title}". Actualmente solo existen clusters problema×marca.`,
        suggestedAction: `Crear página pillar en ${pillar.path} que agrupe todos los clusters de este problema.`,
        priority: 8,
        affectedPillar: pillar.id,
      });
    }

    if (pillar.authorityScore < 60) {
      gaps.push({
        type: "shallow-depth",
        description: `Pilar "${pillar.title}" tiene un authority score bajo (${pillar.authorityScore}%). Profundidad insuficiente.`,
        suggestedAction: `Añadir más contenido supporting y sub-servicios para aumentar la profundidad del silo.`,
        priority: 7,
        affectedPillar: pillar.id,
      });
    }

    for (const cluster of pillar.clusters) {
      if (cluster.children.length === 0 && cluster.role === "cluster") {
        gaps.push({
          type: "orphan-page",
          description: `Cluster "${cluster.title}" no tiene páginas hijas de soporte.`,
          suggestedAction: `Generar páginas locales o sub-servicio para soportar este cluster.`,
          priority: 6,
          affectedPillar: pillar.id,
        });
      }

      const inboundLinks = cluster.internalLinks.filter((l) => l.to === cluster.path);
      if (inboundLinks.length < 2) {
        gaps.push({
          type: "weak-interlinking",
          description: `Cluster "${cluster.title}" tiene pocos enlaces entrantes (${inboundLinks.length}).`,
          suggestedAction: `Añadir enlaces internos desde páginas relacionadas hacia ${cluster.path}.`,
          priority: 5,
          affectedPillar: pillar.id,
        });
      }
    }
  }

  for (const city of SERVICE_CITIES) {
    const localPillar = pillars.find((p) => p.id === `pillar-local-${city.slug}`);
    if (!localPillar) {
      gaps.push({
        type: "missing-local",
        description: `Sin pilar local para ${city.city}.`,
        suggestedAction: `Crear /taller-electricos-${city.slug} con enlaces a todos los servicios locales.`,
        priority: 7,
        affectedPillar: `pillar-local-${city.slug}`,
      });
    }
  }

  return gaps.sort((a, b) => b.priority - a.priority);
}

function calculateSiloPurity(pillars: AuthorityPillar[]): SiloPurityReport {
  const silos: SiloPurityReport["silos"] = [];

  for (const pillar of pillars.filter((p) => p.type === "service")) {
    let internalLinks = 0;
    let crossLinks = 0;

    for (const cluster of pillar.clusters) {
      for (const link of cluster.internalLinks) {
        if (link.direction === "cross-pillar") crossLinks++;
        else internalLinks++;
      }
    }

    const total = internalLinks + crossLinks;
    const purity = total > 0 ? Math.round((internalLinks / total) * 100) : 100;

    silos.push({
      pillarId: pillar.id,
      title: pillar.title,
      purity,
      crossLinks,
      internalLinks,
    });
  }

  const avgPurity = silos.length > 0
    ? Math.round(silos.reduce((s, silo) => s + silo.purity, 0) / silos.length)
    : 0;

  let recommendation = "Pureza de silo óptima. Mantener el equilibrio actual.";
  if (avgPurity < 70) {
    recommendation = "Pureza de silo baja. Reducir cross-links y reforzar enlaces internos dentro de cada silo de servicio.";
  } else if (avgPurity < 85) {
    recommendation = "Pureza de silo aceptable. Considerar mover algunos cross-links a zonas de navegación en vez de contenido.";
  }

  return { avgPurity, silos, recommendation };
}

function generateTreePreview(pillars: AuthorityPillar[]): string[] {
  const lines: string[] = [];

  const servicePillars = pillars.filter((p) => p.type === "service");
  const brandPillars = pillars.filter((p) => p.type === "brand");
  const problemPillars = pillars.filter((p) => p.type === "problem");
  const localPillars = pillars.filter((p) => p.type === "local");

  lines.push(`SILOS DE SERVICIO (${servicePillars.length} pilares)`);
  lines.push("│");
  for (const pillar of servicePillars) {
    lines.push(`├─ ${pillar.title} [${pillar.path}] (score: ${pillar.authorityScore}%)`);
    const shownClusters = pillar.clusters.slice(0, 4);
    for (let i = 0; i < shownClusters.length; i++) {
      const cluster = shownClusters[i];
      const isLast = i === shownClusters.length - 1 && pillar.clusters.length <= 4;
      const prefix = isLast ? "│  └─" : "│  ├─";
      lines.push(`${prefix} ${cluster.title} [${cluster.path}]`);
      if (cluster.children.length > 0) {
        const childPrefix = isLast ? "│     " : "│  │  ";
        lines.push(`${childPrefix}└─ (${cluster.children.length} páginas de soporte)`);
      }
    }
    if (pillar.clusters.length > 4) {
      lines.push(`│  └─ ...+${pillar.clusters.length - 4} clusters más`);
    }
    lines.push("│");
  }

  lines.push(`SILOS DE MARCA (${brandPillars.length} pilares)`);
  lines.push("│");
  for (const pillar of brandPillars.slice(0, 5)) {
    const svcLinks = SERVICE_SLUGS.length;
    lines.push(`├─ ${pillar.title} [${pillar.path}] (score: ${pillar.authorityScore}%)`);
    lines.push(`│  ├─ ${svcLinks} servicios enlazados`);
    const models = VEHICLE_MODEL_FAMILIES[pillar.slug] || [];
    lines.push(`│  └─ ${models.length} modelos: ${models.slice(0, 3).join(", ")}${models.length > 3 ? "..." : ""}`);
    lines.push("│");
  }
  if (brandPillars.length > 5) {
    lines.push(`└─ ...+${brandPillars.length - 5} marcas más`);
    lines.push("");
  }

  lines.push(`SILOS DE PROBLEMA (${problemPillars.length} pilares)`);
  lines.push("│");
  for (const pillar of problemPillars.slice(0, 4)) {
    lines.push(`├─ ${pillar.title} [${pillar.path}] (score: ${pillar.authorityScore}%)`);
    lines.push(`│  └─ ${pillar.clusters.length} clusters (${pillar.totalPages} páginas)`);
    lines.push("│");
  }
  if (problemPillars.length > 4) {
    lines.push(`└─ ...+${problemPillars.length - 4} problemas más`);
    lines.push("");
  }

  lines.push(`SILOS LOCALES (${localPillars.length} ciudades)`);
  lines.push("│");
  for (const pillar of localPillars) {
    lines.push(`├─ ${pillar.title} [${pillar.path}] (${pillar.totalPages} páginas)`);
  }

  return lines;
}

export function buildAuthorityArchitecture(): AuthorityArchitecture {
  const servicePillars = buildServicePillars();
  const brandPillars = buildBrandPillars();
  const problemPillars = buildProblemPillars();
  const localPillars = buildLocalPillars();

  const allPillars = [...servicePillars, ...brandPillars, ...problemPillars, ...localPillars];

  const globalLinks: AuthorityLink[] = [];

  for (const sp of servicePillars) {
    for (const bp of brandPillars) {
      globalLinks.push({
        from: sp.path,
        to: bp.path,
        anchor: `${bp.title}`,
        direction: "cross-pillar",
        weight: 5,
        context: `Hub servicio → marca`,
      });
    }
  }

  for (const pp of problemPillars) {
    globalLinks.push({
      from: pp.path,
      to: `/servicios/diagnostico`,
      anchor: "Diagnóstico de Vehículos Eléctricos",
      direction: "cross-pillar",
      weight: 8,
      context: `Problema pilar → servicio diagnóstico (conversión awareness→consideration)`,
    });
    globalLinks.push({
      from: pp.path,
      to: `/servicios/reparacion`,
      anchor: "Reparación de Vehículos Eléctricos",
      direction: "cross-pillar",
      weight: 7,
      context: `Problema pilar → servicio reparación`,
    });
  }

  const totalLinks = allPillars.reduce((s, p) => s + p.totalLinks, 0) + globalLinks.length;
  const totalPages = allPillars.reduce((s, p) => s + p.totalPages, 0);
  const totalClusters = allPillars.reduce((s, p) => s + p.clusters.length, 0);
  const avgScore = allPillars.length > 0
    ? Math.round(allPillars.reduce((s, p) => s + p.authorityScore, 0) / allPillars.length)
    : 0;

  const topicalDepth: Record<string, number> = {};
  for (const p of allPillars) topicalDepth[p.title] = p.depth;

  return {
    timestamp: new Date().toISOString(),
    pillars: allPillars,
    totalPillars: allPillars.length,
    totalClusters,
    totalPages,
    totalLinks,
    avgAuthorityScore: avgScore,
    globalLinks,
    topicalDepth,
    coverageMatrix: generateCoverageMatrix(),
    authorityGaps: detectAuthorityGaps(allPillars),
    siloPurity: calculateSiloPurity(allPillars),
    treePreview: generateTreePreview(allPillars),
  };
}

export function getAuthoritySummary(): {
  totalPillars: number;
  totalClusters: number;
  totalPages: number;
  totalLinks: number;
  avgScore: number;
  byType: Record<string, number>;
  siloPurity: SiloPurityReport;
  topPillars: { title: string; path: string; type: string; score: number; pages: number; clusters: number }[];
  topGaps: AuthorityGap[];
  treePreview: string[];
} {
  const arch = buildAuthorityArchitecture();
  const byType: Record<string, number> = {};
  for (const p of arch.pillars) byType[p.type] = (byType[p.type] || 0) + 1;

  return {
    totalPillars: arch.totalPillars,
    totalClusters: arch.totalClusters,
    totalPages: arch.totalPages,
    totalLinks: arch.totalLinks,
    avgScore: arch.avgAuthorityScore,
    byType,
    siloPurity: arch.siloPurity,
    topPillars: arch.pillars
      .sort((a, b) => b.authorityScore - a.authorityScore)
      .slice(0, 20)
      .map((p) => ({
        title: p.title,
        path: p.path,
        type: p.type,
        score: p.authorityScore,
        pages: p.totalPages,
        clusters: p.clusters.length,
      })),
    topGaps: arch.authorityGaps.slice(0, 15),
    treePreview: arch.treePreview,
  };
}

export function getPillarDetail(pillarId: string): AuthorityPillar | null {
  const arch = buildAuthorityArchitecture();
  return arch.pillars.find((p) => p.id === pillarId) || null;
}

export function getCoverageMatrix(): CoverageCell[] {
  return generateCoverageMatrix();
}
