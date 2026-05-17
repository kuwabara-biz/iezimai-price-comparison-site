"use client";

import { motion } from "motion/react";
import { MapPin } from "lucide-react";

const PRIORITY_CITIES = ["朝霞市", "志木市", "新座市", "和光市"] as const;

const CITY_GROUPS = [
    {
        label: "県南西部",
        cities: [
            "さいたま市",
            "川越市",
            "所沢市",
            "戸田市",
            "蕨市",
            "富士見市",
            "ふじみ野市",
            "狭山市",
            "入間市",
        ],
    },
    {
        label: "県東部",
        cities: [
            "川口市",
            "越谷市",
            "草加市",
            "三郷市",
            "八潮市",
            "春日部市",
            "吉川市",
        ],
    },
    {
        label: "県央・北部",
        cities: [
            "上尾市",
            "桶川市",
            "北本市",
            "鴻巣市",
            "熊谷市",
            "深谷市",
            "本庄市",
            "行田市",
            "久喜市",
            "加須市",
        ],
    },
    {
        label: "県西部",
        cities: ["飯能市", "日高市", "坂戸市", "鶴ヶ島市", "東松山市", "秩父市"],
    },
] as const;

export default function AreaSection() {
    return (
        <section id="area" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">SERVICE AREA</span>
                    <h2 className="mt-2 section-title">対応エリア</h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        朝霞市の本社拠点から、埼玉県全域にお伺いします。
                    </p>
                </motion.div>

                <div className="mx-auto max-w-5xl">
                    {/* 重点エリア */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5 }}
                        className="mb-10 rounded-2xl border-2 border-accent/30 bg-gradient-to-br from-accent/5 to-amber-50 p-6 shadow-sm md:mb-12 md:p-8"
                    >
                        <p className="text-xs font-bold tracking-widest text-accent">
                            FOCUS AREA
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-foreground md:text-xl">
                            重点対応エリア（朝霞・志木・新座・和光）
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                            本社拠点エリア。最短即日のお見積もりに対応。
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {PRIORITY_CITIES.map((c) => (
                                <motion.span
                                    key={c}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-sm"
                                >
                                    <MapPin className="h-3.5 w-3.5" />
                                    {c}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    {/* その他エリア */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {CITY_GROUPS.map((group, gi) => (
                            <motion.div
                                key={group.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.4, delay: gi * 0.08 }}
                                className="rounded-xl border border-border bg-secondary/30 p-5"
                            >
                                <h4 className="mb-3 text-sm font-bold tracking-wide text-foreground">
                                    {group.label}
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {group.cities.map((c) => (
                                        <span
                                            key={c}
                                            className="inline-flex items-center rounded-full border border-border bg-white px-3 py-1 text-xs text-foreground transition-colors hover:border-accent hover:text-accent md:text-sm"
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <p className="mt-6 text-center text-sm text-muted-foreground md:mt-8">
                        ※ 上記以外の埼玉県内の市町村も、お気軽にお問い合わせください。
                    </p>
                </div>
            </div>
        </section>
    );
}
