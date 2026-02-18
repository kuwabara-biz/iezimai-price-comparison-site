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
import { Loader2, Send } from "lucide-react";

// 都道府県リスト (埼玉・北関東中心)
const PREFECTURES = [
    "埼玉県",
    "群馬県",
    "栃木県",
    "茨城県",
    "東京都",
    "神奈川県",
    "千葉県",
    "その他",
];

// 物件種別
const PROPERTY_TYPES = ["一軒家", "マンション", "アパート", "その他"];

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        user_name: "",
        phone: "",
        email: "",
        prefecture: "埼玉県",
        city: "",
        property_type: "一軒家",
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
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("送信に失敗しました。");
            }

            setSuccess(true);
            setFormData({
                user_name: "",
                phone: "",
                email: "",
                prefecture: "埼玉県",
                city: "",
                property_type: "一軒家",
                notes: "",
            });
        } catch (err) {
            setError("エラーが発生しました。もう一度お試しください。");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Card className="mx-auto max-w-lg border-2 border-primary/20 bg-primary/5">
                <CardContent className="pt-6 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Send className="h-8 w-8" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">
                        送信完了しました
                    </h3>
                    <p className="mb-6 text-muted-foreground">
                        お問い合わせありがとうございます。
                        <br />
                        担当者より順次ご連絡させていただきます。
                    </p>
                    <Button
                        onClick={() => setSuccess(false)}
                        variant="outline"
                        className="border-primary/20 hover:border-primary hover:text-primary"
                    >
                        続けて送信する
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mx-auto max-w-2xl shadow-lg">
            <CardHeader className="bg-primary px-6 py-8 text-center text-white">
                <CardTitle className="text-2xl font-bold">
                    無料一括見積もり・ご相談
                </CardTitle>
                <p className="mt-2 text-white/80">
                    写真を送る前に、まずは概算を知りたい方もこちら
                </p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                            {error}
                        </div>
                    )}

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="user_name">お名前 <span className="text-red-500">*</span></Label>
                            <Input
                                id="user_name"
                                name="user_name"
                                required
                                placeholder="例：山田 太郎"
                                value={formData.user_name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">電話番号 <span className="text-red-500">*</span></Label>
                            <Input
                                id="phone"
                                name="phone"
                                required
                                type="tel"
                                placeholder="例：090-1234-5678"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">メールアドレス</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="例：taro.yamada@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="prefecture">都道府県 <span className="text-red-500">*</span></Label>
                            <Select
                                value={formData.prefecture}
                                onValueChange={(val) => handleSelectChange("prefecture", val)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="選択してください" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PREFECTURES.map((pref) => (
                                        <SelectItem key={pref} value={pref}>
                                            {pref}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">市区町村 <span className="text-red-500">*</span></Label>
                            <Input
                                id="city"
                                name="city"
                                required
                                placeholder="例：さいたま市大宮区"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="property_type">物件種別 <span className="text-red-500">*</span></Label>
                        <Select
                            value={formData.property_type}
                            onValueChange={(val) => handleSelectChange("property_type", val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="選択してください" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROPERTY_TYPES.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">ご相談内容・備考</Label>
                        <Textarea
                            id="notes"
                            name="notes"
                            placeholder="例：3LDKの遺品整理をお願いしたいです。来月末までに完了させたいです。"
                            className="min-h-[120px]"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#06C755] py-6 text-lg font-bold text-white shadow-lg hover:bg-[#06C755]/90 hover:shadow-xl"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                送信中...
                            </>
                        ) : (
                            "この内容で無料相談する"
                        )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                        ※ 個人情報は厳重に管理し、業者紹介以外の目的には使用しません。
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}
