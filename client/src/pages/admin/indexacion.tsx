"use client";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface IndexPage {
  path: string;
  type: string;
  title: string;
  indexed: boolean;
  hasSeo: boolean;
  canonical: string | null;
}

interface IndexationData {
  pages: IndexPage[];
  totalIndexed: number;
  totalNoindex: number;
  totalWithSeo: number;
}

export default function AdminIndexacion() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "indexed" | "noindex" | "no-seo">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const { data, isLoading } = useQuery<IndexationData>({
    queryKey: ["/api/admin/seo-indexation"],
  });

  const toggleIndexMutation = useMutation({
    mutationFn: async ({ path, currentlyIndexed }: { path: string; currentlyIndexed: boolean }) => {
      const seoList = await fetch("/api/admin/seo-metadata", { credentials: "include" }).then(r => r.json());
      const existing = seoList.find((s: any) => s.path === path);
      if (existing) {
        return apiRequest("PUT", `/api/admin/seo-metadata/${existing.id}`, { noindex: currentlyIndexed });
      } else {
        return apiRequest("POST", "/api/admin/seo-metadata", { path, noindex: currentlyIndexed });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-indexation"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-metadata"] });
      toast({ title: "Estado de indexación actualizado" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const pages = data?.pages || [];
  const types = [...new Set(pages.map(p => p.type))];

  const filtered = pages.filter(p => {
    if (filter === "indexed" && !p.indexed) return false;
    if (filter === "noindex" && p.indexed) return false;
    if (filter === "no-seo" && p.hasSeo) return false;
    if (typeFilter !== "all" && p.type !== typeFilter) return false;
    return true;
  });

  const typeLabels: Record<string, string> = {
    static: "Estática",
    vehicle: "Vehículo",
    page: "Página CMS",
  };

  const typeIcons: Record<string, string> = {
    static: "ri-pages-line",
    vehicle: "ri-car-line",
    page: "ri-file-text-line",
  };

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-indexacion-page">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-indexacion-title">Indexación</h1>
          <p className="text-gray-500 mt-1">Control de indexación de páginas, sitemap y robots.txt</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 text-sm text-gray-500"><i className="ri-pages-line"></i> Total páginas</div>
            <div className="text-2xl font-bold" data-testid="text-index-total">{data?.pages.length || 0}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 text-sm text-green-600"><i className="ri-check-double-line"></i> Indexadas</div>
            <div className="text-2xl font-bold text-green-600" data-testid="text-index-indexed">{data?.totalIndexed || 0}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 text-sm text-orange-600"><i className="ri-eye-off-line"></i> Noindex</div>
            <div className="text-2xl font-bold text-orange-600" data-testid="text-index-noindex">{data?.totalNoindex || 0}</div>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-2 text-sm text-blue-600"><i className="ri-seo-line"></i> Con SEO</div>
            <div className="text-2xl font-bold text-blue-600" data-testid="text-index-withseo">{data?.totalWithSeo || 0}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><i className="ri-sitemap-line text-[#ad023b]"></i> Sitemap</h3>
            <p className="text-sm text-gray-500 mb-2">El sitemap se genera dinámicamente en <code className="bg-gray-100 px-1 rounded">/sitemap.xml</code></p>
            <div className="flex gap-2">
              <a href="/sitemap.xml" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg" data-testid="link-sitemap">
                <i className="ri-external-link-line"></i> Ver sitemap.xml
              </a>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Incluye todas las páginas marcadas como indexadas. Se actualiza automáticamente.
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2"><i className="ri-robot-line text-[#ad023b]"></i> Robots.txt</h3>
            <p className="text-sm text-gray-500 mb-2">Archivo de directivas para crawlers en <code className="bg-gray-100 px-1 rounded">/robots.txt</code></p>
            <div className="flex gap-2">
              <a href="/robots.txt" target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg" data-testid="link-robots">
                <i className="ri-external-link-line"></i> Ver robots.txt
              </a>
            </div>
            <div className="mt-3 text-xs text-gray-400">
              Configurado para permitir todos los crawlers con referencia al sitemap.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-4">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex gap-1">
              {(["all", "indexed", "noindex", "no-seo"] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-sm rounded-lg ${filter === f ? "bg-[#ad023b] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  data-testid={`button-filter-${f}`}>
                  {f === "all" ? "Todas" : f === "indexed" ? "Indexadas" : f === "noindex" ? "No indexadas" : "Sin SEO"}
                </button>
              ))}
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
              className="border rounded-lg px-3 py-1.5 text-sm" data-testid="select-type-filter">
              <option value="all">Todos los tipos</option>
              {types.map(t => <option key={t} value={t}>{typeLabels[t] || t}</option>)}
            </select>
            <span className="text-sm text-gray-500 ml-auto">{filtered.length} resultados</span>
          </div>

          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Cargando...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-indexacion">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">URL</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Tipo</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Título</th>
                    <th className="text-center px-4 py-2 font-medium text-gray-600">SEO</th>
                    <th className="text-center px-4 py-2 font-medium text-gray-600">Indexación</th>
                    <th className="text-left px-4 py-2 font-medium text-gray-600">Canonical</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filtered.map(page => (
                    <tr key={page.path} className="hover:bg-gray-50" data-testid={`row-index-${page.path}`}>
                      <td className="px-4 py-2 font-mono text-xs text-blue-600">{page.path}</td>
                      <td className="px-4 py-2">
                        <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          <i className={typeIcons[page.type] || "ri-file-line"}></i>
                          {typeLabels[page.type] || page.type}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700 truncate max-w-xs">{page.title}</td>
                      <td className="px-4 py-2 text-center">
                        {page.hasSeo ? (
                          <i className="ri-check-line text-green-600"></i>
                        ) : (
                          <i className="ri-close-line text-gray-300"></i>
                        )}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          onClick={() => toggleIndexMutation.mutate({ path: page.path, currentlyIndexed: page.indexed })}
                          className={`text-xs px-3 py-1 rounded-full font-medium ${
                            page.indexed ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                          }`}
                          disabled={toggleIndexMutation.isPending}
                          data-testid={`button-toggle-index-${page.path}`}
                        >
                          {page.indexed ? "index" : "noindex"}
                        </button>
                      </td>
                      <td className="px-4 py-2 font-mono text-xs text-gray-400 truncate max-w-xs">{page.canonical || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
