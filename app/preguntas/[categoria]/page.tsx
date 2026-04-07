import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import PreguntasCategoriaPage from "@/pages/preguntas-categoria";
import PageJsonLd from "@/components/page-json-ld";

export const revalidate = 3600;

const BASE_URL = "https://electricos.grupoavisa.com";

const categoryMeta: Record<string, { title: string; description: string }> = {
  "carga-autonomia": {
    title: "Preguntas sobre Carga y Autonomía de Vehículos Eléctricos",
    description: "Resuelve tus dudas sobre la carga de vehículos eléctricos: tiempos de carga, tipos de conectores, autonomía real y puntos de carga en Andalucía.",
  },
  "mantenimiento-costes": {
    title: "Preguntas sobre Mantenimiento y Costes de Vehículos Eléctricos",
    description: "Todo sobre el mantenimiento de coches eléctricos: costes, revisiones, frenos regenerativos, neumáticos y comparativa con vehículos de combustión.",
  },
  "tecnologia-conduccion": {
    title: "Preguntas sobre Tecnología y Conducción Eléctrica",
    description: "Descubre la tecnología detrás de los vehículos eléctricos: motores, baterías, conducción autónoma, conectividad y experiencia de conducción.",
  },
  "incentivos-normativa": {
    title: "Preguntas sobre Incentivos y Normativa de Vehículos Eléctricos",
    description: "Información sobre ayudas Plan MOVES, etiqueta CERO, beneficios fiscales, zonas de bajas emisiones y normativa para vehículos eléctricos en España.",
  },
  "hibridos-enchufables": {
    title: "Preguntas sobre Vehículos Híbridos Enchufables",
    description: "Todo sobre los coches híbridos enchufables: diferencias con eléctricos puros, autonomía eléctrica, modos de conducción y ventajas fiscales.",
  },
  "compra-financiacion": {
    title: "Preguntas sobre Compra y Financiación de Vehículos Eléctricos",
    description: "Guía de compra de vehículos eléctricos: financiación, renting, leasing, valor residual y opciones de compra en Grupo Avisa.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const { categoria } = await params;
  const meta = categoryMeta[categoria];
  if (!meta) {
    return {
      title: "Preguntas Frecuentes",
      description: "Preguntas frecuentes sobre vehículos eléctricos e híbridos en Grupo Avisa.",
    };
  }
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${BASE_URL}/preguntas/${categoria}` },
    openGraph: {
      title: `${meta.title} | Grupo Avisa`,
      description: meta.description,
      url: `${BASE_URL}/preguntas/${categoria}`,
      type: "website",
    },
  };
}

async function getCategoryData(categoria: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/faqs/by-category/${categoria}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function getFaqBySlug(slug: string): Promise<{ categorySlug: string; faqSlug: string } | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/faqs/by-slug/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.category?.slug && data?.faq?.slug) {
      return { categorySlug: data.category.slug, faqSlug: data.faq.slug };
    }
    return null;
  } catch {
    return null;
  }
}

export default async function Page({ params }: { params: Promise<{ categoria: string }> }) {
  const { categoria } = await params;
  const initialData = await getCategoryData(categoria);

  if (!initialData) {
    const faqMatch = await getFaqBySlug(categoria);
    if (faqMatch) {
      permanentRedirect(`/preguntas/${faqMatch.categorySlug}/${faqMatch.faqSlug}`);
    }
  }

  const meta = categoryMeta[categoria];
  return (
    <>
      <PageJsonLd
        path={`/preguntas/${categoria}`}
        name={meta?.title || "Preguntas Frecuentes"}
        description={meta?.description || "Preguntas frecuentes sobre vehículos eléctricos e híbridos."}
        type={["WebPage", "FAQPage"]}
        aboutIds={["https://electricos.grupoavisa.com/#organization"]}
        breadcrumbItems={[
          { name: "Preguntas", path: "/preguntas" },
          { name: meta?.title?.split(" sobre ")[1] || categoria, path: `/preguntas/${categoria}` },
        ]}
      />
      <PreguntasCategoriaPage initialData={initialData} />
    </>
  );
}
