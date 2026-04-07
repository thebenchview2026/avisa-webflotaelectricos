"use client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/lib/router";
import type { Vehicle, Brand } from "@shared/schema";

export default function HybridPromotions() {
  const { data: allVehicles = [] } = useQuery<Vehicle[]>({ queryKey: ["/api/vehicles/featured"] });
  const { data: brands = [] } = useQuery<Brand[]>({ queryKey: ["/api/brands"] });

  const vehicles = allVehicles.filter(v => (v.vehicleType || "electrico") === "hibrido");

  if (vehicles.length === 0) return null;

  return (
    <section id="promociones-hibridos" className="py-12 sm:py-20 bg-white" data-testid="section-hybrid-promotions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-4">
            Híbridos enchufables
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-hybrid-title">
            Promociones híbridos enchufables
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lo mejor de dos mundos: conducción eléctrica en ciudad y autonomía ilimitada en carretera
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {vehicles.slice(0, 6).map((vehicle) => {
            const brand = brands.find(b => b.id === vehicle.brandId);
            return (
              <Link key={vehicle.id} href={`/vehiculos/hibridos/${vehicle.slug}`}>
                <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col border border-gray-100 cursor-pointer" data-testid={`card-hybrid-${vehicle.id}`}>
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
                    <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <i className="ri-leaf-line mr-1"></i>Híbrido
                    </div>
                    {vehicle.rangeKm > 0 && (
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900">
                        {vehicle.rangeKm} km eléctricos
                      </div>
                    )}
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
                        <span className="inline-block px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          Híbrido Enchufable
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
                      className="block w-full bg-green-600 text-white text-center py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors whitespace-nowrap"
                      data-testid={`button-solicitar-hybrid-${vehicle.id}`}
                    >
                      Ver oferta
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <Link href="/promociones-hibridos">
            <span
              className="inline-flex items-center gap-2 text-slate-900 font-bold hover:gap-4 transition-all cursor-pointer"
              data-testid="link-ver-todas-hibridos"
            >
              Ver todas las promociones híbridas
              <i className="ri-arrow-right-line text-xl"></i>
            </span>
          </Link>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                ¿Por qué elegir un híbrido enchufable?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Cero emisiones en ciudad</p>
                    <p className="text-sm text-gray-600">Hasta 75 km en modo 100% eléctrico</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Sin ansiedad de autonomía</p>
                    <p className="text-sm text-gray-600">Motor de combustión para viajes largos</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Etiqueta ECO de la DGT</p>
                    <p className="text-sm text-gray-600">Acceso a zonas restringidas y ventajas fiscales</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ventajas adicionales
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ahorro de hasta 70% en combustible</p>
                    <p className="text-sm text-gray-600">En uso urbano y periurbano</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Carga en casa o trabajo</p>
                    <p className="text-sm text-gray-600">Carga completa en 3-4 horas</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-blue-600 text-white rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Ayudas del Plan MOVES</p>
                    <p className="text-sm text-gray-600">Hasta 5.000€ de subvención</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
