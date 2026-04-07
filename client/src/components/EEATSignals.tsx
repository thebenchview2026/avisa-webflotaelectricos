"use client";
import { Link } from "@/lib/router";
import { TRUST_METRICS } from "@/lib/entity-data";
import { CONTACT } from "@/lib/contact";

const STATS = [
  { value: `+${TRUST_METRICS.yearsExperience}`, label: "Años de experiencia", icon: "ri-calendar-check-line" },
  { value: `+${TRUST_METRICS.certifiedTechnicians}`, label: "Técnicos certificados", icon: "ri-team-line" },
  { value: `${TRUST_METRICS.brandsServed}`, label: "Marcas atendidas", icon: "ri-car-line" },
  { value: `${TRUST_METRICS.serviceLocations}`, label: "Centros de servicio", icon: "ri-building-line" },
  { value: `${TRUST_METRICS.ratingValue}★`, label: "Valoración media", icon: "ri-star-line" },
  { value: `+${TRUST_METRICS.reviewCount}`, label: "Reseñas verificadas", icon: "ri-chat-check-line" },
];

export function TrustBar({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <section
      className={`py-10 ${isDark ? "bg-gray-900" : "bg-gray-50"} border-y ${isDark ? "border-gray-800" : "border-gray-200"}`}
      aria-label="Cifras de confianza de Grupo Avisa"
      data-testid="section-trust-bar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center" data-testid={`stat-${i}`}>
              <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${isDark ? "bg-[#ad023b]/20" : "bg-[#ad023b]/10"}`}>
                <i className={`${stat.icon} text-xl text-[#ad023b]`} aria-hidden="true"></i>
              </div>
              <div className={`text-2xl md:text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
                {stat.value}
              </div>
              <div className={`text-sm mt-1 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const WHY_REASONS = [
  {
    icon: "ri-award-line",
    title: "Concesionario oficial",
    description: `Partner oficial de Volkswagen, Audi y Škoda con más de ${TRUST_METRICS.yearsExperience} años de experiencia en la red del fabricante. Garantía de servicio y calidad certificada.`,
  },
  {
    icon: "ri-flashlight-line",
    title: "Certificación alta tensión",
    description: "Todos nuestros técnicos cuentan con certificación oficial para trabajar en sistemas de alto voltaje de vehículos eléctricos e híbridos enchufables.",
  },
  {
    icon: "ri-tools-line",
    title: "Equipamiento oficial de diagnóstico",
    description: "Utilizamos exclusivamente herramientas de diagnóstico y software oficial del fabricante, actualizados a la última versión disponible.",
  },
  {
    icon: "ri-shield-check-line",
    title: "Repuestos originales con garantía",
    description: "Cada reparación utiliza piezas originales del fabricante con garantía completa. Tu vehículo mantiene su valor residual y la garantía de fábrica.",
  },
  {
    icon: "ri-map-pin-line",
    title: "8 centros en Andalucía y Extremadura",
    description: `Red de ${TRUST_METRICS.serviceLocations} concesionarios en Sevilla, Dos Hermanas, Huelva, Córdoba, Badajoz, Cáceres y Fuente de Cantos. Siempre tienes un taller oficial cerca.`,
  },
  {
    icon: "ri-hand-heart-line",
    title: "Atención personalizada y transparente",
    description: "Presupuesto previo sin compromiso, seguimiento en tiempo real de tu reparación y vehículo de sustitución disponible durante la intervención.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white" aria-label="Por qué elegir Grupo Avisa" data-testid="section-why-choose">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-why-choose-title">
            ¿Por qué elegir Grupo Avisa?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Más de {TRUST_METRICS.yearsExperience} años como concesionario oficial nos avalan. Combinamos la experiencia del servicio oficial con la especialización en movilidad eléctrica.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_REASONS.map((reason, i) => (
            <article key={i} className="bg-gray-50 rounded-md p-6 border border-gray-100 hover:shadow-lg transition-shadow" data-testid={`card-reason-${i}`}>
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md mb-4">
                <i className={`${reason.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  {
    icon: "ri-phone-line",
    title: "Contacto y cita previa",
    description: "Solicita cita por teléfono, WhatsApp o formulario web. Te asignamos hora y día según tu disponibilidad.",
  },
  {
    icon: "ri-car-line",
    title: "Recepción del vehículo",
    description: "Recibimos tu vehículo y realizamos una inspección visual inicial. Te proporcionamos vehículo de sustitución si lo necesitas.",
  },
  {
    icon: "ri-search-eye-line",
    title: "Diagnóstico con software oficial",
    description: "Conectamos tu vehículo al sistema de diagnóstico oficial del fabricante para una lectura completa de todas las centralitas.",
  },
  {
    icon: "ri-file-list-3-line",
    title: "Presupuesto transparente",
    description: "Te presentamos un presupuesto detallado con desglose de piezas y mano de obra. Sin sorpresas ni costes ocultos.",
  },
  {
    icon: "ri-tools-line",
    title: "Intervención certificada",
    description: "Técnicos certificados realizan la intervención con piezas originales siguiendo protocolos oficiales del fabricante.",
  },
  {
    icon: "ri-checkbox-circle-line",
    title: "Control de calidad y entrega",
    description: "Control final con prueba en carretera, verificación electrónica de todos los sistemas y entrega con garantía de 2 años.",
  },
];

export function WorkProcess() {
  return (
    <section className="py-20 bg-gray-50" aria-label="Proceso de trabajo" data-testid="section-work-process">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-process-title">
            Nuestro proceso de trabajo
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Un proceso riguroso y transparente que garantiza la máxima calidad en cada intervención
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((step, i) => (
            <div key={i} className="relative bg-white rounded-md p-6 shadow-sm border border-gray-100" data-testid={`step-${i}`}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] rounded-full text-white font-bold text-lg">
                    {i + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <i className={`${step.icon} text-[#ad023b]`} aria-hidden="true"></i>
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    name: "María García López",
    vehicle: "Volkswagen ID.4",
    rating: 5,
    text: "Excelente atención y asesoramiento en la compra de nuestro ID.4. El equipo de Grupo Avisa nos ayudó con todo el proceso, incluida la tramitación del Plan MOVES. Muy profesionales.",
    date: "Noviembre 2025",
    service: "Venta y entrega",
  },
  {
    name: "Carlos Rodríguez Pérez",
    vehicle: "Audi Q4 e-tron",
    rating: 5,
    text: "Servicio postventa impecable. Los técnicos conocen perfectamente los vehículos eléctricos y el diagnóstico fue rápido y preciso. Me explicaron todo con detalle. Muy recomendable.",
    date: "Octubre 2025",
    service: "Diagnóstico y mantenimiento",
  },
  {
    name: "Ana Martín Sánchez",
    vehicle: "Škoda Enyaq iV",
    rating: 5,
    text: "Llevé mi Enyaq para la revisión anual y el trato fue excepcional. Me ofrecieron vehículo de sustitución y me avisaron cuando estaba listo. Precios muy competitivos para taller oficial.",
    date: "Septiembre 2025",
    service: "Mantenimiento programado",
  },
  {
    name: "Pedro Sánchez López",
    vehicle: "Volkswagen ID.3",
    rating: 5,
    text: "Cambié mi diésel por el ID.3 hace 8 meses y no podría estar más contento. El equipo de Grupo Avisa me ayudó a tramitar las ayudas MOVES y el proceso fue muy sencillo. Lo recomiendo sin duda.",
    date: "Agosto 2025",
    service: "Compra vehículo eléctrico",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white" aria-label="Opiniones de clientes" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-testimonials-title">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Más de {TRUST_METRICS.reviewCount} reseñas con una valoración media de {TRUST_METRICS.ratingValue} sobre 5
          </p>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <i key={s} className="ri-star-fill text-2xl text-amber-400" aria-hidden="true"></i>
            ))}
            <i className="ri-star-half-fill text-2xl text-amber-400" aria-hidden="true"></i>
            <span className="ml-2 text-lg font-bold text-gray-900">4.7/5</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <article key={i} className="bg-gray-50 rounded-md p-8 border border-gray-100" data-testid={`testimonial-${i}`}>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <i key={s} className="ri-star-fill text-amber-400" aria-hidden="true"></i>
                ))}
              </div>
              <blockquote className="text-gray-700 leading-relaxed mb-6 italic">
                "{t.text}"
              </blockquote>
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.vehicle} · {t.service}</div>
                </div>
                <span className="text-xs text-gray-400">{t.date}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocalCoverage() {
  const locations = [
    { city: "Sevilla", count: 3, brands: "Volkswagen, Audi, Škoda" },
    { city: "Dos Hermanas", count: 1, brands: "Volkswagen" },
    { city: "Huelva", count: 1, brands: "Škoda" },
    { city: "Córdoba", count: 1, brands: "Škoda" },
    { city: "Badajoz", count: 1, brands: "Škoda" },
    { city: "Cáceres", count: 1, brands: "Škoda" },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white" aria-label="Cobertura local" data-testid="section-local-coverage">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-coverage-title">
              Servicio oficial en Andalucía y Extremadura
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Con {TRUST_METRICS.serviceLocations} centros de servicio distribuidos en {TRUST_METRICS.cities} ciudades, Grupo Avisa es la red de concesionarios oficiales más amplia del sur de España para vehículos eléctricos e híbridos.
            </p>
            <div className="space-y-4">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center gap-4 bg-white/5 rounded-md p-4 border border-white/10" data-testid={`location-${i}`}>
                  <div className="w-10 h-10 flex items-center justify-center bg-[#ad023b] rounded-full flex-shrink-0">
                    <i className="ri-map-pin-line text-lg" aria-hidden="true"></i>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{loc.city}</div>
                    <div className="text-sm text-white/60">{loc.brands} · {loc.count} {loc.count === 1 ? "centro" : "centros"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 rounded-md p-8 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <i className="ri-customer-service-2-line text-[#ad023b]" aria-hidden="true"></i>
              Contacto directo
            </h3>
            <div className="space-y-5">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-4 text-white hover:text-[#ad023b] transition-colors group" data-testid="link-phone-coverage">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] rounded-md flex-shrink-0 group-hover:bg-[#8d0230] transition-colors">
                  <i className="ri-phone-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <div className="font-bold text-lg">955 034 600</div>
                  <div className="text-sm text-white/60">Lunes a viernes 9:00 – 20:00</div>
                </div>
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-green-400 transition-colors group" data-testid="link-whatsapp-coverage">
                <div className="w-12 h-12 flex items-center justify-center bg-green-600 rounded-md flex-shrink-0 group-hover:bg-green-700 transition-colors">
                  <i className="ri-whatsapp-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <div className="font-bold text-lg">WhatsApp</div>
                  <div className="text-sm text-white/60">Respuesta en menos de 2 horas</div>
                </div>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 text-white hover:text-[#ad023b] transition-colors group" data-testid="link-email-coverage">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-700 rounded-md flex-shrink-0 group-hover:bg-gray-600 transition-colors">
                  <i className="ri-mail-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <div className="font-bold text-lg">{CONTACT.email}</div>
                  <div className="text-sm text-white/60">Respuesta en 24 horas</div>
                </div>
              </a>
              <div className="pt-4 mt-4 border-t border-white/10">
                <Link href="/concesionarios" className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-md font-bold hover:bg-[#8d0230] transition-colors w-full justify-center" data-testid="link-find-dealer">
                  <i className="ri-map-pin-line" aria-hidden="true"></i>
                  Encuentra tu concesionario
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ExpertiseBadges({ context }: { context?: string }) {
  const badges = [
    { icon: "ri-shield-check-line", text: "Concesionario oficial VW · Audi · Škoda" },
    { icon: "ri-flashlight-line", text: "Técnicos certificados alta tensión" },
    { icon: "ri-tools-line", text: "Diagnóstico con software oficial" },
    { icon: "ri-award-line", text: "Garantía oficial del fabricante" },
    { icon: "ri-car-line", text: "14 marcas · 5 servicios especializados" },
    { icon: "ri-map-pin-line", text: "8 centros en Andalucía y Extremadura" },
  ];

  return (
    <div className="flex flex-wrap gap-3 mt-6" data-testid="expertise-badges">
      {badges.map((badge, i) => (
        <span key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 rounded-full px-4 py-2 text-sm">
          <i className={`${badge.icon} text-[#ad023b]`} aria-hidden="true"></i>
          {badge.text}
        </span>
      ))}
    </div>
  );
}

const SPECIALIST_AREAS = [
  { icon: "ri-battery-charge-line", title: "Baterías de alto voltaje", desc: "Diagnóstico de SOH, equilibrado de celdas, reparación de módulos y refrigeración de packs de batería de iones de litio." },
  { icon: "ri-speed-line", title: "Motores eléctricos e inversores", desc: "Análisis de rendimiento, mantenimiento de sistemas de refrigeración y verificación de la electrónica de potencia." },
  { icon: "ri-charging-pile-line", title: "Sistemas de carga", desc: "Reparación de cargadores a bordo, diagnóstico de puertos CCS/Tipo 2 e instalación de wallbox domésticos." },
  { icon: "ri-dashboard-line", title: "Sistemas ADAS", desc: "Calibración de cámaras y radares para frenada de emergencia, control de crucero adaptativo y asistente de carril." },
  { icon: "ri-temp-hot-line", title: "Gestión térmica", desc: "Mantenimiento de circuitos de refrigeración líquida, bombas de calor y sistemas de climatización de baterías." },
  { icon: "ri-wifi-line", title: "Software y actualizaciones OTA", desc: "Aplicación de actualizaciones de software del fabricante, resolución de errores y codificación de centralitas." },
];

export function SpecialistAreas() {
  return (
    <section className="py-20 bg-white" aria-label="Áreas de especialización" data-testid="section-specialist-areas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-specialist-title">
            Especialistas en vehículos eléctricos e híbridos
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nuestro equipo de más de {TRUST_METRICS.certifiedTechnicians} técnicos está formado y certificado en las tecnologías específicas de la movilidad eléctrica
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPECIALIST_AREAS.map((area, i) => (
            <article key={i} className="group" data-testid={`specialist-area-${i}`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b]/10 rounded-md flex-shrink-0 group-hover:bg-[#ad023b]/20 transition-colors">
                  <i className={`${area.icon} text-2xl text-[#ad023b]`} aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
