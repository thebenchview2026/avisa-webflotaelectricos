"use client";

const BASE_URL = "https://electricos.grupoavisa.com";

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export default function Breadcrumbs({ items, currentPage }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: BASE_URL,
      },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${BASE_URL}${item.href}`,
      })),
      {
        "@type": "ListItem",
        position: items.length + 2,
        name: currentPage,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Migas de pan"
        className="w-full bg-slate-900 border-b border-slate-700"
        data-testid="breadcrumbs-nav"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center gap-1 py-3 text-sm text-slate-400 overflow-x-auto whitespace-nowrap">
            <li className="flex items-center">
              <a
                href="/"
                className="hover:text-white transition-colors flex items-center gap-1"
                data-testid="breadcrumb-link-inicio"
              >
                <i className="ri-home-4-line text-xs" aria-hidden="true"></i>
                <span>Inicio</span>
              </a>
            </li>
            {items.map((item, i) => (
              <li key={i} className="flex items-center">
                <i className="ri-arrow-right-s-line text-slate-600 mx-1" aria-hidden="true"></i>
                <a
                  href={item.href}
                  className="hover:text-white transition-colors"
                  data-testid={`breadcrumb-link-${i}`}
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="flex items-center">
              <i className="ri-arrow-right-s-line text-slate-600 mx-1" aria-hidden="true"></i>
              <span
                className="text-white font-medium truncate max-w-[200px] sm:max-w-none"
                aria-current="page"
                data-testid="breadcrumb-current"
              >
                {currentPage}
              </span>
            </li>
          </ol>
        </div>
      </nav>
    </>
  );
}
