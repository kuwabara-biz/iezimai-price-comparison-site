'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Area } from '@/lib/database.types'

interface AreaSearchClientProps {
    areas: Area[]
}

export default function AreaSearchClient({ areas }: AreaSearchClientProps) {
    const [saitamaExpanded, setSaitamaExpanded] = useState(false)

    const saitamaAreas = areas.filter((a) => a.parent_region === 'saitama')
    const saitamaMajor = saitamaAreas.slice(0, 6)
    const saitamaRest = saitamaAreas.slice(6)
    const northKantoAreas = areas.filter((a) => a.parent_region === 'north-kanto')

    return (
        <section id="search" className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                        エリアから業者を探す
                    </h2>
                    <p className="mt-2 text-base text-muted-foreground">
                        対応エリアを選んで業者を一覧表示
                    </p>
                </div>

                <div className="mx-auto max-w-3xl space-y-6">
                    {/* 埼玉県 */}
                    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
                        <div className="flex items-center gap-3 bg-primary px-5 py-4">
                            <MapPin className="h-5 w-5 text-white/80" />
                            <h3 className="text-lg font-bold text-white">埼玉県</h3>
                            {saitamaAreas.length > 0 && (
                                <span className="ml-auto text-sm text-white/70">
                                    {saitamaAreas.length}エリア対応
                                </span>
                            )}
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {saitamaMajor.map((area) => (
                                    <Link key={area.slug} href={`/area/${area.slug}`}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start border-border text-base text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                        >
                                            <MapPin className="mr-2 h-4 w-4 shrink-0 text-accent" />
                                            {area.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                            {saitamaRest.length > 0 && (
                                <>
                                    {saitamaExpanded && (
                                        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3">
                                            {saitamaRest.map((area) => (
                                                <Link key={area.slug} href={`/area/${area.slug}`}>
                                                    <Button
                                                        variant="outline"
                                                        className="w-full justify-start border-border text-base text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                                    >
                                                        <MapPin className="mr-2 h-4 w-4 shrink-0 text-accent" />
                                                        {area.name}
                                                    </Button>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    <button
                                        onClick={() => setSaitamaExpanded(!saitamaExpanded)}
                                        className="mt-4 flex w-full items-center justify-center gap-1 text-base font-medium text-accent hover:underline"
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
                        <div className="flex items-center gap-3 bg-primary px-5 py-4">
                            <MapPin className="h-5 w-5 text-white/80" />
                            <h3 className="text-lg font-bold text-white">北関東（栃木・群馬・茨城）</h3>
                            {northKantoAreas.length > 0 && (
                                <span className="ml-auto text-sm text-white/70">
                                    {northKantoAreas.length}エリア対応
                                </span>
                            )}
                        </div>
                        <div className="p-5">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {northKantoAreas.map((area) => (
                                    <Link key={area.slug} href={`/area/${area.slug}`}>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-start border-border text-base text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                        >
                                            <MapPin className="mr-2 h-4 w-4 shrink-0 text-accent" />
                                            {area.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
