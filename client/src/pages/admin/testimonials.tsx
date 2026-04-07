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
import type { Testimonial } from "@shared/schema";

const empty = { name: "", role: "", company: "", rating: 5, content: "", imageUrl: "", published: true, sortOrder: 0 };

export default function AdminTestimonials() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<any>(empty);
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<Testimonial[]>({ queryKey: ["/api/admin/testimonials"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = { ...data, rating: Number(data.rating), sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/testimonials/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/testimonials", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] }); setDialogOpen(false); toast({ title: "Testimonio guardado" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/testimonials/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/testimonials"] }); toast({ title: "Testimonio eliminado" }); },
  });

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setDialogOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm({ ...t }); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-testimonials-title">Testimonios</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-testimonial"><i className="ri-add-line mr-1"></i> Nuevo</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(t => (
            <Card key={t.id} data-testid={`card-testimonial-${t.id}`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-medium">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role} {t.company ? `- ${t.company}` : ""}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(t)} className="text-blue-600"><i className="ri-edit-line"></i></button>
                    <button onClick={() => { if (confirm("¿Eliminar?")) deleteMutation.mutate(t.id); }} className="text-red-600"><i className="ri-delete-bin-line"></i></button>
                  </div>
                </div>
                <div className="flex mb-2">{[...Array(5)].map((_, i) => <i key={i} className={`ri-star-${i < t.rating ? "fill" : "line"} text-yellow-400 text-sm`}></i>)}</div>
                <p className="text-sm text-gray-600 line-clamp-3">{t.content}</p>
                <span className={`mt-2 inline-block px-2 py-0.5 rounded text-xs ${t.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {t.published ? "Publicado" : "Borrador"}
                </span>
              </CardContent>
            </Card>
          ))}
          {items.length === 0 && <p className="text-gray-500 col-span-3 text-center py-8">No hay testimonios</p>}
        </div>
      )}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Editar Testimonio" : "Nuevo Testimonio"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} data-testid="input-testimonial-name" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Cargo</label><Input value={form.role ?? ""} onChange={e => setForm({ ...form, role: e.target.value })} data-testid="input-testimonial-role" /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Empresa</label><Input value={form.company ?? ""} onChange={e => setForm({ ...form, company: e.target.value })} data-testid="input-testimonial-company" /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Valoración (1-5)</label><Input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} data-testid="input-testimonial-rating" /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Contenido</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" data-testid="input-testimonial-content" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">URL imagen</label><Input value={form.imageUrl ?? ""} onChange={e => setForm({ ...form, imageUrl: e.target.value })} data-testid="input-testimonial-image" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.published !== false} onChange={e => setForm({ ...form, published: e.target.checked })} /> Publicado</label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-testimonial">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
