import type { Metadata } from "next";
import LeasingElectricoPage from "@/pages/leasing-electrico";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Leasing Coche Eléctrico: Cuota Baja con Opción de Compra",
  description: "Leasing de coches eléctricos para particulares y autónomos. Cuota baja mensual, opción de compra al final del contrato. Comparativa leasing vs renting vs financiación.",
  alternates: { canonical: "/leasing-coche-electrico" },
  keywords: ["leasing coche eléctrico", "leasing eléctrico particular", "leasing volkswagen id3", "leasing audi etron", "financiación coche eléctrico opción compra"],
  openGraph: {
    title: "Leasing Coche Eléctrico: Cuota Baja | Grupo Avisa",
    description: "Accede a un coche eléctrico nuevo con cuota baja y decide al final si comprarlo o cambiarlo.",
    type: "website",
    url: "/leasing-coche-electrico",
  },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/leasing-coche-electrico"
        name="Leasing de Coche Eléctrico"
        description="Leasing de coches eléctricos para particulares y autónomos con opción de compra."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Leasing Coche Eléctrico", path: "/leasing-coche-electrico" }]}
      />
      <LeasingElectricoPage />
    </>
  );
}
