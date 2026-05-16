import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/next";
import { SITE } from "@/lib/constants";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.titleDefault,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "家じまい",
    "埼玉県",
    "遺品整理",
    "相続不動産",
    "空き家",
    "終活",
    "朝霞市",
    "実家じまい",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE.url,
    siteName: SITE.fullName,
    title: SITE.titleDefault,
    description: SITE.description,
    // TODO: 本番用 OGP 画像（1200x630px）を /public/og-image.png に配置して差し替え
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titleDefault,
    description: SITE.description,
    // TODO: 本番用 OGP 画像を /public/og-image.png に配置して差し替え
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
