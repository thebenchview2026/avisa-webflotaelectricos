import { storage } from "./storage";

export async function seedServices() {
  const existing = await storage.getServices();
  if (existing.length > 0) return;

  const servicesList = [
    {
      title: "Mantenimiento especializado",
      description: "Técnicos certificados en alta tensión y sistemas eléctricos. Diagnóstico avanzado con equipamiento específico.",
      icon: "ri-tools-line",
      features: [
        "Revisiones oficiales con garantía del fabricante",
        "Diagnóstico de baterías y sistemas de carga",
        "Actualización de software y sistemas",
      ],
      category: "postventa",
      active: true,
      sortOrder: 1,
    },
    {
      title: "Garantías extendidas",
      description: "Protección completa para tu inversión. Garantías específicas para baterías y componentes eléctricos.",
      icon: "ri-shield-check-line",
      features: [
        "Garantía de batería hasta 8 años o 160.000 km",
        "Cobertura de componentes eléctricos",
        "Asistencia en carretera 24/7",
      ],
      category: "postventa",
      active: true,
      sortOrder: 2,
    },
    {
      title: "Asesoramiento en carga",
      description: "Te ayudamos a instalar tu punto de carga en casa o empresa. Gestión completa de subvenciones.",
      icon: "ri-battery-charging-line",
      features: [
        "Instalación de wallbox en domicilio",
        "Gestión de ayudas para puntos de recarga",
        "Asesoramiento en tarifas eléctricas",
      ],
      category: "postventa",
      active: true,
      sortOrder: 3,
    },
    {
      title: "Vehículo de sustitución",
      description: "Mantén tu movilidad mientras tu vehículo está en el taller. Vehículos de cortesía eléctricos.",
      icon: "ri-car-line",
      features: [
        "Vehículos de sustitución eléctricos",
        "Recogida y entrega a domicilio",
        "Cita previa online 24/7",
      ],
      category: "postventa",
      active: true,
      sortOrder: 4,
    },
    {
      title: "Presupuestos sin compromiso",
      description: "Transparencia total en nuestros servicios. Presupuestos detallados antes de cualquier intervención.",
      icon: "ri-file-list-3-line",
      features: [
        "Presupuesto previo obligatorio",
        "Sin sorpresas en la factura",
        "Piezas originales garantizadas",
      ],
      category: "postventa",
      active: true,
      sortOrder: 5,
    },
    {
      title: "Servicio express",
      description: "Intervenciones rápidas para que no pierdas tiempo. Servicio de mantenimiento en el día.",
      icon: "ri-time-line",
      features: [
        "Cambio de aceite en 30 minutos",
        "Revisión pre-ITV express",
        "Cambio de neumáticos sin cita",
      ],
      category: "postventa",
      active: true,
      sortOrder: 6,
    },
  ];

  for (const s of servicesList) {
    await storage.createService(s);
  }
  console.log(`Seeded ${servicesList.length} services`);
}

export async function seedMaintenancePlans() {
  const existing = await storage.getMaintenancePlans();
  if (existing.length > 0) return;

  const plansList = [
    {
      name: "Revisión Básica",
      description: "Mantenimiento esencial para tu vehículo",
      price: 89,
      features: [
        "Cambio de aceite y filtro",
        "Revisión de niveles",
        "Inspección visual de frenos",
        "Comprobación de luces",
        "Diagnóstico electrónico básico",
      ],
      highlighted: false,
      sortOrder: 1,
    },
    {
      name: "Revisión Completa",
      description: "Mantenimiento integral recomendado",
      price: 189,
      features: [
        "Todo lo de Revisión Básica",
        "Cambio de filtro de aire",
        "Cambio de filtro de habitáculo",
        "Revisión de suspensión",
        "Diagnóstico de batería de alto voltaje",
        "Actualización de software",
      ],
      highlighted: true,
      sortOrder: 2,
    },
    {
      name: "Revisión Premium",
      description: "Servicio completo con extras",
      price: 289,
      features: [
        "Todo lo de Revisión Completa",
        "Cambio de líquido de frenos",
        "Alineación y equilibrado",
        "Limpieza de inyectores",
        "Tratamiento antibacteriano A/C",
        "Lavado exterior e interior",
        "Vehículo de sustitución",
      ],
      highlighted: false,
      sortOrder: 3,
    },
  ];

  for (const p of plansList) {
    await storage.createMaintenancePlan(p);
  }
  console.log(`Seeded ${plansList.length} maintenance plans`);
}
