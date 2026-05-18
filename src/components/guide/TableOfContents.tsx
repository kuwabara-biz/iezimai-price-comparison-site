"use client";

import { useEffect, useState } from "react";
import { List } from "lucide-react";

export interface TocItem {
    id: string;
    title: string;
    level?: 2 | 3;
}

interface Props {
    items: TocItem[];
}

export default function TableOfContents({ items }: Props) {
    const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length > 0) {
                    visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
        );
        items.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [items]);

    return (
        <aside className="lg:sticky lg:top-20">
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
                    <List className="h-4 w-4 text-accent" />
                    <span className="text-sm font-bold text-foreground">この記事の目次</span>
                </div>
                <nav>
                    <ul className="space-y-1.5 text-sm">
                        {items.map((item) => {
                            const isActive = item.id === activeId;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`block border-l-2 py-1.5 pl-3 transition-colors ${
                                            item.level === 3 ? "pl-6 text-xs" : ""
                                        } ${
                                            isActive
                                                ? "border-accent font-semibold text-accent"
                                                : "border-transparent text-muted-foreground hover:text-foreground"
                                        }`}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
