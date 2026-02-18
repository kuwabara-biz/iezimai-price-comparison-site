'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin } from 'lucide-react'
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
import { LeadDetailModal } from '@/components/admin/LeadDetailModal'
import type { Lead } from '@/lib/database.types'
import { LEAD_STATUS_MAP } from '@/lib/constants'

export default function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null)

    useEffect(() => {
        fetchLeads()
    }, [])

    const fetchLeads = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/leads')
            if (!response.ok) {
                throw new Error('Failed to fetch leads')
            }

            const data = await response.json()
            setLeads(data)
        } catch (error) {
            console.error('Error fetching leads:', error)
            alert('リードの取得に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    const handleRowClick = (leadId: string) => {
        setSelectedLeadId(leadId)
        setModalOpen(true)
    }

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>読み込み中...</p>
            </div>
        )
    }

    const newCount = leads.filter((l) => l.status === 'new').length

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
                                全{leads.length}件（未対応: {newCount}件）
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
                            {leads.map((lead) => {
                                const status = LEAD_STATUS_MAP[lead.status] || LEAD_STATUS_MAP.new
                                return (
                                    <TableRow
                                        key={lead.id}
                                        className={`cursor-pointer ${lead.status === 'new' ? 'bg-red-50/50' : ''} hover:bg-accent/5`}
                                        onClick={() => handleRowClick(lead.id)}
                                    >
                                        <TableCell>
                                            <span
                                                className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}
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
                                                variant={lead.source === 'LINE' ? 'default' : 'secondary'}
                                                className={
                                                    lead.source === 'LINE'
                                                        ? 'bg-[#06C755] text-white hover:bg-[#06C755]/90'
                                                        : 'text-xs'
                                                }
                                            >
                                                {lead.source}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(lead.created_at).toLocaleDateString('ja-JP')}
                                        </TableCell>
                                        <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground">
                                            {lead.admin_memo || '—'}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <LeadDetailModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                leadId={selectedLeadId}
                onSuccess={fetchLeads}
            />
        </div>
    )
}
