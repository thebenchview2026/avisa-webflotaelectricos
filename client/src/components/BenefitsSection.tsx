"use client";
import { Battery, Banknote, Leaf, Wrench, ShieldCheck, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: Leaf,
    title: "Cero emisiones",
    description: "Reduce tu huella de carbono con vehículos 100% eléctricos.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Banknote,
    title: "Ahorro en combustible",
    description: "Hasta un 70% menos en costes de energía frente a combustibles fósiles.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Wrench,
    title: "Menor mantenimiento",
    description: "Los motores eléctricos requieren un 40% menos de mantenimiento.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Incentivos fiscales",
    description: "Benefíciate de las ayudas y subvenciones para vehículos eléctricos.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: Battery,
    title: "Autonomía avanzada",
    description: "Modelos con hasta 700 km de autonomía para tu día a día.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingDown,
    title: "Valor residual",
    description: "Los eléctricos mantienen mejor su valor a lo largo del tiempo.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30" data-testid="benefits-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 mb-6">
            <span className="text-xs font-semibold text-primary tracking-wide uppercase">Ventajas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-benefits-title">
            ¿Por qué elegir eléctrico?
          </h2>
          <p className="text-lg text-muted-foreground">
            La movilidad eléctrica ofrece ventajas económicas, medioambientales y de rendimiento.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group p-6 rounded-2xl bg-card border border-border/60 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              data-testid={`card-benefit-${i}`}
            >
              <div className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
