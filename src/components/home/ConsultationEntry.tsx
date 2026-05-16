import Link from "next/link";
import { Home, Building2, Heart, ArrowRight } from "lucide-react";

const ENTRIES = [
    {
        icon: Home,
        title: "実家を片付けたい",
        body: "親が施設に入った、あるいは亡くなったあとの実家の片付け。何から始めればよいかわからない方へ。",
        linkLabel: "審査済みの遺品整理業者を探す",
        href: "/#vendors",
    },
    {
        icon: Building2,
        title: "相続した不動産をどうするか",
        body: "売却・賃貸・解体・空き家管理。選択肢が多く判断に迷う方へ。専門家が一緒に整理します。",
        linkLabel: "専門家に無料相談する",
        href: "/contact?type=real-estate",
    },
    {
        icon: Heart,
        title: "自分の終活を考えたい",
        body: "身寄りがない、子どもに迷惑をかけたくない方の生前整理・死後事務委任契約のご相談。",
        linkLabel: "メールで気軽に相談する",
        href: "/contact?type=shukatsu",
    },
] as const;

export default function ConsultationEntry() {
    return (
        <section className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
                    <h2 className="section-title">
                        お悩みに合わせて、最適な入口をご用意しています
                    </h2>
                    <p className="section-subtitle">
                        どの段階のご相談でも構いません。専門家が一緒に整理します。
                    </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3 md:gap-6">
                    {ENTRIES.map((entry) => {
                        const Icon = entry.icon;
                        return (
                            <Link
                                key={entry.title}
                                href={entry.href}
                                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg md:p-7"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent ring-1 ring-accent/10">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">
                                    {entry.title}
                                </h3>
                                <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                                    {entry.body}
                                </p>
                                <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
                                    {entry.linkLabel}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
