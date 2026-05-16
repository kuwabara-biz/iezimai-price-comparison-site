'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
    Star,
    Building,
    ArrowRight,
    MapPin,
    Crown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Vendor, Area } from '@/lib/database.types'

const RANK_STYLE: Record<number, string> = {
    0: 'bg-gradient-to-b from-yellow-300 to-yellow-500 text-yellow-950 ring-2 ring-yellow-500/40',
    1: 'bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800 ring-2 ring-gray-400/40',
    2: 'bg-gradient-to-b from-orange-300 to-orange-500 text-orange-950 ring-2 ring-orange-500/40',
}

const yen = (n: number | null | undefined) =>
    n == null ? '—' : `¥${n.toLocaleString()}`

interface Props {
    vendors: Vendor[]
    areas: Area[]
}

export default function VendorListWithTabs({ vendors, areas }: Props) {
    const [visibleCount, setVisibleCount] = useState(8)
    // 総合評価順のみ（旧並び順は廃止）
    const sorted = useMemo(
        () => [...vendors].sort((a, b) => b.rating - a.rating),
        [vendors]
    )
    const visible = sorted.slice(0, visibleCount)

    const ratingDist = useMemo(() => {
        const buckets = [0, 0, 0, 0, 0]
        for (const v of vendors) {
            const idx = Math.min(4, Math.max(0, Math.floor(v.rating) - 1))
            buckets[idx]++
        }
        return buckets
    }, [vendors])
    const maxBucket = Math.max(1, ...ratingDist)

    const saitamaAreas = areas.filter((a) => a.parent_region === 'saitama').slice(0, 8)

    return (
        <section id="vendors" className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center md:mb-10">
                    <span className="section-eyebrow">VENDORS</span>
                    <h2 className="mt-2 section-title">
                        審査済みの遺品整理業者から探す
                    </h2>
                </div>

                {/* 結果件数 + 並び順表示 */}
                <div className="mb-5 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-sm font-semibold text-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        総合評価順
                    </div>
                    <div className="text-sm text-muted-foreground">
                        該当{' '}
                        <span className="font-bold tabular-nums text-foreground">{sorted.length}</span>{' '}
                        社
                    </div>
                </div>

                {/* Main layout: vendor list + sidebar */}
                <div className="flex gap-6">
                    {/* Vendor list */}
                    <div className="min-w-0 flex-1 space-y-3">
                        {sorted.length === 0 ? (
                            <p className="py-12 text-center text-muted-foreground">該当する業者がありません</p>
                        ) : (
                            visible.map((vendor, index) => {
                                const isTop3 = index < 3
                                return (
                                    <Card
                                        key={vendor.id}
                                        className={`overflow-hidden border-border transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                            index === 0 ? 'border-yellow-400/50 ring-1 ring-yellow-300/50' : ''
                                        }`}
                                    >
                                        <CardContent className="p-4 md:p-5">
                                            <div className="flex gap-3 md:gap-4">
                                                {/* Rank badge */}
                                                <div className="shrink-0">
                                                    {index === 0 ? (
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 text-yellow-950 shadow ring-2 ring-yellow-500/40">
                                                            <Crown className="h-5 w-5" />
                                                        </div>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-base font-bold ${
                                                                RANK_STYLE[index] ??
                                                                'bg-white text-muted-foreground ring-1 ring-border'
                                                            }`}
                                                        >
                                                            {index + 1}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-3 flex gap-3">
                                                        {vendor.image_url ? (
                                                            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg border border-border md:w-32">
                                                                <Image
                                                                    src={vendor.image_url}
                                                                    alt={vendor.name}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            </div>
                                                        ) : null}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <h3 className="text-base font-bold text-foreground md:text-lg">
                                                                    {vendor.name}
                                                                </h3>
                                                                {vendor.has_real_estate_partnership && (
                                                                    <Badge className="bg-accent/15 text-xs text-accent hover:bg-accent/15">
                                                                        <Building className="mr-1 h-3 w-3" />
                                                                        不動産提携
                                                                    </Badge>
                                                                )}
                                                                {isTop3 && index !== 0 && (
                                                                    <Badge className="bg-primary/10 text-xs text-primary hover:bg-primary/10">
                                                                        TOP {index + 1}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1">
                                                                <div className="flex items-center gap-1">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-3.5 w-3.5 ${
                                                                                i < Math.round(vendor.rating)
                                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                                    : 'fill-gray-200 text-gray-200'
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                    <span className="ml-1 text-sm font-bold tabular-nums">
                                                                        {vendor.rating}
                                                                    </span>
                                                                </div>
                                                                {vendor.min_price != null && (
                                                                    <div className="flex items-baseline gap-1">
                                                                        <span className="text-[11px] text-muted-foreground">1Kから</span>
                                                                        <span className="text-base font-bold text-accent tabular-nums">
                                                                            {yen(vendor.min_price)}
                                                                        </span>
                                                                        <span className="text-[11px] text-muted-foreground">〜</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {vendor.service_areas && vendor.service_areas.length > 0 && (
                                                                <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                                    <MapPin className="h-3 w-3" />
                                                                    {vendor.service_areas.slice(0, 3).join('・')}
                                                                    {vendor.service_areas.length > 3 && '他'}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {vendor.description && (
                                                        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
                                                            {vendor.description}
                                                        </p>
                                                    )}

                                                    {vendor.features && vendor.features.length > 0 && (
                                                        <div className="mb-3 flex flex-wrap gap-1">
                                                            {vendor.features.slice(0, 5).map((f) => (
                                                                <Badge
                                                                    key={f}
                                                                    variant="secondary"
                                                                    className="bg-secondary text-xs font-medium"
                                                                >
                                                                    {f}
                                                                </Badge>
                                                            ))}
                                                            {vendor.features.length > 5 && (
                                                                <span className="text-xs text-muted-foreground">
                                                                    +{vendor.features.length - 5}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                                        {vendor.slug && (
                                                            <Link href={`/vendor/${vendor.slug}`}>
                                                                <Button
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="w-full border-primary/30 text-primary hover:border-primary hover:bg-primary/5 sm:w-auto"
                                                                >
                                                                    詳細を見る
                                                                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        <Link href="/contact">
                                                            <Button size="sm" className="w-full sm:w-auto">
                                                                無料相談
                                                                <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        )}

                        {/* もっと見るボタン */}
                        {visibleCount < sorted.length && (
                            <div className="pt-3 text-center">
                                <Button
                                    variant="outline"
                                    onClick={() => setVisibleCount(visibleCount + 8)}
                                    className="border-primary/30 px-8 text-primary hover:border-primary hover:bg-primary/5"
                                >
                                    さらに {Math.min(8, sorted.length - visibleCount)} 社を表示
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div className="sticky top-6 space-y-3">
                            {/* 相談 CTA card */}
                            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] p-5 text-center shadow-md">
                                <div
                                    aria-hidden
                                    className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/15"
                                />
                                <div
                                    aria-hidden
                                    className="absolute -bottom-8 -left-4 h-20 w-20 rounded-full bg-white/5"
                                />
                                <div className="relative">
                                    <p className="mb-1 text-[10px] font-semibold tracking-widest text-accent">
                                        FREE
                                    </p>
                                    <h3 className="mb-1 text-lg font-bold text-white">無料でご相談</h3>
                                    <p className="mb-3 text-xs text-white/70">
                                        専門家が直接お伺いします
                                    </p>
                                    <Link href="/contact">
                                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                            フォームで相談
                                            <ArrowRight className="ml-1 h-3.5 w-3.5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            {/* 評価分布 (mini chart) */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
                                        <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                        評価分布
                                    </h3>
                                    <div className="space-y-1.5">
                                        {[5, 4, 3, 2, 1].map((rating) => {
                                            const bucketIdx = rating - 1
                                            const count = ratingDist[bucketIdx]
                                            const pct = (count / maxBucket) * 100
                                            return (
                                                <div key={rating} className="flex items-center gap-2 text-xs">
                                                    <span className="flex w-5 items-center gap-0.5 font-medium text-foreground">
                                                        {rating}
                                                        <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                                                    </span>
                                                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                                                        <div
                                                            className="bg-gradient-to-r from-yellow-300 to-yellow-500"
                                                            style={{ width: `${pct}%` }}
                                                        />
                                                    </div>
                                                    <span className="w-8 text-right tabular-nums text-muted-foreground">
                                                        {count}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Area quick links（埼玉県のみ） */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="mb-3 flex items-center gap-1.5 text-sm font-bold text-foreground">
                                        <MapPin className="h-3.5 w-3.5 text-accent" />
                                        エリアから探す
                                    </h3>
                                    <div className="space-y-0.5">
                                        <p className="pb-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
                                            埼玉県
                                        </p>
                                        {saitamaAreas.map((area) => (
                                            <Link
                                                key={area.slug}
                                                href={`/area/${area.slug}`}
                                                className="flex items-center justify-between py-1 text-sm text-foreground transition-colors hover:text-accent"
                                            >
                                                <span>{area.name}</span>
                                            </Link>
                                        ))}
                                        <Link
                                            href="/#search"
                                            className="mt-2 flex items-center gap-1 pt-1 text-xs font-semibold text-accent hover:underline"
                                        >
                                            すべてのエリアを見る
                                            <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    )
}
