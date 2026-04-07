"use client";
import { Link } from "@/lib/router";
import { useParams } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { getCityLandingData, SERVICES_OFFERED, getCityBySlug } from "@/lib/local-seo";
import { TRUST_METRICS } from "@/lib/entity-data";
import { TrustBar } from "@/components/EEATSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import ServiceAreaCoverage from "@/components/ServiceAreaCoverage";

interface TallerLocalPageProps {
  ciudad?: string;
}

export default function TallerLocalPage({ ciudad: propCiudad }: TallerLocalPageProps) {
  const routeParams = useParams() as { ciudad?: string };
  const ciudad = propCiudad || routeParams.ciudad || "";

  const data = getCityLandingData(ciudad);
  const cityInfo = getCityBySlug(ciudad);

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <i className="ri-error-warning-line text-6xl text-gray-300 mb-4 block" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Ciudad no encontrada</h1>
            <p className="text-gray-600 mb-6">No tenemos información para esta localización.</p>
            <Link href="/concesionarios" className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-md font-medium hover:bg-[#8d0230] transition-colors" data-testid="link-volver-concesionarios">
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              Ver concesionarios
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid={`page-taller-${ciudad}`}>
      <SEOHead
        title={data.metaTitle}
        description={data.metaDescription}
        canonical={`/taller-electricos-${ciudad}`}
      />
      <Navbar />
      <Breadcrumbs
        items={[{ name: "Concesionarios", href: "/concesionarios" }]}
        currentPage={`Taller ${data.city}`}
      />
      <main role="main">

        <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 overflow-hidden" aria-label={data.h1}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 bg-[#ad023b] rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#ad023b] rounded-full blur-3xl"></div>
          </div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-[#ad023b]/20 text-[#ad023b] px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#ad023b]/30">
                <i className="ri-map-pin-2-line" aria-hidden="true"></i>
                <span>{data.city}, {data.region}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" data-testid="text-taller-local-title">
                {data.h1.split(data.city)[0]}
                <span className="text-[#ad023b]">{data.city}</span>
              </h1>

              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {data.intro}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                  data-testid="link-phone-local"
                >
                  <i className="ri-phone-line" aria-hidden="true"></i>
                  955 034 600
                </a>
                <a
                  href="https://wa.me/34621261541"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-md font-bold hover:bg-green-700 transition-colors"
                  data-testid="link-whatsapp-local"
                >
                  <i className="ri-whatsapp-line" aria-hidden="true"></i>
                  WhatsApp
                </a>
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
                  data-testid="link-cita-local"
                >
                  <i className="ri-calendar-check-line" aria-hidden="true"></i>
                  Solicitar cita
                </Link>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {data.dealers.length > 0 && (
          <section className="py-16 bg-white" aria-label={`Centros de servicio en ${data.city}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center" data-testid="text-dealers-title">
                {data.dealers.length > 1 ? "Nuestros centros" : "Nuestro centro"} en {data.city}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.dealers.map((dealer) => (
                  <article
                    key={dealer.id}
                    className="bg-gray-50 rounded-md p-6 border border-gray-200 hover:shadow-md transition-shadow"
                    data-testid={`card-dealer-${dealer.id}`}
                    itemScope
                    itemType="https://schema.org/AutoDealer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-full flex-shrink-0">
                        <i className="ri-building-2-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1" itemProp="name">{dealer.name}</h3>
                        <p className="text-sm text-gray-600 mb-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                          <span itemProp="streetAddress">{dealer.street}</span>,{" "}
                          <span itemProp="postalCode">{dealer.postal}</span>{" "}
                          <span itemProp="addressLocality">{dealer.locality}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {dealer.brands.map((brand) => (
                            <span key={brand} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#ad023b]/10 text-[#ad023b]">
                              {brand}
                            </span>
                          ))}
                        </div>
                        <a
                          href="tel:+34955034600"
                          className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#ad023b] hover:text-[#8d0230] font-medium transition-colors"
                          itemProp="telephone"
                          data-testid={`link-phone-dealer-${dealer.id}`}
                        >
                          <i className="ri-phone-line" aria-hidden="true"></i>
                          955 034 600
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-50" aria-label="Servicios disponibles">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center" data-testid="text-services-title">
              Servicios para eléctricos e híbridos en {data.city}
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Todos los servicios postventa que necesita tu vehículo eléctrico o híbrido enchufable, con técnicos certificados en alta tensión.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_OFFERED.map((service) => (
                <Link
                  key={service.slug}
                  href={`/servicios/${service.slug}`}
                  className="bg-white rounded-md p-6 border border-gray-200 hover:border-[#ad023b]/30 hover:shadow-md transition-all group"
                  data-testid={`link-service-${service.slug}`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-4 group-hover:bg-[#ad023b]/20 transition-colors">
                    <i className={`${service.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-[#ad023b] transition-colors">
                    {service.name} en {data.city}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {cityInfo && cityInfo.nearbyAreas.length > 0 && (
          <section className="py-16 bg-white" aria-label="Zonas cercanas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center" data-testid="text-nearby-title">
                También damos servicio en los alrededores de {data.city}
              </h2>
              <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                Recogemos y entregamos tu vehículo a domicilio en un radio de {cityInfo.radiusKm} km desde nuestro centro en {data.city}.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {cityInfo.nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-700"
                  >
                    <i className="ri-map-pin-line text-[#ad023b]" aria-hidden="true"></i>
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-gray-900 text-white" aria-label="Contacto local">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" data-testid="text-cta-title">
              ¿Necesitas un taller eléctrico en {data.city}?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Contacta con nosotros para presupuesto sin compromiso. Más de {TRUST_METRICS.yearsExperience} años de experiencia en vehículos eléctricos.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+34955034600"
                className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors"
                data-testid="link-phone-cta"
              >
                <i className="ri-phone-line" aria-hidden="true"></i>
                Llamar: 955 034 600
              </a>
              <a
                href="mailto:info@grupoavisa.com"
                className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-colors border border-white/20"
                data-testid="link-email-cta"
              >
                <i className="ri-mail-line" aria-hidden="true"></i>
                info@grupoavisa.com
              </a>
            </div>
            <p className="mt-6 text-sm text-white/50">
              Horario: Lunes a viernes 9:00 – 20:00 | Sábados 10:00 – 14:00
            </p>
          </div>
        </section>

        <ServiceAreaCoverage currentCity={data.city} />

      </main>
      <Footer />
    </div>
  );
}
