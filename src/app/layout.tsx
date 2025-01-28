import type { Metadata } from "next";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";

export const metadata: Metadata = {
  title: "Arthur Agency",
  description: "Arthur Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <SmoothScrolling>{children}</SmoothScrolling>
      </body>
    </html>
  );
}
