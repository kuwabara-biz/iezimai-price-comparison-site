import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: { absolute: "ご相談ありがとうございました｜家じまい.com" },
    description: "お問い合わせを受け付けました。24時間以内（土日祝を除く）に折り返しご連絡いたします。",
    robots: {
        index: false,
        follow: false,
    },
};

export default function ContactThanksPage() {
    return (
        <div className="min-h-screen bg-secondary">
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-white p-8 text-center shadow-sm md:p-12">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <CheckCircle2 className="h-12 w-12" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                        ご相談ありがとうございました
                    </h1>
                    <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground md:text-[17px]">
                        <p>
                            お送りいただいた内容を確認のうえ、24時間以内（土日祝を除く）に折り返しご連絡いたします。
                        </p>
                        <p>
                            お急ぎの場合は、お電話でもご連絡いただけます。
                        </p>
                        <p>引き続き、家じまい.comをご活用ください。</p>
                    </div>
                    <div className="mt-8">
                        <Link href="/">
                            <Button size="lg" className="h-12 px-8 text-base font-semibold">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                トップページに戻る
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
