import type { Metadata } from "next";
import ConsultationForm from "@/components/contact/ConsultationForm";
import { TYPE_OPTIONS, type TypeValue } from "@/components/contact/consultation-types";
import ContactFAQ, { FAQ_ITEMS } from "@/components/contact/ContactFAQ";
import { SITE } from "@/lib/constants";

const DESCRIPTION =
    "埼玉県の実家じまい（遺品整理・相続不動産の買取）に関する無料個別相談。家じまい.com（みんなのいえ株式会社）のスタッフが、お話を伺います。電話・メール・Zoom・ご訪問に対応。";

export const metadata: Metadata = {
    title: { absolute: "無料個別相談｜埼玉県の実家じまい｜家じまい.com" },
    description: DESCRIPTION,
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "無料個別相談｜埼玉県の実家じまい｜家じまい.com",
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

// 旧URL（type=shukatsu）からの遷移は "その他" にフォールバック
function resolveInitialType(raw: string | undefined): TypeValue {
    if (!raw) return "ihinseiri";
    if (VALID_TYPES.includes(raw as TypeValue)) return raw as TypeValue;
    if (raw === "shukatsu") return "other";
    return "ihinseiri";
}

export default async function ContactPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const initialType = resolveInitialType(params.type);

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

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
                <div className="container relative mx-auto px-4 text-center text-white">
                    <span className="text-xs font-semibold tracking-widest text-accent">
                        FREE CONSULTATION
                    </span>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        無料個別相談
                    </h1>
                    <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                        埼玉県の実家じまい——遺品整理から不動産買取まで、家じまい.comの運営スタッフが直接お話を伺います。
                        ご相談・お見積もりは完全無料。24時間以内に折り返しご連絡します（土日祝を除く）。
                    </p>
                </div>
            </section>

            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-2xl">
                        <ConsultationForm initialType={initialType} />
                    </div>
                </div>
            </section>

            <ContactFAQ />
        </div>
    );
}
