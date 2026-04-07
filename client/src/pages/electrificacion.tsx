"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

function ElectrificacionHero() {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-16 pb-16" aria-label="Guía de electrificación" data-testid="section-electrificacion-hero">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6" data-testid="text-electrificacion-title">
          ¿Cuándo tiene sentido pasarse al coche eléctrico?
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <div className="bg-white dark:bg-gray-800 border-l-4 border-[#ad023b] p-6 rounded-r-md shadow-sm mb-12">
          <AutoLinkedText text="Depende de tu perfil de uso, infraestructura disponible y capacidad de gestionar el cambio. No existe un momento universal. En la mayoría de casos, tiene sentido cuando los recorridos son predecibles, la carga puede planificarse y estás preparado para el cambio. Electrificar sin analizar estos factores aumenta el riesgo de frustraciones y costes ocultos." as="p" className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed" excludeUrls={["/electrificacion"]} maxLinks={2} />
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Por qué esta pregunta es clave para ti</h2>
          <AutoLinkedText text="Pasarse al eléctrico no es solo cambiar de motor. Es modificar hábitos, adaptar infraestructura y gestionar expectativas. El 60% de los conductores que electrifican sin planificación enfrentan frustraciones en los primeros 6 meses." as="p" className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" excludeUrls={["/electrificacion"]} maxLinks={2} />
          <AutoLinkedText text="La presión regulatoria y las ayudas públicas empujan hacia la electrificación, pero el timing importa. Electrificar demasiado pronto puede generar costes innecesarios. Hacerlo tarde puede dejarte sin opciones cuando las normativas se endurezcan. Esta decisión requiere análisis, no urgencia." as="p" className="text-gray-700 dark:text-gray-300 leading-relaxed" excludeUrls={["/electrificacion"]} maxLinks={2} />
        </div>
      </div>
    </section>
  );
}

function CuandoSiElectrificar() {
  const razones = [
    {
      icon: 'ri-map-pin-line',
      title: "Recorridos predecibles y urbanos",
      description: "Si tus vehículos hacen menos de 200 km diarios en rutas conocidas, la autonomía deja de ser un problema. Los eléctricos funcionan mejor en ciudad que en carretera, y la regeneración en tráfico denso reduce el consumo real.",
    },
    {
      icon: 'ri-battery-charge-line',
      title: "Infraestructura de carga disponible",
      description: "Si tienes parking propio o acceso garantizado a carga nocturna, el 80% del problema operativo desaparece. La carga en destino es más eficiente y económica que depender de electrolineras públicas.",
    },
    {
      icon: 'ri-team-line',
      title: "Equipo preparado para el cambio",
      description: "Si tus conductores están abiertos al cambio o ya tienen experiencia con eléctricos, la curva de adaptación es más corta. La resistencia interna es el factor más subestimado en la electrificación.",
    },
    {
      icon: 'ri-file-text-line',
      title: "Presión regulatoria o de clientes",
      description: "Si operas en Zonas de Bajas Emisiones o tus clientes exigen vehículos sostenibles, electrificar deja de ser opcional. En estos casos, el coste de no hacerlo supera el coste de adaptación.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Cuándo sí electrificarse" data-testid="section-cuando-si">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Cuándo SÍ tiene sentido electrificar</h2>
      <div className="space-y-6">
        {razones.map((razon, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow" data-testid={`card-si-razon-${index}`}>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center">
                <i className={`${razon.icon} text-[#ad023b] w-6 h-6`}></i>
              </span>
              {razon.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed ml-13">{razon.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CuandoNoElectrificar() {
  const razones = [
    {
      icon: 'ri-route-line',
      title: "Recorridos largos e impredecibles",
      description: "Si tus vehículos hacen más de 300 km diarios en rutas variables, la autonomía se convierte en un problema operativo real. Los eléctricos actuales no están diseñados para uso intensivo en carretera sin planificación de carga.",
    },
    {
      icon: 'ri-plug-line',
      title: "Sin infraestructura de carga",
      description: "Si no tienes parking propio ni acceso garantizado a carga, dependerás de electrolineras públicas. Esto multiplica el tiempo de inactividad y genera conflictos con conductores que pierden tiempo personal cargando.",
    },
    {
      icon: 'ri-money-euro-circle-line',
      title: "Presupuesto ajustado sin margen",
      description: "El precio de compra de un eléctrico es entre un 20% y 40% superior al de un térmico equivalente. Si no puedes asumir ese sobrecoste inicial o no tienes acceso a ayudas, el TCO puede no compensar en 4 años.",
    },
    {
      icon: 'ri-time-line',
      title: "Necesidad de renovación inmediata",
      description: "Si necesitas vehículos en menos de 3 meses, los plazos de entrega de eléctricos pueden ser un problema. Algunos modelos tienen listas de espera de 6 a 12 meses. Electrificar bajo presión aumenta el riesgo de mala elección.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12" aria-label="Cuándo no electrificarse" data-testid="section-cuando-no">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Cuándo NO tiene sentido electrificar (todavía)</h2>
        <div className="space-y-6">
          {razones.map((razon, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow" data-testid={`card-no-razon-${index}`}>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center">
                  <i className={`${razon.icon} text-[#ad023b] w-6 h-6`}></i>
                </span>
                {razon.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{razon.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ErroresHabituales() {
  const errores = [
    {
      title: "Cambiar todos los vehículos de golpe",
      description: "El cambio brusco genera resistencia, errores y sobrecarga en infraestructura. Lo recomendable es empezar con un vehículo, aprender y escalar progresivamente.",
    },
    {
      title: "No formarse antes de conducir",
      description: "Usar un eléctrico sin formación genera ansiedad de autonomía, uso ineficiente y quejas. La formación no es opcional, es parte del proceso de electrificación.",
    },
    {
      title: "Confiar solo en la autonomía oficial",
      description: "La autonomía WLTP puede reducirse hasta un 30% en condiciones reales de frío, calefacción y uso urbano. Planifica siempre con un margen de seguridad del 20-25%.",
    },
    {
      title: "No calcular el coste de infraestructura",
      description: "Instalar cargadores, adaptar instalación eléctrica y gestionar contratos de suministro tiene un coste que puede superar los 10.000€ por punto de carga. Este coste debe incluirse en el TCO.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Errores comunes" data-testid="section-errores">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Errores habituales al electrificar</h2>
      <div className="space-y-4">
        {errores.map((error, index) => (
          <div key={index} className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500 p-6 rounded-r-md" data-testid={`card-error-${index}`}>
            <div className="flex items-start gap-3">
              <i className="ri-error-warning-line text-red-500 w-5 h-5 mt-0.5 flex-shrink-0" aria-hidden="true"></i>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{error.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{error.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FactoresDecision() {
  const factores = [
    {
      title: "Ayudas públicas disponibles",
      description: "Las ayudas MOVES pueden cubrir hasta 7.000€ por vehículo, pero los plazos de cobro superan los 12 meses. Si no puedes anticipar ese coste, la ayuda pierde parte de su valor.",
    },
    {
      title: "Precio de la electricidad",
      description: "Si tienes tarifa nocturna o acceso a carga solar, el coste por kilómetro puede ser hasta un 70% inferior al diésel. Sin tarifa optimizada, la ventaja se reduce al 30-40%.",
    },
    {
      title: "Política de renovación",
      description: "Si renuevas cada 2-3 años, el valor residual del eléctrico es más incierto. Si mantienes vehículos 5-6 años, el ahorro en mantenimiento compensa mejor el sobrecoste inicial.",
    },
    {
      title: "Imagen corporativa",
      description: "Si tu empresa tiene compromisos ESG o tus clientes valoran la sostenibilidad, el beneficio reputacional puede justificar un TCO ligeramente superior.",
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12" aria-label="Factores a considerar" data-testid="section-factores">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Factores que cambian completamente la decisión</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {factores.map((factor, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 hover:shadow-md transition-shadow" data-testid={`card-factor-${index}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{factor.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DependeTuCaso() {
  const casos = [
    {
      titulo: "Tipo de uso",
      descripcion: "Un uso principalmente urbano tiene un perfil ideal para eléctricos. Un uso mayoritariamente interurbano o de largo recorrido, no tanto.",
    },
    {
      titulo: "Número de vehículos",
      descripcion: "Con 1-2 vehículos, la inversión en infraestructura es proporcionalmente mayor. Con varios vehículos, se diluye.",
    },
    {
      titulo: "Uso real",
      descripcion: "Si tus vehículos hacen 50 km diarios, electrificar es casi siempre rentable. Si hacen 400 km, casi nunca lo es.",
    },
    {
      titulo: "Actitud personal",
      descripcion: "Si tienes cultura de innovación, el cambio será más fluido. Si hay resistencia al cambio, necesitarás más tiempo y adaptación.",
    },
    {
      titulo: "Capacidad de gestión",
      descripcion: "Electrificar requiere tiempo de gestión. Si ya estás saturado, el cambio puede generar más problemas que beneficios.",
    },
    {
      titulo: "Horizonte temporal",
      descripcion: "Si necesitas resultados inmediatos, electrificar puede no ser la mejor opción. Si piensas a 3-5 años, el análisis cambia completamente.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Depende de tu caso" data-testid="section-depende-tu-caso">
      <div className="bg-gradient-to-br from-[#ad023b]/10 to-[#8d0230]/10 rounded-md p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Depende de tu caso si...</h2>
        <div className="space-y-4">
          {casos.map((caso, index) => (
            <div key={index} className="flex items-start gap-4" data-testid={`item-caso-${index}`}>
              <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                <i className="ri-checkbox-circle-line text-[#ad023b] w-5 h-5" aria-hidden="true"></i>
              </span>
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                <strong>{caso.titulo}:</strong> {caso.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ElectrificacionCTA() {
  const preguntasRelacionadas = [
    {
      pregunta: "¿A partir de cuántos kilómetros es rentable el renting?",
      href: "/preguntas",
    },
    {
      pregunta: "¿Renting o compra para mi vehículo eléctrico?",
      href: "/preguntas",
    },
    {
      pregunta: "¿Cómo calcular el coste real de un vehículo eléctrico?",
      href: "/preguntas",
    },
    {
      pregunta: "¿Qué marca es más fiable en eléctricos?",
      href: "/preguntas",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Contacto" data-testid="section-electrificacion-cta">
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Otras preguntas relacionadas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {preguntasRelacionadas.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md p-6 hover:border-[#ad023b] hover:shadow-lg transition-all duration-300 cursor-pointer group"
              data-testid={`link-pregunta-${index}`}
            >
              <div className="flex items-start justify-between gap-4">
                <p className="text-gray-900 dark:text-white font-semibold leading-tight group-hover:text-[#ad023b] transition-colors">
                  {item.pregunta}
                </p>
                <span className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <i className="ri-arrow-right-line w-5 h-5 text-gray-400 group-hover:text-[#ad023b] group-hover:translate-x-1 transition-all" aria-hidden="true"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#ad023b] to-[#8d0230] rounded-md p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            src="/ana-perez.png"
            alt="Ana - Asesora de Electrificación"
            className="w-20 h-20 rounded-full object-cover border-4 border-white/30 shadow-lg flex-shrink-0"
            data-testid="img-advisor-ana"
          />
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">¿Quieres que un asesor revise tu caso concreto?</h2>
            <p className="text-white/90 text-sm">
              La persona que te va a atender es <strong>Ana</strong>, lleva más de 10 años como profesional en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
            </p>
          </div>
        </div>
        <p className="text-lg text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto text-center">
          Cada situación es diferente. Analizamos tu perfil de uso, infraestructura y necesidades para ayudarte a decidir si electrificar tiene sentido en tu caso.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://wa.me/34621261541"
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-[#25D366] hover:bg-[#20BD5A] text-white px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            data-testid="link-whatsapp-cta"
          >
            <i className="ri-message-2-line w-5 h-5" aria-hidden="true"></i>
            Escríbeme
          </a>
          <Link
            href="/concesionarios"
            className="whitespace-nowrap bg-white/20 text-white hover:bg-white/30 px-8 py-3 rounded-md font-semibold transition-all duration-300 cursor-pointer border-2 border-white/20 text-center"
            data-testid="link-concesionarios-cta"
          >
            Ver concesionarios
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function ElectrificacionPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-electrificacion">
      <SEOHead
        title="Guía de Electrificación: ¿Cuándo Pasarse al Coche Eléctrico?"
        description="Análisis objetivo sobre cuándo conviene pasarse al coche eléctrico. Autonomía real, costes, infraestructura de carga y comparativas. Guía profesional de Grupo Avisa."
        canonical="/electrificacion"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Guía de Electrificación" />
      <main className="flex-1" role="main">
        <ElectrificacionHero />
        <CuandoSiElectrificar />
        <CuandoNoElectrificar />
        <ErroresHabituales />
        <FactoresDecision />
        <DependeTuCaso />
        <ElectrificacionCTA />
      </main>
      <Footer />
    </div>
  );
}
