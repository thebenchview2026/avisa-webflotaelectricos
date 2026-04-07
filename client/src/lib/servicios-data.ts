export const SERVICE_SLUGS = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"] as const;

export const BRAND_NAMES: Record<string, string> = {
  "volkswagen": "Volkswagen",
  "audi": "Audi",
  "skoda": "Škoda",
  "cupra": "CUPRA",
  "seat": "SEAT",
  "tesla": "Tesla",
  "byd": "BYD",
  "hyundai": "Hyundai",
  "bmw": "BMW",
  "mercedes-benz": "Mercedes-Benz",
  "kia": "Kia",
  "volvo": "Volvo",
  "peugeot": "Peugeot",
  "renault": "Renault",
};

export interface ServiceDefinition {
  title: string;
  icon: string;
  heroImage: string;
  intro: (brand: string) => string;
  benefits: (brand: string) => { icon: string; title: string; description: string }[];
  process: (brand: string) => { step: string; description: string }[];
  faqs: (brand: string) => { question: string; answer: string }[];
  cta: (brand: string) => string;
}

export const SERVICE_DEFINITIONS: Record<string, ServiceDefinition> = {
  "reparacion": {
    title: "Reparación",
    icon: "ri-tools-line",
    heroImage: "Professional%20automotive%20repair%20workshop%20electric%20vehicle%20being%20repaired%20by%20certified%20technician%20modern%20equipment%20clean%20bright%20environment",
    intro: (brand) => `Nuestro taller oficial cuenta con técnicos certificados por ${brand} para la reparación integral de vehículos eléctricos e híbridos enchufables. Utilizamos exclusivamente herramientas de diagnóstico oficiales ${brand} y repuestos originales con garantía del fabricante. Cada intervención se registra en el historial oficial del vehículo, manteniendo su valor residual y la garantía de fábrica. Contamos con más de 15 años de experiencia en la red oficial ${brand} en Andalucía y Extremadura.`,
    benefits: (brand) => [
      { icon: "ri-shield-check-line", title: "Garantía oficial", description: `Todas las reparaciones mantienen la garantía oficial ${brand}. Utilizamos piezas originales certificadas.` },
      { icon: "ri-cpu-line", title: "Diagnóstico avanzado", description: `Equipamiento oficial de diagnóstico ${brand} con software actualizado para detección precisa de averías.` },
      { icon: "ri-flashlight-line", title: "Alta tensión certificada", description: `Técnicos con certificación de alto voltaje para sistemas de batería y motor eléctrico ${brand}.` },
      { icon: "ri-time-line", title: "Servicio express", description: `Reparaciones prioritarias con vehículo de sustitución eléctrico disponible durante la intervención.` },
      { icon: "ri-file-list-3-line", title: "Presupuesto transparente", description: `Presupuesto previo detallado sin compromiso. Sin sorpresas en la factura final.` },
      { icon: "ri-car-line", title: "Recogida a domicilio", description: `Servicio de recogida y entrega de tu ${brand} en un radio de 30 km de nuestras instalaciones.` },
    ],
    process: (brand) => [
      { step: "Recepción y diagnóstico", description: `Recibimos tu ${brand} y realizamos un diagnóstico completo con equipamiento oficial para identificar con precisión el origen de la avería.` },
      { step: "Presupuesto detallado", description: "Te proporcionamos un presupuesto transparente con el desglose completo de piezas y mano de obra antes de iniciar cualquier intervención." },
      { step: "Reparación certificada", description: `Nuestros técnicos certificados ${brand} realizan la reparación con piezas originales y siguiendo los protocolos oficiales del fabricante.` },
      { step: "Control de calidad", description: "Cada reparación pasa por un control de calidad final que incluye prueba en carretera y verificación electrónica de todos los sistemas." },
      { step: "Entrega con garantía", description: `Entregamos tu ${brand} reparado con garantía de 2 años en piezas y mano de obra. Registro en el historial oficial del vehículo.` },
    ],
    faqs: (brand) => [
      { question: `¿Cuánto cuesta reparar un ${brand} eléctrico?`, answer: `El coste depende del tipo de avería. Las reparaciones de un ${brand} eléctrico pueden ser más económicas que las de un vehículo de combustión al tener menos componentes mecánicos. Te proporcionamos presupuesto previo sin compromiso.` },
      { question: `¿La reparación mantiene la garantía oficial ${brand}?`, answer: `Sí. Al ser taller oficial ${brand}, todas nuestras reparaciones mantienen la garantía del fabricante. Utilizamos exclusivamente piezas originales y seguimos los protocolos oficiales.` },
      { question: `¿Cuánto tarda una reparación de ${brand} eléctrico?`, answer: `Depende de la intervención. Reparaciones menores se realizan en el mismo día. Para intervenciones de mayor envergadura, ofrecemos vehículo de sustitución eléctrico sin coste adicional.` },
      { question: `¿Reparan la batería de alto voltaje de ${brand}?`, answer: `Sí. Contamos con técnicos certificados en alta tensión para intervenir en baterías de alto voltaje ${brand}. Realizamos diagnóstico de celdas, reparación de módulos y sustitución de componentes del sistema de batería.` },
    ],
    cta: (brand) => `Solicita presupuesto para tu ${brand}`,
  },
  "diagnostico": {
    title: "Diagnóstico",
    icon: "ri-search-eye-line",
    heroImage: "Modern%20car%20diagnostic%20equipment%20connected%20to%20electric%20vehicle%20professional%20technician%20analyzing%20data%20on%20screen%20high%20tech%20workshop",
    intro: (brand) => `Ofrecemos diagnóstico electrónico avanzado para vehículos ${brand} eléctricos e híbridos con el software oficial del fabricante. Nuestros equipos de diagnóstico se actualizan permanentemente para detectar cualquier anomalía en los sistemas de batería, motor eléctrico, electrónica de potencia y sistemas de asistencia a la conducción. El diagnóstico preventivo es clave para anticipar problemas y mantener tu ${brand} en condiciones óptimas de rendimiento y seguridad.`,
    benefits: (brand) => [
      { icon: "ri-cpu-line", title: "Software oficial", description: `Diagnóstico con software oficial ${brand} actualizado a la última versión para máxima precisión.` },
      { icon: "ri-battery-charge-line", title: "Análisis de batería", description: `Diagnóstico completo del estado de salud (SOH) de la batería de tu ${brand}, capacidad real y equilibrado de celdas.` },
      { icon: "ri-bar-chart-box-line", title: "Informe detallado", description: `Recibes un informe completo con el estado de cada sistema de tu ${brand} y recomendaciones de actuación.` },
      { icon: "ri-speed-line", title: "Test de rendimiento", description: `Verificación del rendimiento del motor eléctrico, sistema de frenada regenerativa y electrónica de potencia.` },
      { icon: "ri-wifi-line", title: "Actualizaciones OTA", description: `Verificamos y aplicamos las últimas actualizaciones de software disponibles para tu ${brand}.` },
      { icon: "ri-shield-check-line", title: "Sistemas ADAS", description: `Calibración y verificación de los sistemas de asistencia a la conducción (ADAS) de tu ${brand}.` },
    ],
    process: (brand) => [
      { step: "Conexión al vehículo", description: `Conectamos tu ${brand} al sistema de diagnóstico oficial y realizamos una lectura completa de todas las centralitas electrónicas.` },
      { step: "Análisis de batería", description: "Evaluamos el estado de salud de la batería (SOH), capacidad real, equilibrado entre celdas y sistema de refrigeración." },
      { step: "Verificación de sistemas", description: `Comprobamos motor eléctrico, inversor, cargador a bordo, sistemas de carga y electrónica de potencia de tu ${brand}.` },
      { step: "Calibración ADAS", description: "Verificamos y calibramos los sistemas avanzados de asistencia a la conducción: frenada automática, control de crucero adaptativo, etc." },
      { step: "Informe y recomendaciones", description: "Elaboramos un informe detallado con el estado de cada componente y recomendaciones priorizadas de mantenimiento." },
    ],
    faqs: (brand) => [
      { question: `¿Cuánto cuesta un diagnóstico completo de ${brand}?`, answer: `El diagnóstico electrónico completo de un ${brand} tiene un precio desde 49€. Incluye lectura de centralitas, análisis de batería e informe detallado. Si se realiza reparación posterior, el diagnóstico es gratuito.` },
      { question: `¿Cuánto dura un diagnóstico de ${brand} eléctrico?`, answer: `Un diagnóstico completo de tu ${brand} dura aproximadamente 90 minutos. Incluye conexión al sistema oficial, análisis de batería y verificación de todos los sistemas electrónicos.` },
      { question: `¿Con qué frecuencia debo hacer un diagnóstico de mi ${brand}?`, answer: `Recomendamos un diagnóstico preventivo anual o cada 20.000 km. Para vehículos con más de 5 años o 100.000 km, el diagnóstico semestral es aconsejable para monitorizar el estado de la batería.` },
      { question: `¿Pueden diagnosticar problemas de carga de mi ${brand}?`, answer: `Sí. Diagnosticamos problemas de carga del vehículo, incluyendo el cargador a bordo, puerto de carga, y compatibilidad con diferentes tipos de cargadores. También verificamos la comunicación CCS/Tipo 2.` },
    ],
    cta: (brand) => `Reserva diagnóstico para tu ${brand}`,
  },
  "mantenimiento": {
    title: "Mantenimiento",
    icon: "ri-service-line",
    heroImage: "Professional%20car%20maintenance%20service%20center%20electric%20vehicle%20on%20lift%20technician%20performing%20inspection%20clean%20modern%20workshop%20bright",
    intro: (brand) => `El mantenimiento preventivo de tu ${brand} eléctrico o híbrido es hasta un 40% más económico que un vehículo de combustión. Sin cambios de aceite, filtros de combustible ni embrague, los intervalos de mantenimiento son más amplios. Nuestros técnicos certificados ${brand} siguen los protocolos oficiales del fabricante para mantener tu vehículo en condiciones óptimas de rendimiento, seguridad y eficiencia energética. Un mantenimiento correcto maximiza la vida útil de la batería y mantiene el valor residual de tu ${brand}.`,
    benefits: (brand) => [
      { icon: "ri-money-euro-circle-line", title: "Hasta 40% más económico", description: `El mantenimiento de un ${brand} eléctrico es significativamente más económico que un vehículo convencional.` },
      { icon: "ri-battery-charge-line", title: "Cuidado de batería", description: `Monitorización del estado de salud de la batería y optimización de la carga para maximizar su vida útil.` },
      { icon: "ri-calendar-check-line", title: "Intervalos amplios", description: `Los ${brand} eléctricos requieren revisiones cada 30.000 km o 2 años, reduciendo visitas al taller.` },
      { icon: "ri-verified-badge-line", title: "Garantía preservada", description: `El mantenimiento oficial ${brand} preserva la garantía del fabricante y el valor de reventa de tu vehículo.` },
      { icon: "ri-car-washing-line", title: "Revisión integral", description: `Revisión de frenos, suspensión, neumáticos, climatización y todos los sistemas electrónicos.` },
      { icon: "ri-file-text-line", title: "Historial digital", description: `Todas las intervenciones se registran en el historial digital oficial ${brand} accesible desde tu app.` },
    ],
    process: (brand) => [
      { step: "Cita online 24/7", description: `Reserva tu cita de mantenimiento ${brand} desde nuestra web o app en cualquier momento. Selecciona fecha, hora y concesionario.` },
      { step: "Recepción del vehículo", description: `Recibimos tu ${brand} y realizamos una inspección visual previa. Si necesitas movilidad, te proporcionamos vehículo de sustitución eléctrico.` },
      { step: "Mantenimiento oficial", description: `Aplicamos el protocolo de mantenimiento oficial ${brand} correspondiente al kilometraje de tu vehículo con piezas y fluidos originales.` },
      { step: "Diagnóstico electrónico", description: `Realizamos un diagnóstico electrónico completo y aplicamos las actualizaciones de software disponibles para tu ${brand}.` },
      { step: "Entrega con informe", description: "Entregamos tu vehículo con un informe detallado de todo lo realizado y recomendaciones para la próxima revisión." },
    ],
    faqs: (brand) => [
      { question: `¿Cuánto cuesta el mantenimiento de un ${brand} eléctrico?`, answer: `El mantenimiento anual de un ${brand} eléctrico oscila entre 89€ y 289€ según el plan elegido. Es un 30-40% más económico que un vehículo de combustión equivalente.` },
      { question: `¿Cada cuánto necesita mantenimiento mi ${brand}?`, answer: `Los ${brand} eléctricos requieren mantenimiento cada 30.000 km o 2 años (lo que ocurra primero). Los híbridos enchufables cada 15.000 km o 1 año. Siempre consulta el plan de mantenimiento específico de tu modelo.` },
      { question: `¿Qué incluye el mantenimiento de un ${brand} eléctrico?`, answer: `Incluye revisión y diagnóstico de batería de alto voltaje, sistema de refrigeración, frenos (incluida frenada regenerativa), suspensión, neumáticos, climatización, actualización de software y diagnóstico electrónico completo.` },
      { question: `¿Puedo llevar mi ${brand} a cualquier concesionario del grupo?`, answer: `Sí. Tu ${brand} puede recibir mantenimiento en cualquiera de nuestros 9 concesionarios oficiales en Sevilla, Huelva, Cádiz, Badajoz y Cáceres. Todos cuentan con técnicos certificados.` },
    ],
    cta: (brand) => `Reserva mantenimiento para tu ${brand}`,
  },
  "carga": {
    title: "Instalación de Punto de Carga",
    icon: "ri-charging-pile-2-line",
    heroImage: "Electric%20vehicle%20charging%20station%20wallbox%20installation%20professional%20electrician%20installing%20home%20charger%20modern%20garage%20clean%20setup",
    intro: (brand) => `Te ayudamos con la instalación profesional de un punto de carga doméstico o empresarial para tu ${brand}. Desde el estudio de viabilidad hasta la puesta en marcha, gestionamos todo el proceso incluyendo las ayudas del Plan MOVES para la instalación del wallbox. Nuestros instaladores certificados garantizan una instalación segura, homologada y optimizada para las especificaciones de carga de tu ${brand} eléctrico o híbrido enchufable.`,
    benefits: (brand) => [
      { icon: "ri-home-4-line", title: "Carga en casa", description: `Instala un wallbox compatible con tu ${brand} para cargar cómodamente durante la noche al mejor precio por kWh.` },
      { icon: "ri-government-line", title: "Ayudas MOVES", description: `Gestionamos las ayudas del Plan MOVES que cubren hasta el 80% del coste de instalación del punto de carga.` },
      { icon: "ri-speed-line", title: "Carga rápida", description: `Wallbox de hasta 22 kW que permite cargar tu ${brand} en 3-4 horas. Compatible con todos los modelos eléctricos.` },
      { icon: "ri-building-line", title: "Comunidades", description: `Gestionamos la instalación en garajes comunitarios: estudio de viabilidad, proyecto técnico y gestión con la comunidad de propietarios.` },
      { icon: "ri-shield-check-line", title: "Instalación homologada", description: `Instalación certificada con boletín eléctrico, cumpliendo toda la normativa vigente y requisitos del Plan MOVES.` },
      { icon: "ri-customer-service-line", title: "Soporte post-instalación", description: `Asistencia técnica durante 2 años tras la instalación. Mantenimiento y resolución de incidencias de tu wallbox.` },
    ],
    process: (brand) => [
      { step: "Consulta inicial", description: `Analizamos tus necesidades de carga según tu modelo ${brand}, kilómetros diarios y tipo de instalación eléctrica existente.` },
      { step: "Estudio de viabilidad", description: "Visitamos tu domicilio o empresa para evaluar la instalación eléctrica, distancias y la mejor ubicación para el punto de carga." },
      { step: "Presupuesto y ayudas", description: "Te presentamos un presupuesto detallado y gestionamos las ayudas del Plan MOVES para reducir el coste de la instalación." },
      { step: "Instalación certificada", description: `Nuestros instaladores certificados realizan la instalación del wallbox optimizado para tu ${brand} con boletín eléctrico oficial.` },
      { step: "Puesta en marcha", description: `Configuramos el wallbox, te enseñamos a programar la carga y verificamos la compatibilidad completa con tu ${brand}.` },
    ],
    faqs: (brand) => [
      { question: `¿Cuánto cuesta instalar un punto de carga para ${brand}?`, answer: `El coste de instalación de un wallbox oscila entre 800€ y 2.500€ según la complejidad. Con las ayudas del Plan MOVES puedes cubrir hasta el 80% del coste, quedando la instalación desde 200€.` },
      { question: `¿Qué wallbox es compatible con mi ${brand}?`, answer: `Los ${brand} eléctricos utilizan conector Tipo 2 (Mennekes) para carga en CA. Recomendamos wallbox de 7,4 kW (monofásico) o 11-22 kW (trifásico) según tu instalación eléctrica.` },
      { question: `¿Puedo instalar un cargador en un garaje comunitario?`, answer: `Sí. La ley te permite instalar un punto de carga en tu plaza de garaje comunicándolo a la comunidad de propietarios. No necesitas aprobación de la junta. Te gestionamos todo el proceso.` },
      { question: `¿Cuánto tarda la instalación?`, answer: `La instalación se realiza en 1 día laborable. El proceso completo (estudio + instalación + gestión de ayudas) se completa en 2-3 semanas.` },
    ],
    cta: (brand) => `Solicita estudio de carga para tu ${brand}`,
  },
  "garantia": {
    title: "Garantía y Extensión de Garantía",
    icon: "ri-shield-star-line",
    heroImage: "Luxury%20car%20dealership%20service%20center%20customer%20receiving%20warranty%20documentation%20professional%20advisor%20modern%20clean%20premium%20environment",
    intro: (brand) => `En Grupo Avisa te ofrecemos la máxima tranquilidad con las garantías oficiales ${brand} y nuestros programas de extensión de garantía para vehículos eléctricos e híbridos. La garantía de la batería de alto voltaje de tu ${brand} cubre hasta 8 años o 160.000 km. Además, puedes ampliar la cobertura con nuestros planes de garantía extendida que protegen los componentes eléctricos específicos de tu vehículo más allá del periodo oficial.`,
    benefits: (brand) => [
      { icon: "ri-shield-check-line", title: "Garantía oficial", description: `Cobertura completa de fábrica ${brand} para todos los componentes del tren motriz eléctrico.` },
      { icon: "ri-battery-charge-line", title: "8 años de batería", description: `La batería de alto voltaje de tu ${brand} está cubierta durante 8 años o 160.000 km por la garantía oficial.` },
      { icon: "ri-add-circle-line", title: "Extensión disponible", description: `Amplía la garantía de tu ${brand} más allá del periodo oficial con cobertura de componentes eléctricos y electrónicos.` },
      { icon: "ri-road-map-line", title: "Asistencia en carretera", description: `Asistencia 24/7 en toda Europa incluida en la garantía oficial ${brand}. Grúa y vehículo de sustitución.` },
      { icon: "ri-file-list-3-line", title: "Sin letra pequeña", description: `Condiciones claras y transparentes. Te explicamos exactamente qué cubre y qué no cubre cada garantía.` },
      { icon: "ri-exchange-line", title: "Transferible", description: `La garantía oficial ${brand} y la extensión son transferibles al siguiente propietario, aumentando el valor de reventa.` },
    ],
    process: (brand) => [
      { step: "Consulta de cobertura", description: `Verificamos el estado actual de la garantía de tu ${brand}: fecha de inicio, kilometraje y componentes cubiertos.` },
      { step: "Evaluación del vehículo", description: `Realizamos una inspección para verificar que tu ${brand} cumple los requisitos para la extensión de garantía.` },
      { step: "Propuesta personalizada", description: `Te presentamos las opciones de extensión de garantía disponibles para tu ${brand} con precios y coberturas claras.` },
      { step: "Activación inmediata", description: "La extensión de garantía se activa de forma inmediata una vez contratada, sin periodos de carencia." },
    ],
    faqs: (brand) => [
      { question: `¿Qué cubre la garantía de un ${brand} eléctrico?`, answer: `La garantía oficial ${brand} cubre el motor eléctrico, inversor, cargador a bordo y componentes del tren motriz durante 2 años sin límite de km. La batería de alto voltaje tiene garantía de 8 años o 160.000 km.` },
      { question: `¿Puedo extender la garantía de mi ${brand}?`, answer: `Sí. Ofrecemos extensiones de garantía de 1 a 3 años adicionales que cubren los componentes eléctricos específicos de tu ${brand}. Consulta condiciones según modelo y antigüedad.` },
      { question: `¿La garantía cubre la degradación de la batería?`, answer: `La garantía oficial ${brand} cubre que la batería mantenga al menos el 70% de su capacidad original durante 8 años o 160.000 km. Si baja de ese umbral, se reemplaza o repara sin coste.` },
    ],
    cta: (brand) => `Consulta la garantía de tu ${brand}`,
  },
};

export interface ServicePillarData {
  slug: string;
  title: string;
  icon: string;
  pillarIntro: string;
  pillarFaqs: { question: string; answer: string }[];
}

const servicePillarIntros: Record<string, { intro: string; faqs: { question: string; answer: string }[] }> = {
  reparacion: {
    intro: "Grupo Avisa es tu taller oficial de reparación de vehículos eléctricos e híbridos enchufables en Andalucía y Extremadura. Con más de 15 años como concesionario oficial del Grupo Volkswagen y servicio multimarca para las principales marcas del mercado, nuestros técnicos certificados en alta tensión están preparados para diagnosticar y reparar cualquier avería en el tren motriz eléctrico, batería de alto voltaje, electrónica de potencia y sistemas ADAS. Utilizamos equipamiento de diagnóstico oficial y repuestos originales con garantía del fabricante en todas nuestras intervenciones.",
    faqs: [
      { question: "¿Reparáis vehículos eléctricos de todas las marcas?", answer: "Somos taller oficial para Volkswagen, Audi y Škoda. Además, ofrecemos servicio multimarca para reparación y mantenimiento de vehículos eléctricos e híbridos de Tesla, BMW, Mercedes-Benz, Hyundai, Kia, BYD, Volvo, Peugeot, Renault, CUPRA y SEAT." },
      { question: "¿Cuánto cuesta reparar un coche eléctrico?", answer: "El coste depende del tipo de avería. Las reparaciones de vehículos eléctricos suelen ser más económicas que las de combustión al tener menos componentes mecánicos. Ofrecemos presupuesto previo sin compromiso y transparencia total en el desglose." },
      { question: "¿Tenéis certificación para reparar baterías de alto voltaje?", answer: "Sí. Todos nuestros técnicos tienen certificación PES (Persona Electricamente Sensibilizada) y formación específica en sistemas de alta tensión de 400V y 800V. Podemos intervenir en baterías de alto voltaje de todas las marcas que servimos." },
      { question: "¿La reparación mantiene la garantía oficial del fabricante?", answer: "En las marcas de las que somos concesionario oficial (Volkswagen, Audi, Škoda), sí. Utilizamos piezas originales y seguimos los protocolos oficiales. Para marcas multimarca, utilizamos piezas de calidad equivalente con garantía de 2 años." },
    ],
  },
  diagnostico: {
    intro: "El servicio de diagnóstico electrónico de Grupo Avisa utiliza el software oficial de los fabricantes para analizar todos los sistemas de tu vehículo eléctrico o híbrido: batería de alto voltaje (estado de salud, capacidad, equilibrado de celdas), motor eléctrico, inversor, cargador a bordo, sistemas de frenada regenerativa y todos los sistemas ADAS de asistencia a la conducción. Nuestro diagnóstico preventivo es clave para anticipar problemas, mantener el rendimiento óptimo y maximizar la vida útil de la batería.",
    faqs: [
      { question: "¿Para qué sirve un diagnóstico de vehículo eléctrico?", answer: "El diagnóstico electrónico permite verificar el estado de salud de la batería (SOH), detectar anomalías en el motor eléctrico, verificar el sistema de carga, calibrar los sistemas ADAS y aplicar actualizaciones de software. Es fundamental para el mantenimiento preventivo." },
      { question: "¿Cuánto cuesta un diagnóstico electrónico?", answer: "El diagnóstico completo tiene un precio desde 49€ e incluye lectura de centralitas, análisis de batería de alto voltaje e informe detallado. Si se realiza reparación posterior, el diagnóstico es gratuito." },
      { question: "¿Diagnosticáis problemas de carga?", answer: "Sí. Diagnosticamos problemas de carga del vehículo: cargador a bordo, puerto de carga, compatibilidad con cargadores, comunicación CCS/Tipo 2 y verificamos la electrónica de potencia completa." },
      { question: "¿Con qué frecuencia se recomienda un diagnóstico?", answer: "Recomendamos un diagnóstico preventivo anual o cada 20.000 km. Para vehículos con más de 5 años o 100.000 km, el diagnóstico semestral permite monitorizar la degradación de la batería." },
    ],
  },
  mantenimiento: {
    intro: "El mantenimiento preventivo de vehículos eléctricos e híbridos en Grupo Avisa es hasta un 40% más económico que el de un vehículo de combustión. Sin cambios de aceite, filtros de combustible ni embrague, los intervalos de mantenimiento son más amplios y el coste por revisión significativamente menor. Nuestros técnicos certificados siguen los protocolos oficiales de cada fabricante para mantener tu vehículo en condiciones óptimas de rendimiento, seguridad y eficiencia energética, maximizando la vida útil de la batería y preservando el valor residual.",
    faqs: [
      { question: "¿Es más barato mantener un coche eléctrico?", answer: "Sí. El mantenimiento de un vehículo eléctrico es un 30-40% más económico que uno de combustión. Sin cambios de aceite, filtros de combustible, correa de distribución ni embrague, los costes se reducen significativamente. Las revisiones anuales van desde 89€." },
      { question: "¿Cada cuánto necesita revisión un coche eléctrico?", answer: "Los vehículos 100% eléctricos necesitan revisión cada 30.000 km o 2 años. Los híbridos enchufables cada 15.000 km o 1 año. Consulta el plan de mantenimiento específico de tu marca y modelo." },
      { question: "¿Qué incluye el mantenimiento de un eléctrico?", answer: "Incluye: diagnóstico electrónico completo, revisión del estado de la batería de alto voltaje, sistema de refrigeración, frenos (incluida frenada regenerativa), suspensión, neumáticos, climatización y actualización de software del fabricante." },
      { question: "¿El mantenimiento se puede hacer en cualquier concesionario del grupo?", answer: "Sí. Tu vehículo puede recibir mantenimiento en cualquiera de nuestros 9 concesionarios en Sevilla, Dos Hermanas, Huelva, Badajoz, Cáceres, Fuente de Cantos y Córdoba. Todos con técnicos certificados." },
    ],
  },
  carga: {
    intro: "Grupo Avisa te ayuda con la instalación profesional de puntos de carga domésticos y empresariales para tu vehículo eléctrico o híbrido enchufable. Desde el estudio de viabilidad hasta la puesta en marcha, gestionamos todo el proceso incluyendo las ayudas del Plan MOVES para la instalación del wallbox. Nuestros instaladores certificados garantizan una instalación segura, homologada y optimizada para las especificaciones de carga de tu vehículo. Trabajamos con todas las marcas: Volkswagen, Audi, Škoda, Tesla, BMW, Mercedes-Benz, Hyundai, Kia y más.",
    faqs: [
      { question: "¿Cuánto cuesta instalar un punto de carga en casa?", answer: "El coste de instalación de un wallbox doméstico oscila entre 800€ y 2.500€ según la complejidad (distancia cuadro-wallbox, necesidad de refuerzo eléctrico). Con las ayudas MOVES puedes cubrir hasta el 80%, quedando desde 200€." },
      { question: "¿Se puede instalar un cargador en un garaje comunitario?", answer: "Sí. La ley te ampara para instalar un punto de carga en tu plaza de garaje comunitario comunicándolo a la comunidad (no necesitas aprobación de la junta). Gestionamos todo el proceso: proyecto técnico, boletín eléctrico y comunidad." },
      { question: "¿Qué tipo de wallbox necesito?", answer: "Depende de tu instalación eléctrica y vehículo. Con monofásica: wallbox de 7,4 kW (carga completa en 6-8h). Con trifásica: wallbox de 11-22 kW (carga en 3-4h). Te hacemos un estudio personalizado gratuito." },
      { question: "¿Qué ayudas hay para instalar un punto de carga?", answer: "El Plan MOVES III cubre hasta el 80% del coste de instalación de infraestructura de carga vinculada a la compra de un vehículo eléctrico. También existen ayudas autonómicas adicionales en Andalucía y Extremadura." },
    ],
  },
  garantia: {
    intro: "En Grupo Avisa te ofrecemos la máxima tranquilidad con las garantías oficiales de los fabricantes y nuestros programas de extensión de garantía para vehículos eléctricos e híbridos. La garantía de la batería de alto voltaje cubre hasta 8 años o 160.000 km en la mayoría de marcas. Además, puedes ampliar la cobertura con planes de garantía extendida que protegen los componentes eléctricos específicos. Como concesionario oficial, gestionamos todas las incidencias de garantía directamente con el fabricante.",
    faqs: [
      { question: "¿Cuánto dura la garantía de la batería de un coche eléctrico?", answer: "La mayoría de fabricantes ofrecen garantía de batería de 8 años o 160.000 km, asegurando al menos el 70% de capacidad. Kia ofrece 7 años de garantía general. Consulta las condiciones específicas de tu marca." },
      { question: "¿Se puede extender la garantía de un eléctrico?", answer: "Sí. Ofrecemos extensiones de garantía de 1 a 3 años adicionales que cubren componentes eléctricos específicos: motor eléctrico, inversor, cargador a bordo y electrónica de potencia. Condiciones según marca, modelo y antigüedad." },
      { question: "¿La garantía es transferible al nuevo propietario?", answer: "Sí. Tanto la garantía oficial del fabricante como las extensiones de garantía contratadas son transferibles al siguiente propietario, lo que aumenta el valor de reventa de tu vehículo." },
      { question: "¿Qué cubre exactamente la garantía de un eléctrico?", answer: "La garantía oficial cubre el motor eléctrico, inversor, cargador a bordo y tren motriz (2 años sin límite de km). La batería de alto voltaje: 8 años o 160.000 km. La garantía general del vehículo: 2-7 años según marca." },
    ],
  },
};

export function getServicePillarData(slug: string): ServicePillarData | null {
  const def = SERVICE_DEFINITIONS[slug];
  const pillar = servicePillarIntros[slug];
  if (!def || !pillar) return null;
  return {
    slug,
    title: def.title,
    icon: def.icon,
    pillarIntro: pillar.intro,
    pillarFaqs: pillar.faqs,
  };
}

export function isServicePillarSlug(slug: string): boolean {
  return slug in SERVICE_DEFINITIONS;
}

export function getAllServicePillarSlugs(): string[] {
  return Object.keys(SERVICE_DEFINITIONS);
}

export function getServiceBrands(serviceSlug: string) {
  return Object.entries(BRAND_NAMES).map(([brandSlug, brandName]) => ({
    brandSlug,
    brandName,
    url: `/servicios/${serviceSlug}-${brandSlug}`,
  }));
}

export function getRelatedServices(currentSlug: string) {
  return Object.entries(SERVICE_DEFINITIONS)
    .filter(([slug]) => slug !== currentSlug)
    .map(([slug, def]) => ({ slug, title: def.title, icon: def.icon, url: `/servicios/${slug}` }));
}

export function getServiceBrandData(slug: string) {
  for (const [serviceSlug, serviceDef] of Object.entries(SERVICE_DEFINITIONS)) {
    for (const [brandSlug, brandName] of Object.entries(BRAND_NAMES)) {
      if (slug === `${serviceSlug}-${brandSlug}`) {
        return { serviceSlug, serviceDef, brandSlug, brandName };
      }
    }
  }
  return null;
}

export function getAllServiceBrandSlugs(): string[] {
  const slugs: string[] = [];
  for (const serviceSlug of Object.keys(SERVICE_DEFINITIONS)) {
    for (const brandSlug of Object.keys(BRAND_NAMES)) {
      slugs.push(`${serviceSlug}-${brandSlug}`);
    }
  }
  return slugs;
}
