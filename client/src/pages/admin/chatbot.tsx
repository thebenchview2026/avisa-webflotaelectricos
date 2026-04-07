import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChatbotConv {
  id: string;
  sessionId: string;
  message: string;
  response: string;
  intent: string;
  isMatched: boolean;
  pageUrl: string | null;
  createdAt: string;
}

interface ChatbotStats {
  total: number;
  matched: number;
  unmatched: number;
  intents: Record<string, number>;
}

const INTENT_COLORS: Record<string, string> = {
  informacional: "bg-blue-100 text-blue-700",
  comparativa: "bg-purple-100 text-purple-700",
  compra: "bg-green-100 text-green-700",
};

const INTENT_LABELS: Record<string, string> = {
  informacional: "Informacional",
  comparativa: "Comparativa",
  compra: "Compra",
};

export default function AdminChatbot() {
  const { data: stats } = useQuery<ChatbotStats>({
    queryKey: ["/api/admin/chatbot-stats"],
  });

  const { data: conversations = [] } = useQuery<ChatbotConv[]>({
    queryKey: ["/api/admin/chatbot-conversations"],
  });

  const { data: unmatched = [] } = useQuery<ChatbotConv[]>({
    queryKey: ["/api/admin/chatbot-unmatched"],
  });

  function formatDate(d: string) {
    return new Date(d).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-admin-chatbot-title">
            Chatbot Web — Análisis de conversaciones
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Conversaciones del asistente virtual + detección de intención + preguntas sin respuesta para SEO
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-5">
              <p className="text-3xl font-bold text-gray-900" data-testid="text-stat-total">{stats?.total ?? 0}</p>
              <p className="text-sm text-gray-500 mt-1">Total consultas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-3xl font-bold text-green-600" data-testid="text-stat-matched">{stats?.matched ?? 0}</p>
              <p className="text-sm text-gray-500 mt-1">Con respuesta FAQ</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-3xl font-bold text-orange-500" data-testid="text-stat-unmatched">{stats?.unmatched ?? 0}</p>
              <p className="text-sm text-gray-500 mt-1">Sin respuesta → SEO</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-5">
              <p className="text-3xl font-bold text-[#ad023b]" data-testid="text-stat-ratio">
                {stats?.total ? Math.round((stats.matched / stats.total) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Tasa de acierto</p>
            </CardContent>
          </Card>
        </div>

        {/* Intent distribution */}
        {stats?.intents && Object.keys(stats.intents).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Distribución por intención</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(stats.intents).map(([intent, count]) => (
                  <div
                    key={intent}
                    data-testid={`stat-intent-${intent}`}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${INTENT_COLORS[intent] || "bg-gray-100 text-gray-700"}`}
                  >
                    {INTENT_LABELS[intent] || intent}: <span className="font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs defaultValue="unmatched">
          <TabsList>
            <TabsTrigger value="unmatched" data-testid="tab-unmatched">
              Sin respuesta ({unmatched.length})
            </TabsTrigger>
            <TabsTrigger value="all" data-testid="tab-all">
              Todas las conversaciones ({conversations.length})
            </TabsTrigger>
          </TabsList>

          {/* Unmatched — high SEO value */}
          <TabsContent value="unmatched" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base text-orange-600 flex items-center gap-2">
                  <i className="ri-lightbulb-line" aria-hidden="true"></i>
                  Preguntas sin respuesta → Oportunidades SEO
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Estas preguntas no encontraron una FAQ coincidente. Considera crear nuevas FAQs para cubrirlas.
                </p>
              </CardHeader>
              <CardContent>
                {unmatched.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">No hay preguntas sin respuesta aún.</p>
                ) : (
                  <div className="space-y-3">
                    {unmatched.map((conv) => (
                      <div
                        key={conv.id}
                        data-testid={`card-unmatched-${conv.id}`}
                        className="border border-orange-200 bg-orange-50 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">{conv.message}</p>
                            {conv.pageUrl && (
                              <p className="text-xs text-gray-400 mt-1">Página: {conv.pageUrl}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full font-medium ${INTENT_COLORS[conv.intent] || "bg-gray-100 text-gray-600"}`}
                            >
                              {INTENT_LABELS[conv.intent] || conv.intent}
                            </span>
                            <span className="text-xs text-gray-400">{formatDate(conv.createdAt)}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                          <a
                            href={`/admin/faqs?prefill=${encodeURIComponent(conv.message)}`}
                            className="text-xs text-[#ad023b] font-medium hover:underline flex items-center gap-1"
                            data-testid={`link-create-faq-${conv.id}`}
                          >
                            <i className="ri-add-line" aria-hidden="true"></i>
                            Crear FAQ desde esta pregunta
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* All conversations */}
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Historial completo de conversaciones</CardTitle>
              </CardHeader>
              <CardContent>
                {conversations.length === 0 ? (
                  <p className="text-gray-500 text-sm py-4 text-center">No hay conversaciones registradas aún.</p>
                ) : (
                  <div className="space-y-3">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        data-testid={`card-conv-${conv.id}`}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${INTENT_COLORS[conv.intent] || "bg-gray-100 text-gray-600"}`}
                              >
                                {INTENT_LABELS[conv.intent] || conv.intent}
                              </span>
                              <Badge
                                variant={conv.isMatched ? "default" : "secondary"}
                                className={`text-xs ${conv.isMatched ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-orange-100 text-orange-700 hover:bg-orange-100"}`}
                              >
                                {conv.isMatched ? "Con respuesta" : "Sin respuesta"}
                              </Badge>
                              <span className="text-xs text-gray-400 ml-auto">{formatDate(conv.createdAt)}</span>
                            </div>
                            <p className="font-medium text-gray-900 text-sm mb-2">{conv.message}</p>
                            <p className="text-xs text-gray-500 line-clamp-2 bg-gray-50 rounded p-2">{conv.response.slice(0, 200)}{conv.response.length > 200 ? "..." : ""}</p>
                            {conv.pageUrl && (
                              <p className="text-xs text-gray-400 mt-1">
                                <i className="ri-link" aria-hidden="true"></i> {conv.pageUrl}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
