"use client";
import { Link } from "@/lib/router";
import { useSearchParams } from "next/navigation";
import SEOHead from "@/components/SEOHead";

export default function ConfirmacionContactoPage() {
  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre') || 'Cliente';
  const origen = searchParams.get('origen') || 'general';

  const getOrigenInfo = () => {
    switch (origen) {
      case 'electricos':
        return {
          titulo: 'vehículos eléctricos',
          enlace: '/promociones-electricos',
          enlaceTexto: 'Ver promociones eléctricas'
        };
      case 'hibridos':
        return {
          titulo: 'vehículos híbridos',
          enlace: '/promociones-hibridos',
          enlaceTexto: 'Ver promociones híbridas'
        };
      case 'concesionarios':
        return {
          titulo: 'nuestros concesionarios',
          enlace: '/concesionarios',
          enlaceTexto: 'Ver concesionarios'
        };
      case 'moves':
        return {
          titulo: 'el Plan MOVES',
          enlace: '/autoplus',
          enlaceTexto: 'Más sobre Plan MOVES'
        };
      default:
        return {
          titulo: 'vehículos eléctricos e híbridos',
          enlace: '/',
          enlaceTexto: 'Volver al inicio'
        };
    }
  };

  const info = getOrigenInfo();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white" data-testid="page-confirmacion-contacto">
      <SEOHead title="Contacto Recibido" description="Tu mensaje ha sido recibido correctamente. Te contactaremos pronto." noindex />
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="ri-check-double-line text-5xl text-green-600"></i>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4" data-testid="text-title">
            ¡Gracias por contactarnos, {nombre}!
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto" data-testid="text-subtitle">
            Hemos recibido tu solicitud de información sobre {info.titulo}. Un asesor especializado se pondrá en contacto contigo muy pronto.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <i className="ri-time-line text-[#ad023b]"></i>
            ¿Qué sucederá ahora?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#ad023b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#ad023b] font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Revisamos tu solicitud</h3>
                <p className="text-slate-600 text-sm">Nuestro equipo analizará tu consulta para ofrecerte la mejor respuesta.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#ad023b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#ad023b] font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Te contactamos en 24h</h3>
                <p className="text-slate-600 text-sm">Un asesor especializado te llamará o enviará un email en menos de 24 horas laborables.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-[#ad023b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#ad023b] font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Asesoramiento personalizado</h3>
                <p className="text-slate-600 text-sm">Resolveremos todas tus dudas y te ayudaremos a encontrar la mejor opción.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-phone-line text-[#ad023b]"></i>
              ¿Prefieres llamarnos?
            </h3>
            <a href="tel:+34955034600" className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-[#8d0230] transition-colors" data-testid="link-telefono">
              <i className="ri-phone-line"></i> Llámame
            </a>
            <p className="text-sm text-slate-600 mt-2">Lunes a Viernes de 9:00 a 20:00</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <i className="ri-whatsapp-line text-green-600"></i>
              WhatsApp
            </h3>
            <a href="https://wa.me/34621261541" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-[#20BD5A] transition-colors" data-testid="link-whatsapp">
              <i className="ri-whatsapp-line"></i> WhatsApp
            </a>
            <p className="text-sm text-slate-600 mt-2">Escríbenos por WhatsApp</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={info.enlace}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ad023b] text-white font-semibold rounded-lg hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-back"
          >
            <i className="ri-arrow-left-line"></i>
            {info.enlaceTexto}
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-home"
          >
            <i className="ri-home-line"></i>
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
