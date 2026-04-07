import type { Metadata } from "next";
import VehiculoElectricoPage from "@/pages/vehiculo-electrico";
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
  "volkswagen-id3-pro": { brand: "Volkswagen", name: "ID.3 Pro", tagline: "Compacto eléctrico · 204 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "volkswagen-id4-pro": { brand: "Volkswagen", name: "ID.4 Pro", tagline: "SUV eléctrico · 204 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "volkswagen-id5-gtx": { brand: "Volkswagen", name: "ID.5 GTX", tagline: "SUV Coupé eléctrico · 299 CV · Etiqueta CERO", brandSlug: "volkswagen" },
  "audi-q4-etron-45": { brand: "Audi", name: "Q4 e-tron 45", tagline: "SUV premium eléctrico · 286 CV · Etiqueta CERO", brandSlug: "audi" },
  "audi-etron-gt-quattro": { brand: "Audi", name: "e-tron GT quattro", tagline: "Gran Turismo eléctrico · 476 CV · Etiqueta CERO", brandSlug: "audi" },
  "audi-q8-etron-55": { brand: "Audi", name: "Q8 e-tron 55", tagline: "SUV de lujo eléctrico · 408 CV · Etiqueta CERO", brandSlug: "audi" },
  "cupra-born-eboost": { brand: "CUPRA", name: "Born e-Boost", tagline: "Compacto deportivo eléctrico · 231 CV · Etiqueta CERO", brandSlug: "cupra" },
  "cupra-tavascan-vz": { brand: "CUPRA", name: "Tavascan VZ", tagline: "SUV Coupé eléctrico · 340 CV · Etiqueta CERO", brandSlug: "cupra" },
  "cupra-born-vz": { brand: "CUPRA", name: "Born VZ", tagline: "Compacto deportivo eléctrico · 326 CV · Etiqueta CERO", brandSlug: "cupra" },
  "skoda-enyaq-iv-80": { brand: "Škoda", name: "Enyaq iV 80", tagline: "SUV eléctrico familiar · 204 CV · Etiqueta CERO", brandSlug: "skoda" },
  "skoda-enyaq-coupe-rs": { brand: "Škoda", name: "Enyaq Coupé RS", tagline: "SUV Coupé eléctrico · 299 CV · Etiqueta CERO", brandSlug: "skoda" },
  "skoda-enyaq-iv-60": { brand: "Škoda", name: "Enyaq iV 60", tagline: "SUV eléctrico accesible · 180 CV · Etiqueta CERO", brandSlug: "skoda" },
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const known = Object.keys(vehicleNames).map((slug) => ({ slug }));
  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/vehicles`, { cache: "no-store" });
    if (res.ok) {
      const vehicles = await res.json();
      const dbSlugs = vehicles
        .filter((v: any) => v.slug && v.vehicleType !== "hibrido")
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
    pageType: "vehicle-electric",
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
  const brandSlug = (vehicle.brand || brandFromSlug.name).toLowerCase().replace(/\s+/g, "-");
  return seoMeta(buildCtx(slug, { brand, name: vehicle.model, brandSlug: brandFromSlug.slug || brandSlug }));
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
      <VehiculoElectricoPage />
    </>
  );
}
