export default function MyBusinessSection() {
  return (
    <section id="my-business" className="py-20 bg-gradient-to-b from-gray-50 to-white" data-testid="section-reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-reviews-title">
            Opiniones de nuestros clientes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { name: "María González", role: "Cliente Tesla Model 3", text: "Excelente atención desde el primer momento. Me asesoraron perfectamente sobre qué modelo eléctrico se adaptaba mejor a mis necesidades. El proceso de compra fue muy transparente y me gestionaron todas las ayudas del Plan MOVES." },
            { name: "Carlos Ruiz", role: "Cliente Kia Sportage PHEV", text: "Llevé mi híbrido enchufable a revisión y el servicio fue impecable. Los técnicos están muy bien formados en vehículos eléctricos. Me explicaron todo detalladamente y el precio fue muy ajustado. Totalmente recomendable." },
            { name: "Ana Martínez", role: "Cliente Volkswagen ID.4", text: "Dudaba en dar el paso al eléctrico pero el equipo de Grupo Avisa me resolvió todas las dudas. Hice un test drive y quedé convencido. Ahora ahorro más de 150€ al mes en combustible. ¡Debería haberlo hecho antes!" },
          ].map((review, i) => (
            <div key={i} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100" data-testid={`card-review-${i}`}>
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i key={star} className="ri-star-fill text-yellow-400 text-xl"></i>
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-2xl text-gray-500"></i>
                </div>
                <div>
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-600">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#ad023b] to-[#8d0230] rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Valoración global de nuestros clientes</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl font-bold">4.8</div>
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i key={star} className="ri-star-fill text-yellow-300 text-2xl"></i>
                    ))}
                  </div>
                  <p className="text-white/90">Basado en 847 reseñas</p>
                </div>
              </div>
              <p className="text-white/90 text-lg">
                Más del 95% de nuestros clientes nos recomendarían a familiares y amigos
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Atención al cliente", score: "4.9/5", width: "98%" },
                { label: "Calidad del servicio", score: "4.8/5", width: "96%" },
                { label: "Relación calidad-precio", score: "4.7/5", width: "94%" },
                { label: "Instalaciones", score: "4.9/5", width: "98%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90">{item.label}</span>
                    <span className="font-bold">{item.score}</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-yellow-300 h-2 rounded-full" style={{ width: item.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">¿Quieres ver más opiniones?</p>
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#ad023b] font-bold hover:gap-4 transition-all cursor-pointer"
            data-testid="link-google-reviews"
          >
            Ver todas las reseñas en Google
            <i className="ri-arrow-right-line text-xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
}