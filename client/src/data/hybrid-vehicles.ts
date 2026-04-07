"use client";

export const hybridVehicles: Record<string, any> = {
  'volkswagen-golf-gte': {
    brand: 'Volkswagen',
    name: 'Golf GTE',
    type: 'Híbrido Enchufable',
    price: '379€',
    pvp: '40.900€',
    badge: 'Compacto deportivo',
    tagline: 'Compacto deportivo híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '6.7 s (0-100 km/h)',
        velocidadMaxima: '225 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '62 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.3 l/100km',
        emisionesCO2: '30 g/km'
      },
      dimensiones: {
        longitud: '4.284 mm',
        anchura: '1.789 mm',
        altura: '1.456 mm',
        batalla: '2.636 mm',
        maletero: '273 - 1.106 litros',
        peso: '1.615 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix IQ.Light', 'Pilotos LED', 'Llantas 17" GTE', 'Difusor trasero GTE', 'Cristales tintados', 'Retrovisores eléctricos'],
      interior: ['Digital Cockpit Pro', 'Pantalla táctil 10"', 'Climatizador automático', 'Volante multifunción', 'Asientos deportivos', 'Iluminación ambiental'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 62 km en modo 100% eléctrico para trayectos urbanos sin emisiones' },
      { icon: 'ri-speed-line', title: 'Prestaciones GTE', desc: '245 CV combinados para una conducción deportiva y emocionante' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-gas-station-line', title: 'Versatilidad', desc: 'Motor de combustión para viajes largos sin preocupaciones de autonomía' }
    ],
    related: [
      { slug: 'volkswagen-tiguan-ehybrid', name: 'Tiguan eHybrid', price: '479€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-leon-ehybrid', name: 'SEAT León e-HYBRID', price: '349€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-leon-ehybrid', name: 'CUPRA León e-HYBRID', price: '399€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'volkswagen-tiguan-ehybrid': {
    brand: 'Volkswagen',
    name: 'Tiguan eHybrid',
    type: 'Híbrido Enchufable',
    price: '479€',
    pvp: '51.800€',
    badge: 'SUV familiar',
    tagline: 'SUV familiar híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.5 s (0-100 km/h)',
        velocidadMaxima: '205 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '50 km WLTP',
        tiempoCarga: '3h 50min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.6 l/100km',
        emisionesCO2: '36 g/km'
      },
      dimensiones: {
        longitud: '4.509 mm',
        anchura: '1.839 mm',
        altura: '1.675 mm',
        batalla: '2.681 mm',
        maletero: '477 - 1.497 litros',
        peso: '1.764 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED', 'Llantas 18"', 'Barras de techo', 'Portón eléctrico', 'Cristales tintados'],
      interior: ['Digital Cockpit Pro', 'Pantalla táctil 9.2"', 'Climatizador trizona', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Espacio familiar', desc: 'Amplio habitáculo y maletero de 477 litros para toda la familia' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 50 km en modo 100% eléctrico para trayectos urbanos' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-shield-check-line', title: 'Seguridad 5 estrellas', desc: 'Máxima puntuación Euro NCAP con sistemas de asistencia avanzados' }
    ],
    related: [
      { slug: 'volkswagen-golf-gte', name: 'Golf GTE', price: '379€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-touareg-ehybrid', name: 'Touareg eHybrid', price: '749€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-tarraco-ehybrid', name: 'SEAT Tarraco e-HYBRID', price: '479€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'volkswagen-touareg-ehybrid': {
    brand: 'Volkswagen',
    name: 'Touareg eHybrid',
    type: 'Híbrido Enchufable',
    price: '749€',
    pvp: '80.900€',
    badge: 'Premium SUV',
    tagline: 'SUV premium híbrido · 462 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '3.0 V6 TSI + Motor eléctrico',
        potenciaCombinada: '462 CV',
        parMaximo: '700 Nm',
        transmision: 'Tiptronic 8 velocidades',
        traccion: 'Total (4MOTION)',
        aceleracion: '5.7 s (0-100 km/h)',
        velocidadMaxima: '250 km/h'
      },
      bateria: {
        capacidad: '14.3 kWh',
        autonomiaElectrica: '47 km WLTP',
        tiempoCarga: '4h 30min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '2.7 l/100km',
        emisionesCO2: '62 g/km'
      },
      dimensiones: {
        longitud: '4.878 mm',
        anchura: '1.984 mm',
        altura: '1.717 mm',
        batalla: '2.904 mm',
        maletero: '610 - 1.675 litros',
        peso: '2.510 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix IQ.Light HD', 'Pilotos LED 3D', 'Llantas 20"', 'Techo panorámico', 'Portón eléctrico', 'Estribos iluminados'],
      interior: ['Innovision Cockpit', 'Pantalla táctil 15"', 'Climatizador 4 zonas', 'Asientos Ergocomfort', 'Cuero Nappa', 'Iluminación ambiental 30 colores'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación premium', 'Dynaudio 3D', 'Head-up Display', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC predictivo', 'Night Vision', '9 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-vip-crown-line', title: 'Lujo absoluto', desc: 'Materiales premium y tecnología de vanguardia en cada detalle' },
      { icon: 'ri-speed-line', title: 'Prestaciones V6', desc: '462 CV combinados para prestaciones de deportivo en un SUV' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Lujo sostenible con acceso a todas las zonas' },
      { icon: 'ri-steering-2-line', title: 'Tracción 4MOTION', desc: 'Capacidad todoterreno con confort de berlina de lujo' }
    ],
    related: [
      { slug: 'volkswagen-tiguan-ehybrid', name: 'Tiguan eHybrid', price: '479€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q5-tfsi-e', name: 'Audi Q5 TFSI e', price: '649€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q3-tfsi-e', name: 'Audi Q3 TFSI e', price: '499€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-a3-tfsi-e': {
    brand: 'Audi',
    name: 'A3 Sportback TFSI e',
    type: 'Híbrido Enchufable',
    price: '429€',
    pvp: '46.400€',
    badge: 'Compacto premium',
    tagline: 'Compacto premium híbrido · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TFSI + Motor eléctrico',
        potenciaCombinada: '204 CV',
        parMaximo: '350 Nm',
        transmision: 'S tronic 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.6 s (0-100 km/h)',
        velocidadMaxima: '227 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '78 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.2 l/100km',
        emisionesCO2: '28 g/km'
      },
      dimensiones: {
        longitud: '4.343 mm',
        anchura: '1.816 mm',
        altura: '1.449 mm',
        batalla: '2.636 mm',
        maletero: '280 - 1.100 litros',
        peso: '1.590 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED', 'Pilotos LED', 'Llantas 17"', 'Retrovisores eléctricos', 'Cristales tintados', 'Sensor de lluvia'],
      interior: ['Audi Virtual Cockpit', 'MMI touch 10.1"', 'Climatizador automático', 'Volante multifunción', 'Asientos deportivos', 'Iluminación ambiental'],
      tecnologia: ['Audi connect', 'Apple CarPlay / Android Auto', 'Navegación MMI', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente Audi'],
      seguridad: ['Audi pre sense front', 'Lane Assist', 'ACC', 'Park Assist', '6 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-flashlight-line', title: 'Líder en autonomía', desc: 'Hasta 78 km en modo eléctrico, la mejor de su categoría' },
      { icon: 'ri-vip-crown-line', title: 'Premium Audi', desc: 'Calidad de construcción y materiales de primer nivel' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-money-euro-circle-line', title: 'Consumo mínimo', desc: 'Solo 1.2 l/100km en ciclo mixto WLTP' }
    ],
    related: [
      { slug: 'audi-q3-tfsi-e', name: 'Q3 TFSI e', price: '499€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q5-tfsi-e', name: 'Q5 TFSI e quattro', price: '649€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-golf-gte', name: 'VW Golf GTE', price: '379€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-q3-tfsi-e': {
    brand: 'Audi',
    name: 'Q3 TFSI e',
    type: 'Híbrido Enchufable',
    price: '499€',
    pvp: '53.900€',
    badge: 'SUV compacto',
    tagline: 'SUV compacto premium híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TFSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'S tronic 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.3 s (0-100 km/h)',
        velocidadMaxima: '210 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '61 km WLTP',
        tiempoCarga: '3h 45min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.4 l/100km',
        emisionesCO2: '32 g/km'
      },
      dimensiones: {
        longitud: '4.484 mm',
        anchura: '1.849 mm',
        altura: '1.616 mm',
        batalla: '2.680 mm',
        maletero: '380 - 1.375 litros',
        peso: '1.790 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED', 'Pilotos LED', 'Llantas 18"', 'Barras de techo', 'Portón eléctrico', 'Cristales tintados'],
      interior: ['Audi Virtual Cockpit', 'MMI touch 10.1"', 'Climatizador bizona', 'Volante multifunción', 'Asientos deportivos', 'Iluminación ambiental'],
      tecnologia: ['Audi connect', 'Apple CarPlay / Android Auto', 'Navegación MMI', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente Audi'],
      seguridad: ['Audi pre sense front', 'Lane Assist', 'ACC', 'Park Assist', '6 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Compacto versátil', desc: 'Tamaño ideal para ciudad con espacio para toda la familia' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 61 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-vip-crown-line', title: 'Premium Audi', desc: 'Calidad y tecnología Audi en formato compacto' }
    ],
    related: [
      { slug: 'audi-a3-tfsi-e', name: 'A3 Sportback TFSI e', price: '429€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q5-tfsi-e', name: 'Q5 TFSI e quattro', price: '649€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-tiguan-ehybrid', name: 'VW Tiguan eHybrid', price: '479€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-q5-tfsi-e': {
    brand: 'Audi',
    name: 'Q5 TFSI e quattro',
    type: 'Híbrido Enchufable',
    price: '649€',
    pvp: '70.100€',
    badge: 'SUV versátil',
    tagline: 'SUV premium híbrido · 367 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '2.0 TFSI + Motor eléctrico',
        potenciaCombinada: '367 CV',
        parMaximo: '500 Nm',
        transmision: 'S tronic 7 velocidades',
        traccion: 'Total (quattro)',
        aceleracion: '5.3 s (0-100 km/h)',
        velocidadMaxima: '239 km/h'
      },
      bateria: {
        capacidad: '17.9 kWh',
        autonomiaElectrica: '62 km WLTP',
        tiempoCarga: '5h 30min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.9 l/100km',
        emisionesCO2: '44 g/km'
      },
      dimensiones: {
        longitud: '4.682 mm',
        anchura: '1.893 mm',
        altura: '1.659 mm',
        batalla: '2.819 mm',
        maletero: '465 - 1.450 litros',
        peso: '2.105 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED', 'Llantas 19"', 'Barras de techo', 'Portón eléctrico', 'Cristales acústicos'],
      interior: ['Audi Virtual Cockpit Plus', 'MMI touch 10.1"', 'Climatizador trizona', 'Volante multifunción', 'Asientos S line', 'Iluminación ambiental plus'],
      tecnologia: ['Audi connect plus', 'Apple CarPlay / Android Auto', 'Navegación MMI plus', 'Bang & Olufsen', 'Head-up Display', 'Asistente Audi'],
      seguridad: ['Audi pre sense 360°', 'Lane Assist', 'ACC predictivo', 'Park Assist plus', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Prestaciones deportivas', desc: '367 CV y 0-100 en 5.3 segundos con tracción quattro' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 62 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Potencia sin renunciar a ventajas fiscales y acceso a ZBE' },
      { icon: 'ri-steering-2-line', title: 'Tracción quattro', desc: 'Seguridad y control en cualquier condición meteorológica' }
    ],
    related: [
      { slug: 'audi-q3-tfsi-e', name: 'Q3 TFSI e', price: '499€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-a3-tfsi-e', name: 'A3 Sportback TFSI e', price: '429€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-touareg-ehybrid', name: 'VW Touareg eHybrid', price: '749€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'seat-leon-ehybrid': {
    brand: 'SEAT',
    name: 'León e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '349€',
    pvp: '37.700€',
    badge: 'Mejor precio',
    tagline: 'Compacto híbrido accesible · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '204 CV',
        parMaximo: '350 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.5 s (0-100 km/h)',
        velocidadMaxima: '220 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '63 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.2 l/100km',
        emisionesCO2: '27 g/km'
      },
      dimensiones: {
        longitud: '4.368 mm',
        anchura: '1.800 mm',
        altura: '1.456 mm',
        batalla: '2.686 mm',
        maletero: '270 - 1.143 litros',
        peso: '1.580 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 17"', 'Retrovisores eléctricos', 'Cristales tintados', 'Sensor de lluvia'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Climatizador automático', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['SEAT Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-money-euro-circle-line', title: 'Mejor precio', desc: 'El híbrido enchufable más accesible del grupo Volkswagen' },
      { icon: 'ri-flashlight-line', title: 'Gran autonomía EV', desc: 'Hasta 63 km en modo eléctrico, líder en su segmento' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-palette-line', title: 'Diseño español', desc: 'Líneas dinámicas y deportivas diseñadas en Barcelona' }
    ],
    related: [
      { slug: 'seat-leon-sportstourer-ehybrid', name: 'León Sportstourer e-HYBRID', price: '369€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-tarraco-ehybrid', name: 'Tarraco e-HYBRID', price: '479€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-leon-ehybrid', name: 'CUPRA León e-HYBRID', price: '399€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'seat-leon-sportstourer-ehybrid': {
    brand: 'SEAT',
    name: 'León Sportstourer e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '369€',
    pvp: '39.900€',
    badge: 'Familiar',
    tagline: 'Familiar híbrido versátil · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '204 CV',
        parMaximo: '350 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.8 s (0-100 km/h)',
        velocidadMaxima: '218 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '64 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.3 l/100km',
        emisionesCO2: '29 g/km'
      },
      dimensiones: {
        longitud: '4.642 mm',
        anchura: '1.800 mm',
        altura: '1.448 mm',
        batalla: '2.686 mm',
        maletero: '470 - 1.450 litros',
        peso: '1.620 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 17"', 'Barras de techo', 'Portón eléctrico', 'Cristales tintados'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Climatizador automático', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['SEAT Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Máximo espacio', desc: 'Maletero de 470 litros, ideal para familias y profesionales' },
      { icon: 'ri-flashlight-line', title: 'Gran autonomía EV', desc: 'Hasta 64 km en modo eléctrico para uso diario sin emisiones' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-money-euro-circle-line', title: 'Precio competitivo', desc: 'El familiar híbrido enchufable más accesible' }
    ],
    related: [
      { slug: 'seat-leon-ehybrid', name: 'León e-HYBRID', price: '349€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-tarraco-ehybrid', name: 'Tarraco e-HYBRID', price: '479€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-octavia-combi-iv', name: 'Škoda Octavia Combi iV', price: '379€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'seat-tarraco-ehybrid': {
    brand: 'SEAT',
    name: 'Tarraco e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '479€',
    pvp: '51.700€',
    badge: '7 plazas',
    tagline: 'SUV familiar 7 plazas híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.7 s (0-100 km/h)',
        velocidadMaxima: '205 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '49 km WLTP',
        tiempoCarga: '3h 50min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.7 l/100km',
        emisionesCO2: '38 g/km'
      },
      dimensiones: {
        longitud: '4.735 mm',
        anchura: '1.839 mm',
        altura: '1.674 mm',
        batalla: '2.790 mm',
        maletero: '610 - 1.775 litros',
        peso: '1.847 kg',
        plazas: '7',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 18"', 'Barras de techo', 'Portón eléctrico', 'Cristales tintados'],
      interior: ['Digital Cockpit', 'Pantalla 9.2"', 'Climatizador trizona', 'Volante multifunción', '3ª fila de asientos', 'Iluminación ambiental'],
      tecnologia: ['SEAT Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-group-line', title: '7 plazas reales', desc: 'Espacio para toda la familia con tercera fila de asientos' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 49 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'SUV grande con acceso a zonas de bajas emisiones' },
      { icon: 'ri-space', title: 'Maletero enorme', desc: 'Hasta 1.775 litros con los asientos abatidos' }
    ],
    related: [
      { slug: 'seat-leon-ehybrid', name: 'León e-HYBRID', price: '349€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-leon-sportstourer-ehybrid', name: 'León Sportstourer e-HYBRID', price: '369€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-tiguan-ehybrid', name: 'VW Tiguan eHybrid', price: '479€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-leon-ehybrid': {
    brand: 'CUPRA',
    name: 'León e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '399€',
    pvp: '43.100€',
    badge: 'Deportivo',
    tagline: 'Compacto deportivo híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '6.7 s (0-100 km/h)',
        velocidadMaxima: '225 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '63 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.3 l/100km',
        emisionesCO2: '30 g/km'
      },
      dimensiones: {
        longitud: '4.398 mm',
        anchura: '1.800 mm',
        altura: '1.442 mm',
        batalla: '2.686 mm',
        maletero: '270 - 1.143 litros',
        peso: '1.620 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 18" CUPRA', 'Difusor trasero', 'Escapes cuádruples', 'Pintura mate disponible'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Asientos deportivos CUPRA', 'Volante CUPRA', 'Pedales en aluminio', 'Iluminación ambiental cobre'],
      tecnologia: ['CUPRA Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Beats Audio', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'DCC', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'ADN deportivo', desc: '245 CV y 0-100 en 6.7 segundos con carácter CUPRA' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 63 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin renunciar a ventajas fiscales' },
      { icon: 'ri-palette-line', title: 'Diseño exclusivo', desc: 'Estética CUPRA con detalles en cobre distintivos' }
    ],
    related: [
      { slug: 'cupra-formentor-ehybrid', name: 'Formentor e-HYBRID', price: '479€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-formentor-vz-ehybrid', name: 'Formentor VZ e-HYBRID', price: '549€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-leon-ehybrid', name: 'SEAT León e-HYBRID', price: '349€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-formentor-ehybrid': {
    brand: 'CUPRA',
    name: 'Formentor e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '479€',
    pvp: '51.700€',
    badge: 'SUV Coupé',
    tagline: 'SUV Coupé deportivo híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.0 s (0-100 km/h)',
        velocidadMaxima: '205 km/h'
      },
      bateria: {
        capacidad: '12.8 kWh',
        autonomiaElectrica: '55 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.4 l/100km',
        emisionesCO2: '32 g/km'
      },
      dimensiones: {
        longitud: '4.450 mm',
        anchura: '1.839 mm',
        altura: '1.511 mm',
        batalla: '2.680 mm',
        maletero: '345 - 1.292 litros',
        peso: '1.730 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 19" CUPRA', 'Difusor trasero', 'Escapes cuádruples', 'Techo panorámico'],
      interior: ['Digital Cockpit', 'Pantalla 12"', 'Asientos deportivos CUPRA', 'Volante CUPRA', 'Pedales en aluminio', 'Iluminación ambiental cobre'],
      tecnologia: ['CUPRA Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Beats Audio', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'DCC', '7 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-palette-line', title: 'Diseño único', desc: 'El primer modelo 100% CUPRA con diseño SUV coupé exclusivo' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 55 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin renunciar a ventajas fiscales' },
      { icon: 'ri-speed-line', title: 'Prestaciones', desc: '245 CV combinados para una conducción emocionante' }
    ],
    related: [
      { slug: 'cupra-leon-ehybrid', name: 'León e-HYBRID', price: '399€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-formentor-vz-ehybrid', name: 'Formentor VZ e-HYBRID', price: '549€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-tiguan-ehybrid', name: 'VW Tiguan eHybrid', price: '479€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-formentor-vz-ehybrid': {
    brand: 'CUPRA',
    name: 'Formentor VZ e-HYBRID',
    type: 'Híbrido Enchufable',
    price: '549€',
    pvp: '59.300€',
    badge: 'Máxima potencia',
    tagline: 'SUV Coupé deportivo híbrido · 245 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '245 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.0 s (0-100 km/h)',
        velocidadMaxima: '205 km/h'
      },
      bateria: {
        capacidad: '12.8 kWh',
        autonomiaElectrica: '58 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.5 l/100km',
        emisionesCO2: '34 g/km'
      },
      dimensiones: {
        longitud: '4.450 mm',
        anchura: '1.839 mm',
        altura: '1.511 mm',
        batalla: '2.680 mm',
        maletero: '345 - 1.292 litros',
        peso: '1.760 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED Matrix', 'Pilotos LED', 'Llantas 19" VZ', 'Difusor trasero VZ', 'Escapes Akrapovič', 'Pintura mate exclusiva'],
      interior: ['Digital Cockpit', 'Pantalla 12"', 'Asientos CUPBucket', 'Volante CUPRA VZ', 'Pedales en aluminio', 'Iluminación ambiental cobre'],
      tecnologia: ['CUPRA Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Beats Audio Premium', 'Carga inalámbrica', 'Head-up Display'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'DCC Sport', '7 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-vip-crown-line', title: 'Equipamiento VZ', desc: 'La versión más equipada y exclusiva del Formentor' },
      { icon: 'ri-steering-2-line', title: 'Chasis deportivo', desc: 'Suspensión DCC Sport y configuración específica' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Máximas prestaciones con ventajas fiscales' },
      { icon: 'ri-sound-module-line', title: 'Sonido Akrapovič', desc: 'Escapes de titanio con sonido deportivo exclusivo' }
    ],
    related: [
      { slug: 'cupra-formentor-ehybrid', name: 'Formentor e-HYBRID', price: '479€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-leon-ehybrid', name: 'León e-HYBRID', price: '399€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q5-tfsi-e', name: 'Audi Q5 TFSI e', price: '649€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-octavia-iv': {
    brand: 'Skoda',
    name: 'Octavia iV',
    type: 'Híbrido Enchufable',
    price: '359€',
    pvp: '38.800€',
    badge: 'Berlina eficiente',
    tagline: 'Berlina híbrida práctica · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '204 CV',
        parMaximo: '350 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.7 s (0-100 km/h)',
        velocidadMaxima: '220 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '62 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.2 l/100km',
        emisionesCO2: '28 g/km'
      },
      dimensiones: {
        longitud: '4.689 mm',
        anchura: '1.829 mm',
        altura: '1.469 mm',
        batalla: '2.686 mm',
        maletero: '450 - 1.455 litros',
        peso: '1.620 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 17"', 'Retrovisores eléctricos', 'Cristales tintados', 'Sensor de lluvia'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Climatizador bizona', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '9 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Espacio interior', desc: 'Referencia en espacio interior en su categoría' },
      { icon: 'ri-flashlight-line', title: 'Gran autonomía EV', desc: 'Hasta 62 km en modo eléctrico para uso diario' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-money-euro-circle-line', title: 'Relación calidad-precio', desc: 'Máximo equipamiento al mejor precio' }
    ],
    related: [
      { slug: 'skoda-octavia-combi-iv', name: 'Octavia Combi iV', price: '379€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-superb-iv', name: 'Superb iV', price: '499€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-leon-ehybrid', name: 'SEAT León e-HYBRID', price: '349€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-octavia-combi-iv': {
    brand: 'Skoda',
    name: 'Octavia Combi iV',
    type: 'Híbrido Enchufable',
    price: '379€',
    pvp: '40.900€',
    badge: 'Familiar espacioso',
    tagline: 'Familiar híbrido práctico · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '204 CV',
        parMaximo: '350 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.8 s (0-100 km/h)',
        velocidadMaxima: '218 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '63 km WLTP',
        tiempoCarga: '3h 40min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.3 l/100km',
        emisionesCO2: '29 g/km'
      },
      dimensiones: {
        longitud: '4.689 mm',
        anchura: '1.829 mm',
        altura: '1.468 mm',
        batalla: '2.686 mm',
        maletero: '490 - 1.555 litros',
        peso: '1.660 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED', 'Pilotos LED', 'Llantas 17"', 'Barras de techo', 'Portón eléctrico', 'Cristales tintados'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Climatizador automático', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '9 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Maletero enorme', desc: '490 litros de maletero, el más grande de su categoría' },
      { icon: 'ri-flashlight-line', title: 'Gran autonomía EV', desc: 'Hasta 63 km en modo eléctrico para uso diario' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-tools-line', title: 'Simply Clever', desc: 'Soluciones prácticas exclusivas de Škoda' }
    ],
    related: [
      { slug: 'skoda-octavia-iv', name: 'Octavia iV', price: '359€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-superb-iv', name: 'Superb iV', price: '499€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'seat-leon-sportstourer-ehybrid', name: 'SEAT León Sportstourer', price: '369€/mes', image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-superb-iv': {
    brand: 'Skoda',
    name: 'Superb iV',
    type: 'Híbrido Enchufable',
    price: '499€',
    pvp: '53.900€',
    badge: 'Berlina premium',
    tagline: 'Berlina ejecutiva híbrida · 218 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: '1.4 TSI + Motor eléctrico',
        potenciaCombinada: '218 CV',
        parMaximo: '400 Nm',
        transmision: 'DSG 6 velocidades',
        traccion: 'Delantera',
        aceleracion: '7.7 s (0-100 km/h)',
        velocidadMaxima: '224 km/h'
      },
      bateria: {
        capacidad: '13 kWh',
        autonomiaElectrica: '55 km WLTP',
        tiempoCarga: '3h 50min (wallbox)',
        cargaAC: '3.6 kW',
        consumoMixto: '1.5 l/100km',
        emisionesCO2: '35 g/km'
      },
      dimensiones: {
        longitud: '4.869 mm',
        anchura: '1.864 mm',
        altura: '1.469 mm',
        batalla: '2.841 mm',
        maletero: '485 - 1.610 litros',
        peso: '1.720 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Full LED Matrix', 'Pilotos LED', 'Llantas 18"', 'Cristales acústicos', 'Portón eléctrico', 'Sensor de lluvia'],
      interior: ['Digital Cockpit', 'Pantalla 10"', 'Climatizador trizona', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Canton Sound', 'Carga inalámbrica', 'Head-up Display'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC predictivo', 'Park Assist', '9 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-vip-crown-line', title: 'Espacio ejecutivo', desc: 'El mayor espacio interior de su categoría, ideal para directivos' },
      { icon: 'ri-flashlight-line', title: 'Modo eléctrico', desc: 'Hasta 55 km en modo 100% eléctrico para uso urbano' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Berlina ejecutiva con acceso a todas las zonas' },
      { icon: 'ri-money-euro-circle-line', title: 'Valor excepcional', desc: 'Equipamiento premium a precio competitivo' }
    ],
    related: [
      { slug: 'skoda-octavia-iv', name: 'Octavia iV', price: '359€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-octavia-combi-iv', name: 'Octavia Combi iV', price: '379€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-a3-tfsi-e', name: 'Audi A3 TFSI e', price: '429€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  }
};

