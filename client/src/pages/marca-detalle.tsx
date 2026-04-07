"use client";
import { Link } from "@/lib/router";
import { useParams } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AutoLinkedText from "@/components/AutoLinkedText";
import AutoInternalLinks from "@/components/AutoInternalLinks";
import { getBrandPillarData, getBrandServices, getRelatedBrands } from "@/lib/marcas-data";
import { SERVICE_DEFINITIONS } from "@/lib/servicios-data";
import { TrustBar, WorkProcess } from "@/components/EEATSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import InlineFAQSection from "@/components/InlineFAQSection";
import { getBrandFAQRelatedLinks, getEnhancedBrandFaqs } from "@/lib/faq-engine";
import ServiceAreaCoverage from "@/components/ServiceAreaCoverage";

interface MarcaDetallePageProps {
  slug?: string;
}

export default function MarcaDetallePage({ slug: propSlug }: MarcaDetallePageProps) {
  const routeParams = useParams() as { slug?: string };
  const slug = propSlug || routeParams.slug || "";

  const brand = getBrandPillarData(slug);

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <i className="ri-error-warning-line text-6xl text-gray-300 mb-4 block" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Marca no encontrada</h1>
            <p className="text-gray-600 mb-6">La marca que buscas no está disponible.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8d0230] transition-colors" data-testid="link-volver-inicio">
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const services = getBrandServices(slug);
  const relatedBrands = getRelatedBrands(slug, 6);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid={`page-marca-${slug}`}>
      <SEOHead
        title={`${brand.name} Eléctrico e Híbrido - Taller Oficial Sevilla | Grupo Avisa`}
        description={`${brand.tagline}. Reparación, mantenimiento, diagnóstico, carga y garantía para ${brand.name} eléctrico e híbrido. Técnicos certificados en Sevilla.`}
        canonical={`/marcas/${slug}`}
      />
      <Navbar />
      <Breadcrumbs
        items={[{ name: "Marcas", href: "/postventa" }]}
        currentPage={brand.name}
      />
      <main role="main">

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden" aria-label={`${brand.name} eléctrico e híbrido`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ad023b] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-[#ad023b]/20 text-[#ad023b] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#ad023b]/30">
                <i className="ri-car-line" aria-hidden="true"></i>
                <span>{brand.dealers.length > 0 ? "Concesionario oficial" : "Servicio multimarca"}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-marca-title">
                {brand.name}{" "}
                <span className="text-[#ad023b]">Eléctrico e Híbrido en Sevilla</span>
              </h1>

              <AutoLinkedText
                text={brand.intro}
                as="p"
                className="text-lg text-white/80 leading-relaxed mb-8"
                excludeUrls={[`/marcas/${slug}`]}
                linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium"
                maxLinks={4}
              />

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                  data-testid="link-cita-marca"
                >
                  <i className="ri-calendar-check-line" aria-hidden="true"></i>
                  Solicitar cita para {brand.name}
                </Link>
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  data-testid="link-phone-marca"
                >
                  <i className="ri-phone-line" aria-hidden="true"></i>
                  955 034 600
                </a>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        <section className="py-20 bg-white" aria-label={`Ventajas de ${brand.name} en Grupo Avisa`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-highlights-title">
                ¿Por qué {brand.name} en Grupo Avisa?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {brand.tagline}. Servicio completo de postventa para vehículos eléctricos e híbridos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {brand.highlights.map((h, i) => (
                <div key={i} className="bg-gray-50 rounded-md p-6 hover:shadow-lg transition-shadow border border-gray-100" data-testid={`card-highlight-${i}`}>
                  <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-4">
                    <i className={`${h.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {brand.electricModels.length > 0 && (
          <section className="py-16 bg-gray-50" aria-label={`Modelos eléctricos ${brand.name}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center" data-testid="text-modelos-title">
                Modelos eléctricos e híbridos {brand.name}
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {brand.electricModels.map((model, i) => (
                  <span key={i} className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm" data-testid={`badge-model-${i}`}>
                    <i className="ri-car-line text-[#ad023b]" aria-hidden="true"></i>
                    {brand.name} {model}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-white" aria-label={`Servicios para ${brand.name}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-servicios-title">
                Servicios para {brand.name} eléctrico e híbrido
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Todos los servicios de postventa que necesitas para tu {brand.name} en un solo lugar
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc) => (
                <Link
                  key={svc.serviceSlug}
                  href={svc.url}
                  className="bg-gray-50 rounded-md p-8 border border-gray-100 hover:border-[#ad023b]/30 hover:shadow-lg transition-all group"
                  data-testid={`link-servicio-${svc.serviceSlug}`}
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-6 group-hover:bg-[#ad023b]/20 transition-colors">
                    <i className={`${svc.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#ad023b] transition-colors">
                    {svc.title} {brand.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{svc.description}</p>
                  <span className="text-sm text-[#ad023b] font-medium flex items-center gap-1">
                    Ver servicio <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <WorkProcess />

        {brand.dealers.length > 0 && (
          <section className="py-16 bg-gray-900 text-white" aria-label={`Concesionarios ${brand.name}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-8" data-testid="text-dealers-title">
                Concesionarios {brand.name} del grupo
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {brand.dealers.map((dealer, i) => (
                  <div key={i} className="bg-white/10 rounded-md p-6 backdrop-blur-sm border border-white/10" data-testid={`card-dealer-${i}`}>
                    <i className="ri-building-line text-2xl text-[#ad023b] mb-3 block" aria-hidden="true"></i>
                    <h3 className="font-bold text-lg mb-2">{dealer}</h3>
                    <Link href="/concesionarios" className="text-sm text-[#ad023b] hover:underline">
                      Ver ubicación y contacto
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <InlineFAQSection
          title={`Preguntas frecuentes sobre ${brand.name} eléctrico`}
          faqs={(() => {
            const enhanced = getEnhancedBrandFaqs(slug);
            return enhanced.length > 0 ? enhanced : brand.faqs;
          })()}
          relatedLinks={getBrandFAQRelatedLinks(slug)}
          excludeUrls={[`/marcas/${slug}`]}
          bgClass="bg-white"
        />

        <section className="py-16 bg-gray-50" aria-label="Otras marcas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8" data-testid="text-related-brands-title">
              Servicio para otras marcas
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {relatedBrands.map((rb) => (
                <Link
                  key={rb.slug}
                  href={`/marcas/${rb.slug}`}
                  className="bg-white rounded-md p-4 text-center border border-gray-200 hover:border-[#ad023b]/30 hover:shadow-md transition-all group"
                  data-testid={`link-brand-${rb.slug}`}
                >
                  <span className="font-bold text-gray-900 group-hover:text-[#ad023b] transition-colors">{rb.name}</span>
                  <span className="block text-xs text-gray-500 mt-1">Ver servicios</span>
                </Link>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Enlace rápido a servicios</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(SERVICE_DEFINITIONS).map(([svcSlug, svcDef]) => (
                  <Link
                    key={svcSlug}
                    href={`/servicios/${svcSlug}`}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors"
                    data-testid={`link-service-pillar-${svcSlug}`}
                  >
                    <i className={svcDef.icon} aria-hidden="true"></i>
                    {svcDef.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ServiceAreaCoverage />

        <section className="py-12 bg-white" aria-label="Contenido relacionado">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AutoInternalLinks
              content={`${brand.name} eléctrico híbrido mantenimiento diagnóstico reparación garantía punto de carga Sevilla taller`}
              currentPath={`/marcas/${slug}`}
              maxLinks={5}
              preferEntityTypes={["service", "brand"]}
              heading="También te puede interesar"
            />
          </div>
        </section>

        <section className="py-16 bg-[#ad023b] text-white" aria-label="Solicitar servicio">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas servicio para tu {brand.name}?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Nuestro equipo especializado en {brand.name} eléctrico te atiende de lunes a viernes de 8:30 a 20:00
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/concesionarios"
                className="inline-flex items-center gap-2 bg-white text-[#ad023b] px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors"
                data-testid="link-cta-cita"
              >
                <i className="ri-calendar-check-line" aria-hidden="true"></i>
                Solicitar cita
              </Link>
              <a
                href="https://wa.me/34621261541"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-md font-bold hover:bg-green-700 transition-colors"
                data-testid="link-cta-whatsapp"
              >
                <i className="ri-whatsapp-line" aria-hidden="true"></i>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
