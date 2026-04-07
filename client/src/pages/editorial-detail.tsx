"use client";
import { Link } from "@/lib/router";
import { useQuery } from "@tanstack/react-query";
import { EDITORIAL_TYPES, type EditorialType, formatDate, formatDateISO, getEditorialUrlPrefix } from "@/lib/editorial-data";
import type { EditorialContent } from "@shared/schema";
import AutoInternalLinks from "@/components/AutoInternalLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface EditorialDetailProps {
  type: EditorialType;
  slug: string;
}

function ArticleJsonLd({ article, type }: { article: EditorialContent; type: EditorialType }) {
  const config = EDITORIAL_TYPES[type];
  const baseUrl = "https://electricos.grupoavisa.com";
  const url = `${baseUrl}/${config.slug}/${article.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt || "",
    url,
    datePublished: article.publishedAt ? formatDateISO(article.publishedAt) : formatDateISO(article.createdAt),
    dateModified: formatDateISO(article.updatedAt),
    author: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: article.author || "Grupo Avisa",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Grupo Avisa",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200&h=630&fit=crop&auto=format&q=80",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${url}#webpage` },
    isPartOf: { "@id": `${baseUrl}/#website` },
    inLanguage: "es",
    ...(article.featuredImage ? { image: { "@type": "ImageObject", url: article.featuredImage } } : {}),
    ...(article.tags && article.tags.length > 0 ? { keywords: article.tags.join(", ") } : {}),
    wordCount: article.content ? article.content.split(/\s+/).length : 0,
    articleSection: config.plural,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
        { "@type": "ListItem", position: 2, name: config.plural, item: `${baseUrl}/${config.slug}` },
        { "@type": "ListItem", position: 3, name: article.title },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function renderContent(content: string) {
  const paragraphs = content.split("\n\n").filter(Boolean);
  return paragraphs.map((p, i) => {
    if (p.startsWith("## ")) {
      return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{p.replace("## ", "")}</h2>;
    }
    if (p.startsWith("### ")) {
      return <h3 key={i} className="text-xl font-bold text-slate-900 mt-8 mb-3">{p.replace("### ", "")}</h3>;
    }
    if (p.startsWith("- ")) {
      const items = p.split("\n").filter(l => l.startsWith("- "));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 text-slate-700">
          {items.map((item, j) => (
            <li key={j}>{item.replace("- ", "")}</li>
          ))}
        </ul>
      );
    }
    if (p.startsWith("> ")) {
      return (
        <blockquote key={i} className="border-l-4 border-[#ad023b] bg-slate-50 pl-6 py-4 my-6 italic text-slate-700">
          {p.replace("> ", "")}
        </blockquote>
      );
    }
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = 0;
    let match;
    while ((match = boldRegex.exec(p)) !== null) {
      if (match.index > lastIndex) parts.push(p.slice(lastIndex, match.index));
      parts.push(<strong key={`b-${i}-${match.index}`}>{match[1]}</strong>);
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < p.length) parts.push(p.slice(lastIndex));
    return <p key={i} className="text-slate-700 leading-relaxed my-4">{parts}</p>;
  });
}

export default function EditorialDetail({ type, slug }: EditorialDetailProps) {
  const config = EDITORIAL_TYPES[type];
  const prefix = getEditorialUrlPrefix(type);

  const { data: article, isLoading, error } = useQuery<EditorialContent>({
    queryKey: ["/api/editorial", slug],
    queryFn: () => fetch(`/api/editorial/${slug}`).then(r => {
      if (!r.ok) throw new Error("Not found");
      return r.json();
    }),
  });

  const { data: related = [] } = useQuery<EditorialContent[]>({
    queryKey: ["/api/editorial", type, "related"],
    queryFn: () => fetch(`/api/editorial?type=${type}`).then(r => r.json()),
    enabled: !!article,
  });

  const relatedArticles = related.filter(a => a.slug !== slug).slice(0, 3);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white pt-20 sm:pt-[120px]">
          <div className="max-w-3xl mx-auto px-4 py-20 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/3 mb-8"></div>
            <div className="h-10 bg-slate-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-slate-200 rounded w-1/4 mb-12"></div>
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
              <div className="h-4 bg-slate-200 rounded w-4/6"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !article) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <i className="ri-article-line text-6xl text-slate-300 mb-4 block" aria-hidden="true"></i>
            <h1 className="text-2xl font-bold text-slate-900 mb-2" data-testid="text-not-found">Artículo no encontrado</h1>
            <p className="text-slate-600 mb-6">El contenido que buscas no está disponible.</p>
            <Link href={prefix} className="inline-flex items-center gap-2 bg-[#ad023b] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#8d0230] transition-colors cursor-pointer" data-testid="link-back">
              <i className="ri-arrow-left-line" aria-hidden="true"></i>
              Volver a {config.plural}
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const showUpdatedDate = article.updatedAt && article.publishedAt &&
    new Date(article.updatedAt).getTime() - new Date(article.publishedAt).getTime() > 86400000;

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-white pt-20 sm:pt-[120px]" data-testid={`page-article-${article.slug}`}>
      <ArticleJsonLd article={article} type={type} />

      <article itemScope itemType="https://schema.org/Article">
        <header className="bg-gradient-to-b from-slate-50 to-white pt-8 pb-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <nav aria-label="Migas de pan" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
                <li><Link href="/" className="hover:text-slate-900 transition-colors" data-testid="breadcrumb-home">Inicio</Link></li>
                <li><i className="ri-arrow-right-s-line" aria-hidden="true"></i></li>
                <li><Link href={prefix} className="hover:text-slate-900 transition-colors" data-testid="breadcrumb-hub">{config.plural}</Link></li>
                <li><i className="ri-arrow-right-s-line" aria-hidden="true"></i></li>
                <li className="text-slate-900 font-medium truncate max-w-[200px]">{article.title}</li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <span className={`${config.lightColor} ${config.textColor} text-xs font-semibold px-3 py-1 rounded-full`}>
                {config.singular}
              </span>
              {article.category && (
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full">
                  {article.category}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight" itemProp="headline" data-testid="text-title">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-slate-600 leading-relaxed mb-6" itemProp="description">
                {article.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 border-t border-b border-slate-200 py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ad023b] rounded-full flex items-center justify-center">
                  <i className="ri-user-line text-white text-sm" aria-hidden="true"></i>
                </div>
                <span itemProp="author" itemScope itemType="https://schema.org/Organization">
                  <span itemProp="name" className="font-medium text-slate-700">{article.author || "Grupo Avisa"}</span>
                </span>
              </div>
              {article.publishedAt && (
                <div className="flex items-center gap-1.5">
                  <i className="ri-calendar-line" aria-hidden="true"></i>
                  <time dateTime={formatDateISO(article.publishedAt)} itemProp="datePublished">
                    {formatDate(article.publishedAt)}
                  </time>
                </div>
              )}
              {showUpdatedDate && (
                <div className="flex items-center gap-1.5 text-green-600 font-medium">
                  <i className="ri-refresh-line" aria-hidden="true"></i>
                  <span>Actualizado: </span>
                  <time dateTime={formatDateISO(article.updatedAt)} itemProp="dateModified">
                    {formatDate(article.updatedAt)}
                  </time>
                </div>
              )}
              {article.readingTime && (
                <div className="flex items-center gap-1.5">
                  <i className="ri-time-line" aria-hidden="true"></i>
                  <span>{article.readingTime} min de lectura</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {article.featuredImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-4 mb-10">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-auto rounded-2xl shadow-lg"
              itemProp="image"
              width={960}
              height={540}
              loading="eager"
              decoding="async"
              onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80'; }}
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-16" itemProp="articleBody">
          <div className="prose prose-lg max-w-none">
            {renderContent(article.content)}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">Etiquetas</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-sm px-3 py-1.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="bg-slate-50 py-16" aria-label="Artículos relacionados">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              Más {config.plural.toLowerCase()}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map(rel => (
                <Link
                  key={rel.id}
                  href={`${prefix}/${rel.slug}`}
                  className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer group"
                  data-testid={`link-related-${rel.slug}`}
                >
                  {rel.featuredImage && (
                    <img
                      src={rel.featuredImage}
                      alt={rel.title}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300"
                      width={400}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&h=450&fit=crop&auto=format&q=80'; }}
                    />
                  )}
                  <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#ad023b] transition-colors line-clamp-2">
                    {rel.title}
                  </h3>
                  {rel.publishedAt && (
                    <time dateTime={formatDateISO(rel.publishedAt)} className="text-xs text-slate-500">
                      {formatDate(rel.publishedAt)}
                    </time>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-8" aria-label="Contenido relacionado">
        <AutoInternalLinks
          content={article.content + " " + (article.title || "") + " " + ((article.tags as string[]) || []).join(" ")}
          currentPath={`${prefix}/${slug}`}
          maxLinks={5}
          preferEntityTypes={["brand", "service", "concept"]}
          heading="Páginas relacionadas"
          excludePaths={[prefix]}
        />
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12" aria-label="Acciones">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={prefix}
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-back-hub"
          >
            <i className="ri-arrow-left-line" aria-hidden="true"></i>
            Todas las {config.plural.toLowerCase()}
          </Link>
          <Link
            href="/preguntas"
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-lg font-semibold border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap"
            data-testid="link-faq"
          >
            <i className="ri-question-line" aria-hidden="true"></i>
            Preguntas frecuentes
          </Link>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
