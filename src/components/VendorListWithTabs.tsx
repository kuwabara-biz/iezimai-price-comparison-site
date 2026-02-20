'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Star, Building, Phone, ArrowRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Vendor, Area } from '@/lib/database.types'
import { COMPANY } from '@/lib/constants'

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
                                                <div className="mb-3 flex gap-4">
                                                    {/* 横長サムネイル */}
                                                    {vendor.image_url ? (
                                                        <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-lg border border-border">
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
                                                            <h3 className="text-lg font-bold text-foreground">{vendor.name}</h3>
                                                            {vendor.has_real_estate_partnership && (
                                                                <Badge className="bg-accent/10 text-sm text-accent hover:bg-accent/10">
                                                                    <Building className="mr-1 h-3.5 w-3.5" />
                                                                    不動産提携
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        {/* Rating */}
                                                        <div className="mt-1 flex items-center gap-1">
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
                                                            <span className="ml-1 text-base font-semibold">{vendor.rating}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {vendor.description && (
                                                    <p className="mb-3 line-clamp-3 text-base text-muted-foreground">
                                                        {vendor.description}
                                                    </p>
                                                )}

                                                {vendor.features && vendor.features.length > 0 && (
                                                    <div className="mb-3 flex flex-wrap gap-1">
                                                        {vendor.features.slice(0, 4).map(f => (
                                                            <Badge key={f} variant="secondary" className="text-sm">
                                                                {f}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Footer: price + detail link */}
                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                    {vendor.min_price ? (
                                                        <p className="text-base text-muted-foreground">
                                                            料金目安：
                                                            <span className="font-semibold text-foreground">
                                                                {vendor.min_price.toLocaleString()}円〜
                                                            </span>
                                                        </p>
                                                    ) : (
                                                        <div />
                                                    )}
                                                    {vendor.slug && (
                                                        <Link href={`/vendor/${vendor.slug}`}>
                                                            <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                                                                料金やサービスを見る
                                                                <ArrowRight className="ml-1 h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    {/* 電話 + 相談フォームバー */}
                                    <div className="flex flex-col gap-3 border-t border-border bg-green-50/60 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center gap-1 rounded bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
                                                <Phone className="h-3 w-3" />
                                                通話無料
                                            </span>
                                            <a
                                                href={`tel:${COMPANY.phone.replace(/-/g, '')}`}
                                                className="text-xl font-bold text-foreground hover:text-primary"
                                            >
                                                {COMPANY.phone}
                                            </a>
                                            <span className="hidden text-sm text-muted-foreground sm:inline">
                                                {COMPANY.businessHours}
                                            </span>
                                        </div>
                                        <Link href="/contact">
                                            <Button className="w-full sm:w-auto">
                                                無料相談フォームへ
                                                <ArrowRight className="ml-1 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="hidden w-60 shrink-0 lg:block">
                        <div className="sticky top-6 space-y-4">
                            {/* 相談 CTA card */}
                            <Card className="overflow-hidden border-primary/20 bg-primary/5">
                                <CardContent className="p-5 text-center">
                                    <Phone className="mx-auto mb-2 h-8 w-8 text-primary" />
                                    <h3 className="mb-1 font-bold text-foreground">無料でご相談</h3>
                                    <p className="mb-3 text-sm text-muted-foreground">
                                        {COMPANY.businessHours}
                                    </p>
                                    <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>
                                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                                            <Phone className="mr-1 h-4 w-4" />
                                            {COMPANY.phone}
                                        </Button>
                                    </a>
                                    <Link href="/contact">
                                        <Button className="mt-2 w-full">
                                            フォームで相談する
                                        </Button>
                                    </Link>
                                    <p className="mt-2 text-xs text-muted-foreground">※ 営業電話は一切行いません</p>
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
