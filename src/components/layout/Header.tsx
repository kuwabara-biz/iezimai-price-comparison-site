"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                        <Home className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                        <span className="text-lg font-bold text-primary">家じまい.com</span>
                        <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">
                            埼玉・北関東の遺品整理
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden items-center gap-6 md:flex">
                    <Link
                        href="/#search"
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                        エリアから探す
                    </Link>
                    <Link
                        href="/#flow"
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                        利用の流れ
                    </Link>
                    <Link
                        href="/#about"
                        className="text-sm font-medium text-foreground transition-colors hover:text-accent"
                    >
                        家じまいとは
                    </Link>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link href="/#cta">無料で一括査定</Link>
                    </Button>
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
                    <nav className="flex flex-col gap-3">
                        <Link
                            href="/#search"
                            className="text-sm font-medium text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            エリアから探す
                        </Link>
                        <Link
                            href="/#flow"
                            className="text-sm font-medium text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            利用の流れ
                        </Link>
                        <Link
                            href="/#about"
                            className="text-sm font-medium text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            家じまいとは
                        </Link>
                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                            <Link href="/#cta">無料で一括査定</Link>
                        </Button>
                    </nav>
                </div>
            )}
        </header>
    );
}
