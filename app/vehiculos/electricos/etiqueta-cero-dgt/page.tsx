import type { Metadata } from "next";
import VehiculosEtiquetaCeroPage from "@/pages/vehiculos-etiqueta-cero";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Coches Eléctricos con Etiqueta CERO DGT: Ventajas y Modelos",
  description: "Todos los vehículos eléctricos e híbridos enchufables de Grupo Avisa tienen etiqueta CERO DGT. Acceso ZBE, aparcamiento gratuito y exención matriculación. Volkswagen, Audi, Škoda y CUPRA.",
  alternates: { canonical: "/vehiculos/electricos/etiqueta-cero-dgt" },
  keywords: ["etiqueta CERO DGT coche eléctrico", "ventajas etiqueta cero particular", "coche eléctrico ZBE acceso libre", "aparcamiento gratuito etiqueta cero", "etiqueta medioambiental DGT cero"],
  openGraph: {
    title: "Coches Eléctricos Etiqueta CERO DGT | Grupo Avisa",
    description: "Modelos con etiqueta CERO DGT: acceso ZBE libre, aparcamiento gratuito y exención del impuesto de matriculación.",
    type: "website",
    url: "/vehiculos/electricos/etiqueta-cero-dgt",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/vehiculos/electricos/etiqueta-cero-dgt"
        name="Coches con Etiqueta CERO DGT"
        description="Guía completa sobre la etiqueta CERO DGT: ventajas, requisitos y modelos disponibles."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Coches eléctricos", path: "/promociones-electricos" }, { name: "Etiqueta CERO DGT", path: "/vehiculos/electricos/etiqueta-cero-dgt" }]}
      />
      <VehiculosEtiquetaCeroPage />
    </>
  );
}
