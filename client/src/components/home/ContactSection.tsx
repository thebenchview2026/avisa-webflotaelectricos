"use client";
import { useState, FormEvent } from "react";
import { CONTACT } from "@/lib/contact";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    interes: "",
    mensaje: "",
  });
  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (charCount > 500 || !acceptTerms) return;
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          phone: formData.telefono,
          interest: formData.interes,
          message: formData.mensaje,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ nombre: "", email: "", telefono: "", interes: "", mensaje: "" });
        setCharCount(0);
        setAcceptTerms(false);
        setAcceptMarketing(false);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setFormData({ ...formData, mensaje: value });
      setCharCount(value.length);
    }
  };

  return (
    <section id="contacto" className="relative py-24 overflow-hidden" data-testid="section-contact">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1560179406-1f47a12c40e9?w=1920&h=1080&fit=crop&auto=format&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-white/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ad023b]/10 rounded-full mb-6">
              <i className="ri-mail-line text-[#ad023b]"></i>
              <span className="text-sm font-medium text-[#ad023b]">Contacta con nosotros</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6" data-testid="text-contact-title">
              ¿Listo para pasarte al eléctrico?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Nuestro equipo de expertos está preparado para ayudarte a encontrar el vehículo eléctrico perfecto para ti. Solicita información sin compromiso.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                  <i className="ri-phone-line text-xl text-[#ad023b]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Teléfono</h3>
                  <a href={`tel:${CONTACT.phone}`} className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#8d0230] transition-colors" data-testid="link-contact-phone">
                    <i className="ri-phone-line"></i> Llámame
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                  <i className="ri-mail-line text-xl text-[#ad023b]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a href={`mailto:${CONTACT.email}`} className="text-slate-600 hover:text-[#ad023b] transition-colors" data-testid="link-contact-email">
                    {CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                  <i className="ri-map-pin-line text-xl text-[#ad023b]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Ubicación</h3>
                  <p className="text-slate-600">Sevilla, Andalucía, España</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ad023b]/10 rounded-lg flex-shrink-0">
                  <i className="ri-time-line text-xl text-[#ad023b]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Horario</h3>
                  <p className="text-slate-600">Lunes a Viernes: 9:00 - 20:00<br />Sábados: 10:00 - 14:00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#ad023b]/5 rounded-xl border border-[#ad023b]/10">
              <div className="flex items-start gap-3">
                <i className="ri-shield-check-line text-2xl text-[#ad023b] flex-shrink-0 mt-1"></i>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Compromiso de privacidad</h4>
                  <p className="text-sm text-slate-600">
                    Tus datos están seguros con nosotros. Solo los utilizaremos para contactarte sobre tu consulta de vehículos eléctricos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-start gap-4 mb-6 p-4 bg-[#ad023b]/5 rounded-xl border border-[#ad023b]/10">
              <img
                src="/ana-perez.png"
                alt="Ana - Asesora de vehículos eléctricos"
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">La persona que te va a atender es Ana</span>, lleva más de 10 años como profesional de flotas en Avisa y de forma rápida tendrás un asesoramiento directo de alta calidad.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-contact">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-slate-900 mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all"
                  placeholder="Juan Pérez"
                  data-testid="input-nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all"
                  placeholder="juan@email.com"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-slate-900 mb-2">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all"
                  placeholder="+34 600 000 000"
                  data-testid="input-telefono"
                />
              </div>

              <div>
                <label htmlFor="interes" className="block text-sm font-medium text-slate-900 mb-2">
                  Estoy interesado en
                </label>
                <select
                  id="interes"
                  name="interes"
                  value={formData.interes}
                  onChange={(e) => setFormData({ ...formData, interes: e.target.value })}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all cursor-pointer pr-8"
                  data-testid="select-interes"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="electrico">Vehículo 100% eléctrico</option>
                  <option value="hibrido">Híbrido enchufable</option>
                  <option value="test-drive">Reservar test drive</option>
                  <option value="plan-moves">Información Plan MOVES</option>
                  <option value="postventa">Servicio postventa</option>
                  <option value="financiacion">Opciones de financiación</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-slate-900 mb-2">
                  Mensaje <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  maxLength={500}
                  rows={4}
                  value={formData.mensaje}
                  onChange={handleMessageChange}
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#ad023b] focus:border-transparent transition-all resize-none"
                  placeholder="Cuéntanos qué necesitas..."
                  data-testid="textarea-mensaje"
                ></textarea>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-slate-500">{charCount}/500 caracteres</p>
                  {charCount > 500 && (
                    <p className="text-xs text-red-500">Has superado el límite de caracteres</p>
                  )}
                </div>
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4" data-testid="text-submit-success">
                  <p className="text-sm text-green-800 flex items-center gap-2">
                    <i className="ri-check-line text-lg"></i>
                    ¡Mensaje enviado correctamente! Te contactaremos pronto.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4" data-testid="text-submit-error">
                  <p className="text-sm text-red-800 flex items-center gap-2">
                    <i className="ri-error-warning-line text-lg"></i>
                    Error al enviar el mensaje. Por favor, inténtalo de nuevo.
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#ad023b] border-slate-300 rounded focus:ring-[#ad023b] cursor-pointer"
                    required
                    data-testid="checkbox-terms"
                  />
                  <span className="text-sm text-slate-600">
                    He leído y acepto los términos y condiciones de la política de privacidad.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptMarketing}
                    onChange={(e) => setAcceptMarketing(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#ad023b] border-slate-300 rounded focus:ring-[#ad023b] cursor-pointer"
                    data-testid="checkbox-marketing"
                  />
                  <span className="text-sm text-slate-600">
                    Doy mi consentimiento para el tratamiento de mis datos personales con fines de marketing y comerciales (Opcional)
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || charCount > 500 || !acceptTerms}
                className="w-full px-6 py-4 bg-[#ad023b] text-white font-semibold rounded-lg hover:bg-[#8d0230] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer min-h-[56px]"
                data-testid="button-submit-contact"
              >
                {isSubmitting ? "Enviando..." : "Enviar consulta"}
                <i className="ri-send-plane-line"></i>
              </button>

              <p className="text-xs text-slate-500 text-center">
                Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}