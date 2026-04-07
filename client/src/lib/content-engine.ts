import { BRAND_NAMES } from "./servicios-data";
import { OFFICIAL_BRANDS } from "./entity-data";

const CITY = "Sevilla";
const REGION = "Andalucía y Extremadura";

export interface BrandTechProfile {
  platform: string;
  batteryChemistry: string;
  voltageArchitecture: string;
  chargingProtocol: string;
  maxChargingPower: string;
  regenerativeBraking: string;
  thermalManagement: string;
  obd2Access: string;
  softwareUpdateMethod: string;
  certificationLevel: string;
}

export interface BrandCommonProblem {
  title: string;
  description: string;
  icon: string;
  severity: "alta" | "media" | "baja";
}

export interface ServiceBrandSpecialization {
  heading: string;
  paragraphs: string[];
  techHighlights: { label: string; value: string }[];
}

export interface UniquePageContent {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  introHeading: string;
  introParagraph: string;
  specialization: ServiceBrandSpecialization;
  commonProblems: BrandCommonProblem[];
  technologySection: { heading: string; intro: string; specs: { label: string; value: string; icon: string }[] };
  uniqueFaqs: { question: string; answer: string }[];
  ctaHeading: string;
  ctaSubheading: string;
}

const brandTechProfiles: Record<string, BrandTechProfile> = {
  volkswagen: {
    platform: "MEB (Modular Electric Drive Matrix)",
    batteryChemistry: "NMC 811 (Níquel-Manganeso-Cobalto)",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 170 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "170 kW en corriente continua",
    regenerativeBraking: "Multinivel con modo B y paddles en volante (familia ID.)",
    thermalManagement: "Sistema de refrigeración líquida con bomba de calor integrada",
    obd2Access: "ODIS (sistema de diagnóstico oficial Volkswagen)",
    softwareUpdateMethod: "OTA (Over-The-Air) vía We Connect ID.",
    certificationLevel: "Concesionario oficial — técnicos certificados por Volkswagen Academy",
  },
  audi: {
    platform: "MLB evo / PPE (Premium Platform Electric)",
    batteryChemistry: "NMC 811 con carcasa de aluminio",
    voltageArchitecture: "400V (e-tron) / 800V (e-tron GT, Q6 e-tron)",
    chargingProtocol: "CCS Combo 2 hasta 270 kW DC / Tipo 2 hasta 22 kW AC",
    maxChargingPower: "270 kW en corriente continua (e-tron GT)",
    regenerativeBraking: "Sistema de recuperación electrohidráulico con tres niveles configurables",
    thermalManagement: "Circuito de refrigeración de 4 vías con bomba de calor y válvula de expansión electrónica",
    obd2Access: "VAS 6150 con ODIS-S y ODIS-E para diagnóstico de alta tensión",
    softwareUpdateMethod: "OTA vía myAudi app + actualizaciones en taller",
    certificationLevel: "Concesionario oficial — certificación Audi HV (Alto Voltaje) nivel 3",
  },
  skoda: {
    platform: "MEB (compartida con Grupo Volkswagen)",
    batteryChemistry: "NMC 622 / NMC 811 según modelo",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 135 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "135 kW en corriente continua",
    regenerativeBraking: "Modo B activable con selector de marchas + paddles opcionales",
    thermalManagement: "Refrigeración líquida con bomba de calor opcional",
    obd2Access: "ODIS (diagnóstico oficial del Grupo Volkswagen)",
    softwareUpdateMethod: "OTA parcial + actualizaciones completas en taller autorizado",
    certificationLevel: "Concesionario oficial — técnicos certificados Škoda Academy",
  },
  cupra: {
    platform: "MEB (Born) / plataforma CMP para híbridos",
    batteryChemistry: "NMC 811 (Born) / LFP en versiones de acceso",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 170 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "170 kW en corriente continua (Born VZ)",
    regenerativeBraking: "Regeneración dinámica con integración en control de estabilidad",
    thermalManagement: "Refrigeración líquida con gestión térmica deportiva optimizada",
    obd2Access: "ODIS (diagnóstico del Grupo Volkswagen) + CUPRA Service App",
    softwareUpdateMethod: "OTA vía MyCUPRA App",
    certificationLevel: "Servicio multimarca — técnicos con formación en plataforma MEB",
  },
  seat: {
    platform: "Plataforma CMP / eCMP para modelos eléctricos urbanos",
    batteryChemistry: "NMC para PHEV / LFP previsto para modelos urbanos",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 100 kW DC / Tipo 2 hasta 7,4 kW AC",
    maxChargingPower: "100 kW en corriente continua",
    regenerativeBraking: "Sistema de regeneración estándar con modo eco",
    thermalManagement: "Refrigeración líquida con gestión térmica integrada",
    obd2Access: "ODIS (diagnóstico del Grupo Volkswagen)",
    softwareUpdateMethod: "Actualizaciones en taller autorizado",
    certificationLevel: "Servicio multimarca — técnicos con certificación del Grupo Volkswagen",
  },
  tesla: {
    platform: "Plataforma propietaria Tesla (skateboard)",
    batteryChemistry: "NCA (Model S/X) / LFP (Model 3 SR+) / 4680 (Model Y Performance)",
    voltageArchitecture: "400V (Model 3/Y) / 400V (Model S/X Plaid)",
    chargingProtocol: "CCS Combo 2 (NACS adaptado UE) hasta 250 kW Supercharger V3",
    maxChargingPower: "250 kW en Supercharger V3",
    regenerativeBraking: "One Pedal Driving con regeneración máxima integrada",
    thermalManagement: "Super Manifold (8 válvulas de control, octovalve) con bomba de calor",
    obd2Access: "Diagnóstico vía Toolbox Tesla (acceso limitado) + OBD2 con adaptadores especializados",
    softwareUpdateMethod: "OTA completo vía WiFi — todas las actualizaciones son inalámbricas",
    certificationLevel: "Servicio multimarca — técnicos con formación específica en arquitectura Tesla",
  },
  byd: {
    platform: "e-Platform 3.0 (Blade Battery integrada)",
    batteryChemistry: "LFP Blade Battery (Litio Ferro Fosfato) — máxima seguridad",
    voltageArchitecture: "400V / 800V (modelos premium)",
    chargingProtocol: "CCS Combo 2 hasta 150 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "150 kW en corriente continua",
    regenerativeBraking: "Sistema de regeneración con ajuste gradual en pantalla central",
    thermalManagement: "Sistema de gestión térmica directa con bomba de calor",
    obd2Access: "Herramienta de diagnóstico BYD DiLink + adaptadores OBD2 universales",
    softwareUpdateMethod: "OTA vía BYD App + actualizaciones en servicio autorizado",
    certificationLevel: "Servicio multimarca — técnicos con formación en tecnología BYD Blade Battery",
  },
  hyundai: {
    platform: "E-GMP (Electric Global Modular Platform)",
    batteryChemistry: "NMC 811 con módulos de celdas bolsa (pouch cells)",
    voltageArchitecture: "800V (IONIQ 5/6) — carga ultrarrápida",
    chargingProtocol: "CCS Combo 2 hasta 240 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "240 kW con arquitectura de 800V nativa",
    regenerativeBraking: "i-Pedal (One Pedal) + paddles de regeneración con 4 niveles",
    thermalManagement: "Sistema de refrigeración líquida con preacondicionamiento de batería para carga rápida",
    obd2Access: "GDS (Global Diagnostic System) de Hyundai",
    softwareUpdateMethod: "OTA vía Bluelink + actualizaciones críticas en taller",
    certificationLevel: "Servicio multimarca — técnicos con formación específica en plataforma E-GMP",
  },
  bmw: {
    platform: "CLAR (Cluster Architecture) / Neue Klasse (nueva generación)",
    batteryChemistry: "NMC 811 cilíndricas de alta densidad energética",
    voltageArchitecture: "400V (iX3, i4, iX) / 800V (Neue Klasse)",
    chargingProtocol: "CCS Combo 2 hasta 200 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "200 kW en corriente continua (iX xDrive50)",
    regenerativeBraking: "Adaptive Recovery con modo «fuerte» para conducción con un pedal",
    thermalManagement: "Sistema de refrigeración directa de celdas con bomba de calor de 5.ª generación",
    obd2Access: "ISTA+ (Integrated Service Technical Application) de BMW",
    softwareUpdateMethod: "OTA vía BMW Connected Drive + actualizaciones en taller",
    certificationLevel: "Servicio multimarca — técnicos con formación específica en electrificación BMW",
  },
  "mercedes-benz": {
    platform: "EVA2 (Electric Vehicle Architecture) / MMA (próxima generación)",
    batteryChemistry: "NMC 811 con celdas prismáticas CATL",
    voltageArchitecture: "400V (EQA, EQB) / 400V modular (EQS, EQE)",
    chargingProtocol: "CCS Combo 2 hasta 200 kW DC / Tipo 2 hasta 22 kW AC",
    maxChargingPower: "200 kW en corriente continua (EQS 450+)",
    regenerativeBraking: "Recuperación inteligente con radar de distancia DAuto (ajuste automático)",
    thermalManagement: "Circuito de refrigeración de doble circuito con bomba de calor y preacondicionamiento",
    obd2Access: "XENTRY Diagnosis de Mercedes-Benz (Star Diagnosis)",
    softwareUpdateMethod: "OTA vía Mercedes me connect + actualizaciones de mapas y funciones",
    certificationLevel: "Servicio multimarca — técnicos con formación en sistemas EQ de Mercedes-Benz",
  },
  kia: {
    platform: "E-GMP (compartida con Hyundai Motor Group)",
    batteryChemistry: "NMC 811 con módulos pouch cells de SK Innovation",
    voltageArchitecture: "800V (EV6, EV9) — carga de 10-80% en 18 minutos",
    chargingProtocol: "CCS Combo 2 hasta 240 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "240 kW en corriente continua (EV6 GT)",
    regenerativeBraking: "Paddles con 4 niveles de regeneración + modo i-Pedal",
    thermalManagement: "Sistema integrado de gestión térmica con preacondicionamiento inteligente",
    obd2Access: "KDS (Kia Diagnostic System)",
    softwareUpdateMethod: "OTA vía Kia Connect + actualizaciones en taller",
    certificationLevel: "Servicio multimarca — técnicos con formación en plataforma E-GMP",
  },
  volvo: {
    platform: "SPA2 (Scalable Product Architecture) / SEA de Geely",
    batteryChemistry: "NMC con tecnología CATL / LFP en modelos de acceso",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 200 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "200 kW en corriente continua (EX90)",
    regenerativeBraking: "One Pedal Drive con niveles configurables vía pantalla central",
    thermalManagement: "Bomba de calor integrada con preacondicionamiento de batería",
    obd2Access: "VIDA (Vehicle Information and Diagnostics for Aftersales)",
    softwareUpdateMethod: "OTA completo vía Android Automotive OS integrado",
    certificationLevel: "Servicio multimarca — técnicos con formación en sistemas Volvo Recharge",
  },
  peugeot: {
    platform: "eCMP / eVMP (Stellantis multi-energy platforms)",
    batteryChemistry: "NMC 523 con módulos CATL",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 100 kW DC / Tipo 2 hasta 11 kW AC",
    maxChargingPower: "100 kW en corriente continua (e-208, e-2008, e-308)",
    regenerativeBraking: "Modo B con palanca de cambios + modo eco regenerativo",
    thermalManagement: "Sistema de refrigeración líquida con gestión térmica integrada",
    obd2Access: "DiagBox (herramienta de diagnóstico oficial de Stellantis)",
    softwareUpdateMethod: "Actualizaciones en taller + OTA parcial vía MyPeugeot App",
    certificationLevel: "Servicio multimarca — técnicos con formación en plataformas Stellantis EV",
  },
  renault: {
    platform: "CMF-EV (plataforma eléctrica nativa de Renault-Nissan-Mitsubishi)",
    batteryChemistry: "NMC 622 con módulos LG Energy Solution",
    voltageArchitecture: "400V",
    chargingProtocol: "CCS Combo 2 hasta 130 kW DC / Tipo 2 hasta 22 kW AC",
    maxChargingPower: "130 kW en corriente continua (Megane E-Tech Electric)",
    regenerativeBraking: "Multi-sense con modo «B» y 3 niveles de regeneración via paddles",
    thermalManagement: "Bomba de calor de alta eficiencia con preacondicionamiento de batería a distancia",
    obd2Access: "CLIP (herramienta de diagnóstico oficial Renault) + CAN Clip",
    softwareUpdateMethod: "OTA vía MY Renault App + actualizaciones completas en taller",
    certificationLevel: "Servicio multimarca — técnicos con formación en tecnología E-Tech de Renault",
  },
};

const brandCommonProblems: Record<string, Record<string, BrandCommonProblem[]>> = {
  volkswagen: {
    reparacion: [
      { title: "Error en el sistema de refrigeración de la batería MEB", description: "Los modelos ID. pueden presentar códigos de error relacionados con la bomba de refrigeración o las válvulas del circuito térmico. Requiere diagnóstico con ODIS y posible sustitución de componentes del circuito de refrigeración.", icon: "ri-temp-cold-line", severity: "alta" },
      { title: "Fallo en la bomba de vacío del servofreno", description: "En modelos ID.3 e ID.4 anteriores a 2022, la bomba de vacío eléctrica del servofreno puede presentar ruidos o pérdida de asistencia. Existe una actualización de software y posible sustitución.", icon: "ri-brake-line", severity: "alta" },
      { title: "Desgaste prematuro de neumáticos traseros", description: "El par instantáneo del motor eléctrico de los ID. puede provocar desgaste acelerado en neumáticos traseros si no se rotan adecuadamente cada 15.000 km.", icon: "ri-circle-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Códigos de error del BMS (Battery Management System)", description: "Los ID. pueden generar alertas del BMS por desequilibrio de celdas o sensores de temperatura. El diagnóstico ODIS permite identificar celdas degradadas y evaluar si requiere recalibración o sustitución de módulo.", icon: "ri-battery-low-line", severity: "alta" },
      { title: "Calibración de la cámara frontal ADAS", description: "Tras sustitución de parabrisas o impactos, la cámara frontal del sistema Travel Assist requiere recalibración con ODIS en condiciones controladas.", icon: "ri-camera-lens-line", severity: "media" },
      { title: "Inconsistencias en el indicador de autonomía", description: "Discrepancias entre la autonomía estimada y real pueden indicar necesidad de recalibración del algoritmo del BMS. Se resuelve con ciclos de carga completos y diagnóstico de celdas.", icon: "ri-dashboard-3-line", severity: "baja" },
    ],
    mantenimiento: [
      { title: "Cambio de líquido refrigerante de batería", description: "El circuito de refrigeración de la batería de los ID. requiere sustitución del líquido cada 5 años o 90.000 km, usando el refrigerante específico G13 de Volkswagen.", icon: "ri-drop-line", severity: "media" },
      { title: "Revisión del sistema de climatización con bomba de calor", description: "La bomba de calor de los ID. necesita revisión periódica del nivel de refrigerante y funcionamiento del compresor eléctrico para mantener la eficiencia energética.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Actualización de software ID.Software", description: "Volkswagen publica actualizaciones periódicas del ID.Software que mejoran autonomía, rendimiento de carga y funciones del infoentretenimiento. Algunas requieren instalación en taller.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Limitación de potencia de carga en clima frío", description: "Los ID. pueden limitar la potencia de carga DC si la batería está fría. El preacondicionamiento de batería via navegación o app reduce significativamente este efecto.", icon: "ri-temp-cold-line", severity: "media" },
      { title: "Incompatibilidad con ciertos cargadores públicos", description: "Algunos ID. presentan errores de comunicación con cargadores de ciertos operadores. Las actualizaciones OTA del firmware de carga suelen resolver estos problemas.", icon: "ri-plug-line", severity: "media" },
      { title: "Configuración óptima del wallbox para ID.", description: "Para maximizar la vida de la batería, se recomienda configurar el wallbox para cargar al 80% por defecto y programar la carga en horario valle. El cargador recomendado es de 11 kW trifásico.", icon: "ri-settings-3-line", severity: "baja" },
    ],
    garantia: [
      { title: "Cobertura de la batería ID. durante 8 años", description: "Volkswagen garantiza que la batería mantendrá al menos el 70% de su capacidad original durante 8 años o 160.000 km. Monitorizamos el SOH en cada visita.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Extensión de garantía oficial Volkswagen", description: "El programa Volkswagen Warranty Extension permite ampliar la garantía hasta 5 años con cobertura de componentes eléctricos y electrónicos específicos.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Gestión de campañas de servicio y recalls", description: "Verificamos si tu ID. tiene campañas de servicio pendientes y las aplicamos sin coste. Las campañas del BMS y software son frecuentes y mejoran el rendimiento.", icon: "ri-notification-line", severity: "baja" },
    ],
  },
  audi: {
    reparacion: [
      { title: "Degradación del sistema de suspensión neumática (e-tron)", description: "El peso adicional de la batería del e-tron SUV puede acelerar el desgaste de los fuelles de suspensión neumática. Síntomas: vehículo desnivelado o compresor funcionando en exceso.", icon: "ri-route-line", severity: "alta" },
      { title: "Fallo en el motor de carga (on-board charger)", description: "Algunos e-tron anteriores a 2021 presentan fallos en el cargador a bordo de 11 kW que limitan la velocidad de carga AC. Requiere diagnóstico VAS y posible sustitución.", icon: "ri-charging-pile-line", severity: "alta" },
      { title: "Ruidos en el reductor del motor eléctrico", description: "Los e-tron GT pueden presentar ruidos en el reductor de 2 velocidades del eje trasero. El diagnóstico diferencial determina si requiere ajuste o sustitución.", icon: "ri-volume-up-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Calibración del sistema quattro eléctrico", description: "El reparto de par entre los dos motores eléctricos del sistema quattro necesita verificación periódica con el equipo VAS para garantizar la tracción óptima.", icon: "ri-steering-line", severity: "media" },
      { title: "Análisis del estado de la batería de alto voltaje", description: "Con el VAS 6150 y ODIS-E realizamos un análisis célula a célula de la batería del e-tron, incluyendo resistencia interna, capacidad y equilibrado.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Verificación de sistemas Matrix LED y Digital Matrix", description: "El diagnóstico ODIS-S permite verificar y recalibrar los faros Matrix LED/DML del e-tron GT y Q8 e-tron para garantizar su correcto funcionamiento.", icon: "ri-lightbulb-line", severity: "baja" },
    ],
    mantenimiento: [
      { title: "Sustitución de pastillas de freno con sensor de desgaste", description: "Los Audi eléctricos frenan menos mecánicamente gracias a la regeneración, pero las pastillas necesitan revisión por posible cristalización del material de fricción.", icon: "ri-brake-line", severity: "media" },
      { title: "Revisión del circuito de refrigeración de 4 vías", description: "El sofisticado sistema de refrigeración de los e-tron con 4 circuitos independientes requiere verificación de niveles, estanqueidad y funcionamiento de válvulas.", icon: "ri-drop-line", severity: "media" },
      { title: "Actualización del MMI y sistemas conectados", description: "Las actualizaciones del sistema MMI y Audi connect mejoran la planificación de rutas con carga y la precisión de la estimación de autonomía.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    carga: [
      { title: "Configuración de carga bifásica 22 kW", description: "Los Audi e-tron con cargador a bordo de 22 kW requieren instalación trifásica. Asesoramos sobre la configuración óptima del wallbox para aprovechar la máxima potencia.", icon: "ri-flashlight-line", severity: "media" },
      { title: "Preacondicionamiento de batería para carga rápida", description: "Los e-tron GT con arquitectura de 800V alcanzan su máxima potencia de 270 kW solo con batería preacondicionada. Configuramos la navegación para activarlo automáticamente.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Compatibilidad con redes IONITY y carga premium", description: "Configuramos tu cuenta Audi charging para acceder a tarifas premium en la red IONITY y otros operadores integrados con el sistema de pago e-tron Charging Service.", icon: "ri-global-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía de batería de alto voltaje Audi", description: "Audi ofrece 8 años o 160.000 km de garantía en la batería, asegurando al menos el 70% de capacidad. En caso de degradación, se evalúa módulo a módulo.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Programa Audi Extended Warranty para EV", description: "El programa Audi Extended Warranty cubre componentes eléctricos hasta 5 años, incluyendo motor eléctrico, inversor, cargador a bordo y electrónica de potencia.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Cobertura de actualizaciones de software", description: "Las actualizaciones de software que mejoran el rendimiento del vehículo están cubiertas por la garantía y se aplican sin coste durante toda la vida útil del vehículo.", icon: "ri-download-2-line", severity: "baja" },
    ],
  },
  skoda: {
    reparacion: [
      { title: "Error en la unidad de control del cargador a bordo", description: "El Enyaq iV puede presentar errores en el módulo de carga AC que impiden la recarga doméstica. Diagnóstico ODIS identifica si requiere actualización de firmware o sustitución.", icon: "ri-charging-pile-line", severity: "alta" },
      { title: "Vibración en el tren motriz trasero", description: "Algunos Enyaq presentan vibraciones a velocidades entre 80-120 km/h relacionadas con los soportes del motor eléctrico trasero. Requiere inspección y posible recalibración.", icon: "ri-shake-hands-line", severity: "media" },
      { title: "Sensor de temperatura del pack de batería", description: "Fallos en sensores de temperatura del pack de batería pueden provocar limitaciones de potencia. El diagnóstico identifica el sensor defectuoso dentro del módulo.", icon: "ri-temp-cold-line", severity: "alta" },
    ],
    diagnostico: [
      { title: "Diagnóstico de equilibrado de celdas", description: "El Enyaq utiliza la plataforma MEB con módulos de batería que requieren verificación del equilibrado de celdas. Con ODIS detectamos desviaciones que afectan la autonomía real.", icon: "ri-equalizer-line", severity: "alta" },
      { title: "Verificación del sistema de frenada regenerativa", description: "Comprobamos que la transición entre freno regenerativo y freno mecánico sea suave y eficiente, un punto crítico en la experiencia de conducción del Enyaq.", icon: "ri-brake-line", severity: "media" },
      { title: "Lectura de datos del sistema de gestión energética", description: "Analizamos el consumo por subsistemas (climatización, calefacción, auxiliares) para optimizar la autonomía real de tu Škoda eléctrico.", icon: "ri-pie-chart-line", severity: "baja" },
    ],
    mantenimiento: [
      { title: "Revisión del sistema de climatización eléctrica", description: "El compresor eléctrico del Enyaq requiere revisión del nivel de refrigerante R1234yf y verificación del funcionamiento de la bomba de calor cada 2 años.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Inspección de neumáticos con especificación EV", description: "Los neumáticos del Enyaq deben ser de especificación EV (baja resistencia a la rodadura y mayor capacidad de carga) para mantener la autonomía y seguridad.", icon: "ri-circle-line", severity: "media" },
      { title: "Actualización de software del Enyaq", description: "Škoda publica actualizaciones que mejoran la autonomía, velocidad de carga y funciones del infoentretenimiento. Verificamos y aplicamos las pendientes.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Optimización del wallbox para Enyaq", description: "El Enyaq admite carga AC de hasta 11 kW. Recomendamos wallbox trifásico de 11 kW para carga nocturna completa en 6-8 horas con batería de 77 kWh.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Programación inteligente de carga", description: "Configuramos la programación de carga del Enyaq para aprovechar las tarifas eléctricas más económicas y limitar la carga al 80% para máxima longevidad de batería.", icon: "ri-time-line", severity: "baja" },
      { title: "Compatibilidad con cargadores bidireccionales V2H", description: "El Enyaq es compatible con la tecnología V2H (Vehicle-to-Home). Asesoramos sobre wallbox bidireccionales homologados para aprovechar esta funcionalidad.", icon: "ri-exchange-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía de batería Enyaq 8 años", description: "Škoda cubre la batería del Enyaq durante 8 años o 160.000 km con garantía de al menos 70% de capacidad. Monitorizamos el SOH en cada revisión.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Programa Škoda Extended Warranty", description: "Amplía la garantía de tu Enyaq hasta 5 años con cobertura específica para componentes del tren motriz eléctrico y electrónica de alta tensión.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Garantía de pintura y carrocería", description: "Škoda ofrece 12 años de garantía anticorrosión y 3 años de garantía de pintura. Mantenemos el registro oficial para preservar estas coberturas.", icon: "ri-paint-brush-line", severity: "baja" },
    ],
  },
  tesla: {
    reparacion: [
      { title: "Reparación de la pantalla central (MCU)", description: "La pantalla central de Tesla puede presentar lentitud, reinicios o píxeles muertos. Para MCU1 existe un programa de sustitución; MCU2 puede requerir reflash o reemplazo.", icon: "ri-computer-line", severity: "alta" },
      { title: "Problemas en el mecanismo de las puertas", description: "Los Model 3 y Model Y pueden presentar problemas con los mecanismos de apertura de puertas, especialmente los manillares retráctiles del Model 3 y los pestillos electrónicos.", icon: "ri-door-open-line", severity: "media" },
      { title: "Ruidos en suspensión y trenes delanteros", description: "Las horquillas y rótulas del Model 3/Y pueden presentar holgura y ruidos prematuros. Sustituimos con piezas de calidad equivalente o superior con garantía de 2 años.", icon: "ri-route-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Lectura de datos de batería Tesla", description: "Utilizamos herramientas especializadas de diagnóstico OBD2 para Tesla que permiten leer el estado de salud de cada módulo de batería, temperaturas y ciclos de carga.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Diagnóstico del sistema Autopilot", description: "Verificamos el funcionamiento de las cámaras del sistema de visión pura de Tesla (8 cámaras) y la calibración del sistema de asistencia a la conducción.", icon: "ri-camera-lens-line", severity: "media" },
      { title: "Verificación de motores y reductores", description: "Los motores de reluctancia conmutada e imanes permanentes de Tesla requieren verificación específica de rodamientos y electrónica de potencia.", icon: "ri-settings-3-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Sustitución del filtro HEPA y modo Bioweapon Defense", description: "El filtro HEPA de Tesla (especialmente Model S/X) debe sustituirse cada 2 años o según indicación del vehículo para mantener la calidad del aire interior.", icon: "ri-filter-line", severity: "media" },
      { title: "Lubricación de frenos y cálipers", description: "El uso intensivo de freno regenerativo hace que los frenos mecánicos se usen poco, pudiendo generar corrosión en discos. Recomendamos lubricación y ejercitación periódica.", icon: "ri-brake-line", severity: "media" },
      { title: "Revisión del líquido de frenos cada 2 años", description: "Tesla recomienda verificar el estado del líquido de frenos cada 2 años. La higroscopicidad del DOT4 requiere análisis de punto de ebullición para garantizar seguridad.", icon: "ri-drop-line", severity: "media" },
    ],
    carga: [
      { title: "Instalación de wallbox compatible con Tesla", description: "Los Tesla utilizan conector Tipo 2 en Europa. Recomendamos wallbox de 11 kW (monofásico) o 22 kW (trifásico) compatible con el Tesla Wall Connector.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Configuración del límite de carga diario", description: "Configuramos tu Tesla para cargar al 80% en uso diario y 100% solo antes de viajes largos, maximizando la longevidad de la batería NCA o LFP según tu modelo.", icon: "ri-settings-3-line", severity: "baja" },
      { title: "Acceso a la red Supercharger en España", description: "Te ayudamos a configurar tu cuenta Tesla y la tarjeta de pago para acceder a la red de Superchargers V3 de hasta 250 kW disponibles en toda España.", icon: "ri-global-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía oficial Tesla 4 años / 80.000 km", description: "La garantía básica de Tesla cubre el vehículo durante 4 años o 80.000 km. La batería y el tren motriz tienen garantía de 8 años o 192.000 km (Model 3/Y).", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Gestión de reclamaciones de garantía Tesla", description: "Aunque Tesla gestiona sus garantías directamente, te asistimos en la documentación y preparación de reclamaciones para agilizar el proceso.", icon: "ri-file-list-3-line", severity: "media" },
      { title: "Programa de garantía extendida para Tesla", description: "Ofrecemos garantías extendidas de terceros especializadas en Tesla que cubren componentes eléctricos y electrónicos más allá de la garantía oficial.", icon: "ri-add-circle-line", severity: "media" },
    ],
  },
  byd: {
    reparacion: [
      { title: "Diagnóstico del sistema Blade Battery", description: "La tecnología LFP Blade Battery de BYD tiene características únicas de diagnóstico. Nuestros técnicos están formados en el análisis específico de este tipo de celdas.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Reparación de la electrónica de potencia", description: "Los BYD utilizan semiconductores SiC (carburo de silicio) en sus inversores. Diagnosticamos y reparamos fallos en el inversor y convertidor DC-DC.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Ajuste del sistema de frenado combinado", description: "El sistema de frenado de BYD combina freno regenerativo y mecánico con transición que puede requerir recalibración tras sustitución de componentes.", icon: "ri-brake-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Análisis de la Blade Battery célula a célula", description: "La Blade Battery LFP tiene una estructura cell-to-pack única. Nuestro diagnóstico evalúa la resistencia interna y capacidad de cada celda blade individual.", icon: "ri-bar-chart-box-line", severity: "alta" },
      { title: "Verificación del sistema DiLink", description: "El sistema de infoentretenimiento DiLink de BYD puede presentar errores que afectan a funciones del vehículo. Diagnosticamos y actualizamos el sistema completo.", icon: "ri-computer-line", severity: "media" },
      { title: "Test de aislamiento del sistema de alta tensión", description: "Verificamos el aislamiento eléctrico de todo el sistema de alta tensión BYD, incluyendo cables naranja, conectores y módulos de potencia.", icon: "ri-flashlight-line", severity: "alta" },
    ],
    mantenimiento: [
      { title: "Revisión específica del sistema de seguridad Blade", description: "La Blade Battery incorpora múltiples sensores de seguridad que requieren verificación periódica para garantizar el funcionamiento de las protecciones.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Mantenimiento del compresor de climatización", description: "El compresor eléctrico del sistema de climatización BYD requiere revisión del refrigerante y verificación del funcionamiento de la bomba de calor.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Actualización del firmware DiLink", description: "BYD publica actualizaciones del sistema que mejoran la autonomía, rendimiento de carga y funciones del vehículo. Aplicamos las versiones más recientes.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación optimizada para BYD Atto 3 y Seal", description: "Los BYD aceptan carga AC de hasta 11 kW (Atto 3) y 22 kW (Seal). Instalamos el wallbox óptimo según tu modelo y tipo de instalación eléctrica.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Configuración de carga LFP (100% recomendado)", description: "A diferencia de baterías NMC, la tecnología LFP de BYD se beneficia de cargas al 100% periódicas para calibrar el BMS. Configuramos la rutina óptima.", icon: "ri-battery-charge-line", severity: "media" },
      { title: "Resolución de errores de carga pública", description: "Algunos BYD presentan incompatibilidades con cargadores de ciertos operadores. Verificamos y actualizamos el firmware de carga para máxima compatibilidad.", icon: "ri-plug-line", severity: "media" },
    ],
    garantia: [
      { title: "Garantía Blade Battery — la más segura del mercado", description: "BYD ofrece 8 años de garantía en la Blade Battery, la batería LFP más segura del mercado (ha superado el test del clavo). Monitorizamos su estado periódicamente.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Cobertura de garantía del tren motriz", description: "El motor eléctrico y el inversor SiC de BYD tienen garantía de 8 años o 150.000 km. Los componentes auxiliares tienen garantía estándar de 2 años.", icon: "ri-settings-3-line", severity: "media" },
      { title: "Garantía extendida para BYD en España", description: "Ofrecemos extensiones de garantía para BYD que cubren específicamente los componentes del tren motriz eléctrico y la electrónica de potencia.", icon: "ri-add-circle-line", severity: "media" },
    ],
  },
  hyundai: {
    reparacion: [
      { title: "Reparación del sistema de carga de 800V", description: "El IONIQ 5 y IONIQ 6 con arquitectura de 800V requieren técnicos especializados para intervenir en el sistema de carga ultrarrápida y los convertidores boost.", icon: "ri-flashlight-line", severity: "alta" },
      { title: "Sustitución de módulos de batería E-GMP", description: "La plataforma E-GMP permite la sustitución individual de módulos de batería sin necesidad de reemplazar el pack completo, reduciendo costes significativamente.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Reparación del sistema Vehicle-to-Load (V2L)", description: "La función V2L del IONIQ 5 que permite usar el coche como generador puede presentar fallos en el adaptador o la electrónica de salida. Diagnosticamos y reparamos.", icon: "ri-plug-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico del sistema E-GMP con GDS", description: "Utilizamos el sistema de diagnóstico GDS de Hyundai para analizar en profundidad todos los componentes de la plataforma E-GMP de 800V del IONIQ 5 y IONIQ 6.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Verificación del preacondicionamiento de batería", description: "Comprobamos que el sistema de preacondicionamiento de batería para carga rápida funcione correctamente, permitiendo alcanzar los 240 kW de potencia máxima.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Calibración del sistema de frenado regenerativo i-Pedal", description: "Verificamos los 4 niveles de regeneración y el modo i-Pedal, asegurando transiciones suaves y eficiencia energética óptima.", icon: "ri-brake-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Revisión del sistema de climatización con bomba de calor", description: "La bomba de calor del IONIQ 5/6 es fundamental para la autonomía en invierno. Verificamos refrigerante, compresor y eficiencia del sistema.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Rotación de neumáticos especiales EV", description: "El peso y par del IONIQ 5 requieren neumáticos específicos para EV. Realizamos rotación cada 10.000 km para desgaste uniforme.", icon: "ri-circle-line", severity: "media" },
      { title: "Actualización del sistema Bluelink", description: "Las actualizaciones de Bluelink mejoran la preclimatización remota, planificación de rutas con carga y monitorización del estado de la batería.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    carga: [
      { title: "Aprovechamiento de la carga ultrarrápida 800V", description: "El IONIQ 5 puede cargar del 10 al 80% en 18 minutos con cargador de 350 kW. Te asesoramos sobre los puntos de carga ultrarrápida disponibles en tu zona.", icon: "ri-flashlight-line", severity: "alta" },
      { title: "Instalación de wallbox con función V2H", description: "El IONIQ 5 soporta V2H (Vehicle-to-Home). Instalamos wallbox bidireccional para usar tu coche como fuente de energía para tu hogar.", icon: "ri-home-4-line", severity: "media" },
      { title: "Configuración de carga inteligente Bluelink", description: "Configuramos la app Bluelink para programar cargas en horario valle, establecer límites de carga y monitorizar el consumo desde tu móvil.", icon: "ri-time-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Hyundai 5 años sin límite de km", description: "Hyundai ofrece 5 años de garantía general sin límite de kilómetros, la más completa del mercado. La batería tiene garantía adicional de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Programa Hyundai 5 Year Care", description: "Incluye 5 años de asistencia en carretera 24/7 en toda Europa, mantenimiento programado y revisiones oficiales en cualquier concesionario Hyundai.", icon: "ri-road-map-line", severity: "media" },
      { title: "Garantía de la función V2L", description: "La función Vehicle-to-Load está cubierta por la garantía general del vehículo. Si presenta fallos, se repara sin coste dentro del periodo de cobertura.", icon: "ri-plug-line", severity: "baja" },
    ],
  },
  bmw: {
    reparacion: [
      { title: "Reparación del sistema de refrigeración directa de celdas", description: "Los iX y i4 utilizan refrigeración directa de celdas. Fallos en el circuito pueden reducir la potencia de carga y rendimiento. Diagnóstico con ISTA+ para identificar fugas.", icon: "ri-drop-line", severity: "alta" },
      { title: "Sustitución de componentes del motor de 5.ª generación", description: "El eDrive Gen5 de BMW (sin tierras raras) tiene requisitos específicos de reparación. Intervenimos en rodamientos, electrónica de potencia y cableado de alta tensión.", icon: "ri-settings-3-line", severity: "alta" },
      { title: "Reparación del sistema de conducción autónoma", description: "Los BMW eléctricos equipados con el sistema de conducción autónoma pueden requerir recalibración de sensores LiDAR y cámaras tras reparaciones de carrocería.", icon: "ri-camera-lens-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico completo con ISTA+", description: "La herramienta ISTA+ de BMW permite un diagnóstico profundo de todos los sistemas del vehículo eléctrico, incluyendo análisis de batería, motor eDrive y sistemas ADAS.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis de degradación de batería", description: "Con ISTA+ monitorizamos el SOH y la capacidad real de la batería de tu BMW eléctrico, comparando con los valores de referencia del fabricante.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Verificación del sistema BMW Digital Key", description: "Diagnosticamos problemas de conectividad del BMW Digital Key, incluyendo la comunicación NFC/UWB con el smartphone.", icon: "ri-key-2-line", severity: "baja" },
    ],
    mantenimiento: [
      { title: "Mantenimiento del sistema de refrigeración eDrive", description: "El sistema de refrigeración directa del motor eDrive Gen5 requiere verificación del refrigerante específico y funcionamiento de la bomba eléctrica.", icon: "ri-drop-line", severity: "media" },
      { title: "Revisión de frenos con sistema de frenado integrado", description: "El sistema de frenado integrado de BMW combina regeneración y freno mecánico. Verificamos la transición y estado de los componentes mecánicos.", icon: "ri-brake-line", severity: "media" },
      { title: "Actualización de BMW Operating System", description: "BMW publica actualizaciones periódicas del sistema operativo que mejoran autonomía, rendimiento de carga y funciones de conectividad.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación de BMW Wallbox con gestión inteligente", description: "El BMW Wallbox Plus permite carga de hasta 22 kW con gestión energética inteligente y compatibilidad con instalaciones fotovoltaicas.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Configuración de BMW Charging con tarifas preferenciales", description: "Configuramos tu cuenta BMW Charging para acceder a tarifas preferenciales en más de 400.000 puntos de carga en Europa.", icon: "ri-money-euro-circle-line", severity: "media" },
      { title: "Precondicionamiento de batería para carga rápida", description: "Te enseñamos a usar el precondicionamiento de batería del BMW para alcanzar la máxima potencia de carga DC en estaciones rápidas.", icon: "ri-temp-hot-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía BMW de 2 años sin límite de km", description: "La garantía oficial BMW cubre el vehículo durante 2 años sin límite de kilómetros. La batería de alto voltaje tiene garantía de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "BMW Service Inclusive para eléctricos", description: "El programa BSI cubre mantenimiento programado durante 3-5 años con precio fijo, incluyendo revisiones oficiales y piezas originales.", icon: "ri-calendar-check-line", severity: "media" },
      { title: "Garantía transferible al siguiente propietario", description: "La garantía BMW y la extensión BSI son transferibles al nuevo propietario, preservando el valor de reventa de tu BMW eléctrico.", icon: "ri-exchange-line", severity: "baja" },
    ],
  },
  "mercedes-benz": {
    reparacion: [
      { title: "Reparación del sistema MBUX Hyperscreen", description: "La pantalla panorámica MBUX Hyperscreen del EQS puede presentar fallos en la pantalla de pasajero o en la integración con los sistemas del vehículo.", icon: "ri-computer-line", severity: "alta" },
      { title: "Intervención en el eje trasero direccional", description: "El EQS y EQE con eje trasero direccional (hasta 10°) pueden requerir recalibración o reparación del sistema de dirección trasera electromecánica.", icon: "ri-steering-line", severity: "alta" },
      { title: "Reparación del sistema de suspensión neumática AIRMATIC", description: "Los modelos EQ con AIRMATIC pueden presentar fugas en fuelles o fallos en el compresor. Diagnosticamos con XENTRY y sustituimos componentes.", icon: "ri-route-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico XENTRY de sistemas EQ", description: "Utilizamos la herramienta XENTRY Diagnosis de Mercedes-Benz para análisis completo de todos los sistemas eléctricos, incluyendo batería, motor y ADAS.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis de autonomía con simulación WLTP", description: "Verificamos la autonomía real comparada con la homologación WLTP, identificando posibles pérdidas por degradación de batería o consumos auxiliares excesivos.", icon: "ri-dashboard-3-line", severity: "media" },
      { title: "Calibración del sistema PRE-SAFE®", description: "Tras intervenciones de carrocería, el sistema PRE-SAFE® de Mercedes-Benz requiere recalibración de sensores radar y cámaras para funcionamiento correcto.", icon: "ri-shield-check-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento del doble circuito de refrigeración", description: "Los Mercedes-Benz EQ tienen un sofisticado sistema de doble circuito de refrigeración. Verificamos niveles, estanqueidad y funcionamiento de ambos circuitos.", icon: "ri-drop-line", severity: "media" },
      { title: "Revisión del sistema de frenado regenerativo DAuto", description: "El sistema de regeneración inteligente DAuto utiliza el radar para ajustar la recuperación. Verificamos sensores y calibración para máxima eficiencia.", icon: "ri-brake-line", severity: "media" },
      { title: "Actualización de Mercedes me connect", description: "Las actualizaciones OTA mejoran la planificación de rutas con carga, preclimatización remota y monitorización del estado del vehículo.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación de Mercedes-Benz Wallbox hasta 22 kW", description: "Los Mercedes-Benz EQ admiten carga AC de hasta 22 kW (EQS). Instalamos el wallbox Mercedes-Benz Home con gestión energética integrada.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Acceso a Mercedes me Charge", description: "Configuramos tu cuenta Mercedes me Charge con tarifa preferencial IONITY y acceso a más de 600.000 puntos de carga en Europa con factura única.", icon: "ri-global-line", severity: "media" },
      { title: "Configuración de carga inteligente con energía solar", description: "Si dispones de paneles solares, configuramos la carga inteligente para aprovechar el excedente fotovoltaico y minimizar el coste de carga.", icon: "ri-sun-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Mercedes-Benz 2 años sin límite de km", description: "La garantía oficial Mercedes-Benz cubre todos los componentes durante 2 años sin límite de km. La batería EQ tiene garantía de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Mercedes-Benz Service Plus", description: "El programa Service Plus cubre mantenimiento programado con precio fijo durante 4 años, incluyendo revisiones oficiales y actualizaciones de software.", icon: "ri-calendar-check-line", severity: "media" },
      { title: "StarClass — garantía para vehículos usados EQ", description: "Los Mercedes-Benz EQ de ocasión certificados StarClass mantienen hasta 2 años de garantía adicional con cobertura de componentes eléctricos.", icon: "ri-star-line", severity: "media" },
    ],
  },
  kia: {
    reparacion: [
      { title: "Reparación del sistema de 800V del EV6", description: "El EV6 con arquitectura de 800V nativa requiere técnicos especializados para intervenir en el inversor SiC y los convertidores de alta tensión.", icon: "ri-flashlight-line", severity: "alta" },
      { title: "Sustitución de módulos de batería E-GMP", description: "La plataforma E-GMP de Kia permite sustituir módulos individuales de batería, reduciendo el coste de reparación frente a la sustitución del pack completo.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Reparación del sistema de sonido virtual VESS", description: "El generador de sonido virtual VESS, obligatorio para alertar peatones a baja velocidad, puede presentar fallos que requieren diagnóstico y sustitución.", icon: "ri-volume-up-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico KDS del sistema E-GMP", description: "Con el sistema KDS de Kia analizamos todos los componentes de la plataforma E-GMP de 800V, incluyendo batería, motor, inversor y sistema de carga.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Verificación de la carga ultrarrápida 240 kW", description: "Comprobamos que tu EV6 alcance la potencia máxima de carga especificada, verificando el preacondicionamiento de batería y la comunicación con el cargador.", icon: "ri-charging-pile-line", severity: "media" },
      { title: "Diagnóstico del sistema V2L (Vehicle-to-Load)", description: "Verificamos el funcionamiento de la salida de 230V del EV6 para alimentar dispositivos externos, incluyendo la electrónica del adaptador.", icon: "ri-plug-line", severity: "baja" },
    ],
    mantenimiento: [
      { title: "Revisión del sistema de tracción total eléctrica", description: "Los modelos Kia con doble motor eléctrico (AWD) requieren verificación del reparto de par y estado de los reductores delantero y trasero.", icon: "ri-steering-line", severity: "media" },
      { title: "Mantenimiento del filtro de partículas de freno", description: "Los Kia EV equipados con filtro de partículas de freno requieren revisión periódica para mantener su eficacia de filtrado.", icon: "ri-filter-line", severity: "media" },
      { title: "Actualización del sistema Kia Connect", description: "Las actualizaciones de Kia Connect mejoran la estimación de autonomía, planificación de rutas y funciones de control remoto del vehículo.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    carga: [
      { title: "Carga del 10 al 80% en solo 18 minutos", description: "El EV6 con arquitectura de 800V puede cargar del 10 al 80% en 18 minutos. Te indicamos los cargadores de 350 kW más cercanos a tu ubicación.", icon: "ri-flashlight-line", severity: "alta" },
      { title: "Instalación de wallbox con función V2H para EV6", description: "El EV6 soporta carga bidireccional V2H. Instalamos wallbox bidireccional compatible para usar tu coche como fuente de energía de respaldo.", icon: "ri-home-4-line", severity: "media" },
      { title: "Programación de carga óptima con Kia Connect", description: "Configuramos la programación de carga inteligente en la app Kia Connect para cargar en horario valle y limitar la carga al 80% en uso diario.", icon: "ri-time-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Kia 7 años o 150.000 km", description: "Kia ofrece la garantía más larga del mercado: 7 años o 150.000 km para todo el vehículo. La batería tiene garantía adicional de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Programa Kia Care — mantenimiento incluido", description: "Kia Care incluye asistencia en carretera 24/7, inspecciones periódicas gratuitas y condiciones especiales de mantenimiento durante los 7 años de garantía.", icon: "ri-road-map-line", severity: "media" },
      { title: "Transferencia de garantía sin coste", description: "La garantía de 7 años de Kia es transferible al siguiente propietario sin coste ni trámites adicionales, protegiendo el valor de reventa.", icon: "ri-exchange-line", severity: "baja" },
    ],
  },
  volvo: {
    reparacion: [
      { title: "Reparación del sistema Google integrado", description: "Los Volvo eléctricos con Android Automotive OS pueden presentar fallos en el sistema de infoentretenimiento que requieren reflash o actualización del sistema operativo.", icon: "ri-computer-line", severity: "media" },
      { title: "Intervención en la suspensión de doble horquilla", description: "Los modelos Volvo Recharge con suspensión de doble horquilla delantera requieren alineación específica y verificación de geometría tras intervenciones.", icon: "ri-route-line", severity: "media" },
      { title: "Reparación del sistema de frenada de emergencia City Safety", description: "El sistema City Safety con detección de peatones y ciclistas puede requerir recalibración de la cámara y radar tras reparaciones de parabrisas o frontal.", icon: "ri-shield-check-line", severity: "alta" },
    ],
    diagnostico: [
      { title: "Diagnóstico VIDA de sistemas Recharge", description: "Utilizamos la herramienta VIDA de Volvo para diagnóstico completo de los modelos Recharge, incluyendo batería, motor eléctrico y sistemas de seguridad.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis de rendimiento One Pedal Drive", description: "Verificamos la eficiencia del sistema One Pedal Drive y la transición entre frenado regenerativo y mecánico en diferentes condiciones.", icon: "ri-brake-line", severity: "media" },
      { title: "Verificación de sensores de seguridad", description: "Volvo es líder en seguridad. Verificamos todos los sensores del sistema de seguridad incluyendo cámaras, radar, LiDAR (EX90) y ultrasonidos.", icon: "ri-camera-lens-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento del sistema de climatización Volvo", description: "El sistema de climatización con bomba de calor de los Volvo Recharge requiere revisión del refrigerante y verificación del compresor eléctrico.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Actualización de Android Automotive OS", description: "Las actualizaciones OTA del sistema Android Automotive mejoran la navegación con Google Maps integrado, asistente de Google y apps del vehículo.", icon: "ri-download-2-line", severity: "baja" },
      { title: "Revisión del sistema de purificación de aire", description: "Los Volvo con purificador de aire avanzado requieren sustitución periódica del filtro para mantener la calidad PM2.5 en el habitáculo.", icon: "ri-filter-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación de wallbox para Volvo Recharge", description: "Los Volvo Recharge admiten carga AC de hasta 11 kW. Instalamos wallbox optimizado para carga nocturna completa con programación horaria.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Configuración de carga con Volvo Cars app", description: "Configuramos la app Volvo Cars para gestionar la carga remota, programar horarios y monitorizar el estado de la batería desde tu smartphone.", icon: "ri-smartphone-line", severity: "baja" },
      { title: "Compatibilidad con redes de carga Plug&Charge", description: "Los nuevos Volvo soportan Plug&Charge (ISO 15118) para carga sin necesidad de app ni tarjeta. Te ayudamos a configurar la autenticación.", icon: "ri-plug-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Volvo 2 años sin límite de km", description: "Volvo ofrece garantía de 2 años sin límite de km. La batería de alto voltaje tiene garantía de 8 años o 160.000 km con al menos 70% de capacidad.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Volvo Service Agreement — mantenimiento prepagado", description: "El Volvo Service Agreement cubre todas las revisiones programadas con precio fijo, incluyendo piezas y mano de obra oficial.", icon: "ri-calendar-check-line", severity: "media" },
      { title: "Programa Volvo Selekt para eléctricos de ocasión", description: "Los Volvo Recharge de ocasión certificados Selekt mantienen hasta 2 años de garantía con cobertura de componentes eléctricos.", icon: "ri-star-line", severity: "media" },
    ],
  },
  peugeot: {
    reparacion: [
      { title: "Reparación del motor eléctrico Stellantis", description: "Los Peugeot eléctricos (e-208, e-2008, e-308) comparten motor eléctrico de la plataforma eCMP/eVMP. Intervenimos en bobinados, rodamientos y electrónica.", icon: "ri-settings-3-line", severity: "alta" },
      { title: "Sustitución del cargador a bordo", description: "Algunos modelos Peugeot presentan fallos en el cargador a bordo de 7,4 kW o 11 kW que limitan la velocidad de carga doméstica. Diagnóstico con DiagBox.", icon: "ri-charging-pile-line", severity: "alta" },
      { title: "Reparación del i-Cockpit digital", description: "La instrumentación digital i-Cockpit de los Peugeot eléctricos puede presentar fallos de visualización o comunicación con la centralita del vehículo.", icon: "ri-computer-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico DiagBox de sistemas eCMP", description: "Utilizamos DiagBox de Stellantis para diagnóstico completo de la plataforma eCMP de los Peugeot eléctricos, incluyendo batería, motor y sistemas auxiliares.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis del sistema de gestión de batería", description: "Evaluamos el estado de salud de la batería, equilibrado de celdas y sistema de refrigeración de los Peugeot eléctricos con herramientas específicas.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Verificación de los sistemas ADAS", description: "Comprobamos el funcionamiento del frenado automático de emergencia, mantenimiento de carril y control de crucero adaptativo de los Peugeot eléctricos.", icon: "ri-camera-lens-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento del compresor de climatización eléctrico", description: "El compresor scroll eléctrico de los Peugeot requiere verificación del nivel de refrigerante R1234yf y funcionamiento del sistema de bomba de calor.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Revisión de frenos con bajo desgaste", description: "Los frenos mecánicos de los Peugeot eléctricos se usan poco gracias a la regeneración. Verificamos que no haya cristalización de pastillas ni corrosión en discos.", icon: "ri-brake-line", severity: "media" },
      { title: "Actualización del sistema MyPeugeot", description: "Las actualizaciones del sistema mejoran la estimación de autonomía, funciones de climatización remota y planificación de rutas con puntos de carga.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación de wallbox para Peugeot eléctrico", description: "Los Peugeot eléctricos admiten carga AC de hasta 11 kW (e-208/e-2008 con opción trifásica). Instalamos wallbox optimizado para tu modelo.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Programación de carga nocturna", description: "Configuramos la programación de carga del Peugeot para cargar en horario supervisible y aprovechar las tarifas eléctricas más económicas.", icon: "ri-time-line", severity: "baja" },
      { title: "Acceso a Free2Move Charge", description: "Configuramos tu cuenta Free2Move Charge (Stellantis) para acceso a miles de puntos de carga en Europa con factura única.", icon: "ri-global-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Peugeot 2 años sin límite de km", description: "La garantía oficial Peugeot cubre el vehículo durante 2 años sin límite de km. La batería tiene garantía de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Peugeot Warranty Extension", description: "Amplía la garantía de tu Peugeot eléctrico hasta 5 años con cobertura de componentes del tren motriz eléctrico y electrónica de potencia.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Programa Peugeot Ocasión certificada", description: "Los Peugeot eléctricos de ocasión certificados mantienen hasta 24 meses de garantía con cobertura específica para componentes EV.", icon: "ri-star-line", severity: "media" },
    ],
  },
  renault: {
    reparacion: [
      { title: "Reparación del motor eléctrico E-Tech", description: "El motor eléctrico E-Tech de Renault en el Megane E-Tech y Scenic E-Tech requiere técnicos formados en la arquitectura CMF-EV para intervenciones en el tren motriz.", icon: "ri-settings-3-line", severity: "alta" },
      { title: "Fallo en el sistema OpenR Link con Google", description: "El sistema de infoentretenimiento OpenR Link basado en Android Automotive puede presentar fallos de conectividad o rendimiento que requieren reflash del sistema.", icon: "ri-computer-line", severity: "media" },
      { title: "Reparación del sistema de frenado Multi-Sense", description: "El sistema Multi-Sense con diferentes modos de regeneración puede requerir recalibración de los sensores de presión de freno y actuadores electrónicos.", icon: "ri-brake-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico CLIP de sistemas E-Tech", description: "Utilizamos CAN Clip de Renault para diagnóstico completo de la plataforma CMF-EV, incluyendo batería, motor E-Tech y electrónica de potencia.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis de la batería LG Energy Solution", description: "Los módulos de batería NMC 622 de LG requieren análisis específico de equilibrado de celdas, resistencia interna y capacidad real por módulo.", icon: "ri-battery-charge-line", severity: "alta" },
      { title: "Verificación del sistema de recuperación Multi-Sense", description: "Comprobamos los 3 niveles de regeneración y la respuesta de los paddles del volante para garantizar la máxima eficiencia energética.", icon: "ri-dashboard-3-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento de la bomba de calor de alta eficiencia", description: "La bomba de calor del Megane E-Tech es una de las más eficientes del mercado. Verificamos refrigerante, compresor y rendimiento COP para mantener la autonomía invernal.", icon: "ri-temp-hot-line", severity: "media" },
      { title: "Revisión del sistema de carga AC 22 kW", description: "Los Renault E-Tech equipados con cargador a bordo de 22 kW (opción Renault) requieren verificación periódica del módulo de carga y comunicación.", icon: "ri-charging-pile-line", severity: "media" },
      { title: "Actualización del sistema OpenR Link", description: "Las actualizaciones OTA de OpenR Link mejoran la integración con Google Maps, asistente y funciones de climatización y carga remotas vía MY Renault.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Carga rápida y aprovechamiento del cargador de 22 kW", description: "El Megane E-Tech con cargador a bordo de 22 kW permite carga completa en solo 3 horas con wallbox trifásico. Instalamos la solución óptima.", icon: "ri-flashlight-line", severity: "media" },
      { title: "Preacondicionamiento remoto vía MY Renault", description: "Configuramos la app MY Renault para preclimatizar el vehículo y preacondicionar la batería antes de la carga rápida desde tu smartphone.", icon: "ri-smartphone-line", severity: "baja" },
      { title: "Acceso a Mobilize Charge Pass", description: "Configuramos tu cuenta Mobilize Charge Pass para acceso a más de 400.000 puntos de carga en Europa con la tarjeta de carga de Renault.", icon: "ri-global-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía Renault E-Tech 2 años sin límite de km", description: "La garantía oficial Renault cubre el vehículo durante 2 años sin límite de km. La batería E-Tech tiene garantía de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "Renault Warranty Extension para E-Tech", description: "Amplía la garantía de tu Renault E-Tech hasta 5 años o 100.000 km con cobertura de motor eléctrico, inversor y cargador a bordo.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Programa Renault Ocasión certificada", description: "Los Renault E-Tech de ocasión certificados mantienen garantía adicional de hasta 24 meses con cobertura de batería y componentes eléctricos.", icon: "ri-star-line", severity: "media" },
    ],
  },
  cupra: {
    reparacion: [
      { title: "Reparación del sistema de suspensión DCC Sport", description: "El CUPRA Born VZ con suspensión DCC Sport adaptativa puede requerir diagnóstico ODIS y recalibración de los amortiguadores electrónicos.", icon: "ri-route-line", severity: "media" },
      { title: "Intervención en el motor eléctrico trasero", description: "El motor APP310 del CUPRA Born comparte plataforma MEB pero tiene calibración deportiva específica. Intervenimos con herramientas y procedimientos oficiales.", icon: "ri-settings-3-line", severity: "alta" },
      { title: "Reparación del sistema de iluminación LED Coast-to-Coast", description: "La barra de LED trasera característica del CUPRA Born puede presentar fallos parciales que requieren diagnóstico electrónico y posible sustitución.", icon: "ri-lightbulb-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico ODIS con calibración CUPRA", description: "El CUPRA Born utiliza software específico dentro del ecosistema ODIS del Grupo Volkswagen con parámetros de rendimiento deportivos diferenciados.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Análisis de rendimiento del modo CUPRA", description: "Verificamos que los parámetros del modo CUPRA (respuesta del acelerador, suspensión, dirección) se ajusten a las especificaciones de fábrica.", icon: "ri-speed-line", severity: "media" },
      { title: "Verificación del sistema e-Boost", description: "El sistema e-Boost del Born VZ proporciona potencia extra en aceleración. Diagnosticamos la respuesta del inversor y la gestión del par máximo.", icon: "ri-flashlight-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento de frenos con especificación CUPRA", description: "El CUPRA Born utiliza frenos de mayor diámetro que el ID.3. Verificamos el estado de discos y pastillas de especificación deportiva.", icon: "ri-brake-line", severity: "media" },
      { title: "Revisión de neumáticos de perfil deportivo", description: "Los neumáticos del CUPRA Born (19\" o 20\") tienen perfil deportivo y requieren rotación cada 10.000 km por el par instantáneo del motor eléctrico.", icon: "ri-circle-line", severity: "media" },
      { title: "Actualización de CUPRA Connect", description: "Las actualizaciones de CUPRA Connect mejoran las funciones de conectividad, rendimiento de carga y personalización de los modos de conducción.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Carga optimizada para uso deportivo", description: "El CUPRA Born VZ acepta hasta 170 kW DC. Te asesoramos sobre la rutina de carga óptima para combinar rendimiento deportivo con longevidad de batería.", icon: "ri-flashlight-line", severity: "media" },
      { title: "Instalación de wallbox con diseño CUPRA", description: "Instalamos wallbox de hasta 11 kW compatible con el estilo de vida CUPRA, incluyendo opciones con acabado premium y gestión energética inteligente.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Configuración de carga con MyCUPRA App", description: "Configuramos la MyCUPRA App para gestionar la carga remota, programar climatización y monitorizar el rendimiento desde tu smartphone.", icon: "ri-smartphone-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía CUPRA de 2 años sin límite de km", description: "CUPRA ofrece garantía de 2 años sin límite de km. La batería del Born tiene garantía de 8 años o 160.000 km con al menos 70% de capacidad.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "CUPRA Care — extensión de garantía", description: "El programa CUPRA Care permite extender la garantía hasta 5 años con cobertura completa del tren motriz eléctrico y componentes electrónicos.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Garantía de rendimiento deportivo", description: "La calibración deportiva del CUPRA Born está cubierta por la garantía. Si detectas pérdida de rendimiento, diagnosticamos y restauramos las prestaciones originales.", icon: "ri-speed-line", severity: "baja" },
    ],
  },
  seat: {
    reparacion: [
      { title: "Reparación de modelos PHEV (híbridos enchufables)", description: "Los SEAT León e-Hybrid y Tarraco e-Hybrid tienen sistema combinado de motor eléctrico y combustión. Intervenimos en ambos sistemas y su integración.", icon: "ri-settings-3-line", severity: "alta" },
      { title: "Fallo en el módulo de carga del sistema PHEV", description: "El cargador a bordo de los modelos e-Hybrid puede presentar errores que impiden la recarga. Diagnóstico ODIS identifica si requiere reprogramación o sustitución.", icon: "ri-charging-pile-line", severity: "alta" },
      { title: "Reparación del cambio DSG en modelos e-Hybrid", description: "El cambio DSG de doble embrague de los SEAT e-Hybrid integra el motor eléctrico. Las intervenciones requieren herramientas específicas del Grupo Volkswagen.", icon: "ri-steering-line", severity: "media" },
    ],
    diagnostico: [
      { title: "Diagnóstico ODIS de sistemas e-Hybrid", description: "Utilizamos ODIS para diagnóstico completo del sistema híbrido enchufable de SEAT, incluyendo motor eléctrico, batería de 13 kWh y gestión de modos de conducción.", icon: "ri-cpu-line", severity: "alta" },
      { title: "Verificación de modos de conducción eléctrica", description: "Comprobamos que los modos E-Mode (100% eléctrico), Hybrid y GTE funcionen correctamente con las transiciones suaves entre motor eléctrico y combustión.", icon: "ri-dashboard-3-line", severity: "media" },
      { title: "Análisis del sistema de batería de 13 kWh", description: "Evaluamos el estado de salud de la batería de 13 kWh de los modelos e-Hybrid, capacidad real y autonomía eléctrica efectiva.", icon: "ri-battery-charge-line", severity: "media" },
    ],
    mantenimiento: [
      { title: "Mantenimiento dual: eléctrico y combustión", description: "Los SEAT e-Hybrid requieren mantenimiento de ambos sistemas: motor eléctrico + motor TSI. Los intervalos combinados optimizan el coste total.", icon: "ri-service-line", severity: "media" },
      { title: "Revisión del sistema de refrigeración de batería", description: "La batería de 13 kWh de los e-Hybrid tiene circuito de refrigeración independiente que requiere verificación de nivel y estanqueidad.", icon: "ri-drop-line", severity: "media" },
      { title: "Actualización de software SEAT CONNECT", description: "Las actualizaciones de SEAT CONNECT mejoran la gestión de modos de conducción y la eficiencia del sistema híbrido enchufable.", icon: "ri-download-2-line", severity: "baja" },
    ],
    carga: [
      { title: "Instalación de wallbox para SEAT e-Hybrid", description: "Los SEAT e-Hybrid admiten carga AC de hasta 3,6 kW (monofásico). Instalamos wallbox con temporizador para carga nocturna completa en 3,5 horas.", icon: "ri-charging-pile-2-line", severity: "media" },
      { title: "Optimización del uso del modo eléctrico", description: "Te asesoramos sobre cómo maximizar el uso del modo E-Mode en recorridos urbanos para reducir al máximo el consumo de combustible.", icon: "ri-leaf-line", severity: "baja" },
      { title: "Carga en el trabajo o centros comerciales", description: "Te informamos sobre las opciones de carga pública lenta compatibles con tu SEAT e-Hybrid para aprovechar las horas de aparcamiento.", icon: "ri-building-line", severity: "baja" },
    ],
    garantia: [
      { title: "Garantía SEAT de 2 años sin límite de km", description: "La garantía oficial SEAT cubre el vehículo durante 2 años. La batería del sistema e-Hybrid tiene garantía de 8 años o 160.000 km.", icon: "ri-shield-check-line", severity: "alta" },
      { title: "SEAT Warranty Extension para e-Hybrid", description: "Amplía la garantía de tu SEAT e-Hybrid hasta 5 años con cobertura del motor eléctrico, batería auxiliar y sistema de gestión híbrida.", icon: "ri-add-circle-line", severity: "media" },
      { title: "Programa SEAT Ocasión — vehículos certificados", description: "Los SEAT e-Hybrid de ocasión certificados incluyen garantía adicional con cobertura de los componentes del sistema híbrido.", icon: "ri-star-line", severity: "baja" },
    ],
  },
};

const introTemplates: Record<string, ((brand: string, tech: BrandTechProfile) => string)[]> = {
  reparacion: [
    (brand, tech) => `En Grupo Avisa disponemos de la tecnología y certificación necesarias para reparar todos los sistemas de tu ${brand} eléctrico. Con herramientas de diagnóstico ${tech.obd2Access.split(" (")[0]} y formación continua en la plataforma ${tech.platform.split(" (")[0]}, nuestros técnicos intervienen con precisión en el motor eléctrico, inversor, sistema de alta tensión de ${tech.voltageArchitecture} y la batería con química ${tech.batteryChemistry.split(" (")[0]}. Cada reparación se realiza con repuestos de calidad garantizada y se registra en el historial del vehículo.`,
    (brand, tech) => `Tu ${brand} eléctrico merece un taller que conozca a fondo su tecnología. Basado en la arquitectura ${tech.platform.split(" (")[0]} con batería ${tech.batteryChemistry.split(" (")[0]} y sistema de ${tech.voltageArchitecture}, cada modelo tiene particularidades que solo un equipo especializado puede atender. En Grupo Avisa, ${CITY}, contamos con ${tech.certificationLevel.split(" — ")[1] || "técnicos especializados"} que realizan desde reparaciones menores hasta intervenciones complejas en el sistema de alta tensión.`,
    (brand, tech) => `La reparación de un ${brand} eléctrico requiere conocimientos específicos sobre su sistema de ${tech.voltageArchitecture}, gestión térmica (${tech.thermalManagement.toLowerCase()}) y frenada regenerativa (${tech.regenerativeBraking.toLowerCase().substring(0, 60)}). Nuestro equipo en ${CITY} está formado para intervenir de forma segura en todos estos sistemas, utilizando el equipamiento de diagnóstico ${tech.obd2Access.split(" (")[0]} y siguiendo los protocolos de seguridad de alta tensión.`,
  ],
  diagnostico: [
    (brand, tech) => `El diagnóstico electrónico de tu ${brand} eléctrico en Grupo Avisa se realiza con el software ${tech.obd2Access.split(" (")[0]}, capaz de leer en profundidad todos los módulos de la plataforma ${tech.platform.split(" (")[0]}. Analizamos el estado de salud de la batería ${tech.batteryChemistry.split(" (")[0]}, el rendimiento del sistema de regeneración ${tech.regenerativeBraking.split(" con ")[0].toLowerCase()} y la gestión térmica del vehículo. Un diagnóstico preventivo regular es clave para anticipar problemas y mantener la autonomía de tu ${brand}.`,
    (brand, tech) => `Cada ${brand} eléctrico construido sobre la plataforma ${tech.platform.split(" (")[0]} tiene parámetros específicos que requieren herramientas de diagnóstico especializadas. En Grupo Avisa utilizamos ${tech.obd2Access} para analizar célula a célula la batería de ${tech.voltageArchitecture}, verificar el funcionamiento del sistema de carga ${tech.chargingProtocol.split(" / ")[0]} y comprobar la eficiencia de la gestión térmica en ${CITY}.`,
    (brand, tech) => `Un diagnóstico preciso de tu ${brand} eléctrico va más allá de leer códigos de error. Nuestro equipo en ${CITY} evalúa el estado real de la batería ${tech.batteryChemistry.split(" (")[0]} de ${tech.voltageArchitecture}, la eficiencia del sistema de frenada regenerativa y el rendimiento de la gestión térmica (${tech.thermalManagement.toLowerCase().substring(0, 50)}). Utilizamos ${tech.obd2Access.split(" (")[0]} para un análisis completo de todos los subsistemas.`,
  ],
  mantenimiento: [
    (brand, tech) => `El mantenimiento de tu ${brand} eléctrico en Grupo Avisa, ${CITY}, sigue los protocolos específicos de la plataforma ${tech.platform.split(" (")[0]}. Revisamos el sistema de gestión térmica (${tech.thermalManagement.toLowerCase().substring(0, 50)}), verificamos la salud de la batería ${tech.batteryChemistry.split(" (")[0]} de ${tech.voltageArchitecture} y comprobamos el correcto funcionamiento de la frenada regenerativa. El mantenimiento preventivo es hasta un 40% más económico que en vehículos de combustión y es esencial para maximizar la vida útil de tu ${brand}.`,
    (brand, tech) => `Mantener tu ${brand} eléctrico en condiciones óptimas requiere conocer las particularidades de su plataforma ${tech.platform.split(" (")[0]}. En nuestro taller de ${CITY} revisamos los intervalos específicos del fabricante, verificamos que las actualizaciones de software estén al día (${tech.softwareUpdateMethod.split(" vía ")[0]}) y monitorizamos el estado de la batería ${tech.batteryChemistry.split(" (")[0]}. Un mantenimiento correcto preserva la autonomía, la seguridad y el valor residual de tu ${brand}.`,
    (brand, tech) => `Tu ${brand} eléctrico necesita un mantenimiento adaptado a su tecnología. La batería de ${tech.voltageArchitecture} con química ${tech.batteryChemistry.split(" (")[0]} tiene requisitos de revisión específicos que nuestros técnicos en ${CITY} conocen en detalle. Además de las revisiones mecánicas habituales (frenos, suspensión, neumáticos), verificamos la gestión térmica, el sistema de carga y aplicamos las actualizaciones de software disponibles.`,
  ],
  carga: [
    (brand, tech) => `Instalamos el punto de carga ideal para tu ${brand} eléctrico teniendo en cuenta su sistema de carga ${tech.chargingProtocol}. Con una potencia máxima de carga de ${tech.maxChargingPower}, la elección correcta del wallbox y la configuración de la instalación eléctrica son determinantes para una experiencia de carga óptima. Nuestros instaladores certificados en ${CITY} realizan el estudio de viabilidad, la instalación homologada y gestionan las ayudas del Plan MOVES.`,
    (brand, tech) => `Tu ${brand} eléctrico con sistema de carga ${tech.chargingProtocol.split(" / ")[0]} necesita un wallbox correctamente dimensionado. En Grupo Avisa estudiamos tu instalación eléctrica, evaluamos la compatibilidad con la potencia de carga AC de tu ${brand} y realizamos la instalación certificada con boletín eléctrico oficial. También gestionamos las ayudas MOVES para reducir el coste de la inversión en tu zona de ${REGION}.`,
    (brand, tech) => `La carga doméstica es la forma más cómoda y económica de recargar tu ${brand} eléctrico. Con una capacidad de carga de ${tech.maxChargingPower}, la instalación del wallbox adecuado te permite cargar durante la noche al mejor precio por kWh. Nuestro equipo en ${CITY} se encarga de todo: estudio de viabilidad, proyecto técnico, instalación certificada y gestión de ayudas del Plan MOVES.`,
  ],
  garantia: [
    (brand, tech) => `Protege tu inversión en movilidad eléctrica con las garantías oficiales y nuestros programas de extensión para ${brand}. La batería ${tech.batteryChemistry.split(" (")[0]} de ${tech.voltageArchitecture} de tu ${brand} cuenta con garantía de hasta 8 años o 160.000 km. En Grupo Avisa, ${CITY}, monitorizamos el estado de salud de la batería en cada visita y te asesoramos sobre las opciones de extensión de garantía disponibles para tu modelo.`,
    (brand, tech) => `Tu ${brand} eléctrico basado en la plataforma ${tech.platform.split(" (")[0]} cuenta con garantía oficial que cubre los componentes críticos del tren motriz eléctrico. La batería de ${tech.voltageArchitecture} con química ${tech.batteryChemistry.split(" (")[0]} tiene una cobertura extendida de hasta 8 años. En nuestro centro de ${CITY}, gestionamos todas las incidencias de garantía y te ofrecemos opciones de extensión para máxima tranquilidad.`,
    (brand, tech) => `La garantía de un ${brand} eléctrico cubre componentes específicos como el motor eléctrico, inversor, cargador a bordo (${tech.chargingProtocol.split(" / ")[0]}) y la batería de alto voltaje. En Grupo Avisa verificamos que tu ${brand} mantenga todas las condiciones de garantía vigentes y te ofrecemos planes de extensión que protegen los componentes de ${tech.voltageArchitecture} más allá del periodo oficial.`,
  ],
};

const h1Templates: Record<string, ((brand: string) => string)[]> = {
  reparacion: [
    (brand) => `Reparación de ${brand} Eléctrico e Híbrido`,
    (brand) => `Taller de Reparación para ${brand} Eléctrico`,
    (brand) => `Reparación Certificada de ${brand} Eléctrico en ${CITY}`,
  ],
  diagnostico: [
    (brand) => `Diagnóstico de ${brand} Eléctrico e Híbrido`,
    (brand) => `Diagnóstico Electrónico para ${brand} Eléctrico`,
    (brand) => `Diagnóstico Oficial de ${brand} Eléctrico en ${CITY}`,
  ],
  mantenimiento: [
    (brand) => `Mantenimiento de ${brand} Eléctrico e Híbrido`,
    (brand) => `Revisión y Mantenimiento para ${brand} Eléctrico`,
    (brand) => `Mantenimiento Oficial de ${brand} Eléctrico en ${CITY}`,
  ],
  carga: [
    (brand) => `Instalación de Punto de Carga para ${brand}`,
    (brand) => `Wallbox para ${brand} Eléctrico: Instalación Profesional`,
    (brand) => `Punto de Carga para ${brand} en ${CITY}`,
  ],
  garantia: [
    (brand) => `Garantía y Extensión para ${brand} Eléctrico`,
    (brand) => `Garantía Oficial de ${brand} Eléctrico e Híbrido`,
    (brand) => `Cobertura de Garantía para ${brand} Eléctrico en ${CITY}`,
  ],
};

const ctaTemplates: Record<string, { heading: ((brand: string) => string); sub: ((brand: string) => string) }[]> = {
  reparacion: [
    { heading: (brand) => `¿Tu ${brand} eléctrico necesita reparación?`, sub: (brand) => `Nuestros técnicos especializados en ${brand} te ofrecen diagnóstico y presupuesto sin compromiso` },
    { heading: (brand) => `Repara tu ${brand} con garantía oficial`, sub: (brand) => `Técnicos certificados, repuestos de calidad y garantía de 2 años en todas las intervenciones` },
  ],
  diagnostico: [
    { heading: (brand) => `¿Quieres conocer el estado real de tu ${brand}?`, sub: (brand) => `Diagnóstico completo con software oficial desde 49€. Si reparas, el diagnóstico es gratis` },
    { heading: (brand) => `Diagnóstico preventivo para tu ${brand} eléctrico`, sub: (brand) => `Anticípate a los problemas y mantén tu ${brand} en condiciones óptimas de rendimiento` },
  ],
  mantenimiento: [
    { heading: (brand) => `¿Toca revisión de tu ${brand} eléctrico?`, sub: (brand) => `Mantenimiento oficial con técnicos certificados y precios competitivos en ${CITY}` },
    { heading: (brand) => `Mantén tu ${brand} en perfecto estado`, sub: (brand) => `Revisiones oficiales, actualizaciones de software y monitorización de batería incluidas` },
  ],
  carga: [
    { heading: (brand) => `¿Necesitas un punto de carga para tu ${brand}?`, sub: (brand) => `Estudio de viabilidad gratuito, instalación certificada y gestión de ayudas MOVES incluida` },
    { heading: (brand) => `Carga tu ${brand} en casa de forma cómoda y segura`, sub: (brand) => `Instalación profesional del wallbox ideal para tu ${brand} con boletín eléctrico oficial` },
  ],
  garantia: [
    { heading: (brand) => `¿Quieres ampliar la garantía de tu ${brand}?`, sub: (brand) => `Consulta nuestros planes de extensión de garantía diseñados para vehículos eléctricos` },
    { heading: (brand) => `Protege tu ${brand} eléctrico con garantía extendida`, sub: (brand) => `Cobertura de motor eléctrico, batería, inversor y electrónica de potencia` },
  ],
};

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

function selectVariant<T>(items: T[], serviceSlug: string, brandSlug: string): T {
  const hash = hashCode(`${serviceSlug}-${brandSlug}`);
  return items[hash % items.length];
}

export function getUniquePageContent(serviceSlug: string, brandSlug: string): UniquePageContent | null {
  const brandName = BRAND_NAMES[brandSlug];
  if (!brandName) return null;
  
  const tech = brandTechProfiles[brandSlug];
  if (!tech) return null;

  const problems = brandCommonProblems[brandSlug]?.[serviceSlug] || [];
  const introFns = introTemplates[serviceSlug];
  if (!introFns) return null;

  const selectedIntro = selectVariant(introFns, serviceSlug, brandSlug);
  const selectedH1 = selectVariant(h1Templates[serviceSlug] || [], serviceSlug, brandSlug);
  const selectedCta = selectVariant(ctaTemplates[serviceSlug] || [], serviceSlug, brandSlug);

  const isOfficial = OFFICIAL_BRANDS.includes(brandSlug);
  const tallerType = isOfficial ? "Taller Oficial" : "Taller Especializado";

  const serviceNames: Record<string, string> = {
    reparacion: "Reparación",
    diagnostico: "Diagnóstico",
    mantenimiento: "Mantenimiento",
    carga: "Instalación de Punto de Carga",
    garantia: "Garantía y Extensión de Garantía",
  };
  const serviceName = serviceNames[serviceSlug] || serviceSlug;

  const specializationParagraphs: Record<string, ((brand: string, tech: BrandTechProfile, official: boolean) => string[])> = {
    reparacion: (brand, t, off) => [
      `${brand} utiliza la plataforma ${t.platform} con arquitectura de ${t.voltageArchitecture}, lo que implica protocolos de seguridad específicos para cualquier intervención en el sistema de alta tensión. Nuestros técnicos conocen en detalle esta plataforma y disponen del equipamiento necesario para trabajar de forma segura.`,
      `El sistema de gestión térmica de ${brand} (${t.thermalManagement.toLowerCase()}) es uno de los más avanzados del segmento. Cuando se presentan problemas de rendimiento, temperatura o limitación de potencia, nuestro equipo sabe exactamente dónde buscar y cómo intervenir.`,
      off ? `Como ${tallerType.toLowerCase()} ${brand}, utilizamos exclusivamente repuestos originales del fabricante y registramos cada intervención en el historial oficial del vehículo.` : `Aunque ${brand} no es una de nuestras marcas de concesionario, disponemos de repuestos de calidad equivalente y el conocimiento técnico necesario para intervenir con total garantía en tu ${brand} eléctrico.`,
    ],
    diagnostico: (brand, t, off) => [
      `El diagnóstico de un ${brand} eléctrico con plataforma ${t.platform.split(" (")[0]} requiere acceso al software ${t.obd2Access.split(" (")[0]} para leer en profundidad los datos del BMS (Battery Management System), la electrónica de potencia y los sistemas de asistencia a la conducción.`,
      `La batería ${t.batteryChemistry.split(" (")[0]} de ${brand} tiene parámetros de salud específicos que monitorizamos: capacidad real vs nominal, resistencia interna por celda, equilibrado entre módulos y temperatura de operación.`,
      `Las actualizaciones de software son un componente clave del diagnóstico. ${brand} utiliza ${t.softwareUpdateMethod}, y verificamos que tu vehículo cuente con la versión más reciente para optimizar rendimiento y autonomía.`,
    ],
    mantenimiento: (brand, t, off) => [
      `La plataforma ${t.platform.split(" (")[0]} de ${brand} tiene intervalos de mantenimiento optimizados para movilidad eléctrica. Sin componentes como el embrague, filtros de combustible o correa de distribución, los costes se reducen significativamente.`,
      `Un aspecto crítico del mantenimiento es la gestión térmica. El sistema de ${brand} (${t.thermalManagement.toLowerCase().substring(0, 60)}) necesita verificación periódica de niveles y funcionamiento para mantener la eficiencia de la batería.`,
      `La frenada regenerativa ${t.regenerativeBraking.split(" con ")[0].toLowerCase()} de ${brand} reduce significativamente el desgaste de los frenos mecánicos, pero estos requieren inspección periódica para evitar cristalización de pastillas.`,
    ],
    carga: (brand, t, off) => [
      `Tu ${brand} utiliza el protocolo de carga ${t.chargingProtocol}, con una potencia máxima de ${t.maxChargingPower}. La elección del wallbox debe ser compatible con estas especificaciones para una carga eficiente.`,
      `Para carga doméstica, ${brand} recomienda wallbox con conector Tipo 2 (Mennekes). Evaluamos tu instalación eléctrica para determinar si es monofásica o trifásica y seleccionamos la potencia óptima de carga.`,
      `La gestión térmica durante la carga es automática en ${brand} (${t.thermalManagement.toLowerCase().substring(0, 60)}), pero la temperatura ambiente afecta la velocidad. En ${CITY}, con temperaturas elevadas en verano, asesoramos sobre la ubicación óptima del wallbox.`,
    ],
    garantia: (brand, t, off) => [
      `La batería ${t.batteryChemistry.split(" (")[0]} de ${brand} con arquitectura de ${t.voltageArchitecture} está diseñada para durar la vida útil del vehículo. La garantía oficial cubre un mínimo del 70% de capacidad durante 8 años o 160.000 km.`,
      `Los componentes del tren motriz eléctrico de ${brand} — motor, inversor y cargador a bordo — cuentan con garantía independiente. ${off ? `Como concesionario oficial, gestionamos directamente las incidencias con ${brand}.` : `Documentamos exhaustivamente cada intervención para preservar todos tus derechos de garantía.`}`,
      `Las actualizaciones de software vía ${t.softwareUpdateMethod.split(" vía ")[0]} están cubiertas por la garantía y no suponen coste adicional. Verificamos que tu ${brand} tenga todas las actualizaciones de seguridad y rendimiento aplicadas.`,
    ],
  };

  const specParas = specializationParagraphs[serviceSlug]?.(brandName, tech, isOfficial) || [];

  const techSpecs = [
    { label: "Plataforma", value: tech.platform, icon: "ri-layout-grid-line" },
    { label: "Química de batería", value: tech.batteryChemistry, icon: "ri-battery-charge-line" },
    { label: "Arquitectura de voltaje", value: tech.voltageArchitecture, icon: "ri-flashlight-line" },
    { label: "Protocolo de carga", value: tech.chargingProtocol, icon: "ri-charging-pile-2-line" },
    { label: "Potencia de carga máxima", value: tech.maxChargingPower, icon: "ri-speed-line" },
    { label: "Frenada regenerativa", value: tech.regenerativeBraking, icon: "ri-brake-line" },
    { label: "Gestión térmica", value: tech.thermalManagement, icon: "ri-temp-hot-line" },
    { label: "Actualizaciones de software", value: tech.softwareUpdateMethod, icon: "ri-download-2-line" },
  ];

  const uniqueFaqsByService: Record<string, ((brand: string, tech: BrandTechProfile) => { question: string; answer: string }[])> = {
    reparacion: (brand, t) => [
      { question: `¿Qué plataforma utiliza mi ${brand} eléctrico y por qué importa para la reparación?`, answer: `Tu ${brand} eléctrico se basa en la plataforma ${t.platform}. Esto determina la disposición de componentes, los protocolos de alta tensión y las herramientas de diagnóstico necesarias. Nuestros técnicos están formados específicamente en esta arquitectura.` },
      { question: `¿Cómo se repara la batería de ${t.batteryChemistry.split(" (")[0]} de ${brand}?`, answer: `La batería de ${brand} con química ${t.batteryChemistry.split(" (")[0]} se puede reparar a nivel de módulo sin necesidad de sustituir el pack completo. Diagnosticamos célula a célula para identificar los módulos afectados y sustituirlos individualmente, reduciendo significativamente el coste.` },
      { question: `¿Tenéis las herramientas de diagnóstico específicas para ${brand}?`, answer: `Sí. Disponemos del software ${t.obd2Access} necesario para el diagnóstico completo de tu ${brand}. Esto nos permite acceder a todos los módulos del vehículo, leer códigos de error específicos y realizar procedimientos de reparación guiada.` },
    ],
    diagnostico: (brand, t) => [
      { question: `¿Qué incluye el diagnóstico de batería de ${brand} con ${t.voltageArchitecture}?`, answer: `El diagnóstico incluye lectura del SOH (State of Health), capacidad real vs nominal, equilibrado entre celdas, resistencia interna, temperatura de operación y ciclos de carga acumulados. Todo con el software ${t.obd2Access.split(" (")[0]}.` },
      { question: `¿Puedo ver un informe del estado de mi ${brand} tras el diagnóstico?`, answer: `Sí. Proporcionamos un informe detallado con el estado de cada subsistema de tu ${brand}: batería (${t.batteryChemistry.split(" (")[0]}), motor eléctrico, inversor, sistema de carga, gestión térmica, frenos y sistemas ADAS. Incluye recomendaciones priorizadas.` },
      { question: `¿El diagnóstico detecta problemas en la gestión térmica de mi ${brand}?`, answer: `Sí. Verificamos el funcionamiento completo del sistema de gestión térmica (${t.thermalManagement.toLowerCase().substring(0, 50)}), incluyendo bomba de refrigeración, válvulas, sensores de temperatura y eficiencia del circuito de refrigeración de la batería.` },
    ],
    mantenimiento: (brand, t) => [
      { question: `¿Cuáles son los elementos específicos del mantenimiento de ${brand} eléctrico?`, answer: `Además de las revisiones estándar (frenos, suspensión, neumáticos), tu ${brand} necesita: verificación de la batería ${t.batteryChemistry.split(" (")[0]}, revisión del sistema de gestión térmica, comprobación de la frenada regenerativa (${t.regenerativeBraking.split(" con ")[0].toLowerCase()}) y actualización de software.` },
      { question: `¿Cada cuánto necesita revisión el sistema de refrigeración de mi ${brand}?`, answer: `El sistema de gestión térmica de tu ${brand} (${t.thermalManagement.toLowerCase().substring(0, 50)}) requiere verificación cada 2 años o 30.000 km. El líquido refrigerante de la batería debe sustituirse según las indicaciones del fabricante, generalmente cada 5 años.` },
      { question: `¿Las actualizaciones de software están incluidas en el mantenimiento?`, answer: `Sí. En cada revisión verificamos y aplicamos las actualizaciones de software disponibles para tu ${brand}. El método de actualización es ${t.softwareUpdateMethod.toLowerCase()}. Las actualizaciones pueden mejorar autonomía, velocidad de carga y funciones del vehículo.` },
    ],
    carga: (brand, t) => [
      { question: `¿Qué potencia de wallbox necesito para mi ${brand}?`, answer: `Tu ${brand} admite carga AC ${t.chargingProtocol.split(" / ")[1] || t.chargingProtocol.split(" / ")[0]}. Para carga nocturna completa, recomendamos wallbox de la máxima potencia que admita tu vehículo y tu instalación eléctrica (monofásica: hasta 7,4 kW; trifásica: hasta 11 o 22 kW).` },
      { question: `¿Cuánto tarda en cargar completamente mi ${brand} en casa?`, answer: `Depende de la potencia del wallbox y la capacidad de la batería. Con wallbox a máxima potencia AC, la carga completa suele realizarse en 6-8 horas (nocturna). En carga DC rápida, tu ${brand} alcanza ${t.maxChargingPower}, pudiendo cargar del 10 al 80% en 20-40 minutos según modelo.` },
      { question: `¿Puedo instalar un wallbox si vivo en un piso con garaje comunitario?`, answer: `Sí. La normativa española te permite instalar un punto de carga en tu plaza de garaje comunitario comunicándolo a la comunidad (no necesitas aprobación). Realizamos el estudio de viabilidad, proyecto técnico y toda la gestión necesaria para tu ${brand} en ${CITY}.` },
    ],
    garantia: (brand, t) => [
      { question: `¿Qué garantía tiene la batería ${t.batteryChemistry.split(" (")[0]} de mi ${brand}?`, answer: `La batería de tu ${brand} con química ${t.batteryChemistry.split(" (")[0]} y arquitectura de ${t.voltageArchitecture} tiene garantía de 8 años o 160.000 km, asegurando al menos el 70% de capacidad original. Monitorizamos el SOH en cada visita para verificar el cumplimiento.` },
      { question: `¿La garantía cubre las actualizaciones de software de mi ${brand}?`, answer: `Sí. Las actualizaciones de software realizadas vía ${t.softwareUpdateMethod.split(" vía ")[0]} están cubiertas y no afectan a la garantía. De hecho, mantener el software actualizado es un requisito para preservar la cobertura de garantía en algunos componentes.` },
      { question: `¿Puedo ampliar la garantía del tren motriz eléctrico de ${brand}?`, answer: `Sí. Ofrecemos extensiones de garantía de 1 a 3 años adicionales que cubren motor eléctrico, inversor, cargador a bordo y electrónica de potencia de la plataforma ${t.platform.split(" (")[0]}. Las condiciones varían según modelo y antigüedad.` },
    ],
  };

  const uniqueFaqs = uniqueFaqsByService[serviceSlug]?.(brandName, tech) || [];

  return {
    h1: selectedH1(brandName),
    metaTitle: `${serviceName} ${brandName} Eléctrico en ${CITY}`,
    metaDescription: `${serviceName} ${brandName} eléctrico e híbrido en ${CITY}. ${tech.certificationLevel.split(" — ")[1] || "Técnicos especializados"}. Pide cita.`,
    introHeading: `Especialistas en ${brandName} eléctrico en ${CITY}`,
    introParagraph: selectedIntro(brandName, tech),
    specialization: {
      heading: `Especialización en ${brandName}: lo que debes saber`,
      paragraphs: specParas,
      techHighlights: [
        { label: "Plataforma", value: tech.platform.split(" (")[0] },
        { label: "Voltaje", value: tech.voltageArchitecture },
        { label: "Batería", value: tech.batteryChemistry.split(" (")[0] },
        { label: "Carga máxima", value: tech.maxChargingPower },
      ],
    },
    commonProblems: problems,
    technologySection: {
      heading: `Tecnología ${brandName} eléctrico: especificaciones técnicas`,
      intro: `Conocer la tecnología específica de tu ${brandName} eléctrico nos permite ofrecer un servicio de ${serviceName.toLowerCase()} más preciso y eficiente. Estas son las especificaciones técnicas relevantes:`,
      specs: techSpecs,
    },
    uniqueFaqs,
    ctaHeading: selectedCta.heading(brandName),
    ctaSubheading: selectedCta.sub(brandName),
  };
}

export function getBrandTechProfile(brandSlug: string): BrandTechProfile | null {
  return brandTechProfiles[brandSlug] || null;
}

export function getBrandCommonProblems(brandSlug: string, serviceSlug: string): BrandCommonProblem[] {
  return brandCommonProblems[brandSlug]?.[serviceSlug] || [];
}
