export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ConfirmacionContactoPage from "@/pages/confirmacion-contacto";

export const metadata: Metadata = {
  title: "Confirmación de Contacto",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmacionContactoPage />;
}
