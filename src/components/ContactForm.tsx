"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";

const PREFECTURES = ["埼玉県", "栃木県", "群馬県", "茨城県", "その他"];
const PROPERTY_TYPES = ["戸建て", "マンション", "その他"];

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        user_name: "",
        phone: "",
        prefecture: "",
        city: "",
        property_type: "",
        notes: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.phone || !formData.prefecture) {
            setError("電話番号と都道府県は必須です。");
            return;
        }
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    source: "WEB",
                    user_name: formData.user_name || null,
                    contact_info: formData.phone,
                    prefecture: formData.prefecture,
                    city: formData.city || null,
                    property_type: formData.property_type || null,
                    address_detail: formData.notes || null,
                    status: "new",
                }),
            });

            if (!res.ok) throw new Error("送信に失敗しました。");
            setSuccess(true);
        } catch {
            setError("送信に失敗しました。お手数ですがお電話にてお問い合わせください。");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
                <CheckCircle2 className="h-16 w-16 text-accent" />
                <h3 className="text-2xl font-bold text-foreground">
                    お問い合わせを受け付けました
                </h3>
                <p className="text-base text-muted-foreground">
                    担当者より折り返しご連絡いたします。
                    <br />
                    通常1営業日以内にご連絡します。
                </p>
            </div>
        );
    }

    return (
        <Card className="mx-auto max-w-2xl shadow-lg">
            <CardHeader className="bg-primary px-6 py-8 text-center text-white">
                <CardTitle className="text-2xl font-bold">
                    無料相談・お問い合わせ
                </CardTitle>
                <p className="mt-2 text-white/80">
                    フォームを送信後、担当者より折り返しご連絡いたします
                </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-base text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="user_name" className="text-base">
                                お名前{" "}
                                <span className="text-sm text-muted-foreground">（任意）</span>
                            </Label>
                            <Input
                                id="user_name"
                                name="user_name"
                                placeholder="例：山田 太郎"
                                value={formData.user_name}
                                onChange={handleChange}
                                className="h-12 text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-base">
                                電話番号{" "}
                                <span className="text-sm text-red-500">（必須）</span>
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                required
                                type="tel"
                                placeholder="例：090-1234-5678"
                                value={formData.phone}
                                onChange={handleChange}
                                className="h-12 text-base"
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="text-base">
                                都道府県{" "}
                                <span className="text-sm text-red-500">（必須）</span>
                            </Label>
                            <Select
                                value={formData.prefecture}
                                onValueChange={(val) => handleSelectChange("prefecture", val)}
                            >
                                <SelectTrigger className="h-12 text-base">
                                    <SelectValue placeholder="都道府県を選択" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PREFECTURES.map((pref) => (
                                        <SelectItem key={pref} value={pref} className="text-base">
                                            {pref}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city" className="text-base">
                                市区町村{" "}
                                <span className="text-sm text-muted-foreground">（任意）</span>
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                placeholder="例：さいたま市浦和区"
                                value={formData.city}
                                onChange={handleChange}
                                className="h-12 text-base"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-base">
                            物件種別{" "}
                            <span className="text-sm text-muted-foreground">（任意）</span>
                        </Label>
                        <Select
                            value={formData.property_type}
                            onValueChange={(val) => handleSelectChange("property_type", val)}
                        >
                            <SelectTrigger className="h-12 text-base">
                                <SelectValue placeholder="物件種別を選択" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_TYPES.map((type) => (
                                    <SelectItem key={type} value={type} className="text-base">
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-base">
                            ご相談内容{" "}
                            <span className="text-sm text-muted-foreground">（任意）</span>
                        </Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="例：父が亡くなり実家の片付けをお願いしたいです。3LDKで荷物が多めです。"
                            className="min-h-[120px] resize-none text-base"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="h-14 w-full text-lg font-bold"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                送信中...
                            </>
                        ) : (
                            "無料相談を申し込む"
                        )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                        ※ 入力内容はみんなの家株式会社が受信します。営業電話は一切行いません。
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
