import { BRAND_ENTITY_IDS, SERVICE_ENTITY_MAP, DEALER_LOCATIONS } from "@/lib/entity-data";

const BASE_URL = "https://electricos.grupoavisa.com";
const LOGO = `${BASE_URL}/favicon.png`;

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": `${BASE_URL}/#organization`,
    name: "Grupo Avisa",
    alternateName: ["Avisa", "Grupo Avisa Concesionarios", "Avisa Volkswagen", "Avisa Audi", "Cartuja Motor"],
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${BASE_URL}/#logo`,
      url: LOGO,
      contentUrl: LOGO,
      caption: "Grupo Avisa - Concesionario oficial vehículos eléctricos e híbridos",
      width: 512,
      height: 512,
    },
    image: LOGO,
    telephone: "+34955034600",
    email: "info@grupoavisa.com",
    foundingDate: "2008",
    description: "Grupo Avisa es concesionario oficial Volkswagen, Audi y Škoda en Andalucía y Extremadura, especializado en vehículos eléctricos e híbridos enchufables. Ofrece venta, postventa, reparación, diagnóstico, mantenimiento, instalación de puntos de carga y gestión de garantías con técnicos certificados en alta tensión.",
    slogan: "Tu concesionario de vehículos eléctricos e híbridos en Andalucía y Extremadura",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Alhami, 2-4",
      addressLocality: "Sevilla",
      addressRegion: "Andalucía",
      postalCode: "41020",
      addressCountry: "ES",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 37.3748,
      longitude: -5.9637,
    },
    areaServed: [
      {
        "@type": "State",
        name: "Andalucía",
        sameAs: "https://www.wikidata.org/wiki/Q5783",
      },
      {
        "@type": "State",
        name: "Extremadura",
        sameAs: "https://www.wikidata.org/wiki/Q5765",
      },
      {
        "@type": "City",
        name: "Sevilla",
        sameAs: "https://www.wikidata.org/wiki/Q8717",
      },
      {
        "@type": "City",
        name: "Huelva",
        sameAs: "https://www.wikidata.org/wiki/Q15691",
      },
      {
        "@type": "City",
        name: "Dos Hermanas",
        sameAs: "https://www.wikidata.org/wiki/Q15106",
      },
      {
        "@type": "City",
        name: "Córdoba",
        sameAs: "https://www.wikidata.org/wiki/Q5818",
      },
      {
        "@type": "City",
        name: "Badajoz",
        sameAs: "https://www.wikidata.org/wiki/Q81137",
      },
      {
        "@type": "City",
        name: "Cáceres",
        sameAs: "https://www.wikidata.org/wiki/Q180997",
      },
      {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 37.3748,
          longitude: -5.9637,
        },
        geoRadius: "30000",
      },
    ],
    sameAs: ["https://wa.me/34621261541"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+34955034600",
        contactType: "sales",
        areaServed: "ES",
        availableLanguage: ["Spanish", "English"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "20:00",
        },
      },
      {
        "@type": "ContactPoint",
        telephone: "+34955034600",
        contactType: "customer service",
        areaServed: "ES",
        availableLanguage: ["Spanish", "English"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+34955034600",
        contactType: "technical support",
        areaServed: "ES",
        availableLanguage: "Spanish",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    priceRange: "€€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Efectivo, Tarjeta, Transferencia, Financiación",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "342",
      bestRating: "5",
      worstRating: "1",
    },
    brand: Object.entries(BRAND_ENTITY_IDS).map(([slug, b]) => ({
      "@type": "Brand",
      "@id": `${BASE_URL}/#brand-${slug}`,
      name: b.name,
      sameAs: b.sameAs,
    })),
    knowsAbout: [
      { "@type": "Thing", name: "Vehículo eléctrico", sameAs: "https://www.wikidata.org/wiki/Q193692" },
      { "@type": "Thing", name: "Vehículo híbrido enchufable", sameAs: "https://www.wikidata.org/wiki/Q2095831" },
      { "@type": "Thing", name: "Batería de iones de litio", sameAs: "https://www.wikidata.org/wiki/Q899079" },
      { "@type": "Thing", name: "Motor eléctrico", sameAs: "https://www.wikidata.org/wiki/Q15086" },
      { "@type": "Thing", name: "Estación de carga de vehículos eléctricos", sameAs: "https://www.wikidata.org/wiki/Q2140665" },
      { "@type": "Thing", name: "Diagnóstico electrónico automotriz" },
      { "@type": "Thing", name: "Frenado regenerativo", sameAs: "https://www.wikidata.org/wiki/Q608458" },
      { "@type": "Thing", name: "Sistema de gestión de batería (BMS)" },
      { "@type": "Thing", name: "Inversor de potencia para tracción eléctrica" },
      { "@type": "Thing", name: "Alta tensión automotriz" },
      { "@type": "Thing", name: "Plan MOVES III" },
      { "@type": "Thing", name: "Mantenimiento preventivo de vehículos eléctricos" },
      { "@type": "Thing", name: "Sistemas ADAS de asistencia a la conducción" },
      { "@type": "Thing", name: "Carga rápida DC CCS Combo" },
      { "@type": "Thing", name: "Wallbox de carga doméstica" },
    ],
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Certificación de alto voltaje automotriz" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Volkswagen" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Audi" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Concesionario oficial Škoda" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "Técnicos certificados por Volkswagen Academy" },
    ],
    makesOffer: SERVICE_ENTITY_MAP.map((svc) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${BASE_URL}/#service-${svc.slug}`,
        name: svc.name,
        description: svc.description,
        url: `${BASE_URL}/servicios/${svc.slug}`,
        category: svc.category,
        provider: { "@id": `${BASE_URL}/#organization` },
        areaServed: [
          { "@type": "State", name: "Andalucía" },
          { "@type": "State", name: "Extremadura" },
        ],
        serviceType: svc.slug === "carga" ? "Instalación eléctrica" : "Servicio postventa automotriz",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de Vehículos y Servicios de Grupo Avisa",
      itemListElement: [
        { "@type": "OfferCatalog", name: "Vehículos 100% Eléctricos", description: "Gama completa de coches eléctricos con etiqueta CERO" },
        { "@type": "OfferCatalog", name: "Vehículos Híbridos Enchufables", description: "Modelos PHEV con autonomía eléctrica y motor de combustión" },
        { "@type": "OfferCatalog", name: "Servicios Postventa para Vehículos Eléctricos", description: "Reparación, diagnóstico, mantenimiento, carga y garantía" },
      ],
    },
    department: DEALER_LOCATIONS.map((loc) => ({
      "@type": "AutoDealer",
      "@id": `${BASE_URL}/#location-${loc.id}`,
      name: loc.name,
      brand: loc.brands.map((b) => ({ "@type": "Brand", name: b })),
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.street,
        addressLocality: loc.locality,
        addressRegion: loc.region,
        postalCode: loc.postal,
        addressCountry: "ES",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.lat,
        longitude: loc.lng,
      },
      telephone: "+34955034600",
      parentOrganization: { "@id": `${BASE_URL}/#organization` },
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "14:00" },
      ],
    })),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 50,
      maxValue: 100,
    },
    isicV4: "4511",
    naics: "441110",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Grupo Avisa",
    alternateName: "Grupo Avisa Vehículos Eléctricos",
    url: BASE_URL,
    inLanguage: "es",
    publisher: { "@id": `${BASE_URL}/#organization` },
    description: "Web oficial de Grupo Avisa: concesionario oficial de vehículos eléctricos e híbridos enchufables Volkswagen, Audi y Škoda en Andalucía y Extremadura. Servicios postventa especializados.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/preguntas?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": `${BASE_URL}/#navigation`,
    name: "Navegación principal",
    hasPart: [
      { "@type": "SiteNavigationElement", name: "Inicio", url: BASE_URL },
      { "@type": "SiteNavigationElement", name: "Eléctricos", url: `${BASE_URL}/promociones-electricos` },
      { "@type": "SiteNavigationElement", name: "Híbridos", url: `${BASE_URL}/promociones-hibridos` },
      { "@type": "SiteNavigationElement", name: "Plan MOVES", url: `${BASE_URL}/autoplus` },
      { "@type": "SiteNavigationElement", name: "Marcas", url: `${BASE_URL}/postventa`, description: "14 marcas: Volkswagen, Audi, Škoda, CUPRA, SEAT, Tesla, BYD, Hyundai, BMW, Mercedes-Benz, Kia, Volvo, Peugeot, Renault" },
      { "@type": "SiteNavigationElement", name: "Servicios", url: `${BASE_URL}/postventa`, description: "Reparación, diagnóstico, mantenimiento, instalación de carga, gestión de garantía" },
      { "@type": "SiteNavigationElement", name: "Preguntas frecuentes", url: `${BASE_URL}/preguntas` },
      { "@type": "SiteNavigationElement", name: "Concesionarios", url: `${BASE_URL}/concesionarios` },
    ],
  };

  const schemas = [organizationSchema, websiteSchema, navigationSchema];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
