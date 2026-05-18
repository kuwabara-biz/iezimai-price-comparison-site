"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calculator, ChevronDown, Info, TrendingDown, TrendingUp } from "lucide-react";

type Layout = "1K" | "2DK" | "3LDK" | "4LDK";
type Strategy = "as-is" | "demolish" | "buyout";
type Subsidy = "none" | "30" | "50" | "100";
type Special = "yes" | "no";

const LAYOUT_OPTIONS: { value: Layout; label: string; ihinCost: number; size: number }[] = [
    { value: "1K", label: "1K / 1DK（〜30㎡）", ihinCost: 8, size: 30 },
    { value: "2DK", label: "2DK（30〜50㎡）", ihinCost: 20, size: 50 },
    { value: "3LDK", label: "3LDK（50〜80㎡）", ihinCost: 30, size: 80 },
    { value: "4LDK", label: "4LDK以上（80㎡〜）", ihinCost: 50, size: 100 },
];

const STRATEGY_OPTIONS: { value: Strategy; label: string; description: string }[] = [
    {
        value: "as-is",
        label: "現況のまま仲介で売却",
        description: "解体不要・買主を探す",
    },
    {
        value: "demolish",
        label: "解体して土地として売却",
        description: "更地化で売却スピード↑",
    },
    {
        value: "buyout",
        label: "そのまま不動産会社へ買取",
        description: "解体・整理込み・即現金化",
    },
];

const SUBSIDY_OPTIONS: { value: Subsidy; label: string }[] = [
    { value: "none", label: "使えない / 不明" },
    { value: "30", label: "30万円（秩父市・深谷市など）" },
    { value: "50", label: "50万円（越谷市など）" },
    { value: "100", label: "100万円（川口市の最大枠）" },
];

function calcIntermediaryFee(price: number): number {
    if (price <= 0) return 0;
    return (price * 0.03 + 6) * 1.1;
}

function calcStamp(price: number): number {
    if (price <= 1000) return 0.5;
    if (price <= 5000) return 1;
    return 3;
}

function format(n: number): string {
    return Math.round(n).toLocaleString("ja-JP");
}

export default function CostSimulator() {
    const [layout, setLayout] = useState<Layout>("3LDK");
    const [salePrice, setSalePrice] = useState<number>(2000);
    const [strategy, setStrategy] = useState<Strategy>("as-is");
    const [subsidy, setSubsidy] = useState<Subsidy>("none");
    const [special, setSpecial] = useState<Special>("yes");
    const [open, setOpen] = useState(true);

    const result = useMemo(() => {
        const layoutData =
            LAYOUT_OPTIONS.find((l) => l.value === layout) ?? LAYOUT_OPTIONS[2];

        // 遺品整理
        const ihinCost = strategy === "buyout" ? 0 : layoutData.ihinCost;

        // 解体費（木造 4.5万/坪 × 坪数換算 ≒ 0.3坪/㎡）
        const demolishCost =
            strategy === "demolish" ? Math.round((layoutData.size / 3.3) * 4.5) : 0;

        // 仲介手数料
        const fee = strategy === "buyout" ? 0 : calcIntermediaryFee(salePrice);

        // 印紙
        const stamp = calcStamp(salePrice);

        // 相続登記関連
        const inheritance = 15;

        // 補助金
        const subsidyAmount = strategy === "demolish" ? Number(subsidy === "none" ? 0 : subsidy) : 0;

        // 買取の場合は売却額を2.5割引で換算
        const actualPrice = strategy === "buyout" ? salePrice * 0.7 : salePrice;

        // 譲渡所得税（特例なしの場合のみ簡易計算：価格の5%取得費控除後 20%）
        const tax =
            special === "yes"
                ? 0
                : Math.max(0, Math.round((actualPrice - actualPrice * 0.05 - 300) * 0.2));

        const totalCost = ihinCost + demolishCost + fee + stamp + inheritance + tax;
        const netProceed = actualPrice - totalCost + subsidyAmount;

        return {
            ihinCost,
            demolishCost,
            fee,
            stamp,
            inheritance,
            subsidyAmount,
            tax,
            actualPrice,
            totalCost,
            netProceed,
        };
    }, [layout, salePrice, strategy, subsidy, special]);

    return (
        <div className="my-10 overflow-hidden rounded-3xl border border-border bg-white shadow-md">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between gap-4 bg-gradient-to-r from-primary to-[oklch(0.22_0.07_255)] px-6 py-5 text-left text-white transition-colors hover:from-[oklch(0.30_0.07_255)]"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/20 text-accent ring-2 ring-accent/40">
                        <Calculator className="h-5 w-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold tracking-widest text-accent">
                            INTERACTIVE
                        </p>
                        <h3 className="text-base font-bold md:text-lg">
                            実家じまい 手取りシミュレーター
                        </h3>
                    </div>
                </div>
                <ChevronDown
                    className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-6 p-5 md:grid-cols-2 md:p-7"
                >
                    {/* 入力 */}
                    <div className="space-y-5">
                        <Field label="間取り">
                            <div className="grid grid-cols-2 gap-2">
                                {LAYOUT_OPTIONS.map((opt) => (
                                    <ChoiceButton
                                        key={opt.value}
                                        active={layout === opt.value}
                                        onClick={() => setLayout(opt.value)}
                                    >
                                        {opt.label}
                                    </ChoiceButton>
                                ))}
                            </div>
                        </Field>

                        <Field label={`売却見込み額：${format(salePrice)} 万円`}>
                            <input
                                type="range"
                                min={500}
                                max={5000}
                                step={100}
                                value={salePrice}
                                onChange={(e) => setSalePrice(Number(e.target.value))}
                                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-accent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent"
                            />
                            <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                                <span>500万円</span>
                                <span>5,000万円</span>
                            </div>
                        </Field>

                        <Field label="売却方法">
                            <div className="space-y-1.5">
                                {STRATEGY_OPTIONS.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => setStrategy(opt.value)}
                                        className={`w-full rounded-xl border p-3 text-left transition-colors ${
                                            strategy === opt.value
                                                ? "border-accent bg-accent/10"
                                                : "border-border bg-white hover:border-accent/40"
                                        }`}
                                    >
                                        <div className="text-sm font-semibold text-foreground">
                                            {opt.label}
                                        </div>
                                        <div className="mt-0.5 text-xs text-muted-foreground">
                                            {opt.description}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </Field>

                        {strategy === "demolish" && (
                            <Field label="解体補助金（市町村別）">
                                <select
                                    value={subsidy}
                                    onChange={(e) => setSubsidy(e.target.value as Subsidy)}
                                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                                >
                                    {SUBSIDY_OPTIONS.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </Field>
                        )}

                        <Field label="空き家3,000万円特例の適用">
                            <div className="grid grid-cols-2 gap-2">
                                <ChoiceButton
                                    active={special === "yes"}
                                    onClick={() => setSpecial("yes")}
                                >
                                    適用できる
                                </ChoiceButton>
                                <ChoiceButton
                                    active={special === "no"}
                                    onClick={() => setSpecial("no")}
                                >
                                    適用できない
                                </ChoiceButton>
                            </div>
                            <p className="mt-2 flex items-start gap-1 text-[10px] leading-snug text-muted-foreground">
                                <Info className="mt-0.5 h-3 w-3 shrink-0" />
                                昭和56年5月以前築・被相続人の1人住み・3年以内の譲渡などが主な要件。詳細は補助金記事を参照。
                            </p>
                        </Field>
                    </div>

                    {/* 結果 */}
                    <div className="rounded-2xl bg-secondary/40 p-5">
                        <p className="text-xs font-bold tracking-widest text-accent">
                            RESULT
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            お手元に残る金額（概算）
                        </p>
                        <div className="mt-3 flex items-baseline gap-2">
                            <motion.span
                                key={result.netProceed}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl font-bold text-primary md:text-5xl"
                            >
                                {format(result.netProceed)}
                            </motion.span>
                            <span className="text-lg font-bold text-primary">万円</span>
                        </div>

                        <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                            <Row label="売却額（買取時は▲30%）" value={`+${format(result.actualPrice)}`} positive />
                            {result.ihinCost > 0 && (
                                <Row label="遺品整理費" value={`-${format(result.ihinCost)}`} />
                            )}
                            {result.demolishCost > 0 && (
                                <Row label="解体費" value={`-${format(result.demolishCost)}`} />
                            )}
                            {result.fee > 0 && (
                                <Row label="仲介手数料" value={`-${format(result.fee)}`} />
                            )}
                            <Row label="印紙税" value={`-${format(result.stamp)}`} />
                            <Row label="相続登記関連" value={`-${format(result.inheritance)}`} />
                            {result.tax > 0 && (
                                <Row label="譲渡所得税（概算）" value={`-${format(result.tax)}`} />
                            )}
                            {result.subsidyAmount > 0 && (
                                <Row
                                    label="解体補助金"
                                    value={`+${format(result.subsidyAmount)}`}
                                    positive
                                />
                            )}
                        </div>

                        <div className="mt-5 rounded-lg bg-white p-3 text-[11px] leading-snug text-muted-foreground">
                            ※ 数値はすべて万円単位の概算。実際の費用は物件状況・税制要件・市況で変動します。物件情報をいただければ
                            <a href="/contact" className="font-semibold text-accent hover:underline">
                                {" "}個別の無料シミュレーション
                            </a>
                            を作成します。
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {label}
            </p>
            {children}
        </div>
    );
}

function ChoiceButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`min-h-10 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors md:text-sm ${
                active
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-white text-foreground hover:border-accent/40"
            }`}
        >
            {children}
        </button>
    );
}

function Row({
    label,
    value,
    positive = false,
}: {
    label: string;
    value: string;
    positive?: boolean;
}) {
    return (
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-foreground/85">
                {positive ? (
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                ) : (
                    <TrendingDown className="h-3 w-3 text-rose-500" />
                )}
                {label}
            </span>
            <span
                className={`font-bold ${positive ? "text-emerald-700" : "text-rose-600"}`}
            >
                {value} 万
            </span>
        </div>
    );
}
