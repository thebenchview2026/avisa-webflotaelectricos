"use client";
import { useState } from 'react';
import { Link, useParams } from '@/lib/router';
import SEOHead, { buildVehicleJsonLd, buildBreadcrumbJsonLd } from '@/components/SEOHead';
import { hybridVehicles } from '@/data/hybrid-vehicles';

export default function VehiculoHibridoPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedKm, setSelectedKm] = useState('15000');
  const [selectedMonths, setSelectedMonths] = useState('48');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const vehicle = slug ? hybridVehicles[slug] : null;

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehículo no encontrado</h1>
          <Link href="/promociones-hibridos" className="text-[#ad023b] hover:underline">
            Volver a vehículos híbridos
          </Link>
        </div>
      </div>
    );
  }

  const faqs = [
    { q: '¿Qué incluye exactamente la cuota de renting?', a: 'La cuota incluye mantenimiento oficial, seguro a todo riesgo, impuestos, asistencia en carretera 24h y cambio de neumáticos por desgaste.' },
    { q: '¿Puedo personalizar el equipamiento del vehículo?', a: 'Sí, puedes añadir opcionales y packs de equipamiento. Contacta con nosotros para configurar tu vehículo ideal.' },
    { q: '¿Qué ocurre si supero el kilometraje contratado?', a: 'El exceso de kilometraje se factura según tarifa vigente. Consulta con tu asesor las tarifas aplicables.' },
    { q: '¿Necesito instalar un punto de carga en casa?', a: 'Es recomendable para aprovechar al máximo el modo eléctrico. Podemos asesorarte sobre la instalación.' },
    { q: '¿Tiene ventajas fiscales el renting de un coche eléctrico?', a: 'Sí, la cuota de renting puede ser deducible para autónomos y empresas. Además, los vehículos eléctricos tienen ventajas adicionales en el IRPF como retribución en especie para empleados.' }
  ];

  return (
    <main role="main" className="bg-white">
      <SEOHead
        title={`${vehicle.brand} ${vehicle.name} - Híbrido Enchufable`}
        description={`${vehicle.brand} ${vehicle.name} ${vehicle.type}. ${vehicle.tagline}. Disponible en Grupo Avisa desde ${vehicle.price}/mes. Prueba de conducción gratuita en Sevilla.`}
        canonical={`/vehiculos/hibridos/${slug}`}
        jsonLd={[
          buildVehicleJsonLd({ name: `${vehicle.brand} ${vehicle.name}`, brand: vehicle.brand, imageUrl: vehicle.image, description: vehicle.tagline, slug: slug!, type: "hibrido" }),
          buildBreadcrumbJsonLd([
            { name: "Inicio", url: "https://electricos.grupoavisa.com/" },
            { name: "Híbridos", url: "https://electricos.grupoavisa.com/promociones-hibridos" },
            { name: `${vehicle.brand} ${vehicle.name}`, url: `https://electricos.grupoavisa.com/vehiculos/hibridos/${slug}` }
          ])
        ]}
      />
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 overflow-hidden" aria-label="Información del vehículo híbrido">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-6">
            <Link href="/promociones-hibridos" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer">
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              Volver a vehículos híbridos
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm text-blue-400 text-sm font-bold rounded-full mb-6 border border-blue-500/30">
                <i className="ri-plug-line mr-2" aria-hidden="true"></i>Híbrido Enchufable · Etiqueta CERO
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {vehicle.brand} {vehicle.name}
              </h1>
              <p className="text-xl text-white/90 mb-8">{vehicle.tagline}</p>
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-8">
                <div className="text-sm text-white/80 mb-2">Renting desde</div>
                <div className="text-5xl font-bold text-white mb-2">{vehicle.price}<span className="text-2xl">/mes</span></div>
                <div className="text-sm text-white/70">IVA incluido · 48 meses · 15.000 km/año</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#configurador" className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-all shadow-xl cursor-pointer whitespace-nowrap">
                  <i className="ri-settings-3-line" aria-hidden="true"></i>
                  Personalizar cuota
                </a>
                <a href="https://wa.me/34621261541" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#20BD5A] transition-all shadow-xl cursor-pointer whitespace-nowrap">
                  <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
                  Hablar con un asesor
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <img
                  alt={`${vehicle.brand} ${vehicle.name}`}
                  className="w-full h-auto rounded-lg"
                  src={vehicle.image}
                />
              </div>
              <div className="absolute top-4 right-4 bg-[#ad023b] text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                {vehicle.badge}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12" aria-label="Galería de imágenes">
        <div className="bg-slate-50 rounded-2xl p-6">
          <div className="w-full h-[400px] md:h-[500px] bg-white rounded-xl overflow-hidden mb-4">
            <img
              alt={`${vehicle.brand} ${vehicle.name}`}
              className="w-full h-full object-contain"
              src={vehicle.gallery[selectedImage]}
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {vehicle.gallery.map((img: string, idx: number) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-full h-20 md:h-24 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === idx ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-slate-300'}`}
              >
                <img alt={`Vista ${idx + 1}`} className="w-full h-full object-cover" src={img} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="configurador" className="max-w-5xl mx-auto px-6 py-16" aria-label="Configurador de cuota">
        <div className="bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Configura tu cuota personalizada</h2>
            <p className="text-slate-600">Ajusta el kilometraje y la duración según tus necesidades de uso</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-4">
                <i className="ri-speed-line mr-2 text-blue-500" aria-hidden="true"></i>Kilometraje anual
              </label>
              <div className="space-y-3">
                {['10000', '15000', '20000', '25000', '30000'].map((km) => (
                  <button
                    key={km}
                    onClick={() => setSelectedKm(km)}
                    className={`w-full px-6 py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${selectedKm === km ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-900'}`}
                  >
                    {parseInt(km).toLocaleString()} km/año
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-4">
                <i className="ri-calendar-line mr-2 text-blue-500" aria-hidden="true"></i>Duración del contrato
              </label>
              <div className="space-y-3">
                {['36', '48', '60'].map((months) => (
                  <button
                    key={months}
                    onClick={() => setSelectedMonths(months)}
                    className={`w-full px-6 py-4 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${selectedMonths === months ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-900'}`}
                  >
                    {months} meses
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-center">
            <div className="text-white/80 text-sm mb-2">Tu cuota personalizada</div>
            <div className="text-6xl font-bold text-white mb-3">{vehicle.price}<span className="text-3xl">/mes</span></div>
            <div className="text-white/70 mb-6">IVA incluido · {selectedMonths} meses · {parseInt(selectedKm).toLocaleString()} km/año</div>
            <p className="text-sm text-white/60 max-w-2xl mx-auto">
              La cuota puede variar según kilometraje y duración del contrato. Esta es una estimación orientativa. Contacta con nosotros para una oferta personalizada definitiva.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16" aria-label="Servicios incluidos en el renting">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Qué incluye la cuota de renting</h2>
            <p className="text-lg text-slate-600">Todo lo que necesitas para solo preocuparte de conducir</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'ri-tools-line', title: 'Mantenimiento oficial', desc: 'Todas las revisiones, cambios de aceite, filtros y piezas de desgaste en talleres oficiales' },
              { icon: 'ri-shield-check-line', title: 'Seguro a todo riesgo', desc: 'Cobertura completa con franquicia reducida, asistencia en viaje 24h y vehículo de sustitución' },
              { icon: 'ri-steering-2-line', title: 'Neumáticos', desc: 'Cambio de neumáticos por desgaste normal, equilibrado y alineación incluidos' },
              { icon: 'ri-file-text-line', title: 'Impuestos', desc: 'Impuesto de circulación y tasas administrativas incluidas en la cuota mensual' },
              { icon: 'ri-roadster-line', title: 'Asistencia en carretera', desc: 'Servicio 24/7 en toda Europa, grúa, reparaciones de emergencia y gestión de incidencias' },
              { icon: 'ri-money-euro-circle-line', title: '100% deducible', desc: 'Cuota fija mensual sin sorpresas: seguro, mantenimiento e ITV incluidos' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <i className={`${item.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16" aria-label="Equipamiento de serie">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Equipamiento de serie</h2>
          <p className="text-lg text-slate-600">Todo lo que incluye el {vehicle.brand} {vehicle.name} de serie</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(vehicle.equipamiento).map(([category, items]: [string, any]) => (
            <div key={category} className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <i className={`${category === 'exterior' ? 'ri-car-line' : category === 'interior' ? 'ri-steering-line' : category === 'tecnologia' ? 'ri-smartphone-line' : 'ri-shield-star-line'} text-white`}></i>
                </div>
                <h3 className="font-bold text-slate-900 capitalize">{category}</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                {items.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <i className="ri-check-line text-blue-500 mt-0.5" aria-hidden="true"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16" aria-label="Ficha técnica">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ficha técnica completa</h2>
            <p className="text-lg text-slate-600">Especificaciones detalladas del {vehicle.brand} {vehicle.name}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {Object.entries(vehicle.specs).map(([section, specs]: [string, any]) => (
              <div key={section} className="border-b border-slate-200 last:border-b-0">
                <div className="bg-slate-900 px-6 py-4">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <i className={`${section === 'motor' ? 'ri-dashboard-3-line' : section === 'bateria' ? 'ri-plug-line' : 'ri-ruler-line'}`}></i>
                    {section === 'motor' ? 'Motor y Rendimiento' : section === 'bateria' ? 'Batería y Carga' : 'Dimensiones y Capacidades'}
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {Object.entries(specs).map(([key, value]: [string, any]) => (
                    <div key={key} className="flex justify-between px-6 py-4">
                      <span className="text-slate-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-semibold text-slate-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16" aria-label="Ventajas del modelo">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Por qué el {vehicle.brand} {vehicle.name} es perfecto para tu empresa</h2>
            <p className="text-lg text-white/80">Ventajas clave de este modelo</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicle.ventajas.map((v: any, idx: number) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                  <i className={`${v.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-white/80 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16" aria-label="Preguntas frecuentes">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Preguntas frecuentes</h2>
          <p className="text-lg text-slate-600">Resolvemos tus dudas sobre el renting del {vehicle.brand} {vehicle.name}</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.q}</span>
                <i className={`ri-arrow-${expandedFaq === idx ? 'up' : 'down'}-s-line text-2xl text-slate-400 transition-transform`}></i>
              </button>
              {expandedFaq === idx && (
                <div className="px-6 pb-5 text-slate-600">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>



      <section className="max-w-7xl mx-auto px-6 py-16" aria-label="Vehículos relacionados">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Otros vehículos híbridos que pueden interesarte</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {vehicle.related.map((rel: any) => (
            <Link
              key={rel.slug}
              href={`/vehiculos/hibridos/${rel.slug}`}
              className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-blue-500 transition-all hover:shadow-xl cursor-pointer"
            >
              <div className="w-full h-48 bg-slate-100">
                <img alt={rel.name} className="w-full h-full object-contain" src={rel.image} loading="lazy" decoding="async" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{rel.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">desde {rel.price}</div>
                <p className="text-slate-600 text-sm">Híbrido Enchufable · Etiqueta CERO</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/promociones-hibridos" className="inline-flex items-center gap-2 text-slate-900 font-bold hover:text-blue-600 transition-colors cursor-pointer">
            Ver todos los vehículos híbridos
            <i className="ri-arrow-right-line" aria-hidden="true"></i>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12" aria-label="Condiciones de la oferta">
        <div className="bg-slate-100 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <i className="ri-information-line" aria-hidden="true"></i>
            Condiciones de la oferta
          </h3>
          <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <p>Cuota mensual de renting operativo, IVA incluido. Oferta sujeta a aprobación crediticia por parte de la entidad financiera.</p>
            <p>La cuota incluye: mantenimiento oficial, seguro a todo riesgo con franquicia, impuesto de circulación, gestión de multas, asistencia en carretera 24h y cambio de neumáticos por desgaste. No incluye combustible ni electricidad.</p>
            <p>Condiciones base: 48 meses de contrato, 15.000 km/año. El exceso de kilometraje se facturará según tarifa vigente. La cuota puede variar en función del color, equipamiento opcional y condiciones de financiación.</p>
            <p>Imágenes no contractuales. El equipamiento puede variar según versión y opciones seleccionadas. Consulta disponibilidad de unidades y plazos de entrega con tu asesor comercial.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
