import type { Metadata } from "next";
import CondicionesUsoPage from "@/pages/condiciones-uso";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Condiciones de Uso",
  robots: { index: false, follow: true },
  alternates: { canonical: "/condiciones-uso" },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/condiciones-uso"
        name="Condiciones de Uso"
        description="Condiciones de uso del sitio web de Grupo Avisa."
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <CondicionesUsoPage />
    </>
  );
}
