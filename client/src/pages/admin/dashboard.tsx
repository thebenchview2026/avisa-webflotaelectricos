"use client";
import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/lib/router";

interface LeadStats {
  total: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  thisWeek: number;
  thisMonth: number;
  dailyCounts: Record<string, number>;
}

const statusLabels: Record<string, { label: string; color: string; bg: string }> = {
  nuevo: { label: "Nuevo", color: "text-blue-700", bg: "bg-blue-100" },
  contactado: { label: "Contactado", color: "text-yellow-700", bg: "bg-yellow-100" },
  convertido: { label: "Convertido", color: "text-green-700", bg: "bg-green-100" },
  descartado: { label: "Descartado", color: "text-gray-700", bg: "bg-gray-100" },
  new: { label: "Nuevo", color: "text-blue-700", bg: "bg-blue-100" },
};

const sourceLabels: Record<string, string> = {
  web: "Web general",
  home: "Inicio",
  electricos: "Eléctricos",
  hibridos: "Híbridos",
  autoplus: "Plan MOVES",
  postventa: "Postventa",
  concesionarios: "Concesionarios",
};

const sourceColors = ["bg-[#ad023b]", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-orange-500", "bg-indigo-500"];

function MiniBarChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  const max = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="flex items-end gap-1 h-32" data-testid="chart-daily-leads">
      {entries.map(([date, count]) => {
        const height = (count / max) * 100;
        const day = new Date(date).getDate();
        return (
          <div key={date} className="flex flex-col items-center flex-1 min-w-0" title={`${date}: ${count} leads`}>
            <span className="text-[10px] text-gray-400 mb-1">{count > 0 ? count : ""}</span>
            <div
              className="w-full rounded-t transition-all bg-[#ad023b] hover:bg-[#8d0230] min-h-[2px]"
              style={{ height: `${Math.max(height, 2)}%` }}
            />
            {day % 5 === 0 && <span className="text-[9px] text-gray-400 mt-1">{day}</span>}
          </div>
        );
      })}
    </div>
  );
}

function HorizontalBar({ items, colors }: { items: { label: string; value: number }[]; colors: string[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div className="space-y-2" data-testid="chart-by-source">
      {items.map((item, idx) => (
        <div key={item.label}>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${colors[idx % colors.length]} transition-all`}
              style={{ width: `${(item.value / total) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const { data: dashData, isLoading: dashLoading } = useQuery<any>({
    queryKey: ["/api/admin/dashboard"],
  });

  const { data: leadStats, isLoading: statsLoading } = useQuery<LeadStats>({
    queryKey: ["/api/admin/leads/stats"],
  });

  const isLoading = dashLoading || statsLoading;

  const conversionRate = leadStats
    ? leadStats.total > 0
      ? Math.round(((leadStats.byStatus?.convertido || 0) / leadStats.total) * 100)
      : 0
    : 0;

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="page-admin-dashboard">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-dashboard-title">Dashboard</h1>
          <span className="text-sm text-gray-400">{new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse"><CardContent className="p-5"><div className="h-16 bg-gray-200 rounded"></div></CardContent></Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <Card data-testid="stat-total-leads">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#ad023b]/10 flex items-center justify-center flex-shrink-0">
                      <i className="ri-contacts-line text-xl text-[#ad023b]"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leadStats?.total || 0}</p>
                      <p className="text-xs text-gray-500">Total Leads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="stat-this-week">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-calendar-line text-xl text-blue-600"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leadStats?.thisWeek || 0}</p>
                      <p className="text-xs text-gray-500">Esta semana</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="stat-this-month">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-calendar-check-line text-xl text-green-600"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{leadStats?.thisMonth || 0}</p>
                      <p className="text-xs text-gray-500">Este mes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="stat-conversion">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-percent-line text-xl text-purple-600"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{conversionRate}%</p>
                      <p className="text-xs text-gray-500">Conversión</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="stat-vehicles">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <i className="ri-car-line text-xl text-orange-600"></i>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{dashData?.stats?.vehicles || 0}</p>
                      <p className="text-xs text-gray-500">Vehículos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <i className="ri-line-chart-line text-[#ad023b]"></i>
                    Leads últimos 30 días
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leadStats?.dailyCounts && Object.keys(leadStats.dailyCounts).length > 0 ? (
                    <MiniBarChart data={leadStats.dailyCounts} />
                  ) : (
                    <p className="text-sm text-gray-400 py-8 text-center">Sin datos disponibles</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <i className="ri-pie-chart-line text-[#ad023b]"></i>
                    Estado de leads
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leadStats?.byStatus && Object.keys(leadStats.byStatus).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(leadStats.byStatus).map(([status, count]) => {
                        const st = statusLabels[status] || { label: status, color: "text-gray-700", bg: "bg-gray-100" };
                        const pct = leadStats.total > 0 ? Math.round((count / leadStats.total) * 100) : 0;
                        return (
                          <div key={status} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-0.5 rounded text-xs font-medium ${st.bg} ${st.color}`}>{st.label}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{count}</span>
                              <span className="text-xs text-gray-400">({pct}%)</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">Sin datos</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <i className="ri-bar-chart-horizontal-line text-[#ad023b]"></i>
                    Leads por fuente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {leadStats?.bySource && Object.keys(leadStats.bySource).length > 0 ? (
                    <HorizontalBar
                      items={Object.entries(leadStats.bySource).map(([src, count]) => ({
                        label: sourceLabels[src] || src,
                        value: count,
                      }))}
                      colors={sourceColors}
                    />
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">Sin datos</p>
                  )}
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      <i className="ri-user-line text-[#ad023b]"></i>
                      Últimos leads
                    </CardTitle>
                    <Link href="/admin/leads">
                      <span className="text-xs text-[#ad023b] hover:underline cursor-pointer" data-testid="link-view-all-leads">Ver todos →</span>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashData?.recentLeads?.length > 0 ? (
                    <div className="space-y-2">
                      {dashData.recentLeads.slice(0, 8).map((lead: any) => {
                        const st = statusLabels[lead.status] || statusLabels.new;
                        return (
                          <div key={lead.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0" data-testid={`lead-item-${lead.id}`}>
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <i className="ri-user-line text-gray-400"></i>
                              </div>
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{lead.name}</p>
                                <p className="text-xs text-gray-500 truncate">{lead.email}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className={`px-2 py-0.5 rounded text-xs ${st.bg} ${st.color}`}>{st.label}</span>
                              <span className="text-xs text-gray-400">
                                {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("es-ES") : ""}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">No hay leads aún</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <i className="ri-history-line text-[#ad023b]"></i>
                    Actividad reciente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dashData?.recentActivity?.length > 0 ? (
                    <div className="space-y-2">
                      {dashData.recentActivity.map((a: any) => (
                        <div key={a.id} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0" data-testid={`activity-item-${a.id}`}>
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <i className={`text-xs text-gray-500 ${
                              a.action === "create" ? "ri-add-line" :
                              a.action === "update" ? "ri-edit-line" :
                              a.action === "delete" ? "ri-delete-bin-line" : "ri-history-line"
                            }`}></i>
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm text-gray-700">{a.details}</p>
                            <p className="text-xs text-gray-400">
                              {a.createdAt ? new Date(a.createdAt).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit" }) : ""}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">Sin actividad</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <i className="ri-apps-line text-[#ad023b]"></i>
                    Resumen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href="/admin/vehicles">
                      <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <i className="ri-car-line text-blue-500"></i>
                          <span className="text-sm">Vehículos</span>
                        </div>
                        <span className="font-medium text-sm">{dashData?.stats?.vehicles || 0}</span>
                      </div>
                    </Link>
                    <Link href="/admin/brands">
                      <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <i className="ri-building-line text-purple-500"></i>
                          <span className="text-sm">Marcas</span>
                        </div>
                        <span className="font-medium text-sm">{dashData?.stats?.brands || 0}</span>
                      </div>
                    </Link>
                    <Link href="/admin/dealers">
                      <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <i className="ri-map-pin-line text-orange-500"></i>
                          <span className="text-sm">Concesionarios</span>
                        </div>
                        <span className="font-medium text-sm">{dashData?.stats?.dealers || 0}</span>
                      </div>
                    </Link>
                    <Link href="/admin/leads">
                      <div className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 cursor-pointer transition-colors">
                        <div className="flex items-center gap-2">
                          <i className="ri-contacts-line text-green-500"></i>
                          <span className="text-sm">Leads</span>
                        </div>
                        <span className="font-medium text-sm">{leadStats?.total || 0}</span>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
