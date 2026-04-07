"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { SiteSetting } from "@shared/schema";

const settingsConfig = [
  { category: "contact", label: "Contacto", fields: [
    { key: "contact_phone", label: "Teléfono" },
    { key: "contact_email", label: "Email" },
    { key: "contact_whatsapp", label: "WhatsApp URL" },
    { key: "contact_address", label: "Dirección" },
  ]},
  { category: "branding", label: "Marca", fields: [
    { key: "site_name", label: "Nombre del sitio" },
    { key: "logo_url", label: "Logo URL" },
    { key: "primary_color", label: "Color primario" },
    { key: "secondary_color", label: "Color secundario" },
  ]},
  { category: "social", label: "Redes Sociales", fields: [
    { key: "social_facebook", label: "Facebook URL" },
    { key: "social_instagram", label: "Instagram URL" },
    { key: "social_twitter", label: "Twitter/X URL" },
    { key: "social_linkedin", label: "LinkedIn URL" },
    { key: "social_youtube", label: "YouTube URL" },
  ]},
  { category: "seo", label: "SEO Global", fields: [
    { key: "seo_title", label: "Título por defecto" },
    { key: "seo_description", label: "Descripción por defecto" },
    { key: "seo_keywords", label: "Keywords" },
    { key: "google_analytics_id", label: "Google Analytics ID" },
  ]},
  { category: "leadspark", label: "LeadSpark", icon: "ri-flashlight-line", fields: [
    { key: "leadspark_api_url", label: "API URL", placeholder: "https://api.leadspark.io/v1/leads" },
    { key: "leadspark_api_key", label: "API Key", placeholder: "sk-..." },
    { key: "leadspark_enabled", label: "Activar envío automático (true/false)", placeholder: "true" },
  ]},
];

export default function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const { data: settings = [], isLoading } = useQuery<SiteSetting[]>({ queryKey: ["/api/admin/settings"] });

  const settingsKey = settings.map(s => `${s.key}:${s.value}`).join("|");
  useEffect(() => {
    const map: Record<string, string> = {};
    settings.forEach(s => { map[s.key] = s.value || ""; });
    setValues(map);
  }, [settingsKey]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const settingsArr = Object.entries(values).map(([key, value]) => {
        const cat = settingsConfig.find(c => c.fields.some(f => f.key === key))?.category || "general";
        return { key, value, category: cat };
      });
      await apiRequest("PUT", "/api/admin/settings", { settings: settingsArr });
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["/api/admin/settings"] }); toast({ title: "Ajustes guardados" }); },
    onError: () => toast({ title: "Error al guardar", variant: "destructive" }),
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" data-testid="text-settings-title">Ajustes del Sitio</h1>
        <Button onClick={() => saveMutation.mutate()} className="bg-[#ad023b] hover:bg-[#8d0230]" disabled={saveMutation.isPending} data-testid="button-save-settings">
          <i className="ri-save-line mr-1"></i> {saveMutation.isPending ? "Guardando..." : "Guardar Todo"}
        </Button>
      </div>
      {isLoading ? <div className="text-center py-10 text-gray-500">Cargando...</div> : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsConfig.map(group => (
            <Card key={group.category}>
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><i className={`${(group as any).icon || `ri-${group.category === "contact" ? "phone" : group.category === "branding" ? "palette" : group.category === "social" ? "share" : group.category === "leadspark" ? "flashlight" : "search"}-line`} text-[#ad023b]`}></i> {group.label}</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {group.category === "leadspark" && (
                  <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${values.leadspark_enabled === "true" && values.leadspark_api_url && values.leadspark_api_key ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`} data-testid="text-leadspark-status">
                    <i className={`${values.leadspark_enabled === "true" && values.leadspark_api_url && values.leadspark_api_key ? "ri-checkbox-circle-fill text-green-500" : "ri-close-circle-line text-gray-400"}`}></i>
                    {values.leadspark_enabled === "true" && values.leadspark_api_url && values.leadspark_api_key ? "Conectado — los leads se envían automáticamente" : "Desconectado — configura los campos para activar"}
                  </div>
                )}
                {group.fields.map((field: any) => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-600 mb-1">{field.label}</label>
                    <Input
                      value={values[field.key] || ""}
                      onChange={e => setValues({ ...values, [field.key]: e.target.value })}
                      placeholder={field.placeholder || ""}
                      data-testid={`input-setting-${field.key}`}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
