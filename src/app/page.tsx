import Link from 'next/link'
import Image from 'next/image'
import {
    ShieldCheck,
    Clock,
    Star,
    MessageCircle,
    ArrowRight,
    Building,
    Users,
    Camera,
    MapPin,
    BarChart3,
    CalendarCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAreas, getVendors } from '@/lib/supabase-helpers'
import AreaSearchClient from '@/components/AreaSearchClient'
import VendorListWithTabs from '@/components/VendorListWithTabs'

export default async function HomePage() {
    const [areas, vendors] = await Promise.all([getAreas(), getVendors()])

    const top5 = [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 5)

    const rankingCategories = [
        {
            label: '総合評価順',
            vendors: [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 3),
        },
        {
            label: '口コミ順',
            vendors: [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 3),
        },
        {
            label: '価格が安い順',
            vendors: [...vendors]
                .filter(v => v.min_price != null)
                .sort((a, b) => a.min_price! - b.min_price!)
                .slice(0, 3),
        },
        {
            label: '不動産提携あり',
            vendors: [...vendors]
                .filter(v => v.has_real_estate_partnership)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3),
        },
    ]

    const rankStyle: Record<number, string> = {
        0: 'bg-yellow-100 text-yellow-700',
        1: 'bg-gray-200 text-gray-600',
        2: 'bg-orange-100 text-orange-600',
    }

    return (
        <div className="min-h-screen">

            {/* ===== Hero ===== */}
            <section className="bg-gradient-to-br from-primary via-primary to-primary/90 py-10 md:py-14">
                <div className="container mx-auto px-4 text-center">
                    <Badge
                        variant="secondary"
                        className="mb-4 border-accent bg-accent/20 px-4 py-1.5 text-sm text-white"
                    >
                        埼玉・北関東エリア専門
                    </Badge>
                    <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        埼玉・北関東の遺品整理なら
                        <br />
                        <span className="text-accent">お任せください。</span>
                    </h1>
                    <p className="mx-auto mb-8 max-w-xl text-base text-white/80 md:text-lg">
                        地元密着の優良業者を厳選掲載。口コミ・料金で比較できます。
                    </p>
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            className="w-full bg-[#06C755] text-white shadow-lg hover:bg-[#06C755]/90 sm:w-auto sm:px-10"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            LINEで無料相談
                        </Button>
                        <Link href="/#search">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto sm:px-10"
                            >
                                エリアから業者を探す
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                            <ShieldCheck className="h-4 w-4 text-accent" />全業者審査済み
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-accent" />最短即日見積もり
                        </span>
                        <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-accent" />口コミで選べる
                        </span>
                    </div>
                </div>
            </section>

            {/* ===== おすすめ業者 TOP 5 ===== */}
            <section className="bg-secondary py-10 md:py-14">
                <div className="container mx-auto px-4">
                    <p className="mb-1 text-center text-xs text-muted-foreground">
                        本ページはプロモーションを含みます
                    </p>
                    <div className="mb-6 text-center">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                            人気・おすすめの遺品整理業者
                        </h2>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
                        {top5.map(vendor => (
                            <Link
                                key={vendor.id}
                                href={`/vendor/${vendor.slug}`}
                                className="w-40 shrink-0 md:w-auto"
                            >
                                <Card className="h-full border-border bg-white text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
                                    <CardContent className="flex flex-col items-center gap-3 p-4">
                                        {vendor.image_url ? (
                                            <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-border">
                                                <Image
                                                    src={vendor.image_url}
                                                    alt={vendor.name}
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-secondary text-xl font-bold text-primary">
                                                {vendor.name.charAt(0)}
                                            </div>
                                        )}
                                        <p className="line-clamp-2 text-sm font-bold leading-tight text-foreground">
                                            {vendor.name}
                                        </p>
                                        <div className="flex items-center gap-0.5">
                                            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm font-semibold">{vendor.rating}</span>
                                        </div>
                                        <Button size="sm" className="w-full text-xs">
                                            詳細を見る
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ランキングから探す ===== */}
            <section className="bg-white py-10 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">ランキングから探す</h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
                        {rankingCategories.map(cat => (
                            <div
                                key={cat.label}
                                className="w-56 shrink-0 rounded-xl border border-border bg-white p-4 shadow-sm md:w-auto"
                            >
                                <h3 className="mb-4 text-center text-sm font-bold text-foreground">
                                    {cat.label}
                                </h3>
                                <div className="space-y-2">
                                    {cat.vendors.length === 0 ? (
                                        <p className="py-4 text-center text-xs text-muted-foreground">
                                            データなし
                                        </p>
                                    ) : (
                                        cat.vendors.map((vendor, i) => (
                                            <Link key={vendor.id} href={`/vendor/${vendor.slug}`}>
                                                <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary">
                                                    <span
                                                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                            rankStyle[i] ?? 'bg-secondary text-muted-foreground'
                                                        }`}
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium text-foreground">
                                                            {vendor.name}
                                                        </p>
                                                        <div className="flex items-center gap-0.5">
                                                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                            <span className="text-xs text-muted-foreground">
                                                                {vendor.rating}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 業者一覧 + サイドバー（タブ付き） ===== */}
            <VendorListWithTabs vendors={vendors} areas={areas} />

            {/* ===== エリアから探す ===== */}
            <AreaSearchClient areas={areas} />

            {/* ===== ご利用の流れ ===== */}
            <section className="bg-white py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">ご利用の流れ</h2>
                        <p className="mt-2 text-muted-foreground">5ステップでスムーズに解決</p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        {/* Stepper: connecting line + circles (desktop) */}
                        <div className="relative mb-6 hidden md:flex items-center justify-between px-10">
                            <div className="absolute left-10 right-10 top-1/2 h-0.5 -translate-y-1/2 bg-border" />
                            {['01','02','03','04','05'].map((n, i) => (
                                <span
                                    key={n}
                                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                                        i === 4
                                            ? 'border-2 border-dashed border-accent bg-white text-accent'
                                            : 'bg-primary text-primary-foreground'
                                    }`}
                                >
                                    {n}
                                </span>
                            ))}
                        </div>

                        {/* Step cards */}
                        <div className="grid gap-4 md:grid-cols-5">
                            {[
                                {
                                    step: '01',
                                    icon: <MapPin className="h-6 w-6" />,
                                    title: 'エリアから業者を検索',
                                    description: '埼玉・北関東のエリアを選んで業者を一覧表示。口コミ・料金・対応内容で絞り込めます。',
                                    optional: false,
                                },
                                {
                                    step: '02',
                                    icon: <Camera className="h-6 w-6" />,
                                    title: 'LINEで写真を送る',
                                    description: 'お部屋の様子をスマホで撮影してLINEへ送信。最短30分で無料の概算見積もりをご提示。',
                                    optional: false,
                                },
                                {
                                    step: '03',
                                    icon: <BarChart3 className="h-6 w-6" />,
                                    title: '見積もりを比較・業者を選ぶ',
                                    description: '複数社の見積もりを無料で比較。納得できる業者を選んで直接日程調整できます。',
                                    optional: false,
                                },
                                {
                                    step: '04',
                                    icon: <CalendarCheck className="h-6 w-6" />,
                                    title: '業者と日程調整・ご契約',
                                    description: '選んだ業者と日程を調整し、内容を確認して契約。当日〜数日以内に作業完了。',
                                    optional: false,
                                },
                                {
                                    step: '05',
                                    icon: <Building className="h-6 w-6" />,
                                    title: '空き家・不動産のご相談',
                                    description: '遺品整理後の空き家の売却・解体もご相談可能。不動産提携業者がワンストップで対応します。',
                                    optional: true,
                                },
                            ].map(item => (
                                <div
                                    key={item.step}
                                    className={`rounded-xl border p-4 text-center transition-shadow hover:shadow-sm ${
                                        item.optional
                                            ? 'border-dashed border-accent/40 bg-accent/5'
                                            : 'border-border bg-white'
                                    }`}
                                >
                                    {/* Mobile: step number */}
                                    <div className="mb-3 flex items-center gap-2 md:hidden">
                                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                            item.optional
                                                ? 'border-2 border-dashed border-accent text-accent'
                                                : 'bg-primary text-primary-foreground'
                                        }`}>
                                            {item.step}
                                        </span>
                                        <span className="font-semibold text-foreground">{item.title}</span>
                                    </div>

                                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                                        {item.icon}
                                    </div>
                                    <h3 className="mb-1 hidden text-sm font-bold text-foreground md:block">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                    {item.optional && (
                                        <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                                            任意
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 家じまい.comが選ばれる理由 ===== */}
            <section className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mb-10 text-center">
                        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                            家じまい.comが選ばれる理由
                        </h2>
                    </div>
                    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
                        {[
                            {
                                icon: <ShieldCheck className="h-6 w-6" />,
                                title: '無許可業者は掲載しません',
                                description:
                                    'すべての掲載業者は、一般廃棄物収集運搬許可等の資格を確認済み。安心してお任せいただけます。',
                            },
                            {
                                icon: <Building className="h-6 w-6" />,
                                title: '空き家の売却・解体もワンストップ',
                                description:
                                    '遺品整理だけでなく、空き家の不動産査定・売却・解体まで一括でご相談いただけます。',
                            },
                            {
                                icon: <Users className="h-6 w-6" />,
                                title: '地域密着だから適正価格',
                                description:
                                    '埼玉・北関東の相場を熟知した地元業者のみを掲載。地域に適した価格でサービスを受けられます。',
                            },
                            {
                                icon: <Clock className="h-6 w-6" />,
                                title: '最短即日で見積もり',
                                description:
                                    '写真を送るだけで概算見積もりを提示。急ぎの場合も柔軟に対応します。',
                            },
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="border-border bg-white transition-shadow hover:shadow-md"
                            >
                                <CardContent className="flex gap-4 pt-6">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-semibold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 最終 CTA ===== */}
            <section className="bg-primary py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                        まずはお気軽にご相談ください
                    </h2>
                    <p className="mb-6 text-white/80">
                        遺品整理・空き家の売却、どちらもプロがサポートします
                    </p>
                    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                        <Button
                            size="lg"
                            className="w-full bg-[#06C755] text-white shadow-lg hover:bg-[#06C755]/90 sm:w-auto sm:px-10"
                        >
                            <MessageCircle className="mr-2 h-5 w-5" />
                            LINEで無料相談
                        </Button>
                        <Link href="/#search">
                            <Button
                                size="lg"
                                variant="outline"
                                className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto sm:px-10"
                            >
                                エリアから業者を探す
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
