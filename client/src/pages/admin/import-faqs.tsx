"use client";
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type Source = "whatsapp" | "formulario" | "email" | "crm" | "otro";

interface ExtractedFaq {
  question: string;
  answer: string;
  editing: boolean;
  selected: boolean;
}

interface FaqCategory {
  id: string;
  name: string;
  slug: string;
}

interface Faq {
  id: string;
  question: string;
  slug: string;
  categoryId: string;
  createdAt?: string;
  published: boolean;
}

const SOURCE_LABELS: Record<Source, string> = {
  whatsapp: "WhatsApp",
  formulario: "Formulario web",
  email: "Email",
  crm: "CRM / Nota",
  otro: "Otro texto",
};

const SOURCE_PLACEHOLDERS: Record<Source, string> = {
  whatsapp:
    "Hola, ¿cuánto cuesta el renting del Audi A3 en Madrid?\nY también ¿qué incluye la cuota de renting?\n¿Puedo deducirme el renting como autónomo?",
  formulario:
    "¿Cuáles son los plazos disponibles para el renting?\n¿Se puede cambiar el vehículo antes de que acabe el contrato?",
  email:
    "Buenos días, me gustaría saber si el mantenimiento está incluido en el renting y si hay límite de kilómetros.",
  crm:
    "Cliente pregunta por diferencias entre renting y leasing. También interesado en opciones para autónomos.",
  otro: "Escribe o pega aquí el texto con las preguntas a extraer...",
};

const ANSWER_TEMPLATES: { keywords: string[]; answer: (q: string) => string }[] = [
  {
    keywords: ["cuánto cuesta", "precio", "coste", "cuota", "cuánto vale", "desde cuánto"],
    answer: (q) =>
      `El ${q.toLowerCase().includes("renting") ? "precio del renting" : "coste"} depende del vehículo elegido, el plazo (24, 36 o 48 meses) y los kilómetros anuales contratados. En Grupo Avisa preparamos un presupuesto personalizado sin compromiso. Puedes contactarnos en info@grupoavisa.com o llamar al 955 034 600.`,
  },
  {
    keywords: ["incluye", "qué incluye", "está incluido", "cubre", "servicios"],
    answer: (_q) =>
      `La cuota de renting en Grupo Avisa incluye: seguro a todo riesgo, mantenimiento oficial, impuesto de circulación, asistencia en carretera 24h y gestión de averías. Las coberturas exactas varían según el contrato elegido.`,
  },
  {
    keywords: ["deducir", "deducción", "autónomo", "autonomo", "fiscal", "hacienda", "irpf", "iva"],
    answer: (_q) =>
      `El renting es fiscalmente muy ventajoso para autónomos y empresas. La cuota mensual es un gasto deducible al 100% si el vehículo se usa exclusivamente para la actividad, o al 50% en uso mixto. Te recomendamos consultar con tu asesor fiscal para tu situación concreta.`,
  },
  {
    keywords: ["plazo", "duración", "meses", "años", "tiempo", "contrato"],
    answer: (_q) =>
      `En Grupo Avisa ofrecemos contratos de renting con plazos de 24, 36 y 48 meses. Cuanto mayor sea el plazo, más competitiva suele ser la cuota mensual. Al finalizar, puedes devolver el vehículo o contratar uno nuevo con las últimas novedades.`,
  },
  {
    keywords: ["cambiar", "cambio", "antes", "finalizar", "renovar", "rescindir"],
    answer: (_q) =>
      `Es posible modificar el contrato de renting antes de su vencimiento, aunque puede implicar penalizaciones según las condiciones pactadas. Nuestros asesores en Grupo Avisa te explicarán las opciones disponibles y los costes asociados antes de tomar cualquier decisión.`,
  },
  {
    keywords: ["mantenimiento", "revisión", "taller", "kilometraje", "revisiones"],
    answer: (_q) =>
      `El mantenimiento del vehículo eléctrico en renting está cubierto por la cuota mensual. Incluye revisiones periódicas según el fabricante, cambio de filtros y líquidos, y cualquier reparación derivada del desgaste normal. Solo quedan fuera los daños por accidente (cubiertos por el seguro incluido).`,
  },
  {
    keywords: ["batería", "autonomía", "carga", "cargar", "punto de carga"],
    answer: (_q) =>
      `La batería de los vehículos eléctricos de renting en Grupo Avisa está cubierta por la garantía del fabricante (normalmente 8 años o 160.000 km). La carga puede realizarse en casa con wallbox, en puntos públicos o en cargadores rápidos. Te asesoramos sobre la mejor solución de carga para tu perfil.`,
  },
  {
    keywords: ["garantía", "cobertura", "avería", "fallo"],
    answer: (_q) =>
      `Los vehículos en renting de Grupo Avisa incluyen garantía oficial del fabricante durante todo el período de contrato. Cualquier avería o fallo mecánico no derivado de un accidente está cubierto. Disponemos de vehículo de sustitución mientras el tuyo está en reparación.`,
  },
  {
    keywords: ["kilómetros", "km", "exceso", "sobrante", "mileage"],
    answer: (_q) =>
      `El contrato de renting incluye un límite de kilómetros anuales acordado al inicio (normalmente entre 10.000 y 50.000 km/año). Si superas ese límite, se aplica un coste por km extra. Si crees que vas a necesitar más km, es mejor pactarlo desde el principio para obtener mejor precio.`,
  },
  {
    keywords: ["diferencia", "diferencias", "leasing", "compra", "versus", "vs"],
    answer: (_q) =>
      `El renting ofrece cuota fija todo incluido sin desembolso inicial, ideal para empresas y autónomos. El leasing implica financiación con opción de compra. Comprar supone mayor inversión inicial pero el vehículo es tuyo. En Grupo Avisa te asesoramos sobre la mejor opción para tu caso.`,
  },
  {
    keywords: ["empresa", "flota", "empresas", "negocio", "sociedad"],
    answer: (_q) =>
      `El renting de flota para empresas en Grupo Avisa ofrece condiciones especiales: gestión centralizada de vehículos, facturación unificada, sustituciones ágiles y asesoramiento sobre electrificación de flotas. Contacta con nuestro departamento de flotas para un presupuesto a medida.`,
  },
];

function generateAnswer(question: string): string {
  const q = question.toLowerCase();
  for (const { keywords, answer } of ANSWER_TEMPLATES) {
    if (keywords.some((kw) => q.includes(kw))) {
      return answer(q);
    }
  }
  return `En Grupo Avisa estamos encantados de resolver esta consulta. Para darte la información más precisa y actualizada, puedes contactarnos por teléfono en el 955 034 600, por WhatsApp o enviar un email a info@grupoavisa.com. Nuestro equipo te atenderá sin compromiso.`;
}

function extractQuestions(text: string): string[] {
  const lines = text.split(/[\n\r]+/).map((l) => l.trim()).filter(Boolean);
  const questions: string[] = [];
  for (const line of lines) {
    const sentences = line.split(/(?<=[.!?])\s+/).map((s) => s.trim());
    for (const sentence of sentences) {
      const clean = sentence.replace(/^[-•*·]\s*/, "").trim();
      if (!clean) continue;
      if (clean.endsWith("?")) {
        const q = clean.startsWith("¿") ? clean : `¿${clean}`;
        questions.push(q);
      } else if (/^(qué|cuánto|cuál|cómo|dónde|cuándo|por qué|puede|se puede|hay|tiene|es|incluye|puedo|podría)/i.test(clean)) {
        const q = clean.endsWith("?") ? clean : `¿${clean}?`;
        questions.push(q);
      }
    }
  }
  const unique = [...new Set(questions.filter((q) => q.length > 10 && q.length < 300))];
  return unique.slice(0, 30);
}

function makeSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export default function AdminImportFaqs() {
  const { toast } = useToast();
  const [source, setSource] = useState<Source>("whatsapp");
  const [text, setText] = useState("");
  const [extracted, setExtracted] = useState<ExtractedFaq[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [publishing, setPublishing] = useState(false);

  const { data: categories = [] } = useQuery<FaqCategory[]>({
    queryKey: ["/api/admin/faq-categories"],
  });

  const { data: recentFaqs = [] } = useQuery<Faq[]>({
    queryKey: ["/api/admin/faqs"],
  });

  const recent = [...recentFaqs]
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""))
    .slice(0, 8);

  function handleExtract() {
    const questions = extractQuestions(text);
    if (questions.length === 0) {
      toast({ title: "No se encontraron preguntas", description: "Asegúrate de incluir frases que terminen en ? o empiecen con palabras interrogativas.", variant: "destructive" });
      return;
    }
    const faqs: ExtractedFaq[] = questions.map((q) => ({
      question: q,
      answer: generateAnswer(q),
      editing: false,
      selected: true,
    }));
    setExtracted(faqs);
    setStep(2);
  }

  function toggleSelect(i: number) {
    setExtracted((prev) => prev.map((f, idx) => idx === i ? { ...f, selected: !f.selected } : f));
  }

  function toggleEdit(i: number) {
    setExtracted((prev) => prev.map((f, idx) => idx === i ? { ...f, editing: !f.editing } : f));
  }

  function updateAnswer(i: number, val: string) {
    setExtracted((prev) => prev.map((f, idx) => idx === i ? { ...f, answer: val } : f));
  }

  function updateQuestion(i: number, val: string) {
    setExtracted((prev) => prev.map((f, idx) => idx === i ? { ...f, question: val } : f));
  }

  function toggleAll() {
    const allSelected = extracted.every((f) => f.selected);
    setExtracted((prev) => prev.map((f) => ({ ...f, selected: !allSelected })));
  }

  async function publishSelected() {
    const toPublish = extracted.filter((f) => f.selected);
    if (toPublish.length === 0) {
      toast({ title: "Nada seleccionado", description: "Marca al menos una pregunta para publicar." });
      return;
    }
    const defaultCatId = categories[0]?.id || "";
    setPublishing(true);
    let ok = 0;
    for (const faq of toPublish) {
      try {
        await apiRequest("POST", "/api/admin/faqs", {
          question: faq.question,
          answer: faq.answer,
          categoryId: defaultCatId,
          slug: makeSlug(faq.question),
          published: true,
          sortOrder: 0,
        });
        ok++;
      } catch {}
    }
    setPublishing(false);
    queryClient.invalidateQueries({ queryKey: ["/api/admin/faqs"] });
    toast({ title: "FAQs publicadas", description: `${ok} preguntas añadidas correctamente` });
    setExtracted([]);
    setText("");
    setStep(1);
  }

  const selectedCount = extracted.filter((f) => f.selected).length;

  return (
    <AdminLayout>
      <div className="space-y-6" data-testid="admin-import-faqs">

        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-title">Importar Preguntas</h1>
          <p className="text-gray-500 mt-1">Pega texto de clientes, extrae preguntas y publica FAQs automáticamente</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
              <i className="ri-chat-3-line text-emerald-600 text-lg" aria-hidden="true"></i>
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Paso 1: Importar conversación</h2>
              <p className="text-sm text-gray-500 mt-0.5">Pega una conversación de WhatsApp, mensaje de formulario o texto del CRM</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Origen</label>
              <div className="relative w-64">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as Source)}
                  className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 pr-8 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  data-testid="select-source"
                >
                  {(Object.keys(SOURCE_LABELS) as Source[]).map((s) => (
                    <option key={s} value={s}>{SOURCE_LABELS[s]}</option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true"></i>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Texto</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={SOURCE_PLACEHOLDERS[source]}
                rows={7}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                data-testid="textarea-text"
              />
            </div>

            <button
              onClick={handleExtract}
              disabled={!text.trim()}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              data-testid="button-extract"
            >
              <i className="ri-sparkling-line" aria-hidden="true"></i>
              Extraer preguntas y generar respuestas
            </button>
          </div>
        </div>

        {step === 2 && extracted.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                  <i className="ri-check-double-line text-blue-600 text-lg" aria-hidden="true"></i>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Paso 2: Revisar y publicar</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{extracted.length} preguntas extraídas · {selectedCount} seleccionadas</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAll}
                  className="text-sm text-gray-500 hover:text-gray-700"
                  data-testid="button-toggle-all"
                >
                  {extracted.every((f) => f.selected) ? "Desmarcar todas" : "Seleccionar todas"}
                </button>
                <button
                  onClick={publishSelected}
                  disabled={selectedCount === 0 || publishing}
                  className="bg-[#ad023b] hover:bg-[#8d0230] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                  data-testid="button-publish"
                >
                  {publishing
                    ? <><i className="ri-loader-4-line animate-spin"></i> Publicando...</>
                    : <><i className="ri-send-plane-line"></i> Publicar {selectedCount} FAQs</>
                  }
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {extracted.map((faq, i) => (
                <div
                  key={i}
                  className={`px-6 py-4 transition-colors ${faq.selected ? "" : "bg-gray-50 opacity-60"}`}
                  data-testid={`faq-item-${i}`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={faq.selected}
                      onChange={() => toggleSelect(i)}
                      className="mt-1 w-4 h-4 accent-[#ad023b] cursor-pointer shrink-0"
                      data-testid={`checkbox-faq-${i}`}
                    />
                    <div className="flex-1 min-w-0 space-y-2">
                      {faq.editing ? (
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateQuestion(i, e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          data-testid={`input-question-${i}`}
                        />
                      ) : (
                        <p className="text-sm font-semibold text-gray-900">{faq.question}</p>
                      )}

                      {faq.editing ? (
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateAnswer(i, e.target.value)}
                          rows={4}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          data-testid={`textarea-answer-${i}`}
                        />
                      ) : (
                        <p className="text-sm text-gray-500 line-clamp-2">{faq.answer}</p>
                      )}

                      <div className="flex items-center gap-2 pt-1">
                        <span className="text-xs font-mono text-gray-400">/preguntas/{makeSlug(faq.question)}</span>
                        <button
                          onClick={() => toggleEdit(i)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 ml-auto"
                          data-testid={`button-edit-${i}`}
                        >
                          {faq.editing ? (
                            <><i className="ri-check-line mr-0.5"></i>Guardar</>
                          ) : (
                            <><i className="ri-edit-line mr-0.5"></i>Editar</>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <i className="ri-history-line text-gray-400" aria-hidden="true"></i>
            <h2 className="font-semibold text-gray-900">FAQs recientes</h2>
          </div>
          {recent.length === 0 ? (
            <div className="px-6 py-8 text-center text-gray-400 text-sm">
              <i className="ri-question-line text-3xl block mb-2" aria-hidden="true"></i>
              No hay FAQs publicadas todavía
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recent.map((faq, i) => (
                <div key={faq.id} className="px-6 py-3 hover:bg-gray-50" data-testid={`recent-faq-${i}`}>
                  <p className="text-sm font-medium text-gray-900 truncate">{faq.question}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400 font-mono">/preguntas/{faq.slug || makeSlug(faq.question)}</span>
                    {faq.createdAt && (
                      <>
                        <span className="text-gray-300">·</span>
                        <span className="text-xs text-gray-400">
                          {new Date(faq.createdAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" })}
                        </span>
                      </>
                    )}
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full ${faq.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {faq.published ? "Publicado" : "Borrador"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
