"use client";
import { useState, useMemo } from 'react';
import { Link, useLocation } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Promotion } from '@shared/schema';

const brandOrder = ['Volkswagen', 'Audi', 'SEAT', 'CUPRA', 'Škoda'];

const __LEGACY_brands = [
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    logo: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'golf-gte',
        slug: 'volkswagen-golf-gte',
        name: 'Golf GTE',
        type: 'Híbrido Enchufable',
        price: '379€/mes',
        pvp: '40.900€',
        badge: 'Compacto deportivo',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '62 km',
          potencia: '245 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '6.7 s (0-100)',
          consumo: '1.3 l/100km'
        }
      },
      {
        id: 'tiguan-ehybrid',
        slug: 'volkswagen-tiguan-ehybrid',
        name: 'Tiguan eHybrid',
        type: 'Híbrido Enchufable',
        price: '479€/mes',
        pvp: '51.800€',
        badge: 'SUV familiar',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '50 km',
          potencia: '245 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 50min',
          aceleracion: '7.5 s (0-100)',
          consumo: '1.6 l/100km'
        }
      },
      {
        id: 'touareg-ehybrid',
        slug: 'volkswagen-touareg-ehybrid',
        name: 'Touareg eHybrid',
        type: 'Híbrido Enchufable',
        price: '749€/mes',
        pvp: '80.900€',
        badge: 'Premium SUV',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '47 km',
          potencia: '462 CV',
          bateria: '14.3 kWh',
          tiempoCarga: '4h 30min',
          aceleracion: '5.7 s (0-100)',
          consumo: '2.7 l/100km'
        }
      }
    ]
  },
  {
    id: 'audi',
    name: 'Audi',
    logo: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'a3-tfsi',
        slug: 'audi-a3-tfsi-e',
        name: 'A3 Sportback TFSI e',
        type: 'Híbrido Enchufable',
        price: '429€/mes',
        pvp: '46.400€',
        badge: 'Compacto premium',
        image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '78 km',
          potencia: '204 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.6 s (0-100)',
          consumo: '1.2 l/100km'
        }
      },
      {
        id: 'q3-tfsi',
        slug: 'audi-q3-tfsi-e',
        name: 'Q3 TFSI e',
        type: 'Híbrido Enchufable',
        price: '499€/mes',
        pvp: '53.900€',
        badge: 'SUV compacto',
        image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '61 km',
          potencia: '245 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 45min',
          aceleracion: '7.3 s (0-100)',
          consumo: '1.4 l/100km'
        }
      },
      {
        id: 'q5-tfsi',
        slug: 'audi-q5-tfsi-e',
        name: 'Q5 TFSI e quattro',
        type: 'Híbrido Enchufable',
        price: '649€/mes',
        pvp: '70.100€',
        badge: 'SUV versátil',
        image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '62 km',
          potencia: '367 CV',
          bateria: '17.9 kWh',
          tiempoCarga: '5h 30min',
          aceleracion: '5.3 s (0-100)',
          consumo: '1.9 l/100km'
        }
      }
    ]
  },
  {
    id: 'seat',
    name: 'SEAT',
    logo: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'leon-ehybrid',
        slug: 'seat-leon-ehybrid',
        name: 'León e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '349€/mes',
        pvp: '37.700€',
        badge: 'Mejor precio',
        image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '63 km',
          potencia: '204 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.5 s (0-100)',
          consumo: '1.2 l/100km'
        }
      },
      {
        id: 'leon-sportstourer',
        slug: 'seat-leon-sportstourer-ehybrid',
        name: 'León Sportstourer e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '369€/mes',
        pvp: '39.900€',
        badge: 'Familiar',
        image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '64 km',
          potencia: '204 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.8 s (0-100)',
          consumo: '1.3 l/100km'
        }
      },
      {
        id: 'tarraco-ehybrid',
        slug: 'seat-tarraco-ehybrid',
        name: 'Tarraco e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '479€/mes',
        pvp: '51.700€',
        badge: '7 plazas',
        image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '49 km',
          potencia: '245 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 50min',
          aceleracion: '7.7 s (0-100)',
          consumo: '1.7 l/100km'
        }
      }
    ]
  },
  {
    id: 'cupra',
    name: 'CUPRA',
    logo: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'leon-ehybrid',
        slug: 'cupra-leon-ehybrid',
        name: 'León e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '399€/mes',
        pvp: '43.100€',
        badge: 'Deportivo',
        image: 'https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '63 km',
          potencia: '245 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '6.7 s (0-100)',
          consumo: '1.3 l/100km'
        }
      },
      {
        id: 'formentor-ehybrid',
        slug: 'cupra-formentor-ehybrid',
        name: 'Formentor e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '479€/mes',
        pvp: '51.700€',
        badge: 'SUV Coupé',
        image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '55 km',
          potencia: '245 CV',
          bateria: '12.8 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.0 s (0-100)',
          consumo: '1.4 l/100km'
        }
      },
      {
        id: 'formentor-vz',
        slug: 'cupra-formentor-vz-ehybrid',
        name: 'Formentor VZ e-HYBRID',
        type: 'Híbrido Enchufable',
        price: '549€/mes',
        pvp: '59.300€',
        badge: 'Máxima potencia',
        image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '58 km',
          potencia: '245 CV',
          bateria: '12.8 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.0 s (0-100)',
          consumo: '1.5 l/100km'
        }
      }
    ]
  },
  {
    id: 'skoda',
    name: 'Skoda',
    logo: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'octavia-iv',
        slug: 'skoda-octavia-iv',
        name: 'Octavia iV',
        type: 'Híbrido Enchufable',
        price: '359€/mes',
        pvp: '38.800€',
        badge: 'Berlina eficiente',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '62 km',
          potencia: '204 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.7 s (0-100)',
          consumo: '1.2 l/100km'
        }
      },
      {
        id: 'octavia-combi-iv',
        slug: 'skoda-octavia-combi-iv',
        name: 'Octavia Combi iV',
        type: 'Híbrido Enchufable',
        price: '379€/mes',
        pvp: '40.900€',
        badge: 'Familiar espacioso',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '63 km',
          potencia: '204 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 40min',
          aceleracion: '7.8 s (0-100)',
          consumo: '1.3 l/100km'
        }
      },
      {
        id: 'superb-iv',
        slug: 'skoda-superb-iv',
        name: 'Superb iV',
        type: 'Híbrido Enchufable',
        price: '499€/mes',
        pvp: '53.900€',
        badge: 'Berlina premium',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomiaElectrica: '55 km',
          potencia: '218 CV',
          bateria: '13 kWh',
          tiempoCarga: '3h 50min',
          aceleracion: '7.7 s (0-100)',
          consumo: '1.5 l/100km'
        }
      }
    ]
  }
];

const technologies = [
  {
    icon: 'ri-battery-charge-line',
    title: 'Doble motorización',
    description: 'Combina un motor eléctrico con uno de combustión, permitiendo conducción 100% eléctrica en ciudad y autonomía extendida en carretera.'
  },
  {
    icon: 'ri-plug-line',
    title: 'Carga enchufable',
    description: 'Recarga la batería en casa o en el trabajo. Carga completa en 3-4 horas con cargador doméstico o 1,5 horas en punto de carga rápida.'
  },
  {
    icon: 'ri-leaf-line',
    title: 'Etiqueta ECO',
    description: 'Acceso a zonas de bajas emisiones, descuentos en peajes y aparcamiento, y ventajas fiscales en impuesto de matriculación.'
  },
  {
    icon: 'ri-dashboard-3-line',
    title: 'Gestión inteligente',
    description: 'El sistema selecciona automáticamente el modo más eficiente según las condiciones de conducción y el nivel de batería.'
  }
];

const benefits = [
  {
    icon: 'ri-money-euro-circle-line',
    title: 'Ahorro en combustible',
    description: 'Reduce hasta un 70% el gasto en combustible en uso urbano y periurbano gracias al modo eléctrico.'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Sin ansiedad de autonomía',
    description: 'El motor de combustión garantiza autonomía ilimitada para viajes largos sin preocupaciones.'
  },
  {
    icon: 'ri-government-line',
    title: 'Ventajas fiscales',
    description: 'Descuentos en impuesto de matriculación, circulación y beneficios en zonas de bajas emisiones.'
  },
  {
    icon: 'ri-parking-box-line',
    title: 'Aparcamiento gratuito',
    description: 'Estacionamiento gratuito o con descuento en zonas reguladas de las principales ciudades.'
  },
  {
    icon: 'ri-home-4-line',
    title: 'Carga en casa',
    description: 'Recarga cómodamente durante la noche en tu garaje con un simple enchufe doméstico.'
  },
  {
    icon: 'ri-gift-line',
    title: 'Ayudas Plan MOVES',
    description: 'Hasta 5.000€ de subvención directa gestionada íntegramente por Grupo Avisa.'
  }
];

const ctaModels = [
  'Volkswagen Golf GTE',
  'Volkswagen Tiguan eHybrid',
  'Volkswagen Touareg eHybrid',
  'Audi A3 Sportback TFSI e',
  'Audi Q3 TFSI e',
  'Audi Q5 TFSI e quattro',
  'SEAT León e-HYBRID',
  'SEAT León Sportstourer e-HYBRID',
  'SEAT Tarraco e-HYBRID',
  'CUPRA León e-HYBRID',
  'CUPRA Formentor e-HYBRID',
  'CUPRA Formentor VZ e-HYBRID',
  'Skoda Octavia iV',
  'Skoda Octavia Combi iV',
  'Skoda Superb iV'
];

function PromoHibridosHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" aria-label="Promociones de vehículos híbridos enchufables" data-testid="section-hero-hibridos">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=1440&h=810&fit=crop&auto=format&q=80"
          alt="Vehículos Híbridos Enchufables Grupo Avisa"
          className="w-full h-full object-cover object-center"
          width={1440}
          height={810}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-2 bg-[#ad023b] text-white text-sm font-bold rounded-full mb-6">
            Promociones Exclusivas
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Híbridos Enchufables
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Lo mejor de dos mundos: conducción 100% eléctrica en ciudad y autonomía ilimitada en carretera. Descubre nuestras ofertas exclusivas con Plan MOVES incluido.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#modelos"
              className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-ver-modelos"
            >
              <i className="ri-car-line text-xl" aria-hidden="true"></i>
              Ver modelos
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-md font-bold hover:bg-slate-100 transition-colors cursor-pointer whitespace-nowrap"
              data-testid="link-solicitar-info"
            >
              <i className="ri-phone-line text-xl" aria-hidden="true"></i>
              Solicitar información
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-ayudas-moves">5.000€</div>
              <div className="text-sm text-white/70">Ayudas Plan MOVES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-autonomia">75 km</div>
              <div className="text-sm text-white/70">Autonomía eléctrica</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-ahorro">70%</div>
              <div className="text-sm text-white/70">Ahorro combustible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HybridTechnology() {
  return (
    <section className="py-20 bg-white" aria-label="Tecnología híbrida enchufable" data-testid="section-technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tecnología híbrida enchufable
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Los vehículos híbridos enchufables (PHEV) combinan lo mejor de la movilidad eléctrica con la versatilidad de un motor de combustión. La solución perfecta para quienes buscan eficiencia sin renunciar a la autonomía.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-slate-50 rounded-md p-6 hover:shadow-lg transition-shadow" data-testid={`card-tech-${index}`}>
              <div className="w-14 h-14 flex items-center justify-center bg-[#ad023b] text-white rounded-md mb-4">
                <i className={`${tech.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tech.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{tech.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[#8d0230] to-[#ad023b] rounded-md overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-white mb-6">
                ¿Cómo funciona un híbrido enchufable?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 text-white rounded-full flex-shrink-0 font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-white">Modo eléctrico puro</p>
                    <p className="text-white/70 text-sm">Circula hasta 75 km usando solo el motor eléctrico, ideal para ciudad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 text-white rounded-full flex-shrink-0 font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-white">Modo híbrido inteligente</p>
                    <p className="text-white/70 text-sm">El sistema combina ambos motores para máxima eficiencia en carretera.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 text-white rounded-full flex-shrink-0 font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-white">Regeneración de energía</p>
                    <p className="text-white/70 text-sm">Recupera energía al frenar y desacelerar, recargando la batería.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 text-white rounded-full flex-shrink-0 font-bold text-sm">4</div>
                  <div>
                    <p className="font-semibold text-white">Carga externa</p>
                    <p className="text-white/70 text-sm">Conecta a la red eléctrica para recargar completamente la batería.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1502877338535-e2e1c07b8e44?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Tecnología híbrido enchufable"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HybridBenefits() {
  return (
    <section className="py-20 bg-slate-50" aria-label="Ventajas del híbrido enchufable" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ventajas de los híbridos enchufables
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre por qué cada vez más conductores eligen un híbrido enchufable como su próximo vehículo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-md p-6 shadow-sm hover:shadow-lg transition-shadow" data-testid={`card-benefit-${index}`}>
              <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 text-[#ad023b] rounded-md mb-4">
                <i className={`${benefit.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-100">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 text-center">
              Comparativa: Híbrido enchufable vs Combustión
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-comparison">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Concepto</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#ad023b]">Híbrido Enchufable</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-500">Combustión</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Ahorro anual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Combustible (15.000 km/año)</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-semibold">450€</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">1.500€</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-bold">1.050€</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Impuesto de circulación</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-semibold">75% descuento</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">100%</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-bold">~100€</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Mantenimiento</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-semibold">300€/año</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">500€/año</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-bold">200€</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Aparcamiento regulado</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-semibold">Gratuito/Descuento</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">~600€/año</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-bold">~500€</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">Peajes urbanos</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-semibold">Exento</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500">Variable</td>
                  <td className="px-6 py-4 text-center text-sm text-[#ad023b] font-bold">~200€</td>
                </tr>
              </tbody>
              <tfoot className="bg-[#ad023b]/5">
                <tr>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">AHORRO TOTAL ANUAL</td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 text-center text-lg font-bold text-[#ad023b]">~2.050€</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandModelsSection({ initialData }: { initialData?: Promotion[] }) {
  const [activeBrand, setActiveBrand] = useState('Volkswagen');
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const { data: allPromotions = [] } = useQuery<Promotion[]>({
    queryKey: ["/api/promotions"],
    initialData: initialData,
  });

  const hybridPromos = useMemo(() =>
    allPromotions.filter(p => p.vehicleType === 'hibrido' && p.active),
    [allPromotions]
  );

  const brandNames = useMemo(() => {
    const names = Array.from(new Set(hybridPromos.map(p => p.brandName).filter((b): b is string => Boolean(b))));
    return names.sort((a, b) => {
      const ia = brandOrder.indexOf(a);
      const ib = brandOrder.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }, [hybridPromos]);

  const effectiveBrand = brandNames.includes(activeBrand) ? activeBrand : (brandNames[0] || activeBrand);
  const currentModels = hybridPromos.filter(p => p.brandName === effectiveBrand);

  const parseSpec = (features: string[] | null, label: string) => {
    const f = (features || []).find(s => s.toLowerCase().startsWith(label.toLowerCase()));
    return f ? f.split(': ')[1] || '' : '';
  };

  return (
    <section id="modelos" className="py-20 bg-white" aria-label="Modelos híbridos disponibles" data-testid="section-brand-models">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#ad023b]/10 text-[#ad023b] text-sm font-bold rounded-full mb-4">
            Catálogo completo
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Modelos híbridos enchufables por marca
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre nuestra selección de vehículos híbridos enchufables. Elige una marca para explorar todos los modelos con sus especificaciones técnicas completas.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {brandNames.map((brand) => (
            <button
              key={brand}
              onClick={() => {
                setActiveBrand(brand);
                setExpandedModel(null);
              }}
              className={`px-6 py-3 rounded-md font-bold text-sm transition-all cursor-pointer whitespace-nowrap ${
                effectiveBrand === brand
                  ? 'bg-[#ad023b] text-white shadow-lg'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              data-testid={`button-brand-${brand.toLowerCase().replace(/\s/g,'-')}`}
            >
              {brand}
            </button>
          ))}
        </div>

        {currentModels.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="text-xl font-bold text-gray-900">{effectiveBrand}</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {currentModels.map((model) => {
                const slug = (model.link || '').split('/').pop() || model.id;
                return (
                <div
                  key={model.id}
                  className="bg-white rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
                  data-testid={`card-model-${slug}`}
                >
                  <div className="relative">
                    <div className="w-full h-52 bg-slate-100">
                      {model.imageUrl && (
                      <img
                        src={model.imageUrl}
                        alt={model.title}
                        className="w-full h-full object-cover object-top"
                        loading="lazy"
                        width={480}
                        height={320}
                      />
                      )}
                    </div>
                    {model.badge && (
                    <div className="absolute top-3 right-3 bg-[#ad023b] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      {model.badge}
                    </div>
                    )}
                    <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <i className="ri-plug-line" aria-hidden="true"></i>
                      {model.subtitle}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                        {model.brandName}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">
                        {model.modelName}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-md p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Autonomía EV</div>
                        <div className="font-bold text-gray-900">{parseSpec(model.features, 'Autonomía')}</div>
                      </div>
                      <div className="bg-slate-50 rounded-md p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Potencia</div>
                        <div className="font-bold text-gray-900">{parseSpec(model.features, 'Potencia')}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedModel(expandedModel === model.id ? null : model.id)}
                      className="text-sm text-[#ad023b] font-medium flex items-center gap-1 mb-4 cursor-pointer hover:underline"
                      data-testid={`button-specs-${slug}`}
                    >
                      {expandedModel === model.id ? 'Ocultar ficha técnica' : 'Ver ficha técnica completa'}
                      <i className={`ri-arrow-${expandedModel === model.id ? 'up' : 'down'}-s-line`} aria-hidden="true"></i>
                    </button>

                    {expandedModel === model.id && (
                      <div className="bg-slate-50 rounded-md p-4 mb-4 space-y-2 text-sm">
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-600">Batería</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Batería')}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-600">Tiempo de carga</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Tiempo carga')}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-600">0-100 km/h</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Aceleración')}</span>
                        </div>
                        <div className="flex justify-between gap-2">
                          <span className="text-gray-600">Consumo mixto</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Consumo')}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-end justify-between gap-2 mb-5 mt-auto">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{model.monthlyPayment}</div>
                        <div className="text-xs text-gray-500">desde / 48 meses</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">{model.price ? `${model.price.toLocaleString('es-ES')}€` : ''}</div>
                        <div className="text-xs text-gray-500">PVP</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={model.link || '#'}
                        className="flex-1 bg-[#ad023b] text-white text-center py-3 rounded-md text-sm font-bold hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap"
                        data-testid={`link-ficha-${slug}`}
                      >
                        Ver ficha completa
                      </Link>
                      <Link
                        href={`${model.link || '#'}#configurador`}
                        className="w-12 flex items-center justify-center bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Configurar cuota"
                        data-testid={`link-config-${slug}`}
                      >
                        <i className="ri-settings-3-line text-xl" aria-hidden="true"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </div>
        )}

        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-md p-6">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <i className="ri-information-line text-xl text-amber-600" aria-hidden="true"></i>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-2">Promociones sujetas a disponibilidad</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                Las cuotas mostradas son orientativas e incluyen IVA. Pueden variar según financiación, entrada y condiciones específicas. Plan MOVES sujeto a aprobación y disponibilidad de fondos. Consulta condiciones en tu concesionario Grupo Avisa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HybridCTA() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    modelo: '',
    mensaje: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.mensaje.length > 500 || !acceptTerms) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          modelo: formData.modelo,
          mensaje: formData.mensaje,
          acepta_terminos: acceptTerms,
          acepta_marketing: acceptMarketing,
          origen: 'hibridos'
        })
      });

      if (response.ok) {
        const params = new URLSearchParams({
          nombre: formData.nombre,
          origen: 'hibridos'
        });
        navigate(`/confirmacion-contacto?${params.toString()}`);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-[#8d0230] via-[#ad023b] to-[#8d0230]" aria-label="Solicitar información" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Interesado en un híbrido enchufable?
            </h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Solicita información sin compromiso y te asesoraremos sobre el modelo que mejor se adapta a tus necesidades. Gestionamos todas las ayudas del Plan MOVES por ti.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-md">
                  <i className="ri-check-double-line text-2xl text-white/80" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="font-semibold text-white">Asesoramiento personalizado</p>
                  <p className="text-white/60 text-sm">Te ayudamos a elegir el modelo ideal</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-md">
                  <i className="ri-file-list-3-line text-2xl text-white/80" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="font-semibold text-white">Gestión Plan MOVES incluida</p>
                  <p className="text-white/60 text-sm">Nos encargamos de toda la tramitación</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-md">
                  <i className="ri-car-line text-2xl text-white/80" aria-hidden="true"></i>
                </div>
                <div>
                  <p className="font-semibold text-white">Prueba de conducción gratuita</p>
                  <p className="text-white/60 text-sm">Ven a probar el modelo que te interese</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="tel:+34955034600" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-full font-bold transition-colors" data-testid="link-phone">
                <i className="ri-phone-line text-lg" aria-hidden="true"></i>
                <span>Llámame</span>
              </a>
              <a href="mailto:info@grupoavisa.com" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors" data-testid="link-email">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <i className="ri-mail-line text-lg" aria-hidden="true"></i>
                </div>
                <span className="font-bold">info@grupoavisa.com</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-md p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-3xl" aria-hidden="true"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-success">¡Solicitud enviada!</h3>
                <p className="text-gray-600">
                  Nos pondremos en contacto contigo en las próximas 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" data-testid="form-hibridos">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Solicitar información</h3>
                <div className="flex items-start gap-4 mb-4 p-4 bg-gray-50 rounded-md">
                  <img
                    src="/ana-perez.png"
                    alt="Ana - Asesora de Vehículos Híbridos"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#ad023b]/20 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    La persona que te va a atender es <strong className="text-gray-900">Ana</strong>, lleva más de 10 años como profesional en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all text-sm"
                    placeholder="Tu nombre"
                    data-testid="input-nombre"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all text-sm"
                      placeholder="tu@email.com"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all text-sm"
                      placeholder="600 000 000"
                      data-testid="input-telefono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Modelo de interés</label>
                  <div className="relative">
                    <select
                      name="modelo"
                      value={formData.modelo}
                      onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                      className="w-full px-4 py-3 pr-8 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all text-sm appearance-none bg-white"
                      data-testid="select-modelo"
                    >
                      <option value="">Selecciona un modelo</option>
                      {ctaModels.map((model, index) => (
                        <option key={index} value={model}>{model}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <i className="ri-arrow-down-s-line text-gray-400" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje (opcional)</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({...formData, mensaje: e.target.value.slice(0, 500)})}
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all text-sm resize-none"
                    placeholder="¿Tienes alguna pregunta específica?"
                    data-testid="textarea-mensaje"
                  />
                  <div className="text-xs text-gray-400 text-right mt-1">{formData.mensaje.length}/500</div>
                </div>

                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded focus:ring-[#ad023b] cursor-pointer"
                      required
                      data-testid="checkbox-terms"
                    />
                    <span className="text-sm text-gray-600">
                      He leído y acepto <a href="/terminos" className="text-[#ad023b] underline hover:text-[#8d0230]">los términos y condiciones de la política de privacidad</a>. *
                    </span>
                  </label>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptMarketing}
                      onChange={(e) => setAcceptMarketing(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded focus:ring-[#ad023b] cursor-pointer"
                      data-testid="checkbox-marketing"
                    />
                    <span className="text-sm text-gray-600">
                      Doy mi consentimiento para el tratamiento de mis datos personales con fines de marketing y comerciales (Opcional)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !acceptTerms}
                  className="w-full bg-[#ad023b] text-white py-4 rounded-md font-bold hover:bg-[#8d0230] transition-colors cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  data-testid="button-submit"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin" aria-hidden="true"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-line" aria-hidden="true"></i>
                      Solicitar información
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  Los campos marcados con * son obligatorios
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface PromocionesHibridosPageProps {
  initialPromotions?: Promotion[];
}

export default function PromocionesHibridosPage({ initialPromotions }: PromocionesHibridosPageProps = {}) {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-promociones-hibridos">
      <SEOHead
        title="Promociones Vehículos Híbridos Enchufables"
        description="Ofertas exclusivas en coches híbridos enchufables PHEV. Volkswagen, Audi, CUPRA, Škoda. Combina motor eléctrico y combustión con las mejores condiciones en Sevilla."
        canonical="/promociones-hibridos"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Promociones Híbridos" />
      <main role="main">
        <PromoHibridosHero />
        <HybridTechnology />
        <HybridBenefits />
        <BrandModelsSection initialData={initialPromotions} />
        <HybridCTA />
      </main>
      <Footer />
    </div>
  );
}
