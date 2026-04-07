import type { Metadata } from "next";
import VehiculosCargaRapidaPage from "@/pages/vehiculos-carga-rapida";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Coches Eléctricos con Carga Rápida DC: hasta 175 kW",
  description: "Modelos eléctricos con carga rápida en corriente continua (DC/CCS2) de más de 100 kW. Del 20 % al 80 % en menos de 40 minutos. Volkswagen, Audi, Škoda y CUPRA.",
  alternates: { canonical: "/vehiculos/electricos/carga-rapida-dc" },
  keywords: ["coche eléctrico carga rápida", "CCS2 carga rápida eléctrico", "carga rápida DC empresa", "tiempo carga volkswagen id3", "cargador rápido coche eléctrico"],
  openGraph: {
    title: "Coches Eléctricos con Carga Rápida DC | Grupo Avisa",
    description: "Modelos con CCS2 y carga DC superior a 100 kW. Del 20 % al 80 % en menos de 40 minutos.",
    type: "website",
    url: "/vehiculos/electricos/carga-rapida-dc",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/vehiculos/electricos/carga-rapida-dc"
        name="Coches Eléctricos con Carga Rápida DC"
        description="Selección de modelos eléctricos con capacidad de carga rápida en DC superior a 100 kW."
        type="CollectionPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Coches eléctricos", path: "/promociones-electricos" }, { name: "Carga Rápida DC", path: "/vehiculos/electricos/carga-rapida-dc" }]}
      />
      <VehiculosCargaRapidaPage />
    </>
  );
}
