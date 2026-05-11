import Link from 'next/link'
import Image from 'next/image'
import {
    ShieldCheck,
    Clock,
    Star,
    ArrowRight,
    Building,
    Users,
    Camera,
    MapPin,
    BarChart3,
    CalendarCheck,
    TrendingUp,
    MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAreas, getVendors } from '@/lib/supabase-helpers'
import AreaSearchClient from '@/components/AreaSearchClient'
import VendorListWithTabs from '@/components/VendorListWithTabs'
import HeroSearchPanel from '@/components/HeroSearchPanel'

const yen = (n: number | null | undefined) =>
    n == null ? '—' : `¥${n.toLocaleString()}`

export default async function HomePage() {
    const [areas, vendors] = await Promise.all([getAreas(), getVendors()])

    const top5 = [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 5)

    const avgRating =
        vendors.length > 0
            ? (vendors.reduce((s, v) => s + (v.rating || 0), 0) / vendors.length).toFixed(2)
            : '—'
    const vendorsWithRealEstate = vendors.filter((v) => v.has_real_estate_partnership).length

    const rankingCategories = [
        {
            label: '総合評価順',
            icon: <Star className="h-4 w-4" />,
            vendors: [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 3),
        },
        {
            label: '口コミが多い順',
            icon: <MessageSquare className="h-4 w-4" />,
            vendors: [...vendors].sort((a, b) => b.rating - a.rating).slice(0, 3),
        },
        {
            label: '料金が安い順',
            icon: <TrendingUp className="h-4 w-4" />,
            vendors: [...vendors]
                .filter((v) => v.min_price != null)
                .sort((a, b) => a.min_price! - b.min_price!)
                .slice(0, 3),
        },
        {
            label: '不動産提携あり',
            icon: <Building className="h-4 w-4" />,
            vendors: [...vendors]
                .filter((v) => v.has_real_estate_partnership)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3),
        },
    ]

    const rankBadge: Record<number, string> = {
        0: 'bg-gradient-to-b from-yellow-300 to-yellow-500 text-yellow-950 shadow ring-1 ring-yellow-600/30',
        1: 'bg-gradient-to-b from-gray-200 to-gray-400 text-gray-800 shadow ring-1 ring-gray-500/30',
        2: 'bg-gradient-to-b from-orange-300 to-orange-500 text-orange-950 shadow ring-1 ring-orange-600/30',
    }

    return (
        <div className="min-h-screen">
            {/* ===== Hero ===== */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)] py-10 md:py-16">
                {/* 背景：ドット模様 */}
                <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                        backgroundSize: '28px 28px',
                    }}
                />
                {/* 背景：装飾円 */}
                <div
                    aria-hidden
                    className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
                />
                <div
                    aria-hidden
                    className="absolute -right-24 -top-20 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl"
                />
                {/* 背景：斜めライン */}
                <svg
                    aria-hidden
                    className="absolute inset-0 h-full w-full opacity-[0.04]"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <pattern
                            id="hero-lines"
                            width="40"
                            height="40"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(-12)"
                        >
                            <line x1="0" y1="20" x2="40" y2="20" stroke="white" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-lines)" />
                </svg>
                <div className="container relative mx-auto px-4 text-center">
                    <Badge
                        variant="secondary"
                        className="mb-4 border-accent/40 bg-accent/15 px-4 py-1.5 text-sm font-medium text-white backdrop-blur"
                    >
                        埼玉・北関東エリア専門
                    </Badge>
                    <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
                        埼玉・北関東の遺品整理業者を
                        <br className="hidden md:inline" />
                        <span className="text-accent">口コミと料金で比較</span>
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-sm text-white/80 md:text-base">
                        地元密着の優良業者{vendors.length}社を厳選掲載。最短即日で見積もりを取得できます。
                    </p>

                    {/* 検索パネル */}
                    <HeroSearchPanel areas={areas} />

                    {/* セカンダリ CTA */}
                    <div className="mt-5 flex flex-col items-center justify-center gap-2 text-sm text-white/70 sm:flex-row">
                        <span>または</span>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
                        >
                            無料相談フォームから問い合わせる
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== 信頼指標バー ===== */}
            <section className="border-b border-border bg-gradient-to-b from-white to-secondary/40">
                <div className="container mx-auto grid grid-cols-2 gap-3 px-4 py-5 md:grid-cols-4 md:gap-4 md:py-7">
                    {/* 掲載業者数 — 棒グラフ風 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-blue-500/10" />
                        <div className="relative">
                            <div className="flex items-center gap-1.5">
                                <Building className="h-4 w-4 text-blue-600" />
                                <p className="text-[11px] font-medium tracking-wider text-muted-foreground">
                                    掲載業者数
                                </p>
                            </div>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-foreground tabular-nums md:text-4xl">
                                    {vendors.length}
                                </span>
                                <span className="text-sm font-bold text-foreground">社</span>
                            </p>
                            {/* ミニ棒グラフ */}
                            <div className="mt-2 flex h-1.5 gap-0.5">
                                {[0.7, 0.95, 0.85, 1, 0.75, 0.9].map((v, i) => (
                                    <span
                                        key={i}
                                        className="flex-1 rounded-sm bg-blue-500/80"
                                        style={{ opacity: v }}
                                    />
                                ))}
                            </div>
                            <p className="mt-1.5 text-[11px] text-muted-foreground">埼玉・北関東</p>
                        </div>
                    </div>

                    {/* 平均評価 — 星ゲージ */}
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-yellow-400/15" />
                        <div className="relative">
                            <div className="flex items-center gap-1.5">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <p className="text-[11px] font-medium tracking-wider text-muted-foreground">
                                    平均評価
                                </p>
                            </div>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-foreground tabular-nums md:text-4xl">
                                    {avgRating}
                                </span>
                                <span className="text-sm text-muted-foreground">/ 5.0</span>
                            </p>
                            {/* 星ゲージ */}
                            <div className="mt-2 flex gap-0.5">
                                {[0, 1, 2, 3, 4].map((i) => {
                                    const rating = parseFloat(avgRating)
                                    const fill = Math.max(0, Math.min(1, rating - i))
                                    return (
                                        <div key={i} className="relative h-3 w-3">
                                            <Star className="absolute inset-0 h-3 w-3 text-yellow-400/30" />
                                            <div
                                                className="absolute inset-0 overflow-hidden"
                                                style={{ width: `${fill * 100}%` }}
                                            >
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <p className="mt-1.5 text-[11px] text-muted-foreground">5点満点中</p>
                        </div>
                    </div>

                    {/* 不動産提携 — 円グラフ風 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-emerald-500/10" />
                        <div className="relative flex items-start justify-between">
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <Users className="h-4 w-4 text-emerald-600" />
                                    <p className="text-[11px] font-medium tracking-wider text-muted-foreground">
                                        不動産提携
                                    </p>
                                </div>
                                <p className="mt-1 flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-foreground tabular-nums md:text-4xl">
                                        {vendorsWithRealEstate}
                                    </span>
                                    <span className="text-sm font-bold text-foreground">社</span>
                                </p>
                                <p className="mt-1.5 text-[11px] text-muted-foreground">空き家もOK</p>
                            </div>
                            {/* ドーナツチャート */}
                            <svg viewBox="0 0 36 36" className="h-12 w-12 shrink-0 -rotate-90">
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    className="text-emerald-500/15"
                                />
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeDasharray={`${
                                        vendors.length > 0
                                            ? Math.round((vendorsWithRealEstate / vendors.length) * 88)
                                            : 0
                                    } 88`}
                                    strokeLinecap="round"
                                    className="text-emerald-500"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* 相談無料 — アイコン強調 */}
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <div className="absolute -right-2 -top-2 h-16 w-16 rounded-full bg-accent/15" />
                        <div className="relative">
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4 text-accent" />
                                <p className="text-[11px] font-medium tracking-wider text-muted-foreground">
                                    ご相談
                                </p>
                            </div>
                            <p className="mt-1 flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-foreground md:text-4xl">無料</span>
                            </p>
                            {/* 24h ライン */}
                            <div className="mt-2 flex items-center gap-1.5">
                                <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                <span className="text-[11px] font-semibold text-emerald-700">
                                    24時間受付中
                                </span>
                            </div>
                            <p className="mt-1.5 text-[11px] text-muted-foreground">
                                通話料・相談料 0円
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== おすすめ業者 TOP 5 ===== */}
            <section className="bg-secondary py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-1 text-center">
                        <span className="section-eyebrow">PICKUP</span>
                    </div>
                    <div className="mb-5 text-center md:mb-7">
                        <h2 className="section-title">人気・おすすめの遺品整理業者</h2>
                        <p className="section-subtitle">評価の高い業者を厳選してご紹介</p>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-5 md:overflow-visible">
                        {top5.map((vendor, idx) => (
                            <Link
                                key={vendor.id}
                                href={`/vendor/${vendor.slug}`}
                                className="w-56 shrink-0 md:w-auto"
                            >
                                <Card className="group h-full overflow-hidden border-border bg-white transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
                                    <CardContent className="flex h-full flex-col gap-0 p-0">
                                        <div className="relative">
                                            {vendor.image_url ? (
                                                <div className="relative aspect-[4/3] w-full overflow-hidden">
                                                    <Image
                                                        src={vendor.image_url}
                                                        alt={vendor.name}
                                                        fill
                                                        className="object-cover transition-transform group-hover:scale-105"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex aspect-[4/3] w-full items-center justify-center bg-secondary text-3xl font-bold text-primary">
                                                    {vendor.name.charAt(0)}
                                                </div>
                                            )}
                                            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-xs font-bold text-white shadow">
                                                #{idx + 1}
                                            </span>
                                            {vendor.has_real_estate_partnership && (
                                                <span className="absolute right-2 top-2 rounded-md bg-accent px-2 py-1 text-[10px] font-bold text-accent-foreground shadow">
                                                    不動産提携
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex flex-1 flex-col gap-2 p-3">
                                            <p className="line-clamp-2 text-sm font-bold leading-tight text-foreground">
                                                {vendor.name}
                                            </p>
                                            <div className="flex items-center gap-1.5">
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm font-bold">{vendor.rating}</span>
                                                <span className="text-xs text-muted-foreground">/ 5.0</span>
                                            </div>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] text-muted-foreground">1Kから</span>
                                                <span className="text-lg font-bold text-accent">
                                                    {yen(vendor.min_price)}
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">〜</span>
                                            </div>
                                            {vendor.service_areas && vendor.service_areas.length > 0 && (
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" />
                                                    <span className="line-clamp-1">
                                                        {vendor.service_areas.slice(0, 2).join('・')}
                                                        {vendor.service_areas.length > 2 ? '他' : ''}
                                                    </span>
                                                </div>
                                            )}
                                            {vendor.features && vendor.features.length > 0 && (
                                                <div className="flex flex-wrap gap-1 pt-1">
                                                    {vendor.features.slice(0, 2).map((f) => (
                                                        <span
                                                            key={f}
                                                            className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                                        >
                                                            {f}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                            <Button size="sm" className="mt-auto w-full text-xs">
                                                詳細を見る
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== ランキングから探す ===== */}
            <section className="bg-white py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="mb-1 text-center">
                        <span className="section-eyebrow">RANKING</span>
                    </div>
                    <div className="mb-5 text-center md:mb-7">
                        <h2 className="section-title">ランキングから探す</h2>
                        <p className="section-subtitle">あなたの優先軸で業者を絞り込み</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {rankingCategories.map((cat) => (
                            <div
                                key={cat.label}
                                className="rounded-xl border border-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="mb-3 flex items-center gap-2 border-b border-border pb-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                        {cat.icon}
                                    </span>
                                    <h3 className="text-sm font-bold text-foreground">{cat.label}</h3>
                                </div>
                                <div className="space-y-1">
                                    {cat.vendors.length === 0 ? (
                                        <p className="py-4 text-center text-sm text-muted-foreground">
                                            データなし
                                        </p>
                                    ) : (
                                        cat.vendors.map((vendor, i) => (
                                            <Link key={vendor.id} href={`/vendor/${vendor.slug}`}>
                                                <div className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-secondary">
                                                    <span
                                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                                                            rankBadge[i] ?? 'bg-secondary text-muted-foreground'
                                                        }`}
                                                    >
                                                        {i + 1}
                                                    </span>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-sm font-semibold text-foreground">
                                                            {vendor.name}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <span className="flex items-center gap-0.5">
                                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                                {vendor.rating}
                                                            </span>
                                                            {vendor.min_price != null && (
                                                                <span className="text-accent font-semibold">
                                                                    {yen(vendor.min_price)}〜
                                                                </span>
                                                            )}
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
            <AreaSearchClient areas={areas} vendors={vendors} />

            {/* ===== ご利用の流れ ===== */}
            <section id="flow" className="bg-white py-10 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="mb-1 text-center">
                        <span className="section-eyebrow">FLOW</span>
                    </div>
                    <div className="mb-8 text-center">
                        <h2 className="section-title">ご利用の流れ</h2>
                        <p className="section-subtitle">5ステップでスムーズに解決</p>
                    </div>

                    <div className="mx-auto max-w-5xl">
                        {/* Stepper: connecting line + circles (desktop) */}
                        <div className="relative mb-6 hidden items-center justify-between px-10 md:flex">
                            <div className="absolute left-10 right-10 top-1/2 h-0.5 -translate-y-1/2 bg-border" />
                            {['01', '02', '03', '04', '05'].map((n, i) => (
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

                        <div className="grid gap-3 md:grid-cols-5">
                            {[
                                {
                                    step: '01',
                                    icon: <MapPin className="h-6 w-6" />,
                                    title: 'エリアから業者を検索',
                                    description: '埼玉・北関東のエリアを選んで業者を一覧表示。',
                                    optional: false,
                                },
                                {
                                    step: '02',
                                    icon: <Camera className="h-6 w-6" />,
                                    title: 'LINEで写真を送る',
                                    description: 'お部屋の写真を送信。最短30分で無料の概算見積もり。',
                                    optional: false,
                                },
                                {
                                    step: '03',
                                    icon: <BarChart3 className="h-6 w-6" />,
                                    title: '見積もりを比較',
                                    description: '複数社を無料で比較。納得できる業者を選びます。',
                                    optional: false,
                                },
                                {
                                    step: '04',
                                    icon: <CalendarCheck className="h-6 w-6" />,
                                    title: '日程調整・ご契約',
                                    description: '業者と日程を調整し、契約後すぐに作業開始。',
                                    optional: false,
                                },
                                {
                                    step: '05',
                                    icon: <Building className="h-6 w-6" />,
                                    title: '空き家のご相談',
                                    description: '遺品整理後の売却・解体もワンストップで対応。',
                                    optional: true,
                                },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className={`relative overflow-hidden rounded-xl border p-4 text-center transition-all hover:-translate-y-0.5 hover:shadow-md ${
                                        item.optional
                                            ? 'border-dashed border-accent/40 bg-accent/5'
                                            : 'border-border bg-white'
                                    }`}
                                >
                                    {/* 大きなSTEP番号（背景装飾） */}
                                    <span
                                        aria-hidden
                                        className={`absolute -right-2 -top-3 select-none text-7xl font-black leading-none ${
                                            item.optional ? 'text-accent/10' : 'text-primary/[0.06]'
                                        }`}
                                    >
                                        {item.step}
                                    </span>
                                    <div className="relative">
                                        <div className="mb-3 flex items-center gap-2 md:hidden">
                                            <span
                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                                    item.optional
                                                        ? 'border-2 border-dashed border-accent text-accent'
                                                        : 'bg-primary text-primary-foreground'
                                                }`}
                                            >
                                                {item.step}
                                            </span>
                                            <span className="font-semibold text-foreground">{item.title}</span>
                                        </div>
                                        <div
                                            className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl ${
                                                item.optional
                                                    ? 'bg-accent/10 text-accent ring-2 ring-dashed ring-accent/40'
                                                    : 'bg-gradient-to-br from-accent/15 to-accent/5 text-accent shadow-sm'
                                            }`}
                                        >
                                            {item.icon}
                                        </div>
                                        <h3 className="mb-1 hidden text-base font-bold text-foreground md:block">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                        {item.optional && (
                                            <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">
                                                任意
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 家じまいとは ===== */}
            <section id="about" className="bg-secondary py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl">
                        <div className="mb-2 text-center">
                            <span className="section-eyebrow">ABOUT</span>
                        </div>
                        <div className="mb-8 text-center">
                            <h2 className="section-title">家じまいとは？</h2>
                        </div>
                        <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                            親の死去や施設への入居をきっかけに、実家を整理・処分することを「家じまい」と呼びます。
                            具体的には、長年暮らした実家に残された家具や荷物を片付ける「遺品整理」と、空き家となった不動産を売却・活用する「不動産処分」の、大きく2つの作業が発生します。どちらか一方だけで済むケースはほとんどなく、多くの場合はセットで対応が必要になります。
                        </p>
                        <h3 className="mb-3 text-lg font-bold text-foreground">
                            「実家の片付けだけ」では終わらない現実
                        </h3>
                        <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                            家じまいを経験した方のほとんどが、その規模の大きさに驚きます。何十年分もの荷物、複数の部屋、庭の雑草、仏壇や貴重品の扱い——。週末に家族だけで少しずつ片付けようとしても、なかなか終わりが見えないのが実情です。
                            さらに、荷物が片付いた後には不動産の問題が待っています。空き家のまま放置すると固定資産税や管理コストがかかり続けるため、売却や活用の検討も急務となります。
                        </p>
                        <h3 className="mb-3 text-lg font-bold text-foreground">
                            40〜50代が直面しやすいタイミング
                        </h3>
                        <p className="text-base leading-relaxed text-muted-foreground">
                            家じまいは突然やってきます。親の介護が始まった、施設への入居が決まった、相続が発生した——。そのどれもが、仕事や自分の家庭と並行して対応しなければならない、体力的にも精神的にも負担の大きい出来事です。
                            「どこに頼めばいいかわからない」「費用の相場が見当もつかない」という声はとても多く、このサイトはそんな方のために、遺品整理と不動産売却の両方を一括して比較・相談できる窓口として作られています。
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== 家じまい.comが選ばれる理由 ===== */}
            <section className="bg-white py-10 md:py-14">
                <div className="container mx-auto px-4">
                    <div className="mb-1 text-center">
                        <span className="section-eyebrow">WHY US</span>
                    </div>
                    <div className="mb-8 text-center">
                        <h2 className="section-title">家じまい.comが選ばれる理由</h2>
                    </div>
                    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
                        {[
                            {
                                icon: <ShieldCheck className="h-6 w-6" />,
                                title: '100%資格保有業者のみ掲載',
                                description:
                                    '一般廃棄物収集運搬許可等を確認済みの優良業者のみ。無許可業者は一切掲載しません。',
                            },
                            {
                                icon: <Building className="h-6 w-6" />,
                                title: '空き家売却・解体までワンストップ',
                                description:
                                    '遺品整理だけでなく、不動産査定・売却・解体までまとめてご相談いただけます。',
                            },
                            {
                                icon: <Users className="h-6 w-6" />,
                                title: '地域密着業者で適正価格',
                                description:
                                    '埼玉・北関東の相場を熟知した地元業者のみ。出張費の上乗せもなく適正価格で対応。',
                            },
                            {
                                icon: <Clock className="h-6 w-6" />,
                                title: '最短即日で見積もり対応',
                                description:
                                    'LINEで写真を送るだけで概算見積もりを提示。お急ぎの場合も柔軟に対応します。',
                            },
                        ].map((item, index) => (
                            <Card
                                key={index}
                                className="group relative overflow-hidden border-border bg-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                            >
                                <span
                                    aria-hidden
                                    className="absolute -right-4 -top-4 select-none text-6xl font-black text-accent/[0.07]"
                                >
                                    0{index + 1}
                                </span>
                                <CardContent className="relative flex gap-4 pt-6">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent shadow-sm ring-1 ring-accent/10">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="mb-1 text-base font-bold text-foreground">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== 最終 CTA ===== */}
            <section id="cta" className="bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] py-12 md:py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
                        まずはお気軽にご相談ください
                    </h2>
                    <p className="mb-6 text-white/80">
                        遺品整理・空き家の売却、どちらもプロがサポートします
                    </p>
                    <Link href="/contact">
                        <Button
                            size="lg"
                            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg sm:px-10"
                        >
                            無料相談フォームへ
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    )
}
