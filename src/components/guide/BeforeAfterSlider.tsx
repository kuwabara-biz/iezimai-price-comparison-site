"use client";

import { useRef, useState } from "react";
import { motion } from "motion/react";
import { GripVertical } from "lucide-react";

interface Props {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
    caption?: string;
    /** 実写真がない場合に表示するプレースホルダのテキスト */
    placeholder?: { before: string; after: string };
}

export default function BeforeAfterSlider({
    before,
    after,
    beforeLabel = "BEFORE",
    afterLabel = "AFTER",
    caption,
    placeholder,
}: Props) {
    const [position, setPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const draggingRef = useRef(false);

    const handlePointer = (clientX: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = clientX - rect.left;
        const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(pct);
    };

    return (
        <figure className="my-10 overflow-hidden rounded-3xl border border-border bg-white shadow-md">
            <div
                ref={containerRef}
                className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden bg-secondary"
                onMouseDown={(e) => {
                    draggingRef.current = true;
                    handlePointer(e.clientX);
                }}
                onMouseMove={(e) => {
                    if (draggingRef.current) handlePointer(e.clientX);
                }}
                onMouseUp={() => (draggingRef.current = false)}
                onMouseLeave={() => (draggingRef.current = false)}
                onTouchStart={(e) => {
                    draggingRef.current = true;
                    handlePointer(e.touches[0].clientX);
                }}
                onTouchMove={(e) => handlePointer(e.touches[0].clientX)}
                onTouchEnd={() => (draggingRef.current = false)}
            >
                {/* AFTER 画像（背面） */}
                {placeholder ? (
                    <PlaceholderImage label={afterLabel} text={placeholder.after} variant="after" />
                ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={after}
                        alt={afterLabel}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                )}

                {/* BEFORE 画像（前面・クリップ） */}
                <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                >
                    {placeholder ? (
                        <PlaceholderImage
                            label={beforeLabel}
                            text={placeholder.before}
                            variant="before"
                        />
                    ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={before}
                            alt={beforeLabel}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    )}
                </div>

                {/* スライダー線 + ハンドル */}
                <div
                    className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.2)]"
                    style={{ left: `${position}%` }}
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center rounded-full bg-white text-foreground shadow-lg ring-2 ring-accent active:cursor-grabbing"
                    >
                        <GripVertical className="h-5 w-5" />
                    </motion.div>
                </div>

                {/* ラベル */}
                <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow">
                    {beforeLabel}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white shadow">
                    {afterLabel}
                </span>
            </div>
            {caption && (
                <figcaption className="border-t border-border bg-secondary/30 px-5 py-3 text-xs text-muted-foreground md:text-sm">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

function PlaceholderImage({
    label,
    text,
    variant,
}: {
    label: string;
    text: string;
    variant: "before" | "after";
}) {
    return (
        <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center ${
                variant === "before"
                    ? "bg-gradient-to-br from-stone-300 via-stone-200 to-amber-100/40"
                    : "bg-gradient-to-br from-emerald-100 via-emerald-50 to-sky-100"
            }`}
        >
            <div
                aria-hidden
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        variant === "before"
                            ? "repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 6px, transparent 6px 16px)"
                            : "radial-gradient(circle at 30% 30%, rgba(16,185,129,0.18) 0 4px, transparent 4px)",
                    backgroundSize: variant === "before" ? "20px 20px" : "32px 32px",
                }}
            />
            <p className="relative z-10 text-3xl font-bold text-foreground/80 md:text-5xl">
                {label}
            </p>
            <p className="relative z-10 mt-3 max-w-xs text-xs leading-snug text-foreground/70 md:text-sm">
                {text}
            </p>
        </div>
    );
}
