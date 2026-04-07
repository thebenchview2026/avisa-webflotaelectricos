"use client";
import { useParams } from "@/lib/router";
import { isServicePillarSlug } from "@/lib/servicios-data";
import { lazy, Suspense } from "react";

const ServicioPilarPage = lazy(() => import("@/pages/servicio-pilar"));
const ServicioMarcaPage = lazy(() => import("@/pages/servicio-marca"));

const Fallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-gray-500">Cargando...</div>
  </div>
);

export default function ServicioDispatcher() {
  const params = useParams() as { slug?: string };
  const slug = params.slug || "";

  if (isServicePillarSlug(slug)) {
    return (
      <Suspense fallback={<Fallback />}>
        <ServicioPilarPage />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Fallback />}>
      <ServicioMarcaPage />
    </Suspense>
  );
}
