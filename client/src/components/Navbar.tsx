"use client";
import { useState } from "react";
import { Link, useLocation } from "@/lib/router";
import { CONTACT } from "@/lib/contact";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [electricosSubmenuOpen, setElectricosSubmenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md" role="banner" data-testid="navbar">
      <div className="hidden sm:block border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            <div className="flex items-center gap-6 text-sm">
              <a href={`mailto:${CONTACT.email}`} aria-label={`Enviar email a ${CONTACT.email}`} className="hidden sm:flex items-center gap-2 text-white hover:opacity-80 transition-opacity min-h-[44px] py-2" data-testid="link-email">
                <i className="ri-mail-line" aria-hidden="true"></i>
                <span>{CONTACT.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Grupo Avisa" className="text-white hover:opacity-80 transition-opacity min-w-[44px] min-h-[44px] flex items-center justify-center" data-testid="link-linkedin">
                <i className="ri-linkedin-fill text-lg" aria-hidden="true"></i>
              </a>
              <a href={`tel:${CONTACT.phone}`} aria-label={CONTACT.phoneAria} className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 active:bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold transition-all shadow-sm" data-testid="link-phone">
                <i className="ri-phone-line text-xs" aria-hidden="true"></i>
                <span>Llámame</span>
              </a>
              <a href="/admin" className="text-white hover:opacity-80 transition-opacity flex items-center gap-1 text-xs font-medium" data-testid="link-admin-access">
                <i className="ri-lock-line text-sm"></i>
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center min-h-[44px]" data-testid="link-home-logo">
            <img
              alt="Grupo Avisa"
              className="h-10 w-auto mix-blend-screen"
              src="/logo.webp"
              height={40}
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8" aria-label="Navegación principal" data-testid="nav-desktop">
            <Link href="/" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-inicio">
              Inicio
            </Link>

            <div className="relative group">
              <button className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center whitespace-nowrap" data-testid="button-nav-electricos">
                Promociones Eléctricos
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              <div className="absolute top-full left-0 mt-0 w-72 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link
                    href="/promociones-electricos"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors"
                    data-testid="link-submenu-ofertas"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[#ad023b]/10 rounded-lg">
                      <i className="ri-price-tag-3-line text-[#ad023b]"></i>
                    </span>
                    <div>
                      <span className="font-medium block">Ofertas Eléctricos</span>
                      <span className="text-xs text-slate-500">Modelos y promociones</span>
                    </div>
                  </Link>
                  <Link
                    href="/electrificacion"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors"
                    data-testid="link-submenu-electrificacion"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[#ad023b]/10 rounded-lg">
                      <i className="ri-flashlight-line text-[#ad023b]"></i>
                    </span>
                    <div>
                      <span className="font-medium block">¿Cuándo electrificar?</span>
                      <span className="text-xs text-slate-500">Guía de decisión</span>
                    </div>
                  </Link>
                  <Link
                    href="/conductores-adopcion"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors"
                    data-testid="link-submenu-conductores"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-[#ad023b]/10 rounded-lg">
                      <i className="ri-user-settings-line text-[#ad023b]"></i>
                    </span>
                    <div>
                      <span className="font-medium block">Conductores y Adopción</span>
                      <span className="text-xs text-slate-500">Gestión del cambio</span>
                    </div>
                  </Link>
                  <div className="border-t border-slate-100 my-2"></div>
                  <Link
                    href="/autoplus"
                    className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors"
                    data-testid="link-submenu-autoplus"
                  >
                    <span className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg">
                      <i className="ri-government-line text-green-600"></i>
                    </span>
                    <div>
                      <span className="font-medium block">Autoplus</span>
                      <span className="text-xs text-slate-500">Ayudas hasta 7.000€</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/promociones-hibridos" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-hibridos">
              Híbridos
            </Link>
            <Link href="/autoplus" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-autoplus">
              Autoplus
            </Link>
            <Link href="/postventa" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-postventa">
              Postventa
            </Link>
            <Link href="/preguntas" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-faqs">
              FAQs
            </Link>

            <div className="relative group">
              <button className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center whitespace-nowrap" data-testid="button-nav-contenido">
                Contenido
                <i className="ri-arrow-down-s-line ml-1"></i>
              </button>
              <div className="absolute top-full right-0 mt-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  <Link href="/novedades" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors" data-testid="link-submenu-novedades">
                    <span className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg"><i className="ri-newspaper-line text-blue-600"></i></span>
                    <div><span className="font-medium block">Novedades</span><span className="text-xs text-slate-500">Últimas noticias</span></div>
                  </Link>
                  <Link href="/guias" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors" data-testid="link-submenu-guias">
                    <span className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg"><i className="ri-book-open-line text-green-600"></i></span>
                    <div><span className="font-medium block">Guías</span><span className="text-xs text-slate-500">Guías prácticas</span></div>
                  </Link>
                  <Link href="/comparativas" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors" data-testid="link-submenu-comparativas">
                    <span className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg"><i className="ri-scales-3-line text-purple-600"></i></span>
                    <div><span className="font-medium block">Comparativas</span><span className="text-xs text-slate-500">Compara modelos</span></div>
                  </Link>
                  <Link href="/consejos" className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-[#ad023b] transition-colors" data-testid="link-submenu-consejos">
                    <span className="w-8 h-8 flex items-center justify-center bg-amber-100 rounded-lg"><i className="ri-lightbulb-line text-amber-600"></i></span>
                    <div><span className="font-medium block">Consejos</span><span className="text-xs text-slate-500">Tips y trucos</span></div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/concesionarios" className="text-white hover:text-slate-200 font-medium transition-colors cursor-pointer min-h-[44px] flex items-center" data-testid="link-nav-concesionarios">
              Concesionarios
            </Link>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-w-[44px] min-h-[44px] text-white rounded-lg cursor-pointer flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={mobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            <i className={`text-2xl ${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/20">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2" aria-label="Navegación móvil" data-testid="nav-mobile">
            <Link href="/" className="block text-white hover:text-slate-200 py-3 transition-colors" onClick={() => setMobileMenuOpen(false)}>
              Inicio
            </Link>

            <div>
              <button
                onClick={() => setElectricosSubmenuOpen(!electricosSubmenuOpen)}
                className="flex items-center justify-between w-full text-white hover:text-slate-200 py-3 transition-colors cursor-pointer"
              >
                <span>Promociones Eléctricos</span>
                <i className={`ri-arrow-${electricosSubmenuOpen ? 'up' : 'down'}-s-line`}></i>
              </button>
              {electricosSubmenuOpen && (
                <div className="pl-4 space-y-2 border-l-2 border-[#ad023b] ml-2">
                  <Link className="block text-white/80 hover:text-white py-2 transition-colors" href="/promociones-electricos" onClick={() => setMobileMenuOpen(false)}>
                    Ofertas Eléctricos
                  </Link>
                  <Link className="block text-white/80 hover:text-white py-2 transition-colors" href="/electrificacion" onClick={() => setMobileMenuOpen(false)}>
                    ¿Cuándo electrificar?
                  </Link>
                  <Link className="block text-white/80 hover:text-white py-2 transition-colors" href="/conductores-adopcion" onClick={() => setMobileMenuOpen(false)}>
                    Conductores y Adopción
                  </Link>
                  <Link className="block text-white/80 hover:text-white py-2 transition-colors" href="/autoplus" onClick={() => setMobileMenuOpen(false)}>
                    Autoplus
                  </Link>
                </div>
              )}
            </div>

            <Link className="block text-white hover:text-slate-200 py-3 transition-colors" href="/promociones-hibridos" onClick={() => setMobileMenuOpen(false)}>
              Híbridos
            </Link>
            <Link className="block text-white hover:text-slate-200 py-3 transition-colors" href="/postventa" onClick={() => setMobileMenuOpen(false)}>
              Postventa
            </Link>
            <Link className="block text-white hover:text-slate-200 py-3 transition-colors" href="/preguntas" onClick={() => setMobileMenuOpen(false)}>
              FAQs
            </Link>
            <Link className="block text-white hover:text-slate-200 py-3 transition-colors" href="/concesionarios" onClick={() => setMobileMenuOpen(false)}>
              Concesionarios
            </Link>
            <div className="border-t border-white/10 pt-2 mt-2">
              <span className="block text-white/50 text-xs uppercase tracking-wider px-0 py-1">Contenido</span>
              <Link className="block text-white hover:text-slate-200 py-2 transition-colors" href="/novedades" onClick={() => setMobileMenuOpen(false)}>
                <i className="ri-newspaper-line mr-2" aria-hidden="true"></i>Novedades
              </Link>
              <Link className="block text-white hover:text-slate-200 py-2 transition-colors" href="/guias" onClick={() => setMobileMenuOpen(false)}>
                <i className="ri-book-open-line mr-2" aria-hidden="true"></i>Guías
              </Link>
              <Link className="block text-white hover:text-slate-200 py-2 transition-colors" href="/comparativas" onClick={() => setMobileMenuOpen(false)}>
                <i className="ri-scales-3-line mr-2" aria-hidden="true"></i>Comparativas
              </Link>
              <Link className="block text-white hover:text-slate-200 py-2 transition-colors" href="/consejos" onClick={() => setMobileMenuOpen(false)}>
                <i className="ri-lightbulb-line mr-2" aria-hidden="true"></i>Consejos
              </Link>
            </div>
            <div className="border-t border-white/20 pt-4 mt-2 grid grid-cols-2 gap-3 pb-2">
              <a
                href={`tel:${CONTACT.phone}`}
                className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-menu-phone"
              >
                <i className="ri-phone-line" aria-hidden="true"></i>
                Llámame
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-xl font-bold text-sm"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="link-mobile-menu-whatsapp"
              >
                <i className="ri-whatsapp-line" aria-hidden="true"></i>
                WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}