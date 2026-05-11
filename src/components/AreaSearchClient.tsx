'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown, ChevronUp, Building, ArrowRight } from 'lucide-react'
import type { Area, Vendor } from '@/lib/database.types'

interface AreaSearchClientProps {
    areas: Area[]
    vendors?: Vendor[]
}

export default function AreaSearchClient({ areas, vendors = [] }: AreaSearchClientProps) {
    const [saitamaExpanded, setSaitamaExpanded] = useState(false)

    const counts = useMemo(() => {
        const m: Record<string, number> = {}
        for (const a of areas) {
            m[a.slug] = vendors.filter((v) => v.service_areas?.includes(a.name)).length
        }
        return m
    }, [areas, vendors])

    const saitamaAreas = areas.filter((a) => a.parent_region === 'saitama')
    const saitamaMajor = saitamaAreas.slice(0, 6)
    const saitamaRest = saitamaAreas.slice(6)
    const northKantoAreas = areas.filter((a) => a.parent_region === 'north-kanto')

    const renderTile = (area: Area) => {
        const count = counts[area.slug] ?? 0
        return (
            <Link
                key={area.slug}
                href={`/area/${area.slug}`}
                className="group relative flex items-center justify-between overflow-hidden rounded-lg border border-border bg-white px-3 py-2.5 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md"
            >
                <span className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    {area.name}
                </span>
                {count > 0 && (
                    <span className="ml-2 inline-flex shrink-0 items-center rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground tabular-nums group-hover:bg-accent/10 group-hover:text-accent">
                        {count}社
                    </span>
                )}
            </Link>
        )
    }

    return (
        <section id="search" className="bg-secondary py-10 md:py-14">
            <div className="container mx-auto px-4">
                <div className="mb-1 text-center">
                    <span className="section-eyebrow">AREA</span>
                </div>
                <div className="mb-7 text-center">
                    <h2 className="section-title">エリアから業者を探す</h2>
                    <p className="section-subtitle">対応エリアを選んで業者一覧へ</p>
                </div>

                <div className="mx-auto max-w-3xl space-y-5">
                    {/* 埼玉県 */}
                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                        <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-r from-primary to-[oklch(0.22_0.07_255)] px-5 py-4">
                            <div
                                aria-hidden
                                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5"
                            />
                            <div
                                aria-hidden
                                className="absolute -bottom-8 right-12 h-20 w-20 rounded-full bg-accent/10"
                            />
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div className="relative flex-1">
                                <h3 className="text-lg font-bold text-white">埼玉県</h3>
                                <p className="text-xs text-white/70">
                                    {saitamaAreas.length}エリア・全{saitamaAreas.reduce(
                                        (s, a) => s + (counts[a.slug] ?? 0),
                                        0
                                    )}社対応
                                </p>
                            </div>
                            <Building className="relative h-5 w-5 text-white/40" />
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {saitamaMajor.map(renderTile)}
                            </div>
                            {saitamaRest.length > 0 && (
                                <>
                                    {saitamaExpanded && (
                                        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 sm:grid-cols-3">
                                            {saitamaRest.map(renderTile)}
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setSaitamaExpanded(!saitamaExpanded)}
                                        className="mt-4 flex w-full items-center justify-center gap-1 rounded-lg border border-dashed border-accent/40 py-2 text-sm font-semibold text-accent transition-colors hover:bg-accent/5"
                                    >
                                        {saitamaExpanded ? (
                                            <>
                                                閉じる
                                                <ChevronUp className="h-4 w-4" />
                                            </>
                                        ) : (
                                            <>
                                                その他 {saitamaRest.length} 市区町村を見る
                                                <ChevronDown className="h-4 w-4" />
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* 北関東 */}
                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                        <div className="relative flex items-center gap-3 overflow-hidden bg-gradient-to-r from-primary to-[oklch(0.22_0.07_255)] px-5 py-4">
                            <div
                                aria-hidden
                                className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5"
                            />
                            <div
                                aria-hidden
                                className="absolute -bottom-8 right-12 h-20 w-20 rounded-full bg-accent/10"
                            />
                            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
                                <MapPin className="h-5 w-5 text-white" />
                            </div>
                            <div className="relative flex-1">
                                <h3 className="text-lg font-bold text-white">北関東</h3>
                                <p className="text-xs text-white/70">栃木・群馬・茨城</p>
                            </div>
                            <Building className="relative h-5 w-5 text-white/40" />
                        </div>
                        <div className="p-4">
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {northKantoAreas.map(renderTile)}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="rounded-xl border border-dashed border-accent/30 bg-accent/5 px-5 py-4 text-center">
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
    )
}
