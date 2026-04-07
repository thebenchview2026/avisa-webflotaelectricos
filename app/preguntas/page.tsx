import type { Metadata } from "next";
import PreguntasPage from "@/pages/preguntas";
import PageJsonLd from "@/components/page-json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ Coches Eléctricos e Híbridos",
  description: "Dudas sobre autonomía, carga, mantenimiento y Plan MOVES del coche eléctrico. Respuestas de técnicos certificados con +15 años.",
  alternates: { canonical: "/preguntas" },
  openGraph: {
    title: "Preguntas Frecuentes sobre Coches Eléctricos e Híbridos | Grupo Avisa",
    description: "Todo lo que necesitas saber sobre autonomía, carga, mantenimiento y ayudas para coches eléctricos e híbridos enchufables.",
    type: "website",
    url: "/preguntas",
  },
  keywords: ["preguntas coche eléctrico", "autonomía coche eléctrico FAQ", "carga coche eléctrico", "Plan MOVES preguntas", "mantenimiento eléctrico FAQ", "coste coche eléctrico"],
};

async function getFaqData() {
  try {
    const res = await fetch("http://localhost:5000/api/faqs", { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function Page() {
  const initialData = await getFaqData();
  return (
    <>
      <PageJsonLd
        path="/preguntas"
        name="Preguntas Frecuentes sobre Vehículos Eléctricos e Híbridos"
        description="Resolvemos todas tus dudas sobre vehículos eléctricos e híbridos: autonomía, carga, mantenimiento, ayudas y Plan MOVES."
        type={["WebPage", "FAQPage"]}
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <PreguntasPage initialData={initialData} />
    </>
  );
}
