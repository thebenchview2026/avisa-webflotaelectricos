"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const VENTAJAS_CERO = [
  { icon: "ri-map-pin-line", titulo: "Acceso libre a Zonas de Bajas Emisiones (ZBE)", desc: "Los vehículos con etiqueta CERO circulan sin restricciones en todas las ZBE de España, incluso en días de alta contaminación. En 2025, más de 150 municipios han declarado o están en proceso de declarar ZBE." },
  { icon: "ri-parking-line", titulo: "Aparcamiento gratuito o con descuento", desc: "En la mayoría de las ciudades con zona azul y verde reguladas (incluida Sevilla), los vehículos CERO aparcan gratis o con bonificación de hasta el 80 %. El ahorro anual puede superar los 2.000 € en zonas céntricas." },
  { icon: "ri-money-euro-circle-line", titulo: "Reducción en el Impuesto de Matriculación", desc: "Los vehículos eléctricos e híbridos enchufables están exentos del Impuesto Especial de Matriculación. En modelos de precio medio, el ahorro puede superar los 3.000 €." },
  { icon: "ri-speed-line", titulo: "Circulación por carriles especiales", desc: "En algunas comunidades autónomas, los vehículos CERO pueden circular por el carril VAO (vehículos de alta ocupación) aunque vayan solos, lo que reduce significativamente los tiempos de desplazamiento." },
  { icon: "ri-star-line", titulo: "Mejor reventa y valor residual", desc: "Los coches con etiqueta CERO tienen mayor demanda en el mercado de segunda mano. Su valor residual es más alto que el de vehículos sin etiqueta medioambiental." },
  { icon: "ri-parking-line", titulo: "Descuento o gratis en zona azul y verde", desc: "En la mayoría de ciudades andaluzas, incluida Sevilla, los vehículos con etiqueta CERO aparcan gratis en zona azul y verde reguladas. El ahorro anual puede superar los 2.000 € en zonas céntricas." },
];

const REQUISITOS_ETIQUETA = [
  { etiqueta: "CERO", color: "bg-blue-100 border-blue-500 text-blue-800", vehiculos: "Vehículos eléctricos puros (BEV), híbridos enchufables con >40 km autonomía eléctrica, vehículos de hidrógeno", emisiones: "0 g CO₂/km en modo eléctrico" },
  { etiqueta: "ECO", color: "bg-green-100 border-green-500 text-green-800", vehiculos: "Híbridos no enchufables (HEV), GNC, GLP, vehículos con etiqueta C y motor alternativo", emisiones: "Menor emisión que la media" },
  { etiqueta: "C", color: "bg-yellow-100 border-yellow-500 text-yellow-800", vehiculos: "Gasolina hasta 2005, Diésel hasta 2014 con normativa Euro 4 o superior", emisiones: "Media del parque actual" },
  { etiqueta: "B", color: "bg-orange-100 border-orange-500 text-orange-800", vehiculos: "Gasolina matriculados antes de 2000, diésel antes de 2006 (algunos Euro 3)", emisiones: "Alta emisión" },
];

function HeroEtiquetaCero() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Etiqueta CERO DGT coches eléctricos" data-testid="section-etiqueta-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Etiqueta CERO DGT</span>
          <span className="text-gray-400 text-sm">Máxima distinción medioambiental</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-etiqueta-h1">
          Coches eléctricos con<br className="hidden md:block" /> etiqueta CERO DGT
        </h1>
        <div className="w-24 h-1 bg-blue-500 rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Todos los vehículos eléctricos puros e híbridos enchufables con más de 40 km de autonomía en modo eléctrico reciben la etiqueta CERO de la DGT. La máxima calificación medioambiental en España.
        </p>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-etiqueta-tel">
          <i className="ri-phone-line" aria-hidden="true"></i> Consultar modelos CERO
        </a>
      </div>
    </section>
  );
}

function VentajasCero() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Ventajas etiqueta CERO DGT" data-testid="section-ventajas-cero">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ventajas de la etiqueta CERO DGT</h2>
      <AutoLinkedText text="La etiqueta CERO es la calificación medioambiental más alta del sistema DGT. Los vehículos que la obtienen disfrutan de ventajas directas para el conductor: aparcamiento gratuito, acceso libre a ZBE y ahorro fiscal en la compra." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/vehiculos/electricos/etiqueta-cero-dgt"]} maxLinks={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {VENTAJAS_CERO.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-ventaja-cero-${i}`}>
            <i className={`${v.icon} text-blue-600 text-2xl mb-3 block`} aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.titulo}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TablasEtiquetas() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Sistema de etiquetas DGT" data-testid="section-sistema-etiquetas">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">El sistema de etiquetas medioambientales DGT</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Cuatro etiquetas clasifican el nivel de emisiones de los vehículos en España. La CERO es la más beneficiosa para el propietario.</p>
        <div className="space-y-4">
          {REQUISITOS_ETIQUETA.map((e, i) => (
            <div key={i} className={`border-l-4 rounded-r-lg p-5 ${e.color}`} data-testid={`card-etiqueta-${i}`}>
              <div className="flex flex-col sm:flex-row gap-3">
                <span className="font-black text-2xl shrink-0 w-16">{e.etiqueta}</span>
                <div>
                  <p className="font-semibold mb-1">{e.vehiculos}</p>
                  <p className="text-sm opacity-75">{e.emisiones}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaEtiqueta() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" aria-label="Ver modelos etiqueta CERO" data-testid="section-etiqueta-cta">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Todos nuestros eléctricos llevan etiqueta CERO</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Volkswagen ID., Audi Q4 e-tron, Škoda Enyaq y CUPRA Born. Todos disponibles en Grupo Avisa. Elige el que mejor se adapta a tu estilo de vida.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/promociones-electricos" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-etiqueta-cta-catalogo">
          Ver coches eléctricos CERO
        </Link>
        <Link href="/vehiculos/hibridos/phev-enchufables" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 dark:text-gray-200 hover:border-[#ad023b] hover:text-[#ad023b] font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-etiqueta-cta-phev">
          Ver híbridos enchufables CERO
        </Link>
      </div>
    </section>
  );
}

export default function VehiculosEtiquetaCeroPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-etiqueta-cero">
      <SEOHead
        title="Coches Eléctricos con Etiqueta CERO DGT: Ventajas y Modelos | Grupo Avisa"
        description="Todos los vehículos eléctricos e híbridos enchufables de Grupo Avisa tienen etiqueta CERO DGT. Acceso a ZBE, aparcamiento gratuito y ventajas fiscales. Volkswagen, Audi, Škoda y CUPRA."
        canonical="/vehiculos/electricos/etiqueta-cero-dgt"
      />
      <Navbar />
      <Breadcrumbs items={[{ name: "Coches eléctricos", path: "/promociones-electricos" }]} currentPage="Etiqueta CERO DGT" />
      <main className="flex-1" role="main">
        <HeroEtiquetaCero />
        <VentajasCero />
        <TablasEtiquetas />
        <CtaEtiqueta />
      </main>
      <Footer />
    </div>
  );
}
