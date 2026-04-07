"use client";

export const electricVehicles: Record<string, any> = {
  'volkswagen-id3-pro': {
    brand: 'Volkswagen',
    name: 'ID.3 Pro',
    type: '100% Eléctrico',
    price: '399€',
    pvp: '42.900€',
    badge: 'Más vendido',
    tagline: 'Compacto eléctrico · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '204 CV (150 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '7.3 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '58 kWh (neta)',
        autonomia: '426 km WLTP',
        cargaRapidaDC: '30 min (10-80%)',
        cargaAC: '7.2 kW',
        potenciaCargaDC: '120 kW',
        consumo: '14.5 kWh/100km'
      },
      dimensiones: {
        longitud: '4.261 mm',
        anchura: '1.809 mm',
        altura: '1.552 mm',
        batalla: '2.765 mm',
        maletero: '385 - 1.267 litros',
        peso: '1.805 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix IQ.Light', 'Pilotos traseros LED 3D', 'Llantas aleación 18"', 'Techo panorámico', 'Cristales tintados', 'Retrovisores eléctricos'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla táctil 10"', 'Climatizador automático', 'Volante multifunción', 'Asientos calefactados', 'Iluminación ambiental 30 colores'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación con RA', 'Carga inalámbrica', 'Sistema de sonido 6 altavoces', 'Head-up Display AR'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC adaptativo', 'Park Assist Plus', '7 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-money-euro-circle-line', title: 'Coste reducido', desc: 'Ahorra hasta un 70% en combustible respecto a un vehículo de gasolina' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-tools-line', title: 'Bajo mantenimiento', desc: 'Sin cambios de aceite, filtros ni embrague. Menos piezas de desgaste' },
      { icon: 'ri-flashlight-line', title: 'Carga rápida', desc: 'Del 10% al 80% en solo 30 minutos en cargadores DC' }
    ],
    related: [
      { slug: 'volkswagen-id4-pro', name: 'ID.4 Pro', price: '485€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id5-gtx', name: 'ID.5 GTX', price: '599€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-born-eboost', name: 'CUPRA Born', price: '429€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'volkswagen-id4-pro': {
    brand: 'Volkswagen',
    name: 'ID.4 Pro',
    type: '100% Eléctrico',
    price: '485€',
    pvp: '52.400€',
    badge: 'SUV familiar',
    tagline: 'SUV eléctrico · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '204 CV (150 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '8.5 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '77 kWh (neta)',
        autonomia: '521 km WLTP',
        cargaRapidaDC: '38 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '16.3 kWh/100km'
      },
      dimensiones: {
        longitud: '4.584 mm',
        anchura: '1.865 mm',
        altura: '1.634 mm',
        batalla: '2.771 mm',
        maletero: '543 - 1.575 litros',
        peso: '2.124 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix IQ.Light', 'Pilotos traseros LED 3D', 'Llantas aleación 19"', 'Barras de techo', 'Cristales tintados', 'Portón eléctrico'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla táctil 12"', 'Climatizador bizona', 'Volante multifunción calefactado', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación inteligente', 'Carga inalámbrica', 'Sistema de sonido Harman Kardon', 'Head-up Display AR'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC adaptativo', 'Park Assist Plus', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Espacio familiar', desc: 'Amplio maletero de 543L y habitáculo espacioso para toda la familia' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-battery-2-charge-line', title: 'Gran autonomía', desc: 'Hasta 521 km con una sola carga para viajes largos sin preocupaciones' },
      { icon: 'ri-shield-check-line', title: 'Seguridad 5 estrellas', desc: 'Máxima puntuación Euro NCAP con sistemas de asistencia avanzados' }
    ],
    related: [
      { slug: 'volkswagen-id3-pro', name: 'ID.3 Pro', price: '399€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id5-gtx', name: 'ID.5 GTX', price: '599€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q4-etron-45', name: 'Audi Q4 e-tron', price: '549€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'volkswagen-id5-gtx': {
    brand: 'Volkswagen',
    name: 'ID.5 GTX',
    type: '100% Eléctrico',
    price: '599€',
    pvp: '64.900€',
    badge: 'Deportivo',
    tagline: 'SUV Coupé eléctrico · 299 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Doble motor eléctrico',
        potencia: '299 CV (220 kW)',
        parMaximo: '460 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Total (4MOTION)',
        aceleracion: '6.3 s (0-100 km/h)',
        velocidadMaxima: '180 km/h'
      },
      bateria: {
        capacidad: '77 kWh (neta)',
        autonomia: '490 km WLTP',
        cargaRapidaDC: '36 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '150 kW',
        consumo: '17.2 kWh/100km'
      },
      dimensiones: {
        longitud: '4.599 mm',
        anchura: '1.852 mm',
        altura: '1.615 mm',
        batalla: '2.766 mm',
        maletero: '549 - 1.561 litros',
        peso: '2.224 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix IQ.Light', 'Pilotos traseros LED 3D', 'Llantas aleación 20" GTX', 'Techo panorámico', 'Spoiler trasero', 'Difusor deportivo'],
      interior: ['Digital Cockpit Pro', 'Pantalla táctil 12"', 'Asientos deportivos GTX', 'Volante deportivo', 'Pedales en aluminio', 'Iluminación ambiental 30 colores'],
      tecnologia: ['We Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación con RA', 'Sistema Harman Kardon', 'Head-up Display AR', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC predictivo', 'Travel Assist', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Prestaciones GTX', desc: 'Tracción total y 299 CV para una conducción deportiva y segura' },
      { icon: 'ri-palette-line', title: 'Diseño coupé', desc: 'Líneas aerodinámicas y deportivas que destacan en cualquier lugar' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin emisiones y acceso a todas las zonas' },
      { icon: 'ri-vip-crown-line', title: 'Equipamiento premium', desc: 'Tecnología y confort de primer nivel en cada detalle' }
    ],
    related: [
      { slug: 'volkswagen-id4-pro', name: 'ID.4 Pro', price: '485€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q4-etron-45', name: 'Audi Q4 e-tron', price: '549€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-tavascan-vz', name: 'CUPRA Tavascan', price: '649€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-q4-etron-45': {
    brand: 'Audi',
    name: 'Q4 e-tron 45',
    type: '100% Eléctrico',
    price: '549€',
    pvp: '59.400€',
    badge: 'SUV versátil',
    tagline: 'SUV premium eléctrico · 286 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '286 CV (210 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '6.2 s (0-100 km/h)',
        velocidadMaxima: '180 km/h'
      },
      bateria: {
        capacidad: '82 kWh (neta)',
        autonomia: '520 km WLTP',
        cargaRapidaDC: '38 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '17.0 kWh/100km'
      },
      dimensiones: {
        longitud: '4.588 mm',
        anchura: '1.865 mm',
        altura: '1.632 mm',
        batalla: '2.764 mm',
        maletero: '520 - 1.490 litros',
        peso: '2.135 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED con barra luminosa', 'Llantas aleación 19"', 'Barras de techo en aluminio', 'Cristales acústicos', 'Portón eléctrico'],
      interior: ['Audi Virtual Cockpit Plus', 'MMI touch 11.6"', 'Climatizador trizona', 'Volante multifunción', 'Asientos deportivos S line', 'Iluminación ambiental plus'],
      tecnologia: ['Audi connect', 'Apple CarPlay / Android Auto', 'Navegación MMI plus', 'Bang & Olufsen 3D', 'Head-up Display AR', 'Asistente Audi'],
      seguridad: ['Audi pre sense front', 'Lane Assist', 'ACC adaptativo', 'Park Assist plus', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-vip-crown-line', title: 'Premium Audi', desc: 'Calidad de construcción y materiales de primer nivel' },
      { icon: 'ri-battery-2-charge-line', title: 'Gran autonomía', desc: 'Hasta 520 km con una sola carga para viajes sin preocupaciones' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-sound-module-line', title: 'Tecnología avanzada', desc: 'Sistema MMI de última generación y sonido Bang & Olufsen' }
    ],
    related: [
      { slug: 'audi-etron-gt-quattro', name: 'e-tron GT', price: '999€/mes', image: 'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q8-etron-55', name: 'Q8 e-tron', price: '899€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id4-pro', name: 'VW ID.4 Pro', price: '485€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-etron-gt-quattro': {
    brand: 'Audi',
    name: 'e-tron GT quattro',
    type: '100% Eléctrico',
    price: '999€',
    pvp: '107.900€',
    badge: 'Gran Turismo',
    tagline: 'Gran Turismo eléctrico · 476 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Doble motor eléctrico',
        potencia: '476 CV (350 kW)',
        parMaximo: '630 Nm',
        transmision: 'Automática 2 velocidades',
        traccion: 'Total (quattro)',
        aceleracion: '4.1 s (0-100 km/h)',
        velocidadMaxima: '245 km/h'
      },
      bateria: {
        capacidad: '93.4 kWh (neta)',
        autonomia: '488 km WLTP',
        cargaRapidaDC: '23 min (10-80%)',
        cargaAC: '22 kW',
        potenciaCargaDC: '270 kW',
        consumo: '19.6 kWh/100km'
      },
      dimensiones: {
        longitud: '4.989 mm',
        anchura: '1.964 mm',
        altura: '1.396 mm',
        batalla: '2.900 mm',
        maletero: '405 litros',
        peso: '2.347 kg',
        plazas: '4',
        puertas: '4'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix HD', 'Pilotos OLED', 'Llantas 20" diseño aero', 'Techo panorámico', 'Spoiler activo', 'Pintura metalizada'],
      interior: ['Audi Virtual Cockpit Plus', 'MMI touch 10.1"', 'Asientos sport plus', 'Volante deportivo', 'Cuero Nappa', 'Iluminación ambiental plus'],
      tecnologia: ['Audi connect plus', 'Apple CarPlay / Android Auto', 'Navegación MMI plus', 'Bang & Olufsen 3D', 'Head-up Display', 'Audi phone box'],
      seguridad: ['Audi pre sense 360°', 'Lane Assist', 'ACC predictivo', 'Night vision', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Prestaciones extremas', desc: '476 CV y 0-100 en 4.1 segundos para emociones únicas' },
      { icon: 'ri-flashlight-line', title: 'Carga ultrarrápida', desc: 'Arquitectura 800V para cargar del 10% al 80% en 23 minutos' },
      { icon: 'ri-vip-crown-line', title: 'Lujo absoluto', desc: 'Materiales premium y acabados de la más alta calidad' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin emisiones y acceso a todas las zonas' }
    ],
    related: [
      { slug: 'audi-q4-etron-45', name: 'Q4 e-tron 45', price: '549€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-q8-etron-55', name: 'Q8 e-tron 55', price: '899€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-tavascan-vz', name: 'CUPRA Tavascan', price: '649€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'audi-q8-etron-55': {
    brand: 'Audi',
    name: 'Q8 e-tron 55',
    type: '100% Eléctrico',
    price: '899€',
    pvp: '97.100€',
    badge: 'Flagship SUV',
    tagline: 'SUV de lujo eléctrico · 408 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Doble motor eléctrico',
        potencia: '408 CV (300 kW)',
        parMaximo: '664 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Total (quattro)',
        aceleracion: '5.6 s (0-100 km/h)',
        velocidadMaxima: '200 km/h'
      },
      bateria: {
        capacidad: '114 kWh (neta)',
        autonomia: '582 km WLTP',
        cargaRapidaDC: '31 min (10-80%)',
        cargaAC: '22 kW',
        potenciaCargaDC: '170 kW',
        consumo: '20.6 kWh/100km'
      },
      dimensiones: {
        longitud: '4.915 mm',
        anchura: '1.937 mm',
        altura: '1.633 mm',
        batalla: '2.928 mm',
        maletero: '569 - 1.637 litros',
        peso: '2.585 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros Digital Matrix LED', 'Pilotos OLED', 'Llantas 21"', 'Retrovisores virtuales', 'Techo panorámico', 'Portón eléctrico'],
      interior: ['Audi Virtual Cockpit Plus', 'MMI touch dual screen', 'Asientos confort plus', 'Volante calefactado', 'Cuero Valcona', 'Iluminación ambiental plus'],
      tecnologia: ['Audi connect plus', 'Apple CarPlay / Android Auto', 'Navegación e-tron', 'Bang & Olufsen 3D', 'Head-up Display', 'Audi phone box'],
      seguridad: ['Audi pre sense 360°', 'Lane Assist', 'ACC predictivo', 'Night vision', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-battery-2-charge-line', title: 'Máxima autonomía', desc: 'Hasta 582 km con la batería más grande de la gama Audi' },
      { icon: 'ri-space', title: 'Espacio de lujo', desc: 'Habitáculo premium con espacio para 5 adultos y gran maletero' },
      { icon: 'ri-vip-crown-line', title: 'Flagship Audi', desc: 'Lo mejor de la tecnología y el confort en un SUV eléctrico' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Lujo sostenible con acceso a todas las zonas' }
    ],
    related: [
      { slug: 'audi-q4-etron-45', name: 'Q4 e-tron 45', price: '549€/mes', image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'audi-etron-gt-quattro', name: 'e-tron GT', price: '999€/mes', image: 'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id5-gtx', name: 'VW ID.5 GTX', price: '599€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-born-eboost': {
    brand: 'CUPRA',
    name: 'Born e-Boost',
    type: '100% Eléctrico',
    price: '429€',
    pvp: '46.400€',
    badge: 'Deportivo compacto',
    tagline: 'Compacto deportivo eléctrico · 231 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '231 CV (170 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '6.6 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '77 kWh (neta)',
        autonomia: '548 km WLTP',
        cargaRapidaDC: '35 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '15.4 kWh/100km'
      },
      dimensiones: {
        longitud: '4.322 mm',
        anchura: '1.809 mm',
        altura: '1.537 mm',
        batalla: '2.765 mm',
        maletero: '385 - 1.267 litros',
        peso: '1.900 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED', 'Pilotos LED 3D', 'Llantas 19" CUPRA', 'Spoiler trasero', 'Difusor deportivo', 'Pintura mate disponible'],
      interior: ['Digital Cockpit', 'Pantalla 12"', 'Asientos deportivos CUPBucket', 'Volante CUPRA', 'Pedales en aluminio', 'Iluminación ambiental cobre'],
      tecnologia: ['CUPRA Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Beats Audio', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'ADN deportivo', desc: 'Diseño y prestaciones CUPRA para una conducción emocionante' },
      { icon: 'ri-battery-2-charge-line', title: 'Gran autonomía', desc: 'Hasta 548 km con una sola carga, líder en su segmento' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin emisiones y acceso a todas las zonas' },
      { icon: 'ri-money-euro-circle-line', title: 'Precio competitivo', desc: 'La mejor relación prestaciones-precio en eléctricos deportivos' }
    ],
    related: [
      { slug: 'cupra-born-vz', name: 'Born VZ', price: '479€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-tavascan-vz', name: 'Tavascan VZ', price: '649€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id3-pro', name: 'VW ID.3 Pro', price: '399€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-tavascan-vz': {
    brand: 'CUPRA',
    name: 'Tavascan VZ',
    type: '100% Eléctrico',
    price: '649€',
    pvp: '70.100€',
    badge: 'SUV Coupé',
    tagline: 'SUV Coupé deportivo eléctrico · 340 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Doble motor eléctrico',
        potencia: '340 CV (250 kW)',
        parMaximo: '545 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Total (4Drive)',
        aceleracion: '5.6 s (0-100 km/h)',
        velocidadMaxima: '180 km/h'
      },
      bateria: {
        capacidad: '77 kWh (neta)',
        autonomia: '520 km WLTP',
        cargaRapidaDC: '35 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '16.8 kWh/100km'
      },
      dimensiones: {
        longitud: '4.644 mm',
        anchura: '1.861 mm',
        altura: '1.597 mm',
        batalla: '2.766 mm',
        maletero: '540 - 1.438 litros',
        peso: '2.158 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED 3D', 'Llantas 21" CUPRA', 'Techo panorámico', 'Spoiler trasero', 'Difusor deportivo'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla 15"', 'Asientos deportivos CUPBucket', 'Volante CUPRA', 'Pedales en aluminio', 'Iluminación ambiental'],
      tecnologia: ['CUPRA Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación AR', 'Sennheiser Audio', 'Head-up Display AR', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC predictivo', 'Travel Assist', '8 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Prestaciones VZ', desc: 'Tracción total y 340 CV para una conducción deportiva y segura' },
      { icon: 'ri-palette-line', title: 'Diseño único', desc: 'Líneas de SUV coupé que definen una nueva categoría' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin emisiones y acceso a todas las zonas' },
      { icon: 'ri-sound-module-line', title: 'Tecnología premium', desc: 'Pantalla de 15" y sonido Sennheiser de alta fidelidad' }
    ],
    related: [
      { slug: 'cupra-born-eboost', name: 'Born e-Boost', price: '429€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-born-vz', name: 'Born VZ', price: '479€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id5-gtx', name: 'VW ID.5 GTX', price: '599€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'cupra-born-vz': {
    brand: 'CUPRA',
    name: 'Born VZ',
    type: '100% Eléctrico',
    price: '479€',
    pvp: '51.800€',
    badge: 'Máxima potencia',
    tagline: 'Hot hatch eléctrico · 326 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '326 CV (240 kW)',
        parMaximo: '545 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '5.6 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '77 kWh (neta)',
        autonomia: '511 km WLTP',
        cargaRapidaDC: '35 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '185 kW',
        consumo: '16.2 kWh/100km'
      },
      dimensiones: {
        longitud: '4.322 mm',
        anchura: '1.809 mm',
        altura: '1.537 mm',
        batalla: '2.765 mm',
        maletero: '385 - 1.267 litros',
        peso: '1.960 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED 3D', 'Llantas 20" VZ', 'Spoiler trasero VZ', 'Difusor deportivo', 'Pintura mate exclusiva'],
      interior: ['Digital Cockpit', 'Pantalla 12"', 'Asientos CUPBucket VZ', 'Volante CUPRA VZ', 'Pedales en aluminio', 'Iluminación ambiental cobre'],
      tecnologia: ['CUPRA Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Beats Audio', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'DCC Sport', '7 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Máxima potencia', desc: '326 CV y 0-100 en 5.6 segundos, el Born más potente' },
      { icon: 'ri-steering-2-line', title: 'Chasis VZ', desc: 'Suspensión DCC Sport y configuración específica para circuito' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Prestaciones de hot hatch sin emisiones' },
      { icon: 'ri-flashlight-line', title: 'Carga rápida', desc: 'Hasta 185 kW de potencia de carga para mínimas paradas' }
    ],
    related: [
      { slug: 'cupra-born-eboost', name: 'Born e-Boost', price: '429€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-tavascan-vz', name: 'Tavascan VZ', price: '649€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id3-pro', name: 'VW ID.3 Pro', price: '399€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-enyaq-iv-80': {
    brand: 'Skoda',
    name: 'Enyaq iV 80',
    type: '100% Eléctrico',
    price: '499€',
    pvp: '53.900€',
    badge: 'SUV espacioso',
    tagline: 'SUV familiar eléctrico · 204 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '204 CV (150 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '8.6 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '82 kWh (neta)',
        autonomia: '534 km WLTP',
        cargaRapidaDC: '36 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '16.7 kWh/100km'
      },
      dimensiones: {
        longitud: '4.649 mm',
        anchura: '1.879 mm',
        altura: '1.616 mm',
        batalla: '2.765 mm',
        maletero: '585 - 1.710 litros',
        peso: '2.090 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED', 'Llantas 19"', 'Barras de techo', 'Cristales tintados', 'Portón eléctrico'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla 13"', 'Climatizador trizona', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Canton Sound', 'Carga inalámbrica', 'Head-up Display'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '9 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-space', title: 'Máximo espacio', desc: 'El maletero más grande de su categoría con 585 litros' },
      { icon: 'ri-battery-2-charge-line', title: 'Gran autonomía', desc: 'Hasta 534 km con una sola carga para viajes largos' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-money-euro-circle-line', title: 'Relación calidad-precio', desc: 'El SUV eléctrico más completo por su precio' }
    ],
    related: [
      { slug: 'skoda-enyaq-coupe-rs', name: 'Enyaq Coupé RS', price: '649€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-enyaq-iv-60', name: 'Enyaq iV 60', price: '429€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id4-pro', name: 'VW ID.4 Pro', price: '485€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-enyaq-coupe-rs': {
    brand: 'Skoda',
    name: 'Enyaq Coupé RS',
    type: '100% Eléctrico',
    price: '649€',
    pvp: '70.200€',
    badge: 'Deportivo',
    tagline: 'SUV Coupé deportivo eléctrico · 340 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Doble motor eléctrico',
        potencia: '340 CV (250 kW)',
        parMaximo: '679 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Total',
        aceleracion: '6.5 s (0-100 km/h)',
        velocidadMaxima: '180 km/h'
      },
      bateria: {
        capacidad: '82 kWh (neta)',
        autonomia: '513 km WLTP',
        cargaRapidaDC: '36 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '135 kW',
        consumo: '17.4 kWh/100km'
      },
      dimensiones: {
        longitud: '4.653 mm',
        anchura: '1.879 mm',
        altura: '1.607 mm',
        batalla: '2.765 mm',
        maletero: '570 - 1.610 litros',
        peso: '2.247 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED Matrix', 'Pilotos LED', 'Llantas 21" RS', 'Techo panorámico', 'Spoiler trasero', 'Difusor RS'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla 13"', 'Asientos deportivos RS', 'Volante RS', 'Pedales en aluminio', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect Plus', 'Apple CarPlay / Android Auto', 'Navegación', 'Canton Sound', 'Head-up Display', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC predictivo', 'Travel Assist', '9 airbags', 'Cámara 360°']
    },
    ventajas: [
      { icon: 'ri-speed-line', title: 'Prestaciones RS', desc: 'Tracción total y 340 CV para una conducción deportiva' },
      { icon: 'ri-palette-line', title: 'Diseño coupé', desc: 'Líneas deportivas que combinan elegancia y dinamismo' },
      { icon: 'ri-space', title: 'Practicidad', desc: 'Amplio maletero de 570 litros a pesar del diseño coupé' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Deportividad sin emisiones y acceso a todas las zonas' }
    ],
    related: [
      { slug: 'skoda-enyaq-iv-80', name: 'Enyaq iV 80', price: '499€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-enyaq-iv-60', name: 'Enyaq iV 60', price: '429€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'cupra-tavascan-vz', name: 'CUPRA Tavascan', price: '649€/mes', image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  },
  'skoda-enyaq-iv-60': {
    brand: 'Skoda',
    name: 'Enyaq iV 60',
    type: '100% Eléctrico',
    price: '429€',
    pvp: '46.400€',
    badge: 'Mejor precio',
    tagline: 'SUV eléctrico accesible · 180 CV · Etiqueta CERO',
    image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=800&h=500&fit=crop&auto=format&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80',
      'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=900&h=600&fit=crop&auto=format&q=80'
    ],
    specs: {
      motor: {
        motorizacion: 'Motor eléctrico trasero',
        potencia: '180 CV (132 kW)',
        parMaximo: '310 Nm',
        transmision: 'Automática 1 velocidad',
        traccion: 'Trasera',
        aceleracion: '9.0 s (0-100 km/h)',
        velocidadMaxima: '160 km/h'
      },
      bateria: {
        capacidad: '62 kWh (neta)',
        autonomia: '417 km WLTP',
        cargaRapidaDC: '36 min (10-80%)',
        cargaAC: '11 kW',
        potenciaCargaDC: '120 kW',
        consumo: '15.9 kWh/100km'
      },
      dimensiones: {
        longitud: '4.649 mm',
        anchura: '1.879 mm',
        altura: '1.616 mm',
        batalla: '2.765 mm',
        maletero: '585 - 1.710 litros',
        peso: '1.990 kg',
        plazas: '5',
        puertas: '5'
      }
    },
    equipamiento: {
      exterior: ['Faros LED', 'Pilotos LED', 'Llantas 19"', 'Barras de techo', 'Cristales tintados', 'Portón eléctrico'],
      interior: ['Digital Cockpit 5.3"', 'Pantalla 13"', 'Climatizador bizona', 'Volante multifunción', 'Asientos ergonómicos', 'Iluminación ambiental'],
      tecnologia: ['Skoda Connect', 'Apple CarPlay / Android Auto', 'Navegación', 'Sistema de sonido', 'Carga inalámbrica', 'Asistente de voz'],
      seguridad: ['Front Assist', 'Lane Assist', 'ACC', 'Park Assist', '9 airbags', 'Cámara trasera']
    },
    ventajas: [
      { icon: 'ri-money-euro-circle-line', title: 'Mejor precio', desc: 'El SUV eléctrico más accesible del grupo Volkswagen' },
      { icon: 'ri-space', title: 'Máximo espacio', desc: 'El mismo espacio interior que el Enyaq 80 a menor precio' },
      { icon: 'ri-leaf-line', title: 'Etiqueta CERO', desc: 'Acceso libre a zonas de bajas emisiones y ventajas fiscales' },
      { icon: 'ri-battery-2-charge-line', title: 'Autonomía suficiente', desc: '417 km ideales para uso urbano y periurbano' }
    ],
    related: [
      { slug: 'skoda-enyaq-iv-80', name: 'Enyaq iV 80', price: '499€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'skoda-enyaq-coupe-rs', name: 'Enyaq Coupé RS', price: '649€/mes', image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=400&h=250&fit=crop&auto=format&q=80' },
      { slug: 'volkswagen-id3-pro', name: 'VW ID.3 Pro', price: '399€/mes', image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&h=250&fit=crop&auto=format&q=80' }
    ]
  }
};

