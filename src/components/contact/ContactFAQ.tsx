import { ChevronDown } from "lucide-react";

export const FAQ_ITEMS = [
    {
        q: "相談だけでも大丈夫ですか？",
        a: "もちろん大丈夫です。「まだ何も決まっていないが、選択肢を整理したい」というご相談が、実は最も多くいただいています。ご相談だけで業者依頼に至らなくても、費用は一切かかりません。",
    },
    {
        q: "どんな立場で相談に応じているのですか？",
        a: "家じまい.comの運営スタッフが、ご相談全体の整理と、最適な専門家・業者のご紹介を行っています。具体的な書類作成や登記手続きが必要な場合は、提携の行政書士・司法書士・税理士をご紹介します。",
    },
    {
        q: "紹介された業者と契約しないといけないのですか？",
        a: "いいえ、まったく義務はありません。ご紹介する業者は審査済みの信頼できる先を厳選していますが、ご納得いただけない場合は他の選択肢をご提案します。複数業者からのお見積もり比較ももちろん可能です。",
    },
    {
        q: "相談料・紹介料はかかりますか？",
        a: "お客様からはいかなる費用もいただきません。当窓口は、ご紹介先の業者・専門家から紹介料をいただく仕組みで運営しています。詳細は「特定商取引法に基づく表記」をご覧ください。",
    },
    {
        q: "どのエリアまで対応していますか？",
        a: "埼玉県全域に対応しています。朝霞市・志木市・新座市・和光市を中心に、さいたま市・川越市・所沢市・川口市・越谷市など県内主要エリアでの相談実績・連携業者がございます。",
    },
] as const;

export default function ContactFAQ() {
    return (
        <section className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center md:mb-10">
                        <span className="section-eyebrow">FAQ</span>
                        <h2 className="mt-2 section-title">よくあるご質問</h2>
                    </div>
                    <div className="space-y-3">
                        {FAQ_ITEMS.map((item, i) => (
                            <details
                                key={i}
                                className="group rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md md:px-6"
                            >
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold text-foreground [&::-webkit-details-marker]:hidden">
                                    <span className="flex-1 leading-relaxed">
                                        <span className="mr-2 font-bold text-accent">
                                            Q{i + 1}.
                                        </span>
                                        {item.q}
                                    </span>
                                    <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                                </summary>
                                <div className="mt-4 border-t border-border pt-4 text-base leading-relaxed text-muted-foreground">
                                    <span className="mr-2 font-bold text-accent">A.</span>
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
