"use client";

import { motion } from "motion/react";
import { HelpCircle, Home, Users, Wallet } from "lucide-react";

const PROBLEMS = [
    {
        icon: Home,
        title: "実家の片付けが進まない",
        body: "親が亡くなった／施設入居後、長年の家財が手付かず。仕事や子育てと並行して、どこから手をつければよいか分からない。",
    },
    {
        icon: Wallet,
        title: "空き家のままで維持費がかかる",
        body: "固定資産税、保険、最低限の管理費。住む予定もないのに、毎月・毎年お金が出ていく状態が続いている。",
    },
    {
        icon: Users,
        title: "兄弟姉妹で意見がまとまらない",
        body: "「残したい」「売却したい」で意見が割れ、話し合いが進まない。誰がどう動くかも決まらないまま時間だけが過ぎていく。",
    },
    {
        icon: HelpCircle,
        title: "誰に何を頼めばよいか分からない",
        body: "遺品整理業者、不動産会社、解体業者、士業……。複数の業者に同じ説明を繰り返すのは、心身ともに大きな負担。",
    },
] as const;

export default function ProblemSection() {
    return (
        <section id="problem" className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5 }}
                    className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
                >
                    <span className="section-eyebrow">PROBLEM</span>
                    <h2 className="mt-2 section-title">
                        実家じまい、こんなお悩みはありませんか？
                    </h2>
                    <p className="section-subtitle mx-auto max-w-2xl">
                        40〜60代の方の多くが直面する、実家じまいの「4つの壁」。
                        ひとつでも当てはまる方は、お気軽にご相談ください。
                    </p>
                </motion.div>

                <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6">
                    {PROBLEMS.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div
                                key={p.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                className="group relative overflow-hidden rounded-2xl border border-border bg-secondary/30 p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:bg-white hover:shadow-lg md:p-8"
                            >
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-accent ring-1 ring-accent/20 transition-transform group-hover:scale-110 group-hover:rotate-3">
                                    <Icon className="h-7 w-7" />
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">
                                    {p.title}
                                </h3>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    {p.body}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mx-auto mt-10 max-w-2xl text-center text-base font-medium text-foreground md:mt-14 md:text-lg"
                >
                    家じまい.comは、これらの悩みを
                    <span className="font-bold text-accent">
                        「ご相談から不動産処分まで、ひとつの窓口」
                    </span>
                    で解決します。
                </motion.p>
            </div>
        </section>
    );
}
