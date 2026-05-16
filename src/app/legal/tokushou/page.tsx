import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: { absolute: "特定商取引法に基づく表記｜家じまい.com" },
    description:
        "家じまい.com（みんなのいえ株式会社）の特定商取引法に基づく表記です。サービス内容・料金・契約に関する事項をご説明します。",
    alternates: { canonical: "/legal/tokushou" },
};

export default function TokushouPage() {
    return (
        <div className="min-h-screen bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-6 shadow-sm md:p-10">
                    <header className="mb-8 border-b border-border pb-6">
                        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                            特定商取引法に基づく表記
                        </h1>
                    </header>

                    <div className="space-y-8 text-base leading-relaxed text-foreground">
                        {/* 事業者情報 */}
                        <section>
                            <div className="rounded-xl border border-border bg-secondary/40 p-5">
                                <dl className="space-y-1.5 text-base">
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">販売事業者：</dt>
                                        <dd>みんなのいえ株式会社</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">代表責任者：</dt>
                                        <dd>桃原太郎</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">所在地：</dt>
                                        <dd>埼玉県朝霞市（詳細はお問い合わせください）</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">連絡先：</dt>
                                        <dd>
                                            <Link
                                                href="/contact"
                                                className="font-semibold text-accent hover:underline"
                                            >
                                                /contact
                                            </Link>{" "}
                                            よりお問い合わせください
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                サービス内容
                            </h2>
                            <p>
                                家じまい.comは、埼玉県内の遺品整理業者・不動産業者・専門家のご紹介サービスです。お客様からは料金をいただかず、ご紹介先の事業者からの紹介料で運営しています。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                料金
                            </h2>
                            <p>お客様への相談料・紹介料は無料です。</p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                ご紹介後の業者・専門家との契約・取引
                            </h2>
                            <p>
                                ご紹介後の契約は、お客様と各事業者・専門家との直接契約となります。契約条件・料金・キャンセル規定等は各事業者の規定に従います。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                返金・キャンセル
                            </h2>
                            <p>
                                当社の相談サービス自体は無料のため、返金は発生しません。ご紹介先業者との契約に関するキャンセル・返金は、各事業者の規定をご確認ください。
                            </p>
                        </section>

                        {/* TODO: 法的レビューを経て本番版に差し替え */}
                    </div>
                </article>
            </div>
        </div>
    );
}
