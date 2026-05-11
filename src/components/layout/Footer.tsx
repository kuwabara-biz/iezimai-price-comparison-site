import Link from "next/link";
import { Home, MapPin, Mail, ArrowRight } from "lucide-react";
import { getAreas } from "@/lib/supabase-helpers";

export async function Footer() {
    let areas: Awaited<ReturnType<typeof getAreas>> = [];
    try {
        areas = await getAreas();
    } catch {
        areas = [];
    }

    const saitamaAreas = areas
        .filter((a) => a.parent_region === "saitama")
        .slice(0, 10);
    const northKantoAreas = areas.filter((a) => a.parent_region === "north-kanto");

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
                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent shadow-sm">
                                <Home className="h-4 w-4 text-accent-foreground" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">家じまい.com</span>
                        </Link>
                        <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                            埼玉・北関東エリアに特化した遺品整理業者比較＆空き家解決サイト
                        </p>
                        <Link href="/contact">
                            <div className="mt-4 inline-flex items-center gap-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90">
                                <Mail className="h-3.5 w-3.5" />
                                無料相談する
                                <ArrowRight className="h-3.5 w-3.5" />
                            </div>
                        </Link>
                    </div>

                    {/* 埼玉エリア */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest text-accent">
                            <MapPin className="h-3 w-3" />
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
                            {areas.filter((a) => a.parent_region === "saitama").length > 10 && (
                                <li>
                                    <Link
                                        href="/#search"
                                        className="text-sm font-semibold text-accent hover:underline"
                                    >
                                        全エリアを見る →
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* 北関東エリア */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-1.5 text-xs font-bold tracking-widest text-accent">
                            <MapPin className="h-3 w-3" />
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
                        <h3 className="mb-3 text-xs font-bold tracking-widest text-accent">
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
                                    href="/contact"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    無料一括相談
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
                                    href="/#about"
                                    className="text-sm text-primary-foreground/70 transition-colors hover:text-accent"
                                >
                                    家じまいとは？
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/60 md:flex-row">
                    <p>© 2026 家じまい.com All rights reserved.</p>
                    <p>埼玉・北関東の遺品整理・空き家買取プラットフォーム</p>
                </div>
            </div>
        </footer>
    );
}
