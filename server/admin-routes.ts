import type { Express, Request } from "express";
import { requireAuth, requireRole } from "./auth";
import { storage } from "./storage";
import { runSeoAudit, type SeoAuditResult } from "./seo-audit";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const diskStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`);
  },
});
const imageUpload = multer({
  storage: diskStorage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes"));
  },
});
const mediaUpload = multer({
  storage: diskStorage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Solo se permiten imágenes o vídeos"));
  },
});
import {
  insertBrandSchema, insertVehicleSchema, insertLeadSchema,
  insertPageSchema, insertDealerSchema, insertFaqCategorySchema,
  insertFaqSchema, insertTestimonialSchema, insertPromotionSchema,
  insertServiceSchema, insertMaintenancePlanSchema, insertSectionSchema,
  insertUserSchema, insertSeoMetadataSchema, insertTopicClusterSchema,
  insertEditorialContentSchema,
} from "@shared/schema";
import bcrypt from "bcryptjs";
import { extractFaqsFromMessages, autoProcessAndPublishFaqs, pingGoogleSitemap } from "./whatsapp-auto";

let cachedAuditResult: SeoAuditResult | null = null;
let auditInProgress = false;

export function registerAdminRoutes(app: Express) {
  app.get("/api/admin/dashboard", requireAuth, async (req, res) => {
    const [vehiclesList, leadsList, dealersList, brandsList, activity] = await Promise.all([
      storage.getVehicles(),
      storage.getLeads(),
      storage.getDealers(),
      storage.getBrands(),
      storage.getActivityLog(10),
    ]);
    res.json({
      stats: {
        vehicles: vehiclesList.length,
        leads: leadsList.length,
        dealers: dealersList.length,
        brands: brandsList.length,
      },
      recentActivity: activity,
      recentLeads: leadsList.slice(0, 5),
    });
  });

  app.get("/api/admin/vehicles", requireAuth, async (_req, res) => {
    res.json(await storage.getVehicles());
  });

  app.post("/api/admin/vehicles", requireAuth, async (req, res) => {
    const result = insertVehicleSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const vehicle = await storage.createVehicle(result.data);
    await storage.logActivity({ userId: req.session.userId, action: "create", entity: "vehicle", entityId: vehicle.id, details: `Vehículo creado: ${result.data.model}` });
    res.status(201).json(vehicle);
  });

  app.get("/api/admin/vehicles/:id", requireAuth, async (req, res) => {
    const vehicle = await storage.getVehicle(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "No encontrado" });
    res.json(vehicle);
  });

  app.put("/api/admin/vehicles/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateVehicle(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "vehicle", entityId: req.params.id, details: `Vehículo actualizado: ${updated.model}` });
    res.json(updated);
  });

  app.delete("/api/admin/vehicles/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteVehicle(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "delete", entity: "vehicle", entityId: req.params.id, details: "Vehículo eliminado" });
    res.json({ success: true });
  });

  app.get("/api/admin/brands", requireAuth, async (_req, res) => {
    res.json(await storage.getBrands());
  });

  app.post("/api/admin/brands", requireAuth, async (req, res) => {
    const result = insertBrandSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const brand = await storage.createBrand(result.data);
    await storage.logActivity({ userId: req.session.userId, action: "create", entity: "brand", entityId: brand.id, details: `Marca creada: ${result.data.name}` });
    res.status(201).json(brand);
  });

  app.put("/api/admin/brands/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateBrand(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "brand", entityId: req.params.id, details: `Marca actualizada: ${updated.name}` });
    res.json(updated);
  });

  app.delete("/api/admin/brands/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteBrand(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "delete", entity: "brand", entityId: req.params.id, details: "Marca eliminada" });
    res.json({ success: true });
  });

  app.get("/api/admin/leads", requireAuth, async (_req, res) => {
    res.json(await storage.getLeads());
  });

  app.get("/api/admin/leads/stats", requireAuth, async (_req, res) => {
    const stats = await storage.getLeadStats();
    const allLeads = await storage.getLeads();

    const dailyCounts: Record<string, number> = {};
    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      dailyCounts[d.toISOString().split("T")[0]] = 0;
    }
    for (const lead of allLeads) {
      if (lead.createdAt) {
        const day = lead.createdAt.toISOString().split("T")[0];
        if (day in dailyCounts) dailyCounts[day]++;
      }
    }

    res.json({
      ...stats,
      dailyCounts,
    });
  });

  app.get("/api/admin/leads/:id", requireAuth, async (req, res) => {
    const lead = await storage.getLead(req.params.id);
    if (!lead) return res.status(404).json({ message: "No encontrado" });
    const notes = await storage.getLeadNotes(req.params.id);
    res.json({ lead, notes });
  });

  app.put("/api/admin/leads/:id", requireAuth, async (req, res) => {
    const { status, notes, assignedTo, interest } = req.body;
    const updated = await storage.updateLead(req.params.id, { status, notes, assignedTo, interest });
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "lead", entityId: req.params.id, details: `Lead actualizado: ${status || "sin cambio de estado"}` });
    res.json(updated);
  });

  app.post("/api/admin/leads/:id/notes", requireAuth, async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Contenido requerido" });
    const note = await storage.createLeadNote({ leadId: req.params.id, userId: req.session.userId, content });
    res.status(201).json(note);
  });

  app.delete("/api/admin/leads/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/leads/export", requireAuth, async (_req, res) => {
    const allLeads = await storage.getLeads();
    const csv = ["Nombre,Email,Teléfono,Vehículo,Mensaje,Fuente,Estado,Interés,Notas,Fecha"]
      .concat(allLeads.map(l =>
        `"${l.name}","${l.email}","${l.phone || ""}","${l.vehicleId || ""}","${(l.message || "").replace(/"/g, '""')}","${l.source}","${l.status}","${l.interest || ""}","${(l.notes || "").replace(/"/g, '""')}","${l.createdAt}"`
      )).join("\n");
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", "attachment; filename=leads.csv");
    res.send(csv);
  });

  // WhatsApp FAQ automation
  app.get("/api/admin/whatsapp-conversations", requireAuth, async (_req, res) => {
    res.json(await storage.getWhatsappConversations());
  });

  app.get("/api/admin/whatsapp-conversations/:id", requireAuth, async (req, res) => {
    const conv = await storage.getWhatsappConversation(req.params.id);
    if (!conv) return res.status(404).json({ message: "No encontrado" });
    res.json(conv);
  });

  app.post("/api/admin/whatsapp-conversations", requireAuth, async (req, res) => {
    const conv = await storage.createWhatsappConversation(req.body);
    res.status(201).json(conv);
  });

  app.post("/api/admin/whatsapp-conversations/:id/process", requireAuth, async (req, res) => {
    const conv = await storage.getWhatsappConversation(req.params.id);
    if (!conv) return res.status(404).json({ message: "No encontrado" });

    const messages = (conv.messages as any[]) || [];
    const extractedFaqs = extractFaqsFromMessages(messages);

    await storage.updateWhatsappConversation(req.params.id, {
      extractedFaqs: extractedFaqs as any,
      status: "processed",
      processedAt: new Date(),
    });

    res.json({ extractedFaqs, count: extractedFaqs.length });
  });

  app.post("/api/admin/whatsapp-conversations/:id/approve", requireAuth, async (req, res) => {
    const conv = await storage.getWhatsappConversation(req.params.id);
    if (!conv) return res.status(404).json({ message: "No encontrado" });

    const { faqIndices, categoryId } = req.body;
    const extracted = (conv.extractedFaqs as any[]) || [];
    const selected = faqIndices ? extracted.filter((_: any, i: number) => faqIndices.includes(i)) : extracted;

    const created = [];
    for (const item of selected) {
      const slug = item.question
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 80);

      const faq = await storage.createFaq({
        categoryId: categoryId || null,
        question: item.question,
        answer: item.answer,
        slug,
        published: true,
        metaTitle: item.question,
        metaDescription: item.answer.slice(0, 160),
      });
      created.push(faq);
    }

    await storage.updateWhatsappConversation(req.params.id, { status: "approved" });
    await storage.logActivity({ userId: req.session.userId, action: "create", entity: "faq", entityId: conv.id, details: `${created.length} FAQs generadas desde WhatsApp` });

    if (created.length > 0) {
      pingGoogleSitemap().catch(err => console.error("Google sitemap ping error:", err));
    }

    res.json({ created, count: created.length });
  });

  app.delete("/api/admin/whatsapp-conversations/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteWhatsappConversation(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/pages", requireAuth, async (_req, res) => {
    res.json(await storage.getPages());
  });

  app.post("/api/admin/pages", requireAuth, async (req, res) => {
    const result = insertPageSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const page = await storage.createPage(result.data);
    await storage.logActivity({ userId: req.session.userId, action: "create", entity: "page", entityId: page.id, details: `Página creada: ${result.data.title}` });
    res.status(201).json(page);
  });

  app.put("/api/admin/pages/:id", requireAuth, async (req, res) => {
    const updated = await storage.updatePage(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "page", entityId: req.params.id, details: `Página actualizada: ${updated.title}` });
    res.json(updated);
  });

  app.delete("/api/admin/pages/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deletePage(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "delete", entity: "page", entityId: req.params.id, details: "Página eliminada" });
    res.json({ success: true });
  });

  app.get("/api/admin/dealers", requireAuth, async (_req, res) => {
    res.json(await storage.getDealers());
  });

  app.post("/api/admin/dealers", requireAuth, async (req, res) => {
    const result = insertDealerSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const dealer = await storage.createDealer(result.data);
    await storage.logActivity({ userId: req.session.userId, action: "create", entity: "dealer", entityId: dealer.id, details: `Concesionario creado: ${result.data.name}` });
    res.status(201).json(dealer);
  });

  app.put("/api/admin/dealers/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateDealer(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "dealer", entityId: req.params.id, details: `Concesionario actualizado: ${updated.name}` });
    res.json(updated);
  });

  app.delete("/api/admin/dealers/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteDealer(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ userId: req.session.userId, action: "delete", entity: "dealer", entityId: req.params.id, details: "Concesionario eliminado" });
    res.json({ success: true });
  });

  app.get("/api/admin/faq-categories", requireAuth, async (_req, res) => {
    res.json(await storage.getFaqCategories());
  });

  app.post("/api/admin/faq-categories", requireAuth, async (req, res) => {
    const result = insertFaqCategorySchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const cat = await storage.createFaqCategory(result.data);
    res.status(201).json(cat);
  });

  app.put("/api/admin/faq-categories/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateFaqCategory(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/faq-categories/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteFaqCategory(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/faqs", requireAuth, async (_req, res) => {
    res.json(await storage.getFaqs());
  });

  app.post("/api/admin/faqs", requireAuth, async (req, res) => {
    const result = insertFaqSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const faq = await storage.createFaq(result.data);
    res.status(201).json(faq);
  });

  app.put("/api/admin/faqs/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateFaq(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/faqs/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteFaq(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/testimonials", requireAuth, async (_req, res) => {
    res.json(await storage.getTestimonials());
  });

  app.post("/api/admin/testimonials", requireAuth, async (req, res) => {
    const result = insertTestimonialSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const t = await storage.createTestimonial(result.data);
    res.status(201).json(t);
  });

  app.put("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateTestimonial(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/testimonials/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteTestimonial(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/promotions", requireAuth, async (_req, res) => {
    res.json(await storage.getPromotions());
  });

  app.post("/api/admin/promotions", requireAuth, async (req, res) => {
    const result = insertPromotionSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const p = await storage.createPromotion(result.data);
    res.status(201).json(p);
  });

  app.put("/api/admin/promotions/:id", requireAuth, async (req, res) => {
    const updated = await storage.updatePromotion(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/promotions/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deletePromotion(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/services", requireAuth, async (_req, res) => {
    res.json(await storage.getServices());
  });

  app.post("/api/admin/services", requireAuth, async (req, res) => {
    const result = insertServiceSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const s = await storage.createService(result.data);
    res.status(201).json(s);
  });

  app.put("/api/admin/services/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/services/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/maintenance-plans", requireAuth, async (_req, res) => {
    res.json(await storage.getMaintenancePlans());
  });

  app.post("/api/admin/maintenance-plans", requireAuth, async (req, res) => {
    const result = insertMaintenancePlanSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const p = await storage.createMaintenancePlan(result.data);
    res.status(201).json(p);
  });

  app.put("/api/admin/maintenance-plans/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateMaintenancePlan(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/maintenance-plans/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteMaintenancePlan(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/settings", requireAuth, async (_req, res) => {
    res.json(await storage.getSettings());
  });

  app.put("/api/admin/settings", requireAuth, async (req, res) => {
    const { settings } = req.body;
    if (!Array.isArray(settings)) return res.status(400).json({ message: "Settings debe ser un array" });
    const results = [];
    for (const s of settings) {
      if (s.key && s.value !== undefined) {
        results.push(await storage.setSetting(s.key, s.value, s.category));
      }
    }
    res.json(results);
  });

  app.get("/api/admin/sections", requireAuth, async (req, res) => {
    const pageSlug = req.query.page as string;
    if (pageSlug) {
      res.json(await storage.getSectionsByPage(pageSlug));
    } else {
      res.json(await storage.getSections());
    }
  });

  app.post("/api/admin/sections", requireAuth, async (req, res) => {
    const result = insertSectionSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Datos inválidos", errors: result.error.flatten() });
    const s = await storage.createSection(result.data);
    res.status(201).json(s);
  });

  app.put("/api/admin/sections/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateSection(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json(updated);
  });

  app.delete("/api/admin/sections/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteSection(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/users", requireRole("superadmin"), async (_req, res) => {
    const allUsers = await storage.getUsers();
    res.json(allUsers.map(u => ({ id: u.id, username: u.username, role: u.role, displayName: u.displayName, email: u.email, active: u.active, createdAt: u.createdAt })));
  });

  app.post("/api/admin/users", requireRole("superadmin"), async (req, res) => {
    const { username, password, role, displayName, email } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Usuario y contraseña son obligatorios" });
    const existing = await storage.getUserByUsername(username);
    if (existing) return res.status(409).json({ message: "El usuario ya existe" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await storage.createUser({ username, password: hashed, role: role || "admin", displayName, email, active: true });
    res.status(201).json({ id: user.id, username: user.username, role: user.role, displayName: user.displayName, email: user.email });
  });

  app.put("/api/admin/users/:id", requireRole("superadmin"), async (req, res) => {
    const data: any = { ...req.body };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    } else {
      delete data.password;
    }
    const updated = await storage.updateUser(req.params.id, data);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    res.json({ id: updated.id, username: updated.username, role: updated.role, displayName: updated.displayName, email: updated.email, active: updated.active });
  });

  app.delete("/api/admin/users/:id", requireRole("superadmin"), async (req, res) => {
    if (req.params.id === req.session.userId) return res.status(400).json({ message: "No puede eliminarse a sí mismo" });
    const deleted = await storage.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    res.json({ success: true });
  });

  app.get("/api/admin/whatsapp-auto-settings", requireAuth, async (_req, res) => {
    const settings = await storage.getSettings();
    const autoPublish = settings.find(s => s.key === "whatsapp_auto_publish")?.value || "false";
    const autoCategory = settings.find(s => s.key === "whatsapp_auto_category")?.value || "";
    const autoMinMessages = settings.find(s => s.key === "whatsapp_auto_min_messages")?.value || "4";
    const lastPing = settings.find(s => s.key === "last_sitemap_ping")?.value || null;
    res.json({ autoPublish, autoCategory, autoMinMessages, lastSitemapPing: lastPing });
  });

  app.put("/api/admin/whatsapp-auto-settings", requireAuth, async (req, res) => {
    const { autoPublish, autoCategory, autoMinMessages } = req.body;
    if (autoPublish !== undefined) await storage.setSetting("whatsapp_auto_publish", String(autoPublish), "whatsapp");
    if (autoCategory !== undefined) await storage.setSetting("whatsapp_auto_category", autoCategory, "whatsapp");
    if (autoMinMessages !== undefined) await storage.setSetting("whatsapp_auto_min_messages", String(autoMinMessages), "whatsapp");
    await storage.logActivity({ userId: req.session.userId, action: "update", entity: "settings", details: "Configuración auto-FAQ actualizada" });
    res.json({ success: true });
  });

  app.post("/api/admin/ping-sitemap", requireAuth, async (_req, res) => {
    try {
      await pingGoogleSitemap();
      res.json({ success: true, message: "Sitemap enviado a Google y Bing" });
    } catch (err) {
      res.status(500).json({ message: "Error al enviar sitemap" });
    }
  });

  app.post("/api/admin/whatsapp-conversations/:id/auto-process", requireAuth, async (req, res) => {
    const result = await autoProcessAndPublishFaqs(req.params.id, true);
    if (result.error && result.created === 0) {
      return res.status(400).json(result);
    }
    res.json(result);
  });

  app.get("/api/admin/activity-log", requireAuth, async (_req, res) => {
    res.json(await storage.getActivityLog(100));
  });

  app.get("/api/admin/seo-metadata", requireAuth, async (_req, res) => {
    res.json(await storage.getSeoMetadataList());
  });

  app.post("/api/admin/seo-metadata", requireAuth, async (req, res) => {
    const parsed = insertSeoMetadataSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.flatten() });
    const existing = await storage.getSeoMetadataByPath(parsed.data.path);
    if (existing) return res.status(409).json({ message: "Ya existe metadata para esta ruta" });
    const created = await storage.createSeoMetadata(parsed.data);
    await storage.logActivity({ action: "create", entity: "seo_metadata", entityId: created.id, details: `SEO: ${created.path}`, userId: req.session.userId });
    res.status(201).json(created);
  });

  app.put("/api/admin/seo-metadata/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateSeoMetadata(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "update", entity: "seo_metadata", entityId: updated.id, details: `SEO: ${updated.path}`, userId: req.session.userId });
    res.json(updated);
  });

  app.delete("/api/admin/seo-metadata/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteSeoMetadata(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "delete", entity: "seo_metadata", entityId: req.params.id, details: "SEO metadata eliminada", userId: req.session.userId });
    res.json({ success: true });
  });

  app.post("/api/admin/seo-sync-urls", requireAuth, async (req, res) => {
    const [vehiclesList, pagesList, faqsList, faqCats, dealersList, promotionsList] = await Promise.all([
      storage.getVehicles(), storage.getPages(), storage.getFaqs(),
      storage.getFaqCategories(), storage.getDealers(), storage.getPromotions(),
    ]);
    const seoList = await storage.getSeoMetadataList();
    const existingPaths = new Set(seoList.map(s => s.path));
    let created = 0;

    const staticPages = [
      { path: "/", title: "Inicio - AVISA Flota Eléctricos", type: "static" },
      { path: "/promociones-electricos", title: "Promociones Eléctricos - AVISA", type: "static" },
      { path: "/promociones-hibridos", title: "Promociones Híbridos - AVISA", type: "static" },
      { path: "/autoplus", title: "Plan AutoPlus - AVISA", type: "static" },
      { path: "/postventa", title: "Postventa - AVISA", type: "static" },
      { path: "/preguntas", title: "Preguntas Frecuentes - AVISA", type: "static" },
      { path: "/concesionarios", title: "Concesionarios - AVISA", type: "static" },
      { path: "/electrificacion", title: "Electrificación - AVISA", type: "static" },
      { path: "/conductores-adopcion", title: "Conductores de Adopción - AVISA", type: "static" },
    ];

    for (const sp of staticPages) {
      if (!existingPaths.has(sp.path)) {
        await storage.createSeoMetadata({
          path: sp.path, entityType: sp.type, metaTitle: sp.title,
          metaDescription: `${sp.title} | Grupo Avisa, concesionario oficial en Andalucía y Extremadura.`,
          jsonLdType: "WebPage", noindex: false,
        });
        created++;
      }
    }

    for (const v of vehiclesList) {
      const path = `/vehiculos/${v.vehicleType === "electrico" ? "electricos" : "hibridos"}/${v.slug}`;
      if (!existingPaths.has(path)) {
        await storage.createSeoMetadata({
          path, entityType: "vehicle", entityId: v.id,
          metaTitle: v.metaTitle || `${v.model} ${v.year} - AVISA Flota Eléctricos`,
          metaDescription: v.metaDescription || v.shortDescription || `${v.model} ${v.year} disponible en Grupo Avisa.`,
          jsonLdType: "Product", noindex: false,
        });
        created++;
      }
    }

    for (const cat of faqCats) {
      const path = `/preguntas/${cat.slug}`;
      if (!existingPaths.has(path)) {
        await storage.createSeoMetadata({
          path, entityType: "faq_category", entityId: cat.id,
          metaTitle: `${cat.name} - Preguntas Frecuentes | AVISA`,
          metaDescription: `Resolvemos tus dudas sobre ${cat.name.toLowerCase()} en vehículos eléctricos e híbridos.`,
          jsonLdType: "FAQPage", noindex: false,
        });
        created++;
      }
    }

    for (const faq of faqsList) {
      if (!faq.slug || !faq.published) continue;
      const cat = faqCats.find(c => c.id === faq.categoryId);
      if (!cat) continue;
      const path = `/preguntas/${cat.slug}/${faq.slug}`;
      if (!existingPaths.has(path)) {
        await storage.createSeoMetadata({
          path, entityType: "faq", entityId: faq.id,
          metaTitle: faq.metaTitle || faq.question,
          metaDescription: faq.metaDescription || faq.answer.slice(0, 160),
          jsonLdType: "FAQPage", noindex: false,
        });
        created++;
      }
    }

    for (const d of dealersList) {
      const path = `/concesionarios/${d.id}`;
      if (!existingPaths.has(path)) {
        await storage.createSeoMetadata({
          path, entityType: "dealer", entityId: d.id,
          metaTitle: `${d.name} - Concesionario ${d.brand || ""} | AVISA`,
          metaDescription: `Visita ${d.name} en ${d.city}, ${d.province}. Concesionario oficial Grupo Avisa.`,
          jsonLdType: "LocalBusiness", noindex: false,
        });
        created++;
      }
    }

    await storage.logActivity({ userId: req.session.userId, action: "sync", entity: "seo_metadata", details: `Sincronizadas ${created} URLs nuevas` });
    res.json({ synced: created, total: (await storage.getSeoMetadataList()).length });
  });

  app.post("/api/admin/seo-auto-generate", requireAuth, async (req, res) => {
    const seoList = await storage.getSeoMetadataList();
    let updated = 0;
    for (const item of seoList) {
      if (item.metaTitle && item.metaDescription) continue;
      const title = item.metaTitle || `${item.path.replace(/\//g, " ").trim() || "Inicio"} | AVISA Flota Eléctricos`;
      const desc = item.metaDescription || `Descubre más sobre ${item.path.replace(/\//g, " ").replace(/-/g, " ").trim()} en Grupo Avisa, tu concesionario de confianza.`;
      await storage.updateSeoMetadata(item.id, { metaTitle: title, metaDescription: desc });
      updated++;
    }
    await storage.logActivity({ userId: req.session.userId, action: "auto_generate", entity: "seo_metadata", details: `SEO auto-generado para ${updated} entradas` });
    res.json({ updated, total: seoList.length });
  });

  app.get("/api/admin/seo-full-list", requireAuth, async (_req, res) => {
    const [seoList, vehiclesList, faqsList, faqCats, dealersList] = await Promise.all([
      storage.getSeoMetadataList(), storage.getVehicles(), storage.getFaqs(),
      storage.getFaqCategories(), storage.getDealers(),
    ]);
    const enriched = seoList.map(s => {
      let displayTitle = s.path;
      let typeLabel = s.entityType || "static";
      if (s.entityType === "vehicle") {
        const v = vehiclesList.find(v => v.id === s.entityId);
        if (v) displayTitle = v.model;
      } else if (s.entityType === "faq") {
        const f = faqsList.find(f => f.id === s.entityId);
        if (f) displayTitle = f.question;
      } else if (s.entityType === "dealer") {
        const d = dealersList.find(d => d.id === s.entityId);
        if (d) displayTitle = d.name;
      } else if (s.entityType === "faq_category") {
        const c = faqCats.find(c => c.id === s.entityId);
        if (c) displayTitle = c.name;
      } else {
        displayTitle = s.metaTitle || s.path;
      }
      return { ...s, displayTitle, typeLabel };
    });
    res.json(enriched);
  });

  app.get("/api/admin/ai-hints.json", requireAuth, async (_req, res) => {
    const [vehiclesList, faqsList, faqCats, dealersList] = await Promise.all([
      storage.getVehicles(), storage.getFaqs(), storage.getFaqCategories(), storage.getDealers(),
    ]);
    const baseUrl = "https://electricos.grupoavisa.com";
    const hints = {
      organization: {
        name: "Grupo Avisa",
        type: "AutoDealer",
        url: baseUrl,
        description: "Concesionario oficial Volkswagen, Audi y Škoda en Andalucía y Extremadura. Especialistas en vehículos eléctricos e híbridos.",
        contact: { phone: "+34955034600", email: "info@grupoavisa.com" },
        location: "Sevilla, Andalucía, España",
      },
      vehicles: vehiclesList.filter(v => v.published !== false).map(v => ({
        model: v.model, type: v.vehicleType, year: v.year, price: v.price,
        range: v.rangeKm, url: `${baseUrl}/vehiculos/${v.vehicleType === "electrico" ? "electricos" : "hibridos"}/${v.slug}`,
      })),
      faqCategories: faqCats.map(c => ({
        name: c.name, url: `${baseUrl}/preguntas/${c.slug}`,
        questions: faqsList.filter(f => f.categoryId === c.id && f.published).map(f => ({ q: f.question, a: f.answer.slice(0, 200) })),
      })),
      dealers: dealersList.filter(d => d.active !== false).map(d => ({
        name: d.name, brand: d.brand, city: d.city, province: d.province,
      })),
    };
    res.set("Content-Type", "application/json");
    res.json(hints);
  });

  app.get("/api/admin/llms.txt", requireAuth, async (_req, res) => {
    const [vehiclesList, faqCats, dealersList] = await Promise.all([
      storage.getVehicles(), storage.getFaqCategories(), storage.getDealers(),
    ]);
    const baseUrl = "https://electricos.grupoavisa.com";
    let txt = `# Grupo Avisa - Flota Eléctricos\n`;
    txt += `> Concesionario oficial de vehículos eléctricos e híbridos en Andalucía y Extremadura.\n`;
    txt += `> Marcas: Volkswagen, Audi, Škoda, Tesla, BYD, Hyundai, Kia, entre otros.\n\n`;
    txt += `## Sitio web\n- URL: ${baseUrl}\n- Contacto: info@grupoavisa.com | +34 955 034 600\n- Ubicación: Sevilla, España\n\n`;
    txt += `## Páginas principales\n`;
    txt += `- Inicio: ${baseUrl}/\n`;
    txt += `- Eléctricos: ${baseUrl}/promociones-electricos\n`;
    txt += `- Híbridos: ${baseUrl}/promociones-hibridos\n`;
    txt += `- Plan AutoPlus: ${baseUrl}/autoplus\n`;
    txt += `- Postventa: ${baseUrl}/postventa\n`;
    txt += `- Preguntas: ${baseUrl}/preguntas\n`;
    txt += `- Concesionarios: ${baseUrl}/concesionarios\n\n`;
    txt += `## Vehículos disponibles (${vehiclesList.filter(v => v.published !== false).length})\n`;
    for (const v of vehiclesList.filter(v => v.published !== false)) {
      txt += `- ${v.model} ${v.year} (${v.vehicleType}): ${baseUrl}/vehiculos/${v.vehicleType === "electrico" ? "electricos" : "hibridos"}/${v.slug}\n`;
    }
    txt += `\n## Categorías FAQ (${faqCats.length})\n`;
    for (const c of faqCats) {
      txt += `- ${c.name}: ${baseUrl}/preguntas/${c.slug}\n`;
    }
    txt += `\n## Concesionarios (${dealersList.filter(d => d.active !== false).length})\n`;
    for (const d of dealersList.filter(d => d.active !== false)) {
      txt += `- ${d.name} (${d.brand || "Multi"}) - ${d.city}, ${d.province}\n`;
    }
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(txt);
  });

  app.post("/api/admin/submit-search-engines", requireAuth, async (req, res) => {
    const { pingGoogleSitemap } = await import("./whatsapp-auto");
    const result = await pingGoogleSitemap();
    await storage.logActivity({ userId: req.session.userId, action: "ping", entity: "sitemap", details: `Sitemap enviado - Google: ${result.google}, Bing: ${result.bing}` });
    res.json(result);
  });

  app.get("/api/admin/seo-indexation", requireAuth, async (_req, res) => {
    const [seoList, vehiclesList, pagesList, faqsList] = await Promise.all([
      storage.getSeoMetadataList(),
      storage.getVehicles(),
      storage.getPages(),
      storage.getFaqs(),
    ]);
    const allPaths: { path: string; type: string; title: string; indexed: boolean; hasSeo: boolean; canonical: string | null }[] = [];
    const staticPages = [
      { path: "/", type: "static", title: "Inicio" },
      { path: "/promociones-electricos", type: "static", title: "Promociones Eléctricos" },
      { path: "/promociones-hibridos", type: "static", title: "Promociones Híbridos" },
      { path: "/autoplus", type: "static", title: "AutoPlus" },
      { path: "/postventa", type: "static", title: "Postventa" },
      { path: "/preguntas", type: "static", title: "Centro de Preguntas" },
      { path: "/concesionarios", type: "static", title: "Concesionarios" },
      { path: "/electrificacion", type: "static", title: "Electrificación" },
    ];
    for (const sp of staticPages) {
      const seo = seoList.find(s => s.path === sp.path);
      allPaths.push({ path: sp.path, type: sp.type, title: sp.title, indexed: !(seo?.noindex), hasSeo: !!seo, canonical: seo?.canonical || null });
    }
    for (const v of vehiclesList) {
      const p = `/vehiculos/${v.vehicleType === "electrico" ? "electricos" : "hibridos"}/${v.slug}`;
      const seo = seoList.find(s => s.path === p);
      allPaths.push({ path: p, type: "vehicle", title: `${v.model}`, indexed: !(seo?.noindex), hasSeo: !!seo, canonical: seo?.canonical || null });
    }
    for (const pg of pagesList) {
      const p = `/${pg.slug}`;
      const seo = seoList.find(s => s.path === p);
      allPaths.push({ path: p, type: "page", title: pg.title, indexed: !(seo?.noindex), hasSeo: !!seo, canonical: seo?.canonical || null });
    }
    res.json({ pages: allPaths, totalIndexed: allPaths.filter(p => p.indexed).length, totalNoindex: allPaths.filter(p => !p.indexed).length, totalWithSeo: allPaths.filter(p => p.hasSeo).length });
  });

  app.post("/api/admin/topic-clusters/sync", requireAuth, async (req, res) => {
    try {
      const { buildAuthorityArchitecture } = await import("../client/src/lib/topical-authority-builder");

      const arch = buildAuthorityArchitecture();
      const existing = await storage.getTopicClusters();
      const existingSlugs = new Set(existing.map((c: any) => c.slug));

      let created = 0;
      let updated = 0;
      const errors: string[] = [];

      for (const pillar of arch.pillars) {
        const rawSlug = pillar.path.replace(/^\//, "").replace(/\//g, "-");
        const slug = rawSlug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/gi, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").toLowerCase();
        if (!slug) continue;

        const supportingPages = pillar.clusters.slice(0, 20).map((cluster: any) => ({
          title: cluster.title,
          slug: cluster.path.replace(/^\//, "").replace(/\//g, "-"),
          type: "guide",
          status: "published",
          children: cluster.children?.slice(0, 6).map((ch: any) => ({ title: ch.title, slug: ch.path.replace(/^\//, "").replace(/\//g, "-"), type: ch.role || "supporting" })) || [],
        }));

        const keywords = pillar.clusters.slice(0, 8).map((c: any) => c.title).join(", ");

        const clusterData = {
          name: rawSlug,
          slug,
          pillarTitle: pillar.title,
          pillarDescription: `Silo ${pillar.type} — Score: ${pillar.authorityScore}% — ${pillar.totalPages} páginas — ${pillar.clusters.length} clusters`,
          pillarKeywords: keywords,
          category: pillar.type,
          supportingPages,
          contentDepth: pillar.totalPages,
          status: "active",
        };

        try {
          if (existingSlugs.has(slug)) {
            const found = existing.find((c: any) => c.slug === slug);
            if (found) { await storage.updateTopicCluster(found.id, clusterData); updated++; }
          } else {
            await storage.createTopicCluster(clusterData);
            created++;
          }
        } catch (e: any) {
          errors.push(`${slug}: ${e.message}`);
        }
      }

      await storage.logActivity({ action: "create", entity: "topic_cluster", entityId: "sync", details: `Auto-sync: ${created} creados, ${updated} actualizados`, userId: req.session?.userId });

      res.json({
        success: true,
        created,
        updated,
        total: arch.pillars.length,
        errors: errors.slice(0, 5),
        message: `Sincronización completada: ${created} nuevos, ${updated} actualizados`,
      });
    } catch (e: any) {
      console.error("[sync] Error:", e);
      res.status(500).json({ success: false, error: e.message });
    }
  });

  app.get("/api/admin/topic-clusters", requireAuth, async (_req, res) => {
    res.json(await storage.getTopicClusters());
  });

  app.get("/api/admin/topic-clusters/:id", requireAuth, async (req, res) => {
    const cluster = await storage.getTopicCluster(req.params.id);
    if (!cluster) return res.status(404).json({ message: "No encontrado" });
    res.json(cluster);
  });

  app.post("/api/admin/topic-clusters", requireAuth, async (req, res) => {
    const parsed = insertTopicClusterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.flatten() });
    const created = await storage.createTopicCluster(parsed.data);
    await storage.logActivity({ action: "create", entity: "topic_cluster", entityId: created.id, details: `Cluster: ${created.name}`, userId: req.session.userId });
    res.status(201).json(created);
  });

  app.put("/api/admin/topic-clusters/:id", requireAuth, async (req, res) => {
    const updated = await storage.updateTopicCluster(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "update", entity: "topic_cluster", entityId: updated.id, details: `Cluster: ${updated.name}`, userId: req.session.userId });
    res.json(updated);
  });

  app.delete("/api/admin/topic-clusters/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteTopicCluster(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "delete", entity: "topic_cluster", entityId: req.params.id, details: "Cluster eliminado", userId: req.session.userId });
    res.json({ success: true });
  });

  app.get("/api/admin/editorial", requireAuth, async (req, res) => {
    const type = req.query.type as string | undefined;
    const items = await storage.getEditorialContent(type);
    res.json(items);
  });

  app.get("/api/admin/editorial/:id", requireAuth, async (req, res) => {
    const item = await storage.getEditorialContentById(req.params.id);
    if (!item) return res.status(404).json({ message: "No encontrado" });
    res.json(item);
  });

  app.post("/api/admin/editorial", requireAuth, async (req, res) => {
    try {
      const data = insertEditorialContentSchema.parse(req.body);
      if (data.published && !data.publishedAt) {
        data.publishedAt = new Date();
      }
      const created = await storage.createEditorialContent(data);
      await storage.logActivity({ action: "create", entity: "editorial", entityId: created.id, details: `Artículo: ${created.title}`, userId: req.session.userId });
      res.json(created);
    } catch (err: any) {
      res.status(400).json({ message: err.message || "Error de validación" });
    }
  });

  app.put("/api/admin/editorial/:id", requireAuth, async (req, res) => {
    const data = req.body;
    if (data.published && !data.publishedAt) {
      const existing = await storage.getEditorialContentById(req.params.id);
      if (existing && !existing.publishedAt) {
        data.publishedAt = new Date();
      }
    }
    const updated = await storage.updateEditorialContent(req.params.id, data);
    if (!updated) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "update", entity: "editorial", entityId: updated.id, details: `Artículo: ${updated.title}`, userId: req.session.userId });
    res.json(updated);
  });

  app.delete("/api/admin/editorial/:id", requireAuth, async (req, res) => {
    const deleted = await storage.deleteEditorialContent(req.params.id);
    if (!deleted) return res.status(404).json({ message: "No encontrado" });
    await storage.logActivity({ action: "delete", entity: "editorial", entityId: req.params.id, details: "Artículo eliminado", userId: req.session.userId });
    res.json({ success: true });
  });

  app.post("/api/admin/seo-audit/run", requireAuth, async (req, res) => {
    if (auditInProgress) {
      return res.status(409).json({ message: "Auditoría ya en progreso" });
    }
    auditInProgress = true;
    try {
      const port = process.env.PORT || "5000";
      const baseUrl = `http://localhost:${port}`;
      const maxPages = parseInt(req.query.maxPages as string) || 50;
      const result = await runSeoAudit(baseUrl, { maxPages, sampleDynamic: 10 });
      cachedAuditResult = result;
      await storage.logActivity({ action: "create", entity: "seo_audit", entityId: "audit", details: `Auditoría SEO: ${result.totalPages} páginas, ${result.totalIssues} incidencias`, userId: req.session.userId });
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: `Error en auditoría: ${err.message}` });
    } finally {
      auditInProgress = false;
    }
  });

  app.get("/api/admin/seo-audit/status", requireAuth, async (_req, res) => {
    res.json({
      inProgress: auditInProgress,
      lastResult: cachedAuditResult ? {
        timestamp: cachedAuditResult.timestamp,
        totalPages: cachedAuditResult.totalPages,
        totalIssues: cachedAuditResult.totalIssues,
        criticalCount: cachedAuditResult.criticalCount,
        warningCount: cachedAuditResult.warningCount,
        infoCount: cachedAuditResult.infoCount,
      } : null,
    });
  });

  app.get("/api/admin/seo-audit/results", requireAuth, async (_req, res) => {
    if (!cachedAuditResult) {
      return res.status(404).json({ message: "No hay resultados. Ejecuta una auditoría primero." });
    }
    res.json(cachedAuditResult);
  });

  app.get("/api/admin/internal-link-graph", requireAuth, async (_req, res) => {
    try {
      const { generateLinkGraph } = await import("../client/src/lib/internal-linking");
      const graph = generateLinkGraph();
      res.json({
        totalNodes: graph.nodes.length,
        totalEdges: graph.edges.length,
        nodesByType: graph.nodes.reduce((acc, n) => {
          acc[n.type] = (acc[n.type] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
        ...graph,
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/api/admin/upload", requireAuth, (req, res) => {
    imageUpload.single("file")(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: "No se recibió ningún archivo" });
      const url = `/uploads/${req.file.filename}`;
      res.json({ url, filename: req.file.filename, size: req.file.size, mimetype: req.file.mimetype });
    });
  });

  app.post("/api/admin/upload/multiple", requireAuth, (req, res) => {
    imageUpload.array("files", 20)(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      const files = (req.files as Express.Multer.File[]) || [];
      const urls = files.map(f => ({ url: `/uploads/${f.filename}`, filename: f.filename, size: f.size }));
      res.json({ urls });
    });
  });

  app.post("/api/admin/upload/video", requireAuth, (req, res) => {
    mediaUpload.single("file")(req, res, (err) => {
      if (err) return res.status(400).json({ message: err.message });
      if (!req.file) return res.status(400).json({ message: "No se recibió ningún archivo" });
      const url = `/uploads/${req.file.filename}`;
      res.json({ url, filename: req.file.filename, size: req.file.size, mimetype: req.file.mimetype });
    });
  });

  app.get("/api/admin/media", requireAuth, (_req, res) => {
    try {
      const files = fs.readdirSync(uploadDir)
        .filter(f => /\.(jpg|jpeg|png|gif|webp|svg|avif|mp4|webm|mov|avi)$/i.test(f))
        .map(filename => {
          const stat = fs.statSync(path.join(uploadDir, filename));
          return { filename, url: `/uploads/${filename}`, size: stat.size, createdAt: stat.birthtime.toISOString() };
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      res.json(files);
    } catch {
      res.json([]);
    }
  });

  app.delete("/api/admin/media/:filename", requireAuth, (req, res) => {
    const { filename } = req.params;
    if (filename.includes("..") || filename.includes("/")) return res.status(400).json({ message: "Nombre de archivo inválido" });
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: "Archivo no encontrado" });
    fs.unlinkSync(filePath);
    res.json({ success: true });
  });

  app.post("/api/admin/scheduled-growth/run", requireAuth, async (req, res) => {
    try {
      const { triggerManualRun, getSchedulerState } = await import("./growth-scheduler");
      const { runGrowthCycle } = await import("../client/src/lib/scheduled-growth");
      const result = runGrowthCycle();
      await storage.logActivity({
        action: "create",
        entity: "scheduled_growth",
        entityId: result.runId,
        details: `Ciclo manual: ${result.summary.pagesGenerated} páginas, ${result.summary.faqsGenerated} FAQs, ${result.totalDurationMs}ms`,
        userId: req.session?.userId,
      });
      const schedulerState = getSchedulerState();
      res.json({ ...result, scheduler: schedulerState });
    } catch (err: any) {
      console.error("[scheduled-growth] Error:", err);
      res.status(500).json({ message: err.message });
    }
  });

  app.get("/api/admin/scheduled-growth/status", requireAuth, async (_req, res) => {
    try {
      const { getSchedulerState } = await import("./growth-scheduler");
      const { getGrowthStats } = await import("../client/src/lib/seo-growth-engine");
      const [schedulerState, growthStats] = await Promise.all([
        Promise.resolve(getSchedulerState()),
        Promise.resolve(getGrowthStats()),
      ]);
      res.json({
        scheduler: schedulerState,
        stats: {
          totalGrowthPages: growthStats.totalNewPages,
          byType: growthStats.byType,
          brands: growthStats.brands,
          cities: growthStats.cities,
        },
      });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });

  app.post("/api/admin/scheduled-growth/configure", requireAuth, async (req, res) => {
    try {
      const { interval } = req.body as { interval: string };
      const validIntervals = ["disabled", "12h", "daily", "weekly", "monthly"];
      if (!validIntervals.includes(interval)) {
        return res.status(400).json({ message: `Intervalo inválido. Opciones: ${validIntervals.join(", ")}` });
      }
      const { setScheduleInterval } = await import("./growth-scheduler");
      const newState = await setScheduleInterval(interval as any);
      await storage.logActivity({
        action: "update",
        entity: "scheduled_growth",
        entityId: "config",
        details: `Intervalo de crecimiento programado actualizado a: ${interval}`,
        userId: req.session?.userId,
      });
      res.json({ success: true, scheduler: newState });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  });
}
