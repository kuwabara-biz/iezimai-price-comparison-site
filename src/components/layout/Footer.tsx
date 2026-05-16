import Link from "next/link";
import { Home } from "lucide-react";
import { SITE, COMPANY } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border bg-gradient-to-br from-primary to-[oklch(0.18_0.07_255)] text-primary-foreground">
            {/* 背景装飾 */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "32px 32px",
                }}
            />
            <div
                aria-hidden
                className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* 列1: サイト情報 */}
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent shadow-sm">
                                <Home className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">家じまい.com</span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                            {SITE.tagline}
                        </p>
                        <div className="mt-4 space-y-1.5 text-sm text-primary-foreground/70">
                            <p>運営：{COMPANY.name}</p>
                            <p>所在地：埼玉県朝霞市</p>
                            <p className="text-xs text-primary-foreground/50">
                                ※ 詳細は会社概要をご覧ください
                            </p>
                        </div>
                    </div>

                    {/* 列2: サービス */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
                            サービス
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    無料個別相談
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#vendors"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    遺品整理業者を探す
                                </Link>
                            </li>
                            {/* TODO: /flow ページ作成後にリンクを有効化 */}
                            {/*
                            <li>
                                <Link href="/flow" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                                    ご利用の流れ
                                </Link>
                            </li>
                            */}
                            {/* TODO: /faq ページ作成後にリンクを有効化 */}
                            {/*
                            <li>
                                <Link href="/faq" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                                    よくあるご質問
                                </Link>
                            </li>
                            */}
                        </ul>
                    </div>

                    {/* 列3: 家じまいを学ぶ */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
                            家じまいを学ぶ
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/#about"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    家じまいとは
                                </Link>
                            </li>
                            <li>
                                <span className="text-sm text-primary-foreground/40">
                                    相続不動産について（準備中）
                                </span>
                            </li>
                            <li>
                                <span className="text-sm text-primary-foreground/40">
                                    終活について（準備中）
                                </span>
                            </li>
                            <li>
                                <span className="text-sm text-primary-foreground/40">
                                    埼玉県の家じまい事情（準備中）
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* 列4: 会社情報 */}
                    <div>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
                            会社情報
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    サービス案内
                                </Link>
                            </li>
                            {/* TODO: /company ページ作成後にリンクを有効化 */}
                            {/*
                            <li>
                                <Link href="/company" className="text-sm text-primary-foreground/70 transition-colors hover:text-accent">
                                    会社概要
                                </Link>
                            </li>
                            */}
                            <li>
                                <Link
                                    href="/legal/privacy"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    個人情報保護方針
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/legal/tokushou"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    特定商取引法に基づく表記
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 md:flex-row">
                    <p>© 2026 家じまい.com（{COMPANY.name}）All rights reserved.</p>
                    <p>{SITE.tagline}</p>
                </div>
            </div>
        </footer>
    );
}
