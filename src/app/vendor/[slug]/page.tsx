import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Star,
    Building,
    MapPin,
    Phone,
    ExternalLink,
    ArrowRight,
    CheckCircle2,
    Quote,
    Shield,
    MessageSquare,
    ChevronDown,
    User,
    Clock,
    Calendar,
    Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    getVendors,
    getVendorBySlug,
    getApprovedReviews,
    getAreas,
    getVendorPricePlans,
    getVendorFaqs,
} from "@/lib/supabase-helpers";
import { COMPANY } from "@/lib/constants";
import type { Metadata } from "next";

interface VendorPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const vendors = await getVendors();
    return vendors
        .filter((v) => v.slug)
        .map((v) => ({ slug: v.slug as string }));
}

export async function generateMetadata({ params }: VendorPageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const vendor = await getVendorBySlug(slug);
        return {
            title: `${vendor.name} | 口コミ・料金・対応エリア`,
            description: `${vendor.name}の口コミ・料金・対応エリアを確認。${vendor.description?.slice(0, 80)}`,
        };
    } catch {
        return {};
    }
}

export default async function VendorPage({ params }: VendorPageProps) {
    const { slug } = await params;

    try {
        const vendor = await getVendorBySlug(slug);
        const [reviews, areas, pricePlans, faqs] = await Promise.all([
            getApprovedReviews(vendor.id),
            getAreas(),
            getVendorPricePlans(vendor.id),
            getVendorFaqs(vendor.id),
        ]);

        const serviceAreaNames = vendor.service_areas
            ?.map((s) => areas.find((a) => a.slug === s)?.name)
            .filter(Boolean) || [];

        const avgRating =
            reviews.length > 0
                ? (
                    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
                ).toFixed(1)
                : vendor.rating.toFixed(1);

        const hasCompanyInfo =
            vendor.address ||
            vendor.representative_name ||
            vendor.business_hours ||
            vendor.established_year ||
            vendor.employee_count ||
            vendor.website_url;

        return (
            <div className="min-h-screen bg-secondary">
                {/* ヒーローヘッダー */}
                <section className="bg-primary py-10 md:py-16">
                    <div className="container mx-auto px-4">
                        {/* パンくず */}
                        <div className="flex items-center gap-2 text-base text-white/60 mb-6">
                            <Link href="/" className="hover:text-accent">トップ</Link>
                            <span>/</span>
                            <span className="text-white">{vendor.name}</span>
                        </div>

                        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
                            {/* 業者情報 */}
                            <div className="flex gap-5 md:gap-6">
                                {vendor.image_url && (
                                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl border-2 border-white/20 bg-white">
                                        <Image
                                            src={vendor.image_url}
                                            alt={vendor.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                )}
                                <div>
                                    {/* 評価 */}
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-6 w-6 ${
                                                        i < Math.floor(Number(avgRating))
                                                            ? "fill-accent text-accent"
                                                            : "text-white/30"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-3xl font-bold text-accent">{avgRating}</span>
                                        <span className="text-lg text-white/70">
                                            （口コミ {reviews.length}件）
                                        </span>
                                    </div>

                                    {/* 業者名 */}
                                    <h1 className="text-3xl font-bold text-white md:text-4xl mb-3">
                                        {vendor.name}
                                    </h1>

                                    {/* 基本情報ピル */}
                                    {(vendor.established_year || vendor.employee_count) && (
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-white/70 text-base">
                                            {vendor.established_year && (
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    設立 {vendor.established_year}年
                                                </span>
                                            )}
                                            {vendor.employee_count && (
                                                <span className="flex items-center gap-1">
                                                    <Users className="h-4 w-4" />
                                                    スタッフ {vendor.employee_count}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* バッジ */}
                                    <div className="flex flex-wrap gap-2">
                                        {vendor.has_real_estate_partnership && (
                                            <Badge className="bg-accent text-accent-foreground text-sm py-1">
                                                <Building className="mr-1 h-4 w-4" />
                                                不動産買取可
                                            </Badge>
                                        )}
                                        {vendor.certifications?.map((cert) => (
                                            <Badge
                                                key={cert}
                                                variant="outline"
                                                className="border-white/40 text-white text-sm py-1"
                                            >
                                                <Shield className="mr-1 h-3.5 w-3.5" />
                                                {cert}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CTAボタン群 */}
                            <div className="flex flex-col gap-3 md:min-w-[260px]">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg h-14"
                                    >
                                        無料相談フォームへ
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20 text-lg h-14"
                                    >
                                        <Phone className="mr-2 h-5 w-5" />
                                        {COMPANY.phone}
                                    </Button>
                                </a>
                                <p className="text-center text-sm text-white/60">{COMPANY.businessHours}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* メインコンテンツ */}
                <section className="py-10 md:py-14">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* 左カラム（2/3） */}
                            <div className="space-y-8 lg:col-span-2">
                                {/* 業者紹介 */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                                            業者紹介
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-lg leading-relaxed text-foreground">
                                            {vendor.description}
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* スタッフからのメッセージ */}
                                {vendor.staff_message && (
                                    <Card className="bg-accent/5 border-accent/20">
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-accent" />
                                                スタッフからのメッセージ
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="relative pl-6">
                                                <Quote className="absolute left-0 top-0 h-5 w-5 text-accent/40" />
                                                <p className="text-lg leading-relaxed text-foreground">
                                                    {vendor.staff_message}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 特徴・サービス */}
                                {vendor.features && vendor.features.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                                                特徴・サービス
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                {vendor.features.map((f) => (
                                                    <div key={f} className="flex items-center gap-3">
                                                        <CheckCircle2 className="h-6 w-6 shrink-0 text-accent" />
                                                        <span className="text-lg">{f}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 料金目安（間取り別） */}
                                {pricePlans.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                                                料金目安（間取り別）
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="overflow-x-auto rounded-lg border">
                                                <table className="w-full text-left">
                                                    <thead>
                                                        <tr className="bg-muted border-b">
                                                            <th className="py-3 px-4 text-base font-semibold">間取り</th>
                                                            <th className="py-3 px-4 text-base font-semibold">料金目安</th>
                                                            <th className="py-3 px-4 text-base font-semibold hidden sm:table-cell">作業時間</th>
                                                            <th className="py-3 px-4 text-base font-semibold hidden sm:table-cell">スタッフ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {pricePlans.map((plan, i) => (
                                                            <tr
                                                                key={plan.id}
                                                                className={`border-b last:border-0 ${
                                                                    i % 2 === 0 ? "bg-card" : "bg-muted/40"
                                                                }`}
                                                            >
                                                                <td className="py-3 px-4 font-semibold text-base">
                                                                    {plan.room_type}
                                                                </td>
                                                                <td className="py-3 px-4 text-base font-medium text-primary">
                                                                    {plan.price_from && plan.price_to
                                                                        ? `${plan.price_from.toLocaleString()}〜${plan.price_to.toLocaleString()}円`
                                                                        : plan.price_from
                                                                        ? `${plan.price_from.toLocaleString()}円〜`
                                                                        : "お問い合わせ"}
                                                                </td>
                                                                <td className="py-3 px-4 text-base text-muted-foreground hidden sm:table-cell">
                                                                    {plan.duration_hours || "−"}
                                                                </td>
                                                                <td className="py-3 px-4 text-base text-muted-foreground hidden sm:table-cell">
                                                                    {plan.staff_count || "−"}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <p className="mt-3 text-base text-muted-foreground">
                                                ※料金はあくまで目安です。荷物量・状況により変動します。正確な料金は無料見積もりでご確認ください。
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 口コミ */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                                            口コミ（{reviews.length}件）
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {reviews.length === 0 ? (
                                            <p className="text-lg text-muted-foreground">
                                                まだ口コミはありません。
                                            </p>
                                        ) : (
                                            <div className="space-y-6">
                                                {reviews.map((review) => {
                                                    const areaName = areas.find(
                                                        (a) => a.slug === review.area_slug
                                                    )?.name;
                                                    return (
                                                        <div key={review.id}>
                                                            <div className="mb-3 flex flex-wrap items-center gap-3">
                                                                <div className="flex items-center gap-1">
                                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-5 w-5 ${
                                                                                i < (review.rating || 0)
                                                                                    ? "fill-accent text-accent"
                                                                                    : "text-border"
                                                                            }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-base font-semibold">
                                                                    {review.nickname}
                                                                </span>
                                                                {areaName && (
                                                                    <Badge variant="secondary" className="text-sm">
                                                                        <MapPin className="mr-1 h-3.5 w-3.5" />
                                                                        {areaName}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="relative pl-5">
                                                                <Quote className="absolute left-0 top-1 h-4 w-4 text-muted-foreground/30" />
                                                                <p className="text-base text-muted-foreground leading-relaxed">
                                                                    {review.body}
                                                                </p>
                                                            </div>
                                                            <Separator className="mt-6" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>

                                {/* よくある質問 */}
                                {faqs.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl flex items-center gap-2">
                                                <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                                                よくある質問
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {faqs.map((faq) => (
                                                    <details
                                                        key={faq.id}
                                                        className="group rounded-lg border overflow-hidden"
                                                    >
                                                        <summary className="flex cursor-pointer list-none items-start gap-3 p-4 hover:bg-muted/50 transition-colors">
                                                            <span className="text-accent font-bold text-xl shrink-0 mt-0.5">Q</span>
                                                            <span className="flex-1 text-base font-semibold leading-relaxed">
                                                                {faq.question}
                                                            </span>
                                                            <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5 group-open:rotate-180 transition-transform" />
                                                        </summary>
                                                        <div className="flex gap-3 border-t bg-muted/30 px-4 py-4">
                                                            <span className="text-primary font-bold text-xl shrink-0 mt-0.5">A</span>
                                                            <p className="text-base leading-relaxed text-foreground">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </details>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            {/* サイドバー（1/3） */}
                            <div className="space-y-6">
                                {/* 料金情報 */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">料金情報</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {vendor.min_price ? (
                                            <div>
                                                <p className="text-sm text-muted-foreground">料金目安（最安）</p>
                                                <p className="text-3xl font-bold text-foreground mt-1">
                                                    {vendor.min_price.toLocaleString()}
                                                    <span className="text-lg font-normal">円〜</span>
                                                </p>
                                                <p className="mt-2 text-sm text-muted-foreground">
                                                    ※お部屋の広さや荷物量により変動します
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-base text-muted-foreground">
                                                お問い合わせください
                                            </p>
                                        )}
                                        <Separator className="my-4" />
                                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base h-12">
                                            無料見積もりを依頼
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* 対応エリア */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">対応エリア</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-2">
                                            {serviceAreaNames.map((name) => (
                                                <Badge
                                                    key={name}
                                                    variant="secondary"
                                                    className="text-sm py-1 px-2"
                                                >
                                                    <MapPin className="mr-1 h-3.5 w-3.5" />
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* 会社情報 */}
                                {hasCompanyInfo && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">会社情報</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            {vendor.address && (
                                                <div className="flex gap-2">
                                                    <MapPin className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
                                                    <p className="text-base leading-relaxed">{vendor.address}</p>
                                                </div>
                                            )}
                                            {vendor.representative_name && (
                                                <div className="flex gap-2">
                                                    <User className="h-5 w-5 shrink-0 text-muted-foreground" />
                                                    <p className="text-base">代表者：{vendor.representative_name}</p>
                                                </div>
                                            )}
                                            {vendor.business_hours && (
                                                <div className="flex gap-2">
                                                    <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
                                                    <p className="text-base">{vendor.business_hours}</p>
                                                </div>
                                            )}
                                            {vendor.established_year && (
                                                <div className="flex gap-2">
                                                    <Calendar className="h-5 w-5 shrink-0 text-muted-foreground" />
                                                    <p className="text-base">設立：{vendor.established_year}年</p>
                                                </div>
                                            )}
                                            {vendor.employee_count && (
                                                <div className="flex gap-2">
                                                    <Users className="h-5 w-5 shrink-0 text-muted-foreground" />
                                                    <p className="text-base">スタッフ：{vendor.employee_count}</p>
                                                </div>
                                            )}
                                            {vendor.website_url && (
                                                <div className="flex gap-2">
                                                    <ExternalLink className="h-5 w-5 shrink-0 text-muted-foreground" />
                                                    <a
                                                        href={vendor.website_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-base text-primary hover:underline"
                                                    >
                                                        公式サイトを見る
                                                    </a>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 資格・許認可 */}
                                {vendor.certifications && vendor.certifications.length > 0 && (
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">資格・許認可</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {vendor.certifications.map((cert) => (
                                                    <div key={cert} className="flex items-center gap-2">
                                                        <Shield className="h-5 w-5 shrink-0 text-accent" />
                                                        <span className="text-base">{cert}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* 相談する */}
                                <Card className="border-primary/30 bg-primary/5">
                                    <CardContent className="pt-6">
                                        <h3 className="text-lg font-bold text-foreground mb-1 text-center">
                                            この業者に相談する
                                        </h3>
                                        <p className="text-base text-muted-foreground mb-4 text-center">
                                            みんなの家株式会社が窓口対応します
                                        </p>
                                        <Link href="/contact">
                                            <Button className="w-full text-base h-12">
                                                無料相談フォームへ
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <a href={`tel:${COMPANY.phone.replace(/-/g, '')}`}>
                                            <Button
                                                variant="outline"
                                                className="mt-3 w-full text-base h-12"
                                            >
                                                <Phone className="mr-2 h-5 w-5" />
                                                {COMPANY.phone}
                                            </Button>
                                        </a>
                                        <p className="mt-3 text-center text-sm text-muted-foreground">
                                            {COMPANY.businessHours}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch {
        notFound();
    }
}
