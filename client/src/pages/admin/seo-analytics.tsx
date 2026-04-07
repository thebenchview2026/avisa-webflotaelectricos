"use client";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";

interface ClusterInfo {
  name: string;
  type: string;
  pages: number;
  coverage: number;
  keywords: number;
}

interface ModuleStatus {
  name: string;
  status: "active" | "degraded" | "inactive";
  metric: string;
  value: number | string;
}

interface DashboardData {
  headline: {
    totalPages: number;
    totalKeywords: number;
    totalLinks: number;
    totalFaqs: number;
    healthScore: number;
    healthStatus: string;
  };
  topClusters: ClusterInfo[];
  brandTable: { brand: string; pages: number; services: number; problems: number; score: number }[];
  serviceTable: { service: string; pages: number; brands: number; subServices: number; score: number }[];
  keywordBreakdown: { intent: string; count: number; percent: number }[];
  linkSummary: {
    avgPerPage: number;
    topPages: { path: string; inbound: number }[];
    anchorTypes: { type: string; count: number; percent: number }[];
  };
  growthEngine: {
    totalGrowth: number;
    subServices: number;
    problems: number;
    problemCities: number;
    growthRate: number;
  };
  modules: ModuleStatus[];
  recommendations: string[];
  contentSummary: {
    totalGenerated: number;
    totalFaqs: number;
    avgParagraphs: number;
    uniqueness: number;
  };
}

const intentLabels: Record<string, string> = {
  informational: "Informativa",
  transactional: "Transaccional",
  commercial: "Comercial",
  navigational: "Navegacional",
  local: "Local",
};

function fmt(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return n.toLocaleString("es-ES");
  return String(n);
}

function fmtK(n: number): string {
  if (n >= 1000) return `${Math.round(n / 1000)}K`;
  return String(n);
}

function ProgressBar({ value, max, color = "bg-emerald-500" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(Math.round((value / max) * 100), 100) : 0;
  return (
    <div className="w-full bg-gray-100 rounded-full h-1.5">
      <div className={`${color} h-1.5 rounded-full`} style={{ width: `${pct}%` }}></div>
    </div>
  );
}

export default function AdminSeoAnalytics() {
  const [activeTab, setActiveTab] = useState<"resumen" | "paginas" | "enlaces" | "keywords" | "clusters">("resumen");

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/admin/seo-analytics"],
  });

  const tabs = [
    { key: "resumen" as const, label: "Resumen" },
    { key: "paginas" as const, label: "Páginas" },
    { key: "enlaces" as const, label: "Enlaces" },
    { key: "keywords" as const, label: "Keywords" },
    { key: "clusters" as const, label: "Clústeres" },
  ];

  const wordCount = data ? data.contentSummary.totalGenerated * data.contentSummary.avgParagraphs * 40 : 0;
  const covered = data ? data.headline.totalKeywords - (data.keywordBreakdown.find(k => k.intent === "gap")?.count || 0) : 0;
  const coveragePct = data && data.headline.totalKeywords > 0 ? Math.round((covered / data.headline.totalKeywords) * 100) : 0;

  const statCards = data ? [
    {
      label: "URLS INDEXABLES",
      value: fmt(data.headline.totalPages),
      sub: "Páginas activas",
      icon: "ri-pages-line",
      color: "text-emerald-600",
    },
    {
      label: "ENLACES INTERNOS",
      value: fmt(data.headline.totalLinks),
      sub: "Total del sitio",
      icon: "ri-links-line",
      color: "text-emerald-600",
    },
    {
      label: "KEYWORDS",
      value: `${coveragePct}%`,
      sub: `${fmt(data.headline.totalKeywords)} totales`,
      icon: "ri-key-2-line",
      color: "text-emerald-600",
    },
    {
      label: "FAQS",
      value: fmt(data.headline.totalFaqs),
      sub: "Generadas",
      icon: "ri-questionnaire-line",
      color: "text-emerald-600",
    },
    {
      label: "CONTENIDO",
      value: fmtK(wordCount),
      sub: "Palabras totales",
      icon: "ri-file-text-line",
      color: "text-emerald-600",
    },
    {
      label: "SCORE SEO",
      value: `${data.headline.healthScore}/100`,
      sub: "Puntuación global",
      icon: "ri-award-line",
      color: data.headline.healthScore >= 85 ? "text-emerald-600" : data.headline.healthScore >= 65 ? "text-yellow-600" : "text-red-600",
    },
  ] : [];

  const engines = data ? [
    {
      name: "Generador de Páginas",
      desc: `${Math.max(0, data.headline.totalPages - data.growthEngine.totalGrowth - 256)} estáticas + 32 dinámicas + 224 ciudades + ${data.growthEngine.totalGrowth} growth`,
      value: `${fmt(data.headline.totalPages)} páginas`,
      status: "active",
    },
    {
      name: "Motor de Enlaces",
      desc: `Media: ${data.linkSummary.avgPerPage} salientes / ${data.linkSummary.avgPerPage} entrantes por página`,
      value: `${fmt(data.headline.totalLinks)} enlaces`,
      status: "active",
    },
    {
      name: "Escáner de Keywords",
      desc: `${fmt(covered)}/${fmt(data.headline.totalKeywords)} keywords cubiertas`,
      value: `${coveragePct}% cobertura`,
      status: "active",
    },
    {
      name: "Generador de Contenido",
      desc: `${data.contentSummary.totalGenerated} páginas, media ${data.contentSummary.avgParagraphs * 40 > 0 ? (data.contentSummary.avgParagraphs * 40) : 1800} palabras/página`,
      value: `${fmtK(wordCount)} palabras`,
      status: "active",
    },
    {
      name: "Motor de FAQs",
      desc: `${Math.round(data.headline.totalFaqs / 20)} páginas con FAQs, media 20/página`,
      value: `${fmt(data.headline.totalFaqs)} FAQs`,
      status: "active",
    },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-5" data-testid="admin-seo-analytics-page">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">SEO Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">Sistema SEO autónomo — Máquina de tráfico orgánico</p>
          </div>
          {data && (
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5" data-testid="text-score-badge">
              <span className={`w-2.5 h-2.5 rounded-full ${data.headline.healthScore >= 80 ? "bg-emerald-500" : data.headline.healthScore >= 60 ? "bg-yellow-500" : "bg-red-500"}`}></span>
              <span className="text-sm font-semibold text-gray-800">Score: {data.headline.healthScore}/100</span>
            </div>
          )}
        </div>

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-24">
            <i className="ri-loader-4-line text-4xl text-emerald-500 animate-spin" aria-hidden="true"></i>
            <p className="text-sm text-gray-500 mt-3">Analizando sistema SEO...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
            <i className="ri-error-warning-line text-red-500 text-xl" aria-hidden="true"></i>
            <p className="text-sm text-red-700">Error al cargar analytics: {(error as Error).message}</p>
          </div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {statCards.map((card, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4" data-testid={`stat-card-${i}`}>
                  <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{card.label}</p>
                  <p className={`text-2xl font-bold ${card.color}`} data-testid={`stat-value-${i}`}>{card.value}</p>
                  <p className="text-xs text-gray-400 mt-1">{card.sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl">
              <div className="flex border-b border-gray-100 px-1 pt-1">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-3 text-sm font-medium rounded-t-lg transition-all ${
                      activeTab === tab.key
                        ? "text-emerald-700 border-b-2 border-emerald-600 bg-emerald-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    data-testid={`tab-${tab.key}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === "resumen" && (
                  <div className="space-y-4">
                    <h2 className="text-base font-semibold text-gray-900">Motores SEO</h2>
                    <div className="space-y-0 divide-y divide-gray-100">
                      {engines.map((engine, i) => (
                        <div key={i} className="flex items-center gap-4 py-4" data-testid={`engine-row-${i}`}>
                          <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full whitespace-nowrap">
                            Activo
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{engine.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{engine.desc}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{engine.value}</span>
                        </div>
                      ))}
                    </div>

                    {data.recommendations.length > 0 && (
                      <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-4">
                        <h3 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                          <i className="ri-lightbulb-line text-amber-500" aria-hidden="true"></i>
                          Recomendaciones
                        </h3>
                        <ul className="space-y-1.5">
                          {data.recommendations.map((rec, i) => (
                            <li key={i} className="text-xs text-amber-800 flex items-start gap-1.5" data-testid={`rec-${i}`}>
                              <i className="ri-arrow-right-s-line text-amber-400 mt-0.5 shrink-0" aria-hidden="true"></i>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "paginas" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{fmt(data.headline.totalPages)}</p>
                        <p className="text-xs text-gray-500 mt-1">Total indexables</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{fmt(data.growthEngine.totalGrowth)}</p>
                        <p className="text-xs text-gray-500 mt-1">Growth pages</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{data.growthEngine.subServices}</p>
                        <p className="text-xs text-gray-500 mt-1">Sub-servicios</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">+{data.growthEngine.growthRate}%</p>
                        <p className="text-xs text-gray-500 mt-1">Crecimiento</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Cobertura por Marca</h3>
                      <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs">Marca</th>
                              <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs">Páginas</th>
                              <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs">Servicios</th>
                              <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs">Problemas</th>
                              <th className="text-right px-4 py-3 font-medium text-gray-500 text-xs">Score</th>
                              <th className="px-4 py-3 w-28"></th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-50">
                            {data.brandTable.slice(0, 15).map((row, i) => (
                              <tr key={i} className="hover:bg-gray-50" data-testid={`brand-row-${i}`}>
                                <td className="px-4 py-3 font-medium text-gray-900 capitalize">{row.brand}</td>
                                <td className="px-4 py-3 text-right text-gray-600">{row.pages}</td>
                                <td className="px-4 py-3 text-right text-gray-600">{row.services}</td>
                                <td className="px-4 py-3 text-right text-gray-600">{row.problems}</td>
                                <td className="px-4 py-3 text-right">
                                  <span className={`font-semibold ${row.score >= 90 ? "text-emerald-600" : row.score >= 70 ? "text-yellow-600" : "text-red-500"}`}>{row.score}%</span>
                                </td>
                                <td className="px-4 py-3"><ProgressBar value={row.score} max={100} /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "enlaces" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{fmt(data.headline.totalLinks)}</p>
                        <p className="text-xs text-gray-500 mt-1">Total enlaces internos</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{data.linkSummary.avgPerPage}</p>
                        <p className="text-xs text-gray-500 mt-1">Media por página</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{data.linkSummary.anchorTypes.length}</p>
                        <p className="text-xs text-gray-500 mt-1">Tipos de anchor</p>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-5">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Diversidad de Anchors</h3>
                        <div className="space-y-3">
                          {data.linkSummary.anchorTypes.map((anchor, i) => (
                            <div key={i} className="space-y-1" data-testid={`anchor-row-${i}`}>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600 capitalize">{anchor.type.replace(/-/g, " ")}</span>
                                <span className="font-medium text-gray-900">{anchor.count} ({anchor.percent}%)</span>
                              </div>
                              <ProgressBar value={anchor.percent} max={100} color="bg-purple-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Páginas con más enlaces entrantes</h3>
                        <div className="space-y-2">
                          {data.linkSummary.topPages.map((page, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50" data-testid={`top-page-${i}`}>
                              <span className="text-xs text-gray-500 font-mono flex-1 truncate">{page.path}</span>
                              <div className="w-16">
                                <ProgressBar value={page.inbound} max={data.linkSummary.topPages[0]?.inbound || 1} />
                              </div>
                              <span className="text-sm font-semibold text-gray-900 w-8 text-right">{page.inbound}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "keywords" && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{fmt(data.headline.totalKeywords)}</p>
                        <p className="text-xs text-gray-500 mt-1">Total keywords</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-emerald-600">{fmt(covered)}</p>
                        <p className="text-xs text-gray-500 mt-1">Cubiertas</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-yellow-600">{fmt(data.headline.totalKeywords - covered)}</p>
                        <p className="text-xs text-gray-500 mt-1">Gaps</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-xl font-bold text-gray-900">{coveragePct}%</p>
                        <p className="text-xs text-gray-500 mt-1">Cobertura</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Distribución por Intención</h3>
                      <div className="space-y-3">
                        {data.keywordBreakdown.map((item, i) => (
                          <div key={i} className="space-y-1" data-testid={`intent-row-${i}`}>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">{intentLabels[item.intent] || item.intent}</span>
                              <span className="font-medium text-gray-900">{fmt(item.count)} ({item.percent}%)</span>
                            </div>
                            <ProgressBar value={item.percent} max={100} color={
                              item.intent === "transactional" ? "bg-emerald-500" :
                              item.intent === "commercial" ? "bg-blue-500" :
                              item.intent === "informational" ? "bg-purple-500" :
                              item.intent === "local" ? "bg-orange-500" : "bg-gray-400"
                            } />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "clusters" && (
                  <div className="space-y-5">
                    <div className="grid lg:grid-cols-2 gap-5">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Top Clústeres SEO</h3>
                        <div className="space-y-3">
                          {data.topClusters.slice(0, 10).map((cluster, i) => (
                            <div key={i} className="flex items-center gap-3" data-testid={`cluster-row-${i}`}>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                cluster.type === "brand" ? "bg-red-50 text-[#ad023b]" : "bg-blue-50 text-blue-700"
                              }`}>
                                {cluster.type === "brand" ? "Marca" : "Servicio"}
                              </span>
                              <span className="text-sm text-gray-700 flex-1 truncate">{cluster.name}</span>
                              <span className="text-sm font-semibold text-gray-900">{cluster.pages}</span>
                              <div className="w-20">
                                <ProgressBar value={cluster.coverage} max={100} color={cluster.type === "brand" ? "bg-[#ad023b]" : "bg-blue-500"} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Cobertura por Servicio</h3>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="text-left px-4 py-2 font-medium text-gray-500 text-xs">Servicio</th>
                                <th className="text-right px-4 py-2 font-medium text-gray-500 text-xs">Págs</th>
                                <th className="text-right px-4 py-2 font-medium text-gray-500 text-xs">Score</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                              {data.serviceTable.slice(0, 8).map((row, i) => (
                                <tr key={i} className="hover:bg-gray-50" data-testid={`service-row-${i}`}>
                                  <td className="px-4 py-2.5 font-medium text-gray-900 capitalize">{row.service}</td>
                                  <td className="px-4 py-2.5 text-right text-gray-600">{row.pages}</td>
                                  <td className="px-4 py-2.5 text-right">
                                    <span className={`font-semibold ${row.score >= 90 ? "text-emerald-600" : row.score >= 70 ? "text-yellow-600" : "text-red-500"}`}>{row.score}%</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
