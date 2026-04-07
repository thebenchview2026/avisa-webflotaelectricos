"use client";
import { useState } from 'react';
import { Link } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead, { buildFaqJsonLd } from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { FaqCategory, Faq } from '@shared/schema';

interface PreguntasPageProps {
  initialData?: { categories: FaqCategory[]; faqs: Faq[] } | null;
}

export default function PreguntasPage({ initialData }: PreguntasPageProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('');

  const { data, isLoading } = useQuery<{ categories: FaqCategory[]; faqs: Faq[] }>({
    queryKey: ["/api/faqs"],
    initialData: initialData ?? undefined,
  });

  const categories = data?.categories || [];
  const allFaqs = data?.faqs || [];

  const effectiveCategory = activeCategory || (categories.length > 0 ? categories[0].slug : '');

  const filteredFaqs = searchQuery
    ? allFaqs.filter(f => f.question.toLowerCase().includes(searchQuery.toLowerCase()))
    : allFaqs.filter(f => {
        const cat = categories.find(c => c.id === f.categoryId);
        return cat?.slug === effectiveCategory;
      });

  const getCategoryForFaq = (faq: Faq) => categories.find(c => c.id === faq.categoryId);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas">
      <SEOHead
        title="Preguntas Frecuentes sobre Vehículos Eléctricos e Híbridos"
        description="Resolvemos tus dudas sobre coches eléctricos e híbridos: autonomía, carga, mantenimiento, ayudas del Plan MOVES y mucho más. Guía completa de Grupo Avisa."
        canonical="/preguntas"
        jsonLd={data?.faqs ? buildFaqJsonLd(data.faqs.filter(f => f.published).map(f => ({ question: f.question, answer: f.answer }))) : undefined}
      />
      <Navbar />
      <Breadcrumbs
        items={[]}
        currentPage="Preguntas frecuentes"
      />
      <main role="main">

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-20 overflow-hidden" aria-label="Preguntas frecuentes sobre vehículos eléctricos">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ad023b] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Centro de ayuda
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
              Encuentra respuestas a todas tus dudas sobre vehículos eléctricos e híbridos enchufables
            </p>

            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-xl" aria-hidden="true"></i>
                <input
                  type="text"
                  placeholder="Buscar preguntas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-lg"
                  data-testid="input-search-faq"
                />
              </div>
            </div>
          </div>

          {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/preguntas/${category.slug}`}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all cursor-pointer group"
                data-testid={`link-category-hero-${category.slug}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/20 rounded-full mx-auto mb-3 group-hover:bg-[#ad023b]/40 transition-colors">
                  <i className={`${category.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                </div>
                <span className="text-white font-medium text-sm">{category.name}</span>
              </Link>
            ))}
          </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white" aria-label="Listado de preguntas frecuentes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explora por categoría
            </h2>
            <p className="text-lg text-gray-600">
              Selecciona una categoría para ver todas las preguntas relacionadas
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-loader-4-line text-3xl animate-spin block mb-3" aria-hidden="true"></i>
              <p>Cargando preguntas...</p>
            </div>
          ) : (
          <>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => { setActiveCategory(category.slug); setSearchQuery(''); }}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all cursor-pointer whitespace-nowrap ${
                  effectiveCategory === category.slug && !searchQuery
                    ? 'bg-[#ad023b] text-white shadow-lg shadow-[#ad023b]/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                data-testid={`button-category-${category.slug}`}
              >
                <i className={`${category.icon} text-lg`} aria-hidden="true"></i>
                {category.name}
              </button>
            ))}
          </div>

          {searchQuery && (
            <p className="text-center text-gray-500 mb-6">
              {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} para "{searchQuery}"
            </p>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaqs.map((faq) => {
              const cat = getCategoryForFaq(faq);
              return (
                <article key={faq.id}>
                <Link
                  href={`/preguntas/${cat?.slug || 'general'}/${(faq as any).slug}`}
                  className="group bg-gray-50 hover:bg-white border border-gray-200 hover:border-[#ad023b]/30 rounded-xl p-6 transition-all hover:shadow-lg cursor-pointer block"
                  data-testid={`link-question-${(faq as any).slug}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/10 rounded-full flex-shrink-0 group-hover:bg-[#ad023b]/20 transition-colors">
                      <i className="ri-question-line text-[#ad023b] text-lg" aria-hidden="true"></i>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 group-hover:text-[#ad023b] transition-colors mb-2">
                        {faq.question}
                      </h3>
                      <span className="text-sm text-[#ad023b] flex items-center gap-1">
                        Ver respuesta
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                      </span>
                    </div>
                  </div>
                </Link>
                </article>
              );
            })}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-search-line text-3xl block mb-3" aria-hidden="true"></i>
              <p>No se encontraron preguntas{searchQuery ? ` para "${searchQuery}"` : ''}</p>
            </div>
          )}
          </>
          )}

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full mx-auto mb-4">
                <i className="ri-play-circle-line text-3xl text-white" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Videos explicativos</h3>
              <p className="text-gray-600 mb-4">Cada pregunta incluye un video tutorial para entenderlo mejor</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full mx-auto mb-4">
                <i className="ri-share-line text-3xl text-white" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comparte fácilmente</h3>
              <p className="text-gray-600 mb-4">Cada pregunta tiene su propia URL para compartir</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full mx-auto mb-4">
                <i className="ri-customer-service-2-line text-3xl text-white" aria-hidden="true"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Soporte experto</h3>
              <p className="text-gray-600 mb-4">¿No encuentras tu respuesta? Contacta con nuestros expertos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50" aria-label="Contacto y soporte">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#ad023b] to-[#8d0230] rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿No encuentras lo que buscas?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Nuestro equipo de expertos en movilidad eléctrica está disponible para resolver cualquier duda
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center justify-center gap-2 bg-white text-[#ad023b] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
                  data-testid="link-visit-dealer"
                >
                  <i className="ri-map-pin-line text-xl" aria-hidden="true"></i>
                  Visitar concesionario
                </Link>
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap"
                  data-testid="link-call-us"
                >
                  <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                  Llámame
                </a>
                <a
                  href="https://wa.me/34621261541"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:bg-[#20BD5A] transition-colors cursor-pointer whitespace-nowrap"
                  data-testid="link-whatsapp"
                >
                  <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
                  Escríbeme
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-white/80">
                <i className="ri-mail-line text-xl" aria-hidden="true"></i>
                <a href="mailto:info@grupoavisa.com" className="hover:text-white transition-colors cursor-pointer" data-testid="link-email">
                  info@grupoavisa.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
