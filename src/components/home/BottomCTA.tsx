"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ASSURANCES = [
    "ご相談・お見積もり 完全無料",
    "しつこい営業 一切なし",
    "24時間以内に折り返し連絡",
];

export default function BottomCTA() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)] py-16 md:py-24">
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            <motion.div
                aria-hidden
                className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
                animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
                animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative mx-auto px-4 text-center text-white">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto max-w-3xl text-2xl font-bold leading-tight tracking-tight md:text-4xl"
                >
                    実家じまい、
                    <br className="md:hidden" />
                    まずは <span className="text-accent">無料相談</span> から。
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
                >
                    お話を伺った上で、お客様にとっての選択肢を整理します。
                    「まだ何も決まっていない」段階のご相談こそ、お気軽にどうぞ。
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-9 flex justify-center"
                >
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="h-16 bg-accent px-10 text-lg font-bold text-accent-foreground shadow-2xl shadow-accent/40 transition-transform hover:scale-[1.03] hover:bg-accent/90 sm:px-14"
                        >
                            無料で個別相談を申し込む
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/80"
                >
                    {ASSURANCES.map((a) => (
                        <span key={a} className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-accent" />
                            {a}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
