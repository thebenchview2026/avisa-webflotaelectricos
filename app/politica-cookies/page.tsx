import type { Metadata } from "next";
import PoliticaCookiesPage from "@/pages/politica-cookies";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Política de Cookies",
  robots: { index: false, follow: true },
  alternates: { canonical: "/politica-cookies" },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/politica-cookies"
        name="Política de Cookies"
        description="Política de cookies de Grupo Avisa."
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <PoliticaCookiesPage />
    </>
  );
}
