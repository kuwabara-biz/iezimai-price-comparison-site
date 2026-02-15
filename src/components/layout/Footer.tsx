import Link from "next/link";
import { Home } from "lucide-react";
import { mockAreas } from "@/lib/mock-data";

export function Footer() {
    const saitamaAreas = mockAreas
        .filter((a) => a.parent_region === "saitama" && a.slug !== "saitama-other")
        .sort((a, b) => a.order_index - b.order_index)
        .slice(0, 10);
    const northKantoAreas = mockAreas.filter(
        (a) => a.parent_region === "north-kanto"
    );

    return (
        <footer className="border-t border-border bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                                <Home className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <span className="text-lg font-bold">家じまい.com</span>
                        </Link>
                        <p className="mt-3 text-sm text-primary-foreground/70">
                            埼玉・北関東エリアに特化した
                            <br />
                            遺品整理業者比較＆空き家解決サイト
                        </p>
                    </div>

                    {/* 埼玉エリア */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-accent">
                            埼玉県の対応エリア
                        </h3>
                        <ul className="space-y-1.5">
                            {saitamaAreas.map((area) => (
                                <li key={area.slug}>
                                    <Link
                                        href={`/area/${area.slug}`}
                                        className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                    >
                                        {area.name}の遺品整理
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 北関東エリア */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-accent">
                            北関東の対応エリア
                        </h3>
                        <ul className="space-y-1.5">
                            {northKantoAreas.map((area) => (
                                <li key={area.slug}>
                                    <Link
                                        href={`/area/${area.slug}`}
                                        className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                    >
                                        {area.name}の遺品整理
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* サービス */}
                    <div>
                        <h3 className="mb-3 text-sm font-semibold text-accent">
                            サービス
                        </h3>
                        <ul className="space-y-1.5">
                            <li>
                                <Link
                                    href="/#search"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    エリアから業者を探す
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#cta"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    無料一括査定
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#flow"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    ご利用の流れ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    運営管理画面
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
                    <p>© 2026 家じまい.com All rights reserved.</p>
                    <p className="mt-1">埼玉・北関東の遺品整理・空き家買取プラットフォーム</p>
                </div>
            </div>
        </footer>
    );
}
