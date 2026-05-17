"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";

const IHIN_PLANS = [
    { layout: "1R / 1K", price: "33,000円〜", time: "半日〜1日", crew: "1〜2名" },
    { layout: "1DK / 1LDK", price: "55,000円〜", time: "1日", crew: "2名" },
    { layout: "2DK / 2LDK", price: "99,000円〜", time: "1〜2日", crew: "2〜3名" },
    { layout: "3DK / 3LDK", price: "165,000円〜", time: "2日", crew: "3〜4名" },
    { layout: "4LDK以上 / 戸建て", price: "220,000円〜", time: "2〜3日", crew: "4名〜" },
] as const;

const REAL_ESTATE_NOTE = [
    { label: "買取査定", value: "無料・最短当日" },
    { label: "現金化までの期間", value: "最短2週間" },
    { label: "対応物件", value: "戸建て・マンション・土地・古家" },
    { label: "対応エリア", value: "埼玉県全域" },
] as const;

export default function PricingSection() {
    return (
        <section id="pricing" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">PRICING</span>
                    <h2 className="mt-2 section-title">料金の目安</h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        正確なお見積りは現地調査後にご提示します。下記はあくまで「目安」としてご参考ください。
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2 lg:gap-8">
                    {/* 遺品整理料金表 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                    >
                        <div className="bg-gradient-to-r from-amber-500 to-rose-500 px-6 py-4 text-white">
                            <p className="text-xs font-bold tracking-widest opacity-90">
                                SERVICE 01
                            </p>
                            <h3 className="mt-1 text-xl font-bold md:text-2xl">
                                遺品整理 料金目安
                            </h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm md:text-base">
                                <thead className="bg-secondary/60 text-foreground">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            間取り
                                        </th>
                                        <th className="px-4 py-3 text-left font-semibold">
                                            料金
                                        </th>
                                        <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">
                                            作業時間
                                        </th>
                                        <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">
                                            スタッフ
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {IHIN_PLANS.map((p) => (
                                        <tr
                                            key={p.layout}
                                            className="transition-colors hover:bg-amber-50/30"
                                        >
                                            <td className="px-4 py-3 font-semibold text-foreground">
                                                {p.layout}
                                            </td>
                                            <td className="px-4 py-3 font-bold text-amber-600">
                                                {p.price}
                                            </td>
                                            <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                                                {p.time}
                                            </td>
                                            <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                                                {p.crew}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="border-t border-border bg-secondary/30 px-6 py-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
                            ※ 上記は税込目安です。物量・搬出経路・特殊清掃の有無により変動します。買取可能な品はその場で査定し、料金から差し引きます。
                        </div>
                    </motion.div>

                    {/* 不動産買取 概要 */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm"
                    >
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-white">
                            <p className="text-xs font-bold tracking-widest opacity-90">
                                SERVICE 02
                            </p>
                            <h3 className="mt-1 text-xl font-bold md:text-2xl">
                                不動産買取 概要
                            </h3>
                        </div>
                        <div className="space-y-0 px-6 py-2">
                            {REAL_ESTATE_NOTE.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-1 border-b border-border/60 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                                >
                                    <span className="text-sm font-semibold text-foreground md:text-base">
                                        {item.label}
                                    </span>
                                    <span className="text-base font-bold text-emerald-600 md:text-lg">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-border bg-secondary/30 px-6 py-4 text-xs leading-relaxed text-muted-foreground md:text-sm">
                            <span className="inline-flex items-start gap-1.5">
                                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                                <span>
                                    査定額は物件状況・市況により変動。仲介・買取どちらも選択可能。査定のみのご依頼も歓迎です。
                                </span>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
