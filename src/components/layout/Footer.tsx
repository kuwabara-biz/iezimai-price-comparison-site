import Link from "next/link";
import { Home } from "lucide-react";
import { SITE, COMPANY } from "@/lib/constants";

export function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-border bg-gradient-to-br from-primary to-[oklch(0.18_0.07_255)] text-primary-foreground">
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
                            <p>所在地：{COMPANY.address}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
                            サービス
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/#service"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    遺品整理
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#service"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    不動産買取
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#flow"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    ご相談の流れ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#pricing"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    料金の目安
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
                            サイト情報
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/#cases"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    事例
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#area"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    対応エリア
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#faq"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    よくあるご質問
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    無料相談フォーム
                                </Link>
                            </li>
                        </ul>
                    </div>

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
                                    会社案内
                                </Link>
                            </li>
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
