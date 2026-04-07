import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS, TRUST_METRICS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import type { BrandCommonProblem } from "./content-engine";

export interface ProgrammaticPage {
  slug: string;
  serviceSlug: string;
  serviceName: string;
  brandSlug: string;
  brandName: string;
  citySlug: string;
  cityName: string;
  region: string;
  isOfficial: boolean;
  h1: string;
  intro: string;
  serviceSection: { heading: string; paragraphs: string[] };
  brandSection: { heading: string; paragraphs: string[] };
  commonProblems: BrandCommonProblem[];
  processSteps: { step: string; description: string }[];
  faqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaText: string;
  metaTitle: string;
  metaDescription: string;
  nearbyAreas: string[];
}

const CITY_DATA = SERVICE_CITIES.map(c => ({
  slug: c.slug,
  city: c.city,
  region: c.region,
  nearbyAreas: c.nearbyAreas,
}));

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length];
}

const H1_TEMPLATES = [
  (s: string, b: string, c: string) => `${s} ${b} Eléctrico en ${c}`,
  (s: string, b: string, c: string) => `${s} para ${b} Eléctrico · ${c}`,
  (s: string, b: string, c: string) => `${s} Especializado ${b} en ${c}`,
  (s: string, b: string, c: string) => `Servicio de ${s} ${b} en ${c}`,
  (s: string, b: string, c: string) => `${s} ${b} — Taller en ${c}`,
  (s: string, b: string, c: string) => `${s} Profesional ${b} en ${c}`,
];

const TITLE_TEMPLATES = [
  (s: string, b: string, c: string) => `${s} ${b} Eléctrico en ${c}`,
  (s: string, b: string, c: string) => `${s} ${b} en ${c}`,
  (s: string, b: string, c: string) => `Taller ${b} ${c} — ${s}`,
];

const DESC_TEMPLATES = [
  (s: string, b: string, c: string, tt: string) => `${tt} ${b} para ${s.toLowerCase()} de vehículos eléctricos e híbridos en ${c}. Técnicos certificados, repuestos originales. Pide cita.`,
  (s: string, b: string, c: string, tt: string) => `${s} profesional para tu ${b} eléctrico en ${c}. ${tt} con +${TRUST_METRICS.certifiedTechnicians} técnicos cualificados. Presupuesto sin compromiso.`,
  (s: string, b: string, c: string, tt: string) => `Servicio de ${s.toLowerCase()} ${b} en ${c}. ${tt} con garantía oficial. +${TRUST_METRICS.yearsExperience} años de experiencia. Solicita cita online.`,
];

function introTemplates(s: string, b: string, c: string, region: string, tt: string, official: boolean): string[] {
  const certLabel = official
    ? `técnicos certificados directamente por ${b}`
    : `técnicos especializados con formación avanzada en ${b}`;
  const repuestos = official ? "repuestos originales con garantía del fabricante" : "repuestos de primera calidad homologados";

  return [
    `En nuestro ${tt.toLowerCase()} en ${c} ofrecemos un servicio integral de ${s.toLowerCase()} para tu ${b} eléctrico e híbrido enchufable. Contamos con ${certLabel} y utilizamos ${repuestos}. Con más de ${TRUST_METRICS.yearsExperience} años de experiencia en ${region}, somos la referencia en el cuidado de vehículos electrificados ${b}.`,

    `¿Buscas ${s.toLowerCase()} para tu ${b} eléctrico en ${c}? Nuestro ${tt.toLowerCase()} cuenta con la tecnología de diagnóstico más avanzada y un equipo de +${TRUST_METRICS.certifiedTechnicians} ${certLabel}. Cada intervención se realiza con ${repuestos}, garantizando el rendimiento óptimo de tu vehículo.`,

    `Grupo Avisa es tu ${tt.toLowerCase()} de referencia para ${s.toLowerCase()} de ${b} eléctricos e híbridos en ${c} y toda la zona de ${region}. Nuestros profesionales están formados en las últimas tecnologías de alta tensión y sistemas de propulsión eléctrica ${b}. Trabajamos con ${repuestos} y ofrecemos garantía en cada intervención.`,

    `Tu ${b} eléctrico merece el mejor servicio de ${s.toLowerCase()} en ${c}. En nuestro centro autorizado disponemos de herramientas de diagnóstico oficiales, ${certLabel} y un compromiso total con la excelencia. Más de ${TRUST_METRICS.vehiclesServiced} vehículos electrificados atendidos avalan nuestra experiencia en ${region}.`,
  ];
}

function serviceSection(serviceSlug: string, brandName: string, cityName: string): { heading: string; paragraphs: string[] } {
  const def = SERVICE_DEFINITIONS[serviceSlug];
  if (!def) return { heading: "", paragraphs: [] };

  const headings: Record<string, string[]> = {
    reparacion: [
      `Reparación integral de ${brandName} eléctrico en ${cityName}`,
      `Servicio de reparación certificada para ${brandName} en ${cityName}`,
    ],
    diagnostico: [
      `Diagnóstico avanzado para ${brandName} eléctrico en ${cityName}`,
      `Centro de diagnóstico especializado ${brandName} en ${cityName}`,
    ],
    mantenimiento: [
      `Plan de mantenimiento ${brandName} eléctrico en ${cityName}`,
      `Mantenimiento preventivo para tu ${brandName} en ${cityName}`,
    ],
    carga: [
      `Instalación de punto de carga para ${brandName} en ${cityName}`,
      `Soluciones de carga doméstica para ${brandName} en ${cityName}`,
    ],
    garantia: [
      `Garantía y extensión de cobertura ${brandName} en ${cityName}`,
      `Programa de garantía ${brandName} eléctrico en ${cityName}`,
    ],
  };

  const paragraphs: Record<string, string[]> = {
    reparacion: [
      `Nuestro equipo de reparación en ${cityName} está formado por técnicos con certificación de alto voltaje especializados en la arquitectura eléctrica de ${brandName}. Utilizamos herramientas de diagnóstico oficiales para identificar con precisión cualquier avería en los sistemas de propulsión, gestión de batería y electrónica de potencia.`,
      `Cada reparación de tu ${brandName} se realiza siguiendo los protocolos del fabricante, utilizando repuestos que mantienen la garantía original del vehículo. Registramos todas las intervenciones en el historial oficial, preservando el valor residual de tu vehículo eléctrico.`,
    ],
    diagnostico: [
      `El diagnóstico de vehículos eléctricos ${brandName} requiere equipamiento especializado que va más allá del OBD2 convencional. En nuestro centro de ${cityName} disponemos de los sistemas de diagnóstico más avanzados para leer, interpretar y actuar sobre los códigos específicos del sistema de alta tensión.`,
      `Realizamos análisis exhaustivos del estado de la batería de alto voltaje, incluyendo medición de capacidad célula a célula, resistencia interna y equilibrado del pack. Este diagnóstico permite anticipar posibles degradaciones y optimizar la autonomía real de tu ${brandName}.`,
    ],
    mantenimiento: [
      `El mantenimiento de un ${brandName} eléctrico es más sencillo y económico que el de un vehículo de combustión, pero requiere conocimientos especializados. En ${cityName} aplicamos el plan de mantenimiento oficial adaptado a las condiciones de conducción de la zona.`,
      `Nuestro servicio incluye la revisión completa del sistema de frenada regenerativa, circuito de refrigeración de la batería, sistema de climatización con bomba de calor, actualización de software y verificación de todos los sistemas de seguridad activa de tu ${brandName}.`,
    ],
    carga: [
      `Te ayudamos a instalar el punto de carga ideal para tu ${brandName} en ${cityName}. Desde el estudio de viabilidad eléctrica hasta la puesta en marcha del wallbox, gestionamos todo el proceso incluyendo las ayudas del Plan MOVES que pueden cubrir hasta el 80% del coste.`,
      `Seleccionamos el cargador más compatible con las especificaciones de carga de tu ${brandName}, ya sea monofásico de 7,4 kW para uso doméstico o trifásico de 11-22 kW para carga más rápida. Te asesoramos sobre programación de carga inteligente para maximizar el ahorro en tu factura eléctrica.`,
    ],
    garantia: [
      `En ${cityName} gestionamos la garantía oficial de tu ${brandName} eléctrico, incluyendo la cobertura de 8 años o 160.000 km de la batería de alto voltaje. Monitorizamos el estado de salud (SOH) de la batería en cada visita para detectar posibles degradaciones.`,
      `Además de la garantía de fábrica, ofrecemos programas de extensión de garantía que cubren los componentes específicos del tren motriz eléctrico: motor, inversor, cargador a bordo y electrónica de potencia. Una inversión inteligente para la tranquilidad total con tu ${brandName}.`,
    ],
  };

  const h = hash(`${serviceSlug}-${brandName}-${cityName}-heading`);
  const hArr = headings[serviceSlug] || [`${def.title} ${brandName} en ${cityName}`];

  return {
    heading: pick(hArr, h),
    paragraphs: paragraphs[serviceSlug] || [`${def.title} profesional para ${brandName} en ${cityName}.`],
  };
}

function brandSection(brandSlug: string, brandName: string, cityName: string, official: boolean): { heading: string; paragraphs: string[] } {
  const tt = official ? "Taller Oficial" : "Taller Especializado";
  return {
    heading: `${tt} ${brandName} en ${cityName}`,
    paragraphs: [
      official
        ? `Como concesionario oficial ${brandName} en ${cityName}, nuestros técnicos reciben formación continua directamente del fabricante. Disponemos de las herramientas de diagnóstico oficiales, acceso a la base de datos técnica del fabricante y repuestos originales con entrega prioritaria.`
        : `Como taller especializado en ${brandName} en ${cityName}, nuestro equipo cuenta con formación avanzada en los sistemas de alta tensión y propulsión eléctrica de esta marca. Utilizamos equipamiento de diagnóstico compatible con los protocolos oficiales y repuestos de primera calidad homologados.`,
      `Más de ${TRUST_METRICS.vehiclesServiced} vehículos electrificados han pasado por nuestras instalaciones en la zona de ${cityName}. Nuestra experiencia con los modelos ${brandName} eléctricos e híbridos nos permite ofrecer un servicio rápido, preciso y con garantía. Somos la referencia para los propietarios de ${brandName} en la región.`,
    ],
  };
}

const COMMON_EV_PROBLEMS: Record<string, BrandCommonProblem[]> = {
  reparacion: [
    { title: "Degradación acelerada de batería HV", description: "Pérdida de capacidad superior al 10% anual puede indicar problemas en el sistema de gestión térmica o celdas defectuosas que requieren diagnóstico especializado.", icon: "ri-battery-low-line", severity: "alta" },
    { title: "Fallo en el inversor de potencia", description: "Mensajes de error relacionados con el inversor pueden limitar la potencia del motor. Requiere diagnóstico con herramientas específicas del fabricante.", icon: "ri-flashlight-line", severity: "alta" },
    { title: "Ruido en el sistema de refrigeración", description: "La bomba del circuito de refrigeración de la batería puede generar ruidos anómalos indicando desgaste de rodamientos o cavitación.", icon: "ri-volume-up-line", severity: "media" },
  ],
  diagnostico: [
    { title: "Códigos de error del BMS", description: "El sistema de gestión de batería puede generar alertas por desequilibrio entre celdas, sensores de temperatura fuera de rango o comunicación CAN.", icon: "ri-error-warning-line", severity: "alta" },
    { title: "Calibración de sensores ADAS", description: "Los sistemas de asistencia a la conducción requieren recalibración tras sustitución de parabrisas, reparación de carrocería o impactos.", icon: "ri-camera-lens-line", severity: "media" },
    { title: "Verificación de aislamiento eléctrico", description: "El test de aislamiento del circuito de alta tensión es esencial para la seguridad. Valores anómalos pueden indicar daños en el cableado o conectores.", icon: "ri-shield-check-line", severity: "alta" },
  ],
  mantenimiento: [
    { title: "Sustitución de líquido refrigerante HV", description: "El circuito de refrigeración de la batería requiere cambio de líquido según las especificaciones del fabricante, generalmente cada 4-5 años.", icon: "ri-drop-line", severity: "media" },
    { title: "Cristalización de pastillas de freno", description: "El escaso uso de frenos mecánicos por la frenada regenerativa puede cristalizar el material de fricción, reduciendo la eficacia de frenado.", icon: "ri-brake-line", severity: "media" },
    { title: "Actualización de software del vehículo", description: "Las actualizaciones de firmware mejoran autonomía, rendimiento de carga y funciones. Algunas requieren instalación en taller autorizado.", icon: "ri-download-2-line", severity: "baja" },
  ],
  carga: [
    { title: "Error de comunicación con el cargador", description: "Problemas de handshake entre el vehículo y el cargador público pueden impedir la recarga. Puede requerir actualización del firmware de carga.", icon: "ri-plug-line", severity: "media" },
    { title: "Limitación de potencia por temperatura", description: "En clima extremo, el sistema puede reducir la potencia de carga para proteger la batería. El preacondicionamiento térmico mitiga este efecto.", icon: "ri-temp-cold-line", severity: "media" },
    { title: "Dimensionamiento incorrecto del wallbox", description: "Un wallbox subdimensionado para tu instalación eléctrica puede provocar disparos del diferencial o tiempos de carga excesivos.", icon: "ri-settings-3-line", severity: "baja" },
  ],
  garantia: [
    { title: "Monitorización del SOH de batería", description: "El estado de salud (SOH) de la batería debe mantenerse por encima del umbral de garantía (generalmente 70% en 8 años). Monitorizamos cada visita.", icon: "ri-shield-check-line", severity: "alta" },
    { title: "Cobertura de componentes eléctricos", description: "Motor eléctrico, inversor, cargador a bordo y unidad de distribución de potencia están cubiertos por la garantía del tren motriz eléctrico.", icon: "ri-cpu-line", severity: "media" },
    { title: "Gestión de recalls y campañas", description: "Verificamos si tu vehículo tiene campañas de servicio pendientes y las aplicamos sin coste, especialmente las relacionadas con software de batería.", icon: "ri-notification-line", severity: "baja" },
  ],
};

function generateProcessSteps(serviceSlug: string, brandName: string, cityName: string): { step: string; description: string }[] {
  const steps: Record<string, { step: string; description: string }[]> = {
    reparacion: [
      { step: "Recepción en taller", description: `Recibimos tu ${brandName} en nuestro centro de ${cityName} y realizamos una inspección visual inicial. Si necesitas movilidad, disponemos de vehículo de sustitución eléctrico.` },
      { step: "Diagnóstico de la avería", description: `Nuestros técnicos especializados en ${brandName} realizan un diagnóstico completo con equipamiento de última generación para identificar el origen exacto del problema.` },
      { step: "Presupuesto detallado", description: "Te enviamos un presupuesto transparente con el desglose de piezas, mano de obra y tiempo estimado. Sin sorpresas ni costes ocultos." },
      { step: "Reparación certificada", description: `Aplicamos la reparación siguiendo los protocolos específicos de ${brandName}, con repuestos que mantienen la garantía y el valor del vehículo.` },
      { step: "Control de calidad", description: "Cada reparación pasa un control de calidad que incluye prueba dinámica, verificación electrónica y comprobación de todos los sistemas de seguridad." },
      { step: "Entrega con garantía", description: `Entregamos tu ${brandName} reparado con garantía escrita sobre la intervención. Registramos todo en el historial oficial del vehículo.` },
    ],
    diagnostico: [
      { step: "Conexión al sistema", description: `Conectamos tu ${brandName} al equipo de diagnóstico oficial para acceder a todos los módulos electrónicos del vehículo, incluido el sistema de alta tensión.` },
      { step: "Lectura de códigos", description: "Realizamos una lectura exhaustiva de todos los códigos de error almacenados en las centralitas del vehículo, con especial atención al BMS y al inversor." },
      { step: "Análisis de batería", description: `Medimos la capacidad, resistencia interna y equilibrado de la batería de alto voltaje de tu ${brandName} para determinar su estado de salud real.` },
      { step: "Test de sistemas", description: "Verificamos el funcionamiento de todos los sistemas: frenada regenerativa, bomba de calor, cargador a bordo, sensores ADAS y conectividad." },
      { step: "Informe completo", description: `Te entregamos un informe detallado con el estado de cada sistema de tu ${brandName}, recomendaciones de mantenimiento y prioridades de actuación.` },
    ],
    mantenimiento: [
      { step: "Cita online 24/7", description: `Reserva tu cita de mantenimiento para tu ${brandName} en ${cityName} desde nuestra web o app en cualquier momento.` },
      { step: "Recepción del vehículo", description: `Recibimos tu ${brandName} y realizamos una inspección multipunto inicial. Si lo necesitas, disponemos de vehículo de cortesía eléctrico.` },
      { step: "Mantenimiento oficial", description: `Aplicamos el protocolo de mantenimiento correspondiente al kilometraje de tu ${brandName}, usando productos y fluidos homologados por el fabricante.` },
      { step: "Diagnóstico electrónico", description: "Realizamos un diagnóstico electrónico completo y aplicamos las actualizaciones de software disponibles para optimizar rendimiento y autonomía." },
      { step: "Entrega con informe", description: "Entregamos tu vehículo con un informe detallado de todo lo realizado, estado de desgaste de componentes y recomendaciones para la próxima revisión." },
    ],
    carga: [
      { step: "Consulta inicial", description: `Analizamos tus necesidades de carga según tu modelo ${brandName}, kilómetros diarios y tipo de instalación eléctrica de tu vivienda o empresa en ${cityName}.` },
      { step: "Estudio de viabilidad", description: `Visitamos tu ubicación en ${cityName} para evaluar la instalación eléctrica existente, potencia contratada y la mejor ubicación para el punto de carga.` },
      { step: "Presupuesto y ayudas", description: "Te presentamos un presupuesto detallado y gestionamos las ayudas del Plan MOVES para reducir significativamente el coste de la instalación." },
      { step: "Instalación certificada", description: `Nuestros instaladores certificados realizan la instalación del wallbox optimizado para tu ${brandName}, con boletín eléctrico oficial.` },
      { step: "Puesta en marcha", description: `Configuramos el wallbox, programamos la carga inteligente y verificamos la compatibilidad completa con tu ${brandName}. Te enseñamos a sacarle el máximo partido.` },
    ],
    garantia: [
      { step: "Verificación de cobertura", description: `Consultamos el historial de tu ${brandName} para verificar las coberturas de garantía vigentes y posibles extensiones disponibles.` },
      { step: "Inspección del vehículo", description: "Realizamos una inspección completa del vehículo para documentar su estado actual y verificar que se cumplen las condiciones de la garantía." },
      { step: "Propuesta de cobertura", description: `Te presentamos las opciones de extensión de garantía disponibles para tu ${brandName}, con cobertura específica para componentes eléctricos.` },
      { step: "Activación de garantía", description: "Gestionamos la activación de la garantía extendida y te proporcionamos toda la documentación necesaria para tu tranquilidad." },
      { step: "Seguimiento continuo", description: `Realizamos un seguimiento del estado de tu ${brandName} en cada visita, monitorizando especialmente la batería para anticipar cualquier reclamación de garantía.` },
    ],
  };

  return steps[serviceSlug] || [];
}

function generateFaqs(serviceSlug: string, brandName: string, cityName: string, seed: number): { question: string; answer: string }[] {
  const faqPools: Record<string, { question: string; answer: string }[]> = {
    reparacion: [
      { question: `¿Cuánto cuesta reparar un ${brandName} eléctrico en ${cityName}?`, answer: `El coste de reparación de un ${brandName} eléctrico varía según el tipo de avería. Las reparaciones de sistemas auxiliares (frenos, suspensión) oscilan entre 150€ y 800€. Las intervenciones en el sistema de alta tensión (batería, inversor, motor) pueden ir de 500€ a 3.000€. Te proporcionamos presupuesto detallado sin compromiso antes de cualquier intervención.` },
      { question: `¿Pierdo la garantía si reparo mi ${brandName} en vuestro taller de ${cityName}?`, answer: `No. Nuestras reparaciones se realizan con repuestos homologados y siguiendo los protocolos del fabricante, por lo que la garantía de tu ${brandName} se mantiene intacta. Además, registramos cada intervención en el historial oficial del vehículo.` },
      { question: `¿Ofrecéis vehículo de sustitución durante la reparación?`, answer: `Sí. Disponemos de vehículos eléctricos de cortesía para que puedas mantener tu movilidad mientras reparamos tu ${brandName} en nuestro taller de ${cityName}. Este servicio está disponible para reparaciones que superen las 4 horas.` },
      { question: `¿Cuánto tarda una reparación de ${brandName} eléctrico?`, answer: `El tiempo depende de la complejidad de la avería. Reparaciones menores se completan en el día. Intervenciones en el sistema de alta tensión pueden requerir 2-5 días laborables. Te informamos del plazo exacto en el presupuesto.` },
    ],
    diagnostico: [
      { question: `¿Qué incluye un diagnóstico completo de ${brandName} eléctrico en ${cityName}?`, answer: `Nuestro diagnóstico incluye: lectura de todos los códigos de error, análisis del estado de la batería de alto voltaje (capacidad, resistencia interna, equilibrado de celdas), verificación del sistema de frenada regenerativa, test del cargador a bordo, revisión de sistemas ADAS y un informe detallado con recomendaciones.` },
      { question: `¿Cuánto cuesta un diagnóstico de ${brandName} eléctrico?`, answer: `El diagnóstico básico con lectura de códigos tiene un coste de 49€-89€. El diagnóstico completo con análisis de batería de alto voltaje oscila entre 89€ y 149€. Si decides realizar la reparación en nuestro taller de ${cityName}, descontamos el coste del diagnóstico.` },
      { question: `¿Con qué frecuencia debo hacer un diagnóstico de mi ${brandName}?`, answer: `Recomendamos un diagnóstico completo al menos una vez al año o cada 20.000 km, lo que ocurra primero. Si notas cambios en la autonomía, rendimiento o aparecen avisos en el cuadro de instrumentos, no esperes: solicita diagnóstico inmediato.` },
      { question: `¿Podéis diagnosticar problemas de autonomía reducida?`, answer: `Sí. La pérdida de autonomía es una de las consultas más frecuentes. Nuestro diagnóstico identifica si la causa está en la degradación de la batería, un consumo anómalo de auxiliares, problemas de calibración del BMS o hábitos de carga inadecuados.` },
    ],
    mantenimiento: [
      { question: `¿Cuánto cuesta el mantenimiento anual de un ${brandName} eléctrico en ${cityName}?`, answer: `El mantenimiento anual de un ${brandName} eléctrico oscila entre 89€ y 289€ según el plan elegido. Es un 30-40% más económico que un vehículo de combustión equivalente al no requerir cambios de aceite, filtros de combustible ni bujías.` },
      { question: `¿Cada cuánto necesita mantenimiento mi ${brandName} eléctrico?`, answer: `Los ${brandName} eléctricos requieren mantenimiento cada 30.000 km o 2 años (lo que ocurra primero). Los híbridos enchufables cada 15.000 km o 1 año. Siempre consulta el plan de mantenimiento específico de tu modelo.` },
      { question: `¿Qué incluye la revisión de mi ${brandName} eléctrico?`, answer: `Incluye: diagnóstico electrónico completo, revisión del sistema de alta tensión, verificación de la batería HV, inspección de frenos y frenada regenerativa, revisión de neumáticos, climatización, actualización de software y test de seguridad multipunto.` },
      { question: `¿Necesita mi ${brandName} eléctrico cambio de aceite?`, answer: `No. Los vehículos 100% eléctricos no tienen motor de combustión, así que no necesitan cambio de aceite. Los híbridos enchufables sí mantienen un motor térmico que requiere cambios de aceite, aunque con intervalos más largos.` },
    ],
    carga: [
      { question: `¿Cuánto cuesta instalar un punto de carga para ${brandName} en ${cityName}?`, answer: `La instalación de un wallbox para tu ${brandName} en ${cityName} oscila entre 800€ y 2.500€ según la complejidad. Con las ayudas del Plan MOVES puedes cubrir hasta el 80% del coste, dejando la inversión desde 200€ en muchos casos.` },
      { question: `¿Qué wallbox es compatible con mi ${brandName}?`, answer: `Tu ${brandName} utiliza conector Tipo 2 (Mennekes) para carga en corriente alterna. Recomendamos wallbox de 7,4 kW (monofásico) o 11-22 kW (trifásico) según tu instalación eléctrica. Te asesoramos sobre la opción más eficiente para tu caso.` },
      { question: `¿Puedo instalar un cargador en un garaje comunitario en ${cityName}?`, answer: `Sí. La ley te permite instalar un punto de carga en tu plaza de garaje comunicándolo a la comunidad de propietarios, sin necesidad de aprobación de la junta. Te gestionamos todo el proceso: estudio, instalación y documentación.` },
      { question: `¿Cuánto tarda en cargar un ${brandName} con wallbox doméstico?`, answer: `Con un wallbox de 7,4 kW, una carga completa del 20% al 100% tarda entre 6 y 10 horas según el modelo. Con wallbox trifásico de 11 kW se reduce a 4-6 horas. Ideal para cargar durante la noche aprovechando tarifa valle.` },
    ],
    garantia: [
      { question: `¿Cuánto dura la garantía de la batería de mi ${brandName}?`, answer: `La batería de alto voltaje de tu ${brandName} está cubierta durante 8 años o 160.000 km (lo que ocurra primero), garantizando al menos el 70% de su capacidad original. Es una de las coberturas más amplias del mercado.` },
      { question: `¿Puedo ampliar la garantía de mi ${brandName} eléctrico en ${cityName}?`, answer: `Sí. Ofrecemos programas de extensión de garantía que cubren hasta 5 años adicionales los componentes del tren motriz eléctrico: motor, inversor, cargador a bordo y electrónica de potencia. Solicita información sin compromiso.` },
      { question: `¿Qué cubre exactamente la garantía del tren motriz eléctrico?`, answer: `La garantía cubre: batería de alto voltaje, motor(es) eléctrico(s), inversor de potencia, cargador a bordo (on-board charger), unidad de distribución de potencia y todo el cableado de alta tensión. No cubre desgaste normal de frenos y neumáticos.` },
      { question: `¿Cómo sé si mi ${brandName} tiene campañas de servicio pendientes?`, answer: `Te lo comprobamos gratuitamente en nuestro centro de ${cityName}. Introducimos el VIN de tu ${brandName} en el sistema del fabricante para verificar si hay campañas, recalls o actualizaciones pendientes. Las aplicamos sin coste.` },
    ],
  };

  const pool = faqPools[serviceSlug] || [];
  if (pool.length <= 4) return pool;

  const start = seed % pool.length;
  const selected: { question: string; answer: string }[] = [];
  for (let i = 0; i < 4 && i < pool.length; i++) {
    selected.push(pool[(start + i) % pool.length]);
  }
  return selected;
}

function ctaTemplates(serviceName: string, brandName: string, cityName: string): { heading: string; text: string }[] {
  return [
    { heading: `¿Necesitas ${serviceName.toLowerCase()} para tu ${brandName} en ${cityName}?`, text: "Contacta con nuestro equipo especializado. Presupuesto sin compromiso y cita inmediata." },
    { heading: `Tu ${brandName} merece el mejor servicio en ${cityName}`, text: `Solicita cita para ${serviceName.toLowerCase()} con técnicos certificados. Disponemos de vehículo de sustitución eléctrico.` },
    { heading: `Servicio de ${serviceName.toLowerCase()} ${brandName} en ${cityName}`, text: "Llámanos o pide cita online. Más de 15 años cuidando vehículos eléctricos en la región." },
  ];
}

export function generateProgrammaticPage(serviceSlug: string, brandSlug: string, citySlug: string): ProgrammaticPage | null {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  const brandName = BRAND_NAMES[brandSlug];
  const cityData = CITY_DATA.find(c => c.slug === citySlug);
  if (!serviceDef || !brandName || !cityData) return null;

  const slug = `${serviceSlug}-${brandSlug}-${citySlug}`;
  const seed = hash(slug);
  const official = OFFICIAL_BRANDS.includes(brandSlug);
  const tt = official ? "Taller Oficial" : "Taller Especializado";
  const serviceName = serviceDef.title;

  const h1 = pick(H1_TEMPLATES, seed)(serviceName, brandName, cityData.city);
  const titleTpl = pick(TITLE_TEMPLATES, seed + 1);
  let metaTitle = titleTpl(serviceName, brandName, cityData.city);
  if (metaTitle.length > 55) metaTitle = `${serviceName} ${brandName} ${cityData.city}`;

  const descTpl = pick(DESC_TEMPLATES, seed + 2);
  let metaDescription = descTpl(serviceName, brandName, cityData.city, tt);
  if (metaDescription.length > 155) metaDescription = metaDescription.slice(0, 152) + "...";

  const intros = introTemplates(serviceName, brandName, cityData.city, cityData.region, tt, official);
  const intro = pick(intros, seed + 3);

  const svc = serviceSection(serviceSlug, brandName, cityData.city);
  const brand = brandSection(brandSlug, brandName, cityData.city, official);
  const problems = COMMON_EV_PROBLEMS[serviceSlug] || [];
  const process = generateProcessSteps(serviceSlug, brandName, cityData.city);
  const faqs = generateFaqs(serviceSlug, brandName, cityData.city, seed);
  const cta = pick(ctaTemplates(serviceName, brandName, cityData.city), seed + 4);

  return {
    slug,
    serviceSlug,
    serviceName,
    brandSlug,
    brandName,
    citySlug,
    cityName: cityData.city,
    region: cityData.region,
    isOfficial: official,
    h1,
    intro,
    serviceSection: svc,
    brandSection: brand,
    commonProblems: problems,
    processSteps: process,
    faqs,
    ctaHeading: cta.heading,
    ctaText: cta.text,
    metaTitle,
    metaDescription,
    nearbyAreas: cityData.nearbyAreas,
  };
}

export function getAllProgrammaticSlugs(): string[] {
  const slugs: string[] = [];
  for (const service of SERVICE_SLUGS) {
    for (const brand of Object.keys(BRAND_NAMES)) {
      for (const city of CITY_DATA) {
        slugs.push(`${service}-${brand}-${city.slug}`);
      }
    }
  }
  return slugs;
}

export function parseProgrammaticSlug(slug: string): { serviceSlug: string; brandSlug: string; citySlug: string } | null {
  for (const service of SERVICE_SLUGS) {
    if (!slug.startsWith(service + "-")) continue;
    const rest = slug.slice(service.length + 1);
    for (const brand of Object.keys(BRAND_NAMES)) {
      if (!rest.startsWith(brand + "-")) continue;
      const citySlug = rest.slice(brand.length + 1);
      if (CITY_DATA.some(c => c.slug === citySlug)) {
        return { serviceSlug: service, brandSlug: brand, citySlug };
      }
    }
  }
  return null;
}

export function isProgrammaticSlug(slug: string): boolean {
  return parseProgrammaticSlug(slug) !== null;
}
