"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
    ArrowRight,
    BookOpen,
    Calculator,
    HandCoins,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GUIDE_CARDS = [
    {
        href: "/guide",
        badge: "HUB",
        badgeColor: "bg-primary text-primary-foreground",
        title: "実家じまい完全ガイド",
        description:
            "相続発生から売却・登記までの全工程を1枚の地図に。30秒診断で自分に必要な記事が分かります。",
        icon: BookOpen,
        accent: "from-primary to-[oklch(0.22_0.07_255)]",
        cta: "全体像を見る",
    },
    {
        href: "/guide/cost",
        badge: "COST",
        badgeColor: "bg-emerald-100 text-emerald-700",
        title: "費用相場 完全版",
        description:
            "30坪木造のモデルケースで、遺品整理〜解体・税金まで全項目をシミュレーション。手取り額が分かります。",
        icon: Calculator,
        accent: "from-emerald-500 to-emerald-400",
        cta: "費用を試算する",
    },
    {
        href: "/guide/subsidy",
        badge: "SUBSIDY",
        badgeColor: "bg-sky-100 text-sky-700",
        title: "埼玉県の解体補助金一覧",
        description:
            "川口市・秩父市・深谷市など主要市町村別の制度・上限額・落とし穴まで。最大100万円の負担軽減を狙う。",
        icon: HandCoins,
        accent: "from-sky-500 to-sky-400",
        cta: "補助金を調べる",
    },
];

export default function GuideSection() {
    return (
        <section
            id="guide"
            className="relative overflow-hidden bg-gradient-to-b from-white via-secondary/30 to-white py-16 md:py-24"
        >
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, oklch(0.28 0.07 255) 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div className="container relative mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
                >
                    <span className="section-eyebrow">GUIDE</span>
                    <h2 className="mt-2 section-title">
                        まずは読んで理解したい方へ
                    </h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        ご相談の前に、ご自身で全体像・費用・補助金を把握したい方向けに、現場の実務をまとめた完全ガイドをご用意しています。
                    </p>
                </motion.div>

                <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
                    {GUIDE_CARDS.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.li
                                key={card.href}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.45, delay: i * 0.08 }}
                            >
                                <Link
                                    href={card.href}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-xl"
                                >
                                    <div
                                        className={`relative flex items-center justify-between bg-gradient-to-br ${card.accent} px-5 py-4 text-white`}
                                    >
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${card.badgeColor}`}
                                        >
                                            <Sparkles className="h-3 w-3" />
                                            {card.badge}
                                        </span>
                                        <Icon
                                            className="h-8 w-8 opacity-90"
                                            strokeWidth={1.5}
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">
                                            {card.title}
                                        </h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                                            {card.description}
                                        </p>
                                        <span className="mt-5 inline-flex items-center text-sm font-bold text-accent">
                                            {card.cta}
                                            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            </motion.li>
                        );
                    })}
                </ul>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-10 flex justify-center"
                >
                    <Link href="/guide">
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 border-primary/20 px-6 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                            ガイド一覧を見る
                            <ArrowRight className="ml-1.5 h-4 w-4" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
