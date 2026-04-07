import {
  type User, type InsertUser,
  type Brand, type InsertBrand,
  type Vehicle, type InsertVehicle,
  type Lead, type InsertLead,
  type LeadNote, type InsertLeadNote,
  type Page, type InsertPage,
  type Dealer, type InsertDealer,
  type FaqCategory, type InsertFaqCategory,
  type Faq, type InsertFaq,
  type Testimonial, type InsertTestimonial,
  type Promotion, type InsertPromotion,
  type Service, type InsertService,
  type MaintenancePlan, type InsertMaintenancePlan,
  type SiteSetting, type InsertSiteSetting,
  type Section, type InsertSection,
  type ActivityLog, type InsertActivityLog,
  type WhatsappConversation, type InsertWhatsappConversation,
  type SeoMetadata, type InsertSeoMetadata,
  type TopicCluster, type InsertTopicCluster,
  type EditorialContent, type InsertEditorialContent,
  type ChatbotConversation, type InsertChatbotConversation,
  users, brands, vehicles, leads, leadNotes, pages,
  dealers, faqCategories, faqs, testimonials,
  promotions, services, maintenancePlans,
  siteSettings, sections, activityLog,
  whatsappConversations, whatsappWebhookLog,
  seoMetadata, topicClusters, editorialContent,
  chatbotConversations,
} from "@shared/schema";
import { eq, desc, asc, sql, and, gte, lte, count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: string): Promise<boolean>;
  getUsers(): Promise<User[]>;

  getBrands(): Promise<Brand[]>;
  getBrandBySlug(slug: string): Promise<Brand | undefined>;
  getBrand(id: string): Promise<Brand | undefined>;
  createBrand(brand: InsertBrand): Promise<Brand>;
  updateBrand(id: string, data: Partial<InsertBrand>): Promise<Brand | undefined>;
  deleteBrand(id: string): Promise<boolean>;

  getVehicles(): Promise<Vehicle[]>;
  getVehicleBySlug(slug: string): Promise<Vehicle | undefined>;
  getVehicle(id: string): Promise<Vehicle | undefined>;
  getVehiclesByBrand(brandId: string): Promise<Vehicle[]>;
  getFeaturedVehicles(): Promise<Vehicle[]>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, data: Partial<InsertVehicle>): Promise<Vehicle | undefined>;
  deleteVehicle(id: string): Promise<boolean>;

  getLeads(): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<boolean>;
  getLeadsByDateRange(from: Date, to: Date): Promise<Lead[]>;
  getLeadStats(): Promise<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number>; thisWeek: number; thisMonth: number }>;

  getLeadNotes(leadId: string): Promise<LeadNote[]>;
  createLeadNote(note: InsertLeadNote): Promise<LeadNote>;

  getWhatsappConversations(): Promise<WhatsappConversation[]>;
  getWhatsappConversation(id: string): Promise<WhatsappConversation | undefined>;
  createWhatsappConversation(conv: InsertWhatsappConversation): Promise<WhatsappConversation>;
  updateWhatsappConversation(id: string, data: Partial<InsertWhatsappConversation>): Promise<WhatsappConversation | undefined>;
  deleteWhatsappConversation(id: string): Promise<boolean>;

  getPages(): Promise<Page[]>;
  getPageBySlug(slug: string): Promise<Page | undefined>;
  getPage(id: string): Promise<Page | undefined>;
  createPage(page: InsertPage): Promise<Page>;
  updatePage(id: string, data: Partial<InsertPage>): Promise<Page | undefined>;
  deletePage(id: string): Promise<boolean>;

  getDealers(): Promise<Dealer[]>;
  getDealer(id: string): Promise<Dealer | undefined>;
  createDealer(dealer: InsertDealer): Promise<Dealer>;
  updateDealer(id: string, data: Partial<InsertDealer>): Promise<Dealer | undefined>;
  deleteDealer(id: string): Promise<boolean>;

  getFaqCategories(): Promise<FaqCategory[]>;
  getFaqCategory(id: string): Promise<FaqCategory | undefined>;
  createFaqCategory(cat: InsertFaqCategory): Promise<FaqCategory>;
  updateFaqCategory(id: string, data: Partial<InsertFaqCategory>): Promise<FaqCategory | undefined>;
  deleteFaqCategory(id: string): Promise<boolean>;

  getFaqs(): Promise<Faq[]>;
  getHomeFeaturedFaqs(): Promise<(Faq & { categoryName: string })[]>;
  getFaqsByCategory(categoryId: string): Promise<Faq[]>;
  getFaq(id: string): Promise<Faq | undefined>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  updateFaq(id: string, data: Partial<InsertFaq>): Promise<Faq | undefined>;
  deleteFaq(id: string): Promise<boolean>;

  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(t: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: string): Promise<boolean>;

  getPromotions(): Promise<Promotion[]>;
  getPromotionsByType(vehicleType: string): Promise<Promotion[]>;
  createPromotion(p: InsertPromotion): Promise<Promotion>;
  updatePromotion(id: string, data: Partial<InsertPromotion>): Promise<Promotion | undefined>;
  deletePromotion(id: string): Promise<boolean>;

  getServices(): Promise<Service[]>;
  createService(s: InsertService): Promise<Service>;
  updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined>;
  deleteService(id: string): Promise<boolean>;

  getMaintenancePlans(): Promise<MaintenancePlan[]>;
  createMaintenancePlan(p: InsertMaintenancePlan): Promise<MaintenancePlan>;
  updateMaintenancePlan(id: string, data: Partial<InsertMaintenancePlan>): Promise<MaintenancePlan | undefined>;
  deleteMaintenancePlan(id: string): Promise<boolean>;

  getSettings(): Promise<SiteSetting[]>;
  getSetting(key: string): Promise<SiteSetting | undefined>;
  setSetting(key: string, value: string, category?: string): Promise<SiteSetting>;

  getSections(): Promise<Section[]>;
  getSectionsByPage(pageSlug: string): Promise<Section[]>;
  createSection(s: InsertSection): Promise<Section>;
  updateSection(id: string, data: Partial<InsertSection>): Promise<Section | undefined>;
  deleteSection(id: string): Promise<boolean>;

  logActivity(entry: InsertActivityLog): Promise<ActivityLog>;
  getActivityLog(limit?: number): Promise<ActivityLog[]>;

  getSeoMetadataList(): Promise<SeoMetadata[]>;
  getSeoMetadataByPath(path: string): Promise<SeoMetadata | undefined>;
  getSeoMetadataById(id: string): Promise<SeoMetadata | undefined>;
  createSeoMetadata(data: InsertSeoMetadata): Promise<SeoMetadata>;
  updateSeoMetadata(id: string, data: Partial<InsertSeoMetadata>): Promise<SeoMetadata | undefined>;
  deleteSeoMetadata(id: string): Promise<boolean>;

  getTopicClusters(): Promise<TopicCluster[]>;
  getTopicCluster(id: string): Promise<TopicCluster | undefined>;
  createTopicCluster(data: InsertTopicCluster): Promise<TopicCluster>;
  updateTopicCluster(id: string, data: Partial<InsertTopicCluster>): Promise<TopicCluster | undefined>;
  deleteTopicCluster(id: string): Promise<boolean>;

  getEditorialContent(type?: string): Promise<EditorialContent[]>;
  getEditorialContentBySlug(slug: string): Promise<EditorialContent | undefined>;
  getEditorialContentById(id: string): Promise<EditorialContent | undefined>;
  getPublishedEditorial(type?: string): Promise<EditorialContent[]>;
  getRecentEditorial(limit?: number): Promise<EditorialContent[]>;
  createEditorialContent(data: InsertEditorialContent): Promise<EditorialContent>;
  updateEditorialContent(id: string, data: Partial<InsertEditorialContent>): Promise<EditorialContent | undefined>;
  deleteEditorialContent(id: string): Promise<boolean>;

  createChatbotConversation(data: InsertChatbotConversation): Promise<ChatbotConversation>;
  getChatbotConversations(limit?: number): Promise<ChatbotConversation[]>;
  getChatbotUnmatched(limit?: number): Promise<ChatbotConversation[]>;
  getChatbotStats(): Promise<{ total: number; matched: number; unmatched: number; intents: Record<string, number> }>;
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, data: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result.length > 0;
  }

  async getUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getBrands(): Promise<Brand[]> {
    return db.select().from(brands);
  }

  async getBrandBySlug(slug: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.slug, slug));
    return brand;
  }

  async getBrand(id: string): Promise<Brand | undefined> {
    const [brand] = await db.select().from(brands).where(eq(brands.id, id));
    return brand;
  }

  async createBrand(brand: InsertBrand): Promise<Brand> {
    const [created] = await db.insert(brands).values(brand).returning();
    return created;
  }

  async updateBrand(id: string, data: Partial<InsertBrand>): Promise<Brand | undefined> {
    const [updated] = await db.update(brands).set(data).where(eq(brands.id, id)).returning();
    return updated;
  }

  async deleteBrand(id: string): Promise<boolean> {
    const result = await db.delete(brands).where(eq(brands.id, id)).returning();
    return result.length > 0;
  }

  async getVehicles(): Promise<Vehicle[]> {
    return db.select().from(vehicles);
  }

  async getVehicleBySlug(slug: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.slug, slug));
    return vehicle;
  }

  async getVehicle(id: string): Promise<Vehicle | undefined> {
    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    return vehicle;
  }

  async getVehiclesByBrand(brandId: string): Promise<Vehicle[]> {
    return db.select().from(vehicles).where(eq(vehicles.brandId, brandId));
  }

  async getFeaturedVehicles(): Promise<Vehicle[]> {
    return db.select().from(vehicles).where(eq(vehicles.featured, true));
  }

  async createVehicle(vehicle: InsertVehicle): Promise<Vehicle> {
    const [created] = await db.insert(vehicles).values(vehicle).returning();
    return created;
  }

  async updateVehicle(id: string, data: Partial<InsertVehicle>): Promise<Vehicle | undefined> {
    const [updated] = await db.update(vehicles).set(data).where(eq(vehicles.id, id)).returning();
    return updated;
  }

  async deleteVehicle(id: string): Promise<boolean> {
    const result = await db.delete(vehicles).where(eq(vehicles.id, id)).returning();
    return result.length > 0;
  }

  async getLeads(): Promise<Lead[]> {
    return db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [lead] = await db.select().from(leads).where(eq(leads.id, id));
    return lead;
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [created] = await db.insert(leads).values(lead).returning();
    return created;
  }

  async updateLead(id: string, data: Partial<InsertLead>): Promise<Lead | undefined> {
    const [updated] = await db.update(leads).set({ ...data, updatedAt: new Date() }).where(eq(leads.id, id)).returning();
    return updated;
  }

  async deleteLead(id: string): Promise<boolean> {
    const result = await db.delete(leads).where(eq(leads.id, id)).returning();
    return result.length > 0;
  }

  async getLeadsByDateRange(from: Date, to: Date): Promise<Lead[]> {
    return db.select().from(leads)
      .where(and(gte(leads.createdAt, from), lte(leads.createdAt, to)))
      .orderBy(desc(leads.createdAt));
  }

  async getLeadStats(): Promise<{ total: number; byStatus: Record<string, number>; bySource: Record<string, number>; thisWeek: number; thisMonth: number }> {
    const allLeads = await this.getLeads();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const byStatus: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    let thisWeek = 0;
    let thisMonth = 0;

    for (const lead of allLeads) {
      const s = lead.status || "new";
      byStatus[s] = (byStatus[s] || 0) + 1;
      const src = lead.source || "web";
      bySource[src] = (bySource[src] || 0) + 1;
      if (lead.createdAt && lead.createdAt >= weekAgo) thisWeek++;
      if (lead.createdAt && lead.createdAt >= monthAgo) thisMonth++;
    }

    return { total: allLeads.length, byStatus, bySource, thisWeek, thisMonth };
  }

  async getLeadNotes(leadId: string): Promise<LeadNote[]> {
    return db.select().from(leadNotes).where(eq(leadNotes.leadId, leadId)).orderBy(desc(leadNotes.createdAt));
  }

  async createLeadNote(note: InsertLeadNote): Promise<LeadNote> {
    const [created] = await db.insert(leadNotes).values(note).returning();
    return created;
  }

  async getWhatsappConversations(): Promise<WhatsappConversation[]> {
    return db.select().from(whatsappConversations).orderBy(desc(whatsappConversations.createdAt));
  }

  async getWhatsappConversation(id: string): Promise<WhatsappConversation | undefined> {
    const [conv] = await db.select().from(whatsappConversations).where(eq(whatsappConversations.id, id));
    return conv;
  }

  async createWhatsappConversation(conv: InsertWhatsappConversation): Promise<WhatsappConversation> {
    const [created] = await db.insert(whatsappConversations).values(conv).returning();
    return created;
  }

  async updateWhatsappConversation(id: string, data: Partial<InsertWhatsappConversation>): Promise<WhatsappConversation | undefined> {
    const [updated] = await db.update(whatsappConversations).set(data).where(eq(whatsappConversations.id, id)).returning();
    return updated;
  }

  async deleteWhatsappConversation(id: string): Promise<boolean> {
    const result = await db.delete(whatsappConversations).where(eq(whatsappConversations.id, id)).returning();
    return result.length > 0;
  }

  async getPages(): Promise<Page[]> {
    return db.select().from(pages);
  }

  async getPageBySlug(slug: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.slug, slug));
    return page;
  }

  async getPage(id: string): Promise<Page | undefined> {
    const [page] = await db.select().from(pages).where(eq(pages.id, id));
    return page;
  }

  async createPage(page: InsertPage): Promise<Page> {
    const [created] = await db.insert(pages).values(page).returning();
    return created;
  }

  async updatePage(id: string, data: Partial<InsertPage>): Promise<Page | undefined> {
    const [updated] = await db.update(pages).set(data).where(eq(pages.id, id)).returning();
    return updated;
  }

  async deletePage(id: string): Promise<boolean> {
    const result = await db.delete(pages).where(eq(pages.id, id)).returning();
    return result.length > 0;
  }

  async getDealers(): Promise<Dealer[]> {
    return db.select().from(dealers).orderBy(asc(dealers.sortOrder));
  }

  async getDealer(id: string): Promise<Dealer | undefined> {
    const [dealer] = await db.select().from(dealers).where(eq(dealers.id, id));
    return dealer;
  }

  async createDealer(dealer: InsertDealer): Promise<Dealer> {
    const [created] = await db.insert(dealers).values(dealer).returning();
    return created;
  }

  async updateDealer(id: string, data: Partial<InsertDealer>): Promise<Dealer | undefined> {
    const [updated] = await db.update(dealers).set(data).where(eq(dealers.id, id)).returning();
    return updated;
  }

  async deleteDealer(id: string): Promise<boolean> {
    const result = await db.delete(dealers).where(eq(dealers.id, id)).returning();
    return result.length > 0;
  }

  async getFaqCategories(): Promise<FaqCategory[]> {
    return db.select().from(faqCategories).orderBy(asc(faqCategories.sortOrder));
  }

  async getFaqCategory(id: string): Promise<FaqCategory | undefined> {
    const [cat] = await db.select().from(faqCategories).where(eq(faqCategories.id, id));
    return cat;
  }

  async createFaqCategory(cat: InsertFaqCategory): Promise<FaqCategory> {
    const [created] = await db.insert(faqCategories).values(cat).returning();
    return created;
  }

  async updateFaqCategory(id: string, data: Partial<InsertFaqCategory>): Promise<FaqCategory | undefined> {
    const [updated] = await db.update(faqCategories).set(data).where(eq(faqCategories.id, id)).returning();
    return updated;
  }

  async deleteFaqCategory(id: string): Promise<boolean> {
    const result = await db.delete(faqCategories).where(eq(faqCategories.id, id)).returning();
    return result.length > 0;
  }

  async getFaqs(): Promise<Faq[]> {
    return db.select().from(faqs).orderBy(asc(faqs.sortOrder));
  }

  async getHomeFeaturedFaqs(): Promise<(Faq & { categoryName: string })[]> {
    const results = await db
      .select({ faq: faqs, categoryName: faqCategories.name })
      .from(faqs)
      .innerJoin(faqCategories, eq(faqs.categoryId, faqCategories.id))
      .where(and(eq(faqs.homeFeatured, true), eq(faqs.published, true)))
      .orderBy(asc(faqCategories.sortOrder), asc(faqs.sortOrder));
    return results.map(r => ({ ...r.faq, categoryName: r.categoryName }));
  }

  async getFaqsByCategory(categoryId: string): Promise<Faq[]> {
    return db.select().from(faqs).where(eq(faqs.categoryId, categoryId)).orderBy(asc(faqs.sortOrder));
  }

  async getFaq(id: string): Promise<Faq | undefined> {
    const [faq] = await db.select().from(faqs).where(eq(faqs.id, id));
    return faq;
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [created] = await db.insert(faqs).values(faq).returning();
    return created;
  }

  async updateFaq(id: string, data: Partial<InsertFaq>): Promise<Faq | undefined> {
    const [updated] = await db.update(faqs).set(data).where(eq(faqs.id, id)).returning();
    return updated;
  }

  async deleteFaq(id: string): Promise<boolean> {
    const result = await db.delete(faqs).where(eq(faqs.id, id)).returning();
    return result.length > 0;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return db.select().from(testimonials).orderBy(asc(testimonials.sortOrder));
  }

  async createTestimonial(t: InsertTestimonial): Promise<Testimonial> {
    const [created] = await db.insert(testimonials).values(t).returning();
    return created;
  }

  async updateTestimonial(id: string, data: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updated] = await db.update(testimonials).set(data).where(eq(testimonials.id, id)).returning();
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  async getPromotions(): Promise<Promotion[]> {
    return db.select().from(promotions).orderBy(asc(promotions.sortOrder));
  }

  async getPromotionsByType(vehicleType: string): Promise<Promotion[]> {
    return db.select().from(promotions).where(eq(promotions.vehicleType, vehicleType)).orderBy(asc(promotions.sortOrder));
  }

  async createPromotion(p: InsertPromotion): Promise<Promotion> {
    const [created] = await db.insert(promotions).values(p).returning();
    return created;
  }

  async updatePromotion(id: string, data: Partial<InsertPromotion>): Promise<Promotion | undefined> {
    const [updated] = await db.update(promotions).set(data).where(eq(promotions.id, id)).returning();
    return updated;
  }

  async deletePromotion(id: string): Promise<boolean> {
    const result = await db.delete(promotions).where(eq(promotions.id, id)).returning();
    return result.length > 0;
  }

  async getServices(): Promise<Service[]> {
    return db.select().from(services).orderBy(asc(services.sortOrder));
  }

  async createService(s: InsertService): Promise<Service> {
    const [created] = await db.insert(services).values(s).returning();
    return created;
  }

  async updateService(id: string, data: Partial<InsertService>): Promise<Service | undefined> {
    const [updated] = await db.update(services).set(data).where(eq(services.id, id)).returning();
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  async getMaintenancePlans(): Promise<MaintenancePlan[]> {
    return db.select().from(maintenancePlans).orderBy(asc(maintenancePlans.sortOrder));
  }

  async createMaintenancePlan(p: InsertMaintenancePlan): Promise<MaintenancePlan> {
    const [created] = await db.insert(maintenancePlans).values(p).returning();
    return created;
  }

  async updateMaintenancePlan(id: string, data: Partial<InsertMaintenancePlan>): Promise<MaintenancePlan | undefined> {
    const [updated] = await db.update(maintenancePlans).set(data).where(eq(maintenancePlans.id, id)).returning();
    return updated;
  }

  async deleteMaintenancePlan(id: string): Promise<boolean> {
    const result = await db.delete(maintenancePlans).where(eq(maintenancePlans.id, id)).returning();
    return result.length > 0;
  }

  async getSettings(): Promise<SiteSetting[]> {
    return db.select().from(siteSettings);
  }

  async getSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db.select().from(siteSettings).where(eq(siteSettings.key, key));
    return setting;
  }

  async setSetting(key: string, value: string, category?: string): Promise<SiteSetting> {
    const existing = await this.getSetting(key);
    if (existing) {
      const [updated] = await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key)).returning();
      return updated;
    }
    const [created] = await db.insert(siteSettings).values({ key, value, category: category || "general" }).returning();
    return created;
  }

  async getSections(): Promise<Section[]> {
    return db.select().from(sections).orderBy(asc(sections.sortOrder));
  }

  async getSectionsByPage(pageSlug: string): Promise<Section[]> {
    return db.select().from(sections).where(eq(sections.pageSlug, pageSlug)).orderBy(asc(sections.sortOrder));
  }

  async createSection(s: InsertSection): Promise<Section> {
    const [created] = await db.insert(sections).values(s).returning();
    return created;
  }

  async updateSection(id: string, data: Partial<InsertSection>): Promise<Section | undefined> {
    const [updated] = await db.update(sections).set(data).where(eq(sections.id, id)).returning();
    return updated;
  }

  async deleteSection(id: string): Promise<boolean> {
    const result = await db.delete(sections).where(eq(sections.id, id)).returning();
    return result.length > 0;
  }

  async logActivity(entry: InsertActivityLog): Promise<ActivityLog> {
    const [created] = await db.insert(activityLog).values(entry).returning();
    return created;
  }

  async getActivityLog(limit = 50): Promise<ActivityLog[]> {
    return db.select().from(activityLog).orderBy(desc(activityLog.createdAt)).limit(limit);
  }

  async getSeoMetadataList(): Promise<SeoMetadata[]> {
    return db.select().from(seoMetadata).orderBy(asc(seoMetadata.path));
  }

  async getSeoMetadataByPath(path: string): Promise<SeoMetadata | undefined> {
    const [found] = await db.select().from(seoMetadata).where(eq(seoMetadata.path, path));
    return found;
  }

  async getSeoMetadataById(id: string): Promise<SeoMetadata | undefined> {
    const [found] = await db.select().from(seoMetadata).where(eq(seoMetadata.id, id));
    return found;
  }

  async createSeoMetadata(data: InsertSeoMetadata): Promise<SeoMetadata> {
    const [created] = await db.insert(seoMetadata).values(data).returning();
    return created;
  }

  async updateSeoMetadata(id: string, data: Partial<InsertSeoMetadata>): Promise<SeoMetadata | undefined> {
    const [updated] = await db.update(seoMetadata).set({ ...data, updatedAt: new Date() }).where(eq(seoMetadata.id, id)).returning();
    return updated;
  }

  async deleteSeoMetadata(id: string): Promise<boolean> {
    const result = await db.delete(seoMetadata).where(eq(seoMetadata.id, id)).returning();
    return result.length > 0;
  }

  async getTopicClusters(): Promise<TopicCluster[]> {
    return db.select().from(topicClusters).orderBy(desc(topicClusters.createdAt));
  }

  async getTopicCluster(id: string): Promise<TopicCluster | undefined> {
    const [found] = await db.select().from(topicClusters).where(eq(topicClusters.id, id));
    return found;
  }

  async createTopicCluster(data: InsertTopicCluster): Promise<TopicCluster> {
    const [created] = await db.insert(topicClusters).values(data).returning();
    return created;
  }

  async updateTopicCluster(id: string, data: Partial<InsertTopicCluster>): Promise<TopicCluster | undefined> {
    const [updated] = await db.update(topicClusters).set({ ...data, updatedAt: new Date() }).where(eq(topicClusters.id, id)).returning();
    return updated;
  }

  async deleteTopicCluster(id: string): Promise<boolean> {
    const result = await db.delete(topicClusters).where(eq(topicClusters.id, id)).returning();
    return result.length > 0;
  }

  async getEditorialContent(type?: string): Promise<EditorialContent[]> {
    if (type) {
      return db.select().from(editorialContent).where(eq(editorialContent.type, type)).orderBy(desc(editorialContent.publishedAt));
    }
    return db.select().from(editorialContent).orderBy(desc(editorialContent.publishedAt));
  }

  async getEditorialContentBySlug(slug: string): Promise<EditorialContent | undefined> {
    const [found] = await db.select().from(editorialContent).where(eq(editorialContent.slug, slug));
    return found;
  }

  async getEditorialContentById(id: string): Promise<EditorialContent | undefined> {
    const [found] = await db.select().from(editorialContent).where(eq(editorialContent.id, id));
    return found;
  }

  async getPublishedEditorial(type?: string): Promise<EditorialContent[]> {
    if (type) {
      return db.select().from(editorialContent)
        .where(and(eq(editorialContent.published, true), eq(editorialContent.type, type)))
        .orderBy(desc(editorialContent.publishedAt));
    }
    return db.select().from(editorialContent)
      .where(eq(editorialContent.published, true))
      .orderBy(desc(editorialContent.publishedAt));
  }

  async getRecentEditorial(limit = 10): Promise<EditorialContent[]> {
    return db.select().from(editorialContent)
      .where(eq(editorialContent.published, true))
      .orderBy(desc(editorialContent.publishedAt))
      .limit(limit);
  }

  async createEditorialContent(data: InsertEditorialContent): Promise<EditorialContent> {
    const [created] = await db.insert(editorialContent).values(data).returning();
    return created;
  }

  async updateEditorialContent(id: string, data: Partial<InsertEditorialContent>): Promise<EditorialContent | undefined> {
    const [updated] = await db.update(editorialContent).set({ ...data, updatedAt: new Date() }).where(eq(editorialContent.id, id)).returning();
    return updated;
  }

  async deleteEditorialContent(id: string): Promise<boolean> {
    const result = await db.delete(editorialContent).where(eq(editorialContent.id, id)).returning();
    return result.length > 0;
  }

  async createChatbotConversation(data: InsertChatbotConversation): Promise<ChatbotConversation> {
    const [created] = await db.insert(chatbotConversations).values(data).returning();
    return created;
  }

  async getChatbotConversations(limit = 100): Promise<ChatbotConversation[]> {
    return db.select().from(chatbotConversations)
      .orderBy(desc(chatbotConversations.createdAt))
      .limit(limit);
  }

  async getChatbotUnmatched(limit = 50): Promise<ChatbotConversation[]> {
    return db.select().from(chatbotConversations)
      .where(eq(chatbotConversations.isMatched, false))
      .orderBy(desc(chatbotConversations.createdAt))
      .limit(limit);
  }

  async getChatbotStats(): Promise<{ total: number; matched: number; unmatched: number; intents: Record<string, number> }> {
    const allConvs = await db.select().from(chatbotConversations);
    const total = allConvs.length;
    const matched = allConvs.filter(c => c.isMatched).length;
    const unmatched = total - matched;
    const intents: Record<string, number> = {};
    allConvs.forEach(c => {
      const intent = c.intent || "informacional";
      intents[intent] = (intents[intent] || 0) + 1;
    });
    return { total, matched, unmatched, intents };
  }
}

export const storage = new DatabaseStorage();
