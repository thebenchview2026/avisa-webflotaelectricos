"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const MODELOS_PHEV = [
  { slug: "volkswagen-touareg-phev", marca: "Volkswagen", modelo: "Touareg eHybrid", autonomia: "48 km eléctrica", potenciaTotal: "462 CV", potenciaElectrica: "136 CV", etiqueta: "CERO", precio: "desde 79.900 €", uso: "SUV ejecutivo" },
  { slug: "audi-q7-tfsi-e", marca: "Audi", modelo: "Q7 55 TFSI e", autonomia: "46 km eléctrica", potenciaTotal: "381 CV", potenciaElectrica: "136 CV", etiqueta: "CERO", precio: "desde 87.900 €", uso: "SUV premium largo" },
];

const PHEV_VS_BEV = [
  { aspecto: "Autonomía eléctrica", phev: "40–80 km", bev: "350–600 km" },
  { aspecto: "Recarga domicilio (AC)", phev: "2–4 h (cargador 7,4 kW)", bev: "6–12 h (cargador 11 kW)" },
  { aspecto: "Carga rápida DC", phev: "No disponible", bev: "Sí, 100–175 kW" },
  { aspecto: "Etiqueta DGT", phev: "CERO (autonomía >40 km)", bev: "CERO" },
  { aspecto: "Uso en viajes largos", phev: "Sin límite (gasolina)", bev: "Depende red carga DC" },
  { aspecto: "Ventajas para autónomos", phev: "Cuota deducible en IRPF", bev: "Cuota deducible en IRPF" },
];

const VENTAJAS_PHEV = [
  { icon: "ri-gas-station-line", titulo: "Sin ansiedad por autonomía", desc: "El motor de combustión elimina el problema de la red de carga en viajes largos. Ideal para profesionales con desplazamientos imprevisibles." },
  { icon: "ri-leaf-line", titulo: "Etiqueta CERO con uso mixto", desc: "Los PHEV con más de 40 km de autonomía eléctrica obtienen la etiqueta CERO de la DGT, con acceso a ZBE y ventajas de aparcamiento." },
  { icon: "ri-road-map-line", titulo: "Sin ansiedad por carga en viajes", desc: "Si no tienes cargador en tu destino, el motor de gasolina te cubre. El PHEV es la opción perfecta para quienes hacen viajes esporádicos de larga distancia y no quieren depender de la red de carga." },
  { icon: "ri-money-euro-circle-line", titulo: "Ahorro real en el día a día", desc: "El 70 % de los desplazamientos habituales son inferiores a 50 km. Con el PHEV cargado en casa, haces esos trayectos en modo eléctrico puro por menos de 1 € al día." },
];

function HeroPhev() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Híbridos enchufables PHEV" data-testid="section-phev-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Híbrido enchufable</span>
          <span className="text-gray-400 text-sm">PHEV · Etiqueta CERO · Modo eléctrico puro</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-phev-h1">
          Híbridos enchufables (PHEV):<br className="hidden md:block" /> lo mejor de dos mundos
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Los vehículos híbridos enchufables combinan motor eléctrico y de gasolina. Etiqueta CERO DGT, modo eléctrico puro para ciudad y autonomía ilimitada para viajes largos.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-phev-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600 — Consultar
          </a>
          <Link href="/promociones-hibridos" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-phev-catalogo">
            <i className="ri-arrow-right-line" aria-hidden="true"></i> Ver catálogo híbridos
          </Link>
        </div>
      </div>
    </section>
  );
}

function VentajasPhev() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Ventajas PHEV" data-testid="section-phev-ventajas">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Por qué elegir un híbrido enchufable?</h2>
      <AutoLinkedText text="Los híbridos enchufables son la opción perfecta si no tienes punto de carga garantizado en todos tus destinos o si haces viajes largos con frecuencia. Ofrecen etiqueta CERO, ahorro en trayectos cortos y autonomía ilimitada en viajes largos." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/vehiculos/hibridos/phev-enchufables"]} maxLinks={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VENTAJAS_PHEV.map((v, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-ventaja-phev-${i}`}>
            <i className={`${v.icon} text-[#ad023b] text-2xl mb-3 block`} aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{v.titulo}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparativaPhevBev() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Comparativa PHEV vs BEV" data-testid="section-phev-vs-bev">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">PHEV vs Eléctrico puro: ¿cuál te conviene?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">La elección depende fundamentalmente de los recorridos habituales y la disponibilidad de infraestructura de carga.</p>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Aspecto</th>
                <th className="text-left px-4 py-3 font-semibold text-blue-600">Híbrido enchufable (PHEV)</th>
                <th className="text-left px-4 py-3 font-semibold text-green-600">Eléctrico puro (BEV)</th>
              </tr>
            </thead>
            <tbody>
              {PHEV_VS_BEV.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50"} data-testid={`row-phev-bev-${i}`}>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.aspecto}</td>
                  <td className="px-4 py-3 text-blue-600">{row.phev}</td>
                  <td className="px-4 py-3 text-green-600">{row.bev}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default function VehiculosPhevPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-phev">
      <SEOHead
        title="Híbridos Enchufables (PHEV) para Empresa: Etiqueta CERO | Grupo Avisa"
        description="Híbridos enchufables PHEV en Andalucía: etiqueta CERO DGT, modo eléctrico puro y autonomía sin límites en viajes largos. Volkswagen, Audi y Škoda disponibles en Grupo Avisa."
        canonical="/vehiculos/hibridos/phev-enchufables"
      />
      <Navbar />
      <Breadcrumbs items={[{ name: "Híbridos", path: "/promociones-hibridos" }]} currentPage="PHEV Enchufables" />
      <main className="flex-1" role="main">
        <HeroPhev />
        <VentajasPhev />
        <ComparativaPhevBev />
      </main>
      <Footer />
    </div>
  );
}
