import { storage } from "./storage";

export type ScheduleInterval = "disabled" | "12h" | "daily" | "weekly" | "monthly";

export interface SchedulerState {
  interval: ScheduleInterval;
  lastRunAt: Date | null;
  nextRunAt: Date | null;
  lastRunDurationMs: number | null;
  lastRunStatus: "success" | "error" | null;
  lastRunSummary: string | null;
  totalRuns: number;
  isRunning: boolean;
}

const INTERVAL_MS: Record<ScheduleInterval, number | null> = {
  disabled: null,
  "12h": 12 * 60 * 60 * 1000,
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

const state: SchedulerState = {
  interval: "disabled",
  lastRunAt: null,
  nextRunAt: null,
  lastRunDurationMs: null,
  lastRunStatus: null,
  lastRunSummary: null,
  totalRuns: 0,
  isRunning: false,
};

let timer: ReturnType<typeof setTimeout> | null = null;

async function executeGrowthCycle() {
  if (state.isRunning) return;
  state.isRunning = true;
  const started = Date.now();
  console.log("[growth-scheduler] Iniciando ciclo automático...");

  try {
    const { runGrowthCycle } = await import("../client/src/lib/scheduled-growth");
    const result = runGrowthCycle();
    const durationMs = Date.now() - started;

    state.lastRunAt = new Date();
    state.lastRunDurationMs = durationMs;
    state.lastRunStatus = "success";
    state.lastRunSummary = `${result.summary.pagesGenerated} páginas · ${result.summary.faqsGenerated} FAQs · ${result.summary.sitemapUrls} URLs en sitemap`;
    state.totalRuns++;

    await storage.setSetting("growth_last_run_at", state.lastRunAt.toISOString(), "scheduled_growth");
    await storage.setSetting("growth_last_run_status", "success", "scheduled_growth");
    await storage.setSetting("growth_last_run_summary", state.lastRunSummary, "scheduled_growth");
    await storage.setSetting("growth_total_runs", String(state.totalRuns), "scheduled_growth");

    console.log(`[growth-scheduler] Ciclo completado en ${durationMs}ms — ${state.lastRunSummary}`);
  } catch (err: any) {
    state.lastRunAt = new Date();
    state.lastRunDurationMs = Date.now() - started;
    state.lastRunStatus = "error";
    state.lastRunSummary = err.message;
    state.totalRuns++;
    await storage.setSetting("growth_last_run_status", "error", "scheduled_growth").catch(() => {});
    console.error("[growth-scheduler] Error en ciclo:", err);
  } finally {
    state.isRunning = false;
    scheduleNext();
  }
}

function scheduleNext() {
  if (timer) { clearTimeout(timer); timer = null; }

  const ms = INTERVAL_MS[state.interval];
  if (!ms) { state.nextRunAt = null; return; }

  state.nextRunAt = new Date(Date.now() + ms);
  timer = setTimeout(executeGrowthCycle, ms);
  console.log(`[growth-scheduler] Próxima ejecución: ${state.nextRunAt.toISOString()} (${state.interval})`);
}

export async function initScheduler() {
  try {
    const [intervalSetting, lastRunSetting, lastStatusSetting, lastSummarySetting, totalRunsSetting] = await Promise.all([
      storage.getSetting("growth_schedule_interval"),
      storage.getSetting("growth_last_run_at"),
      storage.getSetting("growth_last_run_status"),
      storage.getSetting("growth_last_run_summary"),
      storage.getSetting("growth_total_runs"),
    ]);

    state.interval = (intervalSetting?.value as ScheduleInterval) || "disabled";
    state.lastRunAt = lastRunSetting?.value ? new Date(lastRunSetting.value) : null;
    state.lastRunStatus = (lastStatusSetting?.value as "success" | "error") || null;
    state.lastRunSummary = lastSummarySetting?.value || null;
    state.totalRuns = totalRunsSetting?.value ? parseInt(totalRunsSetting.value) : 0;

    if (state.interval !== "disabled") {
      const ms = INTERVAL_MS[state.interval];
      if (ms && state.lastRunAt) {
        const elapsed = Date.now() - state.lastRunAt.getTime();
        const remaining = ms - elapsed;
        if (remaining <= 0) {
          console.log("[growth-scheduler] Ejecutando ciclo atrasado...");
          setTimeout(executeGrowthCycle, 5000);
        } else {
          state.nextRunAt = new Date(Date.now() + remaining);
          timer = setTimeout(executeGrowthCycle, remaining);
          console.log(`[growth-scheduler] Reanudado. Próxima ejecución: ${state.nextRunAt.toISOString()}`);
        }
      } else {
        scheduleNext();
      }
    }
    console.log(`[growth-scheduler] Iniciado con intervalo: ${state.interval}`);
  } catch (err: any) {
    console.error("[growth-scheduler] Error al inicializar:", err);
  }
}

export async function setScheduleInterval(interval: ScheduleInterval) {
  state.interval = interval;
  if (timer) { clearTimeout(timer); timer = null; }
  state.nextRunAt = null;
  await storage.setSetting("growth_schedule_interval", interval, "scheduled_growth");
  if (interval !== "disabled") scheduleNext();
  return getSchedulerState();
}

export function getSchedulerState(): SchedulerState {
  return { ...state };
}

export async function triggerManualRun(): Promise<void> {
  if (timer) { clearTimeout(timer); timer = null; }
  await executeGrowthCycle();
}
