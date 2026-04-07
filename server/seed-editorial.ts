import { storage } from "./storage";
import type { InsertEditorialContent } from "@shared/schema";

const editorialArticles: InsertEditorialContent[] = [
  // ── NOVEDADES ───────────────────────────────────────────────────────
  {
    type: "novedad",
    slug: "volkswagen-id7-llegada-espana-2024",
    title: "Volkswagen ID.7: El sedán eléctrico más avanzado de VW ya está en España",
    excerpt: "El nuevo buque insignia eléctrico de Volkswagen aterriza en los concesionarios con hasta 700 km de autonomía y tecnología punta en conectividad.",
    content: `El Volkswagen ID.7 representa la apuesta más ambiciosa de la marca alemana en el segmento premium eléctrico. Con una autonomía de hasta 700 km según el ciclo WLTP y una carga rápida de 200 kW, este sedán redefine los estándares del segmento D eléctrico.

## Tecnología y prestaciones

El ID.7 llega con el sistema de infoentretenimiento ID. Software 4.0, una pantalla central de 15 pulgadas y conectividad nativa con los asistentes virtuales más populares. El head-up display aumentado proyecta información de navegación sobre el parabrisas con una claridad excepcional.

Bajo el capó, la versión Pro S monta un motor de 286 CV y una batería de 86 kWh netos que permite esa autonomía récord en la gama ID.

## Precio y disponibilidad en Grupo Avisa

El ID.7 ya puede reservarse en todos los concesionarios de Grupo Avisa en Sevilla, Huelva y Extremadura. El precio de partida es de 56.990 € y con el Plan MOVES III aplicado puede superar los 7.000 € de descuento para particulares.`,
    category: "lanzamientos",
    tags: ["Volkswagen", "ID.7", "sedán eléctrico", "MOVES"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-10-15"),
    metaTitle: "Volkswagen ID.7 en España: precio, autonomía y disponibilidad | Grupo Avisa",
    metaDescription: "El Volkswagen ID.7 llega a España con 700 km de autonomía y desde 56.990 €. Disponible en Grupo Avisa con Plan MOVES III. Solicita tu prueba de conducción.",
    readingTime: 4,
    relatedSlugs: ["plan-moves-iii-2024-guia-completa", "comparativa-sedanes-electricos-2024"],
    relatedVehicleType: "electrico",
  },
  {
    type: "novedad",
    slug: "audi-q6-e-tron-primer-contacto",
    title: "Audi Q6 e-tron: nuestro primer contacto con el SUV eléctrico más tecnológico de Audi",
    excerpt: "Probamos el nuevo Audi Q6 e-tron en Sevilla: 625 km de autonomía, pantallas OLED y la plataforma PPE que comparte con el Porsche Macan eléctrico.",
    content: `El Audi Q6 e-tron inaugura la nueva plataforma Premium Platform Electric (PPE) desarrollada conjuntamente por Audi y Porsche. La diferencia respecto a sus predecesores es palpable desde el primer segundo al volante.

## La plataforma PPE, una revolución

Gracias a la arquitectura de 800 voltios, el Q6 e-tron acepta carga de hasta 270 kW en corriente continua. En la práctica, esto significa pasar del 10 al 80% en menos de 22 minutos. Una revolución para los que hacen viajes largos con frecuencia.

## Interior y tecnología

El habitáculo estrena el sistema operativo Android Automotive de segunda generación con ChatGPT integrado. Las pantallas OLED traseras para los pasajeros son una primicia en el segmento y la calidad de imagen es impresionante.

## Disponibilidad en Grupo Avisa

Grupo Avisa es concesionario oficial Audi y ya tiene en exposición las primeras unidades del Q6 e-tron. Consulta disponibilidad y aprovecha las condiciones especiales de lanzamiento con financiación desde el 4,9%.`,
    category: "pruebas",
    tags: ["Audi", "Q6 e-tron", "SUV eléctrico", "PPE", "800V"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-11-20"),
    metaTitle: "Audi Q6 e-tron: prueba y primer contacto en España | Grupo Avisa",
    metaDescription: "Probamos el Audi Q6 e-tron con plataforma PPE de 800V: 625 km de autonomía y carga en 22 min. Concesionario oficial Audi en Sevilla.",
    readingTime: 5,
    relatedSlugs: ["volkswagen-id7-llegada-espana-2024", "comparativa-suvs-electricos-premium"],
    relatedVehicleType: "electrico",
  },
  {
    type: "novedad",
    slug: "plan-moves-iii-2024-nuevas-condiciones",
    title: "Plan MOVES III 2024: nuevas condiciones y cómo solicitar hasta 7.000 € de ayuda",
    excerpt: "El Gobierno actualiza las condiciones del Plan MOVES III para 2024. Te explicamos quién puede pedirlo, cuánto dinero hay disponible y cómo tramitarlo.",
    content: `El Plan MOVES III ha renovado sus condiciones para 2024 con un presupuesto de 400 millones de euros en nuevas convocatorias autonómicas.

## ¿Cuánto puedo recibir?

| Tipo de comprador | Sin achatarramiento | Con achatarramiento |
|---|---|---|
| Particular | 4.500 € | 7.000 € |
| Autónomo | 4.500 € | 7.000 € |
| Empresa (PYME) | 4.500 € | 7.000 € |
| Empresa grande | 3.000 € | 4.500 € |

## Vehículos que pueden acogerse

- Turismos eléctricos puros (BEV): precio inferior a 45.000 € (IVA excl.)
- Híbridos enchufables (PHEV): precio inferior a 45.000 € (IVA excl.)
- Vehículos comerciales ligeros

## Cómo tramitarlo con Grupo Avisa

En Grupo Avisa gestionamos la solicitud de MOVES por ti sin coste adicional. El descuento se aplica directamente en tu factura.`,
    category: "ayudas",
    tags: ["MOVES III", "subvenciones", "ayudas", "2024", "eléctrico"],
    author: "Asesoría Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-09-01"),
    metaTitle: "Plan MOVES III 2024: hasta 7.000 € para comprar coche eléctrico | Grupo Avisa",
    metaDescription: "Guía completa del Plan MOVES III 2024: requisitos, cuantías y cómo pedirlo. En Grupo Avisa tramitamos tu solicitud sin coste adicional.",
    readingTime: 6,
    relatedSlugs: ["plan-moves-iii-2024-guia-completa", "guia-compra-primer-coche-electrico"],
    relatedVehicleType: "electrico",
  },
  {
    type: "novedad",
    slug: "skoda-enyaq-coupe-rs-iv-llega-concesionarios",
    title: "Škoda Enyaq Coupé RS iV: el SUV coupé eléctrico deportivo ya está en Grupo Avisa",
    excerpt: "El Enyaq Coupé RS iV combina los 299 CV del doble motor con la elegancia de la carrocería coupé. Disponible en los concesionarios Škoda de Grupo Avisa.",
    content: `El Škoda Enyaq Coupé RS iV eleva la gama eléctrica de la marca checa a cotas inéditas. Con su carrocería coupé de líneas afiladas y el tren motriz bimotor de 299 CV, ofrece lo mejor de dos mundos: dinamismo y practicidad.

## Motor y rendimiento

La versión RS iV combina dos motores eléctricos para tracción total que convierte los 0-100 km/h en 6,5 segundos. La batería de 82 kWh ofrece hasta 545 km de autonomía WLTP.

## Diseño exterior y aerodinámica

La carrocería coupé mejora el Cx hasta 0,234, contribuyendo directamente a la autonomía. Las llantas de 21 pulgadas con acabado negro bicolor son exclusivos de la versión RS.

## Precio en Grupo Avisa

El Enyaq Coupé RS iV parte desde 59.990 €. Con MOVES III y achatarramiento, el precio efectivo puede bajar hasta los 52.990 €.`,
    category: "lanzamientos",
    tags: ["Škoda", "Enyaq", "RS iV", "coupé", "deportivo", "eléctrico"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-12-05"),
    metaTitle: "Škoda Enyaq Coupé RS iV en Grupo Avisa | Concesionario Oficial Sevilla",
    metaDescription: "El Škoda Enyaq Coupé RS iV con 299 CV y 545 km de autonomía ya está disponible en Grupo Avisa. Concesionario oficial Škoda en Sevilla y Andalucía.",
    readingTime: 4,
    relatedSlugs: ["comparativa-suvs-electricos-premium", "guia-compra-primer-coche-electrico"],
    relatedVehicleType: "electrico",
  },

  // ── GUÍAS ───────────────────────────────────────────────────────────
  {
    type: "guia",
    slug: "guia-compra-primer-coche-electrico",
    title: "Guía completa para comprar tu primer coche eléctrico en 2024",
    excerpt: "Todo lo que necesitas saber antes de dar el salto al eléctrico: autonomía real, tipos de carga, ayudas disponibles y cómo elegir el modelo perfecto para ti.",
    content: `Comprar un coche eléctrico por primera vez puede parecer abrumador. Con esta guía paso a paso te acompañamos en cada decisión.

## Paso 1: Analiza tu uso real

- ¿Cuántos kilómetros haces al día? La media española es 39 km/día.
- ¿Tienes garaje? El 60% de la carga se hace en casa durante la noche.
- ¿Haces viajes largos con frecuencia?

## Paso 2: Entiende la autonomía real

- **Ciudad**: obtienes más autonomía que la homologada (+10-20%)
- **Autopista a 120 km/h**: reduces la autonomía un 20-30%
- **Invierno con frío**: puede bajar un 10-25% adicional

## Paso 3: Tipos de carga

| Tipo | Potencia | Tiempo carga completa |
|---|---|---|
| Schuko doméstico | 2,3 kW | 15-30 h |
| Wallbox doméstico | 7,4-22 kW | 3-8 h |
| Carga rápida pública (DC) | 50-350 kW | 20-60 min |

## Paso 4: Las ayudas que puedes pedir

- **Plan MOVES III**: hasta 7.000 € si achatas un vehículo viejo
- **Deducción IRPF**: 15% del precio de compra (máx. 3.000 €/año)

## Paso 5: Elige tu modelo

En Grupo Avisa disponemos de toda la gama eléctrica de Volkswagen, Audi y Škoda. Pide cita para una prueba de conducción sin compromiso.`,
    category: "compra",
    tags: ["guía compra", "primer eléctrico", "autonomía", "carga", "MOVES"],
    author: "Asesoría Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-08-10"),
    metaTitle: "Guía para comprar tu primer coche eléctrico 2024 | Grupo Avisa",
    metaDescription: "Guía completa paso a paso para elegir tu primer coche eléctrico: autonomía real, tipos de carga, ayudas y modelos disponibles en Grupo Avisa.",
    readingTime: 8,
    relatedSlugs: ["plan-moves-iii-2024-nuevas-condiciones", "guia-carga-coche-electrico-en-casa"],
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "guia-carga-coche-electrico-en-casa",
    title: "Cómo instalar un cargador en casa: guía completa del wallbox doméstico",
    excerpt: "Instalar un wallbox en tu garaje es el paso más importante para vivir cómodamente con un eléctrico. Te explicamos tipos, precios, instalación y subvenciones.",
    content: `La instalación de un cargador doméstico (wallbox) transforma la experiencia con el coche eléctrico. Cargar cada noche como si fuera un móvil elimina la ansiedad por la autonomía para siempre.

## ¿Qué es un wallbox?

Un wallbox es un cargador de pared de corriente alterna (AC) que se instala en el garaje. A diferencia del enchufe Schuko (2,3 kW), un wallbox ofrece entre 7,4 kW y 22 kW.

## Tipos de wallbox disponibles

### Wallbox monofásico (7,4 kW)
- Precio instalado: 800-1.200 €
- Tiempo de carga: 8-10 h para un coche de 60 kWh

### Wallbox trifásico (11 kW o 22 kW)
- Precio instalado: 1.200-2.000 €
- Tiempo de carga: 3-5 h

## ¿Puedo instalarlo en mi comunidad de vecinos?

Sí. La Ley de Propiedad Horizontal (art. 17.5) permite instalar un punto de carga en tu plaza sin autorización de la comunidad (solo comunicación previa).

## Ayudas para la instalación

- **Plan MOVES III**: hasta 500 € adicionales para instalación junto con la compra del vehículo
- **Deducciones autonómicas**: hasta el 30% del coste en Andalucía`,
    category: "infraestructura",
    tags: ["wallbox", "carga doméstica", "instalación", "garaje", "MOVES"],
    author: "Técnicos Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-07-22"),
    metaTitle: "Cómo instalar un wallbox en casa: guía y precios 2024 | Grupo Avisa",
    metaDescription: "Guía completa para instalar un cargador wallbox en casa: tipos, precios, ayudas MOVES y cómo instalarlo en tu comunidad de vecinos.",
    readingTime: 7,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "plan-moves-iii-2024-nuevas-condiciones"],
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "plan-moves-iii-2024-guia-completa",
    title: "Plan MOVES III: guía completa 2024 con todos los pasos para solicitar tu ayuda",
    excerpt: "Cómo solicitar el Plan MOVES III paso a paso. Requisitos, documentación necesaria, cuantías y qué ocurre si compras el coche antes de que llegue el dinero.",
    content: `El Plan MOVES III es el programa de incentivos al vehículo eléctrico más importante de España.

## Cuantías en Andalucía

| Tipo de beneficiario | Sin achatarramiento | Con achatarramiento |
|---|---|---|
| Persona física | 4.500 € | 7.000 € |
| Autónomo | 4.500 € | 7.000 € |
| Empresa | 4.500 € | 7.000 € |

## Documentación necesaria

1. DNI/NIE del solicitante
2. Factura pro forma del concesionario
3. Ficha técnica del vehículo
4. Documentación del vehículo a achicar (si aplica)
5. Número IBAN de cuenta bancaria

## Pasos para solicitarlo con Grupo Avisa

1. Elige tu vehículo en cualquier concesionario Avisa
2. Firmamos la autorización para tramitar tu expediente
3. Aplicamos el descuento directamente en tu factura
4. La Junta de Andalucía abona el importe al concesionario

**Los fondos se agotan por orden de solicitud. Actúa cuanto antes.**`,
    category: "ayudas",
    tags: ["MOVES III", "guía", "subvenciones", "Andalucía", "tramitación"],
    author: "Asesoría Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-06-15"),
    metaTitle: "Plan MOVES III 2024: guía completa para solicitar tu ayuda | Grupo Avisa",
    metaDescription: "Guía paso a paso del Plan MOVES III en Andalucía: requisitos, cuantías hasta 7.000 €, documentación y cómo tramitarlo con Grupo Avisa.",
    readingTime: 6,
    relatedSlugs: ["plan-moves-iii-2024-nuevas-condiciones", "guia-compra-primer-coche-electrico"],
    relatedVehicleType: "electrico",
  },
  {
    type: "guia",
    slug: "guia-hibridos-enchufables-phev",
    title: "Coches híbridos enchufables (PHEV): qué son, ventajas y cuándo merecen la pena",
    excerpt: "Los híbridos enchufables son la opción perfecta si no puedes cargar en casa pero quieres reducir el consumo. Te explicamos todo sobre los PHEV.",
    content: `Los vehículos híbridos enchufables (PHEV) combinan motor de combustión y motor eléctrico con una batería que se puede recargar externamente.

## ¿Cómo funcionan los PHEV?

Un PHEV tiene dos fuentes de energía:
- **Motor eléctrico**: 40-80 km de autonomía cero emisiones
- **Motor de combustión**: entra cuando la batería se agota

## Ventajas de los PHEV

- Si tu desplazamiento diario es menor de 50 km, te mueves casi 100% en eléctrico (1-2 l/100 km)
- En autopista, el motor de combustión garantiza que nunca te quedas sin autonomía
- Acceso al Plan MOVES III (hasta 7.000 €)
- Etiqueta CERO de la DGT

## ¿Cuándo NO merece la pena un PHEV?

Si no tienes donde cargar el coche: usarás solo el motor de combustión y consumirás más que un híbrido convencional.

## Modelos PHEV disponibles en Grupo Avisa

- **Volkswagen Golf GTE**: 80 km eléctricos
- **Volkswagen Tiguan eHybrid**: 100 km eléctricos
- **Audi Q5 TFSI e**: lujo y eficiencia
- **Škoda Octavia iV**: practicidad y precio competitivo`,
    category: "tecnología",
    tags: ["PHEV", "híbrido enchufable", "plug-in", "autonomía eléctrica"],
    author: "Técnicos Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-05-20"),
    metaTitle: "Coches híbridos enchufables PHEV: guía completa 2024 | Grupo Avisa",
    metaDescription: "Todo sobre los coches híbridos enchufables (PHEV): ventajas, autonomía eléctrica, ayudas y cuándo merece la pena. Modelos disponibles en Grupo Avisa.",
    readingTime: 7,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "comparativa-electrico-vs-hibrido-enchufable"],
    relatedVehicleType: "hibrido",
  },

  // ── COMPARATIVAS ────────────────────────────────────────────────────
  {
    type: "comparativa",
    slug: "comparativa-suvs-electricos-premium",
    title: "Comparativa: Audi Q4 e-tron vs Škoda Enyaq iV vs VW ID.4 — ¿cuál comprar?",
    excerpt: "Tres SUV eléctricos que comparten plataforma MEB pero con personalidades muy distintas. Analizamos precio, autonomía, equipamiento y cuál se adapta mejor a cada perfil.",
    content: `Los tres SUV eléctricos más vendidos del Grupo Volkswagen comparten la plataforma MEB pero cada uno tiene una propuesta de valor diferente.

## Ficha técnica comparativa

| | Audi Q4 e-tron | Škoda Enyaq iV 80 | VW ID.4 Pro |
|---|---|---|---|
| Potencia | 204 CV | 204 CV | 204 CV |
| Autonomía WLTP | 520 km | 534 km | 522 km |
| Carga DC máx. | 135 kW | 135 kW | 135 kW |
| Precio base | 49.200 € | 46.890 € | 47.990 € |

## ¿Cuál elegir?

**Elige el Škoda Enyaq iV** si quieres la mejor relación calidad-precio y el mayor maletero (585 litros).

**Elige el VW ID.4** si buscas el equilibrio perfecto entre tecnología, confort y precio.

**Elige el Audi Q4 e-tron** si el diseño premium y los extras de lujo son prioritarios para ti.

Los tres están disponibles en Grupo Avisa. Solicita una prueba de conducción comparativa.`,
    category: "comparativas",
    tags: ["Audi Q4", "Škoda Enyaq", "VW ID.4", "comparativa", "SUV eléctrico", "MEB"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-10-01"),
    metaTitle: "Comparativa Audi Q4 e-tron vs Škoda Enyaq iV vs VW ID.4 2024 | Grupo Avisa",
    metaDescription: "Comparativa completa de los 3 mejores SUV eléctricos de la plataforma MEB: Audi Q4 e-tron, Škoda Enyaq y VW ID.4. Precios, autonomía y cuál comprar.",
    readingTime: 8,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "comparativa-electrico-vs-hibrido-enchufable"],
    relatedVehicleType: "electrico",
  },
  {
    type: "comparativa",
    slug: "comparativa-electrico-vs-hibrido-enchufable",
    title: "Eléctrico puro vs híbrido enchufable: ¿qué conviene más en 2024?",
    excerpt: "Analizamos los pros y contras de cada tecnología según tu perfil de uso: tipo de desplazamientos, disponibilidad de carga, presupuesto y fiscalidad.",
    content: `La duda más frecuente entre compradores de coches ecológicos: ¿me compro un eléctrico puro o un híbrido enchufable?

## Comparativa directa

| Criterio | Eléctrico puro (BEV) | Híbrido enchufable (PHEV) |
|---|---|---|
| Autonomía total | 300-700 km | 600-1.000 km (combinada) |
| Autonomía 100% eléctrica | 300-700 km | 40-100 km |
| Coste de carga | 3-5 €/100 km | 1-2 €/100 km en modo EV |
| Mantenimiento | Mínimo | Más complejo |
| Ayuda MOVES III | Hasta 7.000 € | Hasta 7.000 € |
| Etiqueta DGT | CERO | CERO |

## El eléctrico puro es mejor si…

✅ Tienes garaje o punto de carga en casa o trabajo
✅ Tus desplazamientos habituales son menores de 250 km
✅ Haces muchos kilómetros en ciudad

## El híbrido enchufable es mejor si…

✅ No tienes garaje ni opción de carga doméstica
✅ Haces viajes largos de más de 400 km con frecuencia
✅ Buscas menor precio de adquisición

## El veredicto de Grupo Avisa

Para la mayoría de conductores españoles el **eléctrico puro con wallbox doméstico** ofrece la mejor experiencia y el menor coste de uso total.`,
    category: "comparativas",
    tags: ["BEV", "PHEV", "eléctrico", "híbrido enchufable", "comparativa"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-09-15"),
    metaTitle: "Eléctrico puro vs híbrido enchufable: ¿cuál comprar en 2024? | Grupo Avisa",
    metaDescription: "Comparativa eléctrico puro (BEV) vs híbrido enchufable (PHEV) en 2024: autonomía, costes, ayudas y cuál es mejor según tu perfil de uso.",
    readingTime: 7,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "guia-hibridos-enchufables-phev"],
    relatedVehicleType: "electrico",
  },
  {
    type: "comparativa",
    slug: "comparativa-sedanes-electricos-2024",
    title: "Comparativa sedanes eléctricos 2024: VW ID.7 vs Audi A6 e-tron vs Tesla Model 3",
    excerpt: "Los tres sedanes eléctricos más importantes del mercado en 2024. Comparamos autonomía, tecnología, precio y cuál ofrece la mejor experiencia de conducción.",
    content: `El segmento de sedanes eléctricos ha vivido en 2024 su mayor revolución con la llegada del VW ID.7 y el Audi A6 e-tron.

## Ficha técnica comparativa

| | VW ID.7 Pro S | Audi A6 e-tron | Tesla Model 3 LR AWD |
|---|---|---|---|
| Potencia | 286 CV | 367 CV | 358 CV |
| Autonomía WLTP | 700 km | 756 km | 629 km |
| Carga DC máx. | 200 kW | 270 kW | 250 kW |
| Precio base | 56.990 € | 74.900 € | 47.990 € |

## ¿Cuál elegir?

**Tesla Model 3**: si quieres el menor precio de entrada y la mejor red de carga (Supercharger).

**VW ID.7**: si buscas el equilibrio perfecto entre autonomía, tecnología y marca tradicional.

**Audi A6 e-tron**: si el presupuesto no es un problema y quieres lo más avanzado del mercado.

En Grupo Avisa tenemos disponibles el VW ID.7 y el Audi A6 e-tron. Solicita tu prueba de conducción.`,
    category: "comparativas",
    tags: ["sedán eléctrico", "VW ID.7", "Audi A6 e-tron", "Tesla Model 3", "comparativa"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1571607388263-1044f9ea01dd?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-11-05"),
    metaTitle: "Comparativa sedanes eléctricos 2024: VW ID.7 vs Audi A6 vs Tesla Model 3 | Grupo Avisa",
    metaDescription: "Comparativa detallada de los mejores sedanes eléctricos de 2024: VW ID.7, Audi A6 e-tron y Tesla Model 3. Autonomía, tecnología y precios.",
    readingTime: 9,
    relatedSlugs: ["volkswagen-id7-llegada-espana-2024", "comparativa-suvs-electricos-premium"],
    relatedVehicleType: "electrico",
  },

  // ── CONSEJOS ────────────────────────────────────────────────────────
  {
    type: "consejo",
    slug: "como-maximizar-autonomia-coche-electrico",
    title: "10 trucos para maximizar la autonomía de tu coche eléctrico",
    excerpt: "Pequeños cambios en la forma de conducir y de gestionar la carga pueden aumentar la autonomía hasta un 30%. Descubre los mejores trucos de los conductores eléctricos experimentados.",
    content: `Estos 10 consejos están validados por miles de conductores eléctricos y pueden marcar una diferencia real en tu autonomía.

## 1. Usa la frenada regenerativa al máximo
Activa el modo regenerativo más intenso (modo "B" en VW/Audi). En ciudad puedes conducir casi solo con el acelerador.
**Ganancia**: +8-12% en ciudad.

## 2. Precalienta el coche mientras está enchufado
En invierno, temperatura al habitáculo antes de desconectar. La energía viene de la red, no de la batería.
**Ganancia**: hasta +15% en días fríos.

## 3. Mantén la batería entre el 20% y el 80%
La degradación es mínima en ese rango. Solo carga al 100% para viajes largos.

## 4. Reduce la velocidad en autopista
De 120 a 110 km/h ganas un 10-15% de autonomía. La resistencia aerodinámica crece con el cuadrado de la velocidad.

## 5. Comprueba la presión de los neumáticos mensualmente
Los neumáticos blandos aumentan el consumo. Mantén la presión recomendada.
**Ganancia**: +2-4%.

## 6. Usa los asientos calefactables en lugar del climatizador
Los asientos calefactables consumen 150-200W. El climatizador puede llegar a 3-5 kW.
**Ganancia**: +5-10% en invierno.

## 7. Planifica la ruta con el navegador del coche
Los navegadores nativos (VW/Audi) precondicionan la batería para carga rápida automáticamente.

## 8. Aprovecha los descensos
En montaña, levanta el pie antes de las curvas. La frenada regenerativa recupera energía.

## 9. Reduce el aire acondicionado en verano
Actívalo 10 minutos antes de salir mientras el coche está enchufado y mantén la temperatura a 24°C.

## 10. Conduce en modo Eco
El modo Eco limita la potencia y suaviza el acelerador. Puede ahorrar un 10% de energía.

**Resultado**: aplicando todos estos consejos, puedes ganar entre un 15% y 30% de autonomía.`,
    category: "conducción",
    tags: ["autonomía", "trucos", "conducción eficiente", "regenerativa", "ahorro"],
    author: "Técnicos Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-08-25"),
    metaTitle: "10 trucos para maximizar la autonomía del coche eléctrico | Grupo Avisa",
    metaDescription: "Cómo aumentar la autonomía de tu eléctrico hasta un 30%: frenada regenerativa, precalentamiento, presión de neumáticos y más consejos prácticos.",
    readingTime: 6,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "guia-carga-coche-electrico-en-casa"],
    relatedVehicleType: "electrico",
  },
  {
    type: "consejo",
    slug: "mantenimiento-coche-electrico-diferencias",
    title: "Mantenimiento de un coche eléctrico: qué cambia respecto al coche de combustión",
    excerpt: "Los coches eléctricos tienen mucho menos mantenimiento que los de combustión, pero no cero. Te explicamos qué revisiones son necesarias y cuánto cuestan.",
    content: `Una de las grandes ventajas del coche eléctrico es su menor coste de mantenimiento.

## Lo que desaparece con el eléctrico

❌ Cambios de aceite
❌ Filtro de aceite
❌ Bujías
❌ Filtro de combustible
❌ Correa de distribución
❌ Catalizador, FAP, EGR

## Lo que se mantiene (con menor frecuencia)

✅ **Neumáticos**: se desgastan igual o un poco más
✅ **Frenos**: duran el doble gracias a la frenada regenerativa
✅ **Líquido de frenos**: cada 2 años
✅ **Filtro de habitáculo**: anualmente
✅ **Refrigerante batería**: revisión cada 4 años

## Coste de mantenimiento comparado

- Coche de combustión segmento D: 800-1.200 €/año
- Equivalente eléctrico: 300-500 €/año
- **Ahorro anual medio: 500-800 €**

## Revisiones en Grupo Avisa

Nuestros técnicos están certificados por VW, Audi y Škoda para vehículos eléctricos e híbridos. Disponemos de equipos de diagnóstico específicos para sistemas de alta tensión.`,
    category: "mantenimiento",
    tags: ["mantenimiento", "revisiones", "coste", "eléctrico"],
    author: "Taller Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-07-10"),
    metaTitle: "Mantenimiento coche eléctrico: qué cambia y cuánto cuesta | Grupo Avisa",
    metaDescription: "Descubre las diferencias de mantenimiento entre un eléctrico y un coche de combustión. Costes, revisiones necesarias y ventajas del servicio técnico Grupo Avisa.",
    readingTime: 5,
    relatedSlugs: ["guia-compra-primer-coche-electrico", "como-maximizar-autonomia-coche-electrico"],
    relatedVehicleType: "electrico",
  },
  {
    type: "consejo",
    slug: "carga-rapida-consejos-red-publica",
    title: "Cómo usar la red de carga rápida pública: consejos para viajeros eléctricos",
    excerpt: "Usar los cargadores rápidos públicos puede ser confuso al principio. Te explicamos cómo funciona la red en España, qué apps necesitas y cómo evitar los errores más comunes.",
    content: `La red de carga rápida pública en España ha crecido un 80% en 2023. Con más de 15.000 puntos de carga, los viajes largos en eléctrico ya son una realidad cómoda.

## Las principales redes en España

| Red | Potencia máx. | Puntos España |
|---|---|---|
| IONITY | 350 kW | 800+ |
| Tesla Supercharger | 250 kW | 2.000+ |
| Iberdrola | 150 kW | 1.500+ |
| Endesa X | 150 kW | 1.200+ |
| Zunder | 150 kW | 600+ |

## Apps imprescindibles

1. **Chargemap**: el mejor agregador. Muestra todos los cargadores en un mapa.
2. **PlugShare**: muy completo con información de la comunidad.
3. **App de tu red favorita**: suelen tener tarifas más baratas.

## Consejos para cargar en autopista

- Para entre el 20-25% y sal al 80%. Es el rango más rápido.
- El precondicionamiento de batería (automático en VW/Audi cuando navegas a IONITY) maximiza la velocidad de carga.
- No esperes al 100%: de 80% a 100% es hasta 3 veces más lento.

## Precios aproximados 2024

- IONITY con suscripción: ~0,39 €/kWh
- Iberdrola: ~0,45 €/kWh
- Tesla Supercharger: ~0,38 €/kWh

Una carga del 20% al 80% en un coche de 80 kWh cuesta 18-25 €, equivalente a 4-5 litros de gasolina para la misma distancia.`,
    category: "conducción",
    tags: ["carga rápida", "viajes", "IONITY", "Supercharger", "apps", "autopista"],
    author: "Equipo Grupo Avisa",
    featuredImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop&auto=format&q=80",
    published: true,
    publishedAt: new Date("2024-09-20"),
    metaTitle: "Cómo usar la red de carga rápida pública en España | Grupo Avisa",
    metaDescription: "Guía completa de la red de carga rápida pública en España: apps, redes, precios y consejos para viajes largos en coche eléctrico.",
    readingTime: 6,
    relatedSlugs: ["guia-carga-coche-electrico-en-casa", "como-maximizar-autonomia-coche-electrico"],
    relatedVehicleType: "electrico",
  },
];

export async function seedEditorialContent() {
  const existing = await storage.getEditorialContent();
  const existingSlugs = new Set(existing.map((r) => r.slug));

  const toInsert = editorialArticles.filter((a) => !existingSlugs.has(a.slug));

  if (toInsert.length === 0) {
    console.log("[seed-editorial] Editorial content already seeded, skipping...");
    return;
  }

  for (const article of toInsert) {
    await storage.createEditorialContent(article);
  }

  console.log(`[seed-editorial] Seeded ${toInsert.length} editorial articles`);
}
