export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ConfirmacionCitaPage from "@/pages/confirmacion-cita";

export const metadata: Metadata = {
  title: "Confirmación de Cita",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmacionCitaPage />;
}
