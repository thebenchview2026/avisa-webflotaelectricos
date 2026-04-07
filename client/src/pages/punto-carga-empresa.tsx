"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const TIPOS_CARGADOR = [
  { tipo: "Wallbox monofásico (7,4 kW)", uso: "Vehículos particulares, parking empresa pequeño", tiempoCarga: "5-8 h carga completa", coste: "700–1.200 € instalado", icono: "ri-charging-pile-line" },
  { tipo: "Wallbox trifásico (11–22 kW)", uso: "Flotas empresa, parking con red trifásica", tiempoCarga: "2-4 h carga completa", coste: "1.200–2.500 € instalado", icono: "ri-charging-pile-2-line" },
  { tipo: "Cargador semirápido (50 kW DC)", uso: "Espacios de tránsito, hub de carga empresa", tiempoCarga: "30-45 min al 80 %", coste: "8.000–15.000 € instalado", icono: "ri-flashlight-line" },
  { tipo: "Cargador ultrarrápido (150+ kW)", uso: "Concesionarios, grandes flotas, autopistas", tiempoCarga: "10-20 min al 80 %", coste: "25.000–60.000 € instalado", icono: "ri-lightning-fill" },
];

const PASOS_INSTALACION = [
  { num: "01", titulo: "Estudio técnico gratuito", desc: "Analizamos la instalación eléctrica actual, la potencia contratada y el número de vehículos para dimensionar correctamente el sistema." },
  { num: "02", titulo: "Proyecto de instalación", desc: "Nuestro equipo certificado elabora el proyecto eléctrico conforme a normativa, necesario para tramitar subvenciones y legalizar la instalación." },
  { num: "03", titulo: "Tramitación de ayudas MOVES", desc: "Gestionamos la solicitud de subvenciones del programa MOVES para empresas, que pueden cubrir hasta el 50 % del coste de la instalación." },
  { num: "04", titulo: "Instalación certificada", desc: "Instalación por electricistas homologados con certificado de instalación eléctrica (CIE) y alta en la compañía distribuidora." },
  { num: "05", titulo: "Gestión inteligente de carga", desc: "Configuramos el sistema de gestión de energía (SCADA) para optimizar la carga según tarifas eléctricas y evitar sobrecostes en el término de potencia." },
];

function HeroPuntoCarga() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Puntos de carga para empresa" data-testid="section-carga-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Infraestructura de carga</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-carga-h1">
          Instalación de puntos de carga<br className="hidden md:block" /> para empresa en Andalucía
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Diseño, instalación y gestión de la infraestructura de carga para flotas eléctricas de empresa. Estudio técnico gratuito, tramitación de ayudas MOVES y técnicos certificados en alta tensión.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> Solicitar estudio gratuito
          </a>
          <a href="https://wa.me/34621261541?text=Hola%2C%20necesito%20instalar%20puntos%20de%20carga%20en%20mi%20empresa" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-whatsapp">
            <i className="ri-whatsapp-line" aria-hidden="true"></i> WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function TiposCargadores() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Tipos de cargadores para empresa" data-testid="section-tipos-cargador">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tipos de puntos de carga para empresa</h2>
      <AutoLinkedText text="La elección del cargador depende del tipo de uso, la potencia eléctrica disponible y el tiempo disponible para cargar. En una flota empresa, lo habitual es combinar wallbox de 11-22 kW para carga nocturna con algún punto semirápido para urgencias." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/punto-carga-empresa"]} maxLinks={2} />
      <div className="space-y-4">
        {TIPOS_CARGADOR.map((t, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-cargador-${i}`}>
            <div className="flex items-start gap-4">
              <i className={`${t.icono} text-[#ad023b] text-3xl shrink-0`} aria-hidden="true"></i>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{t.tipo}</h3>
                <p className="text-gray-500 text-sm mb-3">{t.uso}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><i className="ri-time-line text-[#ad023b]" aria-hidden="true"></i>{t.tiempoCarga}</span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><i className="ri-money-euro-circle-line text-[#ad023b]" aria-hidden="true"></i>{t.coste}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcesoInstalacion() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Proceso de instalación punto de carga" data-testid="section-proceso-instalacion">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cómo instalamos tu punto de carga</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-10">Proceso completo desde el estudio técnico hasta la puesta en marcha, con tramitación de subvenciones incluida.</p>
        <div className="space-y-6">
          {PASOS_INSTALACION.map((p, i) => (
            <div key={i} className="flex gap-6 items-start" data-testid={`step-instalacion-${i}`}>
              <div className="shrink-0 w-12 h-12 bg-[#ad023b] text-white rounded-full flex items-center justify-center font-bold">{p.num}</div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{p.titulo}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AyudasCarga() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Ayudas instalación punto de carga empresa" data-testid="section-ayudas-carga">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ayudas disponibles para la instalación</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-green-200 rounded-lg p-6" data-testid="card-moves-carga">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-government-line text-green-600 text-xl" aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white">Plan MOVES III</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Subvención del 30–50 % del coste de instalación de infraestructura de recarga para empresas. Aplicable a wallbox y cargadores hasta 250 kW.</p>
          <Link href="/ayudas-moves3-vehiculo-electrico" className="text-[#ad023b] text-sm font-semibold hover:underline" data-testid="link-moves">Ver ayudas MOVES →</Link>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-blue-200 rounded-lg p-6" data-testid="card-feder-carga">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-flag-line text-blue-600 text-xl" aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white">FEDER Andalucía</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Fondos europeos para instalación de infraestructura de carga en polígonos industriales y zonas de actividad económica en Andalucía.</p>
          <span className="text-gray-400 text-sm">Consultar disponibilidad</span>
        </div>
      </div>
    </section>
  );
}

function CtaCarga() {
  return (
    <section className="bg-[#ad023b] text-white py-16" aria-label="CTA puntos de carga empresa" data-testid="section-carga-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Estudio gratuito de instalación en tu empresa</h2>
        <p className="text-xl opacity-90 mb-8">Analizamos tu instalación eléctrica, dimensionamos el sistema y tramitamos las subvenciones disponibles. Sin coste ni compromiso.</p>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-white text-[#ad023b] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-cta">
          <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600 — Llamar ahora
        </a>
      </div>
    </section>
  );
}

export default function PuntoCargaEmpresaPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-punto-carga-empresa">
      <SEOHead
        title="Puntos de Carga para Empresa: Instalación y Gestión | Grupo Avisa"
        description="Instalación de wallbox y cargadores para flotas de empresa en Andalucía. Estudio técnico gratuito, tramitación subvenciones MOVES y técnicos certificados en alta tensión."
        canonical="/punto-carga-empresa"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Puntos de Carga para Empresa" />
      <main className="flex-1" role="main">
        <HeroPuntoCarga />
        <TiposCargadores />
        <ProcesoInstalacion />
        <AyudasCarga />
        <CtaCarga />
      </main>
      <Footer />
    </div>
  );
}
