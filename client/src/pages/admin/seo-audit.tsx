"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface SeoIssue {
  path: string;
  severity: "critical" | "warning" | "info";
  category: string;
  message: string;
}

interface SeoAuditResult {
  timestamp: string;
  totalPages: number;
  totalIssues: number;
  criticalCount: number;
  warningCount: number;
  infoCount: number;
  issues: SeoIssue[];
  categorySummary: Record<string, number>;
  pagesWithoutIssues: number;
}

interface AuditStatus {
  inProgress: boolean;
  lastResult: {
    timestamp: string;
    totalPages: number;
    totalIssues: number;
    criticalCount: number;
    warningCount: number;
    infoCount: number;
  } | null;
}

const CATEGORY_LABELS: Record<string, string> = {
  h1: "Sin H1",
  "h1-multiple": "Múltiples H1",
  title: "Sin Title",
  "title-length": "Title (longitud)",
  "meta-description": "Sin Meta Description",
  "meta-description-length": "Meta Description (longitud)",
  canonical: "Sin Canonical",
  schema: "Sin JSON-LD Schema",
  "ssr-content": "Sin contenido SSR",
  "img-alt": "Imágenes sin Alt",
  "og-tags": "Open Graph ausente",
  sitemap: "Fuera de Sitemap",
  "broken-link": "Enlace roto",
  "http-error": "Error HTTP",
  "fetch-error": "Error de rastreo",
};

const SEVERITY_CONFIG = {
  critical: { label: "Crítico", color: "bg-red-100 text-red-700 border-red-200", icon: "ri-error-warning-fill text-red-600", dot: "bg-red-500" },
  warning: { label: "Aviso", color: "bg-amber-100 text-amber-700 border-amber-200", icon: "ri-alert-fill text-amber-600", dot: "bg-amber-500" },
  info: { label: "Info", color: "bg-blue-100 text-blue-700 border-blue-200", icon: "ri-information-fill text-blue-600", dot: "bg-blue-500" },
};

export default function AdminSeoAudit() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPath, setFilterPath] = useState("");
  const [maxPages, setMaxPages] = useState(50);
  const { toast } = useToast();

  const { data: status } = useQuery<AuditStatus>({
    queryKey: ["/api/admin/seo-audit/status"],
    refetchInterval: (query) => {
      const d = query.state.data as AuditStatus | undefined;
      return d?.inProgress ? 3000 : false;
    },
  });

  const { data: results, isLoading: loadingResults } = useQuery<SeoAuditResult>({
    queryKey: ["/api/admin/seo-audit/results"],
    enabled: !!status?.lastResult,
    retry: false,
  });

  const runAuditMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/admin/seo-audit/run?maxPages=${maxPages}`);
      return res.json();
    },
    onSuccess: (data: SeoAuditResult) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-audit/status"] });
      queryClient.setQueryData(["/api/admin/seo-audit/results"], data);
      toast({ title: "Auditoría completada", description: `${data.totalPages} páginas analizadas, ${data.totalIssues} incidencias` });
    },
    onError: (err: any) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/seo-audit/status"] });
      toast({ title: "Error en auditoría", description: err.message, variant: "destructive" });
    },
  });

  const filteredIssues = results?.issues.filter(issue => {
    if (filterSeverity !== "all" && issue.severity !== filterSeverity) return false;
    if (filterCategory !== "all" && issue.category !== filterCategory) return false;
    if (filterPath && !issue.path.toLowerCase().includes(filterPath.toLowerCase())) return false;
    return true;
  }) || [];

  const uniqueCategories = results ? [...new Set(results.issues.map(i => i.category))] : [];

  const groupedByPath = filteredIssues.reduce((acc, issue) => {
    if (!acc[issue.path]) acc[issue.path] = [];
    acc[issue.path].push(issue);
    return acc;
  }, {} as Record<string, SeoIssue[]>);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-seo-audit-title">Auditoría SEO</h1>
          <p className="text-slate-500 text-sm mt-1">Validaciones técnicas automáticas para detectar incidencias SEO</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <label className="text-sm text-slate-600">Máx. páginas:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={maxPages}
              onChange={e => setMaxPages(parseInt(e.target.value))}
              data-testid="select-max-pages"
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
          <Button
            onClick={() => runAuditMutation.mutate()}
            disabled={runAuditMutation.isPending || status?.inProgress}
            className="bg-[#ad023b] hover:bg-[#8d0230]"
            data-testid="button-run-audit"
          >
            {runAuditMutation.isPending || status?.inProgress ? (
              <><i className="ri-loader-4-line animate-spin mr-2" aria-hidden="true"></i>Analizando...</>
            ) : (
              <><i className="ri-radar-line mr-2" aria-hidden="true"></i>Ejecutar auditoría</>
            )}
          </Button>
        </div>
      </div>

      {results && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="py-4 text-center">
                <div className="text-3xl font-bold text-slate-900" data-testid="stat-total-pages">{results.totalPages}</div>
                <div className="text-xs text-slate-500 mt-1">Páginas analizadas</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="py-4 text-center">
                <div className="text-3xl font-bold text-green-600" data-testid="stat-clean-pages">{results.pagesWithoutIssues}</div>
                <div className="text-xs text-slate-500 mt-1">Sin incidencias</div>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardContent className="py-4 text-center">
                <div className="text-3xl font-bold text-red-600" data-testid="stat-critical">{results.criticalCount}</div>
                <div className="text-xs text-slate-500 mt-1">Críticos</div>
              </CardContent>
            </Card>
            <Card className="border-amber-200">
              <CardContent className="py-4 text-center">
                <div className="text-3xl font-bold text-amber-600" data-testid="stat-warnings">{results.warningCount}</div>
                <div className="text-xs text-slate-500 mt-1">Avisos</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="py-4 text-center">
                <div className="text-3xl font-bold text-blue-600" data-testid="stat-info">{results.infoCount}</div>
                <div className="text-xs text-slate-500 mt-1">Informativos</div>
              </CardContent>
            </Card>
          </div>

          {Object.keys(results.categorySummary).length > 0 && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Resumen por tipo de incidencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {Object.entries(results.categorySummary)
                    .sort(([, a], [, b]) => b - a)
                    .map(([cat, count]) => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(filterCategory === cat ? "all" : cat)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg border text-sm transition-all cursor-pointer ${
                          filterCategory === cat ? "bg-[#ad023b] text-white border-[#ad023b]" : "bg-white hover:bg-slate-50 border-slate-200"
                        }`}
                        data-testid={`button-category-${cat}`}
                      >
                        <span className="truncate">{CATEGORY_LABELS[cat] || cat}</span>
                        <span className={`ml-2 font-bold ${filterCategory === cat ? "text-white" : "text-slate-900"}`}>{count}</span>
                      </button>
                    ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex gap-2 mb-4 flex-wrap items-center">
            <div className="flex gap-1">
              {(["all", "critical", "warning", "info"] as const).map(s => (
                <Button
                  key={s}
                  variant={filterSeverity === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterSeverity(s)}
                  data-testid={`button-filter-${s}`}
                >
                  {s === "all" ? "Todos" : SEVERITY_CONFIG[s].label}
                  {s !== "all" && <span className="ml-1 opacity-75">({results[`${s}Count`]})</span>}
                </Button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Filtrar por ruta..."
              value={filterPath}
              onChange={e => setFilterPath(e.target.value)}
              className="border rounded-md px-3 py-1.5 text-sm flex-1 min-w-[200px]"
              data-testid="input-filter-path"
            />
            {(filterSeverity !== "all" || filterCategory !== "all" || filterPath) && (
              <Button variant="ghost" size="sm" onClick={() => { setFilterSeverity("all"); setFilterCategory("all"); setFilterPath(""); }}>
                <i className="ri-close-line mr-1" aria-hidden="true"></i>Limpiar filtros
              </Button>
            )}
          </div>

          {filteredIssues.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <i className="ri-check-double-line text-4xl text-green-500" aria-hidden="true"></i>
                <p className="text-slate-600 mt-2 font-medium">
                  {results.totalIssues === 0 ? "Sin incidencias SEO detectadas" : "Sin resultados para los filtros aplicados"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {Object.entries(groupedByPath).map(([path, issues]) => (
                <Card key={path} className="overflow-hidden" data-testid={`card-audit-path-${path.replace(/\//g, "-")}`}>
                  <div className="px-4 py-3 bg-slate-50 border-b flex items-center gap-2">
                    <i className="ri-file-text-line text-slate-400" aria-hidden="true"></i>
                    <code className="text-sm font-mono text-slate-700 flex-1">{path}</code>
                    <div className="flex gap-1">
                      {issues.some(i => i.severity === "critical") && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                      {issues.some(i => i.severity === "warning") && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
                      {issues.some(i => i.severity === "info") && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                    </div>
                    <span className="text-xs text-slate-500">{issues.length} {issues.length === 1 ? "incidencia" : "incidencias"}</span>
                  </div>
                  <CardContent className="py-0 divide-y divide-slate-100">
                    {issues.map((issue, idx) => {
                      const sev = SEVERITY_CONFIG[issue.severity];
                      return (
                        <div key={idx} className="flex items-start gap-3 py-3">
                          <i className={`${sev.icon} mt-0.5 text-lg`} aria-hidden="true"></i>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${sev.color}`}>
                                {sev.label}
                              </span>
                              <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                {CATEGORY_LABELS[issue.category] || issue.category}
                              </span>
                            </div>
                            <p className="text-sm text-slate-700 mt-1">{issue.message}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-6 text-center text-xs text-slate-400">
            Última auditoría: {new Date(results.timestamp).toLocaleString("es-ES")} — {filteredIssues.length} incidencias mostradas de {results.totalIssues} totales
          </div>
        </>
      )}

      {!results && !runAuditMutation.isPending && !status?.inProgress && (
        <Card>
          <CardContent className="py-16 text-center">
            <i className="ri-radar-line text-5xl text-slate-300" aria-hidden="true"></i>
            <h3 className="text-lg font-semibold text-slate-700 mt-4">Auditoría SEO técnica</h3>
            <p className="text-slate-500 mt-2 max-w-md mx-auto">
              Analiza automáticamente todas las páginas públicas en busca de incidencias SEO: H1 ausente o duplicado, metadata, canonical, JSON-LD schema, sitemap, enlaces rotos, contenido SSR e imágenes sin alt.
            </p>
            <Button
              onClick={() => runAuditMutation.mutate()}
              className="mt-6 bg-[#ad023b] hover:bg-[#8d0230]"
              data-testid="button-start-first-audit"
            >
              <i className="ri-play-fill mr-2" aria-hidden="true"></i>Ejecutar primera auditoría
            </Button>
          </CardContent>
        </Card>
      )}
    </AdminLayout>
  );
}
