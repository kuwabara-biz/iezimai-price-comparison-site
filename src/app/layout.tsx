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
    "埼玉県 実家じまい",
    "埼玉県 遺品整理",
    "埼玉県 不動産買取",
    "実家じまい 朝霞市",
    "空き家 買取 埼玉",
    "相続不動産 売却 埼玉",
    "家じまい",
    "みんなのいえ株式会社",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE.url,
    siteName: SITE.fullName,
    title: SITE.titleDefault,
    description: SITE.description,
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.titleDefault,
    description: SITE.description,
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
