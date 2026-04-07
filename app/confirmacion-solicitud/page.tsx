export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ConfirmacionSolicitudPage from "@/pages/confirmacion-solicitud";

export const metadata: Metadata = {
  title: "Confirmación de Solicitud",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmacionSolicitudPage />;
}
