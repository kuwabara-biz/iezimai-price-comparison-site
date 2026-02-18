'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
    Users,
    Building,
    MessageSquare,
    Star,
    TrendingUp,
    ArrowRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Vendor, Lead, Review } from '@/lib/database.types'
import { LEAD_STATUS_MAP } from '@/lib/constants'

export default function AdminDashboard() {
    const [vendors, setVendors] = useState<Vendor[]>([])
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [vendorsRes, leadsRes] = await Promise.all([
                fetch('/api/vendors'),
                fetch('/api/leads'),
            ])

            if (vendorsRes.ok) {
                const vendorsData = await vendorsRes.json()
                setVendors(vendorsData)
            }

            if (leadsRes.ok) {
                const leadsData = await leadsRes.json()
                setLeads(leadsData)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        } finally {
            setLoading(false)
        }
    }

    const totalVendors = vendors.length
    const vendorsWithRealEstate = vendors.filter((v) => v.has_real_estate_partnership).length
    const totalLeads = leads.length
    const newLeads = leads.filter((l) => l.status === 'new').length
    const recentLeads = leads.slice(0, 3)

    const stats = [
        {
            label: '登録業者数',
            value: totalVendors,
            icon: <Building className="h-5 w-5" />,
            href: '/admin/vendors',
            color: 'text-blue-600 bg-blue-50',
        },
        {
            label: '新規リード',
            value: newLeads,
            sub: `全${totalLeads}件`,
            icon: <Users className="h-5 w-5" />,
            href: '/admin/leads',
            color: 'text-orange-600 bg-orange-50',
        },
        {
            label: '口コミ件数',
            value: 0,
            icon: <Star className="h-5 w-5" />,
            href: '/admin/reviews',
            color: 'text-yellow-600 bg-yellow-50',
        },
        {
            label: '不動産提携業者',
            value: vendorsWithRealEstate,
            icon: <TrendingUp className="h-5 w-5" />,
            href: '/admin/vendors',
            color: 'text-green-600 bg-green-50',
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
                                                        {lead.prefecture} {lead.city} ·{' '}
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

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-base">
                                <MessageSquare className="h-4 w-4 text-accent" />
                                最近の業者
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {vendors.slice(0, 3).map((vendor) => (
                                    <div
                                        key={vendor.id}
                                        className="rounded-lg border border-border p-3"
                                    >
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-medium text-foreground">
                                                {vendor.name}
                                            </p>
                                            <div className="flex items-center gap-0.5">
                                                <Star className="h-3 w-3 fill-accent text-accent" />
                                                <span className="text-xs font-medium">{vendor.rating}</span>
                                            </div>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                                            {vendor.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <Link
                                href="/admin/vendors"
                                className="mt-3 flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                            >
                                業者管理へ
                                <ArrowRight className="h-3 w-3" />
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
