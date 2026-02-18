'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Star, Building, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { VendorForm } from '@/components/admin/VendorForm'
import type { Vendor, Area } from '@/lib/database.types'

export default function AdminVendors() {
    const [vendors, setVendors] = useState<Vendor[]>([])
    const [areas, setAreas] = useState<Area[]>([])
    const [loading, setLoading] = useState(true)
    const [formOpen, setFormOpen] = useState(false)
    const [editingVendor, setEditingVendor] = useState<Vendor | null>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const [vendorsRes, areasRes] = await Promise.all([
                fetch('/api/vendors'),
                fetch('/api/areas'),
            ])

            if (!vendorsRes.ok || !areasRes.ok) {
                throw new Error('Failed to fetch data')
            }

            const vendorsData = await vendorsRes.json()
            const areasData = await areasRes.json()

            setVendors(vendorsData)
            setAreas(areasData)
        } catch (error) {
            console.error('Error fetching data:', error)
            alert('データの取得に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    const handleAddVendor = () => {
        setEditingVendor(null)
        setFormOpen(true)
    }

    const handleEditVendor = (vendor: Vendor) => {
        setEditingVendor(vendor)
        setFormOpen(true)
    }

    const handleDeleteVendor = async (vendorId: string) => {
        if (!confirm('この業者を削除してもよろしいですか?')) {
            return
        }

        try {
            const response = await fetch(`/api/vendors/${vendorId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete vendor')
            }

            fetchData()
        } catch (error) {
            console.error('Error deleting vendor:', error)
            alert('業者の削除に失敗しました')
        }
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>読み込み中...</p>
            </div>
        )
    }

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
                                登録業者 {vendors.length}社
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleAddVendor}
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
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
                                <TableHead className="w-[100px]">操作</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor) => {
                                const areaNames = vendor.service_areas
                                    ?.slice(0, 3)
                                    .map((s) => areas.find((a) => a.slug === s)?.name)
                                    .filter(Boolean)
                                const remaining = (vendor.service_areas?.length || 0) - 3

                                return (
                                    <TableRow
                                        key={vendor.id}
                                        className={vendor.has_real_estate_partnership ? 'bg-accent/5' : ''}
                                    >
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
                                                : '—'}
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
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEditVendor(vendor)}
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDeleteVendor(vendor.id)}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <VendorForm
                open={formOpen}
                onOpenChange={setFormOpen}
                vendor={editingVendor}
                areas={areas}
                onSuccess={fetchData}
            />
        </div>
    )
}
