const SERVICES = [
    {
        num: "01",
        title: "相続不動産の整理・処分のご相談",
        body: "相続した実家・空き家の売却、解体、賃貸活用、空き家管理の選択肢整理。提携の不動産会社・解体業者・リフォーム業者のご紹介。",
    },
    {
        num: "02",
        title: "遺品整理業者の選定支援",
        body: "審査済みの遺品整理業者の中から、ご予算・作業内容・地域に合わせた業者の選定。複数業者からの相見積もり取得のサポート。",
    },
    {
        num: "03",
        title: "終活・死後事務委任契約のサポート",
        body: "身寄りのない方、子どもに負担をかけたくない方の終活相談。提携の行政書士・司法書士による死後事務委任契約の手続き支援。",
    },
    {
        num: "04",
        title: "高齢者の住み替え相談",
        body: "有料老人ホーム・サービス付き高齢者向け住宅の選び方、賃貸への住み替え、自宅の処分と並行した住み替え計画のご相談。",
    },
] as const;

export default function ServiceList() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-10 text-center md:mb-12">
                        <span className="section-eyebrow">SERVICES</span>
                        <h2 className="mt-2 section-title">ご相談いただける内容</h2>
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
