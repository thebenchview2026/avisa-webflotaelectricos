"use client";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SeoMetadata } from "@shared/schema";

interface EnrichedSeo extends SeoMetadata {
  displayTitle: string;
  typeLabel: string;
}

const typeColors: Record<string, string> = {
  vehicle: "bg-blue-100 text-blue-700",
  static: "bg-gray-100 text-gray-700",
  faq: "bg-purple-100 text-purple-700",
  faq_category: "bg-purple-100 text-purple-700",
  dealer: "bg-orange-100 text-orange-700",
  page: "bg-green-100 text-green-700",
};

const typeLabels: Record<string, string> = {
  vehicle: "Vehículo",
  static: "Página",
  faq: "FAQ",
  faq_category: "FAQ Cat.",
  dealer: "Concesionario",
  page: "Contenido",
};

const tabFilters = [
  { key: "all", label: "Todas" },
  { key: "vehicle", label: "Vehículos" },
  { key: "static", label: "Promociones SEO" },
  { key: "page", label: "Contenido SEO" },
  { key: "dealer", label: "Concesionarios" },
  { key: "faq", label: "FAQ" },
];

export default function AdminSeo() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    path: "", metaTitle: "", metaDescription: "", canonical: "",
    noindex: false, ogTitle: "", ogDescription: "", ogImage: "",
    jsonLdType: "WebPage", entityType: "", entityId: "",
  });

  const { data: seoList = [], isLoading } = useQuery<EnrichedSeo[]>({
    queryKey: ["/api/admin/seo-full-list"],
  });

  const syncMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/seo-sync-urls"),
    onSuccess: async (res: any) => {
      const data = await res.json?.() || res;
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-full-list"] });
      toast({ title: "URLs sincronizadas", description: `${data.synced || 0} nuevas URLs añadidas. Total: ${data.total || 0}` });
    },
    onError: () => toast({ title: "Error al sincronizar", variant: "destructive" }),
  });

  const autoGenMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/seo-auto-generate"),
    onSuccess: async (res: any) => {
      const data = await res.json?.() || res;
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-full-list"] });
      toast({ title: "SEO generado", description: `${data.updated || 0} entradas actualizadas` });
    },
    onError: () => toast({ title: "Error al generar SEO", variant: "destructive" }),
  });

  const submitSearchEngines = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/submit-search-engines"),
    onSuccess: () => toast({ title: "Sitemap enviado", description: "Sitemap enviado a Google y Bing correctamente" }),
    onError: () => toast({ title: "Error al enviar", variant: "destructive" }),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/seo-metadata", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-full-list"] });
      toast({ title: "Metadata SEO creada" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiRequest("PUT", `/api/admin/seo-metadata/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-full-list"] });
      toast({ title: "Metadata actualizada" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/seo-metadata/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-full-list"] });
      toast({ title: "Eliminada" });
    },
  });

  function resetForm() {
    setForm({ path: "", metaTitle: "", metaDescription: "", canonical: "", noindex: false, ogTitle: "", ogDescription: "", ogImage: "", jsonLdType: "WebPage", entityType: "", entityId: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(item: EnrichedSeo) {
    setForm({
      path: item.path, metaTitle: item.metaTitle || "", metaDescription: item.metaDescription || "",
      canonical: item.canonical || "", noindex: item.noindex || false, ogTitle: item.ogTitle || "",
      ogDescription: item.ogDescription || "", ogImage: item.ogImage || "",
      jsonLdType: item.jsonLdType || "WebPage", entityType: item.entityType || "", entityId: item.entityId || "",
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: form });
    } else {
      createMutation.mutate(form);
    }
  }

  function downloadFile(url: string, filename: string) {
    fetch(url, { credentials: "include" })
      .then(r => r.text())
      .then(text => {
        const blob = new Blob([text], { type: "text/plain" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch(() => toast({ title: "Error al descargar", variant: "destructive" }));
  }

  const filteredList = activeTab === "all"
    ? seoList
    : seoList.filter(s => {
        if (activeTab === "faq") return s.typeLabel === "faq" || s.typeLabel === "faq_category";
        if (activeTab === "static") return s.typeLabel === "static";
        return s.typeLabel === activeTab;
      });

  const tabCounts = {
    all: seoList.length,
    vehicle: seoList.filter(s => s.typeLabel === "vehicle").length,
    static: seoList.filter(s => s.typeLabel === "static").length,
    page: seoList.filter(s => s.typeLabel === "page").length,
    dealer: seoList.filter(s => s.typeLabel === "dealer").length,
    faq: seoList.filter(s => s.typeLabel === "faq" || s.typeLabel === "faq_category").length,
  };

  const titleLen = form.metaTitle.length;
  const descLen = form.metaDescription.length;

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-seo-page">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-seo-title">SEO</h1>
            <p className="text-gray-500 mt-1">Gestiona los metadatos de posicionamiento</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => autoGenMutation.mutate()}
              disabled={autoGenMutation.isPending}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2 text-sm"
              data-testid="button-auto-generate"
            >
              <i className="ri-magic-line"></i>
              {autoGenMutation.isPending ? "Generando..." : "Generar SEO automático"}
            </button>
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncMutation.isPending}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
              data-testid="button-sync-urls"
            >
              <i className="ri-refresh-line"></i>
              {syncMutation.isPending ? "Sincronizando..." : "Sincronizar URLs"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <i className="ri-file-code-line text-[#ad023b]"></i>
              Archivos SEO
            </h2>
            <span className="text-xs text-gray-400">Genera y descarga los archivos para buscadores e IAs. Sitemaps, metadatos y descripción.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-sitemap-line text-lg text-emerald-600"></i>
                <div>
                  <div className="font-medium text-sm">sitemap.xml</div>
                  <div className="text-xs text-gray-400">v1.0 • Sitemaps</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Crea un mapa del sitio para buscadores con todas tus páginas estáticas, vehículos y categorías.</p>
              <a href="/sitemap.xml" target="_blank" rel="noopener"
                className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 border rounded px-3 py-1.5 hover:bg-gray-50"
                data-testid="link-download-sitemap">
                <i className="ri-download-2-line"></i> Descargar
              </a>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-braces-line text-lg text-blue-600"></i>
                <div>
                  <div className="font-medium text-sm">ai-hints.json</div>
                  <div className="text-xs text-gray-400">v1.0 • Contenido</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Información estructurada para bots de IA: descripción, vehículos y preguntas del contenido publicado.</p>
              <button onClick={() => downloadFile("/api/admin/ai-hints.json", "ai-hints.json")}
                className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 border rounded px-3 py-1.5 hover:bg-gray-50"
                data-testid="button-download-aihints">
                <i className="ri-download-2-line"></i> Descargar
              </button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-robot-2-line text-lg text-purple-600"></i>
                <div>
                  <div className="font-medium text-sm">llms.txt</div>
                  <div className="text-xs text-gray-400">v1.0 • LLMs</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Contenido en texto plano y descripción del sitio para LLMs, crawlers e indexadores frecuentes.</p>
              <button onClick={() => downloadFile("/api/admin/llms.txt", "llms.txt")}
                className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-800 border rounded px-3 py-1.5 hover:bg-gray-50"
                data-testid="button-download-llms">
                <i className="ri-download-2-line"></i> Descargar
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <i className="ri-send-plane-line text-[#ad023b]"></i>
              Enviar a buscadores
            </h2>
            <button
              onClick={() => submitSearchEngines.mutate()}
              disabled={submitSearchEngines.isPending}
              className="bg-[#ad023b] text-white px-4 py-2 rounded-lg hover:bg-[#8d0230] flex items-center gap-2 text-sm"
              data-testid="button-submit-all"
            >
              <i className="ri-send-plane-line"></i>
              {submitSearchEngines.isPending ? "Enviando..." : "Enviar a todos"}
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-4">Notifica a Google y Bing para indexar tu contenido actualizado. Sitemap, ping de indexación y validaciones.</p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 flex items-start gap-2">
            <i className="ri-shield-check-line text-emerald-600 mt-0.5"></i>
            <div className="text-xs text-emerald-800">
              <strong>Requisito previo:</strong> Para la verificación debes configurar previamente tu dominio en{" "}
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener" className="underline">Google Search Console</a> y{" "}
              <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener" className="underline">Bing Webmaster Tools</a>. Con la verificación, los buscadores recibirán la notificación para que indexen tu sitio y lo muestren lo antes posible.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <a href="https://search.google.com/search-console" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              data-testid="link-google-console">
              <i className="ri-google-line"></i> Abrir Google Search Console <i className="ri-external-link-line text-xs"></i>
            </a>
            <a href="https://www.bing.com/webmasters" target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
              data-testid="link-bing-webmaster">
              <i className="ri-edge-new-line"></i> Abrir Bing Webmaster Tools <i className="ri-external-link-line text-xs"></i>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-google-line text-lg"></i>
                <div>
                  <div className="font-medium text-sm">Google Search Console</div>
                  <div className="text-xs text-gray-400">Estado: Conectado</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Envía un ping para notificar que el sitemap ha sido actualizado. Asegura que tu dominio está verificado en Search Console para que esto funcione.</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value="https://electricos.grupoavisa.com/sitemap.xml"
                  className="flex-1 border rounded px-3 py-1.5 text-xs bg-gray-50 text-gray-600" />
                <button
                  onClick={() => submitSearchEngines.mutate()}
                  disabled={submitSearchEngines.isPending}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs hover:bg-blue-700 flex items-center gap-1 whitespace-nowrap"
                  data-testid="button-ping-google">
                  <i className="ri-send-plane-line"></i> Enviar a Google
                </button>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className="ri-edge-new-line text-lg"></i>
                <div>
                  <div className="font-medium text-sm">Bing Webmaster Tools</div>
                  <div className="text-xs text-gray-400">Estado: Conectado</div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3">Envía la URL del sitemap a Bing para la indexación inmediata. Asegura que tu dominio está verificado en Bing Webmaster Tools.</p>
              <div className="flex items-center gap-2">
                <input type="text" readOnly value="https://electricos.grupoavisa.com/sitemap.xml"
                  className="flex-1 border rounded px-3 py-1.5 text-xs bg-gray-50 text-gray-600" />
                <button
                  onClick={() => submitSearchEngines.mutate()}
                  disabled={submitSearchEngines.isPending}
                  className="bg-teal-600 text-white px-3 py-1.5 rounded text-xs hover:bg-teal-700 flex items-center gap-1 whitespace-nowrap"
                  data-testid="button-ping-bing">
                  <i className="ri-send-plane-line"></i> Enviar a Bing
                </button>
              </div>
            </div>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4" data-testid="form-seo">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{editingId ? "Editar metadata SEO" : "Nueva metadata SEO"}</h3>
              <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600"><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ruta (path) *</label>
                <input type="text" value={form.path} onChange={e => setForm({ ...form, path: e.target.value })}
                  placeholder="ej: / o /electrificacion" className="w-full border rounded-lg px-3 py-2" required
                  disabled={!!editingId} data-testid="input-seo-path" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo JSON-LD</label>
                <select value={form.jsonLdType} onChange={e => setForm({ ...form, jsonLdType: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2" data-testid="select-seo-jsonld">
                  <option value="WebPage">WebPage</option>
                  <option value="Product">Product</option>
                  <option value="FAQPage">FAQPage</option>
                  <option value="Organization">Organization</option>
                  <option value="LocalBusiness">LocalBusiness</option>
                  <option value="Article">Article</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Title <span className={`text-xs ${titleLen > 60 ? "text-red-500" : titleLen > 50 ? "text-orange-500" : "text-green-600"}`}>({titleLen}/60)</span>
              </label>
              <input type="text" value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })}
                placeholder="Título para buscadores" className="w-full border rounded-lg px-3 py-2" data-testid="input-seo-title" />
              {titleLen > 0 && (
                <div className="mt-2 p-3 bg-gray-50 rounded border">
                  <div className="text-blue-700 text-sm font-medium truncate">{form.metaTitle || "Sin título"}</div>
                  <div className="text-green-700 text-xs">https://electricos.grupoavisa.com{form.path}</div>
                  <div className="text-gray-600 text-xs mt-1 line-clamp-2">{form.metaDescription || "Sin descripción..."}</div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meta Description <span className={`text-xs ${descLen > 160 ? "text-red-500" : descLen > 140 ? "text-orange-500" : "text-green-600"}`}>({descLen}/160)</span>
              </label>
              <textarea value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })}
                placeholder="Descripción para buscadores" className="w-full border rounded-lg px-3 py-2" rows={2} data-testid="input-seo-description" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Canónica</label>
                <input type="text" value={form.canonical} onChange={e => setForm({ ...form, canonical: e.target.value })}
                  placeholder="URL canónica (opcional)" className="w-full border rounded-lg px-3 py-2" data-testid="input-seo-canonical" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                <input type="text" value={form.ogImage} onChange={e => setForm({ ...form, ogImage: e.target.value })}
                  placeholder="URL de imagen para redes sociales" className="w-full border rounded-lg px-3 py-2" data-testid="input-seo-ogimage" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.noindex} onChange={e => setForm({ ...form, noindex: e.target.checked })}
                  className="rounded accent-[#ad023b]" data-testid="input-seo-noindex" />
                <span className="text-sm">Marcar como noindex (no indexar en buscadores)</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-[#ad023b] text-white px-6 py-2 rounded-lg hover:bg-[#8d0230]"
                disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-seo">
                {(createMutation.isPending || updateMutation.isPending) ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300" data-testid="button-cancel-seo">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="flex items-center gap-1 border-b overflow-x-auto">
          {tabFilters.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.key
                  ? "border-[#ad023b] text-[#ad023b]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              data-testid={`tab-${tab.key}`}
            >
              {tab.label} ({tabCounts[tab.key as keyof typeof tabCounts] || 0})
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-gray-500">Cargando...</div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white rounded-lg border p-8 text-center text-gray-500">
            <i className="ri-search-line text-4xl mb-2 block"></i>
            <p>No hay metadatos SEO configurados todavía</p>
            <p className="text-sm mt-1">Usa "Sincronizar URLs" para generar entradas automáticamente desde tu contenido</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm" data-testid="table-seo">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Meta Title</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">Meta Description</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Robots</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Estado</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-600">Modificado</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredList.map((item) => {
                  const tColor = typeColors[item.typeLabel] || "bg-gray-100 text-gray-700";
                  const tLabel = typeLabels[item.typeLabel] || item.typeLabel || "Página";
                  const isComplete = !!(item.metaTitle && item.metaDescription);
                  const robotsLabel = item.noindex ? "noindex, follow" : "index, follow";
                  const modDate = item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }) : "—";
                  const modTime = item.updatedAt ? new Date(item.updatedAt).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) : "";
                  return (
                    <tr key={item.id} className="hover:bg-gray-50" data-testid={`row-seo-${item.id}`}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 text-xs truncate max-w-[160px]" title={item.path}>{item.path}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${tColor}`}>{tLabel}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-700 truncate max-w-[200px]">
                          {item.metaTitle || <span className="text-gray-300 italic">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs text-gray-500 truncate max-w-[220px]">
                          {item.metaDescription || <span className="text-gray-300 italic">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs ${item.noindex ? "text-orange-600" : "text-green-600"}`}>{robotsLabel}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {isComplete ? (
                          <span className="text-xs text-emerald-600 flex items-center justify-center gap-1">
                            <i className="ri-checkbox-circle-line"></i> Configurado
                          </span>
                        ) : item.metaTitle || item.metaDescription ? (
                          <span className="text-xs text-yellow-600 flex items-center justify-center gap-1">
                            <i className="ri-error-warning-line"></i> Parcial
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Sin configurar</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="text-xs text-gray-500">{modDate}</div>
                        <div className="text-xs text-gray-400">{modTime}</div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(item)}
                            className="text-blue-600 hover:bg-blue-50 px-2 py-1 rounded text-xs flex items-center gap-1"
                            data-testid={`button-edit-seo-${item.id}`}>
                            <i className="ri-search-eye-line"></i> SEO
                          </button>
                          <button onClick={() => startEdit(item)}
                            className="text-[#ad023b] hover:bg-red-50 px-2 py-1 rounded text-xs flex items-center gap-1"
                            data-testid={`button-edit-full-${item.id}`}>
                            <i className="ri-edit-line"></i> Editar SEO
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
