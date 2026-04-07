"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const CUANTIAS = [
  { perfil: "Empresa / autónomo — VE puro", ayuda: "Hasta 7.000 €", detalle: "Vehículo 100 % eléctrico con achatarramiento de vehículo viejo", color: "border-green-500 bg-green-50 dark:bg-green-950" },
  { perfil: "Empresa / autónomo — VE puro sin achatarramiento", ayuda: "Hasta 4.500 €", detalle: "Vehículo 100 % eléctrico sin entrega de vehículo antiguo", color: "border-blue-500 bg-blue-50 dark:bg-blue-950" },
  { perfil: "Empresa / autónomo — PHEV enchufable", ayuda: "Hasta 5.000 €", detalle: "Híbrido enchufable con achatarramiento. Mínimo 40 km autonomía eléctrica", color: "border-purple-500 bg-purple-50 dark:bg-purple-950" },
  { perfil: "Particular — VE puro con achatarramiento", ayuda: "Hasta 7.000 €", detalle: "Personas físicas con ingresos inferiores a 45.000 € brutos anuales", color: "border-orange-500 bg-orange-50 dark:bg-orange-950" },
  { perfil: "Instalación wallbox en casa o garaje", ayuda: "Hasta 500 €", detalle: "Subvención para instalación de punto de recarga en vivienda o garaje particular", color: "border-[#ad023b] bg-red-50 dark:bg-red-950" },
];

const REQUISITOS = [
  { icon: "ri-price-tag-3-line", titulo: "Precio máximo del vehículo", desc: "El precio de venta al público (PVP) no puede superar los 45.000 € (IVA incluido). Para furgonetas, el límite es 53.000 €." },
  { icon: "ri-battery-charge-line", titulo: "Tipo de vehículo elegible", desc: "Turismos y furgonetas M1 y N1, eléctricos puros (BEV) e híbridos enchufables (PHEV) con mínimo 40 km de autonomía eléctrica." },
  { icon: "ri-calendar-line", titulo: "Vehículo nuevo de fábrica", desc: "El vehículo debe ser nuevo. No se admiten vehículos de segunda mano o kilómetro cero adquiridos a partir de la convocatoria." },
  { icon: "ri-delete-bin-line", titulo: "Achatarramiento (opcional)", desc: "Para la mayor cuantía, hay que acreditar la baja definitiva de un vehículo de más de 7 años para particulares, o más de 10 años para empresas." },
  { icon: "ri-map-pin-2-line", titulo: "Matriculación en España", desc: "El vehículo debe matricularse en España y mantenerse en el país durante al menos 2 años. No puede venderse ni exportarse antes." },
];

const MODELOS_ELEGIBLES = [
  { slug: "volkswagen-id3-pro", modelo: "VW ID.3 Pro", precio: "36.900 €", elegible: true },
  { slug: "volkswagen-id4-pro", modelo: "VW ID.4 Pro", precio: "44.900 €", elegible: true },
  { slug: "skoda-enyaq-iv-80", modelo: "Škoda Enyaq iV 80", precio: "42.500 €", elegible: true },
  { slug: "cupra-born-eboost", modelo: "CUPRA Born e-Boost", precio: "38.900 €", elegible: true },
  { slug: "audi-q4-etron-45", modelo: "Audi Q4 e-tron 45", precio: "52.900 €", elegible: false, nota: "Supera límite 45.000 €" },
];

function HeroMoves() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Plan MOVES III ayudas coche eléctrico" data-testid="section-moves-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Plan MOVES III</span>
          <span className="text-gray-400 text-sm">Programa de incentivos a la movilidad eficiente</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-moves-h1">
          Ayudas Plan MOVES III:<br className="hidden md:block" /> hasta 7.000 € por vehículo eléctrico
        </h1>
        <div className="w-24 h-1 bg-green-500 rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          El Plan MOVES III subvenciona la compra de vehículos eléctricos e híbridos enchufables para empresas y particulares. Tramitamos la ayuda contigo desde el primer día.
        </p>
        <div className="bg-white/10 border border-white/20 rounded-lg p-4 mb-8 max-w-lg">
          <p className="text-sm text-gray-300"><i className="ri-information-line mr-2" aria-hidden="true"></i>Grupo Avisa tramita la solicitud MOVES en nombre del cliente. No tienes que gestionar nada por tu cuenta.</p>
        </div>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-moves-tel">
          <i className="ri-phone-line" aria-hidden="true"></i> Consultar ayudas disponibles: 955 034 600
        </a>
      </div>
    </section>
  );
}

function CuantiasMoves() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Cuantías Plan MOVES III" data-testid="section-moves-cuantias">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Cuantías de las ayudas según perfil</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-10">Las ayudas varían según el tipo de beneficiario (empresa o particular), el tipo de vehículo y si se realiza achatarramiento de un vehículo antiguo.</p>
      <div className="space-y-4">
        {CUANTIAS.map((c, i) => (
          <div key={i} className={`border-l-4 rounded-r-lg p-5 ${c.color}`} data-testid={`card-cuantia-${i}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{c.perfil}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{c.detalle}</p>
              </div>
              <span className="font-bold text-xl text-green-700 dark:text-green-400 shrink-0">{c.ayuda}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function RequisitosMoves() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Requisitos Plan MOVES III" data-testid="section-moves-requisitos">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Requisitos para solicitar la ayuda MOVES</h2>
        <AutoLinkedText text="Los requisitos del Plan MOVES III son gestionables para la mayoría de empresas y autónomos. El principal filtro es el precio del vehículo (máximo 45.000 € con IVA) y que sea un modelo eléctrico puro o híbrido enchufable con más de 40 km de autonomía en modo eléctrico." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/ayudas-moves3-vehiculo-electrico"]} maxLinks={2} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {REQUISITOS.map((r, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex gap-4" data-testid={`card-requisito-moves-${i}`}>
              <i className={`${r.icon} text-[#ad023b] text-xl shrink-0 mt-0.5`} aria-hidden="true"></i>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{r.titulo}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelosElegibles() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Modelos elegibles MOVES III" data-testid="section-moves-modelos">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modelos elegibles para MOVES III en Grupo Avisa</h2>
      <div className="space-y-3">
        {MODELOS_ELEGIBLES.map((m, i) => (
          m.elegible ? (
            <Link href={`/vehiculos/electricos/${m.slug}`} key={i} className="flex items-center justify-between bg-white dark:bg-gray-800 border border-green-200 rounded-lg p-4 hover:border-green-400 hover:shadow-sm transition-all" data-testid={`card-modelo-moves-${i}`}>
              <div className="flex items-center gap-3">
                <i className="ri-checkbox-circle-fill text-green-600 text-xl" aria-hidden="true"></i>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{m.modelo}</p>
                  <p className="text-gray-500 text-sm">PVP desde {m.precio} — Elegible MOVES III</p>
                </div>
              </div>
              <span className="text-[#ad023b] text-sm font-semibold">Ver ficha →</span>
            </Link>
          ) : (
            <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 border border-gray-200 rounded-lg p-4 opacity-60" data-testid={`card-modelo-moves-no-${i}`}>
              <div className="flex items-center gap-3">
                <i className="ri-close-circle-line text-gray-400 text-xl" aria-hidden="true"></i>
                <div>
                  <p className="font-semibold text-gray-700 dark:text-gray-300">{m.modelo}</p>
                  <p className="text-gray-400 text-sm">{m.nota}</p>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </section>
  );
}

function CtaMoves() {
  return (
    <section className="bg-green-700 text-white py-16" aria-label="CTA Plan MOVES III" data-testid="section-moves-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Tramita tu ayuda MOVES con nosotros</h2>
        <p className="text-xl opacity-90 mb-8">Nuestro equipo gestiona toda la documentación y el proceso de solicitud sin coste adicional. Solo tienes que elegir tu vehículo.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-white text-green-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors" data-testid="button-moves-cta-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600
          </a>
          <Link href="/promociones-electricos" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-moves-cta-catalogo">
            Ver coches elegibles
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function AyudasMoves3Page() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-moves3">
      <SEOHead
        title="Plan MOVES III: Hasta 7.000 € de Ayuda para Coche Eléctrico Empresa"
        description="Ayudas Plan MOVES III para empresas y autónomos en Andalucía: hasta 7.000 € por vehículo eléctrico. Requisitos, cuantías y tramitación sin coste adicional."
        canonical="/ayudas-moves3-vehiculo-electrico"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Ayudas Plan MOVES III" />
      <main className="flex-1" role="main">
        <HeroMoves />
        <CuantiasMoves />
        <RequisitosMoves />
        <ModelosElegibles />
        <CtaMoves />
      </main>
      <Footer />
    </div>
  );
}
