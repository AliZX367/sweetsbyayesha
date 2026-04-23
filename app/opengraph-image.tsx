import { ImageResponse } from "next/og";

export const alt = "Sweets by Ayesha — Halal Home Bakery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FFFCFD",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#C47D8E",
            fontWeight: 600,
            letterSpacing: 2,
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Made with Halal Ingredients · Schaumburg, IL
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "#3D2317",
            textAlign: "center",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          Sweets by Ayesha
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9A7060",
            opacity: 0.7,
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          Handcrafted cake pops, rice krispie treats & custom baked goods
        </div>
        <div
          style={{
            marginTop: 48,
            background: "#C47D8E",
            color: "#FFFCFD",
            padding: "16px 48px",
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 700,
          }}
        >
          Order Now
        </div>
      </div>
    ),
    { ...size }
  );
}

