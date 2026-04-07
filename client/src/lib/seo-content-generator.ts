import { BRAND_NAMES, SERVICE_DEFINITIONS, SERVICE_SLUGS } from "./servicios-data";
import { OFFICIAL_BRANDS, TRUST_METRICS } from "./entity-data";
import { SERVICE_CITIES } from "./local-seo";
import { PROBLEM_TOPICS, SUB_SERVICE_SLUGS, VEHICLE_MODEL_FAMILIES } from "./seo-growth-engine";

export type ContentPageType =
  | "service-brand"
  | "service-brand-city"
  | "sub-service-brand"
  | "problem-brand"
  | "problem-brand-city"
  | "brand-pillar"
  | "service-pillar"
  | "blog-problem"
  | "blog-comparison";

export interface ContentSection {
  id: string;
  heading: string;
  icon: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ContentFAQ {
  question: string;
  answer: string;
}

export interface GeneratedContent {
  type: ContentPageType;
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introduction: ContentSection;
  specialization: ContentSection;
  commonProblems: ContentSection;
  process: ContentSection;
  benefits: ContentSection;
  faqs: ContentFAQ[];
  ctaHeading: string;
  ctaText: string;
  breadcrumbs: { label: string; href: string }[];
  relatedLinks: { label: string; href: string }[];
  jsonLdServiceType: string;
  contentHash: string;
}

export interface ContentStats {
  totalGeneratable: number;
  byType: Record<ContentPageType, number>;
  avgSections: number;
  avgFaqs: number;
  avgParagraphs: number;
  uniquenessScore: number;
}

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

function pickN<T>(arr: T[], seed: number, n: number): T[] {
  if (n >= arr.length) return [...arr];
  const result: T[] = [];
  const used = new Set<number>();
  let s = seed;
  while (result.length < n) {
    const idx = s % arr.length;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
    s = (s * 31 + 7) | 0;
    s = Math.abs(s);
  }
  return result;
}

function isOfficial(brandSlug: string): boolean {
  return OFFICIAL_BRANDS.includes(brandSlug);
}

function tallerType(brandSlug: string): string {
  return isOfficial(brandSlug) ? "Taller Oficial" : "Taller Especializado";
}

function brandModels(brandSlug: string): string[] {
  return VEHICLE_MODEL_FAMILIES[brandSlug] || [];
}

function modelListText(brandSlug: string, seed: number, max: number = 4): string {
  const models = brandModels(brandSlug);
  if (models.length === 0) return "";
  const selected = pickN(models, seed, Math.min(max, models.length));
  if (selected.length === 1) return selected[0];
  return selected.slice(0, -1).join(", ") + " y " + selected[selected.length - 1];
}

const SERVICE_NAMES: Record<string, string> = {};
for (const slug of SERVICE_SLUGS) {
  const def = SERVICE_DEFINITIONS[slug];
  if (def) SERVICE_NAMES[slug] = def.title;
}

const CITY_MAP = new Map(SERVICE_CITIES.map((c) => [c.slug, c]));

const INTRO_TEMPLATES = {
  "service-brand": [
    (s: string, b: string, t: string) => `El ${s.toLowerCase()} de tu ${b} eléctrico requiere técnicos con formación específica en movilidad eléctrica. En Grupo Avisa, ${t}, contamos con más de ${TRUST_METRICS.yearsExperience} años de experiencia trabajando con vehículos eléctricos e híbridos enchufables.`,
    (s: string, b: string, t: string) => `¿Tu ${b} eléctrico necesita ${s.toLowerCase()}? Como ${t} con ${TRUST_METRICS.certifiedTechnicians}+ técnicos certificados, garantizamos un servicio que respeta las especificaciones del fabricante y protege tu garantía.`,
    (s: string, b: string, t: string) => `Confía el ${s.toLowerCase()} de tu ${b} a profesionales. En Grupo Avisa, ${t}, trabajamos con equipamiento homologado y formación continua del fabricante para ofrecer el mejor servicio a tu vehículo eléctrico.`,
    (s: string, b: string, t: string) => `Nuestro servicio de ${s.toLowerCase()} para ${b} eléctrico combina la tecnología más avanzada con la experiencia de un equipo certificado. Como ${t}, empleamos diagnósticos de última generación en cada intervención.`,
    (s: string, b: string, t: string) => `La tecnología eléctrica de ${b} exige un nivel de especialización que solo un ${t} puede ofrecer. Nuestro equipo de ${TRUST_METRICS.certifiedTechnicians}+ técnicos está formado para abordar cualquier necesidad de ${s.toLowerCase()} con total garantía.`,
  ],
  "problem-brand": [
    (p: string, b: string, t: string) => `Si tu ${b} eléctrico presenta ${p.toLowerCase()}, es fundamental acudir a un ${t} que disponga del equipamiento específico para diagnosticar y resolver el problema con garantía.`,
    (p: string, b: string, t: string) => `El ${p.toLowerCase()} en un ${b} eléctrico puede deberse a múltiples causas. Nuestro equipo, como ${t}, cuenta con los sistemas de diagnóstico necesarios para identificar el origen exacto y aplicar la solución correcta.`,
    (p: string, b: string, t: string) => `¿Detectas ${p.toLowerCase()} en tu ${b}? No te preocupes. En Grupo Avisa, ${t}, hemos resuelto cientos de casos similares gracias a nuestro equipamiento homologado y ${TRUST_METRICS.yearsExperience} años de experiencia.`,
    (p: string, b: string, t: string) => `El ${p.toLowerCase()} es uno de los problemas más consultados por propietarios de ${b} eléctrico. Como ${t}, disponemos de protocolos específicos del fabricante para cada tipo de incidencia.`,
  ],
};

const SPECIALIZATION_TEMPLATES = [
  (b: string, t: string, models: string) => `Como ${t} ${b}, nuestro equipo recibe formación directa del fabricante y utiliza herramientas de diagnóstico oficiales. Esto nos permite trabajar con todos los modelos eléctricos de la gama, incluyendo ${models || "toda la gama eléctrica"}.`,
  (b: string, t: string, models: string) => `Grupo Avisa lleva más de ${TRUST_METRICS.yearsExperience} años como ${t} ${b}. Nuestros técnicos están certificados para intervenir en los sistemas de alto voltaje de modelos como ${models || "toda la gama"}, con acceso a actualizaciones de software y piezas originales.`,
  (b: string, t: string, models: string) => `Nuestra condición de ${t} ${b} garantiza el acceso a información técnica actualizada, recambios originales y software de diagnóstico del fabricante. Trabajamos a diario con modelos como ${models || "toda la gama eléctrica"}.`,
  (b: string, t: string, models: string) => `La especialización en ${b} nos diferencia: contamos con bancos de prueba para baterías HV, cargadores de taller y utillaje específico del fabricante. Nuestros ${TRUST_METRICS.certifiedTechnicians}+ técnicos trabajan regularmente con ${models || "toda la gama eléctrica"}.`,
  (b: string, t: string, models: string) => `Ser ${t} ${b} implica cumplir los estándares más exigentes del sector. En Grupo Avisa, cada técnico supera procesos de certificación anuales y trabaja con equipos calibrados para ${models || "toda la gama de vehículos eléctricos"}.`,
];

const SPECIALIZATION_BULLETS_SERVICE: Record<string, string[]> = {
  reparacion: [
    "Diagnóstico previo con equipo homologado del fabricante",
    "Reparación de sistemas de alto voltaje (400V/800V)",
    "Sustitución de celdas de batería con procedimiento certificado",
    "Control de calidad post-reparación con test de carga completo",
    "Protocolo de seguridad HV según normativa ECE R100",
  ],
  diagnostico: [
    "Lectura profunda de UCE con software oficial del fabricante",
    "Test de capacidad y degradación de batería HV",
    "Diagnóstico de sistemas ADAS y sensores de conducción",
    "Análisis de rendimiento del motor eléctrico y electrónica de potencia",
    "Verificación de aislamiento eléctrico con megóhmetro certificado",
  ],
  mantenimiento: [
    "Programa de mantenimiento adaptado a vehículos eléctricos",
    "Revisión de líquido refrigerante del sistema HV",
    "Inspección del cableado de alto voltaje y conectores",
    "Actualización de software y calibración de sistemas",
    "Revisión pre-ITV específica para vehículos eléctricos",
  ],
  carga: [
    "Instalación de wallbox con certificación del fabricante",
    "Configuración de perfiles de carga personalizados",
    "Diagnóstico del sistema de carga a bordo (OBC)",
    "Instalación de infraestructura de carga para empresas",
    "Asesoramiento en tarifas eléctricas y programación de carga",
  ],
  garantia: [
    "Gestión de garantía oficial directa con el fabricante",
    "Extensión de garantía de batería HV certificada",
    "Tramitación de campañas de servicio y recalls",
    "Inspección de garantía con registro digital completo",
    "Cobertura de garantía en toda la red de servicio",
  ],
};

const COMMON_EV_PROBLEMS: Record<string, { title: string; description: string }[]> = {
  reparacion: [
    { title: "Degradación acelerada de batería HV", description: "Pérdida de capacidad superior al 20% en los primeros 5 años de uso, generalmente asociada a cargas rápidas frecuentes o exposición a temperaturas extremas." },
    { title: "Fallo del inversor de potencia", description: "El inversor convierte la corriente continua de la batería en alterna para el motor. Un fallo puede causar pérdida de potencia o imposibilidad de arranque." },
    { title: "Problemas en el motor eléctrico", description: "Ruidos anómalos, vibraciones o pérdida de par. Generalmente causados por desgaste de rodamientos o problemas en el estátor/rótor." },
    { title: "Avería del cargador a bordo (OBC)", description: "Imposibilidad de cargar el vehículo en corriente alterna. El OBC es un componente que requiere diagnóstico especializado para su reparación." },
    { title: "Fallo en el sistema de frenado regenerativo", description: "Reducción de la capacidad de frenada regenerativa, lo que afecta a la autonomía y al desgaste de frenos convencionales." },
  ],
  diagnostico: [
    { title: "Errores intermitentes en la electrónica de potencia", description: "Códigos de error que aparecen y desaparecen, requiriendo sesiones prolongadas de diagnóstico con equipo del fabricante." },
    { title: "Desequilibrio entre celdas de batería", description: "Diferencias de voltaje entre módulos que reducen la autonomía y pueden activar avisos en el cuadro de mandos." },
    { title: "Fallos de comunicación CAN-Bus", description: "Errores de comunicación entre centralitas electrónicas que pueden afectar a múltiples sistemas del vehículo simultáneamente." },
    { title: "Descalibración de sensores ADAS", description: "Los sistemas de asistencia a la conducción requieren recalibración tras impactos, sustitución de luna o ajustes de suspensión." },
    { title: "Problemas de aislamiento eléctrico", description: "Pérdida de resistencia de aislamiento en el circuito de alto voltaje, potencialmente peligrosa y que requiere diagnóstico inmediato." },
  ],
  mantenimiento: [
    { title: "Desgaste del sistema de climatización EV", description: "La bomba de calor y el circuito de refrigeración del habitáculo tienen un impacto directo en la autonomía y requieren revisión periódica." },
    { title: "Deterioro del líquido refrigerante HV", description: "El líquido que refrigera la batería y la electrónica de potencia pierde propiedades con el tiempo y debe sustituirse según intervalos del fabricante." },
    { title: "Desgaste de neumáticos específicos EV", description: "Los vehículos eléctricos generan mayor par instantáneo, acelerando el desgaste de los neumáticos. Requieren modelos específicos de baja resistencia." },
    { title: "Frenos convencionales infrautilizados", description: "El frenado regenerativo reduce el uso de frenos mecánicos, pero la inactividad puede causar oxidación de discos y pastillas, requiriendo mantenimiento preventivo." },
    { title: "Software desactualizado", description: "Las actualizaciones OTA y en taller mejoran el rendimiento, la autonomía y la seguridad. Un vehículo desactualizado puede perder funcionalidades importantes." },
  ],
  carga: [
    { title: "Velocidad de carga inferior a la esperada", description: "Puede deberse a limitaciones de la instalación eléctrica, temperatura de la batería o configuración del cargador." },
    { title: "Interrupción frecuente de la carga", description: "Desconexiones durante el proceso de carga, generalmente causadas por problemas en el cable, el conector o la instalación eléctrica." },
    { title: "Error en la comunicación vehículo-cargador", description: "El protocolo de comunicación entre el cargador y el vehículo falla, impidiendo el inicio o la finalización correcta de la carga." },
    { title: "Caída del diferencial de la instalación", description: "La carga del vehículo provoca el salto del diferencial de la vivienda, indicando una instalación eléctrica insuficiente o mal dimensionada." },
    { title: "Desgaste del conector de carga", description: "El conector del vehículo o del cable de carga muestra desgaste que afecta a la conexión y puede provocar sobrecalentamiento." },
  ],
  garantia: [
    { title: "Capacidad de batería por debajo del umbral de garantía", description: "Si la batería retiene menos del 70% de su capacidad original dentro del período de garantía, puede ser reemplazada sin coste." },
    { title: "Fallo de componente cubierto por campaña de servicio", description: "Los fabricantes emiten campañas de servicio para corregir defectos conocidos. Estas reparaciones son gratuitas independientemente del estado de la garantía." },
    { title: "Reclamación de garantía tras reparación no autorizada", description: "Reparaciones realizadas en talleres no oficiales pueden invalidar la garantía. Es importante documentar todas las intervenciones." },
    { title: "Extensión de garantía de batería disponible", description: "Muchos fabricantes ofrecen programas de extensión de garantía de batería HV que pueden contratarse antes de la expiración de la garantía original." },
    { title: "Desgaste prematuro de componentes eléctricos", description: "Componentes como contactores, fusibles HV o relés de precarga pueden fallar prematuramente y estar cubiertos por la garantía del fabricante." },
  ],
};

const PROCESS_STEPS: Record<string, { step: string; detail: string }[]> = {
  reparacion: [
    { step: "Recepción y evaluación inicial", detail: "Registramos los síntomas reportados, realizamos una inspección visual completa y documentamos el estado general del vehículo antes de cualquier intervención." },
    { step: "Diagnóstico con equipo homologado", detail: "Conectamos el vehículo al sistema de diagnóstico del fabricante para obtener una lectura completa de todos los módulos electrónicos y códigos de avería." },
    { step: "Presupuesto detallado y transparente", detail: "Elaboramos un presupuesto desglosado con el coste de piezas, mano de obra y tiempos estimados. Sin sorpresas ni cargos ocultos." },
    { step: "Reparación con recambios homologados", detail: "Procedemos a la reparación utilizando piezas originales o equivalentes homologadas, siguiendo los procedimientos técnicos del fabricante." },
    { step: "Control de calidad y prueba de validación", detail: "Realizamos pruebas funcionales completas, borrado de códigos y verificación de que todos los sistemas operan dentro de los parámetros establecidos." },
    { step: "Entrega documentada", detail: "Entregamos el vehículo con un informe detallado de la intervención, registro digital en el historial del vehículo y recomendaciones de mantenimiento." },
  ],
  diagnostico: [
    { step: "Entrevista con el propietario", detail: "Recopilamos información detallada sobre los síntomas, cuándo aparecen, frecuencia y cualquier circunstancia relevante que facilite el diagnóstico." },
    { step: "Inspección visual del sistema HV", detail: "Revisamos el estado del cableado de alto voltaje, conectores, carcasas de batería y componentes visibles antes de conectar equipos de diagnóstico." },
    { step: "Lectura y análisis de códigos", detail: "Utilizamos el software oficial del fabricante para una lectura profunda de todas las centralitas electrónicas, incluyendo datos en tiempo real y datos congelados." },
    { step: "Pruebas funcionales específicas", detail: "Realizamos tests activos de componentes individuales: test de capacidad de batería, test de aislamiento, pruebas de actuadores y verificación de sensores." },
    { step: "Elaboración del informe diagnóstico", detail: "Documentamos los hallazgos con capturas del software, valores medidos, comparativa con valores de referencia y recomendaciones de actuación priorizadas." },
  ],
  mantenimiento: [
    { step: "Revisión del historial de mantenimiento", detail: "Consultamos el historial del vehículo para identificar las operaciones pendientes según el plan de mantenimiento del fabricante y el kilometraje actual." },
    { step: "Inspección multipunto del sistema eléctrico", detail: "Revisamos batería HV, sistema de refrigeración, cableado de alto voltaje, conexiones, motor eléctrico y electrónica de potencia." },
    { step: "Operaciones de mantenimiento programadas", detail: "Realizamos las sustituciones y ajustes indicados por el fabricante: filtros, líquidos, actualizaciones de software y calibraciones." },
    { step: "Test de capacidad de batería", detail: "Medimos la capacidad real de la batería HV y comparamos con los valores de referencia para evaluar su estado de salud (SoH)." },
    { step: "Informe de estado y próxima revisión", detail: "Entregamos un informe con el estado general del vehículo, las operaciones realizadas y la fecha/kilometraje recomendados para la próxima revisión." },
  ],
  carga: [
    { step: "Estudio de la instalación eléctrica", detail: "Evaluamos la capacidad de la acometida, cuadro eléctrico, protecciones y cableado existente para determinar la viabilidad de la instalación." },
    { step: "Selección del cargador adecuado", detail: "Recomendamos el wallbox o cargador más apropiado según el vehículo, potencia disponible, uso previsto y presupuesto del cliente." },
    { step: "Instalación por electricista certificado", detail: "Nuestros instaladores están certificados y siguen la normativa ITC-BT-52 para instalaciones de recarga de vehículos eléctricos." },
    { step: "Configuración y puesta en marcha", detail: "Programamos el cargador, configuramos perfiles de carga, conectividad WiFi y, si procede, gestión de energía fotovoltaica." },
    { step: "Verificación y documentación", detail: "Realizamos pruebas de carga completas, verificamos protecciones y entregamos la documentación necesaria para el registro de la instalación." },
  ],
  garantia: [
    { step: "Evaluación de cobertura", detail: "Verificamos el estado de la garantía del vehículo, componentes cubiertos, kilometraje y fecha de expiración para cada elemento." },
    { step: "Diagnóstico oficial para reclamación", detail: "Realizamos un diagnóstico con el equipo del fabricante para documentar la avería y su causa, requisito imprescindible para la gestión de garantía." },
    { step: "Gestión administrativa con el fabricante", detail: "Tramitamos la reclamación directamente con el fabricante, aportando la documentación técnica y las evidencias necesarias para la aprobación." },
    { step: "Reparación cubierta por garantía", detail: "Una vez aprobada, realizamos la reparación con piezas originales y procedimientos del fabricante, sin coste adicional para el cliente." },
    { step: "Registro y cierre de expediente", detail: "Documentamos la reparación en el historial digital del vehículo y entregamos al cliente toda la documentación de la intervención realizada bajo garantía." },
  ],
};

const BENEFIT_SETS = [
  [
    { title: "Equipo homologado del fabricante", text: "Utilizamos herramientas de diagnóstico y reparación oficiales, garantizando intervenciones que cumplen los estándares del fabricante." },
    { title: "Técnicos certificados HV", text: `Nuestro equipo de ${TRUST_METRICS.certifiedTechnicians}+ técnicos cuenta con certificación para trabajar en sistemas de alto voltaje según la normativa vigente.` },
    { title: "Garantía en cada intervención", text: "Todas nuestras reparaciones incluyen garantía por escrito. Trabajamos con piezas originales o equivalentes homologadas." },
    { title: "Transparencia total en el presupuesto", text: "Presupuesto detallado antes de cualquier intervención. Sin cargos ocultos ni sorpresas. Aprobación previa del cliente siempre." },
  ],
  [
    { title: "Más de 15 años de experiencia", text: `Con ${TRUST_METRICS.yearsExperience} años trabajando con vehículos eléctricos, hemos acumulado la experiencia necesaria para resolver cualquier incidencia con eficacia.` },
    { title: "Cobertura regional completa", text: `Presencia en ${TRUST_METRICS.cities} ciudades de Andalucía y Extremadura. Tu taller de confianza esté donde estés.` },
    { title: "Vehículo de sustitución disponible", text: "Para reparaciones que requieran más de un día, ofrecemos vehículo de sustitución para que no pierdas movilidad." },
    { title: "Recogida y entrega a domicilio", text: "Si no puedes desplazarte, recogemos tu vehículo y te lo devolvemos una vez reparado, sin coste adicional en tu localidad." },
  ],
  [
    { title: "Atención personalizada", text: "Cada vehículo tiene un técnico asignado que conoce su historial y puede resolver dudas en cualquier momento del proceso." },
    { title: "Tecnología de diagnóstico avanzada", text: "Disponemos de equipos de última generación para diagnóstico de baterías HV, motores eléctricos e inversores de potencia." },
    { title: "Compromiso medioambiental", text: "Gestión responsable de baterías y componentes HV al final de su vida útil, cumpliendo la normativa de residuos peligrosos." },
    { title: "Financiación flexible", text: "Ofrecemos opciones de financiación para reparaciones importantes, porque sabemos que mantener un vehículo eléctrico es una inversión a largo plazo." },
  ],
];

const FAQ_TEMPLATES_SERVICE: Record<string, (brand: string, service: string) => ContentFAQ[]> = {
  reparacion: (brand, service) => [
    { question: `¿Cuánto cuesta la reparación de un ${brand} eléctrico?`, answer: `El coste varía según el tipo de avería. Una reparación menor puede oscilar entre 150-500€, mientras que intervenciones en batería HV o motor eléctrico pueden superar los 2.000€. En Grupo Avisa proporcionamos presupuesto detallado sin compromiso antes de cualquier intervención.` },
    { question: `¿Cuánto tiempo tarda una reparación de ${brand} eléctrico?`, answer: `Depende de la complejidad. Reparaciones menores se resuelven en 1-2 días. Intervenciones en batería HV o motor eléctrico pueden requerir 3-7 días hábiles, incluyendo diagnóstico, pedido de piezas y pruebas de validación.` },
    { question: `¿La reparación anula la garantía de mi ${brand}?`, answer: `No, si se realiza en un taller autorizado como Grupo Avisa. Utilizamos piezas originales y seguimos los procedimientos del fabricante, lo que mantiene intacta la garantía de tu vehículo.` },
    { question: `¿Qué hago si mi ${brand} eléctrico se queda parado?`, answer: `Contacta con nosotros al +34 955 034 600. Ofrecemos servicio de asistencia y podemos gestionar la grúa si es necesario. Si el vehículo muestra avisos de alto voltaje, no intentes abrir el capó ni tocar el cableado naranja.` },
    { question: `¿Tienen piezas de repuesto para ${brand} eléctrico?`, answer: `Sí, mantenemos stock de las piezas más demandadas para ${brand} y tenemos acceso directo al catálogo del fabricante para cualquier componente. Los plazos de entrega de piezas especiales son generalmente de 2-5 días hábiles.` },
  ],
  diagnostico: (brand, service) => [
    { question: `¿Cuánto cuesta un diagnóstico de ${brand} eléctrico?`, answer: `El diagnóstico estándar tiene un coste de 80-150€, dependiendo de la complejidad. Incluye lectura de códigos, análisis de datos y un informe detallado con recomendaciones. Si se procede con la reparación, el coste del diagnóstico se descuenta del total.` },
    { question: `¿El diagnóstico incluye test de batería HV?`, answer: `Sí, nuestro diagnóstico completo de ${brand} incluye un test de capacidad de la batería de alto voltaje, que mide el estado de salud (SoH), la resistencia interna y el equilibrio entre módulos.` },
    { question: `¿Puedo obtener un informe del diagnóstico?`, answer: `Por supuesto. Entregamos un informe digital detallado con los resultados del diagnóstico, capturas del software del fabricante, valores medidos frente a valores de referencia y recomendaciones priorizadas.` },
    { question: `¿Cuánto tiempo lleva diagnosticar un ${brand} eléctrico?`, answer: `Un diagnóstico estándar se completa en 1-2 horas. Si se requieren pruebas adicionales (test de carga completa, pruebas de conducción), puede extenderse a medio día.` },
    { question: `¿Necesito cita previa para diagnosticar mi ${brand}?`, answer: `Recomendamos solicitar cita previa para garantizar disponibilidad del equipo de diagnóstico. Puedes pedir cita llamando al +34 955 034 600 o a través de nuestra web.` },
  ],
  mantenimiento: (brand, service) => [
    { question: `¿Cada cuánto necesita mantenimiento un ${brand} eléctrico?`, answer: `Los vehículos eléctricos ${brand} requieren una revisión cada 30.000 km o 2 años, lo que ocurra primero. El mantenimiento es menos frecuente y más económico que en un vehículo de combustión.` },
    { question: `¿Qué incluye el mantenimiento de un ${brand} eléctrico?`, answer: `Incluye revisión del sistema HV, test de batería, inspección de cableado, revisión de frenos, líquidos, filtros, neumáticos, actualización de software y test final de sistemas.` },
    { question: `¿Es más barato mantener un ${brand} eléctrico que uno de combustión?`, answer: `Sí, generalmente el coste de mantenimiento es un 30-50% inferior. No hay cambios de aceite, filtro de combustible, correa de distribución ni embrague. Los frenos duran más gracias al frenado regenerativo.` },
    { question: `¿Puedo pasar la ITV con ustedes?`, answer: `Realizamos la revisión pre-ITV para ${brand} eléctrico, asegurándonos de que todos los puntos de inspección están en orden antes de acudir a la ITV.` },
    { question: `¿Mi ${brand} eléctrico necesita cambio de aceite?`, answer: `No, los motores eléctricos no utilizan aceite motor. Sin embargo, sí requieren cambio periódico del líquido refrigerante del sistema de batería y revisión del líquido de frenos.` },
  ],
  carga: (brand, service) => [
    { question: `¿Qué wallbox necesita mi ${brand} eléctrico?`, answer: `Depende del cargador a bordo de tu modelo. Generalmente recomendamos un wallbox de 7,4 kW (monofásico) o 11 kW (trifásico). Te asesoramos sobre la mejor opción para tu modelo específico y tu instalación eléctrica.` },
    { question: `¿Cuánto cuesta instalar un wallbox para ${brand}?`, answer: `La instalación completa oscila entre 800-2.500€, dependiendo de la distancia al cuadro eléctrico, potencia necesaria y tipo de wallbox elegido. Incluye materiales, mano de obra y certificación.` },
    { question: `¿Puedo instalar un cargador en mi garaje comunitario?`, answer: `Sí, la ley permite la instalación individual con cargo al propietario. Gestionamos el proceso completo: comunicación a la comunidad, proyecto técnico, instalación y certificación según ITC-BT-52.` },
    { question: `¿Cuánto tarda en cargar un ${brand} con wallbox?`, answer: `Con un wallbox de 7,4 kW, una carga completa del 10% al 100% tarda aproximadamente 6-10 horas dependiendo del modelo. Lo habitual es cargar durante la noche aprovechando tarifas reducidas.` },
    { question: `¿Puedo cargar mi ${brand} con energía solar?`, answer: `Sí, podemos integrar el wallbox con tu instalación fotovoltaica para cargar con excedente solar. Instalamos sistemas con gestión inteligente de energía que maximizan el autoconsumo.` },
  ],
  garantia: (brand, service) => [
    { question: `¿Qué cubre la garantía de batería de ${brand}?`, answer: `La garantía de batería HV de ${brand} cubre defectos de fabricación y degradación por debajo del 70% de capacidad original. Generalmente es de 8 años o 160.000 km, lo que ocurra primero.` },
    { question: `¿Puedo ampliar la garantía de mi ${brand} eléctrico?`, answer: `Sí, ofrecemos programas de extensión de garantía que pueden cubrir batería HV, motor eléctrico, inversor y componentes electrónicos. Consulta las opciones disponibles para tu modelo.` },
    { question: `¿Una reparación fuera del taller oficial invalida la garantía?`, answer: `Según la normativa europea, cualquier taller que utilice piezas y procedimientos homologados puede realizar el mantenimiento sin afectar a la garantía. Como ${isOfficial(service) ? "Taller Oficial" : "Taller Especializado"}, cumplimos estos requisitos.` },
    { question: `¿Cómo sé si mi ${brand} tiene alguna campaña de servicio pendiente?`, answer: `Puedes consultarlo facilitándonos tu número de bastidor (VIN). Accedemos al sistema del fabricante para verificar campañas pendientes, que se realizan de forma gratuita.` },
    { question: `¿Qué debo hacer si mi ${brand} presenta un defecto cubierto por garantía?`, answer: `Contacta con nosotros directamente. Realizamos el diagnóstico, verificamos la cobertura y gestionamos la reclamación con el fabricante sin que tengas que hacer trámites adicionales.` },
  ],
};

function generateIntroduction(
  type: ContentPageType,
  serviceName: string,
  brandName: string,
  brandSlug: string,
  seed: number,
  cityName?: string
): ContentSection {
  const tt = tallerType(brandSlug);
  let templates: ((a: string, b: string, c: string) => string)[];

  if (type === "problem-brand" || type === "problem-brand-city") {
    templates = INTRO_TEMPLATES["problem-brand"];
  } else {
    templates = INTRO_TEMPLATES["service-brand"];
  }

  const mainParagraph = pick(templates, seed)(serviceName, brandName, tt);

  const secondaryParagraphs = [
    `En nuestras instalaciones de ${cityName || "Andalucía y Extremadura"}, contamos con zonas de trabajo específicas para vehículos de alto voltaje, con protocolos de seguridad certificados y equipamiento homologado.`,
    `Cada intervención se documenta digitalmente en el historial del vehículo, lo que aporta trazabilidad completa y protege el valor de reventa de tu ${brandName} eléctrico.`,
    `Trabajamos con modelos como ${modelListText(brandSlug, seed + 1) || `los principales modelos eléctricos de ${brandName}`}, aplicando los procedimientos específicos de cada plataforma.`,
    `Nuestro compromiso es ofrecer la misma calidad de servicio que un taller oficial, con la cercanía y la atención personalizada que nos caracterizan desde hace ${TRUST_METRICS.yearsExperience} años.`,
  ];

  return {
    id: "introduction",
    heading: cityName
      ? `${serviceName} ${brandName} en ${cityName}`
      : `${serviceName} para ${brandName} Eléctrico`,
    icon: "ri-information-line",
    paragraphs: [mainParagraph, pick(secondaryParagraphs, seed + 3)],
  };
}

function generateSpecialization(
  brandName: string,
  brandSlug: string,
  serviceSlug: string,
  seed: number
): ContentSection {
  const tt = tallerType(brandSlug);
  const models = modelListText(brandSlug, seed + 10);
  const mainParagraph = pick(SPECIALIZATION_TEMPLATES, seed + 2)(brandName, tt, models);

  const bullets = SPECIALIZATION_BULLETS_SERVICE[serviceSlug] || SPECIALIZATION_BULLETS_SERVICE["reparacion"];
  const selectedBullets = pickN(bullets, seed + 5, 4);

  return {
    id: "specialization",
    heading: `Especialistas en ${brandName} Eléctrico`,
    icon: "ri-award-line",
    paragraphs: [mainParagraph],
    bullets: selectedBullets,
  };
}

function generateCommonProblems(
  serviceName: string,
  brandName: string,
  brandSlug: string,
  serviceSlug: string,
  seed: number
): ContentSection {
  const problems = COMMON_EV_PROBLEMS[serviceSlug] || COMMON_EV_PROBLEMS["reparacion"];
  const selected = pickN(problems, seed + 7, 4);

  const intro = `Los vehículos eléctricos ${brandName} son fiables, pero como cualquier tecnología avanzada, pueden presentar incidencias que requieren atención profesional. Estos son los problemas más frecuentes que resolvemos en nuestro taller:`;

  const paragraphs = selected.map(
    (p) => `**${p.title}**: ${p.description}`
  );

  return {
    id: "common-problems",
    heading: `Problemas Frecuentes en ${brandName} Eléctrico`,
    icon: "ri-error-warning-line",
    paragraphs: [intro, ...paragraphs],
  };
}

function generateProcess(
  serviceName: string,
  brandName: string,
  serviceSlug: string,
  seed: number
): ContentSection {
  const steps = PROCESS_STEPS[serviceSlug] || PROCESS_STEPS["reparacion"];
  const selectedSteps = pickN(steps, seed + 11, Math.min(5, steps.length));

  const intro = `En Grupo Avisa seguimos un proceso estructurado para cada servicio de ${serviceName.toLowerCase()} de ${brandName} eléctrico, diseñado para maximizar la calidad y minimizar el tiempo de inmovilización del vehículo:`;

  const stepTexts = selectedSteps.map(
    (s, i) => `**${i + 1}. ${s.step}**: ${s.detail}`
  );

  return {
    id: "process",
    heading: `Nuestro Proceso de ${serviceName}`,
    icon: "ri-list-check-2",
    paragraphs: [intro, ...stepTexts],
  };
}

function generateBenefits(
  brandName: string,
  brandSlug: string,
  seed: number
): ContentSection {
  const selectedSet = pick(BENEFIT_SETS, seed + 13);

  const intro = `Elegir Grupo Avisa para el servicio de tu ${brandName} eléctrico te ofrece ventajas claras frente a alternativas no especializadas:`;

  const benefitTexts = selectedSet.map(
    (b) => `**${b.title}**: ${b.text}`
  );

  return {
    id: "benefits",
    heading: `¿Por Qué Elegir Grupo Avisa para tu ${brandName}?`,
    icon: "ri-shield-check-line",
    paragraphs: [intro, ...benefitTexts],
  };
}

function generateFAQs(
  brandName: string,
  brandSlug: string,
  serviceSlug: string,
  seed: number
): ContentFAQ[] {
  const templateFn = FAQ_TEMPLATES_SERVICE[serviceSlug] || FAQ_TEMPLATES_SERVICE["reparacion"];
  const all = templateFn(brandName, brandSlug);
  return pickN(all, seed + 15, 5);
}

function generateCTA(
  serviceName: string,
  brandName: string,
  cityName?: string,
  seed: number = 0
): { heading: string; text: string } {
  const ctaOptions = [
    {
      heading: `Solicita tu cita para ${serviceName} de ${brandName}`,
      text: `Contacta con nuestro equipo especializado${cityName ? ` en ${cityName}` : ""}. Presupuesto sin compromiso y disponibilidad inmediata.`,
    },
    {
      heading: `Tu ${brandName} eléctrico en las mejores manos`,
      text: `Llámanos al +34 955 034 600 o solicita tu cita online. ${TRUST_METRICS.certifiedTechnicians}+ técnicos certificados a tu servicio${cityName ? ` en ${cityName}` : ""}.`,
    },
    {
      heading: `¿Necesitas ${serviceName.toLowerCase()} para tu ${brandName}?`,
      text: `Agenda tu visita${cityName ? ` en nuestro taller de ${cityName}` : ""}. Diagnóstico inicial gratuito con reserva online.`,
    },
  ];
  return pick(ctaOptions, seed + 17);
}

function generateContentHash(content: GeneratedContent): string {
  const raw = content.introduction.paragraphs.join("") +
    content.specialization.paragraphs.join("") +
    content.commonProblems.paragraphs.join("") +
    content.process.paragraphs.join("") +
    content.benefits.paragraphs.join("") +
    content.faqs.map((f) => f.question + f.answer).join("");
  return hash(raw).toString(36);
}

export function generateServiceBrandContent(
  serviceSlug: string,
  brandSlug: string,
  citySlug?: string
): GeneratedContent | null {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  const brandName = BRAND_NAMES[brandSlug];
  if (!serviceDef || !brandName) return null;

  const serviceName = serviceDef.title;
  const city = citySlug ? CITY_MAP.get(citySlug) : null;
  const cityName = city?.city;
  const slug = citySlug ? `${serviceSlug}-${brandSlug}-${citySlug}` : `${serviceSlug}-${brandSlug}`;
  const type: ContentPageType = citySlug ? "service-brand-city" : "service-brand";
  const seed = hash(slug);

  const tt = tallerType(brandSlug);

  const h1Variants = [
    `${serviceName} ${brandName} Eléctrico${cityName ? ` en ${cityName}` : ""} — ${tt}`,
    `${serviceName} para ${brandName} Eléctrico${cityName ? ` · ${cityName}` : ""}`,
    `${tt} ${brandName}: ${serviceName}${cityName ? ` en ${cityName}` : ""}`,
  ];

  const titleVariants = [
    `${serviceName} ${brandName} Eléctrico${cityName ? ` ${cityName}` : ""}`,
    `${serviceName} ${brandName}${cityName ? ` en ${cityName}` : ""} — ${tt}`,
    `${brandName} Eléctrico: ${serviceName}${cityName ? ` ${cityName}` : ""}`,
  ];

  const metaDescVariants = [
    `${serviceName} para ${brandName} eléctrico${cityName ? ` en ${cityName}` : ""}. ${tt} con ${TRUST_METRICS.certifiedTechnicians}+ técnicos certificados y ${TRUST_METRICS.yearsExperience} años de experiencia. Presupuesto sin compromiso.`,
    `¿Necesitas ${serviceName.toLowerCase()} para tu ${brandName}${cityName ? ` en ${cityName}` : ""}? ${tt} con equipamiento homologado. Pide cita: +34 955 034 600.`,
    `${tt} para ${serviceName.toLowerCase()} de ${brandName} eléctrico${cityName ? ` en ${cityName}` : ""}. Diagnóstico con equipo oficial, piezas originales y garantía en cada intervención.`,
  ];

  const introduction = generateIntroduction(type, serviceName, brandName, brandSlug, seed, cityName);
  const specialization = generateSpecialization(brandName, brandSlug, serviceSlug, seed);
  const commonProblems = generateCommonProblems(serviceName, brandName, brandSlug, serviceSlug, seed);
  const process = generateProcess(serviceName, brandName, serviceSlug, seed);
  const benefits = generateBenefits(brandName, brandSlug, seed);
  const faqs = generateFAQs(brandName, brandSlug, serviceSlug, seed);
  const cta = generateCTA(serviceName, brandName, cityName, seed);

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: serviceName, href: `/servicios/${serviceSlug}` },
  ];
  if (cityName) {
    breadcrumbs.push({ label: `${serviceName} ${brandName}`, href: `/servicios/${serviceSlug}-${brandSlug}` });
    breadcrumbs.push({ label: cityName, href: `/servicios/${slug}` });
  } else {
    breadcrumbs.push({ label: `${serviceName} ${brandName}`, href: `/servicios/${slug}` });
  }

  const relatedLinks = generateRelatedLinks(serviceSlug, brandSlug, citySlug, seed);

  const content: GeneratedContent = {
    type,
    slug,
    h1: pick(h1Variants, seed),
    metaTitle: pick(titleVariants, seed + 1),
    metaDescription: pick(metaDescVariants, seed + 2),
    introduction,
    specialization,
    commonProblems,
    process,
    benefits,
    faqs,
    ctaHeading: cta.heading,
    ctaText: cta.text,
    breadcrumbs,
    relatedLinks,
    jsonLdServiceType: `AutoRepair:${serviceName}`,
    contentHash: "",
  };
  content.contentHash = generateContentHash(content);
  return content;
}

export function generateProblemBrandContent(
  problemSlug: string,
  brandSlug: string,
  citySlug?: string
): GeneratedContent | null {
  const problem = PROBLEM_TOPICS.find((p) => p.slug === problemSlug);
  const brandName = BRAND_NAMES[brandSlug];
  if (!problem || !brandName) return null;

  const city = citySlug ? CITY_MAP.get(citySlug) : null;
  const cityName = city?.city;
  const slug = citySlug ? `${problemSlug}-${brandSlug}-${citySlug}` : `${problemSlug}-${brandSlug}`;
  const type: ContentPageType = citySlug ? "problem-brand-city" : "problem-brand";
  const seed = hash(slug);
  const tt = tallerType(brandSlug);
  const models = modelListText(brandSlug, seed + 5);

  const h1Variants = [
    `${problem.name} en ${brandName} Eléctrico${cityName ? ` — ${cityName}` : ""}: Diagnóstico y Solución`,
    `Solucionar ${problem.name} ${brandName}${cityName ? ` · ${cityName}` : ""}`,
    `${problem.name} ${brandName}${cityName ? ` en ${cityName}` : ""} — ${tt}`,
  ];

  const introduction = generateIntroduction(type, problem.name, brandName, brandSlug, seed, cityName);

  const specialization: ContentSection = {
    id: "specialization",
    heading: `Especialistas en ${problem.name} de ${brandName}`,
    icon: "ri-award-line",
    paragraphs: [
      `Como ${tt} ${brandName}, hemos diagnosticado y resuelto cientos de casos de ${problem.name.toLowerCase()} en modelos como ${models || "toda la gama eléctrica"}. Cada plataforma tiene sus particularidades, y nuestro equipo las conoce en profundidad.`,
      `Disponemos de los equipos de diagnóstico específicos del fabricante que permiten identificar con precisión la causa raíz del ${problem.name.toLowerCase()}, evitando reparaciones innecesarias y reduciendo el tiempo de inmovilización.`,
    ],
    bullets: pickN([
      "Diagnóstico con software oficial del fabricante",
      "Acceso a boletines técnicos y TSB actualizados",
      "Historial de casos resueltos para tu modelo específico",
      "Comunicación directa con soporte técnico del fabricante",
      "Equipamiento de medición calibrado y certificado",
    ], seed + 3, 4),
  };

  const relatedServiceNames = problem.relatedServices
    .map((s) => SERVICE_NAMES[s])
    .filter(Boolean);

  const commonProblems: ContentSection = {
    id: "common-problems",
    heading: `Causas Habituales de ${problem.name} en ${brandName}`,
    icon: "ri-error-warning-line",
    paragraphs: [
      `El ${problem.name.toLowerCase()} en vehículos ${brandName} puede originarse por diversas causas. La identificación precisa del origen es fundamental para una reparación eficaz:`,
      ...pickN([
        `**Desgaste natural de componentes**: Los componentes electrónicos y eléctricos tienen una vida útil limitada. El uso continuado y las condiciones climáticas aceleran el desgaste.`,
        `**Software desactualizado**: Una versión antigua del firmware puede causar lecturas erróneas de sensores o gestión ineficiente de los sistemas afectados.`,
        `**Condiciones climáticas extremas**: Las temperaturas muy altas o muy bajas afectan al rendimiento de la batería y los sistemas electrónicos, pudiendo desencadenar el ${problem.name.toLowerCase()}.`,
        `**Hábitos de uso**: Cargas rápidas frecuentes, conducción agresiva o largos periodos de inactividad pueden contribuir a la aparición del problema.`,
        `**Defecto de fabricación**: En algunos casos, el problema está cubierto por una campaña de servicio del fabricante. Verificamos esta posibilidad en cada diagnóstico.`,
        `**Fallo de sensor o centralita**: Un sensor defectuoso puede reportar valores incorrectos, activando avisos que no corresponden con una avería real del sistema.`,
      ], seed + 8, 4),
    ],
  };

  const processSteps = [
    `**1. Recepción y documentación de síntomas**: Registramos detalladamente cuándo aparece el ${problem.name.toLowerCase()}, frecuencia, condiciones y cualquier patrón observado por el conductor.`,
    `**2. Diagnóstico electrónico profundo**: Conectamos al sistema del fabricante para leer códigos almacenados, datos congelados y valores en tiempo real de todos los módulos relacionados.`,
    `**3. Pruebas específicas de componentes**: Realizamos tests activos sobre los componentes sospechosos: mediciones de voltaje, resistencia, aislamiento, capacidad y comunicación.`,
    `**4. Identificación de causa raíz y presupuesto**: Con los resultados, determinamos la causa exacta y presentamos un presupuesto detallado con las opciones de reparación disponibles.`,
    `**5. Reparación y verificación**: Procedemos con la reparación aprobada, seguida de pruebas de validación completas para confirmar que el ${problem.name.toLowerCase()} queda resuelto.`,
  ];

  const process: ContentSection = {
    id: "process",
    heading: `Proceso de Diagnóstico y Solución`,
    icon: "ri-list-check-2",
    paragraphs: [
      `Nuestro proceso para resolver el ${problem.name.toLowerCase()} en ${brandName} está diseñado para ser eficiente, transparente y definitivo:`,
      ...pickN(processSteps, seed + 12, 4),
    ],
  };

  const benefits = generateBenefits(brandName, brandSlug, seed);

  const faqs: ContentFAQ[] = [
    { question: `¿Es grave el ${problem.name.toLowerCase()} en mi ${brandName}?`, answer: `Depende de la causa. En algunos casos es un problema de sensor o software que se resuelve rápidamente. En otros puede indicar un componente que necesita reparación. Lo importante es diagnosticarlo cuanto antes para evitar que se agrave.` },
    { question: `¿Cuánto cuesta reparar el ${problem.name.toLowerCase()} en ${brandName}?`, answer: `El coste varía según la causa raíz. Puede ir desde una actualización de software (100-200€) hasta la sustitución de un componente mayor. Siempre proporcionamos presupuesto detallado antes de proceder.` },
    { question: `¿Mi ${brandName} puede circular con ${problem.name.toLowerCase()}?`, answer: `Recomendamos acudir al taller lo antes posible. Dependiendo de la gravedad, el vehículo puede limitar su potencia o autonomía. Si aparecen avisos de alto voltaje en el cuadro, detén el vehículo y contacta con nosotros.` },
    { question: `¿Cuánto tiempo tarda la reparación del ${problem.name.toLowerCase()}?`, answer: `El diagnóstico suele completarse en 1-2 horas. La reparación posterior puede variar: desde el mismo día para problemas de software, hasta 3-7 días para sustitución de componentes que requieran pedido de piezas.` },
    { question: `¿Puede estar cubierto por la garantía?`, answer: `Es posible. Verificamos si existe alguna campaña de servicio del fabricante o si el componente afectado está dentro del período de garantía. En caso positivo, la reparación no tiene coste para el propietario.` },
  ];

  const cta = generateCTA(problem.name, brandName, cityName, seed);

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Problemas frecuentes", href: "/problemas" },
    { label: `${problem.name} ${brandName}`, href: `/problemas/${problemSlug}-${brandSlug}` },
  ];
  if (cityName) {
    breadcrumbs.push({ label: cityName, href: `/problemas/${slug}` });
  }

  const relatedLinks: { label: string; href: string }[] = [];
  for (const rs of problem.relatedServices.slice(0, 3)) {
    relatedLinks.push({
      label: `${SERVICE_NAMES[rs] || rs} ${brandName}`,
      href: `/servicios/${rs}-${brandSlug}`,
    });
  }
  const otherProblems = PROBLEM_TOPICS.filter((p) => p.slug !== problemSlug);
  for (const op of pickN(otherProblems, seed + 20, 3)) {
    relatedLinks.push({
      label: `${op.name} ${brandName}`,
      href: `/problemas/${op.slug}-${brandSlug}`,
    });
  }

  const content: GeneratedContent = {
    type,
    slug,
    h1: pick(h1Variants, seed),
    metaTitle: `${problem.name} ${brandName}${cityName ? ` ${cityName}` : ""} — Diagnóstico y Solución`,
    metaDescription: `¿${problem.name} en tu ${brandName} eléctrico${cityName ? ` en ${cityName}` : ""}? ${tt} con diagnóstico oficial. Resolvemos el problema con garantía. +34 955 034 600.`,
    introduction,
    specialization,
    commonProblems,
    process,
    benefits,
    faqs: pickN(faqs, seed + 18, 5),
    ctaHeading: cta.heading,
    ctaText: cta.text,
    breadcrumbs,
    relatedLinks,
    jsonLdServiceType: `AutoRepair:${problem.relatedServices[0] || "diagnostico"}`,
    contentHash: "",
  };
  content.contentHash = generateContentHash(content);
  return content;
}

function generateRelatedLinks(
  serviceSlug: string,
  brandSlug: string,
  citySlug: string | undefined,
  seed: number
): { label: string; href: string }[] {
  const brandName = BRAND_NAMES[brandSlug] || brandSlug;
  const links: { label: string; href: string }[] = [];

  const otherServices = SERVICE_SLUGS.filter((s) => s !== serviceSlug);
  for (const os of pickN(otherServices, seed + 20, 3)) {
    links.push({
      label: `${SERVICE_NAMES[os] || os} ${brandName}`,
      href: `/servicios/${os}-${brandSlug}`,
    });
  }

  const otherBrands = Object.keys(BRAND_NAMES).filter((b) => b !== brandSlug);
  for (const ob of pickN(otherBrands, seed + 22, 2)) {
    links.push({
      label: `${SERVICE_NAMES[serviceSlug] || serviceSlug} ${BRAND_NAMES[ob]}`,
      href: `/servicios/${serviceSlug}-${ob}`,
    });
  }

  if (!citySlug) {
    const cities = SERVICE_CITIES.slice(0, 3);
    for (const c of cities) {
      links.push({
        label: `${SERVICE_NAMES[serviceSlug] || serviceSlug} ${brandName} en ${c.city}`,
        href: `/servicios/${serviceSlug}-${brandSlug}-${c.slug}`,
      });
    }
  }

  return links;
}

export function generateSubServiceBrandContent(
  subServiceSlug: string,
  brandSlug: string
): GeneratedContent | null {
  let parentSlug = "";
  let subService: { slug: string; name: string; parent: string } | null = null;

  for (const [parent, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
    const found = subs.find((s) => s.slug === subServiceSlug);
    if (found) {
      subService = found;
      parentSlug = parent;
      break;
    }
  }

  if (!subService) return null;

  const brandName = BRAND_NAMES[brandSlug];
  if (!brandName) return null;

  const slug = `${subServiceSlug}-${brandSlug}`;
  const seed = hash(slug);
  const tt = tallerType(brandSlug);
  const models = modelListText(brandSlug, seed + 5);
  const parentServiceName = SERVICE_NAMES[parentSlug] || parentSlug;

  const introduction: ContentSection = {
    id: "introduction",
    heading: `${subService.name} para ${brandName} Eléctrico`,
    icon: "ri-information-line",
    paragraphs: [
      pick([
        `El servicio de ${subService.name.toLowerCase()} para ${brandName} eléctrico es una especialidad que requiere formación avanzada y equipamiento homologado. En Grupo Avisa, como ${tt} ${brandName}, contamos con la cualificación y las herramientas necesarias para este tipo de intervención.`,
        `¿Tu ${brandName} necesita ${subService.name.toLowerCase()}? Este servicio especializado exige un conocimiento profundo de los sistemas eléctricos de alto voltaje. Nuestro equipo de ${TRUST_METRICS.certifiedTechnicians}+ técnicos certificados está preparado para abordar esta intervención con total garantía.`,
        `La ${subService.name.toLowerCase()} en vehículos ${brandName} forma parte de nuestro catálogo de servicios especializados en movilidad eléctrica. Con ${TRUST_METRICS.yearsExperience} años de experiencia, ofrecemos un servicio que cumple los estándares del fabricante.`,
      ], seed),
      `Trabajamos con modelos como ${models || `toda la gama eléctrica de ${brandName}`}, aplicando los protocolos específicos de cada plataforma para garantizar una intervención precisa y segura.`,
    ],
  };

  const specialization: ContentSection = {
    id: "specialization",
    heading: `¿Por Qué Confiar en Grupo Avisa para ${subService.name}?`,
    icon: "ri-award-line",
    paragraphs: [
      `La ${subService.name.toLowerCase()} no es un servicio que cualquier taller pueda ofrecer. Requiere certificación específica para trabajar con sistemas de alto voltaje, equipamiento de diagnóstico del fabricante y un profundo conocimiento de la arquitectura eléctrica de ${brandName}.`,
      `Como ${tt} ${brandName}, nuestros técnicos superan programas de formación continua que les capacitan para intervenir en los componentes más críticos del vehículo eléctrico, incluyendo sistemas de 400V y 800V.`,
    ],
    bullets: pickN([
      `Certificación HV para ${subService.name.toLowerCase()}`,
      "Equipamiento de diagnóstico homologado por el fabricante",
      "Piezas originales con trazabilidad completa",
      "Protocolo de seguridad HV en cada intervención",
      `Experiencia documentada en ${subService.name.toLowerCase()} de ${brandName}`,
      "Garantía por escrito en cada trabajo realizado",
    ], seed + 3, 4),
  };

  const parentProblems = COMMON_EV_PROBLEMS[parentSlug] || COMMON_EV_PROBLEMS["reparacion"];
  const selectedProblems = pickN(parentProblems, seed + 7, 3);
  const commonProblems: ContentSection = {
    id: "common-problems",
    heading: `Síntomas que Requieren ${subService.name}`,
    icon: "ri-error-warning-line",
    paragraphs: [
      `Estos son los síntomas más frecuentes que indican la necesidad de ${subService.name.toLowerCase()} en tu ${brandName} eléctrico:`,
      ...selectedProblems.map((p) => `**${p.title}**: ${p.description}`),
      `Si detectas alguno de estos síntomas en tu ${brandName}, te recomendamos acudir al taller lo antes posible para evitar que el problema se agrave.`,
    ],
  };

  const process: ContentSection = {
    id: "process",
    heading: `Proceso de ${subService.name}`,
    icon: "ri-list-check-2",
    paragraphs: [
      `Nuestro proceso de ${subService.name.toLowerCase()} para ${brandName} sigue un protocolo riguroso diseñado para maximizar la eficacia y minimizar el tiempo de inmovilización:`,
      `**1. Diagnóstico previo**: Antes de proceder, realizamos un diagnóstico electrónico completo para confirmar la necesidad de la intervención y descartar otras causas.`,
      `**2. Planificación y piezas**: Verificamos la disponibilidad de piezas necesarias y planificamos la intervención para minimizar el tiempo en taller.`,
      `**3. Intervención especializada**: Nuestros técnicos certificados realizan el servicio de ${subService.name.toLowerCase()} siguiendo los procedimientos exactos del fabricante ${brandName}.`,
      `**4. Verificación y control de calidad**: Tras la intervención, realizamos pruebas funcionales completas y verificamos que todos los parámetros están dentro de especificación.`,
      `**5. Entrega con informe detallado**: Entregamos el vehículo con documentación completa de la intervención y recomendaciones de seguimiento.`,
    ],
  };

  const benefits = generateBenefits(brandName, brandSlug, seed + 50);

  const faqs: ContentFAQ[] = [
    { question: `¿Cuánto cuesta la ${subService.name.toLowerCase()} de ${brandName}?`, answer: `El coste depende del modelo específico y el alcance de la intervención. Proporcionamos presupuesto detallado sin compromiso tras el diagnóstico previo. Contacta con nosotros para más información.` },
    { question: `¿Cuánto tiempo lleva la ${subService.name.toLowerCase()}?`, answer: `Generalmente entre 1 y 3 días hábiles, dependiendo de la complejidad y la disponibilidad de piezas. Ofrecemos vehículo de sustitución cuando la intervención se prolonga.` },
    { question: `¿La ${subService.name.toLowerCase()} afecta a la garantía?`, answer: `No, si se realiza en un taller autorizado como Grupo Avisa. Utilizamos piezas y procedimientos homologados que mantienen la garantía del fabricante intacta.` },
    { question: `¿Es necesaria la ${subService.name.toLowerCase()} en mi ${brandName}?`, answer: `Si detectas los síntomas descritos o el vehículo muestra avisos relacionados, es importante verificarlo cuanto antes. Un diagnóstico a tiempo puede evitar reparaciones más costosas.` },
    { question: `¿Trabajan con todos los modelos de ${brandName} eléctrico?`, answer: `Sí, cubrimos toda la gama eléctrica de ${brandName}, incluyendo ${models || "todos los modelos disponibles en el mercado español"}.` },
  ];

  const cta = generateCTA(subService.name, brandName, undefined, seed);

  const breadcrumbs = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios" },
    { label: parentServiceName, href: `/servicios/${parentSlug}` },
    { label: `${subService.name} ${brandName}`, href: `/servicios/${slug}` },
  ];

  const relatedLinks: { label: string; href: string }[] = [
    { label: `${parentServiceName} ${brandName}`, href: `/servicios/${parentSlug}-${brandSlug}` },
  ];
  const otherSubs = (SUB_SERVICE_SLUGS[parentSlug] || []).filter((s) => s.slug !== subServiceSlug);
  for (const os of pickN(otherSubs, seed + 25, 2)) {
    relatedLinks.push({
      label: `${os.name} ${brandName}`,
      href: `/servicios/${os.slug}-${brandSlug}`,
    });
  }
  const otherBrands = Object.keys(BRAND_NAMES).filter((b) => b !== brandSlug);
  for (const ob of pickN(otherBrands, seed + 27, 3)) {
    relatedLinks.push({
      label: `${subService.name} ${BRAND_NAMES[ob]}`,
      href: `/servicios/${subServiceSlug}-${ob}`,
    });
  }

  const content: GeneratedContent = {
    type: "sub-service-brand",
    slug,
    h1: pick([
      `${subService.name} ${brandName} — ${tt}`,
      `${subService.name} para ${brandName} Eléctrico`,
      `${tt} ${brandName}: ${subService.name}`,
    ], seed),
    metaTitle: `${subService.name} ${brandName} Eléctrico`,
    metaDescription: `${subService.name} para ${brandName} eléctrico. ${tt} con técnicos certificados y equipamiento homologado. Presupuesto sin compromiso. +34 955 034 600.`,
    introduction,
    specialization,
    commonProblems,
    process,
    benefits,
    faqs,
    ctaHeading: cta.heading,
    ctaText: cta.text,
    breadcrumbs,
    relatedLinks,
    jsonLdServiceType: `AutoRepair:${subService.name}`,
    contentHash: "",
  };
  content.contentHash = generateContentHash(content);
  return content;
}

export function generateContent(slug: string): GeneratedContent | null {
  const brands = Object.keys(BRAND_NAMES);
  const cities = SERVICE_CITIES.map((c) => c.slug);

  for (const serviceSlug of SERVICE_SLUGS) {
    for (const brandSlug of brands) {
      for (const citySlug of cities) {
        if (slug === `${serviceSlug}-${brandSlug}-${citySlug}`) {
          return generateServiceBrandContent(serviceSlug, brandSlug, citySlug);
        }
      }
      if (slug === `${serviceSlug}-${brandSlug}`) {
        return generateServiceBrandContent(serviceSlug, brandSlug);
      }
    }
  }

  for (const problem of PROBLEM_TOPICS) {
    for (const brandSlug of brands) {
      for (const citySlug of cities) {
        if (slug === `${problem.slug}-${brandSlug}-${citySlug}`) {
          return generateProblemBrandContent(problem.slug, brandSlug, citySlug);
        }
      }
      if (slug === `${problem.slug}-${brandSlug}`) {
        return generateProblemBrandContent(problem.slug, brandSlug);
      }
    }
  }

  for (const [, subs] of Object.entries(SUB_SERVICE_SLUGS)) {
    for (const sub of subs) {
      for (const brandSlug of brands) {
        if (slug === `${sub.slug}-${brandSlug}`) {
          return generateSubServiceBrandContent(sub.slug, brandSlug);
        }
      }
    }
  }

  return null;
}

export function getContentStats(): ContentStats {
  const brands = Object.keys(BRAND_NAMES);
  const cities = SERVICE_CITIES.map((c) => c.slug);
  const byType: Record<ContentPageType, number> = {
    "service-brand": 0,
    "service-brand-city": 0,
    "sub-service-brand": 0,
    "problem-brand": 0,
    "problem-brand-city": 0,
    "brand-pillar": 0,
    "service-pillar": 0,
    "blog-problem": 0,
    "blog-comparison": 0,
  };

  byType["service-brand"] = SERVICE_SLUGS.length * brands.length;
  byType["service-brand-city"] = SERVICE_SLUGS.length * brands.length * cities.length;
  byType["problem-brand"] = PROBLEM_TOPICS.length * brands.length;
  byType["problem-brand-city"] = PROBLEM_TOPICS.length * brands.length * cities.length;
  byType["sub-service-brand"] = Object.values(SUB_SERVICE_SLUGS).flat().length * brands.length;

  const total = Object.values(byType).reduce((a, b) => a + b, 0);

  const sampleSlugs = ["reparacion-volkswagen", "diagnostico-tesla", "mantenimiento-bmw", "perdida-autonomia-audi", "error-carga-hyundai-sevilla"];
  let totalSections = 0;
  let totalFaqs = 0;
  let totalParagraphs = 0;
  let samplesGenerated = 0;

  for (const s of sampleSlugs) {
    const c = generateContent(s);
    if (c) {
      totalSections += 5;
      totalFaqs += c.faqs.length;
      totalParagraphs +=
        c.introduction.paragraphs.length +
        c.specialization.paragraphs.length +
        c.commonProblems.paragraphs.length +
        c.process.paragraphs.length +
        c.benefits.paragraphs.length;
      samplesGenerated++;
    }
  }

  const hashes = new Set<string>();
  const testSlugs = [
    "reparacion-volkswagen",
    "reparacion-audi",
    "diagnostico-volkswagen",
    "diagnostico-tesla",
    "mantenimiento-bmw",
    "carga-hyundai",
    "perdida-autonomia-volkswagen",
    "error-carga-tesla",
    "reparacion-volkswagen-sevilla",
    "diagnostico-audi-cordoba",
  ];

  for (const s of testSlugs) {
    const c = generateContent(s);
    if (c) hashes.add(c.contentHash);
  }

  return {
    totalGeneratable: total,
    byType,
    avgSections: samplesGenerated > 0 ? Math.round(totalSections / samplesGenerated) : 0,
    avgFaqs: samplesGenerated > 0 ? Math.round((totalFaqs / samplesGenerated) * 10) / 10 : 0,
    avgParagraphs: samplesGenerated > 0 ? Math.round((totalParagraphs / samplesGenerated) * 10) / 10 : 0,
    uniquenessScore: hashes.size === testSlugs.length ? 100 : Math.round((hashes.size / testSlugs.length) * 100),
  };
}
