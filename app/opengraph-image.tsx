import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Baby Shower Invitation - Adebukola Ayeni Jolayemi";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fffef9 0%, #fefae8 50%, #fff9f0 100%)",
        position: "relative",
      }}
    >
      {/* Decorative background circles */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(26, 77, 46, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-80px",
          left: "-80px",
          width: "350px",
          height: "350px",
          background:
            "radial-gradient(circle, rgba(245, 200, 66, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(135, 197, 164, 0.06) 0%, transparent 60%)",
          borderRadius: "50%",
        }}
      />

      {/* Main Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background:
              "linear-gradient(135deg, rgba(26, 77, 46, 0.08) 0%, rgba(245, 200, 66, 0.08) 100%)",
            border: "1px solid rgba(26, 77, 46, 0.15)",
            borderRadius: "50px",
            padding: "10px 24px",
            marginBottom: "30px",
          }}
        >
          <span style={{ fontSize: 20 }}>👶</span>
          <span
            style={{
              fontSize: 14,
              letterSpacing: "3px",
              color: "#1a4d2e",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            Baby Shower
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 68,
            fontWeight: "bold",
            color: "#1a4d2e",
            marginBottom: "15px",
            lineHeight: 1.1,
            fontFamily: "Georgia, serif",
          }}
        >
          A Little One
        </div>

        <div
          style={{
            fontSize: 68,
            fontWeight: "bold",
            color: "#f5c842",
            marginBottom: "35px",
            lineHeight: 1.1,
            fontFamily: "Georgia, serif",
          }}
        >
          is on the Way
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 36,
            color: "#1a4d2e",
            marginBottom: "30px",
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          Adebukola Ayeni Jolayemi
        </div>

        {/* Date & Time */}
        <div
          style={{
            display: "flex",
            gap: "40px",
            marginBottom: "40px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: 28, color: "#5a7c65", marginBottom: "5px" }}
            >
              📅
            </span>
            <span style={{ fontSize: 20, color: "#5a7c65", fontWeight: 500 }}>
              Saturday, March 14th
            </span>
          </div>
          <div
            style={{
              width: "2px",
              height: "40px",
              background:
                "linear-gradient(180deg, rgba(26, 77, 46, 0.2) 0%, rgba(245, 200, 66, 0.2) 100%)",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{ fontSize: 28, color: "#5a7c65", marginBottom: "5px" }}
            >
              ⏰
            </span>
            <span style={{ fontSize: 20, color: "#5a7c65", fontWeight: 500 }}>
              4 PM - 8 PM
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            display: "flex",
            background: "linear-gradient(135deg, #1a4d2e 0%, #2d5a3d 100%)",
            color: "#fffef9",
            fontSize: 32,
            fontWeight: "bold",
            padding: "18px 50px",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(26, 77, 46, 0.25)",
          }}
        >
          RSVP Today! ✨
        </div>
      </div>

      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          right: "60px",
          fontSize: 40,
          opacity: 0.6,
        }}
      >
        ✨
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          left: "70px",
          fontSize: 35,
          opacity: 0.5,
        }}
      >
        💝
      </div>
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "100px",
          fontSize: 30,
          opacity: 0.4,
        }}
      >
        🎉
      </div>
    </div>,
    {
      ...size,
    },
  );
}
