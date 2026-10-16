import type { ReactNode } from "react";

// Matches impact numbers ("249 pull requests", "10+ systems", "71-vessel", "22 TypeORM entities")
// but not version numbers ("React 19 / TypeScript", "Spring Boot 3, REST", "RS256").
const IMPACT = /\b\d[\d,]*(?:\+|%|-[a-z]+|(?= [a-z])|(?= [A-Z][A-Za-z]* [a-z]))/g;

export function emphasizeNumbers(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(IMPACT)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <strong key={i} className="font-semibold text-accent">
        {m[0]}
      </strong>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
