import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "家じまい.com | 埼玉・北関東の遺品整理業者比較・空き家買取",
    template: "%s | 家じまい.com",
  },
  description:
    "埼玉・北関東エリアに特化した遺品整理業者比較サイト。地元を知り尽くした優良業者のみを厳選掲載。口コミ・料金で比較して最適な業者を見つけられます。空き家の買取・解体もご相談ください。",
  keywords: [
    "遺品整理",
    "埼玉",
    "北関東",
    "空き家買取",
    "実家じまい",
    "さいたま市",
    "川口市",
    "川越市",
    "群馬",
    "栃木",
    "茨城",
  ],
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
      </body>
    </html>
  );
}
