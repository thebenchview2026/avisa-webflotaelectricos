import type { Metadata } from "next";
import PuntoCargaElectricoPage from "@/pages/punto-carga-electrico";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Cómo Cargar un Coche Eléctrico en Casa: Wallbox y Costes Reales",
  description: "Guía completa sobre cómo cargar tu coche eléctrico en casa. Tipos de wallbox, costes reales de recarga, ahorro vs gasolina y ayudas MOVES III para instalación.",
  alternates: { canonical: "/punto-de-carga" },
  keywords: ["cargar coche eléctrico en casa", "instalar wallbox en casa", "coste cargar coche eléctrico", "wallbox precio instalación", "carga nocturna coche eléctrico"],
  openGraph: {
    title: "Cómo Cargar un Coche Eléctrico en Casa | Grupo Avisa",
    description: "Todo sobre la carga domiciliaria: wallbox, costes, ahorro real y subvenciones disponibles.",
    type: "website",
    url: "/punto-de-carga",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/punto-de-carga"
        name="Cómo Cargar un Coche Eléctrico en Casa"
        description="Guía completa sobre instalación de wallbox, costes de recarga y ayudas disponibles para usuarios particulares."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Cargar Coche Eléctrico en Casa", path: "/punto-de-carga" }]}
      />
      <PuntoCargaElectricoPage />
    </>
  );
}
