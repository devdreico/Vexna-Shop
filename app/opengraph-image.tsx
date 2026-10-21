import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "VEXNA SHOP — Accesorios para bicicleta en Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

const blackData = readFileSync(join(process.cwd(), "assets/fonts/Montserrat-Black.ttf"));
const semiData = readFileSync(join(process.cwd(), "assets/fonts/Montserrat-SemiBold.ttf"));

const fonts = [
  { data: semiData, weight: 500 as const },
  { data: semiData, weight: 600 as const },
  { data: blackData, weight: 700 as const },
  { data: blackData, weight: 800 as const },
  { data: blackData, weight: 900 as const },
].map(({ data, weight }) => ({
  name: "Montserrat",
  data,
  weight,
  style: "normal" as const,
}));

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0c",
          padding: 72,
          color: "#ffffff",
          fontFamily: "Montserrat",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 6,
              color: "#ffd60a",
            }}
          >
            <span
              style={{
                width: 46,
                height: 46,
                borderRadius: 999,
                backgroundColor: "#ffd60a",
                color: "#0a0a0c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              V
            </span>
            VEXNA SHOP
          </span>
          <span
            style={{
              display: "flex",
              borderRadius: 999,
              backgroundColor: "#ffd60a",
              color: "#0a0a0c",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 3,
              padding: "10px 24px",
            }}
          >
            SOLO CONTRA ENTREGA
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 132,
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: -2,
            }}
          >
            <span style={{ color: "#ffd60a" }}>V</span>EXNA
          </div>
          <div style={{ marginTop: 26, fontSize: 40, fontWeight: 600, color: "#f4f4f6" }}>
            Accesorios que impulsan tu ride
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", fontSize: 26, fontWeight: 500, color: "#9aa1ab" }}>
            Pagás al recibir · Envíos a toda Colombia · Garantía 30 días
          </span>
          <span style={{ display: "flex", width: 220, height: 14, backgroundColor: "#ffd60a", borderRadius: 999 }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
