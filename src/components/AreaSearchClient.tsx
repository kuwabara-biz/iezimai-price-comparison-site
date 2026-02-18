'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Area } from '@/lib/database.types'

interface AreaSearchClientProps {
    areas: Area[]
}

export default function AreaSearchClient({ areas }: AreaSearchClientProps) {
    const [saitamaExpanded, setSaitamaExpanded] = useState(false)

    const saitamaAreas = areas.filter((a) => a.parent_region === 'saitama')
    const saitamaMajor = saitamaAreas.slice(0, 5)
    const saitamaRest = saitamaAreas.slice(5)
    const northKantoAreas = areas.filter((a) => a.parent_region === 'north-kanto')

    return (
        <section id="search" className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mb-8 text-center">
                    <div className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                        <Search className="h-4 w-4" />
                        AREA SEARCH
                    </div>
                    <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                        エリアから業者を探す
                    </h2>
                </div>

                <div className="mx-auto max-w-3xl">
                    {/* 埼玉県 */}
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                                埼
                            </span>
                            埼玉県
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {saitamaMajor.map((area) => (
                                <Link key={area.slug} href={`/area/${area.slug}`}>
                                    <Button
                                        variant="outline"
                                        className="border-primary/20 text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                    >
                                        {area.name}
                                    </Button>
                                </Link>
                            ))}
                            <Button
                                variant="ghost"
                                className="text-muted-foreground hover:text-accent"
                                onClick={() => setSaitamaExpanded(!saitamaExpanded)}
                            >
                                {saitamaExpanded ? (
                                    <>
                                        閉じる <ChevronUp className="ml-1 h-4 w-4" />
                                    </>
                                ) : (
                                    <>
                                        その他の市区町村 <ChevronDown className="ml-1 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                        {saitamaExpanded && (
                            <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
                                {saitamaRest.map((area) => (
                                    <Link key={area.slug} href={`/area/${area.slug}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-primary/20 text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                        >
                                            {area.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 北関東 */}
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
                            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-primary text-xs font-bold text-primary-foreground">
                                北
                            </span>
                            北関東
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {northKantoAreas.map((area) => (
                                <Link key={area.slug} href={`/area/${area.slug}`}>
                                    <Button
                                        variant="outline"
                                        className="border-primary/20 text-foreground hover:border-accent hover:bg-accent/5 hover:text-accent"
                                    >
                                        {area.name}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
