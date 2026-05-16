import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BottomCTA() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary to-[oklch(0.22_0.07_255)] py-14 md:py-20">
            {/* 背景装飾 */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            <div
                aria-hidden
                className="absolute -right-32 top-0 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4">
                <div className="mx-auto max-w-2xl text-center text-white">
                    <h2 className="text-2xl font-bold leading-tight md:text-3xl">
                        まずは、現状をお聞かせください
                    </h2>
                    <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
                        「何から始めればよいかわからない」「業者選びに不安がある」「相続と不動産の関係を整理したい」——
                        <br className="hidden md:inline" />
                        どんな段階のご相談でも構いません。専門家が一緒に整理します。
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link href="/contact">
                            <Button
                                size="lg"
                                className="h-14 bg-accent px-8 text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90 sm:px-10"
                            >
                                無料で個別相談する
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-7 flex justify-center text-sm text-white/80">
                        {/* TODO: 本番の電話番号に差し替え */}
                        <Link
                            href="#"
                            className="inline-flex items-center gap-1.5 hover:text-white hover:underline"
                        >
                            <Phone className="h-3.5 w-3.5" />
                            電話でのお問い合わせはこちら
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
