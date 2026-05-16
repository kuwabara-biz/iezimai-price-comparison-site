"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ShieldCheck, Phone, Mail, Video, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TYPE_OPTIONS, type TypeValue } from "./consultation-types";

const CITY_GROUPS = [
    {
        label: "重点エリア",
        cities: ["朝霞市", "志木市", "新座市", "和光市"],
    },
    {
        label: "埼玉県内 主要市",
        cities: [
            "さいたま市",
            "川越市",
            "所沢市",
            "川口市",
            "越谷市",
            "戸田市",
            "蕨市",
            "富士見市",
            "ふじみ野市",
            "上尾市",
            "春日部市",
            "草加市",
            "熊谷市",
            "狭山市",
            "久喜市",
            "入間市",
            "深谷市",
            "三郷市",
        ],
    },
    {
        label: "その他",
        cities: ["その他埼玉県内", "埼玉県外", "未定"],
    },
] as const;

const CONTACT_METHODS = [
    { value: "メール返信", icon: Mail },
    { value: "電話相談", icon: Phone },
    { value: "オンライン面談（Zoom等）", icon: Video },
    { value: "ご訪問相談（埼玉県内）", icon: MapPin },
] as const;

const SAFETY_MESSAGES = [
    "ご相談はすべて無料です",
    "お送りいただいた内容は、ご相談対応の目的のみに使用します",
    "しつこい営業や電話は一切いたしません",
    "24時間以内に折り返しご連絡します（土日祝を除く）",
];

interface Props {
    initialType: TypeValue;
}

export default function ConsultationForm({ initialType }: Props) {
    const router = useRouter();
    const [type, setType] = useState<TypeValue>(initialType);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [notes, setNotes] = useState("");
    const [methods, setMethods] = useState<string[]>([]);
    const [privacy, setPrivacy] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const toggleMethod = (m: string) => {
        setMethods((prev) =>
            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name.trim()) {
            setError("お名前をご入力ください。");
            return;
        }
        if (!email.trim()) {
            setError("メールアドレスをご入力ください。");
            return;
        }
        if (!city) {
            setError("お住まいの市町村をお選びください。");
            return;
        }
        if (methods.length === 0) {
            setError("ご希望の連絡方法を1つ以上お選びください。");
            return;
        }
        if (!privacy) {
            setError("個人情報保護方針への同意が必要です。");
            return;
        }

        setLoading(true);

        const typeLabel =
            TYPE_OPTIONS.find((t) => t.value === type)?.label ?? "その他";
        const prefecture =
            city === "埼玉県外" || city === "未定" ? city : "埼玉県";
        const cityForDB = ["その他埼玉県内", "埼玉県外", "未定"].includes(city)
            ? null
            : city;

        const detailLines = [
            `相談内容: ${typeLabel}`,
            `メール: ${email}`,
            phone ? `電話: ${phone}` : null,
            `市町村: ${city}`,
            `ご希望の連絡方法: ${methods.join("、")}`,
            notes ? `\n— ご相談内容 —\n${notes}` : null,
        ].filter(Boolean);

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "WEB",
                    user_name: name.trim(),
                    contact_info: email.trim(),
                    prefecture,
                    city: cityForDB,
                    property_type: typeLabel,
                    address_detail: detailLines.join("\n"),
                    status: "new",
                }),
            });

            if (!res.ok) throw new Error("送信に失敗しました。");
            router.push("/contact/thanks");
        } catch {
            setError(
                "送信に失敗しました。お手数ですが時間をおいて再度お試しください。"
            );
            setLoading(false);
        }
    };

    return (
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleSubmit} className="space-y-7">
                {error && (
                    <div
                        role="alert"
                        className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-base text-destructive"
                    >
                        {error}
                    </div>
                )}

                {/* 相談内容（ラジオ） */}
                <fieldset>
                    <legend className="mb-3 text-base font-bold text-foreground">
                        相談内容{" "}
                        <span className="text-sm font-normal text-red-500">（必須）</span>
                    </legend>
                    <div className="grid gap-2 md:grid-cols-2">
                        {TYPE_OPTIONS.map((t) => (
                            <label
                                key={t.value}
                                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
                                    type === t.value
                                        ? "border-accent bg-accent/5"
                                        : "border-border bg-white hover:border-accent/40"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="type"
                                    value={t.value}
                                    checked={type === t.value}
                                    onChange={() => setType(t.value)}
                                    className="h-4 w-4 accent-[color:var(--accent)]"
                                />
                                <span className="text-base font-medium text-foreground">
                                    {t.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                {/* お名前 */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-base font-bold">
                        お名前{" "}
                        <span className="text-sm font-normal text-red-500">（必須）</span>
                    </Label>
                    <Input
                        id="name"
                        required
                        placeholder="例：山田 太郎"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        className="h-12 text-base"
                    />
                </div>

                {/* メール */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-bold">
                        メールアドレス{" "}
                        <span className="text-sm font-normal text-red-500">（必須）</span>
                    </Label>
                    <Input
                        id="email"
                        required
                        type="email"
                        inputMode="email"
                        placeholder="例：yamada@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="h-12 text-base"
                    />
                </div>

                {/* 電話番号 */}
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-bold">
                        電話番号{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                            （任意）
                        </span>
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="例：090-1234-5678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        className="h-12 text-base"
                    />
                </div>

                {/* お住まいの市町村 */}
                <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-bold">
                        お住まいの市町村{" "}
                        <span className="text-sm font-normal text-red-500">（必須）</span>
                    </Label>
                    <select
                        id="city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex h-12 w-full rounded-md border border-input bg-white px-3 py-2 text-base shadow-xs transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
                    >
                        <option value="">市町村をお選びください</option>
                        {CITY_GROUPS.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                                {group.cities.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>

                {/* ご相談内容 */}
                <div className="space-y-2">
                    <Label htmlFor="notes" className="text-base font-bold">
                        ご相談内容{" "}
                        <span className="text-sm font-normal text-muted-foreground">
                            （任意）
                        </span>
                    </Label>
                    <Textarea
                        id="notes"
                        rows={5}
                        placeholder="例：父が3か月前に亡くなり、朝霞市の実家をどうするか兄弟で話し合いを始めたところです。まずは費用感を知りたいです。"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="min-h-32 resize-y text-base leading-relaxed"
                    />
                </div>

                {/* 連絡方法（チェックボックス） */}
                <fieldset>
                    <legend className="mb-3 text-base font-bold text-foreground">
                        ご希望の連絡方法{" "}
                        <span className="text-sm font-normal text-red-500">
                            （必須・複数選択可）
                        </span>
                    </legend>
                    <div className="grid gap-2 md:grid-cols-2">
                        {CONTACT_METHODS.map((m) => {
                            const Icon = m.icon;
                            const checked = methods.includes(m.value);
                            return (
                                <label
                                    key={m.value}
                                    className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3 transition-colors ${
                                        checked
                                            ? "border-accent bg-accent/5"
                                            : "border-border bg-white hover:border-accent/40"
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={() => toggleMethod(m.value)}
                                        className="h-4 w-4 accent-[color:var(--accent)]"
                                    />
                                    <Icon className="h-4 w-4 text-accent" />
                                    <span className="text-base font-medium text-foreground">
                                        {m.value}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </fieldset>

                {/* 個人情報保護方針同意 */}
                <div>
                    <label className="flex cursor-pointer items-start gap-3">
                        <input
                            type="checkbox"
                            checked={privacy}
                            onChange={(e) => setPrivacy(e.target.checked)}
                            className="mt-1 h-5 w-5 shrink-0 accent-[color:var(--accent)]"
                        />
                        <span className="text-base text-foreground">
                            <Link
                                href="/legal/privacy"
                                className="font-semibold text-accent hover:underline"
                                target="_blank"
                                rel="noopener"
                            >
                                個人情報保護方針
                            </Link>
                            に同意します{" "}
                            <span className="text-sm text-red-500">（必須）</span>
                        </span>
                    </label>
                </div>

                {/* 送信ボタン */}
                <Button
                    type="submit"
                    size="lg"
                    className="h-14 w-full bg-accent text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            送信中...
                        </>
                    ) : (
                        "無料で相談を申し込む"
                    )}
                </Button>
            </form>

            {/* 安心メッセージ */}
            <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5">
                <ul className="space-y-2">
                    {SAFETY_MESSAGES.map((msg) => (
                        <li
                            key={msg}
                            className="flex items-start gap-2 text-sm text-foreground md:text-base"
                        >
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                            <span>{msg}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
