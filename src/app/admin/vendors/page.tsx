import Link from "next/link";
import { ArrowLeft, Star, Building, MapPin } from "lucide-react";
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
import { mockVendors, mockAreas } from "@/lib/mock-data";

export default function AdminVendors() {
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
                            <h1 className="text-xl font-bold text-foreground">業者管理</h1>
                            <p className="text-sm text-muted-foreground">
                                登録業者 {mockVendors.length}社
                            </p>
                        </div>
                    </div>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                        + 業者を追加
                    </Button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="rounded-lg border border-border bg-white">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[250px]">業者名</TableHead>
                                <TableHead>評価</TableHead>
                                <TableHead>料金目安</TableHead>
                                <TableHead>対応エリア</TableHead>
                                <TableHead>不動産</TableHead>
                                <TableHead>特徴</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockVendors.map((vendor) => {
                                const areaNames = vendor.service_areas
                                    ?.slice(0, 3)
                                    .map((s) => mockAreas.find((a) => a.slug === s)?.name)
                                    .filter(Boolean);
                                const remaining =
                                    (vendor.service_areas?.length || 0) - 3;

                                return (
                                    <TableRow key={vendor.id} className={vendor.has_real_estate_partnership ? "bg-accent/5" : ""}>
                                        <TableCell>
                                            <Link
                                                href={`/vendor/${vendor.slug}`}
                                                className="font-medium text-foreground hover:text-accent"
                                            >
                                                {vendor.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                                                <span className="text-sm font-medium">{vendor.rating}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {vendor.min_price
                                                ? `${vendor.min_price.toLocaleString()}円〜`
                                                : "—"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {areaNames?.map((name) => (
                                                    <Badge key={name} variant="secondary" className="text-xs">
                                                        {name}
                                                    </Badge>
                                                ))}
                                                {remaining > 0 && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        +{remaining}
                                                    </Badge>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {vendor.has_real_estate_partnership ? (
                                                <Badge className="bg-accent/10 text-accent hover:bg-accent/10">
                                                    <Building className="mr-1 h-3 w-3" />
                                                    あり
                                                </Badge>
                                            ) : (
                                                <span className="text-xs text-muted-foreground">なし</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {vendor.features?.slice(0, 2).map((f) => (
                                                    <Badge key={f} variant="outline" className="text-xs">
                                                        {f}
                                                    </Badge>
                                                ))}
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
