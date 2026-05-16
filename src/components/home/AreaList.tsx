import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { Area, Vendor } from "@/lib/database.types";

// 重点エリア（朝霞市・志木市・新座市・和光市）
const PRIORITY_SLUGS = ["asaka-shi", "shiki-shi", "niiza-shi", "wako-shi"];

interface Props {
    areas: Area[];
    vendors: Vendor[];
}

export default function AreaList({ areas, vendors }: Props) {
    const saitamaAreas = areas.filter((a) => a.parent_region === "saitama");
    const priorityAreas = saitamaAreas.filter((a) => PRIORITY_SLUGS.includes(a.slug));
    const otherAreas = saitamaAreas.filter((a) => !PRIORITY_SLUGS.includes(a.slug));

    const countFor = (slug: string) =>
        vendors.filter((v) => v.service_areas?.includes(slug)).length;

    const renderTile = (area: Area, accent = false) => {
        const count = countFor(area.slug);
        return (
            <Link
                key={area.slug}
                href={`/area/${area.slug}`}
                className={`group flex min-h-11 items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2.5 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-md ${
                    accent
                        ? "border-accent/30 text-foreground hover:text-accent"
                        : "border-border text-foreground hover:text-accent"
                }`}
            >
                <span className="flex items-center gap-1.5">
                    <MapPin className={`h-3.5 w-3.5 shrink-0 ${accent ? "text-accent" : "text-muted-foreground"}`} />
                    {area.name}
                </span>
                {count > 0 && (
                    <span className="ml-2 inline-flex shrink-0 items-center rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold tabular-nums text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent">
                        {count}社
                    </span>
                )}
            </Link>
        );
    };

    return (
        <section id="search" className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 text-center md:mb-10">
                        <span className="section-eyebrow">AREA</span>
                        <h2 className="mt-2 section-title">埼玉県のエリアから探す</h2>
                        <p className="section-subtitle">
                            埼玉県内の市町村別に対応業者をご覧いただけます
                        </p>
                    </div>

                    {/* 重点エリア */}
                    {priorityAreas.length > 0 && (
                        <div className="mb-6 rounded-2xl border border-accent/20 bg-accent/5 p-5 md:p-6">
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-accent-foreground">
                                    重点
                                </span>
                                <span className="text-sm font-bold text-foreground">
                                    朝霞市・志木市・新座市・和光市（重点エリア）
                                </span>
                            </div>
                            <p className="mb-4 text-xs text-muted-foreground">
                                代表が朝霞市拠点のため、特に密接にサポートできるエリアです。
                            </p>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                {priorityAreas.map((a) => renderTile(a, true))}
                            </div>
                        </div>
                    )}

                    {/* その他の埼玉県内エリア */}
                    {otherAreas.length > 0 && (
                        <div className="rounded-2xl border border-border bg-white p-5 md:p-6">
                            <h3 className="mb-4 text-sm font-bold text-foreground">
                                埼玉県内のその他のエリア
                            </h3>
                            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
                                {otherAreas.map((a) => renderTile(a))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <div className="mt-6 rounded-xl border border-dashed border-accent/30 bg-accent/5 px-5 py-4 text-center">
                        <p className="text-sm text-foreground">
                            お探しのエリアが見つからない場合も、
                            <Link
                                href="/contact"
                                className="ml-1 inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                            >
                                お問い合わせください
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
