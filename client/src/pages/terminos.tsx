"use client";
import { Link } from "@/lib/router";
import SEOHead from "@/components/SEOHead";

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-20" role="main" data-testid="page-terminos">
      <SEOHead title="Política de Privacidad" description="Política de privacidad y protección de datos personales de Grupo Avisa. Información sobre tratamiento de datos conforme al RGPD." canonical="/terminos" noindex />
      <div className="max-w-4xl mx-auto px-6">
        <nav className="mb-8 text-sm" aria-label="Migas de pan">
          <Link href="/" className="text-slate-500 hover:text-[#ad023b] transition-colors" data-testid="link-inicio">
            Inicio
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-700">Política de Privacidad</span>
        </nav>

        <h1 className="text-4xl font-bold text-slate-900 mb-12" data-testid="text-title">Política de Privacidad</h1>

        <div className="prose prose-slate max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">1. Responsable del Tratamiento</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Identidad:</strong> GRUPO AVISA<br />
              <strong>Dirección:</strong> C/ Alhami 2-4, 41020 Sevilla (Sevilla)<br />
              <strong>Teléfono:</strong> <a href="tel:+34955034600" className="text-[#ad023b] font-bold hover:underline">Llámame</a><br />
              <strong>Email:</strong> comunicacion@grupoavisa.com
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">2. Finalidad del Tratamiento de Datos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              En GRUPO AVISA tratamos la información que nos facilitan las personas interesadas con el fin de:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Gestionar las solicitudes de información y consultas realizadas a través de los formularios de contacto.</li>
              <li>Gestionar las solicitudes de cita previa para servicios de postventa.</li>
              <li>Gestionar las solicitudes relacionadas con el Plan MOVES y ayudas a la compra de vehículos eléctricos.</li>
              <li>Enviar comunicaciones comerciales sobre productos, servicios, promociones y ofertas, siempre que el usuario haya dado su consentimiento expreso.</li>
              <li>Realizar análisis estadísticos y de satisfacción del cliente.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">3. Legitimación del Tratamiento</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              La base legal para el tratamiento de sus datos es:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Consentimiento del interesado:</strong> Al enviar un formulario de contacto o solicitud, el usuario consiente expresamente el tratamiento de sus datos para las finalidades indicadas.</li>
              <li><strong>Ejecución de un contrato:</strong> El tratamiento es necesario para la ejecución de un contrato en el que el interesado es parte o para la aplicación de medidas precontractuales.</li>
              <li><strong>Interés legítimo:</strong> Para el envío de comunicaciones comerciales a clientes sobre productos o servicios similares a los contratados.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">4. Conservación de los Datos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Los datos personales proporcionados se conservarán:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Mientras se mantenga la relación comercial o el usuario no solicite su supresión.</li>
              <li>Durante los plazos legalmente establecidos para atender posibles responsabilidades derivadas del tratamiento.</li>
              <li>Los datos para comunicaciones comerciales se conservarán hasta que el usuario retire su consentimiento.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">5. Destinatarios de los Datos</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Los datos podrán ser comunicados a:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li>Administraciones Públicas competentes, en los casos previstos por la Ley.</li>
              <li>Fabricantes de vehículos (Volkswagen, Audi, Škoda) para la gestión de garantías y servicios oficiales.</li>
              <li>Entidades financieras para la gestión de financiación de vehículos.</li>
              <li>Proveedores de servicios necesarios para el funcionamiento del negocio, con los que se han firmado los correspondientes contratos de encargo de tratamiento.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">6. Derechos del Interesado</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              El usuario puede ejercer los siguientes derechos:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Derecho de acceso:</strong> Conocer qué datos personales estamos tratando.</li>
              <li><strong>Derecho de rectificación:</strong> Solicitar la modificación de datos inexactos o incompletos.</li>
              <li><strong>Derecho de supresión:</strong> Solicitar la eliminación de los datos cuando ya no sean necesarios.</li>
              <li><strong>Derecho de oposición:</strong> Oponerse al tratamiento de sus datos en determinadas circunstancias.</li>
              <li><strong>Derecho de limitación:</strong> Solicitar la limitación del tratamiento en determinados casos.</li>
              <li><strong>Derecho de portabilidad:</strong> Recibir los datos en un formato estructurado y de uso común.</li>
              <li><strong>Derecho a retirar el consentimiento:</strong> En cualquier momento, sin que afecte a la licitud del tratamiento previo.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mb-4">
              Para ejercer estos derechos, puede dirigirse a: <a href="mailto:comunicacion@grupoavisa.com" className="text-[#ad023b] hover:underline" data-testid="link-email-derechos">comunicacion@grupoavisa.com</a>
            </p>
            <p className="text-slate-600 leading-relaxed">
              Asimismo, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si considera que sus derechos no han sido atendidos correctamente.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">7. Medidas de Seguridad</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              GRUPO AVISA ha adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">8. Política de Cookies</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegación, analizar el tráfico web y personalizar el contenido. Al hacer clic en el botón de aceptación, el usuario consiente el uso de estas tecnologías.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong>Tipos de cookies utilizadas:</strong>
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2 mb-4">
              <li><strong>Cookies técnicas:</strong> Necesarias para el funcionamiento del sitio web.</li>
              <li><strong>Cookies de análisis:</strong> Permiten analizar el comportamiento de los usuarios para mejorar el servicio.</li>
              <li><strong>Cookies de personalización:</strong> Permiten recordar las preferencias del usuario.</li>
              <li><strong>Cookies publicitarias:</strong> Permiten mostrar publicidad personalizada.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed">
              El usuario puede configurar su navegador para rechazar las cookies o ser avisado cuando se instalen. Sin embargo, el rechazo de algunas cookies puede afectar a la funcionalidad del sitio web.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">9. Modificaciones de la Política de Privacidad</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              GRUPO AVISA se reserva el derecho de modificar la presente política de privacidad para adaptarla a novedades legislativas o jurisprudenciales, así como a prácticas de la industria. En dichos supuestos, se anunciará en esta página los cambios introducidos con razonable antelación a su puesta en práctica.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">10. Información Adicional</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Para más información sobre el tratamiento de sus datos personales, puede contactar con nosotros a través de:
            </p>
            <div className="bg-slate-50 p-6 rounded-lg">
              <p className="text-slate-700 mb-2"><strong>GRUPO AVISA</strong></p>
              <p className="text-slate-600 mb-1">C/ Alhami 2-4, 41020 Sevilla (Sevilla)</p>
              <p className="text-slate-600 mb-1">Teléfono: <a href="tel:+34955034600" className="inline-flex items-center gap-1 bg-[#ad023b] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#8d0230] transition-colors" data-testid="link-telefono"><i className="ri-phone-line"></i> Llámame</a></p>
              <p className="text-slate-600">Email: <a href="mailto:comunicacion@grupoavisa.com" className="text-[#ad023b] hover:underline" data-testid="link-email-contacto">comunicacion@grupoavisa.com</a></p>
            </div>
          </section>

          <p className="text-slate-500 text-sm mt-12" data-testid="text-last-update">
            Última actualización: Enero 2025
          </p>
        </div>
      </div>
    </main>
  );
}
