"use client";
import { useState, useMemo } from 'react';
import { Link, useLocation } from '@/lib/router';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { Promotion } from '@shared/schema';

const brandOrder = ['Volkswagen', 'Audi', 'CUPRA', 'Škoda'];

const __LEGACY_brands = [
  {
    id: 'volkswagen',
    name: 'Volkswagen',
    logo: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=80&h=60&fit=crop&auto=format&q=80',
    models: [
      {
        id: 'id3',
        slug: 'volkswagen-id3-pro',
        name: 'ID.3 Pro',
        type: '100% Eléctrico',
        price: '399€/mes',
        pvp: '42.900€',
        badge: 'Más vendido',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '426 km',
          potencia: '204 CV',
          bateria: '58 kWh',
          cargaRapida: '30 min (80%)',
          aceleracion: '7.3 s (0-100)',
          consumo: '14.5 kWh/100km'
        }
      },
      {
        id: 'id4',
        slug: 'volkswagen-id4-pro',
        name: 'ID.4 Pro',
        type: '100% Eléctrico',
        price: '485€/mes',
        pvp: '52.400€',
        badge: 'SUV familiar',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '521 km',
          potencia: '204 CV',
          bateria: '77 kWh',
          cargaRapida: '38 min (80%)',
          aceleracion: '8.5 s (0-100)',
          consumo: '16.3 kWh/100km'
        }
      },
      {
        id: 'id5',
        slug: 'volkswagen-id5-gtx',
        name: 'ID.5 GTX',
        type: '100% Eléctrico',
        price: '599€/mes',
        pvp: '64.900€',
        badge: 'Deportivo',
        image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '490 km',
          potencia: '299 CV',
          bateria: '77 kWh',
          cargaRapida: '36 min (80%)',
          aceleracion: '6.3 s (0-100)',
          consumo: '17.2 kWh/100km'
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
        id: 'q4etron',
        slug: 'audi-q4-etron-45',
        name: 'Q4 e-tron 45',
        type: '100% Eléctrico',
        price: '549€/mes',
        pvp: '59.400€',
        badge: 'SUV versátil',
        image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '520 km',
          potencia: '286 CV',
          bateria: '82 kWh',
          cargaRapida: '38 min (80%)',
          aceleracion: '6.2 s (0-100)',
          consumo: '17.0 kWh/100km'
        }
      },
      {
        id: 'etrongt',
        slug: 'audi-etron-gt-quattro',
        name: 'e-tron GT quattro',
        type: '100% Eléctrico',
        price: '999€/mes',
        pvp: '107.900€',
        badge: 'Gran Turismo',
        image: 'https://images.unsplash.com/photo-1621007947382-bb5c3a707c56?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '488 km',
          potencia: '476 CV',
          bateria: '93.4 kWh',
          cargaRapida: '23 min (80%)',
          aceleracion: '4.1 s (0-100)',
          consumo: '19.6 kWh/100km'
        }
      },
      {
        id: 'q8etron',
        slug: 'audi-q8-etron-55',
        name: 'Q8 e-tron 55',
        type: '100% Eléctrico',
        price: '899€/mes',
        pvp: '97.100€',
        badge: 'Flagship SUV',
        image: 'https://images.unsplash.com/photo-1617788822097-7c40bc68e3be?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '582 km',
          potencia: '408 CV',
          bateria: '114 kWh',
          cargaRapida: '31 min (80%)',
          aceleracion: '5.6 s (0-100)',
          consumo: '20.6 kWh/100km'
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
        id: 'born',
        slug: 'cupra-born-eboost',
        name: 'Born e-Boost',
        type: '100% Eléctrico',
        price: '429€/mes',
        pvp: '46.400€',
        badge: 'Deportivo compacto',
        image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '548 km',
          potencia: '231 CV',
          bateria: '77 kWh',
          cargaRapida: '35 min (80%)',
          aceleracion: '6.6 s (0-100)',
          consumo: '15.4 kWh/100km'
        }
      },
      {
        id: 'tavascan',
        slug: 'cupra-tavascan-vz',
        name: 'Tavascan VZ',
        type: '100% Eléctrico',
        price: '649€/mes',
        pvp: '70.100€',
        badge: 'SUV Coupé',
        image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '520 km',
          potencia: '340 CV',
          bateria: '77 kWh',
          cargaRapida: '35 min (80%)',
          aceleracion: '5.6 s (0-100)',
          consumo: '16.8 kWh/100km'
        }
      },
      {
        id: 'born-vz',
        slug: 'cupra-born-vz',
        name: 'Born VZ',
        type: '100% Eléctrico',
        price: '479€/mes',
        pvp: '51.800€',
        badge: 'Máxima potencia',
        image: 'https://images.unsplash.com/photo-1566024287286-457156ae0bea?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '511 km',
          potencia: '326 CV',
          bateria: '77 kWh',
          cargaRapida: '35 min (80%)',
          aceleracion: '5.6 s (0-100)',
          consumo: '16.2 kWh/100km'
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
        id: 'enyaq',
        slug: 'skoda-enyaq-iv-80',
        name: 'Enyaq iV 80',
        type: '100% Eléctrico',
        price: '499€/mes',
        pvp: '53.900€',
        badge: 'SUV espacioso',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '534 km',
          potencia: '204 CV',
          bateria: '82 kWh',
          cargaRapida: '36 min (80%)',
          aceleracion: '8.6 s (0-100)',
          consumo: '16.7 kWh/100km'
        }
      },
      {
        id: 'enyaq-coupe',
        slug: 'skoda-enyaq-coupe-rs',
        name: 'Enyaq Coupé RS',
        type: '100% Eléctrico',
        price: '649€/mes',
        pvp: '70.200€',
        badge: 'Deportivo',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '513 km',
          potencia: '340 CV',
          bateria: '82 kWh',
          cargaRapida: '36 min (80%)',
          aceleracion: '6.5 s (0-100)',
          consumo: '17.4 kWh/100km'
        }
      },
      {
        id: 'enyaq-60',
        slug: 'skoda-enyaq-iv-60',
        name: 'Enyaq iV 60',
        type: '100% Eléctrico',
        price: '429€/mes',
        pvp: '46.400€',
        badge: 'Mejor precio',
        image: 'https://images.unsplash.com/photo-1619767886558-f0d5f41d8bce?w=480&h=320&fit=crop&auto=format&q=80',
        specs: {
          autonomia: '417 km',
          potencia: '180 CV',
          bateria: '62 kWh',
          cargaRapida: '36 min (80%)',
          aceleracion: '9.0 s (0-100)',
          consumo: '15.9 kWh/100km'
        }
      }
    ]
  }
];

const technologies = [
  {
    icon: 'ri-battery-2-charge-line',
    title: 'Baterías de última generación',
    description: 'Tecnología de iones de litio con alta densidad energética, garantía de 8 años y capacidad de carga rápida hasta el 80% en 30 minutos.'
  },
  {
    icon: 'ri-flashlight-line',
    title: 'Motores eléctricos eficientes',
    description: 'Motores síncronos de imanes permanentes con eficiencia superior al 95%, par instantáneo y conducción silenciosa.'
  },
  {
    icon: 'ri-refresh-line',
    title: 'Frenado regenerativo',
    description: 'Sistema que recupera energía durante la frenada, aumentando la autonomía hasta un 20% en conducción urbana.'
  },
  {
    icon: 'ri-smartphone-line',
    title: 'Conectividad total',
    description: 'Control remoto desde tu smartphone: preclimatización, estado de carga, localización y actualizaciones OTA.'
  }
];

const benefits = [
  {
    icon: 'ri-leaf-line',
    title: 'Cero emisiones',
    description: 'Sin emisiones de CO₂ ni contaminantes. Contribuye activamente a la mejora de la calidad del aire.',
    color: 'bg-green-500'
  },
  {
    icon: 'ri-money-euro-circle-line',
    title: 'Ahorro económico',
    description: 'Hasta un 70% de ahorro en combustible y mantenimiento reducido sin cambios de aceite ni filtros.',
    color: 'bg-blue-500'
  },
  {
    icon: 'ri-shield-check-line',
    title: 'Etiqueta CERO',
    description: 'Acceso libre a zonas de bajas emisiones, descuentos en peajes y aparcamiento gratuito.',
    color: 'bg-purple-500'
  },
  {
    icon: 'ri-government-line',
    title: 'Ayudas y subvenciones',
    description: 'Plan MOVES III con hasta 7.000€ de ayuda directa. Grupo Avisa gestiona todo el proceso.',
    color: 'bg-[#ad023b]'
  },
  {
    icon: 'ri-volume-mute-line',
    title: 'Conducción silenciosa',
    description: 'Experiencia de conducción premium sin ruido de motor, solo el sonido del viento.',
    color: 'bg-indigo-500'
  },
  {
    icon: 'ri-speed-line',
    title: 'Rendimiento superior',
    description: 'Par instantáneo desde 0 rpm. Aceleración inmediata y respuesta excepcional.',
    color: 'bg-orange-500'
  }
];

const comparisons = [
  { concept: 'Coste por 100 km', electric: '2-3€', combustion: '10-15€' },
  { concept: 'Mantenimiento anual', electric: '200-400€', combustion: '600-1.200€' },
  { concept: 'Emisiones CO₂', electric: '0 g/km', combustion: '120-180 g/km' },
  { concept: 'Impuesto circulación', electric: '75% descuento', combustion: '100%' },
  { concept: 'Acceso ZBE', electric: 'Sin restricciones', combustion: 'Limitado' }
];

const ctaModels = [
  'Volkswagen ID.3',
  'Volkswagen ID.4',
  'Volkswagen ID.5',
  'Hyundai IONIQ 5',
  'Hyundai IONIQ 6',
  'Hyundai Kona Electric',
  'BMW iX1',
  'BMW i4',
  'BMW iX',
  'Mercedes EQA',
  'Mercedes EQB',
  'Mercedes EQE',
  'Audi Q4 e-tron',
  'Audi e-tron GT',
  'Audi Q8 e-tron'
];

function PromoElectricosHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden" aria-label="Promociones de vehículos eléctricos" data-testid="section-hero">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1440&h=810&fit=crop&auto=format&q=80"
          alt="Vehículos Eléctricos Grupo Avisa"
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
          <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" data-testid="text-hero-title">
            Vehículos 100% Eléctricos
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed" data-testid="text-hero-description">
            Descubre nuestra gama completa de vehículos eléctricos con las mejores condiciones del mercado. Plan MOVES incluido y financiación a tu medida.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#modelos"
              className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-8 py-4 rounded-md font-bold hover:bg-[#8a0230] transition-colors cursor-pointer whitespace-nowrap"
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
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-stat-moves">7.000€</div>
              <div className="text-sm text-white/70">Ayudas Plan MOVES</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-stat-emissions">0%</div>
              <div className="text-sm text-white/70">Emisiones CO₂</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1" data-testid="text-stat-savings">70%</div>
              <div className="text-sm text-white/70">Ahorro combustible</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ElectricTechnology() {
  return (
    <section className="py-20 bg-white" aria-label="Tecnología eléctrica" data-testid="section-technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-tech-title">
            Tecnología eléctrica avanzada
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Los vehículos eléctricos representan la evolución más significativa en la historia del automóvil. Descubre la tecnología que hace posible una movilidad más limpia, eficiente y conectada.
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

        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-md overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 lg:p-12 flex flex-col justify-center">
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-white mb-6">
                ¿Cómo funciona un vehículo eléctrico?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#ad023b] text-white rounded-full flex-shrink-0 font-bold text-sm">1</div>
                  <div>
                    <p className="font-semibold text-white">Almacenamiento de energía</p>
                    <p className="text-white/70 text-sm">La batería almacena electricidad que alimenta el motor eléctrico.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#ad023b] text-white rounded-full flex-shrink-0 font-bold text-sm">2</div>
                  <div>
                    <p className="font-semibold text-white">Conversión de energía</p>
                    <p className="text-white/70 text-sm">El inversor convierte la corriente continua en alterna para el motor.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#ad023b] text-white rounded-full flex-shrink-0 font-bold text-sm">3</div>
                  <div>
                    <p className="font-semibold text-white">Propulsión instantánea</p>
                    <p className="text-white/70 text-sm">El motor eléctrico genera par máximo desde el primer momento.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-[#ad023b] text-white rounded-full flex-shrink-0 font-bold text-sm">4</div>
                  <div>
                    <p className="font-semibold text-white">Recuperación de energía</p>
                    <p className="text-white/70 text-sm">Al frenar, el motor actúa como generador y recarga la batería.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=600&fit=crop&auto=format&q=80"
                alt="Tecnología vehículo eléctrico"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ElectricBenefits() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white" aria-label="Ventajas del vehículo eléctrico" data-testid="section-benefits">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full mb-4">
            Ventajas exclusivas
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-benefits-title">
            ¿Por qué elegir un eléctrico?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Los vehículos eléctricos ofrecen ventajas económicas, medioambientales y de conducción que los convierten en la mejor opción para el presente y el futuro.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-md p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100" data-testid={`card-benefit-${index}`}>
              <div className={`w-12 h-12 flex items-center justify-center ${benefit.color} text-white rounded-md mb-4`}>
                <i className={`${benefit.icon} text-2xl`}></i>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-md shadow-lg overflow-hidden">
          <div className="bg-slate-900 px-8 py-6">
            <h3 className="text-xl font-bold text-white text-center" data-testid="text-comparison-title">
              Comparativa: Eléctrico vs Combustión
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-comparison">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Concepto</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-green-600">
                    <div className="flex items-center justify-center gap-2">
                      <i className="ri-flashlight-line" aria-hidden="true"></i>
                      Eléctrico
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-500">
                    <div className="flex items-center justify-center gap-2">
                      <i className="ri-gas-station-line" aria-hidden="true"></i>
                      Combustión
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.concept}</td>
                    <td className="px-6 py-4 text-center text-sm font-bold text-green-600">{row.electric}</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">{row.combustion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-50 px-8 py-4 border-t border-green-100">
            <p className="text-sm text-green-700 text-center">
              <i className="ri-information-line mr-2" aria-hidden="true"></i>
              Ahorro estimado de más de 1.500€ anuales con un vehículo eléctrico
            </p>
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

  const electricPromos = useMemo(() =>
    allPromotions.filter(p => p.vehicleType === 'electrico' && p.active),
    [allPromotions]
  );

  const brandNames = useMemo(() => {
    const names = Array.from(new Set(electricPromos.map(p => p.brandName).filter((b): b is string => Boolean(b))));
    return names.sort((a, b) => {
      const ia = brandOrder.indexOf(a);
      const ib = brandOrder.indexOf(b);
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    });
  }, [electricPromos]);

  const effectiveBrand = brandNames.includes(activeBrand) ? activeBrand : (brandNames[0] || activeBrand);
  const currentModels = electricPromos.filter(p => p.brandName === effectiveBrand);

  const parseSpec = (features: string[] | null, label: string) => {
    const f = (features || []).find(s => s.toLowerCase().startsWith(label.toLowerCase()));
    return f ? f.split(': ')[1] || '' : '';
  };

  return (
    <section id="modelos" className="py-20 bg-white" aria-label="Modelos eléctricos disponibles" data-testid="section-models">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#ad023b]/10 text-[#ad023b] text-sm font-bold rounded-full mb-4">
            Catálogo completo
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-models-title">
            Modelos eléctricos por marca
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora nuestra gama completa de vehículos eléctricos. Selecciona una marca para ver todos los modelos disponibles con sus especificaciones técnicas.
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
              <h3 className="text-xl font-bold text-gray-900" data-testid="text-active-brand">{effectiveBrand}</h3>
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
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <i className="ri-flashlight-line" aria-hidden="true"></i>
                      {model.subtitle}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                        {model.brandName}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2" data-testid={`text-model-name-${slug}`}>
                        {model.modelName}
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-slate-50 rounded-md p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">Autonomía</div>
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
                      <div className="bg-slate-50 rounded-md p-4 mb-4 space-y-2 text-sm" data-testid={`specs-detail-${slug}`}>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Batería</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Batería')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Carga rápida</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Carga rápida')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">0-100 km/h</span>
                          <span className="font-medium text-gray-900">{parseSpec(model.features, 'Aceleración')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consumo</span>
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
                        className="flex-1 bg-[#ad023b] text-white text-center py-3 rounded-md text-sm font-bold hover:bg-[#8a0230] transition-colors cursor-pointer whitespace-nowrap"
                        data-testid={`link-ficha-${slug}`}
                      >
                        Ver ficha completa
                      </Link>
                      <Link
                        href={`${model.link || '#'}#configurador`}
                        className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors cursor-pointer"
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

function ElectricCTA() {
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
          origen: 'electricos'
        })
      });

      if (response.ok) {
        const params = new URLSearchParams({
          nombre: formData.nombre,
          origen: 'electricos'
        });
        navigate(`/confirmacion-contacto?${params.toString()}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800" aria-label="Solicitar información" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-[#ad023b] text-white text-sm font-bold rounded-full mb-6">
              Contacta con nosotros
            </div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-cta-title">
              ¿Listo para dar el salto a la movilidad eléctrica?
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Nuestros asesores especializados te ayudarán a encontrar el vehículo eléctrico perfecto para ti. Sin compromiso, sin presión.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] text-white rounded-md flex-shrink-0">
                  <i className="ri-file-list-3-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Gestión Plan MOVES</h3>
                  <p className="text-white/70 text-sm">Nos encargamos de toda la tramitación de las ayudas para que tú solo disfrutes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] text-white rounded-md flex-shrink-0">
                  <i className="ri-bank-card-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Financiación flexible</h3>
                  <p className="text-white/70 text-sm">Opciones de financiación adaptadas a tu situación con las mejores condiciones.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b] text-white rounded-md flex-shrink-0">
                  <i className="ri-steering-2-line text-xl" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Test drive gratuito</h3>
                  <p className="text-white/70 text-sm">Prueba el vehículo que te interesa sin ningún compromiso.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <a href="tel:+34955034600" className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-5 py-3 rounded-full font-bold transition-colors" data-testid="link-cta-phone">
                <i className="ri-phone-line text-lg" aria-hidden="true"></i>
                <span>Llámame</span>
              </a>
              <a href="mailto:info@grupoavisa.com" className="flex items-center gap-2 text-white hover:text-white/80 transition-colors" data-testid="link-cta-email">
                <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full">
                  <i className="ri-mail-line text-lg" aria-hidden="true"></i>
                </div>
                <span className="font-bold">info@grupoavisa.com</span>
              </a>
            </div>
          </div>

          <div className="bg-white rounded-md p-8 shadow-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 flex items-center justify-center bg-green-100 text-green-600 rounded-full mx-auto mb-6">
                  <i className="ri-check-line text-4xl" aria-hidden="true"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-submit-success">¡Solicitud enviada!</h3>
                <p className="text-gray-600 mb-6">
                  Gracias por tu interés. Un asesor se pondrá en contacto contigo en las próximas 24 horas.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ nombre: '', email: '', telefono: '', modelo: '', mensaje: '' });
                  }}
                  className="text-[#ad023b] font-bold hover:underline cursor-pointer"
                  data-testid="button-new-request"
                >
                  Enviar otra solicitud
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Solicita información</h3>
                <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-md">
                  <img
                    src="/ana-perez.png"
                    alt="Ana - Asesora de Vehículos Eléctricos"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#ad023b]/20 flex-shrink-0"
                  />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    La persona que te va a atender es <strong className="text-gray-900">Ana</strong>, lleva más de 10 años como profesional en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-electricos">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent outline-none transition-all text-sm"
                      placeholder="Tu nombre"
                      data-testid="input-nombre"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent outline-none transition-all text-sm"
                        placeholder="tu@email.com"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
                      <input
                        type="tel"
                        required
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent outline-none transition-all text-sm"
                        placeholder="600 000 000"
                        data-testid="input-telefono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Modelo de interés</label>
                    <div className="relative">
                      <select
                        value={formData.modelo}
                        onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent outline-none transition-all text-sm appearance-none bg-white"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                    <textarea
                      value={formData.mensaje}
                      onChange={(e) => setFormData({ ...formData, mensaje: e.target.value.slice(0, 500) })}
                      rows={3}
                      maxLength={500}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent outline-none transition-all text-sm resize-none"
                      placeholder="Cuéntanos qué necesitas..."
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
                        className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded-md focus:ring-[#ad023b] cursor-pointer"
                        required
                        data-testid="checkbox-terms"
                      />
                      <span className="text-sm text-gray-600">
                        He leído y acepto <Link href="/terminos" className="text-[#ad023b] underline hover:text-[#8d0230]">los términos y condiciones de la política de privacidad</Link>. *
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptMarketing}
                        onChange={(e) => setAcceptMarketing(e.target.checked)}
                        className="mt-1 w-4 h-4 text-[#ad023b] border-gray-300 rounded-md focus:ring-[#ad023b] cursor-pointer"
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
                    className="w-full bg-[#ad023b] text-white py-4 rounded-md font-bold hover:bg-[#8a0230] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
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
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface PromocionesElectricosPageProps {
  initialPromotions?: Promotion[];
}

export default function PromocionesElectricosPage({ initialPromotions }: PromocionesElectricosPageProps = {}) {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-promociones-electricos">
      <SEOHead
        title="Promociones Vehículos Eléctricos"
        description="Las mejores ofertas en coches eléctricos en Sevilla. Volkswagen ID.3, ID.4, Audi Q4 e-tron, Škoda Enyaq. Plan MOVES incluido con hasta 7.000€ de ayuda."
        canonical="/promociones-electricos"
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Promociones Eléctricos" />
      <main role="main">
        <PromoElectricosHero />
        <ElectricTechnology />
        <ElectricBenefits />
        <BrandModelsSection initialData={initialPromotions} />
        <ElectricCTA />
      </main>
      <Footer />
    </div>
  );
}