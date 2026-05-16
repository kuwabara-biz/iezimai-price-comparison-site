import { Scale, Workflow, MapPin, MessageCircle } from "lucide-react";

const REASONS = [
    {
        num: "01",
        icon: Scale,
        title: "比較サイトを超えた、専門相談窓口",
        body: "単なる業者リストではなく、お客様の状況全体を整理してから業者をご提案します。「何から始めればよいかわからない」「複数業者にバラバラに連絡するのは大変」——そんな段階のご相談こそ、お気軽にお寄せください。",
    },
    {
        num: "02",
        icon: Workflow,
        title: "遺品整理から不動産処分までワンストップ",
        body: "複数の業者・専門家とのやりとりを、当窓口が一括で調整します。お客様は「窓口がひとつ」で済むため、何度も同じ説明を繰り返す必要がありません。",
    },
    {
        num: "03",
        icon: MapPin,
        title: "埼玉県を熟知した地域密着",
        body: "朝霞市を拠点に、埼玉県全域の地域事情・行政手続き・市場相場に精通しています。県内のケアマネジャー・地域包括支援センターとも連携を進めています。",
    },
    {
        num: "04",
        icon: MessageCircle,
        title: "ご相談はすべて無料、しつこい営業はしません",
        body: "電話・メール・オンライン（Zoom）でのご相談はすべて無料です。ご納得いただいてから業者をご紹介するため、強引な営業や契約の急かしは一切ありません。",
    },
] as const;

export default function WhyUs() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center md:mb-12">
                    <span className="section-eyebrow">WHY US</span>
                    <h2 className="mt-2 section-title">
                        家じまい.comが選ばれる4つの理由
                    </h2>
                </div>
                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
                    {REASONS.map((r) => {
                        const Icon = r.icon;
                        return (
                            <div
                                key={r.num}
                                className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
                            >
                                <span
                                    aria-hidden
                                    className="absolute -right-2 -top-3 select-none text-7xl font-black text-primary/[0.05]"
                                >
                                    {r.num}
                                </span>
                                <div className="relative">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent ring-1 ring-accent/10">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <span className="text-xs font-bold tracking-widest text-accent">
                                            {r.num}
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                        {r.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-muted-foreground">
                                        {r.body}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
