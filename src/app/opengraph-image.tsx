import { ImageResponse } from "next/og";
import { getContent } from "@/sanity/content";

export const alt = "Marvin Villamar — Full Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link-preview card shown when the site is shared on LinkedIn, Slack, Messenger, etc.
export default async function OpenGraphImage() {
  const { profile } = await getContent();
  const stats = profile.stats.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0a0e13",
          color: "#e8eaed",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#e8eaed",
              color: "#0a0e13",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            MV
          </div>
          <div style={{ fontSize: 24, color: "#8e97a4" }}>{profile.location}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3 }}>{profile.shortName}</div>
          <div style={{ fontSize: 44, color: "#8e97a4", marginTop: 4 }}>{profile.role}</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: 56 }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", maxWidth: 240 }}>
                <div style={{ fontSize: 44, fontWeight: 700, color: "#48c8ba" }}>{s.value}</div>
                <div style={{ fontSize: 20, color: "#8e97a4" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ width: 120, height: 4, background: "#48c8ba", borderRadius: 2 }} />
        </div>
      </div>
    ),
    size,
  );
}
