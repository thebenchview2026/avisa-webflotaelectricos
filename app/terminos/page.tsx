import type { Metadata } from "next";
import TerminosPage from "@/pages/terminos";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Términos y Condiciones",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terminos" },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/terminos"
        name="Términos y Condiciones"
        description="Términos y condiciones de Grupo Avisa."
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <TerminosPage />
    </>
  );
}
