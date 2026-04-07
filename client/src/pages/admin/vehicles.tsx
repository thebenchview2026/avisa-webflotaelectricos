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
import type { Vehicle, Brand } from "@shared/schema";

const emptyVehicle = {
  brandId: "", model: "", slug: "", vehicleType: "electrico", year: 2025, price: 0, bodyType: "SUV",
  rangeKm: 0, batteryKwh: 0, powerHp: 0, acceleration: 0, topSpeed: 0,
  seats: 5, drivetrain: "FWD", chargingTimeFast: "", chargingTimeSlow: "",
  trunkLiters: 0, weight: 0, imageUrl: "", galleryUrls: [] as string[], videoUrl: "",
  description: "", shortDescription: "",
  featured: false, available: true, metaTitle: "", metaDescription: "",
};

export default function AdminVehicles() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("todos");
  const [filterBrand, setFilterBrand] = useState<string>("todas");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyVehicle);
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [galleryUrlInput, setGalleryUrlInput] = useState("");
  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: vehicles = [], isLoading } = useQuery<Vehicle[]>({ queryKey: ["/api/admin/vehicles"] });
  const { data: brands = [] } = useQuery<Brand[]>({ queryKey: ["/api/admin/brands"] });

  const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (editing) {
        return (await apiRequest("PUT", `/api/admin/vehicles/${editing.id}`, data)).json();
      }
      return (await apiRequest("POST", "/api/admin/vehicles", data)).json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      setDialogOpen(false);
      toast({ title: editing ? "Vehículo actualizado" : "Vehículo creado" });
    },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => { await apiRequest("DELETE", `/api/admin/vehicles/${id}`); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/vehicles"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard"] });
      toast({ title: "Vehículo eliminado" });
    },
  });

  const uploadImage = async (file: File, target: "main" | "gallery") => {
    const fd = new FormData();
    fd.append("file", file);
    if (target === "main") setUploadingMain(true);
    else setUploadingGallery(true);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      if (target === "main") {
        setForm((f: any) => ({ ...f, imageUrl: data.url }));
        toast({ title: "Imagen principal subida" });
      } else {
        setForm((f: any) => ({ ...f, galleryUrls: [...(f.galleryUrls || []), data.url] }));
        toast({ title: "Imagen añadida a la galería" });
      }
    } catch (e: any) {
      toast({ title: "Error al subir imagen", description: e.message, variant: "destructive" });
    } finally {
      if (target === "main") setUploadingMain(false);
      else setUploadingGallery(false);
    }
  };

  const uploadVideo = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    setUploadingVideo(true);
    try {
      const res = await fetch("/api/admin/upload/video", { method: "POST", body: fd, credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setForm((f: any) => ({ ...f, videoUrl: data.url }));
      toast({ title: "Vídeo subido correctamente" });
    } catch (e: any) {
      toast({ title: "Error al subir vídeo", description: e.message, variant: "destructive" });
    } finally {
      setUploadingVideo(false);
    }
  };

  const openCreate = () => { setEditing(null); setForm({ ...emptyVehicle }); setGalleryUrlInput(""); setDialogOpen(true); };
  const openEdit = (v: Vehicle) => { setEditing(v); setForm({ ...v }); setGalleryUrlInput(""); setDialogOpen(true); };
  const handleSave = () => {
    const data = { ...form, year: Number(form.year), price: Number(form.price), rangeKm: Number(form.rangeKm), batteryKwh: Number(form.batteryKwh), powerHp: Number(form.powerHp), acceleration: Number(form.acceleration) || null, topSpeed: Number(form.topSpeed) || null, seats: Number(form.seats), trunkLiters: Number(form.trunkLiters) || null, weight: Number(form.weight) || null };
    saveMutation.mutate(data);
  };

  const filtered = vehicles.filter(v => {
    const matchSearch = search === "" ||
      v.model.toLowerCase().includes(search.toLowerCase()) ||
      (brands.find(b => b.id === v.brandId)?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "todos" || (v.vehicleType || "electrico") === filterType;
    const matchBrand = filterBrand === "todas" || v.brandId === filterBrand;
    return matchSearch && matchType && matchBrand;
  });

  const electricCount = vehicles.filter(v => (v.vehicleType || "electrico") === "electrico").length;
  const hybridCount = vehicles.filter(v => (v.vehicleType || "electrico") === "hibrido").length;

  const F = ({ label, field, type = "text", half = false }: { label: string; field: string; type?: string; half?: boolean }) => (
    <div className={half ? "w-1/2" : "w-full"}>
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      <Input type={type} value={form[field] ?? ""} onChange={e => setForm({ ...form, [field]: e.target.value })} data-testid={`input-${field}`} className="text-sm" />
    </div>
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-vehicles-title">Vehículos</h1>
        <Button onClick={openCreate} className="bg-[#ad023b] hover:bg-[#8d0230]" data-testid="button-add-vehicle">
          <i className="ri-add-line mr-1"></i> Nuevo Vehículo
        </Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3 items-center">
        <Input placeholder="Buscar por modelo o marca..." value={search} onChange={e => setSearch(e.target.value)} data-testid="input-search-vehicles" className="max-w-xs" />
        <div className="flex rounded-lg border overflow-hidden text-sm">
          <button
            onClick={() => setFilterType("todos")}
            className={`px-3 py-2 transition ${filterType === "todos" ? "bg-[#ad023b] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            data-testid="filter-type-todos"
          >
            Todos ({vehicles.length})
          </button>
          <button
            onClick={() => setFilterType("electrico")}
            className={`px-3 py-2 border-l transition ${filterType === "electrico" ? "bg-[#ad023b] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            data-testid="filter-type-electrico"
          >
            <i className="ri-flashlight-line mr-1"></i>Eléctricos ({electricCount})
          </button>
          <button
            onClick={() => setFilterType("hibrido")}
            className={`px-3 py-2 border-l transition ${filterType === "hibrido" ? "bg-[#ad023b] text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
            data-testid="filter-type-hibrido"
          >
            <i className="ri-leaf-line mr-1"></i>Híbridos ({hybridCount})
          </button>
        </div>
        <select
          value={filterBrand}
          onChange={e => setFilterBrand(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white"
          data-testid="filter-brand"
        >
          <option value="todas">Todas las marcas</option>
          {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
        </select>
        {(filterType !== "todos" || filterBrand !== "todas" || search) && (
          <button
            onClick={() => { setFilterType("todos"); setFilterBrand("todas"); setSearch(""); }}
            className="text-xs text-gray-500 hover:text-[#ad023b] flex items-center gap-1"
            data-testid="button-clear-filters"
          >
            <i className="ri-close-line"></i> Limpiar filtros
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-gray-500">Cargando...</div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" data-testid="table-vehicles">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-3">Modelo</th>
                    <th className="text-left p-3">Marca</th>
                    <th className="text-left p-3">Motorización</th>
                    <th className="text-left p-3">Año</th>
                    <th className="text-left p-3">Precio</th>
                    <th className="text-left p-3">Carrocería</th>
                    <th className="text-left p-3">Autonomía</th>
                    <th className="text-left p-3">Estado</th>
                    <th className="text-right p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan={9} className="p-6 text-center text-gray-400">No se encontraron vehículos con los filtros seleccionados</td></tr>
                  ) : filtered.map(v => (
                    <tr key={v.id} className="border-b hover:bg-gray-50" data-testid={`row-vehicle-${v.id}`}>
                      <td className="p-3 font-medium">
                        {v.featured && <i className="ri-star-fill text-amber-500 mr-1" title="Destacado en Home"></i>}
                        {v.model}
                      </td>
                      <td className="p-3">{brands.find(b => b.id === v.brandId)?.name || "-"}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs inline-flex items-center gap-1 ${(v.vehicleType || "electrico") === "electrico" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}>
                          <i className={(v.vehicleType || "electrico") === "electrico" ? "ri-flashlight-line" : "ri-leaf-line"}></i>
                          {(v.vehicleType || "electrico") === "electrico" ? "Eléctrico" : "Híbrido"}
                        </span>
                      </td>
                      <td className="p-3">{v.year}</td>
                      <td className="p-3">{v.price?.toLocaleString("es-ES")} €</td>
                      <td className="p-3">{v.bodyType}</td>
                      <td className="p-3">{v.rangeKm} km</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs ${v.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                          {v.available ? "Disponible" : "No disponible"}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => openEdit(v)} className="text-blue-600 hover:text-blue-800 mr-2" data-testid={`button-edit-vehicle-${v.id}`}>
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => { if (confirm("¿Eliminar este vehículo?")) deleteMutation.mutate(v.id); }} className="text-red-600 hover:text-red-800" data-testid={`button-delete-vehicle-${v.id}`}>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Vehículo" : "Nuevo Vehículo"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Marca</label>
                <select value={form.brandId} onChange={e => setForm({ ...form, brandId: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-brand">
                  <option value="">Seleccionar marca</option>
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <F label="Modelo" field="model" half />
            </div>
            <div className="flex gap-3">
              <F label="Slug" field="slug" half />
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de motorización</label>
                <select value={form.vehicleType || "electrico"} onChange={e => setForm({ ...form, vehicleType: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-vehicleType">
                  <option value="electrico">100% Eléctrico</option>
                  <option value="hibrido">Híbrido Enchufable</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3">
              <F label="Año" field="year" type="number" half />
              <F label="Precio (€)" field="price" type="number" half />
            </div>
            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Tipo de carrocería</label>
                <select value={form.bodyType} onChange={e => setForm({ ...form, bodyType: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-bodyType">
                  <option value="SUV">SUV</option>
                  <option value="Berlina">Berlina</option>
                  <option value="Compacto">Compacto</option>
                  <option value="Familiar">Familiar</option>
                  <option value="Monovolumen">Monovolumen</option>
                  <option value="Coupé">Coupé</option>
                </select>
              </div>
              <F label="Autonomía (km)" field="rangeKm" type="number" half />
            </div>
            <div className="flex gap-3">
              <F label="Batería (kWh)" field="batteryKwh" type="number" half />
              <F label="Potencia (CV)" field="powerHp" type="number" half />
            </div>
            <div className="flex gap-3">
              <F label="Aceleración 0-100 (s)" field="acceleration" type="number" half />
              <F label="Vel. Máxima (km/h)" field="topSpeed" type="number" half />
            </div>
            <div className="flex gap-3">
              <F label="Plazas" field="seats" type="number" half />
              <div className="w-1/2">
                <label className="block text-xs font-medium text-gray-600 mb-1">Tracción</label>
                <select value={form.drivetrain} onChange={e => setForm({ ...form, drivetrain: e.target.value })} className="w-full border rounded px-3 py-2 text-sm" data-testid="select-drivetrain">
                  <option value="FWD">FWD</option>
                  <option value="RWD">RWD</option>
                  <option value="AWD">AWD</option>
                </select>
              </div>
              <F label="Maletero (L)" field="trunkLiters" type="number" half />
            </div>
            <div className="flex gap-3">
              <F label="Carga rápida" field="chargingTimeFast" half />
              <F label="Carga lenta" field="chargingTimeSlow" half />
            </div>
            <F label="Peso (kg)" field="weight" type="number" />

            <div className="border rounded-lg p-4 space-y-4 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="ri-image-line text-[#ad023b]"></i> Imagen principal y galería
              </h3>

              {/* ── Imagen principal ───────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Imagen principal</label>
                <div className="flex gap-2">
                  <Input
                    value={form.imageUrl ?? ""}
                    onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="/images/modelo.jpg o https://..."
                    data-testid="input-imageUrl"
                    className="text-sm flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => mainImageRef.current?.click()}
                    disabled={uploadingMain}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-60 shrink-0"
                    data-testid="button-upload-main"
                  >
                    {uploadingMain
                      ? <><i className="ri-loader-4-line animate-spin text-sm"></i><span>Subiendo</span></>
                      : <><i className="ri-upload-2-line text-sm"></i><span>Subir</span></>
                    }
                  </button>
                  <input ref={mainImageRef} type="file" accept="image/*" className="hidden"
                    onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0], "main")} />
                </div>
                {form.imageUrl && (
                  <div className="mt-2 relative inline-block">
                    <img src={form.imageUrl} alt="Preview" className="h-24 rounded border object-cover" onError={e => (e.currentTarget.style.display = "none")} />
                  </div>
                )}
              </div>

              {/* ── Galería ────────────────────────────────────── */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">
                  Galería de imágenes <span className="text-gray-400">({(form.galleryUrls || []).length} imagen{(form.galleryUrls || []).length !== 1 ? "es" : ""})</span>
                </label>

                <div
                  onClick={() => galleryInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#ad023b] hover:bg-red-50/30 transition-colors mb-3"
                  data-testid="gallery-drop-zone"
                >
                  {uploadingGallery
                    ? <><i className="ri-loader-4-line animate-spin text-[#ad023b] text-xl block mb-1"></i><p className="text-xs text-gray-500">Subiendo imágenes...</p></>
                    : <><i className="ri-image-add-line text-gray-400 text-xl block mb-1"></i><p className="text-xs text-gray-600 font-medium">Haz clic para subir desde el ordenador</p><p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WebP · máx. 15 MB</p></>
                  }
                </div>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  data-testid="input-gallery-files"
                  onChange={async e => {
                    if (!e.target.files) return;
                    for (const file of Array.from(e.target.files)) {
                      await uploadImage(file, "gallery");
                    }
                    e.target.value = "";
                  }}
                />

                <div className="flex gap-2">
                  <Input
                    value={galleryUrlInput}
                    onChange={e => setGalleryUrlInput(e.target.value)}
                    placeholder="O pega una URL: https://ejemplo.com/imagen.jpg"
                    className="text-sm flex-1"
                    onKeyDown={e => {
                      if (e.key === "Enter" && galleryUrlInput.trim()) {
                        e.preventDefault();
                        setForm((f: any) => ({ ...f, galleryUrls: [...(f.galleryUrls || []), galleryUrlInput.trim()] }));
                        setGalleryUrlInput("");
                      }
                    }}
                    data-testid="input-galleryUrl-manual"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (galleryUrlInput.trim()) {
                        setForm((f: any) => ({ ...f, galleryUrls: [...(f.galleryUrls || []), galleryUrlInput.trim()] }));
                        setGalleryUrlInput("");
                      }
                    }}
                    className="px-3 py-2 text-sm bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors shrink-0"
                  >
                    <i className="ri-add-line"></i> Añadir
                  </button>
                </div>

                {(form.galleryUrls || []).length > 0 && (
                  <div className="flex gap-2 flex-wrap mt-3">
                    {(form.galleryUrls || []).map((url: string, i: number) => (
                      <div key={i} className="relative group">
                        <img src={url} alt={`Galería ${i + 1}`} className="w-24 h-16 object-cover rounded border" onError={e => (e.currentTarget.style.display = "none")} />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] px-1 py-0.5 rounded-b text-center opacity-0 group-hover:opacity-100 transition truncate">
                          {i + 1}
                        </div>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, galleryUrls: (form.galleryUrls || []).filter((_: string, j: number) => j !== i) })}
                          className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow"
                          data-testid={`button-remove-gallery-${i}`}
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="ri-video-line text-[#ad023b]"></i> Vídeo del vehículo
              </h3>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Vídeo (YouTube o archivo local)</label>
                <div className="flex gap-2">
                  <Input
                    value={form.videoUrl ?? ""}
                    onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    data-testid="input-videoUrl"
                    className="text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    disabled={uploadingVideo}
                    data-testid="button-upload-video"
                    className="shrink-0 flex items-center gap-1 px-3 py-2 rounded border border-gray-300 text-sm font-medium bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    {uploadingVideo
                      ? <><i className="ri-loader-4-line animate-spin text-sm"></i><span>Subiendo...</span></>
                      : <><i className="ri-upload-2-line text-sm"></i><span>Subir</span></>
                    }
                  </button>
                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/mov,video/avi,video/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && uploadVideo(e.target.files[0])}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  <i className="ri-information-line mr-1"></i>
                  Pega un enlace de YouTube, o sube un archivo de vídeo (.mp4, .webm) directamente desde tu ordenador.
                </p>
              </div>
              {form.videoUrl && (
                <div className="mt-2">
                  {form.videoUrl.includes("youtube.com") || form.videoUrl.includes("youtu.be") ? (
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <i className="ri-youtube-line"></i> Vídeo de YouTube detectado
                    </div>
                  ) : (
                    <div className="text-xs text-blue-600 flex items-center gap-1">
                      <i className="ri-film-line"></i> Vídeo directo detectado
                    </div>
                  )}
                </div>
              )}
            </div>

            <F label="Descripción corta" field="shortDescription" />
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
              <textarea value={form.description ?? ""} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full border rounded px-3 py-2 text-sm min-h-[80px]" data-testid="input-description" />
            </div>
            <div className="flex gap-3">
              <F label="Meta Title" field="metaTitle" half />
              <F label="Meta Description" field="metaDescription" half />
            </div>
            <div className="border rounded-lg p-4 space-y-3 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <i className="ri-settings-3-line text-[#ad023b]"></i> Visibilidad y estado
              </h3>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.featured || false} onChange={e => setForm({ ...form, featured: e.target.checked })} data-testid="input-featured" className="w-4 h-4 accent-[#ad023b]" />
                  <span className="font-medium">Destacado en Home</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.available !== false} onChange={e => setForm({ ...form, available: e.target.checked })} data-testid="input-available" className="w-4 h-4 accent-[#ad023b]" />
                  <span className="font-medium">Disponible</span>
                </label>
              </div>
              {form.featured && (
                <p className="text-xs text-[#ad023b] flex items-center gap-1">
                  <i className="ri-star-fill"></i>
                  Este vehículo aparecerá en la sección de {(form.vehicleType || "electrico") === "electrico" ? "ofertas eléctricos" : "promociones híbridos"} de la página principal.
                </p>
              )}
            </div>
            <div className="flex justify-end gap-2 pt-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)} data-testid="button-cancel">Cancelar</Button>
              <Button onClick={handleSave} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-vehicle">
                {saveMutation.isPending ? "Guardando..." : "Guardar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
