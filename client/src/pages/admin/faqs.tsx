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
import type { FaqCategory, Faq } from "@shared/schema";

export default function AdminFaqs() {
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [faqDialogOpen, setFaqDialogOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<FaqCategory | null>(null);
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null);
  const [catForm, setCatForm] = useState<any>({ name: "", slug: "", icon: "", description: "", sortOrder: 0 });
  const [faqForm, setFaqForm] = useState<any>({ categoryId: "", question: "", answer: "", videoUrl: "", sortOrder: 0, published: true, homeFeatured: false });
  const [activeTab, setActiveTab] = useState<"home" | "all">("home");
  const [filterCat, setFilterCat] = useState<string>("all");
  const { toast } = useToast();

  const { data: categories = [] } = useQuery<FaqCategory[]>({ queryKey: ["/api/admin/faq-categories"] });
  const { data: faqs = [], isLoading: faqsLoading } = useQuery<Faq[]>({ queryKey: ["/api/admin/faqs"] });

  const homeFaqs = faqs.filter(f => (f as any).homeFeatured);
  const displayFaqs = activeTab === "home"
    ? homeFaqs
    : (filterCat === "all" ? faqs : faqs.filter(f => f.categoryId === filterCat)).slice(0, 100);

  const saveCatMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingCat) return (await apiRequest("PUT", `/api/admin/faq-categories/${editingCat.id}`, data)).json();
      return (await apiRequest("POST", "/api/admin/faq-categories", data)).json();
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-categories"] }); setCatDialogOpen(false); toast({ title: "Categoría guardada" }); },
  });

  const deleteCatMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/faq-categories/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/faq-categories"] }); toast({ title: "Categoría eliminada" }); },
  });

  const saveFaqMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editingFaq) return (await apiRequest("PUT", `/api/admin/faqs/${editingFaq.id}`, data)).json();
      return (await apiRequest("POST", "/api/admin/faqs", data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faqs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs/home"] });
      setFaqDialogOpen(false);
      toast({ title: "Pregunta guardada" });
    },
  });

  const deleteFaqMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/faqs/${id}`); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faqs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs/home"] });
      toast({ title: "Pregunta eliminada" });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, current }: { id: string; current: boolean }) => {
      return (await apiRequest("PUT", `/api/admin/faqs/${id}`, { homeFeatured: !current })).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faqs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/faqs/home"] });
    },
  });

  function openEditFaq(f: Faq) {
    setEditingFaq(f);
    setFaqForm({ ...f, homeFeatured: (f as any).homeFeatured ?? false });
    setFaqDialogOpen(true);
  }

  function openNewFaq() {
    setEditingFaq(null);
    setFaqForm({ categoryId: categories[0]?.id || "", question: "", answer: "", videoUrl: "", sortOrder: 0, published: true, homeFeatured: false });
    setFaqDialogOpen(true);
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-faqs-title">Preguntas Frecuentes</h1>
        <Button onClick={openNewFaq} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-faq">
          <i className="ri-add-line mr-1"></i> Nueva pregunta
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-1">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base">Categorías</CardTitle>
              <button onClick={() => { setEditingCat(null); setCatForm({ name: "", slug: "", icon: "", description: "", sortOrder: 0 }); setCatDialogOpen(true); }} className="text-[#ad023b] hover:text-[#8d0230]" data-testid="button-add-category">
                <i className="ri-add-circle-line text-lg"></i>
              </button>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                {categories.map(c => (
                  <div key={c.id} className="flex justify-between items-center p-2 rounded hover:bg-gray-50" data-testid={`cat-${c.id}`}>
                    <span className="text-sm font-medium">{c.name}</span>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingCat(c); setCatForm({ ...c }); setCatDialogOpen(true); }} className="text-blue-500 hover:text-blue-700 p-1"><i className="ri-edit-line text-xs"></i></button>
                      <button onClick={() => { if (confirm("¿Eliminar?")) deleteCatMutation.mutate(c.id); }} className="text-red-500 hover:text-red-700 p-1"><i className="ri-delete-bin-line text-xs"></i></button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setActiveTab("home")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "home" ? "bg-[#ad023b] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  data-testid="tab-home-faqs"
                >
                  <i className="ri-home-heart-line"></i>
                  Destacadas en Home ({homeFaqs.length})
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "all" ? "bg-[#ad023b] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  data-testid="tab-all-faqs"
                >
                  <i className="ri-list-check"></i>
                  Todas ({faqs.length})
                </button>
                {activeTab === "all" && (
                  <select
                    value={filterCat}
                    onChange={e => setFilterCat(e.target.value)}
                    className="ml-auto border rounded px-3 py-2 text-sm"
                    data-testid="select-filter-category"
                  >
                    <option value="all">Todas las categorías</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                )}
              </div>
              {activeTab === "home" && (
                <p className="text-xs text-gray-500 mt-2">
                  <i className="ri-information-line mr-1"></i>
                  Estas son las preguntas que aparecen en la sección FAQ de la portada. Usa la estrella ★ para añadir/quitar preguntas. Máximo recomendado: 2 por categoría.
                </p>
              )}
              {activeTab === "all" && (
                <p className="text-xs text-gray-500 mt-2">Mostrando primeras 100 preguntas. Filtra por categoría para ver más.</p>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              {faqsLoading ? (
                <div className="py-8 text-center text-gray-400">Cargando preguntas...</div>
              ) : (
                <div className="space-y-2">
                  {displayFaqs.map(f => {
                    const isFeatured = !!(f as any).homeFeatured;
                    const cat = categories.find(c => c.id === f.categoryId);
                    return (
                      <div key={f.id} className={`flex items-start gap-2 p-3 border rounded-lg ${isFeatured ? "border-[#ad023b]/30 bg-[#ad023b]/5" : "border-gray-100 hover:bg-gray-50"}`} data-testid={`faq-${f.id}`}>
                        <button
                          onClick={() => toggleFeaturedMutation.mutate({ id: f.id, current: isFeatured })}
                          className={`mt-0.5 flex-shrink-0 text-lg transition-colors ${isFeatured ? "text-[#ad023b]" : "text-gray-300 hover:text-[#ad023b]"}`}
                          title={isFeatured ? "Quitar de portada" : "Destacar en portada"}
                          data-testid={`button-featured-${f.id}`}
                        >
                          <i className={isFeatured ? "ri-star-fill" : "ri-star-line"}></i>
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{f.question}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-400">{cat?.name || "Sin categoría"}</span>
                            {(f as any).videoUrl && <span className="text-xs text-green-600 flex items-center gap-0.5"><i className="ri-video-line text-xs"></i> Video</span>}
                            {!f.published && <span className="text-xs text-orange-500">No publicada</span>}
                          </div>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <button onClick={() => openEditFaq(f)} className="text-blue-500 hover:text-blue-700 p-1.5"><i className="ri-edit-line text-sm"></i></button>
                          <button onClick={() => { if (confirm("¿Eliminar esta pregunta?")) deleteFaqMutation.mutate(f.id); }} className="text-red-500 hover:text-red-700 p-1.5"><i className="ri-delete-bin-line text-sm"></i></button>
                        </div>
                      </div>
                    );
                  })}
                  {displayFaqs.length === 0 && (
                    <div className="py-8 text-center">
                      <i className="ri-star-line text-3xl text-gray-300 block mb-2"></i>
                      <p className="text-sm text-gray-500">
                        {activeTab === "home"
                          ? "No hay preguntas destacadas en portada. Usa la estrella ★ en cualquier pregunta para añadirla."
                          : "No hay preguntas en esta categoría"}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={catDialogOpen} onOpenChange={setCatDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingCat ? "Editar Categoría" : "Nueva Categoría"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label><Input value={catForm.name} onChange={e => setCatForm({ ...catForm, name: e.target.value })} data-testid="input-cat-name" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Slug</label><Input value={catForm.slug} onChange={e => setCatForm({ ...catForm, slug: e.target.value })} data-testid="input-cat-slug" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Icono (clase ri-*)</label><Input value={catForm.icon ?? ""} onChange={e => setCatForm({ ...catForm, icon: e.target.value })} data-testid="input-cat-icon" /></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label><textarea value={catForm.description ?? ""} onChange={e => setCatForm({ ...catForm, description: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCatDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveCatMutation.mutate({ ...catForm, sortOrder: Number(catForm.sortOrder) || 0 })} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-save-category">{saveCatMutation.isPending ? "Guardando..." : "Guardar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={faqDialogOpen} onOpenChange={setFaqDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingFaq ? "Editar Pregunta" : "Nueva Pregunta"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Categoría</label>
              <select value={faqForm.categoryId} onChange={e => setFaqForm({ ...faqForm, categoryId: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-faq-category">
                <option value="">Seleccionar</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Pregunta</label>
              <Input value={faqForm.question} onChange={e => setFaqForm({ ...faqForm, question: e.target.value })} data-testid="input-faq-question" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Respuesta</label>
              <textarea value={faqForm.answer} onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[140px]" data-testid="input-faq-answer" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                <i className="ri-video-line mr-1 text-green-600"></i>
                URL de vídeo (YouTube — opcional)
              </label>
              <Input
                value={faqForm.videoUrl ?? ""}
                onChange={e => setFaqForm({ ...faqForm, videoUrl: e.target.value })}
                placeholder="https://www.youtube.com/watch?v=... o /embed/..."
                data-testid="input-faq-video"
              />
              <p className="text-xs text-gray-400 mt-1">Acepta URLs de YouTube en cualquier formato (watch, embed, youtu.be)</p>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={faqForm.published !== false}
                  onChange={e => setFaqForm({ ...faqForm, published: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>Publicada</span>
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!faqForm.homeFeatured}
                  onChange={e => setFaqForm({ ...faqForm, homeFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#ad023b]"
                  data-testid="checkbox-home-featured"
                />
                <span className="flex items-center gap-1">
                  <i className="ri-home-heart-line text-[#ad023b]"></i>
                  Destacar en portada
                </span>
              </label>
            </div>

            {faqForm.videoUrl && (
              <div className="border rounded-lg overflow-hidden bg-gray-50 p-3">
                <p className="text-xs text-gray-500 mb-2 font-medium">Vista previa del vídeo:</p>
                <div className="relative w-full rounded overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={faqForm.videoUrl.includes("/embed/") ? faqForm.videoUrl : faqForm.videoUrl.replace("watch?v=", "embed/")}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                    title="Vista previa"
                  ></iframe>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setFaqDialogOpen(false)}>Cancelar</Button>
              <Button onClick={() => saveFaqMutation.mutate({ ...faqForm, sortOrder: Number(faqForm.sortOrder) || 0 })} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-save-faq">
                {saveFaqMutation.isPending ? "Guardando..." : "Guardar pregunta"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
