"use client";
import { Link } from "@/lib/router";
import { useSearchParams } from "next/navigation";
import SEOHead from "@/components/SEOHead";

export default function ConfirmacionMovesPage() {
  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre') || 'Cliente';
  const tipoVehiculo = searchParams.get('tipo') || '';

  const getTipoTexto = () => {
    switch (tipoVehiculo) {
      case 'electrico':
        return '100% eléctrico';
      case 'hibrido_enchufable':
        return 'híbrido enchufable';
      default:
        return 'eléctrico o híbrido';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white" data-testid="page-confirmacion-moves">
      <SEOHead title="Solicitud Plan MOVES Recibida" description="Tu solicitud del Plan MOVES ha sido registrada con éxito." noindex />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-double-line text-5xl text-green-600"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" data-testid="text-title">
            ¡Solicitud recibida, {nombre}!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Hemos recibido tu solicitud de información sobre el Plan MOVES para vehículos {getTipoTexto()}. Te contactaremos muy pronto.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-green-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <i className="ri-file-list-3-line text-green-600"></i>
            Próximos pasos para tu ayuda MOVES
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Analizamos tu caso</h3>
                <p className="text-slate-600 text-sm">Revisamos tu situación para calcular la ayuda máxima a la que puedes acceder.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Te contactamos en 24h</h3>
                <p className="text-slate-600 text-sm">Un asesor especializado en ayudas MOVES te llamará para resolver todas tus dudas.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Gestionamos todo por ti</h3>
                <p className="text-slate-600 text-sm">Nos encargamos de toda la tramitación de forma gratuita y te adelantamos la ayuda.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-200 mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-money-euro-circle-line text-2xl text-green-600"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Ayudas de hasta 9.000</h3>
              <p className="text-slate-600 text-sm">
                Con el Plan MOVES III puedes obtener hasta 7.000 de ayuda directa, más 2.000 adicionales si achatarras un vehículo de más de 7 años.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-phone-line text-green-600"></i>
              ¿Prefieres llamarnos?
            </h3>
            <a href="tel:+34955034600" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-700 transition-colors" data-testid="link-telefono">
              <i className="ri-phone-line"></i> Llámame
            </a>
            <p className="text-sm text-slate-600 mt-2">Lunes a Viernes de 9:00 a 18:00</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-mail-line text-green-600"></i>
              Email
            </h3>
            <a href="mailto:info@grupoavisa.com" className="text-xl font-bold text-green-600 hover:text-green-700 transition-colors" data-testid="link-email">
              info@grupoavisa.com
            </a>
            <p className="text-sm text-slate-600 mt-2">Te respondemos en 24h</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/autoplus"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-autoplus"
          >
            <i className="ri-arrow-left-line"></i>
            Más sobre Plan MOVES
          </Link>
          <Link
            href="/promociones-electricos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-electricos"
          >
            <i className="ri-car-line"></i>
            Ver vehículos eléctricos
          </Link>
        </div>
      </div>
    </main>
  );
}
