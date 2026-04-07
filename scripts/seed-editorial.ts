import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { editorialContent } from "../shared/schema";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

const articles = [
  {
    type: "novedad",
    slug: "volkswagen-id7-tourer-2025-llega-espana",
    title: "Volkswagen ID.7 Tourer 2025 llega a España",
    excerpt: "El familiar eléctrico de Volkswagen ya está disponible en los concesionarios españoles con hasta 700 km de autonomía WLTP y carga rápida a 200 kW.",
    content: `## El familiar eléctrico más esperado

El Volkswagen ID.7 Tourer llega por fin al mercado español como el familiar eléctrico de referencia de la marca alemana. Con una autonomía de hasta **700 km según el ciclo WLTP** y capacidad de carga rápida de 200 kW, se posiciona como una alternativa real para quienes necesitan espacio y autonomía sin renunciar a la movilidad eléctrica.

### Características destacadas

- **Autonomía WLTP**: hasta 700 km con batería de 86 kWh
- **Carga rápida**: de 10% a 80% en 26 minutos (200 kW DC)
- **Maletero**: 605 litros (1.714 litros con asientos abatidos)
- **Potencia**: desde 286 CV en la versión Pro S

### Precio y disponibilidad

El ID.7 Tourer está disponible en Grupo Avisa desde **57.050€** antes de ayudas. Con el Plan MOVES III y el descuento de marca, el precio final puede reducirse significativamente.

### ¿Por qué elegir un ID.7 Tourer?

Para las familias que buscan un coche amplio, cómodo y 100% eléctrico, el ID.7 Tourer ofrece la combinación perfecta de espacio, autonomía y tecnología. Su sistema de infoentretenimiento con pantalla de 15 pulgadas y la integración con asistentes de voz hacen que cada viaje sea más fácil.

Visita nuestros concesionarios en Sevilla, Córdoba o Dos Hermanas para probarlo.`,
    category: "lanzamientos",
    tags: ["volkswagen", "id7", "familiar", "eléctrico", "2025"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1617886903355-9354e2b281a2?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-03-01"),
    metaTitle: "Volkswagen ID.7 Tourer 2025 en España",
    metaDescription: "El Volkswagen ID.7 Tourer 2025 llega a España con 700 km de autonomía, carga rápida 200 kW y maletero de 605L. Disponible en Grupo Avisa.",
    readingTime: 4,
    relatedVehicleType: "electrico",
  },
  {
    type: "novedad",
    slug: "plan-moves-iv-ayudas-coches-electricos-2025",
    title: "Plan MOVES IV: nuevas ayudas para eléctricos",
    excerpt: "El Gobierno aprueba el Plan MOVES IV con ayudas de hasta 7.000€ para la compra de vehículos eléctricos. Te explicamos los requisitos y cómo solicitarlo.",
    content: `## Nuevas ayudas para vehículos eléctricos en 2025

El Consejo de Ministros ha aprobado el **Plan MOVES IV**, que mantiene las ayudas directas para la compra de vehículos eléctricos e híbridos enchufables con un presupuesto de 800 millones de euros.

### Cuantías del Plan MOVES IV

| Tipo de vehículo | Sin achatarramiento | Con achatarramiento |
|---|---|---|
| Eléctrico puro (BEV) | 4.500€ | 7.000€ |
| Híbrido enchufable (PHEV) | 2.500€ | 5.000€ |
| Moto eléctrica | 1.100€ | 1.300€ |

### Requisitos principales

1. El vehículo debe tener un precio máximo de **45.000€** (IVA no incluido)
2. Se debe mantener la titularidad durante al menos **2 años**
3. Para el bonus de achatarramiento, el vehículo entregado debe tener más de **7 años**

### ¿Cómo solicitarlo en Grupo Avisa?

En nuestros concesionarios nos encargamos de toda la gestión del Plan MOVES IV. Nuestro equipo te ayuda con:

- Verificación de requisitos
- Documentación necesaria
- Tramitación completa de la ayuda
- Gestión del achatarramiento si aplica

Contacta con nosotros en el 955 034 600 o visita cualquiera de nuestras instalaciones.`,
    category: "ayudas",
    tags: ["moves", "ayudas", "subvenciones", "eléctrico", "gobierno"],
    author: "Departamento Comercial",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-15"),
    metaTitle: "Plan MOVES IV 2025: ayudas coches eléctricos",
    metaDescription: "Plan MOVES IV 2025: hasta 7.000€ de ayuda para comprar un coche eléctrico. Requisitos, cuantías y cómo solicitarlo en Grupo Avisa.",
    readingTime: 5,
    relatedVehicleType: "ambos",
  },
  {
    type: "novedad",
    slug: "audi-q6-etron-disponible-grupo-avisa",
    title: "Audi Q6 e-tron ya disponible en Grupo Avisa",
    excerpt: "El nuevo SUV eléctrico de Audi llega con la plataforma PPE, hasta 625 km de autonomía y un interior completamente digitalizado.",
    content: `## Audi Q6 e-tron: el SUV eléctrico premium

El Audi Q6 e-tron marca un nuevo capítulo para la marca de los cuatro aros. Construido sobre la nueva plataforma PPE (Premium Platform Electric) desarrollada conjuntamente con Porsche, ofrece prestaciones de referencia en su segmento.

### Prestaciones clave

- **Autonomía**: hasta 625 km WLTP
- **Carga rápida**: hasta 270 kW DC (10-80% en 21 minutos)
- **Potencia**: hasta 489 CV en versión SQ6 e-tron
- **Aceleración**: 0-100 km/h en 5,9 segundos (versión quattro)

### Tecnología interior

El Q6 e-tron estrena la nueva generación de cockpit digital de Audi con tres pantallas:
- Pantalla del conductor de 11,9"
- Pantalla central de 14,5"
- Pantalla del acompañante de 10,9"

### Disponible en Grupo Avisa

Ya puedes reservar tu Audi Q6 e-tron en nuestro concesionario Audi. Disponemos de unidades para entrega inmediata y configuraciones personalizadas.`,
    category: "lanzamientos",
    tags: ["audi", "q6-etron", "suv", "eléctrico", "premium"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-28"),
    metaTitle: "Audi Q6 e-tron disponible en Grupo Avisa",
    metaDescription: "Audi Q6 e-tron: SUV eléctrico premium con 625 km de autonomía y carga a 270 kW. Disponible en concesionario Audi Grupo Avisa, Sevilla.",
    readingTime: 4,
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "guia-completa-carga-coche-electrico-casa",
    title: "Guía completa: carga del coche eléctrico en casa",
    excerpt: "Todo lo que necesitas saber para instalar un punto de carga en tu garaje: tipos de cargadores, costes, permisos y consejos para optimizar la carga nocturna.",
    content: `## ¿Puedo cargar mi coche eléctrico en casa?

Sí, y es la forma más cómoda y económica de mantener tu vehículo eléctrico siempre listo. El 80% de las cargas de un coche eléctrico se realizan en el domicilio, aprovechando las tarifas nocturnas de electricidad.

### Tipos de cargadores domésticos

#### Carga en enchufe convencional (Schuko)
- **Potencia**: 2,3 kW (10A) a 3,7 kW (16A)
- **Tiempo de carga**: 15-20 horas para batería completa
- **Coste de instalación**: mínimo
- **Recomendación**: solo como solución temporal

#### Wallbox monofásico
- **Potencia**: 7,4 kW
- **Tiempo de carga**: 6-8 horas
- **Coste de instalación**: 800€-1.500€
- **Recomendación**: la mejor opción para viviendas unifamiliares

#### Wallbox trifásico
- **Potencia**: 11 kW a 22 kW
- **Tiempo de carga**: 3-4 horas
- **Coste de instalación**: 1.200€-2.500€
- **Recomendación**: ideal si tienes instalación trifásica

### Permisos necesarios

1. **Vivienda unifamiliar**: solo necesitas un boletín eléctrico del instalador autorizado
2. **Comunidad de propietarios**: derecho individual a instalación (Real Decreto-ley 29/2021)
3. **Parking comunitario**: comunicación a la comunidad con 1 mes de antelación

### Consejos para optimizar el coste

- Contrata una tarifa con discriminación horaria (valle nocturno)
- Programa la carga entre las 00:00 y las 08:00
- Con tarifa valle a 0,08€/kWh, cargar 50 kWh cuesta solo **4€**
- Un coche eléctrico consume ~15 kWh/100 km, lo que supone **1,20€/100 km**

### Grupo Avisa te ayuda

En nuestros concesionarios te asesoramos sobre la mejor solución de carga para tu hogar y te ponemos en contacto con instaladores autorizados en Sevilla, Córdoba y Dos Hermanas.`,
    category: "carga",
    tags: ["carga", "wallbox", "doméstico", "instalación", "tarifa"],
    author: "Departamento Técnico Avisa",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-01-20"),
    metaTitle: "Carga coche eléctrico en casa: guía completa",
    metaDescription: "Guía completa para cargar tu coche eléctrico en casa: tipos de wallbox, costes de instalación, permisos y consejos para ahorrar en la factura.",
    readingTime: 7,
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "como-elegir-coche-electrico-primer-vehiculo",
    title: "Cómo elegir tu primer coche eléctrico",
    excerpt: "La guía definitiva para dar el salto al coche eléctrico: qué autonomía necesitas, presupuesto, puntos de carga y las mejores opciones del mercado.",
    content: `## Tu primer coche eléctrico: decisiones clave

Dar el salto al coche eléctrico puede parecer abrumador, pero con la información correcta es una decisión más sencilla de lo que piensas. Esta guía te ayuda paso a paso.

### 1. ¿Qué autonomía necesitas realmente?

La mayoría de conductores en España recorren **menos de 50 km al día**. Sin embargo, la autonomía del vehículo debe cubrir también viajes ocasionales más largos.

| Perfil | Autonomía recomendada |
|---|---|
| Urbano (ciudad) | 200-300 km |
| Mixto (ciudad + carretera) | 300-450 km |
| Viajero frecuente | 450-600+ km |

### 2. Presupuesto: más allá del precio de compra

Un coche eléctrico es más caro de comprar pero más barato de mantener:
- **Combustible**: 1-2€/100 km vs 8-10€/100 km (diésel)
- **Mantenimiento**: ~40% menos que un térmico
- **Impuestos**: exentos o reducidos en muchos municipios

### 3. ¿Eléctrico puro o híbrido enchufable?

**Eléctrico puro (BEV)**: ideal si tienes cargador en casa y haces principalmente trayectos predecibles.

**Híbrido enchufable (PHEV)**: perfecto como transición si necesitas la seguridad del motor térmico para viajes largos.

### 4. Red de carga en Andalucía

Andalucía cuenta con más de **2.500 puntos de carga públicos**. En el eje Sevilla-Córdoba hay cargadores rápidos cada 50-70 km.

### Visítanos y prueba sin compromiso

En Grupo Avisa tenemos las marcas líderes del mercado eléctrico. Ven a probar diferentes modelos y encuentra el que mejor se adapta a tu estilo de vida.`,
    category: "compra",
    tags: ["compra", "primer-electrico", "autonomía", "presupuesto", "guía"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-01"),
    metaTitle: "Cómo elegir tu primer coche eléctrico",
    metaDescription: "Guía para elegir tu primer coche eléctrico: autonomía necesaria, presupuesto real, eléctrico vs híbrido y mejores opciones en España 2025.",
    readingTime: 6,
    relatedVehicleType: "ambos",
  },
  {
    type: "comparativa",
    slug: "comparativa-suv-electricos-menos-45000-euros",
    title: "Comparativa: SUV eléctricos por menos de 45.000€",
    excerpt: "Enfrentamos los mejores SUV eléctricos del mercado con precio inferior a 45.000€: Volkswagen ID.4, Skoda Enyaq, Hyundai Ioniq 5 y más.",
    content: `## Los mejores SUV eléctricos asequibles

El segmento de SUV eléctricos por debajo de 45.000€ es uno de los más competidos del mercado. Analizamos las opciones más interesantes disponibles en Grupo Avisa.

### Los contendientes

| Modelo | Autonomía WLTP | Potencia | Maletero | Precio desde |
|---|---|---|---|---|
| VW ID.4 Pro | 521 km | 286 CV | 543 L | 42.900€ |
| Skoda Enyaq 85 | 559 km | 286 CV | 585 L | 43.300€ |
| VW ID.5 Pro | 520 km | 286 CV | 549 L | 44.850€ |

### Autonomía y eficiencia

El **Skoda Enyaq** lidera en autonomía pura con 559 km, seguido muy de cerca por el ID.4. En consumo real, los tres modelos se mueven entre 16-18 kWh/100 km en uso mixto.

### Espacio interior y practicidad

El Enyaq gana claramente en espacio de maletero (585 L) gracias a su diseño más vertical. El ID.4 y el ID.5 son más aerodinámicos pero sacrifican algo de espacio.

### Tecnología y equipamiento

Los tres comparten la plataforma MEB de Volkswagen, por lo que la tecnología de conducción es similar. Las diferencias están en:
- **Infotainment**: el ID.5 incluye el sistema más avanzado
- **Asistentes**: nivel similar de asistencia a la conducción
- **Carga rápida**: 175 kW en los tres modelos

### Nuestra recomendación

- **Para familias**: Skoda Enyaq, por su espacio y relación calidad-precio
- **Diseño deportivo**: VW ID.5, con su silueta coupé
- **Equilibrio total**: VW ID.4, el todoterreno eléctrico por excelencia

Todos están disponibles en Grupo Avisa con financiación desde 299€/mes.`,
    category: "suv",
    tags: ["comparativa", "suv", "id4", "enyaq", "id5", "precio"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-10"),
    metaTitle: "Comparativa SUV eléctricos menos de 45.000€",
    metaDescription: "Comparativa detallada de SUV eléctricos por menos de 45.000€: VW ID.4, Skoda Enyaq e ID.5. Autonomía, espacio, precio y cuál elegir.",
    readingTime: 6,
    relatedVehicleType: "electrico",
  },
  {
    type: "comparativa",
    slug: "electrico-vs-hibrido-enchufable-cual-elegir",
    title: "Eléctrico vs híbrido enchufable: ¿cuál elegir?",
    excerpt: "Analizamos en profundidad las ventajas e inconvenientes de los coches eléctricos puros frente a los híbridos enchufables para ayudarte a decidir.",
    content: `## La gran pregunta: ¿eléctrico o híbrido enchufable?

Es la decisión más frecuente entre quienes quieren dar el salto a la movilidad sostenible. Ambas opciones tienen ventajas claras según tu perfil de conducción.

### Eléctrico puro (BEV)

**Ventajas:**
- Cero emisiones en circulación
- Menor coste por kilómetro (1-2€/100 km)
- Mantenimiento más sencillo y económico
- Etiqueta CERO: acceso sin restricciones a ZBE
- Exención del impuesto de matriculación

**Inconvenientes:**
- Mayor precio de compra
- Dependencia de infraestructura de carga
- Tiempos de carga en viajes largos

### Híbrido enchufable (PHEV)

**Ventajas:**
- Autonomía eléctrica para el día a día (40-80 km)
- Motor térmico para viajes largos sin paradas
- Etiqueta CERO con requisitos de autonomía eléctrica
- Precio de entrada más bajo

**Inconvenientes:**
- Más complejo mecánicamente
- Si no se carga regularmente, consume como un térmico pesado
- Maletero reducido por la batería

### ¿Qué te conviene más?

| Criterio | Eléctrico | Híbrido enchufable |
|---|---|---|
| Km diarios < 60 | ✅ Ideal | ✅ Ideal |
| Km diarios > 100 | ✅ Con planificación | ✅ Sin preocupaciones |
| Cargador en casa | ✅ Imprescindible | ✅ Muy recomendable |
| Viajes largos frecuentes | ⚠️ Paradas de carga | ✅ Sin limitaciones |
| Coste a 5 años | ✅ Más económico | ⚠️ Intermedio |

### Consulta personalizada en Grupo Avisa

Nuestro equipo analiza tu perfil de conducción y te recomienda la mejor opción. Tenemos eléctricos y híbridos enchufables de Volkswagen, Audi y Skoda listos para probar.`,
    category: "decision",
    tags: ["eléctrico", "híbrido", "phev", "bev", "comparativa", "decisión"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-01-25"),
    metaTitle: "Eléctrico vs híbrido enchufable: comparativa",
    metaDescription: "Eléctrico puro vs híbrido enchufable: ventajas, inconvenientes, costes y cuál te conviene según tu perfil. Comparativa completa 2025.",
    readingTime: 6,
    relatedVehicleType: "ambos",
  },
  {
    type: "consejo",
    slug: "10-consejos-maximizar-autonomia-coche-electrico",
    title: "10 consejos para maximizar la autonomía",
    excerpt: "Aprende las técnicas de conducción eficiente y configuración del vehículo que pueden aumentar la autonomía de tu coche eléctrico hasta un 30%.",
    content: `## Saca el máximo partido a cada carga

La autonomía real de un coche eléctrico depende mucho del estilo de conducción. Con estos 10 consejos puedes ganar hasta un 30% más de kilómetros por carga.

### 1. Usa la frenada regenerativa al máximo

La frenada regenerativa recupera energía al decelerar. Configura el nivel máximo (modo B o modo One Pedal) y reduce el uso del freno mecánico.

### 2. Mantén una velocidad constante

A 120 km/h un eléctrico consume un 40% más que a 100 km/h. En autopista, usa el control de crucero adaptativo y mantén velocidades moderadas.

### 3. Precalienta el habitáculo conectado al cargador

Calentar el coche mientras está enchufado ahorra batería. Programa la climatización 15 minutos antes de salir.

### 4. Comprueba la presión de los neumáticos

Neumáticos con presión baja aumentan la resistencia al rodaje. Revisa la presión mensualmente y mantén los valores recomendados (+0,2 bar no perjudica).

### 5. Planifica tu ruta

Los navegadores de coches eléctricos optimizan la ruta incluyendo paradas de carga. Confía en la planificación del vehículo para viajes largos.

### 6. Reduce el uso de climatización

El aire acondicionado y la calefacción son los mayores consumidores de energía. Usa los asientos calefactados (más eficientes) en invierno.

### 7. Evita acelerones bruscos

Las aceleraciones fuertes disparan el consumo. Acelera de forma progresiva y anticípate al tráfico.

### 8. Aprovecha las cuestas abajo

En descensos, levanta el pie del acelerador y deja que la frenada regenerativa recupere energía.

### 9. Retira peso innecesario

Cada 100 kg extra reducen la autonomía un 5-7%. Vacía el maletero de cosas que no necesites.

### 10. Mantén el coche en buen estado

Un servicio de mantenimiento regular asegura que todos los sistemas funcionan con la máxima eficiencia. En el taller de Grupo Avisa realizamos revisiones específicas para vehículos eléctricos.`,
    category: "conduccion",
    tags: ["autonomía", "conducción-eficiente", "ahorro", "tips", "regenerativa"],
    author: "Departamento Técnico Avisa",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-05"),
    metaTitle: "10 consejos autonomía coche eléctrico",
    metaDescription: "10 consejos prácticos para maximizar la autonomía de tu coche eléctrico: frenada regenerativa, velocidad óptima, climatización y más.",
    readingTime: 5,
    relatedVehicleType: "electrico",
  },
  {
    type: "consejo",
    slug: "cuidar-bateria-coche-electrico-alargar-vida-util",
    title: "Cómo cuidar la batería de tu eléctrico",
    excerpt: "La batería es el corazón de tu coche eléctrico. Estos consejos de mantenimiento te ayudarán a alargar su vida útil y mantener su capacidad.",
    content: `## Alarga la vida de la batería de tu coche eléctrico

La batería de un coche eléctrico está diseñada para durar entre 8 y 15 años, pero su longevidad depende en gran parte de cómo la cuides. Sigue estos consejos para mantenerla en óptimas condiciones.

### Carga entre el 20% y el 80%

Las baterías de ion-litio sufren más estrés en los extremos (por debajo del 10% y por encima del 90%). Para el uso diario, mantener la carga entre el 20% y el 80% es ideal.

**Excepción**: carga al 100% solo antes de viajes largos, y hazlo justo antes de salir.

### Evita la carga rápida como rutina

La carga rápida DC genera calor, lo que degrada la batería a largo plazo. Úsala para viajes, pero para el día a día, carga en casa con wallbox o en cargadores de AC.

### No dejes el coche a pleno sol con batería al 100%

El calor extremo combinado con una batería llena acelera la degradación. Si aparques al sol, intenta que la batería esté entre el 50-70%.

### Programa la carga en horas frescas

En verano, programa la carga para la madrugada, cuando las temperaturas son más bajas. Esto reduce el estrés térmico en la batería.

### Revisiones en taller especializado

En el taller de Grupo Avisa realizamos diagnósticos de salud de batería (SoH - State of Health) para verificar que tu batería mantiene su capacidad. Te recomendamos una revisión anual.

### ¿Cuánto dura la batería?

| Escenario | Vida estimada |
|---|---|
| Cuidado óptimo | 12-15 años / 200.000+ km |
| Uso normal | 8-12 años / 150.000 km |
| Carga rápida frecuente | 6-10 años |

Las baterías de los vehículos Volkswagen, Audi y Skoda tienen garantía de **8 años o 160.000 km** para mantener al menos el 70% de su capacidad original.`,
    category: "mantenimiento",
    tags: ["batería", "mantenimiento", "vida-útil", "carga", "cuidados"],
    author: "Departamento Técnico Avisa",
    featuredImage: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-01-10"),
    metaTitle: "Cuidar batería coche eléctrico: consejos",
    metaDescription: "Cómo cuidar la batería de tu coche eléctrico para alargar su vida útil: niveles de carga óptimos, temperatura, carga rápida y revisiones.",
    readingTime: 5,
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "red-carga-publica-andalucia-mapa-puntos",
    title: "Red de carga pública en Andalucía: mapa y puntos",
    excerpt: "Mapa completo de los puntos de carga públicos en Andalucía: ubicaciones, tipos de conector, potencia y apps para encontrarlos.",
    content: `## La red de carga en Andalucía crece rápidamente

Andalucía ha experimentado un crecimiento del 65% en puntos de carga públicos durante 2024, alcanzando más de 2.500 puntos operativos.

### Distribución por provincias

| Provincia | Puntos de carga | Carga rápida (>50 kW) |
|---|---|---|
| Sevilla | 580+ | 85+ |
| Málaga | 520+ | 75+ |
| Córdoba | 180+ | 35+ |
| Granada | 200+ | 40+ |
| Cádiz | 250+ | 45+ |

### Tipos de cargadores públicos

- **Carga lenta (AC 7-22 kW)**: en centros comerciales, parkings, hoteles
- **Carga semi-rápida (AC 22-43 kW)**: en estaciones de servicio
- **Carga rápida (DC 50-150 kW)**: en ejes principales y áreas de servicio
- **Carga ultra-rápida (DC 150-350 kW)**: en corredores de autopista

### Apps imprescindibles

1. **Electromaps**: la más completa en España, con filtros por conector y potencia
2. **Chargemap**: amplia cobertura europea
3. **Google Maps**: muestra puntos de carga con disponibilidad en tiempo real

### El corredor Sevilla-Córdoba

Entre Sevilla y Córdoba hay cargadores rápidos cada 50-70 km, lo que permite realizar el trayecto sin problemas con cualquier eléctrico actual. Los puntos principales están en:
- Sevilla (múltiples ubicaciones)
- Carmona
- Écija
- Lucena
- Córdoba capital

### Carga en concesionarios Grupo Avisa

Nuestros concesionarios disponen de cargadores para clientes. Si necesitas cargar tu vehículo mientras realizas una gestión o revisión, estás bienvenido.`,
    category: "infraestructura",
    tags: ["carga-pública", "andalucía", "mapa", "puntos-carga", "infraestructura"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=800&h=450&fit=crop",
    published: true,
    publishedAt: new Date("2025-02-20"),
    metaTitle: "Puntos carga eléctricos Andalucía 2025",
    metaDescription: "Mapa de puntos de carga para coches eléctricos en Andalucía 2025: ubicaciones, tipos, potencia y apps. Red carga pública Sevilla, Córdoba.",
    readingTime: 5,
    relatedVehicleType: "electrico",
  },
];

async function seedEditorial() {
  console.log("Seeding editorial content...");
  for (const article of articles) {
    try {
      const existing = await db.select().from(editorialContent).where(
        eq(editorialContent.slug, article.slug)
      );
      if (existing.length > 0) {
        console.log(`  ⏭ Skipping "${article.title}" (already exists)`);
        continue;
      }
      await db.insert(editorialContent).values(article);
      console.log(`  ✅ Created: ${article.title}`);
    } catch (err: any) {
      console.error(`  ❌ Error creating "${article.title}":`, err.message);
    }
  }
  console.log("Done seeding editorial content.");
  process.exit(0);
}

seedEditorial();
