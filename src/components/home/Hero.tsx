import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRUST_BADGES = [
    { icon: MapPin, label: "埼玉県専門" },
    { icon: Layers, label: "相続・不動産・終活まで対応" },
];

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[oklch(0.22_0.07_255)]">
            {/* 背景：ドット模様 */}
            <div
                aria-hidden
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
                    backgroundSize: "28px 28px",
                }}
            />
            {/* 背景：装飾円 */}
            <div
                aria-hidden
                className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            />
            <div
                aria-hidden
                className="absolute -right-24 -top-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl"
            />

            <div className="container relative mx-auto px-4 py-14 md:py-20 lg:py-24">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
                    {/* 左：テキスト */}
                    <div className="text-white">
                        {/* 信頼バッジ */}
                        <div className="mb-6 flex flex-wrap gap-2">
                            {TRUST_BADGES.map(({ icon: Icon, label }) => (
                                <span
                                    key={label}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm md:text-sm"
                                >
                                    <Icon className="h-3.5 w-3.5 text-accent" />
                                    {label}
                                </span>
                            ))}
                        </div>

                        {/* H1：2行構成 */}
                        <h1 className="text-3xl font-bold leading-[1.25] tracking-tight md:text-5xl">
                            埼玉県の家じまいを、
                            <br />
                            <span className="text-accent">専門家がワンストップで。</span>
                        </h1>

                        {/* サブコピー */}
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                            相続不動産・遺品整理・終活の総合相談窓口です。40〜60代の方が直面する「実家じまい」を、業者選びから不動産処分までトータルでサポートします。
                        </p>

                        {/* CTA */}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link href="/contact" className="sm:inline-block">
                                <Button
                                    size="lg"
                                    className="h-14 w-full bg-accent text-base font-bold text-accent-foreground shadow-lg hover:bg-accent/90 sm:w-auto sm:px-8"
                                >
                                    無料で個別相談する
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/#vendors" className="sm:inline-block">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="h-14 w-full border-white/30 bg-white/10 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto sm:px-8"
                                >
                                    遺品整理業者を探す
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* 右：イラスト */}
                    <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                        <Image
                            src="/hero-illustration.png"
                            alt="実家の片付け・遺品整理・費用に悩む40〜60代の方々のイラスト"
                            width={2712}
                            height={1568}
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="h-auto w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
