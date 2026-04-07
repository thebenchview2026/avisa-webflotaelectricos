"use client";
import { Link } from "@/lib/router";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import SEOHead from "@/components/SEOHead";

function useConfettiPositions(count: number) {
  const positionsRef = useRef<Array<{ left: number; delay: number; duration: number; rotate: number }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    positionsRef.current = Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
      rotate: Math.random() * 360,
    }));
    setMounted(true);
  }, [count]);

  return { positions: positionsRef.current, mounted };
}

export default function ConfirmacionCitaPage() {
  const searchParams = useSearchParams();
  const nombre = searchParams.get('nombre') || '';
  const servicio = searchParams.get('servicio') || '';
  const concesionario = searchParams.get('concesionario') || '';
  const fecha = searchParams.get('fecha') || '';
  const [showConfetti, setShowConfetti] = useState(true);
  const { positions, mounted } = useConfettiPositions(50);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const nextSteps = [
    {
      icon: 'ri-phone-line',
      title: 'Confirmación telefónica',
      desc: 'Te llamaremos para confirmar la disponibilidad y la hora exacta de tu cita.'
    },
    {
      icon: 'ri-mail-line',
      title: 'Recordatorio por email',
      desc: 'Recibirás un email de confirmación con todos los detalles de tu cita.'
    },
    {
      icon: 'ri-car-line',
      title: 'Trae tu vehículo',
      desc: 'Acude a tu cita con el vehículo y la documentación necesaria.'
    }
  ];

  const tips = [
    { icon: 'ri-file-list-3-line', text: 'Trae la documentación del vehículo' },
    { icon: 'ri-key-2-line', text: 'Lleva todas las llaves del coche' },
    { icon: 'ri-time-line', text: 'Llega 10 minutos antes de tu cita' },
    { icon: 'ri-smartphone-line', text: 'Ten tu teléfono disponible' }
  ];

  return (
    <main role="main" className="min-h-screen bg-slate-50" data-testid="page-confirmacion-cita">
      <SEOHead title="Cita Confirmada" description="Tu cita de servicio ha sido registrada con éxito." noindex />
      {showConfetti && mounted && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {positions.map((pos, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${pos.left}%`,
                top: `-20px`,
                animationDelay: `${pos.delay}s`,
                animationDuration: `${pos.duration}s`
              }}
            >
              <div
                className={`w-3 h-3 ${i % 3 === 0 ? 'bg-[#ad023b]' : i % 3 === 1 ? 'bg-amber-500' : 'bg-slate-700'} rounded-full`}
                style={{
                  transform: `rotate(${pos.rotate}deg)`
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <section className="relative bg-gradient-to-br from-[#ad023b] to-[#8d0230] py-20 overflow-hidden" aria-label="Confirmación de cita">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="ri-calendar-check-fill text-5xl text-[#ad023b]" aria-hidden="true"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-title">
            ¡Solicitud de cita enviada!
          </h1>
          {nombre && (
            <p className="text-xl text-white/90 mb-4">
              Gracias, <span className="font-semibold">{nombre}</span>
            </p>
          )}
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hemos recibido tu solicitud de cita
            {servicio && (
              <span> para <span className="font-semibold text-white">{servicio}</span></span>
            )}
            {concesionario && (
              <span> en <span className="font-semibold text-white">{concesionario}</span></span>
            )}
            . Te contactaremos para confirmar la disponibilidad.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-20" aria-label="Detalles de la cita">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#ad023b] rounded-full flex items-center justify-center">
              <i className="ri-time-line text-2xl text-white" aria-hidden="true"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">¿Qué ocurre ahora?</h2>
              <p className="text-slate-600">Estos son los siguientes pasos</p>
            </div>
          </div>
          <div className="space-y-6">
            {nextSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-[#ad023b]/10 rounded-full flex items-center justify-center border-2 border-[#ad023b]">
                    <span className="font-bold text-[#ad023b]">{idx + 1}</span>
                  </div>
                  {idx < nextSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-[#ad023b]/10 my-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${step.icon} text-xl text-[#ad023b]`}></i>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {fecha && (
        <section className="max-w-4xl mx-auto px-6 py-8" aria-label="Preparación para la cita">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-calendar-line text-2xl text-white" aria-hidden="true"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 mb-1">Fecha solicitada</h3>
              <p className="text-slate-700">
                Has solicitado tu cita para el <span className="font-semibold">{fecha}</span>. 
                Te confirmaremos la disponibilidad por teléfono.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-4xl mx-auto px-6 py-8" aria-label="Preparación para la cita">
        <div className="bg-[#ad023b]/5 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            Consejos para tu visita al taller
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4">
                <div className="w-10 h-10 bg-[#ad023b] rounded-lg flex items-center justify-center">
                  <i className={`${tip.icon} text-white text-lg`}></i>
                </div>
                <span className="font-medium text-slate-900">{tip.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-12" aria-label="Contacto de soporte">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            ¿Necesitas modificar o cancelar tu cita?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <a
              href="tel:+34955034600"
              className="flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              data-testid="link-telefono"
            >
              <div className="w-14 h-14 bg-[#ad023b] rounded-full flex items-center justify-center mb-4">
                <i className="ri-phone-fill text-2xl text-white" aria-hidden="true"></i>
              </div>
              <span className="font-bold text-slate-900 mb-1">Llámame</span>
            </a>
            <a
              href="https://wa.me/34621261541"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              data-testid="link-whatsapp"
            >
              <div className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center mb-4">
                <i className="ri-whatsapp-fill text-2xl text-white" aria-hidden="true"></i>
              </div>
              <span className="font-bold text-slate-900 mb-1">WhatsApp</span>
            </a>
            <a
              href="mailto:info@grupoavisa.com"
              className="flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              data-testid="link-email"
            >
              <div className="w-14 h-14 bg-[#ad023b] rounded-full flex items-center justify-center mb-4">
                <i className="ri-mail-fill text-2xl text-white" aria-hidden="true"></i>
              </div>
              <span className="font-bold text-slate-900 mb-1">Email</span>
              <span className="text-slate-600">info@grupoavisa.com</span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-16" aria-label="Navegación">
        <div className="text-center">
          <p className="text-slate-600 mb-6">Mientras tanto, puedes seguir explorando</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/postventa"
              className="inline-flex items-center justify-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#8d0230] transition-all cursor-pointer whitespace-nowrap"
              data-testid="link-postventa"
            >
              <i className="ri-tools-line" aria-hidden="true"></i>
              Servicios postventa
            </Link>
            <Link
              href="/promociones-electricos"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all cursor-pointer whitespace-nowrap"
              data-testid="link-electricos"
            >
              <i className="ri-flashlight-line" aria-hidden="true"></i>
              Ver eléctricos
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-lg font-bold hover:bg-slate-800 transition-all cursor-pointer whitespace-nowrap"
              data-testid="link-home"
            >
              <i className="ri-home-line" aria-hidden="true"></i>
              Ir al inicio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
