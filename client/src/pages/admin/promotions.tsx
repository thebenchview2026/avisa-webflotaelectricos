"use client";
import { useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Promotion } from "@shared/schema";

const empty = { title: "", subtitle: "", vehicleType: "electric", brandName: "", modelName: "", imageUrl: "", price: 0, monthlyPayment: "", features: [], badge: "", link: "", active: true, sortOrder: 0 };

export default function AdminPromotions() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Promotion | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [featuresText, setFeaturesText] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<Promotion[]>({ queryKey: ["/api/admin/promotions"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      const payload = { ...data, price: Number(data.price) || null, features: featuresText.split("\n").filter(Boolean), sortOrder: Number(data.sortOrder) || 0 };
      if (editing) return (await apiRequest("PUT", `/api/admin/promotions/${editing.id}`, payload)).json();
      return (await apiRequest("POST", "/api/admin/promotions", payload)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/promotions"] }); setDialogOpen(false); toast({ title: "Promoción guardada" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/promotions/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/promotions"] }); toast({ title: "Promoción eliminada" }); },
  });

  const uploadImage = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    setUploadingImage(true);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setForm((f: any) => ({ ...f, imageUrl: data.url }));
      toast({ title: "Imagen subida correctamente" });
    } catch (e: any) {
      toast({ title: "Error al subir imagen", description: e.message, variant: "destructive" });
    } finally {
      setUploadingImage(false);
    }
  };

  const openCreate = () => { setEditing(null); setForm({ ...empty }); setFeaturesText(""); setDialogOpen(true); };
  const openEdit = (p: Promotion) => { setEditing(p); setForm({ ...p }); setFeaturesText((p.features || []).join("\n")); setDialogOpen(true); };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-promotions-title">Promociones</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-promotion"><i className="ri-add-line mr-1"></i> Nueva</Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50"><tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Título</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Marca / Modelo</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Precio</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Estado</th>
                <th className="px-4 py-3"></th>
              </tr></thead>
              <tbody>
                {items.map((p, i) => (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} data-testid={`row-promotion-${p.id}`}>
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 text-gray-500">{p.brandName} {p.modelName}</td>
                    <td className="px-4 py-3 text-gray-500">{p.price ? `${p.price.toLocaleString("es-ES")} €` : "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {p.active ? "Activa" : "Inactiva"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right flex gap-2 justify-end">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(p)} data-testid={`button-edit-promotion-${p.id}`}><i className="ri-edit-line"></i></Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => { if (confirm("¿Eliminar esta promoción?")) deleteMutation.mutate(String(p.id)); }} data-testid={`button-delete-promotion-${p.id}`}><i className="ri-delete-bin-line"></i></Button>
                    </td>
                  </tr>
                ))}
                {items.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-400">Sin promociones aún</td></tr>}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar Promoción" : "Nueva Promoción"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Título</label><Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} data-testid="input-promo-title" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Subtítulo</label><Input value={form.subtitle ?? ""} onChange={e => setForm({ ...form, subtitle: e.target.value })} /></div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de vehículo</label>
                <select value={form.vehicleType} onChange={e => setForm({ ...form, vehicleType: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-vehicle-type">
                  <option value="electric">Eléctrico</option>
                  <option value="hybrid">Híbrido</option>
                </select>
              </div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Badge</label><Input value={form.badge ?? ""} onChange={e => setForm({ ...form, badge: e.target.value })} /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Marca</label><Input value={form.brandName ?? ""} onChange={e => setForm({ ...form, brandName: e.target.value })} /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Modelo</label><Input value={form.modelName ?? ""} onChange={e => setForm({ ...form, modelName: e.target.value })} /></div>
            </div>
            <div className="flex gap-3">
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Precio (€)</label><Input type="number" value={form.price ?? ""} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
              <div className="w-1/2"><label className="block text-xs font-medium text-gray-600 mb-1">Cuota mensual</label><Input value={form.monthlyPayment ?? ""} onChange={e => setForm({ ...form, monthlyPayment: e.target.value })} /></div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
              <div className="flex gap-2">
                <Input
                  value={form.imageUrl ?? ""}
                  onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://... o sube desde tu ordenador"
                  data-testid="input-promo-image-url"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  disabled={uploadingImage}
                  data-testid="button-upload-promo-image"
                  className="shrink-0 flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  {uploadingImage
                    ? <><i className="ri-loader-4-line animate-spin text-sm"></i><span>Subiendo...</span></>
                    : <><i className="ri-upload-2-line text-sm"></i><span>Subir</span></>
                  }
                </button>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])}
                />
              </div>
              {form.imageUrl && (
                <div className="mt-2 rounded overflow-hidden border border-gray-200 h-24 bg-gray-50">
                  <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                </div>
              )}
            </div>

            <div><label className="block text-xs font-medium text-gray-600 mb-1">Link (URL de la ficha)</label><Input value={form.link ?? ""} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="/vehiculos/electricos/volkswagen-id3" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Características (una por línea)</label><textarea value={featuresText} onChange={e => setFeaturesText(e.target.value)} className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" /></div>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.active !== false} onChange={e => setForm({ ...form, active: e.target.checked })} /> Activa</label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveMutation.mutate(form)} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-promotion">{saveMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
