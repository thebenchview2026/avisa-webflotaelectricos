"use client";
import { useState, useEffect, useRef } from 'react';
import { Link, useParams } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead, { buildFaqJsonLd } from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import { renderBoldAndLinkedText } from '@/lib/seo-link-renderer';
import type { FaqCategory, Faq } from '@shared/schema';

function renderBoldText(text: string) {
  return renderBoldAndLinkedText(text, { excludeUrls: ["/preguntas"], maxLinks: 2 });
}

function extractHeadings(answer: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  answer.split('\n\n').forEach((paragraph) => {
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      const text = paragraph.replace(/\*\*/g, '');
      const id = text.toLowerCase().replace(/[^a-záéíóúñü0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text });
    }
  });
  return headings;
}

function renderAnswer(answer: string) {
  return answer.split('\n\n').map((paragraph, index) => {
    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
      const text = paragraph.replace(/\*\*/g, '');
      const id = text.toLowerCase().replace(/[^a-záéíóúñü0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return (
        <h3 key={index} id={id} className="text-xl font-bold text-gray-900 mt-8 mb-3 scroll-mt-32 flex items-center gap-2">
          <div className="w-1 h-6 bg-[#ad023b] rounded-full"></div>
          {text}
        </h3>
      );
    }
    if (paragraph.startsWith('|')) {
      const rows = paragraph.split('\n').filter(row => row.trim());
      const headers = rows[0].split('|').filter(cell => cell.trim());
      const dataRows = rows.slice(2);
      return (
        <div key={index} className="overflow-x-auto my-6 rounded-xl border border-gray-200">
          <table className="min-w-full">
            <thead className="bg-gray-900 text-white">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} className="px-5 py-3 text-left text-sm font-semibold">
                    {header.trim()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rowIndex) => {
                const cells = row.split('|').filter(cell => cell.trim());
                return (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {cells.map((cell, cellIndex) => (
                      <td key={cellIndex} className="px-5 py-3 text-sm text-gray-700 border-b border-gray-100">
                        {renderBoldText(cell.trim())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (paragraph.startsWith('- ')) {
      const items = paragraph.split('\n').filter(item => item.trim());
      return (
        <ul key={index} className="space-y-3 my-5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700">
              <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0 mt-0.5">
                <i className="ri-check-line text-green-600 text-sm"></i>
              </div>
              <span className="leading-relaxed">{renderBoldText(item.replace(/^- /, ''))}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (paragraph.match(/^\d+\.\s/)) {
      const items = paragraph.split('\n').filter(item => item.trim());
      return (
        <ol key={index} className="space-y-3 my-5">
          {items.map((item, i) => {
            const num = item.match(/^(\d+)\./)?.[1] || String(i + 1);
            return (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <div className="w-7 h-7 flex items-center justify-center bg-[#ad023b] text-white rounded-full flex-shrink-0 mt-0.5 text-xs font-bold">
                  {num}
                </div>
                <span className="leading-relaxed">{renderBoldText(item.replace(/^\d+\.\s/, ''))}</span>
              </li>
            );
          })}
        </ol>
      );
    }

    if (paragraph.startsWith('> ')) {
      return (
        <blockquote key={index} className="border-l-4 border-[#ad023b] bg-[#ad023b]/5 pl-5 pr-4 py-4 my-5 rounded-r-xl">
          <p className="text-gray-800 italic leading-relaxed">{renderBoldText(paragraph.replace(/^> /, ''))}</p>
        </blockquote>
      );
    }

    return (
      <p key={index} className="text-gray-700 leading-relaxed my-4 text-[16px]">
        {renderBoldText(paragraph)}
      </p>
    );
  });
}

function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

interface PreguntasDetallePageProps {
  categoria?: string;
  pregunta?: string;
}

export default function PreguntasDetallePage({ categoria: propCategoria, pregunta: propPregunta }: PreguntasDetallePageProps = {}) {
  const [copied, setCopied] = useState(false);
  const [helpful, setHelpful] = useState<'yes' | 'no' | null>(null);
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ categoria: string; pregunta: string }>();
  const categoria = propCategoria || params.categoria || '';
  const pregunta = propPregunta || params.pregunta || '';

  const { data, isLoading, isError } = useQuery<{
    faq: Faq;
    category: FaqCategory;
    relatedFaqs: { id: string; slug: string; question: string; categorySlug: string }[];
  }>({
    queryKey: ["/api/faqs/by-slug", pregunta],
    queryFn: async () => {
      const res = await fetch(`/api/faqs/by-slug/${pregunta}`);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    },
    enabled: !!pregunta,
    retry: false,
  });

  const { data: allData } = useQuery<{ categories: FaqCategory[]; faqs: Faq[] }>({
    queryKey: ["/api/faqs"],
  });

  const faq = data?.faq;
  const category = data?.category;
  const relatedFaqs = data?.relatedFaqs || [];
  const headings = faq ? extractHeadings(faq.answer) : [];
  const readingTime = faq ? estimateReadingTime(faq.answer) : 0;

  const categoryFaqs = allData?.faqs?.filter(f => f.categoryId === faq?.categoryId && f.published) || [];
  const currentIndex = categoryFaqs.findIndex(f => (f as any).slug === pregunta);
  const prevFaq = currentIndex > 0 ? categoryFaqs[currentIndex - 1] : null;
  const nextFaq = currentIndex < categoryFaqs.length - 1 ? categoryFaqs[currentIndex + 1] : null;

  useEffect(() => {
    if (!headings.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -60% 0px' }
    );
    headings.forEach(h => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [headings.length, faq?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <i className="ri-loader-4-line text-3xl animate-spin block mb-3" aria-hidden="true"></i>
            <p>Cargando pregunta...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !faq || !category) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-detalle-not-found">
        <Navbar />
        <main role="main" className="flex-1 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <i className="ri-error-warning-line text-4xl text-red-400 block mb-4" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{isError ? 'Error al cargar la pregunta' : 'Pregunta no encontrada'}</h1>
            <Link href="/preguntas" className="text-[#ad023b] hover:underline cursor-pointer" data-testid="link-back-faq">
              Volver a preguntas frecuentes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const canonicalCategory = category?.slug || categoria;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/preguntas/${canonicalCategory}/${(faq as any)?.slug || pregunta}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqJsonLd = buildFaqJsonLd([{ question: faq.question, answer: faq.answer.replace(/\*\*/g, '').replace(/\n\n/g, ' ').slice(0, 500) }]);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-preguntas-detalle">
      <SEOHead
        title={faq.question}
        description={faq.answer.replace(/\*\*/g, '').replace(/\n\n/g, ' ').slice(0, 160)}
        canonical={`/preguntas/${canonicalCategory}/${(faq as any)?.slug || pregunta}`}
        jsonLd={faqJsonLd}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: "Preguntas", href: "/preguntas" },
          { name: category.name, href: `/preguntas/${canonicalCategory}` },
        ]}
        currentPage={faq.question.length > 60 ? faq.question.slice(0, 57) + "..." : faq.question}
      />
      <main role="main">
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-32 pb-16 overflow-hidden" aria-label="Detalle de pregunta frecuente">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-80 h-80 bg-[#ad023b] rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-[#ad023b] text-white px-3 py-1 rounded-full text-xs font-bold">
              <i className={category.icon || 'ri-question-line'}></i>
              {category.name}
            </span>
            <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs">
              <i className="ri-time-line"></i>
              {readingTime} min de lectura
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight mb-6" data-testid="text-question-title">
            {faq.question}
          </h1>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap"
              data-testid="button-copy-link"
            >
              <i className={copied ? 'ri-check-line' : 'ri-link'}></i>
              {copied ? 'Copiado' : 'Copiar enlace'}
            </button>
            <a
              href={`https://wa.me/34621261541?text=Tengo una duda sobre: ${faq.question}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-4 py-2 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-whatsapp-question"
            >
              <i className="ri-whatsapp-line"></i>
              Escríbeme
            </a>
            <a
              href="tel:+34955034600"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-call-question"
            >
              <i className="ri-phone-line"></i>
              Llámame
            </a>
          </div>
        </div>
      </section>

      <section className="py-12 flex-1 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">

            <div className="flex-1 min-w-0" ref={contentRef}>
              {faq.videoUrl && (
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 border border-gray-100">
                  <div className="aspect-video bg-gray-900 relative">
                    {/\.(mp4|webm|ogg)$/i.test(faq.videoUrl) ? (
                      <video
                        src={faq.videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full"
                        data-testid="video-question"
                      />
                    ) : (
                      <iframe
                        src={faq.videoUrl}
                        title={faq.question}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                        data-testid="video-question"
                      ></iframe>
                    )}
                  </div>
                  <div className="px-6 py-3 bg-gray-50 flex items-center gap-2 text-sm text-gray-500">
                    <i className="ri-play-circle-line text-[#ad023b]"></i>
                    Vídeo explicativo sobre esta pregunta
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100">
                <div className="prose prose-lg max-w-none" data-testid="text-question-answer">
                  {renderAnswer(faq.answer)}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8 border border-gray-100" data-testid="section-helpful">
                <div className="text-center">
                  <p className="text-gray-900 font-semibold mb-4">¿Te ha sido útil esta respuesta?</p>
                  {helpful === null ? (
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setHelpful('yes')}
                        className="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer"
                        data-testid="button-helpful-yes"
                      >
                        <i className="ri-thumb-up-line text-lg"></i>
                        Sí, me ha ayudado
                      </button>
                      <button
                        onClick={() => setHelpful('no')}
                        className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 px-6 py-3 rounded-xl font-medium transition-colors cursor-pointer"
                        data-testid="button-helpful-no"
                      >
                        <i className="ri-thumb-down-line text-lg"></i>
                        No del todo
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className={`flex items-center gap-2 ${helpful === 'yes' ? 'text-green-600' : 'text-[#ad023b]'}`}>
                        <i className={helpful === 'yes' ? 'ri-heart-fill text-2xl' : 'ri-chat-smile-2-line text-2xl'}></i>
                        <span className="font-medium">
                          {helpful === 'yes' ? '¡Gracias por tu feedback!' : 'Gracias. ¿Necesitas más ayuda?'}
                        </span>
                      </div>
                      {helpful === 'no' && (
                        <a
                          href={`https://wa.me/34621261541?text=Necesito ayuda con: ${faq.question}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#20BD5A] transition-colors"
                          data-testid="link-whatsapp-help"
                        >
                          <i className="ri-whatsapp-line"></i>
                          Habla con un asesor
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {(prevFaq || nextFaq) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8" data-testid="section-nav-faqs">
                  {prevFaq ? (
                    <Link
                      href={`/preguntas/${canonicalCategory}/${(prevFaq as any).slug}`}
                      className="group bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:border-[#ad023b]/30 hover:shadow-lg transition-all cursor-pointer"
                      data-testid="link-prev-faq"
                    >
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <i className="ri-arrow-left-line group-hover:-translate-x-1 transition-transform"></i>
                        Pregunta anterior
                      </div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#ad023b] transition-colors line-clamp-2">
                        {prevFaq.question}
                      </p>
                    </Link>
                  ) : <div />}
                  {nextFaq ? (
                    <Link
                      href={`/preguntas/${canonicalCategory}/${(nextFaq as any).slug}`}
                      className="group bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:border-[#ad023b]/30 hover:shadow-lg transition-all cursor-pointer text-right"
                      data-testid="link-next-faq"
                    >
                      <div className="flex items-center justify-end gap-2 text-xs text-gray-400 mb-2">
                        Siguiente pregunta
                        <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
                      </div>
                      <p className="text-sm font-medium text-gray-900 group-hover:text-[#ad023b] transition-colors line-clamp-2">
                        {nextFaq.question}
                      </p>
                    </Link>
                  ) : <div />}
                </div>
              )}

              {relatedFaqs.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100" data-testid="section-related">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="ri-links-line text-[#ad023b]"></i>
                    Preguntas relacionadas
                  </h3>
                  <div className="space-y-3">
                    {relatedFaqs.map((related) => (
                      <Link
                        key={related.id}
                        href={`/preguntas/${related.categorySlug}/${related.slug}`}
                        className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer group"
                        data-testid={`link-related-${related.slug}`}
                      >
                        <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/10 rounded-full flex-shrink-0">
                          <i className="ri-question-line text-[#ad023b]"></i>
                        </div>
                        <span className="text-gray-900 group-hover:text-[#ad023b] transition-colors flex-1 text-sm">
                          {related.question}
                        </span>
                        <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#ad023b] group-hover:translate-x-1 transition-all"></i>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-36 space-y-6">

                {headings.length > 2 && (
                  <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100" data-testid="toc">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-list-unordered text-[#ad023b]"></i>
                      En esta respuesta
                    </h4>
                    <nav className="space-y-1">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className={`block text-xs py-1.5 pl-3 border-l-2 transition-colors hover:text-[#ad023b] ${
                            activeHeading === h.id
                              ? 'border-[#ad023b] text-[#ad023b] font-medium'
                              : 'border-transparent text-gray-500'
                          }`}
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100" data-testid="sidebar-category">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <i className={category.icon || 'ri-folder-line'} style={{ color: '#ad023b' }}></i>
                    {category.name}
                  </h4>
                  <nav className="space-y-1">
                    {categoryFaqs.slice(0, 8).map((f) => (
                      <Link
                        key={f.id}
                        href={`/preguntas/${canonicalCategory}/${(f as any).slug}`}
                        className={`block text-xs py-2 px-3 rounded-lg transition-colors cursor-pointer ${
                          (f as any).slug === pregunta
                            ? 'bg-[#ad023b]/10 text-[#ad023b] font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                        data-testid={`link-cat-faq-${(f as any).slug}`}
                      >
                        {f.question.length > 55 ? f.question.slice(0, 55) + '...' : f.question}
                      </Link>
                    ))}
                  </nav>
                  <Link
                    href={`/preguntas/${canonicalCategory}`}
                    className="flex items-center gap-1 text-xs text-[#ad023b] font-medium mt-3 hover:underline cursor-pointer"
                    data-testid="link-view-all-category"
                  >
                    Ver todas <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-5 text-white" data-testid="sidebar-cta">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <i className="ri-customer-service-2-line text-lg"></i>
                    </div>
                    <div>
                      <p className="font-bold text-sm">¿Necesitas ayuda?</p>
                      <p className="text-xs text-gray-400">Te asesoramos sin compromiso</p>
                    </div>
                  </div>
                  <div className="space-y-2 mt-4">
                    <a
                      href="tel:+34955034600"
                      className="flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white py-2.5 rounded-xl text-sm font-bold transition-colors w-full"
                      data-testid="link-sidebar-call"
                    >
                      <i className="ri-phone-line"></i> Llámame
                    </a>
                    <a
                      href={`https://wa.me/34621261541?text=Necesito información sobre: ${faq.question}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white py-2.5 rounded-xl text-sm font-bold transition-colors w-full"
                      data-testid="link-sidebar-whatsapp"
                    >
                      <i className="ri-whatsapp-line"></i> WhatsApp
                    </a>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100" data-testid="sidebar-categories">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Otras categorías</h4>
                  <nav className="space-y-1">
                    {(allData?.categories || []).filter(c => c.slug !== canonicalCategory).map(cat => (
                      <Link
                        key={cat.id}
                        href={`/preguntas/${cat.slug}`}
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#ad023b] py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        data-testid={`link-other-cat-${cat.slug}`}
                      >
                        <i className={cat.icon || 'ri-folder-line'} style={{ color: '#ad023b' }}></i>
                        {cat.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/preguntas"
              className="inline-flex items-center gap-2 bg-white text-gray-700 hover:text-[#ad023b] px-6 py-3 rounded-xl font-medium shadow-md border border-gray-200 hover:border-[#ad023b]/30 transition-all cursor-pointer"
              data-testid="link-back-all"
            >
              <i className="ri-arrow-left-line"></i>
              Volver al Centro de Preguntas
            </Link>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
