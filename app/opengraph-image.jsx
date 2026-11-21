import { ImageResponse } from "next/og";
import { personalData } from "@/utils/data/personal-data";
import { skillsData } from "@/utils/data/skills";

// Preview card shown when the site link is shared (WhatsApp, LinkedIn, etc.)
export const alt = `${personalData.name} | ${personalData.designation}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const initials = personalData.name.split(" ").map((w) => w[0]).join("");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0a0817",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(139,92,246,0.55), transparent 45%), radial-gradient(circle at 85% 80%, rgba(236,72,153,0.45), transparent 45%)",
          color: "#ece9fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              fontSize: "40px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            {initials}
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#6ee7b7",
              fontSize: "24px",
            }}
          >
            Open to work · Fresher
          </div>
        </div>

        <div style={{ display: "flex", marginTop: "40px", fontSize: "88px", fontWeight: 800, lineHeight: 1.05 }}>
          {personalData.name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "12px",
            fontSize: "44px",
            fontWeight: 600,
            backgroundImage: "linear-gradient(90deg, #22d3ee, #8b5cf6, #ec4899)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {personalData.designation} · B.Tech CSE (AI &amp; ML)
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "44px" }}>
          {skillsData.slice(0, 6).map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                fontSize: "26px",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
