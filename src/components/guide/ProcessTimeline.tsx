"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    FileText,
    PackageOpen,
    ClipboardList,
    Building2,
    Hammer,
    Banknote,
    CheckCircle2,
    ClipboardCheck,
    FileSearch,
    HandCoins,
    Inbox,
    Send,
    type LucideIcon,
} from "lucide-react";

export type TimelineIconKey =
    | "file"
    | "package"
    | "clipboard"
    | "clipboard-check"
    | "building"
    | "hammer"
    | "bank"
    | "search"
    | "coins"
    | "inbox"
    | "send";

const ICONS: Record<TimelineIconKey, LucideIcon> = {
    file: FileText,
    package: PackageOpen,
    clipboard: ClipboardList,
    "clipboard-check": ClipboardCheck,
    building: Building2,
    hammer: Hammer,
    bank: Banknote,
    search: FileSearch,
    coins: HandCoins,
    inbox: Inbox,
    send: Send,
};

export interface TimelineStep {
    id: string;
    label: string;
    duration: string;
    description: string;
    body: string;
    icon: TimelineIconKey;
    color: string;
}

export const DEFAULT_STEPS: TimelineStep[] = [
    {
        id: "inherit",
        label: "相続発生",
        duration: "0〜3ヶ月",
        description: "死亡届・遺産分割協議",
        body:
            "死亡届 7日以内・健康保険など 14日以内・相続放棄 3ヶ月以内など、期限の短い手続きが集中します。遺言書の有無で進め方が大きく変わるため、まず確認を。",
        icon: "file",
        color: "from-rose-500 to-rose-400",
    },
    {
        id: "registration",
        label: "相続登記",
        duration: "3〜12ヶ月",
        description: "義務化された名義変更",
        body:
            "2024年4月から相続登記が義務化。3年以内に行わないと10万円以下の過料の対象に。司法書士費用は5〜10万円、登録免許税は固定資産税評価額の0.4%。",
        icon: "clipboard",
        color: "from-amber-500 to-amber-400",
    },
    {
        id: "ihin",
        label: "遺品整理",
        duration: "1〜3ヶ月",
        description: "業者依頼で2〜5日",
        body:
            "30坪戸建てで25〜45万円が相場。買取可能な家財はリサイクル業者を活用すると総額を抑えられます。解体を選ぶ場合は丸ごと依頼でも可。",
        icon: "package",
        color: "from-orange-500 to-orange-400",
    },
    {
        id: "assess",
        label: "不動産査定",
        duration: "1〜2週間",
        description: "仲介 / 買取の見極め",
        body:
            "最低3社、可能なら5社から相見積もり。「仲介で時間をかけて高く売る」「買取で即現金化」のどちらが手取りで有利か、業者にシミュレーションしてもらうのが鍵。",
        icon: "building",
        color: "from-emerald-500 to-emerald-400",
    },
    {
        id: "sell",
        label: "売却 / 解体",
        duration: "1〜6ヶ月",
        description: "戦略次第で大きく変動",
        body:
            "現況売却なら最短数週間。解体して土地として売る場合は、解体に1ヶ月＋売却活動2〜5ヶ月。3,000万円特例を狙うなら相続から3年以内の譲渡が必須。",
        icon: "hammer",
        color: "from-teal-500 to-teal-400",
    },
    {
        id: "settle",
        label: "決済・確定申告",
        duration: "売却後〜翌年3月",
        description: "譲渡所得の申告",
        body:
            "売却した翌年の2月16日〜3月15日に確定申告。空き家特例(3,000万円控除)を適用すれば多くのケースで税額ゼロに。市区町村で確認書を取得しておくこと。",
        icon: "bank",
        color: "from-sky-500 to-sky-400",
    },
];

interface Props {
    steps?: TimelineStep[];
}

export default function ProcessTimeline({ steps = DEFAULT_STEPS }: Props) {
    const [activeId, setActiveId] = useState<string>(steps[0].id);
    const active = steps.find((s) => s.id === activeId) ?? steps[0];
    const ActiveIcon = ICONS[active.icon];

    const cols = steps.length;
    const gridCols =
        cols === 6
            ? "grid-cols-6"
            : cols === 5
              ? "grid-cols-5"
              : cols === 4
                ? "grid-cols-4"
                : "grid-cols-6";

    return (
        <div className="my-10 overflow-hidden rounded-3xl border border-border bg-white shadow-md">
            <div className="bg-gradient-to-r from-primary to-[oklch(0.22_0.07_255)] px-6 py-4 text-white">
                <p className="text-[10px] font-bold tracking-widest text-accent">
                    INTERACTIVE
                </p>
                <h3 className="mt-1 text-base font-bold md:text-lg">
                    実家じまいの全工程タイムライン
                </h3>
                <p className="mt-1 text-xs text-white/80">
                    各ステップをクリックすると、目安期間と進め方が表示されます。
                </p>
            </div>

            <div className="p-5 md:p-7">
                {/* デスクトップ：横並びステッパー */}
                <div className="hidden md:block">
                    <ol className={`relative grid gap-2 ${gridCols}`}>
                        {/* 背景ライン */}
                        <div className="absolute left-6 right-6 top-7 h-0.5 bg-gradient-to-r from-rose-300 via-amber-300 via-emerald-300 to-sky-300" />
                        {steps.map((step) => {
                            const Icon = ICONS[step.icon];
                            const isActive = step.id === activeId;
                            return (
                                <li key={step.id} className="relative">
                                    <button
                                        onClick={() => setActiveId(step.id)}
                                        className="group flex w-full flex-col items-center text-center"
                                    >
                                        <motion.span
                                            whileHover={{ scale: 1.08 }}
                                            className={`relative z-10 mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white shadow-md ring-4 transition-all ${
                                                isActive
                                                    ? "ring-accent/30 scale-110"
                                                    : "ring-white"
                                            }`}
                                        >
                                            <Icon className="h-6 w-6" strokeWidth={1.8} />
                                            {isActive && (
                                                <motion.span
                                                    layoutId="timeline-dot"
                                                    className="absolute -bottom-1 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow"
                                                >
                                                    <CheckCircle2 className="h-4 w-4 text-accent" />
                                                </motion.span>
                                            )}
                                        </motion.span>
                                        <span
                                            className={`text-xs font-bold ${isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                                        >
                                            {step.label}
                                        </span>
                                        <span className="mt-0.5 text-[10px] text-muted-foreground">
                                            {step.duration}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {/* モバイル：縦並び */}
                <div className="space-y-2 md:hidden">
                    {steps.map((step) => {
                        const Icon = ICONS[step.icon];
                        const isActive = step.id === activeId;
                        return (
                            <button
                                key={step.id}
                                onClick={() => setActiveId(step.id)}
                                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                                    isActive
                                        ? "border-accent bg-accent/5"
                                        : "border-border bg-white"
                                }`}
                            >
                                <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white shadow-sm`}
                                >
                                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                                </span>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-foreground">
                                        {step.label}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground">
                                        {step.duration} ・ {step.description}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* 詳細パネル */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="mt-6 rounded-2xl bg-secondary/40 p-5 md:p-6"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${active.color} px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white`}
                            >
                                {active.duration}
                            </span>
                            <p className="text-xs font-bold tracking-wider text-muted-foreground">
                                {active.description}
                            </p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                            <ActiveIcon className="h-5 w-5 text-accent" strokeWidth={1.8} />
                            <h4 className="text-lg font-bold text-foreground md:text-xl">
                                {active.label}
                            </h4>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85 md:text-base">
                            {active.body}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
