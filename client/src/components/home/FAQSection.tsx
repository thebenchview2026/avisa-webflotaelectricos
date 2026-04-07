"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Faq } from "@shared/schema";
import { CONTACT } from "@/lib/contact";

type HomeFaq = Faq & { categoryName: string };

function toEmbedUrl(url: string): string {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortMatch = url.match(/youtu\.be\/([^?]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  return url;
}

export default function FAQSection() {
  const { data: allFaqs = [], isLoading } = useQuery<HomeFaq[]>({
    queryKey: ["/api/faqs/home"],
  });

  const categories = Array.from(new Set(allFaqs.map(f => f.categoryName)));
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeCategory = openCategory || categories[0] || null;
  const visibleFaqs = allFaqs.filter(f => f.categoryName === activeCategory);

  return (
    <section id="faqs" className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white" data-testid="section-faqs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-faqs-title">
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Resolvemos todas tus dudas sobre vehículos eléctricos e híbridos enchufables
          </p>
        </div>

        {isLoading ? (
          <div className="grid lg:grid-cols-4 gap-8 animate-pulse">
            <div className="bg-white rounded-xl p-4 shadow-lg h-64"></div>
            <div className="lg:col-span-3 space-y-4">
              {[1, 2].map(i => <div key={i} className="bg-white rounded-xl h-20 shadow"></div>)}
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 shadow-lg sticky top-24">
                <h3 className="font-bold text-gray-900 mb-4 px-2">Categorías</h3>
                <nav className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setOpenCategory(cat); setOpenQuestion(null); }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                        activeCategory === cat
                          ? "bg-[#ad023b] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      data-testid={`button-faq-category-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {cat}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="space-y-4">
                {visibleFaqs.map((faq) => {
                  const isOpen = openQuestion === faq.id;
                  const isLocalVideo = faq.videoUrl ? /\.(mp4|webm|ogg)$/i.test(faq.videoUrl) : false;
                  const embedUrl = faq.videoUrl && !isLocalVideo ? toEmbedUrl(faq.videoUrl) : null;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                      data-testid={`faq-item-${faq.id}`}
                    >
                      <button
                        onClick={() => setOpenQuestion(isOpen ? null : faq.id)}
                        className="w-full text-left px-6 py-5 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                        data-testid={`button-faq-question-${faq.id}`}
                        aria-expanded={isOpen}
                      >
                        <h4 className="font-bold text-gray-900 pr-4">{faq.question}</h4>
                        <i
                          className={`ri-arrow-down-s-line text-2xl text-[#ad023b] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        ></i>
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6">
                          <p className="text-gray-600 leading-relaxed mb-4">{faq.answer.replace(/\*\*[^*]+\*\*/g, '').replace(/^[-•]\s/gm, '').replace(/\|[^\n]+\|/g, '').trim().slice(0, 400)}{faq.answer.length > 400 ? '...' : ''}</p>

                          {(embedUrl || isLocalVideo) && (
                            <div className="mt-4 rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                {isLocalVideo ? (
                                  <video
                                    src={faq.videoUrl!}
                                    controls
                                    playsInline
                                    preload="metadata"
                                    className="absolute inset-0 w-full h-full bg-black"
                                    data-testid={`video-faq-${faq.id}`}
                                  />
                                ) : (
                                  <iframe
                                    src={embedUrl!}
                                    title={faq.question}
                                    className="absolute inset-0 w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    loading="lazy"
                                    data-testid={`video-faq-${faq.id}`}
                                  ></iframe>
                                )}
                              </div>
                            </div>
                          )}

                          <a
                            href={`/preguntas/${faq.slug}`}
                            className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#ad023b] font-medium hover:underline"
                            data-testid={`link-faq-more-${faq.id}`}
                          >
                            Ver respuesta completa
                            <i className="ri-arrow-right-line text-xs" aria-hidden="true"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}

                {visibleFaqs.length === 0 && !isLoading && (
                  <div className="bg-white rounded-xl shadow p-8 text-center text-gray-400">
                    <i className="ri-question-line text-4xl mb-2 block" aria-hidden="true"></i>
                    <p>No hay preguntas destacadas en esta categoría</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿No encuentras la respuesta que buscas?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de expertos está disponible para resolver cualquier duda sobre movilidad eléctrica
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/preguntas"
              className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white px-8 py-3 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap"
              data-testid="button-faq-ver-todas"
            >
              <i className="ri-question-answer-line" aria-hidden="true"></i>
              Ver todas las preguntas
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-3 rounded-lg font-bold transition-colors cursor-pointer whitespace-nowrap"
              data-testid="button-faq-whatsapp"
            >
              <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
