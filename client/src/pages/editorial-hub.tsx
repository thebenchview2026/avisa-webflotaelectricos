"use client";
import { useState } from "react";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { EDITORIAL_TYPES, type EditorialType, formatDate, getEditorialUrlPrefix } from "@/lib/editorial-data";
import type { EditorialContent } from "@shared/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface EditorialHubProps {
  type: EditorialType;
  initialData?: EditorialContent[];
}

function ArticleList({ type, initialData }: { type: EditorialType; initialData: EditorialContent[] }) {
  const config = EDITORIAL_TYPES[type];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const prefix = getEditorialUrlPrefix(type);
  const allTags = Array.from(new Set(initialData.flatMap(a => a.tags || [])));
  const filtered = selectedTag ? initialData.filter(a => a.tags?.includes(selectedTag)) : initialData;

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrar por etiqueta">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${!selectedTag ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            data-testid="filter-all"
          >
            Todos
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${tag === selectedTag ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              data-testid={`filter-tag-${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(article => (
          <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 group" data-testid={`card-article-${article.slug}`}>
            {article.featuredImage && (
              <Link href={`${prefix}/${article.slug}`} className="block overflow-hidden cursor-pointer">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={192}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80'; }}
                />
              </Link>
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`${config.lightColor} ${config.textColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {config.singular}
                </span>
                {article.publishedAt && (
                  <time dateTime={new Date(article.publishedAt).toISOString()} className="text-xs text-slate-500">
                    {formatDate(article.publishedAt)}
                  </time>
                )}
                {article.readingTime && (
                  <span className="text-xs text-slate-400">
                    <i className="ri-time-line mr-1" aria-hidden="true"></i>{article.readingTime} min
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#ad023b] transition-colors">
                <Link href={`${prefix}/${article.slug}`} className="cursor-pointer" data-testid={`link-article-${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              {article.excerpt && (
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function ArticleListDynamic({ type }: { type: EditorialType }) {
  const config = EDITORIAL_TYPES[type];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const prefix = getEditorialUrlPrefix(type);

  const { data: articles = [], isLoading } = useQuery<EditorialContent[]>({
    queryKey: ["/api/editorial", type],
    queryFn: () => fetch(`/api/editorial?type=${type}`).then(r => r.json()),
  });

  const allTags = Array.from(new Set(articles.flatMap(a => a.tags || [])));
  const filtered = selectedTag ? articles.filter(a => a.tags?.includes(selectedTag)) : articles;

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl p-6 animate-pulse border border-slate-200">
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <i className={`${config.icon} text-6xl text-slate-300 mb-4 block`} aria-hidden="true"></i>
        <h2 className="text-xl font-bold text-slate-700 mb-2">No hay {config.plural.toLowerCase()} publicadas</h2>
        <p className="text-slate-500">Pronto publicaremos contenido nuevo. ¡Vuelve a visitarnos!</p>
      </div>
    );
  }

  return (
    <>
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filtrar por etiqueta">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${!selectedTag ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            data-testid="filter-all"
          >
            Todos
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${tag === selectedTag ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              data-testid={`filter-tag-${tag}`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(article => (
          <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-200 group" data-testid={`card-article-${article.slug}`}>
            {article.featuredImage && (
              <Link href={`${prefix}/${article.slug}`} className="block overflow-hidden cursor-pointer">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  width={600}
                  height={192}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80'; }}
                />
              </Link>
            )}
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`${config.lightColor} ${config.textColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                  {config.singular}
                </span>
                {article.publishedAt && (
                  <time dateTime={new Date(article.publishedAt).toISOString()} className="text-xs text-slate-500">
                    {formatDate(article.publishedAt)}
                  </time>
                )}
                {article.readingTime && (
                  <span className="text-xs text-slate-400">
                    <i className="ri-time-line mr-1" aria-hidden="true"></i>{article.readingTime} min
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#ad023b] transition-colors">
                <Link href={`${prefix}/${article.slug}`} className="cursor-pointer" data-testid={`link-article-${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              {article.excerpt && (
                <p className="text-slate-600 text-sm line-clamp-3 mb-4">{article.excerpt}</p>
              )}
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default function EditorialHub({ type, initialData }: EditorialHubProps) {
  const config = EDITORIAL_TYPES[type];
  const hasStaticData = initialData && initialData.length > 0;
  const articleCount = hasStaticData ? initialData.length : 0;

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-slate-50 pt-20 sm:pt-[120px]" data-testid={`page-${config.slug}`}>
      <section className={`relative py-16 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden`} aria-label={config.plural}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors" data-testid="breadcrumb-home">Inicio</Link></li>
              <li><i className="ri-arrow-right-s-line" aria-hidden="true"></i></li>
              <li className="text-white font-medium">{config.plural}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-14 h-14 ${config.color} rounded-2xl flex items-center justify-center`}>
              <i className={`${config.icon} text-2xl text-white`} aria-hidden="true"></i>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white" data-testid="text-title">
                {config.plural}
              </h1>
              <p className="text-white/60 text-sm mt-1">{articleCount} artículos publicados</p>
            </div>
          </div>
          <p className="text-white/80 max-w-2xl text-lg">{config.description}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12" aria-label="Listado de artículos">
        {hasStaticData ? (
          <ArticleList type={type} initialData={initialData} />
        ) : (
          <ArticleListDynamic type={type} />
        )}
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16" aria-label="Explora más contenido">
        <div className="bg-white rounded-2xl border border-slate-200 p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 text-center">Explora más contenido</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(EDITORIAL_TYPES).map(([key, val]) => (
              <Link
                key={key}
                href={`/${val.slug}`}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${key === type ? 'border-slate-900 bg-slate-50' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                data-testid={`link-editorial-${val.slug}`}
              >
                <div className={`w-10 h-10 ${val.color} rounded-lg flex items-center justify-center`}>
                  <i className={`${val.icon} text-white`} aria-hidden="true"></i>
                </div>
                <div>
                  <span className="font-semibold text-slate-900 text-sm block">{val.plural}</span>
                  <span className="text-xs text-slate-500">{key === type ? "Estás aquí" : "Ver todos"}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
