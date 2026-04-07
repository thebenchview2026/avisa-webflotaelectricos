import { CONTACT } from "@/lib/contact";

export default function CTASection() {
  return (
    <section id="test-drive" className="relative py-20 overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0">
        <img
          alt="Asesor profesional Grupo Avisa"
          className="w-full h-full object-cover object-center"
          src="https://images.unsplash.com/photo-1560179406-1f47a12c40e9?w=1920&h=600&fit=crop&auto=format&q=80"
          width={1920}
          height={600}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-cta-title">
          ¿Quieres probar un vehículo eléctrico?
        </h2>
        <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
          Reserva tu test drive gratuito y descubre la experiencia de conducción eléctrica. Sin compromiso.
        </p>

        <div className="flex items-center justify-center gap-4 mb-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-xl mx-auto">
          <img
            src="/ana-perez.png"
            alt="Ana - Asesora de vehículos eléctricos"
            className="w-14 h-14 rounded-full object-cover flex-shrink-0 border-2 border-white/30"
            width={56}
            height={56}
            loading="lazy"
            decoding="async"
          />
          <p className="text-sm text-white/90 text-left">
            <span className="font-semibold text-white">Te atenderá Ana</span>, con más de 10 años de experiencia en Avisa para darte un asesoramiento directo de alta calidad.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            className="whitespace-nowrap bg-[#ad023b] hover:bg-[#8d0230] text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer min-h-[56px] flex items-center justify-center"
            href="#contacto"
            data-testid="button-cta-test-drive"
          >
            Reservar test drive
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 min-h-[56px] justify-center"
            data-testid="button-cta-whatsapp"
          >
            <i className="ri-whatsapp-line text-xl"></i>
            Escríbeme
          </a>
        </div>

        <p className="text-white/70 text-sm mt-6">
          Sin compromiso · Asesoramiento personalizado · Prueba real en carretera
        </p>
      </div>
    </section>
  );
}