"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
    PackageOpen,
    Building2,
    ArrowRight,
    Check,
} from "lucide-react";

const SERVICES = [
    {
        tag: "SERVICE 01",
        title: "遺品整理",
        lead: "実家の片付け・仕分け・買取・処分まで、ワンストップ。",
        body: "ご家族の想い出を大切に扱いながら、自社スタッフが丁寧に仕分け・搬出・清掃。買取可能な品はその場で査定し、料金から差し引きます。供養・特殊清掃にも対応。",
        icon: PackageOpen,
        gradient: "from-amber-500 to-rose-500",
        bgGradient: "from-amber-50 to-rose-50",
        accent: "text-amber-600",
        ring: "ring-amber-200",
        features: [
            "1Kから戸建てまで対応",
            "貴重品・遺影・思い出品の仕分け",
            "買取で実費を圧縮",
            "供養・特殊清掃も同時手配",
        ],
        href: "/contact?type=ihinseiri",
    },
    {
        tag: "SERVICE 02",
        title: "不動産買取",
        lead: "空き家になった実家を、当社が直接買取。",
        body: "仲介ではなく自社買取のため、仲介手数料ゼロ・最短2週間で現金化が可能。状態不問（再建築不可・残置物あり・遠方相続もOK）。仲介によるじっくり売却もご相談可能。",
        icon: Building2,
        gradient: "from-emerald-500 to-teal-500",
        bgGradient: "from-emerald-50 to-teal-50",
        accent: "text-emerald-600",
        ring: "ring-emerald-200",
        features: [
            "自社買取で仲介手数料0円",
            "最短2週間で現金化",
            "残置物ありのままでOK",
            "再建築不可・古家もご相談可",
        ],
        href: "/contact?type=real-estate",
    },
] as const;

export default function ServiceSection() {
    return (
        <section id="service" className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">SERVICE</span>
                    <h2 className="mt-2 section-title">2つの主要サービス</h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        実家じまいに必要な2つの軸を、それぞれ自社で完結。組み合わせ・単発、どちらでも承ります。
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
                    {SERVICES.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.div
                                key={s.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                className={`group relative overflow-hidden rounded-3xl border border-border bg-white p-6 shadow-sm transition-all hover:shadow-xl md:p-10`}
                            >
                                {/* 装飾背景 */}
                                <div
                                    aria-hidden
                                    className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${s.bgGradient} opacity-60 blur-3xl transition-opacity group-hover:opacity-90`}
                                />

                                <div className="relative">
                                    <span
                                        className={`inline-block text-xs font-bold tracking-widest ${s.accent}`}
                                    >
                                        {s.tag}
                                    </span>
                                    <div className="mt-3 flex items-start gap-4">
                                        <motion.div
                                            whileHover={{ scale: 1.06, rotate: 4 }}
                                            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${s.bgGradient} ${s.accent} ring-2 ${s.ring}`}
                                        >
                                            <Icon className="h-8 w-8" strokeWidth={1.7} />
                                        </motion.div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
                                                {s.title}
                                            </h3>
                                            <p
                                                className={`mt-1 text-sm font-semibold ${s.accent} md:text-base`}
                                            >
                                                {s.lead}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                                        {s.body}
                                    </p>

                                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                                        {s.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-start gap-2 text-sm text-foreground md:text-base"
                                            >
                                                <Check
                                                    className={`mt-0.5 h-4 w-4 shrink-0 ${s.accent}`}
                                                    strokeWidth={3}
                                                />
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={s.href}
                                        className={`mt-7 inline-flex items-center gap-1 text-base font-bold ${s.accent} transition-all hover:gap-2`}
                                    >
                                        このサービスを無料相談する
                                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
