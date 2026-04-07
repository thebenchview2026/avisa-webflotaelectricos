import type { Metadata } from "next";
import VehiculosPhevPage from "@/pages/vehiculos-phev";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Híbridos Enchufables (PHEV): Etiqueta CERO y Sin Ansiedad de Carga",
  description: "Híbridos enchufables PHEV con etiqueta CERO DGT en Andalucía. Modo eléctrico en ciudad y autonomía ilimitada en viajes largos. Volkswagen, Audi, Škoda y SEAT PHEV.",
  alternates: { canonical: "/vehiculos/hibridos/phev-enchufables" },
  keywords: ["híbrido enchufable PHEV", "coche híbrido enchufable Sevilla", "PHEV etiqueta CERO", "híbrido enchufable autonomía", "PHEV particular Andalucía"],
  openGraph: {
    title: "Híbridos Enchufables PHEV Etiqueta CERO | Grupo Avisa",
    description: "PHEV con etiqueta CERO DGT: modo eléctrico en ciudad, motor gasolina para viajes largos. Sin ansiedad de carga.",
    type: "website",
    url: "/vehiculos/hibridos/phev-enchufables",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/vehiculos/hibridos/phev-enchufables"
        name="Híbridos Enchufables PHEV con Etiqueta CERO"
        description="Selección de híbridos enchufables con etiqueta CERO DGT disponibles en Grupo Avisa. Perfectos para conducción mixta ciudad-carretera."
        type="CollectionPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Híbridos", path: "/promociones-hibridos" }, { name: "PHEV Enchufables", path: "/vehiculos/hibridos/phev-enchufables" }]}
      />
      <VehiculosPhevPage />
    </>
  );
}
