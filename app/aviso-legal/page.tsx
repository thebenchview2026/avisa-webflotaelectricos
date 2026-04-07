import type { Metadata } from "next";
import AvisoLegalPage from "@/pages/aviso-legal";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Aviso Legal",
  robots: { index: false, follow: true },
  alternates: { canonical: "/aviso-legal" },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/aviso-legal"
        name="Aviso Legal"
        description="Aviso legal de Grupo Avisa, concesionario oficial de vehículos eléctricos e híbridos."
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <AvisoLegalPage />
    </>
  );
}
