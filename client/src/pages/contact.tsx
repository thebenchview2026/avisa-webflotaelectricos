"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Phone,
    title: "Teléfono",
    value: "900 000 000",
    subtitle: "Lun - Vie, 9:00 - 19:00",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@avisaflota.es",
    subtitle: "Respuesta en 24h",
  },
  {
    icon: MapPin,
    title: "Dirección",
    value: "Madrid, España",
    subtitle: "Visita con cita previa",
  },
  {
    icon: Clock,
    title: "Horario",
    value: "Lun - Vie: 9:00 - 19:00",
    subtitle: "Sábados: 10:00 - 14:00",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-contact">
      <SEOHead
        title="Contacto"
        description="Contacta con Grupo Avisa para más información sobre vehículos eléctricos e híbridos. Llámanos al 955 034 600 o escríbenos. Atención personalizada en Andalucía y Extremadura."
        canonical="/contacto"
      />
      <Navbar />
      <main role="main">
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16" aria-label="Formulario de contacto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" data-testid="text-contact-title">
              Contacto
            </h1>
            <p className="text-lg text-muted-foreground">
              ¿Tienes preguntas? Estamos aquí para ayudarte a encontrar el vehículo eléctrico perfecto.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="flex-1 py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-8">
                <h2 className="text-xl font-bold mb-2">Envíanos un mensaje</h2>
                <p className="text-sm text-muted-foreground mb-8">
                  Completa el formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.08 }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card"
                    data-testid={`card-contact-info-${i}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{info.title}</p>
                      <p className="font-semibold">{info.value}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{info.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-primary/5 border border-primary/15">
                <h3 className="font-semibold mb-2">¿Necesitas ayuda urgente?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Llámanos directamente y te atenderemos al momento.
                </p>
                <a
                  href="tel:+34900000000"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  data-testid="link-call-urgent"
                >
                  <Phone className="w-4 h-4" />
                  900 000 000
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
