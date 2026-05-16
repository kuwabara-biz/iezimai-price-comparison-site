import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: { absolute: "個人情報保護方針｜家じまい.com" },
    description:
        "家じまい.com（みんなのいえ株式会社）の個人情報保護方針です。お客様からお預かりした個人情報の取扱いについてご説明します。",
    alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <article className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-6 shadow-sm md:p-10">
                    <header className="mb-8 border-b border-border pb-6">
                        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                            個人情報保護方針
                        </h1>
                    </header>

                    <div className="space-y-8 text-base leading-relaxed text-foreground">
                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                1. 基本方針
                            </h2>
                            <p>
                                みんなのいえ株式会社（以下「当社」といいます）は、個人情報の重要性を認識し、その保護の徹底を図ることを社会的責務と考え、個人情報の保護に関する法律（個人情報保護法）その他の関係法令を遵守し、お客様の個人情報を適切に取り扱います。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                2. 個人情報の利用目的
                            </h2>
                            <p>
                                当社は、お客様からお預かりした個人情報を以下の目的で利用します：
                            </p>
                            <ul className="mt-3 space-y-1.5 pl-1">
                                <li className="flex items-start gap-2">
                                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    無料相談のご対応
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    提携業者・専門家へのご紹介
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    ご紹介後のフォローアップ
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                    当サービスに関する情報提供
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                3. 個人情報の第三者提供
                            </h2>
                            <p>
                                当社は、お客様の同意なしに、お客様の個人情報を第三者に提供することはありません。ただし、お客様が業者・専門家のご紹介をご希望された場合、ご紹介に必要な範囲で当該業者・専門家に情報を提供します。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                4. 安全管理措置
                            </h2>
                            <p>
                                当社は、個人情報の漏洩、滅失、毀損を防止するため、必要かつ適切な安全管理措置を講じます。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                5. 個人情報の開示・訂正・削除
                            </h2>
                            <p>
                                お客様ご自身の個人情報について、開示、訂正、削除をご希望の場合は、下記窓口までご連絡ください。
                            </p>
                        </section>

                        <section>
                            <h2 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                6. 個人情報の管理責任者・お問い合わせ窓口
                            </h2>
                            <div className="rounded-xl border border-border bg-secondary/40 p-5">
                                <dl className="space-y-1.5 text-base">
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">事業者名：</dt>
                                        <dd>みんなのいえ株式会社</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">代表取締役：</dt>
                                        <dd>桃原太郎</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">所在地：</dt>
                                        <dd>埼玉県朝霞市（詳細はお問い合わせください）</dd>
                                    </div>
                                    <div className="flex flex-wrap gap-x-3">
                                        <dt className="font-semibold text-foreground">お問い合わせ：</dt>
                                        <dd>
                                            <Link
                                                href="/contact"
                                                className="font-semibold text-accent hover:underline"
                                            >
                                                /contact
                                            </Link>{" "}
                                            よりご連絡ください
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </section>

                        {/* TODO: 法的レビューを経て本番版に差し替え／制定日を確定 */}
                        <p className="border-t border-border pt-6 text-sm text-muted-foreground">
                            制定日：2026年X月X日
                        </p>
                    </div>
                </article>
            </div>
        </div>
    );
}
