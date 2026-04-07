"use client";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";

function ConductoresHero() {
  return (
    <div className="bg-gradient-to-br from-[#ad023b] to-[#8d0230] text-white py-20" data-testid="section-conductores-hero">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-conductores-title">
          Conductores y Adopción de Vehículos Eléctricos
        </h1>
        <p className="text-xl text-white/90 max-w-3xl" data-testid="text-conductores-subtitle">
          <AutoLinkedText text="Guía completa para gestionar con éxito la transición de tu equipo a la movilidad eléctrica, evitando resistencias y maximizando la adopción." excludeUrls={["/conductores-adopcion"]} linkClassName="text-white hover:text-white/90 underline decoration-white/40 hover:decoration-white transition-colors font-medium" maxLinks={2} />
        </p>
      </div>
    </div>
  );
}

function EvitarRechazo() {
  const causasRechazo = [
    {
      titulo: "Miedo a lo desconocido",
      descripcion: "Los conductores temen quedarse sin batería, no saber dónde cargar o no poder completar sus rutas habituales."
    },
    {
      titulo: "Pérdida de control",
      descripcion: "Sienten que pierden autonomía: deben planificar cargas, seguir nuevas normas y cambiar hábitos establecidos."
    },
    {
      titulo: "Falta de información",
      descripcion: "No conocen las ventajas reales: menor ruido, mejor aceleración, sin paradas en gasolineras, menor mantenimiento."
    },
    {
      titulo: "Experiencias negativas previas",
      descripcion: "Han oído historias de problemas con eléctricos (muchas veces desactualizadas o exageradas)."
    },
    {
      titulo: "Imposición sin participación",
      descripcion: "El cambio se comunica como decisión tomada, sin consultar ni involucrar a los afectados."
    }
  ];

  const fases = [
    {
      fase: "Fase 1: Comunicación Temprana (Mes -3)",
      items: [
        "Anuncia el proyecto de electrificación con antelación",
        "Explica el por qué: sostenibilidad, ahorro, imagen corporativa",
        "Enfatiza que es un proceso gradual, no un cambio abrupto",
        "Abre un canal de preguntas y sugerencias"
      ]
    },
    {
      fase: "Fase 2: Involucración (Mes -2)",
      items: [
        "Crea un comité de conductores que participe en decisiones",
        "Pide opinión sobre modelos, características necesarias y preocupaciones",
        "Organiza visitas a concesionarios o empresas que ya usan eléctricos",
        "Permite que prueben diferentes modelos antes de decidir"
      ]
    },
    {
      fase: "Fase 3: Pruebas Reales (Mes -1)",
      items: [
        "Organiza test drives con vehículos eléctricos durante 1-2 semanas",
        "Permite que los conductores los usen en sus rutas habituales",
        "Recoge feedback detallado: qué les gustó, qué les preocupa",
        "Ajusta el plan según sus comentarios"
      ]
    },
    {
      fase: "Fase 4: Embajadores Internos (Mes 0)",
      items: [
        "Identifica a los early adopters: conductores entusiastas del cambio",
        "Asígnales los primeros vehículos eléctricos",
        "Pídeles que compartan su experiencia con el resto del equipo",
        "Que actúen como mentores para los más escépticos"
      ]
    },
    {
      fase: "Fase 5: Formación Práctica (Mes 1)",
      items: [
        "Ofrece formación hands-on, no solo teórica",
        "Incluye simulaciones de situaciones reales: carga en ruta, planificación de viajes largos",
        "Proporciona guías rápidas y apps útiles",
        "Asegura soporte técnico 24/7 durante los primeros meses"
      ]
    },
    {
      fase: "Fase 6: Seguimiento y Ajustes (Meses 2-6)",
      items: [
        "Realiza encuestas mensuales de satisfacción",
        "Organiza reuniones de feedback cada 2 meses",
        "Ajusta rutas, horarios de carga o vehículos según necesidades reales",
        "Celebra hitos: primeros 10.000 km eléctricos, ahorro de CO2, etc."
      ]
    }
  ];

  return (
    <section className="mb-16" data-testid="section-evitar-rechazo">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center flex-wrap gap-1">
        <span className="w-10 h-10 flex items-center justify-center mr-3">
          <i className="ri-shield-check-line text-[#ad023b] w-6 h-6"></i>
        </span>
        Cómo Evitar el Rechazo al Vehículo Eléctrico
      </h2>

      <div className="bg-muted rounded-md p-6 mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Las 5 Causas Principales del Rechazo</h3>
        <div className="space-y-4">
          {causasRechazo.map((causa, index) => (
            <div key={index} className="flex items-start" data-testid={`text-causa-rechazo-${index}`}>
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-red-600 dark:text-red-400 font-bold">{index + 1}</span>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-foreground mb-1">{causa.titulo}</h4>
                <p className="text-muted-foreground">{causa.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Estrategia de Prevención en 6 Fases</h3>
      <div className="space-y-6 mb-8">
        {fases.map((fase, index) => (
          <div key={index} className="border-l-4 border-[#ad023b] pl-6" data-testid={`text-fase-${index}`}>
            <h4 className="text-xl font-bold text-foreground mb-2">{fase.fase}</h4>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {fase.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-[#ad023b]/10 rounded-md p-6">
        <h4 className="font-bold text-foreground mb-3 flex items-center flex-wrap gap-1">
          <span className="w-6 h-6 flex items-center justify-center mr-2">
            <i className="ri-lightbulb-line text-[#ad023b] w-5 h-5"></i>
          </span>
          Consejo Clave
        </h4>
        <p className="text-muted-foreground">
          <strong>El rechazo se evita con participación, no con imposición.</strong> Los conductores que sienten que su opinión importa y que el cambio se hace "con ellos" y no "a ellos" adoptan el eléctrico 3 veces más rápido.
        </p>
      </div>
    </section>
  );
}

function FormacionMinima() {
  const modulos = [
    {
      modulo: "Conducción Eficiente",
      duracion: "2 horas",
      formato: "Práctico en ruta",
      contenido: "Regeneración, modo ECO, anticipación, impacto de velocidad y clima"
    },
    {
      modulo: "Gestión de Carga",
      duracion: "1 hora",
      formato: "Teórico + demo",
      contenido: "Tipos de carga, apps, planificación de rutas, qué hacer si no hay cargador"
    },
    {
      modulo: "Mantenimiento Básico",
      duracion: "30 min",
      formato: "Teórico",
      contenido: "Revisiones necesarias, líquidos, neumáticos, frenos, qué NO tocar"
    },
    {
      modulo: "Apps y Herramientas",
      duracion: "30 min",
      formato: "Práctico",
      contenido: "App del vehículo, Electromaps, ABRP, tarjetas de carga, soporte técnico"
    }
  ];

  const modulosDetalle = [
    {
      titulo: "1. Conducción Eficiente (2 horas prácticas)",
      objetivo: "Maximizar autonomía y reducir ansiedad por batería.",
      contenido: [
        "Cómo funciona la regeneración de energía al frenar",
        "Uso de modos de conducción: ECO, Normal, Sport",
        "Impacto de la velocidad: 120 km/h vs 100 km/h = 30% menos autonomía",
        "Efecto del clima: calefacción/AC pueden reducir 20-30% la autonomía",
        "Técnicas de anticipación para maximizar regeneración",
        "Precalentamiento de batería en invierno"
      ],
      metodo: "Ruta real de 50 km con instructor, comparando estilos de conducción y viendo el impacto en tiempo real en el consumo."
    },
    {
      titulo: "2. Gestión de Carga y Autonomía (1 hora)",
      objetivo: "Eliminar el miedo a quedarse sin batería.",
      contenido: [
        "Tipos de carga: lenta (7-11 kW), rápida (50 kW), ultrarrápida (150+ kW)",
        "Cuándo usar cada tipo: carga nocturna vs carga en ruta",
        "Apps esenciales: Electromaps, ABRP (A Better Route Planner), app del fabricante",
        "Cómo planificar rutas largas con paradas de carga",
        "Qué hacer si un cargador está ocupado o no funciona",
        "Tarjetas y apps de pago: cuáles usar, cómo activarlas",
        "Niveles de carga recomendados: 20-80% para uso diario"
      ],
      metodo: "Demostración en vivo de carga en diferentes tipos de cargadores + simulación de planificación de ruta larga."
    },
    {
      titulo: "3. Mantenimiento Básico (30 minutos)",
      objetivo: "Entender qué necesita (y qué NO necesita) un eléctrico.",
      contenido: [
        "Lo que SÍ necesita: revisiones anuales, líquido de frenos cada 2 años, neumáticos, limpiaparabrisas",
        "Lo que NO necesita: cambios de aceite, filtros de aire/combustible, embrague, escape",
        "Frenos: duran 2-3 veces más por la regeneración",
        "Batería: garantía de 8 años/160.000 km, no requiere mantenimiento",
        "Qué NO tocar: sistema de alto voltaje (cables naranjas), batería",
        "Cuándo llamar al servicio técnico: luces de aviso, ruidos extraños, pérdida de potencia"
      ],
      metodo: "Presentación con fotos y vídeos + sesión de preguntas."
    },
    {
      titulo: "4. Apps y Herramientas Digitales (30 minutos)",
      objetivo: "Dominar las herramientas que facilitan el día a día.",
      contenido: [
        "App del fabricante: estado de carga, preclimatización, localización, estadísticas",
        "Electromaps: encontrar cargadores, ver disponibilidad en tiempo real, opiniones",
        "ABRP: planificar rutas largas con paradas de carga óptimas",
        "Apps de pago: Iberdrola, Endesa, Repsol, Wenea (según tarjetas de empresa)",
        "Cómo reportar incidencias: a quién llamar, qué información dar",
        "Soporte técnico 24/7: número de teléfono, chat, email"
      ],
      metodo: "Instalación y configuración en vivo de las apps en los móviles de los conductores."
    }
  ];

  return (
    <section className="mb-16" data-testid="section-formacion-minima">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center flex-wrap gap-1">
        <span className="w-10 h-10 flex items-center justify-center mr-3">
          <i className="ri-graduation-cap-line text-[#ad023b] w-6 h-6"></i>
        </span>
        Formación Mínima de Conductores
      </h2>

      <p className="text-lg text-muted-foreground mb-6">
        Una <strong>formación efectiva</strong> no necesita ser larga, pero sí debe ser práctica y cubrir los aspectos esenciales. Aquí está el programa mínimo recomendado:
      </p>

      <div className="bg-card border border-border rounded-md overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="table-modulos">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Módulo</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Duración</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Formato</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-foreground">Contenido Clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {modulos.map((mod, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-foreground font-medium">{mod.modulo}</td>
                  <td className="px-6 py-4 text-muted-foreground">{mod.duracion}</td>
                  <td className="px-6 py-4 text-muted-foreground">{mod.formato}</td>
                  <td className="px-6 py-4 text-muted-foreground">{mod.contenido}</td>
                </tr>
              ))}
              <tr className="bg-[#ad023b]/10">
                <td className="px-6 py-4 text-foreground font-bold">TOTAL</td>
                <td className="px-6 py-4 text-foreground font-bold">4 horas</td>
                <td className="px-6 py-4 text-muted-foreground" colSpan={2}>Formación inicial completa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Contenido Detallado por Módulo</h3>
      <div className="space-y-6 mb-8">
        {modulosDetalle.map((mod, index) => (
          <div key={index} className="bg-muted rounded-md p-6" data-testid={`text-modulo-detalle-${index}`}>
            <h4 className="text-xl font-bold text-foreground mb-3">{mod.titulo}</h4>
            <div className="space-y-3 text-muted-foreground">
              <p><strong>Objetivo:</strong> {mod.objetivo}</p>
              <p><strong>Contenido:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {mod.contenido.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="mt-3"><strong>Método:</strong> {mod.metodo}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Formación Continua</h3>
      <div className="bg-card border border-border rounded-md p-6 mb-8">
        <p className="text-muted-foreground mb-4">Además de la formación inicial, programa <strong>sesiones de refuerzo</strong>:</p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Mes 1:</strong> Sesión de dudas y problemas encontrados (1 hora)</li>
          <li><strong>Mes 3:</strong> Técnicas avanzadas de conducción eficiente (1 hora)</li>
          <li><strong>Mes 6:</strong> Evaluación de resultados y mejores prácticas (1 hora)</li>
          <li><strong>Anual:</strong> Actualización sobre nuevas funcionalidades y tecnologías</li>
        </ul>
      </div>

      <div className="bg-[#ad023b]/10 rounded-md p-6">
        <h4 className="font-bold text-foreground mb-3 flex items-center flex-wrap gap-1">
          <span className="w-6 h-6 flex items-center justify-center mr-2">
            <i className="ri-star-line text-[#ad023b] w-5 h-5"></i>
          </span>
          Mejores Prácticas
        </h4>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex items-start gap-2"><i className="ri-checkbox-circle-line w-4 h-4 text-[#ad023b] mt-1 flex-shrink-0"></i> Formación en <strong>grupos pequeños</strong> (máximo 6 conductores) para mayor interacción</li>
          <li className="flex items-start gap-2"><i className="ri-checkbox-circle-line w-4 h-4 text-[#ad023b] mt-1 flex-shrink-0"></i> Prioriza lo <strong>práctico sobre lo teórico</strong>: más test drives, menos PowerPoints</li>
          <li className="flex items-start gap-2"><i className="ri-checkbox-circle-line w-4 h-4 text-[#ad023b] mt-1 flex-shrink-0"></i> Graba vídeos cortos (2-3 min) con tips que puedan consultar después</li>
          <li className="flex items-start gap-2"><i className="ri-checkbox-circle-line w-4 h-4 text-[#ad023b] mt-1 flex-shrink-0"></i> Crea una <strong>guía rápida en PDF</strong> con lo esencial (1-2 páginas)</li>
          <li className="flex items-start gap-2"><i className="ri-checkbox-circle-line w-4 h-4 text-[#ad023b] mt-1 flex-shrink-0"></i> Establece un <strong>canal de Whatsapp</strong> para dudas rápidas entre conductores</li>
        </ul>
      </div>
    </section>
  );
}

function NormasUso() {
  const normas = [
    {
      titulo: "1. Nivel Mínimo de Carga al Finalizar el Turno",
      norma: "El vehículo debe tener al menos 30% de batería al finalizar la jornada (o el nivel que permita al siguiente conductor completar su ruta).",
      porque: "Garantiza que el siguiente conductor pueda trabajar sin problemas. Es la norma más importante."
    },
    {
      titulo: "2. Uso de Cargadores de la Empresa",
      norma: "Priorizar carga en instalaciones de la empresa. Si se carga en ruta, usar solo cargadores de las redes autorizadas (con tarjeta de empresa).",
      porque: "Control de costes y acceso a tarifas corporativas."
    },
    {
      titulo: "3. Reporte de Incidencias",
      norma: "Cualquier problema técnico, aviso en el cuadro o incidencia de carga debe reportarse el mismo día (por app, email o Whatsapp).",
      porque: "Permite resolver problemas antes de que se agraven y afecten a otros conductores."
    },
    {
      titulo: "4. Carga Nocturna (si aplica)",
      norma: "Los vehículos que pernoctan en la empresa deben conectarse a los cargadores al finalizar la jornada.",
      porque: "Aprovecha tarifas eléctricas nocturnas más baratas y garantiza vehículos listos por la mañana."
    },
    {
      titulo: "5. Límite de Carga Rápida",
      norma: "Usar carga rápida solo cuando sea necesario (rutas largas, urgencias). Para uso diario, priorizar carga lenta.",
      porque: "La carga rápida frecuente puede acelerar la degradación de la batería a largo plazo."
    },
    {
      titulo: "6. Uso Personal del Vehículo",
      norma: "Definir claramente si se permite uso personal (fines de semana, desplazamientos casa-trabajo) y en qué condiciones.",
      porque: "Evita malentendidos y posibles conflictos. Si se permite, especificar responsabilidades sobre carga y limpieza."
    },
    {
      titulo: "7. Limpieza y Mantenimiento Básico",
      norma: "Mantener el vehículo limpio (interior) y reportar necesidades de mantenimiento (neumáticos, limpiaparabrisas, etc.).",
      porque: "Respeto por el siguiente usuario y detección temprana de problemas."
    }
  ];

  const comunicarNormas = [
    {
      titulo: "Co-diseña con los conductores",
      descripcion: "Presenta un borrador y pide feedback. Ajusta según sus comentarios. Las normas co-creadas se cumplen mejor."
    },
    {
      titulo: "Explica el \"por qué\"",
      descripcion: "No impongas reglas sin justificación. Cuando entienden la razón, las aceptan mejor."
    },
    {
      titulo: "Formato simple y visual",
      descripcion: "Crea un documento de 1-2 páginas con iconos y lenguaje claro. Evita textos legales densos."
    },
    {
      titulo: "Periodo de prueba",
      descripcion: "Establece las normas como \"versión 1.0\" y revísalas a los 3 meses según la experiencia real."
    },
    {
      titulo: "Consecuencias claras pero justas",
      descripcion: "Define qué pasa si no se cumplen, pero con enfoque educativo, no punitivo (primera vez: recordatorio, reincidencia: conversación, persistencia: medidas)."
    }
  ];

  const noIncluir = [
    "Microgestión de la carga: \"Debes cargar entre 20% y 80%\" - Deja que gestionen según necesidad",
    "Restricciones de velocidad arbitrarias: \"No superar 110 km/h\" - Confía en su criterio profesional",
    "Obligación de usar modo ECO: Puede ser incómodo en ciertas situaciones",
    "Reportes diarios de consumo: Genera carga administrativa innecesaria",
    "Prohibiciones absolutas sin excepciones: Siempre deja margen para situaciones especiales"
  ];

  return (
    <section className="mb-16" data-testid="section-normas-uso">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center flex-wrap gap-1">
        <span className="w-10 h-10 flex items-center justify-center mr-3">
          <i className="ri-file-text-line text-[#ad023b] w-6 h-6"></i>
        </span>
        Normas de Uso Sin Fricción
      </h2>

      <p className="text-lg text-muted-foreground mb-6">
        Las <strong>normas claras</strong> son necesarias, pero demasiadas reglas generan rechazo. La clave es establecer lo esencial y dar autonomía en el resto.
      </p>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-md">
        <h4 className="font-bold text-foreground mb-2 flex items-center flex-wrap gap-1">
          <span className="w-6 h-6 flex items-center justify-center mr-2">
            <i className="ri-error-warning-line text-yellow-600 dark:text-yellow-400 w-5 h-5"></i>
          </span>
          Principio Fundamental
        </h4>
        <p className="text-muted-foreground">
          <strong>Menos es más.</strong> Establece solo las normas imprescindibles para el funcionamiento operativo. Todo lo demás debe ser recomendación, no obligación.
        </p>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Las 7 Normas Esenciales</h3>
      <div className="space-y-4 mb-8">
        {normas.map((norma, index) => (
          <div key={index} className="bg-card border-l-4 border-[#ad023b] p-6 rounded-r-md" data-testid={`text-norma-${index}`}>
            <h4 className="text-lg font-bold text-foreground mb-2">{norma.titulo}</h4>
            <p className="text-muted-foreground mb-2"><strong>Norma:</strong> {norma.norma}</p>
            <p className="text-muted-foreground text-sm"><strong>Por qué:</strong> {norma.porque}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Cómo Comunicar las Normas</h3>
      <div className="bg-muted rounded-md p-6 mb-8">
        <div className="space-y-4">
          {comunicarNormas.map((item, index) => (
            <div key={index} className="flex items-start" data-testid={`text-comunicar-norma-${index}`}>
              <div className="w-10 h-10 bg-[#ad023b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <i className="ri-checkbox-circle-line text-white w-5 h-5"></i>
              </div>
              <div className="ml-4">
                <h4 className="font-bold text-foreground mb-1">{item.titulo}</h4>
                <p className="text-muted-foreground">{item.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Qué NO Incluir en las Normas</h3>
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-6">
        <p className="text-muted-foreground mb-3">Evita normas que generen fricción innecesaria:</p>
        <ul className="space-y-2 text-muted-foreground">
          {noIncluir.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <i className="ri-close-circle-line text-red-500 w-5 h-5 mt-0.5 flex-shrink-0"></i>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function GestionQuejas() {
  const pasos = [
    {
      numero: 1,
      titulo: "Escucha Activa (Sin Interrumpir)",
      descripcion: "Deja que el conductor explique completamente su problema sin interrumpir. Toma notas. Haz preguntas aclaratorias solo cuando termine.",
      frases: [
        "\"Cuéntame exactamente qué pasó\"",
        "\"¿Cuándo empezaste a notar este problema?\"",
        "\"¿Cómo te está afectando en tu trabajo diario?\""
      ]
    },
    {
      numero: 2,
      titulo: "Valida su Experiencia (Aunque No Estés de Acuerdo)",
      descripcion: "Reconoce que su experiencia es real para él, incluso si crees que el problema es menor o está mal interpretado.",
      frases: [
        "\"Entiendo que esto te está generando frustración\"",
        "\"Tiene sentido que te preocupe esto\"",
        "\"Gracias por compartirlo, es importante que lo sepamos\""
      ],
      evitar: "\"No es para tanto\", \"Otros no se quejan\", \"Es normal al principio\""
    },
    {
      numero: 3,
      titulo: "Diagnostica: ¿Técnico o de Adaptación?",
      descripcion: "Identifica si es un problema real del vehículo o una dificultad de adaptación al cambio.",
      tecnico: ["Pérdida anormal de autonomía", "Cargador que no funciona", "Ruidos extraños", "Avisos en el cuadro", "Problemas de conectividad"],
      adaptacion: ["\"No me acostumbro\"", "\"Es incómodo planificar cargas\"", "\"Prefiero el diésel\"", "\"Me da ansiedad la batería\"", "\"Es diferente a lo que conocía\""]
    },
    {
      numero: 4,
      titulo: "Ofrece Soluciones Específicas",
      descripcion: "No te quedes en \"lo miramos\". Propón acciones concretas con plazos."
    },
    {
      numero: 5,
      titulo: "Seguimiento y Cierre",
      descripcion: "No dejes la queja en el aire. Haz seguimiento para verificar que se resolvió.",
      seguimiento: [
        "A las 48 horas: \"¿Cómo va? ¿Se solucionó el problema?\"",
        "A la semana: \"¿Notas mejora con [solución aplicada]?\"",
        "Al mes: \"¿Cómo te sientes ahora con el vehículo?\""
      ]
    }
  ];

  const quejasComunes = [
    {
      queja: "\"La autonomía no es suficiente para mis rutas\"",
      diagnostico: ["¿Es real o percepción? Revisa datos de consumo", "¿Está conduciendo de forma eficiente?", "¿Las rutas son realmente más largas de lo previsto?"],
      soluciones: ["Formación en conducción eficiente", "Ajuste de rutas o inclusión de paradas de carga", "Si es real: cambio a modelo con más autonomía"]
    },
    {
      queja: "\"Pierdo mucho tiempo cargando\"",
      diagnostico: ["¿Está usando carga rápida cuando debería?", "¿Hay suficientes cargadores en la empresa?", "¿Está planificando bien las cargas?"],
      soluciones: ["Optimizar horarios de carga (nocturna, durante pausas)", "Instalar más cargadores o de mayor potencia", "Reorganizar turnos para aprovechar tiempos muertos"]
    },
    {
      queja: "\"El vehículo no responde como esperaba\"",
      diagnostico: ["¿Problema técnico real o expectativas incorrectas?", "¿Está usando el modo de conducción adecuado?", "¿Hay avisos o códigos de error?"],
      soluciones: ["Revisión técnica completa", "Explicar diferencias con vehículos de combustión", "Test drive con técnico para identificar el problema"]
    },
    {
      queja: "\"Simplemente no me gusta, prefiero el diésel\"",
      diagnostico: ["Resistencia al cambio pura", "¿Hay razones específicas o es rechazo general?", "¿Ha dado tiempo suficiente para adaptarse?"],
      soluciones: ["Conversación profunda: ¿qué específicamente no le gusta?", "Periodo de prueba extendido con apoyo intensivo", "Emparejamiento con conductor entusiasta", "Si persiste tras 3-6 meses: evaluar si es viable mantenerlo en diésel"]
    }
  ];

  return (
    <section className="mb-16" data-testid="section-gestion-quejas">
      <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center flex-wrap gap-1">
        <span className="w-10 h-10 flex items-center justify-center mr-3">
          <i className="ri-headphone-line text-[#ad023b] w-6 h-6"></i>
        </span>
        Qué Hacer Cuando el Conductor se Queja
      </h2>

      <p className="text-lg text-muted-foreground mb-6">
        Las quejas son <strong>oportunidades de mejora</strong>, no problemas. Un conductor que se queja está dando feedback valioso. La clave es gestionarlo de forma constructiva.
      </p>

      <h3 className="text-2xl font-bold text-foreground mb-4">Protocolo de Gestión de Quejas en 5 Pasos</h3>
      <div className="space-y-6 mb-8">
        {pasos.map((paso, index) => (
          <div key={index} className="bg-card border border-border rounded-md p-6" data-testid={`text-paso-quejas-${index}`}>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-[#ad023b]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-[#ad023b] font-bold text-xl">{paso.numero}</span>
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-xl font-bold text-foreground mb-2">{paso.titulo}</h4>
                <p className="text-muted-foreground mb-3">{paso.descripcion}</p>

                {paso.frases && (
                  <div className="bg-muted rounded-md p-4">
                    <p className="text-sm text-muted-foreground mb-2"><strong>Frases útiles:</strong></p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {paso.frases.map((frase, idx) => (
                        <li key={idx}>&#8226; {frase}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {paso.evitar && (
                  <div className="mt-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-3 rounded-r-md">
                    <p className="text-sm text-red-700 dark:text-red-400"><strong>Evita:</strong> {paso.evitar}</p>
                  </div>
                )}

                {paso.tecnico && paso.adaptacion && (
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-4">
                      <p className="font-bold text-blue-900 dark:text-blue-300 mb-2">Problema Técnico</p>
                      <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                        {paso.tecnico.map((item, idx) => (
                          <li key={idx}>&#8226; {item}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-blue-700 dark:text-blue-400 mt-2"><strong>Acción:</strong> Revisión técnica inmediata</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-4">
                      <p className="font-bold text-green-900 dark:text-green-300 mb-2">Problema de Adaptación</p>
                      <ul className="text-sm text-green-800 dark:text-green-300 space-y-1">
                        {paso.adaptacion.map((item, idx) => (
                          <li key={idx}>&#8226; {item}</li>
                        ))}
                      </ul>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-2"><strong>Acción:</strong> Formación adicional y acompañamiento</p>
                    </div>
                  </div>
                )}

                {paso.seguimiento && (
                  <div className="bg-muted rounded-md p-4">
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {paso.seguimiento.map((item, idx) => (
                        <li key={idx}><strong>{item.split(':')[0]}:</strong>{item.split(':').slice(1).join(':')}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-foreground mb-4">Tipos de Quejas Comunes y Cómo Responder</h3>
      <div className="space-y-4 mb-8">
        {quejasComunes.map((queja, index) => (
          <div key={index} className="bg-card border border-border rounded-md overflow-hidden" data-testid={`text-queja-comun-${index}`}>
            <div className="bg-muted px-6 py-3 border-b border-border">
              <h4 className="font-bold text-foreground">{queja.queja}</h4>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-3"><strong>Diagnóstico:</strong></p>
              <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1">
                {queja.diagnostico.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-muted-foreground mb-2"><strong>Soluciones:</strong></p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                {queja.soluciones.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#ad023b]/10 rounded-md p-6">
        <h4 className="font-bold text-foreground mb-3 flex items-center flex-wrap gap-1">
          <span className="w-6 h-6 flex items-center justify-center mr-2">
            <i className="ri-lightbulb-line text-[#ad023b] w-5 h-5"></i>
          </span>
          Principio Clave
        </h4>
        <p className="text-muted-foreground">
          <strong>Trata cada queja como una oportunidad de mejora del sistema, no como un problema del conductor.</strong> Si un conductor se queja, probablemente otros tienen la misma dificultad pero no lo expresan. Resuelve la raíz del problema para mejorar la experiencia de todos.
        </p>
      </div>
    </section>
  );
}

function ConductoresCTA() {
  const preguntasRelacionadas = [
    {
      icono: "ri-user-settings-line",
      titulo: "¿Cómo gestionar la resistencia al cambio?",
      descripcion: "Estrategias para manejar la transición a vehículos eléctricos.",
      href: "/preguntas"
    },
    {
      icono: "ri-graduation-cap-line",
      titulo: "¿Qué formación necesitan los conductores?",
      descripcion: "Programa completo de formación para conductores de vehículos eléctricos.",
      href: "/preguntas"
    },
    {
      icono: "ri-file-text-line",
      titulo: "¿Cómo crear una política de uso efectiva?",
      descripcion: "Guía para establecer normas claras sin generar conflictos con los conductores.",
      href: "/preguntas"
    },
    {
      icono: "ri-refresh-line",
      titulo: "¿Cómo gestionar el cambio organizacional?",
      descripcion: "Plan completo de gestión del cambio para la transición a vehículos eléctricos.",
      href: "/preguntas"
    }
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-muted to-background -mx-6 px-6" data-testid="section-conductores-cta">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-md p-8 border border-border flex flex-col">
              <div className="flex-1">
                <div className="w-14 h-14 bg-[#ad023b]/10 rounded-md flex items-center justify-center mb-6">
                  <i className="ri-file-text-line w-7 h-7 text-[#ad023b]"></i>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Análisis Personalizado Gratuito</h3>
                <p className="text-muted-foreground mb-6">
                  Descubre el potencial de electrificación con nuestro diagnóstico detallado. Sin compromiso.
                </p>
              </div>
              <Link
                href="/concesionarios"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#ad023b] text-white font-semibold rounded-md transition-all duration-300 whitespace-nowrap cursor-pointer"
                data-testid="link-diagnostico-gratuito"
              >
                Diagnóstico Gratuito
                <i className="ri-arrow-right-line ml-2 w-5 h-5"></i>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-md p-8 text-white flex flex-col">
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-6 flex-wrap">
                  <img
                    alt="Ana - Asesora de Vehículos Eléctricos"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white/30 flex-shrink-0"
                    src="/ana-perez.png"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">¿Necesitas Ayuda?</h3>
                    <p className="text-green-50 mb-1"><strong>Ana</strong></p>
                    <p className="text-green-100 text-sm">Especialista en Vehículos Eléctricos e Híbridos</p>
                  </div>
                </div>
                <p className="text-green-50 mb-6">
                  La persona que te va a atender es Ana, lleva más de 10 años como profesional en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
                </p>
              </div>
              <a
                href="tel:+34955034600"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer"
                data-testid="link-llamar-ana"
              >
                <i className="ri-phone-line w-5 h-5 mr-2"></i>
                Llámame
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16" data-testid="section-preguntas-relacionadas">
        <h2 className="text-2xl font-bold text-foreground mb-6">Preguntas Relacionadas</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {preguntasRelacionadas.map((pregunta, index) => (
            <Link
              key={index}
              href={pregunta.href}
              className="bg-card border border-border rounded-md p-6 hover-elevate transition-all cursor-pointer block"
              data-testid={`link-pregunta-relacionada-${index}`}
            >
              <h3 className="font-bold text-foreground mb-2 flex items-center flex-wrap gap-1">
                <i className={`${pregunta.icono} text-[#ad023b] w-5 h-5 mr-2`}></i>
                {pregunta.titulo}
              </h3>
              <p className="text-muted-foreground text-sm">{pregunta.descripcion}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default function ConductoresAdopcionPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-conductores-adopcion">
      <SEOHead
        title="Perfiles de Conductores y Adopción de Vehículos Eléctricos"
        description="Descubre qué tipo de conductor eléctrico eres. Perfiles de adopción, experiencias reales y consejos para la transición al coche eléctrico con Grupo Avisa."
        canonical="/conductores-adopcion"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Guía de Adopción" />
      <main role="main">
        <ConductoresHero />
        <div className="max-w-5xl mx-auto px-6 py-12 flex-1">
        <EvitarRechazo />
        <FormacionMinima />
        <NormasUso />
        <GestionQuejas />
        <ConductoresCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
}