import type { Metadata } from "next";
import EditorialDetail from "@/pages/editorial-detail";
import { generateMetadata as seoMeta, type SeoContext } from "@/lib/seo-engine";

async function fetchArticle(slug: string) {
  try {
    const port = process.env.PORT || "5000";
    const res = await fetch(`http://localhost:${port}/api/editorial/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) return { title: "Consejos | Grupo Avisa" };

  const ctx: SeoContext = {
    pageType: "editorial-detail",
    editorialType: "consejo",
    slug,
    article: {
      title: article.title,
      excerpt: article.excerpt,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      author: article.author,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      featuredImage: article.featuredImage,
      tags: article.tags,
    },
  };
  return seoMeta(ctx);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  return (
    <>
      {article && <h1 className="sr-only">{article.title}</h1>}
      <EditorialDetail type="consejo" slug={slug} />
    </>
  );
}
