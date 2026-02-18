import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    Star,
    Building,
    MapPin,
    Phone,
    ExternalLink,
    MessageCircle,
    CheckCircle2,
    Quote,
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
} from "@/lib/supabase-helpers";
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
        const reviews = await getApprovedReviews(vendor.id);
        const areas = await getAreas();

        const serviceAreaNames = vendor.service_areas
            ?.map((s) => areas.find((a) => a.slug === s)?.name)
            .filter(Boolean) || [];

        const avgRating =
            reviews.length > 0
                ? (
                    reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
                ).toFixed(1)
                : vendor.rating;

        return (
            <div className="min-h-screen bg-secondary">
                {/* Header */}
                <section className="bg-primary py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Link href="/" className="hover:text-accent">トップ</Link>
                            <span>/</span>
                            <span className="text-white">{vendor.name}</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                                {vendor.image_url && (
                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white">
                                        <Image
                                            src={vendor.image_url}
                                            alt={vendor.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-accent text-accent" />
                                            <span className="text-xl font-bold text-white">{avgRating}</span>
                                        </div>
                                        <span className="text-sm text-white/60">
                                            （口コミ {reviews.length}件）
                                        </span>
                                        {vendor.has_real_estate_partnership && (
                                            <Badge className="bg-accent text-accent-foreground">
                                                <Building className="mr-1 h-3 w-3" />
                                                不動産買取可
                                            </Badge>
                                        )}
                                    </div>
                                    <h1 className="text-2xl font-bold text-white md:text-3xl">
                                        {vendor.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {vendor.phone && (
                                    <Button
                                        variant="outline"
                                        className="border-white/30 bg-transparent text-white hover:bg-white/10"
                                    >
                                        <Phone className="mr-2 h-4 w-4" />
                                        {vendor.phone}
                                    </Button>
                                )}
                                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    LINEで相談
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-6 lg:grid-cols-3">
                            {/* Main Content */}
                            <div className="space-y-6 lg:col-span-2">
                                {/* Description */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">業者紹介</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="leading-relaxed text-muted-foreground">
                                            {vendor.description}
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Features */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">特徴・サービス</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-3 sm:grid-cols-2">
                                            {vendor.features?.map((f) => (
                                                <div key={f} className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                                                    <span className="text-sm">{f}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Reviews */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">
                                            口コミ（{reviews.length}件）
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {reviews.length === 0 ? (
                                            <p className="text-sm text-muted-foreground">
                                                まだ口コミはありません。
                                            </p>
                                        ) : (
                                            <div className="space-y-4">
                                                {reviews.map((review) => {
                                                    const areaName = areas.find(
                                                        (a) => a.slug === review.area_slug
                                                    )?.name;
                                                    return (
                                                        <div key={review.id}>
                                                            <div className="mb-2 flex items-center gap-2">
                                                                <div className="flex items-center gap-0.5">
                                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                                        <Star
                                                                            key={i}
                                                                            className={`h-3.5 w-3.5 ${i < (review.rating || 0)
                                                                                ? "fill-accent text-accent"
                                                                                : "text-border"
                                                                                }`}
                                                                        />
                                                                    ))}
                                                                </div>
                                                                <span className="text-sm font-medium">
                                                                    {review.nickname}
                                                                </span>
                                                                {areaName && (
                                                                    <Badge variant="secondary" className="text-xs">
                                                                        <MapPin className="mr-0.5 h-3 w-3" />
                                                                        {areaName}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="relative pl-4">
                                                                <Quote className="absolute left-0 top-0 h-3 w-3 text-muted-foreground/30" />
                                                                <p className="text-sm text-muted-foreground">
                                                                    {review.body}
                                                                </p>
                                                            </div>
                                                            <Separator className="mt-4" />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Price */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">料金情報</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {vendor.min_price ? (
                                            <div>
                                                <p className="text-xs text-muted-foreground">料金目安</p>
                                                <p className="text-2xl font-bold text-foreground">
                                                    {vendor.min_price.toLocaleString()}
                                                    <span className="text-base font-normal">円〜</span>
                                                </p>
                                                <p className="mt-2 text-xs text-muted-foreground">
                                                    ※お部屋の広さや荷物量により変動します
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-muted-foreground">
                                                お問い合わせください
                                            </p>
                                        )}
                                        <Separator className="my-4" />
                                        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                                            無料見積もりを依頼
                                        </Button>
                                    </CardContent>
                                </Card>

                                {/* Service Areas */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">対応エリア</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5">
                                            {serviceAreaNames.map((name) => (
                                                <Badge key={name} variant="secondary" className="text-xs">
                                                    <MapPin className="mr-0.5 h-3 w-3" />
                                                    {name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Contact */}
                                <Card className="border-accent/30 bg-accent/5">
                                    <CardContent className="pt-6 text-center">
                                        <h3 className="mb-2 font-semibold text-foreground">
                                            この業者に相談する
                                        </h3>
                                        <p className="mb-4 text-sm text-muted-foreground">
                                            写真を送って無料見積もり
                                        </p>
                                        <Button
                                            className="w-full bg-[#06C755] text-white hover:bg-[#06C755]/90"
                                        >
                                            <MessageCircle className="mr-2 h-4 w-4" />
                                            LINEで相談
                                        </Button>
                                        {vendor.phone && (
                                            <Button
                                                variant="outline"
                                                className="mt-2 w-full"
                                            >
                                                <Phone className="mr-2 h-4 w-4" />
                                                電話で相談: {vendor.phone}
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
