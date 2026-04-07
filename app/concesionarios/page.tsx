import type { Metadata } from "next";
import ConcesionariosPage from "@/pages/concesionarios";
import PageJsonLd from "@/components/page-json-ld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concesionarios en Sevilla, Andalucía y Extremadura",
  description: "8 centros en Sevilla, Huelva, Córdoba, Badajoz y Cáceres. Concesionario oficial Volkswagen, Audi y Škoda. Encuentra tu taller.",
  alternates: { canonical: "/concesionarios" },
  openGraph: {
    title: "Concesionarios Oficiales en Sevilla, Andalucía y Extremadura | Grupo Avisa",
    description: "Red de 8 concesionarios oficiales Volkswagen, Audi y Škoda en Andalucía y Extremadura. Encuentra tu centro más cercano.",
    type: "website",
    url: "/concesionarios",
  },
  keywords: ["concesionario Volkswagen Sevilla", "concesionario Audi Sevilla", "Škoda Córdoba", "concesionario eléctricos Huelva", "Grupo Avisa Badajoz", "concesionario Extremadura"],
};

async function getDealersData() {
  try {
    const res = await fetch("http://localhost:5000/api/dealers", { cache: "no-store" });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export default async function Page() {
  const initialDealers = await getDealersData();
  return (
    <>
      <PageJsonLd
        path="/concesionarios"
        name="Concesionarios y Puntos de Venta"
        description="Red de concesionarios oficiales Volkswagen, Audi y Škoda en Andalucía y Extremadura."
        type="WebPage"
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
      />
      <ConcesionariosPage initialDealers={initialDealers} />
    </>
  );
}
