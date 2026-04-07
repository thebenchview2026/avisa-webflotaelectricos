"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const MODELOS_CARGA_RAPIDA = [
  { slug: "audi-q8-etron-55", marca: "Audi", modelo: "Q8 e-tron 55", cargaDC: "170 kW", tiempo80: "~31 min", tipoConector: "CCS2", potencia: "408 CV" },
  { slug: "skoda-enyaq-coupe-rs", marca: "Škoda", modelo: "Enyaq Coupé RS", cargaDC: "175 kW", tiempo80: "~28 min", tipoConector: "CCS2", potencia: "299 CV" },
  { slug: "audi-q4-etron-45", marca: "Audi", modelo: "Q4 e-tron 45", cargaDC: "135 kW", tiempo80: "~38 min", tipoConector: "CCS2", potencia: "286 CV" },
  { slug: "volkswagen-id4-pro", marca: "Volkswagen", modelo: "ID.4 Pro", cargaDC: "135 kW", tiempo80: "~38 min", tipoConector: "CCS2", potencia: "204 CV" },
  { slug: "skoda-enyaq-iv-80", marca: "Škoda", modelo: "Enyaq iV 80", cargaDC: "135 kW", tiempo80: "~38 min", tipoConector: "CCS2", potencia: "204 CV" },
  { slug: "volkswagen-id3-pro", marca: "Volkswagen", modelo: "ID.3 Pro", cargaDC: "130 kW", tiempo80: "~35 min", tipoConector: "CCS2", potencia: "204 CV" },
];

const INFO_CARGA = [
  { icon: "ri-flashlight-line", titulo: "Qué es la carga rápida DC", desc: "La carga en corriente continua (DC) bypasea el cargador a bordo del vehículo y alimenta la batería directamente. Permite velocidades de 50 kW hasta más de 350 kW dependiendo del vehículo y el punto de carga." },
  { icon: "ri-charging-pile-2-line", titulo: "CCS2 como estándar en Europa", desc: "Todos los vehículos eléctricos de marcas europeas usan el conector CCS2 (Combined Charging System) para carga rápida en CC. Es el estándar obligatorio en Europa desde 2025 para nuevos puntos de carga públicos." },
  { icon: "ri-battery-2-charge-line", titulo: "La carga curva: del 20 % al 80 %", desc: "Los tiempos de carga rápida siempre se miden del 20 % al 80 %, que es cuando la batería acepta la máxima potencia. De 0 % a 20 % y de 80 % a 100 %, la velocidad se reduce para proteger la batería." },
  { icon: "ri-map-pin-2-line", titulo: "Red pública en Andalucía", desc: "Andalucía cuenta con más de 800 puntos de carga rápida públicos. Las redes Iberdrola, Repsol, Endesa y Charge Now son las más presentes. Con 130-175 kW, la mayoría de paradas técnicas se resuelven en 20-30 minutos." },
];

function HeroCargaRapida() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Coches eléctricos carga rápida DC" data-testid="section-carga-rapida-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Carga rápida DC</span>
          <span className="text-gray-400 text-sm">CCS2 · 100-175 kW · &lt;40 min al 80 %</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-carga-rapida-h1">
          Coches eléctricos con<br className="hidden md:block" /> carga rápida DC en Andalucía
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Modelos con capacidad de carga rápida en corriente continua de más de 100 kW disponibles en Grupo Avisa. Del 20 % al 80 % en menos de 40 minutos.
        </p>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-carga-rapida-tel">
          <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600 — Consultar
        </a>
      </div>
    </section>
  );
}

function TablaModelosCarga() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Comparativa carga rápida modelos" data-testid="section-tabla-carga-rapida">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Comparativa de carga rápida por modelo</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Tiempos del 20 % al 80 % en cargador DC. Condiciones reales en verano (20-25 °C) con batería a temperatura óptima.</p>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Modelo</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Máx. carga DC</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">20→80 % aprox.</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Conector</th>
            </tr>
          </thead>
          <tbody>
            {MODELOS_CARGA_RAPIDA.map((m, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-750"} data-testid={`row-carga-${i}`}>
                <td className="px-4 py-3">
                  <Link href={`/vehiculos/electricos/${m.slug}`} className="font-medium text-[#ad023b] hover:underline">{m.marca} {m.modelo}</Link>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">{m.cargaDC}</td>
                <td className="px-4 py-3 text-green-600 font-semibold">{m.tiempo80}</td>
                <td className="px-4 py-3 text-gray-500">{m.tipoConector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function InfoCargaRapida() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Información sobre carga rápida DC" data-testid="section-info-carga-rapida">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Carga rápida DC: lo que debes saber</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INFO_CARGA.map((info, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-info-carga-${i}`}>
              <i className={`${info.icon} text-[#ad023b] text-2xl mb-3 block`} aria-hidden="true"></i>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{info.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{info.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function VehiculosCargaRapidaPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-carga-rapida">
      <SEOHead
        title="Coches Eléctricos con Carga Rápida DC: hasta 175 kW | Grupo Avisa"
        description="Modelos eléctricos con carga rápida DC (CCS2) de más de 100 kW disponibles en Grupo Avisa. Del 20 % al 80 % en menos de 40 minutos. Volkswagen, Audi, Škoda, CUPRA."
        canonical="/vehiculos/electricos/carga-rapida-dc"
      />
      <Navbar />
      <Breadcrumbs items={[{ name: "Coches eléctricos", path: "/promociones-electricos" }]} currentPage="Carga Rápida DC" />
      <main className="flex-1" role="main">
        <HeroCargaRapida />
        <TablaModelosCarga />
        <InfoCargaRapida />
      </main>
      <Footer />
    </div>
  );
}
