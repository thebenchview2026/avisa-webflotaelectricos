import { Link } from "@/lib/router";
import { findLinkMatches, ALL_LINKS, type InternalLink } from "./seo-links";

export function renderLinkedText(
  text: string,
  options: {
    links?: InternalLink[];
    maxLinks?: number;
    excludeUrls?: string[];
    linkClassName?: string;
  } = {}
): (string | JSX.Element)[] {
  const {
    links = ALL_LINKS,
    maxLinks = 3,
    excludeUrls = [],
    linkClassName = "text-[#ad023b] hover:text-[#8d0230] underline decoration-[#ad023b]/30 hover:decoration-[#ad023b] transition-colors font-medium",
  } = options;

  const matches = findLinkMatches(text, links, {
    maxLinksPerBlock: maxLinks,
    excludeUrls,
    oncePerKeywordGroup: true,
  });

  if (matches.length === 0) return [text];

  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;

  for (const match of matches) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={`seo-${match.index}`}
        href={match.url}
        title={match.title}
        className={linkClassName}
      >
        {match.keyword}
      </Link>
    );
    lastIndex = match.index + match.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

interface TextToken {
  type: "text" | "bold";
  content: string;
}

function parseBoldTokens(text: string): TextToken[] {
  const tokens: TextToken[] = [];
  const parts = text.split(/\*\*(.*?)\*\*/g);
  for (let i = 0; i < parts.length; i++) {
    if (!parts[i]) continue;
    tokens.push({
      type: i % 2 === 1 ? "bold" : "text",
      content: parts[i],
    });
  }
  return tokens;
}

export function renderBoldAndLinkedText(
  text: string,
  options: {
    links?: InternalLink[];
    maxLinks?: number;
    excludeUrls?: string[];
    linkClassName?: string;
  } = {}
): (string | JSX.Element)[] {
  const {
    links = ALL_LINKS,
    maxLinks = 3,
    excludeUrls = [],
    linkClassName = "text-[#ad023b] hover:text-[#8d0230] underline decoration-[#ad023b]/30 hover:decoration-[#ad023b] transition-colors font-medium",
  } = options;

  const tokens = parseBoldTokens(text);
  const plainText = tokens.map(t => t.content).join("");
  const matches = findLinkMatches(plainText, links, {
    maxLinksPerBlock: maxLinks,
    excludeUrls,
    oncePerKeywordGroup: true,
  });

  if (matches.length === 0) {
    let keyIdx = 0;
    return tokens.map(t =>
      t.type === "bold" ? <strong key={`b-${keyIdx++}`}>{t.content}</strong> : t.content
    );
  }

  const result: (string | JSX.Element)[] = [];
  let globalOffset = 0;
  let matchIdx = 0;
  let keyCounter = 0;

  for (const token of tokens) {
    const tokenStart = globalOffset;
    const tokenEnd = tokenStart + token.content.length;
    let localOffset = 0;

    while (matchIdx < matches.length) {
      const match = matches[matchIdx];
      const matchEnd = match.index + match.length;

      if (match.index >= tokenEnd) break;

      if (match.index >= tokenStart && matchEnd <= tokenEnd) {
        const relStart = match.index - tokenStart;
        const relEnd = relStart + match.length;

        if (relStart > localOffset) {
          const before = token.content.slice(localOffset, relStart);
          if (token.type === "bold") {
            result.push(<strong key={`b-${keyCounter++}`}>{before}</strong>);
          } else {
            result.push(before);
          }
        }

        const linkEl = (
          <Link
            key={`seo-${keyCounter++}`}
            href={match.url}
            title={match.title}
            className={linkClassName}
          >
            {match.keyword}
          </Link>
        );

        if (token.type === "bold") {
          result.push(<strong key={`bs-${keyCounter++}`}>{linkEl}</strong>);
        } else {
          result.push(linkEl);
        }

        localOffset = relEnd;
        matchIdx++;
      } else {
        break;
      }
    }

    if (localOffset < token.content.length) {
      const remaining = token.content.slice(localOffset);
      if (token.type === "bold") {
        result.push(<strong key={`b-${keyCounter++}`}>{remaining}</strong>);
      } else {
        result.push(remaining);
      }
    }

    globalOffset = tokenEnd;
  }

  return result;
}
