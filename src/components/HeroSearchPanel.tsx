'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Area } from '@/lib/database.types'

interface Props {
    areas: Area[]
}

export default function HeroSearchPanel({ areas }: Props) {
    const router = useRouter()
    const [region, setRegion] = useState<string>('saitama')
    const [areaSlug, setAreaSlug] = useState<string>('')

    const regions = useMemo(() => {
        const set = new Set<string>()
        areas.forEach((a) => a.parent_region && set.add(a.parent_region))
        return Array.from(set)
    }, [areas])

    const cities = useMemo(
        () => areas.filter((a) => a.parent_region === region),
        [areas, region]
    )

    const regionLabel = (slug: string) =>
        slug === 'saitama' ? '埼玉県' : slug === 'north-kanto' ? '北関東' : slug

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const target = areaSlug || cities[0]?.slug
        if (target) router.push(`/area/${target}`)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-3 shadow-2xl ring-1 ring-black/5 md:p-4"
        >
            <div className="flex items-center gap-2 px-2 pb-2 text-xs font-semibold tracking-wider text-primary md:text-sm">
                <Search className="h-4 w-4" />
                <span>エリアから業者を探す</span>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1.5fr_auto]">
                <div className="relative">
                    <select
                        value={region}
                        onChange={(e) => {
                            setRegion(e.target.value)
                            setAreaSlug('')
                        }}
                        className="h-12 w-full appearance-none rounded-lg border border-border bg-secondary px-3 pr-8 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    >
                        {regions.map((r) => (
                            <option key={r} value={r}>
                                {regionLabel(r)}
                            </option>
                        ))}
                    </select>
                    <MapPin className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="relative">
                    <select
                        value={areaSlug}
                        onChange={(e) => setAreaSlug(e.target.value)}
                        className="h-12 w-full appearance-none rounded-lg border border-border bg-secondary px-3 pr-8 text-sm font-medium text-foreground focus:border-accent focus:outline-none"
                    >
                        <option value="">市区町村を選択（任意）</option>
                        {cities.map((c) => (
                            <option key={c.id} value={c.slug}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="h-12 bg-accent px-6 text-accent-foreground hover:bg-accent/90"
                >
                    <Search className="mr-1 h-4 w-4" />
                    検索する
                </Button>
            </div>
        </form>
    )
}
