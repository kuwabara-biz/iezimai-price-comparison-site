"use client";

import { motion } from "motion/react";
import {
    PhoneCall,
    PackageOpen,
    Building2,
    CheckCircle2,
    Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
    {
        tag: "STEP 01",
        tagColor: "text-rose-500",
        tagBg: "bg-rose-50",
        tagBorder: "border-rose-200",
        title: "ご相談",
        sub: "無料・最短即日折返し",
        body: "ご状況・ご希望をヒアリング。お電話・フォームから。一度の相談で全体像が見える化します。",
        icon: PhoneCall,
        ringColor: "ring-rose-200",
        iconBg: "from-rose-100 to-rose-50",
        iconText: "text-rose-500",
        cx: 160,
    },
    {
        tag: "STEP 02",
        tagColor: "text-amber-600",
        tagBg: "bg-amber-50",
        tagBorder: "border-amber-200",
        title: "遺品整理",
        sub: "自社スタッフが施工",
        body: "現地お見積り→ご納得後に作業。仕分け・買取・供養・処分まで、家じまい.comの自社スタッフが一括対応。",
        icon: PackageOpen,
        ringColor: "ring-amber-200",
        iconBg: "from-amber-100 to-amber-50",
        iconText: "text-amber-600",
        cx: 500,
    },
    {
        tag: "STEP 03",
        tagColor: "text-emerald-600",
        tagBg: "bg-emerald-50",
        tagBorder: "border-emerald-200",
        title: "不動産買取",
        sub: "自社買取で中間手数料ゼロ",
        body: "空き家になった実家を、みんなのいえ株式会社が自社で査定・買取。即現金化も、仲介によるじっくり売却もご相談可能。",
        icon: Building2,
        ringColor: "ring-emerald-200",
        iconBg: "from-emerald-100 to-emerald-50",
        iconText: "text-emerald-600",
        cx: 840,
    },
] as const;

export default function FlowSection() {
    return (
        <section
            id="flow"
            className="relative overflow-hidden bg-gradient-to-b from-secondary via-white to-secondary py-16 md:py-24"
        >
            <div className="container relative mx-auto px-4">
                {/* セクション見出し */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-3 text-center"
                >
                    <span className="section-eyebrow">OUR FLOW</span>
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mx-auto max-w-3xl text-center text-2xl font-bold leading-tight tracking-tight text-foreground md:text-4xl"
                >
                    複数業者を渡り歩かなくても、
                    <br />
                    <span className="bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                        実家じまいが、家じまい.comひとつで完結。
                    </span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-muted-foreground md:text-lg"
                >
                    「ご相談 → 遺品整理 → 不動産買取」を、
                    みんなのいえ株式会社が自社で一気通貫。お客様は窓口ひとつで、何度も同じ説明を繰り返す必要がありません。
                </motion.p>

                {/* フロー図ボックス */}
                <div className="relative mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-rose-50/40 via-amber-50/40 to-emerald-50/40 px-4 py-10 shadow-sm md:px-12 md:py-16">
                    {/* 背景装飾の星 */}
                    <DecorativeStars />

                    {/* デスクトップ：SVGの弧 + 3列レイアウト */}
                    <div className="hidden md:block">
                        <FlowArcs />
                        <div className="relative grid grid-cols-3 gap-6">
                            {STEPS.map((step, i) => (
                                <FlowStep key={step.title} step={step} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* モバイル：縦並び + 縦線 */}
                    <div className="md:hidden">
                        <div className="relative flex flex-col gap-8">
                            {STEPS.map((step, i) => (
                                <FlowStepMobile
                                    key={step.title}
                                    step={step}
                                    index={i}
                                    isLast={i === STEPS.length - 1}
                                />
                            ))}
                        </div>
                    </div>

                    {/* 下部キャプション */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1.5 }}
                        className="mt-10 text-center text-xs text-muted-foreground md:mt-12 md:text-sm"
                    >
                        ご相談 → 自社施工 → 自社買取 の一気通貫ネットワーク
                    </motion.p>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex justify-center md:mt-12"
                >
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="h-14 bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90 sm:px-10"
                        >
                            まずは無料相談で全体像を整理する
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

function FlowArcs() {
    return (
        <svg
            viewBox="0 0 1000 220"
            className="pointer-events-none absolute left-0 top-12 w-full"
            aria-hidden
        >
            <defs>
                <linearGradient id="flow-grad-1" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.72 0.17 25)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.16 60)" />
                </linearGradient>
                <linearGradient id="flow-grad-2" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="oklch(0.78 0.16 60)" />
                    <stop offset="100%" stopColor="oklch(0.72 0.16 155)" />
                </linearGradient>
            </defs>
            <motion.path
                d="M 160 110 Q 330 -30 500 110"
                fill="none"
                stroke="url(#flow-grad-1)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
            />
            <motion.path
                d="M 500 110 Q 670 -30 840 110"
                fill="none"
                stroke="url(#flow-grad-2)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ duration: 1.4, ease: "easeInOut", delay: 0.6 }}
            />
            {/* 端点の小ドット */}
            {[160, 500, 840].map((cx, i) => (
                <motion.circle
                    key={cx}
                    cx={cx}
                    cy={110}
                    r="5"
                    fill={
                        i === 0
                            ? "oklch(0.72 0.17 25)"
                            : i === 1
                              ? "oklch(0.78 0.16 60)"
                              : "oklch(0.72 0.16 155)"
                    }
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.5,
                        type: "spring",
                        stiffness: 200,
                    }}
                />
            ))}
        </svg>
    );
}

type Step = (typeof STEPS)[number];

function FlowStep({ step, index }: { step: Step; index: number }) {
    const Icon = step.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
            className="relative flex flex-col items-center text-center"
        >
            <span
                className={`mb-4 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${step.tagColor} ${step.tagBg} ${step.tagBorder}`}
            >
                <Sparkles className="h-3 w-3" />
                {step.tag}
            </span>
            <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                className={`mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${step.iconBg} ${step.iconText} shadow-lg ring-4 ${step.ringColor}`}
            >
                <Icon className="h-12 w-12" strokeWidth={1.6} />
            </motion.div>
            <h3 className="text-xl font-bold text-foreground md:text-2xl">
                {step.title}
            </h3>
            <p className={`mt-1 text-sm font-semibold ${step.tagColor}`}>
                {step.sub}
            </p>
            <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
                {step.body}
            </p>
        </motion.div>
    );
}

function FlowStepMobile({
    step,
    index,
    isLast,
}: {
    step: Step;
    index: number;
    isLast: boolean;
}) {
    const Icon = step.icon;
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="relative flex gap-4"
        >
            {/* 左：アイコン + 縦線 */}
            <div className="flex flex-col items-center">
                <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.iconBg} ${step.iconText} shadow-md ring-2 ${step.ringColor}`}
                >
                    <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                {!isLast && (
                    <div className="mt-2 h-full w-0.5 border-l-2 border-dashed border-border" />
                )}
            </div>
            {/* 右：テキスト */}
            <div className="flex-1 pb-2">
                <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${step.tagColor} ${step.tagBg} ${step.tagBorder}`}
                >
                    {step.tag}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground">
                    {step.title}
                </h3>
                <p className={`text-xs font-semibold ${step.tagColor}`}>
                    {step.sub}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                </p>
            </div>
        </motion.div>
    );
}

function DecorativeStars() {
    const stars = [
        { top: "10%", left: "12%", delay: 0 },
        { top: "20%", left: "48%", delay: 0.4 },
        { top: "15%", right: "12%", delay: 0.8 },
        { bottom: "20%", left: "30%", delay: 0.2 },
        { bottom: "25%", right: "28%", delay: 0.6 },
    ];
    return (
        <>
            {stars.map((s, i) => (
                <motion.div
                    key={i}
                    aria-hidden
                    style={s as React.CSSProperties}
                    className="absolute hidden md:block"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{
                        opacity: [0, 1, 0.6],
                        scale: [0, 1.2, 1],
                    }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1.4,
                        delay: 0.8 + s.delay,
                        ease: "easeOut",
                    }}
                >
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                </motion.div>
            ))}
        </>
    );
}
