"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Section } from "@shared/schema";

const empty = { pageSlug: "", sectionKey: "", title: "", subtitle: "", content: null, imageUrl: "", active: true, sortOrder: 0 };

export default function AdminSections() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Section | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [contentText, setContentText] = useState("");
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<Section[]>({ queryKey: ["/api/admin/sections"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      let content = null;
      try { content = JSON.parse(contentText); } catch { content = contentText; }
      const payload = { ...data, content, sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/sections/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/sections", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/sections"] }); setDialogOpen(false); toast({ title: "Sección guardada" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/sections/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/sections"] }); toast({ title: "Sección eliminada" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setContentText(""); setDialogOpen(true); };
  const openEdit = (s: Section) => { setEditing(s); setForm({ ...s }); setContentText(typeof s.content === "string" ? s.content : JSON.stringify(s.content, null, 2) || ""); setDialogOpen(true); };

  const grouped = items.reduce<Record<string, Section[]>>((acc, s) => {
    if (!acc[s.pageSlug]) acc[s.pageSlug] = [];
    acc[s.pageSlug].push(s);
    return acc;
  }, {});

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-sections-title">Secciones de Contenido</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-section"><i className="ri-add-line mr-1"></i> Nueva</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([page, secs]) => (
            <Card key={page}>
              <CardContent className="p-4">
                <h3 className="font-bold text-sm text-gray-500 uppercase mb-3">Página: {page}</h3>
                <div className="space-y-2">
                  {secs.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-2 border rounded" data-testid={`section-${s.id}`}>
                      <div>
                        <span className="font-medium text-sm">{s.sectionKey}</span>
                        {s.title && <span className="text-gray-500 text-sm ml-2">- {s.title}</span>}
                        <span className={`ml-2 px-2 py-0.5 rounded text-xs ${s.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.active ? "Activo" : "Inactivo"}</span>
                      </div>
                      <div>
                        <button onClick={() => openEdit(s)} className="text-blue-600 mr-2"><i className="ri-edit-line"></i></button>
                        <button onClick={() => { if (confirm("¿Eliminar?")) deleteMutation.mutate(s.id); }} className="text-red-600"><i className="ri-delete-bin-line"></i></button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && <p className="text-center py-8 text-gray-500">No hay secciones. Crea una para empezar a editar el contenido de las páginas.</p>}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar Sección" : "Nueva Sección"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Página (slug)</label><Input value={form.pageSlug} onChange={e => setForm({ ...form, pageSlug: e.target.value })} data-testid="input-section-page" placeholder="ej: home, electrificacion" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Clave de sección</label><Input value={form.sectionKey} onChange={e => setForm({ ...form, sectionKey: e.target.value })} data-testid="input-section-key" placeholder="ej: hero, cta, features" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Título</label><Input value={form.title ?? ""} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Subtítulo</label><Input value={form.subtitle ?? ""} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">URL imagen</label><Input value={form.imageUrl ?? ""} onChange={e => setForm({ ...form, imageUrl: e.target.value })} /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Contenido (JSON o texto)</label><textarea value={contentText} onChange={e => setContentText(e.target.value)} className="w-full border rounded px-3 py-2 text-sm min-h-[150px] font-mono" data-testid="input-section-content" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active !== false} onChange={e => setForm({ ...form, active: e.target.checked })} /> Activo</label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-section">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
