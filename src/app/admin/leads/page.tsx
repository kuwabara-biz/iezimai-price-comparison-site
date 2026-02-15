import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
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

// Mock leads data
const mockLeads = [
    { id: "l1", user_name: "田中 太郎", contact_info: "090-1234-5678", prefecture: "埼玉県", city: "さいたま市", property_type: "戸建て", status: "new", source: "LINE", created_at: "2026-02-15T10:30:00Z", admin_memo: null },
    { id: "l2", user_name: "鈴木 花子", contact_info: "080-2345-6789", prefecture: "埼玉県", city: "川越市", property_type: "戸建て", status: "contacted", source: "web", created_at: "2026-02-14T15:00:00Z", admin_memo: "不動産売却も検討中" },
    { id: "l3", user_name: "佐藤 一郎", contact_info: "070-3456-7890", prefecture: "群馬県", city: "前橋市", property_type: "戸建て", status: "in_progress", source: "LINE", created_at: "2026-02-13T09:00:00Z", admin_memo: "3LDK一軒家。荷物多め。" },
    { id: "l4", user_name: "山田 恵子", contact_info: "090-4567-8901", prefecture: "埼玉県", city: "川口市", property_type: "マンション", status: "completed", source: "web", created_at: "2026-02-10T14:00:00Z", admin_memo: "完了。口コミ依頼済み。" },
    { id: "l5", user_name: "渡辺 健", contact_info: "080-5678-9012", prefecture: "栃木県", city: "宇都宮市", property_type: "戸建て", status: "new", source: "LINE", created_at: "2026-02-15T08:00:00Z", admin_memo: null },
];

const statusConfig: Record<string, { label: string; className: string }> = {
    new: { label: "未対応", className: "bg-red-100 text-red-700" },
    contacted: { label: "連絡済み", className: "bg-blue-100 text-blue-700" },
    in_progress: { label: "対応中", className: "bg-green-100 text-green-700" },
    completed: { label: "完了", className: "bg-gray-100 text-gray-600" },
    cancelled: { label: "キャンセル", className: "bg-gray-100 text-gray-400" },
};

export default function AdminLeads() {
    const newCount = mockLeads.filter((l) => l.status === "new").length;

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
                            <h1 className="text-xl font-bold text-foreground">リード管理</h1>
                            <p className="text-sm text-muted-foreground">
                                全{mockLeads.length}件（未対応: {newCount}件）
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
                                <TableHead>ステータス</TableHead>
                                <TableHead>お名前</TableHead>
                                <TableHead>連絡先</TableHead>
                                <TableHead>エリア</TableHead>
                                <TableHead>物件種別</TableHead>
                                <TableHead>流入元</TableHead>
                                <TableHead>受付日</TableHead>
                                <TableHead>メモ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockLeads.map((lead) => {
                                const status = statusConfig[lead.status] || statusConfig.new;
                                return (
                                    <TableRow
                                        key={lead.id}
                                        className={lead.status === "new" ? "bg-red-50/50" : ""}
                                    >
                                        <TableCell>
                                            <span
                                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
                                            >
                                                {status.label}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-medium">{lead.user_name}</TableCell>
                                        <TableCell className="text-sm">{lead.contact_info}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1 text-sm">
                                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                                {lead.prefecture} {lead.city}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="text-xs">
                                                {lead.property_type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={lead.source === "LINE" ? "default" : "secondary"}
                                                className={
                                                    lead.source === "LINE"
                                                        ? "bg-[#06C755] text-white hover:bg-[#06C755]/90"
                                                        : "text-xs"
                                                }
                                            >
                                                {lead.source}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(lead.created_at).toLocaleDateString("ja-JP")}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                                            {lead.admin_memo || "—"}
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
