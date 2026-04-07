"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, useLocation } from "@/lib/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Page, Section } from "@shared/schema";

const sectionKeyLabels: Record<string, string> = {
  hero: "Sección Hero / Banner principal",
  "vehicle-selector": "Selector de vehículos",
  "electric-promotions": "Promociones eléctricos",
  "hybrid-promotions": "Promociones híbridos",
  postventa: "Postventa",
  "plan-moves": "Plan MOVES",
  faqs: "Preguntas frecuentes",
  dealers: "Concesionarios",
  cta: "Llamada a la acción (CTA)",
  contact: "Contacto",
  technology: "Tecnología",
  benefits: "Beneficios / Ventajas",
  brands: "Marcas",
  advantages: "Ventajas",
  services: "Servicios",
  plans: "Planes de mantenimiento",
  team: "Equipo técnico",
  appointment: "Formulario de cita",
  requirements: "Requisitos",
  process: "Proceso",
  categories: "Categorías",
  locations: "Ubicaciones",
  timeline: "Línea temporal",
  infrastructure: "Infraestructura",
  reasons: "Razones / Motivaciones",
  content: "Contenido principal",
};

const sectionKeyIcons: Record<string, string> = {
  hero: "ri-layout-top-line",
  "vehicle-selector": "ri-car-line",
  "electric-promotions": "ri-flashlight-line",
  "hybrid-promotions": "ri-leaf-line",
  postventa: "ri-tools-line",
  "plan-moves": "ri-government-line",
  faqs: "ri-question-line",
  dealers: "ri-map-pin-line",
  cta: "ri-megaphone-line",
  contact: "ri-phone-line",
  technology: "ri-cpu-line",
  benefits: "ri-star-line",
  brands: "ri-building-line",
  advantages: "ri-check-double-line",
  services: "ri-service-line",
  plans: "ri-price-tag-3-line",
  team: "ri-team-line",
  appointment: "ri-calendar-check-line",
  requirements: "ri-list-check-2",
  process: "ri-flow-chart",
  categories: "ri-folder-line",
  locations: "ri-map-2-line",
  timeline: "ri-time-line",
  infrastructure: "ri-charging-pile-line",
  reasons: "ri-lightbulb-line",
  content: "ri-file-text-line",
};

export default function PageEditor() {
  const [, params] = useRoute("/admin/pages/edit/:slug");
  const [, navigate] = useLocation();
  const slug = params?.slug;
  const { toast } = useToast();

  const [pageForm, setPageForm] = useState<any>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [sectionForm, setSectionForm] = useState<any>(null);
  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  const { data: pages = [], isLoading: pagesLoading } = useQuery<Page[]>({ queryKey: ["/api/admin/pages"] });
  const page = pages.find(p => p.slug === slug);

  const { data: sections = [], isLoading: sectionsLoading } = useQuery<Section[]>({
    queryKey: ["/api/admin/sections", slug],
    queryFn: async () => {
      const res = await fetch(`/api/admin/sections?page=${slug}`, { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    enabled: !!slug,
  });

  useEffect(() => {
    if (page) {
      setPageForm({
        title: page.title,
        slug: page.slug,
        content: page.content || "",
        metaTitle: page.metaTitle || "",
        metaDescription: page.metaDescription || "",
        published: page.published,
      });
    }
  }, [page?.id]);

  const savePageMutation = useMutation({
    mutationFn: async (data: any) => {
      return (await apiRequest("PUT", `/api/admin/pages/${page!.id}`, data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/pages"] });
      toast({ title: "Página actualizada correctamente" });
    },
    onError: () => toast({ title: "Error al guardar la página", variant: "destructive" }),
  });

  const saveSectionMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return (await apiRequest("PUT", `/api/admin/sections/${id}`, data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sections", slug] });
      setSectionDialogOpen(false);
      toast({ title: "Sección actualizada" });
    },
    onError: () => toast({ title: "Error al guardar sección", variant: "destructive" }),
  });

  const toggleSectionMutation = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      return (await apiRequest("PUT", `/api/admin/sections/${id}`, { active })).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/sections", slug] });
    },
  });

  const openSectionEdit = (section: Section) => {
    setEditingSection(section);
    setSectionForm({
      title: section.title || "",
      subtitle: section.subtitle || "",
      imageUrl: section.imageUrl || "",
      content: section.content ? JSON.stringify(section.content, null, 2) : "{}",
    });
    setShowJsonEditor(false);
    setSectionDialogOpen(true);
  };

  const saveSectionForm = () => {
    if (!editingSection) return;
    let parsedContent;
    try {
      parsedContent = JSON.parse(sectionForm.content);
    } catch {
      toast({ title: "Error: El contenido JSON no es válido", variant: "destructive" });
      return;
    }
    saveSectionMutation.mutate({
      id: editingSection.id,
      data: {
        title: sectionForm.title,
        subtitle: sectionForm.subtitle,
        imageUrl: sectionForm.imageUrl || null,
        content: parsedContent,
      },
    });
  };

  if (!slug || pagesLoading) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-gray-500">
          <i className="ri-loader-4-line text-4xl mb-4 block animate-spin"></i>
          <p>Cargando página...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!page) {
    return (
      <AdminLayout>
        <div className="text-center py-20 text-gray-500">
          <i className="ri-error-warning-line text-4xl mb-4 block text-red-400"></i>
          <p className="text-lg font-medium mb-2">Página no encontrada</p>
          <p className="text-sm mb-4">No existe ninguna página con slug "{slug}"</p>
          <button onClick={() => navigate("/admin/pages")} className="text-[#ad023b] hover:underline">
            <i className="ri-arrow-left-line mr-1"></i> Volver a páginas
          </button>
        </div>
      </AdminLayout>
    );
  }

  const renderContentPreview = (content: any) => {
    if (!content || Object.keys(content).length === 0) return null;

    const items: { label: string; value: string }[] = [];

    if (content.badge) items.push({ label: "Badge", value: content.badge });
    if (content.buttonPrimary) items.push({ label: "Botón principal", value: content.buttonPrimary });
    if (content.buttonSecondary) items.push({ label: "Botón secundario", value: content.buttonSecondary });
    if (content.buttonText) items.push({ label: "Texto del botón", value: content.buttonText });
    if (content.phone) items.push({ label: "Teléfono", value: content.phone });
    if (content.email) items.push({ label: "Email", value: content.email });
    if (content.whatsapp) items.push({ label: "WhatsApp", value: content.whatsapp });
    if (content.advisor) items.push({ label: "Asesor/a", value: content.advisor });
    if (content.maxAid) items.push({ label: "Ayuda máxima", value: content.maxAid });

    if (content.stats) {
      content.stats.forEach((s: any) => items.push({ label: s.label, value: s.value }));
    }

    if (content.items) {
      items.push({ label: "Elementos", value: `${content.items.length} items` });
    }

    if (content.milestones) {
      items.push({ label: "Hitos", value: `${content.milestones.length} hitos` });
    }

    if (content.certifications) {
      items.push({ label: "Certificaciones", value: `${content.certifications.length} certificaciones` });
    }

    if (content.comparison) {
      items.push({ label: "Comparativa", value: `${content.comparison.length} conceptos` });
    }

    if (content.howItWorks) {
      items.push({ label: "Cómo funciona", value: `${content.howItWorks.length} pasos` });
    }

    if (content.steps) {
      items.push({ label: "Pasos", value: `${content.steps.length} pasos` });
    }

    if (content.schedule) {
      items.push({ label: "Horario L-V", value: content.schedule.weekdays });
      items.push({ label: "Horario Sábado", value: content.schedule.saturday });
    }

    if (content.sections) {
      items.push({ label: "Secciones legales", value: `${content.sections.length} secciones` });
    }

    if (items.length === 0) return null;

    return (
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
        {items.map((item, i) => (
          <div key={i} className="bg-gray-50 rounded px-2 py-1.5">
            <div className="text-[10px] text-gray-400 uppercase">{item.label}</div>
            <div className="text-xs text-gray-700 font-medium truncate">{item.value}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/pages")}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-3"
          data-testid="button-back-pages"
        >
          <i className="ri-arrow-left-line"></i> Volver a Páginas
        </button>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold" data-testid="text-editor-title">
            {page.title}
          </h1>
          <span className={`px-2 py-0.5 rounded text-xs ${page.published ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {page.published ? "Publicada" : "Borrador"}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
          <i className="ri-link text-xs"></i>
          <span className="font-mono">/{page.slug}</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="ri-layout-line text-[#ad023b]"></i>
                Secciones de la página ({sections.length})
              </h2>

              {sectionsLoading ? (
                <div className="py-8 text-center text-gray-400">Cargando secciones...</div>
              ) : sections.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  <i className="ri-layout-line text-3xl mb-2 block"></i>
                  <p>No hay secciones definidas para esta página</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`border rounded-lg p-4 transition-all ${section.active ? "border-gray-200 hover:border-[#ad023b]/30 hover:shadow-sm" : "border-dashed border-gray-300 opacity-60"}`}
                      data-testid={`section-card-${section.sectionKey}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="w-9 h-9 flex items-center justify-center bg-[#ad023b]/10 rounded-lg shrink-0 mt-0.5">
                            <i className={`${sectionKeyIcons[section.sectionKey] || "ri-layout-line"} text-[#ad023b]`}></i>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs text-gray-400 font-mono">#{index + 1}</span>
                              <span className="text-xs px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono">{section.sectionKey}</span>
                            </div>
                            <h3 className="font-semibold text-sm truncate" data-testid={`section-title-${section.sectionKey}`}>
                              {section.title || sectionKeyLabels[section.sectionKey] || section.sectionKey}
                            </h3>
                            {section.subtitle && (
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{section.subtitle}</p>
                            )}
                            {section.imageUrl && (
                              <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                                <i className="ri-image-line"></i> Imagen configurada
                              </p>
                            )}
                            {renderContentPreview(section.content)}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => toggleSectionMutation.mutate({ id: section.id, active: !section.active })}
                            className={`p-1.5 rounded transition-colors ${section.active ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-100"}`}
                            title={section.active ? "Desactivar sección" : "Activar sección"}
                            data-testid={`toggle-section-${section.sectionKey}`}
                          >
                            <i className={section.active ? "ri-eye-line" : "ri-eye-off-line"}></i>
                          </button>
                          <button
                            onClick={() => openSectionEdit(section)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Editar sección"
                            data-testid={`edit-section-${section.sectionKey}`}
                          >
                            <i className="ri-edit-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-[#ad023b]"></i>
                Datos de la página
              </h2>
              {pageForm && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Título</label>
                    <Input value={pageForm.title} onChange={e => setPageForm({ ...pageForm, title: e.target.value })} data-testid="input-page-title" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Slug (URL)</label>
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400">/</span>
                      <Input value={pageForm.slug} onChange={e => setPageForm({ ...pageForm, slug: e.target.value })} data-testid="input-page-slug" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                    <textarea
                      value={pageForm.content}
                      onChange={e => setPageForm({ ...pageForm, content: e.target.value })}
                      className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b]"
                      data-testid="input-page-content"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={pageForm.published !== false} onChange={e => setPageForm({ ...pageForm, published: e.target.checked })} className="rounded" data-testid="input-page-published" />
                    Publicada
                  </label>
                  <Button
                    onClick={() => savePageMutation.mutate(pageForm)}
                    className="w-full bg-[#ad023b] hover:bg-[#8d0230]"
                    disabled={savePageMutation.isPending}
                    data-testid="button-save-page"
                  >
                    {savePageMutation.isPending ? "Guardando..." : "Guardar datos"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <i className="ri-seo-line text-[#ad023b]"></i>
                SEO - Metadatos
              </h2>
              {pageForm && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Meta Title</label>
                    <Input
                      value={pageForm.metaTitle}
                      onChange={e => setPageForm({ ...pageForm, metaTitle: e.target.value })}
                      data-testid="input-page-metatitle"
                    />
                    <span className="text-xs text-gray-400">{pageForm.metaTitle.length}/60</span>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Meta Description</label>
                    <textarea
                      value={pageForm.metaDescription}
                      onChange={e => setPageForm({ ...pageForm, metaDescription: e.target.value })}
                      className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b]"
                      data-testid="input-page-metadesc"
                    />
                    <span className="text-xs text-gray-400">{pageForm.metaDescription.length}/160</span>
                  </div>
                  <Button
                    onClick={() => savePageMutation.mutate(pageForm)}
                    className="w-full bg-[#ad023b] hover:bg-[#8d0230]"
                    disabled={savePageMutation.isPending}
                    data-testid="button-save-seo"
                  >
                    {savePageMutation.isPending ? "Guardando..." : "Guardar SEO"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={sectionDialogOpen} onOpenChange={setSectionDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <i className={`${sectionKeyIcons[editingSection?.sectionKey || ""] || "ri-layout-line"} text-[#ad023b]`}></i>
              Editar: {sectionKeyLabels[editingSection?.sectionKey || ""] || editingSection?.sectionKey}
            </DialogTitle>
            <DialogDescription>
              Sección "{editingSection?.sectionKey}" de la página /{slug}
            </DialogDescription>
          </DialogHeader>
          {sectionForm && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Título de la sección</label>
                  <Input
                    value={sectionForm.title}
                    onChange={e => setSectionForm({ ...sectionForm, title: e.target.value })}
                    placeholder="Título que se muestra al usuario"
                    data-testid="input-section-title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Subtítulo / Descripción</label>
                  <textarea
                    value={sectionForm.subtitle}
                    onChange={e => setSectionForm({ ...sectionForm, subtitle: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b]"
                    placeholder="Texto descriptivo debajo del título"
                    data-testid="input-section-subtitle"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">URL de imagen</label>
                  <Input
                    value={sectionForm.imageUrl}
                    onChange={e => setSectionForm({ ...sectionForm, imageUrl: e.target.value })}
                    placeholder="https://... (URL de la imagen de fondo o principal)"
                    data-testid="input-section-image"
                  />
                  {sectionForm.imageUrl && (
                    <div className="mt-2 rounded overflow-hidden border">
                      <img src={sectionForm.imageUrl} alt="Preview" className="w-full h-32 object-cover" />
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-600">Contenido estructurado (JSON)</label>
                  <button
                    onClick={() => setShowJsonEditor(!showJsonEditor)}
                    className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    data-testid="toggle-json-editor"
                  >
                    <i className={showJsonEditor ? "ri-eye-off-line" : "ri-code-line"}></i>
                    {showJsonEditor ? "Ocultar JSON" : "Editar JSON"}
                  </button>
                </div>

                {!showJsonEditor && sectionForm.content !== "{}" && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <ContentFieldsEditor
                      content={sectionForm.content}
                      onChange={(newContent: string) => setSectionForm({ ...sectionForm, content: newContent })}
                    />
                  </div>
                )}

                {showJsonEditor && (
                  <textarea
                    value={sectionForm.content}
                    onChange={e => setSectionForm({ ...sectionForm, content: e.target.value })}
                    className="w-full border rounded-md px-3 py-2 text-sm font-mono min-h-[300px] focus:outline-none focus:ring-2 focus:ring-[#ad023b]/20 focus:border-[#ad023b] bg-gray-50"
                    spellCheck={false}
                    data-testid="input-section-json"
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <Button variant="outline" onClick={() => setSectionDialogOpen(false)}>Cancelar</Button>
                <Button
                  onClick={saveSectionForm}
                  className="bg-[#ad023b] hover:bg-[#8d0230]"
                  disabled={saveSectionMutation.isPending}
                  data-testid="button-save-section"
                >
                  {saveSectionMutation.isPending ? "Guardando..." : "Guardar sección"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}

function ContentFieldsEditor({ content, onChange }: { content: string; onChange: (s: string) => void }) {
  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch {
    return <p className="text-xs text-red-500">JSON no válido</p>;
  }

  const updateField = (key: string, value: any) => {
    const updated = { ...parsed, [key]: value };
    onChange(JSON.stringify(updated, null, 2));
  };

  const renderField = (key: string, value: any): JSX.Element | null => {
    if (typeof value === "string") {
      return (
        <div key={key} className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <Input
            value={value}
            onChange={e => updateField(key, e.target.value)}
            className="text-sm"
          />
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">
            {key.replace(/([A-Z])/g, " $1")} ({value.length} elementos)
          </label>
          <div className="space-y-2 pl-3 border-l-2 border-gray-200">
            {value.map((item, idx) => (
              <div key={idx} className="bg-white rounded p-2 text-xs">
                {typeof item === "string" ? (
                  <span className="text-gray-700">{item}</span>
                ) : typeof item === "object" ? (
                  <div className="space-y-1">
                    {Object.entries(item).map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-gray-400 shrink-0">{k}:</span>
                        <span className="text-gray-700 truncate">{typeof v === "string" ? v : JSON.stringify(v)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <span>{String(item)}</span>
                )}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Para editar arrays, usa el editor JSON</p>
        </div>
      );
    }

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
          <div className="pl-3 border-l-2 border-gray-200 space-y-1">
            {Object.entries(value).map(([k, v]) => (
              <div key={k} className="flex gap-2 text-xs">
                <span className="text-gray-400">{k}:</span>
                <span className="text-gray-700">{String(v)}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const keys = Object.keys(parsed);
  if (keys.length === 0) return <p className="text-xs text-gray-400">Sin contenido adicional</p>;

  return <div>{keys.map(key => renderField(key, parsed[key]))}</div>;
}
