import type { Metadata } from "next";
import EditorialHub from "@/pages/editorial-hub";
import { fetchEditorialByType, mapRowToEditorialContent } from "../../lib/supabase-editorial";

export const metadata: Metadata = {
  title: "Consejos Coches Eléctricos e Híbridos",
  description: "Consejos de expertos para sacar el máximo partido a tu coche eléctrico o híbrido: conducción eficiente, carga, ahorro y cuidado de batería.",
  alternates: { canonical: "/consejos" },
  openGraph: {
    title: "Consejos Coches Eléctricos e Híbridos | Grupo Avisa",
    description: "Consejos prácticos para conductores de vehículos eléctricos e híbridos: ahorro, conducción eficiente, carga y mantenimiento.",
    type: "website",
    url: "/consejos",
  },
};

export default async function Page() {
  const rows = await fetchEditorialByType("consejo");
  const initialData = rows.map(mapRowToEditorialContent);
  return <EditorialHub type="consejo" initialData={initialData} />;
}
