"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_BADGES = [
    { icon: MapPin, label: "埼玉県全域対応" },
    { icon: Sparkles, label: "遺品整理 × 不動産買取をワンストップ" },
    { icon: ShieldCheck, label: "ご相談・お見積もり無料" },
];

const fadeUp = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
};

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)]">
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
                className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -right-24 -top-20 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative mx-auto px-4 py-16 md:py-24 lg:py-28">
                <div className="mx-auto max-w-4xl text-center text-white">
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.5 }}
                        className="mb-6 flex flex-wrap justify-center gap-2"
                    >
                        {TRUST_BADGES.map(({ icon: Icon, label }) => (
                            <span
                                key={label}
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm md:text-sm"
                            >
                                <Icon className="h-3.5 w-3.5 text-accent" />
                                {label}
                            </span>
                        ))}
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl font-bold leading-[1.25] tracking-tight md:text-5xl lg:text-6xl"
                    >
                        埼玉県の<span className="text-accent">実家じまい</span>を、
                        <br />
                        <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">
                            遺品整理から不動産買取まで
                        </span>
                        <br />
                        ワンストップで。
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
                    >
                        親が亡くなった、施設に入った——
                        <br className="md:hidden" />
                        その後の「実家どうしよう」を、
                        <br className="md:hidden" />
                        <span className="font-semibold text-white">
                            朝霞市拠点のみんなのいえ株式会社
                        </span>
                        が、自社で最後まで責任を持ってお手伝いします。
                    </motion.p>

                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                    >
                        <Link href="/contact" className="sm:inline-block">
                            <Button
                                size="lg"
                                className="h-14 w-full bg-accent text-base font-bold text-accent-foreground shadow-xl shadow-accent/30 transition-transform hover:scale-[1.02] hover:bg-accent/90 sm:w-auto sm:px-10"
                            >
                                無料で個別相談する
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <Link href="#flow" className="sm:inline-block">
                            <Button
                                size="lg"
                                variant="outline"
                                className="h-14 w-full border-white/30 bg-white/10 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto sm:px-8"
                            >
                                解決の流れを見る
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-8 text-white/80"
                    >
                        <Stat value="100%" label="埼玉県内対応" />
                        <Stat value="2,000+" label="ご相談実績" />
                        <Stat value="24h" label="折り返し連絡" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function Stat({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-center">
            <div className="text-2xl font-bold text-accent md:text-3xl">{value}</div>
            <div className="mt-1 text-xs text-white/70 md:text-sm">{label}</div>
        </div>
    );
}
