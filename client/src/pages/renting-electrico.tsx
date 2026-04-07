"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const INCLUYE_RENTING = [
  { icon: "ri-car-line", titulo: "Vehículo nuevo siempre", desc: "Conduces un coche nuevo durante todo el contrato. Al terminar, lo renuevas por el modelo más reciente. Sin preocuparte de revenderlo ni de la depreciación." },
  { icon: "ri-tools-line", titulo: "Mantenimiento incluido", desc: "Todas las revisiones oficiales, neumáticos y reparaciones cubiertas. Tu único gasto extra es la electricidad para cargar." },
  { icon: "ri-shield-check-line", titulo: "Seguro todo riesgo", desc: "La mayoría de contratos incluyen seguro todo riesgo. Si tienes un accidente, el proceso está cubierto sin necesidad de buscar seguro por tu cuenta." },
  { icon: "ri-money-euro-circle-line", titulo: "Cuota fija mensual", desc: "Sabes exactamente cuánto pagas cada mes. Sin sorpresas, sin grandes desembolsos iniciales. Solo una cuota que incluye todo." },
  { icon: "ri-leaf-line", titulo: "Siempre en regla medioambiental", desc: "Con el renting renuevas cada 2-4 años: siempre tendrás el coche eléctrico con la mejor tecnología y mayor autonomía disponible." },
  { icon: "ri-refresh-line", titulo: "Renovación sin complicaciones", desc: "Al finalizar el contrato, Grupo Avisa gestiona toda la logística de devolución y entrega del nuevo vehículo. Sin papeleo extra." },
];

const VENTAJAS_COMPARADAS = [
  { aspecto: "Desembolso inicial", renting: "0 € entrada", compra: "35.000–55.000 €" },
  { aspecto: "Cuota mensual total", renting: "~350–700 € (todo incluido)", compra: "Solo financiación, sin seguros ni mant." },
  { aspecto: "Mantenimiento", renting: "Incluido", compra: "De tu bolsillo" },
  { aspecto: "Seguro", renting: "Incluido en muchos contratos", compra: "Coste adicional" },
  { aspecto: "Depreciación", renting: "No te afecta", compra: "Pierdes valor desde el primer día" },
  { aspecto: "Tecnología", renting: "Siempre actualizada al renovar", compra: "Queda desfasada con el tiempo" },
  { aspecto: "Al final del periodo", renting: "Cambias a modelo nuevo", compra: "Tienes que venderlo tú" },
];

const MODELOS_RENTING = [
  { slug: "volkswagen-id3-pro", marca: "Volkswagen", modelo: "ID.3 Pro", autonomia: "426 km", cuota: "desde 399 €/mes", desc: "Compacto ideal para ciudad y carretera" },
  { slug: "volkswagen-id4-pro", marca: "Volkswagen", modelo: "ID.4 Pro", autonomia: "524 km", cuota: "desde 529 €/mes", desc: "SUV familiar con gran autonomía" },
  { slug: "skoda-enyaq-iv-80", marca: "Škoda", modelo: "Enyaq iV 80", autonomia: "534 km", cuota: "desde 479 €/mes", desc: "La mejor relación calidad-precio" },
  { slug: "cupra-born-eboost", marca: "CUPRA", modelo: "Born e-Boost", autonomia: "426 km", cuota: "desde 429 €/mes", desc: "Conducción deportiva y eléctrica" },
];

const FAQS_RENTING = [
  { q: "¿Cuántos kilómetros puedo hacer al año en renting?", a: "Lo pactáis al firmar el contrato: normalmente de 10.000 a 30.000 km/año. Si superas los km acordados, se aplica un cargo por kilómetro extra. Es importante calcular bien tu uso real antes de firmar." },
  { q: "¿El renting tiene alguna ventaja fiscal para mí?", a: "Para autónomos, la cuota de renting puede ser deducible en IRPF. Para particulares asalariados, el coche de renting puede estar incluido en un plan de retribución flexible, reduciendo el impacto en el IRPF mensual." },
  { q: "¿Puedo comprar el coche al terminar el renting?", a: "En el renting operativo estándar no hay opción de compra. Si quieres tener esa posibilidad, existe el leasing con opción de compra. Pregúntanos por las dos opciones y te asesoramos sin compromiso." },
  { q: "¿Qué pasa si el coche sufre un accidente en renting?", a: "Si el contrato incluye seguro todo riesgo, el proceso es el habitual con la aseguradora. En la mayoría de contratos de renting para eléctricos ya está incluido; confirma este punto antes de firmar." },
];

function HeroRenting() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Renting coches eléctricos particulares" data-testid="section-renting-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Renting eléctrico</span>
          <span className="text-gray-400 text-sm">Sin entrada · Todo incluido · Siempre el modelo más nuevo</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-renting-h1">
          Renting de coches eléctricos:<br className="hidden md:block" /> cuota fija, sin sorpresas
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Conduce un coche eléctrico nuevo sin desembolso inicial. Cuota mensual fija con mantenimiento, seguro y gestión de carga incluidos. Renueva al nuevo modelo al terminar el contrato.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-renting-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> Pide tu oferta: 955 034 600
          </a>
          <a href="https://wa.me/34621261541?text=Hola%2C%20quiero%20información%20sobre%20renting%20de%20coches%20eléctricos" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-renting-whatsapp">
            <i className="ri-whatsapp-line" aria-hidden="true"></i> Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function QueIncluyeRenting() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Qué incluye el renting eléctrico" data-testid="section-renting-incluye">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Qué incluye el renting de un coche eléctrico?</h2>
      <AutoLinkedText text="El renting es un alquiler a largo plazo (2-4 años) con todo incluido. Pagas una cuota mensual fija y no tienes que ocuparte de nada más. Es la forma más cómoda de estrenar un coche eléctrico sin desembolso inicial." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/renting-coche-electrico"]} maxLinks={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INCLUYE_RENTING.map((item, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-incluye-${i}`}>
            <i className={`${item.icon} text-[#ad023b] text-2xl mb-3 block`} aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.titulo}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RentingVsCompra() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Renting vs compra coche eléctrico" data-testid="section-renting-vs-compra">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Renting vs comprar: ¿qué te conviene más?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">No hay una respuesta única. Depende de cuánto valoras la tranquilidad de una cuota fija frente a ser propietario del vehículo.</p>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Aspecto</th>
                <th className="text-left px-4 py-3 font-semibold text-[#ad023b]">Renting</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 dark:text-gray-400">Compra directa</th>
              </tr>
            </thead>
            <tbody>
              {VENTAJAS_COMPARADAS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50 dark:bg-gray-750"} data-testid={`row-renting-${i}`}>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.aspecto}</td>
                  <td className="px-4 py-3 text-green-600 font-medium">{row.renting}</td>
                  <td className="px-4 py-3 text-gray-500">{row.compra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ModelosRenting() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Modelos disponibles en renting eléctrico" data-testid="section-renting-modelos">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modelos disponibles en renting</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Cuotas orientativas para contratos de 36 meses / 30.000 km anuales. Consulta condiciones exactas para tu caso.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODELOS_RENTING.map((m, i) => (
          <Link href={`/vehiculos/electricos/${m.slug}`} key={i} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-[#ad023b] hover:shadow-md transition-all group" data-testid={`card-modelo-renting-${i}`}>
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{m.marca} {m.modelo}</p>
                <p className="text-gray-500 text-sm">{m.desc}</p>
              </div>
              <span className="text-[#ad023b] font-bold text-sm shrink-0 ml-2">{m.cuota}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <i className="ri-battery-charge-line" aria-hidden="true"></i>
              <span>{m.autonomia} WLTP</span>
              <span className="ml-auto group-hover:text-[#ad023b] transition-colors">Ver ficha →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FaqsRenting() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Preguntas frecuentes renting eléctrico" data-testid="section-renting-faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Preguntas frecuentes sobre el renting eléctrico</h2>
        <div className="space-y-5">
          {FAQS_RENTING.map((f, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`faq-renting-${i}`}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <i className="ri-question-line text-[#ad023b] mt-0.5 shrink-0" aria-hidden="true"></i>
                {f.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 ml-6 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaRenting() {
  return (
    <section className="bg-[#ad023b] text-white py-16" aria-label="CTA renting eléctrico" data-testid="section-renting-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Calcula tu cuota de renting ahora</h2>
        <p className="text-xl opacity-90 mb-8">Cuota personalizada en 24 horas. Entrega en Sevilla, Huelva, Córdoba, Badajoz y Cáceres.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-white text-[#ad023b] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors" data-testid="button-renting-cta-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600
          </a>
          <Link href="/promociones-electricos" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-renting-cta-catalogo">
            Ver todos los modelos eléctricos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function RentingElectricoPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-renting-electrico">
      <SEOHead
        title="Renting de Coches Eléctricos: Cuota Fija y Sin Entrada | Grupo Avisa"
        description="Renting de coches eléctricos sin entrada. Cuota fija mensual con mantenimiento, seguro y gestión de carga incluidos. Volkswagen ID.3, Audi Q4 e-tron, Škoda Enyaq."
        canonical="/renting-coche-electrico"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Renting Coche Eléctrico" />
      <main className="flex-1" role="main">
        <HeroRenting />
        <QueIncluyeRenting />
        <RentingVsCompra />
        <ModelosRenting />
        <FaqsRenting />
        <CtaRenting />
      </main>
      <Footer />
    </div>
  );
}
