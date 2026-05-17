'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Users, ArrowRight, MailOpen, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Lead } from '@/lib/database.types'
import { LEAD_STATUS_MAP } from '@/lib/constants'

export default function AdminDashboard() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch('/api/leads')
            if (res.ok) {
                const data = await res.json()
                setLeads(data)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const totalLeads = leads.length
    const newLeads = leads.filter((l) => l.status === 'new').length
    const inProgressLeads = leads.filter((l) => l.status === 'in_progress').length
    const recentLeads = leads.slice(0, 5)

    const stats = [
        {
            label: '新規リード',
            value: newLeads,
            sub: `全${totalLeads}件中`,
            icon: <MailOpen className="h-5 w-5" />,
            color: 'text-orange-600 bg-orange-50',
        },
        {
            label: '対応中',
            value: inProgressLeads,
            icon: <Clock className="h-5 w-5" />,
            color: 'text-green-600 bg-green-50',
        },
        {
            label: '累計リード',
            value: totalLeads,
            icon: <Users className="h-5 w-5" />,
            color: 'text-blue-600 bg-blue-50',
        },
    ]

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
                    <div>
                        <h1 className="text-xl font-bold text-foreground">管理画面</h1>
                        <p className="text-sm text-muted-foreground">
                            家じまい.com ダッシュボード
                        </p>
                    </div>
                    <Link
                        href="/admin/leads"
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        リード管理
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <Link key={stat.label} href="/admin/leads">
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

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            <Users className="h-4 w-4 text-accent" />
                            最近のリード
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {recentLeads.length > 0 ? (
                                recentLeads.map((lead) => {
                                    const status = LEAD_STATUS_MAP[lead.status] || LEAD_STATUS_MAP.new
                                    return (
                                        <div
                                            key={lead.id}
                                            className="flex items-center justify-between rounded-lg border border-border p-3"
                                        >
                                            <div>
                                                <p className="font-medium text-foreground">{lead.user_name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {lead.prefecture} {lead.city ?? ''} ·{' '}
                                                    {new Date(lead.created_at).toLocaleDateString('ja-JP')}
                                                </p>
                                            </div>
                                            <span
                                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
                                            >
                                                {status.label}
                                            </span>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-sm text-muted-foreground">リードがありません</p>
                            )}
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
            </div>
        </div>
    )
}
