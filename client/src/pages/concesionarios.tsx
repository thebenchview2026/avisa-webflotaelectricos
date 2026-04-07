"use client";
import { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "@/lib/router";
import { useLocation } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { localBusinessJsonLd } from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import AutoLinkedText from "@/components/AutoLinkedText";
import type { Dealer } from "@shared/schema";

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

const faqs = [
  {
    question: "¿Cuánto tarda la respuesta?",
    answer:
      "Respondemos en menos de 24 horas laborables. Si tu consulta requiere análisis detallado, te lo indicaremos y acordaremos una llamada.",
  },
  {
    question: "¿Tiene coste la consulta inicial?",
    answer:
      "No. La primera conversación es gratuita y sin compromiso. Solo queremos entender tus necesidades y ayudarte a elegir el vehículo eléctrico o híbrido adecuado.",
  },
  {
    question: "¿Me ayudáis con las ayudas del Plan MOVES?",
    answer:
      "Sí. Te asesoramos sobre todas las ayudas disponibles (Plan MOVES III, ayudas autonómicas, etc.) y nos encargamos de toda la tramitación sin coste adicional. Además, adelantamos el importe de la ayuda.",
  },
  {
    question: "¿Puedo probar un vehículo antes de decidirme?",
    answer:
      "Por supuesto. Ofrecemos pruebas de conducción de vehículos eléctricos e híbridos en todos nuestros concesionarios para que puedas experimentar la diferencia antes de tomar una decisión.",
  },
  {
    question:
      "¿Qué diferencia hay entre un híbrido y un híbrido enchufable?",
    answer:
      "Los híbridos enchufables (PHEV) tienen baterías más grandes que se cargan en la red eléctrica y pueden circular en modo 100% eléctrico hasta 50-80 km. Los híbridos convencionales solo se cargan con el motor y la frenada regenerativa. Los PHEV tienen acceso a las ayudas del Plan MOVES.",
  },
];

const relatedLinks = [
  {
    title: "Promociones Eléctricos",
    description:
      "Descubre las mejores ofertas en vehículos 100% eléctricos",
    href: "/promociones-electricos",
  },
  {
    title: "Promociones Híbridos",
    description: "Ofertas especiales en vehículos híbridos y PHEV",
    href: "/promociones-hibridos",
  },
  {
    title: "¿Cuándo electrificar?",
    description: "¿Tiene sentido para ti un vehículo eléctrico?",
    href: "/electrificacion",
  },
  {
    title: "Plan MOVES III",
    description: "Ayudas y subvenciones para tu vehículo eléctrico",
    href: "/autoplus",
  },
];

function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 pt-20 pb-16" aria-label="Red de concesionarios">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <h1
            className="text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            data-testid="text-concesionarios-title"
          >
            Tu próximo vehículo eléctrico o híbrido
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
            Sin compromiso. Sin presión comercial. Solo una conversación
            honesta sobre qué vehículo se adapta mejor a tus necesidades.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoVehiculo: "",
    presupuesto: "",
    mensaje: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [charCount, setCharCount] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);
  const maxChars = 500;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "mensaje") {
      if (value.length <= maxChars) {
        setFormData((prev) => ({ ...prev, [name]: value }));
        setCharCount(value.length);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (charCount > maxChars || !acceptTerms) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          acepta_terminos: acceptTerms ? "Sí" : "No",
          acepta_marketing: acceptMarketing ? "Sí" : "No",
          origen: "concesionarios",
        }),
      });

      if (response.ok) {
        const params = new URLSearchParams({
          nombre: formData.nombre,
          origen: "concesionarios",
        });
        navigate(`/confirmacion-contacto?${params.toString()}`);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900" aria-label="Formulario de contacto">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-md border border-slate-200 dark:border-slate-700">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Solicita información sobre vehículos eléctricos e híbridos
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-8">
            Rellena el formulario y un asesor especializado te contactará en
            menos de 24 horas laborables.
          </p>

          <div className="flex items-start gap-4 mb-8 p-4 bg-[#ad023b]/5 dark:bg-[#ad023b]/10 rounded-md border border-[#ad023b]/10 dark:border-[#ad023b]/20">
            <img
              src="/ana-perez.png"
              alt="Ana - Asesora de vehículos eléctricos"
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              data-testid="img-advisor-ana"
            />
            <div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-slate-900 dark:text-white">
                  La persona que te va a atender es Ana
                </span>
                , lleva más de 10 años como profesional de flotas en Avisa y
                de forma rápida tendrás un asesoramiento directo de alta
                calidad.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  data-testid="input-nombre"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  data-testid="input-email"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="telefono"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  data-testid="input-telefono"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="Opcional"
                />
              </div>

              <div>
                <label
                  htmlFor="tipoVehiculo"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
                >
                  Tipo de vehículo que te interesa
                </label>
                <select
                  id="tipoVehiculo"
                  name="tipoVehiculo"
                  value={formData.tipoVehiculo}
                  onChange={handleChange}
                  data-testid="select-tipo-vehiculo"
                  className="w-full px-4 py-3 pr-8 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="electrico">100% Eléctrico</option>
                  <option value="hibrido-enchufable">
                    Híbrido Enchufable (PHEV)
                  </option>
                  <option value="hibrido">Híbrido (HEV)</option>
                  <option value="no-seguro">Aún no lo tengo claro</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="presupuesto"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Presupuesto aproximado
              </label>
              <select
                id="presupuesto"
                name="presupuesto"
                value={formData.presupuesto}
                onChange={handleChange}
                data-testid="select-presupuesto"
                className="w-full px-4 py-3 pr-8 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm cursor-pointer bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
              >
                <option value="">Selecciona una opción</option>
                <option value="hasta-25000">Hasta 25.000€</option>
                <option value="25000-35000">25.000€ - 35.000€</option>
                <option value="35000-50000">35.000€ - 50.000€</option>
                <option value="mas-50000">Más de 50.000€</option>
                <option value="financiacion">
                  Prefiero opciones de financiación
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                ¿Qué necesitas saber? *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                required
                rows={5}
                maxLength={maxChars}
                data-testid="textarea-mensaje"
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:ring-2 focus:ring-[#ad023b] focus:border-transparent text-sm resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Cuéntanos qué modelo te interesa, dudas sobre autonomía, puntos de carga, ayudas disponibles..."
              />
              <div className="flex justify-between items-center mt-2 gap-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {charCount}/{maxChars} caracteres
                </p>
                {charCount > maxChars && (
                  <p className="text-xs text-red-600 font-medium">
                    Has superado el límite de caracteres
                  </p>
                )}
              </div>
            </div>

            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                <p className="text-green-800 dark:text-green-300 text-sm">
                  ¡Gracias por tu interés! Un asesor especializado te
                  contactará pronto.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-red-800 dark:text-red-300 text-sm">
                  Hubo un error al enviar el formulario. Por favor, inténtalo
                  de nuevo.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  data-testid="checkbox-terms"
                  className="mt-1 w-4 h-4 text-[#ad023b] border-slate-300 rounded focus:ring-[#ad023b] cursor-pointer"
                  required
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  He leído y acepto{" "}
                  <Link
                    href="/terminos"
                    className="text-[#ad023b] underline hover:text-[#8d0230]"
                    data-testid="link-terms"
                  >
                    los términos y condiciones de la política de privacidad
                  </Link>
                  .
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptMarketing}
                  onChange={(e) => setAcceptMarketing(e.target.checked)}
                  data-testid="checkbox-marketing"
                  className="mt-1 w-4 h-4 text-[#ad023b] border-slate-300 rounded focus:ring-[#ad023b] cursor-pointer"
                />
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Doy mi consentimiento para el tratamiento de mis datos
                  personales con fines de marketing y comerciales (Opcional)
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={
                isSubmitting || charCount > maxChars || !acceptTerms
              }
              data-testid="button-submit-contact"
              className="w-full bg-[#ad023b] text-white py-4 rounded-md font-semibold hover:bg-[#8d0230] transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              {isSubmitting ? "Enviando..." : "Solicitar información"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              O contáctanos directamente:
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+34955034600"
                className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-5 py-2.5 rounded-full font-bold hover:bg-[#8d0230] transition-colors cursor-pointer"
                data-testid="link-phone"
              >
                <i className="ri-phone-line" aria-hidden="true"></i>
                <span>Llámame</span>
              </a>
              <a
                href="mailto:info@grupoavisa.com"
                className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-[#ad023b] transition-colors cursor-pointer"
                data-testid="link-email"
              >
                <i className="ri-mail-line w-5 h-5" aria-hidden="true"></i>
                <span>info@grupoavisa.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function createBlackIcon(L: typeof window.L) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="45">
    <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 24 12 24s12-15 12-24C24 5.4 18.6 0 12 0z" fill="#000000" stroke="#ffffff" stroke-width="1.5"/>
    <circle cx="12" cy="11" r="5" fill="#ffffff"/>
    <text x="12" y="14" text-anchor="middle" font-size="8" font-weight="bold" fill="#000000" font-family="Arial">A</text>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [30, 45],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
  });
}

function DealerLocations({ initialData }: { initialData?: Dealer[] }) {
  const [selectedDealer, setSelectedDealer] = useState<string | null>(null);
  const { data: dealers = [], isLoading } = useQuery<Dealer[]>({ queryKey: ["/api/dealers"], initialData: initialData });
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletReady, setLeafletReady] = useState(false);

  useEffect(() => {
    let cssOk = !!document.querySelector('link[href*="leaflet.css"]');
    let jsOk = !!window.L;
    const check = () => { if (cssOk && jsOk) setLeafletReady(true); };

    if (!cssOk) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.onload = () => { cssOk = true; check(); };
      document.head.appendChild(link);
    }
    if (!jsOk) {
      if (document.querySelector('script[src*="leaflet.js"]')) {
        const interval = setInterval(() => { if (window.L) { jsOk = true; clearInterval(interval); check(); } }, 100);
        return () => clearInterval(interval);
      }
      const script = document.createElement("script");
      script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
      script.async = true;
      script.onload = () => { jsOk = true; check(); };
      document.head.appendChild(script);
    }
    check();
  }, []);

  useEffect(() => {
    if (!leafletReady || !mapRef.current || mapInstanceRef.current || isLoading || dealers.length === 0) return;

    const L = window.L;
    if (!L) return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
    }).setView([38.2, -5.8], 7);

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const icon = createBlackIcon(L);
    const points: [number, number][] = [];

    dealers.forEach((dealer) => {
      if (!dealer.lat || !dealer.lng) return;

      points.push([Number(dealer.lat), Number(dealer.lng)]);
      const marker = L.marker([Number(dealer.lat), Number(dealer.lng)], { icon }).addTo(map);
      const phoneClean = dealer.phone?.replace(/\s/g, "") || "+34955034600";
      marker.bindPopup(`
        <div style="min-width:200px;font-family:system-ui,sans-serif;">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#000;">${dealer.name}</div>
          <div style="font-size:12px;color:#555;margin-bottom:8px;">${dealer.address}</div>
          <a href="tel:${phoneClean}" style="display:inline-flex;align-items:center;gap:4px;background:#000;color:#fff;padding:6px 16px;border-radius:20px;font-size:11px;font-weight:700;text-decoration:none;">
            <i class="ri-phone-line"></i> Llámame
          </a>
        </div>
      `);
    });

    if (points.length > 0) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [dealers, isLoading, leafletReady]);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800" aria-label="Ubicaciones de concesionarios">
      <div className="max-w-7xl mx-auto px-6">
        <h2
          className="text-3xl font-bold text-slate-900 dark:text-white mb-4 text-center"
          data-testid="text-locations-title"
        >
          Nuestras Ubicaciones
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-center mb-8 max-w-2xl mx-auto">
          Grupo Avisa cuenta con concesionarios en Sevilla, Huelva, Badajoz,
          Cáceres y Córdoba. Encuentra el más cercano a ti.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 mb-12">
          <div
            ref={mapRef}
            className="w-full"
            style={{ height: "480px" }}
            data-testid="map-dealers"
          />
          <div className="bg-white dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[8px] font-bold">A</span>
                </div>
                <span className="text-slate-600 dark:text-slate-300">
                  {dealers.length} concesionarios en Andalucía y Extremadura
                </span>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-slate-500">
            <i className="ri-loader-4-line text-3xl animate-spin block mb-3" aria-hidden="true"></i>
            <p>Cargando concesionarios...</p>
          </div>
        ) : dealers.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <i className="ri-building-line text-3xl block mb-3" aria-hidden="true"></i>
            <p>No hay concesionarios disponibles en este momento.</p>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dealers.map((dealer) => (
            <div
              key={dealer.id}
              className={`bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg cursor-pointer transition-shadow ${
                selectedDealer === dealer.id
                  ? "ring-2 ring-[#ad023b]"
                  : ""
              }`}
              onClick={() => setSelectedDealer(dealer.id)}
              data-testid={`card-dealer-${dealer.id}`}
            >
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="w-12 h-12 bg-slate-900 dark:bg-slate-700 rounded-lg flex items-center justify-center p-2">
                  <img
                    alt={`${dealer.name} logo`}
                    className="w-full h-full object-contain"
                    src={dealer.brandLogos?.[0] || "https://cdn.dealerk.es/cars/make/brand/48/white/volkswagen.png"}
                  />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {dealer.name}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 flex items-start gap-2">
                <i className="ri-map-pin-line text-[#ad023b] flex-shrink-0 mt-0.5" aria-hidden="true"></i>
                {dealer.address}
              </p>
              {dealer.phone && (
              <p className="text-slate-600 dark:text-slate-300 text-sm mb-3">
                <a
                  href={`tel:${dealer.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-1.5 bg-[#ad023b] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#8d0230] transition-colors cursor-pointer"
                  data-testid={`link-phone-dealer-${dealer.id}`}
                >
                  <i className="ri-phone-line" aria-hidden="true"></i> Llámame
                </a>
              </p>
              )}
              <a
                href={dealer.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dealer.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#ad023b] hover:text-[#8d0230] text-sm font-medium mt-2 cursor-pointer gap-1"
                data-testid={`link-map-dealer-${dealer.id}`}
              >
                Ver en Google Maps <i className="ri-external-link-line" aria-hidden="true"></i>
              </a>
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}

function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white dark:bg-slate-900" aria-label="Preguntas frecuentes sobre concesionarios">
      <div className="max-w-4xl mx-auto px-6">
        <h2
          className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center"
          data-testid="text-faq-title"
        >
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 overflow-visible"
              data-testid={`faq-item-${index}`}
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
                data-testid={`button-faq-${index}`}
              >
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <i className="ri-arrow-up-s-line w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden="true"></i>
                ) : (
                  <i className="ri-arrow-down-s-line w-5 h-5 text-slate-500 flex-shrink-0" aria-hidden="true"></i>
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <AutoLinkedText text={faq.answer} as="p" className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed" excludeUrls={["/concesionarios"]} maxLinks={3} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedLinksSection() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-800" aria-label="Enlaces relacionados">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
          Antes de contactar, quizás te interese:
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {relatedLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="p-6 border border-slate-200 dark:border-slate-700 rounded-md hover-elevate transition-all group bg-white dark:bg-slate-900 cursor-pointer"
              data-testid={`link-related-${index}`}
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-[#ad023b] transition-colors">
                {link.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ConcesionariosPageProps {
  initialDealers?: Dealer[];
}

export default function ConcesionariosPage({ initialDealers }: ConcesionariosPageProps = {}) {
  return (
    <div
      className="min-h-screen flex flex-col pt-20 sm:pt-[120px]"
      data-testid="page-concesionarios"
    >
      <SEOHead
        title="Concesionarios Grupo Avisa - Red de Concesionarios en Andalucía y Extremadura"
        description="Encuentra tu concesionario Grupo Avisa más cercano. Volkswagen, Audi, Škoda en Sevilla, Huelva, Cádiz y Extremadura. Solicita cita previa y prueba de conducción."
        canonical="/concesionarios"
        jsonLd={localBusinessJsonLd}
      />
      <Navbar />
      <Breadcrumbs items={[]} currentPage="Concesionarios" />
      <main role="main">
        <ContactHero />
        <ContactFormSection />
        <DealerLocations initialData={initialDealers} />
        <ContactFAQ />
        <RelatedLinksSection />
      </main>
      <Footer />
    </div>
  );
}
