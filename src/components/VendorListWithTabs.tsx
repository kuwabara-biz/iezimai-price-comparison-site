'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Building, MessageCircle, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Vendor, Area } from '@/lib/database.types'

type TabKey = 'recommended' | 'reviews' | 'price' | 'realestate'

const TABS: { key: TabKey; label: string }[] = [
    { key: 'recommended', label: 'おすすめ順' },
    { key: 'reviews', label: '口コミ順' },
    { key: 'price', label: '価格が安い順' },
    { key: 'realestate', label: '不動産提携あり' },
]

function sortVendors(vendors: Vendor[], tab: TabKey): Vendor[] {
    switch (tab) {
        case 'recommended':
        case 'reviews':
            return [...vendors].sort((a, b) => b.rating - a.rating)
        case 'price':
            return [
                ...[...vendors].filter(v => v.min_price != null).sort((a, b) => a.min_price! - b.min_price!),
                ...[...vendors].filter(v => v.min_price == null),
            ]
        case 'realestate':
            return [...vendors]
                .filter(v => v.has_real_estate_partnership)
                .sort((a, b) => b.rating - a.rating)
    }
}

const RANK_STYLE: Record<number, string> = {
    0: 'bg-yellow-100 text-yellow-700',
    1: 'bg-gray-200 text-gray-600',
    2: 'bg-orange-100 text-orange-600',
}

interface Props {
    vendors: Vendor[]
    areas: Area[]
}

export default function VendorListWithTabs({ vendors, areas }: Props) {
    const [activeTab, setActiveTab] = useState<TabKey>('recommended')
    const sorted = sortVendors(vendors, activeTab)

    const saitamaAreas = areas.filter(a => a.parent_region === 'saitama').slice(0, 5)
    const northKantoAreas = areas.filter(a => a.parent_region === 'north-kanto')

    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">遺品整理業者一覧</h2>
                    <p className="mt-2 text-muted-foreground">埼玉・北関東エリアの審査済み業者</p>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex overflow-x-auto border-b border-border">
                    {TABS.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`-mb-px shrink-0 border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
                                activeTab === tab.key
                                    ? 'border-accent text-accent'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main layout: vendor list + sidebar */}
                <div className="flex gap-6">
                    {/* Vendor list */}
                    <div className="min-w-0 flex-1 space-y-4">
                        {sorted.length === 0 ? (
                            <p className="py-12 text-center text-muted-foreground">該当する業者がありません</p>
                        ) : (
                            sorted.map((vendor, index) => (
                                <Card key={vendor.id} className="border-border transition-shadow hover:shadow-md">
                                    <CardContent className="p-5">
                                        <div className="flex gap-4">
                                            {/* Rank badge */}
                                            <div className="shrink-0 pt-1">
                                                <span
                                                    className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                                                        RANK_STYLE[index] ?? 'bg-secondary text-muted-foreground'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </span>
                                            </div>

                                            {/* Logo + Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-2 flex items-center gap-3">
                                                    {vendor.image_url ? (
                                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded border border-border">
                                                            <Image
                                                                src={vendor.image_url}
                                                                alt={vendor.name}
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ) : null}
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <h3 className="text-base font-bold text-foreground">{vendor.name}</h3>
                                                        {vendor.has_real_estate_partnership && (
                                                            <Badge className="bg-accent/10 text-xs text-accent hover:bg-accent/10">
                                                                <Building className="mr-1 h-3 w-3" />
                                                                不動産提携
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="mb-2 flex items-center gap-1">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`h-4 w-4 ${
                                                                i < Math.round(vendor.rating)
                                                                    ? 'fill-yellow-400 text-yellow-400'
                                                                    : 'fill-gray-200 text-gray-200'
                                                            }`}
                                                        />
                                                    ))}
                                                    <span className="ml-1 text-sm font-semibold">{vendor.rating}</span>
                                                </div>

                                                {vendor.description && (
                                                    <p className="mb-3 line-clamp-3 text-sm text-muted-foreground">
                                                        {vendor.description}
                                                    </p>
                                                )}

                                                {vendor.features && vendor.features.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap gap-1">
                                                        {vendor.features.slice(0, 4).map(f => (
                                                            <Badge key={f} variant="secondary" className="text-xs">
                                                                {f}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Footer: price + CTAs */}
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                    {vendor.min_price ? (
                                                        <p className="text-sm text-muted-foreground">
                                                            料金目安：
                                                            <span className="font-semibold text-foreground">
                                                                {vendor.min_price.toLocaleString()}円〜
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        <div />
                                                    )}
                                                    <div className="flex gap-2">
                                                        {vendor.slug && (
                                                            <Link href={`/vendor/${vendor.slug}`}>
                                                                <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/5">
                                                                    詳細を見る
                                                                    <ArrowRight className="ml-1 h-3 w-3" />
                                                                </Button>
                                                            </Link>
                                                        )}
                                                        <Button size="sm" className="bg-[#06C755] text-white hover:bg-[#06C755]/90">
                                                            <MessageCircle className="mr-1 h-3 w-3" />
                                                            LINEで相談
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden w-60 shrink-0 lg:block">
                        <div className="sticky top-6 space-y-4">
                            {/* LINE CTA card */}
                            <Card className="overflow-hidden border-0 bg-[#06C755]/10">
                                <CardContent className="p-5 text-center">
                                    <MessageCircle className="mx-auto mb-2 h-8 w-8 text-[#06C755]" />
                                    <h3 className="mb-1 font-bold text-foreground">LINE で無料相談</h3>
                                    <p className="mb-3 text-xs text-muted-foreground">
                                        写真を送るだけで即日概算見積もり
                                    </p>
                                    <Button className="w-full bg-[#06C755] text-white hover:bg-[#06C755]/90">
                                        LINEで相談する
                                    </Button>
                                    <p className="mt-2 text-xs text-muted-foreground">※ 無料・営業電話なし</p>
                                </CardContent>
                            </Card>

                            {/* Area quick links */}
                            <Card>
                                <CardContent className="p-4">
                                    <h3 className="mb-3 flex items-center gap-1 text-sm font-bold text-foreground">
                                        <MapPin className="h-4 w-4 text-accent" />
                                        エリアから探す
                                    </h3>
                                    <div className="space-y-0.5">
                                        <p className="pb-1 text-xs font-medium text-muted-foreground">埼玉県</p>
                                        {saitamaAreas.map(area => (
                                            <Link
                                                key={area.slug}
                                                href={`/area/${area.slug}`}
                                                className="block py-1 text-sm text-foreground hover:text-accent hover:underline"
                                            >
                                                {area.name}
                                            </Link>
                                        ))}
                                        <p className="pb-1 pt-2 text-xs font-medium text-muted-foreground">北関東</p>
                                        {northKantoAreas.map(area => (
                                            <Link
                                                key={area.slug}
                                                href={`/area/${area.slug}`}
                                                className="block py-1 text-sm text-foreground hover:text-accent hover:underline"
                                            >
                                                {area.name}
                                            </Link>
                                        ))}
                                        <Link
                                            href="/#search"
                                            className="mt-2 flex items-center gap-1 pt-1 text-xs text-accent hover:underline"
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
