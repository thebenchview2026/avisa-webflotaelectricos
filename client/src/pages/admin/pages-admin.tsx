"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "@/lib/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Page } from "@shared/schema";

const emptyPage = { title: "", slug: "", content: "", metaTitle: "", metaDescription: "", published: true };

export default function AdminPages() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Page | null>(null);
  const [form, setForm] = useState<any>(emptyPage);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const { data: pages = [], isLoading } = useQuery<Page[]>({ queryKey: ["/api/admin/pages"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editing) return (await apiRequest("PUT", `/api/admin/pages/${editing.id}`, data)).json();
      return (await apiRequest("POST", "/api/admin/pages", data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      setDialogOpen(false);
      toast({ title: editing ? "Página actualizada" : "Página creada" });
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/pages/${id}`); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Página eliminada" });
    },
  });

  const openCreate = () => { setEditing(null); setForm({ ...emptyPage }); setDialogOpen(true); };
  const openEdit = (p: Page) => { setEditing(p); setForm({ title: p.title, slug: p.slug, content: p.content || "", metaTitle: p.metaTitle || "", metaDescription: p.metaDescription || "", published: p.published }); setDialogOpen(true); };

  const filtered = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold" data-testid="text-pages-title">Páginas del Sitio</h1>
          <p className="text-sm text-gray-500 mt-1">Gestiona el contenido y SEO de las páginas del frontend</p>
        </div>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-page">
          <i className="ri-add-line mr-1"></i> Nueva Página
        </Button>
      </div>

      <div className="mb-4">
        <div className="relative max-w-sm">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <Input
            placeholder="Buscar páginas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-pages"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Cargando...</div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <i className="ri-pages-line text-4xl text-gray-300 mb-3 block"></i>
            <p className="text-gray-500">{search ? "No se encontraron páginas" : "No hay páginas registradas"}</p>
            {!search && <p className="text-sm text-gray-400 mt-1">Las páginas se crearán automáticamente al reiniciar el servidor</p>}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filtered.map(p => (
            <Card key={p.id} className="hover:shadow-md transition-shadow" data-testid={`card-page-${p.id}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate" data-testid={`text-page-title-${p.id}`}>{p.title}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs shrink-0 ${p.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {p.published ? "Publicada" : "Borrador"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <i className="ri-link text-xs"></i>
                      <span className="font-mono text-xs">/{p.slug}</span>
                    </div>
                    {p.content && (
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">{p.content}</p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                      {p.metaTitle && (
                        <span className="flex items-center gap-1">
                          <i className="ri-seo-line"></i> Title: {p.metaTitle.substring(0, 50)}{p.metaTitle.length > 50 ? "..." : ""}
                        </span>
                      )}
                      {p.metaDescription && (
                        <span className="flex items-center gap-1">
                          <i className="ri-file-text-line"></i> Desc: {p.metaDescription.substring(0, 60)}{p.metaDescription.length > 60 ? "..." : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => navigate(`/admin/pages/edit/${p.slug}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Editar página completa"
                      data-testid={`button-edit-page-${p.id}`}
                    >
                      <i className="ri-edit-line text-lg"></i>
                    </button>
                    <button
                      onClick={() => { if (confirm("¿Eliminar esta página?")) deleteMutation.mutate(p.id); }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Eliminar"
                      data-testid={`button-delete-page-${p.id}`}
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-400">
        {filtered.length} de {pages.length} páginas
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Página" : "Nueva Página"}</DialogTitle>
            <DialogDescription>
              {editing ? `Editando: /${editing.slug}` : "Crea una nueva página para el sitio web"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Título de la Página</label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Ej: Servicio Postventa" data-testid="input-page-title" />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Slug (URL)</label>
                <div className="flex items-center">
                  <span className="text-sm text-gray-400 mr-1">/</span>
                  <Input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Ej: postventa" data-testid="input-page-slug" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contenido / Descripción</label>
              <textarea
                value={form.content ?? ""}
                onChange={e => setForm({ ...form, content: e.target.value })}
                className="w-full border rounded-md px-3 py-2 text-sm min-h-[150px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b]"
                placeholder="Descripción o contenido principal de la página..."
                data-testid="input-page-content"
              />
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-1">
                <i className="ri-seo-line"></i> SEO - Metadatos
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Meta Title</label>
                  <Input
                    value={form.metaTitle ?? ""}
                    onChange={e => setForm({ ...form, metaTitle: e.target.value })}
                    placeholder="Título para motores de búsqueda (50-60 caracteres)"
                    data-testid="input-page-metatitle"
                  />
                  <span className="text-xs text-gray-400 mt-0.5 block">{(form.metaTitle ?? "").length}/60 caracteres</span>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label>
                  <textarea
                    value={form.metaDescription ?? ""}
                    onChange={e => setForm({ ...form, metaDescription: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b]"
                    placeholder="Descripción para motores de búsqueda (150-160 caracteres)"
                    data-testid="input-page-metadesc"
                  />
                  <span className="text-xs text-gray-400 mt-0.5 block">{(form.metaDescription ?? "").length}/160 caracteres</span>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.published !== false} onChange={e => setForm({ ...form, published: e.target.checked })} className="rounded" data-testid="input-page-published" />
              Página publicada y visible en el sitio
            </label>

            <div className="flex justify-end gap-2 pt-3 border-t">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
              <Button
                onClick={() => saveMutation.mutate(form)}
                className="bg-[#ad023b] hover:bg-[#8d0230]"
                disabled={saveMutation.isPending || !form.title || !form.slug}
                data-testid="button-save-page"
              >
                {saveMutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
