"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  Camera,
  Clock,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Star,
  MessageCircle,
  ArrowRight,
  Building,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockAreas, getAreasByRegion, mockVendors } from "@/lib/mock-data";

export default function HomePage() {
  const [saitamaExpanded, setSaitamaExpanded] = useState(false);

  const saitamaAreas = getAreasByRegion("saitama");
  const saitamaMajor = saitamaAreas.slice(0, 5);
  const saitamaRest = saitamaAreas.slice(5);
  const northKantoAreas = getAreasByRegion("north-kanto");

  const featuredVendors = mockVendors
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary/90 py-16 md:py-24">
        {/* 背景パターン */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute left-0 top-0 h-full w-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <Badge
            variant="secondary"
            className="mb-6 border-accent bg-accent/20 px-4 py-1.5 text-sm text-white"
          >
            埼玉・北関東エリア専門
          </Badge>
          <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            埼玉・北関東の遺品整理なら
            <br />
            <span className="text-accent">お任せください。</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base text-white/80 md:text-lg">
            地元を知り尽くした優良業者のみを厳選掲載。
            <br className="hidden sm:block" />
            口コミ・料金で比較して最適な業者を見つけられます。
          </p>

          {/* Trust badges */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4 text-sm text-white/70">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-accent" />
              <span>全業者審査済み</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              <span>最短即日見積もり</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="h-4 w-4 text-accent" />
              <span>口コミで選べる</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Area Search Section ===== */}
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

      {/* ===== CTA - 一括査定 ===== */}
      <section id="cta" className="relative overflow-hidden bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
            <div className="text-center">
              <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/10">
                コンシェルジュサービス
              </Badge>
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                業者選びも、空き家の売却も、
                <br />
                <span className="text-accent">これ1つで解決。</span>
              </h2>
              <p className="mb-6 text-muted-foreground">
                写真を送るだけで、地元相場に強いプロが概算見積もり。
                <br className="hidden sm:block" />
                <span className="text-sm">
                  ※遺品整理後の「空き家買取・解体」のご相談も、地元の専門チームが承ります。（運営：家じまい.com）
                </span>
              </p>
              <Button
                size="lg"
                className="w-full bg-[#06C755] text-white shadow-lg transition-all hover:bg-[#06C755]/90 hover:shadow-xl sm:w-auto sm:px-12"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                LINEで写真を送る（埼玉・北関東専用窓口）
              </Button>
              <p className="mt-3 text-xs text-muted-foreground">
                ※ 無料 ・ 営業電話なし ・ 最短30分で概算提示
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 利用の流れ ===== */}
      <section id="flow" className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              ご利用の流れ
            </h2>
            <p className="mt-2 text-muted-foreground">簡単3ステップで完了</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: <Camera className="h-7 w-7" />,
                title: "写真を撮って送信",
                description: "お部屋の様子をスマホで撮影し、LINEまたはフォームから送るだけ。",
              },
              {
                step: "02",
                icon: <Search className="h-7 w-7" />,
                title: "地元のプロが査定",
                description: "地域の相場を熟知した専門スタッフが、写真をもとに概算をお出しします。",
              },
              {
                step: "03",
                icon: <CheckCircle2 className="h-7 w-7" />,
                title: "最適な業者をご紹介",
                description: "ご要望に合った審査済み業者をご紹介。空き家の売却もご相談可能です。",
              },
            ].map((item) => (
              <Card
                key={item.step}
                className="relative overflow-hidden border-border pt-0 transition-shadow hover:shadow-md"
              >
                <div className="bg-primary px-4 py-2 text-center">
                  <span className="text-sm font-bold text-accent">
                    STEP {item.step}
                  </span>
                </div>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 高評価業者 ===== */}
      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              高評価の業者
            </h2>
            <p className="mt-2 text-muted-foreground">
              口コミ評価の高い業者をピックアップ
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {featuredVendors.map((vendor) => (
              <Link key={vendor.id} href={`/vendor/${vendor.slug}`}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-semibold">
                          {vendor.rating}
                        </span>
                      </div>
                      {vendor.has_real_estate_partnership && (
                        <Badge className="bg-accent/10 text-accent hover:bg-accent/10">
                          <Building className="mr-1 h-3 w-3" />
                          不動産買取可
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-base">{vendor.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                      {vendor.description}
                    </p>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {vendor.features?.slice(0, 3).map((f) => (
                        <Badge key={f} variant="secondary" className="text-xs">
                          {f}
                        </Badge>
                      ))}
                    </div>
                    {vendor.min_price && (
                      <p className="text-sm text-muted-foreground">
                        料金目安：
                        <span className="font-semibold text-foreground">
                          {vendor.min_price.toLocaleString()}円〜
                        </span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 安心ポイント ===== */}
      <section id="about" className="bg-white py-12 md:py-16">
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
                title: "無許可業者は掲載しません",
                description: "すべての掲載業者は、一般廃棄物収集運搬許可等の資格を確認済み。安心してお任せいただけます。",
              },
              {
                icon: <Building className="h-6 w-6" />,
                title: "空き家の売却・解体もワンストップ",
                description: "遺品整理だけでなく、空き家の不動産査定・売却・解体まで一括でご相談いただけます。",
              },
              {
                icon: <Users className="h-6 w-6" />,
                title: "地域密着だから適正価格",
                description: "埼玉・北関東の相場を熟知した地元業者のみを掲載。地域に適した価格でサービスを受けられます。",
              },
              {
                icon: <Clock className="h-6 w-6" />,
                title: "最短即日で見積もり",
                description: "写真を送るだけで概算見積もりを提示。急ぎの場合も柔軟に対応します。",
              },
            ].map((item, index) => (
              <Card key={index} className="border-border transition-shadow hover:shadow-md">
                <CardContent className="flex gap-4 pt-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 最終CTA ===== */}
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
  );
}
