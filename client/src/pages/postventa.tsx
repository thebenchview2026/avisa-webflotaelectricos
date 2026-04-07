"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { buildPostventaServiceJsonLd, buildFaqJsonLd } from "@/components/SEOHead";
import AutoLinkedText from "@/components/AutoLinkedText";
import { TrustBar, WorkProcess, TestimonialsSection } from "@/components/EEATSignals";
import Breadcrumbs from "@/components/Breadcrumbs";
import type { Service, MaintenancePlan } from "@shared/schema";

function PostventaHero() {
  return (
    <section className="relative min-h-[500px] flex items-center" aria-label="Servicio postventa especializado">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1440&h=600&fit=crop&auto=format&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="max-w-2xl">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            data-testid="text-postventa-title"
          >
            Servicio Postventa Especializado
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Talleres oficiales con técnicos certificados en vehículos eléctricos
            e híbridos. Tu tranquilidad es nuestra prioridad.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#cita-postventa"
              className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-reservar-cita-hero"
            >
              <i className="ri-calendar-check-line" aria-hidden="true"></i>
              Reservar cita
            </a>
            <a
              href="tel:+34955034600"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-phone-hero"
            >
              <i className="ri-phone-line" aria-hidden="true"></i>
              Llámame
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesGrid({ initialData }: { initialData?: Service[] }) {
  const { data: services = [] } = useQuery<Service[]>({
    queryKey: ["/api/services"],
    initialData: initialData,
  });

  return (
    <section className="py-20 bg-gray-50" aria-label="Nuestros servicios de taller">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-services-title"
          >
            Nuestros servicios
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ofrecemos un servicio integral para tu vehículo eléctrico o híbrido
            con los más altos estándares de calidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-md p-8 shadow-lg hover:shadow-xl transition-shadow"
              data-testid={`card-service-${index}`}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-6">
                <i className={`${service.icon} text-2xl text-[#ad023b]`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {(service.features || []).map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <i className="ri-check-line text-[#ad023b] text-base mt-0.5 flex-shrink-0" aria-hidden="true"></i>
                    <span>{feature}</span>
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

function MaintenancePlans({ initialData }: { initialData?: MaintenancePlan[] }) {
  const { data: plans = [] } = useQuery<MaintenancePlan[]>({
    queryKey: ["/api/maintenance-plans"],
    initialData: initialData,
  });

  return (
    <section className="py-20 bg-white" aria-label="Planes de mantenimiento">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-plans-title"
          >
            Planes de mantenimiento
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Todos incluyen
            mano de obra y piezas originales.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-md p-8 ${
                plan.highlighted
                  ? "bg-gradient-to-b from-[#ad023b] to-[#8d0230] text-white shadow-2xl scale-105"
                  : "bg-gray-50 text-gray-900 shadow-lg"
              }`}
              data-testid={`card-plan-${index}`}
            >
              {plan.highlighted && (
                <div className="text-center mb-4">
                  <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MÁS POPULAR
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2 text-center">
                {plan.name}
              </h3>
              <p
                className={`text-center mb-6 ${plan.highlighted ? "text-white/80" : "text-gray-600"}`}
              >
                {plan.description}
              </p>
              <div className="text-center mb-8">
                <span className="text-5xl font-bold">{plan.price}</span>
                <span
                  className={`${plan.highlighted ? "text-white/80" : "text-gray-500"}`}
                >
                  {" "}
                  / revisión
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                {(plan.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <i
                      className={`ri-check-line text-lg flex-shrink-0 ${plan.highlighted ? "text-white" : "text-[#ad023b]"}`}
                    ></i>
                    <span
                      className={`text-sm ${plan.highlighted ? "text-white/90" : "text-gray-700"}`}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#cita-postventa"
                className={`block text-center py-4 rounded-md font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  plan.highlighted
                    ? "bg-white text-[#ad023b] hover:bg-gray-100"
                    : "bg-[#ad023b] text-white hover:bg-[#8d0230]"
                }`}
                data-testid={`link-plan-cita-${index}`}
              >
                Reservar cita
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          * Precios orientativos. El precio final puede variar según el modelo
          de vehículo. Consulta condiciones.
        </p>
      </div>
    </section>
  );
}

function TechnicianTeam() {
  const certifications = [
    {
      icon: "ri-flashlight-line",
      title: "Certificación Alta Tensión",
      description:
        "Todos nuestros técnicos están certificados para trabajar con sistemas de alto voltaje de vehículos eléctricos.",
    },
    {
      icon: "ri-award-line",
      title: "Formación Continua",
      description:
        "Actualización constante en las últimas tecnologías de Volkswagen, Audi y Škoda.",
    },
    {
      icon: "ri-cpu-line",
      title: "Equipamiento Oficial",
      description:
        "Herramientas de diagnóstico oficiales y software actualizado de cada marca.",
    },
    {
      icon: "ri-verified-badge-line",
      title: "Garantía Oficial",
      description:
        "Todas las intervenciones mantienen la garantía oficial del fabricante.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white" aria-label="Equipo de técnicos certificados">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              data-testid="text-team-title"
            >
              Técnicos especializados en movilidad eléctrica
            </h2>
            <AutoLinkedText text="Nuestro equipo cuenta con más de 50 técnicos certificados en vehículos eléctricos e híbridos. Formación oficial de Volkswagen Group con las últimas tecnologías del sector." as="p" className="text-white/80 text-lg mb-8 leading-relaxed" excludeUrls={["/postventa"]} linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium" maxLinks={3} />
            <div className="grid sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] rounded-md flex-shrink-0">
                    <i className={`${cert.icon} text-xl text-white`}></i>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{cert.title}</h3>
                    <p className="text-white/70 text-sm">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=480&h=400&fit=crop&auto=format&q=80"
              alt="Equipo técnico especializado en vehículos eléctricos"
              className="rounded-md shadow-2xl w-full object-cover"
              loading="lazy"
              width={480}
              height={400}
            />
            <div className="absolute -bottom-6 -left-6 bg-[#ad023b] rounded-md p-6 shadow-xl">
              <div className="text-4xl font-bold" data-testid="text-technician-count">+50</div>
              <div className="text-white/90">Técnicos certificados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AppointmentForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    matricula: "",
    marca: "",
    modelo: "",
    servicio: "",
    concesionario: "",
    fecha: "",
    hora: "",
    comentarios: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [charCount, setCharCount] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "comentarios") {
      if (value.length <= 500) {
        setFormData({ ...formData, [name]: value });
        setCharCount(value.length);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.comentarios.length > 500 || !acceptTerms) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          acepta_terminos: acceptTerms ? "Sí" : "No",
          acepta_marketing: acceptMarketing ? "Sí" : "No",
          tipo: "cita-postventa",
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cita-postventa" className="py-20 bg-gray-50" aria-label="Solicitar cita de taller">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              data-testid="text-appointment-title"
            >
              Reserva tu cita online
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Solicita tu cita de forma rápida y sencilla. Nos pondremos en
              contacto contigo para confirmar la disponibilidad.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md flex-shrink-0">
                  <i className="ri-calendar-check-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Cita previa online
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Reserva tu cita 24/7 desde cualquier dispositivo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md flex-shrink-0">
                  <i className="ri-phone-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Confirmación telefónica
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Te llamamos para confirmar fecha y hora.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-md flex-shrink-0">
                  <i className="ri-mail-send-line text-xl text-[#ad023b]" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Recordatorio por email
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Recibirás un recordatorio antes de tu cita.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 p-6 bg-white rounded-md shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">
                Horario de talleres
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Lunes - Viernes</span>
                  <span className="font-medium text-gray-900">
                    08:00 - 20:00
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Sábados</span>
                  <span className="font-medium text-gray-900">
                    09:00 - 14:00
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-600">Domingos</span>
                  <span className="font-medium text-gray-900">Cerrado</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-white rounded-md shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4">
                Contacto directo
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+34955034600"
                  className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-5 py-3 rounded-full font-bold hover:bg-[#8d0230] transition-colors cursor-pointer"
                  data-testid="link-contact-phone"
                >
                  <i className="ri-phone-line" aria-hidden="true"></i>
                  Llámame
                </a>
                <a
                  href="mailto:info@grupoavisa.com"
                  className="flex items-center gap-3 text-gray-700 hover:text-[#ad023b] transition-colors cursor-pointer"
                  data-testid="link-contact-email"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b]/10 rounded-md">
                    <i className="ri-mail-line text-[#ad023b]" aria-hidden="true"></i>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email</div>
                    <div className="font-medium">info@grupoavisa.com</div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md shadow-xl p-8">
            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                  <i className="ri-check-line text-4xl text-green-600" aria-hidden="true"></i>
                </div>
                <h3
                  className="text-2xl font-bold text-gray-900 mb-4"
                  data-testid="text-form-success"
                >
                  ¡Solicitud enviada!
                </h3>
                <p className="text-gray-600 mb-6">
                  Hemos recibido tu solicitud de cita. Te contactaremos en breve
                  para confirmar la disponibilidad.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="text-[#ad023b] font-medium hover:underline cursor-pointer"
                  data-testid="button-nueva-cita"
                >
                  Solicitar otra cita
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-6 p-4 bg-[#ad023b]/5 rounded-md border border-[#ad023b]/10">
                  <img
                    src="/ana-perez.png"
                    alt="Ana - Asesora de vehículos eléctricos"
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">
                        La persona que te va a atender es Ana
                      </span>
                      , lleva más de 10 años como profesional de flotas en Avisa
                      y de forma rápida tendrás un asesoramiento directo de alta
                      calidad.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm"
                        placeholder="Tu nombre"
                        data-testid="input-nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm"
                        placeholder="tu@email.com"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm"
                        placeholder="600 000 000"
                        data-testid="input-telefono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Matrícula
                      </label>
                      <input
                        type="text"
                        name="matricula"
                        value={formData.matricula}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm"
                        placeholder="0000 ABC"
                        data-testid="input-matricula"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marca *
                      </label>
                      <div className="relative">
                        <select
                          name="marca"
                          value={formData.marca}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm appearance-none cursor-pointer pr-10"
                          data-testid="select-marca"
                        >
                          <option value="">Selecciona marca</option>
                          <option value="Volkswagen">Volkswagen</option>
                          <option value="Audi">Audi</option>
                          <option value="Škoda">Škoda</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modelo
                      </label>
                      <input
                        type="text"
                        name="modelo"
                        value={formData.modelo}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm"
                        placeholder="Ej: ID.4, e-tron, Enyaq..."
                        data-testid="input-modelo"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de servicio *
                      </label>
                      <div className="relative">
                        <select
                          name="servicio"
                          value={formData.servicio}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm appearance-none cursor-pointer pr-10"
                          data-testid="select-servicio"
                        >
                          <option value="">Selecciona servicio</option>
                          <option value="Revisión básica">
                            Revisión básica
                          </option>
                          <option value="Revisión completa">
                            Revisión completa
                          </option>
                          <option value="Revisión premium">
                            Revisión premium
                          </option>
                          <option value="Diagnóstico de batería">
                            Diagnóstico de batería
                          </option>
                          <option value="Cambio de neumáticos">
                            Cambio de neumáticos
                          </option>
                          <option value="Pre-ITV">Pre-ITV</option>
                          <option value="Reparación">Reparación</option>
                          <option value="Otro">Otro</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Concesionario *
                      </label>
                      <div className="relative">
                        <select
                          name="concesionario"
                          value={formData.concesionario}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm appearance-none cursor-pointer pr-10"
                          data-testid="select-concesionario"
                        >
                          <option value="">Selecciona concesionario</option>
                          <option value="Avisa Volkswagen Sevilla">
                            Avisa Volkswagen Sevilla
                          </option>
                          <option value="Avisa Audi Sevilla">
                            Avisa Audi Sevilla
                          </option>
                          <option value="Cartuja Motor Sevilla">
                            Cartuja Motor Sevilla
                          </option>
                          <option value="Cartuja Motor Dos Hermanas">
                            Cartuja Motor Dos Hermanas
                          </option>
                          <option value="Cartuja Motor Huelva">
                            Cartuja Motor Huelva
                          </option>
                          <option value="Avisa Škoda Badajoz">
                            Avisa Škoda Badajoz
                          </option>
                          <option value="Avisa Škoda Cáceres">
                            Avisa Škoda Cáceres
                          </option>
                          <option value="Avisa Škoda Fuente de Cantos">
                            Avisa Škoda Fuente de Cantos
                          </option>
                          <option value="Avisa Škoda Córdoba">
                            Avisa Škoda Córdoba
                          </option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Fecha preferida
                      </label>
                      <input
                        type="date"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer"
                        data-testid="input-fecha"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hora preferida
                      </label>
                      <div className="relative">
                        <select
                          name="hora"
                          value={formData.hora}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm appearance-none cursor-pointer pr-10"
                          data-testid="select-hora"
                        >
                          <option value="">Selecciona hora</option>
                          <option value="08:00">08:00</option>
                          <option value="09:00">09:00</option>
                          <option value="10:00">10:00</option>
                          <option value="11:00">11:00</option>
                          <option value="12:00">12:00</option>
                          <option value="13:00">13:00</option>
                          <option value="16:00">16:00</option>
                          <option value="17:00">17:00</option>
                          <option value="18:00">18:00</option>
                          <option value="19:00">19:00</option>
                        </select>
                        <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" aria-hidden="true"></i>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comentarios adicionales
                    </label>
                    <textarea
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm resize-none"
                      placeholder="Describe brevemente el motivo de tu visita..."
                      data-testid="textarea-comentarios"
                    ></textarea>
                    <div className="flex justify-between items-center mt-1 gap-2">
                      <span
                        className={`text-xs ${charCount > 500 ? "text-red-600" : "text-gray-500"}`}
                      >
                        {charCount}/500 caracteres
                      </span>
                      {charCount > 500 && (
                        <span className="text-xs text-red-600">
                          Has superado el límite
                        </span>
                      )}
                    </div>
                  </div>

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p
                        className="text-red-600 text-sm"
                        data-testid="text-form-error"
                      >
                        Ha ocurrido un error. Por favor, inténtalo de nuevo.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded focus:ring-[#ad023b] cursor-pointer"
                        required
                        data-testid="checkbox-terms"
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto{" "}
                        <Link
                          href="/terminos"
                          className="text-[#ad023b] underline hover:text-[#8d0230]"
                        >
                          los términos y condiciones de la política de
                          privacidad
                        </Link>
                        .
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptMarketing}
                        onChange={(e) => setAcceptMarketing(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded focus:ring-[#ad023b] cursor-pointer"
                        data-testid="checkbox-marketing"
                      />
                      <span className="text-sm text-gray-600">
                        Doy mi consentimiento para el tratamiento de mis datos
                        personales con fines de marketing y comerciales
                        (Opcional)
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      isSubmitting || charCount > 500 || !acceptTerms
                    }
                    className="w-full bg-[#ad023b] text-white py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    data-testid="button-submit-cita"
                  >
                    {isSubmitting ? "Enviando..." : "Solicitar cita"}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Al enviar este formulario aceptas nuestra política de
                    privacidad.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function PostventaFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question:
        "¿Cada cuánto tiempo debo hacer la revisión de mi vehículo eléctrico?",
      answer:
        "Los vehículos eléctricos requieren menos mantenimiento que los de combustión. Recomendamos una revisión anual o cada 30.000 km, lo que ocurra primero. Sin embargo, es importante seguir las indicaciones específicas del fabricante para tu modelo.",
    },
    {
      question:
        "¿Qué incluye el diagnóstico de batería de alto voltaje?",
      answer:
        "El diagnóstico incluye la comprobación del estado de salud de la batería (SOH), capacidad de carga, equilibrado de celdas, sistema de refrigeración y conectores. Te proporcionamos un informe detallado con el estado actual y recomendaciones.",
    },
    {
      question:
        "¿Puedo llevar mi vehículo a cualquier concesionario del grupo?",
      answer:
        "Sí, puedes llevar tu vehículo a cualquiera de nuestros 9 concesionarios. Todos cuentan con técnicos certificados y equipamiento oficial para atender vehículos Volkswagen, Audi y Škoda.",
    },
    {
      question:
        "¿Ofrecéis vehículo de sustitución durante la reparación?",
      answer:
        "Sí, disponemos de vehículos de cortesía eléctricos para intervenciones que requieran más de un día. Este servicio está incluido en el plan Premium y disponible bajo petición para otros servicios.",
    },
    {
      question: "¿Qué garantía tienen las reparaciones?",
      answer:
        "Todas nuestras reparaciones tienen una garantía de 2 años en piezas y mano de obra. Utilizamos exclusivamente piezas originales del fabricante para mantener la garantía oficial de tu vehículo.",
    },
    {
      question:
        "¿Puedo instalar un punto de carga en mi garaje comunitario?",
      answer:
        "Sí, te asesoramos en todo el proceso: estudio de viabilidad, gestión con la comunidad de propietarios, instalación homologada y tramitación de ayudas del Plan MOVES. Contacta con nosotros para un presupuesto sin compromiso.",
    },
  ];

  return (
    <section className="py-20 bg-white" aria-label="Preguntas frecuentes de postventa">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-faq-title"
          >
            Preguntas frecuentes
          </h2>
          <p className="text-lg text-gray-600">
            Resolvemos tus dudas sobre el servicio postventa
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md overflow-hidden"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                data-testid={`button-faq-${index}`}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <i
                  className={`ri-arrow-down-s-line text-xl text-gray-500 transition-transform flex-shrink-0 ${openIndex === index ? "rotate-180" : ""}`}
                ></i>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <AutoLinkedText text={faq.answer} as="p" className="text-gray-600 leading-relaxed" excludeUrls={["/postventa"]} maxLinks={3} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PostventaCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-[#ad023b] to-[#8d0230]" aria-label="Solicitar cita de postventa">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            data-testid="text-cta-title"
          >
            ¿Necesitas ayuda con tu vehículo?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Nuestro equipo de expertos está disponible para resolver cualquier
            duda o incidencia. Contacta con nosotros.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+34955034600"
              className="inline-flex items-center gap-2 bg-white text-[#ad023b] px-8 py-4 rounded-md font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-cta-phone"
            >
              <i className="ri-phone-line" aria-hidden="true"></i>
              Llámame
            </a>
            <Link
              href="/concesionarios"
              className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-md font-bold hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-cta-concesionarios"
            >
              <i className="ri-map-pin-line" aria-hidden="true"></i>
              Ver concesionarios
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

interface PostventaPageProps {
  initialServices?: Service[];
  initialPlans?: MaintenancePlan[];
}

export default function PostventaPage({ initialServices, initialPlans }: PostventaPageProps = {}) {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-postventa">
      <SEOHead
        title="Servicio Postventa Vehículos Eléctricos e Híbridos"
        description="Taller oficial especializado en mantenimiento y reparación de coches eléctricos e híbridos. Técnicos certificados, repuestos originales y diagnóstico avanzado en Sevilla."
        canonical="/postventa"
        jsonLd={[
          buildPostventaServiceJsonLd(),
          buildFaqJsonLd([
            { question: "¿Cuánto cuesta el mantenimiento de un coche eléctrico?", answer: "El mantenimiento de un vehículo eléctrico es hasta un 40% más económico que uno de combustión. No necesita cambios de aceite, filtros de combustible ni embrague." },
            { question: "¿Con qué frecuencia debo revisar la batería?", answer: "Recomendamos una revisión anual del estado de la batería. Las baterías modernas tienen una vida útil de 8 a 10 años o más de 160.000 km." },
            { question: "¿Ofrecen servicio de recogida del vehículo?", answer: "Sí, ofrecemos servicio de recogida y entrega de tu vehículo en un radio de 30 km de nuestras instalaciones en Sevilla." }
          ])
        ]}
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Postventa" />
      <main role="main">
        <PostventaHero />
        <TrustBar variant="dark" />
        <ServicesGrid initialData={initialServices} />
        <WorkProcess />
        <MaintenancePlans initialData={initialPlans} />
        <TechnicianTeam />
        <TestimonialsSection />
        <AppointmentForm />
        <PostventaFAQ />
        <PostventaCTA />
      </main>
      <Footer />
    </div>
  );
}
