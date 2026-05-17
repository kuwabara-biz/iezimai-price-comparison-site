"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "lucide-react";
import { HOME_SECTIONS } from "@/lib/constants";

export default function TableOfContents() {
    const [active, setActive] = useState<string>(HOME_SECTIONS[0].id);
    const [open, setOpen] = useState(true);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const targets = HOME_SECTIONS.map((s) =>
            document.getElementById(s.id)
        ).filter((el): el is HTMLElement => el !== null);

        if (targets.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const inView = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (inView[0]) setActive(inView[0].target.id);
            },
            { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
        );

        targets.forEach((el) => observer.observe(el));

        const onScroll = () => {
            setVisible(window.scrollY > 600);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const activeIndex = HOME_SECTIONS.findIndex((s) => s.id === active);
    const progress = ((activeIndex + 1) / HOME_SECTIONS.length) * 100;

    return (
        <AnimatePresence>
            {visible && (
                <motion.aside
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none fixed bottom-6 right-4 z-40 hidden lg:bottom-10 lg:right-8 lg:block"
                >
                    <div className="pointer-events-auto w-64 overflow-hidden rounded-2xl border border-border bg-white/95 shadow-2xl backdrop-blur-md">
                        <button
                            type="button"
                            onClick={() => setOpen((v) => !v)}
                            className="flex w-full items-center justify-between border-b border-border bg-secondary/30 px-4 py-2.5 text-xs font-bold tracking-widest text-foreground"
                            aria-label={open ? "目次を閉じる" : "目次を開く"}
                        >
                            <span className="inline-flex items-center gap-1.5">
                                <List className="h-3.5 w-3.5 text-accent" />
                                CONTENTS
                            </span>
                            {open ? (
                                <X className="h-3.5 w-3.5 text-muted-foreground" />
                            ) : (
                                <span className="text-[10px] text-muted-foreground">
                                    開く
                                </span>
                            )}
                        </button>

                        {/* プログレスバー */}
                        <div className="relative h-1 bg-border">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-600"
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>

                        <AnimatePresence initial={false}>
                            {open && (
                                <motion.ol
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="overflow-hidden py-2"
                                >
                                    {HOME_SECTIONS.map((s, i) => {
                                        const isActive = s.id === active;
                                        return (
                                            <li key={s.id}>
                                                <a
                                                    href={`#${s.id}`}
                                                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                                        isActive
                                                            ? "bg-accent/10 font-bold text-foreground"
                                                            : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                                    }`}
                                                >
                                                    <span
                                                        className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold tabular-nums ${
                                                            isActive
                                                                ? "bg-accent text-accent-foreground"
                                                                : "bg-secondary text-muted-foreground"
                                                        }`}
                                                    >
                                                        {String(i + 1).padStart(2, "0")}
                                                    </span>
                                                    <span className="truncate">{s.label}</span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </motion.ol>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
