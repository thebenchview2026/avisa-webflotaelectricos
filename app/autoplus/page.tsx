import type { Metadata } from "next";
import AutoplusPage from "@/pages/autoplus";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Plan MOVES y Ayudas para Coches Eléctricos",
  description: "Gestión integral del Plan MOVES III: hasta 7.000 € en ayudas para tu coche eléctrico o híbrido. Tramitación completa. Consulta gratis.",
  alternates: { canonical: "/autoplus" },
  openGraph: {
    title: "AutoPlus: Plan MOVES y Ayudas para Coches Eléctricos | Grupo Avisa",
    description: "Tramitación del Plan MOVES III y ayudas para vehículos eléctricos e híbridos. Gestión completa por nuestro equipo especializado.",
    type: "website",
    url: "/autoplus",
  },
  keywords: ["Plan MOVES III", "ayudas coche eléctrico", "subvención coche eléctrico", "plan moves Andalucía", "ayudas híbrido enchufable"],
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/autoplus"
        name="AutoPlus - Servicio Premium de Movilidad Eléctrica"
        description="Servicio premium integral de movilidad eléctrica: mantenimiento, carga, seguros y asistencia."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "AutoPlus", path: "/autoplus" }]}
      />
      <AutoplusPage />
    </>
  );
}
