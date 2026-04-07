import { storage } from "./storage";
import type { InsertFaqCategory, InsertFaq } from "@shared/schema";

const faqCategoriesList: InsertFaqCategory[] = [
  { name: "Autonomía", slug: "autonomia", icon: "ri-battery-2-charge-line", description: "Todo sobre la autonomía de los vehículos eléctricos", sortOrder: 1 },
  { name: "Carga", slug: "carga", icon: "ri-charging-pile-2-line", description: "Información sobre carga y conectores", sortOrder: 2 },
  { name: "Costes", slug: "costes", icon: "ri-money-euro-circle-line", description: "Costes de uso, mantenimiento y seguros", sortOrder: 3 },
  { name: "Ayudas y subvenciones", slug: "ayudas", icon: "ri-hand-coin-line", description: "Plan MOVES y otras ayudas disponibles", sortOrder: 4 },
  { name: "Uso diario", slug: "uso-diario", icon: "ri-steering-2-line", description: "Uso cotidiano del vehículo eléctrico", sortOrder: 5 },
  { name: "Mantenimiento", slug: "mantenimiento", icon: "ri-tools-line", description: "Mantenimiento y duración del vehículo", sortOrder: 6 },
];

const faqsList: Omit<InsertFaq, "categoryId">[] = [
  {
    slug: "cuantos-kilometros-coche-electrico",
    question: "¿Cuántos kilómetros puedo recorrer con un coche eléctrico?",
    answer: `Los vehículos eléctricos actuales ofrecen entre 300 y 600 km de autonomía real, dependiendo del modelo y las condiciones de uso.

**Ejemplos de autonomía por modelo:**
- **Tesla Model 3 Long Range**: hasta 580 km
- **Volkswagen ID.4 Pro**: hasta 520 km
- **Audi Q4 e-tron**: hasta 520 km
- **Škoda Enyaq iV 80**: hasta 510 km
- **Volkswagen ID.3 Pro S**: hasta 550 km

**Factores que afectan la autonomía:**
1. **Estilo de conducción**: Una conducción eficiente puede aumentar la autonomía hasta un 20%
2. **Climatología**: El frío extremo puede reducir la autonomía entre un 10-30%
3. **Velocidad**: A velocidades de autopista (120+ km/h) el consumo aumenta significativamente
4. **Uso de climatización**: El aire acondicionado y la calefacción consumen energía adicional
5. **Carga del vehículo**: Más peso implica mayor consumo

**Consejo práctico**: Para el uso diario (trabajo, compras, ocio), la mayoría de usuarios recorren menos de 50 km al día, por lo que cualquier eléctrico actual cubre sobradamente estas necesidades con una sola carga semanal.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Cuántos kilómetros recorre un coche eléctrico? | Grupo Avisa",
    metaDescription: "Descubre la autonomía real de los coches eléctricos: entre 300 y 600 km según modelo. Comparativa de autonomías VW, Audi, Škoda y más.",
    relatedSlugs: ["autonomia-invierno", "autonomia-real-vs-homologada", "coche-electrico-viajes-largos"],
    sortOrder: 1,
    published: true,
    _category: "autonomia",
  },
  {
    slug: "autonomia-invierno",
    question: "¿La autonomía disminuye en invierno?",
    answer: `Sí, en condiciones de frío extremo la autonomía puede reducirse entre un 10-30%. Esto se debe principalmente a dos factores:

**1. Comportamiento de la batería**
Las baterías de iones de litio funcionan de forma menos eficiente a bajas temperaturas. Las reacciones químicas que generan electricidad se ralentizan con el frío.

**2. Uso de calefacción**
A diferencia de los coches de combustión que aprovechan el calor residual del motor, los eléctricos deben generar calor activamente, lo que consume energía de la batería.

**Soluciones de los fabricantes:**
- **Precondicionamiento**: Calentar el coche mientras está enchufado, sin gastar batería
- **Bombas de calor**: Sistemas más eficientes que las resistencias tradicionales (disponibles en VW ID.3/ID.4, Audi Q4 e-tron, Škoda Enyaq)
- **Gestión térmica activa**: Mantiene la batería en temperatura óptima

**Consejos para maximizar autonomía en invierno:**
1. Precalienta el coche mientras está conectado al cargador
2. Usa los asientos y volante calefactables en lugar de la calefacción general
3. Aparca en garaje siempre que sea posible
4. Planifica rutas con cargadores si vas a hacer viajes largos`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿La autonomía del coche eléctrico baja en invierno? | Grupo Avisa",
    metaDescription: "La autonomía puede reducirse 10-30% en frío extremo. Descubre por qué y cómo maximizar la autonomía de tu eléctrico en invierno.",
    relatedSlugs: ["cuantos-kilometros-coche-electrico", "duracion-bateria-coche-electrico"],
    sortOrder: 2,
    published: true,
    _category: "autonomia",
  },
  {
    slug: "autonomia-real-vs-homologada",
    question: "¿Qué diferencia hay entre autonomía real y homologada?",
    answer: `La autonomía homologada se mide en condiciones de laboratorio según el ciclo WLTP (Worldwide Harmonised Light Vehicle Test Procedure), mientras que la autonomía real depende de las condiciones de uso.

**Ciclo WLTP:**
- Pruebas en laboratorio con temperatura controlada (23°C)
- Velocidades medias moderadas
- Sin uso de climatización
- Neumáticos y presión específicos

**En la práctica:**
La autonomía real suele ser un 10-20% inferior a la homologada, dependiendo de:
- Conducción en autopista vs ciudad
- Uso de aire acondicionado o calefacción
- Estilo de conducción
- Condiciones meteorológicas

**Ejemplo práctico:**
Un Volkswagen ID.4 con 520 km de WLTP puede ofrecer:
- 450-480 km en uso mixto real
- 350-400 km en autopista a 120 km/h
- 500+ km en ciudad con conducción eficiente

**Consejo**: Calcula tu autonomía real restando un 15% a la cifra WLTP para tener una estimación conservadora.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Autonomía real vs homologada WLTP en coches eléctricos | Grupo Avisa",
    metaDescription: "Diferencia entre autonomía real y WLTP en coches eléctricos. La real suele ser 10-20% menor. Ejemplos prácticos con VW ID.4.",
    relatedSlugs: ["cuantos-kilometros-coche-electrico", "coche-electrico-viajes-largos"],
    sortOrder: 3,
    published: true,
    _category: "autonomia",
  },
  {
    slug: "tiempo-carga-coche-electrico",
    question: "¿Cuánto tiempo tarda en cargar un coche eléctrico?",
    answer: `El tiempo de carga depende del tipo de cargador y la capacidad de la batería:

**Tipos de carga:**

**1. Carga doméstica (Wallbox 7-11 kW)**
- Tiempo: 6-8 horas para carga completa
- Ideal para: Cargar por la noche mientras duermes
- Coste instalación: 800-1.500€ (con ayudas MOVES puede ser gratuito)

**2. Carga en destino (11-22 kW)**
- Tiempo: 3-5 horas
- Ubicación: Centros comerciales, hoteles, parkings
- Ideal para: Mientras trabajas o haces compras

**3. Carga rápida DC (50 kW)**
- Tiempo: 30-60 minutos al 80%
- Ubicación: Estaciones de servicio, electrolineras
- Ideal para: Viajes largos

**4. Carga ultrarrápida (150-350 kW)**
- Tiempo: 15-30 minutos al 80%
- Ubicación: Corredores de autopista
- Ideal para: Paradas rápidas en viajes

**¿Por qué solo hasta el 80%?**
La carga se ralentiza a partir del 80% para proteger la batería. Del 80% al 100% puede tardar tanto como del 10% al 80%.

**Dato importante**: El 90% de las cargas se realizan en casa por la noche. La carga rápida es solo para viajes ocasionales.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Cuánto tarda en cargar un coche eléctrico? | Grupo Avisa",
    metaDescription: "Tiempos de carga: en casa 6-8h, carga rápida 30-60min, ultrarrápida 15-30min. Todo sobre los tipos de carga para eléctricos.",
    relatedSlugs: ["punto-carga-garaje-comunitario", "tipos-conectores-carga", "cuanto-cuesta-cargar-coche-electrico"],
    sortOrder: 1,
    published: true,
    _category: "carga",
  },
  {
    slug: "punto-carga-garaje-comunitario",
    question: "¿Puedo instalar un punto de carga en mi garaje comunitario?",
    answer: `Sí, la ley garantiza el derecho a instalar puntos de recarga en garajes comunitarios. El Real Decreto-ley 29/2021 simplificó enormemente el proceso.

**Proceso de instalación:**

**1. Notificación a la comunidad**
- Solo necesitas comunicarlo por escrito al presidente o administrador
- NO requiere aprobación de la junta de propietarios
- La comunidad tiene 2 meses para proponer alternativas

**2. Requisitos técnicos**
- Instalación realizada por electricista autorizado
- Boletín eléctrico de la instalación
- Contador individual para tu plaza

**3. Opciones de instalación**
- **Individual**: Punto de carga solo para tu plaza
- **Preinstalación comunitaria**: La comunidad instala la infraestructura base y cada vecino su punto

**Costes aproximados:**
- Wallbox + instalación: 1.000-2.000€
- Con ayuda Plan MOVES: Puede ser gratuito (hasta 70% subvencionado)

**Grupo Avisa te ayuda:**
- Estudio de viabilidad gratuito
- Gestión de permisos y comunicaciones
- Instalación homologada
- Tramitación de ayudas MOVES

Contacta con nosotros para un presupuesto sin compromiso.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Instalar punto de carga en garaje comunitario | Grupo Avisa",
    metaDescription: "La ley te permite instalar un punto de carga sin aprobación de la junta. Proceso, costes y ayudas disponibles.",
    relatedSlugs: ["tiempo-carga-coche-electrico", "ayudas-comprar-coche-electrico"],
    sortOrder: 2,
    published: true,
    _category: "carga",
  },
  {
    slug: "tipos-conectores-carga",
    question: "¿Qué tipos de conectores de carga existen?",
    answer: `En Europa se utilizan principalmente dos tipos de conectores, dependiendo del tipo de carga:

**Carga en corriente alterna (AC) - Carga lenta/semi-rápida:**

**Tipo 2 (Mennekes)**
- Estándar europeo para carga AC
- Potencia: hasta 22 kW (trifásica) o 7,4 kW (monofásica)
- Uso: Wallbox domésticos, puntos de carga en destino
- Todos los coches eléctricos en Europa lo incluyen

**Carga en corriente continua (DC) - Carga rápida:**

**CCS Combo 2**
- Combina el Tipo 2 con pines adicionales para DC
- Potencia: 50-350 kW
- Uso: Electrolineras, estaciones de carga rápida
- Estándar en todos los VW, Audi, Škoda y la mayoría de marcas

**CHAdeMO**
- Estándar japonés, cada vez menos común en Europa
- Usado principalmente por Nissan Leaf y algunos Mitsubishi
- En desuso progresivo

**Tesla (NACS)**
- Conector propietario de Tesla
- En Europa, los Tesla usan CCS Combo 2

**Consejo práctico**: Si compras un Volkswagen, Audi o Škoda, solo necesitas preocuparte del Tipo 2 (para casa) y CCS (para viajes). Ambos vienen de serie.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Tipos de conectores de carga para coches eléctricos | Grupo Avisa",
    metaDescription: "Guía completa de conectores: Tipo 2 (Mennekes) para carga lenta y CCS Combo 2 para carga rápida. Todo lo que necesitas saber.",
    relatedSlugs: ["tiempo-carga-coche-electrico", "cargar-coche-electrico-lluvia"],
    sortOrder: 3,
    published: true,
    _category: "carga",
  },
  {
    slug: "cargar-coche-electrico-lluvia",
    question: "¿Es seguro cargar el coche eléctrico con lluvia?",
    answer: `Sí, es completamente seguro. Los conectores y sistemas de carga están diseñados con múltiples protecciones para garantizar la seguridad en cualquier condición meteorológica.

**Sistemas de seguridad:**

**1. Conectores sellados**
- Clasificación IP (Ingress Protection) alta
- Protección contra agua y polvo
- Contactos protegidos hasta que se establece la conexión

**2. Comunicación inteligente**
- El coche y el cargador "hablan" antes de iniciar la carga
- Solo fluye corriente cuando la conexión es segura
- Detección automática de fallos

**3. Protecciones eléctricas**
- Diferencial de alta sensibilidad
- Detección de fugas a tierra
- Corte automático ante cualquier anomalía

**4. Diseño del conector**
- Los pines de corriente están en el interior
- El agua no puede alcanzar las partes activas
- Materiales resistentes a la corrosión

**Dato curioso**: Los coches eléctricos son incluso más seguros que los de combustión en inundaciones, ya que no tienen toma de aire que pueda inundar el motor.

**Recomendación**: Aunque es seguro, evita manipular el conector con las manos mojadas por comodidad, no por seguridad.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Es seguro cargar un coche eléctrico con lluvia? | Grupo Avisa",
    metaDescription: "Sí, es totalmente seguro. Los conectores tienen múltiples protecciones IP, detección de fallos y corte automático.",
    relatedSlugs: ["tipos-conectores-carga", "punto-carga-garaje-comunitario"],
    sortOrder: 4,
    published: true,
    _category: "carga",
  },
  {
    slug: "cuanto-cuesta-cargar-coche-electrico",
    question: "¿Cuánto cuesta cargar un coche eléctrico?",
    answer: `El coste de cargar un coche eléctrico es significativamente menor que repostar gasolina o diésel:

**Carga en casa (la más económica):**
- Tarifa normal: 2-3€ por cada 100 km
- Tarifa nocturna (valle): 1-1,5€ por cada 100 km
- Coste mensual típico (1.000 km): 20-30€

**Carga pública:**
- Carga lenta/semi-rápida: 3-5€ por cada 100 km
- Carga rápida (50 kW): 6-8€ por cada 100 km
- Carga ultrarrápida (150+ kW): 8-12€ por cada 100 km

**Comparativa con combustión:**
| | Eléctrico | Gasolina | Diésel |
|---|---|---|---|
| Coste/100 km | 2-3€ | 10-12€ | 8-10€ |
| Coste mensual (1.000 km) | 20-30€ | 100-120€ | 80-100€ |
| Ahorro anual | - | 800-1.000€ | 600-800€ |

**Consejos para ahorrar:**
1. Contrata una tarifa con discriminación horaria
2. Carga por la noche (22:00-08:00)
3. Aprovecha cargadores gratuitos en centros comerciales
4. Usa apps como Electromaps para encontrar los mejores precios

**Ejemplo real**: Un VW ID.4 con batería de 77 kWh cargado en casa con tarifa nocturna (0,10€/kWh) cuesta unos 7,70€ para 450 km de autonomía.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Cuánto cuesta cargar un coche eléctrico? | Grupo Avisa",
    metaDescription: "Cargar en casa cuesta 2-3€/100km vs 10-12€ en gasolina. Ahorro anual de 800-1.000€. Comparativa detallada de costes.",
    relatedSlugs: ["mantenimiento-coche-electrico", "tiempo-carga-coche-electrico"],
    sortOrder: 1,
    published: true,
    _category: "costes",
  },
  {
    slug: "mantenimiento-coche-electrico",
    question: "¿Qué mantenimiento necesita un coche eléctrico?",
    answer: `El mantenimiento de un coche eléctrico es mucho más sencillo y económico que el de un vehículo de combustión:

**Mantenimiento necesario:**

**Cada año o 30.000 km:**
- Revisión general de sistemas
- Comprobación de frenos
- Líquido limpiaparabrisas
- Filtro de habitáculo

**Cada 2 años o 60.000 km:**
- Líquido de frenos
- Revisión del sistema de refrigeración de batería

**Cada 4-5 años:**
- Líquido refrigerante de batería
- Neumáticos (duran menos por el mayor peso y par)

**Comparativa de costes anuales:**
| Concepto | Eléctrico | Combustión |
|---|---|---|
| Revisión anual | 100-150€ | 200-400€ |
| Frenos | Duran 2x más | Normal |
| Ahorro anual | 200-400€ | - |

**Curiosidad**: Los frenos de un eléctrico duran mucho más porque la frenada regenerativa hace la mayor parte del trabajo.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Mantenimiento de un coche eléctrico: guía completa | Grupo Avisa",
    metaDescription: "El mantenimiento de un eléctrico cuesta 100-150€/año vs 300-500€ en combustión. Sin cambios de aceite ni correa de distribución.",
    relatedSlugs: ["cuanto-cuesta-cargar-coche-electrico", "revision-coche-electrico"],
    sortOrder: 2,
    published: true,
    _category: "costes",
  },
  {
    slug: "seguro-coche-electrico",
    question: "¿Es más caro el seguro de un coche eléctrico?",
    answer: `No necesariamente. Aunque el valor del vehículo puede ser mayor, hay factores que compensan:

**Factores que pueden encarecer:**
- Mayor valor del vehículo
- Coste de reparación de batería (en caso de accidente grave)
- Menor disponibilidad de talleres especializados

**Factores que pueden abaratar:**
- Perfil del conductor (suelen ser conductores más prudentes)
- Menor siniestralidad estadística
- Bonificaciones por vehículo ecológico
- Menor riesgo de incendio

**Comparativa real:**
Un seguro a todo riesgo para un VW ID.4 puede costar entre 500-800€/año, similar a un Tiguan de combustión equivalente.

**Consejos para ahorrar:**
1. Compara entre varias aseguradoras
2. Pregunta por descuentos para vehículos eléctricos
3. Considera franquicias más altas
4. Agrupa seguros (hogar + coche)

**Coberturas recomendadas:**
- Todo riesgo con franquicia
- Asistencia en carretera 24h
- Vehículo de sustitución
- Cobertura específica para batería

**En Grupo Avisa** colaboramos con aseguradoras que ofrecen condiciones especiales para vehículos eléctricos. Pregúntanos al adquirir tu vehículo.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Es más caro el seguro de un coche eléctrico? | Grupo Avisa",
    metaDescription: "El seguro de un eléctrico es similar al de un coche de combustión equivalente. Consejos para ahorrar y coberturas recomendadas.",
    relatedSlugs: ["mantenimiento-coche-electrico", "garantia-bateria-electrico"],
    sortOrder: 3,
    published: true,
    _category: "costes",
  },
  {
    slug: "ayudas-comprar-coche-electrico",
    question: "¿Qué ayudas existen para comprar un coche eléctrico?",
    answer: `Existen múltiples ayudas que pueden reducir significativamente el precio de tu vehículo eléctrico:

**Plan MOVES III (Nacional):**

| Tipo de vehículo | Sin achatarramiento | Con achatarramiento |
|---|---|---|
| Eléctrico (BEV) | 4.500€ | 7.000€ |
| Híbrido enchufable (PHEV) | 2.500€ | 5.000€ |
| Punto de recarga | Hasta 70% (máx. 1.500€) | - |

**Ayudas autonómicas (Andalucía):**
- Hasta 2.000€ adicionales según municipio
- Acumulables con Plan MOVES

**Beneficios fiscales:**
- **Impuesto de circulación**: Hasta 75% de bonificación
- **Impuesto de matriculación**: Exento (0%)
- **IVA**: Tipo general (21%), pero sobre precio ya reducido

**Otros beneficios:**
- Acceso a zonas de bajas emisiones
- Aparcamiento gratuito o reducido en muchas ciudades
- Peajes reducidos en algunas autopistas
- Carril VAO sin restricciones

**Ejemplo práctico:**
Un VW ID.4 de 45.000€ puede quedarse en:
- Precio base: 45.000€
- Plan MOVES (con achatarramiento): -7.000€
- Ayuda autonómica: -2.000€
- **Precio final: 36.000€**

Además, ahorrarás unos 1.500€/año en combustible y mantenimiento.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Ayudas para comprar coche eléctrico 2024: Plan MOVES y más | Grupo Avisa",
    metaDescription: "Hasta 7.000€ en ayudas Plan MOVES III + ayudas autonómicas + beneficios fiscales. Guía completa de subvenciones para eléctricos.",
    relatedSlugs: ["plan-moves-grupo-avisa", "combinar-ayudas-plan-moves"],
    sortOrder: 1,
    published: true,
    _category: "ayudas",
  },
  {
    slug: "plan-moves-grupo-avisa",
    question: "¿Grupo Avisa gestiona las ayudas del Plan MOVES?",
    answer: `Sí, en Grupo Avisa nos encargamos de toda la tramitación del Plan MOVES sin ningún coste adicional para ti.

**Nuestro servicio incluye:**

**1. Asesoramiento personalizado**
- Análisis de tu situación particular
- Cálculo de la ayuda máxima a la que puedes optar
- Recomendación del mejor momento para comprar

**2. Gestión documental completa**
- Recopilación de toda la documentación necesaria
- Cumplimentación de formularios
- Presentación telemática de la solicitud
- Seguimiento del expediente

**3. Adelanto de la ayuda**
- No tienes que esperar 3-6 meses a que se apruebe
- Descontamos el importe de la ayuda directamente del precio
- Tú disfrutas del descuento desde el primer día

**4. Gestión del achatarramiento**
- Tramitamos la baja definitiva de tu vehículo antiguo
- Nos encargamos de la documentación
- Certificado de destrucción incluido

**Resultados:**
- +500 clientes beneficiados
- 3,2 millones € en ayudas gestionadas
- 100% de solicitudes aprobadas
- Valoración media: 4,9/5

**¿Por qué es gratuito?**
Porque queremos facilitar al máximo la transición a la movilidad eléctrica. Es parte de nuestro compromiso con la sostenibilidad.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Gestión Plan MOVES gratuita en Grupo Avisa | Sevilla",
    metaDescription: "Grupo Avisa tramita el Plan MOVES gratis: asesoramiento, documentación, adelanto de ayuda y gestión de achatarramiento.",
    relatedSlugs: ["ayudas-comprar-coche-electrico", "combinar-ayudas-plan-moves"],
    sortOrder: 2,
    published: true,
    _category: "ayudas",
  },
  {
    slug: "combinar-ayudas-plan-moves",
    question: "¿Puedo combinar el Plan MOVES con otras ayudas?",
    answer: `Sí, puedes acumular diferentes ayudas para maximizar el descuento en tu vehículo eléctrico:

**Ayudas acumulables:**

**1. Plan MOVES III + Ayudas autonómicas**
- Totalmente compatibles
- En Andalucía: hasta 2.000€ adicionales
- En otras comunidades: varía según programa

**2. Plan MOVES III + Ayudas municipales**
- Algunos ayuntamientos ofrecen ayudas propias
- Consulta en tu localidad

**3. Plan MOVES III + Descuentos de marca**
- Las ofertas del fabricante son compatibles
- Financiación especial, descuentos por stock, etc.

**Ejemplo máximo en Andalucía:**
| Concepto | Importe |
|---|---|
| Plan MOVES III (con achatarramiento) | 7.000€ |
| Ayuda Junta de Andalucía | 1.500€ |
| Ayuda municipal (según ciudad) | 500€ |
| **Total ayudas** | **9.000€** |

**Limitaciones:**
- El total de ayudas no puede superar el 40% del precio del vehículo (particulares)
- Para empresas, el límite es del 35%
- Vehículos de más de 45.000€ (sin IVA) no son elegibles

**Importante**: En Grupo Avisa te informamos de todas las ayudas disponibles en tu zona y te ayudamos a solicitarlas todas.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Combinar Plan MOVES con otras ayudas | Grupo Avisa",
    metaDescription: "Puedes acumular hasta 9.000€ en ayudas: Plan MOVES + autonómicas + municipales. Guía para maximizar tu descuento.",
    relatedSlugs: ["ayudas-comprar-coche-electrico", "requisitos-plan-moves"],
    sortOrder: 3,
    published: true,
    _category: "ayudas",
  },
  {
    slug: "requisitos-plan-moves",
    question: "¿Cuáles son los requisitos del Plan MOVES?",
    answer: `Para acceder a las ayudas del Plan MOVES III debes cumplir los siguientes requisitos:

**Requisitos del beneficiario:**
- Ser persona física, autónomo, empresa o entidad
- Residir en España
- Estar al corriente de obligaciones tributarias y con la Seguridad Social
- No estar en situación de crisis empresarial (para empresas)

**Requisitos del vehículo:**
- Vehículo nuevo (no matriculado previamente)
- Precio máximo: 45.000€ (sin IVA) para turismos
- Para furgonetas: 53.000€ (sin IVA)

**Para vehículos eléctricos (BEV):**
- Autonomía mínima: 30 km (WLTP)
- Categorías: M1, N1, L (motos y cuadriciclos)

**Para híbridos enchufables (PHEV):**
- Autonomía eléctrica mínima: 40 km (WLTP)
- Emisiones máximas: 50 g CO2/km

**Para obtener la ayuda máxima (achatarramiento):**
- Dar de baja un vehículo de más de 7 años
- El vehículo debe estar a tu nombre desde hace al menos 12 meses
- Debe tener ITV en vigor o caducada hace menos de 2 años

**Documentación necesaria:**
1. DNI/NIE del solicitante
2. Certificado de empadronamiento
3. Factura del vehículo nuevo
4. Permiso de circulación del vehículo a achatarrar (si aplica)
5. Ficha técnica del vehículo a achatarrar (si aplica)

**Compromiso de mantenimiento:**
- Mantener el vehículo al menos 2 años (particulares)
- 3 años para empresas y autónomos`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Requisitos Plan MOVES III para coches eléctricos | Grupo Avisa",
    metaDescription: "Requisitos completos del Plan MOVES: beneficiario, vehículo, achatarramiento y documentación necesaria.",
    relatedSlugs: ["ayudas-comprar-coche-electrico", "plan-moves-grupo-avisa"],
    sortOrder: 4,
    published: true,
    _category: "ayudas",
  },
  {
    slug: "coche-electrico-viajes-largos",
    question: "¿Es práctico un coche eléctrico para viajes largos?",
    answer: `Sí, los viajes largos con un coche eléctrico son perfectamente viables gracias a la extensa red de cargadores rápidos.

**Red de carga en España:**
- +15.000 puntos de carga públicos
- Cargadores rápidos cada 50-100 km en autopistas principales
- Redes como Ionity, Iberdrola, Repsol, Endesa X

**Planificación del viaje:**

**Ejemplo: Sevilla - Madrid (530 km)**
- Autonomía VW ID.4: ~450 km reales en autopista
- Parada recomendada: 1 carga de 20-25 min
- Tiempo total: similar a combustión (parada para café)

**Apps útiles:**
- **Electromaps**: Mapa de cargadores en España
- **A Better Route Planner**: Planificador de rutas
- **Plugshare**: Red global de cargadores

**Consejos para viajes largos:**
1. Planifica las paradas con antelación
2. Carga hasta el 80% (es más rápido)
3. Aprovecha las paradas para descansar
4. Precalienta la batería antes de llegar al cargador

**Ventajas vs combustión:**
- Más silencioso y relajado
- Menor fatiga del conductor
- Paradas más cortas pero más frecuentes (mejor para la salud)
- Coste del viaje: 50-70% menor

**Realidad**: La mayoría de conductores hacen 1-2 viajes largos al año. El 95% del tiempo, el coche se usa para trayectos cortos donde el eléctrico es imbatible.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Viajes largos con coche eléctrico: ¿es práctico? | Grupo Avisa",
    metaDescription: "Viajes largos en eléctrico son viables: red de cargadores rápidos cada 50-100km. Ejemplo Sevilla-Madrid con 1 parada de 25min.",
    relatedSlugs: ["cuantos-kilometros-coche-electrico", "tiempo-carga-coche-electrico"],
    sortOrder: 1,
    published: true,
    _category: "uso-diario",
  },
  {
    slug: "remolcar-coche-electrico",
    question: "¿Puedo remolcar con un coche eléctrico?",
    answer: `Sí, muchos modelos eléctricos pueden remolcar, y el par motor instantáneo los hace especialmente capaces para esta tarea.

**Capacidad de remolque por modelo:**

| Modelo | Capacidad máx. | Tipo |
|---|---|---|
| Tesla Model X | 2.250 kg | SUV |
| Audi e-tron | 1.800 kg | SUV |
| Mercedes EQC | 1.800 kg | SUV |
| VW ID.4 | 1.200 kg | SUV |
| Škoda Enyaq | 1.200 kg | SUV |
| VW ID.Buzz | 1.000 kg | Furgoneta |

**Ventajas del eléctrico para remolcar:**
- **Par instantáneo**: Arranque suave sin tirones
- **Control de tracción**: Mejor gestión en pendientes
- **Frenada regenerativa**: Ayuda a controlar el remolque en bajadas

**Consideraciones importantes:**
- La autonomía se reduce un 30-50% remolcando
- Planifica más paradas de carga
- Usa el modo de conducción adecuado
- Respeta los límites de peso

**Consejo práctico**: Si remolcas habitualmente (caravana, barco, remolque de caballos), elige un modelo con mayor capacidad de remolque y batería grande.

**En Grupo Avisa** te asesoramos sobre el modelo más adecuado para tus necesidades de remolque.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Puedo remolcar con un coche eléctrico? | Grupo Avisa",
    metaDescription: "Muchos eléctricos pueden remolcar: VW ID.4 hasta 1.200kg, Audi e-tron hasta 1.800kg. Par instantáneo ideal para remolque.",
    relatedSlugs: ["coche-electrico-viajes-largos", "ayudas-comprar-coche-electrico"],
    sortOrder: 2,
    published: true,
    _category: "uso-diario",
  },
  {
    slug: "coche-electrico-familia",
    question: "¿Es un coche eléctrico adecuado para una familia?",
    answer: `Absolutamente. Existen numerosos modelos familiares con amplio espacio interior y maletero generoso.

**Modelos familiares destacados:**

| Modelo | Maletero | Autonomía | Plazas |
|---|---|---|---|
| VW ID.4 | 543L | 520 km | 5 |
| Škoda Enyaq | 585L | 510 km | 5 |
| Audi Q4 e-tron | 520L | 520 km | 5 |
| VW ID.Buzz | 1.121L | 420 km | 5-7 |
| Tesla Model Y | 854L | 533 km | 5-7 |

**Ventajas para familias:**
- **Maletero plano**: Sin túnel de transmisión, más espacio
- **Silencio**: Los niños pueden dormir en el coche
- **Suelo plano**: Más espacio para las piernas en la fila trasera
- **Climatización sin motor**: Puedes dejar el coche climatizado sin contaminación
- **Seguridad**: Centro de gravedad bajo, mejor estabilidad

**Costes familiares:**
- Ahorro mensual en combustible: 80-100€
- Menos visitas al taller
- Impuestos reducidos

**El VW ID.Buzz**: Es la opción perfecta para familias numerosas, con hasta 7 plazas y un maletero enorme.

**Consejo**: Ven a probar nuestros modelos familiares. En Grupo Avisa tenemos todos disponibles para prueba.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Coches eléctricos familiares: mejores modelos | Grupo Avisa",
    metaDescription: "Los mejores eléctricos para familias: VW ID.4, Škoda Enyaq, ID.Buzz hasta 7 plazas. Maleteros amplios y ahorro mensual de 80-100€.",
    relatedSlugs: ["cuantos-kilometros-coche-electrico", "coche-electrico-viajes-largos"],
    sortOrder: 3,
    published: true,
    _category: "uso-diario",
  },
  {
    slug: "revision-coche-electrico",
    question: "¿Cada cuánto tiempo debo revisar mi coche eléctrico?",
    answer: `Los vehículos eléctricos requieren menos mantenimiento, pero es importante seguir un calendario de revisiones:

**Calendario de mantenimiento recomendado:**

**Cada año o 30.000 km:**
- Inspección visual general
- Comprobación de frenos
- Revisión de neumáticos
- Filtro de habitáculo
- Líquido limpiaparabrisas
- Actualización de software

**Cada 2 años o 60.000 km:**
- Líquido de frenos
- Diagnóstico de batería de alto voltaje
- Revisión del sistema de refrigeración

**Cada 4 años o 120.000 km:**
- Líquido refrigerante de batería
- Revisión completa del sistema eléctrico

**Comparativa con combustión:**
| Intervención | Eléctrico | Combustión |
|---|---|---|
| Cambio aceite | No necesario | Cada 15.000 km |
| Filtro combustible | No existe | Cada 60.000 km |
| Bujías | No existen | Cada 60.000 km |
| Correa distribución | No existe | Cada 120.000 km |
| Embrague | No existe | Según desgaste |

**Coste medio anual:**
- Eléctrico: 100-150€
- Combustión: 300-500€

**En Grupo Avisa** disponemos de técnicos certificados y equipamiento oficial para el mantenimiento de vehículos eléctricos Volkswagen, Audi y Škoda.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Revisiones del coche eléctrico: calendario completo | Grupo Avisa",
    metaDescription: "Calendario de revisiones para eléctricos: anual, bianual y cada 4 años. Coste medio 100-150€/año vs 300-500€ en combustión.",
    relatedSlugs: ["mantenimiento-coche-electrico", "duracion-bateria-coche-electrico"],
    sortOrder: 1,
    published: true,
    _category: "mantenimiento",
  },
  {
    slug: "duracion-bateria-coche-electrico",
    question: "¿Cuánto dura la batería de un coche eléctrico?",
    answer: `Las baterías modernas de los coches eléctricos están diseñadas para durar toda la vida útil del vehículo:

**Vida útil esperada:**
- **Años**: 15-20 años de uso normal
- **Kilómetros**: 300.000-500.000 km
- **Ciclos de carga**: 1.500-2.000 ciclos completos

**Degradación de la batería:**
La capacidad de la batería disminuye gradualmente con el tiempo:
- Tras 8 años: ~90% de capacidad original
- Tras 15 años: ~80% de capacidad original

**Ejemplo práctico:**
Un VW ID.4 con 520 km de autonomía nuevo, tras 10 años podría tener ~450 km. Sigue siendo más que suficiente para el uso diario.

**Factores que afectan la duración:**
1. **Temperatura**: Evitar exposición prolongada a calor extremo
2. **Carga rápida**: Usar con moderación (no afecta si es ocasional)
3. **Nivel de carga**: Mantener entre 20-80% para uso diario
4. **Carga completa**: Solo cuando sea necesario para viajes

**Buenas prácticas:**
- Carga nocturna lenta en casa (la mejor para la batería)
- No dejar el coche al sol con batería al 100%
- Usar precondicionamiento antes de cargar en frío

**Segunda vida:**
Cuando la batería ya no es óptima para el coche (~70% capacidad), puede usarse para almacenamiento estacionario de energía solar.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "¿Cuánto dura la batería de un coche eléctrico? | Grupo Avisa",
    metaDescription: "Las baterías duran 15-20 años o 300.000-500.000 km. Tras 8 años mantienen ~90% de capacidad. Consejos para maximizar duración.",
    relatedSlugs: ["garantia-bateria-electrico", "revision-coche-electrico"],
    sortOrder: 2,
    published: true,
    _category: "mantenimiento",
  },
  {
    slug: "garantia-bateria-electrico",
    question: "¿Qué garantía tiene la batería de un vehículo eléctrico?",
    answer: `Los fabricantes ofrecen garantías extensas para las baterías de alto voltaje, demostrando su confianza en la tecnología:

**Garantías por marca:**

| Marca | Años | Kilómetros | Capacidad mín. |
|---|---|---|---|
| Volkswagen | 8 años | 160.000 km | 70% |
| Audi | 8 años | 160.000 km | 70% |
| Škoda | 8 años | 160.000 km | 70% |
| Tesla | 8 años | 192.000 km | 70% |
| Hyundai/Kia | 8 años | 160.000 km | 70% |

**¿Qué cubre la garantía?**
- Defectos de fabricación
- Degradación excesiva (por debajo del % garantizado)
- Fallos del sistema de gestión de batería (BMS)
- Problemas de celdas individuales

**¿Qué NO cubre?**
- Daños por accidente
- Uso indebido (modificaciones no autorizadas)
- Degradación normal dentro de los parámetros

**Importante:**
La garantía de la batería es independiente de la garantía general del vehículo (normalmente 2-3 años).

**Tranquilidad adicional:**
- Los datos reales muestran que la mayoría de baterías superan ampliamente los mínimos garantizados
- Casos de sustitución de batería por degradación son extremadamente raros

**En Grupo Avisa** realizamos diagnósticos de batería certificados que te informan del estado de salud (SOH) de tu batería en cualquier momento.`,
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    metaTitle: "Garantía de batería en coches eléctricos por marca | Grupo Avisa",
    metaDescription: "Todas las marcas ofrecen 8 años/160.000km de garantía de batería con mínimo 70% de capacidad. Detalle por marca.",
    relatedSlugs: ["duracion-bateria-coche-electrico", "seguro-coche-electrico"],
    sortOrder: 3,
    published: true,
    _category: "mantenimiento",
  },
] as any;

export async function seedFaqs() {
  const existingCategories = await storage.getFaqCategories();
  if (existingCategories.length > 0) return;

  const categoryMap: Record<string, string> = {};

  for (const cat of faqCategoriesList) {
    const created = await storage.createFaqCategory(cat);
    categoryMap[cat.slug] = created.id;
  }
  console.log(`Seeded ${faqCategoriesList.length} FAQ categories`);

  for (const faq of faqsList) {
    const catSlug = (faq as any)._category;
    const categoryId = categoryMap[catSlug];
    if (!categoryId) continue;

    const { _category, ...faqData } = faq as any;
    await storage.createFaq({ ...faqData, categoryId });
  }
  console.log(`Seeded ${faqsList.length} FAQs`);
}
