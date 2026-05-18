"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

export interface FaqItem {
    q: string;
    a: ReactNode;
}

interface Props {
    items: FaqItem[];
    id?: string;
}

export default function FaqList({ items, id }: Props) {
    return (
        <div id={id} className="my-8 space-y-3">
            {items.map((item, i) => (
                <motion.details
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md md:px-6"
                >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-bold text-foreground [&::-webkit-details-marker]:hidden">
                        <span className="flex-1 leading-relaxed">
                            <span className="mr-2 font-bold text-accent">Q{i + 1}.</span>
                            {item.q}
                        </span>
                        <ChevronDown className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-4 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                        <span className="mr-2 font-bold text-accent">A.</span>
                        {item.a}
                    </div>
                </motion.details>
            ))}
        </div>
    );
}
