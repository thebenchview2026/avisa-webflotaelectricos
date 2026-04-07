import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLeadSchema, type Lead } from "@shared/schema";
import { setupAuth, seedAdminUser } from "./auth";
import { registerAdminRoutes } from "./admin-routes";
import { autoProcessAndPublishFaqs } from "./whatsapp-auto";
import { registerSitemapRoutes } from "./sitemap";

async function forwardToLeadSpark(lead: Lead) {
  const settings = await storage.getSettings();
  const apiUrl = settings.find(s => s.key === "leadspark_api_url")?.value;
  const apiKey = settings.find(s => s.key === "leadspark_api_key")?.value;
  const enabled = settings.find(s => s.key === "leadspark_enabled")?.value;

  if (!apiUrl || !apiKey || enabled !== "true") return;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        name: lead.name,
        email: lead.email,
        phone: lead.phone || "",
        message: lead.message || "",
        source: lead.source || "web",
        interest: lead.interest || "",
        vehicleId: lead.vehicleId || "",
        externalId: lead.id,
        createdAt: lead.createdAt,
      }),
    });

    if (!response.ok) {
      console.error(`LeadSpark API error: ${response.status} ${response.statusText}`);
    } else {
      console.log(`Lead ${lead.id} forwarded to LeadSpark successfully`);
    }
  } catch (err) {
    console.error("LeadSpark forward failed:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  registerSitemapRoutes(app);
  setupAuth(app);
  registerAdminRoutes(app);
  await seedAdminUser();

  app.get("/api/brands", async (_req, res) => {
    const brands = await storage.getBrands();
    res.json(brands);
  });

  app.get("/api/brands/:slug", async (req, res) => {
    const brand = await storage.getBrandBySlug(req.params.slug);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    res.json(brand);
  });

  app.get("/api/vehicles", async (_req, res) => {
    const vehicles = await storage.getVehicles();
    res.json(vehicles);
  });

  app.get("/api/vehicles/featured", async (_req, res) => {
    const vehicles = await storage.getFeaturedVehicles();
    res.json(vehicles);
  });

  app.get("/api/vehicles/:slug", async (req, res) => {
    const vehicle = await storage.getVehicleBySlug(req.params.slug);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.json(vehicle);
  });

  app.post("/api/leads", async (req, res) => {
    const result = insertLeadSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid data", errors: result.error.flatten() });
    }
    const lead = await storage.createLead(result.data);

    forwardToLeadSpark(lead).catch(err => console.error("LeadSpark forward error:", err));

    res.status(201).json(lead);
  });

  app.post("/api/webhooks/whatsapp", async (req, res) => {
    try {
      const payload = req.body;

      const messages: any[] = [];
      if (payload.entry) {
        for (const entry of payload.entry) {
          for (const change of (entry.changes || [])) {
            const value = change.value;
            if (value?.messages) {
              for (const msg of value.messages) {
                messages.push({
                  from: msg.from,
                  text: msg.text?.body || "",
                  timestamp: msg.timestamp,
                  type: msg.type,
                  sender: "customer",
                });
              }
            }
            if (value?.statuses) {
              continue;
            }
          }
        }
      } else if (Array.isArray(payload.messages)) {
        for (const msg of payload.messages) {
          messages.push({
            from: msg.from || msg.phone,
            text: msg.text || msg.body || "",
            timestamp: msg.timestamp || new Date().toISOString(),
            sender: msg.sender || (msg.fromMe ? "business" : "customer"),
          });
        }
      } else if (payload.text || payload.body) {
        messages.push({
          from: payload.from || payload.phone || "unknown",
          text: payload.text || payload.body || "",
          timestamp: payload.timestamp || new Date().toISOString(),
          sender: payload.fromMe ? "business" : "customer",
        });
      }

      if (messages.length > 0) {
        const phoneNumber = messages[0].from;
        const existingConvs = await storage.getWhatsappConversations();
        const existing = existingConvs.find(c =>
          c.phoneNumber === phoneNumber && c.status === "pending"
        );

        let convId: string;
        if (existing) {
          const currentMsgs = (existing.messages as any[]) || [];
          await storage.updateWhatsappConversation(existing.id, {
            messages: [...currentMsgs, ...messages] as any,
          });
          convId = existing.id;
        } else {
          const created = await storage.createWhatsappConversation({
            phoneNumber,
            contactName: payload.contacts?.[0]?.profile?.name || null,
            messages: messages as any,
            status: "pending",
          });
          convId = created.id;
        }

        autoProcessAndPublishFaqs(convId).then(result => {
          if (result.created > 0) {
            console.log(`WhatsApp auto-FAQ: ${result.created} FAQs creadas, ${result.skipped} omitidas (conv ${convId})`);
          }
        }).catch(err => console.error("Auto-process FAQ error:", err));
      }

      res.status(200).json({ status: "ok" });
    } catch (err) {
      console.error("WhatsApp webhook error:", err);
      res.status(200).json({ status: "ok" });
    }
  });

  app.get("/api/webhooks/whatsapp", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "avisa_whatsapp_2024";
    if (mode === "subscribe" && token === verifyToken) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  });

  app.get("/api/pages/:slug", async (req, res) => {
    const page = await storage.getPageBySlug(req.params.slug);
    if (!page) return res.status(404).json({ message: "Page not found" });
    res.json(page);
  });

  app.get("/api/dealers", async (_req, res) => {
    const allDealers = await storage.getDealers();
    res.json(allDealers.filter(d => d.active));
  });

  app.get("/api/testimonials", async (_req, res) => {
    const allTestimonials = await storage.getTestimonials();
    res.json(allTestimonials.filter(t => t.published));
  });

  app.get("/api/editorial", async (req, res) => {
    const type = req.query.type as string | undefined;
    const articles = await storage.getPublishedEditorial(type);
    res.json(articles);
  });

  app.get("/api/editorial/all", async (req, res) => {
    const type = req.query.type as string | undefined;
    const articles = await storage.getEditorialContent(type);
    res.json(articles);
  });

  app.get("/api/editorial/recent", async (req, res) => {
    const limit = parseInt(req.query.limit as string) || 10;
    const articles = await storage.getRecentEditorial(limit);
    res.json(articles);
  });

  app.get("/api/editorial/:slug", async (req, res) => {
    const article = await storage.getEditorialContentBySlug(req.params.slug);
    if (!article) return res.status(404).json({ message: "Article not found" });
    if (!article.published) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  });

  app.get("/api/promotions", async (req, res) => {
    const type = req.query.type as string;
    if (type) {
      const byType = await storage.getPromotionsByType(type);
      res.json(byType.filter(p => p.active));
    } else {
      const allPromos = await storage.getPromotions();
      res.json(allPromos.filter(p => p.active));
    }
  });

  app.get("/api/services", async (_req, res) => {
    const allServices = await storage.getServices();
    res.json(allServices.filter(s => s.active));
  });

  app.get("/api/maintenance-plans", async (_req, res) => {
    res.json(await storage.getMaintenancePlans());
  });

  app.get("/api/faqs", async (_req, res) => {
    const categories = await storage.getFaqCategories();
    const allFaqs = await storage.getFaqs();
    res.json({ categories, faqs: allFaqs.filter(f => f.published) });
  });

  app.get("/api/faqs/home", async (_req, res) => {
    const homeFaqs = await storage.getHomeFeaturedFaqs();
    res.json(homeFaqs);
  });

  app.get("/api/faqs/by-category/:slug", async (req, res) => {
    const categories = await storage.getFaqCategories();
    const category = categories.find(c => c.slug === req.params.slug);
    if (!category) return res.status(404).json({ message: "Categoría no encontrada" });
    const allFaqs = await storage.getFaqs();
    const categoryFaqs = allFaqs.filter(f => f.categoryId === category.id && f.published);
    res.json({ category, faqs: categoryFaqs });
  });

  app.get("/api/faqs/by-slug/:slug", async (req, res) => {
    const allFaqs = await storage.getFaqs();
    const faq = allFaqs.find(f => (f as any).slug === req.params.slug && f.published);
    if (!faq) return res.status(404).json({ message: "Pregunta no encontrada" });
    const categories = await storage.getFaqCategories();
    const category = categories.find(c => c.id === faq.categoryId);
    const relatedSlugs = (faq as any).relatedSlugs || [];
    const relatedFaqs = allFaqs
      .filter(f => relatedSlugs.includes((f as any).slug) && f.published)
      .map(f => {
        const cat = categories.find(c => c.id === f.categoryId);
        return { id: f.id, slug: (f as any).slug, question: f.question, categorySlug: cat?.slug || "" };
      });
    res.json({ faq, category, relatedFaqs });
  });

  app.get("/llms.txt", async (_req, res) => {
    const [vehiclesList, brandsList, servicesList, faqCats, faqsList, dealersList, testimonialsList] = await Promise.all([
      storage.getVehicles(), storage.getBrands(), storage.getServices(), storage.getFaqCategories(), storage.getFaqs(), storage.getDealers(), storage.getTestimonials(),
    ]);
    const baseUrl = "https://electricos.grupoavisa.com";
    const activeDealers = dealersList.filter(d => d.active !== false);
    const publishedVehicles = vehiclesList.filter(v => v.published !== false);
    const publishedFaqs = faqsList.filter(f => f.published);
    const activeServices = servicesList.filter(s => s.active !== false);
    const provinces = [...new Set(activeDealers.map(d => d.province).filter(Boolean))];
    const cities = [...new Set(activeDealers.map(d => d.city).filter(Boolean))];

    let txt = `# Grupo Avisa — Concesionario Oficial de Vehículos Eléctricos e Híbridos\n\n`;

    txt += `## Identidad de marca\n`;
    txt += `- Nombre: Grupo Avisa\n`;
    txt += `- Tipo: Concesionario oficial multimarca y taller especializado\n`;
    txt += `- Sector: Automoción — vehículos eléctricos (BEV) e híbridos enchufables (PHEV)\n`;
    txt += `- Fundación: Más de 15 años de experiencia en el sector\n`;
    txt += `- Eslogan: "Tu transición eléctrica empieza aquí"\n`;
    txt += `- Web: ${baseUrl}\n`;
    txt += `- Contacto: info@grupoavisa.com | +34 955 034 600 | WhatsApp: +34 955 034 600\n`;
    txt += `- Horario: L-V 08:30-20:00 | Sáb 09:00-14:00\n`;
    txt += `- Redes sociales: Instagram, Facebook, YouTube (Grupo Avisa)\n\n`;

    txt += `## Marcas oficiales (${brandsList.length})\n`;
    for (const b of brandsList) {
      txt += `- ${b.name} (${b.country || "Internacional"}): ${baseUrl}/marcas/${b.slug}\n`;
    }
    txt += `\n`;

    txt += `## Ubicaciones y red de concesionarios (${activeDealers.length})\n`;
    txt += `- Cobertura: ${provinces.join(", ")}\n`;
    txt += `- Ciudades: ${cities.join(", ")}\n`;
    for (const d of activeDealers) {
      txt += `- ${d.name}`;
      if (d.brand) txt += ` (${d.brand})`;
      txt += ` — ${d.address || ""}, ${d.city}, ${d.province}`;
      if (d.phone) txt += ` | Tel: ${d.phone}`;
      if (d.email) txt += ` | ${d.email}`;
      txt += `\n`;
    }
    txt += `- Mapa y contacto: ${baseUrl}/concesionarios\n\n`;

    txt += `## Servicios postventa (${activeServices.length})\n`;
    for (const s of activeServices) {
      txt += `- ${s.title}: ${s.description || ""}\n`;
      if (s.features && s.features.length > 0) {
        for (const f of s.features.slice(0, 3)) {
          txt += `  · ${f}\n`;
        }
      }
    }
    txt += `- Todos los servicios: ${baseUrl}/postventa\n\n`;

    txt += `## Servicios especializados por marca (70 páginas)\n`;
    const svcTypes = ["Reparación", "Diagnóstico", "Mantenimiento", "Instalación punto de carga", "Garantía y extensión"];
    const svcSlugs = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"];
    for (let i = 0; i < svcTypes.length; i++) {
      txt += `- ${svcTypes[i]}:\n`;
      for (const b of brandsList) {
        txt += `  · ${svcTypes[i]} ${b.name}: ${baseUrl}/servicios/${svcSlugs[i]}-${b.slug}\n`;
      }
    }
    txt += `\n`;

    txt += `## Expertise y capacidades\n`;
    txt += `- Técnicos certificados en alta tensión (sistemas de batería y motor eléctrico)\n`;
    txt += `- Equipamiento oficial de diagnóstico para todas las marcas del grupo\n`;
    txt += `- Software de diagnóstico actualizado con las últimas versiones del fabricante\n`;
    txt += `- Calibración y verificación de sistemas ADAS (asistencia a la conducción)\n`;
    txt += `- Instalación homologada de puntos de carga domésticos y empresariales (wallbox)\n`;
    txt += `- Gestión integral de ayudas Plan MOVES para compra e instalación de cargadores\n`;
    txt += `- Asesoramiento en transición a movilidad eléctrica para flotas y particulares\n`;
    txt += `- Garantía oficial de batería: hasta 8 años / 160.000 km\n`;
    txt += `- Extensiones de garantía para componentes eléctricos y electrónicos\n`;
    txt += `- Vehículo de sustitución eléctrico durante las intervenciones\n`;
    txt += `- Recogida y entrega a domicilio en radio de 30 km\n`;
    txt += `- Cita previa online 24/7\n\n`;

    if (publishedVehicles.length > 0) {
      const electricos = publishedVehicles.filter(v => v.vehicleType === "electrico");
      const hibridos = publishedVehicles.filter(v => v.vehicleType === "hibrido");
      txt += `## Catálogo de vehículos (${publishedVehicles.length})\n`;
      if (electricos.length > 0) {
        txt += `### 100% Eléctricos (${electricos.length})\n`;
        for (const v of electricos) {
          txt += `- ${v.model} ${v.year}`;
          if (v.price) txt += ` — desde ${v.price}`;
          if (v.rangeKm) txt += ` | Autonomía: ${v.rangeKm} km`;
          txt += ` | ${baseUrl}/vehiculos/electricos/${v.slug}\n`;
        }
      }
      if (hibridos.length > 0) {
        txt += `### Híbridos Enchufables (${hibridos.length})\n`;
        for (const v of hibridos) {
          txt += `- ${v.model} ${v.year}`;
          if (v.price) txt += ` — desde ${v.price}`;
          if (v.rangeKm) txt += ` | Autonomía eléctrica: ${v.rangeKm} km`;
          txt += ` | ${baseUrl}/vehiculos/hibridos/${v.slug}\n`;
        }
      }
      txt += `- Todos los eléctricos: ${baseUrl}/promociones-electricos\n`;
      txt += `- Todos los híbridos: ${baseUrl}/promociones-hibridos\n\n`;
    }

    txt += `## Entidades y programas\n`;
    txt += `- Plan MOVES III: Ayudas estatales hasta 7.000€ para compra de vehículo eléctrico. Grupo Avisa gestiona la tramitación completa.\n`;
    txt += `- AutoPlus: Programa propio de ventajas exclusivas para clientes. Incluye financiación, seguros y servicios premium. ${baseUrl}/autoplus\n`;
    txt += `- Etiqueta CERO DGT: Todos los vehículos eléctricos del catálogo disponen de etiqueta CERO, con acceso libre a ZBE, descuentos en peajes y aparcamiento.\n`;
    txt += `- Garantía de batería oficial: 8 años o 160.000 km en todos los vehículos eléctricos nuevos.\n`;
    txt += `- Financiación flexible: Renting, leasing y financiación a medida con condiciones especiales.\n`;
    txt += `- Wallbox / Punto de carga: Servicio llave en mano de instalación de cargador doméstico o empresarial.\n\n`;

    txt += `## Preguntas frecuentes (${publishedFaqs.length} respuestas en ${faqCats.length} categorías)\n`;
    for (const c of faqCats) {
      const catFaqs = publishedFaqs.filter(f => f.categoryId === (c as any).id);
      txt += `### ${c.name} (${catFaqs.length}) — ${baseUrl}/preguntas/${c.slug}\n`;
      for (const f of catFaqs.slice(0, 5)) {
        txt += `- P: ${f.question}\n`;
        txt += `  R: ${f.answer.slice(0, 250)}${f.answer.length > 250 ? "…" : ""}\n`;
      }
      if (catFaqs.length > 5) {
        txt += `  … y ${catFaqs.length - 5} preguntas más en esta categoría.\n`;
      }
    }
    txt += `\n`;

    if (testimonialsList && testimonialsList.length > 0) {
      const activeTestimonials = testimonialsList.filter((t: any) => t.active !== false);
      if (activeTestimonials.length > 0) {
        txt += `## Testimonios de clientes (${activeTestimonials.length})\n`;
        for (const t of activeTestimonials.slice(0, 5)) {
          txt += `- "${(t as any).text?.slice(0, 150) || ""}" — ${(t as any).author || "Cliente"}`;
          if ((t as any).rating) txt += ` (${(t as any).rating}/5)`;
          txt += `\n`;
        }
        txt += `\n`;
      }
    }

    txt += `## Páginas del sitio\n`;
    txt += `- Inicio: ${baseUrl}/\n`;
    txt += `- Vehículos eléctricos: ${baseUrl}/promociones-electricos\n`;
    txt += `- Vehículos híbridos: ${baseUrl}/promociones-hibridos\n`;
    txt += `- Plan AutoPlus y MOVES: ${baseUrl}/autoplus\n`;
    txt += `- Servicio postventa: ${baseUrl}/postventa\n`;
    txt += `- Preguntas frecuentes: ${baseUrl}/preguntas\n`;
    txt += `- Red de concesionarios: ${baseUrl}/concesionarios\n`;
    txt += `- Guía de electrificación: ${baseUrl}/electrificacion\n`;
    txt += `- Conductores y adopción: ${baseUrl}/conductores-adopcion\n`;
    txt += `- Sitemap XML: ${baseUrl}/sitemap.xml\n`;
    txt += `- AI Index (JSON): ${baseUrl}/ai-index.json\n`;

    res.set("Content-Type", "text/plain; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(txt);
  });

  app.get("/ai-index.json", async (_req, res) => {
    const [vehiclesList, brandsList, servicesList, faqsList, faqCats, dealersList, testimonialsList] = await Promise.all([
      storage.getVehicles(), storage.getBrands(), storage.getServices(), storage.getFaqs(), storage.getFaqCategories(), storage.getDealers(), storage.getTestimonials(),
    ]);
    const baseUrl = "https://electricos.grupoavisa.com";
    const activeDealers = dealersList.filter(d => d.active !== false);
    const publishedVehicles = vehiclesList.filter(v => v.published !== false);
    const publishedFaqs = faqsList.filter(f => f.published);
    const activeServices = servicesList.filter(s => s.active !== false);
    const provinces = [...new Set(activeDealers.map(d => d.province).filter(Boolean))];

    const svcSlugs = ["reparacion", "diagnostico", "mantenimiento", "carga", "garantia"];
    const svcNames = ["Reparación", "Diagnóstico", "Mantenimiento", "Instalación de Punto de Carga", "Garantía y Extensión de Garantía"];
    const serviceBrandPages: { service: string; brand: string; url: string }[] = [];
    for (let i = 0; i < svcSlugs.length; i++) {
      for (const b of brandsList) {
        serviceBrandPages.push({
          service: svcNames[i],
          brand: b.name,
          url: `${baseUrl}/servicios/${svcSlugs[i]}-${b.slug}`,
        });
      }
    }

    const faqCategoryMap = new Map<string, string>();
    for (const c of faqCats) {
      if ((c as any).id) faqCategoryMap.set((c as any).id, c.slug);
    }

    const index = {
      "@context": "https://schema.org",
      "@type": "AutoDealer",
      name: "Grupo Avisa",
      legalName: "Grupo Avisa S.L.",
      url: baseUrl,
      description: "Concesionario oficial multimarca especializado en vehículos eléctricos (BEV) e híbridos enchufables (PHEV) en Andalucía y Extremadura. Más de 15 años de experiencia como taller oficial certificado.",
      slogan: "Tu transición eléctrica empieza aquí",
      foundingDate: "2008",
      brand: {
        official: brandsList.map(b => ({
          "@type": "Brand",
          name: b.name,
          country: b.country || null,
          description: b.description || null,
          url: `${baseUrl}/marcas/${b.slug}`,
        })),
        categories: ["100% Eléctrico (BEV)", "Híbrido Enchufable (PHEV)"],
      },
      contact: {
        telephone: "+34955034600",
        email: "info@grupoavisa.com",
        whatsapp: "https://wa.me/34621261541",
        appointmentUrl: `${baseUrl}/concesionarios`,
      },
      openingHours: {
        weekdays: "Lunes a Viernes 08:30-20:00",
        saturday: "Sábado 09:00-14:00",
        sunday: "Cerrado",
      },
      location: {
        headquarters: {
          "@type": "PostalAddress",
          streetAddress: "Av. de la Raza, s/n",
          addressLocality: "Sevilla",
          addressRegion: "Andalucía",
          postalCode: "41012",
          addressCountry: "ES",
        },
        coverageArea: provinces,
        dealerCount: activeDealers.length,
        dealers: activeDealers.map(d => ({
          "@type": "AutoDealer",
          name: d.name,
          brand: d.brand || "Multimarca",
          address: {
            street: d.address || null,
            city: d.city,
            province: d.province,
            postalCode: (d as any).postalCode || null,
          },
          telephone: d.phone || null,
          email: d.email || null,
        })),
      },
      services: {
        postventa: {
          url: `${baseUrl}/postventa`,
          description: "Servicio postventa integral para vehículos eléctricos e híbridos con técnicos certificados en alta tensión.",
          catalog: activeServices.map(s => ({
            name: s.title,
            description: s.description || null,
            features: s.features || [],
            category: s.category || "postventa",
          })),
        },
        programmaticPages: {
          description: "Páginas especializadas de servicio por marca para SEO programático. Cada página contiene contenido único, FAQs específicas y Schema.org.",
          count: serviceBrandPages.length,
          serviceTypes: svcNames,
          pages: serviceBrandPages,
        },
        autoplus: {
          url: `${baseUrl}/autoplus`,
          description: "Programa AutoPlus con gestión integral de ayudas Plan MOVES III (hasta 7.000€), financiación flexible y ventajas exclusivas.",
        },
        charging: {
          description: "Instalación llave en mano de wallbox para carga doméstica y empresarial. Gestión de ayudas Plan MOVES para infraestructura de carga.",
        },
      },
      entities: {
        planMoves: {
          name: "Plan MOVES III",
          description: "Programa estatal de incentivos a la movilidad eficiente. Ayuda directa de hasta 7.000€ para la compra de vehículos eléctricos y hasta 80% para instalación de puntos de carga.",
          managedByGrupoAvisa: true,
        },
        etiquetaCero: {
          name: "Etiqueta CERO DGT",
          description: "Distintivo ambiental para vehículos de cero emisiones. Acceso libre a Zonas de Bajas Emisiones, descuentos en peajes, aparcamiento regulado gratuito y bonificación del 75% en impuesto de circulación.",
        },
        garantiaBateria: {
          name: "Garantía de Batería de Alto Voltaje",
          description: "Cobertura oficial de 8 años o 160.000 km para baterías de tracción. Garantiza un mínimo del 70% de capacidad original.",
        },
        wallbox: {
          name: "Wallbox / Punto de Carga Doméstico",
          description: "Cargador de pared para vehículos eléctricos. Potencias de 7,4 kW (monofásico) a 22 kW (trifásico). Conector Tipo 2 (Mennekes). Instalación en 1 día laborable.",
        },
        financiacion: {
          name: "Financiación y Renting",
          description: "Opciones de financiación a medida: renting, leasing, crédito convencional. Condiciones especiales para vehículos eléctricos e híbridos.",
        },
      },
      expertise: [
        "Técnicos certificados en alta tensión para sistemas de batería y motor eléctrico",
        "Diagnóstico avanzado con software oficial actualizado de cada fabricante",
        "Calibración y verificación de sistemas ADAS (frenada automática, control de crucero adaptativo, asistente de carril)",
        "Reparación y mantenimiento de baterías de alto voltaje (diagnóstico de celdas, equilibrado, sustitución de módulos)",
        "Actualización de software OTA y sistemas de infoentretenimiento",
        "Instalación homologada de infraestructura de carga (wallbox doméstico y empresarial)",
        "Asesoramiento especializado en transición a movilidad eléctrica para flotas empresariales",
        "Gestión integral de ayudas y subvenciones (Plan MOVES III, ayudas autonómicas)",
        "Peritaje y valoración de vehículos eléctricos de segunda mano",
        "Formación continua en nuevas tecnologías de electrificación",
      ],
      vehicles: {
        totalPublished: publishedVehicles.length,
        electric: publishedVehicles.filter(v => v.vehicleType === "electrico").map(v => ({
          model: v.model, year: v.year, price: v.price || null, rangeKm: v.rangeKm || null,
          url: `${baseUrl}/vehiculos/electricos/${v.slug}`,
        })),
        hybrid: publishedVehicles.filter(v => v.vehicleType === "hibrido").map(v => ({
          model: v.model, year: v.year, price: v.price || null, rangeKm: v.rangeKm || null,
          url: `${baseUrl}/vehiculos/hibridos/${v.slug}`,
        })),
        catalogUrls: {
          electric: `${baseUrl}/promociones-electricos`,
          hybrid: `${baseUrl}/promociones-hibridos`,
        },
      },
      faq: {
        totalQuestions: publishedFaqs.length,
        categories: faqCats.map(c => {
          const catFaqs = publishedFaqs.filter(f => f.categoryId === (c as any).id);
          return {
            name: c.name,
            slug: c.slug,
            url: `${baseUrl}/preguntas/${c.slug}`,
            questionCount: catFaqs.length,
            questions: catFaqs.map(f => ({
              question: f.question,
              answer: f.answer.slice(0, 300) + (f.answer.length > 300 ? "…" : ""),
              url: faqCategoryMap.has(f.categoryId) ? `${baseUrl}/preguntas/${faqCategoryMap.get(f.categoryId)}/${f.slug}` : null,
            })),
          };
        }),
        mainUrl: `${baseUrl}/preguntas`,
      },
      testimonials: (testimonialsList || []).filter((t: any) => t.active !== false).slice(0, 10).map((t: any) => ({
        author: t.author || t.name || "Cliente",
        text: t.text || t.content || "",
        rating: t.rating || null,
        vehicle: t.vehicle || null,
      })),
      pages: [
        { title: "Inicio", url: `${baseUrl}/`, description: "Página principal del concesionario" },
        { title: "Vehículos Eléctricos", url: `${baseUrl}/promociones-electricos`, description: "Catálogo completo de vehículos 100% eléctricos" },
        { title: "Vehículos Híbridos", url: `${baseUrl}/promociones-hibridos`, description: "Catálogo de híbridos enchufables (PHEV)" },
        { title: "Plan AutoPlus y MOVES", url: `${baseUrl}/autoplus`, description: "Programa AutoPlus, Plan MOVES III y ayudas a la compra" },
        { title: "Servicio Postventa", url: `${baseUrl}/postventa`, description: "Taller oficial, mantenimiento, reparación y diagnóstico" },
        { title: "Preguntas Frecuentes", url: `${baseUrl}/preguntas`, description: "Respuestas sobre autonomía, carga, costes, ayudas y mantenimiento" },
        { title: "Red de Concesionarios", url: `${baseUrl}/concesionarios`, description: "Ubicaciones, contacto y cita previa en todos los centros" },
        { title: "Guía de Electrificación", url: `${baseUrl}/electrificacion`, description: "Cuándo y cómo hacer la transición a un vehículo eléctrico" },
        { title: "Conductores y Adopción", url: `${baseUrl}/conductores-adopcion`, description: "Razones para cambiar a un coche eléctrico" },
      ],
      sitemaps: [
        `${baseUrl}/sitemap.xml`,
        `${baseUrl}/sitemap-pages.xml`,
        `${baseUrl}/sitemap-vehicles.xml`,
        `${baseUrl}/sitemap-faqs.xml`,
        `${baseUrl}/sitemap-brands.xml`,
        `${baseUrl}/sitemap-services.xml`,
      ],
      aiDiscovery: {
        llmsTxt: `${baseUrl}/llms.txt`,
        aiIndex: `${baseUrl}/ai-index.json`,
        robotsTxt: `${baseUrl}/robots.txt`,
      },
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    res.set("Content-Type", "application/json; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600");
    res.json(index);
  });

  app.get("/ai-hints.json", (_req, res) => {
    res.redirect(301, "/ai-index.json");
  });

  app.get("/api/settings/:key", async (req, res) => {
    const setting = await storage.getSetting(req.params.key);
    if (!setting) return res.status(404).json({ message: "Setting not found" });
    res.json(setting);
  });

  app.get("/api/sections/:pageSlug", async (req, res) => {
    const pageSections = await storage.getSectionsByPage(req.params.pageSlug);
    res.json(pageSections.filter(s => s.active));
  });

  // ─── Chatbot API ───────────────────────────────────────────────
  app.post("/api/chatbot/message", async (req, res) => {
    try {
      const { message, sessionId, pageUrl } = req.body;
      if (!message || !sessionId) return res.status(400).json({ error: "message and sessionId required" });

      const text = String(message).toLowerCase().trim();

      // Detect intent
      let intent = "informacional";
      if (/compar|mejor|vs\s|versus|diferencia/.test(text)) intent = "comparativa";
      else if (/comprar|precio|coste|cuánto|cuanto|presupuesto|oferta|renting|financ|subvenci|ayuda|moves/.test(text)) intent = "compra";

      // Search FAQs by keywords (top 3 words from message)
      const keywords = text
        .replace(/[¿?¡!.,;:]/g, "")
        .split(/\s+/)
        .filter(w => w.length > 3)
        .slice(0, 5);

      let matchedFaq: { id: string; question: string; answer: string; slug: string } | null = null;

      if (keywords.length > 0) {
        const allFaqs = await storage.getFaqs();
        const publishedFaqs = allFaqs.filter((f: { published: boolean }) => f.published);

        let bestScore = 0;
        for (const faq of publishedFaqs) {
          const haystack = (faq.question + " " + faq.answer).toLowerCase();
          const score = keywords.filter((kw: string) => haystack.includes(kw)).length;
          if (score > bestScore) {
            bestScore = score;
            matchedFaq = faq as { id: number; question: string; answer: string; slug: string };
          }
        }
        if (bestScore < 1) matchedFaq = null;
      }

      let response: string;
      let isMatched = false;

      if (matchedFaq) {
        isMatched = true;
        const plainAnswer = matchedFaq.answer
          .replace(/\*\*/g, "")
          .replace(/\n\n/g, " ")
          .replace(/\n/g, " ")
          .replace(/\|[^|]+/g, "")
          .replace(/- /g, "• ")
          .trim()
          .slice(0, 600);
        response = plainAnswer + `\n\n[Ver respuesta completa →](/preguntas/general/${matchedFaq.slug})`;
      } else {
        const fallbacksByIntent: Record<string, string> = {
          compra: "Para obtener precio y disponibilidad personalizada, nuestro equipo de Grupo Avisa está disponible ahora mismo. ¿Prefieres que te llamemos, o contactas por WhatsApp?",
          comparativa: "Tenemos una sección completa de comparativas entre modelos eléctricos e híbridos. Puedes verla en /comparativas o contactarnos para una recomendación personalizada.",
          informacional: "No he encontrado una respuesta exacta a tu pregunta en nuestra base de datos. Te puedo poner en contacto con nuestro equipo de especialistas en vehículos eléctricos.",
        };
        response = fallbacksByIntent[intent] || fallbacksByIntent.informacional;
      }

      await storage.createChatbotConversation({
        sessionId,
        message,
        response,
        matchedFaqId: matchedFaq ? matchedFaq.id : undefined,
        intent,
        isMatched,
        pageUrl: pageUrl || null,
      });

      res.json({ response, isMatched, intent, faqSlug: matchedFaq?.slug || null });
    } catch (err) {
      console.error("Chatbot error:", err);
      res.status(500).json({ error: "Error procesando mensaje" });
    }
  });

  app.get("/api/admin/chatbot-conversations", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
    const convs = await storage.getChatbotConversations(200);
    res.json(convs);
  });

  app.get("/api/admin/chatbot-stats", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
    const stats = await storage.getChatbotStats();
    res.json(stats);
  });

  app.get("/api/admin/chatbot-unmatched", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
    const unmatched = await storage.getChatbotUnmatched(100);
    res.json(unmatched);
  });
  // ──────────────────────────────────────────────────────────────

  return httpServer;
}
