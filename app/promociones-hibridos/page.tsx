import type { Metadata } from "next";
import PromocionesHibridosPage from "@/pages/promociones-hibridos";
import PageJsonLd from "@/components/page-json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ofertas Híbridos Enchufables: Etiqueta CERO",
  description: "Ofertas en Volkswagen Golf GTE, Tiguan eHybrid y Audi Q5 TFSI e. Etiqueta CERO, acceso a ZBE y financiación especial.",
  alternates: { canonical: "/promociones-hibridos" },
  openGraph: {
    title: "Ofertas Híbridos Enchufables en Sevilla: Etiqueta CERO | Grupo Avisa",
    description: "Las mejores ofertas en híbridos enchufables con etiqueta CERO y financiación especial en Sevilla.",
    type: "website",
    url: "/promociones-hibridos",
  },
  keywords: ["híbrido enchufable oferta Sevilla", "PHEV Sevilla", "etiqueta CERO coche", "Golf GTE precio", "Tiguan eHybrid oferta", "financiación híbrido enchufable"],
};

async function getPromotionsData() {
  try {
    const res = await fetch("http://localhost:5000/api/promotions", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const initialPromotions = await getPromotionsData();
  return (
    <>
      <PageJsonLd
        path="/promociones-hibridos"
        name="Promociones Híbridos Enchufables"
        description="Las mejores ofertas en vehículos híbridos enchufables con etiqueta CERO."
        type={["WebPage", "CollectionPage"]}
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <PromocionesHibridosPage initialPromotions={initialPromotions} />
    </>
  );
}
