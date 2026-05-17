"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { HOME_FAQ_ITEMS } from "./faq-data";

export default function FAQSection() {
    return (
        <section id="faq" className="bg-secondary py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center md:mb-16"
                >
                    <span className="section-eyebrow">FAQ</span>
                    <h2 className="mt-2 section-title">よくあるご質問</h2>
                </motion.div>

                <div className="mx-auto max-w-3xl space-y-3">
                    {HOME_FAQ_ITEMS.map((item, i) => (
                        <motion.details
                            key={item.q}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.35, delay: i * 0.04 }}
                            className="group rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md md:px-6"
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold text-foreground [&::-webkit-details-marker]:hidden">
                                <span className="flex-1 leading-relaxed">
                                    <span className="mr-2 font-bold text-accent">
                                        Q{i + 1}.
                                    </span>
                                    {item.q}
                                </span>
                                <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                            </summary>
                            <div className="mt-4 border-t border-border pt-4 text-base leading-relaxed text-muted-foreground">
                                <span className="mr-2 font-bold text-accent">A.</span>
                                {item.a}
                            </div>
                        </motion.details>
                    ))}
                </div>
            </div>
        </section>
    );
}
