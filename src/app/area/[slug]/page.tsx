import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Building, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAreas, getAreaBySlug, getVendorsByArea } from "@/lib/supabase-helpers";
import type { Metadata } from "next";

interface AreaPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const areas = await getAreas();
    return areas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const area = await getAreaBySlug(slug);
        return {
            title: `${area.name}の遺品整理業者一覧 | 口コミ・料金で比較`,
            description: `${area.name}で遺品整理業者をお探しなら家じまい.com。審査済みの優良業者を口コミ・料金で比較。空き家の買取・解体もご相談ください。`,
        };
    } catch {
        return {};
    }
}

export default async function AreaPage({ params }: AreaPageProps) {
    const { slug } = await params;

    try {
        const area = await getAreaBySlug(slug);
        const vendors = await getVendorsByArea(slug);

        return (
            <div className="min-h-screen bg-secondary">
                {/* Area Header */}
                <section className="bg-primary py-10 md:py-14">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                            <Link href="/" className="hover:text-accent">トップ</Link>
                            <span>/</span>
                            <span className="text-white">{area.name}</span>
                        </div>
                        <h1 className="mt-3 text-2xl font-bold text-white md:text-4xl">
                            <MapPin className="mr-2 inline-block h-6 w-6 text-accent" />
                            {area.name}の遺品整理業者
                        </h1>
                        <p className="mt-2 text-white/70">
                            {area.name}で対応可能な審査済み業者{vendors.length}社を掲載中
                        </p>
                    </div>
                </section>

                {/* Vendor List */}
                <section className="py-8 md:py-12">
                    <div className="container mx-auto px-4">
                        {vendors.length === 0 ? (
                            <Card className="py-12 text-center">
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        現在、{area.name}に対応可能な業者は登録されていません。
                                    </p>
                                    <Button className="mt-4 bg-accent text-accent-foreground hover:bg-accent/90">
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        LINEで直接ご相談ください
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {vendors.map((vendor, index) => (
                                    <Card
                                        key={vendor.id}
                                        className={`transition-all hover:shadow-lg ${vendor.has_real_estate_partnership
                                            ? "border-accent/30 bg-accent/5"
                                            : ""
                                            }`}
                                    >
                                        <CardContent className="p-5 md:p-6">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                                {/* Left: Info */}
                                                <div className="flex-1">
                                                    <div className="mb-2 flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-medium text-muted-foreground">
                                                            {index + 1}位
                                                        </span>
                                                        <div className="flex items-center gap-1">
                                                            <Star className="h-4 w-4 fill-accent text-accent" />
                                                            <span className="text-sm font-bold">{vendor.rating}</span>
                                                        </div>
                                                        {vendor.has_real_estate_partnership && (
                                                            <Badge className="bg-accent text-accent-foreground">
                                                                <Building className="mr-1 h-3 w-3" />
                                                                不動産買取可
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    <h2 className="mb-2 text-lg font-bold text-foreground">
                                                        <Link
                                                            href={`/vendor/${vendor.slug}`}
                                                            className="hover:text-accent"
                                                        >
                                                            {vendor.name}
                                                        </Link>
                                                    </h2>

                                                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                                                        {vendor.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-1.5">
                                                        {vendor.features?.map((f) => (
                                                            <Badge key={f} variant="secondary" className="text-xs">
                                                                {f}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Right: Price & CTA */}
                                                <div className="flex flex-col items-end gap-3 md:min-w-[180px]">
                                                    {vendor.min_price && (
                                                        <div className="text-right">
                                                            <p className="text-xs text-muted-foreground">料金目安</p>
                                                            <p className="text-lg font-bold text-foreground">
                                                                {vendor.min_price.toLocaleString()}
                                                                <span className="text-sm font-normal">円〜</span>
                                                            </p>
                                                        </div>
                                                    )}
                                                    <Link href={`/vendor/${vendor.slug}`} className="w-full md:w-auto">
                                                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 md:w-auto">
                                                            詳細を見る
                                                            <ArrowRight className="ml-1 h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}

                        {/* CTA */}
                        <Card className="mt-8 border-accent/30 bg-accent/5">
                            <CardContent className="p-6 text-center md:p-8">
                                <h3 className="mb-2 text-lg font-bold text-foreground">
                                    {area.name}の遺品整理、まだ迷っていますか？
                                </h3>
                                <p className="mb-4 text-sm text-muted-foreground">
                                    写真を送るだけで地元のプロが概算見積もりをお出しします
                                </p>
                                <Button
                                    size="lg"
                                    className="bg-[#06C755] text-white hover:bg-[#06C755]/90"
                                >
                                    <MessageCircle className="mr-2 h-5 w-5" />
                                    LINEで無料相談
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </section>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
