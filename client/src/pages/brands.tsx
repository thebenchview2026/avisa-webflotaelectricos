"use client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Brand, Vehicle } from "@shared/schema";

export default function BrandsPage() {
  const { data: brands, isLoading } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const { data: vehicles } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const vehicleCountByBrand = vehicles?.reduce((acc, v) => {
    acc[v.brandId] = (acc[v.brandId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-brands">
      <SEOHead
        title="Marcas de Vehículos Eléctricos e Híbridos"
        description="Descubre todas las marcas de vehículos eléctricos e híbridos disponibles en Grupo Avisa: Volkswagen, Audi, Škoda y más. Concesionario oficial en Andalucía y Extremadura."
        canonical="/marcas"
      />
      <Navbar />
      <main role="main">
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16" aria-label="Marcas disponibles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-brands-page-title">
                  Marcas
                </h1>
                <p className="text-muted-foreground mt-1">
                  Las mejores marcas de vehículos eléctricos del mundo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="flex-1 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : brands && brands.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {brands.map((brand, i) => (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link href={`/catalogo?brand=${brand.id}`}>
                    <div className="group cursor-pointer rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300" data-testid={`card-brand-page-${brand.id}`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/8 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">
                            {brand.name.charAt(0)}
                          </span>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors mb-1" data-testid={`text-brand-page-name-${brand.id}`}>
                        {brand.name}
                      </h3>
                      {brand.country && (
                        <p className="text-sm text-muted-foreground mb-3">{brand.country}</p>
                      )}
                      {brand.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{brand.description}</p>
                      )}
                      <Badge variant="secondary" className="rounded-lg text-xs">
                        {vehicleCountByBrand[brand.id] || 0} modelos
                      </Badge>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No hay marcas disponibles</h3>
              <p className="text-muted-foreground">Las marcas se cargarán próximamente.</p>
            </div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
