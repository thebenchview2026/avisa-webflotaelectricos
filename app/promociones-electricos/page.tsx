import type { Metadata } from "next";
import PromocionesElectricosPage from "@/pages/promociones-electricos";
import PageJsonLd from "@/components/page-json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ofertas Coches Eléctricos: Hasta 7.000 € de Ayuda",
  description: "Ofertas en Volkswagen ID.3, ID.4, Audi Q4 e-tron y Škoda Enyaq. Hasta 7.000 € con Plan MOVES III. Financiación desde 199 €/mes.",
  alternates: { canonical: "/promociones-electricos" },
  openGraph: {
    title: "Ofertas Coches Eléctricos en Sevilla: Hasta 7.000 € de Ayuda | Grupo Avisa",
    description: "Las mejores ofertas en coches 100 % eléctricos con Plan MOVES y financiación especial en Sevilla.",
    type: "website",
    url: "/promociones-electricos",
  },
  keywords: ["ofertas coches eléctricos Sevilla", "Volkswagen ID.3 precio", "Audi Q4 e-tron oferta", "Škoda Enyaq oferta Sevilla", "Plan MOVES III Andalucía", "financiación coche eléctrico"],
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
        path="/promociones-electricos"
        name="Promociones Vehículos Eléctricos"
        description="Las mejores ofertas en vehículos 100% eléctricos con Plan MOVES III y financiación especial."
        type={["WebPage", "CollectionPage"]}
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <PromocionesElectricosPage initialPromotions={initialPromotions} />
    </>
  );
}
