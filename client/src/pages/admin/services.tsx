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
import type { Service } from "@shared/schema";

const empty = { title: "", description: "", icon: "", features: [], category: "postventa", active: true, sortOrder: 0 };

export default function AdminServices() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [featuresText, setFeaturesText] = useState("");
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<Service[]>({ queryKey: ["/api/admin/services"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = { ...data, features: featuresText.split("\n").filter(Boolean), sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/services/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/services", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] }); setDialogOpen(false); toast({ title: "Servicio guardado" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/services/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/services"] }); toast({ title: "Servicio eliminado" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setFeaturesText(""); setDialogOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); setForm({ ...s }); setFeaturesText((s.features || []).join("\n")); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-services-title">Servicios</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-service"><i className="ri-add-line mr-1"></i> Nuevo</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm" data-testid="table-services">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3">Icono</th>
                  <th className="text-left p-3">Título</th>
                  <th className="text-left p-3">Categoría</th>
                  <th className="text-left p-3">Estado</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map(s => (
                  <tr key={s.id} className="border-b hover:bg-gray-50" data-testid={`row-service-${s.id}`}>
                    <td className="p-3"><i className={`${s.icon || "ri-tools-line"} text-lg text-[#ad023b]`}></i></td>
                    <td className="p-3 font-medium">{s.title}</td>
                    <td className="p-3">{s.category}</td>
                    <td className="p-3"><span className={`px-2 py-0.5 rounded text-xs ${s.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{s.active ? "Activo" : "Inactivo"}</span></td>
                    <td className="p-3 text-right">
                      <button onClick={() => openEdit(s)} className="text-blue-600 mr-2"><i className="ri-edit-line"></i></button>
                      <button onClick={() => { if (confirm("¿Eliminar?")) deleteMutation.mutate(s.id); }} className="text-red-600"><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {items.length === 0 && <p className="text-center py-8 text-gray-500">No hay servicios</p>}
          </CardContent>
        </Card>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar Servicio" : "Nuevo Servicio"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Título</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} data-testid="input-service-title" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Icono (clase ri-*)</label><Input value={form.icon ?? ""} onChange={e => setForm({ ...form, icon: e.target.value })} /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label><textarea value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[60px]" /></div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full border rounded px-3 py-2 text-sm">
                <option value="postventa">Postventa</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="general">General</option>
              </select>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Características (una por línea)</label><textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} className="w-full border rounded px-3 py-2 text-sm min-h-[60px]" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active !== false} onChange={e => setForm({ ...form, active: e.target.checked })} /> Activo</label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-service">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
