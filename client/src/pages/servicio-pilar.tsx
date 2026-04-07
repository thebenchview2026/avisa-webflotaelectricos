"use client";
import { Link } from "@/lib/router";
import { useParams } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AutoLinkedText from "@/components/AutoLinkedText";
import AutoInternalLinks from "@/components/AutoInternalLinks";
import { getServicePillarData, getServiceBrands, getRelatedServices } from "@/lib/servicios-data";
import { BRAND_NAMES } from "@/lib/servicios-data";
import { TrustBar, WorkProcess, WhyChooseUs } from "@/components/EEATSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import InlineFAQSection from "@/components/InlineFAQSection";
import { getServicePillarFAQRelatedLinks } from "@/lib/faq-engine";
import ServiceAreaCoverage from "@/components/ServiceAreaCoverage";

interface ServicioPilarPageProps {
  slug?: string;
}

export default function ServicioPilarPage({ slug: propSlug }: ServicioPilarPageProps) {
  const routeParams = useParams() as { slug?: string };
  const slug = propSlug || routeParams.slug || "";

  const service = getServicePillarData(slug);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <i className="ri-error-warning-line text-6xl text-gray-300 mb-4 block" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Servicio no encontrado</h1>
            <p className="text-gray-600 mb-6">El servicio que buscas no está disponible.</p>
            <Link href="/postventa" className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8d0230] transition-colors" data-testid="link-volver-postventa">
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              Ver todos los servicios
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const brands = getServiceBrands(slug);
  const relatedServices = getRelatedServices(slug);
  const officialBrands = ["volkswagen", "audi", "skoda"];

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid={`page-servicio-pilar-${slug}`}>
      <SEOHead
        title={`${service.title} de Vehículos Eléctricos e Híbridos - Grupo Avisa`}
        description={`Servicio de ${service.title.toLowerCase()} para vehículos eléctricos e híbridos de todas las marcas. Técnicos certificados en Sevilla, Andalucía y Extremadura. Grupo Avisa.`}
        canonical={`/servicios/${slug}`}
      />
      <Navbar />
      <Breadcrumbs
        items={[{ name: "Servicios", href: "/postventa" }]}
        currentPage={service.title}
      />
      <main role="main">

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden" aria-label={service.title}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#ad023b] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-[#ad023b]/20 text-[#ad023b] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#ad023b]/30">
                <i className={service.icon} aria-hidden="true"></i>
                <span>Servicio especializado multimarca</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-servicio-pilar-title">
                {service.title} de{" "}
                <span className="text-[#ad023b]">Eléctricos e Híbridos en Sevilla</span>
              </h1>

              <AutoLinkedText
                text={service.pillarIntro}
                as="p"
                className="text-lg text-white/80 leading-relaxed mb-8"
                excludeUrls={[`/servicios/${slug}`, "/postventa"]}
                linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium"
                maxLinks={4}
              />

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                  data-testid="link-cita-servicio"
                >
                  <i className="ri-calendar-check-line" aria-hidden="true"></i>
                  Solicitar cita de {service.title.toLowerCase()}
                </Link>
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  data-testid="link-phone-servicio"
                >
                  <i className="ri-phone-line" aria-hidden="true"></i>
                  955 034 600
                </a>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        <WorkProcess />

        <section className="py-20 bg-white" aria-label={`${service.title} por marca`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-marcas-title">
                {service.title} por marca
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Selecciona tu marca para ver información específica del servicio de {service.title.toLowerCase()} para tu vehículo
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-award-line text-[#ad023b]" aria-hidden="true"></i>
                Marcas oficiales (concesionario autorizado)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {brands.filter(b => officialBrands.includes(b.brandSlug)).map((b) => (
                  <Link
                    key={b.brandSlug}
                    href={b.url}
                    className="bg-gray-50 rounded-md p-8 border-2 border-[#ad023b]/20 hover:border-[#ad023b] hover:shadow-lg transition-all group"
                    data-testid={`link-brand-official-${b.brandSlug}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/10 rounded-full">
                        <i className="ri-shield-check-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                      </div>
                      <span className="text-xs font-bold text-[#ad023b] uppercase tracking-wide">Oficial</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#ad023b] transition-colors">
                      {service.title} {b.brandName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Servicio oficial con técnicos certificados {b.brandName}, piezas originales y garantía del fabricante.
                    </p>
                    <span className="text-sm text-[#ad023b] font-medium flex items-center gap-1">
                      Ver detalles <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-car-line text-gray-500" aria-hidden="true"></i>
                Servicio multimarca
              </h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {brands.filter(b => !officialBrands.includes(b.brandSlug)).map((b) => (
                  <Link
                    key={b.brandSlug}
                    href={b.url}
                    className="bg-gray-50 rounded-md p-6 border border-gray-100 hover:border-[#ad023b]/30 hover:shadow-md transition-all group"
                    data-testid={`link-brand-multi-${b.brandSlug}`}
                  >
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#ad023b] transition-colors">
                      {b.brandName}
                    </h3>
                    <span className="text-xs text-gray-500">{service.title}</span>
                    <div className="mt-3">
                      <span className="text-sm text-[#ad023b] flex items-center gap-1">
                        Ver servicio <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <InlineFAQSection
          title={`Preguntas frecuentes sobre ${service.title.toLowerCase()} de eléctricos`}
          faqs={service.pillarFaqs}
          relatedLinks={getServicePillarFAQRelatedLinks(slug)}
          excludeUrls={[`/servicios/${slug}`]}
        />

        <section className="py-16 bg-white" aria-label="Servicios relacionados">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8" data-testid="text-related-services-title">
              Otros servicios de postventa
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {relatedServices.map((rs) => (
                <Link
                  key={rs.slug}
                  href={rs.url}
                  className="bg-gray-50 rounded-md p-6 border border-gray-100 hover:border-[#ad023b]/30 hover:shadow-lg transition-all group"
                  data-testid={`link-related-${rs.slug}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-4 group-hover:bg-[#ad023b]/20 transition-colors">
                    <i className={`${rs.icon} text-xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ad023b] transition-colors">{rs.title}</h3>
                  <span className="text-sm text-[#ad023b] flex items-center gap-1">
                    Ver servicio <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                  </span>
                </Link>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Explora por marca</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(BRAND_NAMES).map(([bSlug, bName]) => (
                  <Link
                    key={bSlug}
                    href={`/marcas/${bSlug}`}
                    className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors"
                    data-testid={`link-marca-${bSlug}`}
                  >
                    {bName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />

        <ServiceAreaCoverage />

        <section className="py-12 bg-white" aria-label="Contenido relacionado">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AutoInternalLinks
              content={`${service.title} eléctrico híbrido Volkswagen Audi Tesla BMW diagnóstico mantenimiento reparación Sevilla`}
              currentPath={`/servicios/${slug}`}
              maxLinks={5}
              preferEntityTypes={["brand", "service"]}
              heading="También te puede interesar"
            />
          </div>
        </section>

        <section className="py-16 bg-[#ad023b] text-white" aria-label="Solicitar servicio">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Necesitas {service.title.toLowerCase()} para tu eléctrico?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contacta con nuestro equipo de técnicos certificados en vehículos eléctricos e híbridos
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
