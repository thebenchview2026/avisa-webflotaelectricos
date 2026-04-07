"use client";
export default function PostventaSection() {
  return (
    <section id="postventa" className="py-20 bg-gradient-to-b from-gray-50 to-white" data-testid="section-postventa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-postventa-title">
            Servicio postventa especializado
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Talleres oficiales con técnicos certificados en vehículos eléctricos e híbridos. Tu tranquilidad es nuestra prioridad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                <i className="ri-tools-line text-2xl text-[#ad023b]"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mantenimiento especializado</h3>
                <p className="text-gray-600 leading-relaxed">
                  Técnicos certificados en alta tensión y sistemas eléctricos. Diagnóstico avanzado con equipamiento específico para vehículos eléctricos e híbridos.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Revisiones oficiales con garantía del fabricante</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Diagnóstico de baterías y sistemas de carga</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Actualización de software y sistemas</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                <i className="ri-shield-check-line text-2xl text-[#ad023b]"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garantías extendidas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Protección completa para tu inversión. Garantías específicas para baterías y componentes eléctricos con cobertura de hasta 8 años.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Garantía de batería hasta 8 años o 160.000 km</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Cobertura de componentes eléctricos</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Asistencia en carretera 24/7</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                <i className="ri-battery-charging-line text-2xl text-[#ad023b]"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Asesoramiento en carga</h3>
                <p className="text-gray-600 leading-relaxed">
                  Te ayudamos a instalar tu punto de carga en casa o empresa. Gestión completa de subvenciones y homologaciones.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Instalación de wallbox en domicilio</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Gestión de ayudas para puntos de recarga</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Asesoramiento en tarifas eléctricas</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                <i className="ri-car-line text-2xl text-[#ad023b]"></i>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vehículo de sustitución</h3>
                <p className="text-gray-600 leading-relaxed">
                  Mantén tu movilidad mientras tu vehículo está en el taller. Vehículos de cortesía eléctricos disponibles.
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Vehículos de sustitución eléctricos</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Recogida y entrega a domicilio</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0"></i>
                <span>Cita previa online 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#ad023b] to-[#8d0230] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            ¿Necesitas una revisión o mantenimiento?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Reserva tu cita en nuestros talleres oficiales. Primera revisión gratuita para vehículos nuevos.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-white text-[#ad023b] px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="button-reservar-cita"
          >
            Reservar cita
          </a>
        </div>
      </div>
    </section>
  );
}