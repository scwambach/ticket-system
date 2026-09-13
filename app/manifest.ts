import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Make Scott Do It",
    short_name: "Scott Task",
    description:
      "The only known method for getting Scott Wambach to do something.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fef200",
    theme_color: "#fef200",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
