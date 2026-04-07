"use client";
import { Link } from "@/lib/router";

export default function PlanMovesSection() {
  return (
    <section id="plan-moves" className="py-20 bg-gradient-to-b from-white to-gray-50" data-testid="section-plan-moves">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-moves-title">
            Ayudas Autoplus para vehículos eléctricos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hasta 7.000€ de ayuda para tu nuevo vehículo eléctrico o híbrido enchufable.
            Gestión gratuita y ayuda adelantada.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-green-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                <i className="ri-car-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehículos BEV</h3>
              <p className="text-sm text-gray-600">100% Eléctricos</p>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Con achatarramiento</p>
                <p className="text-3xl font-bold text-green-600">7.000€</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Sin achatarramiento</p>
                <p className="text-3xl font-bold text-gray-700">4.500€</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-blue-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                <i className="ri-charging-pile-2-line text-3xl text-blue-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehículos PHEV</h3>
              <p className="text-sm text-gray-600">Híbridos Enchufables</p>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Con achatarramiento</p>
                <p className="text-3xl font-bold text-blue-600">5.000€</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Sin achatarramiento</p>
                <p className="text-3xl font-bold text-gray-700">2.500€</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-purple-500">
            <div className="text-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                <i className="ri-plug-line text-3xl text-purple-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Puntos de recarga</h3>
              <p className="text-sm text-gray-600">Wallbox doméstico</p>
            </div>
            <div className="space-y-4">
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Instalación completa</p>
                <p className="text-3xl font-bold text-purple-600">Hasta 1.500€</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Gestión incluida</p>
                <p className="text-lg font-bold text-gray-700">Sin coste</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#ad023b] to-[#8d0230] rounded-2xl p-8 md:p-12 text-white mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Grupo Avisa gestiona tu ayuda</h3>
              <p className="text-white/90 text-lg mb-6">
                Nos encargamos de toda la tramitación del Plan MOVES. Tú solo disfrutas de tu nuevo vehículo eléctrico.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <span>Tramitación completa sin coste adicional</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <span>Adelantamos el importe de la ayuda</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full flex-shrink-0 mt-0.5">
                    <i className="ri-check-line text-sm"></i>
                  </div>
                  <span>Asesoramiento personalizado</span>
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-xl font-bold mb-4">Requisitos básicos</h4>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Ser particular, autónomo o empresa</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Vehículo con precio inferior a 45.000€</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Mantener el vehículo mínimo 2 años</span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="ri-checkbox-circle-line text-xl flex-shrink-0 mt-0.5"></i>
                  <span>Para achatarramiento: vehículo +7 años</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Proceso de solicitud</h3>
            <div className="space-y-6">
              {[
                { step: 1, title: "Elige tu vehículo", desc: "Selecciona el modelo eléctrico o híbrido que más te guste" },
                { step: 2, title: "Documentación", desc: "Te indicamos qué documentos necesitas (DNI, permiso de circulación...)" },
                { step: 3, title: "Tramitación", desc: "Nosotros gestionamos toda la solicitud ante la administración" },
                { step: 4, title: "Disfruta tu vehículo", desc: "Recibe tu coche con la ayuda ya aplicada al precio final" },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b] text-white rounded-full font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes Plan MOVES</h3>
            <div className="space-y-4">
              {[
                { q: "¿Cuánto tarda en aprobarse la ayuda?", a: "El plazo medio es de 3-6 meses, pero adelantamos el importe para que no tengas que esperar." },
                { q: "¿Puedo combinar con otras ayudas?", a: "Sí, puedes sumar ayudas autonómicas o municipales adicionales según tu comunidad." },
                { q: "¿Qué pasa si se agotan los fondos?", a: "Las solicitudes se atienden por orden de llegada. Te avisamos del estado en tiempo real." },
                { q: "¿Es compatible con renting?", a: "Sí, el Plan MOVES es compatible con todas las formas de financiación incluido el renting." },
              ].map((faq, i) => (
                <details key={i} className="bg-white rounded-lg p-4 cursor-pointer">
                  <summary className="font-semibold text-gray-900 cursor-pointer">{faq.q}</summary>
                  <p className="text-sm text-gray-600 mt-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/autoplus"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
            data-testid="link-mas-autoplus"
          >
            <i className="ri-government-line"></i>
            Más información sobre Autoplus
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            Gestión gratuita · Adelantamos la ayuda · Asesoramiento personalizado
          </p>
        </div>
      </div>
    </section>
  );
}