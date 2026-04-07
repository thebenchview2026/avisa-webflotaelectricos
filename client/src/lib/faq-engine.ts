import { BRAND_NAMES, SERVICE_DEFINITIONS } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";
import type { FAQItem, FAQSection, RelatedFAQLink } from "@/components/InlineFAQSection";

const GENERAL_EV_FAQS: FAQItem[] = [
  { question: "¿Es más barato mantener un coche eléctrico que uno de combustión?", answer: "Sí. El mantenimiento de un vehículo eléctrico es un 30-40% más económico que el de un vehículo de combustión equivalente. Los eléctricos no necesitan cambio de aceite motor, filtro de combustible, bujías ni correa de distribución. Los principales puntos de mantenimiento son frenos, neumáticos, climatización y revisión del sistema de alta tensión." },
  { question: "¿Cuánto dura la batería de un coche eléctrico?", answer: "Las baterías de los vehículos eléctricos actuales están diseñadas para durar entre 300.000 y 500.000 km. Los fabricantes ofrecen garantía de 8 años o 160.000 km, asegurando al menos el 70% de la capacidad original. El estado de salud (SOH) de la batería se monitoriza en cada revisión para anticipar cualquier degradación." },
  { question: "¿Puedo reparar mi coche eléctrico en cualquier taller?", answer: "No todos los talleres están preparados para trabajar con vehículos eléctricos. Se requiere certificación de alta tensión (PES/PAV), herramientas de diagnóstico específicas y formación del fabricante. En Grupo Avisa contamos con técnicos certificados y equipamiento oficial para todas las marcas que atendemos." },
  { question: "¿Qué tipo de conector de carga utilizan los coches eléctricos en España?", answer: "En Europa, el estándar es el conector CCS Combo 2 para carga rápida en corriente continua (DC) y el Tipo 2 (Mennekes) para carga en corriente alterna (AC). Todos los vehículos eléctricos nuevos vendidos en España utilizan estos conectores, que son universales y compatibles con la red pública de cargadores." },
  { question: "¿Necesito instalar un punto de carga en casa?", answer: "Es muy recomendable. Aunque puedes cargar en la red pública, un wallbox doméstico te permite cargar durante la noche a tarifa valle (hasta un 60% más barato). La instalación tiene ayudas del Plan MOVES que cubren hasta el 80% del coste. Un wallbox de 7,4 kW carga completamente un coche eléctrico medio en 6-8 horas." },
  { question: "¿Los coches eléctricos tienen frenos normales?", answer: "Sí, pero se usan mucho menos gracias a la frenada regenerativa, que recupera energía al soltar el acelerador. Esto reduce significativamente el desgaste de pastillas y discos. Sin embargo, es importante revisar los frenos periódicamente porque el poco uso puede provocar cristalización del material de fricción, reduciendo la eficacia de frenado." },
];

const SERVICE_ONLY_FAQS: Record<string, FAQItem[]> = {
  reparacion: [
    { question: "¿Cuánto cuesta reparar un coche eléctrico?", answer: "El coste varía según el tipo de avería. Reparaciones de sistemas auxiliares (frenos, suspensión, dirección) cuestan entre 150€ y 800€, similar a un vehículo convencional. Las intervenciones en el sistema de alta tensión (batería, inversor, motor eléctrico) pueden oscilar entre 500€ y 4.000€ dependiendo de la complejidad y el fabricante." },
    { question: "¿Se puede reparar la batería de alto voltaje o hay que sustituirla entera?", answer: "En muchos casos sí se puede reparar. Los packs de batería están formados por módulos individuales, y en caso de fallo de un módulo, se puede sustituir solo el afectado sin cambiar el pack completo. Esto reduce significativamente el coste. Nuestros técnicos diagnostican célula a célula para identificar exactamente qué componente necesita intervención." },
    { question: "¿Ofrecéis vehículo de sustitución durante la reparación?", answer: "Sí. Disponemos de vehículos eléctricos de cortesía para que no pierdas movilidad mientras reparamos tu coche. Este servicio está disponible para reparaciones que superen las 4 horas de duración. Solicítalo al entregar tu vehículo en el taller." },
    { question: "¿Qué pasa con la garantía si reparo mi eléctrico en vuestro taller?", answer: "Si somos taller oficial de tu marca, la garantía se mantiene intacta. Para marcas de las que no somos concesionario oficial, utilizamos repuestos de primera calidad homologados y seguimos los protocolos del fabricante. Registramos cada intervención en el historial del vehículo." },
  ],
  diagnostico: [
    { question: "¿En qué consiste un diagnóstico de coche eléctrico?", answer: "Un diagnóstico completo incluye: lectura de todos los códigos de error almacenados en las centralitas, análisis del estado de la batería de alto voltaje (capacidad, resistencia interna, equilibrado de celdas), verificación del sistema de frenada regenerativa, test del cargador a bordo, revisión de sensores ADAS y un informe detallado con recomendaciones." },
    { question: "¿Cuánto cuesta un diagnóstico de coche eléctrico?", answer: "El diagnóstico básico con lectura de códigos tiene un coste de 49€-89€. El diagnóstico completo con análisis de batería de alto voltaje oscila entre 89€ y 149€ según el fabricante. Si decides realizar la reparación en nuestro taller, descontamos el coste del diagnóstico del presupuesto final." },
    { question: "¿Cada cuánto debo hacer un diagnóstico de mi eléctrico?", answer: "Recomendamos un diagnóstico completo al menos una vez al año o cada 20.000 km, lo que ocurra primero. Si notas cambios en la autonomía, rendimiento, o aparecen avisos en el cuadro de instrumentos, no esperes y solicita diagnóstico inmediato. Para vehículos con más de 5 años, el diagnóstico semestral es aconsejable." },
    { question: "¿Podéis diagnosticar por qué ha bajado la autonomía de mi eléctrico?", answer: "Sí, es una de las consultas más frecuentes. Nuestro diagnóstico identifica si la causa es la degradación natural de la batería, un consumo anómalo de sistemas auxiliares (climatización, calefacción), problemas de calibración del BMS, hábitos de carga inadecuados o incluso neumáticos incorrectos con alta resistencia a la rodadura." },
  ],
  mantenimiento: [
    { question: "¿Qué mantenimiento necesita un coche eléctrico?", answer: "Los puntos principales son: revisión del sistema de alta tensión y batería, frenos (pastillas y discos, incluyendo frenada regenerativa), neumáticos (rotación y presión), climatización (gas refrigerante y filtros), líquido de refrigeración de batería, actualizaciones de software y diagnóstico electrónico completo. No necesita cambio de aceite motor, filtros de combustible ni bujías." },
    { question: "¿Con qué frecuencia debo revisar mi coche eléctrico?", answer: "Los vehículos 100% eléctricos requieren revisión cada 30.000 km o 2 años (lo que ocurra primero). Los híbridos enchufables, cada 15.000 km o 1 año. Sin embargo, cada fabricante tiene su propio plan de mantenimiento. Consulta el libro de servicio de tu vehículo o pregúntanos por el plan específico de tu modelo." },
    { question: "¿Es necesario cambiar el líquido refrigerante de la batería?", answer: "Sí. El circuito de refrigeración de la batería de alto voltaje utiliza un refrigerante especial que debe sustituirse cada 4-5 años según el fabricante. Es un punto de mantenimiento específico de los eléctricos que muchos propietarios desconocen. Utilizar el refrigerante incorrecto puede dañar el sistema de gestión térmica." },
    { question: "¿Las actualizaciones de software de mi eléctrico son gratuitas?", answer: "Depende del tipo de actualización. Las que corrigen fallos de seguridad o cumplimiento normativo son siempre gratuitas. Las actualizaciones que mejoran rendimiento, autonomía o añaden funciones pueden ser gratuitas o de pago según el fabricante. Las actualizaciones OTA (Over-the-Air) se aplican automáticamente; otras requieren visita al taller." },
  ],
  carga: [
    { question: "¿Cuánto cuesta instalar un punto de carga en casa?", answer: "La instalación de un wallbox doméstico oscila entre 800€ y 2.500€ según la complejidad de la obra eléctrica. Con las ayudas del Plan MOVES puedes cubrir hasta el 80% del coste, dejando la inversión desde 200€ en muchos casos. El precio incluye wallbox, instalación eléctrica, cuadro de protección y boletín eléctrico oficial." },
    { question: "¿Qué potencia de cargador necesito en casa?", answer: "Para la mayoría de los propietarios, un wallbox monofásico de 7,4 kW es suficiente: carga una batería de 60 kWh del 20% al 100% en unas 8 horas (noche completa). Si tienes instalación trifásica, un wallbox de 11 kW reduce el tiempo a 5 horas. Solo merece la pena 22 kW si tu vehículo lo admite (pocos modelos lo hacen en AC)." },
    { question: "¿Puedo instalar un cargador en un garaje comunitario?", answer: "Sí. La Ley de Propiedad Horizontal en España permite instalar un punto de carga en tu plaza de garaje comunicándolo a la comunidad de propietarios, sin necesidad de aprobación de la junta. Nosotros gestionamos todo el proceso: estudio de viabilidad, instalación, documentación legal y boletín eléctrico." },
    { question: "¿Cuánto se tarda en cargar un coche eléctrico en un cargador público rápido?", answer: "En un cargador rápido DC de 50 kW, una carga del 20% al 80% tarda unos 40-50 minutos para la mayoría de los coches. Con cargadores ultrarrápidos de 150-350 kW (como los de IONITY), los vehículos compatibles (800V) pueden cargar del 10 al 80% en solo 18-25 minutos. Recomendamos no cargar al 100% en carga rápida para preservar la batería." },
  ],
  garantia: [
    { question: "¿Qué cubre la garantía de un coche eléctrico?", answer: "La garantía estándar cubre el vehículo completo durante 2-7 años según fabricante. Además, la batería de alto voltaje tiene garantía extendida de 8 años o 160.000 km (estándar de la industria). Los componentes del tren motriz eléctrico (motor, inversor, cargador a bordo) suelen tener cobertura extendida de 5-8 años." },
    { question: "¿Puedo ampliar la garantía de mi coche eléctrico?", answer: "Sí. La mayoría de fabricantes ofrecen programas de extensión de garantía específicos para vehículos eléctricos. Estos programas suelen cubrir hasta 5 años adicionales los componentes del tren motriz eléctrico: motor, inversor, cargador a bordo y electrónica de potencia. El coste varía según marca y modelo." },
    { question: "¿Cómo sé si la batería de mi eléctrico está dentro de garantía?", answer: "La garantía de batería se mide por dos parámetros: tiempo (generalmente 8 años) y kilometraje (160.000 km), aplicándose el que se cumpla primero. Además, la batería debe mantener al menos el 70% de su capacidad original. Nosotros medimos el SOH (State of Health) en cada visita y te informamos si está por debajo del umbral de garantía." },
    { question: "¿Pierdo la garantía si no hago el mantenimiento en el concesionario oficial?", answer: "Desde 2010, la normativa europea (Reglamento CE 461/2010) permite hacer el mantenimiento en talleres independientes autorizados sin perder la garantía, siempre que se usen piezas de calidad equivalente y se sigan los protocolos del fabricante. Como taller certificado, garantizamos el cumplimiento de estos requisitos." },
  ],
};

const BRAND_ONLY_FAQS: Record<string, FAQItem[]> = {
  volkswagen: [
    { question: "¿Qué modelos eléctricos tiene Volkswagen?", answer: "La gama eléctrica de Volkswagen incluye los ID.3 (compacto), ID.4 (SUV), ID.5 (SUV coupé), ID.7 (berlina/familiar) e ID. Buzz (furgoneta). Todos comparten la plataforma MEB y utilizan baterías de 58 a 86 kWh con carga rápida CCS hasta 170 kW." },
    { question: "¿Es Grupo Avisa concesionario oficial Volkswagen?", answer: "Sí. Somos concesionario oficial Volkswagen en Andalucía y Extremadura. Nuestros técnicos están certificados directamente por Volkswagen Academy y disponemos de las herramientas de diagnóstico ODIS oficiales. Utilizamos exclusivamente repuestos originales con garantía del fabricante." },
    { question: "¿Cuánto cuesta el mantenimiento de un Volkswagen ID.4?", answer: "El mantenimiento anual del ID.4 oscila entre 149€ y 249€ según el plan. Es un 35% más económico que un Tiguan diésel equivalente. Incluye diagnóstico ODIS completo, revisión de frenada regenerativa, neumáticos, climatización con bomba de calor y actualización de software ID.Software." },
  ],
  audi: [
    { question: "¿Qué modelos eléctricos tiene Audi?", answer: "La gama eléctrica Audi incluye: e-tron / Q8 e-tron (SUV premium), e-tron GT / RS e-tron GT (deportivo), Q4 e-tron (SUV compacto), Q6 e-tron (nuevo SUV) y A6 e-tron (berlina). Los modelos GT utilizan arquitectura de 800V con carga ultrarrápida hasta 270 kW." },
    { question: "¿Es Grupo Avisa concesionario oficial Audi?", answer: "Sí. Somos concesionario oficial Audi con técnicos certificados por la marca, incluyendo la certificación HV (Alto Voltaje) nivel 3. Disponemos del equipo de diagnóstico VAS 6150 con ODIS-S y ODIS-E para sistemas de alta tensión." },
    { question: "¿Cuánto cuesta mantener un Audi e-tron?", answer: "El mantenimiento anual de un Audi e-tron parte desde 189€. Incluye revisión completa del sistema quattro eléctrico, circuito de refrigeración de 4 vías, suspensión neumática (si equipada), frenada regenerativa y diagnóstico VAS completo." },
  ],
  skoda: [
    { question: "¿Qué modelos eléctricos tiene Škoda?", answer: "Škoda ofrece el Enyaq iV (SUV) y el Enyaq Coupé iV como modelos 100% eléctricos, ambos sobre la plataforma MEB del Grupo Volkswagen. Con baterías de 62 o 82 kWh y carga rápida CCS hasta 135 kW. También hay versiones híbridas enchufables del Octavia y Superb." },
    { question: "¿Es Grupo Avisa concesionario oficial Škoda?", answer: "Sí. Somos concesionario oficial Škoda con técnicos certificados por Škoda Academy. Utilizamos las herramientas de diagnóstico ODIS oficiales del Grupo Volkswagen y repuestos originales Škoda." },
    { question: "¿El Škoda Enyaq comparte plataforma con el VW ID.4?", answer: "Sí. Ambos utilizan la plataforma MEB (Modular Electric Drive Matrix) del Grupo Volkswagen. Comparten la base mecánica, batería y motores, pero con carrocería, interior y puesta a punto diferentes. Esto significa que las herramientas de diagnóstico y los protocolos de mantenimiento son muy similares." },
  ],
  tesla: [
    { question: "¿Qué modelos de Tesla podéis atender?", answer: "Atendemos todos los modelos Tesla comercializados en España: Model 3, Model Y, Model S y Model X. Ofrecemos mantenimiento preventivo, revisión de frenos, neumáticos, suspensión, climatización e instalación de wallbox. Para intervenciones que requieran software propietario Tesla, recomendamos el servicio oficial." },
    { question: "¿Es caro mantener un Tesla?", answer: "No. Tesla tiene uno de los costes de mantenimiento más bajos del mercado. Un mantenimiento preventivo anual parte desde 120€. Sin cambio de aceite, filtros de combustible ni correa de distribución, los principales puntos de revisión son frenos, neumáticos (propensos a desgaste por el par instantáneo) y filtro HEPA." },
    { question: "¿Necesita un Tesla ir al taller regularmente?", answer: "Tesla no establece un calendario fijo de revisiones como otros fabricantes. Recomiendan revisión de frenos cada 2 años, cambio de filtro HEPA cada 3 años, cambio de líquido de frenos cada 2 años y rotación de neumáticos cada 10.000 km. Un diagnóstico anual preventivo es muy aconsejable." },
  ],
  bmw: [
    { question: "¿Qué modelos eléctricos tiene BMW?", answer: "La gama eléctrica BMW incluye: iX1, iX3, i4, i5, i7, iX (SUV), e iX con su próxima generación Neue Klasse. Los modelos actuales utilizan arquitectura de 400V, y la nueva plataforma Neue Klasse incorporará 800V con celdas cilíndricas de nueva generación." },
    { question: "¿Es caro mantener un BMW eléctrico?", answer: "El mantenimiento de un BMW eléctrico parte desde 149€ anuales, un 30% menos que un BMW de combustión equivalente. No requiere cambio de aceite ni filtros de combustible. Los principales puntos son: revisión de frenos con frenada regenerativa, neumáticos, climatización y diagnóstico ISTA+ completo." },
  ],
  "mercedes-benz": [
    { question: "¿Qué modelos eléctricos tiene Mercedes-Benz?", answer: "La gama EQ de Mercedes incluye: EQA y EQB (SUV compactos), EQC (SUV mediano), EQE y EQS (berlinas), EQE SUV y EQS SUV, y la Clase G eléctrica. Los modelos de gama alta ofrecen hasta 780 km de autonomía WLTP (EQS) y carga rápida de 200 kW." },
    { question: "¿Es caro mantener un Mercedes eléctrico?", answer: "El mantenimiento de un Mercedes EQ parte desde 159€ anuales, un 25% menos que un Mercedes de combustión equivalente. Los principales puntos son: revisión de frenos con frenada regenerativa DAuto, neumáticos, climatización, diagnóstico XENTRY y actualización de software Mercedes me connect." },
  ],
  hyundai: [
    { question: "¿Qué modelos eléctricos tiene Hyundai?", answer: "Hyundai ofrece: IONIQ 5 (crossover), IONIQ 6 (berlina), Kona Electric (SUV compacto) y próximamente IONIQ 7 (SUV grande). Los IONIQ 5 y 6 utilizan la plataforma E-GMP con arquitectura de 800V, carga ultrarrápida de 240 kW y función V2L bidireccional." },
    { question: "¿Es caro mantener un Hyundai IONIQ 5?", answer: "No. El mantenimiento del IONIQ 5 parte desde 110€ anuales, un 35% menos que un SUV de combustión equivalente. Incluye revisión de frenos, neumáticos, suspensión, filtro de habitáculo y diagnóstico electrónico GDS. Hyundai ofrece 5 años de garantía de serie." },
  ],
  kia: [
    { question: "¿Qué modelos eléctricos tiene Kia?", answer: "Kia ofrece: EV6 (crossover deportivo), EV9 (SUV familiar de 7 plazas), Niro EV (SUV compacto) y próximamente EV3 y EV4. El EV6 y EV9 comparten la plataforma E-GMP con Hyundai, ofreciendo arquitectura de 800V y carga del 10 al 80% en 18 minutos." },
    { question: "¿Cuántos años de garantía tiene Kia?", answer: "Kia ofrece la garantía más generosa del mercado: 7 años o 150.000 km de garantía general. Además, la batería de alto voltaje tiene garantía de 8 años o 160.000 km. Es una de las mejores coberturas de la industria." },
  ],
  cupra: [
    { question: "¿Qué modelos eléctricos tiene CUPRA?", answer: "CUPRA ofrece el Born (100% eléctrico, plataforma MEB) y el Tavascan (SUV eléctrico). También hay versiones híbridas enchufables del León y Formentor. El Born comparte plataforma con el VW ID.3 pero con puesta a punto deportiva." },
    { question: "¿El CUPRA Born es igual que un Volkswagen ID.3?", answer: "Comparten la plataforma MEB, motores y baterías, pero CUPRA añade suspensión deportiva DCC, dirección progresiva más directa, asientos deportivos y una puesta a punto del chasis más dinámica. El mantenimiento y las herramientas de diagnóstico (ODIS) son los mismos del Grupo Volkswagen." },
  ],
  seat: [
    { question: "¿Tiene SEAT coches eléctricos?", answer: "SEAT como marca no ofrece actualmente modelos 100% eléctricos. La estrategia eléctrica del Grupo se canaliza a través de CUPRA. Sin embargo, SEAT tiene versiones híbridas enchufables del León e-Hybrid y Tarraco e-Hybrid, que combinan motor de gasolina con motor eléctrico y batería recargable." },
    { question: "¿Podéis mantener un SEAT híbrido enchufable?", answer: "Sí. Atendemos los SEAT León e-Hybrid y Tarraco e-Hybrid. Estos vehículos utilizan componentes del Grupo Volkswagen que conocemos a fondo. El mantenimiento incluye tanto la parte eléctrica (batería, motor eléctrico) como la térmica (aceite, filtros, distribución)." },
  ],
  byd: [
    { question: "¿Qué modelos de BYD están disponibles en España?", answer: "BYD comercializa en España: Atto 3 (SUV compacto), Dolphin (compacto), Seal (berlina deportiva) y Tang (SUV grande). Todos utilizan la tecnología Blade Battery (LFP) de BYD, conocida por su excepcional seguridad y durabilidad." },
    { question: "¿Es fiable la batería Blade de BYD?", answer: "La batería Blade de BYD es una de las más seguras del mercado. Utiliza química LFP (Litio-Hierro-Fosfato) que no se incendia ni siquiera al ser perforada. Está diseñada para más de 3.000 ciclos de carga y más de 1.000.000 km de vida útil. BYD ofrece garantía de 8 años." },
  ],
  volvo: [
    { question: "¿Qué modelos eléctricos tiene Volvo?", answer: "Volvo ofrece: EX30 (SUV compacto), C40 Recharge (coupé), XC40 Recharge (SUV), EX90 (SUV premium). También hay versiones híbridas enchufables del XC60 y XC90 Recharge. Los modelos eléctricos utilizan Android Automotive OS como sistema de infoentretenimiento." },
    { question: "¿Es caro mantener un Volvo eléctrico?", answer: "No. El mantenimiento de un Volvo eléctrico parte desde 129€ anuales. Incluye revisión de frenos con One Pedal Drive, neumáticos, suspensión, climatización y diagnóstico VIDA. Los eléctricos Volvo no necesitan cambio de aceite ni filtros de combustible." },
  ],
  peugeot: [
    { question: "¿Qué modelos eléctricos tiene Peugeot?", answer: "Peugeot ofrece: e-208 (utilitario), e-2008 (SUV compacto), e-308 (compacto), e-3008 (SUV mediano) y e-Traveller (furgoneta). Utilizan las plataformas eCMP y STLA Medium de Stellantis, con baterías de 50 a 98 kWh." },
    { question: "¿Es barato mantener un Peugeot eléctrico?", answer: "Sí, es de los más económicos del mercado. El mantenimiento anual de un e-208 parte desde 89€. Sin cambio de aceite ni filtros de combustible, los principales costes son frenos, neumáticos, filtro de habitáculo y diagnóstico electrónico." },
  ],
  renault: [
    { question: "¿Qué modelos eléctricos tiene Renault?", answer: "Renault ofrece: Megane E-Tech Electric (compacto), Scenic E-Tech Electric (monovolumen), nuevo R5 E-Tech (urbano retro) y la furgoneta Kangoo E-Tech. La plataforma CMF-EV permite baterías de hasta 87 kWh con carga rápida de 130-150 kW." },
    { question: "¿Cuánto cuesta mantener un Renault eléctrico?", answer: "El mantenimiento anual de un Renault eléctrico parte desde 99€. La plataforma CMF-EV es muy eficiente: sin correa de distribución, sin cambio de aceite motor, con intervalos de revisión cada 30.000 km. Incluye revisión de frenos, neumáticos, climatización y diagnóstico CLIP." },
  ],
};

export function getGeneralEVFaqs(): FAQItem[] {
  return GENERAL_EV_FAQS;
}

export function getServiceOnlyFaqs(serviceSlug: string): FAQItem[] {
  return SERVICE_ONLY_FAQS[serviceSlug] || [];
}

export function getBrandOnlyFaqs(brandSlug: string): FAQItem[] {
  return BRAND_ONLY_FAQS[brandSlug] || [];
}

export function getServiceBrandFaqs(serviceSlug: string, brandSlug: string): FAQItem[] {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  const brandName = BRAND_NAMES[brandSlug];
  if (!serviceDef || !brandName) return [];
  return serviceDef.faqs(brandName);
}

export interface MultiLayerFAQResult {
  sections: FAQSection[];
  allFaqs: FAQItem[];
}

export function getMultiLayerFaqs(serviceSlug: string, brandSlug: string): MultiLayerFAQResult {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  const brandName = BRAND_NAMES[brandSlug];
  if (!serviceDef || !brandName) return { sections: [], allFaqs: [] };

  const combined = getServiceBrandFaqs(serviceSlug, brandSlug);
  const serviceOnly = getServiceOnlyFaqs(serviceSlug);
  const brandOnly = getBrandOnlyFaqs(brandSlug);
  const general = getGeneralEVFaqs();

  const seen = new Set<string>();
  function dedup(faqs: FAQItem[]): FAQItem[] {
    return faqs.filter(f => {
      const key = f.question.toLowerCase().replace(/[¿?]/g, "").trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  const combinedDeduped = dedup(combined);
  const serviceDeduped = dedup(serviceOnly);
  const brandDeduped = dedup(brandOnly);
  const generalDeduped = dedup(general);

  const sections: FAQSection[] = [];

  if (combinedDeduped.length > 0) {
    sections.push({
      title: `${serviceDef.title} de ${brandName} eléctrico`,
      icon: serviceDef.icon,
      faqs: combinedDeduped,
    });
  }

  if (serviceDeduped.length > 0) {
    sections.push({
      title: `Sobre ${serviceDef.title.toLowerCase()} de vehículos eléctricos`,
      icon: "ri-tools-line",
      faqs: serviceDeduped,
    });
  }

  if (brandDeduped.length > 0) {
    sections.push({
      title: `Sobre ${brandName} eléctrico`,
      icon: "ri-car-line",
      faqs: brandDeduped,
    });
  }

  if (generalDeduped.length > 0) {
    sections.push({
      title: "Preguntas generales sobre vehículos eléctricos",
      icon: "ri-question-answer-line",
      faqs: generalDeduped,
    });
  }

  const allFaqs = [
    ...combinedDeduped,
    ...serviceDeduped,
    ...brandDeduped,
    ...generalDeduped,
  ];

  return { sections, allFaqs };
}

export function getBrandFAQRelatedLinks(brandSlug: string): RelatedFAQLink[] {
  const brandName = BRAND_NAMES[brandSlug];
  if (!brandName) return [];

  const links: RelatedFAQLink[] = [];

  Object.entries(SERVICE_DEFINITIONS).slice(0, 4).forEach(([svcSlug, svcDef]) => {
    links.push({
      label: `${svcDef.title} ${brandName}`,
      href: `/servicios/${svcSlug}-${brandSlug}`,
      icon: svcDef.icon,
    });
  });

  links.push({
    label: "Preguntas frecuentes generales",
    href: "/preguntas",
    icon: "ri-question-answer-line",
  });

  links.push({
    label: `Concesionarios Grupo Avisa`,
    href: "/concesionarios",
    icon: "ri-building-line",
  });

  return links;
}

export function getServicePillarFAQRelatedLinks(serviceSlug: string): RelatedFAQLink[] {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  if (!serviceDef) return [];

  const links: RelatedFAQLink[] = [];

  const topBrands = ["volkswagen", "audi", "tesla", "bmw"];
  topBrands.forEach((brandSlug) => {
    const brandName = BRAND_NAMES[brandSlug];
    links.push({
      label: `${serviceDef.title} ${brandName}`,
      href: `/servicios/${serviceSlug}-${brandSlug}`,
      icon: serviceDef.icon,
    });
  });

  Object.entries(SERVICE_DEFINITIONS)
    .filter(([slug]) => slug !== serviceSlug)
    .slice(0, 2)
    .forEach(([slug, def]) => {
      links.push({
        label: `${def.title} de eléctricos`,
        href: `/servicios/${slug}`,
        icon: def.icon,
      });
    });

  return links;
}

export function getServiceBrandFAQRelatedLinks(
  serviceSlug: string,
  brandSlug: string
): RelatedFAQLink[] {
  const serviceDef = SERVICE_DEFINITIONS[serviceSlug];
  const brandName = BRAND_NAMES[brandSlug];
  if (!serviceDef || !brandName) return [];

  const links: RelatedFAQLink[] = [];

  links.push({
    label: `${serviceDef.title} para todas las marcas`,
    href: `/servicios/${serviceSlug}`,
    icon: serviceDef.icon,
  });

  links.push({
    label: `Todos los servicios ${brandName}`,
    href: `/marcas/${brandSlug}`,
    icon: "ri-car-line",
  });

  Object.entries(SERVICE_DEFINITIONS)
    .filter(([slug]) => slug !== serviceSlug)
    .slice(0, 2)
    .forEach(([slug, def]) => {
      links.push({
        label: `${def.title} ${brandName}`,
        href: `/servicios/${slug}-${brandSlug}`,
        icon: def.icon,
      });
    });

  const relatedBrands = Object.keys(BRAND_NAMES)
    .filter((s) => s !== brandSlug)
    .slice(0, 2);
  relatedBrands.forEach((bs) => {
    links.push({
      label: `${serviceDef.title} ${BRAND_NAMES[bs]}`,
      href: `/servicios/${serviceSlug}-${bs}`,
      icon: serviceDef.icon,
    });
  });

  return links;
}

const ENHANCED_BRAND_FAQS: Record<string, { question: string; answer: string }[]> = {
  tesla: [
    { question: "¿Podéis hacer el mantenimiento de mi Tesla?", answer: "Sí. Ofrecemos mantenimiento preventivo para Tesla: revisión de frenos, neumáticos, suspensión, climatización y fluidos. Para intervenciones que requieran software Tesla o piezas específicas, recomendamos el servicio oficial." },
    { question: "¿Instaláis wallbox para Tesla?", answer: "Sí. Instalamos wallbox compatibles con Tesla (conector Tipo 2 / CCS) en domicilios y empresas. Gestionamos las ayudas del Plan MOVES para la instalación." },
    { question: "¿Cuánto cuesta el mantenimiento anual de un Tesla?", answer: "El mantenimiento preventivo de un Tesla parte desde 120€ anuales. Incluye revisión de frenos, rotación de neumáticos, revisión de suspensión, climatización y filtros. Los Tesla no necesitan cambio de aceite ni correa de distribución." },
    { question: "¿Reparáis problemas de suspensión neumática en Tesla Model S y X?", answer: "Sí. Nuestros técnicos están formados en sistemas de suspensión neumática adaptativa de Tesla Model S y Model X. Diagnosticamos fugas, compresores y amortiguadores neumáticos con equipamiento especializado." },
    { question: "¿Podéis hacer la alineación y equilibrado de un Tesla?", answer: "Sí. Disponemos de equipamiento de alineación 3D compatible con todos los modelos Tesla. La alineación correcta es especialmente importante en vehículos eléctricos por el peso de la batería y su efecto en el desgaste de neumáticos." },
  ],
  byd: [
    { question: "¿Podéis hacer mantenimiento de un BYD?", answer: "Sí. Ofrecemos mantenimiento preventivo y servicios complementarios para BYD: revisión de frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
    { question: "¿Instaláis punto de carga para BYD?", answer: "Sí. Todos los BYD utilizan conector CCS/Tipo 2 estándar. Instalamos wallbox compatibles con gestión de ayudas MOVES incluida." },
    { question: "¿Qué ventajas tiene la batería Blade de BYD?", answer: "La batería Blade de BYD utiliza química LFP (Litio-Hierro-Fosfato), que no contiene cobalto ni níquel. Es más segura (resistente al cortocircuito), tiene mayor vida útil (más de 3.000 ciclos) y mantiene mejor rendimiento en temperaturas extremas." },
    { question: "¿Cuánto dura la batería de un BYD?", answer: "Las baterías Blade de BYD están diseñadas para superar los 1.000.000 km. BYD ofrece garantía de batería de 8 años o 200.000 km. En nuestro taller monitorizamos el estado de salud (SOH) en cada revisión." },
    { question: "¿Es caro mantener un BYD Atto 3 o Dolphin?", answer: "No. El mantenimiento de un BYD es muy económico, desde 95€ anuales. Sin cambio de aceite ni filtros de combustible, los costes se reducen un 40% respecto a un vehículo de combustión equivalente." },
  ],
  hyundai: [
    { question: "¿Ofrecéis servicio para Hyundai IONIQ 5?", answer: "Sí. Nuestros técnicos certificados en alta tensión pueden realizar mantenimiento preventivo, revisión de frenos, neumáticos, suspensión y servicios complementarios para el IONIQ 5 y toda la gama eléctrica Hyundai." },
    { question: "¿Instaláis cargador para Hyundai eléctrico?", answer: "Sí. Los Hyundai eléctricos (IONIQ 5, IONIQ 6, Kona Electric) utilizan conector CCS/Tipo 2. Instalamos wallbox de hasta 22 kW con gestión de ayudas MOVES." },
    { question: "¿Qué ventaja tiene la arquitectura 800V de Hyundai?", answer: "La plataforma E-GMP de Hyundai (IONIQ 5, IONIQ 6) utiliza arquitectura de 800V que permite carga ultrarrápida: del 10 al 80% en solo 18 minutos en cargadores de 350 kW. También permite carga bidireccional V2L para alimentar dispositivos externos." },
    { question: "¿Cuánto cuesta el mantenimiento de un Hyundai IONIQ 5?", answer: "El mantenimiento anual del IONIQ 5 parte desde 110€. Incluye revisión de frenos, neumáticos, suspensión, filtro de habitáculo y diagnóstico electrónico. Es un 35% más económico que un SUV de combustión equivalente." },
    { question: "¿Reparáis el sistema de carga bidireccional V2L de Hyundai?", answer: "Sí. Diagnosticamos problemas con la función V2L (Vehicle-to-Load) del IONIQ 5 e IONIQ 6, incluyendo el adaptador, el inversor bidireccional y la gestión electrónica de energía." },
  ],
  bmw: [
    { question: "¿Hacéis mantenimiento de BMW eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para toda la gama eléctrica BMW: revisión de frenos, neumáticos, suspensión, climatización. Para intervenciones con software BMW, recomendamos el servicio oficial." },
    { question: "¿Instaláis wallbox para BMW?", answer: "Sí. Instalamos wallbox compatibles con todos los modelos BMW eléctricos e híbridos enchufables, con conector Tipo 2 estándar." },
    { question: "¿Cuánto cuesta mantener un BMW i4 o iX?", answer: "El mantenimiento preventivo de un BMW eléctrico parte desde 149€ anuales. Sin cambio de aceite ni filtros de combustible, el coste es un 30% inferior al de un BMW de combustión equivalente. Incluye diagnóstico electrónico completo." },
    { question: "¿Podéis revisar los sistemas ADAS de un BMW eléctrico?", answer: "Sí. Verificamos el funcionamiento de los sensores LiDAR, cámaras y radar de los sistemas de conducción asistida de BMW. Tras cualquier intervención en parabrisas o paragolpes, recalibramos los sistemas ADAS." },
    { question: "¿Reparáis problemas de carga en BMW eléctricos?", answer: "Sí. Diagnosticamos problemas de carga en AC y DC: verificamos el cargador a bordo, puerto de carga CCS, comunicación con estaciones de carga y configuración del BMW Charging. Resolvemos los errores más comunes de carga." },
  ],
  "mercedes-benz": [
    { question: "¿Hacéis mantenimiento de Mercedes-Benz eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para la gama EQ: revisión de frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
    { question: "¿Podéis instalar un cargador para Mercedes EQ?", answer: "Sí. Instalamos wallbox compatibles con todos los Mercedes-Benz EQ y híbridos enchufables (conector Tipo 2/CCS)." },
    { question: "¿Cuánto cuesta el mantenimiento de un Mercedes EQA o EQB?", answer: "El mantenimiento preventivo anual de un Mercedes EQA/EQB parte desde 159€. Incluye revisión de frenos con frenada regenerativa, neumáticos, suspensión, climatización y diagnóstico electrónico. Es un 25% más económico que un Mercedes de combustión equivalente." },
    { question: "¿Reparáis problemas en el sistema MBUX de Mercedes EQ?", answer: "Diagnosticamos problemas de conectividad, errores de pantalla y configuración del sistema MBUX. Para actualizaciones de firmware del sistema de infoentretenimiento, recomendamos el servicio oficial Mercedes-Benz." },
    { question: "¿Podéis calibrar los sistemas de conducción autónoma de Mercedes?", answer: "Sí. Verificamos y calibramos los sensores de los sistemas de asistencia DRIVE PILOT de Mercedes: cámaras estéreo, radar, LiDAR y sensores ultrasónicos. Calibración imprescindible tras sustitución de lunas o reparaciones de carrocería." },
  ],
  kia: [
    { question: "¿Ofrecéis servicio para Kia EV6?", answer: "Sí. Nuestros técnicos certificados en alta tensión ofrecen mantenimiento preventivo para Kia EV6: frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
    { question: "¿Instaláis punto de carga para Kia?", answer: "Sí. Los Kia eléctricos utilizan conector CCS/Tipo 2. Instalamos wallbox de hasta 22 kW con tramitación de ayudas MOVES incluida." },
    { question: "¿Es verdad que el Kia EV6 carga en 18 minutos?", answer: "Sí, del 10 al 80% en 18 minutos en cargadores de 350 kW gracias a su arquitectura de 800V. En carga doméstica con wallbox de 11 kW, la carga completa se realiza en aproximadamente 7 horas." },
    { question: "¿Cuánto cuesta mantener un Kia EV6 o EV9?", answer: "El mantenimiento preventivo anual del Kia EV6 parte desde 99€. Kia además ofrece 7 años de garantía de serie, la más generosa del mercado, con cobertura de batería de 8 años." },
    { question: "¿Reparáis el sistema de carga bidireccional V2L del Kia EV6?", answer: "Sí. El Kia EV6 y EV9 incluyen función V2L (Vehicle-to-Load) que permite alimentar dispositivos externos. Diagnosticamos problemas del adaptador V2L, inversor bidireccional y gestión de energía." },
  ],
  volvo: [
    { question: "¿Hacéis mantenimiento de Volvo eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para Volvo eléctricos e híbridos enchufables: frenos, neumáticos, suspensión, climatización. Para actualizaciones de software Volvo, recomendamos el servicio oficial." },
    { question: "¿Instaláis cargador para Volvo?", answer: "Sí. Los Volvo eléctricos utilizan conector CCS/Tipo 2 estándar. Instalamos wallbox de hasta 22 kW." },
    { question: "¿Cuánto cuesta el mantenimiento de un Volvo EX30 o EX40?", answer: "El mantenimiento preventivo anual de un Volvo eléctrico parte desde 129€. Incluye revisión de frenos con frenada regenerativa de un pedal, neumáticos, suspensión Volvo y diagnóstico electrónico completo." },
    { question: "¿Podéis recalibrar los sistemas de seguridad Volvo tras una reparación?", answer: "Sí. Recalibramos los sistemas de seguridad activa de Volvo (City Safety, Pilot Assist, cámaras 360°) tras cualquier intervención que afecte a sensores: sustitución de lunas, reparación de carrocería o reemplazo de paragolpes." },
  ],
  peugeot: [
    { question: "¿Hacéis mantenimiento de Peugeot eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para toda la gama eléctrica Peugeot: revisión de frenos, neumáticos, suspensión y climatización." },
    { question: "¿Instaláis punto de carga para Peugeot e-208?", answer: "Sí. El Peugeot e-208 utiliza conector CCS/Tipo 2 estándar. Instalamos wallbox desde 800€ con gestión de ayudas MOVES." },
    { question: "¿Cuánto cuesta mantener un Peugeot e-208 o e-2008?", answer: "El mantenimiento anual de un Peugeot eléctrico parte desde 89€. Es uno de los más económicos del mercado eléctrico. Sin cambio de aceite, la principal revisión incluye frenos, neumáticos, filtros de habitáculo y diagnóstico electrónico." },
    { question: "¿El Peugeot e-3008 necesita un mantenimiento especial?", answer: "El nuevo Peugeot e-3008 utiliza la plataforma STLA Medium con batería de hasta 98 kWh. El mantenimiento sigue siendo más sencillo que un combustión: revisión de frenos, neumáticos, fluido de refrigeración de batería y diagnóstico electrónico." },
  ],
  renault: [
    { question: "¿Hacéis mantenimiento de Renault eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para Renault Megane E-Tech, Scenic E-Tech y ZOE: frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
    { question: "¿Instaláis cargador para Renault ZOE?", answer: "Sí. El Renault ZOE utiliza conector Tipo 2 para carga en CA. Instalamos wallbox de hasta 22 kW compatible." },
    { question: "¿Cuánto cuesta mantener un Renault Megane E-Tech?", answer: "El mantenimiento anual del Renault Megane E-Tech parte desde 99€. La plataforma CMF-EV es muy eficiente en mantenimiento: sin correa de distribución, sin cambio de aceite motor, con intervalos de revisión cada 30.000 km." },
    { question: "¿Puede el Renault Scenic E-Tech cargar a más de 150 kW?", answer: "Sí. El Renault Scenic E-Tech con batería de 87 kWh admite carga rápida DC de hasta 150 kW, pasando del 15 al 80% en unos 30 minutos. Instalamos wallbox AC de 7,4 a 22 kW para carga doméstica nocturna." },
  ],
};

export function getEnhancedBrandFaqs(brandSlug: string): { question: string; answer: string }[] {
  return ENHANCED_BRAND_FAQS[brandSlug] || [];
}
