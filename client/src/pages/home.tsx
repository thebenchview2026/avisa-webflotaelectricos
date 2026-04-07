"use client";
import { useEffect } from "react";
import { useLocation } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { buildLocalBusinessWithReviewsJsonLd, buildBreadcrumbJsonLd } from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import VehicleSelector from "@/components/home/VehicleSelector";
import ElectricPromotions from "@/components/home/ElectricPromotions";
import HybridPromotions from "@/components/home/HybridPromotions";
import PostventaSection from "@/components/home/PostventaSection";
import PlanMovesSection from "@/components/home/PlanMovesSection";
import FAQSection from "@/components/home/FAQSection";
import DealerMapSection from "@/components/home/DealerMapSection";
import MyBusinessSection from "@/components/home/MyBusinessSection";
import CTASection from "@/components/home/CTASection";
import RecentContent from "@/components/home/RecentContent";
import ContactSection from "@/components/home/ContactSection";
import { TrustBar, WhyChooseUs, TestimonialsSection, LocalCoverage, SpecialistAreas } from "@/components/EEATSignals";
import { TRUST_METRICS } from "@/lib/entity-data";

const routeToSection: Record<string, string> = {
  "/promociones-electricos": "promociones-electricos",
  "/promociones-hibridos": "promociones-hibridos",
  "/autoplus": "plan-moves",
  "/postventa": "postventa",
  "/preguntas": "faqs",
  "/concesionarios": "concesionarios",
  "/electrificacion": "electricos",
  "/conductores-adopcion": "contacto",
};

export default function HomePage() {
  const [location] = useLocation();

  useEffect(() => {
    const sectionId = routeToSection[location];
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-home">
      <SEOHead
        title="Vehículos Eléctricos e Híbridos en Andalucía y Extremadura"
        description="Concesionario oficial líder en vehículos eléctricos e híbridos enchufables. Volkswagen, Audi, Škoda. Ofertas exclusivas, Plan MOVES y servicio postventa especializado en Sevilla."
        canonical="/"
        jsonLd={[
          buildLocalBusinessWithReviewsJsonLd(
            [
              { author: "María García", rating: 5, text: "Excelente atención y asesoramiento en la compra de nuestro ID.4. El equipo de Grupo Avisa nos ayudó en todo el proceso.", date: "2025-11-15" },
              { author: "Carlos Rodríguez", rating: 5, text: "Servicio postventa impecable. Los técnicos conocen perfectamente los vehículos eléctricos. Muy recomendable.", date: "2025-10-22" },
              { author: "Ana Martín", rating: 4, text: "Buena experiencia con el renting de nuestro Audi Q4 e-tron. Proceso ágil y condiciones competitivas.", date: "2025-09-30" },
              { author: "Pedro Sánchez López", rating: 5, text: "Cambié mi diésel por el ID.3 y la ayuda del equipo fue impecable. Me tramitaron las ayudas MOVES sin complicaciones. Muy recomendable.", date: "2025-08-18" }
            ],
            { ratingValue: TRUST_METRICS.ratingValue, reviewCount: TRUST_METRICS.reviewCount }
          ),
          buildBreadcrumbJsonLd([
            { name: "Inicio", url: "https://electricos.grupoavisa.com/" }
          ])
        ]}
      />
      <Navbar />
      <main role="main">
        <HeroSection />
        <TrustBar />
        <VehicleSelector />
        <ElectricPromotions />
        <HybridPromotions />
        <WhyChooseUs />
        <SpecialistAreas />
        <PostventaSection />
        <PlanMovesSection />
        <TestimonialsSection />
        <FAQSection />
        <DealerMapSection />
        <LocalCoverage />
        <MyBusinessSection />
        <RecentContent />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}