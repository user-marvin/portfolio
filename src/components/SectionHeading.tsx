/** "01 — featured" on the left, an optional "ALL … →" link on the right. */
export default function SectionHeading({
  id,
  number,
  title,
  link,
}: {
  id: string;
  number: string;
  title: string;
  link?: { href: string; label: string; external?: boolean };
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-2">
      <h2 id={id} className="section-title">
        {number} — {title}
      </h2>
      {link && (
        <a
          href={link.href}
          className="section-link"
          {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {link.label} →
        </a>
      )}
    </div>
  );
}
