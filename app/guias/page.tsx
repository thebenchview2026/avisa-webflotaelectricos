import type { Metadata } from "next";
import EditorialHub from "@/pages/editorial-hub";
import { fetchEditorialByType, mapRowToEditorialContent } from "../../lib/supabase-editorial";

export const metadata: Metadata = {
  title: "Guías Vehículos Eléctricos e Híbridos",
  description: "Guías prácticas sobre coches eléctricos e híbridos: cómo elegir, carga en casa, autonomía real, costes de mantenimiento y más.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías Vehículos Eléctricos e Híbridos | Grupo Avisa",
    description: "Guías completas para elegir, mantener y aprovechar al máximo tu vehículo eléctrico o híbrido enchufable.",
    type: "website",
    url: "/guias",
  },
};

export default async function Page() {
  const rows = await fetchEditorialByType("guia");
  const initialData = rows.map(mapRowToEditorialContent);
  return <EditorialHub type="guia" initialData={initialData} />;
}
