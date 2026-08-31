import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFDE59",
        backgroundImage: "radial-gradient(#000 3px, transparent 3px)",
        backgroundSize: "48px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          border: "8px solid #000",
          backgroundColor: "#fff",
          padding: "48px 64px",
          boxShadow: "16px 16px 0px 0px rgba(0,0,0,1)",
          transform: "rotate(-1deg)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              border: "8px solid #000",
              backgroundColor: "#FF6EC7",
              padding: "16px 32px",
              fontSize: 72,
              fontWeight: 900,
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >
            Make Scott Do It
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              fontWeight: 700,
              textTransform: "uppercase",
              textAlign: "center",
              maxWidth: 800,
            }}
          >
            The only known method for getting Scott Wambach to do something
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
