"use client";
import { Link, useParams } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead, { buildFaqJsonLd } from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { FaqCategory, Faq } from '@shared/schema';

interface PreguntasCategoriaPageProps {
  initialData?: { category: FaqCategory; faqs: Faq[] } | null;
}

export default function PreguntasCategoriaPage({ initialData }: PreguntasCategoriaPageProps = {}) {
  const params = useParams<{ categoria: string }>();
  const categoria = params.categoria || '';

  const { data, isLoading, isError } = useQuery<{ category: FaqCategory; faqs: Faq[] }>({
    queryKey: ["/api/faqs/by-category", categoria],
    queryFn: async () => {
      const res = await fetch(`/api/faqs/by-category/${categoria}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    },
    initialData: initialData ?? undefined,
    enabled: !!categoria,
    retry: false,
  });

  const categoryData = data?.category;
  const questions = data?.faqs || [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-categoria">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <i className="ri-loader-4-line text-3xl animate-spin block mb-3" aria-hidden="true"></i>
            <p>Cargando categoría...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-categoria-error">
        <Navbar />
        <main role="main" className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-error-warning-line text-4xl text-red-400 block mb-4" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error al cargar la categoría</h1>
            <Link href="/preguntas" className="text-[#ad023b] hover:underline cursor-pointer" data-testid="link-back-faq">
              Volver a preguntas frecuentes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-categoria-not-found">
        <Navbar />
        <main role="main" className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-error-warning-line text-4xl text-red-400 block mb-4" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoría no encontrada</h1>
            <Link href="/preguntas" className="text-[#ad023b] hover:underline cursor-pointer" data-testid="link-back-faq">
              Volver a preguntas frecuentes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-categoria">
      <SEOHead
        title={`${categoryData.name} - Preguntas Frecuentes`}
        description={categoryData.description || `Resuelve tus dudas sobre ${categoryData.name.toLowerCase()} en vehículos eléctricos e híbridos. Respuestas de expertos de Grupo Avisa.`}
        canonical={`/preguntas/${categoryData.slug}`}
        jsonLd={buildFaqJsonLd(questions.map(q => ({ question: q.question, answer: q.answer })))}
      />
      <Navbar />
      <Breadcrumbs
        items={[{ name: "Preguntas", href: "/preguntas" }]}
        currentPage={categoryData.name}
      />
      <main role="main">
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-16" aria-label="Preguntas de la categoría">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 flex items-center justify-center bg-[#ad023b]/20 rounded-2xl">
              <i className={`${categoryData.icon} text-3xl text-[#ad023b]`}></i>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-category-name">
                {categoryData.name}
              </h1>
              <p className="text-gray-400 mt-1">{questions.length} preguntas en esta categoría</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {questions.map((faq, index) => (
              <Link
                key={faq.id}
                href={`/preguntas/${categoria}/${(faq as any).slug}`}
                className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-[#ad023b]/30 hover:shadow-lg transition-all cursor-pointer group"
                data-testid={`link-question-${(faq as any).slug}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0 text-gray-500 font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#ad023b] transition-colors mb-2">
                      {faq.question}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{faq.answer.substring(0, 150)}...</p>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      {faq.videoUrl && (
                      <span className="text-sm text-[#ad023b] flex items-center gap-1">
                        <i className="ri-play-circle-line"></i>
                        Ver video
                      </span>
                      )}
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                        Leer más
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {questions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-question-line text-3xl block mb-3"></i>
              <p>No hay preguntas en esta categoría todavía.</p>
            </div>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/preguntas"
              className="inline-flex items-center gap-2 text-[#ad023b] font-medium hover:underline cursor-pointer"
              data-testid="link-back-categories"
            >
              <i className="ri-arrow-left-line"></i>
              Ver todas las categorías
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
