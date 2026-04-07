"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { EditorialContent } from "@shared/schema";

const TYPES = [
  { value: "novedad", label: "Novedad", color: "bg-blue-100 text-blue-700" },
  { value: "guia", label: "Guía", color: "bg-green-100 text-green-700" },
  { value: "comparativa", label: "Comparativa", color: "bg-purple-100 text-purple-700" },
  { value: "consejo", label: "Consejo", color: "bg-amber-100 text-amber-700" },
];

const emptyForm = {
  type: "novedad",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "",
  tags: [] as string[],
  author: "Equipo Grupo Avisa",
  featuredImage: "",
  published: true,
  metaTitle: "",
  metaDescription: "",
  readingTime: 5,
  relatedSlugs: [] as string[],
  relatedVehicleType: "",
};

export default function AdminEditorial() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EditorialContent | null>(null);
  const [form, setForm] = useState<any>({ ...emptyForm });
  const [filterType, setFilterType] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");
  const { toast } = useToast();

  const { data: items = [], isLoading } = useQuery<EditorialContent[]>({
    queryKey: ["/api/admin/editorial", filterType],
    queryFn: () => fetch(`/api/admin/editorial${filterType ? `?type=${filterType}` : ""}`).then(r => r.json()),
  });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editing) return (await apiRequest("PUT", `/api/admin/editorial/${editing.id}`, data)).json();
      return (await apiRequest("POST", "/api/admin/editorial", data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/editorial"] });
      setDialogOpen(false);
      toast({ title: editing ? "Artículo actualizado" : "Artículo creado" });
    },
    onError: (err: any) => toast({ title: "Error", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/editorial/${id}`); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/editorial"] });
      toast({ title: "Artículo eliminado" });
    },
  });

  function openNew() {
    setEditing(null);
    setForm({ ...emptyForm });
    setTagsInput("");
    setDialogOpen(true);
  }

  function openEdit(item: EditorialContent) {
    setEditing(item);
    setForm({
      type: item.type,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt || "",
      content: item.content || "",
      category: item.category || "",
      tags: item.tags || [],
      author: item.author || "Equipo Grupo Avisa",
      featuredImage: item.featuredImage || "",
      published: item.published,
      metaTitle: item.metaTitle || "",
      metaDescription: item.metaDescription || "",
      readingTime: item.readingTime || 5,
      relatedSlugs: item.relatedSlugs || [],
      relatedVehicleType: item.relatedVehicleType || "",
    });
    setTagsInput((item.tags || []).join(", "));
    setDialogOpen(true);
  }

  function handleSave() {
    const tags = tagsInput.split(",").map(t => t.trim()).filter(Boolean);
    saveMutation.mutate({ ...form, tags });
  }

  function autoSlug(title: string) {
    return title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  const typeLabel = (t: string) => TYPES.find(x => x.value === t);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-editorial-title">Contenido Editorial</h1>
        <Button onClick={openNew} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-editorial">
          <i className="ri-add-line mr-1" aria-hidden="true"></i> Nuevo artículo
        </Button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <Button variant={filterType === "" ? "default" : "outline"} size="sm" onClick={() => setFilterType("")} data-testid="button-filter-all">
          Todos ({items.length})
        </Button>
        {TYPES.map(t => (
          <Button key={t.value} variant={filterType === t.value ? "default" : "outline"} size="sm" onClick={() => setFilterType(t.value)} data-testid={`button-filter-${t.value}`}>
            {t.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Cargando...</div>
      ) : items.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-slate-500">
            No hay artículos todavía. Crea el primero.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map(item => {
            const tp = typeLabel(item.type);
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow" data-testid={`card-editorial-${item.slug}`}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tp?.color || "bg-slate-100"}`}>{tp?.label || item.type}</span>
                      {!item.published && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Borrador</span>}
                      {item.readingTime && <span className="text-xs text-slate-400">{item.readingTime} min</span>}
                    </div>
                    <h3 className="font-semibold text-slate-900 truncate">{item.title}</h3>
                    <p className="text-sm text-slate-500 truncate">{item.excerpt || "Sin extracto"}</p>
                    <div className="text-xs text-slate-400 mt-1">
                      /{item.type === "novedad" ? "novedades" : item.type === "guia" ? "guias" : item.type === "comparativa" ? "comparativas" : "consejos"}/{item.slug}
                      {item.publishedAt && <span className="ml-2">{new Date(item.publishedAt).toLocaleDateString("es-ES")}</span>}
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button variant="outline" size="sm" onClick={() => openEdit(item)} data-testid={`button-edit-${item.slug}`}>
                      <i className="ri-edit-line" aria-hidden="true"></i>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => { if (confirm("¿Eliminar este artículo?")) deleteMutation.mutate(item.id); }} data-testid={`button-delete-${item.slug}`}>
                      <i className="ri-delete-bin-line" aria-hidden="true"></i>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar artículo" : "Nuevo artículo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Tipo</label>
                <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} data-testid="select-type">
                  {TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Slug</label>
                <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="url-del-articulo" data-testid="input-slug" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Título</label>
              <Input
                value={form.title}
                onChange={e => {
                  const title = e.target.value;
                  setForm({ ...form, title, slug: form.slug || autoSlug(title) });
                }}
                placeholder="Título del artículo"
                data-testid="input-title"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Extracto</label>
              <textarea className="w-full mt-1 border rounded-md px-3 py-2 text-sm min-h-[60px]" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Resumen breve del artículo" data-testid="textarea-excerpt" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Contenido (Markdown)</label>
              <textarea className="w-full mt-1 border rounded-md px-3 py-2 text-sm min-h-[200px] font-mono" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Escribe el contenido en Markdown..." data-testid="textarea-content" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Autor</label>
                <Input value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} data-testid="input-author" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Tiempo de lectura (min)</label>
                <Input type="number" value={form.readingTime} onChange={e => setForm({ ...form, readingTime: parseInt(e.target.value) || 5 })} data-testid="input-reading-time" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Tags (separados por coma)</label>
              <Input value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="eléctricos, carga, autonomía" data-testid="input-tags" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Imagen destacada (URL)</label>
              <Input value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })} placeholder="https://..." data-testid="input-featured-image" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Meta título</label>
                <Input value={form.metaTitle} onChange={e => setForm({ ...form, metaTitle: e.target.value })} placeholder="Título SEO" data-testid="input-meta-title" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Categoría</label>
                <Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="movilidad-electrica" data-testid="input-category" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Meta descripción</label>
              <textarea className="w-full mt-1 border rounded-md px-3 py-2 text-sm min-h-[60px]" value={form.metaDescription} onChange={e => setForm({ ...form, metaDescription: e.target.value })} placeholder="Descripción para buscadores" data-testid="textarea-meta-description" />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">Tipo vehículo relacionado</label>
              <select className="w-full mt-1 border rounded-md px-3 py-2 text-sm" value={form.relatedVehicleType} onChange={e => setForm({ ...form, relatedVehicleType: e.target.value })} data-testid="select-vehicle-type">
                <option value="">Ninguno</option>
                <option value="electrico">Eléctrico</option>
                <option value="hibrido">Híbrido</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} id="published-check" data-testid="checkbox-published" />
              <label htmlFor="published-check" className="text-sm font-medium text-slate-700">Publicado</label>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave} disabled={saveMutation.isPending} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-save-editorial">
                {saveMutation.isPending ? "Guardando..." : (editing ? "Actualizar" : "Crear")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
