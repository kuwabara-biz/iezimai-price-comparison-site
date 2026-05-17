"use client";

import { motion } from "motion/react";
import { Quote, MapPin } from "lucide-react";

const CASES = [
    {
        area: "朝霞市",
        layout: "戸建て 3LDK",
        title: "父他界後、3か月で実家じまい完了",
        body: "「兄妹3人で何度集まっても結論が出ず半年経過。家じまい.comに相談してから3か月で、遺品整理→買取まで完了。窓口がひとつで本当に助かりました。」",
        person: "60代男性・東京在住",
        chip: "遺品整理 + 不動産買取",
        color: "from-rose-500 to-amber-500",
    },
    {
        area: "川越市",
        layout: "マンション 2LDK",
        title: "母の施設入居後、空き家を最短2週間で現金化",
        body: "「介護費用の負担が大きく、急ぎで現金化したい状況。仲介ではなく自社買取という選択肢を提示してもらえたのが決め手でした。」",
        person: "50代女性・川越市在住",
        chip: "不動産買取",
        color: "from-amber-500 to-emerald-500",
    },
    {
        area: "さいたま市",
        layout: "戸建て 4LDK",
        title: "遠方相続、現地に行かず手続き完了",
        body: "「相続した実家が埼玉、私は関西在住。立ち合いは最小限で全工程を進めてもらえて、本当に有り難かったです。」",
        person: "50代男性・大阪在住",
        chip: "遺品整理 + 不動産買取",
        color: "from-emerald-500 to-blue-500",
    },
] as const;

export default function CasesSection() {
    return (
        <section id="cases" className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">CASES</span>
                    <h2 className="mt-2 section-title">埼玉県内の実家じまい事例</h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        実際にご相談いただいたお客様の事例をご紹介します。
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3 md:gap-6">
                    {CASES.map((c, i) => (
                        <motion.article
                            key={c.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div
                                className={`flex items-center justify-between bg-gradient-to-r ${c.color} px-5 py-3 text-white`}
                            >
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {c.area} / {c.layout}
                                </span>
                                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
                                    {c.chip}
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="text-base font-bold leading-snug text-foreground md:text-lg">
                                    {c.title}
                                </h3>
                                <div className="relative mt-4 flex-1 rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed text-muted-foreground">
                                    <Quote
                                        className="absolute -left-1 -top-1 h-5 w-5 text-accent/40"
                                        strokeWidth={2.5}
                                    />
                                    <p className="pl-4">{c.body}</p>
                                </div>
                                <p className="mt-4 text-xs font-semibold text-muted-foreground">
                                    {c.person}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 text-center text-xs text-muted-foreground md:mt-10"
                >
                    ※ プライバシー保護のため、内容を一部編集して掲載しています。
                </motion.p>
            </div>
        </section>
    );
}
