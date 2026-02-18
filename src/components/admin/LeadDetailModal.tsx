'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import type { Lead } from '@/lib/database.types'
import { MapPin, Phone, Mail, Calendar } from 'lucide-react'
import { LEAD_STATUS_CONFIG } from '@/lib/constants'

interface LeadDetailModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    leadId: string | null
    onSuccess: () => void
}


export function LeadDetailModal({ open, onOpenChange, leadId, onSuccess }: LeadDetailModalProps) {
    const [loading, setLoading] = useState(false)
    const [lead, setLead] = useState<Lead | null>(null)
    const [status, setStatus] = useState('')
    const [memo, setMemo] = useState('')

    useEffect(() => {
        if (leadId && open) {
            fetchLead()
        }
    }, [leadId, open])

    const fetchLead = async () => {
        if (!leadId) return

        try {
            const response = await fetch(`/api/leads/${leadId}`)
            if (!response.ok) throw new Error('Failed to fetch lead')

            const data = await response.json()
            setLead(data)
            setStatus(data.status)
            setMemo(data.admin_memo || '')
        } catch (error) {
            console.error('Error fetching lead:', error)
            alert('リード情報の取得に失敗しました')
        }
    }

    const handleUpdate = async () => {
        if (!leadId) return

        setLoading(true)
        try {
            const response = await fetch(`/api/leads/${leadId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status, admin_memo: memo }),
            })

            if (!response.ok) throw new Error('Failed to update lead')

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error('Error updating lead:', error)
            alert('リード情報の更新に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    if (!lead) {
        return null
    }

    const currentStatus = LEAD_STATUS_CONFIG.find((s) => s.value === status)

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>リード詳細</DialogTitle>
                    <DialogDescription>リード情報の確認とステータス更新</DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* 基本情報 */}
                    <div className="rounded-lg border p-4">
                        <h3 className="mb-3 font-semibold">基本情報</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                                <span className="font-medium text-muted-foreground">お名前:</span>
                                <span>{lead.user_name || '—'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <Phone className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <span>{lead.contact_info || '—'}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <span>
                                    {lead.prefecture} {lead.city} {lead.address_detail}
                                </span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-medium text-muted-foreground">物件種別:</span>
                                <Badge variant="secondary">{lead.property_type}</Badge>
                            </div>
                            <div className="flex items-start gap-2">
                                <Calendar className="mt-0.5 h-4 w-4 text-muted-foreground" />
                                <span>{new Date(lead.created_at).toLocaleString('ja-JP')}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <span className="font-medium text-muted-foreground">流入元:</span>
                                <Badge variant={lead.source === 'LINE' ? 'default' : 'secondary'}>
                                    {lead.source}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* 画像 */}
                    {lead.image_urls && lead.image_urls.length > 0 && (
                        <div className="rounded-lg border p-4">
                            <h3 className="mb-3 font-semibold">添付画像</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {lead.image_urls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`画像 ${index + 1}`}
                                        className="h-24 w-full rounded object-cover"
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ステータス更新 */}
                    <div className="space-y-2">
                        <Label htmlFor="status">ステータス</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger id="status">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {LEAD_STATUS_CONFIG.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <span className={`rounded-full px-2 py-0.5 text-xs ${option.color}`}>
                                            {option.label}
                                        </span>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* メモ */}
                    <div className="space-y-2">
                        <Label htmlFor="memo">管理メモ</Label>
                        <Textarea
                            id="memo"
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            rows={4}
                            placeholder="対応内容や備考を入力..."
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        キャンセル
                    </Button>
                    <Button onClick={handleUpdate} disabled={loading}>
                        {loading ? '更新中...' : '更新'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
