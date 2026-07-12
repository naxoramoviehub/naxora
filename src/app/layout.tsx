import type { Metadata, Viewport } from "next";
import { Sora, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { default: "NAXORA | Private Cinema, Gaming & Celebrations", template: "%s | NAXORA" },
  description: "Book private cinema cabins, gaming suites and curated celebrations in Sri Lanka.",
  openGraph: { title: 'NAXORA Private Entertainment', description: 'Private cinema, gaming and celebrations in Sri Lanka.', images: ['/Hero_image.png'], type: 'website' },
  twitter: { card: 'summary_large_image', images: ['/Hero_image.png'] },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning><a href="#main-content" className="skip-link">Skip to content</a>{children}</body>
    </html>
  );
}
