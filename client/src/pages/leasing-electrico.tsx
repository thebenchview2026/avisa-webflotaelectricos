"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

const LEASING_VS_OTRAS = [
  { aspecto: "Desembolso inicial", leasing: "Pequeña entrada (10–20 %)", renting: "0 €", financiacion: "Depende del banco" },
  { aspecto: "¿Soy propietario?", leasing: "Al final, con opción de compra", renting: "No, devuelves el coche", financiacion: "Sí, desde el primer día" },
  { aspecto: "Mantenimiento", leasing: "No incluido", renting: "Sí, incluido", financiacion: "No incluido" },
  { aspecto: "Cuota mensual", leasing: "Baja (solo pagas el uso + intereses)", renting: "Más alta (todo incluido)", financiacion: "Media" },
  { aspecto: "Al final del contrato", leasing: "Compras, devuelves o renuevas", renting: "Devuelves", financiacion: "El coche ya es tuyo" },
  { aspecto: "Depreciación", leasing: "La asume el financiero hasta la opción de compra", renting: "No te afecta", financiacion: "La asumes tú como propietario" },
];

const CUANDO_LEASING = [
  { icon: "ri-money-euro-circle-line", titulo: "Quieres cuota baja sin entrada alta", desc: "El leasing permite acceder a un coche eléctrico con una cuota mensual más baja que la financiación tradicional, ya que solo pagas la depreciación durante el contrato, no el valor total." },
  { icon: "ri-key-2-line", titulo: "Quieres tener la opción de quedártelo", desc: "A diferencia del renting, el leasing incluye una opción de compra al final. Si el coche vale más que el precio residual pactado, ejerces la opción; si no, simplemente lo devuelves." },
  { icon: "ri-time-line", titulo: "Vas a usarlo 3–5 años", desc: "El leasing es especialmente interesante para contratos de 3 a 5 años. Con menos tiempo, el renting puede ser más conveniente. Con más, la compra directa suele ganar." },
  { icon: "ri-user-line", titulo: "Eres autónomo o tienes una pequeña empresa", desc: "Para autónomos, las cuotas de leasing son deducibles en IRPF. También es habitual en pequeñas empresas que quieren amortizar el vehículo sin inmovilizar capital." },
];

const MODELOS_LEASING = [
  { slug: "volkswagen-id3-pro", marca: "Volkswagen", modelo: "ID.3 Pro", precio: "36.900 €", cuota: "~289 €/mes", plazo: "48 meses / 10 % entrada" },
  { slug: "volkswagen-id4-pro", marca: "Volkswagen", modelo: "ID.4 Pro", precio: "44.900 €", cuota: "~389 €/mes", plazo: "48 meses / 10 % entrada" },
  { slug: "skoda-enyaq-iv-80", marca: "Škoda", modelo: "Enyaq iV 80", precio: "42.500 €", cuota: "~359 €/mes", plazo: "48 meses / 10 % entrada" },
  { slug: "audi-q4-etron-45", marca: "Audi", modelo: "Q4 e-tron 45", precio: "52.900 €", cuota: "~469 €/mes", plazo: "48 meses / 10 % entrada" },
];

function HeroLeasing() {
  return (
    <section className="bg-gradient-to-br from-gray-950 to-gray-800 text-white pt-16 pb-16" aria-label="Leasing coche eléctrico particular" data-testid="section-leasing-hero">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[#ad023b] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">Leasing eléctrico</span>
          <span className="text-gray-400 text-sm">Cuota baja · Opción de compra · Financia el 90 %</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6" data-testid="text-leasing-h1">
          Leasing de coche eléctrico:<br className="hidden md:block" /> cuota baja con opción de compra
        </h1>
        <div className="w-24 h-1 bg-[#ad023b] rounded-full mb-8"></div>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl">
          Con el leasing pagas solo el uso del coche durante el contrato. Si al final te lo quieres quedar, ejerces la opción de compra. Si no, lo devuelves o cambias por un modelo nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-leasing-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> Calcular cuota: 955 034 600
          </a>
          <Link href="/renting-coche-electrico" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-leasing-renting">
            Comparar con renting
          </Link>
        </div>
      </div>
    </section>
  );
}

function CuandoLeasing() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Cuándo conviene el leasing" data-testid="section-cuando-leasing">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Cuándo conviene el leasing para un coche eléctrico?</h2>
      <AutoLinkedText text="El leasing no es para todo el mundo. Te conviene especialmente si quieres pagar poco cada mes, tienes la posibilidad de quedarte el coche al final y usas el vehículo de manera intensiva." as="p" className="text-gray-600 dark:text-gray-400 mb-10 text-lg" excludeUrls={["/leasing-coche-electrico"]} maxLinks={2} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CUANDO_LEASING.map((c, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6" data-testid={`card-leasing-${i}`}>
            <i className={`${c.icon} text-[#ad023b] text-2xl mb-3 block`} aria-hidden="true"></i>
            <h3 className="font-bold text-gray-900 dark:text-white mb-2">{c.titulo}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ComparativaFinanciacion() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16" aria-label="Comparativa leasing renting financiación" data-testid="section-leasing-comparativa">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Leasing, renting o financiación: ¿cuál elegir?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Las tres formas de financiar un coche eléctrico tienen sentido en distintas situaciones. Esta comparativa te ayudará a decidir.</p>
        <div className="overflow-x-auto">
          <table className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-900 dark:text-white">Aspecto</th>
                <th className="text-left px-4 py-3 font-semibold text-[#ad023b]">Leasing</th>
                <th className="text-left px-4 py-3 font-semibold text-blue-600">Renting</th>
                <th className="text-left px-4 py-3 font-semibold text-green-600">Financiación</th>
              </tr>
            </thead>
            <tbody>
              {LEASING_VS_OTRAS.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "" : "bg-gray-50"} data-testid={`row-leasing-${i}`}>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.aspecto}</td>
                  <td className="px-4 py-3 text-[#ad023b]">{row.leasing}</td>
                  <td className="px-4 py-3 text-blue-600">{row.renting}</td>
                  <td className="px-4 py-3 text-green-600">{row.financiacion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ModelosLeasing() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-label="Modelos disponibles en leasing eléctrico" data-testid="section-leasing-modelos">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Simula tu cuota de leasing</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Cuotas orientativas a 48 meses con un 10 % de entrada. Consulta condiciones exactas y personalizadas.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MODELOS_LEASING.map((m, i) => (
          <Link href={`/vehiculos/electricos/${m.slug}`} key={i} className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:border-[#ad023b] hover:shadow-md transition-all group" data-testid={`card-modelo-leasing-${i}`}>
            <p className="font-bold text-gray-900 dark:text-white mb-1">{m.marca} {m.modelo}</p>
            <p className="text-gray-500 text-sm mb-3">PVP: {m.precio} · {m.plazo}</p>
            <div className="flex justify-between items-center">
              <span className="text-[#ad023b] font-bold text-lg">{m.cuota}</span>
              <span className="text-sm text-gray-400 group-hover:text-[#ad023b] transition-colors">Ver ficha →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function CtaLeasing() {
  return (
    <section className="bg-[#ad023b] text-white py-16" aria-label="CTA leasing eléctrico" data-testid="section-leasing-cta">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Calcula tu leasing personalizado</h2>
        <p className="text-xl opacity-90 mb-8">Dinos qué modelo te interesa y en cuántos meses quieres pagarlo. Te damos la cuota exacta sin compromiso.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+34955034600" className="inline-flex items-center justify-center gap-2 bg-white text-[#ad023b] hover:bg-gray-100 font-bold px-8 py-4 rounded-md transition-colors" data-testid="button-leasing-cta-tel">
            <i className="ri-phone-line" aria-hidden="true"></i> 955 034 600
          </a>
          <a href="mailto:info@grupoavisa.com" className="inline-flex items-center justify-center gap-2 border border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-md transition-colors" data-testid="button-leasing-cta-email">
            <i className="ri-mail-line" aria-hidden="true"></i> Solicitar simulación por email
          </a>
        </div>
      </div>
    </section>
  );
}

export default function LeasingElectricoPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-leasing-electrico">
      <SEOHead
        title="Leasing Coche Eléctrico: Cuota Baja con Opción de Compra | Grupo Avisa"
        description="Leasing de coches eléctricos para particulares y autónomos en Andalucía. Cuota mensual baja, opción de compra al final. Comparativa leasing vs renting y financiación."
        canonical="/leasing-coche-electrico"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Leasing Coche Eléctrico" />
      <main className="flex-1" role="main">
        <HeroLeasing />
        <CuandoLeasing />
        <ComparativaFinanciacion />
        <ModelosLeasing />
        <CtaLeasing />
      </main>
      <Footer />
    </div>
  );
}
