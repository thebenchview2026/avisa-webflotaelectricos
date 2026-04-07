import type { Metadata } from "next";
import VehiculosAutonomiaPage from "@/pages/vehiculos-autonomia";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Coches Eléctricos con más de 400 km de Autonomía",
  description: "Modelos eléctricos con autonomía WLTP superior a 400 km disponibles en Grupo Avisa Andalucía. Volkswagen ID.4, Audi Q4 e-tron, Škoda Enyaq. Para empresa y flotas.",
  alternates: { canonical: "/vehiculos/electricos/autonomia-mas-400km" },
  keywords: ["coche eléctrico 400 km autonomía", "eléctrico autonomía empresa", "mejor autonomía coche eléctrico", "volkswagen id4 autonomía", "audi q4 etron autonomía"],
  openGraph: {
    title: "Coches Eléctricos +400 km de Autonomía | Grupo Avisa Andalucía",
    description: "Modelos eléctricos con más de 400 km de autonomía WLTP para empresa en Andalucía.",
    type: "website",
    url: "/vehiculos/electricos/autonomia-mas-400km",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/vehiculos/electricos/autonomia-mas-400km"
        name="Coches Eléctricos con más de 400 km de Autonomía"
        description="Selección de modelos eléctricos con autonomía real superior a 400 km WLTP."
        type="CollectionPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Coches eléctricos", path: "/promociones-electricos" }, { name: "+400 km Autonomía", path: "/vehiculos/electricos/autonomia-mas-400km" }]}
      />
      <VehiculosAutonomiaPage />
    </>
  );
}
