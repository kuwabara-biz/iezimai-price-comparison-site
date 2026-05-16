import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceList from "@/components/about/ServiceList";
import PartnerNetwork from "@/components/about/PartnerNetwork";
import { SITE } from "@/lib/constants";

const DESCRIPTION =
    "家じまい.comが提供するご相談内容（遺品整理・相続不動産の処分・終活）と、連携している専門家ネットワークをご紹介します。";

export const metadata: Metadata = {
    title: { absolute: "サービス案内｜家じまい.com" },
    description: DESCRIPTION,
    alternates: { canonical: "/about" },
    openGraph: {
        title: "サービス案内｜家じまい.com",
        description: DESCRIPTION,
        url: `${SITE.url}/about`,
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* 1. ヒーロー */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)] py-14 md:py-20">
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div
                    aria-hidden
                    className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
                />
                <div className="container relative mx-auto px-4 text-center text-white">
                    <span className="text-xs font-semibold tracking-widest text-accent">
                        SERVICES
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        サービス案内
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                        家じまい.comは、遺品整理・相続不動産の処分・終活など、埼玉県の40〜60代の方が直面する「実家じまい」を支援する総合相談窓口です。ご相談内容を整理し、提携する審査済みの業者・専門家ネットワークから最適なパートナーをご紹介します。
                    </p>
                </div>
            </section>

            {/* 2. ご相談いただける内容 */}
            <ServiceList />

            {/* 3. 連携している専門家・機関 */}
            <PartnerNetwork />

            {/* 4. メッセージとCTA */}
            <section className="bg-white py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="section-title">お気軽にご相談ください</h2>
                        <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground md:text-[17px]">
                            <p>
                                「相談するほどのことではないかもしれない」「まだ何も決まっていない」——そんな段階のご相談こそ、お気軽にお寄せください。早い段階でご相談いただくことで、選択肢を広く検討できます。
                            </p>
                            <p>
                                ご相談はすべて無料です。電話・メール・オンライン（Zoom）・ご訪問（埼玉県内）から、ご都合のよい方法をお選びください。
                            </p>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="h-14 bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90 sm:px-10"
                                >
                                    無料で個別相談を申し込む
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
