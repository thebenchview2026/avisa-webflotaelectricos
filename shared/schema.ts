import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin"),
  displayName: text("display_name"),
  email: text("email"),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const brands = pgTable("brands", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  logoUrl: text("logo_url"),
  description: text("description"),
  country: text("country"),
});

export const vehicles = pgTable("vehicles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  brandId: varchar("brand_id").notNull(),
  model: text("model").notNull(),
  slug: text("slug").notNull().unique(),
  vehicleType: text("vehicle_type").default("electrico"),
  year: integer("year").notNull(),
  price: real("price").notNull(),
  bodyType: text("body_type").notNull(),
  rangeKm: integer("range_km").notNull(),
  batteryKwh: real("battery_kwh").notNull(),
  powerHp: integer("power_hp").notNull(),
  acceleration: real("acceleration"),
  topSpeed: integer("top_speed"),
  seats: integer("seats").notNull().default(5),
  drivetrain: text("drivetrain").default("FWD"),
  chargingTimeFast: text("charging_time_fast"),
  chargingTimeSlow: text("charging_time_slow"),
  trunkLiters: integer("trunk_liters"),
  weight: integer("weight"),
  imageUrl: text("image_url"),
  galleryUrls: text("gallery_urls").array(),
  videoUrl: text("video_url"),
  description: text("description"),
  shortDescription: text("short_description"),
  featured: boolean("featured").default(false),
  available: boolean("available").default(true),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  vehicleId: varchar("vehicle_id"),
  message: text("message"),
  source: text("source").default("web"),
  status: text("status").default("new"),
  notes: text("notes"),
  assignedTo: text("assigned_to"),
  interest: text("interest"),
  marketingConsent: boolean("marketing_consent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const leadNotes = pgTable("lead_notes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadId: varchar("lead_id").notNull(),
  userId: varchar("user_id"),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const whatsappConversations = pgTable("whatsapp_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: text("phone_number"),
  contactName: text("contact_name"),
  messages: jsonb("messages").default([]),
  extractedFaqs: jsonb("extracted_faqs").default([]),
  status: text("status").default("pending"),
  processedAt: timestamp("processed_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const whatsappWebhookLog = pgTable("whatsapp_webhook_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  payload: jsonb("payload").notNull(),
  processed: boolean("processed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pages = pgTable("pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  published: boolean("published").default(true),
});

export const dealers = pgTable("dealers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  province: text("province").notNull(),
  phone: text("phone"),
  email: text("email"),
  lat: real("lat"),
  lng: real("lng"),
  googleMapsUrl: text("google_maps_url"),
  brandLogos: text("brand_logos").array(),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const faqCategories = pgTable("faq_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon"),
  description: text("description"),
  sortOrder: integer("sort_order").default(0),
});

export const faqs = pgTable("faqs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  categoryId: varchar("category_id").notNull(),
  slug: text("slug").notNull().default(""),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  videoUrl: text("video_url"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  relatedSlugs: text("related_slugs").array(),
  sortOrder: integer("sort_order").default(0),
  published: boolean("published").default(true),
  homeFeatured: boolean("home_featured").default(false),
});

export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role"),
  company: text("company"),
  rating: integer("rating").notNull().default(5),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  published: boolean("published").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const promotions = pgTable("promotions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  vehicleType: text("vehicle_type").notNull(),
  brandName: text("brand_name"),
  modelName: text("model_name"),
  imageUrl: text("image_url"),
  price: real("price"),
  monthlyPayment: text("monthly_payment"),
  features: text("features").array(),
  badge: text("badge"),
  link: text("link"),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  icon: text("icon"),
  features: text("features").array(),
  category: text("category").default("postventa"),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const maintenancePlans = pgTable("maintenance_plans", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: real("price").notNull(),
  features: text("features").array(),
  highlighted: boolean("highlighted").default(false),
  sortOrder: integer("sort_order").default(0),
});

export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value"),
  category: text("category").default("general"),
});

export const sections = pgTable("sections", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pageSlug: text("page_slug").notNull(),
  sectionKey: text("section_key").notNull(),
  title: text("title"),
  subtitle: text("subtitle"),
  content: jsonb("content"),
  imageUrl: text("image_url"),
  active: boolean("active").default(true),
  sortOrder: integer("sort_order").default(0),
});

export const activityLog = pgTable("activity_log", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: varchar("entity_id"),
  details: text("details"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const seoMetadata = pgTable("seo_metadata", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  path: text("path").notNull().unique(),
  entityType: text("entity_type"),
  entityId: varchar("entity_id"),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonical: text("canonical"),
  noindex: boolean("noindex").default(false),
  ogTitle: text("og_title"),
  ogDescription: text("og_description"),
  ogImage: text("og_image"),
  jsonLdType: text("json_ld_type"),
  priority: real("priority").default(0.5),
  changefreq: text("changefreq").default("monthly"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const topicClusters = pgTable("topic_clusters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  pillarTitle: text("pillar_title").notNull(),
  pillarDescription: text("pillar_description"),
  pillarKeywords: text("pillar_keywords"),
  category: text("category"),
  supportingPages: jsonb("supporting_pages").default([]),
  internalLinks: jsonb("internal_links").default([]),
  contentDepth: integer("content_depth").default(0),
  status: text("status").default("draft"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const editorialContent = pgTable("editorial_content", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category"),
  tags: text("tags").array(),
  author: text("author").default("Grupo Avisa"),
  featuredImage: text("featured_image"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  readingTime: integer("reading_time").default(5),
  relatedSlugs: text("related_slugs").array(),
  relatedVehicleType: text("related_vehicle_type"),
});

export const chatbotConversations = pgTable("chatbot_conversations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sessionId: text("session_id").notNull(),
  message: text("message").notNull(),
  response: text("response").notNull(),
  matchedFaqId: varchar("matched_faq_id"),
  intent: text("intent").default("informacional"),
  isMatched: boolean("is_matched").default(false),
  pageUrl: text("page_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChatbotConversationSchema = createInsertSchema(chatbotConversations).omit({ id: true, createdAt: true });

export const insertEditorialContentSchema = createInsertSchema(editorialContent).omit({ id: true, createdAt: true, updatedAt: true });

export const insertSeoMetadataSchema = createInsertSchema(seoMetadata).omit({ id: true, updatedAt: true });
export const insertTopicClusterSchema = createInsertSchema(topicClusters).omit({ id: true, createdAt: true, updatedAt: true });

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertBrandSchema = createInsertSchema(brands).omit({ id: true });
export const insertVehicleSchema = createInsertSchema(vehicles).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true, createdAt: true, updatedAt: true });
export const insertLeadNoteSchema = createInsertSchema(leadNotes).omit({ id: true, createdAt: true });
export const insertWhatsappConversationSchema = createInsertSchema(whatsappConversations).omit({ id: true, createdAt: true });
export const insertPageSchema = createInsertSchema(pages).omit({ id: true });
export const insertDealerSchema = createInsertSchema(dealers).omit({ id: true });
export const insertFaqCategorySchema = createInsertSchema(faqCategories).omit({ id: true });
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });
export const insertTestimonialSchema = createInsertSchema(testimonials).omit({ id: true });
export const insertPromotionSchema = createInsertSchema(promotions).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertMaintenancePlanSchema = createInsertSchema(maintenancePlans).omit({ id: true });
export const insertSiteSettingSchema = createInsertSchema(siteSettings).omit({ id: true });
export const insertSectionSchema = createInsertSchema(sections).omit({ id: true });
export const insertActivityLogSchema = createInsertSchema(activityLog).omit({ id: true, createdAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBrand = z.infer<typeof insertBrandSchema>;
export type Brand = typeof brands.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
export type InsertLeadNote = z.infer<typeof insertLeadNoteSchema>;
export type LeadNote = typeof leadNotes.$inferSelect;
export type InsertWhatsappConversation = z.infer<typeof insertWhatsappConversationSchema>;
export type WhatsappConversation = typeof whatsappConversations.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
export type Page = typeof pages.$inferSelect;
export type InsertDealer = z.infer<typeof insertDealerSchema>;
export type Dealer = typeof dealers.$inferSelect;
export type InsertFaqCategory = z.infer<typeof insertFaqCategorySchema>;
export type FaqCategory = typeof faqCategories.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
export type InsertPromotion = z.infer<typeof insertPromotionSchema>;
export type Promotion = typeof promotions.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;
export type InsertMaintenancePlan = z.infer<typeof insertMaintenancePlanSchema>;
export type MaintenancePlan = typeof maintenancePlans.$inferSelect;
export type InsertSiteSetting = z.infer<typeof insertSiteSettingSchema>;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type InsertSection = z.infer<typeof insertSectionSchema>;
export type Section = typeof sections.$inferSelect;
export type InsertActivityLog = z.infer<typeof insertActivityLogSchema>;
export type ActivityLog = typeof activityLog.$inferSelect;
export type InsertEditorialContent = z.infer<typeof insertEditorialContentSchema>;
export type EditorialContent = typeof editorialContent.$inferSelect;
export type InsertSeoMetadata = z.infer<typeof insertSeoMetadataSchema>;
export type SeoMetadata = typeof seoMetadata.$inferSelect;
export type InsertTopicCluster = z.infer<typeof insertTopicClusterSchema>;
export type TopicCluster = typeof topicClusters.$inferSelect;
export type InsertChatbotConversation = z.infer<typeof insertChatbotConversationSchema>;
export type ChatbotConversation = typeof chatbotConversations.$inferSelect;
