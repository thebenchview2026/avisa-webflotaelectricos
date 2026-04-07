"use client";
import { useState, useEffect } from "react";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "avisa_cookie_consent";
const CONSENT_VERSION = "1";

function getStoredConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.consent;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: Date.now() })
  );
}

function pushGoogleConsent(consent: ConsentState) {
  const w = window as any;
  if (!w.gtag) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
  }
  w.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });
}

function setDefaultGoogleConsent() {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () {
    w.dataLayer.push(arguments);
  };
  w.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setDefaultGoogleConsent();

    const stored = getStoredConsent();
    if (stored) {
      pushGoogleConsent(stored);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const all: ConsentState = { necessary: true, analytics: true, marketing: true };
    storeConsent(all);
    pushGoogleConsent(all);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const none: ConsentState = { necessary: true, analytics: false, marketing: false };
    storeConsent(none);
    pushGoogleConsent(none);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    storeConsent(consent);
    pushGoogleConsent(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center" data-testid="cookie-consent-overlay">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => {}} />

      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl max-w-lg w-full mx-4 mb-0 sm:mb-0 max-h-[90vh] overflow-y-auto" data-testid="cookie-consent-banner">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center flex-shrink-0">
              <i className="ri-shield-check-line text-white text-lg"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Tu privacidad es importante</h3>
          </div>

          <p className="text-sm text-slate-600 mb-5 leading-relaxed">
            Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar contenido.
            Puedes aceptar todas, rechazarlas o configurar tus preferencias.{" "}
            <a href="/terminos" className="text-[#ad023b] hover:underline font-medium">
              Política de cookies
            </a>
          </p>

          {showDetails && (
            <div className="space-y-3 mb-5 border border-slate-200 rounded-xl p-4 bg-slate-50" data-testid="cookie-details">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Necesarias</p>
                  <p className="text-xs text-slate-500">Imprescindibles para el funcionamiento</p>
                </div>
                <div className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">Siempre activas</div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Analíticas</p>
                  <p className="text-xs text-slate-500">Google Analytics, medición de tráfico</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" data-testid="toggle-analytics">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-[#ad023b] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>

              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Marketing</p>
                  <p className="text-xs text-slate-500">Google Ads, remarketing y conversiones</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" data-testid="toggle-marketing">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 rounded-full peer peer-checked:bg-[#ad023b] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button
              onClick={handleAcceptAll}
              className="w-full bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors"
              data-testid="button-accept-all-cookies"
            >
              Aceptar todas
            </button>

            {showDetails ? (
              <button
                onClick={handleSavePreferences}
                className="w-full bg-[#ad023b] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#8d0230] transition-colors"
                data-testid="button-save-preferences"
              >
                Guardar preferencias
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                data-testid="button-configure-cookies"
              >
                <i className="ri-settings-3-line mr-1"></i> Configurar cookies
              </button>
            )}

            <button
              onClick={handleRejectAll}
              className="w-full text-slate-500 py-2 text-sm hover:text-slate-700 transition-colors"
              data-testid="button-reject-cookies"
            >
              Rechazar opcionales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
