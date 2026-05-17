"use client";

import { motion } from "motion/react";
import { Handshake, MapPinned, Workflow, Wallet } from "lucide-react";

const REASONS = [
    {
        num: "01",
        icon: Workflow,
        title: "遺品整理から不動産買取まで自社対応",
        body: "外注の取りまとめではなく、家じまい.com（みんなのいえ株式会社）が遺品整理も不動産買取も自社で実施。窓口がひとつで完結します。",
        accent: "from-rose-100 to-rose-50",
        accentText: "text-rose-500",
        ringColor: "ring-rose-200",
    },
    {
        num: "02",
        icon: Wallet,
        title: "自社買取だから中間マージン・仲介手数料ゼロ",
        body: "不動産は当社が直接買取します。仲介を挟まないため、お客様の手取り額が増えやすい構造です。早期現金化にも対応。",
        accent: "from-amber-100 to-amber-50",
        accentText: "text-amber-600",
        ringColor: "ring-amber-200",
    },
    {
        num: "03",
        icon: MapPinned,
        title: "朝霞市拠点・埼玉県全域に精通",
        body: "県内の自治体ルール・清掃工場・買取相場・空き家事情を熟知。地元密着だからこそ、迅速な現地調査と的確なご提案が可能です。",
        accent: "from-emerald-100 to-emerald-50",
        accentText: "text-emerald-600",
        ringColor: "ring-emerald-200",
    },
    {
        num: "04",
        icon: Handshake,
        title: "ご相談無料・しつこい営業はしません",
        body: "「まだ何も決まっていない」段階のご相談こそ大歓迎。お見積もり後の押し売り、強引な契約催促は一切ありません。",
        accent: "from-blue-100 to-blue-50",
        accentText: "text-blue-600",
        ringColor: "ring-blue-200",
    },
] as const;

export default function WhyUs() {
    return (
        <section id="why" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">WHY US</span>
                    <h2 className="mt-2 section-title">
                        家じまい.comが選ばれる4つの理由
                    </h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        埼玉県の実家じまいで、お客様の負担をいちばん軽くする座組みを整えています。
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
                    {REASONS.map((r, i) => {
                        const Icon = r.icon;
                        return (
                            <motion.div
                                key={r.num}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl md:p-8"
                            >
                                <span
                                    aria-hidden
                                    className="absolute -right-3 -top-4 select-none text-7xl font-black text-primary/[0.05] transition-colors group-hover:text-accent/[0.08]"
                                >
                                    {r.num}
                                </span>
                                <div className="relative">
                                    <div className="mb-4 flex items-center gap-3">
                                        <div
                                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${r.accent} ${r.accentText} ring-2 ${r.ringColor} transition-transform group-hover:scale-110`}
                                        >
                                            <Icon className="h-7 w-7" strokeWidth={1.8} />
                                        </div>
                                        <span
                                            className={`text-xs font-bold tracking-widest ${r.accentText}`}
                                        >
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
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
