import type { Metadata } from "next";
import RentingElectricoPage from "@/pages/renting-electrico";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Renting de Coches Eléctricos para Empresa en Andalucía",
  description: "Renting de vehículos eléctricos para empresa en Andalucía: cuota fija, mantenimiento incluido, seguro y gestión de carga. Volkswagen ID.3, Audi Q4 e-tron, Škoda Enyaq.",
  alternates: { canonical: "/renting-coche-electrico" },
  keywords: ["renting coche eléctrico empresa", "renting eléctrico Sevilla", "renting flota eléctrica", "alquiler largo plazo eléctrico empresa", "renting volkswagen id3"],
  openGraph: {
    title: "Renting de Coches Eléctricos para Empresa | Grupo Avisa",
    description: "Cuota fija mensual con mantenimiento, seguro y gestión de carga incluidos. Renting de flota eléctrica en Andalucía.",
    type: "website",
    url: "/renting-coche-electrico",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/renting-coche-electrico"
        name="Renting de Coches Eléctricos para Empresa"
        description="Renting de vehículos eléctricos con todo incluido para empresas en Andalucía."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Renting Coche Eléctrico", path: "/renting-coche-electrico" }]}
      />
      <RentingElectricoPage />
    </>
  );
}
