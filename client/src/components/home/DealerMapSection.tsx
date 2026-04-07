"use client";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Dealer } from "@shared/schema";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

function createBlackIcon(L: any) {
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

export default function DealerMapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletReady, setLeafletReady] = useState(false);

  const { data: dealers = [], isLoading } = useQuery<Dealer[]>({
    queryKey: ["/api/dealers"],
  });

  const activeDealers = dealers.filter(d => d.active !== false);

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
    if (!leafletReady || !mapRef.current || mapInstanceRef.current || isLoading || activeDealers.length === 0) return;

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

    activeDealers.forEach((dealer) => {
      if (!dealer.lat || !dealer.lng) return;
      const lat = Number(dealer.lat);
      const lng = Number(dealer.lng);
      points.push([lat, lng]);
      const phoneClean = dealer.phone?.replace(/\s/g, "") || "";
      const marker = L.marker([lat, lng], { icon }).addTo(map);
      marker.bindPopup(`
        <div style="min-width:200px;font-family:system-ui,sans-serif;">
          <div style="font-weight:700;font-size:14px;margin-bottom:4px;color:#000;">${dealer.name}</div>
          <div style="font-size:12px;color:#555;margin-bottom:8px;">${dealer.address}</div>
          ${phoneClean ? `<a href="tel:${phoneClean}" style="display:inline-flex;align-items:center;gap:4px;background:#000;color:#fff;padding:6px 16px;border-radius:20px;font-size:11px;font-weight:700;text-decoration:none;"><i class="ri-phone-line"></i> Llámame</a>` : ""}
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
  }, [activeDealers, isLoading, leafletReady]);

  return (
    <section id="concesionarios" className="py-20 bg-slate-50" data-testid="section-dealers">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-dealers-title">
            Nuestras Ubicaciones
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Grupo Avisa cuenta con concesionarios en Sevilla, Huelva, Badajoz, Cáceres y Córdoba. Encuentra el más cercano a ti.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 mb-12">
          <div
            ref={mapRef}
            className="w-full"
            style={{ height: "480px" }}
            data-testid="map-dealers"
          />
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md animate-pulse h-40" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDealers.map((dealer, index) => {
              const phoneClean = dealer.phone?.replace(/\s/g, "") || "";
              const logoUrl = Array.isArray(dealer.brandLogos) ? dealer.brandLogos[0] : null;
              return (
                <div key={dealer.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow" data-testid={`card-dealer-${index}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center p-2">
                      {logoUrl ? (
                        <img alt={`${dealer.brand} logo`} className="w-full h-full object-contain" src={logoUrl} loading="lazy" decoding="async" width={32} height={32} />
                      ) : (
                        <span className="text-white text-xs font-bold">{dealer.brand?.slice(0, 2)}</span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900">{dealer.name}</h3>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    <i className="ri-map-pin-line text-[#ad023b] mr-2"></i>
                    {dealer.address}
                  </p>
                  {phoneClean && (
                    <p className="mb-3">
                      <a href={`tel:${phoneClean}`} className="inline-flex items-center gap-1.5 bg-[#ad023b] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#8d0230] transition-colors cursor-pointer">
                        <i className="ri-phone-line"></i> Llámame
                      </a>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[8px] font-bold">A</span>
            </div>
            <span>{activeDealers.length} concesionarios en Andalucía y Extremadura</span>
          </div>
        </div>
      </div>
    </section>
  );
}
