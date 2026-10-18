// Small helpers that turn the Sanity content into what the sections show.

/** "Sep 2025 — Present" → "2025": the year a period starts. */
export function startYear(period: string): string {
  return period.match(/\b(19|20)\d{2}\b/)?.[0] ?? period;
}

/** True for a role that hasn't ended ("… — Present", "… – now"). */
export function isCurrent(period: string): boolean {
  return /present|now/i.test(period);
}

/** "SmartFleet — Royal Caribbean Group" → { name: "SmartFleet", subtitle: "Royal Caribbean Group" }. */
export function splitTitle(title: string): { name: string; subtitle?: string } {
  const [name, ...rest] = title.split(/\s+[—–-]\s+/);
  return { name, subtitle: rest.length ? rest.join(" — ") : undefined };
}

/**
 * "React — The Complete Guide (Hooks, Router, Redux) · Udemy" → name and issuer. The issuer comes after the
 * last " · ", or from a "Microsoft Certified: …" style prefix; otherwise there is none.
 */
export function splitCertification(text: string): { name: string; issuer?: string } {
  const separator = text.lastIndexOf(" · ");
  if (separator > 0) return { name: text.slice(0, separator).trim(), issuer: text.slice(separator + 3).trim() };
  const certifiedBy = text.match(/^(\w+) Certified:/);
  return { name: text, issuer: certifiedBy?.[1] };
}

/** "https://github.com/user-marvin" → "github.com/user-marvin". */
export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

/** Two-digit section numbers in page order: "01", "02", … */
export function sectionNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}
