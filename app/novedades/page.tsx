import type { Metadata } from "next";
import EditorialHub from "@/pages/editorial-hub";
import { fetchEditorialByType, mapRowToEditorialContent } from "../../lib/supabase-editorial";

export const metadata: Metadata = {
  title: "Novedades Coches Eléctricos e Híbridos",
  description: "Mantente al día con las últimas novedades sobre vehículos eléctricos e híbridos: lanzamientos, regulaciones, ayudas y tendencias del sector en España.",
  alternates: { canonical: "/novedades" },
  openGraph: {
    title: "Novedades Coches Eléctricos e Híbridos | Grupo Avisa",
    description: "Últimas novedades sobre vehículos eléctricos e híbridos, legislación, infraestructura de carga y mercado del automóvil sostenible.",
    type: "website",
    url: "/novedades",
  },
};

export default async function Page() {
  const rows = await fetchEditorialByType("novedad");
  const initialData = rows.map(mapRowToEditorialContent);
  return <EditorialHub type="novedad" initialData={initialData} />;
}
