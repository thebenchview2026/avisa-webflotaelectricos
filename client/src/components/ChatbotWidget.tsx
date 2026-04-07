import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { CONTACT } from "@/lib/contact";

interface Message {
  role: "user" | "bot";
  text: string;
  faqSlug?: string | null;
}

const SESSION_KEY = "avisa_chat_session";
const QUICK_QUESTIONS = [
  "¿Cuánto cuesta cargar un eléctrico?",
  "¿Qué ayudas hay para comprar un eléctrico?",
  "¿Cuánta autonomía tienen?",
  "¿Qué mantenimiento necesita?",
  "¿Cómo funciona el renting?",
];

function getOrCreateSession(): string {
  let sid = sessionStorage.getItem(SESSION_KEY);
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem(SESSION_KEY, sid);
  }
  return sid;
}

function openWhatsAppPopup(customText?: string) {
  const base = CONTACT.whatsapp;
  const url = customText
    ? `${base}?text=${encodeURIComponent(customText)}`
    : base;
  const popup = window.open(
    url,
    "whatsapp_avisa",
    "width=480,height=720,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no"
  );
  if (!popup || popup.closed || typeof popup.closed === "undefined") {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [waOpen, setWaOpen] = useState(false);
  const [waText, setWaText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "¡Hola! Soy el asistente virtual de Grupo Avisa. ¿En qué puedo ayudarte con tu próximo vehículo eléctrico?",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const waInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    if (waOpen) setTimeout(() => waInputRef.current?.focus(), 100);
  }, [waOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const mutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await apiRequest("POST", "/api/chat", {
        message: text,
        sessionId: getOrCreateSession(),
      });
      return res.json() as Promise<{ reply: string; faqSlug?: string | null }>;
    },
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.reply, faqSlug: data.faqSlug ?? null },
      ]);
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Lo siento, ha ocurrido un error. Por favor inténtalo de nuevo." },
      ]);
    },
  });

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    mutation.mutate(trimmed);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function toggleWa() {
    setWaOpen((v) => !v);
    if (open) setOpen(false);
  }

  function toggleBot() {
    setOpen((v) => !v);
    if (waOpen) setWaOpen(false);
  }

  return (
    <>
      {/* WhatsApp floating button */}
      <button
        onClick={toggleWa}
        data-testid="button-whatsapp-float"
        aria-label={waOpen ? "Cerrar WhatsApp" : "Contactar por WhatsApp"}
        className="fixed bottom-[5.25rem] right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg hover:bg-[#1ebe5d] transition-all duration-200 hover:scale-105"
      >
        <i
          className={`text-white text-2xl transition-all duration-200 ${waOpen ? "ri-close-line" : "ri-whatsapp-line"}`}
          aria-hidden="true"
        ></i>
      </button>

      {/* Chatbot toggle button */}
      <button
        data-testid="button-chatbot-toggle"
        aria-label={open ? "Cerrar asistente" : "Abrir asistente virtual"}
        onClick={toggleBot}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#ad023b] shadow-lg hover:bg-[#8d0230] transition-all duration-200 hover:scale-105"
      >
        <i
          className={`text-white text-2xl transition-all duration-200 ${open ? "ri-close-line" : "ri-robot-line"}`}
          aria-hidden="true"
        ></i>
      </button>

      {/* WhatsApp panel */}
      <div
        data-testid="panel-whatsapp"
        className={`fixed bottom-[9.5rem] right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${
          waOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-hidden={!waOpen}
      >
        {/* WA Header */}
        <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <img
            src="/ana-perez.png"
            alt="Ana - Asesora Grupo Avisa"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30 flex-shrink-0"
            width={40}
            height={40}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight">Ana · Asesora Grupo Avisa</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#25D366] flex-shrink-0"></span>
              <p className="text-xs text-white/80">En línea</p>
            </div>
          </div>
          <button
            onClick={() => setWaOpen(false)}
            aria-label="Cerrar WhatsApp"
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-lg" aria-hidden="true"></i>
          </button>
        </div>

        {/* WA chat area */}
        <div
          className="flex-1 p-4 space-y-3"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23e5ddd5'/%3E%3C/svg%3E\")",
            backgroundSize: "cover",
          }}
        >
          {/* Mensaje de Ana */}
          <div className="flex items-end gap-2">
            <img
              src="/ana-perez.png"
              alt="Ana"
              className="w-7 h-7 rounded-full object-cover flex-shrink-0"
              width={28}
              height={28}
            />
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm max-w-[85%]">
              <p className="text-gray-800 text-sm leading-relaxed">
                ¡Hola! 👋 Soy Ana, asesora de <strong>Grupo Avisa</strong>.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed mt-1">
                Puedo ayudarte a elegir tu próximo vehículo eléctrico o híbrido, tramitar ayudas MOVES y mucho más.
              </p>
              <p className="text-gray-800 text-sm leading-relaxed mt-1">
                ¿En qué te puedo ayudar? 😊
              </p>
              <p className="text-right text-[10px] text-gray-400 mt-1">ahora</p>
            </div>
          </div>
        </div>

        {/* WA input + send */}
        <div className="px-3 py-3 bg-[#f0f0f0] border-t border-gray-200 flex items-end gap-2 flex-shrink-0">
          <textarea
            ref={waInputRef}
            value={waText}
            onChange={(e) => setWaText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                openWhatsAppPopup(waText || undefined);
              }
            }}
            placeholder="Escribe un mensaje…"
            data-testid="input-whatsapp-message"
            rows={1}
            className="flex-1 text-sm bg-white border border-gray-200 rounded-2xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#25D366]/30 resize-none leading-relaxed"
            style={{ maxHeight: "90px", overflowY: "auto" }}
          />
          <button
            onClick={() => openWhatsAppPopup(waText || undefined)}
            data-testid="button-whatsapp-send"
            aria-label="Abrir WhatsApp"
            className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:bg-[#1ebe5d] transition-colors flex-shrink-0 shadow-sm"
          >
            <i className="ri-send-plane-fill text-base" aria-hidden="true"></i>
          </button>
        </div>

        {/* WA footer */}
        <div className="px-4 py-2 bg-[#f0f0f0] border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400">
            <i className="ri-lock-line mr-1" aria-hidden="true"></i>
            Los mensajes están cifrados de extremo a extremo
          </p>
        </div>
      </div>

      {/* Chatbot panel */}
      <div
        data-testid="panel-chatbot"
        className={`fixed bottom-[9.5rem] right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ height: "480px" }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div className="bg-[#ad023b] text-white px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ri-robot-line text-lg" aria-hidden="true"></i>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm leading-tight">Asistente Grupo Avisa</p>
            <p className="text-xs text-white/75">Experto en vehículos eléctricos</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar chat"
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-lg" aria-hidden="true"></i>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-[#ad023b] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                  <i className="ri-robot-line text-white text-xs" aria-hidden="true"></i>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#ad023b] text-white rounded-br-sm"
                    : "bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100"
                }`}
              >
                {msg.text}
                {msg.faqSlug && (
                  <a
                    href={`/preguntas/general/${msg.faqSlug}`}
                    className="block mt-2 text-xs text-[#ad023b] font-medium hover:underline"
                    data-testid={`link-faq-answer-${i}`}
                  >
                    Ver respuesta completa →
                  </a>
                )}
              </div>
            </div>
          ))}

          {mutation.isPending && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-[#ad023b] flex items-center justify-center flex-shrink-0 mr-2 mt-0.5">
                <i className="ri-robot-line text-white text-xs" aria-hidden="true"></i>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick questions */}
        {messages.length === 1 && (
          <div className="px-3 pt-2 pb-1 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-2 font-medium">Preguntas frecuentes:</p>
            <div className="flex flex-wrap gap-1">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  data-testid={`button-quick-q-${q.slice(0, 20).replace(/\s/g, "-")}`}
                  onClick={() => sendMessage(q)}
                  className="text-xs bg-white border border-[#ad023b]/30 text-[#ad023b] px-2 py-1 rounded-full hover:bg-[#ad023b] hover:text-white transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-3 py-3 bg-white border-t border-gray-200 flex items-center gap-2 flex-shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta..."
            data-testid="input-chatbot-message"
            disabled={mutation.isPending}
            className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ad023b]/30 focus:border-[#ad023b] disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={mutation.isPending || !input.trim()}
            data-testid="button-chatbot-send"
            aria-label="Enviar mensaje"
            className="w-9 h-9 rounded-full bg-[#ad023b] text-white flex items-center justify-center hover:bg-[#8d0230] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
          >
            <i className="ri-send-plane-fill text-sm" aria-hidden="true"></i>
          </button>
        </div>

        {/* Footer CTA */}
        <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => { openWhatsAppPopup(); setOpen(false); setWaOpen(true); }}
            data-testid="link-chatbot-whatsapp"
            className="flex items-center gap-1.5 text-xs text-[#25D366] font-medium hover:underline"
          >
            <i className="ri-whatsapp-line" aria-hidden="true"></i>
            Hablar con un asesor
          </button>
          <a
            href={`tel:${CONTACT.phone}`}
            data-testid="link-chatbot-phone"
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#ad023b] transition-colors"
          >
            <i className="ri-phone-line" aria-hidden="true"></i>
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </>
  );
}
