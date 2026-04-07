"use client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/lib/router";
import type { Vehicle, Brand } from "@shared/schema";

export default function ElectricPromotions() {
  const { data: allVehicles = [] } = useQuery<Vehicle[]>({ queryKey: ["/api/vehicles/featured"] });
  const { data: brands = [] } = useQuery<Brand[]>({ queryKey: ["/api/brands"] });

  const vehicles = allVehicles.filter(v => (v.vehicleType || "electrico") === "electrico");

  if (vehicles.length === 0) return null;

  return (
    <section id="promociones-electricos" className="py-12 sm:py-24 bg-gradient-to-br from-slate-50 to-white" data-testid="section-electric-promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#ad023b]/10 text-[#ad023b] text-sm font-bold rounded-full mb-4">
            Promociones activas
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-electric-title">
            Ofertas en vehículos eléctricos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Aprovecha nuestras mejores ofertas en vehículos 100% eléctricos con Plan MOVES incluido
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {vehicles.slice(0, 6).map((vehicle) => {
            const brand = brands.find(b => b.id === vehicle.brandId);
            return (
              <Link key={vehicle.id} href={`/vehiculos/electricos/${vehicle.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer" data-testid={`card-electric-${vehicle.id}`}>
                  <div className="relative">
                    <div className="w-full h-36 sm:h-48 bg-slate-100">
                      {vehicle.imageUrl ? (
                        <img
                          alt={`${brand?.name || ""} ${vehicle.model}`}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          src={vehicle.imageUrl}
                          width={400}
                          height={192}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <i className="ri-car-line text-5xl"></i>
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#ad023b] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-flashlight-line mr-1"></i>100% Eléctrico
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                        {brand?.name || ""}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                        {vehicle.model}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          {vehicle.rangeKm} km autonomía
                        </span>
                        <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                          {vehicle.powerHp} CV
                        </span>
                      </div>
                    </div>

                    <div className="flex items-end justify-between mb-5 mt-auto">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{vehicle.price?.toLocaleString("es-ES")} €</div>
                        <div className="text-xs text-gray-500">P.V.P. recomendado</div>
                      </div>
                      <div className="text-right text-xs text-gray-600">{vehicle.bodyType}</div>
                    </div>

                    <span
                      className="block w-full bg-slate-900 text-white text-center py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors whitespace-nowrap"
                      data-testid={`button-solicitar-electric-${vehicle.id}`}
                    >
                      Ver oferta
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/promociones-electricos">
            <span
              className="inline-flex items-center gap-2 text-slate-900 font-bold hover:gap-4 transition-all cursor-pointer"
              data-testid="link-ver-todas-promociones"
            >
              Ver todas las promociones eléctricas
              <i className="ri-arrow-right-line text-xl"></i>
            </span>
          </Link>
        </div>

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-xl text-amber-600"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Promociones sujetas a disponibilidad</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                Los precios mostrados incluyen IVA y pueden variar según configuración. Consulta condiciones específicas y disponibilidad de stock. Plan MOVES sujeto a aprobación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
