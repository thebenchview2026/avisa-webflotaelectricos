"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const OPCIONES_CARGA = [
  {
    nivel: "Carga en casa con enchufe doméstico (2,3 kW)",
    uso: "Para conducciones cortas o como solución provisional",
    tiempoCarga: "20–40 horas carga completa",
    coste: "0 € instalación (enchufe Schuko ya existente)",
    icono: "ri-plug-line",
    recomendado: false,
    nota: "Muy lento. Solo recomendable si recorres menos de 50 km/día."
  },
  {
    nivel: "Wallbox 7,4 kW (monofásico)",
    uso: "La opción más popular para casa",
    tiempoCarga: "5–8 horas carga completa",
    coste: "700–1.200 € instalado con subvención",
    icono: "ri-charging-pile-line",
    recomendado: true,
    nota: "Ideal para cargar de noche. Con el MOVES III puedes obtener hasta 500 € de subvención."
  },
  {
    nivel: "Wallbox 11–22 kW (trifásico)",
    uso: "Para vehículos con cargador trifásico a bordo",
    tiempoCarga: "2–4 horas carga completa",
    coste: "1.200–2.500 € instalado",
    icono: "ri-charging-pile-2-line",
    recomendado: false,
    nota: "Requiere instalación trifásica en casa. Consulta con un electricista antes."
  },
  {
    nivel: "Carga pública rápida DC (50–175 kW)",
    uso: "Para viajes y cuando no tienes carga en casa",
    tiempoCarga: "20–45 min al 80 %",
    coste: "0,35–0,65 €/kWh según red",
    icono: "ri-flashlight-line",
    recomendado: false,
    nota: "Red pública creciendo en Andalucía: Iberdrola, Repsol, Endesa y Charge Now."
  },
];

const PASOS_WALLBOX = [
  { num: "01", titulo: "Consulta gratuita", desc: "Te evaluamos si necesitas reforzar la instalación eléctrica, qué potencia es óptima para tu coche y si tienes derecho a subvención." },
  { num: "02", titulo: "Tramitación de ayudas MOVES", desc: "Gestionamos la solicitud de subvención del Plan MOVES III para instalación de infraestructura de recarga en viviendas particulares." },
  { num: "03", titulo: "Instalación por electricista homologado", desc: "Instalación con certificado eléctrico (CIE) y alta en la distribuidora. Cumplimiento total de la normativa vigente." },
  { num: "04", titulo: "Puesta en marcha y configuración", desc: "Configuramos el wallbox para que puedas programar la carga nocturna en horas valle y aprovechar la tarifa más barata." },
];

const COSTES_CARGA = [
  { caso: "Recarga nocturna en casa (tarifa valle)", kwh: "~0,10 €/kWh", ejemplo: "ID.3 (59 kWh): ~5,90 € carga completa", ahorro: "vs ~55 € llenar el depósito de gasolina" },
  { caso: "Recarga en horario punta en casa", kwh: "~0,25 €/kWh", ejemplo: "ID.3 (59 kWh): ~14,75 € carga completa", ahorro: "vs ~55 € de gasolina, todavía un 73 % más barato" },
  { caso: "Carga rápida pública DC", kwh: "~0,50 €/kWh", ejemplo: "ID.3 (0→80 %): ~23,60 €", ahorro: "Puntual en viaje, no para uso diario" },
];

function HeroPuntoCarga() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Dónde y cómo cargar un coche eléctrico en casa" data-testid="section-carga-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Carga en casa</span>
          <span className="text-gray-400 text-sm">Wallbox · MOVES III · Ahorro real</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-carga-h1">
          Dónde y cómo cargar tu<br className="hidden md:block" /> coche eléctrico en casa
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          El 80 % de la carga de un coche eléctrico se hace en casa por la noche. Descubre cuánto cuesta instalar un wallbox, qué subvenciones puedes pedir y cuánto ahorras en combustible.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> Consultar instalación: 955 034 600
          </a>
          <Link href="/ayudas-moves3-vehiculo-electrico" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-moves">
            <i className="ri-leaf-line" aria-hidden="true"></i> Ayudas MOVES para carga
          </Link>
        </div>
      </div>
    </section>
  );
}

function OpcionesCarga() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Opciones de carga para coche eléctrico" data-testid="section-opciones-carga">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Cómo puedo cargar mi coche eléctrico en casa?</h2>
      <AutoLinkedText text="Tienes varias opciones para cargar en casa. La más recomendada es instalar un wallbox de 7,4 kW: carga tu coche de noche mientras duermes y sales cada mañana con la batería llena." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/punto-de-carga"]} maxLinks={2} />
      <div className="space-y-4">
        {OPCIONES_CARGA.map((o, i) => (
          <div key={i} className={`border rounded-lg p-6 ${o.recomendado ? "border-[#ad023b] bg-red-50 dark:bg-red-950/20" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"}`} data-testid={`card-opcion-carga-${i}`}>
            <div className="flex items-start gap-4">
              <i className={`${o.icono} text-3xl shrink-0 ${o.recomendado ? "text-[#ad023b]" : "text-gray-400"}`} aria-hidden="true"></i>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{o.nivel}</h3>
                  {o.recomendado && <span className="text-xs bg-[#ad023b] text-white px-2 py-0.5 rounded-full">Recomendado</span>}
                </div>
                <p className="text-gray-500 text-sm mb-3">{o.uso}</p>
                <div className="flex flex-wrap gap-4 text-sm mb-3">
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><i className="ri-time-line text-[#ad023b]" aria-hidden="true"></i>{o.tiempoCarga}</span>
                  <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400"><i className="ri-money-euro-circle-line text-[#ad023b]" aria-hidden="true"></i>{o.coste}</span>
                </div>
                <p className="text-sm text-gray-500 italic">{o.nota}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CostesReales() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Cuánto cuesta cargar un coche eléctrico" data-testid="section-costes-carga">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Cuánto cuesta cargar un coche eléctrico en 2025?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Con una tarifa nocturna doméstica, el coste por kilómetro de un eléctrico es 5–8 veces menor que el de un coche de gasolina equivalente.</p>
        <div className="space-y-4">
          {COSTES_CARGA.map((c, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5" data-testid={`card-coste-${i}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{c.caso}</p>
                  <p className="text-sm text-gray-500 mt-1">{c.ejemplo}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-[#ad023b]">{c.kwh}</p>
                  <p className="text-xs text-green-600 font-semibold">{c.ahorro}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6">*Precios orientativos. Dependen de tu tarifa contratada y del momento de carga. La tarifa nocturna (PVPC 3 periodos o tarifa supervalle) puede bajar a 0,05–0,08 €/kWh.</p>
      </div>
    </section>
  );
}

function ProcesoWallbox() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Cómo instalar wallbox en casa" data-testid="section-proceso-wallbox">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Cómo instalo un wallbox en mi casa?</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-10">Grupo Avisa gestiona todo el proceso de instalación y tramitación de ayudas. Tú solo tienes que decir que sí.</p>
      <div className="space-y-6">
        {PASOS_WALLBOX.map((p, i) => (
          <div key={i} className="flex gap-6 items-start" data-testid={`step-wallbox-${i}`}>
            <div className="shrink-0 w-12 h-12 bg-[#ad023b] text-white rounded-full flex items-center justify-center font-bold">{p.num}</div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">{p.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaCarga() {
  return (
    <section className="bg-[#ad023b] text-white py-16" aria-label="CTA instalación wallbox" data-testid="section-carga-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Tienes garaje? Instala tu wallbox con subvención</h2>
        <p className="text-xl opacity-90 mb-8">Consulta si tienes derecho a la ayuda MOVES para instalación en vivienda. Hasta 500 € de subvención y gestión gratuita por nuestra parte.</p>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-white text-[#ad023b] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-cta">
          <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600 — Consulta gratuita
        </a>
      </div>
    </section>
  );
}

export default function PuntoCargaElectricoPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-punto-carga">
      <SEOHead
        title="Dónde y Cómo Cargar un Coche Eléctrico en Casa: Wallbox y Costes"
        description="Guía completa sobre cómo cargar tu coche eléctrico en casa. Wallbox, costes reales, ahorro vs gasolina y subvenciones MOVES III para instalación en vivienda."
        canonical="/punto-de-carga"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Cargar Coche Eléctrico en Casa" />
      <main className="flex-1" role="main">
        <HeroPuntoCarga />
        <OpcionesCarga />
        <CostesReales />
        <ProcesoWallbox />
        <CtaCarga />
      </main>
      <Footer />
    </div>
  );
}
