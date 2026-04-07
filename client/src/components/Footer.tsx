"use client";
import { Link } from "@/lib/router";
import { CONTACT } from "@/lib/contact";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#ad023b] text-white py-16" role="contentinfo" aria-label="Pie de página de Grupo Avisa" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div>
            <img
              alt="Grupo Avisa - Concesionario oficial de vehículos eléctricos e híbridos"
              className="h-10 w-auto mb-6 mix-blend-screen"
              src="/logo.webp"
              height={40}
              loading="lazy"
              decoding="async"
            />
            <p className="text-white/90 text-sm leading-relaxed mb-4">
              Concesionario oficial líder en vehículos eléctricos e híbridos enchufables. Tu partner en movilidad sostenible.
            </p>
            <div className="space-y-2 text-sm">
              <a href={`tel:${CONTACT.phone}`} aria-label={CONTACT.phoneAria} className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-bold transition-all" data-testid="link-footer-phone">
                <i className="ri-phone-line" aria-hidden="true"></i>
                <span>Llámame</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} aria-label={`Enviar email a ${CONTACT.email}`} className="flex items-center gap-2 hover:text-white/80 transition-colors" data-testid="link-footer-email">
                <i className="ri-mail-line" aria-hidden="true"></i>
                <span>{CONTACT.email}</span>
              </a>
            </div>
          </div>

          <nav aria-label="Enlaces de vehículos">
            <h3 className="font-bold text-lg mb-4">Vehículos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/promociones-electricos" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-gama-electrica">
                  Gama Eléctrica
                </Link>
              </li>
              <li>
                <Link href="/promociones-electricos" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-promo-electricos">
                  Promociones Eléctricos
                </Link>
              </li>
              <li>
                <Link href="/promociones-hibridos" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-promo-hibridos">
                  Promociones Híbridos
                </Link>
              </li>
              <li>
                <a href="#test-drive" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-test-drive">
                  Ven a probarlo
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Enlaces de servicios">
            <h3 className="font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/postventa" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-postventa">
                  Postventa
                </Link>
              </li>
              <li>
                <Link href="/autoplus" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-autoplus">
                  Autoplus
                </Link>
              </li>
              <li>
                <Link href="/preguntas" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-faqs">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/concesionarios" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-concesionarios">
                  Concesionarios
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Contenido editorial">
            <h3 className="font-bold text-lg mb-4">Contenido</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/novedades" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-novedades">
                  Novedades
                </Link>
              </li>
              <li>
                <Link href="/guias" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-guias">
                  Guías
                </Link>
              </li>
              <li>
                <Link href="/comparativas" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-comparativas">
                  Comparativas
                </Link>
              </li>
              <li>
                <Link href="/consejos" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-consejos">
                  Consejos
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Información legal">
            <h3 className="font-bold text-lg mb-4">Información Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/aviso-legal" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-aviso-legal">
                  Aviso Legal
                </Link>
              </li>
              <li>
                <Link href="/terminos" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-privacidad">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/politica-cookies" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-cookies">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <button
                  onClick={() => { localStorage.removeItem("avisa_cookie_consent"); window.location.reload(); }}
                  className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer"
                  data-testid="button-footer-config-cookies"
                >
                  Configurar Cookies
                </button>
              </li>
              <li>
                <Link href="/condiciones-uso" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-condiciones">
                  Condiciones de Uso
                </Link>
              </li>
              <li>
                <Link href="/accesibilidad" className="text-white/90 hover:text-yellow-300 text-sm transition-colors cursor-pointer" data-testid="link-footer-accesibilidad">
                  Declaración de Accesibilidad
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm" data-testid="text-copyright">
              © {currentYear} Grupo Avisa. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Grupo Avisa" className="text-white hover:text-white/80 transition-colors" data-testid="link-footer-linkedin">
                <i className="ri-linkedin-fill text-xl" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}