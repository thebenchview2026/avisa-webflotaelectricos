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
import type { Brand } from "@shared/schema";

const emptyBrand = { name: "", slug: "", logoUrl: "", description: "", country: "" };

export default function AdminBrands() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState<any>(emptyBrand);
  const { toast } = useToast();

  const { data: brands = [], isLoading } = useQuery<Brand[]>({ queryKey: ["/api/admin/brands"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editing) return (await apiRequest("PUT", `/api/admin/brands/${editing.id}`, data)).json();
      return (await apiRequest("POST", "/api/admin/brands", data)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/brands"] }); setDialogOpen(false); toast({ title: editing ? "Marca actualizada" : "Marca creada" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/brands/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/brands"] }); toast({ title: "Marca eliminada" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...emptyBrand }); setDialogOpen(true); };
  const openEdit = (b: Brand) => { setEditing(b); setForm({ ...b }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-brands-title">Marcas</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-brand">
          <i className="ri-add-line mr-1"></i> Nueva Marca
        </Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm" data-testid="table-brands">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-3">Logo</th>
                  <th className="text-left p-3">Nombre</th>
                  <th className="text-left p-3">Slug</th>
                  <th className="text-left p-3">País</th>
                  <th className="text-right p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {brands.map(b => (
                  <tr key={b.id} className="border-b hover:bg-gray-50" data-testid={`row-brand-${b.id}`}>
                    <td className="p-3">{b.logoUrl ? <img src={b.logoUrl} alt={b.name} className="w-8 h-8 object-contain" /> : <span className="text-gray-400">-</span>}</td>
                    <td className="p-3 font-medium">{b.name}</td>
                    <td className="p-3 text-gray-500">{b.slug}</td>
                    <td className="p-3">{b.country || "-"}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => openEdit(b)} className="text-blue-600 hover:text-blue-800 mr-2" data-testid={`button-edit-brand-${b.id}`}><i className="ri-edit-line"></i></button>
                      <button onClick={() => { if (confirm("¿Eliminar esta marca?")) deleteMutation.mutate(b.id); }} className="text-red-600 hover:text-red-800" data-testid={`button-delete-brand-${b.id}`}><i className="ri-delete-bin-line"></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? "Editar Marca" : "Nueva Marca"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="input-brand-name" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} data-testid="input-brand-slug" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Logo URL</label><Input value={form.logoUrl ?? ""} onChange={e => setForm({ ...form, logoUrl: e.target.value })} data-testid="input-brand-logo" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">País</label><Input value={form.country ?? ""} onChange={e => setForm({ ...form, country: e.target.value })} data-testid="input-brand-country" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label><textarea value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[60px]" data-testid="input-brand-description" /></div>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-brand">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
