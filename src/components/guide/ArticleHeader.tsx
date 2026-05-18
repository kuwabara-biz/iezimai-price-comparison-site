"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, ChevronRight } from "lucide-react";
import type { GuideArticle } from "@/lib/guide";
import { getGuideIcon } from "./icon-map";

interface Props {
    article: GuideArticle;
    lead: string;
    updatedAt?: string;
}

export default function ArticleHeader({ article, lead, updatedAt }: Props) {
    const Icon = getGuideIcon(article.iconKey);
    return (
        <header className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)] py-14 text-white md:py-20">
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            <motion.div
                aria-hidden
                className="absolute -right-32 top-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
                animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="container relative mx-auto px-4">
                <nav
                    aria-label="パンくず"
                    className="mb-5 flex flex-wrap items-center gap-1 text-xs text-white/70 md:text-sm"
                >
                    <Link href="/" className="hover:text-accent">
                        ホーム
                    </Link>
                    <ChevronRight className="h-3 w-3" />
                    <Link href="/guide" className="hover:text-accent">
                        実家じまい完全ガイド
                    </Link>
                    {article.slug !== "jikkajimai" && (
                        <>
                            <ChevronRight className="h-3 w-3" />
                            <span className="text-white/90">{article.shortTitle}</span>
                        </>
                    )}
                </nav>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-4xl"
                >
                    <div className="mb-5 flex flex-wrap items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wider ${article.badgeColor}`}
                        >
                            <Icon className="h-3.5 w-3.5" />
                            {article.badge}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                            <Clock className="h-3 w-3" />
                            読了 約 {article.readingMinutes} 分
                        </span>
                        {updatedAt && (
                            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/85 backdrop-blur-sm">
                                {updatedAt} 更新
                            </span>
                        )}
                    </div>

                    <h1 className="text-2xl font-bold leading-[1.3] tracking-tight md:text-4xl lg:text-[2.6rem]">
                        {article.title}
                    </h1>

                    <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
                        {lead}
                    </p>
                </motion.div>
            </div>
        </header>
    );
}
