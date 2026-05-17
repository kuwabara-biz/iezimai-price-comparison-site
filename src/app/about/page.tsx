import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceList from "@/components/about/ServiceList";
import { SITE, COMPANY } from "@/lib/constants";

const DESCRIPTION =
    "家じまい.comを運営するみんなのいえ株式会社の会社案内。埼玉県朝霞市を拠点に、遺品整理・相続不動産の買取をワンストップで提供しています。";

export const metadata: Metadata = {
    title: { absolute: "会社案内｜家じまい.com" },
    description: DESCRIPTION,
    alternates: { canonical: "/about" },
    openGraph: {
        title: "会社案内｜家じまい.com",
        description: DESCRIPTION,
        url: `${SITE.url}/about`,
        type: "website",
    },
};

const COMPANY_INFO = [
    { label: "会社名", value: COMPANY.name },
    { label: "サービス名", value: "家じまい.com" },
    { label: "所在地", value: COMPANY.address },
    { label: "事業内容", value: "遺品整理・相続不動産の買取・空き家管理・解体手配" },
    { label: "対応エリア", value: "埼玉県全域" },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen">
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
                        ABOUT US
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        会社案内
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                        家じまい.comは、埼玉県朝霞市を拠点に、実家じまい（遺品整理 × 相続不動産の買取）を自社ワンストップで提供する {COMPANY.name} のサービスです。
                    </p>
                </div>
            </section>

            <ServiceList />

            <section className="bg-secondary py-14 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-8 text-center md:mb-10">
                            <span className="section-eyebrow">COMPANY</span>
                            <h2 className="mt-2 section-title">会社概要</h2>
                        </div>
                        <dl className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
                            {COMPANY_INFO.map((item, i) => (
                                <div
                                    key={item.label}
                                    className={`grid gap-1 px-5 py-4 sm:grid-cols-[160px_1fr] sm:gap-4 md:px-7 ${
                                        i !== COMPANY_INFO.length - 1
                                            ? "border-b border-border"
                                            : ""
                                    }`}
                                >
                                    <dt className="text-sm font-bold text-foreground md:text-base">
                                        {item.label}
                                    </dt>
                                    <dd className="text-sm text-muted-foreground md:text-base">
                                        {item.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>

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
