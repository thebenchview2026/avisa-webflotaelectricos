"use client";
import { useState, useMemo } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { VEHICLE_MODEL_FAMILIES } from "@/lib/seo-growth-engine";
import { SERVICE_CITIES } from "@/lib/local-seo";
import { BRAND_NAMES } from "@/lib/servicios-data";

interface FaqTemplate {
  id: string;
  template: string;
  answerTemplate: string;
  categories: string[];
  needsCity: boolean;
  needsModel: boolean;
}

interface GeneratedFaq {
  question: string;
  answer: string;
  brand: string;
  model: string;
  city?: string;
  templateId: string;
  selected: boolean;
}

interface FaqCategory {
  id: string;
  name: string;
  slug: string;
}

const FAQ_TEMPLATES: FaqTemplate[] = [
  {
    id: "precio-renting-ciudad",
    template: "¿Cuánto cuesta el renting del {brand} {model} en {city}?",
    answerTemplate: "El renting del {brand} {model} en {city} parte desde cuotas muy competitivas que varían según el plazo contratado y los kilómetros anuales. En Grupo Avisa te ofrecemos presupuesto personalizado sin compromiso con las mejores condiciones del mercado para vehículos eléctricos en {city} y toda la provincia de Sevilla.",
    categories: ["Precio"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "precio-renting-ciudad2",
    template: "¿Cuál es el precio del renting del {brand} {model} en {city}?",
    answerTemplate: "El precio del renting del {brand} {model} en {city} depende del plazo (24, 36 o 48 meses) y los km anuales. Nuestro equipo en Grupo Avisa te prepara una oferta adaptada a tus necesidades de movilidad en {city}, con mantenimiento incluido y sin sorpresas.",
    categories: ["Precio"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "precio-renting-ciudad3",
    template: "¿Desde cuánto cuesta el renting del {brand} {model} en {city}?",
    answerTemplate: "El renting del {brand} {model} arranca desde cuotas mensuales asequibles en {city}. Grupo Avisa trabaja con las principales compañías de renting para ofrecerte las mejores condiciones, incluyendo seguro a todo riesgo, mantenimiento y asistencia en carretera.",
    categories: ["Precio"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "mantenimiento-modelo",
    template: "¿Qué incluye el mantenimiento del {brand} {model}?",
    answerTemplate: "El mantenimiento del {brand} {model} incluye revisión del sistema de propulsión eléctrica, actualización de software, inspección del sistema de frenado regenerativo, comprobación de la batería de alto voltaje y revisión de todos los fluidos. En Grupo Avisa realizamos el mantenimiento oficial con técnicos certificados.",
    categories: ["Servicio"],
    needsCity: false,
    needsModel: true,
  },
  {
    id: "periodicidad-mantenimiento",
    template: "¿Cada cuánto hay que llevar el {brand} {model} al taller?",
    answerTemplate: "El {brand} {model} requiere revisión anual o cada 30.000 km, lo que ocurra primero. Al ser eléctrico, sus intervalos de mantenimiento son más amplios que los de un vehículo de combustión, aunque recomendamos una revisión de seguridad semestral de la batería en Grupo Avisa.",
    categories: ["Servicio"],
    needsCity: false,
    needsModel: true,
  },
  {
    id: "autonomia-bateria",
    template: "¿Cuántos km de autonomía tiene el {brand} {model}?",
    answerTemplate: "El {brand} {model} ofrece una autonomía homologada WLTP que varía según la versión elegida. En Grupo Avisa te asesoramos sobre la variante más adecuada para tu uso diario, comparando autonomía real en ciudad, carretera y autopista para que tomes la mejor decisión.",
    categories: ["Batería"],
    needsCity: false,
    needsModel: true,
  },
  {
    id: "garantia-bateria",
    template: "¿El {brand} {model} tiene garantía de batería?",
    answerTemplate: "Sí, el {brand} {model} incluye garantía de batería de 8 años o hasta 160.000 km (según versión), garantizando una capacidad mínima del 70%. En Grupo Avisa gestionamos cualquier reclamación de garantía directamente con el fabricante para que no tengas ninguna complicación.",
    categories: ["Garantía"],
    needsCity: false,
    needsModel: true,
  },
  {
    id: "reparacion-ciudad",
    template: "¿Dónde reparar el {brand} {model} en {city}?",
    answerTemplate: "Para la reparación del {brand} {model} en {city}, Grupo Avisa es tu referente de confianza. Contamos con taller especializado en vehículos eléctricos con tecnología de diagnóstico de última generación y técnicos certificados en movilidad eléctrica, con servicio de recogida y entrega en {city}.",
    categories: ["Servicio", "Local"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "carga-ciudad",
    template: "¿Cómo cargar el {brand} {model} en {city}?",
    answerTemplate: "El {brand} {model} en {city} puede cargarse en puntos de recarga públicos, en casa con wallbox o en cargadores rápidos. Grupo Avisa te asesora sobre la mejor solución de carga para tu caso en {city}, incluyendo instalación de wallbox doméstico con subvención si aplica.",
    categories: ["Carga", "Local"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "diferencias-modelos",
    template: "¿Cuál es la diferencia entre las versiones del {brand} {model}?",
    answerTemplate: "El {brand} {model} está disponible en varias versiones que se diferencian en potencia, autonomía y equipamiento. En Grupo Avisa te explicamos las diferencias clave para que elijas la versión que mejor se adapta a tus necesidades de movilidad eléctrica y tu presupuesto.",
    categories: ["Información"],
    needsCity: false,
    needsModel: true,
  },
  {
    id: "subvenciones-electrico",
    template: "¿Hay subvenciones para comprar el {brand} {model} en {city}?",
    answerTemplate: "Sí, en {city} puedes beneficiarte del Plan MOVES III y otras ayudas autonómicas para la compra del {brand} {model}. En Grupo Avisa te gestionamos todas las subvenciones disponibles para vehículos eléctricos, maximizando el ahorro en tu nueva adquisición.",
    categories: ["Precio", "Local"],
    needsCity: true,
    needsModel: true,
  },
  {
    id: "seguro-electrico",
    template: "¿Cuánto cuesta el seguro del {brand} {model}?",
    answerTemplate: "El seguro del {brand} {model} varía según el perfil del conductor, la modalidad (básico, terceros ampliado o todo riesgo) y las coberturas adicionales. Al optar por renting con Grupo Avisa, el seguro a todo riesgo va incluido en la cuota, simplificando tu gestión.",
    categories: ["Precio"],
    needsCity: false,
    needsModel: true,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Precio: "bg-yellow-100 text-yellow-700",
  Servicio: "bg-blue-100 text-blue-700",
  Batería: "bg-green-100 text-green-700",
  Garantía: "bg-purple-100 text-purple-700",
  Local: "bg-orange-100 text-orange-700",
  Carga: "bg-teal-100 text-teal-700",
  Información: "bg-gray-100 text-gray-600",
};

function fillTemplate(template: string, brand: string, model: string, city?: string): string {
  return template
    .replace(/\{brand\}/g, brand)
    .replace(/\{model\}/g, model)
    .replace(/\{city\}/g, city || "");
}

const MAIN_BRANDS = ["volkswagen", "audi", "skoda", "cupra", "seat", "tesla", "bmw", "hyundai", "kia", "peugeot", "renault", "mercedes-benz", "byd", "volvo"];

function getBrandDisplay(slug: string): { label: string; models: string[] } {
  if (slug === "seat-cupra") {
    const seatModels = VEHICLE_MODEL_FAMILIES["seat"] || [];
    const cupraModels = VEHICLE_MODEL_FAMILIES["cupra"] || [];
    return { label: "SEAT / CUPRA", models: [...seatModels, ...cupraModels] };
  }
  return { label: BRAND_NAMES[slug] || slug, models: VEHICLE_MODEL_FAMILIES[slug] || [] };
}

const BRAND_GROUPS = [
  ...MAIN_BRANDS.filter(b => b !== "seat" && b !== "cupra").map(b => ({ slug: b, ...getBrandDisplay(b) })),
  { slug: "seat-cupra", ...getBrandDisplay("seat-cupra") },
];

export default function AdminFaqGenerator() {
  const { toast } = useToast();

  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [selectedCities, setSelectedCities] = useState<Set<string>>(new Set());
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [generated, setGenerated] = useState<GeneratedFaq[]>([]);
  const [selectedFaqs, setSelectedFaqs] = useState<Set<number>>(new Set());
  const [step, setStep] = useState<"config" | "preview">("config");

  const { data: categories = [] } = useQuery<FaqCategory[]>({
    queryKey: ["/api/admin/faq-categories"],
  });

  const importMutation = useMutation({
    mutationFn: async (faqs: { question: string; answer: string; categoryId: string; slug: string }[]) => {
      const results = [];
      for (const faq of faqs) {
        const result = await apiRequest("POST", "/api/admin/faqs", faq);
        results.push(result);
      }
      return results;
    },
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/faqs"] });
      toast({ title: "FAQs importadas", description: `${results.length} preguntas guardadas correctamente` });
      setStep("config");
      setGenerated([]);
    },
    onError: (err: any) => toast({ title: "Error al importar", description: err.message, variant: "destructive" }),
  });

  function toggleBrand(slug: string) {
    setSelectedBrands(prev => {
      const n = new Set(prev);
      n.has(slug) ? n.delete(slug) : n.add(slug);
      return n;
    });
  }

  function toggleCity(slug: string) {
    setSelectedCities(prev => {
      const n = new Set(prev);
      n.has(slug) ? n.delete(slug) : n.add(slug);
      return n;
    });
  }

  function toggleTemplate(id: string) {
    setSelectedTemplates(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }

  function toggleAllTemplates() {
    if (selectedTemplates.size === FAQ_TEMPLATES.length) {
      setSelectedTemplates(new Set());
    } else {
      setSelectedTemplates(new Set(FAQ_TEMPLATES.map(t => t.id)));
    }
  }

  function generateFaqs() {
    const brandsToUse = selectedBrands.size > 0
      ? BRAND_GROUPS.filter(b => selectedBrands.has(b.slug))
      : BRAND_GROUPS;

    const citiesToUse = selectedCities.size > 0
      ? SERVICE_CITIES.filter(c => selectedCities.has(c.slug))
      : SERVICE_CITIES.slice(0, 5);

    const templatesToUse = selectedTemplates.size > 0
      ? FAQ_TEMPLATES.filter(t => selectedTemplates.has(t.id))
      : FAQ_TEMPLATES;

    const faqs: GeneratedFaq[] = [];

    for (const brandGroup of brandsToUse) {
      const slugs = brandGroup.slug === "seat-cupra" ? ["seat", "cupra"] : [brandGroup.slug];
      for (const brandSlug of slugs) {
        const brandName = BRAND_NAMES[brandSlug] || brandSlug;
        const models = VEHICLE_MODEL_FAMILIES[brandSlug] || ["(sin modelos)"];

        for (const model of models) {
          for (const tmpl of templatesToUse) {
            if (!tmpl.needsModel && model !== models[0]) continue;

            if (tmpl.needsCity) {
              for (const cityInfo of citiesToUse) {
                const question = fillTemplate(tmpl.template, brandName, model, cityInfo.city);
                const answer = fillTemplate(tmpl.answerTemplate, brandName, model, cityInfo.city);
                faqs.push({ question, answer, brand: brandName, model, city: cityInfo.city, templateId: tmpl.id, selected: true });
              }
            } else {
              const question = fillTemplate(tmpl.template, brandName, model);
              const answer = fillTemplate(tmpl.answerTemplate, brandName, model);
              faqs.push({ question, answer, brand: brandName, model, templateId: tmpl.id, selected: true });
            }
          }
        }
      }
    }

    setGenerated(faqs);
    setSelectedFaqs(new Set(faqs.map((_, i) => i)));
    setStep("preview");
  }

  function toggleFaq(idx: number) {
    setSelectedFaqs(prev => {
      const n = new Set(prev);
      n.has(idx) ? n.delete(idx) : n.add(idx);
      return n;
    });
  }

  function toggleAllFaqs() {
    if (selectedFaqs.size === generated.length) {
      setSelectedFaqs(new Set());
    } else {
      setSelectedFaqs(new Set(generated.map((_, i) => i)));
    }
  }

  function importSelected() {
    const defaultCatId = categories[0]?.id || "";
    const faqs = generated
      .filter((_, i) => selectedFaqs.has(i))
      .map(faq => ({
        question: faq.question,
        answer: faq.answer,
        categoryId: defaultCatId,
        slug: faq.question
          .toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          .slice(0, 80),
        published: true,
        sortOrder: 0,
      }));
    importMutation.mutate(faqs);
  }

  const cities = SERVICE_CITIES.slice(0, 12);

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-faq-generator">

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-title">Generador Automático de FAQs</h1>
            <p className="text-gray-500 mt-1">Genera preguntas frecuentes SEO basadas en marcas, modelos y ciudades</p>
          </div>
          {step === "preview" && (
            <button onClick={() => setStep("config")} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-4 py-2">
              <i className="ri-arrow-left-line"></i> Volver a configuración
            </button>
          )}
        </div>

        {step === "config" && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Marcas</h2>
                <p className="text-sm text-gray-500 mt-0.5">Selecciona las marcas. Si no seleccionas ninguna, se usarán todas.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {BRAND_GROUPS.map(brand => (
                  <button
                    key={brand.slug}
                    onClick={() => toggleBrand(brand.slug)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                      selectedBrands.has(brand.slug)
                        ? "border-[#ad023b] bg-[#ad023b] text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                    data-testid={`button-brand-${brand.slug}`}
                  >
                    {brand.label} ({brand.models.length} modelos)
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Ciudades</h2>
                <p className="text-sm text-gray-500 mt-0.5">Selecciona ciudades para preguntas geolocalizadas. Si no seleccionas ninguna, se usarán las 5 principales.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {cities.map(city => (
                  <button
                    key={city.slug}
                    onClick={() => toggleCity(city.slug)}
                    className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${
                      selectedCities.has(city.slug)
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-medium"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                    data-testid={`button-city-${city.slug}`}
                  >
                    {city.city}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Plantillas de pregunta</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Selecciona qué tipos de preguntas generar. Si no seleccionas ninguna, se usarán todas.</p>
                </div>
                <button onClick={toggleAllTemplates} className="text-xs text-[#ad023b] hover:underline font-medium" data-testid="button-select-all-templates">
                  {selectedTemplates.size === FAQ_TEMPLATES.length ? "Desmarcar todo" : "Seleccionar todo"}
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {FAQ_TEMPLATES.map(tmpl => (
                  <div key={tmpl.id} className="flex items-center gap-4 py-3" data-testid={`template-row-${tmpl.id}`}>
                    <input
                      type="checkbox"
                      checked={selectedTemplates.has(tmpl.id)}
                      onChange={() => toggleTemplate(tmpl.id)}
                      className="w-4 h-4 accent-[#ad023b] rounded cursor-pointer"
                      data-testid={`checkbox-template-${tmpl.id}`}
                    />
                    <span className="text-sm text-gray-700 flex-1">{tmpl.template}</span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {tmpl.categories.map(cat => (
                        <span key={cat} className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[cat] || "bg-gray-100 text-gray-600"}`}>
                          {cat}
                        </span>
                      ))}
                      {tmpl.needsCity && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 font-medium">+ Ciudad</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={generateFaqs}
                className="bg-[#ad023b] text-white px-6 py-3 rounded-xl hover:bg-[#8d0230] font-medium flex items-center gap-2"
                data-testid="button-generate"
              >
                <i className="ri-magic-line"></i>
                Generar FAQs
              </button>
              <p className="text-sm text-gray-500">
                {(() => {
                  const bs = selectedBrands.size || BRAND_GROUPS.length;
                  const ts = selectedTemplates.size || FAQ_TEMPLATES.length;
                  const cs = selectedCities.size || 5;
                  const estimate = BRAND_GROUPS.filter(b => selectedBrands.size === 0 || selectedBrands.has(b.slug))
                    .reduce((sum, b) => sum + b.models.length, 0);
                  const cityTemplates = FAQ_TEMPLATES.filter(t => (selectedTemplates.size === 0 || selectedTemplates.has(t.id)) && t.needsCity).length;
                  const noCity = FAQ_TEMPLATES.filter(t => (selectedTemplates.size === 0 || selectedTemplates.has(t.id)) && !t.needsCity).length;
                  return `~${estimate * cityTemplates * cs + estimate * noCity} FAQs estimadas`;
                })()}
              </p>
            </div>
          </>
        )}

        {step === "preview" && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div>
                  <h2 className="font-semibold text-gray-900">Vista previa — {generated.length} FAQs generadas</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{selectedFaqs.size} seleccionadas para importar</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={toggleAllFaqs} className="text-sm text-gray-500 hover:text-gray-700" data-testid="button-toggle-all-faqs">
                    {selectedFaqs.size === generated.length ? "Desmarcar todas" : "Seleccionar todas"}
                  </button>
                  <button
                    onClick={importSelected}
                    disabled={selectedFaqs.size === 0 || importMutation.isPending}
                    className="bg-[#ad023b] text-white px-5 py-2 rounded-lg hover:bg-[#8d0230] text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                    data-testid="button-import"
                  >
                    {importMutation.isPending
                      ? <><i className="ri-loader-4-line animate-spin"></i> Importando...</>
                      : <><i className="ri-download-line"></i> Importar {selectedFaqs.size} FAQs</>
                    }
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                {generated.map((faq, i) => (
                  <div key={i} className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 ${selectedFaqs.has(i) ? "" : "opacity-40"}`} data-testid={`faq-row-${i}`}>
                    <input
                      type="checkbox"
                      checked={selectedFaqs.has(i)}
                      onChange={() => toggleFaq(i)}
                      className="w-4 h-4 accent-[#ad023b] rounded cursor-pointer mt-0.5 shrink-0"
                      data-testid={`checkbox-faq-${i}`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{faq.question}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-[#ad023b] font-medium">{faq.brand}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{faq.model}</span>
                      {faq.city && <span className="text-xs px-2 py-0.5 rounded-full bg-orange-50 text-orange-600">{faq.city}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
