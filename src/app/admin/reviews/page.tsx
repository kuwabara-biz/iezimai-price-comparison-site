import Link from "next/link";
import { ArrowLeft, Star, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { mockReviews, mockVendors, mockAreas } from "@/lib/mock-data";

export default function AdminReviews() {
    const approvedCount = mockReviews.filter((r) => r.is_approved).length;
    const pendingCount = mockReviews.length - approvedCount;

    return (
        <div className="min-h-screen bg-secondary">
            <div className="border-b border-border bg-white">
                <div className="container mx-auto flex items-center justify-between px-4 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/admin">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="mr-1 h-4 w-4" />
                                戻る
                            </Button>
                        </Link>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">口コミ管理</h1>
                            <p className="text-sm text-muted-foreground">
                                全{mockReviews.length}件（承認済: {approvedCount} / 未承認: {pendingCount}）
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="rounded-lg border border-border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>状態</TableHead>
                                <TableHead>業者名</TableHead>
                                <TableHead>投稿者</TableHead>
                                <TableHead>評価</TableHead>
                                <TableHead>エリア</TableHead>
                                <TableHead className="min-w-[300px]">内容</TableHead>
                                <TableHead>日付</TableHead>
                                <TableHead>操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockReviews.map((review) => {
                                const vendor = mockVendors.find(
                                    (v) => v.id === review.vendor_id
                                );
                                const area = mockAreas.find(
                                    (a) => a.slug === review.area_slug
                                );
                                return (
                                    <TableRow key={review.id}>
                                        <TableCell>
                                            {review.is_approved ? (
                                                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                                                    承認済
                                                </Badge>
                                            ) : (
                                                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                                                    未承認
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {vendor ? (
                                                <Link
                                                    href={`/vendor/${vendor.slug}`}
                                                    className="hover:text-accent"
                                                >
                                                    {vendor.name}
                                                </Link>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                        <TableCell>{review.nickname}</TableCell>
                                        <TableCell>
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
                                        </TableCell>
                                        <TableCell>
                                            {area ? (
                                                <Badge variant="secondary" className="text-xs">
                                                    {area.name}
                                                </Badge>
                                            ) : (
                                                "—"
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {review.body}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(review.created_at).toLocaleDateString("ja-JP")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                                                    title="承認"
                                                >
                                                    <CheckCircle2 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                    title="非承認"
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
