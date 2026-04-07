"use client";
import { Link } from "../lib/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import Breadcrumbs from "../components/Breadcrumbs";
import AutoInternalLinks from "../components/AutoInternalLinks";
import { TrustBar } from "../components/EEATSignals";
import { generateProgrammaticPage, parseProgrammaticSlug } from "../lib/programmatic-seo";
import { SERVICE_DEFINITIONS, BRAND_NAMES } from "../lib/servicios-data";
import InlineFAQSection from "../components/InlineFAQSection";

interface ServicioLocalPageProps {
  slug: string;
}

export default function ServicioLocalPage({ slug }: ServicioLocalPageProps) {
  const parsed = parseProgrammaticSlug(slug);
  if (!parsed) {
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

  const page = generateProgrammaticPage(parsed.serviceSlug, parsed.brandSlug, parsed.citySlug);
  if (!page) return null;

  const serviceDef = SERVICE_DEFINITIONS[page.serviceSlug];
  const severityColors: Record<string, string> = {
    alta: "bg-red-100 text-red-800 border-red-200",
    media: "bg-amber-100 text-amber-800 border-amber-200",
    baja: "bg-green-100 text-green-800 border-green-200",
  };

  const otherCities = ["sevilla", "dos-hermanas", "huelva", "cordoba", "badajoz", "caceres"]
    .filter(c => c !== page.citySlug)
    .slice(0, 4);

  const otherServices = Object.entries(SERVICE_DEFINITIONS)
    .filter(([key]) => key !== page.serviceSlug)
    .slice(0, 4);

  const otherBrands = Object.entries(BRAND_NAMES)
    .filter(([key]) => key !== page.brandSlug)
    .slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid={`page-local-${slug}`}>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={`/servicios/${slug}`}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: "Servicios", href: "/postventa" },
          { name: page.serviceName, href: `/servicios/${page.serviceSlug}` },
          { name: `${page.serviceName} ${page.brandName}`, href: `/servicios/${page.serviceSlug}-${page.brandSlug}` },
        ]}
        currentPage={page.cityName}
      />
      <main role="main">

        <section
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden"
          aria-label={`${page.serviceName} ${page.brandName} en ${page.cityName}`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#ad023b]/20 text-[#ad023b] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#ad023b]/30">
                <i className={serviceDef?.icon || "ri-tools-line"} aria-hidden="true"></i>
                <span>{page.isOfficial ? "Taller Oficial" : "Taller Especializado"} · {page.cityName}</span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                data-testid="text-local-title"
              >
                {page.h1}
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {page.intro}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                  data-testid="link-pedir-cita"
                >
                  <i className="ri-calendar-check-line" aria-hidden="true"></i>
                  Solicitar cita en {page.cityName}
                </Link>
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  data-testid="link-phone"
                >
                  <i className="ri-phone-line" aria-hidden="true"></i>
                  955 034 600
                </a>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        <section className="py-16 bg-white" aria-label="Servicio">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="text-service-heading">
              {page.serviceSection.heading}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              {page.serviceSection.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50" aria-label="Marca">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="text-brand-heading">
              {page.brandSection.heading}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              {page.brandSection.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href={`/marcas/${page.brandSlug}`}
                className="inline-flex items-center gap-2 text-[#ad023b] font-semibold hover:text-[#8d0230] transition-colors"
                data-testid="link-brand-page"
              >
                Ver todo sobre {page.brandName}
                <i className="ri-arrow-right-line" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </section>

        {page.commonProblems.length > 0 && (
          <section className="py-16 bg-white" aria-label="Problemas comunes">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Problemas comunes en {page.brandName} eléctrico
              </h2>
              <p className="text-gray-600 mb-8">
                Incidencias frecuentes que diagnosticamos y resolvemos en nuestro taller de {page.cityName}
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {page.commonProblems.map((problem, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <i className={`${problem.icon} text-xl text-gray-700`} aria-hidden="true"></i>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{problem.title}</h3>
                        <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full border ${severityColors[problem.severity]}`}>
                          Prioridad {problem.severity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{problem.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.processSteps.length > 0 && (
          <section className="py-16 bg-gray-50" aria-label="Proceso de trabajo">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Nuestro proceso de {page.serviceName.toLowerCase()}
              </h2>
              <p className="text-gray-600 mb-10">
                Cómo trabajamos con tu {page.brandName} en {page.cityName}, paso a paso
              </p>
              <div className="space-y-6">
                {page.processSteps.map((step, i) => (
                  <div key={i} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#ad023b] text-white flex items-center justify-center font-bold text-lg">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{step.step}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.faqs.length > 0 && (
          <section className="py-16 bg-white" aria-label="Preguntas frecuentes">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <InlineFAQSection
                title={`Preguntas sobre ${page.serviceName.toLowerCase()} de ${page.brandName} en ${page.cityName}`}
                faqs={page.faqs}
                relatedLinks={[
                  { href: `/servicios/${page.serviceSlug}-${page.brandSlug}`, label: `${page.serviceName} ${page.brandName}` },
                  { href: `/marcas/${page.brandSlug}`, label: `Todo sobre ${page.brandName}` },
                  { href: `/taller-electricos-${page.citySlug}`, label: `Taller eléctricos ${page.cityName}` },
                  { href: "/preguntas", label: "Todas las preguntas frecuentes" },
                ]}
              />
            </div>
          </section>
        )}

        <section className="py-12 bg-gray-50" aria-label="Cobertura local">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {page.serviceName} {page.brandName} en otras ciudades
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {otherCities.map(citySlug => {
                const otherSlug = `${page.serviceSlug}-${page.brandSlug}-${citySlug}`;
                const cityName = ["sevilla", "dos-hermanas", "huelva", "cordoba", "badajoz", "caceres"]
                  .includes(citySlug)
                  ? { sevilla: "Sevilla", "dos-hermanas": "Dos Hermanas", huelva: "Huelva", cordoba: "Córdoba", badajoz: "Badajoz", caceres: "Cáceres" }[citySlug]
                  : citySlug;
                return (
                  <Link
                    key={citySlug}
                    href={`/servicios/${otherSlug}`}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-[#ad023b]/30 hover:shadow-sm transition-all group"
                    data-testid={`link-city-${citySlug}`}
                  >
                    <i className="ri-map-pin-line text-[#ad023b]" aria-hidden="true"></i>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#ad023b] transition-colors">
                      {page.serviceName} {page.brandName} {cityName}
                    </span>
                  </Link>
                );
              })}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Otros servicios para {page.brandName} en {page.cityName}
            </h3>
            <div className="flex flex-wrap gap-3 mb-10">
              {otherServices.map(([sSlug, sDef]) => (
                <Link
                  key={sSlug}
                  href={`/servicios/${sSlug}-${page.brandSlug}-${page.citySlug}`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors"
                  data-testid={`link-service-${sSlug}`}
                >
                  <i className={sDef.icon} aria-hidden="true"></i>
                  {sDef.title}
                </Link>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {page.serviceName} de otras marcas en {page.cityName}
            </h3>
            <div className="flex flex-wrap gap-3">
              {otherBrands.map(([bSlug, bName]) => (
                <Link
                  key={bSlug}
                  href={`/servicios/${page.serviceSlug}-${bSlug}-${page.citySlug}`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors"
                  data-testid={`link-brand-${bSlug}`}
                >
                  {bName}
                  <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {page.nearbyAreas.length > 0 && (
          <section className="py-10 bg-white" aria-label="Áreas cercanas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm text-gray-500">
                <i className="ri-map-pin-2-line mr-1" aria-hidden="true"></i>
                También damos servicio en zonas cercanas a {page.cityName}: {page.nearbyAreas.join(", ")}
              </p>
            </div>
          </section>
        )}

        <section className="py-12 bg-white" aria-label="Contenido relacionado">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AutoInternalLinks
              content={`${page.serviceName} ${page.brandName} eléctrico híbrido ${page.cityName} taller mantenimiento diagnóstico reparación garantía carga`}
              currentPath={`/servicios/${slug}`}
              maxLinks={5}
              preferEntityTypes={["brand", "service", "city"]}
              excludePaths={[`/servicios/${page.serviceSlug}`, `/servicios/${page.serviceSlug}-${page.brandSlug}`, `/marcas/${page.brandSlug}`]}
              heading="También te puede interesar"
            />
          </div>
        </section>

        <section className="py-16 bg-[#ad023b] text-white" aria-label="Solicitar servicio">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {page.ctaHeading}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {page.ctaText}
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
