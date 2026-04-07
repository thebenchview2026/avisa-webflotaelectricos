"use client";
import { Link } from "@/lib/router";
import { Battery, Gauge, Zap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Vehicle, Brand } from "@shared/schema";
import { motion } from "framer-motion";

interface VehicleCardProps {
  vehicle: Vehicle;
  brand?: Brand;
  index?: number;
}

export default function VehicleCard({ vehicle, brand, index = 0 }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/vehiculo/${vehicle.slug}`} data-testid={`card-vehicle-${vehicle.id}`}>
        <div className="group cursor-pointer rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
          <div className="relative aspect-[16/10] overflow-hidden bg-muted">
            {vehicle.imageUrl ? (
              <img
                src={vehicle.imageUrl}
                alt={`${brand?.name || ""} ${vehicle.model}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                <Zap className="w-12 h-12 text-primary/30" />
              </div>
            )}
            {vehicle.featured && (
              <Badge className="absolute top-3 left-3 rounded-lg bg-primary/90 text-primary-foreground font-medium text-xs shadow-lg" data-testid={`badge-featured-${vehicle.id}`}>
                Destacado
              </Badge>
            )}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="rounded-lg bg-background/90 backdrop-blur-sm text-foreground font-semibold text-xs shadow-sm" data-testid={`badge-price-${vehicle.id}`}>
                {formatPrice(vehicle.price)}
              </Badge>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-3">
              {brand && (
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-1" data-testid={`text-brand-${vehicle.id}`}>
                  {brand.name}
                </p>
              )}
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-tight" data-testid={`text-model-${vehicle.id}`}>
                {vehicle.model}
              </h3>
              {vehicle.shortDescription && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2" data-testid={`text-desc-${vehicle.id}`}>
                  {vehicle.shortDescription}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Battery className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Autonomía</p>
                  <p className="text-sm font-semibold" data-testid={`text-range-${vehicle.id}`}>{vehicle.rangeKm} km</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Potencia</p>
                  <p className="text-sm font-semibold" data-testid={`text-power-${vehicle.id}`}>{vehicle.powerHp} CV</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Gauge className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">0-100 km/h</p>
                  <p className="text-sm font-semibold" data-testid={`text-accel-${vehicle.id}`}>{vehicle.acceleration ? `${vehicle.acceleration}s` : "—"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Plazas</p>
                  <p className="text-sm font-semibold" data-testid={`text-seats-${vehicle.id}`}>{vehicle.seats}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
