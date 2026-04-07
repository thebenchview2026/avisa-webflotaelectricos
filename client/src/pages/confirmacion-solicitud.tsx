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

export default function ConfirmacionSolicitudPage() {
  const searchParams = useSearchParams();
  const vehiculo = searchParams.get('vehiculo') || '';
  const nombre = searchParams.get('nombre') || '';
  const tipo = searchParams.get('tipo') || 'electrico';
  const [showConfetti, setShowConfetti] = useState(true);
  const { positions, mounted } = useConfettiPositions(50);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const isElectrico = tipo === 'electrico';
  const gradientFrom = isElectrico ? 'from-green-600' : 'from-blue-600';
  const gradientTo = isElectrico ? 'to-green-700' : 'to-blue-700';
  const bgLight = isElectrico ? 'bg-green-50' : 'bg-blue-50';
  const textAccent = isElectrico ? 'text-green-600' : 'text-blue-600';
  const borderAccent = isElectrico ? 'border-green-500' : 'border-blue-500';
  const bgAccent = isElectrico ? 'bg-green-500' : 'bg-blue-500';

  const nextSteps = [
    {
      icon: 'ri-phone-line',
      title: 'Te llamaremos en menos de 24h',
      desc: 'Un asesor especializado se pondrá en contacto contigo para resolver todas tus dudas.'
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Preparamos tu oferta personalizada',
      desc: 'Analizaremos tus necesidades para ofrecerte las mejores condiciones de renting.'
    },
    {
      icon: 'ri-car-line',
      title: 'Configura tu vehículo ideal',
      desc: 'Te ayudaremos a elegir el color, equipamiento y opciones que mejor se adapten a ti.'
    }
  ];

  const benefits = [
    { icon: 'ri-shield-check-line', text: 'Seguro a todo riesgo incluido' },
    { icon: 'ri-tools-line', text: 'Mantenimiento oficial incluido' },
    { icon: 'ri-money-euro-circle-line', text: '100% deducible para empresas' },
    { icon: 'ri-customer-service-2-line', text: 'Asistencia 24h en carretera' }
  ];

  return (
    <main role="main" className="min-h-screen bg-slate-50" data-testid="page-confirmacion-solicitud">
      <SEOHead title="Solicitud Recibida" description="Tu solicitud de información sobre vehículos ha sido registrada con éxito." noindex />
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
                className={`w-3 h-3 ${i % 3 === 0 ? 'bg-green-500' : i % 3 === 1 ? 'bg-blue-500' : 'bg-yellow-500'} rounded-full`}
                style={{
                  transform: `rotate(${pos.rotate}deg)`
                }}
              ></div>
            </div>
          ))}
        </div>
      )}

      <section className={`relative bg-gradient-to-br ${gradientFrom} ${gradientTo} py-20 overflow-hidden`} aria-label="Confirmación de solicitud">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <i className="ri-checkbox-circle-fill text-5xl text-green-500" aria-hidden="true"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" data-testid="text-title">
            ¡Solicitud enviada correctamente!
          </h1>
          {nombre && (
            <p className="text-xl text-white/90 mb-4">
              Gracias, <span className="font-semibold">{nombre}</span>
            </p>
          )}
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Hemos recibido tu solicitud de información
            {vehiculo && (
              <span> sobre el <span className="font-semibold text-white">{vehiculo}</span></span>
            )}
            . Un asesor especializado te contactará en breve.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 -mt-8 relative z-20" aria-label="Detalles de la solicitud">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-12 h-12 ${bgAccent} rounded-full flex items-center justify-center`}>
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
                  <div className={`w-10 h-10 ${bgLight} rounded-full flex items-center justify-center ${borderAccent} border-2`}>
                    <span className={`font-bold ${textAccent}`}>{idx + 1}</span>
                  </div>
                  {idx < nextSteps.length - 1 && (
                    <div className={`w-0.5 h-full ${bgLight} my-2`}></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <i className={`${step.icon} text-xl ${textAccent}`}></i>
                    <h3 className="font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12" aria-label="Próximos pasos">
        <div className={`${bgLight} rounded-2xl p-8`}>
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            Recuerda que con el renting incluyes
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-white rounded-lg p-4">
                <div className={`w-10 h-10 ${bgAccent} rounded-lg flex items-center justify-center`}>
                  <i className={`${benefit.icon} text-white text-lg`}></i>
                </div>
                <span className="font-medium text-slate-900">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-12" aria-label="Contacto de soporte">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">
            ¿Necesitas contactarnos antes?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <a
              href="tel:+34955034600"
              className="flex flex-col items-center p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              data-testid="link-telefono"
            >
              <div className={`w-14 h-14 ${bgAccent} rounded-full flex items-center justify-center mb-4`}>
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
              <div className={`w-14 h-14 ${bgAccent} rounded-full flex items-center justify-center mb-4`}>
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
          <p className="text-slate-600 mb-6">Mientras tanto, puedes seguir explorando nuestra oferta</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/promociones-electricos"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-green-600 transition-all cursor-pointer whitespace-nowrap"
              data-testid="link-electricos"
            >
              <i className="ri-flashlight-line" aria-hidden="true"></i>
              Ver eléctricos
            </Link>
            <Link
              href="/promociones-hibridos"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-600 transition-all cursor-pointer whitespace-nowrap"
              data-testid="link-hibridos"
            >
              <i className="ri-leaf-line" aria-hidden="true"></i>
              Ver híbridos
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
