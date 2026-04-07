"use client";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { GrowthCycleResult, GrowthStageResult } from "@/lib/scheduled-growth";

type ScheduleInterval = "disabled" | "12h" | "daily" | "weekly" | "monthly";

interface SchedulerState {
  interval: ScheduleInterval;
  lastRunAt: string | null;
  nextRunAt: string | null;
  lastRunDurationMs: number | null;
  lastRunStatus: "success" | "error" | null;
  lastRunSummary: string | null;
  totalRuns: number;
  isRunning: boolean;
}

interface StatusResponse {
  scheduler: SchedulerState;
  stats: { totalGrowthPages: number; brands: number; cities: number };
}

const SCHEDULE_OPTIONS: { value: ScheduleInterval; label: string; desc: string; icon: string }[] = [
  { value: "disabled", label: "Desactivado", desc: "Solo ejecución manual", icon: "ri-pause-circle-line" },
  { value: "12h", label: "Cada 12 horas", desc: "Dos veces al día", icon: "ri-time-line" },
  { value: "daily", label: "Diario", desc: "Una vez cada 24 horas", icon: "ri-calendar-check-line" },
  { value: "weekly", label: "Semanal", desc: "Una vez por semana", icon: "ri-calendar-line" },
  { value: "monthly", label: "Mensual", desc: "Una vez al mes", icon: "ri-calendar-2-line" },
];

const STAGE_DEFS = [
  { stage: 1, name: "Detectar oportunidades", icon: "ri-search-eye-line", color: "text-blue-600", bg: "bg-blue-50",
    hint: "Analiza gaps de contenido y prioridades de crecimiento" },
  { stage: 2, name: "Generar páginas", icon: "ri-pages-line", color: "text-purple-600", bg: "bg-purple-50",
    hint: "Materializa rutas dinámicas en /servicios y /problemas" },
  { stage: 3, name: "Generar contenido con NAP", icon: "ri-file-text-line", color: "text-emerald-600", bg: "bg-emerald-50",
    hint: "Produce contenido con NAP (Nombre, Dirección, Teléfono)" },
  { stage: 4, name: "Añadir metadata", icon: "ri-code-s-slash-line", color: "text-orange-600", bg: "bg-orange-50",
    hint: "Genera title, meta description y Open Graph por página" },
  { stage: 5, name: "Añadir schema markup", icon: "ri-braces-line", color: "text-teal-600", bg: "bg-teal-50",
    hint: "Inyecta WebPage, FAQPage, HowTo, BreadcrumbList JSON-LD" },
  { stage: 6, name: "Generar FAQs", icon: "ri-questionnaire-line", color: "text-yellow-600", bg: "bg-yellow-50",
    hint: "Crea preguntas frecuentes contextuales por marca y servicio" },
  { stage: 7, name: "Enlazar internamente", icon: "ri-links-line", color: "text-indigo-600", bg: "bg-indigo-50",
    hint: "Construye red de enlaces entre silos topicales" },
  { stage: 8, name: "Actualizar sitemap", icon: "ri-sitemap-line", color: "text-[#ad023b]", bg: "bg-red-50",
    hint: "Regenera sitemap.xml y notifica a Google Search Console" },
];

function StageStatusIcon({ status }: { status: GrowthStageResult["status"] | "pending" }) {
  if (status === "running") return <i className="ri-loader-4-line animate-spin text-blue-500 text-lg" aria-hidden="true"></i>;
  if (status === "success") return <i className="ri-check-circle-fill text-emerald-500 text-lg" aria-hidden="true"></i>;
  if (status === "error") return <i className="ri-error-warning-fill text-red-500 text-lg" aria-hidden="true"></i>;
  return <i className="ri-circle-line text-gray-300 text-lg" aria-hidden="true"></i>;
}

function fmt(n: number): string {
  if (n >= 1000) return n.toLocaleString("es-ES");
  return String(n);
}

function fmtDatetime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function timeUntil(iso: string | null): string {
  if (!iso) return "—";
  const diff = new Date(iso).getTime() - Date.now();
  if (diff <= 0) return "ahora";
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (h >= 24) return `en ${Math.floor(h / 24)}d ${h % 24}h`;
  if (h > 0) return `en ${h}h ${m}m`;
  return `en ${m}m`;
}

export default function AdminScheduledGrowth() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [result, setResult] = useState<GrowthCycleResult | null>(null);
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<ScheduleInterval | null>(null);

  const { data: statusData, isLoading: statusLoading } = useQuery<StatusResponse>({
    queryKey: ["/api/admin/scheduled-growth/status"],
    refetchInterval: 30000,
  });

  const scheduler = statusData?.scheduler;
  const activeInterval = selectedInterval ?? scheduler?.interval ?? "disabled";
  const isScheduleActive = activeInterval !== "disabled";

  const runMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/admin/scheduled-growth/run", {}),
    onSuccess: (data: GrowthCycleResult & { scheduler?: SchedulerState }) => {
      setResult(data);
      setExpandedStage(null);
      qc.invalidateQueries({ queryKey: ["/api/admin/scheduled-growth/status"] });
      const errors = data.stages.filter((s) => s.status === "error").length;
      toast({
        title: errors > 0 ? `Ciclo completado con ${errors} errores` : "Ciclo completado correctamente",
        description: `${data.summary.pagesGenerated} páginas · ${data.summary.faqsGenerated} FAQs · ${data.totalDurationMs}ms`,
      });
    },
    onError: (err: any) => toast({ title: "Error al ejecutar ciclo", description: err.message, variant: "destructive" }),
  });

  const configureMutation = useMutation({
    mutationFn: (interval: ScheduleInterval) => apiRequest("POST", "/api/admin/scheduled-growth/configure", { interval }),
    onSuccess: (data: { scheduler: SchedulerState }) => {
      setSelectedInterval(null);
      qc.invalidateQueries({ queryKey: ["/api/admin/scheduled-growth/status"] });
      const opt = SCHEDULE_OPTIONS.find(o => o.value === data.scheduler.interval);
      toast({
        title: data.scheduler.interval === "disabled"
          ? "Programación desactivada"
          : `Programación activada: ${opt?.label}`,
        description: data.scheduler.nextRunAt
          ? `Próxima ejecución: ${fmtDatetime(data.scheduler.nextRunAt)}`
          : "El ciclo ya no se ejecutará automáticamente",
      });
    },
    onError: (err: any) => toast({ title: "Error al configurar", description: err.message, variant: "destructive" }),
  });

  const isRunning = runMutation.isPending;
  const hasChanges = selectedInterval !== null && selectedInterval !== scheduler?.interval;

  const summaryCards = result ? [
    { label: "Oportunidades", value: fmt(result.summary.opportunitiesDetected), icon: "ri-search-eye-line", color: "text-blue-600" },
    { label: "Páginas generadas", value: fmt(result.summary.pagesGenerated), icon: "ri-pages-line", color: "text-purple-600" },
    { label: "Con contenido NAP", value: fmt(result.summary.contentWithNap), icon: "ri-file-text-line", color: "text-emerald-600" },
    { label: "Con schema", value: fmt(result.summary.schemaPages), icon: "ri-braces-line", color: "text-teal-600" },
    { label: "FAQs generadas", value: fmt(result.summary.faqsGenerated), icon: "ri-questionnaire-line", color: "text-yellow-600" },
    { label: "Enlaces internos", value: fmt(result.summary.internalLinks), icon: "ri-links-line", color: "text-indigo-600" },
    { label: "URLs en sitemap", value: fmt(result.summary.sitemapUrls), icon: "ri-sitemap-line", color: "text-[#ad023b]" },
    { label: "Duración total", value: `${result.totalDurationMs}ms`, icon: "ri-timer-line", color: "text-gray-600" },
  ] : [];

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-scheduled-growth">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2" data-testid="text-title">
              <i className="ri-robot-line text-[#ad023b]" aria-hidden="true"></i>
              Crecimiento Programado
            </h1>
            <p className="text-gray-500 mt-1">Pipeline SEO autónomo de 8 etapas — detecta oportunidades y genera páginas automáticamente</p>
          </div>
          <div className="flex items-center gap-3">
            {isScheduleActive && scheduler?.nextRunAt && (
              <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg">
                <i className="ri-time-line" aria-hidden="true"></i>
                Próxima: {timeUntil(scheduler.nextRunAt)}
              </div>
            )}
            <button
              onClick={() => runMutation.mutate()}
              disabled={isRunning}
              className="bg-[#ad023b] hover:bg-[#8d0230] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 disabled:opacity-60 transition-colors"
              data-testid="button-run-cycle"
            >
              {isRunning
                ? <><i className="ri-loader-4-line animate-spin" aria-hidden="true"></i> Ejecutando...</>
                : <><i className="ri-play-circle-line" aria-hidden="true"></i> Ejecutar ahora</>
              }
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5" data-testid="schedule-config">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <i className="ri-timer-2-line text-gray-400" aria-hidden="true"></i>
                Programación automática
              </h2>
              {isScheduleActive
                ? <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <i className="ri-checkbox-circle-fill" aria-hidden="true"></i> Activo
                  </span>
                : <span className="text-xs font-medium text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <i className="ri-pause-circle-line" aria-hidden="true"></i> Inactivo
                  </span>
              }
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
              {SCHEDULE_OPTIONS.map((opt) => {
                const isSelected = activeInterval === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedInterval(opt.value)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#ad023b] bg-red-50 text-[#ad023b]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                    data-testid={`schedule-option-${opt.value}`}
                  >
                    <i className={`${opt.icon} text-xl`} aria-hidden="true"></i>
                    <span className="text-xs font-semibold leading-tight">{opt.label}</span>
                    <span className="text-[10px] text-gray-400 leading-tight">{opt.desc}</span>
                  </button>
                );
              })}
            </div>

            {hasChanges && (
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <span className="text-sm text-amber-800 flex items-center gap-2">
                  <i className="ri-information-line" aria-hidden="true"></i>
                  Cambio pendiente: <strong>{SCHEDULE_OPTIONS.find(o => o.value === selectedInterval)?.label}</strong>
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedInterval(null)}
                    className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => configureMutation.mutate(selectedInterval!)}
                    disabled={configureMutation.isPending}
                    className="text-sm bg-[#ad023b] text-white px-4 py-1.5 rounded-lg hover:bg-[#8d0230] disabled:opacity-60 flex items-center gap-1.5"
                    data-testid="button-save-schedule"
                  >
                    {configureMutation.isPending
                      ? <><i className="ri-loader-4-line animate-spin" aria-hidden="true"></i> Guardando...</>
                      : <><i className="ri-save-line" aria-hidden="true"></i> Guardar</>
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2 mb-4">
              <i className="ri-history-line text-gray-400" aria-hidden="true"></i>
              Historial de ejecuciones
            </h2>
            {statusLoading ? (
              <div className="text-center py-6 text-gray-400">
                <i className="ri-loader-4-line animate-spin text-2xl block mb-2" aria-hidden="true"></i>
                <span className="text-sm">Cargando...</span>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="text-gray-500">Total ciclos</span>
                  <span className="font-semibold text-gray-900">{scheduler?.totalRuns ?? 0}</span>
                </div>
                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="text-gray-500">Último ciclo</span>
                  <span className="font-medium text-gray-900 text-right leading-tight">{fmtDatetime(scheduler?.lastRunAt ?? null)}</span>
                </div>
                {scheduler?.lastRunStatus && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Estado</span>
                    {scheduler.lastRunStatus === "success"
                      ? <span className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <i className="ri-check-line" aria-hidden="true"></i> Completado
                        </span>
                      : <span className="text-xs text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <i className="ri-error-warning-line" aria-hidden="true"></i> Error
                        </span>
                    }
                  </div>
                )}
                {scheduler?.lastRunSummary && (
                  <div className="py-2 border-b border-gray-100">
                    <span className="text-gray-500 block mb-1">Resultado</span>
                    <span className="text-gray-700 text-xs">{scheduler.lastRunSummary}</span>
                  </div>
                )}
                <div className="flex justify-between items-start py-2 border-b border-gray-100">
                  <span className="text-gray-500">Próxima ejecución</span>
                  <span className="font-medium text-gray-900 text-right leading-tight">
                    {isScheduleActive && scheduler?.nextRunAt
                      ? <><span className="block">{fmtDatetime(scheduler.nextRunAt)}</span>
                          <span className="text-blue-600 text-xs">{timeUntil(scheduler.nextRunAt)}</span>
                        </>
                      : <span className="text-gray-400">—</span>
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500">Intervalo activo</span>
                  <span className="font-medium text-gray-900">
                    {SCHEDULE_OPTIONS.find(o => o.value === (scheduler?.interval ?? "disabled"))?.label ?? "—"}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {result && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3" data-testid="summary-cards">
            {summaryCards.map((card, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 text-center" data-testid={`summary-card-${i}`}>
                <i className={`${card.icon} text-xl ${card.color} block mb-1`} aria-hidden="true"></i>
                <div className="text-lg font-bold text-gray-900">{card.value}</div>
                <div className="text-xs text-gray-500 mt-0.5 leading-tight">{card.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900 flex items-center gap-2">
              <i className="ri-flow-chart text-gray-400" aria-hidden="true"></i>
              Pipeline de 8 etapas
            </h2>
            {result && (
              <span className="text-xs text-gray-500">
                {result.stages.filter(s => s.status === "success").length}/{result.stages.length} completadas · {result.totalDurationMs}ms
              </span>
            )}
          </div>

          <div className="divide-y divide-gray-100">
            {STAGE_DEFS.map((def) => {
              const stage = result?.stages.find((s) => s.stage === def.stage);
              const status = isRunning ? "pending" : (stage?.status ?? "pending");
              const isExpanded = expandedStage === def.stage;

              return (
                <div key={def.stage} data-testid={`stage-${def.stage}`}>
                  <div
                    className={`flex items-center gap-4 px-6 py-4 transition-colors ${stage ? "cursor-pointer hover:bg-gray-50" : ""} ${isExpanded ? "bg-gray-50" : ""}`}
                    onClick={() => stage && setExpandedStage(isExpanded ? null : def.stage)}
                  >
                    <div className="shrink-0 w-7 h-7 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-400">
                      {def.stage}
                    </div>
                    <div className={`w-9 h-9 rounded-xl ${def.bg} flex items-center justify-center shrink-0`}>
                      <i className={`${def.icon} ${def.color} text-base`} aria-hidden="true"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{def.name}</p>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {stage
                          ? Object.entries(stage.metrics).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(" · ")
                          : def.hint}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      {stage && <span className="text-xs text-gray-400">{stage.durationMs}ms</span>}
                      <StageStatusIcon status={status} />
                      {stage && <i className={`ri-arrow-${isExpanded ? "up" : "down"}-s-line text-gray-400 text-sm`} aria-hidden="true"></i>}
                    </div>
                  </div>

                  {isExpanded && stage && (
                    <div className="px-6 pb-5 bg-gray-50 border-t border-gray-100">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 mb-4">
                        {Object.entries(stage.metrics).map(([k, v], i) => (
                          <div key={i} className="bg-white rounded-lg border border-gray-200 p-3">
                            <div className="text-sm font-bold text-gray-900">{typeof v === "number" ? fmt(v) : v}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{k}</div>
                          </div>
                        ))}
                      </div>
                      <ul className="space-y-1.5">
                        {stage.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <i className="ri-arrow-right-s-line text-gray-400 shrink-0 mt-0.5" aria-hidden="true"></i>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
