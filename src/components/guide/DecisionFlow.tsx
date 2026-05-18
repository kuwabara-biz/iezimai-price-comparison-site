"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

type NodeId =
    | "start"
    | "parent_alive"
    | "inherited"
    | "distance"
    | "sellable"
    | "result_parent_alive"
    | "result_inherited"
    | "result_unsellable"
    | "result_distant"
    | "result_cost";

interface Option {
    label: string;
    next: NodeId;
}

interface NodeData {
    question: string;
    description?: string;
    options: Option[];
}

interface ResultData {
    title: string;
    sub: string;
    href: string;
    cta: string;
    description: string;
    color: string;
}

const NODES: Record<string, NodeData> = {
    start: {
        question: "親はまだお元気ですか？",
        description: "親が存命のうちにできる対策と、相続後の対策では進め方が大きく異なります。",
        options: [
            { label: "はい、存命です", next: "parent_alive" },
            { label: "いいえ、相続が発生しました", next: "inherited" },
        ],
    },
    parent_alive: {
        question: "施設入居・認知症リスクの不安はありますか？",
        options: [
            { label: "ある（生前整理を進めたい）", next: "result_parent_alive" },
            { label: "ない（とにかく費用が知りたい）", next: "result_cost" },
        ],
    },
    inherited: {
        question: "ご実家とご自身の住まいの距離は？",
        options: [
            { label: "近い（埼玉県内・近県）", next: "sellable" },
            { label: "遠方（新幹線で行く距離）", next: "distance" },
        ],
    },
    distance: {
        question: "立ち会いに何度も来られますか？",
        options: [
            { label: "ほぼ無理", next: "result_distant" },
            { label: "数回なら可", next: "sellable" },
        ],
    },
    sellable: {
        question: "「再建築不可」「接道なし」など売却に難ありの心当たりは？",
        description: "心当たりがある場合は、別の戦略が必要になります。",
        options: [
            { label: "ある／不安", next: "result_unsellable" },
            { label: "ない／普通の物件", next: "result_inherited" },
        ],
    },
};

const RESULTS: Record<string, ResultData> = {
    result_parent_alive: {
        title: "親存命型の進め方を読む",
        sub: "CASE 01",
        href: "/guide/parent-alive",
        cta: "親存命型ガイドへ",
        description:
            "親が元気なうちに進められる片付け・話し合い・任意後見契約のポイントを整理。認知症リスクで動けなくなる前にやっておく順番が分かります。",
        color: "from-rose-500 to-rose-400",
    },
    result_inherited: {
        title: "相続後型の進め方を読む",
        sub: "CASE 02",
        href: "/guide/inherited",
        cta: "相続後型ガイドへ",
        description:
            "相続発生から3,000万円特例の3年期限までの工程を時系列で。登記・遺品整理・査定の最適な並び方が分かります。",
        color: "from-amber-500 to-amber-400",
    },
    result_unsellable: {
        title: "売れない実家の対処法を読む",
        sub: "CASE 03",
        href: "/guide/unsellable",
        cta: "対処法ガイドへ",
        description:
            "再建築不可・接道なし・境界未確定など「価格を下げても売れない」物件の打開策。買取・隣地交渉・空き家バンクなど5つの選択肢。",
        color: "from-violet-500 to-violet-400",
    },
    result_distant: {
        title: "遠方居住者の実家じまいを読む",
        sub: "CASE 04",
        href: "/guide/distant",
        cta: "遠方居住者ガイドへ",
        description:
            "現地に行けない遠方相続人向け。ワンストップ業者を使った立ち会い不要の進め方と、トラブル回避のチェックリスト。",
        color: "from-teal-500 to-teal-400",
    },
    result_cost: {
        title: "費用相場完全ガイドを読む",
        sub: "COST",
        href: "/guide/cost",
        cta: "費用相場ガイドへ",
        description:
            "30坪木造のモデルケースで、遺品整理・解体・仲介手数料・税金まで全項目をシミュレーション。「手取り額」で判断するコツが分かります。",
        color: "from-emerald-500 to-emerald-400",
    },
};

export default function DecisionFlow() {
    const [history, setHistory] = useState<NodeId[]>(["start"]);
    const current = history[history.length - 1];
    const node = NODES[current];
    const result = RESULTS[current];

    const select = (next: NodeId) => setHistory([...history, next]);
    const back = () => setHistory(history.slice(0, -1));
    const reset = () => setHistory(["start"]);

    const step = history.length;
    const totalSteps = 3;

    return (
        <div className="my-10 overflow-hidden rounded-3xl border border-border bg-white shadow-md">
            <div className="flex items-center justify-between gap-4 bg-gradient-to-r from-accent to-amber-500 px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 ring-2 ring-white/30">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest opacity-90">
                            INTERACTIVE
                        </p>
                        <h3 className="text-base font-bold md:text-lg">
                            あなたに合う記事 30秒診断
                        </h3>
                    </div>
                </div>
                {history.length > 1 && (
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/30"
                    >
                        <RotateCcw className="h-3 w-3" />
                        最初から
                    </button>
                )}
            </div>

            {/* プログレスバー */}
            <div className="h-1 w-full bg-secondary">
                <motion.div
                    className="h-full bg-gradient-to-r from-accent to-amber-400"
                    initial={false}
                    animate={{
                        width: result
                            ? "100%"
                            : `${Math.min((step / totalSteps) * 100, 95)}%`,
                    }}
                    transition={{ duration: 0.4 }}
                />
            </div>

            <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {result ? (
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.35 }}
                        >
                            <p className="text-xs font-bold tracking-widest text-accent">
                                おすすめの記事
                            </p>
                            <h4 className="mt-2 text-xl font-bold leading-snug text-foreground md:text-2xl">
                                {result.title}
                            </h4>
                            <div
                                className={`mt-4 rounded-2xl bg-gradient-to-br ${result.color} p-5 text-white shadow-lg`}
                            >
                                <p className="text-xs font-bold tracking-widest opacity-90">
                                    {result.sub}
                                </p>
                                <p className="mt-2 text-sm leading-relaxed">
                                    {result.description}
                                </p>
                                <Link href={result.href} className="mt-4 inline-block">
                                    <button className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-foreground shadow-md transition-transform hover:scale-[1.02]">
                                        {result.cta}
                                        <ArrowRight className="h-4 w-4 text-accent" />
                                    </button>
                                </Link>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <button
                                    onClick={back}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    やり直す
                                </button>
                                <Link
                                    href="/contact"
                                    className="text-sm font-semibold text-accent hover:underline"
                                >
                                    まず無料で相談する →
                                </Link>
                            </div>
                        </motion.div>
                    ) : node ? (
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 24 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -24 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-xs font-bold tracking-widest text-muted-foreground">
                                Q{step}.
                            </p>
                            <h4 className="mt-2 text-xl font-bold leading-snug text-foreground md:text-2xl">
                                {node.question}
                            </h4>
                            {node.description && (
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {node.description}
                                </p>
                            )}
                            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                                {node.options.map((opt) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => select(opt.next)}
                                        className="group flex items-center justify-between gap-3 rounded-xl border-2 border-border bg-secondary/30 p-4 text-left transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-white hover:shadow-md"
                                    >
                                        <span className="text-sm font-semibold text-foreground md:text-base">
                                            {opt.label}
                                        </span>
                                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                                    </button>
                                ))}
                            </div>

                            {history.length > 1 && (
                                <button
                                    onClick={back}
                                    className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground"
                                >
                                    <ArrowLeft className="h-3 w-3" />
                                    1つ戻る
                                </button>
                            )}
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </div>
        </div>
    );
}
