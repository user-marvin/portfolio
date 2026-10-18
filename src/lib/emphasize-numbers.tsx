import type { ReactNode } from "react";

// Matches impact numbers ("249 pull requests", "10+ systems", "71-vessel", "22 TypeORM entities")
// but not version numbers ("React 19 / TypeScript", "Spring Boot 3, REST", "RS256").
const IMPACT = /\b\d[\d,]*(?:\+|%|-[a-z]+|(?= [a-z])|(?= [A-Z][A-Za-z]* [a-z]))/g;

export function emphasizeNumbers(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let lastEnd = 0;
  for (const match of text.matchAll(IMPACT)) {
    const start = match.index ?? 0;
    if (start > lastEnd) parts.push(text.slice(lastEnd, start));
    parts.push(
      <strong key={start} className="font-semibold text-ink">
        {match[0]}
      </strong>,
    );
    lastEnd = start + match[0].length;
  }
  if (lastEnd < text.length) parts.push(text.slice(lastEnd));
  return parts;
}
