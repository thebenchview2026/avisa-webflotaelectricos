"use client";
import { useState, useRef, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface MediaFile {
  filename: string;
  url: string;
  size: number;
  createdAt: string;
}

function fmtSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}

export default function AdminMedia() {
  const { toast } = useToast();
  const qc = useQueryClient();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const { data: files = [], isLoading } = useQuery<MediaFile[]>({
    queryKey: ["/api/admin/media"],
  });

  const deleteMutation = useMutation({
    mutationFn: (filename: string) => apiRequest("DELETE", `/api/admin/media/${filename}`, undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["/api/admin/media"] });
      setSelected(null);
      toast({ title: "Imagen eliminada" });
    },
    onError: (err: any) => toast({ title: "Error al eliminar", description: err.message, variant: "destructive" }),
  });

  const uploadFiles = useCallback(async (fileList: FileList) => {
    if (!fileList.length) return;
    setUploading(true);
    let ok = 0;
    for (const file of Array.from(fileList)) {
      const fd = new FormData();
      fd.append("file", file);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd, credentials: "include" });
        if (res.ok) ok++;
      } catch {}
    }
    setUploading(false);
    qc.invalidateQueries({ queryKey: ["/api/admin/media"] });
    toast({ title: `${ok} imagen${ok !== 1 ? "es" : ""} subida${ok !== 1 ? "s" : ""} correctamente` });
  }, [qc, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  }, [uploadFiles]);

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(window.location.origin + url);
    toast({ title: "URL copiada al portapapeles" });
  };

  const filtered = files.filter(f => f.filename.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="space-y-5" data-testid="admin-media">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <i className="ri-image-2-line text-[#ad023b]" aria-hidden="true"></i>
              Biblioteca de imágenes
            </h1>
            <p className="text-gray-500 mt-1">{files.length} imagen{files.length !== 1 ? "es" : ""} en la biblioteca</p>
          </div>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="bg-[#ad023b] hover:bg-[#8d0230] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 disabled:opacity-60 transition-colors"
            data-testid="button-upload"
          >
            {uploading
              ? <><i className="ri-loader-4-line animate-spin" aria-hidden="true"></i> Subiendo...</>
              : <><i className="ri-upload-2-line" aria-hidden="true"></i> Subir imágenes</>
            }
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={e => e.target.files && uploadFiles(e.target.files)}
            data-testid="input-file-upload"
          />
        </div>

        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
            dragging ? "border-[#ad023b] bg-red-50" : "border-gray-300 hover:border-gray-400 bg-white"
          }`}
          onClick={() => inputRef.current?.click()}
          data-testid="drop-zone"
        >
          <i className={`ri-drag-drop-line text-4xl mb-2 block ${dragging ? "text-[#ad023b]" : "text-gray-400"}`} aria-hidden="true"></i>
          <p className="text-sm font-medium text-gray-600">Arrastra y suelta imágenes aquí, o haz clic para seleccionar</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP, GIF, SVG — máx. 15 MB por imagen</p>
        </div>

        {files.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true"></i>
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar imagen..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
                  data-testid="input-search"
                />
              </div>
              <span className="text-sm text-gray-500">{filtered.length} resultados</span>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-video bg-gray-100 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-center text-gray-400 py-8">No se encontraron imágenes</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filtered.map(file => (
                  <div
                    key={file.filename}
                    onClick={() => setSelected(selected?.filename === file.filename ? null : file)}
                    className={`relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all aspect-video ${
                      selected?.filename === file.filename
                        ? "border-[#ad023b] shadow-lg"
                        : "border-transparent hover:border-gray-300"
                    }`}
                    data-testid={`media-item-${file.filename}`}
                  >
                    <img
                      src={file.url}
                      alt={file.filename}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    {selected?.filename === file.filename && (
                      <div className="absolute top-1 right-1">
                        <i className="ri-checkbox-circle-fill text-[#ad023b] text-xl bg-white rounded-full" aria-hidden="true"></i>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {selected && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 flex gap-5 items-start">
            <img src={selected.url} alt={selected.filename} className="w-40 h-28 object-cover rounded-lg border flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-3">
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">{selected.filename}</p>
                <p className="text-xs text-gray-500">{fmtSize(selected.size)} · {new Date(selected.createdAt).toLocaleDateString("es-ES")}</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={window.location.origin + selected.url}
                  readOnly
                  className="flex-1 text-xs border rounded px-3 py-2 bg-gray-50 font-mono"
                  data-testid="input-selected-url"
                />
                <button
                  onClick={() => copyUrl(selected.url)}
                  className="flex items-center gap-1.5 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                  data-testid="button-copy-url"
                >
                  <i className="ri-clipboard-line" aria-hidden="true"></i> Copiar URL
                </button>
              </div>
              <div className="flex gap-2">
                <a
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  <i className="ri-external-link-line" aria-hidden="true"></i> Ver original
                </a>
                <button
                  onClick={() => deleteMutation.mutate(selected.filename)}
                  disabled={deleteMutation.isPending}
                  className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 ml-4 disabled:opacity-50"
                  data-testid="button-delete"
                >
                  <i className="ri-delete-bin-line" aria-hidden="true"></i>
                  {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </div>
          </div>
        )}

        {files.length === 0 && !isLoading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <i className="ri-image-add-line text-5xl text-gray-300 block mb-3" aria-hidden="true"></i>
            <p className="text-gray-500 font-medium">La biblioteca está vacía</p>
            <p className="text-gray-400 text-sm mt-1">Sube la primera imagen usando el botón de arriba o arrastrando archivos</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
