import type { Metadata } from "next";
import ConsultationCategories from "@/components/contact/ConsultationCategories";
import ConsultationForm from "@/components/contact/ConsultationForm";
import { TYPE_OPTIONS, type TypeValue } from "@/components/contact/consultation-types";
import ContactFAQ, { FAQ_ITEMS } from "@/components/contact/ContactFAQ";
import { SITE } from "@/lib/constants";

const DESCRIPTION =
    "相続不動産・遺品整理・終活のお悩みに、家じまい.comの運営スタッフが無料でお応えします。電話・メール・Zoom・ご訪問に対応。";

export const metadata: Metadata = {
    title: { absolute: "無料個別相談｜家じまい.com" },
    description: DESCRIPTION,
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "無料個別相談｜家じまい.com",
        description: DESCRIPTION,
        url: `${SITE.url}/contact`,
        type: "website",
    },
};

const VALID_TYPES = TYPE_OPTIONS.map((t) => t.value);

interface PageProps {
    searchParams: Promise<{ type?: string }>;
}

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
        },
    })),
};

export default async function ContactPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const initialType: TypeValue = VALID_TYPES.includes(params.type as TypeValue)
        ? (params.type as TypeValue)
        : "ihinseiri";

    return (
        <div className="min-h-screen">
            {/* JSON-LD: FAQPage */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero: ページタイトル + リード */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)] py-14 md:py-20">
                {/* 背景装飾 */}
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
                <div className="container relative mx-auto px-4 text-center text-white">
                    <span className="text-xs font-semibold tracking-widest text-accent">
                        CONSULTATION
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        無料個別相談
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                        家じまい.comの運営スタッフが、お話を伺います。ご相談内容に応じて、最適な業者・専門家をご紹介します。電話・メール・オンライン（Zoom）・ご訪問（埼玉県内）でのご相談に対応しています。
                    </p>
                </div>
            </section>

            {/* 3つの相談カテゴリ */}
            <ConsultationCategories />

            {/* 相談フォーム + 安心メッセージ */}
            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl">
                        <ConsultationForm initialType={initialType} />
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <ContactFAQ />
        </div>
    );
}
