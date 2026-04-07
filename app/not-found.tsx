import type { Metadata } from "next";
import NotFound from "@/pages/not-found";

export const metadata: Metadata = {
  title: { absolute: "Página no encontrada | Grupo Avisa" },
  description: "La página que buscas no existe. Descubre vehículos eléctricos e híbridos en Grupo Avisa.",
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return <NotFound />;
}
