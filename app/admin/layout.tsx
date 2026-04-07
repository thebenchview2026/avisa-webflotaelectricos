import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Panel de Administración | Grupo Avisa" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
