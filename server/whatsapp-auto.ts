import { storage } from "./storage";

export function extractFaqsFromMessages(messages: any[]): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];

  for (let i = 0; i < messages.length - 1; i++) {
    const msg = messages[i];
    const nextMsg = messages[i + 1];

    const text = (msg.text || msg.body || "").trim();
    const nextText = (nextMsg.text || nextMsg.body || "").trim();
    if (!text || !nextText) continue;

    const isQuestion = text.endsWith("?") ||
      /^(cómo|como|cuánto|cuanto|qué|que|dónde|donde|cuándo|cuando|cuál|cual|por qué|porqué|puedo|puede|es posible|hay|tiene|tienen|necesito|se puede|funciona|sirve|vale|cuesta|incluye|ofrece|existe|dispone)/i.test(text);

    const isFromDifferentSender =
      (msg.sender && nextMsg.sender && msg.sender !== nextMsg.sender) ||
      (msg.from && nextMsg.from && msg.from !== nextMsg.from);

    const allSameSender = messages.every(m => (m.sender || "") === (messages[0]?.sender || ""));

    if (isQuestion && (isFromDifferentSender || allSameSender) && nextText.length > 20) {
      const question = text.length > 200 ? text.slice(0, 200) + "..." : text;
      const answer = nextText.length > 2000 ? nextText.slice(0, 2000) + "..." : nextText;

      const isDuplicate = faqs.some(f =>
        f.question.toLowerCase().includes(question.toLowerCase().slice(0, 30))
      );
      if (!isDuplicate) {
        faqs.push({ question, answer });
      }
    }
  }

  return faqs;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

async function isDuplicateFaq(question: string): Promise<boolean> {
  const existing = await storage.getFaqs();
  const normalizedQ = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 40);
  return existing.some(f =>
    f.question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").slice(0, 40) === normalizedQ
  );
}

async function getDefaultCategory(): Promise<string | null> {
  const setting = await storage.getSetting("whatsapp_auto_category");
  if (setting?.value) return setting.value;

  const categories = await storage.getFaqCategories();
  const auto = categories.find(c =>
    c.name.toLowerCase().includes("whatsapp") ||
    c.name.toLowerCase().includes("auto") ||
    c.name.toLowerCase().includes("general")
  );
  return auto?.id || (categories.length > 0 ? categories[0].id : null);
}

export async function autoProcessAndPublishFaqs(
  conversationId: string,
  forceProcess: boolean = false
): Promise<{ created: number; skipped: number; error?: string }> {
  try {
    const conv = await storage.getWhatsappConversation(conversationId);
    if (!conv) return { created: 0, skipped: 0, error: "Conversación no encontrada" };

    if (!forceProcess) {
      const autoEnabled = await storage.getSetting("whatsapp_auto_publish");
      if (autoEnabled?.value !== "true") return { created: 0, skipped: 0, error: "Auto-publicación desactivada" };
    }

    const messages = (conv.messages as any[]) || [];
    const minMessages = parseInt((await storage.getSetting("whatsapp_auto_min_messages"))?.value || "4");
    if (messages.length < minMessages) return { created: 0, skipped: 0, error: `Mínimo ${minMessages} mensajes requeridos (tiene ${messages.length})` };

    const extractedFaqs = extractFaqsFromMessages(messages);
    if (extractedFaqs.length === 0) return { created: 0, skipped: 0, error: "No se encontraron preguntas en la conversación" };

    await storage.updateWhatsappConversation(conversationId, {
      extractedFaqs: extractedFaqs as any,
      status: "processed",
      processedAt: new Date(),
    });

    const categoryId = await getDefaultCategory();
    if (!categoryId) {
      return { created: 0, skipped: extractedFaqs.length, error: "No hay categorías FAQ disponibles. Crea una categoría primero." };
    }

    let created = 0;
    let skipped = 0;

    for (const item of extractedFaqs) {
      try {
        const duplicate = await isDuplicateFaq(item.question);
        if (duplicate) {
          skipped++;
          continue;
        }

        const slug = generateSlug(item.question);
        const existingBySlug = await storage.getFaqs();
        const slugExists = existingBySlug.some(f => f.slug === slug);
        if (slugExists) {
          skipped++;
          continue;
        }

        await storage.createFaq({
          categoryId,
          question: item.question,
          answer: item.answer,
          slug,
          published: true,
          metaTitle: item.question,
          metaDescription: item.answer.slice(0, 160),
        });
        created++;
      } catch (err) {
        console.error(`Error creating FAQ for question "${item.question.slice(0, 50)}":`, err);
        skipped++;
      }
    }

    if (created > 0) {
      await storage.updateWhatsappConversation(conversationId, { status: "approved" });
      await storage.logActivity({
        userId: null,
        action: "auto_create",
        entity: "faq",
        entityId: conversationId,
        details: `Auto-generadas ${created} FAQs desde WhatsApp (${skipped} omitidas por duplicado)`,
      });

      pingGoogleSitemap().catch(err => console.error("Google sitemap ping error:", err));
    }

    return { created, skipped };
  } catch (err) {
    console.error("autoProcessAndPublishFaqs error:", err);
    return { created: 0, skipped: 0, error: "Error interno al procesar conversación" };
  }
}

export async function pingGoogleSitemap(): Promise<{ google: boolean; bing: boolean }> {
  const baseUrl = "https://electricos.grupoavisa.com";
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  let googleOk = false;
  let bingOk = false;

  try {
    const gRes = await fetch(`https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, { method: "GET" });
    googleOk = gRes.ok;
    console.log(`Sitemap ping Google: ${gRes.status} ${googleOk ? "OK" : "FAIL"}`);
  } catch (err) {
    console.error("Google sitemap ping failed:", err);
  }

  try {
    const bRes = await fetch(`https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`, { method: "GET" });
    bingOk = bRes.ok;
    console.log(`Sitemap ping Bing: ${bRes.status} ${bingOk ? "OK" : "FAIL"}`);
  } catch (err) {
    console.error("Bing sitemap ping failed:", err);
  }

  if (googleOk || bingOk) {
    await storage.setSetting("last_sitemap_ping", new Date().toISOString(), "seo");
  }

  return { google: googleOk, bing: bingOk };
}
