import type { Metadata } from "next";
import ElectrificacionPage from "@/pages/electrificacion";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Guía de Electrificación del Coche Eléctrico",
  description: "Todo sobre el salto al coche eléctrico: tecnología, puntos de carga, ahorro real, beneficios fiscales y Plan MOVES.",
  alternates: { canonical: "/electrificacion" },
  openGraph: {
    title: "Guía de Electrificación: Cuándo Pasarse al Coche Eléctrico | Grupo Avisa",
    description: "Tu guía completa para la transición al vehículo eléctrico. Ahorro, autonomía, carga y ayudas disponibles.",
    type: "website",
    url: "/electrificacion",
  },
  keywords: ["cuándo comprar coche eléctrico", "transición vehículo eléctrico", "infraestructura carga España", "ahorro coche eléctrico", "beneficios fiscales eléctrico"],
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/electrificacion"
        name="Guía de Electrificación"
        description="Guía completa sobre la transición al vehículo eléctrico: tecnología, carga, ahorro e impacto ambiental."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Electrificación", path: "/electrificacion" }]}
      />
      <ElectrificacionPage />
    </>
  );
}
