import type { Metadata } from "next";
import HomePage from "@/pages/home";

const HERO_IMAGE = "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1440&h=580&fit=crop&auto=format&q=80";

const BASE_URL = "https://electricos.grupoavisa.com";

export const metadata: Metadata = {
  title: {
    absolute: "Coches Eléctricos e Híbridos en Sevilla | Grupo Avisa",
  },
  description: "Concesionario oficial Volkswagen, Audi y Škoda en Sevilla. Coches eléctricos e híbridos con hasta 7.000 € del Plan MOVES. Pide cita hoy.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Coches Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    description: "Tu concesionario oficial de coches eléctricos e híbridos en Andalucía y Extremadura. Volkswagen, Audi, Škoda y 11 marcas más. Ofertas exclusivas y Plan MOVES.",
    type: "website",
    url: "/",
  },
  keywords: [
    "concesionario coches eléctricos Sevilla",
    "vehículos eléctricos Andalucía",
    "híbridos enchufables Sevilla",
    "Volkswagen eléctrico Sevilla",
    "Audi eléctrico Sevilla",
    "Škoda eléctrico Sevilla",
    "Plan MOVES Andalucía",
    "coches eléctricos Extremadura",
    "concesionario oficial eléctricos",
    "Grupo Avisa",
  ],
};

function HomePageJsonLd() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}/#webpage`,
    url: BASE_URL,
    name: "Coches Eléctricos e Híbridos en Sevilla | Grupo Avisa",
    description: "Concesionario oficial Volkswagen, Audi y Škoda en Sevilla. Vehículos eléctricos e híbridos enchufables con hasta 7.000 € del Plan MOVES. +50 técnicos certificados.",
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "es",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: HERO_IMAGE,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      ],
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".hero-description"],
    },
    significantLink: [
      `${BASE_URL}/promociones-electricos`,
      `${BASE_URL}/promociones-hibridos`,
      `${BASE_URL}/postventa`,
      `${BASE_URL}/autoplus`,
      `${BASE_URL}/concesionarios`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
    />
  );
}

export default function Page() {
  return (
    <>
      <link rel="preload" as="image" href={HERO_IMAGE} fetchPriority="high" />
      <HomePageJsonLd />
      <HomePage />
    </>
  );
}
