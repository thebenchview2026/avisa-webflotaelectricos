const BASE_URL = "https://electricos.grupoavisa.com";

interface PageJsonLdProps {
  path: string;
  name: string;
  description: string;
  type?: string | string[];
  aboutIds?: string[];
  significantLinks?: string[];
  mainEntity?: object;
  breadcrumbItems?: { name: string; path: string }[];
}

export default function PageJsonLd({
  path,
  name,
  description,
  type = "WebPage",
  aboutIds,
  significantLinks,
  mainEntity,
  breadcrumbItems,
}: PageJsonLdProps) {
  const url = `${BASE_URL}${path}`;
  const breadcrumb = breadcrumbItems
    ? {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
          ...breadcrumbItems.map((item, i) => ({
            "@type": "ListItem",
            position: i + 2,
            name: item.name,
            item: `${BASE_URL}${item.path}`,
          })),
        ],
      }
    : {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: name.split(" - ")[0].split(" | ")[0], item: url },
        ],
      };

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${url}/#webpage`,
    url,
    name: `${name} | Grupo Avisa`,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "es",
    breadcrumb,
  };

  if (aboutIds && aboutIds.length > 0) {
    schema.about = aboutIds.length === 1
      ? { "@id": aboutIds[0] }
      : aboutIds.map((id) => ({ "@id": id }));
  }

  if (significantLinks) {
    schema.significantLink = significantLinks;
  }

  if (mainEntity) {
    schema.mainEntity = mainEntity;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
