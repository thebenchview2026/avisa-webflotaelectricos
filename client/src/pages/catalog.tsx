"use client";
import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@/lib/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import VehicleCard from "@/components/VehicleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { Vehicle, Brand } from "@shared/schema";

const bodyTypes = [
  { value: "all", label: "Todos" },
  { value: "SUV", label: "SUV" },
  { value: "Berlina", label: "Berlina" },
  { value: "Compacto", label: "Compacto" },
  { value: "Furgoneta", label: "Furgoneta" },
  { value: "Deportivo", label: "Deportivo" },
];

export default function CatalogPage() {
  const searchString = useSearch();
  const urlParams = new URLSearchParams(searchString);
  const brandFromUrl = urlParams.get("brand") || "all";

  const [search, setSearch] = useState("");
  const [bodyType, setBodyType] = useState("all");
  const [brandFilter, setBrandFilter] = useState(brandFromUrl);
  const [sortBy, setSortBy] = useState("featured");

  useEffect(() => {
    setBrandFilter(brandFromUrl);
  }, [brandFromUrl]);

  const { data: vehicles, isLoading: vehiclesLoading } = useQuery<Vehicle[]>({
    queryKey: ["/api/vehicles"],
  });

  const { data: brands } = useQuery<Brand[]>({
    queryKey: ["/api/brands"],
  });

  const brandsMap = brands?.reduce((acc, b) => {
    acc[b.id] = b;
    return acc;
  }, {} as Record<string, Brand>) || {};

  const filteredVehicles = useMemo(() => {
    if (!vehicles) return [];

    let result = [...vehicles];

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (v) =>
          v.model.toLowerCase().includes(s) ||
          brandsMap[v.brandId]?.name.toLowerCase().includes(s)
      );
    }

    if (bodyType !== "all") {
      result = result.filter((v) => v.bodyType === bodyType);
    }

    if (brandFilter !== "all") {
      result = result.filter((v) => v.brandId === brandFilter);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "range":
        result.sort((a, b) => b.rangeKm - a.rangeKm);
        break;
      case "power":
        result.sort((a, b) => b.powerHp - a.powerHp);
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [vehicles, search, bodyType, brandFilter, sortBy, brandsMap]);

  const activeFilters = [bodyType !== "all", brandFilter !== "all", search !== ""].filter(Boolean).length;

  const clearFilters = () => {
    setSearch("");
    setBodyType("all");
    setBrandFilter("all");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen flex flex-col pt-20 sm:pt-[120px]" data-testid="page-catalog">
      <SEOHead
        title="Catálogo de Vehículos Eléctricos e Híbridos"
        description="Explora nuestro catálogo completo de coches eléctricos e híbridos enchufables. Compara modelos, autonomía, precios y características. Grupo Avisa, concesionario oficial."
        canonical="/catalogo"
      />
      <Navbar />
      <main role="main">
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-16" aria-label="Catálogo de vehículos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight" data-testid="text-catalog-title">
                  Catálogo de vehículos
                </h1>
                <p className="text-muted-foreground mt-1">
                  {vehiclesLoading ? "Cargando..." : `${filteredVehicles.length} vehículos disponibles`}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-b border-border/50 sticky top-16 lg:top-20 z-40 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por marca o modelo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-xl h-11 bg-muted/50"
                data-testid="input-search"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Select value={bodyType} onValueChange={setBodyType}>
                <SelectTrigger className="w-[140px] rounded-xl h-11 bg-muted/50" data-testid="select-bodytype">
                  <SelectValue placeholder="Carrocería" />
                </SelectTrigger>
                <SelectContent>
                  {bodyTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={brandFilter} onValueChange={setBrandFilter}>
                <SelectTrigger className="w-[140px] rounded-xl h-11 bg-muted/50" data-testid="select-brand">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {brands?.map((b) => (
                    <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px] rounded-xl h-11 bg-muted/50" data-testid="select-sort">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-2" />
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Destacados</SelectItem>
                  <SelectItem value="price-asc">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-desc">Precio: mayor a menor</SelectItem>
                  <SelectItem value="range">Mayor autonomía</SelectItem>
                  <SelectItem value="power">Mayor potencia</SelectItem>
                </SelectContent>
              </Select>

              {activeFilters > 0 && (
                <Badge
                  variant="secondary"
                  className="rounded-lg cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={clearFilters}
                  data-testid="button-clear-filters"
                >
                  <X className="w-3 h-3 mr-1" />
                  Limpiar ({activeFilters})
                </Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {vehiclesLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border border-border/60 overflow-hidden">
                  <Skeleton className="aspect-[16/10]" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <Skeleton className="h-12" />
                      <Skeleton className="h-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredVehicles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2" data-testid="text-no-results">No se encontraron vehículos</h3>
              <p className="text-muted-foreground mb-6">Prueba a cambiar los filtros de búsqueda</p>
              <Badge
                variant="secondary"
                className="rounded-lg cursor-pointer"
                onClick={clearFilters}
                data-testid="button-clear-filters-empty"
              >
                Limpiar filtros
              </Badge>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle, i) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} brand={brandsMap[vehicle.brandId]} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
