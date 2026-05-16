import { Home, Building2, Heart } from "lucide-react";

const CATEGORIES = [
    {
        icon: Home,
        title: "遺品整理について",
        body: "親が亡くなった／施設に入った後の実家の片付け。複数業者の見積もりを取りたい。供養や貴重品の扱いも相談したい。",
    },
    {
        icon: Building2,
        title: "相続不動産の処分について",
        body: "相続した実家・空き家の売却、解体、賃貸活用。複数の専門家にまたがる相談を一括で整理したい。",
    },
    {
        icon: Heart,
        title: "終活・死後事務について",
        body: "自分の死後の手続きを誰に頼むかを考えている。生前整理・遺言書・死後事務委任契約のご相談。",
    },
] as const;

export default function ConsultationCategories() {
    return (
        <section className="bg-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-8 text-center md:mb-10">
                        <h2 className="section-title">よくあるご相談内容</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                        {CATEGORIES.map((c) => {
                            const Icon = c.icon;
                            return (
                                <div
                                    key={c.title}
                                    className="rounded-2xl border border-border bg-white p-6 shadow-sm md:p-7"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent ring-1 ring-accent/10">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                                        {c.body}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
