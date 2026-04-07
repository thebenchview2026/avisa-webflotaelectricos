import { createClient } from "@supabase/supabase-js";

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export interface EditorialRow {
  id: string;
  type: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  featured_image: string | null;
  published: boolean | null;
  published_at: string | null;
  updated_at: string | null;
  created_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  reading_time: number | null;
  related_slugs: string[] | null;
  related_vehicle_type: string | null;
}

export async function fetchEditorialByType(type: string): Promise<EditorialRow[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from("editorial_content")
      .select("*")
      .eq("type", type)
      .eq("published", true)
      .order("published_at", { ascending: false });
    if (error) {
      console.error(`[supabase-editorial] Error fetching ${type}:`, error.message);
      return [];
    }
    return (data as EditorialRow[]) || [];
  } catch (err) {
    console.error(`[supabase-editorial] Exception:`, err);
    return [];
  }
}

export function mapRowToEditorialContent(row: EditorialRow) {
  return {
    id: row.id,
    type: row.type,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt ?? null,
    content: row.content,
    category: row.category ?? null,
    tags: row.tags ?? null,
    author: row.author ?? null,
    featuredImage: row.featured_image ?? null,
    published: row.published ?? false,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    metaTitle: row.meta_title ?? null,
    metaDescription: row.meta_description ?? null,
    readingTime: row.reading_time ?? 5,
    relatedSlugs: row.related_slugs ?? null,
    relatedVehicleType: row.related_vehicle_type ?? null,
  };
}
