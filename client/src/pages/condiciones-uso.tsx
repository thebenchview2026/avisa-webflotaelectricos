"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function CondicionesUsoPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
      <SEOHead title="Condiciones de Uso" description="Condiciones generales de uso del sitio web de Grupo Avisa. Normas de acceso y utilización del portal." canonical="/condiciones-uso" noindex />
      <Navbar />
      <main className="flex-1 bg-white pt-12 pb-20" role="main" data-testid="page-condiciones-uso">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 text-sm flex items-center gap-2 text-slate-500" aria-label="Migas de pan">
            <Link href="/" className="hover:text-[#ad023b] transition-colors" data-testid="link-inicio">Inicio</Link>
            <i className="ri-arrow-right-s-line text-slate-400"></i>
            <span className="text-slate-900 font-medium">Condiciones de Uso</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-12" data-testid="text-title">Condiciones de Uso</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Aceptación de las Condiciones</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                El acceso y uso de este sitio web atribuye al visitante la condición de usuario y supone la aceptación plena y sin reservas de todas y cada una de las presentes condiciones de uso. Si el usuario no está de acuerdo con alguna de las condiciones aquí establecidas, no deberá usar ni acceder a este sitio web.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Condiciones de Acceso y Uso</h2>
              <p className="text-slate-600 leading-relaxed mb-4">El usuario se compromete a hacer un uso adecuado de los contenidos y servicios ofrecidos, absteniéndose de:</p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li>Utilizar los contenidos con fines ilícitos o contrarios a la buena fe y al ordenamiento legal vigente.</li>
                <li>Provocar daños en los sistemas físicos y lógicos de GRUPO AVISA, de sus proveedores o de terceras personas.</li>
                <li>Introducir o difundir virus informáticos o cualesquiera otros sistemas que sean susceptibles de provocar daños.</li>
                <li>Intentar acceder o utilizar las cuentas de otros usuarios y modificar sus datos.</li>
                <li>Reproducir, copiar, distribuir o poner a disposición de terceros los contenidos del sitio web sin autorización.</li>
                <li>Suprimir, eludir o manipular los derechos de propiedad intelectual e industrial y demás datos identificativos de los derechos de GRUPO AVISA.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Formularios y Solicitudes</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Los formularios disponibles en el sitio web (contacto, solicitud de cita, Plan MOVES, etc.) requieren que el usuario proporcione información veraz y actualizada. El usuario será responsable de la veracidad de los datos facilitados, reservándose GRUPO AVISA el derecho de excluir de los servicios a todo usuario que haya facilitado datos falsos.
              </p>
              <p className="text-slate-600 leading-relaxed">
                El envío de un formulario no supone compromiso contractual por parte de GRUPO AVISA. Los precios, disponibilidad y condiciones mostrados en el sitio web tienen carácter informativo y pueden variar sin previo aviso.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Precios y Promociones</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Los precios y promociones mostrados en el sitio web tienen carácter informativo y orientativo. Los precios definitivos serán los comunicados directamente por el concesionario al momento de la formalización de la operación. Las promociones están sujetas a disponibilidad y condiciones específicas que serán informadas en cada caso.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mt-4">
                <p className="text-blue-800 text-sm flex items-start gap-2">
                  <i className="ri-information-line text-blue-600 mt-0.5 flex-shrink-0"></i>
                  <span>Las ayudas del Plan MOVES están sujetas a la disponibilidad de fondos públicos y al cumplimiento de los requisitos establecidos por la normativa vigente.</span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Disponibilidad del Servicio</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GRUPO AVISA no garantiza la disponibilidad y continuidad del funcionamiento del sitio web. Cuando ello sea razonablemente posible, se advertirá previamente de las interrupciones en el funcionamiento del sitio web. GRUPO AVISA no garantiza la utilidad del sitio web para la realización de ninguna actividad en particular.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Protección de Datos</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                El tratamiento de datos personales se rige por nuestra <Link href="/terminos" className="text-[#ad023b] hover:underline">Política de Privacidad</Link>, que forma parte integrante de las presentes condiciones de uso.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Modificaciones</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GRUPO AVISA se reserva el derecho de modificar, en cualquier momento y sin necesidad de previo aviso, las presentes condiciones de uso. El usuario deberá leer atentamente las condiciones de uso en cada una de las ocasiones en que acceda al sitio web, ya que pueden haber sido objeto de modificación.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Legislación Aplicable</h2>
              <p className="text-slate-600 leading-relaxed">
                Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someten a los Juzgados y Tribunales de Sevilla.
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
