import type { Metadata } from "next";
import VehiculoHibridoPage from "@/pages/vehiculo-hibrido";
import { generateMetadata as seoMeta, generateJsonLd, type SeoContext } from "@/lib/seo-engine";
import { BRAND_NAMES } from "@/lib/servicios-data";

const BASE_URL = "https://electricos.grupoavisa.com";

function extractBrandFromSlug(slug: string): { name: string; slug: string } {
  for (const [brandSlug, brandName] of Object.entries(BRAND_NAMES)) {
    if (slug.startsWith(brandSlug + "-")) return { name: brandName, slug: brandSlug };
  }
  const parts = slug.split("-");
  return { name: parts[0].charAt(0).toUpperCase() + parts[0].slice(1), slug: parts[0] };
}

const vehicleNames: Record<string, { brand: string; name: string; tagline: string; brandSlug: string }> = {
  "volkswagen-golf-gte": { brand: "Volkswagen", name: "Golf GTE", tagline: "Compacto híbrido enchufable · 245 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "volkswagen-tiguan-ehybrid": { brand: "Volkswagen", name: "Tiguan eHybrid", tagline: "SUV híbrido enchufable · 245 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "volkswagen-touareg-ehybrid": { brand: "Volkswagen", name: "Touareg eHybrid", tagline: "SUV premium híbrido · 381 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "audi-a3-tfsi-e": { brand: "Audi", name: "A3 TFSI e", tagline: "Sedán premium híbrido · 204 CV · Etiqueta CERO", brandSlug: "audi" },
  "audi-q3-tfsi-e": { brand: "Audi", name: "Q3 TFSI e", tagline: "SUV compacto híbrido · 245 CV · Etiqueta CERO", brandSlug: "audi" },
  "audi-q5-tfsi-e": { brand: "Audi", name: "Q5 TFSI e", tagline: "SUV premium híbrido · 299 CV · Etiqueta CERO", brandSlug: "audi" },
  "seat-leon-ehybrid": { brand: "SEAT", name: "León e-HYBRID", tagline: "Compacto híbrido enchufable · 204 CV · Etiqueta CERO", brandSlug: "seat" },
  "seat-leon-sportstourer-ehybrid": { brand: "SEAT", name: "León ST e-HYBRID", tagline: "Familiar híbrido enchufable · 204 CV · Etiqueta CERO", brandSlug: "seat" },
  "seat-tarraco-ehybrid": { brand: "SEAT", name: "Tarraco e-HYBRID", tagline: "SUV familiar híbrido · 245 CV · Etiqueta CERO", brandSlug: "seat" },
  "cupra-leon-ehybrid": { brand: "CUPRA", name: "León e-HYBRID", tagline: "Compacto deportivo híbrido · 245 CV · Etiqueta CERO", brandSlug: "cupra" },
  "cupra-formentor-ehybrid": { brand: "CUPRA", name: "Formentor e-HYBRID", tagline: "SUV Coupé híbrido · 245 CV · Etiqueta CERO", brandSlug: "cupra" },
  "cupra-formentor-vz-ehybrid": { brand: "CUPRA", name: "Formentor VZ e-HYBRID", tagline: "SUV Coupé deportivo híbrido · 245 CV · Etiqueta CERO", brandSlug: "cupra" },
  "skoda-octavia-iv": { brand: "Škoda", name: "Octavia iV", tagline: "Sedán híbrido enchufable · 204 CV · Etiqueta CERO", brandSlug: "skoda" },
  "skoda-octavia-combi-iv": { brand: "Škoda", name: "Octavia Combi iV", tagline: "Familiar híbrido enchufable · 204 CV · Etiqueta CERO", brandSlug: "skoda" },
  "skoda-superb-iv": { brand: "Škoda", name: "Superb iV", tagline: "Sedán premium híbrido · 218 CV · Etiqueta CERO", brandSlug: "skoda" },
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const known = Object.keys(vehicleNames).map((slug) => ({ slug }));
  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/vehicles`, { cache: "no-store" });
    if (res.ok) {
      const vehicles = await res.json();
      const dbSlugs = vehicles
        .filter((v: any) => v.slug && v.vehicleType === "hibrido")
        .map((v: any) => ({ slug: v.slug }));
      const allSlugs = new Map<string, true>();
      for (const s of [...known, ...dbSlugs]) allSlugs.set(s.slug, true);
      return Array.from(allSlugs.keys()).map((slug) => ({ slug }));
    }
  } catch { /* fall through */ }
  return known;
}

async function fetchVehicle(slug: string) {
  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/vehicles`, { cache: "no-store" });
    if (!res.ok) return null;
    const vehicles = await res.json();
    return vehicles.find((v: any) => v.slug === slug) || null;
  } catch { return null; }
}

function buildCtx(slug: string, v: { brand: string; name: string; tagline?: string; brandSlug: string }): SeoContext {
  return {
    pageType: "vehicle-hybrid",
    slug,
    brand: v.brandSlug,
    vehicle: { brand: v.brand, model: v.name, slug, tagline: v.tagline },
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const known = vehicleNames[slug];
  if (known) return seoMeta(buildCtx(slug, known));

  const vehicle = await fetchVehicle(slug);
  if (!vehicle) return { title: "Vehículo no encontrado | Grupo Avisa" };

  const brandFromSlug = extractBrandFromSlug(slug);
  const brand = vehicle.brand || brandFromSlug.name;
  return seoMeta(buildCtx(slug, { brand, name: vehicle.model, brandSlug: brandFromSlug.slug }));
}

function VehicleJsonLd({ slug }: { slug: string }) {
  const known = vehicleNames[slug];
  if (!known) return null;

  const ctx = buildCtx(slug, known);
  const schemas = generateJsonLd(ctx);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <>
      <VehicleJsonLd slug={slug} />
      <VehiculoHibridoPage />
    </>
  );
}
