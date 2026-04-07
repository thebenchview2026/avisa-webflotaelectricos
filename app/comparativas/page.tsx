import type { Metadata } from "next";
import EditorialHub from "@/pages/editorial-hub";
import { fetchEditorialByType, mapRowToEditorialContent } from "../../lib/supabase-editorial";

export const metadata: Metadata = {
  title: "Comparativas Coches Eléctricos e Híbridos",
  description: "Comparativas objetivas entre vehículos eléctricos e híbridos: autonomía, precio, equipamiento y prestaciones. Te ayudamos a elegir.",
  alternates: { canonical: "/comparativas" },
  openGraph: {
    title: "Comparativas Coches Eléctricos e Híbridos | Grupo Avisa",
    description: "Comparativas detalladas entre los mejores vehículos eléctricos e híbridos enchufables del mercado español.",
    type: "website",
    url: "/comparativas",
  },
};

export default async function Page() {
  const rows = await fetchEditorialByType("comparativa");
  const initialData = rows.map(mapRowToEditorialContent);
  return <EditorialHub type="comparativa" initialData={initialData} />;
}
