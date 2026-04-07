import { NextResponse } from "next/server";
import { storage } from "@server/storage";

export async function POST(request: Request) {
  try {
    const { message, sessionId, pageUrl } = await request.json();
    if (!message || !sessionId) {
      return NextResponse.json({ error: "message y sessionId son requeridos" }, { status: 400 });
    }

    const allFaqs = await storage.getFaqs();
    const publishedFaqs = allFaqs.filter((f: any) => f.published);

    const messageLower = message.toLowerCase();
    let intent = "informacional";
    if (messageLower.match(/comprar?|precio|oferta|promo|descuento|financiar?|cuota|mensual/)) intent = "compra";
    else if (messageLower.match(/comparar?|mejor|diferencia|vs|versus|entre/)) intent = "comparativa";

    const matched = publishedFaqs.find((f: any) => {
      const q = f.question?.toLowerCase() || "";
      const a = f.answer?.toLowerCase() || "";
      const words = messageLower.split(/\s+/).filter((w: string) => w.length > 3);
      const score = words.filter((w: string) => q.includes(w) || a.includes(w)).length;
      return score >= 2;
    });

    let response: string;
    let isMatched = false;
    let matchedFaq = matched;

    if (matched) {
      isMatched = true;
      const plainAnswer = matched.answer.replace(/\*\*/g, "").replace(/\n\n/g, " ").trim().slice(0, 600);
      response = plainAnswer + `\n\n[Ver respuesta completa →](/preguntas/general/${matched.slug})`;
    } else {
      const fallbacks: Record<string, string> = {
        compra: "Para obtener precio y disponibilidad personalizada, nuestro equipo de Grupo Avisa está disponible ahora mismo. ¿Prefieres que te llamemos, o contactas por WhatsApp?",
        comparativa: "Tenemos una sección completa de comparativas entre modelos eléctricos e híbridos. Puedes verla en /comparativas o contactarnos para una recomendación personalizada.",
        informacional: "No he encontrado una respuesta exacta a tu pregunta en nuestra base de datos. Te puedo poner en contacto con nuestro equipo de especialistas en vehículos eléctricos.",
      };
      response = fallbacks[intent] || fallbacks.informacional;
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

    return NextResponse.json({ response, isMatched, intent, faqSlug: matchedFaq?.slug || null });
  } catch (err) {
    console.error("Chatbot error:", err);
    return NextResponse.json({ error: "Error procesando mensaje" }, { status: 500 });
  }
}
