import { CONTACT } from "@/lib/contact";

export default function HeroSection() {
  return (
    <section className="relative min-h-[520px] sm:min-h-[580px] flex items-center justify-center overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0">
        <div className="relative overflow-hidden w-full h-full">
          <img
            alt="Vehículo eléctrico moderno en carretera sostenible"
            title="Movilidad eléctrica del futuro"
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1440&h=580&fit=crop&auto=format&q=80"
            srcSet="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=640&h=420&fit=crop&auto=format&q=75 640w, https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1024&h=580&fit=crop&auto=format&q=80 1024w, https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1440&h=580&fit=crop&auto=format&q=80 1440w"
            sizes="(max-width: 768px) 640px, (max-width: 1280px) 1024px, 1440px"
            width={1440}
            height={580}
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-12">
        <div className="space-y-4 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight" data-testid="text-hero-title">
            El futuro es eléctrico<br />¿Estás preparado?
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light px-2 sm:px-0" data-testid="text-hero-subtitle">
            Descubre la gama más completa de vehículos eléctricos e híbridos. Ahorro real, tecnología y asistencia personalizada.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2 sm:pt-4">
            <a
              className="w-full sm:w-auto whitespace-nowrap bg-[#ad023b] hover:bg-[#8d0230] text-white px-8 py-4 sm:py-3 rounded-xl font-bold text-base sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
              href="#promociones-electricos"
              data-testid="button-hero-promociones"
            >
              <i className="ri-car-line mr-2 text-lg" aria-hidden="true"></i>
              Ver promociones
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto whitespace-nowrap bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 sm:py-3 rounded-xl font-bold text-base sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              data-testid="button-hero-whatsapp"
            >
              <i className="ri-whatsapp-line text-lg"></i>
              Escríbeme ahora
            </a>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="cursor-pointer" data-testid="link-hero-whatsapp-avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                <img
                  alt="Ana — Asesora Grupo Avisa"
                  className="w-full h-full object-cover object-top"
                  src="/ana-perez.png"
                  width={40}
                  height={40}
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </a>
            <p className="text-white/80 text-xs sm:text-sm">
              <span className="font-semibold text-white">Ana</span> · Experta en movilidad eléctrica
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}