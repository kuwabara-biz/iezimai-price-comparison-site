import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutIejimai() {
    return (
        <section id="about" className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center md:mb-10">
                        <span className="section-eyebrow">ABOUT</span>
                        <h2 className="mt-2 section-title">家じまいとは</h2>
                    </div>
                    <div className="space-y-5 text-base leading-relaxed text-foreground">
                        <p>
                            親の介護・施設入居・死去をきっかけに、実家を整理・処分することを「家じまい」と呼びます。長年暮らした実家の遺品整理と、空き家となった不動産の売却・活用の、大きく2つの作業が発生します。
                        </p>
                        <p>
                            40〜60代の方の多くが、仕事や子育てと並行してこの大きな課題に直面します。「どこに頼めばよいかわからない」「相続・税金・登記の話が複雑すぎる」「兄弟姉妹で意見がまとまらない」——多くの方が同じ悩みを抱えています。
                        </p>
                        <p>
                            家じまい.comは、こうしたお悩みに対し、遺品整理から不動産処分まで一括でご相談に応じる相談窓口です。状況の整理から、最適な業者・専門家のご紹介までをワンストップでサポートします。
                        </p>
                    </div>
                    <div className="mt-8 text-center">
                        {/* TODO: 解説ページ作成後にリンクを差し替え */}
                        <Link
                            href="#"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                        >
                            家じまいについて詳しく学ぶ
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
