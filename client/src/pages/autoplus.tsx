"use client";
import { useState } from 'react';
import { Link, useLocation } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import AutoLinkedText from "@/components/AutoLinkedText";

function MovesHero() {
  return (
    <section
      className="relative min-h-[600px] flex items-center"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&h=800&fit=crop&auto=format&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <i className="ri-government-line"></i>
            <span>Autoplus - Programa vigente 2024</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-autoplus-title">
            Hasta 7.000€ de ayuda para tu vehículo eléctrico
          </h1>

          <AutoLinkedText text="Gestión gratuita y ayuda adelantada. Te ayudamos con toda la tramitación del Autoplus para que puedas disfrutar de tu nuevo vehículo eléctrico o híbrido enchufable cuanto antes." as="p" className="text-xl text-white/90 mb-8 leading-relaxed" excludeUrls={["/autoplus"]} linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium" maxLinks={2} />

          <div className="flex flex-wrap gap-4 mb-8">
            <a
              href="#calculadora"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
              data-testid="link-calcular-ayuda"
            >
              <i className="ri-calculator-line"></i>
              Calcular mi ayuda
            </a>
            <a
              href="#solicitar-info"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-md font-bold transition-all duration-300 cursor-pointer whitespace-nowrap backdrop-blur-sm"
              data-testid="link-solicitar-info"
            >
              <i className="ri-mail-send-line"></i>
              Solicitar información
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-xl">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-gestion-coste">0€</div>
              <div className="text-sm text-white/80">Gestión</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-adelantada">100%</div>
              <div className="text-sm text-white/80">Adelantada</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-clientes">+500</div>
              <div className="text-sm text-white/80">Clientes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubsidyCards() {
  return (
    <section id="calculadora" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cuánto puedo ahorrar con Autoplus?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Las ayudas varían según el tipo de vehículo y si achatarras tu coche antiguo.
            Descubre cuánto puedes recibir.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-md p-8 border-2 border-green-200 relative overflow-hidden" data-testid="card-subsidy-bev">
            <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
              MÁS POPULAR
            </div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-green-500 rounded-md mx-auto mb-4 shadow-lg">
                <i className="ri-car-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehículos BEV</h3>
              <p className="text-gray-600">100% Eléctricos</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-recycle-line text-green-600"></i>
                  <p className="text-sm text-gray-600">Con achatarramiento</p>
                </div>
                <p className="text-4xl font-bold text-green-600" data-testid="text-bev-con">7.000€</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-car-washing-line text-gray-500"></i>
                  <p className="text-sm text-gray-600">Sin achatarramiento</p>
                </div>
                <p className="text-4xl font-bold text-gray-700" data-testid="text-bev-sin">4.500€</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Turismos M1 con precio &lt; 45.000€
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-md p-8 border-2 border-blue-200" data-testid="card-subsidy-phev">
            <div className="text-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-blue-500 rounded-md mx-auto mb-4 shadow-lg">
                <i className="ri-charging-pile-2-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehículos PHEV</h3>
              <p className="text-gray-600">Híbridos Enchufables</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-recycle-line text-blue-600"></i>
                  <p className="text-sm text-gray-600">Con achatarramiento</p>
                </div>
                <p className="text-4xl font-bold text-blue-600" data-testid="text-phev-con">5.000€</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-car-washing-line text-gray-500"></i>
                  <p className="text-sm text-gray-600">Sin achatarramiento</p>
                </div>
                <p className="text-4xl font-bold text-gray-700" data-testid="text-phev-sin">2.500€</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Autonomía eléctrica mínima 30 km
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-md p-8 border-2 border-purple-200" data-testid="card-subsidy-recarga">
            <div className="text-center mb-6">
              <div className="w-20 h-20 flex items-center justify-center bg-purple-500 rounded-md mx-auto mb-4 shadow-lg">
                <i className="ri-plug-line text-4xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Puntos de recarga</h3>
              <p className="text-gray-600">Infraestructura</p>
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-home-4-line text-purple-600"></i>
                  <p className="text-sm text-gray-600">Uso privado</p>
                </div>
                <p className="text-4xl font-bold text-purple-600">70%</p>
                <p className="text-sm text-gray-500">Hasta 1.500€</p>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <i className="ri-building-line text-gray-500"></i>
                  <p className="text-sm text-gray-600">Comunidades</p>
                </div>
                <p className="text-4xl font-bold text-gray-700">80%</p>
                <p className="text-sm text-gray-500">Hasta 5.000€</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Wallbox y cargadores domésticos
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full flex-shrink-0">
            <i className="ri-information-line text-2xl text-amber-600"></i>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-1">Importante sobre el achatarramiento</h4>
            <p className="text-gray-600">
              Para obtener la ayuda máxima, debes dar de baja un vehículo de tu propiedad con más de 7 años de antigüedad.
              El vehículo debe haber estado a tu nombre durante al menos 1 año antes de la solicitud.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequirementsSection() {
  const requirements = [
    {
      icon: 'ri-user-line',
      title: 'Beneficiarios',
      items: [
        'Personas físicas (particulares)',
        'Autónomos y profesionales',
        'Empresas (PYMES y grandes)',
        'Administraciones públicas',
        'Entidades sin ánimo de lucro'
      ]
    },
    {
      icon: 'ri-car-line',
      title: 'Vehículos elegibles',
      items: [
        'Turismos M1 eléctricos o PHEV',
        'Precio máximo 45.000€ (sin IVA)',
        'Furgonetas N1 hasta 53.000€',
        'Motos eléctricas L3e, L4e, L5e',
        'Cuadriciclos L6e y L7e'
      ]
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Documentación necesaria',
      items: [
        'DNI/NIE del solicitante',
        'Permiso de circulación (achatarramiento)',
        'Ficha técnica del vehículo a achatarrar',
        'Certificado de empadronamiento',
        'Declaración responsable'
      ]
    },
    {
      icon: 'ri-time-line',
      title: 'Compromisos',
      items: [
        'Mantener el vehículo mínimo 2 años',
        'No vender ni transferir en ese periodo',
        'Uso en territorio español',
        'Estar al corriente con Hacienda y SS',
        'No haber recibido otras ayudas similares'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Requisitos para acceder a Autoplus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cumplir estos requisitos es fundamental para poder beneficiarte de las ayudas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((req, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm" data-testid={`card-requirement-${index}`}>
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-xl mb-4">
                <i className={`${req.icon} text-2xl text-[#ad023b]`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{req.title}</h3>
              <ul className="space-y-3">
                {req.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <i className="ri-check-line text-green-500 mt-0.5 flex-shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSteps() {
  const steps = [
    {
      number: '01',
      title: 'Elige tu vehículo',
      description: 'Visita cualquiera de nuestros concesionarios y selecciona el modelo eléctrico o híbrido enchufable que mejor se adapte a tus necesidades.',
      icon: 'ri-search-line'
    },
    {
      number: '02',
      title: 'Verificamos tu elegibilidad',
      description: 'Nuestro equipo comprueba que cumples todos los requisitos del Plan MOVES y te asesora sobre la mejor opción de ayuda.',
      icon: 'ri-checkbox-circle-line'
    },
    {
      number: '03',
      title: 'Preparamos la documentación',
      description: 'Te indicamos exactamente qué documentos necesitas y te ayudamos a recopilarlos. Solo necesitarás firmar.',
      icon: 'ri-file-text-line'
    },
    {
      number: '04',
      title: 'Tramitamos la solicitud',
      description: 'Presentamos toda la documentación ante la administración correspondiente y hacemos seguimiento del expediente.',
      icon: 'ri-send-plane-line'
    },
    {
      number: '05',
      title: 'Adelantamos la ayuda',
      description: 'No tienes que esperar a que se apruebe. Aplicamos el descuento de la ayuda directamente en la compra de tu vehículo.',
      icon: 'ri-money-euro-circle-line'
    },
    {
      number: '06',
      title: 'Disfruta tu vehículo',
      description: 'Recoge tu nuevo coche eléctrico y empieza a disfrutar de la movilidad sostenible. Nosotros seguimos con la gestión.',
      icon: 'ri-car-line'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Cómo funciona el proceso de Autoplus?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Te acompañamos en cada paso para que recibas tu ayuda sin complicaciones
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`card-step-${index}`}>
              <div className="bg-gray-50 rounded-md p-6 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] rounded-xl flex-shrink-0">
                    <i className={`${step.icon} text-xl text-white`}></i>
                  </div>
                  <span className="text-5xl font-bold text-gray-200">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[#ad023b] to-[#8d0230] rounded-md p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-white mb-2">0€</div>
              <p className="text-white/80">Coste de gestión</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">100%</div>
              <p className="text-white/80">Ayuda adelantada</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-white mb-2">+500</div>
              <p className="text-white/80">Solicitudes gestionadas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegionalAids() {
  const regions = [
    {
      name: 'Andalucía',
      status: 'Activo',
      extra: 'Hasta 2.000€ adicionales',
      details: 'Ayudas complementarias para residentes en Andalucía',
      color: 'green'
    },
    {
      name: 'Extremadura',
      status: 'Activo',
      extra: 'Hasta 1.500€ adicionales',
      details: 'Subvenciones autonómicas acumulables',
      color: 'green'
    },
    {
      name: 'Sevilla',
      status: 'Consultar',
      extra: 'Bonificaciones municipales',
      details: 'Descuentos en impuesto de circulación',
      color: 'blue'
    },
    {
      name: 'Málaga',
      status: 'Consultar',
      extra: 'Bonificaciones municipales',
      details: 'Beneficios fiscales para vehículos 0 emisiones',
      color: 'blue'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ayudas autonómicas complementarias a Autoplus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Además de Autoplus, algunas comunidades autónomas ofrecen ayudas adicionales
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {regions.map((region, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" data-testid={`card-region-${index}`}>
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  region.color === 'green'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {region.status}
                </span>
              </div>
              <p className="text-[#ad023b] font-semibold mb-2">{region.extra}</p>
              <p className="text-sm text-gray-600">{region.details}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md p-8 shadow-lg border border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ejemplo de ayudas acumuladas
              </h3>
              <p className="text-gray-600 mb-6">
                Un particular residente en Andalucía que compre un vehículo 100% eléctrico
                y achatarre su coche antiguo puede obtener:
              </p>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-2">
                  <span className="text-gray-600">Plan MOVES III (nacional)</span>
                  <span className="font-bold text-gray-900">7.000€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-2">
                  <span className="text-gray-600">Ayuda autonómica Andalucía</span>
                  <span className="font-bold text-gray-900">2.000€</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 gap-2">
                  <span className="text-gray-600">Descuento marca (según modelo)</span>
                  <span className="font-bold text-gray-900">Variable</span>
                </div>
                <div className="flex justify-between items-center py-3 bg-green-50 rounded-md px-4 gap-2">
                  <span className="font-bold text-gray-900">Total ayudas</span>
                  <span className="text-2xl font-bold text-green-600" data-testid="text-total-ayudas">Hasta 9.000€</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#ad023b]/5 to-[#ad023b]/10 rounded-xl p-6">
              <div className="w-16 h-16 flex items-center justify-center bg-[#ad023b] rounded-xl mb-4">
                <i className="ri-customer-service-2-line text-3xl text-white"></i>
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Te asesoramos sin compromiso
              </h4>
              <p className="text-gray-600 mb-6">
                Cada caso es diferente. Contacta con nosotros y te informamos de todas
                las ayudas disponibles para tu situación particular.
              </p>
              <a
                href="https://wa.me/34621261541"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white px-6 py-3 rounded-md font-semibold transition-colors cursor-pointer whitespace-nowrap"
                data-testid="link-whatsapp-asesora"
              >
                <i className="ri-whatsapp-line"></i>
                Escríbeme
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovesRequestForm() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo_vehiculo: '',
    vehiculo_actual: '',
    presupuesto: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.mensaje.length > 500 || !acceptTerms) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          acepta_terminos: acceptTerms ? 'Sí' : 'No',
          acepta_marketing: acceptMarketing ? 'Sí' : 'No',
          source: 'autoplus'
        }),
      });

      if (response.ok) {
        const params = new URLSearchParams({
          nombre: formData.nombre,
          tipo: formData.tipo_vehiculo
        });
        navigate(`/confirmacion-moves?${params.toString()}`);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="solicitar-info" className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Solicita información sobre Autoplus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Déjanos tus datos y te ayudaremos con toda la gestión de forma gratuita
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <i className="ri-mail-send-line"></i>
              <span>Solicita información</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              ¿Tienes dudas sobre el Plan MOVES?
            </h2>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Nuestro equipo de expertos te asesorará sin compromiso sobre las ayudas disponibles
              y cómo aplicarlas a tu caso particular.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-shield-check-line text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Gestión 100% gratuita</h3>
                  <p className="text-slate-600 text-sm">No cobramos nada por tramitar tu ayuda del Plan MOVES.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-money-euro-circle-line text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Ayuda adelantada</h3>
                  <p className="text-slate-600 text-sm">Descontamos la ayuda directamente del precio del vehículo.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-time-line text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Respuesta en 24h</h3>
                  <p className="text-slate-600 text-sm">Te contactamos en menos de 24 horas laborables.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <i className="ri-file-list-3-line text-2xl text-green-600"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Asesoramiento personalizado</h3>
                  <p className="text-slate-600 text-sm">Analizamos tu caso y te indicamos la mejor opción.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-phone-line text-2xl text-green-600"></i>
                <span className="font-semibold text-slate-900">¿Prefieres llamarnos?</span>
              </div>
              <a href="tel:+34955034600" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-green-700 transition-colors" data-testid="link-telefono">
                <i className="ri-phone-line"></i> Llámame
              </a>
              <p className="text-sm text-slate-600 mt-2">Lunes a Viernes de 9:00 a 18:00</p>
              <p className="text-sm text-slate-600 mt-1">Email: info@grupoavisa.com</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md p-8 shadow-lg">
            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="ri-check-line text-4xl text-green-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">¡Solicitud enviada!</h3>
                <p className="text-slate-600 mb-6">Te contactaremos en menos de 24 horas laborables para resolver todas tus dudas sobre el Plan MOVES.</p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className="text-green-600 font-medium hover:text-green-700 transition-colors cursor-pointer"
                  data-testid="button-otra-solicitud"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6 p-4 bg-green-50 rounded-xl border border-green-100">
                  <img
                    src="/ana-perez.png"
                    alt="Ana - Asesora de vehículos eléctricos"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      <span className="font-semibold text-slate-900">La persona que te va a atender es Ana</span>, lleva más de 10 años como profesional de flotas en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Solicitar información</h3>
                  <p className="text-slate-600 text-sm">Completa el formulario y te asesoraremos sin compromiso.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-slate-900 mb-2">
                      Nombre completo <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="Tu nombre"
                      data-testid="input-nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="tu@email.com"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-slate-900 mb-2">
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                      placeholder="600 000 000"
                      data-testid="input-telefono"
                    />
                  </div>

                  <div>
                    <label htmlFor="tipo_vehiculo" className="block text-sm font-medium text-slate-900 mb-2">
                      Tipo de vehículo de interés <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="tipo_vehiculo"
                      name="tipo_vehiculo"
                      required
                      value={formData.tipo_vehiculo}
                      onChange={(e) => setFormData({ ...formData, tipo_vehiculo: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                      data-testid="select-tipo-vehiculo"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="electrico">100% Eléctrico (BEV)</option>
                      <option value="hibrido_enchufable">Híbrido Enchufable (PHEV)</option>
                      <option value="ambos">Ambos / No estoy seguro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="vehiculo_actual" className="block text-sm font-medium text-slate-900 mb-2">
                      ¿Tienes vehículo para achatarrar?
                    </label>
                    <select
                      id="vehiculo_actual"
                      name="vehiculo_actual"
                      value={formData.vehiculo_actual}
                      onChange={(e) => setFormData({ ...formData, vehiculo_actual: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                      data-testid="select-vehiculo-actual"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="si_mas_7">Sí, con más de 7 años</option>
                      <option value="si_menos_7">Sí, con menos de 7 años</option>
                      <option value="no">No tengo vehículo para achatarrar</option>
                    </select>
                    <p className="text-xs text-slate-500 mt-1">Achatarrar un vehículo de +7 años aumenta la ayuda</p>
                  </div>

                  <div>
                    <label htmlFor="presupuesto" className="block text-sm font-medium text-slate-900 mb-2">
                      Presupuesto aproximado
                    </label>
                    <select
                      id="presupuesto"
                      name="presupuesto"
                      value={formData.presupuesto}
                      onChange={(e) => setFormData({ ...formData, presupuesto: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-8"
                      data-testid="select-presupuesto"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="menos_30000">Menos de 30.000€</option>
                      <option value="30000_45000">30.000€ - 45.000€</option>
                      <option value="mas_45000">Más de 45.000€</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="block text-sm font-medium text-slate-900 mb-2">
                      ¿Alguna duda o comentario?
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      maxLength={500}
                      rows={3}
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-colors"
                      placeholder="Cuéntanos tus dudas sobre el Plan MOVES..."
                      data-testid="textarea-mensaje"
                    />
                    <div className="flex justify-end mt-1">
                      <p className="text-xs text-slate-500">{formData.mensaje.length}/500</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500 cursor-pointer"
                        required
                        data-testid="checkbox-terminos"
                      />
                      <span className="text-sm text-slate-600">
                        He leído y acepto <Link href="/terminos" className="text-green-600 underline hover:text-green-700">los términos y condiciones de la política de privacidad</Link>.
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptMarketing}
                        onChange={(e) => setAcceptMarketing(e.target.checked)}
                        className="mt-1 w-4 h-4 text-green-600 border-slate-300 rounded focus:ring-green-500 cursor-pointer"
                        data-testid="checkbox-marketing"
                      />
                      <span className="text-sm text-slate-600">
                        Doy mi consentimiento para el tratamiento de mis datos personales con fines de marketing y comerciales (Opcional)
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || formData.mensaje.length > 500 || !acceptTerms}
                    className="w-full bg-green-600 text-white px-6 py-4 rounded-md font-bold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                    data-testid="button-submit-moves"
                  >
                    {isSubmitting ? (
                      'Enviando...'
                    ) : (
                      <>
                        <i className="ri-send-plane-line"></i>
                        Solicitar información
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center">
                    Al enviar este formulario aceptas que contactemos contigo para informarte sobre el Plan MOVES.
                  </p>

                  {submitStatus === 'error' && (
                    <p className="text-sm text-red-600 text-center" data-testid="text-error-message">
                      Ha ocurrido un error. Por favor, inténtalo de nuevo.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;

  const { data: testimonials = [] } = useQuery<any[]>({
    queryKey: ["/api/testimonials"],
  });

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Clientes satisfechos con Autoplus
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Más de 500 clientes ya han confiado en nosotros para gestionar sus ayudas
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {testimonials.slice(activeIndex, activeIndex + visibleCount).map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-1 min-w-0 bg-white rounded-md p-6 shadow-lg border border-gray-100 transition-all duration-300"
                data-testid={`card-testimonial-${testimonial.id}`}
              >
                <div className="flex items-start gap-4 mb-4 flex-wrap">
                  {testimonial.imageUrl && (
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover object-top border-2 border-green-500"
                  />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <i className="ri-map-pin-line"></i>
                      {testimonial.company}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(testimonial.rating)].map((_: any, i: number) => (
                        <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-600 text-sm leading-relaxed mb-4 italic">
                  "{testimonial.content}"
                </blockquote>

                <div className="flex items-center justify-between gap-2 pt-4 border-t border-gray-100 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                      <i className="ri-user-star-line text-gray-600"></i>
                    </div>
                    <span className="text-sm font-medium text-gray-700">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
              aria-label="Anterior"
              data-testid="button-testimonial-prev"
            >
              <i className="ri-arrow-left-s-line text-xl"></i>
            </button>
            <div className="flex gap-2">
              {[...Array(maxIndex + 1)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    i === activeIndex ? 'bg-green-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a slide ${i + 1}`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all cursor-pointer shadow-sm"
              aria-label="Siguiente"
              data-testid="button-testimonial-next"
            >
              <i className="ri-arrow-right-s-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-1">+500</div>
            <div className="text-sm text-gray-600">Clientes beneficiados</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-1">3.2M€</div>
            <div className="text-sm text-gray-600">En ayudas gestionadas</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
            <div className="text-sm text-gray-600">Gestión gratuita</div>
          </div>
          <div className="text-center p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600 mb-1">4.9/5</div>
            <div className="text-sm text-gray-600">Valoración media</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MovesFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: '¿Qué es Autoplus?',
      answer: 'Autoplus es el programa de incentivos del gobierno para la adquisición de vehículos eléctricos e híbridos enchufables. Ofrece ayudas económicas directas que pueden llegar hasta los 7.000€ dependiendo del tipo de vehículo y si se achatarra un vehículo antiguo.'
    },
    {
      question: '¿Cuánto tarda en llegar la ayuda de Autoplus?',
      answer: 'Con Grupo Avisa no tienes que esperar. Adelantamos el 100% de la ayuda de Autoplus en el momento de la compra, por lo que puedes disfrutar del descuento inmediatamente. Nosotros nos encargamos de toda la gestión con la administración.'
    },
    {
      question: '¿Qué significa "achatarramiento"?',
      answer: 'El achatarramiento consiste en dar de baja definitiva un vehículo antiguo (más de 7 años) que esté a tu nombre desde hace al menos 1 año. Al achatarrar, obtienes una ayuda mayor: 7.000€ en lugar de 4.500€ para vehículos eléctricos.'
    },
    {
      question: '¿Puedo solicitar la ayuda si soy autónomo o empresa?',
      answer: 'Sí, Autoplus está abierto a particulares, autónomos, empresas de cualquier tamaño, administraciones públicas y entidades sin ánimo de lucro. Las condiciones y cuantías pueden variar ligeramente según el tipo de beneficiario.'
    },
    {
      question: '¿Es compatible con financiación o renting?',
      answer: 'Sí, la ayuda del Autoplus es compatible con cualquier forma de pago: al contado, financiado o renting. En el caso del renting, la ayuda se aplica reduciendo las cuotas mensuales.'
    },
    {
      question: '¿Qué pasa si se agotan los fondos?',
      answer: 'Las solicitudes se tramitan por orden de llegada. Por eso es importante iniciar el proceso cuanto antes. Te mantenemos informado del estado de los fondos en tu comunidad autónoma y te avisamos si hay riesgo de agotamiento.'
    },
    {
      question: '¿Puedo combinar Autoplus con otras ayudas?',
      answer: 'Sí, Autoplus es compatible con ayudas autonómicas y locales. Algunas comunidades autónomas como Andalucía, Cataluña o Madrid ofrecen incentivos adicionales que se pueden sumar a Autoplus. Te asesoramos sobre todas las ayudas disponibles en tu zona.'
    },
    {
      question: '¿Qué vehículos están excluidos del Autoplus?',
      answer: 'Quedan excluidos los vehículos con precio superior a 45.000€ (sin IVA), los híbridos no enchufables (HEV), los vehículos de ocasión y los que no cumplan los requisitos de autonomía eléctrica mínima (30 km para PHEV).'
    },
    {
      question: '¿Grupo Avisa cobra por gestionar la ayuda?',
      answer: 'No, la gestión del Autoplus es completamente gratuita para nuestros clientes. Nos encargamos de toda la tramitación sin ningún coste adicional y además adelantamos el importe de la ayuda.'
    },
    {
      question: '¿Qué documentación necesito para solicitar la ayuda?',
      answer: 'Necesitarás tu DNI/NIE, certificado de empadronamiento, y si vas a achatarrar, el permiso de circulación y ficha técnica del vehículo a dar de baja. Nosotros te guiamos en todo el proceso y te indicamos exactamente qué documentos aportar.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Preguntas frecuentes sobre Autoplus
          </h2>
          <p className="text-xl text-gray-600">
            Resolvemos las dudas más comunes sobre las ayudas
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer hover:bg-gray-50 transition-colors"
                data-testid={`button-faq-${index}`}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <div className={`w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className="ri-arrow-down-s-line text-gray-600"></i>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <AutoLinkedText text={faq.answer} as="p" className="text-gray-600 leading-relaxed" excludeUrls={["/autoplus"]} maxLinks={3} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MovesCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-md overflow-hidden"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560179406-1f47a12c40e9?w=1400&h=500&fit=crop&auto=format&q=80')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />

          <div className="relative px-8 md:px-16 py-16 md:py-20">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para dar el salto a la movilidad eléctrica?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Visita cualquiera de nuestros 9 concesionarios en Andalucía y Extremadura.
                Te asesoramos sobre el Plan MOVES y te ayudamos a elegir el vehículo perfecto para ti.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link
                  href="/concesionarios"
                  className="inline-flex items-center gap-2 bg-[#ad023b] hover:bg-[#8d0230] text-white px-8 py-4 rounded-md font-bold transition-all duration-300 cursor-pointer whitespace-nowrap"
                  data-testid="link-ver-concesionarios"
                >
                  <i className="ri-map-pin-line"></i>
                  Ver concesionarios
                </Link>
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-md font-bold transition-all duration-300 cursor-pointer whitespace-nowrap backdrop-blur-sm"
                  data-testid="link-llamar-cta"
                >
                  <i className="ri-phone-line"></i>
                  Llámame
                </a>
              </div>

              <div className="flex flex-wrap gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>Gestión gratuita</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>Ayuda adelantada</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="ri-check-line text-green-400"></i>
                  <span>Asesoramiento experto</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative rounded-md overflow-hidden mt-12"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=1400&h=600&fit=crop&auto=format&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />

          <div className="relative px-8 py-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                ¿Listo para aprovechar Autoplus?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Contacta con nosotros y te ayudaremos con toda la gestión de forma gratuita
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link
                href="/promociones-electricos"
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all cursor-pointer"
                data-testid="link-electricos-cta"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                    <i className="ri-flashlight-line text-2xl text-green-400"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">Vehículos Eléctricos</h3>
                    <p className="text-sm text-white/70">Ver promociones</p>
                  </div>
                  <i className="ri-arrow-right-line text-white/60 ml-auto group-hover:translate-x-1 transition-transform"></i>
                </div>
              </Link>

              <Link
                href="/promociones-hibridos"
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all cursor-pointer"
                data-testid="link-hibridos-cta"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <i className="ri-charging-pile-2-line text-2xl text-blue-400"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">Híbridos Enchufables</h3>
                    <p className="text-sm text-white/70">Ver promociones</p>
                  </div>
                  <i className="ri-arrow-right-line text-white/60 ml-auto group-hover:translate-x-1 transition-transform"></i>
                </div>
              </Link>

              <Link
                href="/postventa"
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-6 transition-all cursor-pointer"
                data-testid="link-postventa-cta"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    <i className="ri-tools-line text-2xl text-purple-400"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors">Servicio Postventa</h3>
                    <p className="text-sm text-white/70">Mantenimiento especializado</p>
                  </div>
                  <i className="ri-arrow-right-line text-white/60 ml-auto group-hover:translate-x-1 transition-transform"></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AutoplusPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-autoplus">
      <SEOHead
        title="Plan MOVES III y Ayudas para Vehículos Eléctricos"
        description="Todo sobre el Plan MOVES III: hasta 7.000€ de ayuda para tu coche eléctrico o híbrido enchufable. Te gestionamos las subvenciones sin coste adicional en Grupo Avisa."
        canonical="/autoplus"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Plan MOVES y Ayudas" />
      <main role="main">
        <MovesHero />
      <SubsidyCards />
      <RequirementsSection />
      <ProcessSteps />
      <RegionalAids />
      <MovesRequestForm />
      <TestimonialsSection />
      <MovesFAQ />
        <MovesCTA />
      </main>
      <Footer />
    </div>
  );
}
