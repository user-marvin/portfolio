import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Home-screen icon for iOS; matches the "MV" mark in the nav and the browser-tab icon.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#14181f",
          color: "#f5f3ee",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: -3,
        }}
      >
        MV
      </div>
    ),
    size,
  );
}
