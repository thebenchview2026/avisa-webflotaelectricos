import type { Metadata } from "next";
import AyudasMoves3Page from "@/pages/ayudas-moves3";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Plan MOVES III: Hasta 7.000 € de Ayuda para Coche Eléctrico Empresa",
  description: "Ayudas Plan MOVES III para empresas y autónomos en Andalucía: hasta 7.000 € por vehículo eléctrico. Requisitos, cuantías, modelos elegibles y tramitación sin coste adicional.",
  alternates: { canonical: "/ayudas-moves3-vehiculo-electrico" },
  keywords: ["plan MOVES III empresa", "ayuda coche eléctrico empresa 2025", "subvención eléctrico empresa Andalucía", "moves 3 autónomo", "7000 euros coche eléctrico"],
  openGraph: {
    title: "Plan MOVES III: 7.000 € de Ayuda para Coches Eléctricos | Grupo Avisa",
    description: "Tramitamos las ayudas MOVES III para tu empresa sin coste adicional. Hasta 7.000 € por vehículo eléctrico en Andalucía.",
    type: "website",
    url: "/ayudas-moves3-vehiculo-electrico",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/ayudas-moves3-vehiculo-electrico"
        name="Plan MOVES III: Ayudas para Vehículos Eléctricos"
        description="Guía completa del Plan MOVES III con cuantías, requisitos y tramitación de ayudas para empresas en Andalucía."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Ayudas Plan MOVES III", path: "/ayudas-moves3-vehiculo-electrico" }]}
      />
      <AyudasMoves3Page />
    </>
  );
}
