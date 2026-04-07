export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import ConfirmacionMovesPage from "@/pages/confirmacion-moves";

export const metadata: Metadata = {
  title: "Confirmación Plan MOVES",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmacionMovesPage />;
}
