"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
      <SEOHead title="Aviso Legal" description="Aviso legal de Grupo Avisa. Datos identificativos, condiciones de uso del sitio web y responsabilidades legales." canonical="/aviso-legal" noindex />
      <Navbar />
      <main className="flex-1 bg-white pt-12 pb-20" role="main" data-testid="page-aviso-legal">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 text-sm flex items-center gap-2 text-slate-500" aria-label="Migas de pan">
            <Link href="/" className="hover:text-[#ad023b] transition-colors" data-testid="link-inicio">Inicio</Link>
            <i className="ri-arrow-right-s-line text-slate-400"></i>
            <span className="text-slate-900 font-medium">Aviso Legal</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-12" data-testid="text-title">Aviso Legal</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Datos Identificativos</h2>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-slate-600 leading-relaxed">
                  En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se informa:
                </p>
                <ul className="mt-4 space-y-2 text-slate-600">
                  <li><strong>Denominación social:</strong> GRUPO AVISA, S.L.</li>
                  <li><strong>CIF:</strong> B-41234567</li>
                  <li><strong>Domicilio social:</strong> C/ Alhami 2-4, 41020 Sevilla (Sevilla)</li>
                  <li><strong>Teléfono:</strong> <a href="tel:+34955034600" className="inline-flex items-center gap-1 bg-[#ad023b] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#8d0230] transition-colors"><i className="ri-phone-line"></i> Llámame</a></li>
                  <li><strong>Email:</strong> <a href="mailto:comunicacion@grupoavisa.com" className="text-[#ad023b] hover:underline">comunicacion@grupoavisa.com</a></li>
                  <li><strong>Actividad:</strong> Concesionario oficial de vehículos Volkswagen, Audi y Škoda</li>
                  <li><strong>Inscripción:</strong> Inscrita en el Registro Mercantil de Sevilla</li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Objeto del Sitio Web</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                El presente sitio web tiene como finalidad principal proporcionar información sobre los productos y servicios ofrecidos por GRUPO AVISA, en particular sobre su flota de vehículos eléctricos e híbridos enchufables, servicios de postventa, planes de financiación y subvenciones disponibles.
              </p>
              <p className="text-slate-600 leading-relaxed">
                GRUPO AVISA se reserva el derecho de modificar, en cualquier momento y sin necesidad de previo aviso, la presentación, configuración, información y contenidos del sitio web.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Propiedad Intelectual e Industrial</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, tecnología, software, links, contenidos audiovisuales, diseño gráfico, código fuente, etc.), así como las marcas, nombres comerciales o signos distintivos, son propiedad de GRUPO AVISA o de terceros que han autorizado su uso, quedando todos los derechos reservados.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de los contenidos sin la autorización previa y expresa de GRUPO AVISA.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Exclusión de Responsabilidad</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GRUPO AVISA no se hace responsable de:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Los daños y perjuicios que pudieran derivarse de interferencias, omisiones, interrupciones, virus informáticos, averías y/o desconexiones en el funcionamiento del sistema electrónico.</li>
                <li>Los retrasos o bloqueos en el uso causados por deficiencias o sobrecargas de Internet o en otros sistemas electrónicos.</li>
                <li>La imposibilidad de dar el servicio o permitir el acceso por causas no imputables a GRUPO AVISA.</li>
                <li>La falta de veracidad, exactitud, exhaustividad y/o actualidad de los contenidos.</li>
                <li>Los contenidos y opiniones de terceros o la información contenida en páginas web de terceros a las que se pueda acceder por enlaces desde el sitio web.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Enlaces a Terceros</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                El sitio web puede contener enlaces a páginas web de terceros. GRUPO AVISA no asume ninguna responsabilidad por el contenido, informaciones o servicios que pudieran aparecer en dichos sitios, que tendrán exclusivamente carácter informativo y que en ningún caso implican relación alguna entre GRUPO AVISA y las personas o entidades titulares de tales contenidos o titulares de los sitios donde se encuentren.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Legislación Aplicable y Jurisdicción</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Las presentes condiciones de uso se rigen por la legislación española. Para la resolución de cualquier controversia que pudiera surgir, las partes se someten a los Juzgados y Tribunales de Sevilla, salvo que la ley establezca otro fuero.
              </p>
            </section>
          </div>

          <p className="text-slate-500 text-sm mt-12">Última actualización: Enero 2025</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
