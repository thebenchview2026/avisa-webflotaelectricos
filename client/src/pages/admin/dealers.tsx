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
import type { Dealer } from "@shared/schema";

const emptyDealer = { name: "", brand: "", address: "", city: "", province: "", phone: "", email: "", lat: 0, lng: 0, googleMapsUrl: "", active: true, sortOrder: 0 };

export default function AdminDealers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Dealer | null>(null);
  const [form, setForm] = useState<any>(emptyDealer);
  const { toast } = useToast();

  const { data: dealers = [], isLoading } = useQuery<Dealer[]>({ queryKey: ["/api/admin/dealers"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = { ...data, lat: Number(data.lat) || null, lng: Number(data.lng) || null, sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/dealers/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/dealers", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/dealers"] }); setDialogOpen(false); toast({ title: editing ? "Concesionario actualizado" : "Concesionario creado" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/dealers/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/dealers"] }); toast({ title: "Concesionario eliminado" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...emptyDealer }); setDialogOpen(true); };
  const openEdit = (d: Dealer) => { setEditing(d); setForm({ ...d }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-dealers-title">Concesionarios</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-dealer"><i className="ri-add-line mr-1"></i> Nuevo Concesionario</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm" data-testid="table-dealers">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3">Nombre</th>
                  <th className="text-left p-3">Marca</th>
                  <th className="text-left p-3">Ciudad</th>
                  <th className="text-left p-3">Provincia</th>
                  <th className="text-left p-3">Estado</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dealers.map(d => (
                  <tr key={d.id} className="border-b hover:bg-gray-50" data-testid={`row-dealer-${d.id}`}>
                    <td className="p-3 font-medium">{d.name}</td>
                    <td className="p-3">{d.brand}</td>
                    <td className="p-3">{d.city}</td>
                    <td className="p-3">{d.province}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${d.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{d.active ? "Activo" : "Inactivo"}</span>
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => openEdit(d)} className="text-blue-600 hover:text-blue-800 mr-2" data-testid={`button-edit-dealer-${d.id}`}><i className="ri-edit-line"></i></button>
                      <button onClick={() => { if (confirm("¿Eliminar?")) deleteMutation.mutate(d.id); }} className="text-red-600 hover:text-red-800" data-testid={`button-delete-dealer-${d.id}`}><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {dealers.length === 0 && <p className="text-center py-8 text-gray-500">No hay concesionarios</p>}
          </CardContent>
        </Card>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar Concesionario" : "Nuevo Concesionario"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="input-dealer-name" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Marca</label><Input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} data-testid="input-dealer-brand" /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Dirección</label><Input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} data-testid="input-dealer-address" /></div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Ciudad</label><Input value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} data-testid="input-dealer-city" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Provincia</label><Input value={form.province} onChange={e => setForm({ ...form, province: e.target.value })} data-testid="input-dealer-province" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Teléfono</label><Input value={form.phone ?? ""} onChange={e => setForm({ ...form, phone: e.target.value })} data-testid="input-dealer-phone" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Email</label><Input value={form.email ?? ""} onChange={e => setForm({ ...form, email: e.target.value })} data-testid="input-dealer-email" /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Google Maps URL</label><Input value={form.googleMapsUrl ?? ""} onChange={e => setForm({ ...form, googleMapsUrl: e.target.value })} data-testid="input-dealer-maps" /></div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.active !== false} onChange={e => setForm({ ...form, active: e.target.checked })} data-testid="input-dealer-active" /> Activo
            </label>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-dealer">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
