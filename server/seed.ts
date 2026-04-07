import { storage } from "./storage";
import type { InsertBrand, InsertVehicle, InsertPage, InsertDealer, InsertFaqCategory, InsertFaq, InsertTestimonial } from "@shared/schema";

const seedBrands: InsertBrand[] = [
  {
    name: "Tesla",
    slug: "tesla",
    description: "Líder mundial en vehículos eléctricos de alto rendimiento y tecnología autónoma avanzada.",
    country: "Estados Unidos",
  },
  {
    name: "BYD",
    slug: "byd",
    description: "El mayor fabricante de vehículos eléctricos del mundo, con soluciones para todos los segmentos.",
    country: "China",
  },
  {
    name: "Hyundai",
    slug: "hyundai",
    description: "Innovación coreana con una gama completa de eléctricos de última generación.",
    country: "Corea del Sur",
  },
  {
    name: "Volkswagen",
    slug: "volkswagen",
    description: "La familia ID. revoluciona la movilidad eléctrica europea con calidad alemana.",
    country: "Alemania",
  },
  {
    name: "BMW",
    slug: "bmw",
    description: "Deportividad y lujo eléctrico con la gama iX e i de BMW.",
    country: "Alemania",
  },
  {
    name: "Mercedes-Benz",
    slug: "mercedes-benz",
    description: "La gama EQ ofrece la máxima sofisticación en movilidad eléctrica premium.",
    country: "Alemania",
  },
  {
    name: "Kia",
    slug: "kia",
    description: "Diseño audaz y tecnología avanzada en sus modelos 100% eléctricos.",
    country: "Corea del Sur",
  },
  {
    name: "Volvo",
    slug: "volvo",
    description: "Seguridad escandinava y sostenibilidad en cada modelo eléctrico.",
    country: "Suecia",
  },
  {
    name: "Peugeot",
    slug: "peugeot",
    description: "Electrificación francesa con estilo y practicidad para el día a día.",
    country: "Francia",
  },
  {
    name: "Renault",
    slug: "renault",
    description: "Pioneros de la movilidad eléctrica accesible en Europa.",
    country: "Francia",
  },
];

export async function seedDatabase() {
  const existingBrands = await storage.getBrands();
  if (existingBrands.length > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  console.log("Seeding database...");

  const createdBrands: Record<string, string> = {};
  for (const brand of seedBrands) {
    const created = await storage.createBrand(brand);
    createdBrands[brand.slug] = created.id;
  }

  const seedVehicles: InsertVehicle[] = [
    {
      brandId: createdBrands["tesla"],
      model: "Model Y Long Range",
      slug: "tesla-model-y-long-range",
      imageUrl: "/images/tesla-model-y.jpg",
      year: 2025,
      price: 48990,
      bodyType: "SUV",
      rangeKm: 533,
      batteryKwh: 75,
      powerHp: 350,
      acceleration: 5.0,
      topSpeed: 217,
      seats: 5,
      drivetrain: "AWD",
      chargingTimeFast: "27 min (10-80%)",
      chargingTimeSlow: "7h 30min",
      trunkLiters: 854,
      weight: 1979,
      shortDescription: "SUV eléctrico versátil con la mejor autonomía de su clase y tecnología Autopilot.",
      description: "El Tesla Model Y Long Range combina espacio, rendimiento y tecnología de vanguardia. Con tracción total y una autonomía superior a 500 km, es la opción ideal para familias y profesionales que buscan un SUV eléctrico sin compromiso.",
      featured: true,
      available: true,
      metaTitle: "Tesla Model Y Long Range 2025 - AVISA Flota Eléctricos",
      metaDescription: "Descubre el Tesla Model Y Long Range 2025. SUV eléctrico con 533 km de autonomía y tracción total.",
    },
    {
      brandId: createdBrands["tesla"],
      model: "Model 3 Highland",
      slug: "tesla-model-3-highland",
      imageUrl: "/images/tesla-model-3.jpg",
      year: 2025,
      price: 40970,
      bodyType: "Berlina",
      rangeKm: 629,
      batteryKwh: 60,
      powerHp: 283,
      acceleration: 6.1,
      topSpeed: 201,
      seats: 5,
      drivetrain: "RWD",
      chargingTimeFast: "22 min (10-80%)",
      chargingTimeSlow: "6h 15min",
      trunkLiters: 594,
      weight: 1761,
      shortDescription: "La berlina eléctrica más vendida del mundo, ahora con diseño renovado.",
      description: "El Tesla Model 3 Highland presenta un diseño interior completamente renovado con materiales premium, iluminación ambiental y la mayor autonomía de su segmento. Tecnología de carga ultrarrápida y el sistema Autopilot más avanzado.",
      featured: true,
      available: true,
      metaTitle: "Tesla Model 3 Highland 2025 - AVISA Flota Eléctricos",
      metaDescription: "Tesla Model 3 Highland 2025 con 629 km de autonomía. La berlina eléctrica más popular.",
    },
    {
      brandId: createdBrands["byd"],
      model: "Seal U",
      slug: "byd-seal-u",
      imageUrl: "/images/byd-seal-u.jpg",
      year: 2025,
      price: 38990,
      bodyType: "SUV",
      rangeKm: 500,
      batteryKwh: 87.4,
      powerHp: 218,
      acceleration: 7.5,
      topSpeed: 185,
      seats: 5,
      drivetrain: "FWD",
      chargingTimeFast: "34 min (10-80%)",
      chargingTimeSlow: "8h 30min",
      trunkLiters: 552,
      weight: 2105,
      shortDescription: "SUV familiar con la tecnología Blade Battery y una excelente relación calidad-precio.",
      description: "El BYD Seal U es un SUV eléctrico espacioso y tecnológico que destaca por su batería Blade de litio-ferrofosfato, ofreciendo máxima seguridad y durabilidad. Equipamiento completo de serie y un diseño moderno que se adapta perfectamente a las necesidades de las flotas empresariales.",
      featured: true,
      available: true,
      metaTitle: "BYD Seal U 2025 - AVISA Flota Eléctricos",
      metaDescription: "BYD Seal U 2025, SUV eléctrico con 500 km de autonomía y tecnología Blade Battery.",
    },
    {
      brandId: createdBrands["hyundai"],
      model: "IONIQ 5 N",
      slug: "hyundai-ioniq-5-n",
      imageUrl: "/images/hyundai-ioniq-5-n.jpg",
      year: 2025,
      price: 68900,
      bodyType: "SUV",
      rangeKm: 448,
      batteryKwh: 84,
      powerHp: 650,
      acceleration: 3.4,
      topSpeed: 260,
      seats: 5,
      drivetrain: "AWD",
      chargingTimeFast: "18 min (10-80%)",
      chargingTimeSlow: "7h 20min",
      trunkLiters: 527,
      weight: 2231,
      shortDescription: "El SUV eléctrico más deportivo del mercado con 650 CV y prestaciones de superdeportivo.",
      description: "El Hyundai IONIQ 5 N redefine los límites de los vehículos eléctricos de alto rendimiento. Con 650 CV, tracción total y un sistema de sonido que simula cambios de marcha, ofrece una experiencia de conducción emocionante y única en el segmento eléctrico.",
      featured: true,
      available: true,
      metaTitle: "Hyundai IONIQ 5 N 2025 - AVISA Flota Eléctricos",
      metaDescription: "Hyundai IONIQ 5 N 2025 con 650 CV. El SUV eléctrico deportivo definitivo.",
    },
    {
      brandId: createdBrands["volkswagen"],
      model: "ID.4 Pro",
      slug: "volkswagen-id4-pro",
      imageUrl: "/images/vw-id4.jpg",
      year: 2025,
      price: 42495,
      bodyType: "SUV",
      rangeKm: 522,
      batteryKwh: 77,
      powerHp: 286,
      acceleration: 6.7,
      topSpeed: 180,
      seats: 5,
      drivetrain: "RWD",
      chargingTimeFast: "28 min (10-80%)",
      chargingTimeSlow: "7h 30min",
      trunkLiters: 543,
      weight: 2074,
      shortDescription: "El SUV eléctrico de Volkswagen con calidad alemana y gran autonomía.",
      description: "El Volkswagen ID.4 Pro combina la fiabilidad y calidad de construcción alemana con una plataforma 100% eléctrica. Su interior espacioso, infotainment intuitivo y autonomía superior a 500 km lo convierten en una opción ideal para flotas empresariales y particulares exigentes.",
      featured: false,
      available: true,
      metaTitle: "Volkswagen ID.4 Pro 2025 - AVISA Flota Eléctricos",
      metaDescription: "Volkswagen ID.4 Pro 2025, SUV eléctrico con 522 km de autonomía y calidad alemana.",
    },
    {
      brandId: createdBrands["bmw"],
      model: "iX1 xDrive30",
      slug: "bmw-ix1-xdrive30",
      imageUrl: "/images/bmw-ix1.jpg",
      year: 2025,
      price: 52850,
      bodyType: "SUV",
      rangeKm: 440,
      batteryKwh: 64.7,
      powerHp: 313,
      acceleration: 5.6,
      topSpeed: 180,
      seats: 5,
      drivetrain: "AWD",
      chargingTimeFast: "29 min (10-80%)",
      chargingTimeSlow: "6h 30min",
      trunkLiters: 490,
      weight: 2040,
      shortDescription: "Compacto premium eléctrico con la deportividad y lujo característicos de BMW.",
      description: "El BMW iX1 xDrive30 ofrece lo mejor de BMW en formato compacto y 100% eléctrico. Tracción integral, acabados premium y la última tecnología en conectividad y asistencia a la conducción.",
      featured: false,
      available: true,
      metaTitle: "BMW iX1 xDrive30 2025 - AVISA Flota Eléctricos",
      metaDescription: "BMW iX1 xDrive30 2025. SUV compacto eléctrico premium con tracción integral.",
    },
    {
      brandId: createdBrands["mercedes-benz"],
      model: "EQA 250+",
      slug: "mercedes-benz-eqa-250-plus",
      imageUrl: "/images/mercedes-eqa.jpg",
      year: 2025,
      price: 53375,
      bodyType: "SUV",
      rangeKm: 528,
      batteryKwh: 70.5,
      powerHp: 190,
      acceleration: 8.6,
      topSpeed: 160,
      seats: 5,
      drivetrain: "FWD",
      chargingTimeFast: "32 min (10-80%)",
      chargingTimeSlow: "8h",
      trunkLiters: 340,
      weight: 2030,
      shortDescription: "Lujo y eficiencia en formato SUV compacto eléctrico de Mercedes-Benz.",
      description: "El Mercedes-Benz EQA 250+ combina la elegancia y sofisticación de Mercedes con una plataforma eléctrica eficiente. Interior lujoso con MBUX, sistema de navegación con planificación de rutas eléctricas y una autonomía que supera los 500 km.",
      featured: false,
      available: true,
      metaTitle: "Mercedes-Benz EQA 250+ 2025 - AVISA Flota Eléctricos",
      metaDescription: "Mercedes-Benz EQA 250+ 2025. SUV eléctrico de lujo con 528 km de autonomía.",
    },
    {
      brandId: createdBrands["kia"],
      model: "EV6 GT-Line",
      slug: "kia-ev6-gt-line",
      imageUrl: "/images/kia-ev6.jpg",
      year: 2025,
      price: 52990,
      bodyType: "SUV",
      rangeKm: 528,
      batteryKwh: 77.4,
      powerHp: 325,
      acceleration: 5.2,
      topSpeed: 185,
      seats: 5,
      drivetrain: "AWD",
      chargingTimeFast: "18 min (10-80%)",
      chargingTimeSlow: "7h 10min",
      trunkLiters: 490,
      weight: 2090,
      shortDescription: "Crossover eléctrico con carga ultra-rápida a 800V y diseño vanguardista.",
      description: "El Kia EV6 GT-Line impresiona con su plataforma E-GMP de 800V que permite cargas ultra-rápidas, diseño futurista y un rendimiento excepcional. Ganador de múltiples premios internacionales, es uno de los eléctricos más completos del mercado.",
      featured: true,
      available: true,
      metaTitle: "Kia EV6 GT-Line 2025 - AVISA Flota Eléctricos",
      metaDescription: "Kia EV6 GT-Line 2025 con carga ultra-rápida 800V y 528 km de autonomía.",
    },
    {
      brandId: createdBrands["volvo"],
      model: "EX30 Single Motor",
      slug: "volvo-ex30-single-motor",
      imageUrl: "/images/volvo-ex30.jpg",
      year: 2025,
      price: 36695,
      bodyType: "Compacto",
      rangeKm: 476,
      batteryKwh: 69,
      powerHp: 272,
      acceleration: 5.3,
      topSpeed: 180,
      seats: 5,
      drivetrain: "RWD",
      chargingTimeFast: "25 min (10-80%)",
      chargingTimeSlow: "6h",
      trunkLiters: 318,
      weight: 1790,
      shortDescription: "El SUV compacto eléctrico más seguro y sostenible del mercado.",
      description: "El Volvo EX30 es el eléctrico más pequeño de Volvo pero no escatima en seguridad ni tecnología. Fabricado con materiales reciclados, ofrece un interior minimalista escandinavo y todos los sistemas de seguridad activa de Volvo.",
      featured: false,
      available: true,
      metaTitle: "Volvo EX30 Single Motor 2025 - AVISA Flota Eléctricos",
      metaDescription: "Volvo EX30 2025. El SUV compacto eléctrico más seguro con 476 km de autonomía.",
    },
    {
      brandId: createdBrands["peugeot"],
      model: "e-3008",
      slug: "peugeot-e-3008",
      imageUrl: "/images/peugeot-e3008.jpg",
      year: 2025,
      price: 44900,
      bodyType: "SUV",
      rangeKm: 527,
      batteryKwh: 73,
      powerHp: 213,
      acceleration: 8.7,
      topSpeed: 170,
      seats: 5,
      drivetrain: "FWD",
      chargingTimeFast: "30 min (10-80%)",
      chargingTimeSlow: "7h 45min",
      trunkLiters: 520,
      weight: 2037,
      shortDescription: "El nuevo SUV eléctrico de Peugeot con el innovador i-Cockpit panorámico.",
      description: "El Peugeot e-3008 marca una nueva era para la marca con un diseño revolucionario y el innovador i-Cockpit panorámico de 21 pulgadas. Autonomía superior a 500 km y un interior que redefine el concepto de confort en el segmento eléctrico.",
      featured: false,
      available: true,
      metaTitle: "Peugeot e-3008 2025 - AVISA Flota Eléctricos",
      metaDescription: "Peugeot e-3008 2025. SUV eléctrico innovador con 527 km de autonomía.",
    },
    {
      brandId: createdBrands["renault"],
      model: "Scenic E-Tech",
      slug: "renault-scenic-e-tech",
      imageUrl: "/images/renault-scenic.jpg",
      year: 2025,
      price: 39990,
      bodyType: "SUV",
      rangeKm: 625,
      batteryKwh: 87,
      powerHp: 220,
      acceleration: 7.9,
      topSpeed: 170,
      seats: 5,
      drivetrain: "FWD",
      chargingTimeFast: "30 min (15-80%)",
      chargingTimeSlow: "9h",
      trunkLiters: 545,
      weight: 2058,
      shortDescription: "El familiar eléctrico con la mayor autonomía de su categoría: 625 km.",
      description: "El Renault Scenic E-Tech reinventa el monovolumen como un SUV eléctrico familiar con una autonomía líder de 625 km. Interior amplísimo, sistema multimedia openR link con Google integrado y un compromiso firme con la sostenibilidad usando materiales reciclados.",
      featured: true,
      available: true,
      metaTitle: "Renault Scenic E-Tech 2025 - AVISA Flota Eléctricos",
      metaDescription: "Renault Scenic E-Tech 2025 con 625 km de autonomía. El familiar eléctrico definitivo.",
    },
    {
      brandId: createdBrands["byd"],
      model: "Dolphin",
      slug: "byd-dolphin",
      imageUrl: "/images/byd-dolphin.jpg",
      year: 2025,
      price: 29990,
      bodyType: "Compacto",
      rangeKm: 427,
      batteryKwh: 60.4,
      powerHp: 204,
      acceleration: 7.0,
      topSpeed: 160,
      seats: 5,
      drivetrain: "FWD",
      chargingTimeFast: "29 min (10-80%)",
      chargingTimeSlow: "7h 30min",
      trunkLiters: 345,
      weight: 1625,
      shortDescription: "El compacto eléctrico más accesible con tecnología de primer nivel.",
      description: "El BYD Dolphin democratiza la movilidad eléctrica con un precio competitivo sin renunciar a prestaciones. Batería Blade segura, diseño joven y fresco, y un equipamiento de serie que avergüenza a rivales más caros.",
      featured: false,
      available: true,
      metaTitle: "BYD Dolphin 2025 - AVISA Flota Eléctricos",
      metaDescription: "BYD Dolphin 2025. Compacto eléctrico accesible con 427 km de autonomía.",
    },
  ];

  for (const vehicle of seedVehicles) {
    await storage.createVehicle(vehicle);
  }

  console.log(`Seeded ${seedBrands.length} brands and ${seedVehicles.length} vehicles`);

  await seedPages();
}

const seedPagesList: InsertPage[] = [
  {
    title: "Inicio",
    slug: "inicio",
    content: "Página principal de AVISA Flota de Eléctricos. Catálogo de vehículos eléctricos e híbridos, promociones, servicios postventa y más.",
    metaTitle: "AVISA - Flota de Eléctricos e Híbridos | Grupo Avisa Sevilla",
    metaDescription: "Descubre la flota de vehículos eléctricos e híbridos de Grupo Avisa en Sevilla. Las mejores marcas, promociones exclusivas y servicio postventa especializado.",
    published: true,
  },
  {
    title: "Promociones Eléctricos",
    slug: "promociones-electricos",
    content: "Ofertas y promociones especiales en vehículos 100% eléctricos. Descubre las mejores condiciones de financiación y descuentos exclusivos.",
    metaTitle: "Promociones Vehículos Eléctricos | AVISA Grupo Avisa",
    metaDescription: "Las mejores ofertas en coches eléctricos en Sevilla. Descubre nuestras promociones exclusivas en Tesla, BYD, Hyundai y más marcas.",
    published: true,
  },
  {
    title: "Promociones Híbridos",
    slug: "promociones-hibridos",
    content: "Ofertas y promociones especiales en vehículos híbridos enchufables. Combina lo mejor de la combustión y la electrificación.",
    metaTitle: "Promociones Vehículos Híbridos | AVISA Grupo Avisa",
    metaDescription: "Ofertas exclusivas en coches híbridos enchufables. Descubre nuestras promociones en Sevilla con las mejores condiciones.",
    published: true,
  },
  {
    title: "Autoplus - Plan MOVES III",
    slug: "autoplus",
    content: "Plan MOVES III y ayudas a la compra de vehículos eléctricos. Gestión integral de subvenciones para tu nuevo vehículo eléctrico o híbrido enchufable.",
    metaTitle: "Plan MOVES III - Ayudas Vehículos Eléctricos | AVISA",
    metaDescription: "Gestión integral del Plan MOVES III en Sevilla. Te ayudamos con las subvenciones para tu vehículo eléctrico o híbrido enchufable.",
    published: true,
  },
  {
    title: "Servicio Postventa",
    slug: "postventa",
    content: "Servicio postventa especializado en vehículos eléctricos e híbridos. Talleres oficiales con técnicos certificados, mantenimiento preventivo, diagnóstico avanzado y garantía de calidad.",
    metaTitle: "Servicio Postventa Vehículos Eléctricos | AVISA Grupo Avisa",
    metaDescription: "Servicio postventa especializado para coches eléctricos e híbridos en Sevilla. Técnicos certificados, mantenimiento y diagnóstico avanzado.",
    published: true,
  },
  {
    title: "Preguntas Frecuentes",
    slug: "preguntas",
    content: "Resolvemos todas tus dudas sobre vehículos eléctricos e híbridos. Autonomía, carga, mantenimiento, subvenciones y más.",
    metaTitle: "Preguntas Frecuentes sobre Vehículos Eléctricos | AVISA",
    metaDescription: "Todas las respuestas sobre coches eléctricos: autonomía, puntos de carga, mantenimiento, ayudas MOVES y más. Guía completa AVISA.",
    published: true,
  },
  {
    title: "Concesionarios",
    slug: "concesionarios",
    content: "Red de concesionarios Grupo Avisa en Sevilla y provincia. Encuentra tu concesionario más cercano con vehículos eléctricos e híbridos.",
    metaTitle: "Concesionarios AVISA en Sevilla | Grupo Avisa",
    metaDescription: "Encuentra los concesionarios de Grupo Avisa en Sevilla. Vehículos eléctricos e híbridos de las mejores marcas con asesoramiento personalizado.",
    published: true,
  },
  {
    title: "Electrificación",
    slug: "electrificacion",
    content: "Todo lo que necesitas saber sobre la transición a la movilidad eléctrica. Ventajas, tecnología, infraestructura de carga y futuro del transporte sostenible.",
    metaTitle: "Guía de Electrificación - Movilidad Eléctrica | AVISA",
    metaDescription: "Guía completa sobre electrificación y movilidad sostenible. Ventajas de los coches eléctricos, infraestructura de carga y el futuro del transporte.",
    published: true,
  },
  {
    title: "Conductores de Adopción",
    slug: "conductores-adopcion",
    content: "Los principales motivos para pasarte al vehículo eléctrico. Ahorro, sostenibilidad, tecnología y experiencia de conducción superior.",
    metaTitle: "¿Por qué Pasarte al Eléctrico? | AVISA Grupo Avisa",
    metaDescription: "Descubre las razones para cambiar a un coche eléctrico. Ahorro en combustible, mantenimiento reducido, cero emisiones y más ventajas.",
    published: true,
  },
  {
    title: "Términos y Condiciones",
    slug: "terminos",
    content: "Términos y condiciones de uso del sitio web de AVISA Flota de Eléctricos. Política de privacidad, cookies y aviso legal.",
    metaTitle: "Términos y Condiciones | AVISA Grupo Avisa",
    metaDescription: "Términos y condiciones, política de privacidad y aviso legal del sitio web de AVISA Grupo Avisa.",
    published: true,
  },
  {
    title: "Aviso Legal",
    slug: "aviso-legal",
    content: "Aviso legal e información sobre propiedad intelectual, exclusión de responsabilidad y legislación aplicable del sitio web de AVISA.",
    metaTitle: "Aviso Legal | AVISA Grupo Avisa",
    metaDescription: "Aviso legal del sitio web de AVISA Grupo Avisa. Datos identificativos, propiedad intelectual, exclusión de responsabilidad y jurisdicción.",
    published: true,
  },
  {
    title: "Política de Cookies",
    slug: "politica-cookies",
    content: "Política de cookies del sitio web de AVISA. Tipos de cookies, Google Consent Mode v2, gestión y configuración de preferencias.",
    metaTitle: "Política de Cookies | AVISA Grupo Avisa",
    metaDescription: "Política de cookies de AVISA Grupo Avisa. Información sobre cookies técnicas, analíticas y de marketing. Google Consent Mode v2.",
    published: true,
  },
  {
    title: "Condiciones de Uso",
    slug: "condiciones-uso",
    content: "Condiciones de uso del sitio web de AVISA. Normas de acceso, uso adecuado, formularios, precios y promociones.",
    metaTitle: "Condiciones de Uso | AVISA Grupo Avisa",
    metaDescription: "Condiciones de uso del sitio web de AVISA Grupo Avisa. Normas de acceso, formularios, precios informativos y legislación aplicable.",
    published: true,
  },
  {
    title: "Declaración de Accesibilidad",
    slug: "accesibilidad",
    content: "Declaración de accesibilidad web de AVISA. Compromiso con WCAG 2.1, medidas implementadas y contacto para incidencias.",
    metaTitle: "Declaración de Accesibilidad | AVISA Grupo Avisa",
    metaDescription: "Declaración de accesibilidad web de AVISA Grupo Avisa. Conformidad WCAG 2.1 nivel AA, medidas implementadas y contacto.",
    published: true,
  },
];

export async function seedPages() {
  const existingPages = await storage.getPages();
  const existingSlugs = new Set(existingPages.map(p => p.slug));
  const newPages = seedPagesList.filter(p => !existingSlugs.has(p.slug));

  if (newPages.length === 0) {
    return;
  }

  for (const page of newPages) {
    await storage.createPage(page);
  }

  console.log(`Seeded ${newPages.length} new pages (${existingPages.length} already existed)`);
}

export async function seedSections() {
  const existingSections = await storage.getSections();

  const sectionsList: Array<{pageSlug: string; sectionKey: string; title: string; subtitle: string; sortOrder: number; active: boolean; content: any; imageUrl?: string}> = [
    { pageSlug: "inicio", sectionKey: "hero", title: "Flota de Eléctricos e Híbridos", subtitle: "Descubre la nueva era de la movilidad sostenible con Grupo Avisa. Las mejores marcas, promociones exclusivas y servicio postventa especializado en Sevilla.", sortOrder: 1, active: true, content: { badge: "Grupo Avisa", buttonPrimary: "Explorar catálogo", buttonSecondary: "Contactar", stats: [{ label: "Vehículos disponibles", value: "12+" }, { label: "Marcas premium", value: "10" }, { label: "Años de experiencia", value: "30+" }] } },
    { pageSlug: "inicio", sectionKey: "vehicle-selector", title: "Encuentra tu vehículo ideal", subtitle: "Explora nuestra selección de vehículos eléctricos e híbridos de las mejores marcas del mercado.", sortOrder: 2, active: true, content: { filters: ["Todos", "Eléctricos", "Híbridos"], buttonText: "Ver catálogo completo" } },
    { pageSlug: "inicio", sectionKey: "electric-promotions", title: "Promociones Eléctricos", subtitle: "Las mejores ofertas en vehículos 100% eléctricos con Plan MOVES incluido.", sortOrder: 3, active: true, content: { badge: "100% Eléctricos", buttonText: "Ver todas las promociones", link: "/promociones-electricos" } },
    { pageSlug: "inicio", sectionKey: "hybrid-promotions", title: "Promociones Híbridos", subtitle: "Ofertas exclusivas en vehículos híbridos enchufables.", sortOrder: 4, active: true, content: { badge: "Híbridos Enchufables", buttonText: "Ver todas las promociones", link: "/promociones-hibridos" } },
    { pageSlug: "inicio", sectionKey: "postventa", title: "Servicio Postventa Especializado", subtitle: "Talleres oficiales con técnicos certificados en vehículos eléctricos e híbridos.", sortOrder: 5, active: true, content: { features: ["Técnicos certificados en alta tensión", "Diagnóstico avanzado de baterías", "Vehículo de sustitución eléctrico", "Cita previa online 24/7"], buttonText: "Más información", link: "/postventa" } },
    { pageSlug: "inicio", sectionKey: "plan-moves", title: "Plan MOVES III", subtitle: "Hasta 7.000€ de ayuda directa para tu vehículo eléctrico.", sortOrder: 6, active: true, content: { maxAid: "7.000€", features: ["Gestión integral sin coste", "Para vehículos eléctricos e híbridos enchufables", "Compatible con financiación"], buttonText: "Más información", link: "/autoplus" } },
    { pageSlug: "inicio", sectionKey: "faqs", title: "Preguntas frecuentes", subtitle: "Resolvemos tus dudas sobre movilidad eléctrica.", sortOrder: 7, active: true, content: { buttonText: "Ver todas las preguntas", link: "/preguntas", topQuestions: ["¿Cuánto cuesta cargar un coche eléctrico?", "¿Qué autonomía real tienen?", "¿Qué ayudas puedo solicitar?"] } },
    { pageSlug: "inicio", sectionKey: "dealers", title: "Nuestros concesionarios", subtitle: "Encuentra tu concesionario más cercano.", sortOrder: 8, active: true, content: { buttonText: "Ver todos los concesionarios", link: "/concesionarios", highlights: ["9 concesionarios en Sevilla y provincia", "Talleres oficiales Volkswagen, Audi, Škoda", "Exposición de vehículos eléctricos e híbridos"] } },
    { pageSlug: "inicio", sectionKey: "cta", title: "¿Listo para dar el salto a la movilidad eléctrica?", subtitle: "Nuestros asesores expertos te ayudan a encontrar el vehículo eléctrico o híbrido perfecto para ti.", sortOrder: 9, active: true, content: { buttonText: "Solicitar asesoramiento", phone: "955 034 600" } },
    { pageSlug: "inicio", sectionKey: "contact", title: "Contacto", subtitle: "Estamos aquí para ayudarte. Contáctanos sin compromiso.", sortOrder: 10, active: true, content: { phone: "955 034 600", email: "info@grupoavisa.com", whatsapp: "34621261541", advisor: "Ana" } },

    { pageSlug: "promociones-electricos", sectionKey: "hero", title: "Vehículos 100% Eléctricos", subtitle: "Descubre nuestra gama completa de vehículos eléctricos con las mejores condiciones del mercado. Plan MOVES incluido y financiación a tu medida.", sortOrder: 1, active: true, imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1440&h=810&fit=crop&auto=format&q=80", content: { badge: "Promociones Exclusivas", buttonPrimary: "Ver modelos", buttonSecondary: "Solicitar información", stats: [{ label: "Ayudas Plan MOVES", value: "7.000€" }, { label: "Emisiones CO₂", value: "0%" }, { label: "Ahorro combustible", value: "70%" }] } },
    { pageSlug: "promociones-electricos", sectionKey: "technology", title: "Tecnología eléctrica avanzada", subtitle: "Los vehículos eléctricos representan la evolución más significativa en la historia del automóvil.", sortOrder: 2, active: true, content: { items: [{ icon: "ri-battery-2-charge-line", title: "Baterías de última generación", description: "Tecnología de iones de litio con alta densidad energética, garantía de 8 años y capacidad de carga rápida hasta el 80% en 30 minutos." }, { icon: "ri-flashlight-line", title: "Motores eléctricos eficientes", description: "Motores síncronos de imanes permanentes con eficiencia superior al 95%, par instantáneo y conducción silenciosa." }, { icon: "ri-refresh-line", title: "Frenado regenerativo", description: "Sistema que recupera energía durante la frenada, aumentando la autonomía hasta un 20% en conducción urbana." }, { icon: "ri-smartphone-line", title: "Conectividad total", description: "Control remoto desde tu smartphone: preclimatización, estado de carga, localización y actualizaciones OTA." }], howItWorks: [{ step: 1, title: "Almacenamiento de energía", description: "La batería almacena electricidad que alimenta el motor eléctrico." }, { step: 2, title: "Conversión de energía", description: "El inversor convierte la corriente continua en alterna para el motor." }, { step: 3, title: "Propulsión instantánea", description: "El motor eléctrico genera par máximo desde el primer momento." }, { step: 4, title: "Recuperación de energía", description: "Al frenar, el motor actúa como generador y recarga la batería." }] } },
    { pageSlug: "promociones-electricos", sectionKey: "benefits", title: "¿Por qué elegir un eléctrico?", subtitle: "Los vehículos eléctricos ofrecen ventajas económicas, medioambientales y de conducción que los convierten en la mejor opción.", sortOrder: 3, active: true, content: { items: [{ icon: "ri-leaf-line", title: "Cero emisiones", description: "Sin emisiones de CO₂ ni contaminantes. Contribuye activamente a la mejora de la calidad del aire.", color: "bg-green-500" }, { icon: "ri-money-euro-circle-line", title: "Ahorro económico", description: "Hasta un 70% de ahorro en combustible y mantenimiento reducido sin cambios de aceite ni filtros.", color: "bg-blue-500" }, { icon: "ri-shield-check-line", title: "Etiqueta CERO", description: "Acceso libre a zonas de bajas emisiones, descuentos en peajes y aparcamiento gratuito.", color: "bg-purple-500" }, { icon: "ri-government-line", title: "Ayudas y subvenciones", description: "Plan MOVES III con hasta 7.000€ de ayuda directa. Grupo Avisa gestiona todo el proceso.", color: "bg-[#ad023b]" }, { icon: "ri-volume-mute-line", title: "Conducción silenciosa", description: "Experiencia de conducción premium sin ruido de motor, solo el sonido del viento.", color: "bg-indigo-500" }, { icon: "ri-speed-line", title: "Rendimiento superior", description: "Par instantáneo desde 0 rpm. Aceleración inmediata y respuesta excepcional.", color: "bg-orange-500" }], comparison: [{ concept: "Coste por 100 km", electric: "2-3€", combustion: "10-15€" }, { concept: "Mantenimiento anual", electric: "200-400€", combustion: "600-1.200€" }, { concept: "Emisiones CO₂", electric: "0 g/km", combustion: "120-180 g/km" }, { concept: "Impuesto circulación", electric: "75% descuento", combustion: "100%" }, { concept: "Acceso ZBE", electric: "Sin restricciones", combustion: "Limitado" }] } },
    { pageSlug: "promociones-electricos", sectionKey: "brands", title: "Marcas disponibles", subtitle: "Volkswagen, Audi, CUPRA, Škoda - Las mejores marcas eléctricas del Grupo Volkswagen.", sortOrder: 4, active: true, content: { brands: ["Volkswagen", "Audi", "CUPRA", "Škoda"], description: "Explora nuestra gama completa de vehículos eléctricos. Selecciona una marca para ver todos los modelos disponibles con sus especificaciones técnicas." } },
    { pageSlug: "promociones-electricos", sectionKey: "contact", title: "Solicita tu oferta personalizada", subtitle: "Nuestros asesores te contactarán con la mejor oferta adaptada a tus necesidades.", sortOrder: 5, active: true, content: { phone: "955 034 600", email: "info@grupoavisa.com" } },

    { pageSlug: "promociones-hibridos", sectionKey: "hero", title: "Vehículos Híbridos Enchufables", subtitle: "Lo mejor de ambos mundos: motor eléctrico y de combustión. Autonomía eléctrica para el día a día y motor térmico para viajes largos.", sortOrder: 1, active: true, content: { badge: "Híbridos Enchufables", stats: [{ label: "Autonomía eléctrica", value: "80+ km" }, { label: "Ahorro combustible", value: "50%" }, { label: "Etiqueta", value: "CERO/ECO" }] } },
    { pageSlug: "promociones-hibridos", sectionKey: "advantages", title: "Ventajas del híbrido enchufable", subtitle: "La transición perfecta hacia la movilidad eléctrica completa.", sortOrder: 2, active: true, content: { items: [{ icon: "ri-route-line", title: "Sin ansiedad de autonomía", description: "Motor de combustión como respaldo para viajes largos." }, { icon: "ri-charging-pile-line", title: "Carga en casa", description: "Recarga nocturna en enchufe doméstico para el uso diario." }, { icon: "ri-money-euro-circle-line", title: "Ahorro real", description: "Hasta 50% de ahorro en combustible en uso mixto." }] } },
    { pageSlug: "promociones-hibridos", sectionKey: "brands", title: "Modelos híbridos disponibles", subtitle: "Amplia gama de vehículos híbridos enchufables de las mejores marcas.", sortOrder: 3, active: true, content: { brands: ["Volkswagen", "Audi", "SEAT", "CUPRA", "Škoda"], description: "Descubre nuestra selección de vehículos híbridos enchufables. Elige una marca para explorar todos los modelos con sus especificaciones técnicas completas." } },
    { pageSlug: "promociones-hibridos", sectionKey: "contact", title: "Configura tu híbrido ideal", subtitle: "Te asesoramos sobre el modelo híbrido que mejor se adapta a tu uso diario.", sortOrder: 4, active: true, content: { phone: "955 034 600", email: "info@grupoavisa.com", whatsapp: "34621261541", buttonText: "Solicitar asesoramiento", features: ["Gestión Plan MOVES incluida", "Financiación flexible a tu medida", "Test drive gratuito sin compromiso"] } },

    { pageSlug: "postventa", sectionKey: "hero", title: "Servicio Postventa Especializado", subtitle: "Talleres oficiales con técnicos certificados en vehículos eléctricos e híbridos. Tu tranquilidad es nuestra prioridad.", sortOrder: 1, active: true, imageUrl: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1440&h=600&fit=crop&auto=format&q=80", content: { buttonPrimary: "Reservar cita", buttonSecondary: "955 034 600" } },
    { pageSlug: "postventa", sectionKey: "services", title: "Nuestros servicios", subtitle: "Ofrecemos un servicio integral para tu vehículo eléctrico o híbrido con los más altos estándares de calidad.", sortOrder: 2, active: true, content: { items: [{ icon: "ri-tools-line", title: "Mantenimiento especializado", description: "Técnicos certificados en alta tensión y sistemas eléctricos.", features: ["Revisiones oficiales con garantía del fabricante", "Diagnóstico de baterías y sistemas de carga", "Actualización de software y sistemas"] }, { icon: "ri-shield-check-line", title: "Garantías extendidas", description: "Protección completa para tu inversión.", features: ["Garantía de batería hasta 8 años o 160.000 km", "Cobertura de componentes eléctricos", "Asistencia en carretera 24/7"] }, { icon: "ri-battery-charging-line", title: "Asesoramiento en carga", description: "Te ayudamos a instalar tu punto de carga en casa o empresa.", features: ["Instalación de wallbox en domicilio", "Gestión de ayudas para puntos de recarga", "Asesoramiento en tarifas eléctricas"] }, { icon: "ri-car-line", title: "Vehículo de sustitución", description: "Mantén tu movilidad mientras tu vehículo está en el taller.", features: ["Vehículos de sustitución eléctricos", "Recogida y entrega a domicilio", "Cita previa online 24/7"] }, { icon: "ri-file-list-3-line", title: "Presupuestos sin compromiso", description: "Transparencia total en nuestros servicios.", features: ["Presupuesto previo obligatorio", "Sin sorpresas en la factura", "Piezas originales garantizadas"] }, { icon: "ri-time-line", title: "Servicio express", description: "Intervenciones rápidas para que no pierdas tiempo.", features: ["Cambio de aceite en 30 minutos", "Revisión pre-ITV express", "Cambio de neumáticos sin cita"] }] } },
    { pageSlug: "postventa", sectionKey: "plans", title: "Planes de mantenimiento", subtitle: "Elige el plan que mejor se adapte a tus necesidades. Todos incluyen mano de obra y piezas originales.", sortOrder: 3, active: true, content: { items: [{ name: "Revisión Básica", price: "89", description: "Mantenimiento esencial para tu vehículo", features: ["Cambio de aceite y filtro", "Revisión de niveles", "Inspección visual de frenos", "Comprobación de luces", "Diagnóstico electrónico básico"], highlighted: false }, { name: "Revisión Completa", price: "189", description: "Mantenimiento integral recomendado", features: ["Todo lo de Revisión Básica", "Cambio de filtro de aire", "Cambio de filtro de habitáculo", "Revisión de suspensión", "Diagnóstico de batería de alto voltaje", "Actualización de software"], highlighted: true }, { name: "Revisión Premium", price: "289", description: "Servicio completo con extras", features: ["Todo lo de Revisión Completa", "Cambio de líquido de frenos", "Alineación y equilibrado", "Limpieza de inyectores", "Tratamiento antibacteriano A/C", "Lavado exterior e interior", "Vehículo de sustitución"], highlighted: false }] } },
    { pageSlug: "postventa", sectionKey: "team", title: "Técnicos especializados en movilidad eléctrica", subtitle: "Nuestro equipo cuenta con más de 50 técnicos certificados en vehículos eléctricos e híbridos.", sortOrder: 4, active: true, content: { certifications: [{ icon: "ri-flashlight-line", title: "Certificación Alta Tensión", description: "Todos nuestros técnicos están certificados para trabajar con sistemas de alto voltaje." }, { icon: "ri-award-line", title: "Formación Continua", description: "Actualización constante en las últimas tecnologías de Volkswagen, Audi y Škoda." }, { icon: "ri-cpu-line", title: "Equipamiento Oficial", description: "Herramientas de diagnóstico oficiales y software actualizado de cada marca." }, { icon: "ri-verified-badge-line", title: "Garantía Oficial", description: "Todas las intervenciones mantienen la garantía oficial del fabricante." }] } },
    { pageSlug: "postventa", sectionKey: "appointment", title: "Reserva tu cita online", subtitle: "Solicita tu cita de forma rápida y sencilla. Nos pondremos en contacto contigo para confirmar la disponibilidad.", sortOrder: 5, active: true, content: { schedule: { weekdays: "08:00 - 20:00", saturday: "09:00 - 14:00", sunday: "Cerrado" }, phone: "955 034 600", email: "info@grupoavisa.com" } },

    { pageSlug: "autoplus", sectionKey: "hero", title: "Plan MOVES III", subtitle: "Hasta 7.000€ de ayuda directa para la compra de tu vehículo eléctrico o híbrido enchufable. Grupo Avisa gestiona todo el proceso por ti.", sortOrder: 1, active: true, content: { badge: "Ayudas Gobierno", maxAid: "7.000€" } },
    { pageSlug: "autoplus", sectionKey: "requirements", title: "Requisitos del Plan MOVES III", subtitle: "Condiciones para acceder a las ayudas del Gobierno para vehículos eléctricos.", sortOrder: 2, active: true, content: { items: ["Vehículos nuevos 100% eléctricos o híbridos enchufables", "Autonomía eléctrica mínima de 30 km", "Precio máximo del vehículo: 45.000€ (turismos) / 53.000€ (furgonetas)", "Dar de baja un vehículo de más de 7 años para máxima ayuda", "Persona física o autónomo residente en España"] } },
    { pageSlug: "autoplus", sectionKey: "process", title: "Nosotros nos encargamos de todo", subtitle: "Gestión integral de las ayudas MOVES III sin ningún coste adicional.", sortOrder: 3, active: true, content: { steps: [{ title: "Elige tu vehículo", description: "Selecciona el modelo eléctrico o híbrido que mejor se adapte a tus necesidades." }, { title: "Tramitamos las ayudas", description: "Nos encargamos de toda la gestión administrativa del Plan MOVES III." }, { title: "Recibe tu vehículo", description: "Disfruta de tu nuevo vehículo con las ayudas ya aplicadas al precio." }] } },

    { pageSlug: "preguntas", sectionKey: "hero", title: "Preguntas Frecuentes", subtitle: "Resolvemos todas tus dudas sobre vehículos eléctricos e híbridos. Si no encuentras tu respuesta, contacta con nosotros.", sortOrder: 1, active: true, content: { badge: "Centro de ayuda", buttonText: "Contactar con un asesor", phone: "955 034 600", totalFaqs: "20+", totalCategories: "6" } },
    { pageSlug: "preguntas", sectionKey: "categories", title: "Categorías", subtitle: "Selecciona una categoría para ver las preguntas más frecuentes.", sortOrder: 2, active: true, content: { items: [{ name: "Autonomía y carga", icon: "ri-battery-charging-line", description: "Todo sobre autonomía real, puntos de carga y tiempos." }, { name: "Costes y ahorro", icon: "ri-money-euro-circle-line", description: "Comparativa de costes, mantenimiento y ahorro real." }, { name: "Ayudas y subvenciones", icon: "ri-government-line", description: "Plan MOVES III, ventajas fiscales y ayudas autonómicas." }, { name: "Mantenimiento", icon: "ri-tools-line", description: "Cuidados, revisiones y garantías de vehículos eléctricos." }] } },

    { pageSlug: "concesionarios", sectionKey: "hero", title: "Nuestros Concesionarios", subtitle: "Red de concesionarios Grupo Avisa en Sevilla y provincia. Visítanos y conoce nuestros vehículos eléctricos e híbridos.", sortOrder: 1, active: true, content: { badge: "Red oficial", totalDealers: "9", brands: ["Volkswagen", "Audi", "Škoda", "Volkswagen Comerciales"], buttonText: "Ver mapa" } },
    { pageSlug: "concesionarios", sectionKey: "locations", title: "Ubicaciones", subtitle: "Encuentra el concesionario más cercano.", sortOrder: 2, active: true, content: { items: [{ name: "AVISA Sevilla Este", address: "Av. de las Ciencias, s/n, 41020 Sevilla", phone: "955 034 600", hours: "L-V 09:00-20:00 / S 10:00-14:00" }, { name: "AVISA Dos Hermanas", address: "Pol. Ind. La Isla, Calle Industria, 41700", phone: "955 034 601", hours: "L-V 09:00-20:00 / S 10:00-14:00" }] } },

    { pageSlug: "electrificacion", sectionKey: "hero", title: "La revolución eléctrica ya está aquí", subtitle: "Todo lo que necesitas saber sobre la transición a la movilidad eléctrica. Ventajas, tecnología, infraestructura de carga y futuro del transporte sostenible.", sortOrder: 1, active: true, content: { badge: "Guía de electrificación", buttonPrimary: "Explorar la guía", buttonSecondary: "Contactar asesor", stats: [{ label: "Puntos de carga en España", value: "30.000+" }, { label: "Ahorro anual medio", value: "1.500€" }, { label: "Fin venta ICE en UE", value: "2035" }] } },
    { pageSlug: "electrificacion", sectionKey: "timeline", title: "El camino hacia la electrificación", subtitle: "La evolución de la movilidad eléctrica desde sus inicios hasta el futuro.", sortOrder: 2, active: true, content: { milestones: [{ year: "2020", title: "Despegue del mercado EV", description: "Las principales marcas lanzan sus primeros modelos 100% eléctricos de producción masiva." }, { year: "2025", title: "Paridad de costes", description: "Los vehículos eléctricos alcanzan precios similares a los de combustión." }, { year: "2030", title: "Prohibición de nuevos ICE", description: "Varios países europeos dejan de permitir la venta de coches nuevos de combustión." }, { year: "2035", title: "Solo eléctricos nuevos", description: "La UE solo permite la venta de turismos de cero emisiones." }] } },
    { pageSlug: "electrificacion", sectionKey: "infrastructure", title: "Infraestructura de carga", subtitle: "España cuenta con una red creciente de puntos de carga públicos y privados.", sortOrder: 3, active: true, content: { stats: [{ label: "Puntos de carga públicos en España", value: "30.000+" }, { label: "Cargadores rápidos (>50kW)", value: "5.000+" }, { label: "Nuevos puntos mensuales", value: "500+" }] } },

    { pageSlug: "conductores-adopcion", sectionKey: "hero", title: "¿Por qué pasarte al eléctrico?", subtitle: "Los principales motivos para dar el salto a la movilidad eléctrica. Ahorro, sostenibilidad, tecnología y experiencia de conducción superior.", sortOrder: 1, active: true, content: { badge: "Guía del conductor", buttonPrimary: "Descubrir ventajas", buttonSecondary: "Solicitar test drive", stats: [{ label: "Ahorro en combustible", value: "70%" }, { label: "Coste mantenimiento", value: "-50%" }, { label: "Satisfacción propietarios", value: "95%" }] } },
    { pageSlug: "conductores-adopcion", sectionKey: "reasons", title: "Razones para el cambio", subtitle: "Descubre por qué cada vez más conductores eligen vehículos eléctricos.", sortOrder: 2, active: true, content: { items: [{ icon: "ri-money-euro-circle-line", title: "Ahorro real desde el primer día", description: "Carga completa por menos de 10€. Sin cambios de aceite, filtros ni embrague. Mantenimiento un 50% más económico.", stats: "Ahorro medio: 1.500€/año" }, { icon: "ri-leaf-line", title: "Huella de carbono cero", description: "Sin emisiones directas de CO₂. Si cargas con energía renovable, tu huella es prácticamente nula.", stats: "0 g CO₂/km" }, { icon: "ri-speed-line", title: "Experiencia de conducción única", description: "Par instantáneo, aceleración inmediata, conducción silenciosa y suave. Una vez pruebas un eléctrico, no quieres volver.", stats: "0-100 km/h desde 3.4s" }] } },

    { pageSlug: "terminos", sectionKey: "content", title: "Términos y Condiciones", subtitle: "Aviso legal, política de privacidad y condiciones de uso del sitio web de Grupo Avisa.", sortOrder: 1, active: true, content: { sections: [{ title: "Aviso Legal", text: "Este sitio web es propiedad de Grupo Avisa S.L. con domicilio social en Sevilla. CIF: B-41XXXXXX." }, { title: "Política de Privacidad", text: "Los datos personales recogidos a través de los formularios de contacto serán tratados por Grupo Avisa S.L. con la finalidad de gestionar su solicitud. Base legal: consentimiento del interesado." }, { title: "Política de Cookies", text: "Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia del usuario y analizar el tráfico web." }] } },
  ];

  if (existingSections.length === 0) {
    for (const section of sectionsList) {
      await storage.createSection(section);
    }
    console.log(`Seeded ${sectionsList.length} sections`);
  } else {
    let updated = 0;
    for (const section of sectionsList) {
      const existing = existingSections.find(
        s => s.pageSlug === section.pageSlug && s.sectionKey === section.sectionKey
      );
      if (existing) {
        const existingContent = existing.content as any;
        const isEmpty = !existingContent || (typeof existingContent === 'object' && Object.keys(existingContent).length === 0);
        const newContent = section.content;
        const hasNewContent = newContent && typeof newContent === 'object' && Object.keys(newContent).length > 0;
        if (isEmpty && hasNewContent) {
          await storage.updateSection(existing.id, { content: newContent, title: section.title, subtitle: section.subtitle, imageUrl: section.imageUrl || existing.imageUrl });
          updated++;
        }
      } else {
        await storage.createSection(section);
        updated++;
      }
    }
    if (updated > 0) console.log(`Updated/created ${updated} sections`);
  }
}

export async function seedDealers() {
  const existingDealers = await storage.getDealers();
  if (existingDealers.length > 0) return;

  const dealersList: InsertDealer[] = [
    {
      name: "Avisa Volkswagen Sevilla",
      brand: "Volkswagen",
      address: "C/ Alhami, 2-4, 41020 Sevilla",
      city: "Sevilla",
      province: "Sevilla",
      phone: "955 03 46 00",
      email: "info@grupoavisa.com",
      lat: 37.3886,
      lng: -5.9823,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C/+Alhami+2-4+41020+Sevilla",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/volkswagen.png"],
      active: true,
      sortOrder: 1,
    },
    {
      name: "Avisa Audi Sevilla",
      brand: "Audi",
      address: "Av. Averroes, 12, 41020 Sevilla",
      city: "Sevilla",
      province: "Sevilla",
      phone: "955 03 46 04",
      email: "audi@grupoavisa.com",
      lat: 37.3901,
      lng: -5.9756,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Av+Averroes+12+41020+Sevilla",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/audi.png"],
      active: true,
      sortOrder: 2,
    },
    {
      name: "Cartuja Motor Sevilla",
      brand: "Škoda",
      address: "Pol. Ind. Su Eminencia, C/ D, 1-2, 41006 Sevilla",
      city: "Sevilla",
      province: "Sevilla",
      phone: "954 32 21 21",
      email: "skoda.sevilla@grupoavisa.com",
      lat: 37.3558,
      lng: -5.9615,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pol+Ind+Su+Eminencia+C/D+1-2+41006+Sevilla",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 3,
    },
    {
      name: "Cartuja Motor Dos Hermanas",
      brand: "Škoda",
      address: "Pol. Ind. La Isla, C/ Astronomía, 1, 41703 Dos Hermanas, Sevilla",
      city: "Dos Hermanas",
      province: "Sevilla",
      phone: "955 03 46 00",
      email: "skoda.doshermanas@grupoavisa.com",
      lat: 37.2833,
      lng: -5.9209,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pol+Ind+La+Isla+C/Astronomia+1+41703+Dos+Hermanas",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 4,
    },
    {
      name: "Cartuja Motor Huelva",
      brand: "Škoda",
      address: "Pol. Ind. La Paz, Av. de las Veredas, 18, 21007 Huelva",
      city: "Huelva",
      province: "Huelva",
      phone: "959 81 10 45",
      email: "skoda.huelva@grupoavisa.com",
      lat: 37.2614,
      lng: -6.9447,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pol+Ind+La+Paz+Av+Veredas+18+21007+Huelva",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 5,
    },
    {
      name: "Avisa Škoda Badajoz",
      brand: "Škoda",
      address: "Ctra. Madrid-Lisboa, Km. 409, 06008 Badajoz",
      city: "Badajoz",
      province: "Badajoz",
      phone: "924 29 11 00",
      email: "skoda.badajoz@grupoavisa.com",
      lat: 38.8794,
      lng: -6.9707,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Ctra+Madrid-Lisboa+Km+409+06008+Badajoz",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 6,
    },
    {
      name: "Avisa Škoda Cáceres",
      brand: "Škoda",
      address: "Pol. Ind. Las Capellanías, C/ Hojalateros, 121 Oeste, 10005 Cáceres",
      city: "Cáceres",
      province: "Cáceres",
      phone: "927 23 48 88",
      email: "skoda.caceres@grupoavisa.com",
      lat: 39.4753,
      lng: -6.3724,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Pol+Ind+Las+Capellanias+C/Hojalateros+121+10005+Caceres",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 7,
    },
    {
      name: "Avisa Škoda Fuente de Cantos",
      brand: "Škoda",
      address: "C/ Real, 48, 06240 Fuente de Cantos, Badajoz",
      city: "Fuente de Cantos",
      province: "Badajoz",
      phone: "924 50 00 69",
      email: "skoda.fuentedecantos@grupoavisa.com",
      lat: 38.2453,
      lng: -6.3062,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C/Real+48+06240+Fuente+de+Cantos+Badajoz",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 8,
    },
    {
      name: "Avisa Škoda Córdoba",
      brand: "Škoda",
      address: "C/ Esteban de Cabrera, 90, 14014 Córdoba",
      city: "Córdoba",
      province: "Córdoba",
      phone: "957 42 17 00",
      email: "skoda.cordoba@grupoavisa.com",
      lat: 37.8882,
      lng: -4.7794,
      googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=C/Esteban+de+Cabrera+90+14014+Cordoba",
      brandLogos: ["https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png"],
      active: true,
      sortOrder: 9,
    },
  ];

  for (const dealer of dealersList) {
    await storage.createDealer(dealer);
  }

  console.log(`Seeded ${dealersList.length} dealers`);
}

export async function seedTestimonials() {
  const existing = await storage.getTestimonials();
  if (existing.length > 0) return;

  const testimonialsList: InsertTestimonial[] = [
    {
      name: "María García López",
      role: "Clienta particular",
      company: "Sevilla",
      rating: 5,
      content: "El proceso fue muy sencillo. El equipo de Grupo Avisa se encargó de toda la gestión y en menos de 3 meses ya tenía mi nuevo coche eléctrico con la ayuda aplicada. ¡Ahorro más de 150€ al mes en combustible!",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 1,
    },
    {
      name: "Antonio Fernández Ruiz",
      role: "Cliente particular",
      company: "Málaga",
      rating: 5,
      content: "Tenía dudas sobre pasarme al eléctrico, pero con la ayuda del Plan MOVES y el asesoramiento de Grupo Avisa, fue la mejor decisión. La gestión de la subvención fue totalmente gratuita y muy rápida.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 2,
    },
    {
      name: "Carmen Moreno Díaz",
      role: "Autónoma",
      company: "Córdoba",
      rating: 5,
      content: "Como autónoma, el Plan MOVES me permitió renovar mi vehículo de empresa con una ayuda significativa. El equipo me explicó todos los requisitos y se ocuparon de todo el papeleo.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 3,
    },
    {
      name: "Francisco Jiménez Torres",
      role: "Cliente particular",
      company: "Huelva",
      rating: 5,
      content: "Achatarré mi antiguo diésel y conseguí la ayuda máxima de 7.000€. Además, con las ayudas regionales de Andalucía sumé otros 2.000€. El ahorro total fue increíble.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 4,
    },
    {
      name: "Laura Sánchez Martín",
      role: "Clienta particular",
      company: "Sevilla",
      rating: 5,
      content: "Necesitaba un vehículo familiar grande y el ID.Buzz era perfecto. Gracias al Plan MOVES y la financiación especial, pude acceder a él. El equipo de Grupo Avisa fue excepcional.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 5,
    },
    {
      name: "Pedro Romero Vega",
      role: "Cliente particular",
      company: "Cádiz",
      rating: 5,
      content: "Opté por un híbrido enchufable y recibí 5.000€ de ayuda. Perfecto para mis desplazamientos diarios en eléctrico y viajes largos sin preocupaciones. Muy contento con la gestión.",
      imageUrl: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=200&h=200&fit=crop&auto=format&q=80",
      published: true,
      sortOrder: 6,
    },
  ];

  for (const testimonial of testimonialsList) {
    await storage.createTestimonial(testimonial);
  }
  console.log(`Seeded ${testimonialsList.length} testimonials`);
}
