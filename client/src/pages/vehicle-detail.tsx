"use client";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead, { buildVehicleJsonLd, buildBreadcrumbJsonLd } from "@/components/SEOHead";
import ContactForm from "@/components/ContactForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Battery, Zap, Gauge, Users, Car, Weight, ArrowLeft,
  Fuel, Timer, Package, ArrowUpDown, ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import type { Vehicle, Brand } from "@shared/schema";

export default function VehicleDetailPage() {
  const [, params] = useRoute("/vehiculo/:slug");
  const slug = params?.slug;

  const { data: vehicle, isLoading } = useQuery<Vehicle>({
    queryKey: ["/api/vehicles", slug],
    enabled: !!slug,
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const brand = brands?.find((b) => b.id === vehicle?.brandId);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
          <Skeleton className="h-6 w-40 mb-8" />
          <div className="grid lg:grid-cols-2 gap-10">
            <Skeleton className="aspect-[4/3] rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-64" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]">
        <Navbar />
        <main role="main" className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Vehículo no encontrado</h2>
            <p className="text-muted-foreground mb-6">El vehículo que buscas no existe o ya no está disponible.</p>
            <Link href="/catalogo">
              <Button className="rounded-xl" data-testid="button-back-catalog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const specs = [
    { icon: Battery, label: "Autonomía", value: `${vehicle.rangeKm} km`, accent: true },
    { icon: Zap, label: "Potencia", value: `${vehicle.powerHp} CV` },
    { icon: Fuel, label: "Batería", value: `${vehicle.batteryKwh} kWh` },
    { icon: Gauge, label: "0-100 km/h", value: vehicle.acceleration ? `${vehicle.acceleration} s` : "—" },
    { icon: ArrowUpDown, label: "Vel. máxima", value: vehicle.topSpeed ? `${vehicle.topSpeed} km/h` : "—" },
    { icon: Users, label: "Plazas", value: `${vehicle.seats}` },
    { icon: Car, label: "Tracción", value: vehicle.drivetrain || "—" },
    { icon: Timer, label: "Carga rápida", value: vehicle.chargingTimeFast || "—" },
    { icon: Timer, label: "Carga lenta", value: vehicle.chargingTimeSlow || "—" },
    { icon: Package, label: "Maletero", value: vehicle.trunkLiters ? `${vehicle.trunkLiters} L` : "—" },
    { icon: Weight, label: "Peso", value: vehicle.weight ? `${vehicle.weight} kg` : "—" },
    { icon: Car, label: "Carrocería", value: vehicle.bodyType },
  ];

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-vehicle-detail">
      {vehicle && brand && (
        <SEOHead
          title={`${brand.name} ${vehicle.name} - Vehículo ${vehicle.type === 'electrico' ? 'Eléctrico' : 'Híbrido'}`}
          description={vehicle.metaDescription || `${brand.name} ${vehicle.name}: descubre sus características, autonomía, precio y promociones en Grupo Avisa. Prueba de conducción gratuita.`}
          canonical={`/vehiculos/${vehicle.type === 'electrico' ? 'electricos' : 'hibridos'}/${vehicle.slug}`}
          ogType="product"
          jsonLd={[
            buildVehicleJsonLd({
              name: `${brand.name} ${vehicle.name}`,
              brand: brand.name,
              price: vehicle.price ?? undefined,
              imageUrl: vehicle.imageUrl ?? undefined,
              description: vehicle.metaDescription ?? undefined,
              slug: vehicle.slug,
              type: vehicle.type ?? 'electrico',
            }),
            buildBreadcrumbJsonLd([
              { name: 'Inicio', url: 'https://electricos.grupoavisa.com/' },
              { name: vehicle.type === 'electrico' ? 'Eléctricos' : 'Híbridos', url: `https://electricos.grupoavisa.com/promociones-${vehicle.type === 'electrico' ? 'electricos' : 'hibridos'}` },
              { name: `${brand.name} ${vehicle.name}`, url: `https://electricos.grupoavisa.com/vehiculos/${vehicle.type === 'electrico' ? 'electricos' : 'hibridos'}/${vehicle.slug}` },
            ]),
          ]}
        />
      )}
      <Navbar />

      <div className="bg-muted/30 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Migas de pan" data-testid="breadcrumb">
            <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/catalogo" className="hover:text-foreground transition-colors">Catálogo</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{brand?.name} {vehicle.model}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 py-10 lg:py-16" role="main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-6">
                  {vehicle.imageUrl ? (
                    <img
                      src={vehicle.imageUrl}
                      alt={`${brand?.name || ""} ${vehicle.model}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                      <Zap className="w-20 h-20 text-primary/20" />
                    </div>
                  )}
                  {vehicle.featured && (
                    <Badge className="absolute top-4 left-4 rounded-lg bg-primary/90 text-primary-foreground font-medium shadow-lg">
                      Destacado
                    </Badge>
                  )}
                </div>

                {vehicle.galleryUrls && vehicle.galleryUrls.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mb-8">
                    {vehicle.galleryUrls.map((url, i) => (
                      <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden bg-muted cursor-pointer hover:ring-2 hover:ring-primary/50 transition-all">
                        <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-2">
                    {brand && (
                      <Badge variant="secondary" className="rounded-lg text-xs font-medium" data-testid="badge-brand">
                        {brand.name}
                      </Badge>
                    )}
                    <Badge variant="outline" className="rounded-lg text-xs">{vehicle.year}</Badge>
                    <Badge variant="outline" className="rounded-lg text-xs">{vehicle.bodyType}</Badge>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2" data-testid="text-vehicle-title">
                    {brand?.name} {vehicle.model}
                  </h1>
                  <p className="text-3xl font-bold text-primary" data-testid="text-vehicle-price">
                    {formatPrice(vehicle.price)}
                  </p>
                </div>

                {vehicle.description && (
                  <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-3">Descripción</h2>
                    <p className="text-muted-foreground leading-relaxed" data-testid="text-vehicle-description">
                      {vehicle.description}
                    </p>
                  </div>
                )}

                <Separator className="mb-10" />

                <div>
                  <h2 className="text-lg font-semibold mb-6">Especificaciones técnicas</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {specs.map((spec, i) => (
                      <motion.div
                        key={spec.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className={`p-4 rounded-xl border border-border/60 ${spec.accent ? "bg-primary/5 border-primary/20" : "bg-card"}`}
                        data-testid={`spec-${spec.label.toLowerCase().replace(/[\s\/]/g, '-')}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <spec.icon className={`w-4 h-4 ${spec.accent ? "text-primary" : "text-muted-foreground"}`} />
                          <span className="text-xs text-muted-foreground">{spec.label}</span>
                        </div>
                        <p className={`text-base font-bold ${spec.accent ? "text-primary" : ""}`}>{spec.value}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="sticky top-28"
              >
                <div className="rounded-2xl border border-border/60 bg-card p-6 lg:p-8">
                  <h2 className="text-xl font-bold mb-2">¿Te interesa este vehículo?</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Rellena el formulario y te contactaremos con un presupuesto personalizado.
                  </p>
                  <ContactForm vehicleId={vehicle.id} vehicleName={`${brand?.name || ""} ${vehicle.model}`} />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
