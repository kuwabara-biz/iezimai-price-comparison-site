"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
    { href: "/#search", label: "エリアから探す" },
    { href: "/#flow", label: "利用の流れ" },
    { href: "/#about", label: "家じまいとは" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] shadow-sm">
                        <Home className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold tracking-tight text-primary">家じまい.com</span>
                        <span className="hidden text-xs text-muted-foreground sm:inline">
                            埼玉・北関東の遺品整理
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-accent"
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

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="メニュー"
                >
                    {mobileMenuOpen ? (
                        <X className="h-6 w-6 text-foreground" />
                    ) : (
                        <Menu className="h-6 w-6 text-foreground" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-border bg-white px-4 py-4 md:hidden">
                    <nav className="flex flex-col gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="rounded-md px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
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
                            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                無料相談フォームへ
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
