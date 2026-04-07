const BASE_URL = "https://electricos.grupoavisa.com";

export const BRAND_ENTITY_IDS: Record<string, { name: string; sameAs: string[] }> = {
  volkswagen: {
    name: "Volkswagen",
    sameAs: [
      "https://www.wikidata.org/wiki/Q246",
      "https://es.wikipedia.org/wiki/Volkswagen",
      "https://www.volkswagen.es",
    ],
  },
  audi: {
    name: "Audi",
    sameAs: [
      "https://www.wikidata.org/wiki/Q23317",
      "https://es.wikipedia.org/wiki/Audi",
      "https://www.audi.es",
    ],
  },
  skoda: {
    name: "Škoda",
    sameAs: [
      "https://www.wikidata.org/wiki/Q29637",
      "https://es.wikipedia.org/wiki/%C5%A0koda_Auto",
      "https://www.skoda.es",
    ],
  },
  cupra: {
    name: "CUPRA",
    sameAs: [
      "https://www.wikidata.org/wiki/Q55260871",
      "https://es.wikipedia.org/wiki/Cupra_(marca)",
      "https://www.cupraofficial.es",
    ],
  },
  seat: {
    name: "SEAT",
    sameAs: [
      "https://www.wikidata.org/wiki/Q188217",
      "https://es.wikipedia.org/wiki/SEAT",
      "https://www.seat.es",
    ],
  },
  tesla: {
    name: "Tesla",
    sameAs: [
      "https://www.wikidata.org/wiki/Q478214",
      "https://es.wikipedia.org/wiki/Tesla,_Inc.",
      "https://www.tesla.com",
    ],
  },
  byd: {
    name: "BYD",
    sameAs: [
      "https://www.wikidata.org/wiki/Q27059",
      "https://es.wikipedia.org/wiki/BYD_Auto",
      "https://www.byd.com",
    ],
  },
  hyundai: {
    name: "Hyundai",
    sameAs: [
      "https://www.wikidata.org/wiki/Q55931",
      "https://es.wikipedia.org/wiki/Hyundai_Motor_Company",
      "https://www.hyundai.es",
    ],
  },
  bmw: {
    name: "BMW",
    sameAs: [
      "https://www.wikidata.org/wiki/Q26678",
      "https://es.wikipedia.org/wiki/BMW",
      "https://www.bmw.es",
    ],
  },
  "mercedes-benz": {
    name: "Mercedes-Benz",
    sameAs: [
      "https://www.wikidata.org/wiki/Q36108",
      "https://es.wikipedia.org/wiki/Mercedes-Benz",
      "https://www.mercedes-benz.es",
    ],
  },
  kia: {
    name: "Kia",
    sameAs: [
      "https://www.wikidata.org/wiki/Q35349",
      "https://es.wikipedia.org/wiki/Kia_Corporation",
      "https://www.kia.com/es",
    ],
  },
  volvo: {
    name: "Volvo",
    sameAs: [
      "https://www.wikidata.org/wiki/Q215293",
      "https://es.wikipedia.org/wiki/Volvo_Cars",
      "https://www.volvocars.com/es",
    ],
  },
  peugeot: {
    name: "Peugeot",
    sameAs: [
      "https://www.wikidata.org/wiki/Q6742",
      "https://es.wikipedia.org/wiki/Peugeot",
      "https://www.peugeot.es",
    ],
  },
  renault: {
    name: "Renault",
    sameAs: [
      "https://www.wikidata.org/wiki/Q6686",
      "https://es.wikipedia.org/wiki/Renault",
      "https://www.renault.es",
    ],
  },
};

export const SERVICE_ENTITY_MAP = [
  {
    slug: "reparacion",
    name: "Reparación de Vehículos Eléctricos e Híbridos",
    serviceType: "AutoRepair",
    description: "Servicio de reparación integral para vehículos eléctricos e híbridos enchufables. Técnicos certificados en alta tensión, repuestos originales y garantía oficial.",
    category: "Reparación de automóviles eléctricos",
  },
  {
    slug: "diagnostico",
    name: "Diagnóstico Electrónico de Vehículos Eléctricos",
    serviceType: "AutoRepair",
    description: "Diagnóstico electrónico avanzado con software oficial de fabricante para baterías, motores eléctricos, inversores y sistemas ADAS de vehículos eléctricos e híbridos.",
    category: "Diagnóstico electrónico automotriz",
  },
  {
    slug: "mantenimiento",
    name: "Mantenimiento de Vehículos Eléctricos e Híbridos",
    serviceType: "AutoRepair",
    description: "Mantenimiento preventivo y programado para vehículos eléctricos e híbridos. Revisión de batería, frenos regenerativos, refrigeración y sistemas de carga.",
    category: "Mantenimiento preventivo de automóviles",
  },
  {
    slug: "carga",
    name: "Instalación de Puntos de Carga para Vehículos Eléctricos",
    serviceType: "ElectricalContractor",
    description: "Instalación profesional de puntos de carga domésticos, comunitarios y comerciales para vehículos eléctricos. Wallbox, carga rápida y asesoramiento energético.",
    category: "Instalación de infraestructura de carga eléctrica",
  },
  {
    slug: "garantia",
    name: "Gestión de Garantía de Vehículos Eléctricos",
    serviceType: "ProfessionalService",
    description: "Gestión integral de garantía oficial para vehículos eléctricos e híbridos. Cobertura de batería, motor eléctrico, electrónica de potencia y sistemas auxiliares.",
    category: "Gestión de garantías automotrices",
  },
];

export const DEALER_LOCATIONS = [
  {
    id: "avisa-vw-sevilla",
    name: "Avisa Volkswagen Sevilla",
    brands: ["Volkswagen"],
    street: "C/ Alhami, 2-4",
    locality: "Sevilla",
    region: "Andalucía",
    postal: "41020",
    lat: 37.3748,
    lng: -5.9637,
  },
  {
    id: "avisa-vw-doshermanas",
    name: "Avisa Volkswagen Dos Hermanas",
    brands: ["Volkswagen"],
    street: "Av. de la Industria, s/n",
    locality: "Dos Hermanas",
    region: "Andalucía",
    postal: "41700",
    lat: 37.2839,
    lng: -5.9241,
  },
  {
    id: "avisa-audi-sevilla",
    name: "Avisa Audi Sevilla",
    brands: ["Audi"],
    street: "Av. Averroes, 12",
    locality: "Sevilla",
    region: "Andalucía",
    postal: "41020",
    lat: 37.3713,
    lng: -5.9614,
  },
  {
    id: "cartuja-skoda-sevilla",
    name: "Cartuja Motor Škoda Sevilla",
    brands: ["Škoda"],
    street: "Av. de la Raza, s/n",
    locality: "Sevilla",
    region: "Andalucía",
    postal: "41012",
    lat: 37.354,
    lng: -5.9739,
  },
  {
    id: "cartuja-skoda-huelva",
    name: "Cartuja Motor Škoda Huelva",
    brands: ["Škoda"],
    street: "Polígono Industrial La Paz",
    locality: "Huelva",
    region: "Andalucía",
    postal: "21007",
    lat: 37.2614,
    lng: -6.9447,
  },
  {
    id: "avisa-skoda-badajoz",
    name: "Avisa Škoda Badajoz",
    brands: ["Škoda"],
    street: "Ctra. de Sevilla, km 1",
    locality: "Badajoz",
    region: "Extremadura",
    postal: "06009",
    lat: 38.8794,
    lng: -6.9707,
  },
  {
    id: "avisa-skoda-caceres",
    name: "Avisa Škoda Cáceres",
    brands: ["Škoda"],
    street: "Pol. Ind. Las Capellanías",
    locality: "Cáceres",
    region: "Extremadura",
    postal: "10005",
    lat: 39.4698,
    lng: -6.3722,
  },
  {
    id: "avisa-skoda-cordoba",
    name: "Avisa Škoda Córdoba",
    brands: ["Škoda"],
    street: "Ctra. de Palma del Río",
    locality: "Córdoba",
    region: "Andalucía",
    postal: "14005",
    lat: 37.8882,
    lng: -4.7794,
  },
];

export const OFFICIAL_BRANDS = ["volkswagen", "audi", "skoda"];

export const SERVICE_CATEGORIES: Record<string, string> = {
  reparacion: "Reparación de automóviles eléctricos",
  diagnostico: "Diagnóstico electrónico automotriz",
  mantenimiento: "Mantenimiento preventivo de automóviles",
  carga: "Instalación de infraestructura de carga eléctrica",
  garantia: "Gestión de garantías automotrices",
};

export const TRUST_METRICS = {
  yearsExperience: 15,
  certifiedTechnicians: 50,
  brandsServed: 14,
  serviceLocations: 8,
  ratingValue: 4.7,
  reviewCount: 342,
  cities: 6,
};

export { BASE_URL };
