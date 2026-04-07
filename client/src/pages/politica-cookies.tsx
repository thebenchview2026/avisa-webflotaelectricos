"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PoliticaCookiesPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
      <SEOHead title="Política de Cookies" description="Información sobre las cookies utilizadas en el sitio web de Grupo Avisa, tipos de cookies y cómo gestionarlas." canonical="/politica-cookies" noindex />
      <Navbar />
      <main className="flex-1 bg-white pt-12 pb-20" role="main" data-testid="page-politica-cookies">
        <div className="max-w-4xl mx-auto px-6">
          <nav className="mb-8 text-sm flex items-center gap-2 text-slate-500" aria-label="Migas de pan">
            <Link href="/" className="hover:text-[#ad023b] transition-colors" data-testid="link-inicio">Inicio</Link>
            <i className="ri-arrow-right-s-line text-slate-400"></i>
            <span className="text-slate-900 font-medium">Política de Cookies</span>
          </nav>

          <h1 className="text-4xl font-bold text-slate-900 mb-12" data-testid="text-title">Política de Cookies</h1>

          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. ¿Qué son las cookies?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Las cookies son pequeños archivos de texto que se almacenan en su dispositivo (ordenador, tablet o teléfono móvil) cuando visita un sitio web. Las cookies permiten que el sitio web recuerde sus acciones y preferencias durante un período de tiempo, para que no tenga que volver a introducirlos cada vez que vuelva al sitio o navegue de una página a otra.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. ¿Qué cookies utilizamos?</h2>

              <div className="overflow-x-auto my-6 rounded-xl border border-slate-200">
                <table className="min-w-full">
                  <thead className="bg-gray-900 text-white">
                    <tr>
                      <th className="px-5 py-3 text-left text-sm font-semibold">Tipo</th>
                      <th className="px-5 py-3 text-left text-sm font-semibold">Finalidad</th>
                      <th className="px-5 py-3 text-left text-sm font-semibold">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-5 py-3 text-sm text-slate-700 border-b font-medium">Técnicas (necesarias)</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">Imprescindibles para el correcto funcionamiento del sitio web. Gestión de sesión, preferencias de cookies y seguridad.</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">Sesión / 1 año</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-5 py-3 text-sm text-slate-700 border-b font-medium">Analíticas</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">Google Analytics 4 (GA4). Permiten medir y analizar la navegación en el sitio web, número de visitas, páginas visitadas, tiempo de permanencia, etc.</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">2 años</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-5 py-3 text-sm text-slate-700 border-b font-medium">Marketing / Publicitarias</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">Google Ads, remarketing y seguimiento de conversiones. Permiten mostrar anuncios personalizados y medir la eficacia de las campañas publicitarias.</td>
                      <td className="px-5 py-3 text-sm text-slate-600 border-b">90 días - 2 años</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="px-5 py-3 text-sm text-slate-700 font-medium">Personalización</td>
                      <td className="px-5 py-3 text-sm text-slate-600">Permiten recordar las preferencias del usuario, como el idioma, la configuración regional o la personalización visual.</td>
                      <td className="px-5 py-3 text-sm text-slate-600">1 año</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Google Consent Mode v2</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Este sitio web implementa <strong>Google Consent Mode v2</strong>, una tecnología que permite respetar las preferencias de privacidad del usuario al interactuar con los servicios de Google (Analytics, Ads). Según su elección en el banner de cookies:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li><strong>analytics_storage:</strong> Controla si se activan las cookies de Google Analytics.</li>
                <li><strong>ad_storage:</strong> Controla si se activan las cookies de publicidad de Google Ads.</li>
                <li><strong>ad_user_data:</strong> Controla si se envían datos del usuario a Google para finalidades publicitarias.</li>
                <li><strong>ad_personalization:</strong> Controla si se permite la personalización de anuncios.</li>
              </ul>
              <p className="text-slate-600 leading-relaxed">
                Por defecto, todos estos valores se establecen en <strong>"denied" (denegado)</strong> hasta que el usuario otorgue su consentimiento explícito a través del banner de cookies.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. ¿Cómo gestionar las cookies?</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Puede configurar sus preferencias de cookies en cualquier momento a través del enlace <strong>"Configurar Cookies"</strong> disponible en el pie de página de este sitio web.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Además, puede configurar su navegador para aceptar o rechazar todas las cookies, o para recibir un aviso en pantalla cuando se almacene una cookie:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y otros datos de sitios</li>
                <li><strong>Mozilla Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos del sitio</li>
                <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies y datos de sitios web</li>
                <li><strong>Microsoft Edge:</strong> Configuración → Cookies y permisos del sitio</li>
              </ul>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mt-4">
                <p className="text-amber-800 text-sm flex items-start gap-2">
                  <i className="ri-alert-line text-amber-600 mt-0.5 flex-shrink-0"></i>
                  <span>Si desactiva todas las cookies, es posible que algunas funcionalidades del sitio web no estén disponibles o no funcionen correctamente.</span>
                </p>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Cookies de terceros</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Este sitio web utiliza servicios de terceros que pueden instalar cookies en su dispositivo:
              </p>
              <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
                <li><strong>Google Analytics (Google LLC):</strong> Servicio de análisis web. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#ad023b] hover:underline">Política de privacidad de Google</a></li>
                <li><strong>Google Ads (Google LLC):</strong> Plataforma de publicidad y seguimiento de conversiones. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-[#ad023b] hover:underline">Política de publicidad de Google</a></li>
                <li><strong>Leaflet / OpenStreetMap:</strong> Servicio de mapas para la sección de concesionarios.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Actualizaciones</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                GRUPO AVISA podrá modificar esta Política de Cookies en función de exigencias legislativas, reglamentarias o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos. Se recomienda al usuario revisar esta política periódicamente.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Contacto</h2>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-slate-700 mb-2"><strong>GRUPO AVISA</strong></p>
                <p className="text-slate-600 mb-1">C/ Alhami 2-4, 41020 Sevilla (Sevilla)</p>
                <p className="text-slate-600 mb-1">Teléfono: <a href="tel:+34955034600" className="inline-flex items-center gap-1 bg-[#ad023b] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#8d0230] transition-colors"><i className="ri-phone-line"></i> Llámame</a></p>
                <p className="text-slate-600">Email: <a href="mailto:comunicacion@grupoavisa.com" className="text-[#ad023b] hover:underline">comunicacion@grupoavisa.com</a></p>
              </div>
            </section>
          </div>

          <p className="text-slate-500 text-sm mt-12">Última actualización: Enero 2025</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
