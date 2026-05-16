import {
    Briefcase,
    FileText,
    Scroll,
    Building2,
    Hammer,
    HeartHandshake,
    Users,
    ShieldCheck,
} from "lucide-react";

const PARTNERS = [
    { icon: Briefcase, label: "提携税理士事務所", note: "相続税・譲渡所得税のご相談" },
    { icon: FileText, label: "提携司法書士事務所", note: "相続登記・成年後見のご相談" },
    { icon: Scroll, label: "提携行政書士事務所", note: "死後事務委任契約・遺言書作成" },
    { icon: Building2, label: "提携不動産会社", note: "売却・買取・賃貸" },
    { icon: Hammer, label: "提携リフォーム・解体業者", note: "" },
    { icon: HeartHandshake, label: "朝霞市地域包括支援センター", note: "連携進行中" },
    { icon: Users, label: "ケアマネジャーネットワーク", note: "" },
    { icon: ShieldCheck, label: "審査済み遺品整理業者", note: "" },
] as const;

export default function PartnerNetwork() {
    return (
        <section className="bg-secondary py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-8 text-center md:mb-10">
                        <span className="section-eyebrow">PARTNERS</span>
                        <h2 className="mt-2 section-title">連携している専門家・機関</h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
                            家じまい.comは単独の事業ではなく、地域の専門家・支援機関と連携しながら運営しています。お客様のご相談内容に応じて、最適なパートナーをご紹介します。
                        </p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                        {PARTNERS.map((p) => {
                            const Icon = p.icon;
                            return (
                                <div
                                    key={p.label}
                                    className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 transition-shadow hover:shadow-md md:p-5"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold text-foreground">{p.label}</p>
                                        {p.note && (
                                            <p className="mt-0.5 text-sm text-muted-foreground">
                                                {p.note}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
