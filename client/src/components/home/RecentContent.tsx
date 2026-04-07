"use client";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { EDITORIAL_TYPES, type EditorialType, formatDate, getEditorialUrlPrefix } from "@/lib/editorial-data";
import type { EditorialContent } from "@shared/schema";

export default function RecentContent() {
  const { data: articles = [], isLoading } = useQuery<EditorialContent[]>({
    queryKey: ["/api/editorial/recent"],
    queryFn: () => fetch("/api/editorial/recent?limit=6").then(r => r.json()),
  });

  if (isLoading || articles.length === 0) return null;

  return (
    <section className="py-12 sm:py-20 bg-slate-50" aria-label="Contenido reciente" data-testid="section-recent-content">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[#ad023b] font-semibold text-sm uppercase tracking-wider">Actualidad</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Contenido reciente
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Novedades, guías, comparativas y consejos sobre vehículos eléctricos e híbridos
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {articles.slice(0, 6).map(article => {
            const typeConfig = EDITORIAL_TYPES[article.type as EditorialType];
            const prefix = getEditorialUrlPrefix(article.type);
            if (!typeConfig) return null;

            return (
              <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 group" data-testid={`card-recent-${article.slug}`}>
                {article.featuredImage && (
                  <Link href={`${prefix}/${article.slug}`} className="block overflow-hidden cursor-pointer">
                    <img
                      src={article.featuredImage}
                      alt={article.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      width={400}
                      height={160}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80'; }}
                    />
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${typeConfig.lightColor} ${typeConfig.textColor} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>
                      {typeConfig.singular}
                    </span>
                    {article.publishedAt && (
                      <time dateTime={new Date(article.publishedAt).toISOString()} className="text-xs text-slate-500">
                        {formatDate(article.publishedAt)}
                      </time>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#ad023b] transition-colors line-clamp-2">
                    <Link href={`${prefix}/${article.slug}`} className="cursor-pointer" data-testid={`link-recent-${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>
                  {article.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2">{article.excerpt}</p>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {Object.entries(EDITORIAL_TYPES).map(([key, val]) => (
            <Link
              key={key}
              href={`/${val.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:border-[#ad023b] hover:text-[#ad023b] transition-colors cursor-pointer"
              data-testid={`link-section-${val.slug}`}
            >
              <i className={`${val.icon}`} aria-hidden="true"></i>
              {val.plural}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
