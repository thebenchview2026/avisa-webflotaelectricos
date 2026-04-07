import { SERVICE_DEFINITIONS, BRAND_NAMES, SERVICE_SLUGS } from "./servicios-data";

export const BRAND_SLUGS = Object.keys(BRAND_NAMES);

export interface BrandPillarData {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  highlights: { icon: string; title: string; description: string }[];
  electricModels: string[];
  faqs: { question: string; answer: string }[];
  dealers: string[];
}

const brandDetails: Record<string, Omit<BrandPillarData, "slug" | "name">> = {
  volkswagen: {
    tagline: "Concesionario oficial Volkswagen eléctrico en Sevilla",
    intro: "Grupo Avisa es tu concesionario oficial Volkswagen en Andalucía y Extremadura, especializado en la gama eléctrica ID. y los modelos híbridos enchufables del Grupo Volkswagen. Con más de 15 años como partner oficial, ofrecemos venta, postventa y todo el asesoramiento que necesitas para dar el salto a la movilidad eléctrica con Volkswagen. Nuestros técnicos certificados Volkswagen están formados específicamente en alta tensión y sistemas eléctricos para garantizar el mejor servicio para tu vehículo.",
    highlights: [
      { icon: "ri-award-line", title: "Concesionario oficial", description: "Partner oficial Volkswagen con más de 15 años de experiencia en la red del fabricante." },
      { icon: "ri-battery-charge-line", title: "Gama ID. completa", description: "ID.3, ID.4, ID.5 y ID.7: toda la familia eléctrica Volkswagen disponible en nuestras instalaciones." },
      { icon: "ri-tools-line", title: "Taller certificado EV", description: "Técnicos con certificación de alto voltaje para intervenir en todos los sistemas eléctricos Volkswagen." },
      { icon: "ri-government-line", title: "Gestión Plan MOVES", description: "Tramitamos todas las ayudas del Plan MOVES para tu Volkswagen eléctrico. Adelantamos el importe." },
    ],
    electricModels: ["ID.3", "ID.4", "ID.4 GTX", "ID.5", "ID.5 GTX", "ID.7", "ID.7 GTX", "ID.Buzz", "e-Golf"],
    faqs: [
      { question: "¿Qué modelos eléctricos Volkswagen tenéis disponibles?", answer: "Disponemos de toda la familia ID. de Volkswagen: ID.3 (compacto urbano), ID.4 y ID.4 GTX (SUV), ID.5 y ID.5 GTX (coupé SUV), ID.7 (berlina) e ID.Buzz (furgoneta eléctrica). Todos con etiqueta CERO y acceso a las ayudas del Plan MOVES." },
      { question: "¿En qué concesionarios puedo ver los Volkswagen eléctricos?", answer: "Puedes visitar nuestros Volkswagen eléctricos en Avisa Volkswagen Sevilla (C/ Alhami, 2-4) y en nuestras instalaciones de Dos Hermanas. Ofrecemos pruebas de conducción sin compromiso." },
      { question: "¿Cuánto cuesta mantener un Volkswagen eléctrico?", answer: "El mantenimiento de un Volkswagen eléctrico es hasta un 40% más económico que un vehículo de combustión. Sin cambios de aceite ni filtros de combustible, las revisiones son cada 30.000 km o 2 años." },
      { question: "¿Qué garantía tiene la batería del Volkswagen eléctrico?", answer: "Todos los modelos ID. de Volkswagen cuentan con garantía de batería de 8 años o 160.000 km, asegurando al menos el 70% de capacidad. Además, ofrecemos extensiones de garantía." },
    ],
    dealers: ["Avisa Volkswagen Sevilla", "Avisa Volkswagen Dos Hermanas"],
  },
  audi: {
    tagline: "Concesionario oficial Audi eléctrico en Sevilla",
    intro: "Grupo Avisa es tu concesionario oficial Audi en Sevilla, especializado en la gama e-tron y los modelos híbridos enchufables TFSI e. Ofrecemos la experiencia premium Audi con servicio postventa certificado para vehículos eléctricos e híbridos. Nuestros asesores comerciales y técnicos están formados en la tecnología eléctrica de Audi para brindarte un servicio a la altura de la marca.",
    highlights: [
      { icon: "ri-award-line", title: "Experiencia Audi premium", description: "Atención personalizada con los estándares de calidad Audi en ventas y postventa." },
      { icon: "ri-flashlight-line", title: "Gama e-tron completa", description: "Q4 e-tron, Q6 e-tron, Q8 e-tron y A6 e-tron disponibles para prueba de conducción." },
      { icon: "ri-shield-check-line", title: "Postventa certificado", description: "Taller oficial Audi con certificación de alto voltaje y equipamiento de diagnóstico específico." },
      { icon: "ri-charging-pile-line", title: "Ecosistema de carga Audi", description: "Asesoramiento en carga doméstica y acceso a la red de carga rápida Audi charging." },
    ],
    electricModels: ["Q4 e-tron", "Q4 Sportback e-tron", "Q6 e-tron", "Q8 e-tron", "Q8 Sportback e-tron", "A6 e-tron"],
    faqs: [
      { question: "¿Qué modelos eléctricos Audi están disponibles?", answer: "Disponemos de Q4 e-tron y Q4 Sportback e-tron, Q6 e-tron, Q8 e-tron y Q8 Sportback e-tron. Todos son 100% eléctricos con etiqueta CERO y acceso a las ayudas MOVES." },
      { question: "¿Dónde está el concesionario Audi de Grupo Avisa?", answer: "Avisa Audi Sevilla está en Av. Averroes, 12, 41020 Sevilla. Ofrecemos pruebas de conducción de toda la gama e-tron sin compromiso." },
      { question: "¿Qué garantía tiene un Audi eléctrico?", answer: "Los Audi eléctricos tienen garantía de 2 años sin límite de km y garantía de batería de 8 años o 160.000 km. Ofrecemos extensiones de garantía adicionales." },
      { question: "¿Cuánto se tarda en cargar un Audi e-tron?", answer: "Con carga rápida DC (150-270 kW según modelo), del 10% al 80% en 25-30 minutos. Con wallbox doméstico de 11 kW, carga completa en 6-8 horas (ideal durante la noche)." },
    ],
    dealers: ["Avisa Audi Sevilla"],
  },
  skoda: {
    tagline: "Concesionario oficial Škoda eléctrico en Andalucía y Extremadura",
    intro: "Cartuja Motor y Avisa Škoda conforman la mayor red de concesionarios oficiales Škoda en el sur de España, con presencia en Sevilla, Dos Hermanas, Huelva, Badajoz, Cáceres, Fuente de Cantos y Córdoba. Especializados en los modelos eléctricos Enyaq y el nuevo Elroq, ofrecemos la mejor relación calidad-precio en movilidad eléctrica con el respaldo de servicio postventa en 7 ubicaciones.",
    highlights: [
      { icon: "ri-map-pin-line", title: "7 concesionarios", description: "La red más amplia del sur de España: Sevilla, Dos Hermanas, Huelva, Badajoz, Cáceres, Fuente de Cantos y Córdoba." },
      { icon: "ri-money-euro-circle-line", title: "Mejor relación calidad-precio", description: "Škoda ofrece la tecnología del Grupo VW a precios más accesibles en toda su gama eléctrica." },
      { icon: "ri-car-line", title: "Enyaq y Elroq", description: "Los SUV eléctricos Škoda con hasta 560 km de autonomía y espacios interiores líderes en su segmento." },
      { icon: "ri-customer-service-line", title: "Cercanía", description: "Con 7 puntos de servicio, siempre tienes un taller Škoda oficial cerca para cualquier necesidad." },
    ],
    electricModels: ["Enyaq iV", "Enyaq Coupé iV", "Enyaq iV vRS", "Elroq"],
    faqs: [
      { question: "¿Dónde puedo comprar un Škoda eléctrico?", answer: "Tenemos 7 concesionarios Škoda en Andalucía y Extremadura: Cartuja Motor Sevilla, Cartuja Motor Dos Hermanas, Cartuja Motor Huelva, y Avisa Škoda en Badajoz, Cáceres, Fuente de Cantos y Córdoba." },
      { question: "¿Qué autonomía tiene el Škoda Enyaq?", answer: "El Škoda Enyaq iV ofrece hasta 560 km de autonomía WLTP en su versión de mayor batería (82 kWh). Es uno de los SUV eléctricos con mayor autonomía de su segmento." },
      { question: "¿El Škoda Elroq tiene ayudas MOVES?", answer: "Sí, el Škoda Elroq es 100% eléctrico con etiqueta CERO y acceso completo a las ayudas del Plan MOVES III. Gestionamos toda la tramitación sin coste." },
      { question: "¿Cuánto cuesta el mantenimiento de un Škoda eléctrico?", answer: "El mantenimiento de un Škoda eléctrico parte desde 89€ anuales. Es hasta un 40% más económico que un vehículo de combustión equivalente, con intervalos de revisión cada 30.000 km." },
    ],
    dealers: ["Cartuja Motor Sevilla", "Cartuja Motor Dos Hermanas", "Cartuja Motor Huelva", "Avisa Škoda Badajoz", "Avisa Škoda Cáceres", "Avisa Škoda Fuente de Cantos", "Avisa Škoda Córdoba"],
  },
  cupra: {
    tagline: "Servicio especializado CUPRA eléctrico en Sevilla",
    intro: "Grupo Avisa ofrece servicio postventa especializado para vehículos CUPRA eléctricos e híbridos enchufables en Sevilla. Como parte del Grupo Volkswagen, nuestros técnicos certificados conocen a fondo la plataforma MEB compartida con los modelos ID. El CUPRA Born y el CUPRA Tavascan representan la vertiente más deportiva de la movilidad eléctrica, y en Grupo Avisa estamos preparados para dar el mejor servicio.",
    highlights: [
      { icon: "ri-speed-line", title: "Deportividad eléctrica", description: "CUPRA combina prestaciones deportivas con la eficiencia de la movilidad eléctrica." },
      { icon: "ri-tools-line", title: "Plataforma MEB", description: "Nuestros técnicos dominan la plataforma MEB compartida con Volkswagen ID., base del Born y Tavascan." },
      { icon: "ri-flashlight-line", title: "Rendimiento extremo", description: "CUPRA Born VZ con 326 CV y aceleración 0-100 en 5,6 segundos. Servicio técnico a la altura." },
      { icon: "ri-shield-check-line", title: "Garantía Grupo VW", description: "Todos los CUPRA cuentan con la garantía y respaldo del Grupo Volkswagen." },
    ],
    electricModels: ["Born", "Born VZ", "Tavascan", "Tavascan VZ", "Leon e-Hybrid", "Formentor e-Hybrid"],
    faqs: [
      { question: "¿Tenéis servicio postventa para CUPRA eléctrico?", answer: "Sí. Al compartir plataforma MEB con Volkswagen, nuestros técnicos certificados pueden realizar todas las intervenciones de mantenimiento y reparación en CUPRA Born y Tavascan." },
      { question: "¿El CUPRA Born puede acceder al Plan MOVES?", answer: "Sí, el CUPRA Born es 100% eléctrico con etiqueta CERO. Puede acceder a todas las ayudas del Plan MOVES III con hasta 7.000€ de ayuda." },
      { question: "¿Qué autonomía tiene el CUPRA Born?", answer: "El CUPRA Born ofrece hasta 548 km WLTP con la batería de 77 kWh. Soporta carga rápida de hasta 185 kW, pasando del 10% al 80% en unos 25 minutos." },
    ],
    dealers: [],
  },
  seat: {
    tagline: "Servicio especializado SEAT híbrido enchufable en Sevilla",
    intro: "Grupo Avisa proporciona servicio postventa certificado para vehículos SEAT híbridos enchufables en Sevilla y Andalucía. Los modelos SEAT e-Hybrid comparten tecnología con el Grupo Volkswagen, lo que nos permite ofrecer un servicio técnico de primer nivel con nuestros técnicos certificados en sistemas híbridos enchufables.",
    highlights: [
      { icon: "ri-leaf-line", title: "Híbridos enchufables", description: "SEAT Leon y Tarraco e-Hybrid con etiqueta CERO y hasta 60 km en modo eléctrico." },
      { icon: "ri-tools-line", title: "Servicio certificado", description: "Técnicos formados en sistemas híbridos enchufables de la plataforma MQB evo del Grupo VW." },
      { icon: "ri-government-line", title: "Ayudas MOVES", description: "Los SEAT e-Hybrid acceden a las ayudas del Plan MOVES III. Gestionamos la tramitación completa." },
      { icon: "ri-money-euro-circle-line", title: "Coste reducido", description: "El mantenimiento de un SEAT e-Hybrid es más económico gracias a la menor exigencia del sistema de frenado." },
    ],
    electricModels: ["Leon e-Hybrid", "Tarraco e-Hybrid"],
    faqs: [
      { question: "¿Tenéis servicio para SEAT híbridos enchufables?", answer: "Sí. Nuestros técnicos están certificados para intervenir en los sistemas híbridos enchufables de SEAT Leon y Tarraco e-Hybrid, que comparten plataforma con el Grupo Volkswagen." },
      { question: "¿Los SEAT e-Hybrid tienen etiqueta CERO?", answer: "Sí. Los SEAT Leon e-Hybrid y Tarraco e-Hybrid tienen etiqueta CERO de la DGT al superar los 40 km de autonomía eléctrica, accediendo a todas las ventajas." },
      { question: "¿Cada cuánto necesita mantenimiento un SEAT e-Hybrid?", answer: "Los SEAT e-Hybrid necesitan revisión cada 15.000 km o 1 año. El mantenimiento incluye verificación del sistema de batería de alto voltaje además de los componentes convencionales." },
    ],
    dealers: [],
  },
  tesla: {
    tagline: "Servicio técnico multimarca para Tesla en Sevilla",
    intro: "Grupo Avisa ofrece servicio técnico multimarca para vehículos Tesla en Sevilla. Aunque no somos concesionario oficial Tesla, nuestros técnicos certificados en alta tensión pueden realizar mantenimiento preventivo, revisiones de suspensión, frenos, neumáticos y servicios complementarios para propietarios de Tesla Model 3, Model Y, Model S y Model X que buscan un servicio de confianza cercano.",
    highlights: [
      { icon: "ri-flashlight-line", title: "Técnicos alta tensión", description: "Certificación en sistemas de alto voltaje para intervenir de forma segura en vehículos Tesla." },
      { icon: "ri-car-washing-line", title: "Mantenimiento preventivo", description: "Revisión de frenos, suspensión, neumáticos, climatización y fluidos para tu Tesla." },
      { icon: "ri-map-pin-line", title: "Servicio de cercanía", description: "Una alternativa de confianza en Sevilla para el mantenimiento de tu Tesla sin desplazamientos." },
      { icon: "ri-charging-pile-line", title: "Asesoramiento de carga", description: "Te ayudamos con la instalación del wallbox doméstico compatible con tu Tesla." },
    ],
    electricModels: ["Model 3", "Model Y", "Model S", "Model X"],
    faqs: [
      { question: "¿Podéis hacer el mantenimiento de mi Tesla?", answer: "Sí. Ofrecemos mantenimiento preventivo para Tesla: revisión de frenos, neumáticos, suspensión, climatización y fluidos. Para intervenciones que requieran software Tesla o piezas específicas, recomendamos el servicio oficial." },
      { question: "¿Instaláis wallbox para Tesla?", answer: "Sí. Instalamos wallbox compatibles con Tesla (conector Tipo 2 / CCS) en domicilios y empresas. Gestionamos las ayudas del Plan MOVES para la instalación." },
    ],
    dealers: [],
  },
  byd: {
    tagline: "Servicio técnico para BYD eléctrico en Sevilla",
    intro: "Grupo Avisa proporciona servicio técnico multimarca para vehículos BYD eléctricos en Andalucía. Con la creciente presencia de BYD en el mercado español (Atto 3, Dolphin, Seal), nuestros técnicos certificados en alta tensión están preparados para ofrecer mantenimiento y servicios complementarios a los propietarios de esta marca china líder en movilidad eléctrica.",
    highlights: [
      { icon: "ri-global-line", title: "Líder mundial en EV", description: "BYD es el mayor fabricante mundial de vehículos eléctricos. Nuestros técnicos conocen su tecnología." },
      { icon: "ri-battery-charge-line", title: "Tecnología Blade Battery", description: "Conocemos la tecnología de batería LFP Blade de BYD, una de las más seguras y duraderas del mercado." },
      { icon: "ri-money-euro-circle-line", title: "Precios competitivos", description: "Mantenimiento a precios competitivos para propietarios de BYD que buscan un servicio de confianza." },
      { icon: "ri-charging-pile-line", title: "Instalación de carga", description: "Instalamos wallbox compatibles con todos los modelos BYD en Andalucía y Extremadura." },
    ],
    electricModels: ["Atto 3", "Dolphin", "Seal", "Seal U", "Tang EV"],
    faqs: [
      { question: "¿Podéis hacer mantenimiento de un BYD?", answer: "Sí. Ofrecemos mantenimiento preventivo y servicios complementarios para BYD: revisión de frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
      { question: "¿Instaláis punto de carga para BYD?", answer: "Sí. Todos los BYD utilizan conector CCS/Tipo 2 estándar. Instalamos wallbox compatibles con gestión de ayudas MOVES incluida." },
    ],
    dealers: [],
  },
  hyundai: {
    tagline: "Servicio técnico para Hyundai eléctrico e híbrido en Sevilla",
    intro: "Grupo Avisa ofrece servicio técnico multimarca para vehículos Hyundai eléctricos e híbridos en Sevilla. Los Hyundai IONIQ 5, IONIQ 6 y Kona Electric son referentes en el mercado eléctrico, y nuestros técnicos certificados en alta tensión están preparados para ofrecer mantenimiento, diagnóstico y servicios de carga a sus propietarios.",
    highlights: [
      { icon: "ri-speed-line", title: "Plataforma E-GMP", description: "Conocemos la plataforma E-GMP de Hyundai (IONIQ 5, 6) con carga ultrarrápida de 800V." },
      { icon: "ri-flashlight-line", title: "Carga 800V", description: "Los Hyundai eléctricos soportan carga ultrarrápida a 800V. Te asesoramos sobre infraestructura de carga." },
      { icon: "ri-car-washing-line", title: "Mantenimiento integral", description: "Revisión completa de frenos, suspensión, neumáticos, climatización y sistemas eléctricos." },
      { icon: "ri-charging-pile-line", title: "Wallbox doméstico", description: "Instalación de punto de carga optimizado para tu Hyundai con gestión de ayudas MOVES." },
    ],
    electricModels: ["IONIQ 5", "IONIQ 6", "Kona Electric", "Tucson Hybrid", "Santa Fe Hybrid"],
    faqs: [
      { question: "¿Ofrecéis servicio para Hyundai IONIQ 5?", answer: "Sí. Nuestros técnicos certificados en alta tensión pueden realizar mantenimiento preventivo, revisión de frenos, neumáticos, suspensión y servicios complementarios para el IONIQ 5 y toda la gama eléctrica Hyundai." },
      { question: "¿Instaláis cargador para Hyundai eléctrico?", answer: "Sí. Los Hyundai eléctricos (IONIQ 5, IONIQ 6, Kona Electric) utilizan conector CCS/Tipo 2. Instalamos wallbox de hasta 22 kW con gestión de ayudas MOVES." },
    ],
    dealers: [],
  },
  bmw: {
    tagline: "Servicio técnico para BMW eléctrico en Sevilla",
    intro: "Grupo Avisa proporciona servicio técnico multimarca para vehículos BMW eléctricos e híbridos enchufables en Sevilla. Los BMW iX, i4, i5, i7 e iX1 representan la apuesta premium de BMW por la movilidad eléctrica, y nuestros técnicos certificados en alta tensión ofrecen mantenimiento preventivo y servicios complementarios.",
    highlights: [
      { icon: "ri-award-line", title: "Premium eléctrico", description: "BMW combina lujo, prestaciones y tecnología eléctrica avanzada en toda su gama i." },
      { icon: "ri-flashlight-line", title: "Alta tensión certificada", description: "Técnicos con certificación para intervenir en los sistemas de alta tensión de BMW." },
      { icon: "ri-car-washing-line", title: "Servicio integral", description: "Mantenimiento preventivo completo: frenos, neumáticos, suspensión, climatización." },
      { icon: "ri-charging-pile-line", title: "Carga doméstica", description: "Instalación de wallbox compatible con BMW Flexible Charger y otros sistemas." },
    ],
    electricModels: ["iX", "iX1", "iX3", "i4", "i5", "i7", "330e", "X5 xDrive45e"],
    faqs: [
      { question: "¿Hacéis mantenimiento de BMW eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para toda la gama eléctrica BMW: revisión de frenos, neumáticos, suspensión, climatización. Para intervenciones con software BMW, recomendamos el servicio oficial." },
      { question: "¿Instaláis wallbox para BMW?", answer: "Sí. Instalamos wallbox compatibles con todos los modelos BMW eléctricos e híbridos enchufables, con conector Tipo 2 estándar." },
    ],
    dealers: [],
  },
  "mercedes-benz": {
    tagline: "Servicio técnico para Mercedes-Benz eléctrico en Sevilla",
    intro: "Grupo Avisa ofrece servicio técnico multimarca para vehículos Mercedes-Benz eléctricos e híbridos enchufables en Sevilla. La gama EQ de Mercedes-Benz (EQA, EQB, EQE, EQS) representa lo mejor de la movilidad eléctrica premium, y nuestros técnicos certificados en alta tensión pueden ofrecer mantenimiento preventivo y servicios complementarios.",
    highlights: [
      { icon: "ri-award-line", title: "Lujo eléctrico", description: "Mercedes-Benz EQ combina el lujo clásico de la marca con la tecnología eléctrica más avanzada." },
      { icon: "ri-flashlight-line", title: "Técnicos certificados", description: "Certificación en alta tensión para intervenir de forma segura en vehículos Mercedes-Benz EQ." },
      { icon: "ri-car-washing-line", title: "Mantenimiento preventivo", description: "Revisión integral de frenos, suspensión, neumáticos y sistemas de climatización." },
      { icon: "ri-charging-pile-line", title: "Infraestructura de carga", description: "Instalación de wallbox y asesoramiento sobre la red Mercedes me Charge." },
    ],
    electricModels: ["EQA", "EQB", "EQE", "EQE SUV", "EQS", "EQS SUV", "C 300 e", "GLC 300 e"],
    faqs: [
      { question: "¿Hacéis mantenimiento de Mercedes-Benz eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para la gama EQ: revisión de frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
      { question: "¿Podéis instalar un cargador para Mercedes EQ?", answer: "Sí. Instalamos wallbox compatibles con todos los Mercedes-Benz EQ y híbridos enchufables (conector Tipo 2/CCS)." },
    ],
    dealers: [],
  },
  kia: {
    tagline: "Servicio técnico para Kia eléctrico en Sevilla",
    intro: "Grupo Avisa proporciona servicio técnico multimarca para vehículos Kia eléctricos e híbridos en Sevilla. El Kia EV6 (Coche del Año en Europa 2022) y el nuevo EV9 representan una oferta eléctrica muy competitiva, y nuestros técnicos certificados en alta tensión ofrecen mantenimiento y servicios complementarios para propietarios de Kia.",
    highlights: [
      { icon: "ri-trophy-line", title: "Coche del Año Europa", description: "El Kia EV6 fue premiado como Coche del Año en Europa 2022. Servicio técnico a la altura." },
      { icon: "ri-speed-line", title: "Plataforma E-GMP 800V", description: "Kia EV6 y EV9 con arquitectura de 800V para carga ultrarrápida del 10% al 80% en 18 minutos." },
      { icon: "ri-shield-check-line", title: "7 años de garantía", description: "Kia ofrece 7 años de garantía de serie, la más amplia del mercado." },
      { icon: "ri-charging-pile-line", title: "Instalación de carga", description: "Wallbox doméstico compatible con Kia EV6, EV9 y Niro EV con gestión de ayudas MOVES." },
    ],
    electricModels: ["EV6", "EV6 GT", "EV9", "Niro EV", "Niro PHEV", "Sportage PHEV"],
    faqs: [
      { question: "¿Ofrecéis servicio para Kia EV6?", answer: "Sí. Nuestros técnicos certificados en alta tensión ofrecen mantenimiento preventivo para Kia EV6: frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
      { question: "¿Instaláis punto de carga para Kia?", answer: "Sí. Los Kia eléctricos utilizan conector CCS/Tipo 2. Instalamos wallbox de hasta 22 kW con tramitación de ayudas MOVES incluida." },
    ],
    dealers: [],
  },
  volvo: {
    tagline: "Servicio técnico para Volvo eléctrico en Sevilla",
    intro: "Grupo Avisa ofrece servicio técnico multimarca para vehículos Volvo eléctricos e híbridos enchufables en Sevilla. Volvo, con su compromiso de ser una marca 100% eléctrica en 2030, ofrece modelos como el EX30, EX40 y EX90. Nuestros técnicos certificados en alta tensión están preparados para el mantenimiento preventivo de estos vehículos.",
    highlights: [
      { icon: "ri-shield-check-line", title: "Seguridad escandinava", description: "Volvo es sinónimo de seguridad. Nuestros técnicos mantienen los sistemas ADAS en condiciones óptimas." },
      { icon: "ri-leaf-line", title: "100% eléctrico en 2030", description: "Volvo será marca 100% eléctrica en 2030. EX30, EX40 y EX90 son los primeros pasos." },
      { icon: "ri-car-washing-line", title: "Mantenimiento integral", description: "Revisión de frenos, suspensión, neumáticos y climatización para toda la gama Volvo eléctrica." },
      { icon: "ri-charging-pile-line", title: "Carga doméstica", description: "Instalación de wallbox compatible con todos los Volvo eléctricos e híbridos enchufables." },
    ],
    electricModels: ["EX30", "EX40 (XC40 Recharge)", "EC40 (C40 Recharge)", "EX90", "XC60 T8 PHEV", "XC90 T8 PHEV"],
    faqs: [
      { question: "¿Hacéis mantenimiento de Volvo eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para Volvo eléctricos e híbridos enchufables: frenos, neumáticos, suspensión, climatización. Para actualizaciones de software Volvo, recomendamos el servicio oficial." },
      { question: "¿Instaláis cargador para Volvo?", answer: "Sí. Los Volvo eléctricos utilizan conector CCS/Tipo 2 estándar. Instalamos wallbox de hasta 22 kW." },
    ],
    dealers: [],
  },
  peugeot: {
    tagline: "Servicio técnico para Peugeot eléctrico en Sevilla",
    intro: "Grupo Avisa proporciona servicio técnico multimarca para vehículos Peugeot eléctricos e híbridos enchufables en Sevilla. Los e-208, e-2008, e-308 y e-3008 representan la estrategia de electrificación de Peugeot. Nuestros técnicos certificados en alta tensión ofrecen mantenimiento preventivo y servicios complementarios.",
    highlights: [
      { icon: "ri-car-line", title: "Gama e- completa", description: "Peugeot ofrece versión eléctrica de prácticamente toda su gama: e-208, e-2008, e-308, e-3008." },
      { icon: "ri-money-euro-circle-line", title: "Precio accesible", description: "Los Peugeot eléctricos ofrecen una entrada accesible a la movilidad eléctrica premium." },
      { icon: "ri-car-washing-line", title: "Mantenimiento preventivo", description: "Revisión integral de frenos, suspensión, neumáticos y climatización para Peugeot eléctricos." },
      { icon: "ri-charging-pile-line", title: "Carga doméstica", description: "Instalación de wallbox compatible con todos los Peugeot eléctricos." },
    ],
    electricModels: ["e-208", "e-2008", "e-308", "e-3008", "e-5008", "3008 Hybrid", "508 Hybrid"],
    faqs: [
      { question: "¿Hacéis mantenimiento de Peugeot eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para toda la gama eléctrica Peugeot: revisión de frenos, neumáticos, suspensión y climatización." },
      { question: "¿Instaláis punto de carga para Peugeot e-208?", answer: "Sí. El Peugeot e-208 utiliza conector CCS/Tipo 2 estándar. Instalamos wallbox desde 800€ con gestión de ayudas MOVES." },
    ],
    dealers: [],
  },
  renault: {
    tagline: "Servicio técnico para Renault eléctrico en Sevilla",
    intro: "Grupo Avisa ofrece servicio técnico multimarca para vehículos Renault eléctricos en Sevilla. Renault es pionero en movilidad eléctrica con el ZOE, y ahora con el Megane E-Tech y el Scenic E-Tech. Nuestros técnicos certificados en alta tensión proporcionan mantenimiento preventivo y servicios complementarios para propietarios de Renault eléctricos.",
    highlights: [
      { icon: "ri-history-line", title: "Pionero eléctrico", description: "Renault fue pionero en movilidad eléctrica con el ZOE. Más de 10 años de experiencia en EV." },
      { icon: "ri-car-line", title: "Nueva generación", description: "Megane E-Tech y Scenic E-Tech: la nueva generación eléctrica de Renault con plataforma CMF-EV." },
      { icon: "ri-car-washing-line", title: "Mantenimiento preventivo", description: "Revisión completa de frenos, suspensión, neumáticos y climatización para Renault eléctricos." },
      { icon: "ri-charging-pile-line", title: "Carga doméstica", description: "Instalación de wallbox compatible con todos los Renault eléctricos." },
    ],
    electricModels: ["Megane E-Tech Electric", "Scenic E-Tech Electric", "ZOE", "Captur E-Tech PHEV", "Arkana E-Tech Hybrid"],
    faqs: [
      { question: "¿Hacéis mantenimiento de Renault eléctricos?", answer: "Sí. Ofrecemos mantenimiento preventivo para Renault Megane E-Tech, Scenic E-Tech y ZOE: frenos, neumáticos, suspensión, climatización e instalación de wallbox." },
      { question: "¿Instaláis cargador para Renault ZOE?", answer: "Sí. El Renault ZOE utiliza conector Tipo 2 para carga en CA. Instalamos wallbox de hasta 22 kW compatible." },
    ],
    dealers: [],
  },
};

export function getBrandPillarData(slug: string): BrandPillarData | null {
  const name = BRAND_NAMES[slug];
  if (!name) return null;
  const details = brandDetails[slug];
  if (!details) return null;
  return { slug, name, ...details };
}

export function getAllBrandSlugs(): string[] {
  return Object.keys(BRAND_NAMES);
}

export function getBrandServices(brandSlug: string) {
  return Object.entries(SERVICE_DEFINITIONS).map(([serviceSlug, def]) => ({
    serviceSlug,
    title: def.title,
    icon: def.icon,
    url: `/servicios/${serviceSlug}-${brandSlug}`,
    description: def.intro(BRAND_NAMES[brandSlug] || brandSlug).substring(0, 160) + "...",
  }));
}

export function getRelatedBrands(currentSlug: string, limit = 6): { slug: string; name: string }[] {
  return Object.entries(BRAND_NAMES)
    .filter(([slug]) => slug !== currentSlug)
    .slice(0, limit)
    .map(([slug, name]) => ({ slug, name }));
}
