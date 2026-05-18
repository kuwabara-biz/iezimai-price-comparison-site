"use client";

import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    title?: string;
    description?: string;
}

export default function InlineCTA({
    title = "ご状況に合わせて、無料で個別シミュレーション",
    description = "物件情報をお伺いし、遺品整理・解体・売却見込み・税金まで含めた手取り額シミュレーションを無料でご提示します。",
}: Props) {
    return (
        <aside className="my-12 overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-amber-50 via-white to-rose-50 p-6 shadow-sm md:p-8">
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between">
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-accent">
                        <PhoneCall className="h-3 w-3" />
                        無料相談
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-foreground md:text-xl">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                </div>
                <Link href="/contact" className="shrink-0">
                    <Button
                        size="lg"
                        className="h-12 bg-accent px-6 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90"
                    >
                        無料で相談する
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                </Link>
            </div>
        </aside>
    );
}
