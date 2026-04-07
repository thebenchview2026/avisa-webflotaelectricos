import { DEALER_LOCATIONS, TRUST_METRICS } from "./entity-data";

export interface CityLanding {
  slug: string;
  city: string;
  region: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  dealers: typeof DEALER_LOCATIONS;
  brands: string[];
  isHQ: boolean;
  lat: number;
  lng: number;
}

export const SERVICE_CITIES = [
  {
    slug: "sevilla",
    city: "Sevilla",
    region: "Andalucía",
    isHQ: true,
    lat: 37.3748,
    lng: -5.9637,
    nearbyAreas: ["Dos Hermanas", "Alcalá de Guadaíra", "Mairena del Aljarafe", "Bormujos", "Tomares", "Camas", "La Rinconada", "Utrera"],
    radiusKm: 30,
  },
  {
    slug: "dos-hermanas",
    city: "Dos Hermanas",
    region: "Andalucía",
    isHQ: false,
    lat: 37.2839,
    lng: -5.9241,
    nearbyAreas: ["Sevilla", "Alcalá de Guadaíra", "Utrera", "Los Palacios"],
    radiusKm: 20,
  },
  {
    slug: "huelva",
    city: "Huelva",
    region: "Andalucía",
    isHQ: false,
    lat: 37.2614,
    lng: -6.9447,
    nearbyAreas: ["Moguer", "Palos de la Frontera", "Punta Umbría", "Aljaraque", "Isla Cristina"],
    radiusKm: 25,
  },
  {
    slug: "cordoba",
    city: "Córdoba",
    region: "Andalucía",
    isHQ: false,
    lat: 37.8882,
    lng: -4.7794,
    nearbyAreas: ["Lucena", "Puente Genil", "Montilla", "Priego de Córdoba", "Cabra"],
    radiusKm: 25,
  },
  {
    slug: "badajoz",
    city: "Badajoz",
    region: "Extremadura",
    isHQ: false,
    lat: 38.8794,
    lng: -6.9707,
    nearbyAreas: ["Mérida", "Don Benito", "Villanueva de la Serena", "Almendralejo", "Zafra"],
    radiusKm: 30,
  },
  {
    slug: "caceres",
    city: "Cáceres",
    region: "Extremadura",
    isHQ: false,
    lat: 39.4698,
    lng: -6.3722,
    nearbyAreas: ["Plasencia", "Navalmoral de la Mata", "Trujillo", "Coria"],
    radiusKm: 30,
  },
] as const;

export function getCityLandingData(citySlug: string): CityLanding | null {
  const city = SERVICE_CITIES.find((c) => c.slug === citySlug);
  if (!city) return null;

  const cityDealers = DEALER_LOCATIONS.filter(
    (d) => d.locality.toLowerCase() === city.city.toLowerCase()
  );

  const allBrands = [...new Set(cityDealers.flatMap((d) => d.brands))];

  const brandText = allBrands.length > 0
    ? allBrands.join(", ")
    : "Volkswagen, Audi, Škoda y 11 marcas más";

  const isHQ = city.isHQ;

  return {
    slug: city.slug,
    city: city.city,
    region: city.region,
    metaTitle: `Taller Eléctricos e Híbridos en ${city.city}`,
    metaDescription: `Taller especializado en coches eléctricos e híbridos en ${city.city}. ${cityDealers.length > 0 ? `${cityDealers.length} centro${cityDealers.length > 1 ? "s" : ""} de servicio.` : "Servicio oficial."} ${brandText}. Pide cita: 955 034 600.`,
    h1: `Taller de Vehículos Eléctricos e Híbridos en ${city.city}`,
    intro: isHQ
      ? `Grupo Avisa es el mayor grupo de concesionarios oficiales de vehículos eléctricos e híbridos en ${city.city}. Con ${cityDealers.length} centros de servicio en la ciudad, más de ${TRUST_METRICS.certifiedTechnicians} técnicos certificados en alta tensión y experiencia en ${TRUST_METRICS.brandsServed} marcas, ofrecemos reparación, diagnóstico, mantenimiento, instalación de puntos de carga y gestión de garantía para tu vehículo eléctrico o híbrido enchufable.`
      : `Grupo Avisa cuenta con ${cityDealers.length > 0 ? `${cityDealers.length} centro de servicio oficial` : "servicio oficial"} en ${city.city} para vehículos eléctricos e híbridos. Nuestros técnicos certificados en alta tensión realizan reparaciones, diagnósticos, mantenimiento preventivo, instalación de puntos de carga Wallbox y gestión de garantías. ${brandText} con cobertura en toda la provincia de ${city.city} y alrededores.`,
    dealers: cityDealers,
    brands: allBrands,
    isHQ,
    lat: city.lat,
    lng: city.lng,
  };
}

export function getAllCitySlugs(): string[] {
  return SERVICE_CITIES.map((c) => c.slug);
}

export function getCityBySlug(slug: string) {
  return SERVICE_CITIES.find((c) => c.slug === slug) || null;
}

export const SERVICES_OFFERED = [
  { name: "Reparación", slug: "reparacion", icon: "ri-tools-line", description: "Reparación integral de sistemas eléctricos, baterías de alto voltaje, motores eléctricos y electrónica de potencia." },
  { name: "Diagnóstico", slug: "diagnostico", icon: "ri-search-eye-line", description: "Diagnóstico electrónico avanzado con equipos oficiales del fabricante. Lectura de códigos, análisis de batería y sistemas ADAS." },
  { name: "Mantenimiento", slug: "mantenimiento", icon: "ri-settings-3-line", description: "Mantenimiento preventivo especializado: refrigerante de batería, frenos regenerativos, filtros de habitáculo y software." },
  { name: "Carga", slug: "carga", icon: "ri-charging-pile-line", description: "Instalación de puntos de carga Wallbox para hogar, comunidad y empresa. Asesoramiento energético y tramitación de ayudas." },
  { name: "Garantía", slug: "garantia", icon: "ri-shield-check-line", description: "Gestión integral de garantía oficial. Cobertura de batería, motor eléctrico y componentes de alta tensión." },
];
