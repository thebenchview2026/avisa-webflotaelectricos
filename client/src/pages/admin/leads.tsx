"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Lead } from "@shared/schema";

const statusOptions = [
  { value: "nuevo", label: "Nuevo", color: "bg-blue-100 text-blue-700" },
  { value: "contactado", label: "Contactado", color: "bg-yellow-100 text-yellow-700" },
  { value: "convertido", label: "Convertido", color: "bg-green-100 text-green-700" },
  { value: "descartado", label: "Descartado", color: "bg-gray-100 text-gray-700" },
];

const sourceLabels: Record<string, string> = {
  web: "Web",
  home: "Inicio",
  electricos: "Eléctricos",
  hibridos: "Híbridos",
  autoplus: "Plan MOVES",
  postventa: "Postventa",
  concesionarios: "Concesionarios",
};

interface LeadNote {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

export default function AdminLeads() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const { toast } = useToast();

  const { data: leads = [], isLoading } = useQuery<Lead[]>({ queryKey: ["/api/admin/leads"] });

  const { data: leadDetail } = useQuery<{ lead: Lead; notes: LeadNote[] }>({
    queryKey: ["/api/admin/leads", selectedLead],
    enabled: !!selectedLead,
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PUT", `/api/admin/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Estado actualizado" });
    },
  });

  const updateNotes = useMutation({
    mutationFn: async ({ id, notes }: { id: string; notes: string }) => {
      await apiRequest("PUT", `/api/admin/leads/${id}`, { notes });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Notas guardadas" });
    },
  });

  const addNote = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      await apiRequest("POST", `/api/admin/leads/${id}/notes`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads", selectedLead] });
      setNoteText("");
      toast({ title: "Nota añadida" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/leads/${id}`); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/leads"] });
      toast({ title: "Lead eliminado" });
      setSelectedLead(null);
    },
  });

  const exportCSV = () => { window.open("/api/admin/leads/export", "_blank"); };

  const filtered = leads.filter(l => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || l.status === filterStatus;
    const matchSource = !filterSource || l.source === filterSource;
    return matchSearch && matchStatus && matchSource;
  });

  const uniqueSources = [...new Set(leads.map(l => l.source).filter(Boolean))];

  return (
    <AdminLayout>
      <div className="space-y-4" data-testid="page-admin-leads">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold" data-testid="text-leads-title">Leads</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{filtered.length} de {leads.length}</span>
            <Button onClick={exportCSV} variant="outline" size="sm" data-testid="button-export-csv">
              <i className="ri-download-line mr-1"></i> Exportar CSV
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Input placeholder="Buscar por nombre o email..." value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-leads" className="max-w-xs" />
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
            data-testid="select-filter-status"
          >
            <option value="">Todos los estados</option>
            {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
            data-testid="select-filter-source"
          >
            <option value="">Todas las fuentes</option>
            {uniqueSources.map(s => <option key={s} value={s}>{sourceLabels[s as string] || s}</option>)}
          </select>
          {(filterStatus || filterSource || search) && (
            <button onClick={() => { setFilterStatus(""); setFilterSource(""); setSearch(""); }} className="text-sm text-[#ad023b] hover:underline" data-testid="button-clear-filters">
              Limpiar filtros
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm" data-testid="table-leads">
                      <thead className="bg-gray-50 border-b">
                        <tr>
                          <th className="text-left p-3">Nombre</th>
                          <th className="text-left p-3">Email</th>
                          <th className="text-left p-3">Teléfono</th>
                          <th className="text-left p-3">Fuente</th>
                          <th className="text-left p-3">Estado</th>
                          <th className="text-left p-3">Fecha</th>
                          <th className="text-right p-3">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map(l => {
                          const st = statusOptions.find(s => s.value === l.status) || statusOptions[0];
                          return (
                            <tr
                              key={l.id}
                              className={`border-b hover:bg-gray-50 cursor-pointer transition-colors ${selectedLead === l.id ? "bg-blue-50" : ""}`}
                              onClick={() => setSelectedLead(l.id)}
                              data-testid={`row-lead-${l.id}`}
                            >
                              <td className="p-3 font-medium">{l.name}</td>
                              <td className="p-3 text-gray-600">{l.email}</td>
                              <td className="p-3 text-gray-600">{l.phone || "-"}</td>
                              <td className="p-3">
                                <span className="text-xs text-gray-500">{sourceLabels[l.source as string] || l.source}</span>
                              </td>
                              <td className="p-3">
                                <select
                                  value={l.status || "nuevo"}
                                  onChange={e => { e.stopPropagation(); updateStatus.mutate({ id: l.id, status: e.target.value }); }}
                                  onClick={e => e.stopPropagation()}
                                  className={`px-2 py-0.5 rounded text-xs font-medium border-0 cursor-pointer ${st.color}`}
                                  data-testid={`select-status-${l.id}`}
                                >
                                  {statusOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                </select>
                              </td>
                              <td className="p-3 text-gray-500 text-xs">{l.createdAt ? new Date(l.createdAt).toLocaleDateString("es-ES") : "-"}</td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={e => { e.stopPropagation(); if (confirm("¿Eliminar este lead?")) deleteMutation.mutate(l.id); }}
                                  className="text-red-500 hover:text-red-700 p-1"
                                  data-testid={`button-delete-lead-${l.id}`}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  {filtered.length === 0 && <p className="text-center py-8 text-gray-500">No hay leads que coincidan con los filtros</p>}
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            {selectedLead && leadDetail ? (
              <Card>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900" data-testid="text-lead-detail-name">{leadDetail.lead.name}</h3>
                    <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600">
                      <i className="ri-close-line"></i>
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-mail-line text-gray-400"></i>
                      <a href={`mailto:${leadDetail.lead.email}`} className="text-[#ad023b] hover:underline">{leadDetail.lead.email}</a>
                    </div>
                    {leadDetail.lead.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <i className="ri-phone-line text-gray-400"></i>
                        <a href={`tel:${leadDetail.lead.phone}`} className="hover:underline">{leadDetail.lead.phone}</a>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <i className="ri-map-pin-line text-gray-400"></i>
                      <span>{sourceLabels[leadDetail.lead.source as string] || leadDetail.lead.source}</span>
                    </div>
                    {leadDetail.lead.interest && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <i className="ri-car-line text-gray-400"></i>
                        <span>{leadDetail.lead.interest}</span>
                      </div>
                    )}
                  </div>

                  {leadDetail.lead.message && (
                    <div>
                      <label className="text-xs font-medium text-gray-500 block mb-1">Mensaje</label>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{leadDetail.lead.message}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-1">Notas internas</label>
                    <textarea
                      defaultValue={leadDetail.lead.notes || ""}
                      onBlur={e => {
                        if (e.target.value !== (leadDetail.lead.notes || "")) {
                          updateNotes.mutate({ id: leadDetail.lead.id, notes: e.target.value });
                        }
                      }}
                      className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none h-20 focus:ring-1 focus:ring-[#ad023b] focus:border-[#ad023b] outline-none"
                      placeholder="Añadir notas sobre este lead..."
                      data-testid="textarea-lead-notes"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-500 block mb-2">Historial de notas</label>
                    {leadDetail.notes && leadDetail.notes.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {leadDetail.notes.map((n: LeadNote) => (
                          <div key={n.id} className="bg-gray-50 p-2 rounded text-sm">
                            <p className="text-gray-700">{n.content}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              {new Date(n.createdAt).toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400">Sin historial de notas</p>
                    )}
                    <div className="flex gap-2 mt-2">
                      <input
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        placeholder="Nueva nota..."
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-[#ad023b] focus:border-[#ad023b] outline-none"
                        data-testid="input-new-note"
                        onKeyDown={e => {
                          if (e.key === "Enter" && noteText.trim()) {
                            addNote.mutate({ id: selectedLead, content: noteText.trim() });
                          }
                        }}
                      />
                      <button
                        onClick={() => { if (noteText.trim()) addNote.mutate({ id: selectedLead, content: noteText.trim() }); }}
                        disabled={!noteText.trim() || addNote.isPending}
                        className="bg-[#ad023b] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#8d0230] disabled:opacity-50 transition-colors"
                        data-testid="button-add-note"
                      >
                        <i className="ri-send-plane-line"></i>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-gray-400">
                  <i className="ri-cursor-line text-3xl mb-2 block"></i>
                  <p className="text-sm">Selecciona un lead para ver detalles</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
