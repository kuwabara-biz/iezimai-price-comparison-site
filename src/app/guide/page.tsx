import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    GUIDE_HUB,
    GUIDE_ARTICLES,
    type GuideArticle,
    type GuideCategory,
} from "@/lib/guide";
import ArticleHeader from "@/components/guide/ArticleHeader";
import ProcessTimeline from "@/components/guide/ProcessTimeline";
import DecisionFlow from "@/components/guide/DecisionFlow";
import CostSimulator from "@/components/guide/CostSimulator";
import InlineCTA from "@/components/guide/InlineCTA";
import Callout from "@/components/guide/Callout";
import { getGuideIcon } from "@/components/guide/icon-map";

export const metadata: Metadata = {
    title: GUIDE_HUB.title,
    description: GUIDE_HUB.description,
};

const CATEGORIES: { key: GuideCategory; label: string; sub: string }[] = [
    {
        key: "読者の状況別",
        label: "読者の状況別に読む",
        sub: "まずはご自身の今の状況に近い記事から",
    },
    {
        key: "深掘り情報",
        label: "費用・補助金を深掘り",
        sub: "数字で全体像を掴みたい方向け",
    },
    {
        key: "問題解決",
        label: "個別の悩みを解決",
        sub: "売れない・遠方など、ピンポイントの相談",
    },
];

function ArticleCard({ article }: { article: GuideArticle }) {
    const Icon = getGuideIcon(article.iconKey);
    const inner = (
        <div
            className={`group relative flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition-all md:p-6 ${
                article.available
                    ? "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg"
                    : ""
            }`}
        >
            <div className="mb-4 flex items-center justify-between gap-2">
                <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${article.badgeColor}`}
                >
                    <Icon className="h-3 w-3" />
                    {article.badge}
                </span>
                {!article.available && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        準備中
                    </span>
                )}
            </div>
            <h3 className="text-lg font-bold leading-snug text-foreground md:text-xl">
                {article.shortTitle}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {article.description}
            </p>
            {article.available ? (
                <span className="mt-5 inline-flex items-center text-sm font-semibold text-accent">
                    記事を読む（約 {article.readingMinutes} 分）
                    <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
            ) : (
                <span className="mt-5 text-sm font-semibold text-muted-foreground">
                    近日公開
                </span>
            )}
        </div>
    );

    if (!article.available) {
        return <div className="opacity-70">{inner}</div>;
    }
    return (
        <Link href={article.href} className="block h-full">
            {inner}
        </Link>
    );
}

export default function GuideHubPage() {
    return (
        <div className="bg-background">
            <ArticleHeader
                article={GUIDE_HUB}
                lead="相続発生から売却・登記まで、実家じまいに必要な工程は10〜20ステップ。本ガイドでは「全体像」「費用」「順番」「埼玉県の補助金」を1枚の地図にまとめました。まずは下の30秒診断で、ご自身に必要な記事を絞り込んでください。"
                updatedAt="2026年5月"
            />

            <div className="container mx-auto px-4 py-12 md:py-16">
                <div className="mx-auto max-w-4xl space-y-12">
                    {/* 30秒診断 */}
                    <section>
                        <SectionHeader
                            eyebrow="STEP 1"
                            title="あなたに合う記事を診断"
                            description="3つの質問に答えるだけで、最初に読むべき記事をご案内します。"
                        />
                        <DecisionFlow />
                    </section>

                    {/* 全工程の地図 */}
                    <section>
                        <SectionHeader
                            eyebrow="STEP 2"
                            title="実家じまいの全工程を俯瞰する"
                            description="各ステップに必要な期間と作業を、6段階のタイムラインで把握できます。"
                        />
                        <ProcessTimeline />
                        <Callout variant="tip" title="多くの方がつまずくポイント">
                            「相続登記 → 遺品整理 → 査定」の順番を間違えると、3,000万円特例の期限切れや、解体業者の見積もりやり直しが発生します。
                            <strong>順番を守ることが、費用と税金の両方を節約する最短ルート</strong>です。
                        </Callout>
                    </section>

                    {/* シミュレーター */}
                    <section>
                        <SectionHeader
                            eyebrow="STEP 3"
                            title="費用と手取り額をシミュレーション"
                            description="間取り・売却方法・補助金の有無を入れると、お手元に残る金額の概算が出ます。"
                        />
                        <CostSimulator />
                    </section>

                    <InlineCTA />

                    {/* 記事一覧 */}
                    <section>
                        <SectionHeader
                            eyebrow="STEP 4"
                            title="状況に合わせて、深掘り記事へ"
                            description="6つの子記事から、ご自身に必要な情報をピンポイントで。"
                        />
                        <div className="space-y-10">
                            {CATEGORIES.map((cat) => {
                                const items = GUIDE_ARTICLES.filter(
                                    (a) => a.category === cat.key
                                );
                                if (items.length === 0) return null;
                                return (
                                    <div key={cat.key}>
                                        <div className="mb-4 flex items-baseline gap-3">
                                            <Sparkles className="h-4 w-4 text-accent" />
                                            <div>
                                                <h3 className="text-base font-bold text-foreground md:text-lg">
                                                    {cat.label}
                                                </h3>
                                                <p className="text-xs text-muted-foreground md:text-sm">
                                                    {cat.sub}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {items.map((a) => (
                                                <ArticleCard key={a.slug} article={a} />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 最終 CTA */}
                    <section>
                        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] p-8 text-white shadow-xl md:p-12">
                            <div className="flex items-start gap-3">
                                <BookOpen className="h-6 w-6 shrink-0 text-accent" />
                                <div>
                                    <h2 className="text-xl font-bold leading-snug md:text-2xl">
                                        記事だけで決められなかった方へ
                                    </h2>
                                    <p className="mt-3 text-sm leading-relaxed text-white/85 md:text-base">
                                        埼玉県内であれば、物件情報をお伺いするだけで、遺品整理〜売却・税金まで含めた手取り額のシミュレーションを無料で作成します。
                                        「まだ何も決まっていない段階」のご相談こそ歓迎です。
                                    </p>
                                    <Link href="/contact" className="mt-6 inline-block">
                                        <Button
                                            size="lg"
                                            className="h-12 bg-accent px-6 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90"
                                        >
                                            無料で個別相談する
                                            <ArrowRight className="ml-1.5 h-5 w-5" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function SectionHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow: string;
    title: string;
    description: string;
}) {
    return (
        <div className="mb-6">
            <span className="section-eyebrow">{eyebrow}</span>
            <h2 className="mt-2 section-title">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">{description}</p>
        </div>
    );
}
