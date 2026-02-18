'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import type { Vendor, Area } from '@/lib/database.types'

interface VendorFormProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    vendor?: Vendor | null
    areas: Area[]
    onSuccess: () => void
}

export function VendorForm({ open, onOpenChange, vendor, areas, onSuccess }: VendorFormProps) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        description: '',
        features: [] as string[],
        service_areas: [] as string[],
        rating: 0,
        min_price: 0,
        has_real_estate_partnership: false,
        phone: '',
        website_url: '',
    })

    // 編集モードの場合、vendorデータをフォームにセット
    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                slug: vendor.slug || '',
                description: vendor.description || '',
                features: vendor.features || [],
                service_areas: vendor.service_areas || [],
                rating: vendor.rating || 0,
                min_price: vendor.min_price || 0,
                has_real_estate_partnership: vendor.has_real_estate_partnership || false,
                phone: vendor.phone || '',
                website_url: vendor.website_url || '',
            })
        } else {
            // 新規作成モードの場合、フォームをリセット
            setFormData({
                name: '',
                slug: '',
                description: '',
                features: [],
                service_areas: [],
                rating: 0,
                min_price: 0,
                has_real_estate_partnership: false,
                phone: '',
                website_url: '',
            })
        }
    }, [vendor, open])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = vendor ? `/api/vendors/${vendor.id}` : '/api/vendors'
            const method = vendor ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to save vendor')
            }

            onSuccess()
            onOpenChange(false)
        } catch (error) {
            console.error('Error saving vendor:', error)
            alert('業者の保存に失敗しました')
        } finally {
            setLoading(false)
        }
    }

    const handleAreaToggle = (areaSlug: string) => {
        setFormData((prev) => ({
            ...prev,
            service_areas: prev.service_areas.includes(areaSlug)
                ? prev.service_areas.filter((s) => s !== areaSlug)
                : [...prev.service_areas, areaSlug],
        }))
    }

    const handleFeatureChange = (value: string) => {
        const features = value.split(',').map((f) => f.trim()).filter(Boolean)
        setFormData((prev) => ({ ...prev, features }))
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{vendor ? '業者情報を編集' : '新規業者を追加'}</DialogTitle>
                    <DialogDescription>
                        業者の基本情報と対応エリアを入力してください
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">業者名 *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">スラッグ *</Label>
                        <Input
                            id="slug"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="例: saitama-clean-service"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">説明</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="rating">評価</Label>
                            <Input
                                id="rating"
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.rating}
                                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="min_price">最低料金(円)</Label>
                            <Input
                                id="min_price"
                                type="number"
                                value={formData.min_price}
                                onChange={(e) => setFormData({ ...formData, min_price: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">電話番号</Label>
                            <Input
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="例: 048-000-0000"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website_url">ウェブサイト</Label>
                            <Input
                                id="website_url"
                                type="url"
                                value={formData.website_url}
                                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="features">特徴(カンマ区切り)</Label>
                        <Input
                            id="features"
                            value={formData.features.join(', ')}
                            onChange={(e) => handleFeatureChange(e.target.value)}
                            placeholder="例: 即日対応, 女性スタッフ, 見積無料"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="has_real_estate_partnership"
                            checked={formData.has_real_estate_partnership}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, has_real_estate_partnership: checked as boolean })
                            }
                        />
                        <Label htmlFor="has_real_estate_partnership" className="cursor-pointer">
                            不動産提携あり
                        </Label>
                    </div>

                    <div className="space-y-2">
                        <Label>対応エリア *</Label>
                        <div className="max-h-[200px] space-y-2 overflow-y-auto rounded-md border p-3">
                            {areas.map((area) => (
                                <div key={area.id} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`area-${area.slug}`}
                                        checked={formData.service_areas.includes(area.slug)}
                                        onCheckedChange={() => handleAreaToggle(area.slug)}
                                    />
                                    <Label htmlFor={`area-${area.slug}`} className="cursor-pointer text-sm">
                                        {area.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            キャンセル
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? '保存中...' : vendor ? '更新' : '追加'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
