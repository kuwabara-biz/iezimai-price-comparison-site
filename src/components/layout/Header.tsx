"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
    { href: "/guide", label: "実家じまいガイド" },
    { href: "/#flow", label: "ご相談の流れ" },
    { href: "/#service", label: "サービス" },
    { href: "/#pricing", label: "料金" },
    { href: "/about", label: "会社案内" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link
                    href="/"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] shadow-sm">
                        <Home className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold tracking-tight text-primary">
                            家じまい.com
                        </span>
                        <span className="hidden text-xs text-muted-foreground md:inline">
                            埼玉県の実家じまい総合窓口
                        </span>
                    </div>
                </Link>

                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-accent"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link href="/contact" className="ml-2">
                        <Button
                            size="sm"
                            className="bg-accent text-accent-foreground shadow-sm hover:bg-accent/90"
                        >
                            無料相談
                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </Button>
                    </Link>
                </nav>

                <button
                    className="flex h-11 w-11 items-center justify-center md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
                    aria-expanded={mobileMenuOpen}
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6 text-foreground" />
                    ) : (
                        <Menu className="h-6 w-6 text-foreground" />
                    )}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="border-t border-border bg-white px-4 py-3 md:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex min-h-11 items-center rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="mt-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Button className="min-h-11 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                無料相談
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
