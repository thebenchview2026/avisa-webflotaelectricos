"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const MODELOS = [
  { slug: "volkswagen-id4-pro", marca: "Volkswagen", modelo: "ID.4 Pro", autonomia: 524, bateria: "77 kWh", potencia: "204 CV", carga: "135 kW DC", precio: "desde 44.900 €", tag: "Gran SUV" },
  { slug: "skoda-enyaq-iv-80", marca: "Škoda", modelo: "Enyaq iV 80", autonomia: 534, bateria: "82 kWh", potencia: "204 CV", carga: "135 kW DC", precio: "desde 42.500 €", tag: "Mejor relación €/km" },
  { slug: "audi-q4-etron-45", marca: "Audi", modelo: "Q4 e-tron 45", autonomia: 561, bateria: "82 kWh", potencia: "286 CV", carga: "135 kW DC", precio: "desde 52.900 €", tag: "Premium" },
  { slug: "audi-q8-etron-55", marca: "Audi", modelo: "Q8 e-tron 55", autonomia: 600, bateria: "114 kWh", potencia: "408 CV", carga: "170 kW DC", precio: "desde 89.900 €", tag: "Máxima autonomía" },
  { slug: "skoda-enyaq-coupe-rs", marca: "Škoda", modelo: "Enyaq Coupé RS", autonomia: 508, bateria: "82 kWh", potencia: "299 CV", carga: "175 kW DC", precio: "desde 58.900 €", tag: "Deportivo" },
  { slug: "volkswagen-id5-gtx", marca: "Volkswagen", modelo: "ID.5 GTX", autonomia: 480, bateria: "82 kWh", potencia: "299 CV", carga: "135 kW DC", precio: "desde 57.900 €", tag: "SUV Coupé" },
];

const CLAVES_AUTONOMIA = [
  { icon: "ri-road-map-line", titulo: "Autonomía WLTP vs real", desc: "La autonomía WLTP se mide en condiciones estándar de laboratorio. En la práctica, es habitual obtener un 80-90 % de la cifra oficial en autopista a 110 km/h, y hasta el 95 % en ciudad gracias a la frenada regenerativa." },
  { icon: "ri-temp-cold-line", titulo: "Impacto del frío en la batería", desc: "A temperaturas por debajo de 5 °C, la batería puede perder entre un 15 y un 25 % de su capacidad efectiva. Los modelos con bomba de calor (estándar en la mayoría de VW ID, Audi Q4 y Škoda Enyaq) reducen este impacto significativamente." },
  { icon: "ri-speed-line", titulo: "Velocidad y autonomía", desc: "A 130 km/h, el consumo puede ser hasta un 60 % mayor que a 90 km/h. Para viajes de larga distancia en autopista, planificar las paradas de carga según la velocidad real es fundamental." },
  { icon: "ri-battery-charge-line", titulo: "Degradación de batería a largo plazo", desc: "Las baterías de los modelos actuales mantienen más del 80 % de su capacidad a 160.000 km si se cargan correctamente. La carga regular al 100 % en DC acelera la degradación; cargar hasta el 80 % es la práctica recomendada para uso diario." },
];

function HeroAutonomia() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Coches eléctricos más de 400km autonomía" data-testid="section-autonomia-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">+400 km autonomía</span>
          <span className="text-gray-400 text-sm">Eléctricos puros · Etiqueta CERO DGT</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-autonomia-h1">
          Coches eléctricos con más de<br className="hidden md:block" /> 400 km de autonomía
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Modelos con autonomía real superior a 400 km WLTP disponibles en Grupo Avisa. Ideales si haces muchos kilómetros diarios o realizas viajes de larga distancia frecuentes.
        </p>
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-autonomia-tel">
          <i className="ri-phone-line" aria-hidden="true"></i> Consultar disponibilidad: 955 034 600
        </a>
      </div>
    </section>
  );
}

function ListaModelos() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Modelos eléctricos más de 400 km" data-testid="section-autonomia-modelos">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modelos disponibles con +400 km de autonomía</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Ordenados por autonomía WLTP. Todos con etiqueta CERO DGT. Disponibles con financiación, renting o compra directa.</p>
      <div className="space-y-4">
        {MODELOS.sort((a, b) => b.autonomia - a.autonomia).map((m, i) => (
          <Link href={`/vehiculos/electricos/${m.slug}`} key={i} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-[#ad023b] hover:shadow-md transition-all group" data-testid={`card-autonomia-modelo-${i}`}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">{m.tag}</span>
                </div>
                <p className="font-bold text-gray-900 dark:text-white">{m.marca} {m.modelo}</p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Autonomía WLTP</p>
                  <p className="font-bold text-green-600 text-lg">{m.autonomia} km</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Batería</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{m.bateria}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Carga DC</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{m.carga}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 text-xs">Precio</p>
                  <p className="font-semibold text-[#ad023b]">{m.precio}</p>
                </div>
              </div>
              <i className="ri-arrow-right-line text-gray-400 group-hover:text-[#ad023b] transition-colors hidden sm:block" aria-hidden="true"></i>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ClavesAutonomia() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Claves autonomía eléctrica real" data-testid="section-claves-autonomia">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Lo que debes saber sobre la autonomía real</h2>
        <AutoLinkedText text="La autonomía WLTP es el dato oficial del fabricante. En uso real, factores como la velocidad, la temperatura ambiente, el uso del climatizador y el estilo de conducción pueden reducirla o mantenerla. Los modelos actuales han mejorado mucho respecto a la primera generación." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/vehiculos/electricos/autonomia-mas-400km"]} maxLinks={2} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CLAVES_AUTONOMIA.map((c, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-clave-autonomia-${i}`}>
              <i className={`${c.icon} text-[#ad023b] text-2xl mb-3 block`} aria-hidden="true"></i>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{c.titulo}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaAutonomia() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center" aria-label="Prueba coche eléctrico autonomía" data-testid="section-autonomia-cta">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Prueba la autonomía real en Sevilla</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">Organiza un test drive en tu ruta habitual y comprueba la autonomía real del modelo que te interesa. Sin compromiso.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-autonomia-cta-tel">
          <i className="ri-phone-line" aria-hidden="true"></i> Pedir test drive
        </a>
        <Link href="/renting-coche-electrico" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 dark:text-gray-200 hover:border-[#ad023b] hover:text-[#ad023b] font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-autonomia-cta-flotas">
          Ver opciones de renting y financiación
        </Link>
      </div>
    </section>
  );
}

export default function VehiculosAutonomiaPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-autonomia">
      <SEOHead
        title="Coches Eléctricos con más de 400 km de Autonomía | Grupo Avisa"
        description="Modelos eléctricos con autonomía WLTP superior a 400 km disponibles en Grupo Avisa. Volkswagen ID.4, Audi Q4 e-tron, Škoda Enyaq. Perfectos para viajes de larga distancia."
        canonical="/vehiculos/electricos/autonomia-mas-400km"
      />
      <Navbar />
      <Breadcrumbs items={[{ name: "Coches eléctricos", path: "/promociones-electricos" }]} currentPage="+400 km de Autonomía" />
      <main className="flex-1" role="main">
        <HeroAutonomia />
        <ListaModelos />
        <ClavesAutonomia />
        <CtaAutonomia />
      </main>
      <Footer />
    </div>
  );
}
