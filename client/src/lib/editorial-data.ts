export const EDITORIAL_TYPES = {
  novedad: {
    slug: "novedades",
    singular: "Novedad",
    plural: "Novedades",
    icon: "ri-newspaper-line",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Últimas novedades sobre vehículos eléctricos e híbridos, legislación, infraestructura de carga y mercado del automóvil sostenible.",
    metaTitle: "Novedades Coches Eléctricos e Híbridos",
    metaDescription: "Mantente al día con las últimas novedades sobre vehículos eléctricos e híbridos: lanzamientos, regulaciones, ayudas y tendencias del sector en España.",
  },
  guia: {
    slug: "guias",
    singular: "Guía",
    plural: "Guías",
    icon: "ri-book-open-line",
    color: "bg-green-500",
    lightColor: "bg-green-50",
    textColor: "text-green-600",
    description: "Guías completas para elegir, mantener y aprovechar al máximo tu vehículo eléctrico o híbrido enchufable.",
    metaTitle: "Guías Vehículos Eléctricos e Híbridos",
    metaDescription: "Guías prácticas sobre coches eléctricos e híbridos: cómo elegir, carga en casa, autonomía real, costes de mantenimiento y más.",
  },
  comparativa: {
    slug: "comparativas",
    singular: "Comparativa",
    plural: "Comparativas",
    icon: "ri-scales-3-line",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600",
    description: "Comparativas detalladas entre los mejores vehículos eléctricos e híbridos enchufables del mercado español.",
    metaTitle: "Comparativas Coches Eléctricos e Híbridos",
    metaDescription: "Comparativas objetivas entre vehículos eléctricos e híbridos: autonomía, precio, equipamiento y prestaciones. Te ayudamos a elegir.",
  },
  consejo: {
    slug: "consejos",
    singular: "Consejo",
    plural: "Consejos",
    icon: "ri-lightbulb-line",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
    textColor: "text-amber-600",
    description: "Consejos prácticos para conductores de vehículos eléctricos e híbridos: ahorro, conducción eficiente, carga y mantenimiento.",
    metaTitle: "Consejos Coches Eléctricos e Híbridos",
    metaDescription: "Consejos de expertos para sacar el máximo partido a tu coche eléctrico o híbrido: conducción eficiente, carga, ahorro y cuidado de batería.",
  },
} as const;

export type EditorialType = keyof typeof EDITORIAL_TYPES;

export function getEditorialTypeFromSlug(slug: string): EditorialType | undefined {
  for (const [key, value] of Object.entries(EDITORIAL_TYPES)) {
    if (value.slug === slug) return key as EditorialType;
  }
  return undefined;
}

export function getEditorialUrlPrefix(type: string): string {
  const config = EDITORIAL_TYPES[type as EditorialType];
  return config ? `/${config.slug}` : "/novedades";
}

export function formatDate(date: string | Date | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatDateISO(date: string | Date | null): string {
  if (!date) return "";
  return new Date(date).toISOString();
}
