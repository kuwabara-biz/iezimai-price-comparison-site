import Link from "next/link";
import {
    Users,
    Building,
    MessageSquare,
    Star,
    TrendingUp,
    ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVendors, mockReviews } from "@/lib/mock-data";

export default function AdminDashboard() {
    const totalVendors = mockVendors.length;
    const vendorsWithRealEstate = mockVendors.filter(
        (v) => v.has_real_estate_partnership
    ).length;
    const totalReviews = mockReviews.length;
    // Mock lead count
    const totalLeads = 5;
    const newLeads = 2;

    const stats = [
        {
            label: "登録業者数",
            value: totalVendors,
            icon: <Building className="h-5 w-5" />,
            href: "/admin/vendors",
            color: "text-blue-600 bg-blue-50",
        },
        {
            label: "新規リード",
            value: newLeads,
            sub: `全${totalLeads}件`,
            icon: <Users className="h-5 w-5" />,
            href: "/admin/leads",
            color: "text-orange-600 bg-orange-50",
        },
        {
            label: "口コミ件数",
            value: totalReviews,
            icon: <Star className="h-5 w-5" />,
            href: "/admin/reviews",
            color: "text-yellow-600 bg-yellow-50",
        },
        {
            label: "不動産提携業者",
            value: vendorsWithRealEstate,
            icon: <TrendingUp className="h-5 w-5" />,
            href: "/admin/vendors",
            color: "text-green-600 bg-green-50",
        },
    ];

    return (
        <div className="min-h-screen bg-secondary">
            <div className="border-b border-border bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div>
                        <h1 className="text-xl font-bold text-foreground">管理画面</h1>
                        <p className="text-sm text-muted-foreground">
                            家じまい.com ダッシュボード
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href="/admin/vendors"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            業者管理
                        </Link>
                        <Link
                            href="/admin/leads"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            リード管理
                        </Link>
                        <Link
                            href="/admin/reviews"
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                        >
                            口コミ管理
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Stats Grid */}
                <div className="mb-8 grid gap-4 md:grid-cols-4">
                    {stats.map((stat) => (
                        <Link key={stat.label} href={stat.href}>
                            <Card className="transition-all hover:shadow-md">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-lg ${stat.color}`}
                                    >
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                                        <p className="text-2xl font-bold text-foreground">
                                            {stat.value}
                                        </p>
                                        {stat.sub && (
                                            <p className="text-xs text-muted-foreground">{stat.sub}</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <Users className="h-4 w-4 text-accent" />
                                最近のリード
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {[
                                    { name: "田中様", area: "さいたま市", status: "new", date: "2026-02-15" },
                                    { name: "鈴木様", area: "川越市", status: "contacted", date: "2026-02-14" },
                                    { name: "佐藤様", area: "群馬県", status: "in_progress", date: "2026-02-13" },
                                ].map((lead, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between rounded-lg border border-border p-3"
                                    >
                                        <div>
                                            <p className="font-medium text-foreground">{lead.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {lead.area} · {lead.date}
                                            </p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${lead.status === "new"
                                                    ? "bg-red-100 text-red-700"
                                                    : lead.status === "contacted"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {lead.status === "new"
                                                ? "未対応"
                                                : lead.status === "contacted"
                                                    ? "連絡済み"
                                                    : "対応中"}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/admin/leads"
                                className="mt-3 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                            >
                                すべてのリードを見る
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MessageSquare className="h-4 w-4 text-accent" />
                                未承認の口コミ
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {mockReviews
                                    .filter((r) => !r.is_approved || true)
                                    .slice(0, 3)
                                    .map((review) => {
                                        const vendor = mockVendors.find(
                                            (v) => v.id === review.vendor_id
                                        );
                                        return (
                                            <div
                                                key={review.id}
                                                className="rounded-lg border border-border p-3"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {vendor?.name}
                                                    </p>
                                                    <div className="flex items-center gap-0.5">
                                                        {Array.from({ length: review.rating || 0 }).map(
                                                            (_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className="h-3 w-3 fill-accent text-accent"
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                                                    {review.body}
                                                </p>
                                            </div>
                                        );
                                    })}
                            </div>
                            <Link
                                href="/admin/reviews"
                                className="mt-3 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                            >
                                口コミ管理へ
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
