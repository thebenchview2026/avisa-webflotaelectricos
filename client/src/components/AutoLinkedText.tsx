"use client";
import { Link } from "@/lib/router";
import { findLinkMatches, ALL_LINKS, type InternalLink } from "@/lib/seo-links";

interface AutoLinkedTextProps {
  text: string;
  links?: InternalLink[];
  maxLinks?: number;
  excludeUrls?: string[];
  className?: string;
  linkClassName?: string;
  as?: "p" | "span" | "div" | "li";
}

export default function AutoLinkedText({
  text,
  links = ALL_LINKS,
  maxLinks = 3,
  excludeUrls = [],
  className,
  linkClassName = "text-[#ad023b] hover:text-[#8d0230] underline decoration-[#ad023b]/30 hover:decoration-[#ad023b] transition-colors font-medium",
  as: Tag = "span",
}: AutoLinkedTextProps) {
  const matches = findLinkMatches(text, links, {
    maxLinksPerBlock: maxLinks,
    excludeUrls,
    oncePerKeywordGroup: true,
  });

  if (matches.length === 0) {
    return <Tag className={className}>{text}</Tag>;
  }

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  for (const match of matches) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={`link-${match.index}`}
        href={match.url}
        title={match.title}
        className={linkClassName}
        data-testid={`autolink-${match.url.replace(/\//g, "-").slice(1)}`}
      >
        {match.keyword}
      </Link>
    );
    lastIndex = match.index + match.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <Tag className={className}>{parts}</Tag>;
}

interface AutoLinkedBlockProps {
  children: string;
  links?: InternalLink[];
  maxLinks?: number;
  excludeUrls?: string[];
  className?: string;
  linkClassName?: string;
}

export function AutoLinkedParagraph({
  children,
  links = ALL_LINKS,
  maxLinks = 3,
  excludeUrls = [],
  className,
  linkClassName,
}: AutoLinkedBlockProps) {
  return (
    <AutoLinkedText
      text={children}
      links={links}
      maxLinks={maxLinks}
      excludeUrls={excludeUrls}
      className={className}
      linkClassName={linkClassName}
      as="p"
    />
  );
}
