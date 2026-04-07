"use client";

import { useMemo } from "react";
import { buildSectionLinks, type InternalLink } from "../lib/internal-linking";

interface AutoInternalLinksProps {
  content: string;
  currentPath: string;
  maxLinks?: number;
  preferEntityTypes?: ("brand" | "service" | "city" | "concept" | "editorial")[];
  excludePaths?: string[];
  heading?: string;
  variant?: "inline" | "sidebar" | "footer";
}

export default function AutoInternalLinks({
  content,
  currentPath,
  maxLinks = 5,
  preferEntityTypes,
  excludePaths = [],
  heading = "Páginas relacionadas",
  variant = "footer",
}: AutoInternalLinksProps) {
  const preferKey = preferEntityTypes?.join(",") ?? "";
  const excludeKey = excludePaths.join(",");
  const links = useMemo(
    () =>
      buildSectionLinks(content, currentPath, {
        maxLinks,
        preferEntityTypes,
        additionalExclude: excludePaths,
      }),
    [content, currentPath, maxLinks, preferKey, excludeKey]
  );

  if (links.length === 0) return null;

  if (variant === "inline") {
    return (
      <nav aria-label="Enlaces internos relacionados" data-testid="auto-internal-links-inline">
        <ul className="flex flex-wrap gap-2 list-none p-0 m-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                title={link.title}
                className="text-sm text-[#ad023b] hover:text-[#8d0230] underline decoration-dotted underline-offset-2 transition-colors"
                data-testid={`auto-link-${link.entityType}-${link.entity.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (variant === "sidebar") {
    return (
      <aside aria-label="Contenido relacionado" data-testid="auto-internal-links-sidebar" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
          {heading}
        </h3>
        <ul className="space-y-2 list-none p-0 m-0">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                title={link.title}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-[#ad023b] dark:hover:text-[#ad023b] transition-colors group"
                data-testid={`auto-link-${link.entityType}-${link.entity.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#ad023b] opacity-40 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
                {link.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    );
  }

  return (
    <nav aria-label="Enlaces internos relacionados" data-testid="auto-internal-links-footer" className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-8">
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        {heading}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            title={link.title}
            className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-[#ad023b]/5 dark:hover:bg-[#ad023b]/10 border border-gray-200 dark:border-gray-700 hover:border-[#ad023b]/30 transition-all group"
            data-testid={`auto-link-${link.entityType}-${link.entity.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ad023b] opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0" aria-hidden="true" />
            <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-[#ad023b] transition-colors">
              {link.text}
            </span>
            <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-[#ad023b] ml-auto transition-colors" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}
