import type { Metadata } from "next";
import "./globals.css";
import BackgroundVideo from "@/components/BackgroundVideo";
import Header from "@/components/Header";

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
        <Header />
        <BackgroundVideo />
        {children}
      </body>
    </html>
  );
}
