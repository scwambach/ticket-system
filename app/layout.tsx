import type { Metadata } from "next";
import "./globals.css";

const title = "Make Scott Do It";
const description =
  "The only known method for getting Scott Wambach to do something. Type a task, hit submit, and it shows up in his to-do list. No refunds.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
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
