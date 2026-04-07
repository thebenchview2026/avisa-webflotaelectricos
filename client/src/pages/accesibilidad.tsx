"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function AccesibilidadPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
      <SEOHead title="Declaración de Accesibilidad" description="Compromiso de accesibilidad web de Grupo Avisa. Nivel de conformidad WCAG 2.1 y medidas adoptadas." canonical="/accesibilidad" noindex />
      <Navbar />
      <main className="flex-1 bg-white pt-12 pb-20" role="main" data-testid="page-accesibilidad">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 text-sm flex items-center gap-2 text-slate-500" aria-label="Migas de pan">
            <Link href="/" className="hover:text-[#ad023b] transition-colors" data-testid="link-inicio">Inicio</Link>
            <i className="ri-arrow-right-s-line text-slate-400"></i>
            <span className="text-slate-900 font-medium">Declaración de Accesibilidad</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-12" data-testid="text-title">Declaración de Accesibilidad</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Compromiso con la Accesibilidad</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GRUPO AVISA se compromete a hacer accesible su sitio web de conformidad con el Real Decreto 1112/2018, de 7 de septiembre, sobre accesibilidad de los sitios web y aplicaciones para dispositivos móviles del sector público, que transpone la Directiva (UE) 2016/2102 del Parlamento Europeo y del Consejo.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Aunque no estamos obligados por esta normativa al ser una entidad privada, adoptamos voluntariamente sus principios para garantizar que nuestros servicios digitales sean accesibles para el mayor número de personas posible.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Situación de Conformidad</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Este sitio web es <strong>parcialmente conforme</strong> con las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1, nivel AA, debido a las excepciones y a la falta de conformidad de los aspectos que se indican a continuación.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Medidas de Accesibilidad Implementadas</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Hemos implementado las siguientes medidas para garantizar la accesibilidad del sitio web:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li><strong>Navegación por teclado:</strong> Todos los elementos interactivos son accesibles mediante teclado.</li>
                <li><strong>Contraste de colores:</strong> Se mantienen ratios de contraste mínimos entre texto y fondo según WCAG 2.1 nivel AA.</li>
                <li><strong>Textos alternativos:</strong> Las imágenes incluyen atributos alt descriptivos.</li>
                <li><strong>Estructura semántica:</strong> El contenido está organizado con encabezados jerárquicos y etiquetas semánticas HTML5.</li>
                <li><strong>Formularios accesibles:</strong> Los campos de formulario incluyen etiquetas asociadas y mensajes de error descriptivos.</li>
                <li><strong>Diseño responsive:</strong> El sitio web se adapta a diferentes tamaños de pantalla y dispositivos.</li>
                <li><strong>Tamaño de texto ajustable:</strong> El contenido es legible y funcional cuando se amplía el texto al 200%.</li>
                <li><strong>Áreas de interacción:</strong> Los elementos interactivos tienen un tamaño mínimo de 44x44 píxeles.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Contenido No Accesible</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                El contenido que se recoge a continuación no es accesible por los siguientes motivos:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Algunos vídeos incrustados de terceros pueden no disponer de subtítulos o audiodescripción.</li>
                <li>Algunos documentos PDF enlazados pueden no estar completamente adaptados.</li>
                <li>El mapa interactivo de concesionarios puede presentar limitaciones de accesibilidad para usuarios de lectores de pantalla (se proporciona información alternativa en texto).</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Tecnologías Utilizadas</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Este sitio web ha sido desarrollado con las siguientes tecnologías accesibles:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>HTML5 semántico</li>
                <li>CSS3 con diseño responsive</li>
                <li>JavaScript (React) con gestión de foco y roles ARIA</li>
                <li>HTTPS para conexiones seguras</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Observaciones y Contacto</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Si detecta algún problema de accesibilidad en nuestro sitio web o necesita acceder a algún contenido en un formato alternativo, no dude en ponerse en contacto con nosotros:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-slate-700 mb-2"><strong>GRUPO AVISA — Departamento de Comunicación</strong></p>
                <p className="text-slate-600 mb-2">C/ Alhami 2-4, 41020 Sevilla (Sevilla)</p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <a href="tel:+34955034600" className="inline-flex items-center gap-1.5 bg-[#ad023b] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#8d0230] transition-colors">
                    <i className="ri-phone-line"></i> Llámame
                  </a>
                  <a href="mailto:comunicacion@grupoavisa.com" className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-300 transition-colors">
                    <i className="ri-mail-line"></i> comunicacion@grupoavisa.com
                  </a>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mt-4">
                Nos comprometemos a responder a las comunicaciones sobre accesibilidad en un plazo máximo de 15 días hábiles.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Procedimiento de Aplicación</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Si tras realizar una solicitud de información accesible o queja considera que la respuesta no ha sido satisfactoria, puede presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[#ad023b] hover:underline">www.aepd.es</a>).
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
