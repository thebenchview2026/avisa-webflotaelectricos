-- AVISA WebFlotaElectricos — DATOS parte 1/4
-- AVISA WebFlotaElectricos — DATOS (parte X/N)
--
-- PostgreSQL database dump
--


-- Dumped from database version 16.10
-- Dumped by pg_dump version 16.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('aa102b7c-4238-4a5b-ab13-593b3c8f00a3', 'Tesla', 'tesla', NULL, 'Líder mundial en vehículos eléctricos de alto rendimiento y tecnología autónoma avanzada.', 'Estados Unidos');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('63bfae21-0b75-4842-a548-26cc8fae8aa1', 'BYD', 'byd', NULL, 'El mayor fabricante de vehículos eléctricos del mundo, con soluciones para todos los segmentos.', 'China');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('a5c941c3-35d4-4de7-9191-8bde5cb82795', 'Hyundai', 'hyundai', NULL, 'Innovación coreana con una gama completa de eléctricos de última generación.', 'Corea del Sur');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('1ec729ac-e51a-4f27-ad8c-d5b2417bfd41', 'Volkswagen', 'volkswagen', NULL, 'La familia ID. revoluciona la movilidad eléctrica europea con calidad alemana.', 'Alemania');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('fb4c0e95-10b3-4163-bf35-80c2df1eca06', 'BMW', 'bmw', NULL, 'Deportividad y lujo eléctrico con la gama iX e i de BMW.', 'Alemania');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('9e5cb3be-0d30-4d26-9763-b42b654dd275', 'Mercedes-Benz', 'mercedes-benz', NULL, 'La gama EQ ofrece la máxima sofisticación en movilidad eléctrica premium.', 'Alemania');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('391d3419-54f6-4aec-9a24-59482238f27a', 'Kia', 'kia', NULL, 'Diseño audaz y tecnología avanzada en sus modelos 100% eléctricos.', 'Corea del Sur');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('3e04d435-4df7-4861-8bd1-784b93c661f2', 'Volvo', 'volvo', NULL, 'Seguridad escandinava y sostenibilidad en cada modelo eléctrico.', 'Suecia');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('a86a022e-1293-4cf4-9ecb-41fb1e0c46fa', 'Peugeot', 'peugeot', NULL, 'Electrificación francesa con estilo y practicidad para el día a día.', 'Francia');
INSERT INTO public.brands (id, name, slug, logo_url, description, country) VALUES ('374876c4-057e-4acf-9f71-e430c3d793b6', 'Renault', 'renault', NULL, 'Pioneros de la movilidad eléctrica accesible en Europa.', 'Francia');


--
-- Data for Name: dealers; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('01c6b6d8-1b4f-418e-9dbd-852a7e0dc050', 'Avisa Volkswagen Sevilla', 'Volkswagen', 'C/ Alhami, 2-4, 41020 Sevilla', 'Sevilla', 'Sevilla', '955 03 46 00', 'info@grupoavisa.com', 37.3886, -5.9823, 'https://www.google.com/maps/search/?api=1&query=C/+Alhami+2-4+41020+Sevilla', '{https://cdn.dealerk.es/cars/make/brand/48/white/volkswagen.png}', true, 1);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('66130ef2-816a-442a-a70d-e6820346cd8e', 'Avisa Audi Sevilla', 'Audi', 'Av. Averroes, 12, 41020 Sevilla', 'Sevilla', 'Sevilla', '955 03 46 04', 'audi@grupoavisa.com', 37.3901, -5.9756, 'https://www.google.com/maps/search/?api=1&query=Av+Averroes+12+41020+Sevilla', '{https://cdn.dealerk.es/cars/make/brand/48/white/audi.png}', true, 2);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('c37c47f9-fa46-41e5-ab46-0117733312c7', 'Cartuja Motor Sevilla', 'Škoda', 'Pol. Ind. Su Eminencia, C/ D, 1-2, 41006 Sevilla', 'Sevilla', 'Sevilla', '954 32 21 21', 'skoda.sevilla@grupoavisa.com', 37.3558, -5.9615, 'https://www.google.com/maps/search/?api=1&query=Pol+Ind+Su+Eminencia+C/D+1-2+41006+Sevilla', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 3);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('be916f04-ba8f-449b-ab46-3cffc7103587', 'Cartuja Motor Dos Hermanas', 'Škoda', 'Pol. Ind. La Isla, C/ Astronomía, 1, 41703 Dos Hermanas, Sevilla', 'Dos Hermanas', 'Sevilla', '955 03 46 00', 'skoda.doshermanas@grupoavisa.com', 37.2833, -5.9209, 'https://www.google.com/maps/search/?api=1&query=Pol+Ind+La+Isla+C/Astronomia+1+41703+Dos+Hermanas', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 4);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('b68a82f5-951e-4208-8a4a-56f8c14cbfaf', 'Cartuja Motor Huelva', 'Škoda', 'Pol. Ind. La Paz, Av. de las Veredas, 18, 21007 Huelva', 'Huelva', 'Huelva', '959 81 10 45', 'skoda.huelva@grupoavisa.com', 37.2614, -6.9447, 'https://www.google.com/maps/search/?api=1&query=Pol+Ind+La+Paz+Av+Veredas+18+21007+Huelva', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 5);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('23310aeb-8a3a-47cb-a670-007b23aca0cb', 'Avisa Škoda Badajoz', 'Škoda', 'Ctra. Madrid-Lisboa, Km. 409, 06008 Badajoz', 'Badajoz', 'Badajoz', '924 29 11 00', 'skoda.badajoz@grupoavisa.com', 38.8794, -6.9707, 'https://www.google.com/maps/search/?api=1&query=Ctra+Madrid-Lisboa+Km+409+06008+Badajoz', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 6);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('c23b2e04-6ec4-48b4-b429-f6efbc76f4bb', 'Avisa Škoda Cáceres', 'Škoda', 'Pol. Ind. Las Capellanías, C/ Hojalateros, 121 Oeste, 10005 Cáceres', 'Cáceres', 'Cáceres', '927 23 48 88', 'skoda.caceres@grupoavisa.com', 39.4753, -6.3724, 'https://www.google.com/maps/search/?api=1&query=Pol+Ind+Las+Capellanias+C/Hojalateros+121+10005+Caceres', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 7);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('0cb907e2-471d-4252-b1fb-bce8ec5b35e9', 'Avisa Škoda Fuente de Cantos', 'Škoda', 'C/ Real, 48, 06240 Fuente de Cantos, Badajoz', 'Fuente de Cantos', 'Badajoz', '924 50 00 69', 'skoda.fuentedecantos@grupoavisa.com', 38.2453, -6.3062, 'https://www.google.com/maps/search/?api=1&query=C/Real+48+06240+Fuente+de+Cantos+Badajoz', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 8);
INSERT INTO public.dealers (id, name, brand, address, city, province, phone, email, lat, lng, google_maps_url, brand_logos, active, sort_order) VALUES ('20c60f02-45ee-4745-8386-b502626b373f', 'Avisa Škoda Córdoba', 'Škoda', 'C/ Esteban de Cabrera, 90, 14014 Córdoba', 'Córdoba', 'Córdoba', '957 42 17 00', 'skoda.cordoba@grupoavisa.com', 37.8882, -4.7794, 'https://www.google.com/maps/search/?api=1&query=C/Esteban+de+Cabrera+90+14014+Cordoba', '{https://cdn.dealerk.es/cars/make/brand/48/white/skoda.png}', true, 9);


--
-- Data for Name: editorial_content; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('4bac4dde-1b52-438b-ab59-e1e4076dd966', 'novedad', 'volkswagen-id7-tourer-2025-llega-espana', 'Volkswagen ID.7 Tourer 2025 llega a España', 'El familiar eléctrico de Volkswagen ya está disponible en los concesionarios españoles con hasta 700 km de autonomía WLTP y carga rápida a 200 kW.', '## El familiar eléctrico más esperado

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

Visita nuestros concesionarios en Sevilla, Córdoba o Dos Hermanas para probarlo.', 'lanzamientos', '{volkswagen,id7,familiar,eléctrico,2025}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1617886903355-9354e2b281a2?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-03-01 00:00:00', '2026-03-12 04:25:16.579561', '2026-03-12 04:25:16.579561', 'Volkswagen ID.7 Tourer 2025 en España', 'El Volkswagen ID.7 Tourer 2025 llega a España con 700 km de autonomía, carga rápida 200 kW y maletero de 605L. Disponible en Grupo Avisa.', 4, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('baeb6e06-58b3-4b3f-bf09-0e44bdc1f30c', 'novedad', 'audi-q6-etron-disponible-grupo-avisa', 'Audi Q6 e-tron ya disponible en Grupo Avisa', 'El nuevo SUV eléctrico de Audi llega con la plataforma PPE, hasta 625 km de autonomía y un interior completamente digitalizado.', '## Audi Q6 e-tron: el SUV eléctrico premium

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

Ya puedes reservar tu Audi Q6 e-tron en nuestro concesionario Audi. Disponemos de unidades para entrega inmediata y configuraciones personalizadas.', 'lanzamientos', '{audi,q6-etron,suv,eléctrico,premium}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-28 00:00:00', '2026-03-12 04:25:16.620195', '2026-03-12 04:25:16.620195', 'Audi Q6 e-tron disponible en Grupo Avisa', 'Audi Q6 e-tron: SUV eléctrico premium con 625 km de autonomía y carga a 270 kW. Disponible en concesionario Audi Grupo Avisa, Sevilla.', 4, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('49a278fd-e760-4dce-8d95-153205550fe8', 'consejo', 'cuidar-bateria-coche-electrico-alargar-vida-util', 'Cómo cuidar la batería de tu eléctrico', 'La batería es el corazón de tu coche eléctrico. Estos consejos de mantenimiento te ayudarán a alargar su vida útil y mantener su capacidad.', '## Alarga la vida de la batería de tu coche eléctrico

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

Las baterías de los vehículos Volkswagen, Audi y Skoda tienen garantía de **8 años o 160.000 km** para mantener al menos el 70% de su capacidad original.', 'mantenimiento', '{batería,mantenimiento,vida-útil,carga,cuidados}', 'Departamento Técnico Avisa', 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-01-10 00:00:00', '2026-03-12 04:25:16.649931', '2026-03-12 04:25:16.649931', 'Cuidar batería coche eléctrico: consejos', 'Cómo cuidar la batería de tu coche eléctrico para alargar su vida útil: niveles de carga óptimos, temperatura, carga rápida y revisiones.', 5, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('3858bea0-d666-44cb-b49d-80d87f2bc468', 'guia', 'como-elegir-coche-electrico-primer-vehiculo', 'Cómo elegir tu primer coche eléctrico', 'La guía definitiva para dar el salto al coche eléctrico: qué autonomía necesitas, presupuesto, puntos de carga y las mejores opciones del mercado.', '## Tu primer coche eléctrico: decisiones clave

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

En Grupo Avisa tenemos las marcas líderes del mercado eléctrico. Ven a probar diferentes modelos y encuentra el que mejor se adapta a tu estilo de vida.', 'compra', '{compra,primer-electrico,autonomía,presupuesto,guía}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-01 00:00:00', '2026-03-12 04:25:16.630637', '2026-03-12 04:25:16.630637', 'Cómo elegir tu primer coche eléctrico', 'Guía para elegir tu primer coche eléctrico: autonomía necesaria, presupuesto real, eléctrico vs híbrido y mejores opciones en España 2025.', 6, NULL, 'ambos');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('11e7c63e-d693-42c0-a468-49f47e09d7ce', 'comparativa', 'electrico-vs-hibrido-enchufable-cual-elegir', 'Eléctrico vs híbrido enchufable: ¿cuál elegir?', 'Analizamos en profundidad las ventajas e inconvenientes de los coches eléctricos puros frente a los híbridos enchufables para ayudarte a decidir.', '## La gran pregunta: ¿eléctrico o híbrido enchufable?

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

Nuestro equipo analiza tu perfil de conducción y te recomienda la mejor opción. Tenemos eléctricos y híbridos enchufables de Volkswagen, Audi y Skoda listos para probar.', 'decision', '{eléctrico,híbrido,phev,bev,comparativa,decisión}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-01-25 00:00:00', '2026-03-12 04:25:16.640415', '2026-03-12 04:25:16.640415', 'Eléctrico vs híbrido enchufable: comparativa', 'Eléctrico puro vs híbrido enchufable: ventajas, inconvenientes, costes y cuál te conviene según tu perfil. Comparativa completa 2025.', 6, NULL, 'ambos');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('58ccfc3f-7aff-4a94-9dfa-c4ea91085773', 'guia', 'guia-completa-carga-coche-electrico-casa', 'Guía completa: carga del coche eléctrico en casa', 'Todo lo que necesitas saber para instalar un punto de carga en tu garaje: tipos de cargadores, costes, permisos y consejos para optimizar la carga nocturna.', '## ¿Puedo cargar mi coche eléctrico en casa?

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

En nuestros concesionarios te asesoramos sobre la mejor solución de carga para tu hogar y te ponemos en contacto con instaladores autorizados en Sevilla, Córdoba y Dos Hermanas.', 'carga', '{carga,wallbox,doméstico,instalación,tarifa}', 'Departamento Técnico Avisa', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-01-20 00:00:00', '2026-03-12 04:25:16.625026', '2026-03-12 04:25:16.625026', 'Carga coche eléctrico en casa: guía completa', 'Guía completa para cargar tu coche eléctrico en casa: tipos de wallbox, costes de instalación, permisos y consejos para ahorrar en la factura.', 7, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('2570ae0d-10af-4c24-9e00-16da91b10d5a', 'consejo', '10-consejos-maximizar-autonomia-coche-electrico', '10 consejos para maximizar la autonomía', 'Aprende las técnicas de conducción eficiente y configuración del vehículo que pueden aumentar la autonomía de tu coche eléctrico hasta un 30%.', '## Saca el máximo partido a cada carga

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

Un servicio de mantenimiento regular asegura que todos los sistemas funcionan con la máxima eficiencia. En el taller de Grupo Avisa realizamos revisiones específicas para vehículos eléctricos.', 'conduccion', '{autonomía,conducción-eficiente,ahorro,tips,regenerativa}', 'Departamento Técnico Avisa', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-05 00:00:00', '2026-03-12 04:25:16.64498', '2026-03-12 04:25:16.64498', '10 consejos autonomía coche eléctrico', '10 consejos prácticos para maximizar la autonomía de tu coche eléctrico: frenada regenerativa, velocidad óptima, climatización y más.', 5, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('6bb901fb-212f-4438-9289-b196aadca30e', 'comparativa', 'comparativa-suv-electricos-menos-45000-euros', 'Comparativa: SUV eléctricos por menos de 45.000€', 'Enfrentamos los mejores SUV eléctricos del mercado con precio inferior a 45.000€: Volkswagen ID.4, Skoda Enyaq, Hyundai Ioniq 5 y más.', '## Los mejores SUV eléctricos asequibles

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

Todos están disponibles en Grupo Avisa con financiación desde 299€/mes.', 'suv', '{comparativa,suv,id4,enyaq,id5,precio}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-10 00:00:00', '2026-03-12 04:25:16.635739', '2026-03-12 04:25:16.635739', 'Comparativa SUV eléctricos menos de 45.000€', 'Comparativa detallada de SUV eléctricos por menos de 45.000€: VW ID.4, Skoda Enyaq e ID.5. Autonomía, espacio, precio y cuál elegir.', 6, NULL, 'electrico');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('b42cb7b3-c0e8-429d-a0eb-1162505df93c', 'comparativa', 'coste-total-electrico-vs-gasolina', 'Coste total de un eléctrico vs gasolina: ¿cuánto ahorras realmente?', 'Comparamos el coste real de comprar y usar un coche eléctrico frente a uno de gasolina en 5 años: precio, combustible, mantenimiento y ayudas MOVES III.', '## ¿Un coche eléctrico es más caro que uno de gasolina?

A primera vista sí: el precio de lista suele ser entre 5.000 y 10.000 € más alto. Pero el coste total de propiedad (TCO) a 5 años cuenta una historia muy diferente.

### Comparativa: Volkswagen ID.3 Pro vs Golf 1.5 TSI

| Concepto | ID.3 Pro (eléctrico) | Golf 1.5 TSI (gasolina) |
|---|---|---|
| Precio de compra | 42.900 € | 35.200 € |
| Ayuda MOVES III | -7.000 € | — |
| Precio final | **35.900 €** | **35.200 €** |
| Combustible / recarga (75.000 km) | ~1.800 € | ~8.500 € |
| Mantenimiento (5 años) | ~900 € | ~2.500 € |
| Impuesto matriculación | 0 € | ~1.400 € |
| IVTM (5 años) | 0 € | ~750 € |
| **Coste total 5 años** | **~38.600 €** | **~48.350 €** |

> **Ahorro real en 5 años: ~9.750 € a favor del eléctrico.**

### Desglose del ahorro

#### 1. Combustible vs recarga
Un Golf 1.5 TSI consume ~5,8 l/100 km. A 1,70 €/litro y 75.000 km en 5 años, el coste en gasolina supera los 7.400 €.

El ID.3 Pro consume ~15 kWh/100 km. Cargando en casa a tarifa nocturna (0,12 €/kWh), el coste es de unos 1.350 € totales. **Ahorro: ~6.000 €**.

#### 2. Mantenimiento
Sin motor de combustión, el eléctrico no necesita:
- Cambios de aceite y filtros
- Bujías ni embrague
- Sistema de escape

**Ahorro estimado a 5 años: 1.500-2.000 €**.

#### 3. Impuestos y tasas
- **Impuesto de matriculación**: los eléctricos están exentos (~1.400 € de ahorro)
- **IVTM municipal**: muchos ayuntamientos aplican bonificación del 75-100% para vehículos con etiqueta CERO
- **Zona azul/verde**: aparcamiento gratuito en la mayoría de ciudades andaluzas

### ¿Cuándo se recupera la inversión?

Con la ayuda MOVES III aplicada, el punto de equilibrio entre el eléctrico y el de gasolina equivalente se alcanza en aproximadamente **2-3 años** de uso normal (15.000 km/año). Sin ayudas, sube a los **3-4 años**.

### Variables que aceleran el retorno

1. **Cargador en casa**: la recarga nocturna es un 40% más barata que usar cargadores públicos
2. **Tarifa valle**: contratar discriminación horaria reduce el coste de carga a ~0,08 €/kWh
3. **Muchos kilómetros**: cuanto más conduces, mayor es el ahorro

### Conclusión

El coche eléctrico es ya más barato que el de gasolina en un horizonte de 5 años, especialmente si aplicas las ayudas MOVES III y cargas en casa. En Grupo Avisa te asesoramos en todo el proceso: desde la elección del modelo hasta la tramitación de la subvención.', NULL, '{"electrico vs gasolina","coste total electrico","ahorro coche electrico","TCO electrico","comparativa coste"}', 'Equipo Avisa Eléctricos', 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=450&fit=crop&auto=format&q=80', true, '2026-03-18 11:19:19.790222', '2026-03-18 11:19:19.790222', '2026-03-18 11:19:19.790222', 'Coste Total Eléctrico vs Gasolina: Ahorro Real en 5 Años', 'Comparativa de coste total de propiedad: coche eléctrico vs gasolina. Calculamos precio, recarga, mantenimiento y ayudas MOVES. ¿Cuándo se recupera la inversión?', 6, NULL, NULL);
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('c2203058-221a-450b-91fb-02a68403c806', 'novedad', 'plan-moves-iv-ayudas-coches-electricos-2025', 'Plan MOVES IV: nuevas ayudas para eléctricos', 'El Gobierno aprueba el Plan MOVES IV con ayudas de hasta 7.000€ para la compra de vehículos eléctricos. Te explicamos los requisitos y cómo solicitarlo.', '## Nuevas ayudas para vehículos eléctricos en 2025

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

Contacta con nosotros en el 955 034 600 o visita cualquiera de nuestras instalaciones.', 'ayudas', '{moves,ayudas,subvenciones,eléctrico,gobierno}', 'Departamento Comercial', 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-15 00:00:00', '2026-03-12 04:25:16.615113', '2026-03-12 04:25:16.615113', 'Plan MOVES IV 2025: ayudas coches eléctricos', 'Plan MOVES IV 2025: hasta 7.000€ de ayuda para comprar un coche eléctrico. Requisitos, cuantías y cómo solicitarlo en Grupo Avisa.', 5, NULL, 'ambos');
INSERT INTO public.editorial_content (id, type, slug, title, excerpt, content, category, tags, author, featured_image, published, published_at, updated_at, created_at, meta_title, meta_description, reading_time, related_slugs, related_vehicle_type) VALUES ('9aa941ce-06f5-4acb-a6b5-f7961875b984', 'guia', 'red-carga-publica-andalucia-mapa-puntos', 'Red de carga pública en Andalucía: mapa y puntos', 'Mapa completo de los puntos de carga públicos en Andalucía: ubicaciones, tipos de conector, potencia y apps para encontrarlos.', '## La red de carga en Andalucía crece rápidamente

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

Nuestros concesionarios disponen de cargadores para clientes. Si necesitas cargar tu vehículo mientras realizas una gestión o revisión, estás bienvenido.', 'infraestructura', '{carga-pública,andalucía,mapa,puntos-carga,infraestructura}', 'Equipo Grupo Avisa', 'https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?w=800&h=450&fit=crop&auto=format&q=80', true, '2025-02-20 00:00:00', '2026-03-12 04:25:16.654788', '2026-03-12 04:25:16.654788', 'Puntos carga eléctricos Andalucía 2025', 'Mapa de puntos de carga para coches eléctricos en Andalucía 2025: ubicaciones, tipos, potencia y apps. Red carga pública Sevilla, Córdoba.', 5, NULL, 'electrico');


--
-- Data for Name: faq_categories; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('54f2fc54-7ac5-4cca-842c-c2cc906ac1c1', 'Autonomía', 'autonomia', 'ri-battery-2-charge-line', 'Todo sobre la autonomía de los vehículos eléctricos', 1);
INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('20955f77-7d64-4bbc-be51-edff9fb5c1c4', 'Carga', 'carga', 'ri-charging-pile-2-line', 'Información sobre carga y conectores', 2);
INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('499c6901-b018-4de1-a752-2f1e75f7eb00', 'Costes', 'costes', 'ri-money-euro-circle-line', 'Costes de uso, mantenimiento y seguros', 3);
INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('a6b6fd87-9e02-4972-8457-9de6a02a2970', 'Ayudas y subvenciones', 'ayudas', 'ri-hand-coin-line', 'Plan MOVES y otras ayudas disponibles', 4);
INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('61c49b49-8b70-45dd-ad66-d5d66b4dca08', 'Uso diario', 'uso-diario', 'ri-steering-2-line', 'Uso cotidiano del vehículo eléctrico', 5);
INSERT INTO public.faq_categories (id, name, slug, icon, description, sort_order) VALUES ('3739a3c8-8a20-40ed-b040-5ec8bde2c3b1', 'Mantenimiento', 'mantenimiento', 'ri-tools-line', 'Mantenimiento y duración del vehículo', 6);


--