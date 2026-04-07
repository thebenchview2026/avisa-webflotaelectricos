import type { Metadata } from "next";
import PostventaPage from "@/pages/postventa";

const BASE_URL = "https://electricos.grupoavisa.com";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Taller Eléctricos e Híbridos en Sevilla",
  description: "Servicio postventa con +50 técnicos certificados. Reparación, mantenimiento y diagnóstico para eléctricos e híbridos en Sevilla. Pide cita.",
  alternates: { canonical: "/postventa" },
  openGraph: {
    title: "Taller Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    description: "Servicio postventa oficial con +50 técnicos certificados. Reparación, mantenimiento y diagnóstico de coches eléctricos e híbridos en Sevilla.",
    type: "website",
    url: "/postventa",
  },
  keywords: ["taller coche eléctrico Sevilla", "mantenimiento eléctrico Sevilla", "reparación híbrido enchufable", "recambios originales Volkswagen", "diagnóstico vehículo eléctrico Sevilla"],
};

async function getPostventaData() {
  try {
    const [servicesRes, plansRes] = await Promise.all([
      fetch("http://localhost:5000/api/services", { cache: "no-store" }),
      fetch("http://localhost:5000/api/maintenance-plans", { cache: "no-store" }),
    ]);
    return {
      services: servicesRes.ok ? await servicesRes.json() : [],
      plans: plansRes.ok ? await plansRes.json() : [],
    };
  } catch {
    return { services: [], plans: [] };
  }
}

function PostventaJsonLd() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": ["WebPage", "CollectionPage"],
    "@id": `${BASE_URL}/postventa/#webpage`,
    url: `${BASE_URL}/postventa`,
    name: "Taller Oficial Vehículos Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    description: "Servicio postventa con +50 técnicos certificados en alta tensión. Reparación, mantenimiento, diagnóstico y recambios originales para eléctricos e híbridos en Sevilla.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "es",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Postventa", item: `${BASE_URL}/postventa` },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: "Servicios Postventa para Vehículos Eléctricos e Híbridos",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Reparación", url: `${BASE_URL}/servicios/reparacion` },
        { "@type": "ListItem", position: 2, name: "Diagnóstico", url: `${BASE_URL}/servicios/diagnostico` },
        { "@type": "ListItem", position: 3, name: "Mantenimiento", url: `${BASE_URL}/servicios/mantenimiento` },
        { "@type": "ListItem", position: 4, name: "Instalación de carga", url: `${BASE_URL}/servicios/carga` },
        { "@type": "ListItem", position: 5, name: "Garantía", url: `${BASE_URL}/servicios/garantia` },
      ],
    },
    significantLink: [
      `${BASE_URL}/servicios/reparacion`,
      `${BASE_URL}/servicios/diagnostico`,
      `${BASE_URL}/servicios/mantenimiento`,
      `${BASE_URL}/servicios/carga`,
      `${BASE_URL}/servicios/garantia`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
  );
}

export default async function Page() {
  const { services, plans } = await getPostventaData();
  return (
    <>
      <PostventaJsonLd />
      <PostventaPage initialServices={services} initialPlans={plans} />
    </>
  );
}
