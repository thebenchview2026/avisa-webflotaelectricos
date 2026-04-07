"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AutoLinkedText from "@/components/AutoLinkedText";
import AutoInternalLinks from "@/components/AutoInternalLinks";
import { useParams } from "@/lib/router";
import { SERVICE_DEFINITIONS, BRAND_NAMES, getServiceBrandData } from "@/lib/servicios-data";
import { getUniquePageContent } from "@/lib/content-engine";
import { TrustBar } from "@/components/EEATSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import InlineFAQSection from "@/components/InlineFAQSection";
import ServiceAreaCoverage from "@/components/ServiceAreaCoverage";
import { getServiceBrandFAQRelatedLinks, getMultiLayerFaqs } from "@/lib/faq-engine";

const SEVERITY_COLORS: { [key: string]: string } = {
  alta: "bg-red-100 text-red-800 border-red-200",
  media: "bg-amber-100 text-amber-800 border-amber-200",
  baja: "bg-green-100 text-green-800 border-green-200",
};

interface ServicioMarcaPageProps {
  slug?: string;
}

export default function ServicioMarcaPage({ slug: propSlug }: ServicioMarcaPageProps) {
  const routeParams = useParams() as { slug?: string };
  const slug = propSlug || routeParams.slug || "";

  const data = getServiceBrandData(slug);

  if (!data) {
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

  const { serviceSlug, serviceDef, brandSlug, brandName } = data;
  const uniqueContent = getUniquePageContent(serviceSlug, brandSlug);
  const faqs = serviceDef.faqs(brandName);
  const multiLayerFaqs = getMultiLayerFaqs(serviceSlug, brandSlug);
  const processSteps = serviceDef.process(brandName);
  const relatedServices = Object.entries(SERVICE_DEFINITIONS)
    .filter((entry) => entry[0] !== serviceSlug)
    .slice(0, 3);
  const allBrandsForService = Object.entries(BRAND_NAMES)
    .filter((entry) => entry[0] !== brandSlug);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid={"page-servicio-" + slug}>
      <SEOHead
        title={uniqueContent?.metaTitle || `${serviceDef.title} ${brandName} - Servicio Oficial en Sevilla`}
        description={uniqueContent?.metaDescription || `${serviceDef.title} oficial para ${brandName} eléctrico e híbrido en Sevilla. Técnicos certificados, repuestos originales y garantía oficial. Pide cita en Grupo Avisa.`}
        canonical={`/servicios/${slug}`}
      />
      <Navbar />
      <Breadcrumbs
        items={[
          { name: "Servicios", href: "/postventa" },
          { name: serviceDef.title, href: `/servicios/${serviceSlug}` },
        ]}
        currentPage={`${serviceDef.title} ${brandName}`}
      />
      <main role="main">

        <section
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden"
          aria-label={`${serviceDef.title} para ${brandName}`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#ad023b]/20 text-[#ad023b] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#ad023b]/30">
                  <i className={serviceDef.icon} aria-hidden="true"></i>
                  <span>Servicio oficial certificado</span>
                </div>

                <h1
                  className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                  data-testid="text-servicio-title"
                >
                  {uniqueContent?.h1 || `${serviceDef.title} ${brandName} Eléctrico en Sevilla`}
                </h1>

                <AutoLinkedText
                  text={uniqueContent?.introParagraph || serviceDef.intro(brandName)}
                  as="p"
                  className="text-lg text-white/80 leading-relaxed mb-8"
                  excludeUrls={[`/servicios/${slug}`, "/postventa"]}
                  linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium"
                  maxLinks={3}
                />

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/concesionarios"
                    className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                    data-testid="link-pedir-cita"
                  >
                    <i className="ri-calendar-check-line" aria-hidden="true"></i>
                    {serviceDef.cta(brandName)}
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
              <div className="hidden lg:block">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=560&h=400&fit=crop&auto=format&q=80"
                  alt={`${serviceDef.title} de ${brandName} en Grupo Avisa`}
                  className="rounded-md shadow-2xl w-full object-cover"
                  width={560}
                  height={400}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {uniqueContent && (
          <section className="py-20 bg-white" aria-label={`Especialización en ${brandName}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8" data-testid="text-specialization-title">
                    {uniqueContent.specialization.heading}
                  </h2>
                  <div className="space-y-4">
                    {uniqueContent.specialization.paragraphs.map((paragraph, index) => (
                      <AutoLinkedText
                        key={index}
                        text={paragraph}
                        as="p"
                        className="text-gray-600 leading-relaxed text-lg"
                        excludeUrls={[`/servicios/${slug}`]}
                        maxLinks={2}
                      />
                    ))}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="bg-gray-50 rounded-md p-8 border border-gray-200 sticky top-32">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <i className="ri-cpu-line text-[#ad023b]" aria-hidden="true"></i>
                      Datos técnicos {brandName}
                    </h3>
                    <div className="space-y-4">
                      {uniqueContent.specialization.techHighlights.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 pb-3 last:border-0 last:pb-0" data-testid={`tech-highlight-${index}`}>
                          <span className="text-xs font-bold text-[#ad023b] uppercase tracking-wide block mb-1">{item.label}</span>
                          <span className="text-sm text-gray-700 font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {uniqueContent && uniqueContent.commonProblems.length > 0 && (
          <section className="py-20 bg-gray-50" aria-label={`Problemas comunes de ${brandName} eléctrico`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-problems-title">
                  Problemas frecuentes en {serviceDef.title.toLowerCase()} de {brandName} eléctrico
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Estos son los problemas más habituales que resolvemos en nuestro taller para {brandName} eléctrico. Nuestros técnicos están preparados para cada uno de ellos.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {uniqueContent.commonProblems.map((problem, index) => (
                  <article
                    key={index}
                    className="bg-white rounded-md p-8 border border-gray-200 hover:shadow-lg transition-shadow"
                    data-testid={`card-problem-${index}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md">
                        <i className={`${problem.icon} text-xl text-[#ad023b]`} aria-hidden="true"></i>
                      </div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${SEVERITY_COLORS[problem.severity]}`}>
                        {problem.severity === "alta" ? "Prioridad alta" : problem.severity === "media" ? "Prioridad media" : "Prioridad baja"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{problem.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{problem.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-20 bg-white" aria-label={`Ventajas del servicio de ${serviceDef.title.toLowerCase()} ${brandName}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-ventajas-title">
                ¿Por qué elegir Grupo Avisa para tu {brandName}?
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Somos taller oficial con más de 15 años de experiencia en la red {brandName}. Técnicos certificados, equipamiento oficial y compromiso con la calidad.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceDef.benefits(brandName).map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-md p-8 hover:shadow-lg transition-shadow border border-gray-100"
                  data-testid={`card-benefit-${index}`}
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-6">
                    <i className={`${benefit.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {uniqueContent && (
          <section className="py-20 bg-gray-900 text-white" aria-label={`Tecnología ${brandName}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-tech-title">
                  {uniqueContent.technologySection.heading}
                </h2>
                <p className="text-lg text-white/70 max-w-3xl mx-auto">
                  {uniqueContent.technologySection.intro}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {uniqueContent.technologySection.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-md p-6 border border-white/10 backdrop-blur-sm"
                    data-testid={`tech-spec-${index}`}
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/20 rounded-md mb-4">
                      <i className={`${spec.icon} text-lg text-[#ad023b]`} aria-hidden="true"></i>
                    </div>
                    <span className="text-xs font-bold text-[#ad023b] uppercase tracking-wide block mb-2">{spec.label}</span>
                    <p className="text-sm text-white/80 leading-relaxed">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className={`py-20 ${uniqueContent ? "bg-white" : "bg-gray-900 text-white"}`} aria-label={`Proceso de ${serviceDef.title.toLowerCase()} ${brandName}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${uniqueContent ? "text-gray-900" : ""}`} data-testid="text-proceso-title">
                Proceso de {serviceDef.title.toLowerCase()} paso a paso
              </h2>
              <p className={`text-lg ${uniqueContent ? "text-gray-600" : "text-white/70"}`}>
                Te explicamos cómo funciona nuestro servicio de {serviceDef.title.toLowerCase()} para {brandName}
              </p>
            </div>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <div key={index} className="flex gap-6" data-testid={`step-${index}`}>
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 flex items-center justify-center bg-[#ad023b] rounded-full text-xl font-bold ${uniqueContent ? "text-white" : ""}`}>
                      {index + 1}
                    </div>
                    {index < processSteps.length - 1 && (
                      <div className="w-0.5 h-full bg-[#ad023b]/30 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className={`text-xl font-bold mb-2 ${uniqueContent ? "text-gray-900" : ""}`}>{step.step}</h3>
                    <p className={`leading-relaxed ${uniqueContent ? "text-gray-600" : "text-white/70"}`}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InlineFAQSection
          title={`Preguntas frecuentes sobre ${serviceDef.title.toLowerCase()} ${brandName}`}
          faqs={faqs}
          sections={multiLayerFaqs.sections.length > 0 ? [
            ...(uniqueContent && uniqueContent.uniqueFaqs.length > 0
              ? [{ title: `Preguntas técnicas sobre ${brandName} eléctrico`, icon: "ri-cpu-line", faqs: uniqueContent.uniqueFaqs }]
              : []),
            ...multiLayerFaqs.sections,
          ] : undefined}
          relatedLinks={getServiceBrandFAQRelatedLinks(serviceSlug, brandSlug)}
          excludeUrls={[`/servicios/${slug}`]}
        />

        <section className="py-16 bg-white" aria-label="Navegación de pilares">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Link
                href={`/servicios/${serviceSlug}`}
                className="bg-gray-50 rounded-md p-8 border-2 border-[#ad023b]/20 hover:border-[#ad023b] hover:shadow-lg transition-all group"
                data-testid="link-pillar-servicio"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md">
                    <i className={`${serviceDef.icon} text-xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <span className="text-xs font-bold text-[#ad023b] uppercase tracking-wide">Página pilar de servicio</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ad023b] transition-colors mb-2">
                  {serviceDef.title} para todas las marcas
                </h3>
                <p className="text-gray-600 text-sm">Ver todas las marcas disponibles para {serviceDef.title.toLowerCase()}</p>
              </Link>

              <Link
                href={`/marcas/${brandSlug}`}
                className="bg-gray-50 rounded-md p-8 border-2 border-[#ad023b]/20 hover:border-[#ad023b] hover:shadow-lg transition-all group"
                data-testid="link-pillar-marca"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md">
                    <i className="ri-car-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                  </div>
                  <span className="text-xs font-bold text-[#ad023b] uppercase tracking-wide">Página pilar de marca</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ad023b] transition-colors mb-2">
                  Todos los servicios para {brandName}
                </h3>
                <p className="text-gray-600 text-sm">Ver todos los servicios disponibles para {brandName}</p>
              </Link>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-8" data-testid="text-related-title">
              Otros servicios para {brandName}
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {relatedServices.map(([key, def]) => (
                <Link
                  key={key}
                  href={`/servicios/${key}-${brandSlug}`}
                  className="bg-gray-50 rounded-md p-6 border border-gray-200 hover:border-[#ad023b]/30 hover:shadow-lg transition-all group"
                  data-testid={`link-related-${key}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-4 group-hover:bg-[#ad023b]/20 transition-colors">
                    <i className={`${def.icon} text-xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ad023b] transition-colors">
                    {def.title} {brandName}
                  </h3>
                  <span className="text-sm text-[#ad023b] flex items-center gap-1">
                    Ver servicio <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform" aria-hidden="true"></i>
                  </span>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {serviceDef.title} para otras marcas
            </h2>
            <div className="flex flex-wrap gap-3">
              {allBrandsForService.map(([key, name]) => (
                <Link
                  key={key}
                  href={`/servicios/${serviceSlug}-${key}`}
                  className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors"
                  data-testid={`link-brand-${key}`}
                >
                  {name}
                  <i className="ri-arrow-right-s-line" aria-hidden="true"></i>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-white" aria-label="Contenido relacionado">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AutoInternalLinks
              content={`${serviceDef.title} ${brandName} eléctrico híbrido mantenimiento diagnóstico reparación garantía punto de carga Sevilla concesionario`}
              currentPath={`/servicios/${slug}`}
              maxLinks={5}
              preferEntityTypes={["brand", "service"]}
              excludePaths={[`/servicios/${serviceSlug}`]}
              heading="También te puede interesar"
            />
          </div>
        </section>

        <section className="py-16 bg-[#ad023b] text-white" aria-label="Solicitar servicio">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {uniqueContent?.ctaHeading || `¿Necesitas ${serviceDef.title.toLowerCase()} para tu ${brandName}?`}
            </h2>
            <p className="text-xl text-white/90 mb-8">
              {uniqueContent?.ctaSubheading || "Contacta con nuestro equipo especializado y recibe atención personalizada"}
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
