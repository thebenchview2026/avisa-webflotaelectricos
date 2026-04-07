import type { Metadata } from "next";
import ConductoresAdopcionPage from "@/pages/conductores-adopcion";
import PageJsonLd from "@/components/page-json-ld";

export const metadata: Metadata = {
  title: "Ventajas del Coche Eléctrico: Ahorro Real",
  description: "Por qué elegir un coche eléctrico: ahorro del 70 % en combustible, beneficios fiscales, etiqueta CERO y menor mantenimiento.",
  alternates: { canonical: "/conductores-adopcion" },
  openGraph: {
    title: "Por Qué Pasarse al Coche Eléctrico: Ventajas y Ahorro Real | Grupo Avisa",
    description: "Razones para elegir un vehículo eléctrico: ahorro, sostenibilidad, beneficios fiscales y menor coste de mantenimiento.",
    type: "website",
    url: "/conductores-adopcion",
  },
  keywords: ["ventajas coche eléctrico", "ahorro coche eléctrico", "por qué coche eléctrico", "etiqueta CERO ventajas", "beneficios fiscales eléctrico"],
};

export default function Page() {
  return (
    <>
      <PageJsonLd
        path="/conductores-adopcion"
        name="Conductores de Adopción del Vehículo Eléctrico"
        description="Factores clave que impulsan la adopción del vehículo eléctrico: ahorro, sostenibilidad, tecnología e infraestructura."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[{ name: "Conductores de adopción", path: "/conductores-adopcion" }]}
      />
      <ConductoresAdopcionPage />
    </>
  );
}
