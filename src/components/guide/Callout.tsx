import type { ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb, ShieldAlert, CheckCircle2 } from "lucide-react";

type Variant = "info" | "warning" | "tip" | "danger" | "success";

const VARIANT_STYLES: Record<
    Variant,
    { icon: typeof Info; wrap: string; label: string }
> = {
    info: {
        icon: Info,
        wrap: "border-sky-200 bg-sky-50/70 [&_*[data-callout-icon]]:text-sky-600",
        label: "text-sky-700",
    },
    warning: {
        icon: AlertTriangle,
        wrap: "border-amber-200 bg-amber-50/70 [&_*[data-callout-icon]]:text-amber-600",
        label: "text-amber-700",
    },
    tip: {
        icon: Lightbulb,
        wrap: "border-emerald-200 bg-emerald-50/70 [&_*[data-callout-icon]]:text-emerald-600",
        label: "text-emerald-700",
    },
    danger: {
        icon: ShieldAlert,
        wrap: "border-rose-200 bg-rose-50/70 [&_*[data-callout-icon]]:text-rose-600",
        label: "text-rose-700",
    },
    success: {
        icon: CheckCircle2,
        wrap: "border-emerald-200 bg-emerald-50/70 [&_*[data-callout-icon]]:text-emerald-600",
        label: "text-emerald-700",
    },
};

interface Props {
    variant?: Variant;
    title: string;
    children: ReactNode;
}

export default function Callout({ variant = "info", title, children }: Props) {
    const { icon: Icon, wrap, label } = VARIANT_STYLES[variant];
    return (
        <div className={`my-7 rounded-xl border p-5 ${wrap}`}>
            <div className="flex items-start gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0" data-callout-icon />
                <div className="flex-1">
                    <p className={`mb-1.5 text-sm font-bold ${label}`}>{title}</p>
                    <div className="text-sm leading-relaxed text-foreground/90 [&_p]:m-0 [&_p+p]:mt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
