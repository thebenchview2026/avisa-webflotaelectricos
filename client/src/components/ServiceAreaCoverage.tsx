"use client";
import { Link } from "@/lib/router";
import { TRUST_METRICS } from "@/lib/entity-data";
import { SERVICE_CITIES } from "@/lib/local-seo";

interface ServiceAreaCoverageProps {
  currentCity?: string;
  compact?: boolean;
}

export default function ServiceAreaCoverage({ currentCity, compact = false }: ServiceAreaCoverageProps) {
  const cities = SERVICE_CITIES;
  const currentCityData = currentCity
    ? cities.find((c) => c.city.toLowerCase() === currentCity.toLowerCase())
    : null;

  if (compact) {
    return (
      <div className="bg-gray-50 rounded-md p-6 border border-gray-200" data-testid="section-service-area-compact">
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
          <i className="ri-map-pin-2-line text-[#ad023b]" aria-hidden="true"></i>
          Cobertura geográfica
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {TRUST_METRICS.serviceLocations} centros en {TRUST_METRICS.cities} ciudades de Andalucía y Extremadura.
          {currentCityData && ` Servicio a domicilio en un radio de ${currentCityData.radiusKm} km desde ${currentCityData.city}.`}
        </p>
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/taller-electricos-${city.slug}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                currentCity && city.city.toLowerCase() === currentCity.toLowerCase()
                  ? "bg-[#ad023b] text-white border-[#ad023b]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#ad023b]/30 hover:text-[#ad023b]"
              }`}
              data-testid={`link-city-${city.slug}`}
            >
              <i className="ri-map-pin-line" aria-hidden="true"></i>
              {city.city}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200" aria-label="Área de servicio" data-testid="section-service-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3" data-testid="text-service-area-title">
            Cobertura en Andalucía y Extremadura
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {TRUST_METRICS.serviceLocations} centros de servicio en {TRUST_METRICS.cities} ciudades. Recogida y entrega de vehículo a domicilio en un radio de 30 km.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/taller-electricos-${city.slug}`}
              className="flex items-center gap-4 bg-white p-4 rounded-md border border-gray-200 hover:border-[#ad023b]/30 hover:shadow-sm transition-all group"
              data-testid={`link-city-area-${city.slug}`}
            >
              <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/10 rounded-full flex-shrink-0 group-hover:bg-[#ad023b]/20 transition-colors">
                <i className="ri-map-pin-2-line text-lg text-[#ad023b]" aria-hidden="true"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 group-hover:text-[#ad023b] transition-colors">{city.city}</div>
                <div className="text-xs text-gray-500">{city.region} · Radio {city.radiusKm} km</div>
              </div>
              <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-[#ad023b] transition-colors" aria-hidden="true"></i>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-white p-4 rounded-md border border-gray-200">
            <i className="ri-truck-line text-xl text-[#ad023b]" aria-hidden="true"></i>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Recogida a domicilio</div>
              <div className="text-xs text-gray-500">Servicio gratuito en zona urbana</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-md border border-gray-200">
            <i className="ri-car-washing-line text-xl text-[#ad023b]" aria-hidden="true"></i>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Vehículo de sustitución</div>
              <div className="text-xs text-gray-500">Disponible previa reserva</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-md border border-gray-200">
            <i className="ri-customer-service-line text-xl text-[#ad023b]" aria-hidden="true"></i>
            <div>
              <div className="font-semibold text-gray-900 text-sm">Asistencia en carretera</div>
              <div className="text-xs text-gray-500">24h para clientes de taller</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
