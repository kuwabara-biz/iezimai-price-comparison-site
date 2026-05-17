const SERVICES = [
    {
        num: "01",
        title: "遺品整理（自社施工）",
        body: "ご家族の想い出を大切に扱いながら、自社スタッフが仕分け・搬出・清掃まで一貫対応。買取可能な品はその場で査定し、料金から差し引きます。1Kから戸建てまで、間取り・物量に応じた最適なご提案を行います。",
    },
    {
        num: "02",
        title: "相続不動産の自社買取",
        body: "空き家になった実家を、みんなのいえ株式会社が直接買取。仲介手数料ゼロ・最短2週間で現金化。残置物あり・再建築不可・遠方相続もそのままの状態でお引き渡しいただけます。",
    },
    {
        num: "03",
        title: "解体・特殊清掃のご手配",
        body: "建物の解体、孤独死・特殊清掃が必要なケースでは、提携の信頼できる事業者を当社経由でお手配します。お客様は複数の業者と個別にやり取りする必要がありません。",
    },
    {
        num: "04",
        title: "相続手続きの専門家ご紹介",
        body: "相続登記、相続税、遺産分割協議など法務・税務面のお悩みは、提携の司法書士・税理士・行政書士をご紹介。遺品整理・不動産処分と並行して、ワンストップでサポートします。",
    },
] as const;

export default function ServiceList() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center md:mb-12">
                        <span className="section-eyebrow">SERVICES</span>
                        <h2 className="mt-2 section-title">ご提供サービス</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {SERVICES.map((s) => (
                            <div
                                key={s.num}
                                className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8"
                            >
                                <span
                                    aria-hidden
                                    className="absolute -right-2 -top-3 select-none text-7xl font-black text-accent/[0.08]"
                                >
                                    {s.num}
                                </span>
                                <div className="relative">
                                    <div className="mb-3">
                                        <span className="text-xs font-bold tracking-widest text-accent">
                                            {s.num}
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-lg font-bold text-foreground md:text-xl">
                                        {s.title}
                                    </h3>
                                    <p className="text-base leading-relaxed text-muted-foreground">
                                        {s.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
