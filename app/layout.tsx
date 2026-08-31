import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Make Scott Do It",
  description:
    "The only known method for getting Scott Wambach to do something.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-mono text-black">{children}</body>
    </html>
  );
}
