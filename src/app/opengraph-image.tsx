import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sarmaya — Growth investment into Pakistan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0c0b0a",
          color: "#c4a35a",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 28,
            border: "1px solid rgba(196,163,90,0.28)",
          }}
        />
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#dbb96a",
          }}
        >
          Sarmaya
        </div>
        <div
          style={{
            marginTop: 18,
            fontSize: 28,
            color: "#f3f1ec",
            opacity: 0.72,
          }}
        >
          15+ verified growth listings
        </div>
      </div>
    ),
    { ...size },
  );
}
