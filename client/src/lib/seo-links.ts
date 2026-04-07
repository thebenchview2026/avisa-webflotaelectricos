export interface InternalLink {
  keywords: string[];
  url: string;
  title: string;
}

export const BRAND_LINKS: InternalLink[] = [
  { keywords: ["Volkswagen", "VW"], url: "/marcas/volkswagen", title: "Volkswagen - Grupo Avisa" },
  { keywords: ["Audi"], url: "/marcas/audi", title: "Audi - Grupo Avisa" },
  { keywords: ["Škoda", "Skoda"], url: "/marcas/skoda", title: "Škoda - Grupo Avisa" },
  { keywords: ["CUPRA", "Cupra"], url: "/marcas/cupra", title: "CUPRA - Grupo Avisa" },
  { keywords: ["SEAT", "Seat"], url: "/marcas/seat", title: "SEAT - Grupo Avisa" },
  { keywords: ["Tesla"], url: "/marcas/tesla", title: "Tesla - Grupo Avisa" },
  { keywords: ["BYD"], url: "/marcas/byd", title: "BYD - Grupo Avisa" },
  { keywords: ["Hyundai"], url: "/marcas/hyundai", title: "Hyundai - Grupo Avisa" },
  { keywords: ["BMW"], url: "/marcas/bmw", title: "BMW - Grupo Avisa" },
  { keywords: ["Mercedes-Benz", "Mercedes"], url: "/marcas/mercedes-benz", title: "Mercedes-Benz - Grupo Avisa" },
  { keywords: ["Kia"], url: "/marcas/kia", title: "Kia - Grupo Avisa" },
  { keywords: ["Volvo"], url: "/marcas/volvo", title: "Volvo - Grupo Avisa" },
  { keywords: ["Peugeot"], url: "/marcas/peugeot", title: "Peugeot - Grupo Avisa" },
  { keywords: ["Renault"], url: "/marcas/renault", title: "Renault - Grupo Avisa" },
];

export const SERVICE_LINKS: InternalLink[] = [
  { keywords: ["reparación", "reparar", "taller de reparación"], url: "/servicios/reparacion", title: "Reparación de vehículos eléctricos - Grupo Avisa" },
  { keywords: ["diagnóstico avanzado", "diagnóstico electrónico", "diagnóstico especializado", "diagnóstico"], url: "/servicios/diagnostico", title: "Diagnóstico de vehículos eléctricos - Grupo Avisa" },
  { keywords: ["mantenimiento preventivo", "mantenimiento de tu", "mantenimiento"], url: "/servicios/mantenimiento", title: "Mantenimiento de vehículos eléctricos - Grupo Avisa" },
  { keywords: ["punto de carga", "puntos de carga", "wallbox", "Wallbox", "instalación de carga"], url: "/servicios/carga", title: "Instalación de punto de carga - Grupo Avisa" },
  { keywords: ["garantía extendida", "extensión de garantía", "garantía oficial"], url: "/servicios/garantia", title: "Garantía y extensión de garantía - Grupo Avisa" },
  { keywords: ["postventa", "servicio postventa", "taller oficial"], url: "/postventa", title: "Servicio Postventa - Grupo Avisa" },
  { keywords: ["Plan MOVES", "MOVES III", "Plan Moves"], url: "/autoplus", title: "Plan MOVES y ayudas - Grupo Avisa" },
  { keywords: ["subvención", "subvenciones", "ayudas para"], url: "/autoplus", title: "Ayudas y subvenciones - Grupo Avisa" },
  { keywords: ["reparación Volkswagen"], url: "/servicios/reparacion-volkswagen", title: "Reparación Volkswagen - Grupo Avisa" },
  { keywords: ["reparación Audi"], url: "/servicios/reparacion-audi", title: "Reparación Audi - Grupo Avisa" },
  { keywords: ["diagnóstico Volkswagen"], url: "/servicios/diagnostico-volkswagen", title: "Diagnóstico Volkswagen - Grupo Avisa" },
  { keywords: ["diagnóstico Audi"], url: "/servicios/diagnostico-audi", title: "Diagnóstico Audi - Grupo Avisa" },
  { keywords: ["mantenimiento Volkswagen"], url: "/servicios/mantenimiento-volkswagen", title: "Mantenimiento Volkswagen - Grupo Avisa" },
  { keywords: ["mantenimiento Audi"], url: "/servicios/mantenimiento-audi", title: "Mantenimiento Audi - Grupo Avisa" },
];

export const FAQ_LINKS: InternalLink[] = [
  { keywords: ["autonomía real", "autonomía del", "autonomía de un"], url: "/preguntas/autonomia", title: "Preguntas sobre autonomía - Grupo Avisa" },
  { keywords: ["cómo cargar", "carga rápida", "tiempo de carga", "cargador", "tipos de carga", "infraestructura de carga"], url: "/preguntas/carga", title: "Preguntas sobre carga - Grupo Avisa" },
  { keywords: ["coste de mantenimiento", "costes de un eléctrico", "ahorro de combustible"], url: "/preguntas/costes", title: "Preguntas sobre costes - Grupo Avisa" },
  { keywords: ["preguntas frecuentes", "dudas sobre", "FAQ"], url: "/preguntas", title: "Preguntas frecuentes - Grupo Avisa" },
];

export const CONTACT_LINKS: InternalLink[] = [
  { keywords: ["concesionario", "concesionarios", "visítanos", "nuestras instalaciones"], url: "/concesionarios", title: "Red de concesionarios - Grupo Avisa" },
  { keywords: ["prueba de conducción", "test drive", "prueba gratuita"], url: "/concesionarios", title: "Solicita prueba de conducción - Grupo Avisa" },
  { keywords: ["cita previa", "solicita cita", "pedir cita"], url: "/concesionarios", title: "Cita previa - Grupo Avisa" },
];

export const VEHICLE_TYPE_LINKS: InternalLink[] = [
  { keywords: ["vehículos eléctricos", "coches eléctricos", "coche eléctrico", "vehículo eléctrico", "100% eléctrico"], url: "/promociones-electricos", title: "Vehículos eléctricos - Grupo Avisa" },
  { keywords: ["híbridos enchufables", "híbrido enchufable", "coches híbridos", "coche híbrido", "vehículos híbridos", "vehículo híbrido", "PHEV"], url: "/promociones-hibridos", title: "Vehículos híbridos enchufables - Grupo Avisa" },
];

export const EDITORIAL_LINKS: InternalLink[] = [
  { keywords: ["novedades", "últimas noticias", "noticias de eléctricos"], url: "/novedades", title: "Novedades coches eléctricos - Grupo Avisa" },
  { keywords: ["guía de compra", "guía práctica", "guías de eléctricos"], url: "/guias", title: "Guías de vehículos eléctricos - Grupo Avisa" },
  { keywords: ["comparativa", "comparativas", "comparar coches"], url: "/comparativas", title: "Comparativas de eléctricos - Grupo Avisa" },
  { keywords: ["consejos de conducción", "consejos para", "tips de carga"], url: "/consejos", title: "Consejos para eléctricos - Grupo Avisa" },
];

export const ALL_LINKS: InternalLink[] = [
  ...SERVICE_LINKS,
  ...FAQ_LINKS,
  ...CONTACT_LINKS,
  ...VEHICLE_TYPE_LINKS,
  ...BRAND_LINKS,
  ...EDITORIAL_LINKS,
];

export interface LinkMatch {
  index: number;
  length: number;
  keyword: string;
  url: string;
  title: string;
}

export function findLinkMatches(
  text: string,
  links: InternalLink[] = ALL_LINKS,
  options: {
    maxLinksPerBlock?: number;
    excludeUrls?: string[];
    oncePerKeywordGroup?: boolean;
  } = {}
): LinkMatch[] {
  const { maxLinksPerBlock = 5, excludeUrls = [], oncePerKeywordGroup = true } = options;

  const matches: LinkMatch[] = [];
  const usedRanges: [number, number][] = [];
  const usedGroups = new Set<string>();

  const filteredLinks = links.filter(l => !excludeUrls.includes(l.url));

  for (const link of filteredLinks) {
    if (matches.length >= maxLinksPerBlock) break;

    const groupKey = oncePerKeywordGroup ? link.url : null;
    if (groupKey && usedGroups.has(groupKey)) continue;

    const sortedKeywords = [...link.keywords].sort((a, b) => b.length - a.length);

    for (const keyword of sortedKeywords) {
      if (matches.length >= maxLinksPerBlock) break;

      const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(?<![/\\w-])${escapedKeyword}(?![\\w-])`, "gi");

      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        const overlaps = usedRanges.some(
          ([rs, re]) => start < re && end > rs
        );

        if (!overlaps) {
          matches.push({
            index: start,
            length: match[0].length,
            keyword: match[0],
            url: link.url,
            title: link.title,
          });
          usedRanges.push([start, end]);
          if (groupKey) usedGroups.add(groupKey);
          break;
        }
      }
    }
  }

  matches.sort((a, b) => a.index - b.index);
  return matches;
}
