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
import type { MaintenancePlan } from "@shared/schema";

const empty = { name: "", description: "", price: 0, features: [], highlighted: false, sortOrder: 0 };

export default function AdminPlans() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<MaintenancePlan | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [featuresText, setFeaturesText] = useState("");
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<MaintenancePlan[]>({ queryKey: ["/api/admin/maintenance-plans"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = { ...data, price: Number(data.price), features: featuresText.split("\n").filter(Boolean), sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/maintenance-plans/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/maintenance-plans", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-plans"] }); setDialogOpen(false); toast({ title: "Plan guardado" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/maintenance-plans/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/maintenance-plans"] }); toast({ title: "Plan eliminado" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setFeaturesText(""); setDialogOpen(true); };
  const openEdit = (p: MaintenancePlan) => { setEditing(p); setForm({ ...p }); setFeaturesText((p.features || []).join("\n")); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-plans-title">Planes de Mantenimiento</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-plan"><i className="ri-add-line mr-1"></i> Nuevo</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map(p => (
            <Card key={p.id} className={p.highlighted ? "ring-2 ring-[#ad023b]" : ""} data-testid={`card-plan-${p.id}`}>
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    {p.highlighted && <span className="text-xs bg-[#ad023b] text-white px-2 py-0.5 rounded">Recomendado</span>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="text-blue-600"><i className="ri-edit-line"></i></button>
                    <button onClick={() => { if (confirm("¿Eliminar?")) deleteMutation.mutate(p.id); }} className="text-red-600"><i className="ri-delete-bin-line"></i></button>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#ad023b] mb-2">{p.price?.toLocaleString("es-ES")} €<span className="text-sm text-gray-500 font-normal">/año</span></p>
                <p className="text-sm text-gray-600 mb-3">{p.description}</p>
                {p.features && p.features.length > 0 && (
                  <ul className="text-sm space-y-1">
                    {p.features.map((f, i) => <li key={i} className="flex items-center gap-1"><i className="ri-check-line text-green-600"></i>{f}</li>)}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && <p className="text-gray-500 col-span-3 text-center py-8">No hay planes</p>}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar Plan" : "Nuevo Plan"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="input-plan-name" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Precio (€/año)</label><Input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} data-testid="input-plan-price" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label><textarea value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[60px]" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Características (una por línea)</label><textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.highlighted || false} onChange={e => setForm({ ...form, highlighted: e.target.checked })} /> Destacado / Recomendado</label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-plan">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
