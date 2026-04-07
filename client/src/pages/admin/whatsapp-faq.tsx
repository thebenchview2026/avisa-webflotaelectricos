"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { FaqCategory } from "@shared/schema";

interface WhatsappConversation {
  id: string;
  phoneNumber: string | null;
  contactName: string | null;
  messages: any[];
  extractedFaqs: { question: string; answer: string }[];
  status: string;
  processedAt: string | null;
  createdAt: string;
}

interface AutoSettings {
  autoPublish: string;
  autoCategory: string;
  autoMinMessages: string;
  lastSitemapPing: string | null;
}

const statusLabels: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: "ri-time-line" },
  processed: { label: "Procesado", color: "bg-blue-100 text-blue-800", icon: "ri-magic-line" },
  approved: { label: "Publicado", color: "bg-green-100 text-green-800", icon: "ri-check-double-line" },
};

export default function AdminWhatsappFaqPage() {
  const { toast } = useToast();
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [selectedFaqs, setSelectedFaqs] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPasteDialog, setShowPasteDialog] = useState(false);
  const [pasteText, setPasteText] = useState("");

  const { data: conversations = [], isLoading } = useQuery<WhatsappConversation[]>({
    queryKey: ["/api/admin/whatsapp-conversations"],
  });

  const { data: categories = [] } = useQuery<FaqCategory[]>({
    queryKey: ["/api/admin/faq-categories"],
  });

  const { data: autoSettings } = useQuery<AutoSettings>({
    queryKey: ["/api/admin/whatsapp-auto-settings"],
  });

  const saveAutoSettings = useMutation({
    mutationFn: (data: Partial<AutoSettings>) => apiRequest("PUT", "/api/admin/whatsapp-auto-settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-auto-settings"] });
      toast({ title: "Configuración guardada" });
    },
  });

  const pingSitemap = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/ping-sitemap"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-auto-settings"] });
      toast({ title: "Sitemap enviado a Google y Bing" });
    },
    onError: () => toast({ title: "Error al enviar sitemap", variant: "destructive" }),
  });

  const processConv = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/admin/whatsapp-conversations/${id}/process`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-conversations"] });
      toast({ title: "Conversación procesada", description: "Se han extraído las preguntas y respuestas." });
    },
  });

  const autoProcessConv = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/admin/whatsapp-conversations/${id}/auto-process`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-conversations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
      toast({ title: "Auto-procesado completado", description: "FAQs creadas y publicadas automáticamente." });
    },
    onError: () => toast({ title: "Error", variant: "destructive" }),
  });

  const approveConv = useMutation({
    mutationFn: ({ id, faqIndices, categoryId }: { id: string; faqIndices: number[]; categoryId: string }) =>
      apiRequest("POST", `/api/admin/whatsapp-conversations/${id}/approve`, { faqIndices, categoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-conversations"] });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs"] });
      toast({ title: "FAQs creadas" });
      setSelectedConv(null);
      setSelectedFaqs([]);
    },
  });

  const deleteConv = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/whatsapp-conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-conversations"] });
      toast({ title: "Conversación eliminada" });
    },
  });

  const importPaste = useMutation({
    mutationFn: (text: string) => {
      const lines = text.split("\n").filter(l => l.trim());
      const messages: any[] = [];
      let currentSender = "";

      for (const line of lines) {
        const match = line.match(/^\[?(\d{1,2}[/:]\d{1,2}[/:]\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?)\]?\s*-?\s*([^:]+):\s*(.+)/);
        if (match) {
          const sender = match[3].trim();
          const text = match[4].trim();
          if (sender !== currentSender) currentSender = sender;
          messages.push({
            from: sender,
            sender: messages.length === 0 || sender === messages[0]?.from ? "customer" : "business",
            text,
            timestamp: new Date().toISOString(),
          });
        } else if (line.trim() && messages.length > 0) {
          messages[messages.length - 1].text += "\n" + line.trim();
        }
      }

      return apiRequest("POST", "/api/admin/whatsapp-conversations", {
        phoneNumber: messages[0]?.from || "manual",
        contactName: "Importación manual",
        messages,
        status: "pending",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/whatsapp-conversations"] });
      toast({ title: "Conversación importada" });
      setShowPasteDialog(false);
      setPasteText("");
    },
  });

  const selectedConversation = conversations.find(c => c.id === selectedConv);
  const isAutoEnabled = autoSettings?.autoPublish === "true";
  const totalAutoCreated = conversations.filter(c => c.status === "approved").length;
  const totalPending = conversations.filter(c => c.status === "pending").length;

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="page-admin-whatsapp-faq">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">
              <i className="ri-whatsapp-line text-green-600 mr-2"></i>
              WhatsApp → FAQ Automático
            </h1>
            <p className="text-gray-500 mt-1">Las conversaciones se procesan automáticamente, generan FAQs publicadas y se envían al sitemap de Google.</p>
          </div>
          <button
            onClick={() => setShowPasteDialog(true)}
            className="bg-[#ad023b] text-white px-4 py-2 rounded-lg hover:bg-[#8d0230] transition-colors flex items-center gap-2"
            data-testid="button-import-manual"
          >
            <i className="ri-clipboard-line"></i>
            Importar conversación
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-500">Conversaciones</div>
            <div className="text-2xl font-bold">{conversations.length}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-500">Pendientes</div>
            <div className="text-2xl font-bold text-yellow-600">{totalPending}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="text-sm text-gray-500">FAQs auto-generadas</div>
            <div className="text-2xl font-bold text-green-600">{totalAutoCreated}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <i className={`ri-robot-line ${isAutoEnabled ? "text-green-600" : "text-gray-400"}`}></i>
              Auto-publicación
            </div>
            <div className={`text-2xl font-bold ${isAutoEnabled ? "text-green-600" : "text-gray-400"}`}>
              {isAutoEnabled ? "Activo" : "Inactivo"}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-robot-line text-[#ad023b]"></i>
              Automatización WhatsApp → FAQ → Sitemap → Google
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">Auto-publicar FAQs</div>
                  <div className="text-xs text-gray-500">Genera y publica FAQs automáticamente desde conversaciones</div>
                </div>
                <button
                  onClick={() => saveAutoSettings.mutate({ autoPublish: isAutoEnabled ? "false" : "true" })}
                  className={`relative w-12 h-6 rounded-full transition-colors ${isAutoEnabled ? "bg-green-500" : "bg-gray-300"}`}
                  data-testid="toggle-auto-publish"
                >
                  <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${isAutoEnabled ? "translate-x-6" : "translate-x-0.5"}`}></div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría por defecto</label>
                <select
                  value={autoSettings?.autoCategory || ""}
                  onChange={e => saveAutoSettings.mutate({ autoCategory: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  data-testid="select-auto-category"
                >
                  <option value="">Auto-detectar</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mínimo mensajes para procesar</label>
                <input
                  type="number" min="2" max="20"
                  value={autoSettings?.autoMinMessages || "4"}
                  onChange={e => saveAutoSettings.mutate({ autoMinMessages: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  data-testid="input-auto-min-messages"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs font-medium text-gray-700 mb-1">Flujo automático:</div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">WhatsApp</span>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">Extracción Q&A</span>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">FAQ publicada</span>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded">Sitemap</span>
                  <i className="ri-arrow-right-s-line"></i>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded">Google</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-5">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-google-line text-[#ad023b]"></i>
              Indexación y Sitemap
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-3 py-2 rounded-lg text-xs font-mono flex-1" data-testid="text-webhook-url">
                  POST {window.location.origin}/api/webhooks/whatsapp
                </code>
                <button
                  onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/api/webhooks/whatsapp`); toast({ title: "URL copiada" }); }}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg"
                  data-testid="button-copy-webhook"
                >
                  <i className="ri-file-copy-line"></i>
                </button>
              </div>

              <div className="flex gap-2">
                <a href="/sitemap.xml" target="_blank" rel="noopener"
                  className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg flex-1 justify-center"
                  data-testid="link-sitemap">
                  <i className="ri-sitemap-line"></i> Ver sitemap.xml
                </a>
                <button
                  onClick={() => pingSitemap.mutate()}
                  disabled={pingSitemap.isPending}
                  className="inline-flex items-center gap-2 text-sm bg-[#ad023b] text-white hover:bg-[#8d0230] px-3 py-2 rounded-lg flex-1 justify-center"
                  data-testid="button-ping-sitemap"
                >
                  <i className="ri-send-plane-line"></i>
                  {pingSitemap.isPending ? "Enviando..." : "Enviar sitemap a Google"}
                </button>
              </div>

              {autoSettings?.lastSitemapPing && (
                <div className="text-xs text-gray-400">
                  <i className="ri-time-line mr-1"></i>
                  Último ping: {new Date(autoSettings.lastSitemapPing).toLocaleString("es-ES")}
                </div>
              )}

              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <strong>Automatización activa:</strong> Cada vez que se crean FAQs (manual o automáticamente), el sitemap se actualiza y se envía un ping a Google y Bing para que re-indexen las nuevas páginas.
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                Conversaciones ({conversations.length})
              </h2>
            </div>
            {isLoading ? (
              <div className="p-8 text-center text-gray-400">Cargando...</div>
            ) : conversations.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <i className="ri-chat-3-line text-4xl mb-2 block"></i>
                <p>No hay conversaciones todavía.</p>
                <p className="text-sm mt-1">Llegarán automáticamente por webhook o puedes importar manualmente.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                {conversations.map(conv => {
                  const st = statusLabels[conv.status] || statusLabels.pending;
                  return (
                    <div
                      key={conv.id}
                      onClick={() => setSelectedConv(conv.id)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConv === conv.id ? "bg-blue-50 border-l-4 border-[#ad023b]" : ""}`}
                      data-testid={`conv-item-${conv.id}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-gray-900 text-sm">
                          {conv.contactName || conv.phoneNumber || "Desconocido"}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${st.color}`}>
                          <i className={st.icon}></i> {st.label}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-3">
                        <span><i className="ri-message-2-line mr-1"></i>{(conv.messages as any[])?.length || 0} mensajes</span>
                        <span><i className="ri-question-line mr-1"></i>{(conv.extractedFaqs as any[])?.length || 0} FAQs</span>
                        <span>{new Date(conv.createdAt).toLocaleDateString("es-ES")}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            {!selectedConversation ? (
              <div className="p-8 text-center text-gray-400">
                <i className="ri-arrow-left-line text-4xl mb-2 block"></i>
                <p>Selecciona una conversación para ver los detalles</p>
              </div>
            ) : (
              <div>
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">
                    {selectedConversation.contactName || selectedConversation.phoneNumber}
                  </h2>
                  <div className="flex items-center gap-2">
                    {selectedConversation.status === "pending" && (
                      <>
                        <button
                          onClick={() => processConv.mutate(selectedConversation.id)}
                          disabled={processConv.isPending}
                          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-1"
                          data-testid="button-process-conv"
                        >
                          <i className="ri-magic-line"></i>
                          {processConv.isPending ? "..." : "Extraer FAQs"}
                        </button>
                        <button
                          onClick={() => autoProcessConv.mutate(selectedConversation.id)}
                          disabled={autoProcessConv.isPending}
                          className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-1"
                          data-testid="button-auto-process-conv"
                        >
                          <i className="ri-robot-line"></i>
                          {autoProcessConv.isPending ? "..." : "Auto-publicar"}
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { deleteConv.mutate(selectedConversation.id); setSelectedConv(null); }}
                      className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      data-testid="button-delete-conv"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>

                {selectedConversation.status !== "pending" && (selectedConversation.extractedFaqs as any[])?.length > 0 && (
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                      <i className="ri-lightbulb-line text-yellow-500"></i>
                      FAQs Extraídas ({(selectedConversation.extractedFaqs as any[]).length})
                      {selectedConversation.status === "approved" && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Publicadas</span>
                      )}
                    </h3>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {(selectedConversation.extractedFaqs as any[]).map((faq: any, idx: number) => (
                        <label
                          key={idx}
                          className={`block p-3 rounded-lg border cursor-pointer transition-colors ${selectedFaqs.includes(idx) ? "border-[#ad023b] bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
                          data-testid={`faq-extract-${idx}`}
                        >
                          <div className="flex items-start gap-2">
                            {selectedConversation.status === "processed" && (
                              <input
                                type="checkbox"
                                checked={selectedFaqs.includes(idx)}
                                onChange={() => setSelectedFaqs(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx])}
                                className="mt-1 accent-[#ad023b]"
                              />
                            )}
                            <div>
                              <p className="font-medium text-sm text-gray-900">{faq.question}</p>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer}</p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>

                    {selectedConversation.status === "processed" && (
                      <div className="mt-4 flex items-center gap-3">
                        <select
                          value={selectedCategory}
                          onChange={e => setSelectedCategory(e.target.value)}
                          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1"
                          data-testid="select-faq-category"
                        >
                          <option value="">Sin categoría</option>
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                        <button
                          onClick={() => {
                            const indices = selectedFaqs.length > 0 ? selectedFaqs : (selectedConversation.extractedFaqs as any[]).map((_: any, i: number) => i);
                            approveConv.mutate({ id: selectedConversation.id, faqIndices: indices, categoryId: selectedCategory });
                          }}
                          disabled={approveConv.isPending}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center gap-1 whitespace-nowrap"
                          data-testid="button-approve-faqs"
                        >
                          <i className="ri-check-line"></i>
                          {approveConv.isPending ? "Guardando..." : `Publicar ${selectedFaqs.length || (selectedConversation.extractedFaqs as any[]).length} FAQs`}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="p-4 max-h-[400px] overflow-y-auto space-y-2">
                  <h3 className="font-medium text-gray-700 text-sm mb-2">Mensajes de la conversación</h3>
                  {((selectedConversation.messages as any[]) || []).map((msg: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg text-sm max-w-[85%] ${msg.sender === "customer" ? "bg-gray-100 text-gray-800" : "bg-green-50 text-green-900 ml-auto"}`}
                    >
                      <div className="text-xs text-gray-500 mb-0.5">{msg.sender === "customer" ? "Cliente" : "Avisa"}</div>
                      <p>{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showPasteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-testid="dialog-import">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Importar conversación de WhatsApp</h3>
              <button onClick={() => setShowPasteDialog(false)} className="text-gray-400 hover:text-gray-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <p className="text-sm text-gray-500 mb-3">
                Pega el texto exportado de WhatsApp. El formato esperado es el estándar de exportación:
              </p>
              <pre className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 mb-3">
                [12/03/2024, 10:30] Cliente: ¿Cuánto cuesta el ID.3?{"\n"}
                [12/03/2024, 10:32] Avisa: El ID.3 desde 399€/mes...
              </pre>
              <textarea
                value={pasteText}
                onChange={e => setPasteText(e.target.value)}
                placeholder="Pega aquí la conversación exportada de WhatsApp..."
                className="w-full h-64 border border-gray-300 rounded-lg p-3 text-sm resize-none focus:ring-2 focus:ring-[#ad023b] focus:border-[#ad023b] outline-none"
                data-testid="textarea-paste"
              />
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowPasteDialog(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                Cancelar
              </button>
              <button
                onClick={() => importPaste.mutate(pasteText)}
                disabled={!pasteText.trim() || importPaste.isPending}
                className="bg-[#ad023b] text-white px-4 py-2 rounded-lg hover:bg-[#8d0230] transition-colors disabled:opacity-50 flex items-center gap-2"
                data-testid="button-confirm-import"
              >
                <i className="ri-upload-2-line"></i>
                {importPaste.isPending ? "Importando..." : "Importar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
