"use client";
import { useState, useMemo, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { TopicCluster } from "@shared/schema";

interface TopicalPage {
  url: string;
  type: "Comparativa" | "Pilar" | "Guía" | "FAQ";
  title: string;
  pilar: string;
  status: string;
  clusterId: string;
  pageIndex?: number;
}

const typeColors: Record<string, string> = {
  Comparativa: "bg-orange-100 text-orange-700",
  Pilar: "bg-teal-100 text-teal-700",
  "Guía": "bg-blue-100 text-blue-700",
  FAQ: "bg-purple-100 text-purple-700",
};

const statusColors: Record<string, string> = {
  Publicado: "bg-green-100 text-green-700",
  Borrador: "bg-gray-100 text-gray-600",
  Archivado: "bg-orange-100 text-orange-700",
};

function mapPageType(t: string): "Comparativa" | "Pilar" | "Guía" | "FAQ" {
  const lower = t.toLowerCase();
  if (lower === "comparison" || lower === "comparativa") return "Comparativa";
  if (lower === "guide" || lower === "guia" || lower === "guía") return "Guía";
  if (lower === "faq") return "FAQ";
  if (lower === "pillar" || lower === "pilar") return "Pilar";
  if (lower === "supporting" || lower === "soporte") return "Guía";
  if (lower === "category" || lower === "categoría") return "Guía";
  return "Guía";
}

function mapStatus(s: string): string {
  if (s === "active" || s === "published") return "Publicado";
  if (s === "archived") return "Archivado";
  return "Borrador";
}

export default function AdminTopicalAuthority() {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPilar, setFilterPilar] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [syncStatus, setSyncStatus] = useState<"idle" | "syncing" | "done" | "error">("idle");
  const [syncResult, setSyncResult] = useState<{ created: number; updated: number; total: number } | null>(null);
  const [form, setForm] = useState({
    name: "", slug: "", pillarTitle: "", pillarDescription: "",
    pillarKeywords: "", category: "guia", status: "active",
  });
  const [pageForm, setPageForm] = useState({ title: "", slug: "", type: "guide", clusterId: "" });

  const { data: clusters = [], isLoading } = useQuery<TopicCluster[]>({
    queryKey: ["/api/admin/topic-clusters"],
  });

  const syncMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/topic-clusters/sync", {}),
    onMutate: () => setSyncStatus("syncing"),
    onSuccess: (data: any) => {
      setSyncStatus("done");
      setSyncResult({ created: data.created, updated: data.updated, total: data.total });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topic-clusters"] });
      toast({
        title: "Sincronización completada",
        description: `${data.created} clusters nuevos · ${data.updated} actualizados · ${data.total} total`,
      });
      setTimeout(() => setSyncStatus("idle"), 4000);
    },
    onError: (err: any) => {
      setSyncStatus("error");
      toast({ title: "Error de sincronización", description: err.message, variant: "destructive" });
      setTimeout(() => setSyncStatus("idle"), 4000);
    },
  });

  useEffect(() => {
    syncMutation.mutate();
  }, []);

  const createMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/admin/topic-clusters", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topic-clusters"] });
      toast({ title: "Cluster creado" });
      resetForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiRequest("PUT", `/api/admin/topic-clusters/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topic-clusters"] });
      toast({ title: "Actualizado" });
      resetForm();
      resetPageForm();
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/admin/topic-clusters/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/topic-clusters"] });
      toast({ title: "Eliminado" });
    },
  });

  function resetForm() {
    setForm({ name: "", slug: "", pillarTitle: "", pillarDescription: "", pillarKeywords: "", category: "guia", status: "active" });
    setEditingId(null);
    setShowForm(false);
  }

  function resetPageForm() {
    setPageForm({ title: "", slug: "", type: "guide", clusterId: "" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const slug = form.slug || form.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const data = { ...form, slug };
    if (editingId) {
      updateMutation.mutate({ id: editingId, data });
    } else {
      createMutation.mutate(data);
    }
  }

  function startEditCluster(cluster: TopicCluster) {
    setForm({
      name: cluster.name, slug: cluster.slug, pillarTitle: cluster.pillarTitle,
      pillarDescription: cluster.pillarDescription || "", pillarKeywords: cluster.pillarKeywords || "",
      category: cluster.category || "guia", status: cluster.status || "active",
    });
    setEditingId(cluster.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function togglePublish(page: TopicalPage) {
    const cluster = clusters.find(c => c.id === page.clusterId);
    if (!cluster) return;
    if (page.type === "Pilar") {
      const newStatus = cluster.status === "active" ? "draft" : "active";
      updateMutation.mutate({ id: cluster.id, data: { status: newStatus } });
    } else if (page.pageIndex !== undefined) {
      const pages = [...((cluster.supportingPages as any[]) || [])];
      if (pages[page.pageIndex]) {
        pages[page.pageIndex] = {
          ...pages[page.pageIndex],
          status: pages[page.pageIndex].status === "published" ? "draft" : "published",
        };
        updateMutation.mutate({ id: cluster.id, data: { supportingPages: pages } });
      }
    }
  }

  function removePage(page: TopicalPage) {
    if (page.type === "Pilar") {
      if (confirm("¿Eliminar este cluster pilar y todas sus páginas?")) {
        deleteMutation.mutate(page.clusterId);
      }
      return;
    }
    const cluster = clusters.find(c => c.id === page.clusterId);
    if (!cluster || page.pageIndex === undefined) return;
    const pages = ((cluster.supportingPages as any[]) || []).filter((_, i) => i !== page.pageIndex);
    updateMutation.mutate({ id: cluster.id, data: { supportingPages: pages, contentDepth: pages.length } });
  }

  function addPage(e: React.FormEvent) {
    e.preventDefault();
    if (!pageForm.clusterId || !pageForm.title || !pageForm.slug) return;
    const cluster = clusters.find(c => c.id === pageForm.clusterId);
    if (!cluster) return;
    const existing = (cluster.supportingPages as any[]) || [];
    const newPage = { title: pageForm.title, slug: pageForm.slug, type: pageForm.type, status: "published" };
    updateMutation.mutate({
      id: cluster.id,
      data: { supportingPages: [...existing, newPage], contentDepth: existing.length + 1 },
    });
  }

  const allPages = useMemo<TopicalPage[]>(() => {
    const pages: TopicalPage[] = [];
    for (const cluster of clusters) {
      pages.push({
        url: `/guias/${cluster.slug}`,
        type: "Pilar",
        title: cluster.pillarTitle,
        pilar: "—",
        status: mapStatus(cluster.status || "draft"),
        clusterId: cluster.id,
      });
      const supportingPages = (cluster.supportingPages as any[]) || [];
      supportingPages.forEach((sp: any, idx: number) => {
        const spType = mapPageType(sp.type || "supporting");
        const prefix = spType === "Comparativa" ? "comparativas" : spType === "FAQ" ? "faqs" : "guias";
        pages.push({
          url: `/${prefix}/${sp.slug}`,
          type: spType,
          title: sp.title,
          pilar: cluster.slug,
          status: mapStatus(sp.status || "published"),
          clusterId: cluster.id,
          pageIndex: idx,
        });
      });
    }
    return pages;
  }, [clusters]);

  const filteredPages = allPages.filter(p => {
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterStatus !== "all" && p.status !== filterStatus) return false;
    if (filterPilar !== "all" && p.pilar !== filterPilar && p.clusterId !== filterPilar) return false;
    return true;
  });

  const uniquePilars = [...new Set(allPages.filter(p => p.pilar !== "—").map(p => p.pilar))];
  const totalGuias = allPages.filter(p => p.type === "Guía").length;
  const totalComparativas = allPages.filter(p => p.type === "Comparativa").length;
  const totalFaqs = allPages.filter(p => p.type === "FAQ").length;

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-topical-page">

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-topical-title">Autoridad Topical</h1>
            <p className="text-gray-500 mt-1">Motor de generación de topic clusters SEO · {allPages.length} páginas configuradas</p>
          </div>
          <div className="flex items-center gap-3">
            {syncStatus === "syncing" && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
                <i className="ri-loader-4-line animate-spin"></i>
                Sincronizando con Supabase...
              </div>
            )}
            {syncStatus === "done" && syncResult && (
              <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
                <i className="ri-check-line"></i>
                {syncResult.created} nuevos · {syncResult.updated} actualizados · {syncResult.total} total
              </div>
            )}
            {syncStatus === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-2 rounded-lg">
                <i className="ri-error-warning-line"></i>
                Error en sincronización
              </div>
            )}
            <button
              onClick={() => syncMutation.mutate()}
              disabled={syncStatus === "syncing"}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 flex items-center gap-2 text-sm disabled:opacity-60"
              data-testid="button-sync"
            >
              <i className={`ri-refresh-line ${syncStatus === "syncing" ? "animate-spin" : ""}`}></i>
              Sincronizar
            </button>
            <button
              onClick={() => { resetForm(); setShowForm(!showForm); }}
              className="bg-[#ad023b] text-white px-4 py-2 rounded-lg hover:bg-[#8d0230] flex items-center gap-2 text-sm"
              data-testid="button-new-cluster"
            >
              <i className="ri-add-line"></i> Nuevo cluster
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold text-emerald-600" data-testid="text-total-pages">{allPages.length}</div>
            <div className="text-sm text-gray-500 mt-1">Total páginas</div>
          </div>
          <div className="bg-white rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold text-emerald-600">{totalGuias}</div>
            <div className="text-sm text-gray-500 mt-1">Guías</div>
          </div>
          <div className="bg-white rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold text-emerald-600">{totalComparativas}</div>
            <div className="text-sm text-gray-500 mt-1">Comparativas</div>
          </div>
          <div className="bg-white rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold text-emerald-600">{totalFaqs}</div>
            <div className="text-sm text-gray-500 mt-1">FAQs</div>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4" data-testid="form-cluster">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">{editingId ? "Editar cluster" : "Nuevo cluster temático"}</h3>
              <button type="button" onClick={resetForm} className="text-gray-400 hover:text-gray-600"><i className="ri-close-line text-xl"></i></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del cluster *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="ej: gestion-flotas" className="w-full border rounded-lg px-3 py-2" required data-testid="input-cluster-name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                  placeholder="auto-generado si vacío" className="w-full border rounded-lg px-3 py-2" data-testid="input-cluster-slug" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2" data-testid="select-cluster-status">
                  <option value="active">Publicado</option>
                  <option value="draft">Borrador</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título página pilar *</label>
              <input type="text" value={form.pillarTitle} onChange={e => setForm({ ...form, pillarTitle: e.target.value })}
                placeholder="ej: Electrificación de flotas de empresa" className="w-full border rounded-lg px-3 py-2"
                required data-testid="input-cluster-pillar-title" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción pilar</label>
              <textarea value={form.pillarDescription} onChange={e => setForm({ ...form, pillarDescription: e.target.value })}
                placeholder="Contenido descriptivo de la página pilar" rows={3}
                className="w-full border rounded-lg px-3 py-2" data-testid="input-cluster-pillar-desc" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords (separadas por comas)</label>
              <input type="text" value={form.pillarKeywords} onChange={e => setForm({ ...form, pillarKeywords: e.target.value })}
                placeholder="ej: renting electrico, flotas empresa, vehiculos empresa" className="w-full border rounded-lg px-3 py-2"
                data-testid="input-cluster-keywords" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-[#ad023b] text-white px-6 py-2 rounded-lg hover:bg-[#8d0230]"
                disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-cluster">
                {(createMutation.isPending || updateMutation.isPending) ? "Guardando..." : editingId ? "Actualizar" : "Crear"}
              </button>
              <button type="button" onClick={resetForm} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={filterType} onChange={e => setFilterType(e.target.value)}
                className="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm bg-white cursor-pointer" data-testid="filter-type">
                <option value="all">Todos los tipos</option>
                <option value="Pilar">Pilar</option>
                <option value="Guía">Guía</option>
                <option value="Comparativa">Comparativa</option>
                <option value="FAQ">FAQ</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
            <div className="relative">
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
                className="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm bg-white cursor-pointer" data-testid="filter-status">
                <option value="all">Todos los estados</option>
                <option value="Publicado">Publicado</option>
                <option value="Borrador">Borrador</option>
                <option value="Archivado">Archivado</option>
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
            <div className="relative">
              <select value={filterPilar} onChange={e => setFilterPilar(e.target.value)}
                className="appearance-none border rounded-lg px-3 py-2 pr-8 text-sm bg-white cursor-pointer" data-testid="filter-pilar">
                <option value="all">Todas las marcas</option>
                {uniquePilars.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>
          <div className="text-sm text-gray-500" data-testid="text-results-count">
            {filteredPages.length} resultados en BD
          </div>
        </div>

        {(isLoading || syncStatus === "syncing") ? (
          <div className="bg-white rounded-xl border p-10 text-center">
            <i className="ri-loader-4-line animate-spin text-3xl text-emerald-500 block mb-3"></i>
            <p className="text-gray-500 text-sm">{syncStatus === "syncing" ? "Sincronizando clusters con Supabase..." : "Cargando..."}</p>
          </div>
        ) : filteredPages.length === 0 ? (
          <div className="bg-white rounded-xl border p-8 text-center text-gray-500">
            <i className="ri-node-tree text-4xl mb-2 block"></i>
            <p>No hay páginas configuradas todavía</p>
            <p className="text-sm mt-1">Crea tu primer cluster pilar para empezar a construir autoridad topical</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full text-sm" data-testid="table-topical">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">URL</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Tipo</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Título</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Pilar</th>
                  <th className="text-center px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Estado</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPages.map((page, idx) => (
                  <tr key={`${page.clusterId}-${page.pageIndex ?? "pilar"}-${idx}`} className="hover:bg-gray-50" data-testid={`row-page-${idx}`}>
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-blue-600 hover:underline cursor-pointer">{page.url}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${typeColors[page.type] || "bg-gray-100 text-gray-600"}`}>
                        {page.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 truncate block max-w-[300px]">{page.title}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-500 font-mono">{page.pilar}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[page.status] || "bg-gray-100 text-gray-600"}`}>
                        {page.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {page.type === "Pilar" && (
                          <button onClick={() => {
                            const cluster = clusters.find(c => c.id === page.clusterId);
                            if (cluster) startEditCluster(cluster);
                          }}
                            className="text-xs text-blue-600 hover:text-blue-800"
                            data-testid={`button-edit-${idx}`}>
                            <i className="ri-edit-line mr-0.5"></i> Editar
                          </button>
                        )}
                        <button onClick={() => togglePublish(page)}
                          className={`text-xs ${page.status === "Publicado" ? "text-[#ad023b] hover:text-red-700" : "text-green-600 hover:text-green-800"}`}
                          data-testid={`button-toggle-${idx}`}>
                          {page.status === "Publicado" ? "Despublicar" : "Publicar"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-white rounded-xl border p-5">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-add-circle-line text-[#ad023b]"></i>
            Añadir página al cluster
          </h3>
          <form onSubmit={addPage} className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Cluster pilar</label>
              <select value={pageForm.clusterId} onChange={e => setPageForm({ ...pageForm, clusterId: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" data-testid="select-page-cluster">
                <option value="">Seleccionar cluster...</option>
                {clusters.map(c => <option key={c.id} value={c.id}>{c.name} ({c.slug})</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
              <input type="text" value={pageForm.title} onChange={e => setPageForm({ ...pageForm, title: e.target.value })}
                placeholder="Título de la página" className="w-full border rounded-lg px-3 py-2 text-sm" data-testid="input-page-title" />
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Slug (URL)</label>
              <input type="text" value={pageForm.slug} onChange={e => setPageForm({ ...pageForm, slug: e.target.value })}
                placeholder="url-de-la-pagina" className="w-full border rounded-lg px-3 py-2 text-sm" data-testid="input-page-slug" />
            </div>
            <div className="min-w-[130px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Tipo</label>
              <select value={pageForm.type} onChange={e => setPageForm({ ...pageForm, type: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm" data-testid="select-page-type">
                <option value="guide">Guía</option>
                <option value="comparison">Comparativa</option>
                <option value="faq">FAQ</option>
                <option value="supporting">Soporte</option>
              </select>
            </div>
            <button type="submit" disabled={!pageForm.clusterId || !pageForm.title || !pageForm.slug || updateMutation.isPending}
              className="bg-[#ad023b] text-white px-4 py-2 rounded-lg hover:bg-[#8d0230] text-sm disabled:opacity-50 flex items-center gap-1"
              data-testid="button-add-page">
              <i className="ri-add-line"></i> Añadir
            </button>
          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
