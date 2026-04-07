import type { Metadata } from "next";
import AccesibilidadPage from "@/pages/accesibilidad";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Accesibilidad",
  robots: { index: false, follow: true },
  alternates: { canonical: "/accesibilidad" },
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/accesibilidad"
        name="Accesibilidad"
        description="Declaración de accesibilidad del sitio web de Grupo Avisa."
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <AccesibilidadPage />
    </>
  );
}
