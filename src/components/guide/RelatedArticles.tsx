"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Lock } from "lucide-react";
import type { GuideArticle } from "@/lib/guide";
import { getGuideIcon } from "./icon-map";

interface Props {
    articles: GuideArticle[];
    heading?: string;
}

export default function RelatedArticles({
    articles,
    heading = "あわせて読みたい",
}: Props) {
    return (
        <section className="bg-secondary/50 py-14 md:py-20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 flex items-baseline justify-between">
                        <div>
                            <p className="section-eyebrow">RELATED</p>
                            <h2 className="mt-1 section-title">{heading}</h2>
                        </div>
                        <Link
                            href="/guide"
                            className="hidden text-sm font-semibold text-accent hover:underline md:inline-flex"
                        >
                            ガイド一覧へ <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((a, i) => {
                            const Icon = getGuideIcon(a.iconKey);
                            const card = (
                                <motion.div
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{ duration: 0.4, delay: i * 0.05 }}
                                    className={`group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all ${
                                        a.available
                                            ? "hover:-translate-y-0.5 hover:shadow-lg"
                                            : "opacity-70"
                                    }`}
                                >
                                    <div className="mb-3 flex items-center justify-between gap-2">
                                        <span
                                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${a.badgeColor}`}
                                        >
                                            {a.badge}
                                        </span>
                                        {!a.available && (
                                            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                                                <Lock className="h-3 w-3" />
                                                準備中
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-accent">
                                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                                    </div>
                                    <h3 className="text-base font-bold text-foreground group-hover:text-accent">
                                        {a.shortTitle}
                                    </h3>
                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                                        {a.description}
                                    </p>
                                    {a.available && (
                                        <span className="mt-4 inline-flex items-center text-sm font-semibold text-accent">
                                            記事を読む
                                            <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    )}
                                </motion.div>
                            );

                            return (
                                <li key={a.slug}>
                                    {a.available ? (
                                        <Link href={a.href} className="block h-full">
                                            {card}
                                        </Link>
                                    ) : (
                                        <div className="h-full cursor-not-allowed">{card}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
}
