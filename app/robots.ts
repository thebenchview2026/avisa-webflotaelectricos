import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const commonDisallow = [
    "/admin",
    "/admin/*",
    "/api/",
    "/confirmacion-*",
    "/_next/data/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: commonDisallow,
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: "https://electricos.grupoavisa.com/sitemap.xml",
  };
}
